// Optional delivery details stay in memory until the visitor shares them.
(function(root) {
 "use strict";
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
 root.ScarlsShipping={refresh,summary,reset};
 if(typeof document !== 'undefined')document.addEventListener('DOMContentLoaded',mount);
})(typeof window !== 'undefined' ? window : globalThis);
