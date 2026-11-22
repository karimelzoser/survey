(function(){
'use strict';
if(!window.ATLAS_TEST)return;
var oldRender=render, page=0, key='';
function paginate(){
 var table=document.querySelector('#root .analytics .atlas-table');if(!table)return;
 var rows=Array.from(table.querySelectorAll('tbody tr')), k=(state.tab||'')+'|'+rows.length+'|'+table.querySelectorAll('thead th').length;
 if(k!==key){key=k;page=0}
 var size=innerHeight<=750?4:innerHeight<=850?5:innerHeight<=1010?9:13,max=Math.max(1,Math.ceil(rows.length/size));
 page=Math.min(page,max-1);rows.forEach(function(x,i){x.hidden=i<page*size||i>=(page+1)*size});
 var wrap=table.closest('.table-scroll');if(!wrap)return;
 var nav=wrap.parentNode.querySelector('.qa-pagination');if(!nav){nav=document.createElement('div');nav.className='qa-pagination';wrap.after(nav)}
 nav.innerHTML='<button data-qa-pg="prev" '+(page===0?'disabled':'')+'>← PREVIOUS</button><span>'+(page+1)+' / '+max+' · '+rows.length+' rows</span><button data-qa-pg="next" '+(page===max-1?'disabled':'')+'>NEXT →</button>';
 nav.onclick=function(e){var b=e.target.closest('[data-qa-pg]');if(!b)return;page+=b.dataset.qaPg==='next'?1:-1;page=Math.min(max-1,Math.max(0,page));paginate()};
}
render=function(){oldRender();requestAnimationFrame(paginate)};
requestAnimationFrame(paginate);
function attach(){
 var frame=document.getElementById('deckFrame'),d,w,api;
 if(!frame)return;
 try{d=frame.contentDocument;w=frame.contentWindow;api=w.CUAS_TEST}catch(e){return}
 if(!api||!d||!d.head||d.documentElement.dataset.proQa)return;
 d.documentElement.dataset.proQa='1';
 var style=d.createElement('style');
 style.textContent='.eng-qa-table{width:100%;border-collapse:collapse;table-layout:fixed;background:#fff;border:1px solid #bcd2de;border-radius:8px}.eng-qa-table th,.eng-qa-table td{border-bottom:1px solid #dce6ec;padding:7px 9px;font-size:10.5px;line-height:1.25;text-align:left;vertical-align:top}.eng-qa-table th{width:31%;background:#e6f0f5;color:#345e78;text-transform:uppercase;font-size:9.5px}.eng-qa-table td span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.eng-qa-table td{overflow-wrap:anywhere}.dossier-content[data-qa-paged="1"]{overflow:hidden;padding:12px 28px}.dossier-content[data-qa-paged="1"] h3{font-size:22px;margin:0 0 5px}.dossier-content[data-qa-paged="1"] .lead{font-size:11px;line-height:1.35;margin-bottom:8px}.dossier-content[data-qa-paged="1"] .dossier-card{padding:11px 14px}.dossier-content[data-qa-paged="1"] .kv{padding:6px 0}.dossier-content[data-qa-paged="1"] .kv dt{font-size:9px}.dossier-content[data-qa-paged="1"] .kv dd{font-size:11px;line-height:1.35;margin:2px 0}.dossier-content[data-qa-paged="1"] .dossier-box{font-size:10px;line-height:1.3;padding:7px 10px;margin:8px 0}.qa-dossier-pagination{display:flex;justify-content:space-between;align-items:center;background:#dfe9f0;border:1px solid #c9d9e4;border-radius:7px;padding:5px 8px;margin-bottom:9px;font-size:10px;color:#2a475c;font-weight:800}.qa-dossier-pagination button{background:#183e55;color:#fff;border-radius:6px;padding:5px 10px;margin-left:5px}.qa-dossier-pagination button:disabled{opacity:.3}.dossier-grid .kv[hidden]{display:none!important}@media(max-height:660px),(max-width:950px){.dossier-content[data-qa-paged="1"]{overflow:auto}}';
 d.head.append(style);
 var sig='',curPage=0,queued=false;
 function enc(s){return String(s||'Not disclosed').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
 function decorate(){
 var cur=api.slides[api.getCurrent()],slide=d.getElementById('slide');
 if(cur&&cur.kind==='profile'&&slide&&!slide.querySelector('.eng-qa-table')){
  var s=api.systems.find(function(x){return x.id===cur.id}),facts=slide.querySelector('.facts-four');
  if(s&&facts){
   var r=s.range_data||{},rad=s.radar||{},arr=[['Sensor / cueing',rad.model||s.sensors],['Radar type',rad.type],['Radar / RF band',rad.band||s.rfBand],['Detection claim',r.detect||rad.detect],['Effector',s.effector],['Effect / capacity',r.defeat||s.capacity]];
   facts.className='facts-data';
   facts.innerHTML='<table class="eng-qa-table"><tbody>'+arr.map(function(x){return '<tr><th>'+enc(x[0])+'</th><td title="'+enc(x[1])+'"><span>'+enc(x[1])+'</span></td></tr>'}).join('')+'</tbody></table>';
  }
 }
 var cont=d.getElementById('dossierContent'),grid=cont&&cont.querySelector('.dossier-grid');
 if(!grid){sig='';return}
 var cols=Array.from(grid.querySelectorAll('.dossier-card')).map(function(x){return Array.from(x.querySelectorAll('.kv'))});
 var k=(d.getElementById('dossierTitle')?.textContent||'')+'|'+(cont.querySelector('h3')?.textContent||'');
 if(sig!==k){sig=k;curPage=0}
 var max=Math.max.apply(null,cols.map(function(x){return Math.ceil(x.length/3)}));if(max<2)return;
 cont.dataset.qaPaged='1';
 var nav=cont.querySelector('.qa-dossier-pagination');if(!nav){nav=d.createElement('div');nav.className='qa-dossier-pagination';grid.before(nav)}
 function show(){
  cols.forEach(function(items){items.forEach(function(el,i){el.hidden=i<curPage*3||i>=(curPage+1)*3})});
  nav.innerHTML='<span>TECHNICAL TABLE · '+(curPage+1)+' / '+max+'</span><span><button data-qa="prev" '+(!curPage?'disabled':'')+'>PREVIOUS</button><button data-qa="next" '+(curPage===max-1?'disabled':'')+'>NEXT →</button></span>';nav.dataset.rendered=String(curPage);cont.scrollTop=0;
 }
 if(!nav.dataset.bound){nav.dataset.bound='1';nav.addEventListener('click',function(e){var b=e.target.closest('[data-qa]');if(!b)return;curPage=Math.max(0,Math.min(max-1,curPage+(b.dataset.qa==='next'?1:-1)));show()})}
 if(nav.dataset.rendered!==String(curPage))show();
 }
 var observer=new w.MutationObserver(function(){if(!queued){queued=true;w.requestAnimationFrame(function(){queued=false;decorate()})}});
 var a=d.getElementById('slide'),b=d.getElementById('dossierContent');
 if(a)observer.observe(a,{childList:true,subtree:true});
 if(b)observer.observe(b,{childList:true,subtree:true});
 decorate();
 w.__CUAS_PRESENTATION_QA={version:'2026-11-22',getDossierPage:function(){return curPage+1}};
}
var iframe=document.getElementById('deckFrame');
if(iframe){iframe.addEventListener('load',function(){attach();setTimeout(attach,200);setTimeout(attach,700)});attach()}
window.PRO_QA_PRESENTATION={pagination:true,version:'2026-11-22'};
})();