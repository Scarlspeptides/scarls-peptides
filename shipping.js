// Public 2026 reference rates. This module neither books nor purchases shipping.
(function(root) {
 'use strict';
 const countries = [["FR", "France métropolitaine", 0], ["AL", "Albanie", 4], ["DE", "Allemagne", 1], ["AD", "Andorre", 4], ["AT", "Autriche", 2], ["BE", "Belgique", 1], ["BG", "Bulgarie", 3], ["CY", "Chypre", 3], ["HR", "Croatie", 3], ["DK", "Danemark", 2], ["ES", "Espagne", 2], ["EE", "Estonie", 3], ["FI", "Finlande", 2], ["GR", "Grèce", 2], ["HU", "Hongrie", 3], ["IE", "Irlande", 2], ["IS", "Islande", 4], ["IT", "Italie", 2], ["LV", "Lettonie", 3], ["LI", "Liechtenstein", 4], ["LT", "Lituanie", 3], ["LU", "Luxembourg", 1], ["MK", "Macédoine du Nord", 4], ["MT", "Malte", 3], ["MD", "Moldavie", 4], ["ME", "Monténégro", 4], ["NO", "Norvège", 4], ["NL", "Pays-Bas", 1], ["PL", "Pologne", 3], ["PT", "Portugal", 2], ["CZ", "République tchèque", 3], ["RO", "Roumanie", 3], ["GB", "Royaume-Uni", 2], ["RS", "Serbie", 4], ["SK", "Slovaquie", 3], ["SI", "Slovénie", 3], ["SE", "Suède", 2], ["CH", "Suisse", 4]];
 const rates = [[2340,2520,2880,4080,5400],[3480,5160,9480,19080,31320],[3840,5400,9840,19680,31920],[5040,6480,11880,24600,40080],[4700,6700,13000,26000,42400]];
 const text = {
 fr: {title:'Estimer les frais de port',from:'Chronopost · Départ Paris · Livraison à domicile',country:'Pays',postal:'Code postal',city:'Ville',street:'Rue et numéro (facultatif pour estimer)',parcel:'Colis : 300 g par défaut — ajuster le poids et les dimensions',weight:'Poids total emballé (g)',length:'Longueur (cm)',width:'Largeur (cm)',height:'Hauteur (cm)',special:'Île ou territoire douanier particulier',share:'Inclure cette adresse dans ma demande et mes exports',privacy:'Le calcul se fait dans votre navigateur. L’adresse est incluse uniquement si vous cochez cette case puis copiez, téléchargez ou ouvrez WhatsApp.',other:'Autre destination européenne — devis nécessaire',note:'Estimation selon la grille publique 2026, à confirmer selon le colis réel et le contrat Chronopost. Options, suppléments, droits et taxes éventuels non calculés.',source:'Consulter la grille publiée',shipping:'Frais de port estimés',total:'Total produits + livraison estimé',billed:'Poids facturable',address:'Renseignez le pays et le code postal.',invalid:'Vérifiez le poids et les dimensions du colis.',format:'Format Chrono Express minimum : 30 × 21 × 3 cm.',territory:'Cette destination nécessite un devis Chronopost.',expired:'La grille 2026 doit être actualisée.',empty:'Ajoutez une référence pour estimer le total.',unavailable:'Le stock doit être vérifié avant de calculer le total.'},
 en: {title:'Estimate shipping',from:'Chronopost · From Paris · Home delivery',country:'Country',postal:'Postal code',city:'City',street:'Street and number (optional for estimate)',parcel:'Parcel: 300 g by default — adjust weight and dimensions',weight:'Packed weight (g)',length:'Length (cm)',width:'Width (cm)',height:'Height (cm)',special:'Island or special customs territory',share:'Include this address in my request and exports',privacy:'Calculated in your browser. Your address is included only if you tick this box and then copy, download or open WhatsApp.',other:'Other European destination — quote required',note:'Estimate using public 2026 rates. Confirm with actual parcel and Chronopost contract. Options, surcharges, duties and additional taxes are not calculated.',source:'View published rates',shipping:'Estimated shipping',total:'Estimated products + shipping total',billed:'Chargeable weight',address:'Enter country and postal code.',invalid:'Check parcel weight and dimensions.',format:'Chrono Express minimum size: 30 × 21 × 3 cm.',territory:'This destination requires a Chronopost quote.',expired:'The 2026 rates need updating.',empty:'Add a reference to estimate the total.',unavailable:'Stock must be checked before calculating the total.'},
 pt: {title:'Estimar portes',from:'Chronopost · Partida de Paris · Entrega ao domicílio',country:'País',postal:'Código postal',city:'Cidade',street:'Rua e número (opcional para estimar)',parcel:'Encomenda: 300 g por defeito — ajustar peso e dimensões',weight:'Peso embalado (g)',length:'Comprimento (cm)',width:'Largura (cm)',height:'Altura (cm)',special:'Ilha ou território aduaneiro especial',share:'Incluir esta morada no pedido e nas exportações',privacy:'Cálculo no navegador. A morada só é incluída ao selecionar esta opção e copiar, descarregar ou abrir WhatsApp.',other:'Outro destino europeu — orçamento necessário',note:'Estimativa com tarifas públicas de 2026. Confirmar com o volume real e o contrato Chronopost. Opções, suplementos, direitos e impostos adicionais não calculados.',source:'Consultar tarifas publicadas',shipping:'Portes estimados',total:'Total estimado de produtos + portes',billed:'Peso faturável',address:'Indique país e código postal.',invalid:'Verifique peso e dimensões.',format:'Formato mínimo Chrono Express: 30 × 21 × 3 cm.',territory:'Destino sujeito a orçamento Chronopost.',expired:'As tarifas de 2026 precisam de atualização.',empty:'Adicione uma referência para estimar o total.',unavailable:'Verifique o stock antes de calcular o total.'},
 es: {title:'Estimar gastos de envío',from:'Chronopost · Desde París · Entrega a domicilio',country:'País',postal:'Código postal',city:'Ciudad',street:'Calle y número (opcional para estimar)',parcel:'Paquete: 300 g por defecto — ajustar peso y dimensiones',weight:'Peso embalado (g)',length:'Largo (cm)',width:'Ancho (cm)',height:'Alto (cm)',special:'Isla o territorio aduanero especial',share:'Incluir esta dirección en mi solicitud y exportaciones',privacy:'Cálculo en el navegador. La dirección solo se incluye al marcar esta casilla y copiar, descargar o abrir WhatsApp.',other:'Otro destino europeo — presupuesto necesario',note:'Estimación con tarifas públicas de 2026. Confirmar según el paquete real y el contrato Chronopost. Opciones, suplementos, aranceles e impuestos adicionales no calculados.',source:'Consultar tarifas publicadas',shipping:'Envío estimado',total:'Total estimado de productos + envío',billed:'Peso facturable',address:'Introduce país y código postal.',invalid:'Comprueba peso y dimensiones.',format:'Tamaño mínimo Chrono Express: 30 × 21 × 3 cm.',territory:'Se necesita un presupuesto Chronopost.',expired:'Hay que actualizar las tarifas de 2026.',empty:'Añade una referencia para estimar el total.',unavailable:'Comprueba el stock antes de calcular el total.'}
 };
 function quote(d, date = new Date()) {
  const fail = error => ({ok:false,error});
  if (date.getFullYear() !== 2026) return fail('expired');
  const country = countries.find(c => c[0] === d.country);
  if (!country) return fail('territory');
  const postal = String(d.postal || '').trim();
  if (!postal) return fail('address');
  if (d.country === 'FR' && (!/^\d{5}$/.test(postal) || +postal.slice(0,2) < 1 || +postal.slice(0,2) > 95)) return fail('territory');
  if (d.special || (d.country === 'ES' && ['07','35','38','51','52'].includes(postal.slice(0,2))) || (d.country === 'PT' && postal.startsWith('9')) || (d.country === 'IT' && ['23041','22061'].includes(postal))) return fail('territory');
  const n = x => typeof x === 'number' ? x : Number(String(x).trim().replace(',', '.'));
  const grams = n(d.weight), sides = [n(d.length),n(d.width),n(d.height)].sort((a,b)=>b-a);
  if (![grams,...sides].every(x => Number.isFinite(x) && x > 0) || grams > 30000 || sides[0] > 150 || sides[0]+2*sides[1]+2*sides[2] > 300) return fail('invalid');
  const zone = country[2];
  if (zone && (sides[0] < 30 || sides[1] < 21 || sides[2] < 3)) return fail('format');
  const kg = zone ? Math.max(grams/1000, sides.reduce((p,x)=>p*x,1)/5000) : grams/1000;
  const tier = [1,3,10,20,30].findIndex(limit => kg <= limit);
  if (tier < 0) return fail('invalid');
  return {ok:true,cents:rates[zone][tier],kg,zone,service:zone ? 'Chrono Express':'Chrono 13'};
 }
 let mounted = false;
 const field = id => document.getElementById('shipping-'+id);
 function language() { return typeof root.pageLanguage === 'function' ? root.pageLanguage() : 'fr'; }
 function copy() { return text[language()] || text.fr; }
 function values() { return {country:field('country').value,postal:field('postal').value,weight:field('weight').value,length:field('length').value,width:field('width').value,height:field('height').value,special:field('special').checked}; }
 function money(cents) { return new Intl.NumberFormat(language(),{style:'currency',currency:'EUR'}).format(cents/100); }
 function subtotal() { return typeof root.shippingProductSubtotal === 'function' ? root.shippingProductSubtotal() : null; }
 function refresh() {
  if (!mounted) return;
  const c = copy();
  document.querySelectorAll('#shipping-estimator [data-shipping-copy]').forEach(el => { el.textContent = c[el.dataset.shippingCopy]; });
  let names; try { names = new Intl.DisplayNames([language()],{type:'region'}); } catch {}
  Array.from(field('country').options).forEach(option => { const entry = countries.find(x=>x[0]===option.value); option.textContent = entry ? names ? names.of(entry[0]) : entry[1] : c.other; });
  const q = quote(values()), total = subtotal();
  const result = field('result');
  if (!q.ok) result.textContent = c[q.error];
  else result.textContent = `${q.service} · ${c.shipping} : ${money(q.cents)} · ${c.billed} : ${q.kg.toFixed(3)} kg`;
  field('total').textContent = !q.ok ? '' : total === null ? c.unavailable : total <= 0 ? c.empty : `${c.total} : ${money(total+q.cents)}`;
 }
 function summary() {
  if (!mounted) return '';
  const c = copy(), d = values(), q = quote(d);
  let lines = ['Chronopost · Paris → '+(countries.find(x=>x[0]===d.country)?.[1] || c.other)];
  if (q.ok) lines.push(c.shipping+': '+money(q.cents)+' ('+q.service+', '+d.weight+' g, '+d.length+' × '+d.width+' × '+d.height+' cm)');
  else lines.push(c[q.error]);
  if (q.ok && subtotal() > 0) lines.push(c.total+': '+money(subtotal()+q.cents));
  if (field('share').checked) {
   const clean = s => s.replace(/[\r\n]+/g,' ').trim();
   lines.push([field('street').value, d.postal, field('city').value, d.country].map(clean).filter(Boolean).join(', '));
  }
  lines.push(c.note);
  return '\n\n'+lines.join('\n');
 }
 function mount() {
  const container = document.getElementById('selectionDetails');
  if (!container) return;
  const section = document.createElement('section'); section.id='shipping-estimator';
  const label = (id,key,type,value,autocomplete) => `<label><span data-shipping-copy="${key}"></span><input id="shipping-${id}" type="${type}" value="${value}" ${autocomplete ? `autocomplete="${autocomplete}"` : 'inputmode="decimal"'} maxlength="160"></label>`;
  section.innerHTML = `<h3 data-shipping-copy="title"></h3><p data-shipping-copy="from"></p><div class="shipping-grid"><label><span data-shipping-copy="country"></span><select id="shipping-country" autocomplete="country">${countries.map(c=>`<option value="${c[0]}">${c[1]}</option>`).join('')}<option value="OTHER"></option></select></label>${label('postal','postal','text','','postal-code')}${label('city','city','text','','address-level2')}${label('street','street','text','','street-address')}</div><label class="shipping-check"><input type="checkbox" id="shipping-special"><span data-shipping-copy="special"></span></label><details><summary data-shipping-copy="parcel"></summary><div class="shipping-grid">${label('weight','weight','text','300','')}${label('length','length','text','30','')}${label('width','width','text','21','')}${label('height','height','text','3','')}</div></details><p id="shipping-result" role="status" aria-live="polite"></p><p id="shipping-total"></p><p class="shipping-note" data-shipping-copy="note"></p><a href="https://www.laposte.fr/tarif-chronopost" target="_blank" rel="noopener noreferrer" data-shipping-copy="source"></a><label class="shipping-check"><input type="checkbox" id="shipping-share"><span data-shipping-copy="share"></span></label><p class="shipping-note" data-shipping-copy="privacy"></p>`;
  container.insertBefore(section,container.querySelector('.sel-actions'));
  section.addEventListener('input',refresh); section.addEventListener('change',refresh);
  const style=document.createElement('style');
  style.textContent='#selectionDetails{max-height:65vh;overflow-y:auto}.shipping-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}#shipping-estimator{padding:16px 0;border-top:1px solid #81749955;text-align:left}#shipping-estimator h3{margin:0 0 8px}#shipping-estimator p{margin:10px 0}#shipping-estimator label>span{display:block;font-size:.82rem;margin-bottom:5px}#shipping-estimator input:not([type=checkbox]),#shipping-estimator select{width:100%;min-width:0;box-sizing:border-box;padding:10px;border:1px solid #817499;border-radius:8px;background:#171020;color:#fff;font-size:16px}#shipping-estimator .shipping-check{display:flex;align-items:center;gap:10px;margin:14px 0}#shipping-estimator .shipping-check span{margin:0}#shipping-estimator summary{cursor:pointer;margin:12px 0;font-size:.85rem}#shipping-estimator .shipping-note{font-size:.78rem;color:#c6bdd0;line-height:1.5}#shipping-estimator a{color:#dabaff;font-size:.85rem}#shipping-result,#shipping-total{font-weight:600}';
  document.head.appendChild(style); mounted=true; refresh();
 }
 root.ScarlsShipping = {quote,refresh,summary,countries};
 if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded',mount);
})(typeof window !== 'undefined' ? window : globalThis);
