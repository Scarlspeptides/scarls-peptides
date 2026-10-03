"""Private WhatsApp inbox prototype. Run behind HTTPS; no outbound messaging."""
import hashlib
import hmac
import json
import math
import os
import sqlite3
from stock_sync import GitHubStock, StockError
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit


def initialize(path):
    with sqlite3.connect(path) as db:
        db.execute('''CREATE TABLE IF NOT EXISTS inbox (
          sequence INTEGER PRIMARY KEY AUTOINCREMENT,
          id TEXT NOT NULL UNIQUE, customer TEXT NOT NULL, phone TEXT NOT NULL,
          message TEXT NOT NULL, timestamp REAL NOT NULL)''')
    os.chmod(path, 0o600)


def extract_messages(payload, phone_id):
    if not isinstance(payload, dict) or payload.get('object') != 'whatsapp_business_account':
        raise ValueError('Unexpected payload')
    rows = []
    for entry in payload.get('entry', []):
        for change in entry.get('changes', []):
            if change.get('field') != 'messages':
                continue
            value = change.get('value', {})
            if value.get('metadata', {}).get('phone_number_id') != phone_id:
                continue
            names = {contact['wa_id']: contact.get('profile', {}).get('name', '')
                     for contact in value.get('contacts', []) if 'wa_id' in contact}
            for message in value.get('messages', []):
                mid, phone = message['id'], message['from']
                timestamp = float(message['timestamp'])
                if not isinstance(mid, str) or not mid or not isinstance(phone, str) or not phone:
                    raise ValueError('Invalid message identity')
                if not math.isfinite(timestamp) or not 0 <= timestamp <= 253402300799:
                    raise ValueError('Invalid timestamp')
                kind = message.get('type', 'unknown')
                if kind == 'text':
                    body = message['text']['body']
                else:
                    body = '[Message ' + str(kind) + ' : consulter WhatsApp et saisir les produits manuellement.]'
                customer = names.get(phone) or phone
                if not isinstance(body, str) or not isinstance(customer, str):
                    raise ValueError('Invalid text')
                rows.append((mid, customer, phone, body, timestamp))
    return rows


