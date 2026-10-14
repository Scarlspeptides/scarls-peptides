// Public 2026 reference rates. This module neither books nor purchases shipping.
(function(root) {
 'use strict';
 const countries = [["FR", "France métropolitaine", 0], ["AL", "Albanie", 4], ["DE", "Allemagne", 1], ["AD", "Andorre", 4], ["AT", "Autriche", 2], ["BE", "Belgique", 1], ["BG", "Bulgarie", 3], ["CY", "Chypre", 3], ["HR", "Croatie", 3], ["DK", "Danemark", 2], ["ES", "Espagne", 2], ["EE", "Estonie", 3], ["FI", "Finlande", 2], ["GR", "Grèce", 2], ["HU", "Hongrie", 3], ["IE", "Irlande", 2], ["IS", "Islande", 4], ["IT", "Italie", 2], ["LV", "Lettonie", 3], ["LI", "Liechtenstein", 4], ["LT", "Lituanie", 3], ["LU", "Luxembourg", 1], ["MK", "Macédoine du Nord", 4], ["MT", "Malte", 3], ["MD", "Moldavie", 4], ["ME", "Monténégro", 4], ["NO", "Norvège", 4], ["NL", "Pays-Bas", 1], ["PL", "Pologne", 3], ["PT", "Portugal", 2], ["CZ", "République tchèque", 3], ["RO", "Roumanie", 3], ["GB", "Royaume-Uni", 2], ["RS", "Serbie", 4], ["SK", "Slovaquie", 3], ["SI", "Slovénie", 3], ["SE", "Suède", 2], ["CH", "Suisse", 4]];
 const rates = [[2340,2520,2880,4080,5400],[3480,5160,9480,19080,31320],[3840,5400,9840,19680,31920],[5040,6480,11880,24600,40080],[4700,6700,13000,26000,42400]];
 const relayCountries = new Set(['FR','DE','AT','BE','DK','ES','EE','FI','HU','LV','LT','LU','NL','PL','PT','CZ','GB','SK','SI','SE','CH']);
 const relayRates = [[450,650,1050,1750],[1200,1680,2880,5760],[1320,1800,3600,6480],[1680,2280,4560,7440],[3200,3600,5400,7900]];
 const text = {
 fr: {mode:'Mode de livraison',relay:'Point relais — économique',home:'À domicile — express',relayName:'Point relais souhaité (nom ou adresse)',relayHelp:'Le point relais sera confirmé avant l’expédition. Shop2Shop en France nécessite un dépôt en relais.',relayUnavailable:'Point relais non confirmé pour cette destination : choisissez le domicile ou demandez un devis.',title:'Estimer les frais de port',from:'Chronopost · Départ Paris · Relais ou domicile',country:'Pays',postal:'Code postal',city:'Ville',street:'Rue et numéro (facultatif pour estimer)',parcel:'Colis : 300 g par défaut — ajuster le poids et les dimensions',weight:'Poids total emballé (g)',length:'Longueur (cm)',width:'Largeur (cm)',height:'Hauteur (cm)',special:'Île ou territoire douanier particulier',share:'Inclure cette adresse dans ma demande et mes exports',privacy:'Le calcul se fait dans votre navigateur. L’adresse est incluse uniquement si vous cochez cette case puis copiez, téléchargez ou ouvrez WhatsApp.',other:'Autre destination européenne — devis nécessaire',note:'Estimation selon la grille publique 2026, à confirmer selon le colis réel et le contrat Chronopost. Options, suppléments, droits et taxes éventuels non calculés.',source:'Consulter la grille publiée',shipping:'Frais de port estimés',total:'Total produits + livraison estimé',billed:'Poids facturable',address:'Renseignez le pays et le code postal.',invalid:'Vérifiez le poids et les dimensions du colis.',format:'Format Chrono Express minimum : 30 × 21 × 3 cm.',territory:'Cette destination nécessite un devis Chronopost.',expired:'La grille 2026 doit être actualisée.',empty:'Ajoutez une référence pour estimer le total.',unavailable:'Le stock doit être vérifié avant de calculer le total.'},
 en: {mode:'Delivery method',relay:'Pickup point — economy',home:'Home delivery — express',relayName:'Preferred pickup point (name or address)',relayHelp:'The pickup point is confirmed before dispatch. Shop2Shop in France requires drop-off at a pickup point.',relayUnavailable:'Pickup delivery not confirmed for this destination: select home delivery or request a quote.',title:'Estimate shipping',from:'Chronopost · From Paris · Pickup or home',country:'Country',postal:'Postal code',city:'City',street:'Street and number (optional for estimate)',parcel:'Parcel: 300 g by default — adjust weight and dimensions',weight:'Packed weight (g)',length:'Length (cm)',width:'Width (cm)',height:'Height (cm)',special:'Island or special customs territory',share:'Include this address in my request and exports',privacy:'Calculated in your browser. Your address is included only if you tick this box and then copy, download or open WhatsApp.',other:'Other European destination — quote required',note:'Estimate using public 2026 rates. Confirm with actual parcel and Chronopost contract. Options, surcharges, duties and additional taxes are not calculated.',source:'View published rates',shipping:'Estimated shipping',total:'Estimated products + shipping total',billed:'Chargeable weight',address:'Enter country and postal code.',invalid:'Check parcel weight and dimensions.',format:'Chrono Express minimum size: 30 × 21 × 3 cm.',territory:'This destination requires a Chronopost quote.',expired:'The 2026 rates need updating.',empty:'Add a reference to estimate the total.',unavailable:'Stock must be checked before calculating the total.'},
 pt: {mode:'Modo de entrega',relay:'Ponto de recolha — económico',home:'Ao domicílio — expresso',relayName:'Ponto de recolha desejado (nome ou morada)',relayHelp:'O ponto de recolha será confirmado antes da expedição. Shop2Shop em França exige depósito num ponto de recolha.',relayUnavailable:'Recolha não confirmada neste destino: escolha domicílio ou peça orçamento.',title:'Estimar portes',from:'Chronopost · Partida de Paris · Recolha ou domicílio',country:'País',postal:'Código postal',city:'Cidade',street:'Rua e número (opcional para estimar)',parcel:'Encomenda: 300 g por defeito — ajustar peso e dimensões',weight:'Peso embalado (g)',length:'Comprimento (cm)',width:'Largura (cm)',height:'Altura (cm)',special:'Ilha ou território aduaneiro especial',share:'Incluir esta morada no pedido e nas exportações',privacy:'Cálculo no navegador. A morada só é incluída ao selecionar esta opção e copiar, descarregar ou abrir WhatsApp.',other:'Outro destino europeu — orçamento necessário',note:'Estimativa com tarifas públicas de 2026. Confirmar com o volume real e o contrato Chronopost. Opções, suplementos, direitos e impostos adicionais não calculados.',source:'Consultar tarifas publicadas',shipping:'Portes estimados',total:'Total estimado de produtos + portes',billed:'Peso faturável',address:'Indique país e código postal.',invalid:'Verifique peso e dimensões.',format:'Formato mínimo Chrono Express: 30 × 21 × 3 cm.',territory:'Destino sujeito a orçamento Chronopost.',expired:'As tarifas de 2026 precisam de atualização.',empty:'Adicione uma referência para estimar o total.',unavailable:'Verifique o stock antes de calcular o total.'},
 es: {mode:'Modo de entrega',relay:'Punto de recogida — económico',home:'A domicilio — exprés',relayName:'Punto de recogida deseado (nombre o dirección)',relayHelp:'El punto de recogida se confirmará antes del envío. Shop2Shop en Francia requiere depósito en un punto de recogida.',relayUnavailable:'Recogida no confirmada en este destino: elige domicilio o solicita presupuesto.',title:'Estimar gastos de envío',from:'Chronopost · Desde París · Recogida o domicilio',country:'País',postal:'Código postal',city:'Ciudad',street:'Calle y número (opcional para estimar)',parcel:'Paquete: 300 g por defecto — ajustar peso y dimensiones',weight:'Peso embalado (g)',length:'Largo (cm)',width:'Ancho (cm)',height:'Alto (cm)',special:'Isla o territorio aduanero especial',share:'Incluir esta dirección en mi solicitud y exportaciones',privacy:'Cálculo en el navegador. La dirección solo se incluye al marcar esta casilla y copiar, descargar o abrir WhatsApp.',other:'Otro destino europeo — presupuesto necesario',note:'Estimación con tarifas públicas de 2026. Confirmar según el paquete real y el contrato Chronopost. Opciones, suplementos, aranceles e impuestos adicionales no calculados.',source:'Consultar tarifas publicadas',shipping:'Envío estimado',total:'Total estimado de productos + envío',billed:'Peso facturable',address:'Introduce país y código postal.',invalid:'Comprueba peso y dimensiones.',format:'Tamaño mínimo Chrono Express: 30 × 21 × 3 cm.',territory:'Se necesita un presupuesto Chronopost.',expired:'Hay que actualizar las tarifas de 2026.',empty:'Añade una referencia para estimar el total.',unavailable:'Comprueba el stock antes de calcular el total.'}
 };
 function quote(d, date = new Date()) {
  const fail = error => ({ok:false,error});
  if (date.getFullYear() !== 2026) return fail('expired');
  const country = countries.find(c => c[0] === d.country);
  if (!country) return fail('territory');
  const postal = String(d.postal || '').trim();
  if (!postal) return fail('address');
  if (d.country === 'FR' && (!/^\d{5}$/.test(postal) || +postal.slice(0,2) < 1 || +postal.slice(0,2) > 95)) return fail('territory');
  if (d.special || (d.country === 'ES' && ['07','35','38','51','52'].includes(postal.slice(0,2))) || (d.country === 'PT' && postal.startsWith('9')) || (d.country === 'IT' && ['23041','22061'].includes(postal))) return fail('territory');
  const n = x => typeof x === 'number' ? x : Number(String(x).trim().replace(',', '.'));
  const grams = n(d.weight), sides = [n(d.length),n(d.width),n(d.height)].sort((a,b)=>b-a);
  if (![grams,...sides].every(x => Number.isFinite(x) && x > 0) || grams > 30000 || sides[0] > 150 || sides[0]+2*sides[1]+2*sides[2] > 300) return fail('invalid');
  const zone = country[2];
  const mode = d.mode || 'relay';
  if (!['relay','home'].includes(mode)) return fail('invalid');
  if (mode === 'relay' && !relayCountries.has(d.country)) return fail('relayUnavailable');
  if (mode === 'relay' && (grams > 20000 || sides[0] > 100 || sides[0]+2*sides[1]+2*sides[2] > 250)) return fail('invalid');
  if (zone && (sides[0] < 30 || sides[1] < 21 || (mode === 'home' && sides[2] < 3))) return fail('format');
  const kg = zone && mode === 'home' ? Math.max(grams/1000, sides.reduce((p,x)=>p*x,1)/5000) : grams/1000;
  const tier = (mode === 'relay' ? [1,3,10,20] : [1,3,10,20,30]).findIndex(limit => kg <= limit);
  if (tier < 0) return fail('invalid');
  return {ok:true,cents:(mode === 'relay' ? relayRates : rates)[zone][tier],kg,zone,mode,service:mode === 'relay' ? zone ? 'Chrono Relais Europe' : 'Shop2Shop' : zone ? 'Chrono Express':'Chrono 13'};
 }
 let mounted = false;
 const field = id => document.getElementById('shipping-'+id);
 const compact = {
  fr:{outside:'Livraison hors Paris',details:'Ajouter mes coordonnées (facultatif)',name:'Nom',address:'Adresse ou point relais',placeholder:'Rue ou relais, code postal, ville, pays',privacy:'Les coordonnées renseignées seront incluses dans votre message. Vous pouvez aussi les préciser sur WhatsApp.',later:'Coordonnées à préciser sur WhatsApp.',fees:'Frais de livraison à confirmer sur WhatsApp.'},
  en:{outside:'Delivery outside Paris',details:'Add my details (optional)',name:'Name',address:'Address or pickup point',placeholder:'Street or pickup point, postal code, city, country',privacy:'Any details you enter will be included in your message. You can also provide them on WhatsApp.',later:'Delivery details to be provided on WhatsApp.',fees:'Shipping costs to be confirmed on WhatsApp.'},
  pt:{outside:'Entrega fora de Paris',details:'Adicionar os meus dados (opcional)',name:'Nome',address:'Morada ou ponto de recolha',placeholder:'Rua ou ponto de recolha, código postal, cidade, país',privacy:'Os dados preenchidos serão incluídos na sua mensagem. Também pode indicá-los no WhatsApp.',later:'Dados de entrega a indicar no WhatsApp.',fees:'Custos de envio a confirmar no WhatsApp.'},
  es:{outside:'Entrega fuera de París',details:'Añadir mis datos (opcional)',name:'Nombre',address:'Dirección o punto de recogida',placeholder:'Calle o punto de recogida, código postal, ciudad, país',privacy:'Los datos introducidos se incluirán en tu mensaje. También puedes indicarlos por WhatsApp.',later:'Datos de entrega por indicar en WhatsApp.',fees:'Gastos de envío por confirmar en WhatsApp.'}
 };
 function language() { return typeof root.pageLanguage === 'function' ? root.pageLanguage() : 'fr'; }
 function copy() { return compact[language()] || compact.fr; }
 function refresh() {
  if (!mounted) return;
  const c=copy();
  document.querySelectorAll('#shipping-estimator [data-shipping-copy]').forEach(el=>el.textContent=c[el.dataset.shippingCopy]);
  field('address').placeholder=c.placeholder;
  const enabled=field('outside').checked;
  field('details').hidden=!enabled;
  field('outside').setAttribute('aria-expanded',String(enabled));
 }
 function summary() {
  if (!mounted || !field('outside').checked) return '';
  const c=copy();
  const clean = value=>value.replace(/[\r\n]+/g,', ').trim();
  const name=clean(field('name').value), address=clean(field('address').value);
  const lines=[c.outside];
  if(name) lines.push(c.name+': '+name);
  if(address) lines.push(c.address+': '+address);
  else lines.push(c.later);
  lines.push(c.fees);
  return '\n\n'+lines.join('\n');
 }
 function reset() {
  if(!mounted) return;
  field('outside').checked=false;
  field('name').value='';field('address').value='';
  field('details').open=false;refresh();
 }
 function mount() {
  const container=document.getElementById('selectionDetails');if(!container)return;
  const section=document.createElement('section');section.id='shipping-estimator';
  section.innerHTML=`<label class="shipping-check"><input id="shipping-outside" type="checkbox" aria-controls="shipping-details" aria-expanded="false"><span data-shipping-copy="outside"></span></label><details id="shipping-details" hidden><summary data-shipping-copy="details"></summary><div class="optional-address"><label><span data-shipping-copy="name"></span><input id="shipping-name" type="text" autocomplete="name" maxlength="100"></label><label><span data-shipping-copy="address"></span><textarea id="shipping-address" rows="3" autocomplete="street-address" maxlength="500"></textarea></label><p class="shipping-note" data-shipping-copy="privacy"></p></div></details>`;
  container.insertBefore(section,container.querySelector('.sel-actions'));
  section.addEventListener('change',refresh);mounted=true;refresh();
 }
 root.ScarlsShipping={quote,refresh,summary,reset,countries};
 if(typeof document !== 'undefined')document.addEventListener('DOMContentLoaded',mount);
})(typeof window !== 'undefined' ? window : globalThis);
