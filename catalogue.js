const CATALOGUE = {
  fr: [
    ['Peau & régénération', [['GHK-Cu', '100mg', 'Recherche cutanée & matrice extracellulaire', '100 €'], ['KLOW', '80mg', 'Recherche sur les mécanismes de régénération', '150 €']]],
    ['Muscle & récupération', [['CJC no DAC + Ipamorelin', '10mg', 'Recherche sur les mécanismes de croissance', '100 €']]],
    ['Cognition & système nerveux', [['Semax', '5mg', 'Recherche en neurobiologie & cognition', '50 €'], ['Selank', '5mg', 'Recherche en neurobiologie & stress', '50 €']]],
    ['Métabolisme & énergie', [['Retatrutide', '10mg', 'Recherche métabolique', '150 €'], ['MOTS-C', '10mg', 'Recherche métabolisme & énergie cellulaire', '70 €'], ['NAD+', '100mg', 'Recherche en biologie cellulaire', '70 €'], ['L-Carnitine', '1200mg', 'Recherche métabolisme énergétique', '60 €']]],
    ['Longévité & biologie cellulaire', [['Epitalon', '10mg', 'Recherche vieillissement cellulaire', '50 €']]],
    ['Pigmentation', [['Melanotan I', '10mg', 'Recherche sur la pigmentation', '60 €']]],
    ['Autres références', [['Glutathion', '600mg', 'Recherche sur les systèmes antioxydants', '65 €']]]
  ],
  en: [
    ['Skin & regeneration', [['GHK-Cu', '100mg', 'Skin research & extracellular matrix', '€100'], ['KLOW', '80mg', 'Research into regeneration mechanisms', '€150']]],
    ['Muscle & recovery', [['CJC no DAC + Ipamorelin', '10mg', 'Research into growth mechanisms', '€100']]],
    ['Cognition & nervous system', [['Semax', '5mg', 'Neurobiology & cognition research', '€50'], ['Selank', '5mg', 'Neurobiology & stress research', '€50']]],
    ['Metabolism & energy', [['Retatrutide', '10mg', 'Metabolic research', '€150'], ['MOTS-C', '10mg', 'Metabolism & cellular energy research', '€70'], ['NAD+', '100mg', 'Cell biology research', '€70'], ['L-Carnitine', '1200mg', 'Energy metabolism research', '€60']]],
    ['Longevity & cell biology', [['Epitalon', '10mg', 'Cellular ageing research', '€50']]],
    ['Pigmentation', [['Melanotan I', '10mg', 'Pigmentation research', '€60']]],
    ['Other references', [['Glutathion', '600mg', 'Research on antioxidant systems', '€65']]]
  ],
  pt: [
    ['Pele & regeneração', [['GHK-Cu', '100mg', 'Investigação cutânea e matriz extracelular', '€100'], ['KLOW', '80mg', 'Investigação dos mecanismos de regeneração', '€150']]],
    ['Músculo & recuperação', [['CJC no DAC + Ipamorelin', '10mg', 'Investigação dos mecanismos de crescimento', '€100']]],
    ['Cognição & sistema nervoso', [['Semax', '5mg', 'Investigação em neurobiologia e cognição', '€50'], ['Selank', '5mg', 'Investigação em neurobiologia e stress', '€50']]],
    ['Metabolismo & energia', [['Retatrutide', '10mg', 'Investigação metabólica', '€150'], ['MOTS-C', '10mg', 'Investigação do metabolismo e energia celular', '€70'], ['NAD+', '100mg', 'Investigação em biologia celular', '€70'], ['L-Carnitine', '1200mg', 'Investigação do metabolismo energético', '€60']]],
    ['Longevidade & biologia celular', [['Epitalon', '10mg', 'Investigação do envelhecimento celular', '€50']]],
    ['Pigmentação', [['Melanotan I', '10mg', 'Investigação sobre pigmentação', '€60']]],
    ['Outras referências', [['Glutathion', '600mg', 'Investigação dos sistemas antioxidantes', '€65']]]
  ],
  es: [
    ['Piel & regeneración', [['GHK-Cu', '100mg', 'Investigación cutánea y matriz extracelular', '€100'], ['KLOW', '80mg', 'Investigación de los mecanismos de regeneración', '€150']]],
    ['Músculo & recuperación', [['CJC no DAC + Ipamorelin', '10mg', 'Investigación de los mecanismos de crecimiento', '€100']]],
    ['Cognición & sistema nervioso', [['Semax', '5mg', 'Investigación en neurobiología y cognición', '€50'], ['Selank', '5mg', 'Investigación en neurobiología y estrés', '€50']]],
    ['Metabolismo & energía', [['Retatrutide', '10mg', 'Investigación metabólica', '€150'], ['MOTS-C', '10mg', 'Investigación del metabolismo y energía celular', '€70'], ['NAD+', '100mg', 'Investigación en biología celular', '€70'], ['L-Carnitine', '1200mg', 'Investigación del metabolismo energético', '€60']]],
    ['Longevidad & biología celular', [['Epitalon', '10mg', 'Investigación del envejecimiento celular', '€50']]],
    ['Pigmentación', [['Melanotan I', '10mg', 'Investigación sobre pigmentación', '€60']]],
    ['Otras referencias', [['Glutathion', '600mg', 'Investigación sobre los sistemas antioxidantes', '€65']]]
  ]
};

