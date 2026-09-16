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
  document.querySelectorAll('.main-nav a').forEach((link, index) => { link.textContent = NAV[language][index]; if (link.classList.contains('current')) link.setAttribute('aria-current', 'page'); });
  const footer = document.getElementById('footerText');
  if (footer) footer.textContent = FOOT[language];
  document.querySelectorAll('.lang').forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = button.dataset.lang.toUpperCase();
    button.setAttribute('aria-label', {fr:'Français',en:'English',pt:'Português',es:'Español'}[button.dataset.lang]);
  });
  try { localStorage.setItem('scarlLang', language); } catch {}
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
