// Generated into products.js by build_site.py. The admin database is authoritative.
(function(root){
 const api=root.ScarlsProducts;
 api.endpoint='https://scarls-administration.solarcoot14.chatgpt.site/api/catalogue';
 api.escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let pending=null,lastCatalogue=null,lastRefreshAt=0,lastSnapshot=null;
 // Avoid repeated requests caused by rapid focus/visibility changes.
 const MIN_REFRESH_GAP_MS=15000;
 api.refresh=async function({force=false}={}){
  if(pending)return pending;
  if(!force&&lastSnapshot&&Date.now()-lastRefreshAt<MIN_REFRESH_GAP_MS)return {...lastSnapshot,changed:false};
  pending=(async()=>{
   const response=await fetch(api.endpoint+'?v='+Date.now(),{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(10000)});
   if(!response.ok)throw Error('Catalogue unavailable');
   const snapshot=await response.json();
   if(!snapshot||!Array.isArray(snapshot.items)||!Array.isArray(snapshot.groups)||!snapshot.stock||typeof snapshot.stock!=='object')throw Error('Invalid catalogue');
   if(!snapshot.groups.every(g=>g&&g.labels&&['fr','en','pt','es'].every(l=>typeof g.labels[l]==='string')))throw Error('Invalid groups');
   if(!snapshot.items.every(p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&typeof p.dose==='string'&&Number.isInteger(p.group)&&p.group>=0&&p.group<snapshot.groups.length&&Number.isSafeInteger(p.priceCents)&&p.priceCents>=0&&Number.isSafeInteger(snapshot.stock[p.name])&&snapshot.stock[p.name]>=0&&p.descriptions&&['fr','en','pt','es'].every(l=>typeof p.descriptions[l]==='string')&&(!p.image||p.image.startsWith('https://'))))throw Error('Invalid products');
   const catalogue=JSON.stringify({groups:snapshot.groups,items:snapshot.items.map(({quantity,...p})=>p)});
   const changed=catalogue!==lastCatalogue;
   // Keep array references used by the generated catalogue methods.
   api.groups.splice(0,api.groups.length,...snapshot.groups);
   api.items.splice(0,api.items.length,...snapshot.items);
   api.stock=snapshot.stock;api.version=snapshot.version;lastCatalogue=catalogue;
   lastRefreshAt=Date.now();lastSnapshot={...snapshot,changed:false};
   return {...snapshot,changed};
  })();
  try{return await pending}finally{pending=null}
 };
})(typeof window!=='undefined'?window:globalThis);
