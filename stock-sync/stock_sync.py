"""GitHub-backed shared stock. Repository writes stay on the private server."""
import base64
import hashlib
import json
import re
import threading
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import Request, urlopen

META = '__scarls_sync'
MAX_QUANTITY = 2**31 - 1

class StockError(Exception):
    def __init__(self, message, status=409):
        super().__init__(message)
        self.status = status


def validate_quantities(data):
    if not isinstance(data, dict):
        raise StockError('Invalid stock source', 503)
    quantities = {name: qty for name, qty in data.items() if name != META}
    if not all(isinstance(name, str) and 0 < len(name) <= 150 and type(qty) is int and 0 <= qty <= MAX_QUANTITY
               for name, qty in quantities.items()):
        raise StockError('Invalid stock source', 503)
    return quantities


class GitHubStock:
    def __init__(self, repository, token, branch='main', transport=None):
        if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', repository) or not token:
            raise ValueError('GitHub repository and server-side token required')
        self.repository, self.token, self.branch = repository, token, branch
        self.transport = transport or self._request
        self.lock = threading.Lock()

    def _request(self, method, body=None):
        url = f'https://api.github.com/repos/{self.repository}/contents/stock.json'
        if method == 'GET':
            url += '?ref=' + quote(self.branch, safe='')
        request = Request(url, method=method,
                          data=json.dumps(body).encode() if body is not None else None,
                          headers={'Authorization': 'Bearer ' + self.token,
                                   'Accept': 'application/vnd.github+json',
                                   'X-GitHub-Api-Version': '2022-11-28',
                                   'User-Agent': 'ScarlsAdmin-StockSync', 'Content-Type': 'application/json'})
        try:
            with urlopen(request, timeout=20) as response:
                return json.load(response)
        except HTTPError as error:
            raise StockError('Concurrent update' if error.code in (409, 422) else 'GitHub stock service unavailable',
                             409 if error.code in (409, 422) else 503) from None
        except Exception:
            raise StockError('GitHub stock service unavailable', 503) from None

    def _read(self):
        result = self.transport('GET')
        try:
            data = json.loads(base64.b64decode(result['content']))
            quantities = validate_quantities(data)
            meta = data.get(META, {'operations': {}})
            if not isinstance(meta, dict) or not isinstance(meta.get('operations', {}), dict):
                raise ValueError()
            return data, quantities, result['sha'], dict(meta.get('operations', {}))
        except (KeyError, ValueError, TypeError):
            raise StockError('Invalid stock source', 503) from None

    def read(self):
        _, quantities, sha, _ = self._read()
        return {'quantities': quantities, 'version': sha}

    def apply(self, payload):
        if not isinstance(payload, dict):
            raise StockError('Invalid operation', 400)
        operation = payload.get('id')
        deltas = payload.get('deltas')
        if not isinstance(operation, str) or not re.fullmatch(r'[A-Za-z0-9_.:-]{1,180}', operation):
            raise StockError('Invalid operation identifier', 400)
        if not isinstance(deltas, dict) or not 1 <= len(deltas) <= 100:
            raise StockError('Invalid stock movements', 400)
        if not all(isinstance(name, str) and 0 < len(name) <= 150 and name != META
                   and type(delta) is int and delta != 0 and abs(delta) <= 9999 for name, delta in deltas.items()):
            raise StockError('Invalid stock movements', 400)
        digest = hashlib.sha256(json.dumps(deltas, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
        # Serialize local requests; GitHub's blob SHA also protects against another process/server.
        with self.lock:
            for _ in range(4):
                data, quantities, sha, operations = self._read()
                if operation in operations:
                    if operations[operation] != digest:
                        raise StockError('Operation identifier already used with other quantities')
                    return {'quantities': quantities, 'version': sha}
                updated = dict(quantities)
                for name, delta in deltas.items():
                    if name not in updated and delta < 0:
                        raise StockError('Unknown product: ' + name)
                    quantity = updated.get(name, 0) + delta
                    if quantity < 0:
                        raise StockError('Stock insuffisant : ' + name)
                    if quantity > MAX_QUANTITY:
                        raise StockError('Stock quantity limit exceeded')
                    updated[name] = quantity
                operations[operation] = digest
                # Quantities and operation receipts are in the SAME GitHub file update.
                # No names, phone numbers or message bodies are published in this metadata.
                data = dict(updated)
                data[META] = {'operations': operations}
                content = base64.b64encode((json.dumps(data, ensure_ascii=False, indent=2) + '\n').encode()).decode()
                try:
                    result = self.transport('PUT', {'message': 'Synchronize inventory movement',
                                                   'content': content, 'sha': sha, 'branch': self.branch})
                    return {'quantities': updated, 'version': result['content']['sha']}
                except StockError as error:
                    if error.status != 409:
                        raise
            raise StockError('Stock changed concurrently; retry the same operation')