const IMAGE_MAP = {'GHK-Cu':'ghk-cu-clean.png','KLOW':'klow-clean.png','CJC no DAC + Ipamorelin':'cjc-no-dac-ipamorelin-clean.png','Semax':'semax-clean.png','Selank':'selank-clean.png','Retatrutide':'retatrutide-clean.png','MOTS-C':'mots-c-clean.png','NAD+':'nad-clean-v2.png','L-Carnitine':'l-carnitine-clean.png','Epitalon':'epitalon-clean.png','Melanotan I':'melanotan-i-clean.png','Glutathion':'glutathion-clean.png'};

const CATALOGUE_COPY = {
  fr: {head:['Scarl’s Peptides / 12 références','Le catalogue.','Parcourez les références par domaine de recherche. Ajoutez votre sélection pour préparer une demande d’information.'], all:'Tout voir', one:'référence', count:'références', filterLabel:'Filtrer le catalogue', badge:'Recherche', notice:'Important : les références présentées sont destinées à la recherche uniquement. Elles ne sont pas destinées à l’utilisation chez l’être humain ou l’animal.'},
  en: {head:['Scarl’s Peptides / 12 references','The catalogue.','Browse references by research area. Build your selection to prepare an information request.'], all:'View all', one:'reference', count:'references', filterLabel:'Filter catalogue', badge:'Research', notice:'Important: the listed references are intended for research use only. They are not intended for use in humans or animals.'},
  pt: {head:['Scarl’s Peptides / 12 referências','O catálogo.','Explore as referências por área de investigação. Prepare a sua seleção para um pedido de informação.'], all:'Ver tudo', one:'referência', count:'referências', filterLabel:'Filtrar catálogo', badge:'Investigação', notice:'Importante: as referências apresentadas destinam-se apenas à investigação. Não se destinam a utilização em seres humanos ou animais.'},
  es: {head:['Scarl’s Peptides / 12 referencias','El catálogo.','Explora las referencias por área de investigación. Prepara tu selección para solicitar información.'], all:'Ver todo', one:'referencia', count:'referencias', filterLabel:'Filtrar catálogo', badge:'Investigación', notice:'Importante: las referencias presentadas están destinadas únicamente a la investigación. No están destinadas al uso en humanos o animales.'}
};

const SELECTION_COPY = {
  fr: {title:'Ma sélection informative',one:'référence',many:'références',add:'Ajouter',added:'Ajouté',copy:'Copier',download:'Télécharger',wa:'Demander des informations',clear:'Vider',increase:'Ajouter une unité',decrease:'Retirer une unité',remove:'Retirer cette référence',note:'Sélection informative uniquement : aucune commande ni paiement n’est effectué depuis cette page.',copied:'Références copiées.'},
  en: {title:'My information selection',one:'reference',many:'references',add:'Add',added:'Added',copy:'Copy',download:'Download',wa:'Request information',clear:'Clear',increase:'Add one unit',decrease:'Remove one unit',remove:'Remove this reference',note:'Information selection only: no order or payment is made from this page.',copied:'References copied.'},
  pt: {title:'A minha seleção informativa',one:'referência',many:'referências',add:'Adicionar',added:'Adicionado',copy:'Copiar',download:'Descarregar',wa:'Pedir informações',clear:'Limpar',increase:'Adicionar uma unidade',decrease:'Retirar uma unidade',remove:'Retirar esta referência',note:'Apenas seleção informativa: não é efetuada qualquer encomenda ou pagamento nesta página.',copied:'Referências copiadas.'},
  es: {title:'Mi selección informativa',one:'referencia',many:'referencias',add:'Añadir',added:'Añadido',copy:'Copiar',download:'Descargar',wa:'Solicitar información',clear:'Vaciar',increase:'Añadir una unidad',decrease:'Retirar una unidad',remove:'Retirar esta referencia',note:'Solo selección informativa: no se realiza ningún pedido ni pago desde esta página.',copied:'Referencias copiadas.'}
};

