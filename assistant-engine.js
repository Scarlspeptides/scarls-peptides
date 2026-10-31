/* Prepared FAQ engine: deterministic matching and educational comparisons. */
(function(root,factory){if(typeof module!=='undefined'&&module.exports)module.exports={createFAQ:factory};else root.createScarlsFAQ=factory;})(typeof globalThis!=='undefined'?globalThis:this,function(initial){
 'use strict';
 const langs=['fr','en','pt','es'];
 const normalize=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 const compact=v=>normalize(v).replace(/ /g,'');
 const phrase=(q,s)=>(' '+q+' ').includes(' '+normalize(s)+' ');
 function distance(a,b){const d=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let old=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const prev=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,old+(a[i-1]!==b[j-1]));old=prev;}}return d[b.length];}
 let entries=[];
 function applyContent(content){
  if(!content||!Array.isArray(content.entries)||content.entries.length>100)return false;
  const clean=[];const seen=new Set();
  for(const e of content.entries){
   if(!e||typeof e.id!=='string'||seen.has(e.id)||typeof e.name!=='string'||e.name.length>120||!Array.isArray(e.aliases)||e.aliases.length>30||e.aliases.some(a=>typeof a!=='string'||a.length>100)||!e.answer||!e.risk||langs.some(l=>typeof e.answer[l]!=='string'||!e.answer[l].trim()||e.answer[l].length>3000||typeof e.risk[l]!=='string'||e.risk[l].length>2000)||!Array.isArray(e.sources)||e.sources.length>5||e.sources.some(s=>!Array.isArray(s)||s.length!==2||typeof s[0]!=='string'||typeof s[1]!=='string'||!/^https:\/\//i.test(s[1])))return false;
   seen.add(e.id);if(e.enabled!==false)clean.push(JSON.parse(JSON.stringify(e)));
  }
  entries=clean;return true;
 }
 applyContent(initial);
 const match=q=>entries.filter(e=>[e.name,...e.aliases].some(a=>phrase(q,a)||q.split(' ').some(w=>w.length>=4&&w===compact(a))));
 const stop=new Set('quoi sert bienfait bienfaits effet effets what does about purpose benefit benefits para sirve serve que cual como qual avec entre compare comparer comparar comparison difference differences diferencia diferenca versus risks risque risques please merci bonjour hello salut want know voudrais connaitre saber saberes them their cette celui celle ces ses les des une dans sur the and for with can you your est son sont sont'.split(' '));
 function suggestions(q,exclude=[]){
  const words=q.split(' ').filter(w=>w.length>=4&&!stop.has(w));const matches=[];
  for(const e of entries){if(exclude.includes(e.id))continue;let best=99;
   for(const a of [e.name,...e.aliases]){const alias=compact(a);if(alias.length<4||alias.length>30)continue;for(const word of words){if(Math.abs(alias.length-word.length)>2)continue;const n=distance(word,alias);if(n>0&&n<=(Math.max(alias.length,word.length)>=8?2:1)&&n/Math.max(alias.length,word.length)<=.26)best=Math.min(best,n);}}
   if(best<99)matches.push({id:e.id,d:best});
  }
  return matches.sort((a,b)=>a.d-b.d).slice(0,4).map(x=>x.id);
 }
 function sourcesFor(ids){const out=[];for(const id of ids)for(const s of entries.find(e=>e.id===id)?.sources||[])if(!out.some(x=>x[1]===s[1]))out.push(s);return out;}
 function compare(ids,lang='fr'){
  lang=langs.includes(lang)?lang:'fr';const selected=[...new Set(ids)].map(id=>entries.find(e=>e.id===id)).filter(Boolean);
  if(selected.length!==2)return {key:'compareStart',choices:entries.map(e=>e.id),comparisonPicking:true};
  return {key:'comparisonIntro',comparison:selected.map(e=>({id:e.id,name:e.name,text:e.answer[lang]})),sources:sourcesFor(selected.map(e=>e.id))};
 }
 function reply(input,previousId,lang='fr'){
  lang=langs.includes(lang)?lang:'fr';const q=normalize(input);
  if(/\b(dose|dosage|dosing|inject|injecter|injection|injections|injecting|injetar|injetavel|inyeccion|inyectar|piquer|reconstituer|reconstitute|reconstituir|diluer|dilute|diluir|protocole|protocol|protocolo|cure|cycle|ciclo|stack|posologie|posologia)\b/.test(q))return {key:'noDose'};
  if(/\b(payer|paiement|payement|pay|payment|pagar|pagamento|pago|commander|commande|acheter|achat|buy|purchase|order|comprar|compra|pedido|encomenda|vinted|cotation|panier|cart|carrinho|carrito|devis|quote|orcamento|presupuesto)\b/.test(q))return {key:'noOrders'};
  if(/\b(livraison|livrer|colis|chronopost|expedition|envoi|envoie|adresse|frais|postal|shipping|delivery|parcel|address|envio|entrega|endereco|morada|direccion|frete|portes)\b/.test(q))return {key:'noShipping'};
  if(/\b(contact|contacter|whatsapp|telephone|phone|numero|number|joindre|nathan|contacto|contato|telefone|telefono)\b/.test(q))return {key:'contactAnswer',contact:true};
  if(/\b(donnees|confidentialite|enregistre|enregistrer|historique|prive|privacy|data|history|stored|dados|privacidade|historico|datos|privacidad|historial)\b/.test(q))return {key:'privacyAnswer'};
  if(/\b(ia|ai|intelligence|robot|bot|chatgpt|inteligencia|inteligencia artificial)\b/.test(q))return {key:'identity'};
  const hits=match(q),typos=suggestions(q,hits.map(e=>e.id));
  const comparison=/\b(compare|comparer|comparaison|comparison|comparar|comparacao|comparacion|difference|differences|diferenca|diferencas|diferencia|diferencias|versus|vs)\b/.test(q);
  if(comparison&&hits.length===2&&!typos.length)return compare(hits.map(e=>e.id),lang);
  if(typos.length)return {key:'typo',choices:[...hits.map(e=>e.id),...typos],suggested:true,comparisonPicking:comparison};
  if(comparison)return {key:'compareStart',choices:entries.map(e=>e.id),comparisonPicking:true};
  if(hits.length>1)return {key:'multiple',choices:hits.map(e=>e.id)};
  let entry=hits[0];
  const risk=/\b(risque|risques|danger|dangereux|risk|risks|side effects|safety|securite|precaution|precautions|riscos|risco|seguranca|riesgo|riesgos|seguridad|efeitos secundarios|efectos secundarios)\b/.test(q);
  if(!entry&&/\b(celui|celle|ses|plus|et|risque|risques|risk|risks|their|its|more|riscos|riesgos|seus|sus)\b/.test(q))entry=entries.find(e=>e.id===previousId);
  if(entry)return {text:risk?entry.risk[lang]:entry.answer[lang],entryId:entry.id,sources:entry.sources};
  if(risk)return {key:'riskGeneral',choices:entries.map(e=>e.id)};
  if(/\b(peptide|peptides|proteine|proteines|protein|proteins|peptido|peptidos|peptideo|peptideos)\b/.test(q))return {key:'definition',choices:entries.map(e=>e.id)};
  if(/\b(bonjour|salut|hello|hi|coucou|bonsoir|ola|bom dia|hola|buenos dias)\b/.test(q))return {key:'hello',choices:entries.map(e=>e.id)};
  return {key:'unknown',choices:entries.map(e=>e.id)};
 }
 return {get entries(){return entries;},normalize,reply,compare,applyContent,match,suggestions};
});
