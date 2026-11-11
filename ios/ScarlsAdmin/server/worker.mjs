// GitHub credentials remain in Cloudflare secrets. This API only edits stock.json.
const endpoint = 'https://api.github.com/repos/Scarlspeptides/scarls-peptides/contents/stock.json';
const reply = (value, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
function validStock(stock) {
  return stock && typeof stock === 'object' && !Array.isArray(stock) && Object.keys(stock).length > 0 && Object.keys(stock).length <= 200 && Object.entries(stock).every(([k,v]) => k.length > 0 && k.length < 200 && Number.isSafeInteger(v) && v >= 0 && v <= 1000000);
}
async function authorized(request, secret) {
  if (typeof secret !== 'string' || secret.length < 43) return false;
  const actual = request.headers.get('Authorization') || '';
  if (actual.length > 512) return false;
  const encoder = new TextEncoder();
  const [a,b] = await Promise.all([actual, `Bearer ${secret}`].map(s => crypto.subtle.digest('SHA-256', encoder.encode(s))));
  const aa = new Uint8Array(a), bb = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < aa.length; i++) diff |= aa[i] ^ bb[i];
  return diff === 0;
}
function decodeContent(content) {
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(content.replace(/\s/g, '')), c => c.charCodeAt(0))));
}
function encodeContent(value) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value, null, 2) + '\n')));
}
export default {
 async fetch(request, env) {
  if (!env.GITHUB_TOKEN || !env.ADMIN_API_TOKEN) return reply({ error: 'Service non configuré.' }, 503);
  if (!await authorized(request, env.ADMIN_API_TOKEN)) return reply({ error: 'Accès refusé.' }, 401);
  if (new URL(request.url).pathname !== '/stock') return reply({ error: 'Introuvable.' }, 404);
  if (!['GET','PUT'].includes(request.method)) return reply({ error: 'Méthode non autorisée.' }, 405);
  const headers = { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2026-03-10', 'User-Agent': 'ScarlsAdmin', 'Content-Type': 'application/json' };
  try {
   let body;
   if (request.method === 'PUT') {
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply({ error: 'JSON requis.' }, 415);
    // Read at most 32 KB even when Content-Length is absent or forged.
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: 'Corps requis.' }, 400);
    const chunks = []; let length = 0;
    while (true) {
     const { done, value } = await reader.read(); if (done) break;
     length += value.length;
     if (length > 32768) { await reader.cancel(); return reply({ error: 'Requête trop grande.' }, 413); }
     chunks.push(value);
    }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    try { body = JSON.parse(new TextDecoder().decode(bytes)); } catch { return reply({ error: 'JSON invalide.' }, 400); }
    if (!validStock(body?.stock) || !/^[a-f0-9]{40,64}$/.test(body?.sha || '')) return reply({ error: 'Stock ou version invalide.' }, 400);
   }
   const source = await fetch(`${endpoint}?ref=main`, { headers });
   if (!source.ok) return reply({ error: 'Lecture GitHub impossible.' }, 502);
   const file = await source.json();
   const current = decodeContent(file.content);
   if (!validStock(current)) return reply({ error: 'Stock distant invalide.' }, 502);
   if (request.method === 'GET') return reply({ stock: current, sha: file.sha });
   if (body.sha !== file.sha) return reply({ error: 'Le site a changé. Rechargez et comparez les stocks avant de publier.' }, 409);
   const oldKeys = Object.keys(current).sort(), newKeys = Object.keys(body.stock).sort();
   if (JSON.stringify(oldKeys) !== JSON.stringify(newKeys)) return reply({ error: 'Les références doivent correspondre au catalogue.' }, 400);
   if (oldKeys.every(k => current[k] === body.stock[k])) return reply({ stock: current, sha: file.sha });
   const saved = await fetch(endpoint, { method: 'PUT', headers, body: JSON.stringify({ message: 'Mettre à jour le stock depuis ScarlsAdmin', content: encodeContent(body.stock), sha: file.sha, branch: 'main' }) });
   if (saved.status === 409 || saved.status === 422) return reply({ error: 'Conflit GitHub. Rechargez les stocks.' }, 409);
   if (!saved.ok) return reply({ error: 'Publication GitHub impossible.' }, 502);
   const result = await saved.json();
   return reply({ stock: body.stock, sha: result.content.sha });
  } catch { return reply({ error: 'Service temporairement indisponible.' }, 502); }
 }
};
