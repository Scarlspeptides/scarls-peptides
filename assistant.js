(function(){
 'use strict';
 function init(){
  if(!window.ScarlsFAQ||document.querySelector('.scarl-assistant'))return;
  if(!/\/(?:index|produits|apropos|livraison|faq|contact)\.html$/.test(location.pathname)&&!location.pathname.endsWith('/'))return;
  try{if(sessionStorage.getItem('scarlAgeAcknowledgedV1')!=='yes')return;}catch{return;}
  const faq=window.ScarlsFAQ;
  const host=document.createElement('aside');host.className='scarl-assistant';
  host.innerHTML='<section class="chat-panel" id="scarlChatPanel" role="region" aria-labelledby="scarlChatTitle" hidden><div class="chat-header"><div class="chat-heading"><h2 id="scarlChatTitle"></h2><p class="chat-subtitle"></p></div><button class="chat-icon" type="button">×</button></div><div class="chat-log" role="log" aria-live="polite" aria-relevant="additions"></div><div class="chat-choices"></div><form class="chat-form"><input type="text" name="question" maxlength="500" autocomplete="off" required><button class="chat-send" type="submit"></button></form><div class="chat-bottom"><span></span><button class="chat-clear" type="button"></button></div></section><button class="chat-launch" type="button" aria-controls="scarlChatPanel" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 0 1-8 8H5l-4 3 1.6-6A9 9 0 1 1 20 11Z"/><path d="M7 10h9M7 14h6"/></svg><span></span></button>';
  document.body.append(host);
  const panel=host.querySelector('.chat-panel'),launch=host.querySelector('.chat-launch'),close=host.querySelector('.chat-icon'),log=host.querySelector('.chat-log'),choices=host.querySelector('.chat-choices'),input=host.querySelector('input');
  const events=[];let currentId=null,comparisonMode=false,compareIds=[],choiceIds=null,publishedVersion=null;
  const language=()=>faq.ui[document.documentElement.lang]?document.documentElement.lang:'fr';
  const ui=()=>faq.ui[language()];
  const find=id=>faq.entries.find(e=>e.id===id);
  function resultFor(event){if(event.kind==='compare')return faq.compare(event.ids,language());if(event.kind==='ask')return faq.reply(event.query,event.previousId,language());return {text:ui()[event.key]||ui().missing};}
  function drawMessage(event){
   const user=event.kind==='user';const result=user?{text:event.text}:resultFor(event);
   const article=document.createElement('div');article.className='chat-message'+(user?' user':'');article.lang=user?'':language();
   const who=document.createElement('span');who.className='chat-speaker';who.textContent=user?ui().you:'Scarl’s · FAQ';const p=document.createElement('p');p.textContent=result.text;article.append(who,p);
   if(result.comparison){const group=document.createElement('div');group.className='chat-comparison';for(const row of result.comparison){const section=document.createElement('section'),h=document.createElement('h3'),body=document.createElement('p');h.textContent=row.name;body.textContent=row.text;section.append(h,body);group.append(section);}article.append(group);}
   if(result.sources?.length){const links=document.createElement('div');links.className='chat-sources';result.sources.forEach((s,i)=>{const a=document.createElement('a');a.href=s[1];a.textContent=ui().source+' '+(i+1);a.target='_blank';a.rel='noopener noreferrer';links.append(a);});article.append(links);}
   if(result.contact){const a=document.createElement('a');a.href='https://wa.me/33664694830';a.textContent='WhatsApp';a.target='_blank';a.rel='noopener noreferrer';a.className='chat-contact';article.append(a);}
   log.append(article);
  }
  function renderLog(){log.replaceChildren();events.forEach(drawMessage);log.scrollTop=log.scrollHeight;}
  function push(event){events.push(event);while(events.length>80)events.shift();drawMessage(event);while(log.children.length>80)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;}
  function button(label,fn){const b=document.createElement('button');b.className='chat-choice';b.type='button';b.textContent=label;b.addEventListener('click',()=>{fn();input.focus({preventScroll:true});});choices.append(b);}
  function renderChoices(){
   choices.replaceChildren();
   if(choiceIds){for(const id of choiceIds){const e=find(id);if(e)button(e.name,()=>pick(id));}button(ui().back,()=>{comparisonMode=false;compareIds=[];choiceIds=null;renderChoices();});}
   else {button(ui().references,()=>ask(ui().entriesQuestion));button(ui().compare,startComparison);button(ui().contact,()=>ask(ui().contactQuestion));}
  }
  function startComparison(){comparisonMode=true;compareIds=[];choiceIds=faq.entries.map(e=>e.id);push({kind:'key',key:'comparisonStart'});renderChoices();}
  function pick(id){
   if(!comparisonMode){const e=find(id);if(e)ask(ui().question.replace('{name}',e.name));return;}
   if(compareIds.includes(id))return;compareIds.push(id);push({kind:'user',text:find(id)?.name||id});
   if(compareIds.length===1){push({kind:'key',key:'comparisonSecond'});choiceIds=faq.entries.filter(e=>e.id!==id).map(e=>e.id);}
   else{push({kind:'compare',ids:[...compareIds]});comparisonMode=false;compareIds=[];choiceIds=null;}
   renderChoices();log.scrollTop=log.scrollHeight;
  }
  function ask(raw){
   const query=raw.trim();if(!query)return;
   push({kind:'user',text:query});const previousId=currentId;const result=faq.reply(query,previousId,language());push({kind:'ask',query,previousId});
   currentId=result.entryId||null;comparisonMode=Boolean(result.comparisonPicking);compareIds=result.firstId?[result.firstId]:[];choiceIds=result.choices||null;renderChoices();log.scrollTop=log.scrollHeight;
  }
  function translate(){const t=ui();host.lang=language();host.setAttribute('aria-label','Scarl’s · '+t.title);host.querySelector('h2').textContent=t.title;host.querySelector('.chat-subtitle').textContent='SCARL’S · '+t.subtitle+' · '+language().toUpperCase();close.setAttribute('aria-label',t.close);log.setAttribute('aria-label',t.conversation);choices.setAttribute('aria-label',t.choices);input.setAttribute('aria-label',t.placeholder);input.placeholder=t.placeholder;host.querySelector('.chat-send').textContent=t.send;host.querySelector('.chat-bottom span').textContent=t.notice;host.querySelector('.chat-clear').textContent=t.clear;launch.querySelector('span').textContent=t.title;renderLog();renderChoices();}
  function reset(){events.length=0;currentId=null;comparisonMode=false;compareIds=[];choiceIds=null;input.value='';push({kind:'key',key:'welcome'});renderChoices();}
  function toggle(open){panel.hidden=!open;host.classList.toggle('chat-open',open);launch.setAttribute('aria-expanded',String(open));if(open){if(!events.length)reset();close.focus({preventScroll:true});}else launch.focus({preventScroll:true});}
  launch.addEventListener('click',()=>toggle(panel.hidden));close.addEventListener('click',()=>toggle(false));host.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.stopPropagation();toggle(false);}});
  host.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const q=input.value;input.value='';ask(q);input.focus({preventScroll:true});});
  host.querySelector('.chat-clear').addEventListener('click',()=>{reset();input.focus({preventScroll:true});});
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});translate();
  let refreshing=false;
  async function refreshContent(){
   if(refreshing||document.hidden)return;refreshing=true;
   try{const r=await fetch('https://scarls-administration.solarcoot14.chatgpt.site/api/chatbot/public?v='+Date.now(),{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(8000)});if(!r.ok)return;const data=await r.json();if(data.version===publishedVersion)return;if(!faq.applyContent(data))return;publishedVersion=data.version;if(currentId&&!find(currentId))currentId=null;if(choiceIds)choiceIds=choiceIds.filter(find);translate();}catch{}finally{refreshing=false;}
  }
  refreshContent();setInterval(refreshContent,30000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshContent();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
