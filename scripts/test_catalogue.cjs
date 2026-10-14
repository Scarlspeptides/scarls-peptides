// Focus, selection limits and search regressions; no browser dependencies.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path');const root=path.resolve(__dirname,'..');
let document;
class Node {
 constructor(){this.children=[];this.dataset={};this.attrs={};this.parent=null;this.disabled=false;this.value='';this.hidden=false;this.classes=new Set();this.classList={toggle:(key,on)=>{if(on)this.classes.add(key);else this.classes.delete(key);},contains:key=>this.classes.has(key)};}
 get isConnected(){return this.root||!!this.parent?.isConnected;}
 append(node){if(node.parent)node.remove();node.parent=this;this.children.push(node);}
 insertBefore(node,before){if(node.parent)node.remove();node.parent=this;const index=this.children.indexOf(before);this.children.splice(index<0?this.children.length:index,0,node);}
 remove(){if(this.parent){this.parent.children.splice(this.parent.children.indexOf(this),1);this.parent=null;}}
 contains(node){for(let current=node;current;current=current.parent)if(current===this)return true;return false;}
 closest(selector){if(selector==='[data-reference]'){for(let n=this;n;n=n.parent)if(n.dataset.reference)return n;}return null;}
 setAttribute(key,value){this.attrs[key]=value;}
 get textContent(){return this.text||this.children.map(child=>child.textContent).join('');}
 set textContent(value){this.text=String(value);}
 querySelectorAll(selector){const all=[];for(const child of this.children){all.push(child,...child.querySelectorAll('*'));}return all.filter(node=>selector==='*'||selector==='[data-action]'&&node.dataset.action||selector.startsWith('[data-action="')&&node.dataset.action===selector.match(/"(.+?)"/)[1]||selector.startsWith('.')&&node.className===selector.slice(1));}
 querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
 focus(){document.activeElement=this;}
}
const nodes={};const node=id=>nodes[id]||(nodes[id]=Object.assign(new Node(),{root:true}));let groups=[];
document={activeElement:new Node(),createElement:()=>new Node(),getElementById:node,querySelectorAll:selector=>selector==='.product-group'?groups:[],addEventListener(){}};
let payload={'GHK-Cu':3,'Semax':2},failed=false;
const window={addEventListener(){},ScarlsShipping:{refresh(){},reset(){}}};
const context={window,document,localStorage:{getItem(){return null},setItem(){}},location:{hash:''},AbortSignal,Date,setTimeout,requestAnimationFrame(){},fetch:async()=>{if(failed)throw Error('offline');return {ok:true,json:async()=>payload}},matchMedia:()=>({matches:true})};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'products.js'),'utf8'),context);
let source=fs.readFileSync(path.join(root,'catalogue.js'),'utf8').replace(/\nloadStock\(\);\nsetInterval[^\n]+\nwindow\.addEventListener\('focus'[^\n]+/,'');vm.runInContext(source,context);
vm.runInContext('renderCatalogue=()=>{throw Error("Rebuilt catalogue during stock refresh")};showToast=()=>{}',context);
(async()=>{
 await context.loadStock();
 vm.runInContext('selection=[{name:"GHK-Cu",dose:"100 mg",price:"70 €",qty:1}]',context);context.renderSelection();
 const row=node('selItems').children[0],increase=row.querySelector('[data-action="increase"]');increase.focus();context.changeQty(0,1);
 assert.equal(node('selItems').children[0],row);assert.equal(document.activeElement,increase);assert(row.querySelector('.chip-label').textContent.endsWith('× 2'));
 payload={'GHK-Cu':2,'Semax':2};await context.loadStock();assert.equal(increase.disabled,true);assert.equal(document.activeElement,row.querySelector('[data-action="decrease"]'));
 context.removeSelection(0);assert.equal(document.activeElement,node('catalogueSearch'));assert.equal(node('selItems').children.length,0);
 failed=true;await context.loadStock();assert.equal(node('waBtn').disabled,true);failed=false;
 const product=Object.assign(new Node(),{dataset:{name:'GHK-Cu',dose:'100 mg'}});const group=new Node();group.querySelectorAll=()=>[product];groups=[group];
 for(const search of ['ghk cu','GHK-Cu','100mg','100 mg']){node('catalogueSearch').value=search;context.applySearch();assert.equal(product.hidden,false,search);}
 node('catalogueSearch').value='unknown';context.applySearch();assert.equal(product.hidden,true);
 for(const lang of ['fr','en','pt','es']){const rows=window.ScarlsProducts.catalogue(lang).flatMap(group=>group[1]);assert.equal(rows.length,13);assert(rows.every(row=>row[3]));}
 console.log('Passed: stable quantity focus, refreshed stock controls, deletion focus, offline sending block, normalized search and multilingual catalogue.');
})().catch(error=>{console.error(error);process.exitCode=1;});
