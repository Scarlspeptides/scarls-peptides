const escapeCatalogue = window.ScarlsProducts.escapeHTML;
const CATALOGUE = Object.fromEntries(["fr","en","pt","es"].map(lang => [lang, window.ScarlsProducts.catalogue(lang)]));
const IMAGE_MAP = Object.fromEntries(window.ScarlsProducts.items.filter(item => item.image).map(item => [item.name,item.image]));

const CATALOGUE_COPY = {
  fr: {head:['Scarl’s Peptides / 13 références','Le catalogue.','Parcourez les références par domaine de recherche. Ajoutez votre sélection pour préparer une demande d’information.'], all:'Tout voir', one:'référence', count:'références', filterLabel:'Filtrer le catalogue', badge:'Recherche', notice:'Important : les références présentées sont destinées à la recherche uniquement. Elles ne sont pas destinées à l’utilisation chez l’être humain ou l’animal.'},
  en: {head:['Scarl’s Peptides / 13 references','The catalogue.','Browse references by research area. Build your selection to prepare an information request.'], all:'View all', one:'reference', count:'references', filterLabel:'Filter catalogue', badge:'Research', notice:'Important: the listed references are intended for research use only. They are not intended for use in humans or animals.'},
  pt: {head:['Scarl’s Peptides / 13 referências','O catálogo.','Explore as referências por área de investigação. Prepare a sua seleção para um pedido de informação.'], all:'Ver tudo', one:'referência', count:'referências', filterLabel:'Filtrar catálogo', badge:'Investigação', notice:'Importante: as referências apresentadas destinam-se apenas à investigação. Não se destinam a utilização em seres humanos ou animais.'},
  es: {head:['Scarl’s Peptides / 13 referencias','El catálogo.','Explora las referencias por área de investigación. Prepara tu selección para solicitar información.'], all:'Ver todo', one:'referencia', count:'referencias', filterLabel:'Filtrar catálogo', badge:'Investigación', notice:'Importante: las referencias presentadas están destinadas únicamente a la investigación. No están destinadas al uso en humanos o animales.'}
};

const SELECTION_COPY = {
  fr: {title:'Ma sélection',one:'référence',many:'références',add:'Ajouter',added:'Ajouté',copy:'Copier',download:'Télécharger',wa:"Continuer sur WhatsApp",waHint:"Message prérempli. Vous vérifiez avant d’envoyer.",clear:'Vider',increase:'Ajouter une unité',decrease:'Retirer une unité',remove:'Retirer cette référence',note:'Sélection informative uniquement : aucune commande ni paiement n’est effectué depuis cette page.',copied:'Références copiées.'},
  en: {title:'My selection',one:'reference',many:'references',add:'Add',added:'Added',copy:'Copy',download:'Download',wa:"Continue on WhatsApp",waHint:"Your message is ready. Review it before sending.",clear:'Clear',increase:'Add one unit',decrease:'Remove one unit',remove:'Remove this reference',note:'Information selection only: no order or payment is made from this page.',copied:'References copied.'},
  pt: {title:'A minha seleção',one:'referência',many:'referências',add:'Adicionar',added:'Adicionado',copy:'Copiar',download:'Descarregar',wa:"Continuar no WhatsApp",waHint:"Mensagem preenchida. Verifique antes de enviar.",clear:'Limpar',increase:'Adicionar uma unidade',decrease:'Retirar uma unidade',remove:'Retirar esta referência',note:'Apenas seleção informativa: não é efetuada qualquer encomenda ou pagamento nesta página.',copied:'Referências copiadas.'},
  es: {title:'Mi selección',one:'referencia',many:'referencias',add:'Añadir',added:'Añadido',copy:'Copiar',download:'Descargar',wa:"Continuar por WhatsApp",waHint:"Mensaje preparado. Revísalo antes de enviarlo.",clear:'Vaciar',increase:'Añadir una unidad',decrease:'Retirar una unidad',remove:'Retirar esta referencia',note:'Solo selección informativa: no se realiza ningún pedido ni pago desde esta página.',copied:'Referencias copiadas.'}
};