let selection = [];
try { const saved = JSON.parse(localStorage.getItem('scarlSelection') || '[]'); if (Array.isArray(saved)) selection = saved.filter(item => item && IMAGE_MAP[item.name] && (item.qty === undefined || (Number.isFinite(item.qty) && item.qty > 0))); } catch {}
let activeFilter = 0;
function pageLanguage() { return currentLang(); }
function productId(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/g, ''); }

function revealLinkedProduct() {
  const id = location.hash.slice(1);
  const target = document.getElementById(id);
  if (!target || !target.classList.contains('product-card')) return;
  if (activeFilter) setFilter(0);
  requestAnimationFrame(() => target.scrollIntoView({block:'start', behavior:'instant'}));
}
window.addEventListener('hashchange', revealLinkedProduct);
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(revealLinkedProduct);
  document.getElementById('selectionToggle').addEventListener('click', () => {
    const details = document.getElementById('selectionDetails');
    details.hidden = !details.hidden;
    document.getElementById('selectionToggle').setAttribute('aria-expanded', String(!details.hidden));
  });
});

function setPageLang(lang) {
  const l = CATALOGUE[lang] ? lang : 'fr';
  const copy = CATALOGUE_COPY[l];
  document.getElementById('catalogueEyebrow').textContent = copy.head[0];
  document.getElementById('catalogueTitle').textContent = copy.head[1];
  document.getElementById('catalogueLead').textContent = copy.head[2];
  document.getElementById('catalogueTools').setAttribute('aria-label', copy.filterLabel);
  renderTools(l);
  renderCatalogue(l);
  renderSelection();
}

function renderTools(lang) {
  const groups = CATALOGUE[lang];
  document.getElementById('catalogueTools').innerHTML = `<button class="filter ${activeFilter === 0 ? 'active' : ''}" type="button" aria-pressed="${activeFilter === 0}" onclick="setFilter(0)">${CATALOGUE_COPY[lang].all}</button>` + groups.map((group, index) => `<button class="filter ${activeFilter === index + 1 ? 'active' : ''}" type="button" aria-pressed="${activeFilter === index + 1}" onclick="setFilter(${index + 1})">${group[0]}</button>`).join('');
}

function setFilter(index) {
  activeFilter = index;
  const lang = pageLanguage();
  renderTools(lang);
  document.querySelectorAll('.product-group').forEach((group, groupIndex) => group.classList.toggle('is-hidden', index !== 0 && groupIndex !== index - 1));
}

function renderCatalogue(lang) {
  const groups = CATALOGUE[lang];
  document.getElementById('catalogue').innerHTML = groups.map((group, groupIndex) => `<section class="product-group ${activeFilter !== 0 && activeFilter !== groupIndex + 1 ? 'is-hidden' : ''}"><div class="group-heading"><h2>${group[0]}</h2><span>${group[1].length} ${group[1].length === 1 ? CATALOGUE_COPY[lang].one : CATALOGUE_COPY[lang].count}</span></div><div class="product-grid">${group[1].map(product => renderProduct(product, lang)).join('')}</div></section>`).join('') + `<div class="notice"><strong>i</strong><span>${CATALOGUE_COPY[lang].notice}</span></div>`;
}

