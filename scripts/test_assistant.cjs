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
assert.equal(faq.reply('Quels sont ses risques ?','ghk-cu').text,faq.entries[0].risk);
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