let STOCK = {};
let stockReady = false;
let stockRequest = null;
const LIMIT_COPY = {
 fr:{unknown:'Stock indisponible',loading:'Vérification du stock…',limit:'Quantité maximale atteinte',changed:'Le stock a changé : la sélection a été ajustée. Vérifiez-la avant de continuer.',blocked:'La quantité demandée dépasse le stock disponible.'},
 en:{unknown:'Stock unavailable',loading:'Checking stock…',limit:'Maximum quantity reached',changed:'Stock has changed: your selection was adjusted. Please review it before continuing.',blocked:'The requested quantity exceeds available stock.'},
 pt:{unknown:'Stock indisponível',loading:'A verificar stock…',limit:'Quantidade máxima atingida',changed:'O stock mudou: a seleção foi ajustada. Verifique-a antes de continuar.',blocked:'A quantidade pedida excede o stock disponível.'},
 es:{unknown:'Stock no disponible',loading:'Comprobando stock…',limit:'Cantidad máxima alcanzada',changed:'El stock ha cambiado: se ha ajustado la selección. Revísala antes de continuar.',blocked:'La cantidad solicitada supera el stock disponible.'}
};
function stockQuantity(name) {
 const value = STOCK[name];
 return stockReady && Number.isSafeInteger(value) && value >= 0 ? value : null;
}
function selectedQuantity(name) { return selection.filter(item => item.name === name).reduce((sum,item) => sum + item.qty, 0); }
function remainingQuantity(name) { const stock = stockQuantity(name); return stock === null ? 0 : Math.max(0, stock - selectedQuantity(name)); }
function selectionAllowed() { return stockReady && selection.length > 0 && selection.every(item => Number.isSafeInteger(item.qty) && item.qty > 0 && stockQuantity(item.name) !== null && item.qty <= stockQuantity(item.name)); }
function reconcileSelection() {
 const before = JSON.stringify(selection);
 selection = selection.flatMap(item => {
  const available = stockQuantity(item.name);
  if (available === null || !window.ScarlsProducts.byName(item.name)) return [];
  const qty = Math.min(item.qty, available);
  const reference=CATALOGUE[pageLanguage()].flatMap(group=>group[1]).find(p=>p[0]===item.name);
  return qty > 0 ? [{...item,qty,dose:reference[1],price:reference[3]}] : [];
 });
 saveSelection();
 return before !== JSON.stringify(selection);
}
const STOCK_COPY = {
  fr:{in:'En stock',low:'Stock faible',out:'Rupture de stock'},
  en:{in:'In stock',low:'Low stock',out:'Out of stock'},
  pt:{in:'Em stock',low:'Stock baixo',out:'Sem stock'},
  es:{in:'En stock',low:'Stock bajo',out:'Agotado'}
};
async function loadStock(){
 if (stockRequest) return stockRequest;
 stockRequest = (async () => {
  const wasReady = stockReady;
  if (!wasReady) { updateCatalogueStock(); renderSelection(); }
  let ok = false;
  try {
   const snapshot = await window.ScarlsProducts.refresh();
   STOCK = snapshot.stock; stockReady = true; ok = true;
   if(snapshot.changed){
    for(const lang of ['fr','en','pt','es'])CATALOGUE[lang]=window.ScarlsProducts.catalogue(lang);
    for(const name of Object.keys(IMAGE_MAP))delete IMAGE_MAP[name];
    for(const p of window.ScarlsProducts.items)if(p.image)IMAGE_MAP[p.name]=p.image;
    activeFilter=0;
    renderTools(pageLanguage());renderCatalogue(pageLanguage());
    document.getElementById('catalogueEyebrow').textContent='Scarl’s Peptides / '+snapshot.items.length+' '+CATALOGUE_COPY[pageLanguage()].count;
   }
  } catch { STOCK = {}; stockReady = false; }
  const changed = ok && reconcileSelection();
  updateCatalogueStock();
  if (changed || wasReady !== stockReady) renderSelection();
  if (changed) showToast(LIMIT_COPY[pageLanguage()].changed);
  return {ok,changed};
 })();
 try { return await stockRequest; } finally { stockRequest = null; }
}
async function prepareSelection() {
 const result = await loadStock();
 if (!result.ok || !selectionAllowed()) { showToast(LIMIT_COPY[pageLanguage()].unknown); return false; }
 if (result.changed) { showToast(LIMIT_COPY[pageLanguage()].changed); return false; }
 return true;
}
function stockMarkup(name, lang){
  const qty = stockQuantity(name);
  if(qty === null) return `<span class="stock-badge stock-low">${LIMIT_COPY[lang].unknown}</span>`;
  const copy=STOCK_COPY[lang] || STOCK_COPY.fr;
  const state=qty<=0?'out':qty<=3?'low':'in';
  const label=state==='out'?copy.out:state==='low'?copy.low:copy.in;
  return `<span class="stock-badge stock-${state}" title="${qty} disponible(s)">${label} · ${qty}</span>`;
}