function renderProduct(product, lang) {
  const [name, dose, use, price] = product;
  const selected = selection.some(item => item.name === name);
  return `<article class="product-card" id="${productId(name)}" data-name="${name}" data-dose="${dose}" data-price="${price}"><div class="product-image" data-badge="${CATALOGUE_COPY[lang].badge}"><img src="${IMAGE_MAP[name]}" alt="${name}" loading="lazy"></div><div class="product-content"><h3 class="product-name"><span>${name}</span><span class="product-dose">${dose}</span></h3><p class="product-use">${use}</p><div class="product-bottom"><span class="price">${price}</span><div class="product-action"><div class="card-quantity" role="group" aria-label="${name} — ${lang === 'fr' ? 'quantité' : lang === 'en' ? 'quantity' : lang === 'pt' ? 'quantidade' : 'cantidad'}"><button type="button" aria-label="${SELECTION_COPY[lang].decrease}" onclick="changePendingQty(this, -1)">−</button><output aria-live="polite">1</output><button type="button" aria-label="${SELECTION_COPY[lang].increase}" onclick="changePendingQty(this, 1)">+</button></div><button class="add ${selected ? 'selected' : ''}" type="button" onclick="addSelection(this)">${selected ? SELECTION_COPY[lang].added : SELECTION_COPY[lang].add}</button></div></div></div></article>`;
}

function changePendingQty(button, change) {
  const output = button.parentElement.querySelector('output');
  output.textContent = Math.max(1, Math.min(99, Number(output.textContent) + change));
}

function addSelection(button) {
  const card = button.closest('.product-card');
  const item = {name: card.dataset.name, dose: card.dataset.dose, price: card.dataset.price};
  const quantity = Number(card.querySelector('.card-quantity output').textContent);
  const current = selection.find(entry => entry.name === item.name);
  if (current) current.qty = (current.qty || 1) + quantity;
  else selection.push({...item, qty: quantity});
  saveSelection();
  renderCatalogue(pageLanguage());
  renderSelection();
}

function saveSelection() { try { localStorage.setItem('scarlSelection', JSON.stringify(selection)); } catch {} }
function renderSelection() {
  const lang = pageLanguage();
  const copy = SELECTION_COPY[lang];
  const total = selection.reduce((sum, item) => sum + (item.qty || 1), 0);
  document.getElementById('selection').classList.toggle('show', total > 0);
  document.getElementById('selTitle').textContent = copy.title;
  document.getElementById('selCount').textContent = `${total} ${total === 1 ? copy.one : copy.many}`;
  document.getElementById('selItems').innerHTML = selection.map((item, index) => `<span class="chip">${item.name} · ${item.dose} × ${item.qty || 1}<button type="button" aria-label="${copy.increase}" onclick="changeQty(${index}, 1)">＋</button><button type="button" aria-label="${copy.decrease}" onclick="changeQty(${index}, -1)">−</button><button type="button" aria-label="${copy.remove}" onclick="removeSelection(${index})">×</button></span>`).join('');
  [['copyBtn','copy'],['downloadBtn','download'],['waBtn','wa'],['clearBtn','clear'],['selNote','note']].forEach(([id, key]) => document.getElementById(id).textContent = copy[key]);
}
function changeQty(index, change) { if (!selection[index]) return; selection[index].qty = (selection[index].qty || 1) + change; if (selection[index].qty <= 0) selection.splice(index, 1); saveSelection(); renderCatalogue(pageLanguage()); renderSelection(); }
function removeSelection(index) { selection.splice(index, 1); saveSelection(); renderCatalogue(pageLanguage()); renderSelection(); }
function clearSelection() { selection = []; saveSelection(); renderCatalogue(pageLanguage()); renderSelection(); }
function selectionText() { const lang = pageLanguage(); return `${SELECTION_COPY[lang].title}\n\n${selection.map(item => `• ${item.name} — ${item.dose} — ${item.price} × ${item.qty || 1}`).join('\n')}`; }
async function copySelection() { if (!selection.length) return; try { await navigator.clipboard.writeText(selectionText()); showToast(SELECTION_COPY[pageLanguage()].copied); } catch (error) { showToast(selectionText()); } }
function downloadSelection() { if (!selection.length) return; const file = new Blob([selectionText()], {type:'text/plain;charset=utf-8'}); const link = document.createElement('a'); link.href = URL.createObjectURL(file); link.download = 'scarls-selection-informative.txt'; link.click(); URL.revokeObjectURL(link.href); }
function sendInfoWhatsApp() { if (!selection.length) return; const lang = pageLanguage(); const text = `${selectionText()}\n\n${lang === 'fr' ? 'Je souhaite obtenir des informations complémentaires sur ces références.' : lang === 'en' ? 'I would like more information about these references.' : lang === 'pt' ? 'Gostaria de obter mais informações sobre estas referências.' : 'Me gustaría obtener más información sobre estas referencias.'}`; window.open(`https://wa.me/33664694830?text=${encodeURIComponent(text)}`, '_blank', 'noopener'); }
function showToast(message) { const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }
