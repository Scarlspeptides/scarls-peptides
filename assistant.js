(function () {
  'use strict';
  function init() {
    if (!window.ScarlsFAQ || document.querySelector('.scarl-assistant')) return;
    if (!/\/(?:index|produits|apropos|livraison|faq|contact)\.html$/.test(location.pathname) && !location.pathname.endsWith('/')) return;
    try { if (sessionStorage.getItem('scarlAgeAcknowledgedV1')!=='yes') return; } catch { return; }
    const faq=window.ScarlsFAQ;
    const host=document.createElement('aside');host.className='scarl-assistant';host.lang='fr';host.setAttribute('aria-label','Assistant d’information Scarl’s');
    host.innerHTML='<section class="chat-panel" id="scarlChatPanel" role="region" aria-labelledby="scarlChatTitle" hidden><div class="chat-header"><div class="chat-heading"><h2 id="scarlChatTitle">Une question ?</h2><p>SCARL’S · Réponses préparées · FR</p></div><button class="chat-icon" type="button" aria-label="Fermer l’assistant">×</button></div><div class="chat-log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversation"></div><div class="chat-choices" aria-label="Questions suggérées"></div><form class="chat-form"><input type="text" name="question" aria-label="Votre question" placeholder="Ex. À quoi sert le GHK-Cu ?" maxlength="500" autocomplete="off" required><button class="chat-send" type="submit">Envoyer</button></form><div class="chat-bottom"><span>Information générale · Aucun conseil médical</span><button class="chat-clear" type="button">Effacer</button></div></section><button class="chat-launch" type="button" aria-controls="scarlChatPanel" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 0 1-8 8H5l-4 3 1.6-6A9 9 0 1 1 20 11Z"/><path d="M7 10h9M7 14h6"/></svg>Une question ?</button>';
    document.body.append(host);
    const panel=host.querySelector('.chat-panel'),launch=host.querySelector('.chat-launch'),close=host.querySelector('.chat-icon'),log=host.querySelector('.chat-log'),choices=host.querySelector('.chat-choices'),input=host.querySelector('input');
    let currentId=null,count=0;
    function showChoices(ids) {
      choices.replaceChildren();
      const items=ids ? ids.map(id=>faq.entries.find(e=>e.id===id)).filter(Boolean).map(e=>[e.name,'À quoi sert '+e.name+' ?']) : [['Les références','Quels peptides ?'],['Contact général','Votre contact ?']];
      if (ids) items.push(['Autres questions','Bonjour']);
      for (const [label,q] of items) {const b=document.createElement('button');b.className='chat-choice';b.type='button';b.textContent=label;b.addEventListener('click',()=>{ask(q);input.focus({preventScroll:true});});choices.append(b);}
    }
    function message(text,user=false,result={}) {
      const article=document.createElement('div');article.className='chat-message'+(user?' user':'');
      const who=document.createElement('span');who.className='chat-speaker';who.textContent=user?'Vous':'Scarl’s · FAQ';
      const p=document.createElement('p');p.textContent=text;article.append(who,p);
      if (result.sources?.length) {const links=document.createElement('div');links.className='chat-sources';for (const [label,url] of result.sources) {const a=document.createElement('a');a.href=url;a.textContent=label;a.target='_blank';a.rel='noopener noreferrer';links.append(a);}article.append(links);}
      if (result.contact) {const a=document.createElement('a');a.href='https://wa.me/33664694830';a.textContent='Ouvrir WhatsApp';a.target='_blank';a.rel='noopener noreferrer';a.className='chat-contact';article.append(a);}
      log.append(article);while(log.children.length>80)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;
    }
    function reset() {log.replaceChildren();currentId=null;count=0;input.value='';message('Bonjour ! Choisissez une référence ou posez une question courte. Mes réponses sont préparées : je ne suis pas une IA. Ne partagez pas de données personnelles.');showChoices();}
    function ask(q) {const text=q.trim();if(!text)return;message(text,true);const result=faq.reply(text,currentId);currentId=result.entryId||null;message(result.text,false,result);showChoices(result.choices);log.scrollTop=log.scrollHeight;count++;}
    function toggle(open) {panel.hidden=!open;host.classList.toggle('chat-open',open);launch.setAttribute('aria-expanded',String(open));if(open){if(!count && !log.children.length)reset();close.focus({preventScroll:true});}else launch.focus({preventScroll:true});}
    launch.addEventListener('click',()=>toggle(panel.hidden));close.addEventListener('click',()=>toggle(false));
    host.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.stopPropagation();toggle(false);}});
    host.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const q=input.value;input.value='';ask(q);input.focus({preventScroll:true});});
    host.querySelector('.chat-clear').addEventListener('click',()=>{reset();input.focus({preventScroll:true});});
  }
  if (document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