let selection = [];
try { const saved = JSON.parse(localStorage.getItem('scarlSelection') || '[]'); if (Array.isArray(saved)) {
 const merged = new Map();
 const catalogueItems = CATALOGUE.fr.flatMap(group => group[1]);
 for (const item of saved) {
  const reference = item && catalogueItems.find(product => product[0] === item.name);
  const qty = item && item.qty === undefined ? 1 : item && item.qty;
  if (!reference || !Number.isSafeInteger(qty) || qty <= 0) continue;
  const current = merged.get(item.name);
  const total = (current ? current.qty : 0) + qty;
  if (!Number.isSafeInteger(total)) continue;
  merged.set(item.name,{name:reference[0],dose:reference[1],price:reference[3],qty:total});
 }
 selection = [...merged.values()];
} } catch {}
let activeFilter = 0;
let previewOpener=null;
function pageLanguage() { return typeof currentLang === "function" ? currentLang() : "fr"; }
function productId(name) { const reference=window.ScarlsProducts.byName(name);if(reference)return reference.id;return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/g, ''); }

function revealLinkedProduct() {
  const id = location.hash.slice(1);
  const target = document.getElementById(id);
  if (!target || !target.classList.contains('product-card')) return;
  document.getElementById('catalogueSearch').value='';
  if (activeFilter) setFilter(0); else applySearch();
  requestAnimationFrame(() => target.scrollIntoView({block:'start', behavior:'instant'}));
}
window.addEventListener('hashchange', revealLinkedProduct);
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(revealLinkedProduct);
  document.getElementById('selectionToggle').addEventListener('click', () => setSelectionOpen(document.getElementById('selectionDetails').hidden));
  document.getElementById('selectionClose').addEventListener('click', () => setSelectionOpen(false,true));
  document.getElementById('catalogueSearch').addEventListener('input', applySearch);
  document.getElementById('catalogueTools').addEventListener('click',event=>{const button=event.target.closest('[data-filter]');if(button)setFilter(Number(button.dataset.filter));});
  document.getElementById('catalogue').addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button||button.disabled)return;
    if(button.dataset.action==='preview')openProductPreview(button);
    else if(button.dataset.action==='add')addSelection(button);
    else if(button.dataset.step)changePendingQty(button,Number(button.dataset.step));
  });
  document.getElementById('selItems').addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
    const row=button.closest('[data-reference]'),index=selection.findIndex(item=>item.name===row.dataset.reference);if(index<0)return;
    if(button.dataset.action==='remove')removeSelection(index);
    else changeQty(index,button.dataset.action==='increase'?1:-1);
  });
  document.getElementById('copyBtn').addEventListener('click',copySelection);
  document.getElementById('downloadBtn').addEventListener('click',downloadSelection);
  document.getElementById('waBtn').addEventListener('click',sendInfoWhatsApp);
  document.getElementById('clearBtn').addEventListener('click',clearSelection);

  const panel=document.getElementById('selection');let swipe=null;
  panel.addEventListener('touchstart',event=>{
    const details=document.getElementById('selectionDetails');
    if(details.hidden || event.touches.length!==1 || details.scrollTop>0 || event.target.closest('input,textarea,select,a,summary,.chip button,#waBtn,#copyBtn,#downloadBtn,#clearBtn,#selectionClose')) { swipe=null;return; }
    swipe={x:event.touches[0].clientX,y:event.touches[0].clientY};
  },{passive:true});
  panel.addEventListener('touchmove',event=>{
    if(!swipe)return;
    const dx=event.touches[0].clientX-swipe.x,dy=event.touches[0].clientY-swipe.y;
    if(Math.abs(dx)>Math.abs(dy)){swipe=null;return;}
    if(dy>12 && event.cancelable)event.preventDefault();
    if(dy>65){setSelectionOpen(false);swipe=null;}
  },{passive:false});
  panel.addEventListener('touchend',()=>swipe=null,{passive:true});
  panel.addEventListener('touchcancel',()=>swipe=null,{passive:true});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.getElementById('productPreview').open&&!document.getElementById('selectionDetails').hidden)setSelectionOpen(false,true);});
  document.getElementById('productPreview').addEventListener('close',()=>{if(previewOpener?.isConnected)previewOpener.focus();previewOpener=null;});
  document.getElementById('previewClose').addEventListener('click',()=>document.getElementById('productPreview').close());
  document.getElementById('productPreview').addEventListener('click',event=>{if(event.target===event.currentTarget){const box=event.currentTarget.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)event.currentTarget.close();}});

});