def handler_for(db_path, app_secret, verify_token, inbox_token, phone_id, stock_store=None):
    if not inbox_token:
        raise ValueError('Private API access token required')
    whatsapp_enabled = all((app_secret, verify_token, phone_id))

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *_):
            pass  # Never log customer content, bearer keys or verification query tokens.

        def reply(self, status, data, content_type='application/json'):
            body = data.encode() if isinstance(data, str) else json.dumps(data, ensure_ascii=False).encode()
            self.send_response(status)
            self.send_header('Content-Type', content_type + '; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def do_GET(self):
            url = urlsplit(self.path)
            query = parse_qs(url.query)
            if url.path == '/health':
                return self.reply(200, {'status': 'ok'})
            if url.path == '/webhook':
                if not whatsapp_enabled:
                    return self.reply(503, {'error': 'WhatsApp not configured'})
                token = query.get('hub.verify_token', [''])[0]
                if query.get('hub.mode') == ['subscribe'] and hmac.compare_digest(token, verify_token):
                    return self.reply(200, query.get('hub.challenge', [''])[0], 'text/plain')
                return self.reply(403, {'error': 'Verification failed'})
            if url.path not in ('/api/inbox', '/api/stock'):
                return self.reply(404, {'error': 'Not found'})
            authorization = self.headers.get('Authorization', '')
            if not hmac.compare_digest(authorization, 'Bearer ' + inbox_token):
                return self.reply(401, {'error': 'Unauthorized'})
            if url.path == '/api/stock':
                if stock_store is None:
                    return self.reply(503, {'error': 'Stock synchronization not configured'})
                try:
                    return self.reply(200, stock_store.read())
                except StockError as error:
                    return self.reply(error.status, {'error': str(error)})
            if not whatsapp_enabled:
                return self.reply(503, {'error': 'WhatsApp not configured'})
            try:
                after = int(query.get('after', ['0'])[0])
                if not 0 <= after < 2**63:
                    raise ValueError()
            except ValueError:
                return self.reply(400, {'error': 'Invalid cursor'})
            try:
                with sqlite3.connect(db_path) as db:
                    db.row_factory = sqlite3.Row
                    rows = db.execute('SELECT * FROM inbox WHERE sequence > ? ORDER BY sequence LIMIT 100', (after,)).fetchall()
                messages = [dict(row) for row in rows]
                return self.reply(200, {'messages': messages, 'cursor': messages[-1]['sequence'] if messages else after})
            except sqlite3.Error:
                return self.reply(503, {'error': 'Inbox temporarily unavailable'})

        def do_POST(self):
            path = urlsplit(self.path).path
            if path not in ('/webhook', '/api/stock/movements'):
                return self.reply(404, {'error': 'Not found'})
            try:
                size = int(self.headers.get('Content-Length', '0'))
                if not 0 < size <= 2_000_000:
                    return self.reply(413, {'error': 'Invalid payload size'})
            except ValueError:
                return self.reply(400, {'error': 'Invalid length'})
            body = self.rfile.read(size)
            if path == '/api/stock/movements':
                if not hmac.compare_digest(self.headers.get('Authorization', ''), 'Bearer ' + inbox_token):
                    return self.reply(401, {'error': 'Unauthorized'})
                if stock_store is None:
                    return self.reply(503, {'error': 'Stock synchronization not configured'})
                try:
                    return self.reply(200, stock_store.apply(json.loads(body)))
                except StockError as error:
                    return self.reply(error.status, {'error': str(error)})
                except (ValueError, TypeError):
                    return self.reply(400, {'error': 'Invalid operation'})
            if not whatsapp_enabled:
                return self.reply(503, {'error': 'WhatsApp not configured'})
            signature = 'sha256=' + hmac.new(app_secret.encode(), body, hashlib.sha256).hexdigest()
            if not hmac.compare_digest(signature, self.headers.get('X-Hub-Signature-256', '')):
                return self.reply(403, {'error': 'Invalid signature'})
            try:
                rows = extract_messages(json.loads(body), phone_id)
            except (ValueError, TypeError, KeyError, AttributeError, OverflowError):
                return self.reply(400, {'error': 'Invalid payload'})
            try:
                with sqlite3.connect(db_path) as db:
                    db.executemany('INSERT OR IGNORE INTO inbox (id, customer, phone, message, timestamp) VALUES (?, ?, ?, ?, ?)', rows)
                return self.reply(200, {'received': True})
            except sqlite3.Error:
                return self.reply(503, {'error': 'Inbox temporarily unavailable'})
    return Handler


if __name__ == '__main__':
    os.umask(0o077)
    path = os.environ.get('INBOX_DB', './private/inbox.sqlite3')
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    config = [os.environ.get(key, '') for key in
              ('META_APP_SECRET', 'WEBHOOK_VERIFY_TOKEN', 'INBOX_ACCESS_TOKEN', 'WHATSAPP_PHONE_NUMBER_ID')]
    stock_store = None
    if os.environ.get('GITHUB_STOCK_TOKEN'):
        stock_store = GitHubStock(os.environ.get('GITHUB_STOCK_REPOSITORY', 'Scarlspeptides/scarls-peptides'),
                                 os.environ['GITHUB_STOCK_TOKEN'], os.environ.get('GITHUB_STOCK_BRANCH', 'main'))
    handler = handler_for(path, *config, stock_store=stock_store)
    initialize(path)
    server = ThreadingHTTPServer((os.environ.get('HOST', '127.0.0.1'), int(os.environ.get('PORT', '8080'))), handler)
    print('Private stock/inbox service started. HTTPS must be provided by the hosting platform or proxy.')
    server.serve_forever()
