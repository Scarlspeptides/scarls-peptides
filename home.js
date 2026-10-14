/* HOME_COPY_START */
const HOME_COPY = {"fr":{"announcementTitle":"Les tarifs du catalogue.","announcementLink":"Voir les prix","eyebrow":"Scarl’s Peptides / Catalogue de recherche","title":"Le catalogue","titleAccent":"Scarl’s.","lead":"Consultez les formats et les disponibilités. Préparez votre sélection, puis envoyez-la sur WhatsApp.","catalogue":"Voir le catalogue","research":"Destiné exclusivement à la recherche.","signature":"Scarl’s Peptides — Recherche uniquement.","scroll":"Parcourir les références","selectionEye":"Dans le catalogue","selectionTitle":"Les références.","all":"Tout le catalogue","ghk":"Peau & matrice extracellulaire","reta":"Recherche métabolique","nad":"Biologie cellulaire","semax":"Neurobiologie & cognition","contactEye":"Contact","contactTitle":"Une question sur une référence ?","contactText":"Envoyez-nous son nom sur WhatsApp. Précisez le format ou la documentation que vous recherchez.","contact":"Écrire sur WhatsApp","noteLabel":"Cadre de recherche","note":"Les références présentées ne sont pas destinées à l’utilisation humaine ou animale. Le catalogue permet de préparer une demande d’information ; aucune commande ni aucun paiement n’est traité sur ce site.","view":"Voir dans le catalogue","vial":"Fiole"},"en":{"announcementTitle":"Catalogue prices.","announcementLink":"View prices","eyebrow":"Scarl’s Peptides / Research catalogue","title":"The Scarl’s","titleAccent":"catalogue.","lead":"Check formats and availability. Build your selection, then send it on WhatsApp.","catalogue":"View catalogue","research":"For research use only.","signature":"A closer look at the material.","scroll":"Browse the references","selectionEye":"In the catalogue","selectionTitle":"The references.","all":"Full catalogue","ghk":"Skin & extracellular matrix","reta":"Metabolic research","nad":"Cell biology","semax":"Neurobiology & cognition","contactEye":"Contact","contactTitle":"A question about a reference?","contactText":"Send us its name on WhatsApp. Tell us which format or documentation you need.","contact":"Write on WhatsApp","noteLabel":"Research context","note":"These references are not intended for human or animal use. The catalogue helps you prepare an information request; no orders or payments are processed on this website.","view":"View in the catalogue","vial":"Vial"},"pt":{"announcementTitle":"Preços do catálogo.","announcementLink":"Ver preços","eyebrow":"Scarl’s Peptides / Catálogo de investigação","title":"O catálogo","titleAccent":"Scarl’s.","lead":"Consulte os formatos e a disponibilidade. Prepare a sua seleção e envie-a no WhatsApp.","catalogue":"Ver catálogo","research":"Exclusivamente para investigação.","signature":"Um olhar sobre a matéria.","scroll":"Explorar as referências","selectionEye":"No catálogo","selectionTitle":"As referências.","all":"Todo o catálogo","ghk":"Pele e matriz extracelular","reta":"Investigação metabólica","nad":"Biologia celular","semax":"Neurobiologia e cognição","contactEye":"Contacto","contactTitle":"Uma questão sobre uma referência?","contactText":"Envie-nos o nome no WhatsApp. Indique o formato ou a documentação que procura.","contact":"Escrever no WhatsApp","noteLabel":"Contexto de investigação","note":"Estas referências não se destinam a utilização humana ou animal. O catálogo permite preparar um pedido de informação; não são processadas encomendas nem pagamentos neste site.","view":"Ver no catálogo","vial":"Frasco"},"es":{"announcementTitle":"Precios del catálogo.","announcementLink":"Ver precios","eyebrow":"Scarl’s Peptides / Catálogo de investigación","title":"El catálogo","titleAccent":"Scarl’s.","lead":"Consulta los formatos y la disponibilidad. Prepara tu selección y envíala por WhatsApp.","catalogue":"Ver catálogo","research":"Exclusivamente para investigación.","signature":"Una mirada a la materia.","scroll":"Explorar las referencias","selectionEye":"En el catálogo","selectionTitle":"Las referencias.","all":"Todo el catálogo","ghk":"Piel y matriz extracelular","reta":"Investigación metabólica","nad":"Biología celular","semax":"Neurobiología y cognición","contactEye":"Contacto","contactTitle":"¿Una pregunta sobre una referencia?","contactText":"Envíanos su nombre por WhatsApp. Indica el formato o la documentación que buscas.","contact":"Escribir por WhatsApp","noteLabel":"Contexto de investigación","note":"Estas referencias no están destinadas al uso humano o animal. El catálogo permite preparar una solicitud de información; no se procesan pedidos ni pagos en este sitio.","view":"Ver en el catálogo","vial":"Vial"}};
/* HOME_COPY_END */
const VIALS = Object.fromEntries(window.ScarlsProducts.items.filter(item => item.image).map(item => [item.id,item]));
const VIAL_ORDER = ['retatrutide', ...Object.keys(VIALS).filter(key => key !== 'retatrutide')];
const scene = document.getElementById('vialScene');
const choices = document.getElementById('vialChoices');
const image = document.getElementById('sceneImage');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let homeLanguage = 'fr', activeVial = 'retatrutide', transitioning = false, swipeStart = null;
const carouselCopy = {
 fr:{previous:'Référence précédente',next:'Référence suivante',choose:'Choisir une référence',hint:'Glissez pour changer de référence.',label:'Références. Flèche gauche ou droite pour changer de fiole.'},
 en:{previous:'Previous reference',next:'Next reference',choose:'Choose a reference',hint:'Swipe to change reference.',label:'References. Use the left or right arrow to change vial.'},
 pt:{previous:'Referência anterior',next:'Referência seguinte',choose:'Escolher uma referência',hint:'Deslize para mudar de referência.',label:'Referências. Use a seta esquerda ou direita para mudar de frasco.'},
 es:{previous:'Referencia anterior',next:'Referencia siguiente',choose:'Elegir una referencia',hint:'Desliza para cambiar de referencia.',label:'Referencias. Usa la flecha izquierda o derecha para cambiar de vial.'}
};
function updateSceneCopy() {
 const copy=HOME_COPY[homeLanguage], vial=VIALS[activeVial], labels=carouselCopy[homeLanguage];
 image.alt=`${copy.vial} ${vial.name} ${vial.dose}`;
 document.getElementById('sceneDescription').textContent=vial.dose;
 document.getElementById('sceneName').textContent=vial.name;
 document.getElementById('sceneLink').textContent=copy.view;
 document.getElementById('sceneLink').setAttribute('aria-label',`${copy.view} — ${vial.name}`);
 scene.setAttribute('aria-label',labels.label);
 document.getElementById('sceneHint').textContent=labels.hint;
 document.getElementById('vialPrevious').setAttribute('aria-label',labels.previous);
 document.getElementById('vialNext').setAttribute('aria-label',labels.next);
 choices.setAttribute('aria-label',labels.choose);
}
function setPageLang(language) {
 homeLanguage=HOME_COPY[language]?language:'fr';
 document.querySelectorAll('[data-copy]').forEach(node=>{const value=HOME_COPY[homeLanguage][node.dataset.copy];if(value!==undefined)node.textContent=value;});
 updateSceneCopy();
}
choices.innerHTML=VIAL_ORDER.map(key=>`<button class="vial-choice${key===activeVial?' active':''}" type="button" data-vial="${key}" aria-pressed="${key===activeVial}">${VIALS[key].name}</button>`).join('');
choices.addEventListener('click',event=>{const button=event.target.closest('[data-vial]');if(button)showVial(button.dataset.vial);});
document.getElementById('vialPrevious').addEventListener('click',()=>stepVial(-1));
document.getElementById('vialNext').addEventListener('click',()=>stepVial(1));
function stepVial(direction) {const index=VIAL_ORDER.indexOf(activeVial);showVial(VIAL_ORDER[(index+direction+VIAL_ORDER.length)%VIAL_ORDER.length],direction);}
scene.addEventListener('keydown',event=>{if(event.target!==scene)return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();stepVial(event.key==='ArrowLeft'?-1:1);}});
scene.addEventListener('pointerdown',event=>{swipeStart={x:event.clientX,y:event.clientY,id:event.pointerId};try{scene.setPointerCapture(event.pointerId);}catch{}});
scene.addEventListener('pointerup',event=>{if(!swipeStart||swipeStart.id!==event.pointerId)return;const dx=event.clientX-swipeStart.x,dy=event.clientY-swipeStart.y;swipeStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25)stepVial(dx<0?1:-1);});
scene.addEventListener('pointercancel',()=>swipeStart=null);
async function showVial(next,direction=0) {
 if(!VIALS[next]||next===activeVial||transitioning)return;
 transitioning=true;
 try {
  const asset=new Image();asset.src=VIALS[next].image;await asset.decode();
  const animate=!reducedMotion.matches&&typeof image.animate==='function';
  if(animate){const exit=image.animate([{opacity:1},{opacity:0}],{duration:90,fill:'forwards'});await exit.finished.catch(()=>{});exit.cancel();}
  activeVial=next;image.src=asset.src;
  document.getElementById('sceneNumber').textContent=`${String(VIAL_ORDER.indexOf(next)+1).padStart(2,'0')} / ${VIAL_ORDER.length}`;
  document.getElementById('sceneLink').href=`produits.html#${next}`;
  choices.querySelectorAll('[data-vial]').forEach(button=>{const active=button.dataset.vial===next;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));if(active)choices.scrollTo({left:button.offsetLeft-choices.offsetLeft-(choices.clientWidth-button.clientWidth)/2,behavior:'auto'});});
  updateSceneCopy();if(animate)image.animate([{opacity:0},{opacity:1}],{duration:120});
 } catch { /* Keep the current reference if the next image cannot load. */ }
 finally {transitioning=false;}
}
updateSceneCopy();