function setPageLang(lang) {
  const l = CATALOGUE[lang] ? lang : 'fr';
  const copy = CATALOGUE_COPY[l];
  document.getElementById('catalogueEyebrow').textContent = 'Scarl’s Peptides / '+window.ScarlsProducts.items.length+' '+copy.count;
  document.getElementById('catalogueTitle').textContent = copy.head[1];
  document.getElementById('catalogueLead').textContent = copy.head[2];
  document.getElementById('catalogueTools').setAttribute('aria-label', copy.filterLabel);
  document.getElementById("catalogueUpdate").textContent = {"fr": "Nouveaux prix en ligne. Un énorme réassort arrive.", "en": "New prices are live. A huge restock is coming.", "pt": "Os novos preços estão disponíveis. Uma grande reposição está a chegar.", "es": "Los nuevos precios ya están disponibles. Se acerca una gran reposición."}[l];
  const ui = catalogueUI(l);
  document.getElementById("searchLabel").textContent=ui.search;
  document.getElementById("catalogueSearch").placeholder=ui.search;
  document.getElementById("selectionClose").setAttribute("aria-label",ui.close);
  renderTools(l);
  renderCatalogue(l);
  renderSelection();
}

function renderTools(lang) {
  const groups = CATALOGUE[lang];
  document.getElementById('catalogueTools').innerHTML = `<button class="filter ${activeFilter === 0 ? 'active' : ''}" type="button" aria-pressed="${activeFilter === 0}" data-filter="0">${CATALOGUE_COPY[lang].all}</button>` + groups.map((group, index) => `<button class="filter ${activeFilter === index + 1 ? 'active' : ''}" type="button" aria-pressed="${activeFilter === index + 1}" data-filter="${index + 1}">${escapeCatalogue(group[0])}</button>`).join('');
}

function setFilter(index) {
  activeFilter = index;
  const lang = pageLanguage();
  renderTools(lang);
  applySearch();
}

function renderCatalogue(lang) {
  const groups = CATALOGUE[lang];
  document.getElementById('catalogue').innerHTML = groups.map((group, groupIndex) => `<section class="product-group ${activeFilter !== 0 && activeFilter !== groupIndex + 1 ? 'is-hidden' : ''}"><div class="group-heading"><h2>${escapeCatalogue(group[0])}</h2><span>${group[1].length} ${group[1].length === 1 ? CATALOGUE_COPY[lang].one : CATALOGUE_COPY[lang].count}</span></div><div class="product-grid">${group[1].map(product => renderProduct(product, lang)).join('')}</div></section>`).join('') + `<div class="notice"><strong>i</strong><span>${CATALOGUE_COPY[lang].notice}</span></div>`;
  applySearch();
}

