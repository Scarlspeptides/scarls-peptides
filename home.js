const MASCOT_COPY={"ghk-cu":{"fr":"Peau : production de collagène stimulée en laboratoire. Pilosité : nombre et épaisseur des poils des sourcils améliorés dans un petit essai de sérum local chez 18 personnes.","en":"Skin: collagen production stimulated in laboratory cells. Hair: eyebrow hair count and thickness improved in a small topical serum trial involving 18 people.","pt":"Pele: produção de colagénio estimulada em células no laboratório. Pelos: número e espessura dos pelos das sobrancelhas melhoraram num pequeno ensaio de sérum tópico com 18 pessoas.","es":"Piel: producción de colágeno estimulada en células de laboratorio. Vello: mejoraron el número y el grosor de los pelos de las cejas en un pequeño ensayo de sérum tópico con 18 personas."},"klow":{"fr":"Composition indiquée dans la fiche : KPV, BPC-157, TB500 et GHK-Cu. Les recherches sur ces composants portent notamment sur l’inflammation et la réparation des tissus ; ce ne sont pas des résultats cliniques du mélange.","en":"The product sheet lists KPV, BPC-157, TB500 and GHK-Cu. Research on these components includes inflammation and tissue repair; these are not clinical results for the blend.","pt":"A ficha indica KPV, BPC-157, TB500 e GHK-Cu. A investigação destes componentes inclui inflamação e reparação dos tecidos; não são resultados clínicos da mistura.","es":"La ficha indica KPV, BPC-157, TB500 y GHK-Cu. La investigación de estos componentes incluye inflamación y reparación de tejidos; no son resultados clínicos de la mezcla."},"cjc-no-dac-ipamorelin":{"fr":"Association autour de la libération d’hormone de croissance (GH). L’ipamoreline stimule cette libération dans des études chez des volontaires humains.","en":"A combination related to growth hormone (GH) release. Ipamorelin stimulated GH release in studies involving human volunteers.","pt":"Associação relacionada com a libertação de hormona do crescimento (GH). A ipamorelina estimulou essa libertação em estudos com voluntários humanos.","es":"Combinación relacionada con la liberación de hormona del crecimiento (GH). La ipamorelina estimuló esa liberación en estudios con voluntarios humanos."},"semax":{"fr":"Concentration et cognition : axes de recherche du Semax. Des effets sur la neuroprotection ont été observés dans des modèles chez le rat.","en":"Concentration and cognition are areas of Semax research. Effects related to neuroprotection have been observed in rat models.","pt":"Concentração e cognição são áreas de investigação do Semax. Foram observados efeitos relacionados com a neuroproteção em modelos em ratos.","es":"La concentración y la cognición son áreas de investigación del Semax. Se han observado efectos relacionados con la neuroprotección en modelos en ratas."},"selank":{"fr":"Stress et anxiété : diminution de certains indicateurs anxieux observée dans des expériences chez le rat.","en":"Stress and anxiety: reductions in certain anxiety indicators have been observed in rat experiments.","pt":"Stress e ansiedade: foi observada uma redução de alguns indicadores de ansiedade em experiências com ratos.","es":"Estrés y ansiedad: se observó una reducción de algunos indicadores de ansiedad en experimentos con ratas."},"retatrutide":{"fr":"Agit sur les récepteurs GLP-1, GIP et glucagon. Une baisse de la faim et du poids a été observée dans des essais chez l’humain.","en":"Acts on GLP-1, GIP and glucagon receptors. Reduced hunger and body weight have been observed in human clinical trials.","pt":"Atua nos recetores GLP-1, GIP e glucagon. Foram observadas reduções da fome e do peso em ensaios em humanos.","es":"Actúa sobre los receptores GLP-1, GIP y glucagón. Se observaron reducciones del hambre y del peso en ensayos en humanos."},"mots-c":{"fr":"Métabolisme : amélioration de la sensibilité à l’insuline observée dans des études chez la souris.","en":"Metabolism: improved insulin sensitivity has been observed in mouse studies.","pt":"Metabolismo: foi observada uma melhoria da sensibilidade à insulina em estudos com ratinhos.","es":"Metabolismo: se observó una mejora de la sensibilidad a la insulina en estudios con ratones."},"nad":{"fr":"Énergie cellulaire : coenzyme naturellement impliquée dans les réactions qui permettent de produire de l’énergie.","en":"Cellular energy: a coenzyme naturally involved in reactions that help produce energy.","pt":"Energia celular: coenzima naturalmente envolvida em reações que permitem produzir energia.","es":"Energía celular: coenzima que participa de forma natural en las reacciones que permiten producir energía."},"l-carnitine":{"fr":"Métabolisme énergétique : transporte les acides gras vers les mitochondries pour qu’ils puissent servir de carburant, notamment aux muscles.","en":"Energy metabolism: transports fatty acids to mitochondria so they can be used as fuel, particularly in muscles.","pt":"Metabolismo energético: transporta ácidos gordos para as mitocôndrias para serem utilizados como combustível, nomeadamente nos músculos.","es":"Metabolismo energético: transporta ácidos grasos a las mitocondrias para utilizarlos como combustible, especialmente en los músculos."},"epitalon":{"fr":"Vieillissement cellulaire : activation de la télomérase et allongement des télomères observés dans des cultures de cellules humaines.","en":"Cellular ageing: telomerase activation and telomere elongation have been observed in cultures of human cells.","pt":"Envelhecimento celular: ativação da telomerase e alongamento dos telómeros observados em culturas de células humanas.","es":"Envejecimiento celular: se observaron activación de la telomerasa y alargamiento de los telómeros en cultivos de células humanas."},"melanotan-i":{"fr":"Pigmentation : stimulation de la production de mélanine, le pigment de la peau.","en":"Pigmentation: stimulates production of melanin, the pigment in skin.","pt":"Pigmentação: estimula a produção de melanina, o pigmento da pele.","es":"Pigmentación: estimula la producción de melanina, el pigmento de la piel."},"dsip":{"fr":"Sommeil : effets variables dans de petites études humaines, avec une amélioration de certains paramètres dans certaines études.","en":"Sleep: mixed findings in small human studies, with improvements in some measures in certain studies.","pt":"Sono: resultados variáveis em pequenos estudos em humanos, com melhorias de alguns parâmetros em certos estudos.","es":"Sueño: resultados variables en pequeños estudios en humanos, con mejoras de algunos parámetros en ciertos estudios."},"glutathion":{"fr":"Antioxydant naturellement présent dans le corps : contribue à protéger les cellules contre le stress oxydatif.","en":"A naturally occurring antioxidant that helps protect cells from oxidative stress.","pt":"Antioxidante naturalmente presente no organismo que ajuda a proteger as células do stress oxidativo.","es":"Antioxidante presente de forma natural en el cuerpo que contribuye a proteger las células del estrés oxidativo."}};
function updateMascotGuide(){
 const vial=VIALS[activeVial];if(!vial)return;
 const entry=window.ScarlsFAQ?.entries.find(e=>e.id===activeVial);
 const text=(entry?.answer||MASCOT_COPY[activeVial])?.[homeLanguage]||vial.notes?.[homeLanguage]||({fr:"Retrouvez les informations de cette référence dans le catalogue.",en:"Find information about this reference in the catalogue.",pt:"Consulte as informações desta referência no catálogo.",es:"Consulta la información de esta referencia en el catálogo."})[homeLanguage];
 document.getElementById("mascotProduct").textContent=vial.name;
 document.getElementById("mascotSpeech").textContent=text;
 const index=Math.max(0,VIAL_ORDER.indexOf(activeVial)),cell=index%12;
 const pose=document.getElementById("mascotPose");
 pose.style.backgroundPosition=`${(cell%4)*100/3}% ${Math.floor(cell/4)*50}%`;
 pose.style.transform=index>=12?"scaleX(-1)":"none";
}
/* HOME_COPY_START */
const HOME_COPY = {"fr":{"announcementTitle":"Nouveau prix, grand stock !","announcementLink":"Voir les nouveaux prix","eyebrow":"Collection de recherche / Scarl’s Peptides","title":"Scarl’s","titleAccent":"Peptides.","lead":"Explorez les références. Trouvez votre format. Composez votre sélection.","catalogue":"Explorer le catalogue","research":"Destiné exclusivement à la recherche.","signature":"La recherche. Sous un autre angle.","scroll":"Parcourir les références","selectionEye":"Dans le catalogue","selectionTitle":"Les références.","all":"Tout le catalogue","ghk":"Peau & matrice extracellulaire","reta":"Recherche métabolique","nad":"Biologie cellulaire","semax":"Neurobiologie & cognition","contactEye":"Contact","contactTitle":"Une question sur une référence ?","contactText":"Envoyez-nous son nom sur WhatsApp. Précisez le format ou la documentation que vous recherchez.","contact":"Écrire sur WhatsApp","noteLabel":"Cadre de recherche","note":"Les références présentées ne sont pas destinées à l’utilisation humaine ou animale. Le catalogue permet de préparer une demande d’information ; aucune commande ni aucun paiement n’est traité sur ce site.","view":"Voir dans le catalogue","vial":"Fiole","announcementText":"Un énorme réassort arrive."},"en":{"announcementTitle":"New prices, plenty in stock!","announcementLink":"See the new prices","eyebrow":"Research collection / Scarl’s Peptides","title":"Scarl’s","titleAccent":"Peptides.","lead":"Explore the references. Find your format. Build your selection.","catalogue":"Explore the catalogue","research":"For research use only.","signature":"Research. From a different perspective.","scroll":"Browse the references","selectionEye":"In the catalogue","selectionTitle":"The references.","all":"Full catalogue","ghk":"Skin & extracellular matrix","reta":"Metabolic research","nad":"Cell biology","semax":"Neurobiology & cognition","contactEye":"Contact","contactTitle":"A question about a reference?","contactText":"Send us its name on WhatsApp. Tell us which format or documentation you need.","contact":"Write on WhatsApp","noteLabel":"Research context","note":"These references are not intended for human or animal use. The catalogue helps you prepare an information request; no orders or payments are processed on this website.","view":"View in the catalogue","vial":"Vial","announcementText":"A huge restock is coming."},"pt":{"announcementTitle":"Novos preços, muito stock!","announcementLink":"Ver os novos preços","eyebrow":"Coleção de investigação / Scarl’s Peptides","title":"Scarl’s","titleAccent":"Peptides.","lead":"Explore as referências. Encontre o seu formato. Prepare a sua seleção.","catalogue":"Explorar o catálogo","research":"Exclusivamente para investigação.","signature":"A investigação. Sob outro ângulo.","scroll":"Explorar as referências","selectionEye":"No catálogo","selectionTitle":"As referências.","all":"Todo o catálogo","ghk":"Pele e matriz extracelular","reta":"Investigação metabólica","nad":"Biologia celular","semax":"Neurobiologia e cognição","contactEye":"Contacto","contactTitle":"Uma questão sobre uma referência?","contactText":"Envie-nos o nome no WhatsApp. Indique o formato ou a documentação que procura.","contact":"Escrever no WhatsApp","noteLabel":"Contexto de investigação","note":"Estas referências não se destinam a utilização humana ou animal. O catálogo permite preparar um pedido de informação; não são processadas encomendas nem pagamentos neste site.","view":"Ver no catálogo","vial":"Frasco","announcementText":"Uma grande reposição está a chegar."},"es":{"announcementTitle":"¡Nuevos precios, mucho stock!","announcementLink":"Ver los nuevos precios","eyebrow":"Colección de investigación / Scarl’s Peptides","title":"Scarl’s","titleAccent":"Peptides.","lead":"Explora las referencias. Encuentra tu formato. Prepara tu selección.","catalogue":"Explorar el catálogo","research":"Exclusivamente para investigación.","signature":"La investigación. Desde otro ángulo.","scroll":"Explorar las referencias","selectionEye":"En el catálogo","selectionTitle":"Las referencias.","all":"Todo el catálogo","ghk":"Piel y matriz extracelular","reta":"Investigación metabólica","nad":"Biología celular","semax":"Neurobiología y cognición","contactEye":"Contacto","contactTitle":"¿Una pregunta sobre una referencia?","contactText":"Envíanos su nombre por WhatsApp. Indica el formato o la documentación que buscas.","contact":"Escribir por WhatsApp","noteLabel":"Contexto de investigación","note":"Estas referencias no están destinadas al uso humano o animal. El catálogo permite preparar una solicitud de información; no se procesan pedidos ni pagos en este sitio.","view":"Ver en el catálogo","vial":"Vial","announcementText":"Se acerca una gran reposición."}};
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
 if(!vial)return;
 image.alt=`${copy.vial} ${vial.name} ${vial.dose}`;
 updateMascotGuide();
 scene.style.setProperty('--vial-backdrop',`url(${vial.backdrop || 'glacier-night.webp'})`);
 document.getElementById('sceneDescription').textContent=vial.dose+' · '+new Intl.NumberFormat({fr:'fr-FR',en:'en-GB',pt:'pt-PT',es:'es-ES'}[homeLanguage],{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(vial.priceCents/100);
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
choices.innerHTML=VIAL_ORDER.map(key=>`<button class="vial-choice${key===activeVial?' active':''}" type="button" data-vial="${window.ScarlsProducts.escapeHTML(key)}" aria-pressed="${key===activeVial}">${window.ScarlsProducts.escapeHTML(VIALS[key].name)}</button>`).join('');
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
  const asset=new Image();asset.src=VIALS[next].image;
  const backdrop=new Image();backdrop.src=VIALS[next].backdrop || 'glacier-night.webp';
  await Promise.all([asset.decode(),backdrop.decode()]);
  const animate=!reducedMotion.matches&&typeof image.animate==='function';
  if(animate){const exit=image.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-direction*16}px)`}],{duration:150,fill:'forwards'});await exit.finished.catch(()=>{});exit.cancel();}
  activeVial=next;image.src=asset.src;
  document.getElementById('sceneNumber').textContent=`${String(VIAL_ORDER.indexOf(next)+1).padStart(2,'0')} / ${VIAL_ORDER.length}`;
  document.getElementById('sceneLink').href=`produits.html#${next}`;
  choices.querySelectorAll('[data-vial]').forEach(button=>{const active=button.dataset.vial===next;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));if(active)choices.scrollTo({left:button.offsetLeft-choices.offsetLeft-(choices.clientWidth-button.clientWidth)/2,behavior:'auto'});});
  updateSceneCopy();if(animate)image.animate([{opacity:0,transform:`translateX(${direction*20}px)`},{opacity:1,transform:'translateX(0)'}],{duration:260,easing:'cubic-bezier(.2,.7,.2,1)'});
 } catch { /* Keep the current reference if the next image cannot load. */ }
 finally {transitioning=false;}
}
updateSceneCopy();


