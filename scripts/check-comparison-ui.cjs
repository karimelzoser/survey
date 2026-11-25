/* Run from repository root: node scripts/check-comparison-ui.cjs
 * Tests existing presentation UI using synthetic rows. No catalog data changes. */
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const read=p=>fs.readFileSync(p,"utf8");
const source={window:{__ATLAS_PARTS:[]}};
vm.runInNewContext(read("atlas-2026/parts/021.js"),source);
const html=source.window.__ATLAS_PARTS[20];
assert.equal(typeof html,"string");
const original=html.slice(html.indexOf("function compareView()"),html.indexOf("function render()"));
for(const tab of ["countries","types","makers","cross"]){
 assert.ok(original.includes("state.tab==='"+tab+"'"),"Missing original comparison tab: "+tab);
}
assert.ok(original.includes("data-action=\"export\""),"CSV export control missing");
assert.ok(original.includes("class=\"table-scroll\""),"Table scroll container missing");
const context={window:{}};
vm.runInNewContext(read("atlas-2026/qa-embedded.js"),context);
const code=context.window.__ATLAS_PRO_QA.js;
const start=code.indexOf("var oldRender=render"),end=code.indexOf("function attach(){");
assert.ok(start>=0&&end>start,"QA pagination block not found");
const rows=Array.from({length:34},()=>({hidden:false}));let bar=null;
const wrap={parentNode:{querySelector:()=>bar},after:n=>{bar=n}};
const table={querySelectorAll:q=>q==="tbody tr"?rows:[{}, {}, {}],closest:()=>wrap};
const document={querySelector:()=>table,createElement:()=>({innerHTML:"",onclick:null})};
const state={tab:"countries",lang:"en"};
const run=new Function("document","state","render","innerHeight","requestAnimationFrame",code.slice(start,end)+"\nreturn {paginate,render};")(document,state,()=>{},768,f=>f());
const count=()=>rows.filter(r=>!r.hidden).length;
const toggle=()=>bar.onclick({target:{closest:q=>q==="[data-table-mode]"?{}:null}});
const step=()=>bar.onclick({target:{closest:q=>q==="[data-table-page]"?{dataset:{tablePage:"next"}}:null}});
assert.equal(count(),34,"All rows visible by default");
toggle();assert.equal(count(),5,"Pagination limits visible rows");
step();assert.ok(rows[0].hidden&&!rows[5].hidden,"Next page");
state.tab="cross";run.paginate();assert.ok(!rows[0].hidden&&rows[5].hidden,"New tab resets page");
toggle();assert.equal(count(),34,"Scroll mode restores all rows");
state.lang="ar";run.paginate();assert.ok(bar.innerHTML.includes("تفعيل الصفحات"),"Arabic pagination label");
console.log("PASS: original comparison tabs, export, scroll containers and six pagination checks.");
