(()=>{"use strict";
const M=window.LOCAL_MEDIA_MANIFEST?.records||[],byKey=new Map(M.map(x=>[x.key,x]));
const $=id=>document.getElementById(id),safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ar=()=>document.getElementById("portal")?.dir==="rtl",L=(en,arab)=>ar()?arab:en;
const missing=/^\s*(?:\*\s*)?(?:not disclosed[^\n]*|not publicly[^\n]*|undisclosed[^\n]*|no public data|no data available|not specified|n\/a|unknown|not established|not documented)(?:\s*[.*])?\s*$/i;
const state=window.ATLAS_TEST?.state,nav=[];
function save(){if(!state)return;nav.push({view:state.view,domain:state.domain,country:state.country,category:state.category,query:state.query,tab:state.tab,limit:state.limit});if(nav.length>50)nav.shift()}
function back(){if(mediaMode){mediaMode=false;render();return}const st=nav.pop();if(st&&state){Object.assign(state,st);render()}else window.ATLAS_TEST?.setView("home");window.scrollTo(0,0)}
document.addEventListener("click",e=>{const el=e.target.closest("[data-action]");if(!el||!state||el.id==="localUxBack")return;if(/^(home|country|weapon|compare|choose-country|compare-country|choose-domain|choose-type|compare-type|all-types|filter-domain)$/.test(el.dataset.action||"")){mediaMode=false;save()}},true);
function clean(root){if(!root)return;for(const dd of root.querySelectorAll("dd,.kv dd,.eng-table td")){if(missing.test(dd.textContent)){if(dd.closest(".kv"))dd.closest(".kv").hidden=true;else if(dd.textContent)dd.textContent=""}}}
const labels={"ALL COUNTRIES":"كل الدول","ALL DOMAINS":"كل المجالات","ALL TYPES":"كل الأنواع","COUNTRY / ORIGIN":"الدولة / المنشأ","TECHNICAL COMPARISON MATRIX":"جدول المقارنة الفنية","SCROLL TABLE":"التمرير المتصل","ENABLE PAGES":"تفعيل الصفحات","SCROLL":"التمرير","ENABLE PAGINATION":"تفعيل الصفحات","PREVIOUS":"السابق","NEXT":"التالي","EXPORT ALL 215":"تصدير بيانات المنظومات","SELECT COUNTRY":"اختيار الدولة","SELECT DOMAIN":"اختيار المجال","COMPARE SELECTED":"قارن المنظومات المختارة","FIELD":"البيان","STATUS":"الحالة","SOURCE":"المصدر","MANUFACTURER":"الشركة المصنّعة","COUNTRY":"الدولة","TYPE":"النوع","AIRFRAME":"هيكل الطائرة","PAYLOAD":"الحمولة","ENDURANCE":"زمن البقاء","RADAR":"الرادار","RANGE":"المدى","SENSORS":"المستشعرات","DETECTION":"الكشف","SOFTWARE":"البرمجيات","LIMITATIONS":"القيود","PREVIOUS SYSTEM":"المنظومة السابقة","NEXT SYSTEM":"المنظومة التالية","TECHNICAL FIELDS":"البيانات الفنية","System classification":"تصنيف المنظومة","Maturity / field evidence":"النضج والدليل الميداني","Role / platform":"المهمة / المنصة","Sensors / payload":"المستشعرات / الحمولة","Radar / sensing type":"نوع الرادار والاستشعار","Radar / RF band":"نطاق الرادار / التردد","Published detection claim":"مدى الكشف المعلن","Response / effectors":"وسائل المواجهة","Published effect range":"مدى التأثير المعلن","Tracked / concurrent targets":"عدد الأهداف المتتبعة / المتزامنة","Flight endurance":"زمن البقاء في الجو","Air speed":"السرعة الجوية","Service ceiling":"أقصى ارتفاع","Payload capacity":"الحمولة","Data links":"وصلات البيانات","Navigation":"الملاحة","Autonomy / AI / software":"الاستقلالية والذكاء الاصطناعي","Cost evidence":"بيانات التكلفة","Field use / program":"الاستخدام الميداني / البرنامج","Primary source":"المصدر الأصلي","Evidence":"الأدلة","Engineering dossier":"الملف الهندسي"};
function translate(root){if(!ar()||!root)return;for(const el of root.querySelectorAll("th,dt,label,button,option,.panel-kicker,.eng-heading h2")){if(el.children.length)continue;const t=el.textContent.trim();if(labels[t]&&el.textContent!==labels[t])el.textContent=labels[t]}}
function injectNav(){const top=document.querySelector(".top-links");if(!top)return;
if(!$("localUxBack")){const b=document.createElement("button");b.id="localUxBack";b.textContent="← Back";b.onclick=back;top.prepend(b)}
if(!$("localUxMedia")){const b=document.createElement("button");b.id="localUxMedia";b.textContent="MEDIA";b.onclick=media;top.append(b)}
const b=$("localUxBack");const t=L("← Back","→ رجوع");if(b.textContent!==t)b.textContent=t;b.disabled=!nav.length&&!mediaMode;
const m=$("localUxMedia"),v=L("MEDIA LIBRARY","مكتبة الوسائط");if(m.textContent!==v)m.textContent=v}
let mediaMode=false,domain="",query="";
function media(){mediaMode=true;drawMedia()}
function drawMedia(){const root=$("root");if(!root)return;
const list=M.filter(x=>(!domain||x.domain===domain)&&(!query||[x.name,x.country,x.manufacturer,x.category].join(" ").toLowerCase().includes(query)));
const cards=list.map(r=>{const pic=r.equipment_images.find(x=>x.local);const image=pic?.local||r.system_icon;
return '<article class="ux-media-card"><img src="'+safe(image)+'" loading="lazy" alt="'+safe(pic?"Study media for "+r.name:"Editorial type illustration, not a photograph")+'"><div><small>'+safe(r.domain.toUpperCase())+" · "+safe(r.category)+'</small><h3>'+safe(r.name)+'</h3><p>'+safe(r.country)+" · "+safe(r.manufacturer)+'</p><small>'+(pic?L("Locally extracted study media","صورة من مواد الدراسة"):L("Editorial type illustration (not a photo)","رسم توضيحي وليس صورة فعلية"))+'</small><div class="ux-media-actions"><a href="'+safe(r.source_url)+'" target="_blank" rel="noopener noreferrer">'+L("SOURCE","المصدر")+'</a>'+r.video_items.map(v=>'<a href="'+safe(v.external_url)+'" target="_blank" rel="noopener noreferrer">▶ '+L("VIDEO LINK","رابط فيديو")+'</a>').join("")+'</div></div></article>'}).join("");
root.innerHTML='<section class="ux-media-heading"><button id="uxMediaBack">'+L("← Back to explorer","→ العودة إلى المستعرض")+'</button><h1>'+L("Local equipment media library","مكتبة الوسائط المحلية للمنظومات")+'</h1><p>'+L("Local study images and editorial icons are labeled separately. Publisher video links are not downloaded files.","صور الدراسة المحلية والرسوم التوضيحية مميزة بوضوح. روابط الفيديو ليست نسخاً محلية.")+'</p></section><div class="ux-media-filter"><select id="uxMediaDomain"><option value="">'+L("All systems","كل المنظومات")+'</option><option value="uas" '+(domain==="uas"?"selected":"")+'>UAS</option><option value="cuas" '+(domain==="cuas"?"selected":"")+'>Counter-UAS</option></select><input id="uxMediaQuery" type="search" value="'+safe(query)+'" placeholder="'+L("Search system or company","بحث باسم المنظومة أو الشركة")+'"><b>'+list.length+' / '+M.length+'</b></div><section class="ux-media-grid">'+cards+"</section>";
$("uxMediaBack").onclick=()=>{mediaMode=false;render()};$("uxMediaDomain").onchange=e=>{domain=e.target.value;drawMedia()};
$("uxMediaQuery").oninput=e=>{query=e.target.value.toLowerCase();const at=e.target.selectionStart;drawMedia();$("uxMediaQuery").focus();$("uxMediaQuery").setSelectionRange(at,at)};
}
function setCards(){for(const r of window.ATLAS_TEST?.catalog||[]){const meta=byKey.get(r.domain+"-"+String(r.id).padStart(3,"0"));if(!meta||r.uxLocalized)continue;const pic=meta.equipment_images.find(x=>x.local&&x.kind==="photo")||meta.equipment_images.find(x=>x.local);r.thumb=pic?.local||meta.system_icon;r.imageType=pic?"study-media":"illustration";r.imageCredit=pic?.credit||"Editorial type illustration — not an equipment photograph";r.galleryCount=meta.equipment_images.length;r.videoCount=meta.video_items.length;r.videos=meta.video_items.map(x=>({url:x.external_url,title:x.title}));r.uxLocalized=true}}
function addIcons(root){if(!root)return;for(const box of root.querySelectorAll(".result,.type-card")){if(box.dataset.uxIcon)continue;const txt=box.querySelector(".label,strong");if(!txt)continue;const rec=M.find(x=>x.name===box.querySelector("h4")?.textContent.trim());const category=rec?.category||Object.keys(window.LOCAL_TYPE_ICONS||{}).find(x=>txt.textContent.includes(x));const path=window.LOCAL_TYPE_ICONS?.[category];if(path){const img=document.createElement("img");img.src=path;img.className="ux-icon";img.alt="";txt.prepend(img);box.dataset.uxIcon="1"}}}
function childView(){const f=$("deckFrame");if(!f)return;let d,w,api;try{d=f.contentDocument;w=f.contentWindow;api=w?.UAS_TEST||w?.CUAS_TEST}catch(e){return}if(!api||!d?.body)return;
d.body.dir=ar()?"rtl":"ltr";
const css=".dossier-content,.compare-table,.table-wrap{overflow:auto!important;overscroll-behavior:contain}.dossier-foot>span{display:none!important}.ux-child-back{background:#d8b47e;color:#102c40;padding:6px 10px;border:0;border-radius:6px;font-weight:800}.ux-six{width:100%;border-collapse:collapse;font-size:11px}.ux-six th,.ux-six td{border-bottom:1px solid #d0dde6;padding:8px;text-align:left}.ux-six th{width:39%;background:#dce9f0;color:#234259}.ux-six td{background:#fff}.dossier-grid .kv[hidden]{display:none!important}";
if(!d.getElementById("uxStyle")){const st=d.createElement("style");st.id="uxStyle";st.textContent=css;d.head.append(st)}
let top=d.querySelector(".dossier-top");if(top&&!d.getElementById("uxChildBack")){const b=d.createElement("button");b.id="uxChildBack";b.className="ux-child-back";b.textContent=L("← Back","→ رجوع");b.onclick=()=>d.querySelector('[data-close="dossier"]')?.click();top.prepend(b)}
if(w.UAS_TEST){const cur=api.scene[api.getCurrent()],s=api.systems.find(x=>x.id===cur?.id),facts=d.querySelector(".profile .facts-four");
if(s&&facts&&!facts.dataset.uxDone){const rows=[["Airframe",s.airframe],["Endurance",s.endurance],["Payload",s.payload],["Sensors",s.sensors],["Communications",s.communications],["Status",s.status]].filter(x=>x[1]&&!missing.test(x[1]));facts.innerHTML='<table class="ux-six"><tbody>'+rows.map(x=>"<tr><th>"+safe(x[0])+"</th><td>"+safe(x[1])+"</td></tr>").join("")+"</tbody></table>";facts.dataset.uxDone="1"}}
const s=api.systems;
if(s&&!d.body.dataset.uxRecords){for(const rec of s){const domain=w.UAS_TEST?"uas":"cuas",meta=byKey.get(domain+"-"+String(rec.id).padStart(3,"0"));if(!meta)continue;if(domain==="uas"){rec.image_url=null}else{for(let i=0;i<(rec.gallery_items||[]).length;i++){const x=meta.equipment_images[i];if(x)rec.gallery_items[i].src=x.local||meta.system_icon}}}d.body.dataset.uxRecords="1"}
clean(d);translate(d);
}

/* Local study-media gallery; no remote image requests. */
const gallery=document.createElement("dialog");
gallery.style.cssText="width:min(850px,94vw);max-height:90vh;border:1px solid #adc4d2;border-radius:12px;padding:16px;background:#f5f9fc;color:#14334a";
document.body.append(gallery);
const localItems=r=>(r.equipment_images||[]).filter(x=>typeof x.local==="string"&&/^assets\/[a-z0-9_./-]+$/i.test(x.local)&&!x.local.includes(".."));
const photo=x=>String(x.kind||"").toLowerCase()==="photo";
let galleryRecord=null,galleryIndex=0,galleryReturn=null,availability="all";
function galleryDraw(){
 const r=galleryRecord,items=localItems(r),item=items[galleryIndex];
 gallery.dir=ar()?"rtl":"ltr";
 gallery.innerHTML='<div style="display:flex;justify-content:space-between;gap:12px;align-items:center"><h2 style="font-size:19px;margin:0">'+safe(r.name)+'</h2><button data-gal="close" aria-label="'+L("Close","إغلاق")+'">×</button></div><img style="width:100%;height:min(48vh,420px);object-fit:contain;background:#102941;margin-top:12px;border-radius:8px" src="'+safe(item?.local||r.system_icon)+'" alt="'+safe(item?item.kind:L("Editorial illustration","رسم توضيحي"))+'"><p style="font-size:12px;line-height:1.5">'+(item?(photo(item)?L("Photograph","صورة فوتوغرافية"):L("Study illustration / crop","رسم أو جزء من صورة")):L("Editorial illustration — not equipment photo","رسم توضيحي وليس صورة للمنظومة"))+' · '+safe(item?.credit||item?.caption||"")+'</p><div style="display:flex;align-items:center;justify-content:space-between"><button data-gal="prev" '+(galleryIndex<=0?'disabled':'')+'>'+L("Previous","السابق")+'</button><span>'+(items.length?(galleryIndex+1)+" / "+items.length:L("No local photo","لا توجد صورة محلية"))+'</span><button data-gal="next" '+(galleryIndex>=items.length-1?'disabled':'')+'>'+L("Next","التالي")+'</button></div>';
}

function renderLicensedSources(){
 if(!gallery.open||!galleryRecord||gallery.querySelector(".licensed-source-links"))return;
 const entries=(galleryRecord.equipment_images||[]).filter(x=>!x.local&&x.source_url&&/^https:\/\//i.test(x.source_url)&&(x.license_url||x.civil_media_verified===true));
 if(!entries.length)return;
 const section=document.createElement("div");section.className="licensed-source-links";section.style.cssText="margin-top:12px;padding:10px;border-top:1px solid #c8d8e1;font-size:12px";
 const h=document.createElement("strong");h.textContent=L("Photographic sources available online","مصادر الصور المتاحة عبر الإنترنت");section.append(h);
 for(const x of entries){const p=document.createElement("p"),a=document.createElement("a"),license=document.createElement("a");a.href=x.source_url;a.target="_blank";a.rel="noopener noreferrer";a.textContent=L("Open photograph and attribution","فتح الصورة وبيانات الإسناد");if(x.license_url&&/^https:\/\//i.test(x.license_url)){license.href=x.license_url;license.target="_blank";license.rel="noopener noreferrer";license.textContent=x.license||"License";}else{license.removeAttribute("href");license.textContent=L("Reuse rights unconfirmed","حقوق إعادة الاستخدام غير مؤكدة");}p.append(a,document.createTextNode(" · "+(x.credit||"")+" · "),license);section.append(p)}
 gallery.append(section);
}
new MutationObserver(renderLicensedSources).observe(gallery,{attributes:true,childList:true});

gallery.addEventListener("click",e=>{const b=e.target.closest("[data-gal]");if(!b)return;if(b.dataset.gal==="close"){gallery.close();return}galleryIndex=Math.max(0,Math.min(localItems(galleryRecord).length-1,galleryIndex+(b.dataset.gal==="next"?1:-1)));galleryDraw()});
gallery.addEventListener("close",()=>galleryReturn?.focus());
function enhanceGallery(){
 const grid=document.querySelector(".ux-media-grid");if(!grid)return;
 let count=0;
 for(const card of grid.querySelectorAll(".ux-media-card")){
 const r=M.find(x=>x.name===card.querySelector("h3")?.textContent.trim());if(!r)continue;
 const items=localItems(r),p=items.some(photo);
 card.style.display=(availability==="all"||availability==="photo"&&p||availability==="media"&&items.length||availability==="missing"&&!p||availability==="video"&&r.video_items.length)?"":"none";
 if(card.style.display!=="none")count++;
 if(!card.querySelector(".ux-gallery-open")){
 const b=document.createElement("button");b.className="ux-gallery-open";b.textContent=L("VIEW GALLERY","عرض المعرض")+" · "+items.length;b.style.cssText="margin-top:9px;padding:8px;border-radius:6px;border:0;background:#174961;color:white;cursor:pointer;font-weight:800";
 b.onclick=()=>{galleryRecord=r;galleryIndex=Math.max(0,items.findIndex(photo));galleryReturn=b;galleryDraw();gallery.showModal()};card.lastElementChild.append(b);
 }}
 let controls=document.getElementById("uxGalleryFilter");
 if(!controls){controls=document.createElement("div");controls.id="uxGalleryFilter";controls.style.cssText="display:flex;gap:12px;align-items:center;padding:10px 0";controls.innerHTML='<label>'+L("Media availability","توفر الوسائط")+'</label><select><option value="all">'+L("All records","جميع السجلات")+'</option><option value="photo">'+L("Local photos","صور محلية")+'</option><option value="media">'+L("Any local media","وسائط محلية")+'</option><option value="missing">'+L("No local photo","لا توجد صورة محلية")+'</option><option value="video">'+L("Publisher video link","رابط فيديو الناشر")+'</option></select><span></span>';grid.before(controls);const select=controls.querySelector("select");select.value=availability;select.onchange=()=>{availability=select.value;enhanceGallery()}}
 const label=count+" / "+grid.children.length;if(controls.querySelector("span").textContent!==label)controls.querySelector("span").textContent=label;
}


/* Filter-scoped presentation controls. */
let sequence=[],cursor=-1,focusReturn=null;
const atlas=window.ATLAS_TEST;
const active=()=>cursor>=0&&sequence.length&&$("viewer")?.classList.contains("active");
const queueRows=()=>(atlas?.filter?.()||[]).map(x=>({domain:x.domain,id:x.id,name:x.name}));
function updateSequence(){
 const toolbar=$("viewer")?.querySelector(".viewer-toolbar");if(!toolbar)return;
 let bar=$("resultQueueBar");
 if(!bar){bar=document.createElement("div");bar.id="resultQueueBar";bar.className="result-queue-bar";toolbar.append(bar);bar.innerHTML='<button type="button" data-seq="prev"></button><span role="status" aria-live="polite"></span><button type="button" data-seq="next"></button>';bar.onclick=e=>{const b=e.target.closest("[data-seq]");if(b)stepSequence(b.dataset.seq==="next"?1:-1)}}
 bar.hidden=!active();if(bar.hidden)return;
 const prev=bar.querySelector('[data-seq="prev"]'),next=bar.querySelector('[data-seq="next"]'),p=bar.querySelector("span");
 const a=L("← Previous system","→ المنظومة السابقة"),b=L("Next system →","المنظومة التالية ←"),c=(cursor+1)+" / "+sequence.length+" · "+sequence[cursor].name;
 if(prev.textContent!==a)prev.textContent=a;if(next.textContent!==b)next.textContent=b;if(p.textContent!==c)p.textContent=c;
 prev.disabled=cursor===0;next.disabled=cursor===sequence.length-1;
}
function resetSequence(){sequence=[];cursor=-1;updateSequence()}
function openSequence(i){if(i<0||i>=sequence.length)return;cursor=i;const r=sequence[i];let api;try{const w=$("deckFrame")?.contentWindow;api=r.domain==="uas"?w?.UAS_TEST:w?.CUAS_TEST}catch(e){}const scenes=api?.slides||api?.scene||[],target=scenes.findIndex(x=>(x.kind==="profile"||x.kind==="system")&&String(x.id)===String(r.id));if(active()&&target>=0){window.atlasLoadTicket=(window.atlasLoadTicket||0)+1;api.goto(target)}else atlas.openAtlas(r.domain,r.id,"profile");updateSequence()}
function startSequence(rows,i=0,focus=null){if(!rows.length)return;sequence=rows.slice();focusReturn=focus;openSequence(i)}
function stepSequence(d){if(active())openSequence(cursor+d)}
function stopSequence(){atlas.closeAtlas();resetSequence();focusReturn?.focus();focusReturn=null}
function seqKeys(e){if(!active()||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target?.closest?.("input,textarea,select,[contenteditable],video,audio"))return;
 let d=0;if(e.key==="ArrowRight"||e.key==="PageDown")d=1;else if(e.key==="ArrowLeft"||e.key==="PageUp")d=-1;else return;
 e.preventDefault();e.stopImmediatePropagation();stepSequence(d);
}
function bindSequenceFrame(){let d;try{d=$("deckFrame")?.contentDocument}catch(e){return}if(!d||d.__seqBound)return;d.__seqBound=true;d.addEventListener("keydown",seqKeys,true);
 d.addEventListener("click",e=>{if(!active())return;const b=e.target.closest("button");if(!b||b.closest("#dossier,.dossier,.dossier-content,[role=dialog]"))return;const id=(b.id||"").toLowerCase(),t=(b.getAttribute("aria-label")||b.title||"").toLowerCase();
 let v=0;if(/^(nextbtn|btnnext|nextslide|next)$/.test(id)||/^(next slide|next system)$/.test(t))v=1;else if(/^(prevbtn|btnprev|prevslide|prev|previous)$/.test(id)||/^(previous slide|previous system)$/.test(t))v=-1;
 if(v){e.preventDefault();e.stopImmediatePropagation();stepSequence(v)}
 },true)}
function addSequenceControls(){
 const root=$("root");if(!root||!atlas)return;
 const all=root.querySelector('[data-action="all-types"]');
 if(all){const t=L("Show all types · Presentation ↗","عرض جميع الأنواع · عرض تقديمي");if(all.textContent!==t)all.textContent=t}
 const heading=root.querySelector(".results-heading");
 if(heading&&!heading.querySelector("#playFilteredResults")){const b=document.createElement("button");b.id="playFilteredResults";b.type="button";b.className="btn gold";b.textContent=L("▶ Present all results","▶ عرض كل النتائج");b.onclick=()=>startSequence(queueRows(),0,b);heading.append(b)}
 // Country tiles derive exclusively from indexed system records; never add empty countries.
 const placeholder=root.querySelector("#egyptCoverageEntry");if(placeholder)placeholder.remove();
 if(state?.view==="compare"){
  const labels={countries:["By country","حسب الدولة"],types:["By system type","حسب نوع المنظومة"],makers:["By company / manufacturer","حسب الشركة / الجهة المصنّعة"],cross:["Country × system type","الدولة × نوع المنظومة"]};
  for(const b of root.querySelectorAll(".exp-tabs button[data-tab]")){const pair=labels[b.dataset.tab];if(pair){const t=L(pair[0],pair[1]);if(b.textContent!==t)b.textContent=t}}
 }
 if(cursor>=0&&!$("viewer")?.classList.contains("active"))resetSequence();else updateSequence();
}
document.addEventListener("keydown",seqKeys,true);
document.addEventListener("click",e=>{const b=e.target.closest("[data-action]");if(!b)return;const a=b.dataset.action;
 if(a==="all-types"){e.preventDefault();e.stopImmediatePropagation();startSequence(queueRows(),0,b);return}
 if(a==="open-system"&&state?.view!=="compare"&&$("root")?.querySelector(".results")){const rows=queueRows(),i=rows.findIndex(x=>x.domain===b.dataset.domain&&String(x.id)===String(b.dataset.id));if(i>=0){e.preventDefault();e.stopImmediatePropagation();startSequence(rows,i,b);return}}
 if(a==="back"&&active()){e.preventDefault();e.stopImmediatePropagation();stopSequence();return}
 if(a==="switch"&&active())resetSequence();
},true);
$("deckFrame")?.addEventListener("load",bindSequenceFrame);
window.ATLAS_RESULT_PRESENTATION={getQueue:()=>sequence.slice(),getIndex:()=>cursor,step:stepSequence,close:stopSequence};

function decorate(){injectNav();addSequenceControls();if(mediaMode){enhanceGallery();return}setCards();addIcons($("root"));clean($("root"));translate($("root"));childView()}
let pending=false;function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;decorate()})}
new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true});
const f=$("deckFrame");f?.addEventListener("load",()=>{setTimeout(schedule,40);setTimeout(schedule,350)});
document.addEventListener("click",e=>{if(e.target.closest('[data-action="lang"]'))setTimeout(()=>{if(mediaMode)drawMedia();schedule()},100)},true);
schedule();
window.ATLAS_LOCAL_UX={manifestCount:M.length,back,media};
})();