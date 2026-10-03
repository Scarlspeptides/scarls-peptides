import hashlib
import hmac
import http.client
import json
import tempfile
import threading
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from server import handler_for, initialize


class InboxTest(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        path = str(Path(self.directory.name) / 'inbox.db')
        initialize(path)
        self.server = ThreadingHTTPServer(('127.0.0.1', 0), handler_for(path, 'meta-secret', 'verify', 'inbox-secret', '123'))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.directory.cleanup()

    def request(self, method, path, body=None, headers=None):
        connection = http.client.HTTPConnection('127.0.0.1', self.server.server_port)
        connection.request(method, path, body, headers or {})
        response = connection.getresponse()
        result = (response.status, response.read())
        connection.close()
        return result

    def payload(self, mid='wamid.1', phone_id='123', kind='text'):
        return {'object': 'whatsapp_business_account', 'entry': [{'changes': [{'field': 'messages', 'value': {
            'metadata': {'phone_number_id': phone_id}, 'contacts': [{'wa_id': '33600000000', 'profile': {'name': 'Client test'}}],
            'messages': [{'id': mid, 'from': '33600000000', 'timestamp': '1791024000', 'type': kind,
                          'text': {'body': '2 x Retatrutide'}}]}}]}]}

    def post(self, payload):
        body = json.dumps(payload).encode()
        signature = 'sha256=' + hmac.new(b'meta-secret', body, hashlib.sha256).hexdigest()
        return self.request('POST', '/webhook', body, {'X-Hub-Signature-256': signature})

    def inbox(self, cursor=0):
        status, body = self.request('GET', '/api/inbox?after=' + str(cursor), headers={'Authorization': 'Bearer inbox-secret'})
        self.assertEqual(status, 200)
        return json.loads(body)

    def test_verification_and_authentication(self):
        self.assertEqual(self.request('GET', '/webhook?hub.mode=subscribe&hub.verify_token=verify&hub.challenge=abc'), (200, b'abc'))
        self.assertEqual(self.request('GET', '/webhook?hub.mode=subscribe&hub.verify_token=wrong')[0], 403)
        self.assertEqual(self.request('GET', '/api/inbox')[0], 401)
        self.assertEqual(self.request('POST', '/webhook', b'{}')[0], 403)
        self.assertEqual(self.request('POST', '/webhook', b'{}', {'X-Hub-Signature-256': 'sha256=wrong'})[0], 403)

    def test_message_and_duplicate(self):
        self.assertEqual(self.post(self.payload())[0], 200)
        self.assertEqual(self.post(self.payload())[0], 200)
        page = self.inbox()
        self.assertEqual(len(page['messages']), 1)
        self.assertEqual(page['messages'][0]['message'], '2 x Retatrutide')
        self.assertEqual(page['messages'][0]['customer'], 'Client test')
        self.assertEqual(self.inbox(page['cursor'])['messages'], [])

    def test_other_phone_and_unsupported_media(self):
        self.assertEqual(self.post(self.payload(phone_id='other'))[0], 200)
        self.assertEqual(self.inbox()['messages'], [])
        self.assertEqual(self.post(self.payload(kind='audio'))[0], 200)
        self.assertIn('saisir les produits manuellement', self.inbox()['messages'][0]['message'])

    def test_malformed_is_not_saved(self):
        payload = self.payload()
        del payload['entry'][0]['changes'][0]['value']['messages'][0]['id']
        self.assertEqual(self.post(payload)[0], 400)
        self.assertEqual(self.inbox()['messages'], [])

    def test_pagination(self):
        payload = self.payload()
        value = payload['entry'][0]['changes'][0]['value']
        first = value['messages'][0]
        value['messages'] = [dict(first, id='wamid.' + str(i)) for i in range(105)]
        self.assertEqual(self.post(payload)[0], 200)
        page = self.inbox()
        self.assertEqual(len(page['messages']), 100)
        next_page = self.inbox(page['cursor'])
        self.assertEqual(len(next_page['messages']), 5)
        self.assertEqual(len({m['id'] for m in page['messages'] + next_page['messages']}), 105)


if __name__ == '__main__':
    unittest.main()
