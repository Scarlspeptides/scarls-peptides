const HOME_COPY = {
  fr: {eyebrow:'Scarl’s Peptides / Catalogue de recherche',title:'La recherche.',titleAccent:'Sous un autre angle.',lead:'Des références à explorer. Des formats à comparer. Et un échange direct pour toutes vos questions.',catalogue:'Découvrir le catalogue',research:'Destiné exclusivement à la recherche.',inFocus:'Sous la lumière',signature:'Scarl’s Peptides — Recherche uniquement.',scroll:'Parcourir les références',selectionEye:'Dans le catalogue',selectionTitle:'Quelques points de départ.',all:'Les 12 références',ghk:'Peau & matrice extracellulaire',reta:'Recherche métabolique',nad:'Biologie cellulaire',semax:'Neurobiologie & cognition',contactEye:'Le contact, simplement.',contactTitle:'Une référence en tête ?',contactAccent:'Parlons-en.',contactText:'Une question sur un format ou la documentation ? Envoyez-nous les références qui vous intéressent sur WhatsApp.',contact:'Contacter Scarl’s',noteLabel:'Cadre de recherche',note:'Les références présentées ne sont pas destinées à l’utilisation humaine ou animale. Le catalogue permet de préparer une demande d’information ; aucune commande ni aucun paiement n’est traité sur ce site.',pause:'Pause',play:'Animer',hint:'Déplacez le pointeur pour explorer la fiole.',touchHint:'Glissez sur la fiole pour l’incliner.',staticHint:'Animation désactivée selon vos préférences.',sceneLabel:'Fiole interactive. Utilisez les flèches pour l’incliner, Échap pour recentrer.',view:'Voir dans le catalogue',vial:'Fiole'},
  en: {eyebrow:'Scarl’s Peptides / Research catalogue',title:'Research.',titleAccent:'From another angle.',lead:'References to explore. Formats to compare. A direct conversation for all your questions.',catalogue:'Discover the catalogue',research:'For research use only.',inFocus:'In the light',signature:'A closer look at the material.',scroll:'Browse the references',selectionEye:'In the catalogue',selectionTitle:'A few starting points.',all:'All 12 references',ghk:'Skin & extracellular matrix',reta:'Metabolic research',nad:'Cell biology',semax:'Neurobiology & cognition',contactEye:'Let’s talk.',contactTitle:'Have a reference in mind?',contactAccent:'Get in touch.',contactText:'A question about a format or documentation? Send us the references you are interested in on WhatsApp.',contact:'Contact Scarl’s',noteLabel:'Research context',note:'These references are not intended for human or animal use. The catalogue helps you prepare an information request; no orders or payments are processed on this website.',pause:'Pause',play:'Animate',hint:'Move your pointer to explore the vial.',touchHint:'Swipe across the vial to tilt it.',staticHint:'Animation disabled according to your preferences.',sceneLabel:'Interactive vial. Use arrow keys to tilt it, Escape to reset.',view:'View in the catalogue',vial:'Vial'},
  pt: {eyebrow:'Scarl’s Peptides / Catálogo de investigação',title:'A investigação.',titleAccent:'Sob outro ângulo.',lead:'Referências para explorar. Formatos para comparar. E contacto direto para as suas questões.',catalogue:'Descobrir o catálogo',research:'Exclusivamente para investigação.',inFocus:'Sob a luz',signature:'Um olhar sobre a matéria.',scroll:'Explorar as referências',selectionEye:'No catálogo',selectionTitle:'Alguns pontos de partida.',all:'As 12 referências',ghk:'Pele e matriz extracelular',reta:'Investigação metabólica',nad:'Biologia celular',semax:'Neurobiologia e cognição',contactEye:'Vamos conversar.',contactTitle:'Tem uma referência em mente?',contactAccent:'Fale connosco.',contactText:'Uma questão sobre um formato ou a documentação? Envie-nos as referências que lhe interessam pelo WhatsApp.',contact:'Contactar a Scarl’s',noteLabel:'Contexto de investigação',note:'Estas referências não se destinam a utilização humana ou animal. O catálogo permite preparar um pedido de informação; não são processadas encomendas nem pagamentos neste site.',pause:'Pausa',play:'Animar',hint:'Mova o cursor para explorar o frasco.',touchHint:'Deslize sobre o frasco para o inclinar.',staticHint:'Animação desativada de acordo com as suas preferências.',sceneLabel:'Frasco interativo. Use as setas para inclinar e Escape para recentrar.',view:'Ver no catálogo',vial:'Frasco'},
  es: {eyebrow:'Scarl’s Peptides / Catálogo de investigación',title:'La investigación.',titleAccent:'Desde otro ángulo.',lead:'Referencias para explorar. Formatos para comparar. Y contacto directo para todas tus preguntas.',catalogue:'Descubrir el catálogo',research:'Exclusivamente para investigación.',inFocus:'Bajo la luz',signature:'Una mirada a la materia.',scroll:'Explorar las referencias',selectionEye:'En el catálogo',selectionTitle:'Algunos puntos de partida.',all:'Las 12 referencias',ghk:'Piel y matriz extracelular',reta:'Investigación metabólica',nad:'Biología celular',semax:'Neurobiología y cognición',contactEye:'Hablemos.',contactTitle:'¿Tienes una referencia en mente?',contactAccent:'Escríbenos.',contactText:'¿Una pregunta sobre un formato o la documentación? Envíanos las referencias que te interesan por WhatsApp.',contact:'Contactar con Scarl’s',noteLabel:'Contexto de investigación',note:'Estas referencias no están destinadas al uso humano o animal. El catálogo permite preparar una solicitud de información; no se procesan pedidos ni pagos en este sitio.',pause:'Pausa',play:'Animar',hint:'Mueve el cursor para explorar el vial.',touchHint:'Desliza sobre el vial para inclinarlo.',staticHint:'Animación desactivada según tus preferencias.',sceneLabel:'Vial interactivo. Usa las flechas para inclinarlo y Escape para centrarlo.',view:'Ver en el catálogo',vial:'Vial'}
};
const VIALS = {
  reta: {name:'Retatrutide',src:'retatrutide-clean.png',hash:'retatrutide',dose:'10 mg',description:{fr:'Recherche métabolique',en:'Metabolic research',pt:'Investigação metabólica',es:'Investigación metabólica'}},
  ghk: {name:'GHK-Cu',src:'ghk-cu-clean.png',hash:'ghk-cu',dose:'100 mg',description:{fr:'Peau & matrice extracellulaire',en:'Skin & extracellular matrix',pt:'Pele e matriz extracelular',es:'Piel y matriz extracelular'}},
  semax: {name:'Semax',src:'semax-clean.png',hash:'semax',dose:'5 mg',description:{fr:'Neurobiologie & cognition',en:'Neurobiology & cognition',pt:'Neurobiologia e cognição',es:'Neurobiología y cognición'}},
  selank: {name:'Selank',src:'selank-clean.png',hash:'selank',dose:'5 mg',description:{fr:'Neurobiologie & stress',en:'Neurobiology & stress',pt:'Neurobiologia e stress',es:'Neurobiología y estrés'}},
  mots: {name:'MOTS-C',src:'mots-c-clean.png',hash:'mots-c',dose:'10 mg',description:{fr:'Métabolisme & énergie cellulaire',en:'Metabolism & cellular energy',pt:'Metabolismo e energia celular',es:'Metabolismo y energía celular'}},
  nad: {name:'NAD+',src:'nad-clean-v2.png',hash:'nad',dose:'100 mg',description:{fr:'Biologie cellulaire',en:'Cell biology',pt:'Biologia celular',es:'Biología celular'}},
  cjc: {name:'CJC no DAC + Ipamorelin',src:'cjc-no-dac-ipamorelin-clean.png',hash:'cjc-no-dac-ipamorelin',dose:'10 mg',description:{fr:'Mécanismes de croissance',en:'Growth mechanisms',pt:'Mecanismos de crescimento',es:'Mecanismos de crecimiento'}},
  klow: {name:'KLOW',src:'klow-clean.png',hash:'klow',dose:'80 mg',description:{fr:'Mécanismes de régénération',en:'Regeneration mechanisms',pt:'Mecanismos de regeneração',es:'Mecanismos de regeneración'}},
  epitalon: {name:'Epitalon',src:'epitalon-clean.png',hash:'epitalon',dose:'10 mg',description:{fr:'Vieillissement cellulaire',en:'Cellular ageing',pt:'Envelhecimento celular',es:'Envejecimiento celular'}},
  melanotan: {name:'Melanotan I',src:'melanotan-i-clean.png',hash:'melanotan-i',dose:'10 mg',description:{fr:'Recherche sur la pigmentation',en:'Pigmentation research',pt:'Investigação sobre pigmentação',es:'Investigación sobre pigmentación'}},
  glutathion: {name:'Glutathion',src:'glutathion-clean.png',hash:'glutathion',dose:'600 mg',description:{fr:'Systèmes antioxydants',en:'Antioxidant systems',pt:'Sistemas antioxidantes',es:'Sistemas antioxidantes'}},
  carnitine: {name:'L-Carnitine',src:'l-carnitine-clean.png',hash:'l-carnitine',dose:'1200 mg',description:{fr:'Métabolisme énergétique',en:'Energy metabolism',pt:'Metabolismo energético',es:'Metabolismo energético'}}
};
const VIAL_ORDER = Object.keys(VIALS);
const CAROUSEL_COPY = {
  fr:{previous:'Référence précédente',next:'Référence suivante',choose:'Choisir une référence',hint:'Glissez sur la fiole pour changer de référence.',touchHint:'Balayez la fiole pour changer de référence.'},
  en:{previous:'Previous reference',next:'Next reference',choose:'Choose a reference',hint:'Drag the vial to change reference.',touchHint:'Swipe the vial to change reference.'},
  pt:{previous:'Referência anterior',next:'Referência seguinte',choose:'Escolher uma referência',hint:'Arraste o frasco para mudar de referência.',touchHint:'Deslize o frasco para mudar de referência.'},
  es:{previous:'Referencia anterior',next:'Referencia siguiente',choose:'Elegir una referencia',hint:'Arrastra el vial para cambiar de referencia.',touchHint:'Desliza el vial para cambiar de referencia.'}
};
const experience = document.getElementById('vialExperience');
const scene = document.getElementById('vialScene');
const tilt = document.getElementById('sceneTilt');
const scrollLayer = document.getElementById('sceneScroll');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let homeLanguage = 'fr', activeVial = 'reta', paused = reducedMotion.matches, sceneVisible = true, tiltX = 0, tiltY = 0, scrollFrame = 0, transitioning = false, swipeStart = null;
function updateSceneCopy() {
  const copy = HOME_COPY[homeLanguage], vial = VIALS[activeVial];
  document.getElementById('sceneDescription').textContent = `${vial.description[homeLanguage]} · ${vial.dose}`;
  document.getElementById('sceneImage').alt = `${copy.vial} ${vial.name} ${vial.dose}`;
  document.getElementById('sceneLink').setAttribute('aria-label', `${vial.name} — ${copy.view}`);
  scene.setAttribute('aria-label', copy.sceneLabel);
  document.getElementById('motionText').textContent = paused ? copy.play : copy.pause;
  document.getElementById('motionIcon').textContent = paused ? '▷' : 'Ⅱ';
  const carousel = CAROUSEL_COPY[homeLanguage];
  document.getElementById('sceneHint').textContent = matchMedia('(pointer: coarse)').matches ? carousel.touchHint : carousel.hint;
  document.getElementById('vialPrevious').setAttribute('aria-label', carousel.previous);
  document.getElementById('vialNext').setAttribute('aria-label', carousel.next);
  document.getElementById('vialChoices').setAttribute('aria-label', carousel.choose);
}
function setPageLang(language) {
  homeLanguage = HOME_COPY[language] ? language : 'fr';
  document.querySelectorAll('[data-copy]').forEach(node => { node.textContent = HOME_COPY[homeLanguage][node.dataset.copy]; });
  updateSceneCopy();
}
function resetScene() {
  tiltX = 0; tiltY = 0; tilt.style.transform = '';
  experience.style.setProperty('--scene-x', '50%'); experience.style.setProperty('--scene-y', '45%');
}
function renderTilt() { tilt.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`; }
scene.addEventListener('pointermove', event => {
  if (paused || reducedMotion.matches) return;
  const rect = scene.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
  tiltX = (y - .5) * -12; tiltY = (x - .5) * 26; renderTilt();
  experience.style.setProperty('--scene-x', `${x * 100}%`); experience.style.setProperty('--scene-y', `${y * 100}%`);
});
['pointerleave', 'pointercancel', 'blur'].forEach(name => scene.addEventListener(name, resetScene));
scene.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape'].includes(event.key)) return;
  if (event.key === 'Escape') { resetScene(); return; }
  if (paused || reducedMotion.matches) return;
  event.preventDefault();
  tiltY = Math.max(-13, Math.min(13, tiltY + (event.key === 'ArrowLeft' ? -3 : event.key === 'ArrowRight' ? 3 : 0)));
  tiltX = Math.max(-6, Math.min(6, tiltX + (event.key === 'ArrowUp' ? 2 : event.key === 'ArrowDown' ? -2 : 0))); renderTilt();
});
function syncMotion() {
  experience.classList.toggle('is-paused', paused || reducedMotion.matches);
  document.getElementById('motionToggle').setAttribute('aria-pressed', String(paused));
  document.getElementById('motionToggle').hidden = reducedMotion.matches;
  if (paused || reducedMotion.matches) { resetScene(); scrollLayer.style.transform = ''; }
  updateSceneCopy();
}
document.getElementById('motionToggle').addEventListener('click', () => { paused = !paused; syncMotion(); });
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; syncMotion(); });
const choices = document.getElementById('vialChoices');
choices.innerHTML = VIAL_ORDER.map((key, index) => `<button class="vial-choice${index === 0 ? ' active' : ''}" type="button" data-vial="${key}" aria-pressed="${index === 0}">${VIALS[key].name}</button>`).join('');
choices.addEventListener('click', event => {
  const button = event.target.closest('[data-vial]');
  if (button) showVial(button.dataset.vial);
});
document.getElementById('vialPrevious').addEventListener('click', () => stepVial(-1));
document.getElementById('vialNext').addEventListener('click', () => stepVial(1));
function stepVial(direction) {
  const index = VIAL_ORDER.indexOf(activeVial);
  showVial(VIAL_ORDER[(index + direction + VIAL_ORDER.length) % VIAL_ORDER.length], direction);
}
scene.addEventListener('pointerdown', event => { swipeStart = {x:event.clientX,y:event.clientY,id:event.pointerId}; try { scene.setPointerCapture(event.pointerId); } catch {} });
scene.addEventListener('pointerup', event => {
  if (!swipeStart || swipeStart.id !== event.pointerId) return;
  const dx = event.clientX - swipeStart.x, dy = event.clientY - swipeStart.y;
  swipeStart = null;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) {
    resetScene();
    stepVial(dx < 0 ? 1 : -1);
  }
});
scene.addEventListener('pointercancel', () => { swipeStart = null; resetScene(); });
async function showVial(next, direction = 0) {
  if (!VIALS[next] || next === activeVial || transitioning) return;
  transitioning = true;
  const asset = new Image();
  asset.src = VIALS[next].src;
  try { await asset.decode(); } catch {
    transitioning = false;
    return;
  }
  const index = VIAL_ORDER.indexOf(next);
  const fromIndex = VIAL_ORDER.indexOf(activeVial);
  const move = direction || (index > fromIndex ? 1 : -1);
  const animate = !paused && !reducedMotion.matches;
  const image = document.getElementById('sceneImage');
  const reflection = document.getElementById('sceneReflection');
  const word = document.getElementById('sceneWord');
  if (animate) {
    const exit = image.animate([{opacity:1,transform:'translateX(0) scale(1)'},{opacity:0,transform:`translateX(${-move * 32}px) scale(.96)`}],{duration:230,easing:'ease-in',fill:'forwards'});
    const reflectionExit = reflection.animate([{opacity:.12},{opacity:0}],{duration:230,fill:'forwards'});
    const wordExit = word.animate([{opacity:1},{opacity:0}],{duration:230,fill:'forwards'});
    await Promise.all([exit.finished,reflectionExit.finished,wordExit.finished]);
    exit.cancel(); reflectionExit.cancel(); wordExit.cancel();
  }
  activeVial = next;
  const vial = VIALS[next];
  image.src = vial.src; reflection.src = vial.src;
  word.textContent = vial.name.toUpperCase();
  word.classList.toggle('long-name', vial.name.length > 9);
  word.classList.toggle('very-long-name', vial.name.length > 16);
  document.getElementById('sceneName').textContent = vial.name;
  document.getElementById('sceneNumber').textContent = `${String(index + 1).padStart(2,'0')} / ${VIAL_ORDER.length}`;
  document.getElementById('sceneLink').href = `produits.html#${vial.hash}`;
  document.querySelector('.scene-side').textContent = `SCARL’S / ${vial.dose.toUpperCase()}`;
  choices.querySelectorAll('[data-vial]').forEach(button => {
    const active = button.dataset.vial === next;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    if (active) choices.scrollTo({left:button.offsetLeft - choices.offsetLeft - (choices.clientWidth - button.clientWidth) / 2,behavior:animate ? 'smooth' : 'instant'});
  });
  resetScene(); updateSceneCopy();
  if (animate) {
    image.animate([{opacity:0,transform:`translateX(${move * 32}px) scale(.96)`},{opacity:1,transform:'translateX(0) scale(1)'}],{duration:380,easing:'cubic-bezier(.2,.7,.2,1)'});
    reflection.animate([{opacity:0},{opacity:.12}],{duration:380,easing:'ease-out'});
    word.animate([{opacity:0},{opacity:1}],{duration:420,easing:'ease-out'});
  }
  transitioning = false;
}
function syncVisibility() { experience.classList.toggle('is-away', !sceneVisible || document.hidden); }
if ('IntersectionObserver' in window) new IntersectionObserver(entries => { sceneVisible = entries[0].isIntersecting; syncVisibility(); }, {threshold:0}).observe(experience);
document.addEventListener('visibilitychange', syncVisibility);
window.addEventListener('scroll', () => {
  if (paused || reducedMotion.matches || !sceneVisible || document.hidden || scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; scrollLayer.style.transform = `translateY(${Math.min(window.scrollY * .045, 18)}px)`; });
}, {passive:true});
syncMotion();
