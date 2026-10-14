import assert from 'node:assert/strict';
import worker from '../server/worker.mjs';
const env = { GITHUB_TOKEN: 'test-only-github-token', ADMIN_API_TOKEN: 'a'.repeat(43) };
const sha = 'a'.repeat(40), changed = 'b'.repeat(40);
let writes = 0;
globalThis.fetch = async (url, options) => {
 if (options.method === 'PUT') {
  writes++;
  const body = JSON.parse(options.body);
  assert.equal(body.sha, sha);
  assert.equal(body.branch, 'main');
  assert.deepEqual(JSON.parse(Buffer.from(body.content, 'base64').toString()), { 'GHK-Cu': 19 });
  return Response.json({ content: { sha: changed } });
 }
 return Response.json({ sha, content: Buffer.from(JSON.stringify({ 'GHK-Cu': 20 })).toString('base64') });
};
const req = (method = 'GET', body, authorized = true) => new Request('https://unit-test.invalid/stock', { method, headers: { 'Content-Type': 'application/json', ...(authorized ? { Authorization: `Bearer ${env.ADMIN_API_TOKEN}` } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
assert.equal((await worker.fetch(req(), {})).status, 503);
assert.equal((await worker.fetch(req('GET', null, false), env)).status, 401);
assert.equal((await worker.fetch(req(), env)).status, 200);
assert.equal((await worker.fetch(req('PUT', { sha, stock: { 'GHK-Cu': -1 } }), env)).status, 400);
assert.equal((await worker.fetch(req('PUT', { sha: changed, stock: { 'GHK-Cu': 19 } }), env)).status, 409);
assert.equal((await worker.fetch(req('PUT', { sha, stock: { injected: 19 } }), env)).status, 400);
assert.equal(writes, 0);
const result = await worker.fetch(req('PUT', { sha, stock: { 'GHK-Cu': 19 } }), env);
assert.equal(result.status, 200);
assert.equal((await result.json()).sha, changed);
assert.equal(writes, 1);
assert.equal((await worker.fetch(req('PUT', { sha, stock: { 'GHK-Cu': 20 } }), env)).status, 200);
assert.equal(writes, 1);
assert.equal((await worker.fetch(req('PUT', { padding: 'x'.repeat(33000) }), env)).status, 413);
console.log('PASS: authentication, missing secrets, validation, conflict, catalog allowlist, publication, no-op, size limit');
