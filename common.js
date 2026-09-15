// Shared across all pages: nav labels, footer, language switcher, selection tray.
const NAV = {
  fr:{items:['Accueil','Produits','À propos','Livraison','FAQ','Contact'],footer:'Scarl’s Peptides — vitrine informative. Mentions légales à compléter.'},
  en:{items:['Home','Products','About','Shipping','FAQ','Contact'],footer:'Scarl’s Peptides — informational showcase. Legal notices to be completed.'},
  pt:{items:['Início','Produtos','Sobre','Entrega','FAQ','Contacto'],footer:'Scarl’s Peptides — vitrine informativa. Avisos legais a completar.'},
  es:{items:['Inicio','Productos','Sobre nosotros','Envío','FAQ','Contacto'],footer:'Scarl’s Peptides — vitrina informativa. Avisos legales por completar.'}
};

function currentLang(){ return localStorage.getItem('scarlLang') || 'fr'; }

function applyNav(l){
  document.documentElement.lang = l;
  document.querySelectorAll('.main-nav a').forEach((a,i)=>{ a.textContent = NAV[l].items[i]; });
  const f = document.getElementById('footerText');
  if(f) f.textContent = NAV[l].footer;
  document.querySelectorAll('.lang').forEach(b=>b.classList.toggle('active', b.dataset.lang===l));
  localStorage.setItem('scarlLang', l);
}

document.addEventListener('click', (e)=>{
  const b = e.target.closest('.lang');
  if(!b) return;
  applyNav(b.dataset.lang);
  if(typeof setPageLang === 'function') setPageLang(b.dataset.lang);
  if(typeof renderSelection === 'function') renderSelection();
});

// ---------- selection tray (used on produits.html, harmless elsewhere) ----------
const TRAY_STR = {
  fr:{title:'Ma sélection informative',one:'référence',many:'références',add:'Ajouter',added:'Ajoutée',qty:'Qté',copy:'Copier',download:'Télécharger la fiche',wa:'Demande sur WhatsApp',clear:'Vider',note:'Sélection informative uniquement : aucune commande ni paiement n’est effectué depuis cette page.',copied:'Références copiées.'},
  en:{title:'My information selection',one:'reference',many:'references',add:'Add',added:'Added',qty:'Qty',copy:'Copy',download:'Download sheet',wa:'WhatsApp request',clear:'Clear',note:'Information selection only: no order or payment is made from this page.',copied:'References copied.'},
  pt:{title:'A minha seleção informativa',one:'referência',many:'referências',add:'Adicionar',added:'Adicionada',qty:'Qtd',copy:'Copiar',download:'Descarregar ficha',wa:'Pedido por WhatsApp',clear:'Limpar',note:'Apenas seleção informativa: não é efetuada qualquer encomenda ou pagamento nesta página.',copied:'Referências copiadas.'},
  es:{title:'Mi selección informativa',one:'referencia',many:'referencias',add:'Añadir',added:'Añadida',qty:'Cant.',copy:'Copiar',download:'Descargar ficha',wa:'Solicitud por WhatsApp',clear:'Vaciar',note:'Solo selección informativa: no se realiza ningún pedido ni pago desde esta página.',copied:'Referencias copiadas.'}
};

let selection = JSON.parse(localStorage.getItem('scarlSelection') || '[]');

function saveSelection(){ localStorage.setItem('scarlSelection', JSON.stringify(selection)); }

function toggleSelection(btn){
  const row = btn.closest('.ref-row');
  const item = { name: row.dataset.name, dose: row.dataset.dose, price: row.dataset.price, qty: 1 };
  const idx = selection.findIndex(x=>x.name===item.name);
  if(idx>=0) selection.splice(idx,1); else selection.push(item);
  saveSelection();
  renderSelection();
}

function changeQty(name, delta){
  const item = selection.find(x=>x.name===name);
  if(!item) return;
  item.qty = Math.max(1, Math.min(99, (item.qty || 1) + delta));
  saveSelection();
  renderSelection();
}
function removeSelection(i){ selection.splice(i,1); saveSelection(); renderSelection(); }
function clearSelection(){ selection = []; saveSelection(); renderSelection(); }

function renderSelection(){
  const box = document.getElementById('tray');
  if(!box) return;
  const l = currentLang();
  const d = TRAY_STR[l] || TRAY_STR.fr;
  document.querySelectorAll('.ref-add').forEach(btn=>{
    const row = btn.closest('.ref-row');
    const yes = selection.some(x=>x.name===row.dataset.name);
    btn.textContent = yes ? d.added : d.add;
    btn.classList.toggle('primary', !yes);
    row.classList.toggle('selected', yes);
  });
  document.getElementById('trayCount').textContent = selection.length + ' ' + (selection.length===1 ? d.one : d.many);
  document.getElementById('trayItems').innerHTML = selection.map((x,i)=>
    `<div class="selected-item">
      <div class="selected-name"><strong>${x.name}</strong><span>${x.dose}</span></div>
      <div class="qty-control">
        <button type="button" onclick="changeQty('${x.name.replace(/'/g,"\\'")}',-1)" aria-label="Diminuer">−</button>
        <span>${d.qty} ${x.qty||1}</span>
        <button type="button" onclick="changeQty('${x.name.replace(/'/g,"\\'")}',1)" aria-label="Augmenter">+</button>
      </div>
      <button class="remove-item" type="button" onclick="removeSelection(${i})" aria-label="Supprimer">×</button>
    </div>`
  ).join('');
  document.getElementById('trayTitle').textContent = d.title;
  document.getElementById('copyBtn').textContent = d.copy;
  document.getElementById('downloadBtn').textContent = d.download;
  document.getElementById('waBtn').textContent = d.wa;
  document.getElementById('clearBtn').textContent = d.clear;
  document.getElementById('trayNote').textContent = d.note;
  box.classList.toggle('show', selection.length>0);
}

function selectionText(){
  const l = currentLang();
  return TRAY_STR[l].title + '\n\n' + selection.map(x=>`- ${x.name} — ${x.dose} — ${x.price} — ${TRAY_STR[l].qty}: ${x.qty||1}`).join('\n');
}

async function copySelection(){
  if(!selection.length) return;
  try{ await navigator.clipboard.writeText(selectionText()); showToast(TRAY_STR[currentLang()].copied); }
  catch(e){ showToast(selectionText()); }
}

function downloadSelection(){
  if(!selection.length) return;
  const blob = new Blob([selectionText()], {type:'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'scarls-selection-informative.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

function sendInfoWhatsApp(){
  if(!selection.length) return;
  const msg = selectionText() + '\n\nJe souhaite obtenir des informations complémentaires sur ces références.';
  window.open('https://wa.me/33664694830?text=' + encodeURIComponent(msg), '_blank');
}

function showToast(t){
  const x = document.getElementById('toast');
  if(!x) return;
  x.textContent = t;
  x.classList.add('show');
  setTimeout(()=>x.classList.remove('show'), 2200);
}

applyNav(currentLang());