function renderProduct(product, lang) {
  const [name, dose, use, price, previousPrice] = product;
  const safeName=escapeCatalogue(name),safeDose=escapeCatalogue(dose),safeUse=escapeCatalogue(use);
  const backdrop=window.ScarlsProducts.byName(name).backdrop || 'glacier-night.webp';
  const priceLabels = {fr:['Ancien prix','Nouveau prix'],en:['Previous price','New price'],pt:['Preço anterior','Novo preço'],es:['Precio anterior','Nuevo precio']}[lang];
  const priceMarkup = previousPrice ? `<span class="price price-reduced"><del aria-label="${priceLabels[0]}">${previousPrice}</del><span aria-label="${priceLabels[1]}">${price}</span></span>` : `<span class="price">${price}</span>`;
  const imageMarkup = IMAGE_MAP[name]
    ? `<img src="${escapeCatalogue(IMAGE_MAP[name])}" alt="${safeName} — ${safeDose}" width="800" height="915" loading="lazy" decoding="async">`
    : `<div class="product-image-pending"><strong>${safeName}</strong><span>${safeDose}</span><small>${{fr:'Visuel à venir',en:'Image coming soon',pt:'Imagem em breve',es:'Imagen próximamente'}[lang]}</small></div>`;
  const selected = selection.some(item => item.name === name);
  const remaining = remainingQuantity(name);
  const disabled = remaining < 1;
  const addLabel = disabled ? stockQuantity(name) === 0 ? STOCK_COPY[lang].out : stockQuantity(name) === null ? LIMIT_COPY[lang].unknown : LIMIT_COPY[lang].limit : selected ? SELECTION_COPY[lang].added : SELECTION_COPY[lang].add;
  return `<article class="product-card" id="${escapeCatalogue(productId(name))}" style="--vial-backdrop:url(${escapeCatalogue(backdrop)})" data-name="${safeName}" data-dose="${safeDose}" data-price="${price}"><div class="product-image" data-badge="${CATALOGUE_COPY[lang].badge}"><button class="product-preview-trigger" type="button" data-action="preview" aria-label="${catalogueUI(lang).view} — ${safeName}">${imageMarkup}</button></div><div class="product-content"><h3 class="product-name"><span>${safeName}</span><span class="product-dose">${safeDose}</span></h3><p class="product-use">${safeUse}</p>${stockMarkup(name, lang)}<div class="product-bottom">${priceMarkup}<div class="product-action"><div class="card-quantity" role="group" aria-label="${safeName} — ${lang === 'fr' ? 'quantité' : lang === 'en' ? 'quantity' : lang === 'pt' ? 'quantidade' : 'cantidad'}"><button type="button" aria-label="${SELECTION_COPY[lang].decrease}" data-step="-1" disabled>−</button><output aria-live="polite">${disabled ? 0 : 1}</output><button type="button" aria-label="${SELECTION_COPY[lang].increase}" data-step="1" ${remaining <= 1 ? 'disabled' : ''}>+</button></div><button class="add ${selected ? 'selected' : ''}" type="button" aria-label="${addLabel} — ${safeName} · ${safeDose}" data-action="add" ${disabled ? 'disabled' : ''}>${addLabel}</button></div></div></div></article>`;
}

