const DETAIL_TRANSLATIONS = {
  about: {
    fr: {eyebrow:'À propos', title:'Scarl’s Peptides.', lead:'Un catalogue dédié à la recherche, un contact direct en France.', rows:[['Une présence française','Nous échangeons avec vous en français, directement sur WhatsApp.'],['Depuis 2025','Scarl’s Peptides présente des références de recherche depuis 2025.'],['Une démarche informative','Le site est conçu comme une vitrine : il aide à consulter les références, sans prendre de commande ni de paiement.']], note:'Les références affichées ne sont pas destinées à une utilisation chez l’être humain ou l’animal.'},
    en: {eyebrow:'About', title:'Scarl’s Peptides.', lead:'A research catalogue and a direct point of contact in France.', rows:[['A French presence','Speak to us directly in French on WhatsApp.'],['Since 2025','Scarl’s Peptides has presented research references since 2025.'],['An informational approach','The site is a showcase: it helps visitors review references without handling orders or payments.']], note:'The listed references are not intended for use in humans or animals.'},
    pt: {eyebrow:'Sobre', title:'Scarl’s Peptides.', lead:'Um catálogo de investigação e contacto direto em França.', rows:[['Uma presença francesa','Uma identidade e comunicação pensadas para o mercado francês.'],['Desde 2025','Uma presença desenvolvida desde 2025 em torno de um catálogo de referências para investigação.'],['Uma abordagem informativa','O site é uma vitrine: ajuda a consultar referências sem gerir encomendas ou pagamentos.']], note:'As referências apresentadas não se destinam à utilização em seres humanos ou animais.'},
    es: {eyebrow:'Sobre nosotros', title:'Scarl’s Peptides.', lead:'Un catálogo de investigación y contacto directo en Francia.', rows:[['Una presencia francesa','Una identidad y comunicación diseñadas para el mercado francés.'],['Desde 2025','Una presencia desarrollada desde 2025 en torno a un catálogo de referencias para investigación.'],['Un enfoque informativo','El sitio es un escaparate: ayuda a consultar referencias sin gestionar pedidos ni pagos.']], note:'Las referencias mostradas no están destinadas al uso en humanos o animales.'}
  },
  shipping: {
    fr: {eyebrow:'Livraison', title:'À domicile ou en relais.', lead:'Livraison possible en point relais ou directement à domicile.', rows:[['Point relais','Retrait dans un point relais proche de chez vous.'],['Livraison à domicile','Réception directement à votre adresse.']], note:'Pour toute précision sur une demande, contactez-nous directement avant la livraison.'},
    en: {eyebrow:'Shipping', title:'At home or at a pickup point.', lead:'Delivery is available to a pickup point or directly to your home.', rows:[['Pickup point','Collect from a pickup point near you.'],['Home delivery','Receive directly at your address.']], note:'For any clarification about a request, please contact us directly before delivery.'},
    pt: {eyebrow:'Entrega', title:'Ao domicílio ou num ponto de recolha.', lead:'Entrega disponível num ponto de recolha ou diretamente ao domicílio.', rows:[['Ponto de recolha','Levantamento num ponto de recolha perto de si.'],['Entrega ao domicílio','Receção diretamente na sua morada.']], note:'Para qualquer esclarecimento sobre um pedido, contacte-nos diretamente antes da entrega.'},
    es: {eyebrow:'Envío', title:'A domicilio o en un punto de recogida.', lead:'Envío disponible a un punto de recogida o directamente a domicilio.', rows:[['Punto de recogida','Recogida en un punto cercano a ti.'],['Entrega a domicilio','Recepción directamente en tu dirección.']], note:'Para cualquier aclaración sobre una solicitud, contáctanos directamente antes del envío.'}
  },
  contact: {
    fr: {eyebrow:'Contact', title:'Une question sur le catalogue ?', lead:'Contactez-nous pour une demande d’information sur les références ou la documentation disponible.', cardTitle:'Échangeons directement.', cardText:'Notre équipe est joignable sur WhatsApp. Préparez votre sélection depuis le catalogue pour nous transmettre les références qui vous intéressent.'},
    en: {eyebrow:'Contact', title:'A question about the catalogue?', lead:'Contact us with an information request about the references or available documentation.', cardTitle:'Let’s speak directly.', cardText:'Our team is available on WhatsApp. Build your selection in the catalogue to share the references that interest you.'},
    pt: {eyebrow:'Contacto', title:'Uma questão sobre o catálogo?', lead:'Contacte-nos para um pedido de informação sobre as referências ou a documentação disponível.', cardTitle:'Falemos diretamente.', cardText:'A nossa equipa está disponível no WhatsApp. Prepare a sua seleção no catálogo para nos enviar as referências que lhe interessam.'},
    es: {eyebrow:'Contacto', title:'¿Una pregunta sobre el catálogo?', lead:'Contáctanos con una solicitud de información sobre las referencias o la documentación disponible.', cardTitle:'Hablemos directamente.', cardText:'Nuestro equipo está disponible en WhatsApp. Prepara tu selección en el catálogo para compartir las referencias que te interesan.'}
  }
};

function setPageLang(lang) {
  const page = document.body.dataset.page;
  const translations = DETAIL_TRANSLATIONS[page];
  const data = translations && (translations[lang] || translations.fr);
  if (!data) return;
  ['eyebrow', 'title', 'lead'].forEach((id) => { const node = document.getElementById(id); if (node) node.textContent = data[id]; });
  if (data.rows) data.rows.forEach((row, index) => { document.getElementById('h' + index).textContent = row[0]; document.getElementById('p' + index).textContent = row[1]; });
  if (data.note) document.getElementById('note').textContent = data.note;
  if (data.cardTitle) document.getElementById('cardTitle').textContent = data.cardTitle;
  if (data.cardText) document.getElementById('cardText').textContent = data.cardText;
}
