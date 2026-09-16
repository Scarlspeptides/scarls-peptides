const HOME_COPY = {
  fr: {eyebrow:'Scarl’s Peptides / Catalogue de recherche',title:'La recherche.',titleAccent:'Sous un autre angle.',lead:'Des références à explorer. Des formats à comparer. Et un échange direct pour toutes vos questions.',catalogue:'Découvrir le catalogue',research:'Destiné exclusivement à la recherche.',inFocus:'Sous la lumière',signature:'Scarl’s Peptides — Recherche uniquement.',scroll:'Parcourir les références',selectionEye:'Dans le catalogue',selectionTitle:'Quelques points de départ.',all:'Les 12 références',ghk:'Peau & matrice extracellulaire',reta:'Recherche métabolique',nad:'Biologie cellulaire',semax:'Neurobiologie & cognition',contactEye:'Le contact, simplement.',contactTitle:'Une référence en tête ?',contactAccent:'Parlons-en.',contactText:'Une question sur un format ou la documentation ? Envoyez-nous les références qui vous intéressent sur WhatsApp.',contact:'Contacter Scarl’s',noteLabel:'Cadre de recherche',note:'Les références présentées ne sont pas destinées à l’utilisation humaine ou animale. Le catalogue permet de préparer une demande d’information ; aucune commande ni aucun paiement n’est traité sur ce site.',pause:'Pause',play:'Animer',hint:'Déplacez le pointeur pour explorer la fiole.',touchHint:'Glissez sur la fiole pour l’incliner.',staticHint:'Animation désactivée selon vos préférences.',sceneLabel:'Fiole interactive. Utilisez les flèches pour l’incliner, Échap pour recentrer.',view:'Voir dans le catalogue',vial:'Fiole'},
  en: {eyebrow:'Scarl’s Peptides / Research catalogue',title:'Research.',titleAccent:'From another angle.',lead:'References to explore. Formats to compare. A direct conversation for all your questions.',catalogue:'Discover the catalogue',research:'For research use only.',inFocus:'In the light',signature:'A closer look at the material.',scroll:'Browse the references',selectionEye:'In the catalogue',selectionTitle:'A few starting points.',all:'All 12 references',ghk:'Skin & extracellular matrix',reta:'Metabolic research',nad:'Cell biology',semax:'Neurobiology & cognition',contactEye:'Let’s talk.',contactTitle:'Have a reference in mind?',contactAccent:'Get in touch.',contactText:'A question about a format or documentation? Send us the references you are interested in on WhatsApp.',contact:'Contact Scarl’s',noteLabel:'Research context',note:'These references are not intended for human or animal use. The catalogue helps you prepare an information request; no orders or payments are processed on this website.',pause:'Pause',play:'Animate',hint:'Move your pointer to explore the vial.',touchHint:'Swipe across the vial to tilt it.',staticHint:'Animation disabled according to your preferences.',sceneLabel:'Interactive vial. Use arrow keys to tilt it, Escape to reset.',view:'View in the catalogue',vial:'Vial'},
  pt: {eyebrow:'Scarl’s Peptides / Catálogo de investigação',title:'A investigação.',titleAccent:'Sob outro ângulo.',lead:'Referências para explorar. Formatos para comparar. E contacto direto para as suas questões.',catalogue:'Descobrir o catálogo',research:'Exclusivamente para investigação.',inFocus:'Sob a luz',signature:'Um olhar sobre a matéria.',scroll:'Explorar as referências',selectionEye:'No catálogo',selectionTitle:'Alguns pontos de partida.',all:'As 12 referências',ghk:'Pele e matriz extracelular',reta:'Investigação metabólica',nad:'Biologia celular',semax:'Neurobiologia e cognição',contactEye:'Vamos conversar.',contactTitle:'Tem uma referência em mente?',contactAccent:'Fale connosco.',contactText:'Uma questão sobre um formato ou a documentação? Envie-nos as referências que lhe interessam pelo WhatsApp.',contact:'Contactar a Scarl’s',noteLabel:'Contexto de investigação',note:'Estas referências não se destinam a utilização humana ou animal. O catálogo permite preparar um pedido de informação; não são processadas encomendas nem pagamentos neste site.',pause:'Pausa',play:'Animar',hint:'Mova o cursor para explorar o frasco.',touchHint:'Deslize sobre o frasco para o inclinar.',staticHint:'Animação desativada de acordo com as suas preferências.',sceneLabel:'Frasco interativo. Use as setas para inclinar e Escape para recentrar.',view:'Ver no catálogo',vial:'Frasco'},
  es: {eyebrow:'Scarl’s Peptides / Catálogo de investigación',title:'La investigación.',titleAccent:'Desde otro ángulo.',lead:'Referencias para explorar. Formatos para comparar. Y contacto directo para todas tus preguntas.',catalogue:'Descubrir el catálogo',research:'Exclusivamente para investigación.',inFocus:'Bajo la luz',signature:'Una mirada a la materia.',scroll:'Explorar las referencias',selectionEye:'En el catálogo',selectionTitle:'Algunos puntos de partida.',all:'Las 12 referencias',ghk:'Piel y matriz extracelular',reta:'Investigación metabólica',nad:'Biología celular',semax:'Neurobiología y cognición',contactEye:'Hablemos.',contactTitle:'¿Tienes una referencia en mente?',contactAccent:'Escríbenos.',contactText:'¿Una pregunta sobre un formato o la documentación? Envíanos las referencias que te interesan por WhatsApp.',contact:'Contactar con Scarl’s',noteLabel:'Contexto de investigación',note:'Estas referencias no están destinadas al uso humano o animal. El catálogo permite preparar una solicitud de información; no se procesan pedidos ni pagos en este sitio.',pause:'Pausa',play:'Animar',hint:'Mueve el cursor para explorar el vial.',touchHint:'Desliza sobre el vial para inclinarlo.',staticHint:'Animación desactivada según tus preferencias.',sceneLabel:'Vial interactivo. Usa las flechas para inclinarlo y Escape para centrarlo.',view:'Ver en el catálogo',vial:'Vial'}
};
const VIALS = {reta:{name:'Retatrutide',src:'retatrutide-clean.png',hash:'retatrutide',dose:'10 mg',number:'01 / 02'},ghk:{name:'GHK-Cu',src:'ghk-cu-clean.png',hash:'ghk-cu',dose:'100 mg',number:'02 / 02'}};
const experience = document.getElementById('vialExperience');
const scene = document.getElementById('vialScene');
const tilt = document.getElementById('sceneTilt');
const scrollLayer = document.getElementById('sceneScroll');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let homeLanguage = 'fr', activeVial = 'reta', paused = reducedMotion.matches, sceneVisible = true, tiltX = 0, tiltY = 0, scrollFrame = 0, changeId = 0;
function updateSceneCopy() {
  const copy = HOME_COPY[homeLanguage], vial = VIALS[activeVial];
  document.getElementById('sceneDescription').textContent = `${copy[activeVial]} · ${vial.dose}`;
  document.getElementById('sceneImage').alt = `${copy.vial} ${vial.name} ${vial.dose}`;
  document.getElementById('sceneLink').setAttribute('aria-label', `${vial.name} — ${copy.view}`);
  scene.setAttribute('aria-label', copy.sceneLabel);
  document.getElementById('motionText').textContent = paused ? copy.play : copy.pause;
  document.getElementById('motionIcon').textContent = paused ? '▷' : 'Ⅱ';
  document.getElementById('sceneHint').textContent = reducedMotion.matches ? copy.staticHint : matchMedia('(pointer: coarse)').matches ? copy.touchHint : copy.hint;
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
document.querySelectorAll('[data-vial]').forEach(button => button.addEventListener('click', async () => {
  const next = button.dataset.vial;
  const request = ++changeId;
  if (activeVial === next) return;
  const asset = new Image(); asset.src = VIALS[next].src;
  try { await asset.decode(); } catch { return; }
  if (request !== changeId) return;
  activeVial = next; const vial = VIALS[next];
  document.getElementById('sceneImage').src = vial.src; document.getElementById('sceneReflection').src = vial.src;
  document.getElementById('sceneWord').textContent = vial.name; document.getElementById('sceneName').textContent = vial.name;
  document.getElementById('sceneWord').classList.toggle('long-name', next === 'ghk' || next === 'reta');
  document.getElementById('sceneNumber').textContent = vial.number; document.getElementById('sceneLink').href = `produits.html#${vial.hash}`;
  document.querySelectorAll('[data-vial]').forEach(choice => { const active = choice.dataset.vial === next; choice.classList.toggle('active', active); choice.setAttribute('aria-pressed', String(active)); });
  if (!paused && !reducedMotion.matches) document.getElementById('sceneImage').animate([{opacity:.35,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}], {duration:420,easing:'ease-out'});
  resetScene(); updateSceneCopy();
}));
function syncVisibility() { experience.classList.toggle('is-away', !sceneVisible || document.hidden); }
if ('IntersectionObserver' in window) new IntersectionObserver(entries => { sceneVisible = entries[0].isIntersecting; syncVisibility(); }, {threshold:0}).observe(experience);
document.addEventListener('visibilitychange', syncVisibility);
window.addEventListener('scroll', () => {
  if (paused || reducedMotion.matches || !sceneVisible || document.hidden || scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; scrollLayer.style.transform = `translateY(${Math.min(window.scrollY * .045, 18)}px)`; });
}, {passive:true});
syncMotion();
