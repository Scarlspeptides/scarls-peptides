import base64
import copy
import json
import unittest
from stock_sync import GitHubStock, StockError, META

class FakeGitHub:
    def __init__(self, stock):
        self.data = dict(stock)
        self.revision = 1
        self.conflict = None
        self.lost_reply = False
        self.writes = 0
    def request(self, method, payload=None):
        if method == 'GET':
            return {'sha': str(self.revision), 'content': base64.b64encode(json.dumps(self.data).encode()).decode()}
        if self.conflict:
            change, self.conflict = self.conflict, None
            self.data.update(change); self.revision += 1
            raise StockError('conflict', 409)
        if payload['sha'] != str(self.revision):
            raise StockError('conflict', 409)
        self.data = json.loads(base64.b64decode(payload['content']))
        self.revision += 1; self.writes += 1
        if self.lost_reply:
            self.lost_reply = False
            raise StockError('Connection lost after commit', 503)
        return {'content': {'sha': str(self.revision)}}

class SharedStockTest(unittest.TestCase):
    def setUp(self):
        self.github = FakeGitHub({'Retatrutide': 7, 'KLOW': 0})
        self.stock = GitHubStock('Scarlspeptides/scarls-peptides', 'test-only', transport=self.github.request)
    def apply(self, deltas, operation='operation-1'):
        return self.stock.apply({'id': operation, 'deltas': deltas})
    def test_read_does_not_expose_operation_receipts(self):
        self.apply({'Retatrutide': -1})
        self.assertNotIn(META, self.stock.read()['quantities'])
    def test_add_remove_and_new_supplier_variant(self):
        self.assertEqual(self.apply({'Retatrutide': -7})['quantities']['Retatrutide'], 0)
        self.assertEqual(self.apply({'GHK-Cu 50 mg': 10}, 'receipt-1')['quantities']['GHK-Cu 50 mg'], 10)
    def test_batch_failure_is_atomic(self):
        before = copy.deepcopy(self.github.data)
        with self.assertRaises(StockError): self.apply({'Retatrutide': -2, 'KLOW': -1})
        self.assertEqual(self.github.data, before)
        self.assertEqual(self.github.writes, 0)
    def test_retry_after_lost_reply_does_not_deduct_twice(self):
        self.github.lost_reply = True
        with self.assertRaises(StockError): self.apply({'Retatrutide': -2})
        self.assertEqual(self.apply({'Retatrutide': -2})['quantities']['Retatrutide'], 5)
        self.assertEqual(self.github.writes, 1)
    def test_identifier_cannot_be_reused_for_different_quantities(self):
        self.apply({'Retatrutide': -1})
        with self.assertRaises(StockError): self.apply({'Retatrutide': -2})
        self.assertEqual(self.github.data['Retatrutide'], 6)
    def test_concurrent_change_rechecked(self):
        self.github.conflict = {'Retatrutide': 1}
        with self.assertRaises(StockError): self.apply({'Retatrutide': -2})
        self.assertEqual(self.github.data['Retatrutide'], 1)
        self.assertEqual(self.github.writes, 0)
    def test_concurrent_other_change_preserved(self):
        self.github.conflict = {'KLOW': 10}
        result = self.apply({'Retatrutide': -1})
        self.assertEqual(result['quantities'], {'Retatrutide': 6, 'KLOW': 10})
    def test_invalid_movements_rejected(self):
        for deltas in [{}, {'Retatrutide': 0}, {'Retatrutide': True}, {'Retatrutide': 1.5}, {META: 1}]:
            with self.assertRaises(StockError): self.apply(deltas)
        self.assertEqual(self.github.writes, 0)

if __name__ == '__main__': unittest.main()