function changePendingQty(button, change) {
 const card = button.closest('.product-card');
 const remaining = remainingQuantity(card.dataset.name);
 if (remaining < 1) return;
 const output = button.parentElement.querySelector('output');
 const quantity = Math.max(1, Math.min(99, remaining, Number(output.textContent) + change));
 output.textContent = quantity;
 const buttons = button.parentElement.querySelectorAll('button');
 buttons[0].disabled = quantity <= 1;
 buttons[1].disabled = quantity >= Math.min(99, remaining);
}
function addSelection(button) {
 const card = button.closest('.product-card');
 const item = {name: card.dataset.name, dose: card.dataset.dose, price: card.dataset.price};
 const quantity = Number(card.querySelector('.card-quantity output').textContent);
 if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > remainingQuantity(item.name)) {
  showToast(LIMIT_COPY[pageLanguage()].blocked); return;
 }
 const current = selection.find(entry => entry.name === item.name);
 if (current) current.qty += quantity;
 else selection.push({...item, qty: quantity});
 saveSelection(); updateCatalogueStock(); renderSelection();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!reduced && button.animate)button.animate([{transform:'scale(1)'},{transform:'scale(.94)'},{transform:'scale(1)'}],{duration:220});
 const counter=document.getElementById('selCount');if(!reduced && counter.animate)counter.animate([{opacity:.4},{opacity:1}],{duration:300});
}

function saveSelection() { try { localStorage.setItem('scarlSelection', JSON.stringify(selection)); } catch {} }
function shippingProductSubtotal() {
 if (!stockReady || !selectionAllowed()) return null;
 return selection.reduce((sum,item) => sum + window.ScarlsProducts.byName(item.name).priceCents * item.qty, 0);
}
function renderSelection() {
  const lang = pageLanguage();
  const copy = SELECTION_COPY[lang];
  const total = selection.reduce((sum, item) => sum + (item.qty || 1), 0);
  document.getElementById('selection').classList.toggle('show', total > 0);
  document.getElementById('selTitle').textContent = copy.title;
  const amount = shippingProductSubtotal();
  const formatted = amount === null ? '—' : new Intl.NumberFormat(lang,{style:'currency',currency:'EUR'}).format(amount/100);
  document.getElementById('selCount').textContent = `${total} · ${formatted}`;
  document.getElementById('selTotal').textContent = ({fr:'Total produits',en:'Products total',pt:'Total dos produtos',es:'Total de productos'}[lang]) + ' : ' + formatted;
  if (!total) { window.ScarlsShipping?.reset(); setSelectionOpen(false); }
  syncSelectionItems(copy);
  ['copyBtn','downloadBtn','waBtn'].forEach(id => document.getElementById(id).disabled = !selectionAllowed());
  [['copyBtn','copy'],['downloadBtn','download'],['waBtn','wa'],['waHint','waHint'],['clearBtn','clear'],['selNote','note']].forEach(([id, key]) => document.getElementById(id).textContent = copy[key]);
  document.getElementById('selectionExtrasLabel').textContent = {fr:'Autres options',en:'Other options',pt:'Outras opções',es:'Otras opciones'}[lang];
  window.ScarlsShipping?.refresh();
}
function changeQty(index, change) {
 const item = selection[index];
 if (!item || !Number.isSafeInteger(change)) return;
 if (change > 0 && change > remainingQuantity(item.name)) { showToast(LIMIT_COPY[pageLanguage()].blocked); return; }
 item.qty += change;
 if (item.qty <= 0) selection.splice(index,1);
 saveSelection(); updateCatalogueStock(); renderSelection();
}
function removeSelection(index) { selection.splice(index, 1); saveSelection(); updateCatalogueStock(); renderSelection(); }
function clearSelection() { window.ScarlsShipping?.reset(); selection = []; saveSelection(); updateCatalogueStock(); renderSelection(); }
function selectionText() { const lang = pageLanguage(); return `${SELECTION_COPY[lang].title}\n\n${selection.map(item => `• ${item.name} — ${item.dose} — ${item.price} × ${item.qty || 1}`).join('\n')}\n\n${document.getElementById('selTotal').textContent}${window.ScarlsShipping?.summary() || ''}`; }
async function copySelection() { if (!selection.length || !await prepareSelection()) return; try { await navigator.clipboard.writeText(selectionText()); showToast(SELECTION_COPY[pageLanguage()].copied); } catch (error) { showToast(selectionText()); } }
async function downloadSelection() { if (!selection.length || !await prepareSelection()) return; const file = new Blob([selectionText()], {type:'text/plain;charset=utf-8'}); const link = document.createElement('a'); link.href = URL.createObjectURL(file); link.download = 'scarls-selection-informative.txt'; link.click(); URL.revokeObjectURL(link.href); }
async function sendInfoWhatsApp() { if (!selection.length || !await prepareSelection()) return; const lang = pageLanguage(); const text = `${selectionText()}\n\n${lang === 'fr' ? 'Je souhaite obtenir des informations complémentaires sur ces références.' : lang === 'en' ? 'I would like more information about these references.' : lang === 'pt' ? 'Gostaria de obter mais informações sobre estas referências.' : 'Me gustaría obtener más información sobre estas referencias.'}`; window.location.href = `https://wa.me/33664694830?text=${encodeURIComponent(text)}`; }
function showToast(message) { const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }

