// The notice is a separate entry page; a session acknowledgement allows navigation.
try {
  if (sessionStorage.getItem('scarlAgeAcknowledgedV1') !== 'yes' && !location.pathname.endsWith('/avertissement.html')) {
    location.replace('avertissement.html');
  }
} catch {
  if (!location.pathname.endsWith('/avertissement.html')) location.replace('avertissement.html');
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
  updateAgeGate(language);
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

const AGE_GATE_COPY = {
  fr: {
    eyebrow:'Accès au site', title:'Avant de continuer.',
    lead:'Ce site est réservé aux personnes âgées de 18 ans ou plus.',
    note:'Les références sont présentées à des fins d’information scientifique et de recherche uniquement. Elles ne sont pas destinées à l’utilisation chez l’être humain ou l’animal. Le contenu ne constitue pas un conseil médical. Aucune commande ni aucun paiement ne sont effectués sur ce site.',
    confirm:'Je confirme avoir 18 ans ou plus et avoir pris connaissance de ces informations.',
    enter:'Entrer sur le site', leave:'Quitter le site'
  },
  en: {
    eyebrow:'Site access', title:'Before you continue.',
    lead:'This website is intended for visitors aged 18 or over.',
    note:'The references are presented for scientific information and research purposes only. They are not intended for human or animal use. The content is not medical advice. No orders or payments are processed on this website.',
    confirm:'I confirm that I am 18 or over and have read this information.',
    enter:'Enter website', leave:'Leave website'
  },
  pt: {
    eyebrow:'Acesso ao site', title:'Antes de continuar.',
    lead:'Este site destina-se a visitantes com 18 anos ou mais.',
    note:'As referências são apresentadas apenas para informação científica e investigação. Não se destinam à utilização em seres humanos ou animais. O conteúdo não constitui aconselhamento médico. Este site não processa encomendas nem pagamentos.',
    confirm:'Confirmo que tenho 18 anos ou mais e que li estas informações.',
    enter:'Entrar no site', leave:'Sair do site'
  },
  es: {
    eyebrow:'Acceso al sitio', title:'Antes de continuar.',
    lead:'Este sitio está destinado a visitantes de 18 años o más.',
    note:'Las referencias se presentan solo con fines de información científica e investigación. No están destinadas al uso humano ni animal. El contenido no constituye asesoramiento médico. Este sitio no procesa pedidos ni pagos.',
    confirm:'Confirmo que tengo 18 años o más y que he leído esta información.',
    enter:'Entrar al sitio', leave:'Salir del sitio'
  }
};

function updateAgeGate(lang) {
  const gate = document.getElementById('ageGate');
  if (!gate) return;
  const copy = AGE_GATE_COPY[lang] || AGE_GATE_COPY.fr;
  for (const key of ['eyebrow','title','lead','note','confirm','enter','leave']) {
    gate.querySelector('[data-age-copy="' + key + '"]').textContent = copy[key];
  }
  gate.querySelectorAll('[data-age-lang]').forEach(button => {
    const active = button.dataset.ageLang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function installAgeGate() {
  try { if (sessionStorage.getItem('scarlAgeAcknowledgedV1') === 'yes') return; } catch {}
  const gate = document.createElement('div');
  gate.id = 'ageGate';
  gate.className = 'age-gate';
  gate.innerHTML = `<section class="age-card" role="dialog" aria-modal="true" aria-labelledby="ageTitle" aria-describedby="ageLead ageNote">
    <div class="age-top"><span class="age-mark">SCARL’S PEPTIDES</span><div class="age-languages" aria-label="Language"><button type="button" data-age-lang="fr">FR</button><button type="button" data-age-lang="en">EN</button><button type="button" data-age-lang="pt">PT</button><button type="button" data-age-lang="es">ES</button></div></div>
    <p class="age-eyebrow" data-age-copy="eyebrow"></p>
    <h2 id="ageTitle" data-age-copy="title"></h2>
    <p class="age-lead" id="ageLead" data-age-copy="lead"></p>
    <p class="age-note" id="ageNote" data-age-copy="note"></p>
    <label class="age-check"><input id="ageConfirm" type="checkbox"><span data-age-copy="confirm"></span></label>
    <div class="age-actions"><button class="age-enter" id="ageEnter" type="button" disabled><span data-age-copy="enter"></span><span aria-hidden="true">↗</span></button><button class="age-leave" id="ageLeave" type="button" data-age-copy="leave"></button></div>
  </section>`;
  const background = [...document.body.children];
  document.body.appendChild(gate);
  background.forEach(node => { if (node !== gate) node.inert = true; });
  document.body.classList.add('age-gate-open');
  const confirm = gate.querySelector('#ageConfirm');
  const enter = gate.querySelector('#ageEnter');
  confirm.addEventListener('change', () => { enter.disabled = !confirm.checked; });
  enter.addEventListener('click', () => {
    if (!confirm.checked) return;
    try { sessionStorage.setItem('scarlAgeAcknowledgedV1', 'yes'); } catch {}
    background.forEach(node => { node.inert = false; });
    document.body.classList.remove('age-gate-open');
    gate.remove();
    document.querySelector('.brand')?.focus();
  });
  gate.querySelector('#ageLeave').addEventListener('click', () => { window.location.replace('about:blank'); });
  gate.querySelectorAll('[data-age-lang]').forEach(button => button.addEventListener('click', () => applyNav(button.dataset.ageLang)));
  gate.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...gate.querySelectorAll('button:not(:disabled), input')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  updateAgeGate(currentLang());
  confirm.focus();
}

document.addEventListener('DOMContentLoaded', () => {
  installMobileNav();
  document.querySelectorAll('.lang').forEach((button) => button.addEventListener('click', () => applyNav(button.dataset.lang)));
  applyNav(currentLang());
});
