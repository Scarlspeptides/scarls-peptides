// The notice is a separate entry page; a session acknowledgement allows navigation.
try {
  if (sessionStorage.getItem('scarlAgeAcknowledgedV1') !== 'yes' && !location.pathname.endsWith('/avertissement.html') && !location.pathname.endsWith('/informations-legales.html')) {
    const page = location.pathname.split('/').pop() || 'index.html';
    const next = /^(index|produits|apropos|livraison|faq|contact)\.html$/.test(page) ? page + location.hash : 'index.html';
    location.replace('avertissement.html?next=' + encodeURIComponent(next));
  }
} catch {
  if (!location.pathname.endsWith('/avertissement.html') && !location.pathname.endsWith('/informations-legales.html')) location.replace('avertissement.html');
}

const NAV = {
  fr: ['Accueil', 'Catalogue', 'À propos', 'Livraison', 'FAQ', 'Contact'],
  en: ['Home', 'Catalogue', 'About', 'Shipping', 'FAQ', 'Contact'],
  pt: ['Início', 'Catálogo', 'Sobre', 'Entrega', 'FAQ', 'Contacto'],
  es: ['Inicio', 'Catálogo', 'Nosotros', 'Envío', 'FAQ', 'Contacto']
};

const FOOT = {
  fr: 'Vitrine informative · Recherche uniquement · Utilisation humaine ou animale exclue',
  en: 'Informational showcase · Research use only · Not for human or animal use',
  pt: 'Vitrine informativa · Apenas investigação · Não destinado a uso humano ou animal',
  es: 'Vitrina informativa · Solo investigación · No destinado a uso humano ni animal'
};

function currentLang() { try { const lang = localStorage.getItem('scarlLang'); return NAV[lang] ? lang : 'fr'; } catch { return document.documentElement.lang || 'fr'; } }

function updateMenu(open) {
  const nav = document.querySelector('.main-nav'), toggle = document.querySelector('.menu-toggle');
  if (!nav || !toggle) return;
  const labels = {fr:['Ouvrir le menu','Fermer le menu'],en:['Open menu','Close menu'],pt:['Abrir menu','Fechar menu'],es:['Abrir menú','Cerrar menú']};
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', labels[currentLang()][Number(open)]);
  toggle.innerHTML = open ? '&times;' : '&#9776;';
}

function applyNav(lang) {
  const language = NAV[lang] ? lang : 'fr';
  document.documentElement.lang = language;
  const brand=document.querySelector('.site-header .brand');if(brand)brand.setAttribute('aria-label','Scarl’s Peptides — '+NAV[language][0]);
  const nav=document.querySelector('.main-nav');if(nav)nav.setAttribute('aria-label',{fr:'Navigation principale',en:'Main navigation',pt:'Navegação principal',es:'Navegación principal'}[language]);
  const langs=document.querySelector('.langs');if(langs)langs.setAttribute('aria-label',{fr:'Choisir la langue',en:'Choose language',pt:'Escolher idioma',es:'Elegir idioma'}[language]);
  document.querySelectorAll('.main-nav a').forEach((link, index) => { link.textContent = NAV[language][index]; if (link.classList.contains('current')) link.setAttribute('aria-current', 'page'); });
  document.querySelectorAll('.footer-in .legal-links a').forEach((link,index)=>{link.textContent=FOOTER_LINKS[language][index];link.lang=language;});
  document.querySelectorAll('.footer-contact').forEach(link=>link.textContent={fr:'Contact',en:'Contact',pt:'Contacto',es:'Contacto'}[language]);
  const footer = document.getElementById('footerText');
  if (footer) footer.textContent = FOOT[language];
  document.querySelectorAll('.lang').forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = button.dataset.lang.toUpperCase();
    button.lang = button.dataset.lang;
    button.setAttribute('aria-label', {fr:'Français',en:'English',pt:'Português',es:'Español'}[button.dataset.lang]);
  });
  try { localStorage.setItem('scarlLang', language); } catch {}
  const skip = document.querySelector('.skip-link');
  if (skip) skip.textContent = {fr:'Aller au contenu',en:'Skip to content',pt:'Ir para o conteúdo',es:'Ir al contenido'}[language];
  updateMenu(false);
  if (typeof setPageLang === 'function') setPageLang(language);

}

function installMobileNav() {
  const nav = document.querySelector('.main-nav');
  const header = document.querySelector('.header-in');
  if (!nav || !header || document.querySelector('.menu-toggle')) return;
  const toggle = document.createElement('button');
  toggle.className = 'menu-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Ouvrir le menu');
  toggle.setAttribute('aria-expanded', 'false');
  nav.id = 'mainNav';
  toggle.setAttribute('aria-controls', nav.id);
  toggle.innerHTML = '&#9776;';
  toggle.addEventListener('click', () => {
    updateMenu(!nav.classList.contains('open'));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => updateMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { updateMenu(false); toggle.focus(); } });
  document.addEventListener('click', event => { if (!header.contains(event.target)) updateMenu(false); });
  matchMedia('(max-width: 760px)').addEventListener('change', () => updateMenu(false));
  header.insertBefore(toggle, nav);
}

document.addEventListener('DOMContentLoaded', () => {
  installMobileNav();
  document.querySelectorAll('.lang').forEach((button) => button.addEventListener('click', () => applyNav(button.dataset.lang)));
  applyNav(currentLang());
});


const FOOTER_LINKS={fr:['Confidentialité & cookies','Conditions d’utilisation','Rétractation & réclamations','Mentions légales'],en:['Privacy & cookies (FR)','Terms of use (FR)','Withdrawal & complaints (FR)','Legal information (FR)'],pt:['Privacidade e cookies (FR)','Condições de utilização (FR)','Retratação e reclamações (FR)','Informações legais (FR)'],es:['Privacidad y cookies (FR)','Condiciones de uso (FR)','Desistimiento y reclamaciones (FR)','Información legal (FR)']};