loadStock();
setInterval(() => { if (!document.hidden) loadStock(); }, 30000);
window.addEventListener('focus', () => loadStock());





function catalogueUI(lang=pageLanguage()) {
 return ({fr:{search:'Rechercher une référence',close:'Fermer la sélection',view:'Voir la fiche',empty:'Aucune référence trouvée.',docs:'Demander la documentation',note:'Recherche uniquement. Utilisation humaine ou animale exclue.'},en:{search:'Search references',close:'Close selection',view:'View reference',empty:'No references found.',docs:'Request documentation',note:'Research only. Not for human or animal use.'},pt:{search:'Pesquisar referências',close:'Fechar seleção',view:'Ver referência',empty:'Nenhuma referência encontrada.',docs:'Pedir documentação',note:'Apenas investigação. Não destinado a uso humano ou animal.'},es:{search:'Buscar referencias',close:'Cerrar selección',view:'Ver referencia',empty:'No se encontraron referencias.',docs:'Solicitar documentación',note:'Solo investigación. No destinado al uso humano ni animal.'}})[lang];
}
function setSelectionOpen(open,focus=false) {
 document.getElementById('selectionDetails').hidden=!open;
 document.getElementById('selectionToggle').setAttribute('aria-expanded',String(open));
 document.getElementById('selectionClose').hidden=!open;
 document.getElementById('selection').classList.toggle('is-open',open);
 if(focus)document.getElementById('selectionToggle').focus();
}
function applySearch() {
 const input=document.getElementById('catalogueSearch');if(!input)return;
 const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');
 const query=normalize(input.value.trim());let count=0;
 document.querySelectorAll('.product-group').forEach((group,index)=>{
  let visible=0;
  group.querySelectorAll('.product-card').forEach(card=>{const match=normalize(card.dataset.name+' '+card.dataset.dose).includes(query);card.hidden=!match;if(match)visible++;});
  const show=visible>0 && (!activeFilter || activeFilter===index+1);
  group.classList.toggle('is-hidden',!show);if(show)count+=visible;
 });
 document.getElementById('searchStatus').textContent=!count?catalogueUI().empty:query?String(count)+' '+(count===1?CATALOGUE_COPY[pageLanguage()].one:CATALOGUE_COPY[pageLanguage()].count):'';
}
function updateCatalogueStock() {
 const lang=pageLanguage();
 document.querySelectorAll('.product-card').forEach(card=>{
  const name=card.dataset.name, remaining=remainingQuantity(name);
  const badge=card.querySelector('.stock-badge');if(badge)badge.outerHTML=stockMarkup(name,lang);
  const add=card.querySelector('.add');if(!add)return;
  const selected=selection.some(item=>item.name===name);
  const label=remaining<1?stockQuantity(name)===0?STOCK_COPY[lang].out:stockQuantity(name)===null?LIMIT_COPY[lang].unknown:LIMIT_COPY[lang].limit:selected?SELECTION_COPY[lang].added:SELECTION_COPY[lang].add;
  add.textContent=label;add.disabled=remaining<1;add.classList.toggle('selected',selected);add.setAttribute('aria-label',label+' — '+name+' · '+card.dataset.dose);
  const output=card.querySelector('.card-quantity output');
  const qty=remaining<1?0:Math.max(1,Math.min(Number(output.textContent)||1,99,remaining));output.textContent=qty;
  const buttons=card.querySelectorAll('.card-quantity button');buttons[0].disabled=qty<=1;buttons[1].disabled=remaining<1 || qty>=Math.min(99,remaining);
 });
 syncSelectionItems();
}
function syncSelectionItems(copy=SELECTION_COPY[pageLanguage()]) {
 const host=document.getElementById('selItems');if(!host)return;
 const active=document.activeElement;
 const focusInside=host.contains(active);
 const focusAction=active?.dataset.action;
 const focusRow=active?.closest?.('[data-reference]');
 const oldIndex=focusRow?Array.from(host.children).indexOf(focusRow):0;
 const existing=new Map(Array.from(host.children).map(row=>[row.dataset.reference,row]));
 selection.forEach((item,index)=>{
  let row=existing.get(item.name);
  if(!row){
   row=document.createElement('div');row.className='chip';row.dataset.reference=item.name;
   const label=document.createElement('span');label.className='chip-label';row.append(label);
   const controls=document.createElement('span');controls.className='chip-controls';
   for(const [action,symbol] of [['decrease','−'],['increase','+'],['remove','×']]){
    const button=document.createElement('button');button.type='button';button.dataset.action=action;button.textContent=symbol;controls.append(button);
   }
   row.append(controls);
  }
  existing.delete(item.name);
  row.querySelector('.chip-label').textContent=`${item.name} · ${item.dose} × ${item.qty}`;
  row.querySelectorAll('[data-action]').forEach(button=>{button.setAttribute('aria-label',copy[button.dataset.action]+' — '+item.name);button.disabled=button.dataset.action==='increase'&&remainingQuantity(item.name)<1;});
  if(host.children[index]!==row)host.insertBefore(row,host.children[index]||null);
 });
 existing.forEach(row=>row.remove());
 if(focusInside&&(document.activeElement!==active||!active.isConnected||active.disabled)){
  if(active.isConnected&&!active.disabled){active.focus();return;}
  const next=host.children[Math.min(Math.max(oldIndex,0),host.children.length-1)];
  const candidate=next?.querySelector(`[data-action="${focusAction||'decrease'}"]`);
  if(candidate&&!candidate.disabled)candidate.focus();
  else (next?.querySelector('[data-action="decrease"]')||document.getElementById(selection.length?'selectionToggle':'catalogueSearch')).focus();
 }
}

