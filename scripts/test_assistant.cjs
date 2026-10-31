const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const faq = require('../assistant-data.js');
const catalogue = require('../products.json');
for (const entry of catalogue.items) {
  assert.ok(faq.entries.find(e=>e.id===entry.id),`Missing ${entry.name}`);
  assert.equal(faq.reply(`À quoi sert ${entry.name} ?`).entryId,entry.id,entry.name);
}
assert.equal(faq.reply('ghk-cu').entryId,'ghk-cu');
assert.equal(faq.reply('rétatrutide').entryId,'retatrutide');
assert.equal(faq.reply('NAD+').entryId,'nad');
assert.equal(faq.reply('Quels sont ses risques ?','ghk-cu').text,faq.entries[0].risk.fr);
assert.deepEqual(faq.reply('GHK-Cu et Semax').choices,['ghk-cu','semax']);
assert.equal(faq.reply('cjc1295').entryId,'cjc-no-dac-ipamorelin');
assert.equal(faq.reply('Quel dosage de ghk ?').entryId,undefined);
assert.match(faq.reply('Comment payer via Vinted ?').text,/ne prépare pas/);
assert.match(faq.reply('Frais de livraison Chronopost ?').text,/ne calcule pas/);
assert.equal(faq.reply('Votre WhatsApp ?').contact,true);
assert.equal(faq.reply('Je veux acheter du semax sur WhatsApp').contact,undefined);
assert.match(faq.reply('Qui conserve mes données ?').text,/mémoire de cette page/);
assert.match(faq.reply('Tu es une IA ?').text,/sans IA générative/);
assert.equal(faq.reply('<img src=x onerror=alert(1)>').entryId,undefined);
assert.equal(faq.reply('question inconnue').choices.length,catalogue.items.length);
for(const file of ['index','produits','apropos','livraison','faq','contact']) {
  const html=fs.readFileSync(path.join(__dirname,'..',file+'.html'),'utf8');
  assert.equal((html.match(/src="assistant\.js/g)||[]).length,1,file);
  assert.equal((html.match(/src="assistant-data\.js/g)||[]).length,1,file);
}
console.log('Assistant: catalogue coverage, matching, follow-ups, boundaries and page integration passed.');

for(const lang of ['fr','en','pt','es']) {
  assert.equal(faq.reply('Semax',null,lang).text,faq.entries.find(e=>e.id==='semax').answer[lang]);
  const comparison=faq.reply('compare Semax vs Selank',null,lang);
  assert.equal(comparison.comparison.length,2);
  assert.equal(comparison.comparison[0].text,faq.entries.find(e=>e.id==='semax').answer[lang]);
  assert.ok(comparison.text.length>20);
  assert.equal(faq.reply('unknown text',null,lang).text,faq.ui[lang].unknown);
  for(const e of faq.entries){assert.ok(e.answer[lang].trim());assert.ok(e.risk[lang].trim());}
}
assert.equal(faq.reply('a quoi sert semx').key,'typo');
assert.ok(faq.reply('a quoi sert semx').choices.includes('semax'));
assert.ok(faq.reply('retatrtuide').choices.includes('retatrutide'));
assert.equal(faq.reply('ghkcu').entryId,'ghk-cu');
assert.equal(faq.reply('sema').key,'typo'); // Confirmation before substituting a short name.
assert.equal(faq.reply('What are the side effects of Selank?',null,'en').text,faq.entries.find(e=>e.id==='selank').risk.en);
assert.equal(faq.reply('¿Cómo pagar?',null,'es').text,faq.ui.es.noOrders);
assert.equal(faq.reply('Qual a dose de Semax?',null,'pt').text,faq.ui.pt.noDose);
assert.equal(faq.compare(['semax','semax']).comparison,undefined);
const original=JSON.parse(JSON.stringify({entries:faq.entries}));
const edited=JSON.parse(JSON.stringify(original));edited.entries[0].answer.en='Edited published response';
assert.equal(faq.applyContent(edited),true);assert.equal(faq.reply('GHK-Cu',null,'en').text,'Edited published response');
const bad=JSON.parse(JSON.stringify(edited));delete bad.entries[0].answer.es;
assert.equal(faq.applyContent(bad),false);assert.equal(faq.reply('GHK-Cu',null,'en').text,'Edited published response');
const unsafe=JSON.parse(JSON.stringify(edited));unsafe.entries[0].sources=[['Unsafe','javascript:alert(1)']];assert.equal(faq.applyContent(unsafe),false);
assert.equal(faq.applyContent(original),true);
console.log('Passed: four languages, comparisons, typo confirmation and validated live content updates.');