let homeSyncBusy=false;
async function refreshHomeCatalogue(){
 updateMascotGuide();
 if(homeSyncBusy)return;homeSyncBusy=true;
 try{
  const snapshot=await window.ScarlsProducts.refresh();if(!snapshot.changed)return;
  for(const key of Object.keys(VIALS))delete VIALS[key];
  for(const p of window.ScarlsProducts.items)if(p.image)VIALS[p.id]=p;
  VIAL_ORDER.splice(0,VIAL_ORDER.length,...Object.keys(VIALS));
  if(!VIALS[activeVial])activeVial=VIAL_ORDER[0];
  scene.hidden=!activeVial;
  choices.innerHTML=VIAL_ORDER.map(key=>`<button class="vial-choice${key===activeVial?' active':''}" type="button" data-vial="${window.ScarlsProducts.escapeHTML(key)}" aria-pressed="${key===activeVial}">${window.ScarlsProducts.escapeHTML(VIALS[key].name)}</button>`).join('');
  if(activeVial){image.src=VIALS[activeVial].image;document.getElementById('sceneNumber').textContent=String(VIAL_ORDER.indexOf(activeVial)+1).padStart(2,'0')+' / '+VIAL_ORDER.length;document.getElementById('sceneLink').href='produits.html#'+encodeURIComponent(activeVial);updateSceneCopy();}
  document.querySelectorAll('.reference').forEach(card=>{
   const link=card.matches('a')?card:card.querySelector('a[href*="produits.html#"]');if(!link)return;
   const id=link.getAttribute('href').split('#')[1];const p=window.ScarlsProducts.items.find(p=>p.id===id);card.hidden=!p;
   if(p){card.querySelector('h3').textContent=p.name;card.querySelector('.reference-name span').textContent=p.dose;const pic=card.querySelector('img');if(pic&&p.image){pic.src=p.image;pic.alt=p.name+' '+p.dose;}link.href='produits.html#'+encodeURIComponent(p.id);}
  });
 }catch{/* The static presentation remains available; selection checks live stock. */}
 finally{homeSyncBusy=false}
}
refreshHomeCatalogue();
setInterval(()=>{if(!document.hidden)refreshHomeCatalogue()},30000);
window.addEventListener('focus',refreshHomeCatalogue);