function openProductPreview(button) {
 const card=button.closest('.product-card');const name=card.dataset.name;
 const reference=CATALOGUE[pageLanguage()].flatMap(group=>group[1]).find(product=>product[0]===name);if(!reference)return;
 const body=document.getElementById('previewBody');body.replaceChildren();
 body.style.setProperty('--vial-backdrop',`url(${window.ScarlsProducts.byName(name).backdrop || 'glacier-night.webp'})`);
 if(IMAGE_MAP[name]){const image=document.createElement('img');image.src=IMAGE_MAP[name];image.alt=name;body.append(image);}
 const title=document.createElement('h2');title.id='previewTitle';title.textContent=reference[0];body.append(title);
 for(const value of [reference[1]+' · '+reference[3],reference[2],catalogueUI().note]){const text=document.createElement('p');text.textContent=value;body.append(text);}
 const contact=document.createElement('a');contact.className='text-link';contact.href=`https://wa.me/33664694830?text=${encodeURIComponent(catalogueUI().docs+' — '+reference[0]+' · '+reference[1])}`;contact.textContent=catalogueUI().docs;body.append(contact);
 document.getElementById('previewClose').setAttribute('aria-label',catalogueUI().close);
 const dialog=document.getElementById('productPreview');previewOpener=button;dialog.setAttribute('aria-labelledby','previewTitle');dialog.showModal();
}

