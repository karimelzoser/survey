(function(){
  'use strict';
  if(!window.ATLAS_TEST || typeof home !== 'function' || typeof compareView !== 'function') return;
  var step = 0;
  var originalCompare = compareView;
  var emblem = 'https://upload.wikimedia.org/wikipedia/commons/7/71/Egyptian_Air_Defense_Forces_Logo.png';
  function tx(en, arText){ return state.lang==='ar' ? arText : en; }
  function titleText(text){return String(text).replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function flagCountry(c){return (flags[c]||'🌐')+' '+titleText(state.lang==='ar'?(AR_COUNTRY[c]||c):c);}
  function controls(){
    var labels=[tx('Overview','المقدمة'),tx('Research questions','أسئلة الدراسة'),tx('Country comparison','المقارنة بين الدول'),tx('Evaluation framework','منهجية التقييم')];
    return '<div class="brief-controls" aria-label="Briefing progression"><div class="brief-track">'+labels.map(function(n,i){return '<button type="button" data-brief="'+i+'" class="brief-step '+(i===step?'active':'')+'" aria-current="'+(i===step?'step':'false')+'"><b>'+String(i+1).padStart(2,'0')+'</b><span>'+n+'</span></button>';}).join('')+'</div><div class="brief-arrows"><button type="button" data-brief="'+Math.max(0,step-1)+'" '+(step===0?'disabled':'')+' aria-label="Previous">&#8249;</button><button type="button" data-brief="'+Math.min(3,step+1)+'" '+(step===3?'disabled':'')+' aria-label="Next">&#8250;</button></div></div>';
  }
  function header(tag,heading,subtitle){return '<div class="brief-heading"><span class="brief-kicker">'+tag+'</span><h1>'+heading+'</h1><p>'+subtitle+'</p></div>';}
  function footer(){
    return '<div class="brief-foot"><span>'+tx('PUBLIC-SOURCE ENGINEERING REVIEW · 2026','مراجعة هندسية من المصادر العلنية · ٢٠٢٦')+'</span><span>'+tx('Published specifications ≠ independently verified effectiveness','المواصفات المنشورة لا تعني فاعلية مثبتة بالاختبارات المستقلة')+'</span></div>';
  }
  function cover(){
    var origin=header('01 / '+tx('EGYPTIAN AIR DEFENCE FORCES · R&D CENTRE','قوات الدفاع الجوي المصرية · مركز البحوث والتطوير'),
      tx('Global <em>UAS</em> &amp;<br>Counter-UAS Intelligence','دراسة <em>الطائرات بدون طيار</em><br>ومنظومات مواجهتها'),
      tx('A question-led, country-by-country technical review of unmanned aircraft and their defensive counter-systems.',
         'مراجعة فنية منظمة تبدأ بالأسئلة البحثية، ثم الدول، ثم المنظومات ومكوناتها وأدلة تشغيلها.'));
    var nU=totalU,nC=totalC;
    return '<section class="brief-cover"><div class="brief-main">'+
      '<div class="brief-identity"><img src="'+emblem+'" alt="Egyptian Air Defence Forces insignia" onerror="this.hidden=true;this.nextElementSibling.hidden=false" /><span class="brief-seal-fallback" hidden>🇪🇬</span><div><strong>'+tx('RESEARCH & DEVELOPMENT CENTRE','مركز البحوث والتطوير')+'</strong><small>'+tx('EGYPTIAN AIR DEFENCE FORCES','قوات الدفاع الجوي المصرية')+'</small></div></div>'+
      origin+
      '<div class="brief-cover-buttons"><button class="brief-primary" data-brief="1">'+tx('START THE RESEARCH BRIEFING','ابدأ العرض البحثي')+' →</button><button class="brief-secondary" data-action="compare">'+tx('OPEN COMPARISON TABLES','فتح جداول المقارنة')+'</button></div>'+
      '<div class="brief-author">'+tx('PREPARED BY','إعداد')+' <b>'+tx('Captain / Karim Mabrouk','النقيب / كريم مبروك')+'</b><small>'+tx('Public-source research presentation','عرض بحثي يعتمد على المصادر العلنية')+'</small></div></div>'+
      '<div class="brief-domain-grid"><div class="brief-domain uas"><span class="brief-giant">✈</span><span class="brief-domain-label">01 / UNCREWED AVIATION</span><h2>UAS</h2><p>'+tx('Airframe · payload · communications · endurance · navigation','المنصة · الحمولة · الاتصالات · زمن البقاء · الملاحة')+'</p><div class="brief-domain-count"><b>'+nU+'</b><small>'+tx('CURATED FAMILIES','عائلة ضمن الدراسة')+'</small></div></div>'+
      '<div class="brief-domain cuas"><span class="brief-giant">◎</span><span class="brief-domain-label">02 / AIR DEFENCE</span><h2>COUNTER-UAS</h2><p>'+tx('Detection · tracking · control · countermeasure · evidence','الكشف · التتبع · القيادة · المواجهة · الأدلة')+'</p><div class="brief-domain-count"><b>'+nC+'</b><small>'+tx('CURATED FAMILIES','عائلة ضمن الدراسة')+'</small></div></div></div></section>';
  }
  function questions(){
    var q=[
      [tx('01 · THE THREAT','٠١ · التهديد'),tx('Which UAS types exist, and what differentiates their capabilities?','ما فئات الطائرات بدون طيار، وما الاختلافات الفنية بين قدراتها؟'),tx('Platform class · flight performance · payload · communications','الفئة · الأداء الجوي · الحمولة · الاتصالات')],
      [tx('02 · THE RESPONSE','٠٢ · المواجهة'),tx('Which technologies detect, classify, track and counter them?','ما تقنيات الكشف والتصنيف والتتبع والمواجهة؟'),tx('Radar · RF · EO/IR · C2 · kinetic & non-kinetic','الرادار · الترددات · البصريات · القيادة · وسائل المواجهة')],
      [tx('03 · THE GLOBAL LANDSCAPE','٠٣ · الخريطة العالمية'),tx('Which countries, manufacturers and technologies are represented?','ما الدول والشركات والفئات التكنولوجية الممثلة في الدراسة؟'),tx('Country × technology matrix · manufacturer origin','مصفوفة الدول والتقنيات · بلد تطوير الشركة')],
      [tx('04 · THE EVIDENCE','٠٤ · الأدلة'),tx('What is actually documented rather than merely advertised?','ما الذي تثبته المصادر علنًا، وما الذي يظل ادعاءً تسويقيًا؟'),tx('Public ranges · field evidence · maturity · cost limits','المدى المعلن · الاستخدام الميداني · النضج · حدود الأسعار')]
    ];
    return '<section class="brief-questions">'+header('02 / '+tx('RESEARCH QUESTIONS','أسئلة الدراسة'),
      tx('Four questions.<br><em>One structured assessment.</em>','أربعة أسئلة.<br><em>منهج تقييم واحد.</em>'),
      tx('The presentation must establish these questions before presenting equipment profiles.','تُطرح هذه الأسئلة قبل الانتقال إلى ملفات المنظومات ومقارنتها.'))+
      '<div class="brief-question-grid">'+q.map(function(x){return '<article class="brief-question"><span>'+x[0]+'</span><h2>'+x[1]+'</h2><p>'+x[2]+'</p></article>';}).join('')+'</div>'+
      '<div class="brief-bottom-action"><button class="brief-primary" data-brief="2">'+tx('NEXT · COMPARE COUNTRIES','التالي · مقارنة الدول')+' →</button><button class="brief-secondary" data-action="weapon">'+tx('BROWSE EQUIPMENT','استعراض المنظومات')+'</button></div></section>';
  }
  function table(){
    var rows=countryRows().slice(0,8);
    return '<div class="brief-country-card"><div class="brief-table-head"><strong>'+tx('COUNTRY × DOMAIN · TOP EIGHT BY CURATED FAMILY COUNT','الدولة × المجال · أعلى ثماني دول من حيث عدد العائلات المدرجة')+'</strong><span>'+tx('Not inventory or combat strength','لا تمثل حجم التسلح أو القوة القتالية')+'</span></div><div class="brief-table-wrap"><table class="brief-country-table"><thead><tr><th>'+tx('PRIMARY ORIGIN','بلد التطوير الأساسي')+'</th><th>UAS</th><th>COUNTER-UAS</th><th>'+tx('TOTAL','الإجمالي')+'</th></tr></thead><tbody>'+rows.map(function(r){return '<tr data-action="compare-country" data-country="'+titleText(r.c)+'"><td>'+flagCountry(r.c)+'</td><td>'+r.uas+'</td><td>'+r.cuas+'</td><td><b>'+r.total+'</b></td></tr>';}).join('')+'</tbody></table></div></div>';
  }
  function comparison(){
    return '<section class="brief-comparison">'+header('03 / '+tx('COUNTRY AND DOMAIN COMPARISON','مقارنة الدول والمجالات'),
      tx('Compare the <em>evidence,</em><br>not just the names.','قارن <em>البيانات،</em><br>وليس الأسماء فقط.'),
      tx('System families are counted once by their primary development origin. Select a row to explore its manufacturers and systems.','تُحسب كل عائلة حسب بلد التطوير الأساسي. اختر دولة لعرض الشركات والمنظومات التابعة لها.'))+
      '<div class="brief-comparison-body">'+table()+'<aside class="brief-summary"><div class="brief-metrics"><div><b>'+totalU+'</b><small>UAS</small></div><div><b>'+totalC+'</b><small>COUNTER-UAS</small></div><div><b>'+countries.length+'</b><small>'+tx('ORIGIN CHAPTERS','دولة/برنامج منشأ')+'</small></div><div><b>'+new Set(C.map(function(x){return x.manufacturer;})).size+'</b><small>'+tx('MANUFACTURERS','الشركات')+'</small></div></div><p>'+tx('Compare by country, type and manufacturer. The full atlas also includes the country × technology matrix.','تتوفر مقارنات حسب الدول والفئات والشركات، بالإضافة إلى مصفوفة الدول × أنواع المنظومات.')+'</p><button class="brief-primary" data-action="compare">'+tx('OPEN ALL FOUR TABLES','افتح جداول المقارنة الأربعة')+' →</button><button class="brief-secondary" data-brief="3">'+tx('NEXT · EVALUATION FRAMEWORK','التالي · منهجية التقييم')+' →</button></aside></div></section>';
  }
  function framework(){
    var arr=[
      [tx('PLATFORM / TYPE','المنصة / الفئة'),tx('Airframe, role, propulsion','الهيكل، المهمة، الدفع'),tx('Sensing, C2, effector','الاستشعار، القيادة، وسيلة التأثير')],
      [tx('PERFORMANCE','الأداء'),tx('Endurance, ceiling, payload, speed','زمن البقاء، الارتفاع، الحمولة، السرعة'),tx('Detection / effect ranges by subsystem','مدى الكشف والتأثير لكل مكون')],
      [tx('ELECTRONICS','الإلكترونيات'),tx('Navigation, datalink, EO/IR, autonomy','الملاحة، الوصلة، التصوير، الاستقلالية'),tx('Radar type / band, RF, EO/IR, fusion','نوع الرادار ونطاقه، RF، EO/IR، الدمج')],
      [tx('CAPACITY','الاستيعاب'),tx('Payload or formation capability','الحمولة أو قدرة التشغيل الجماعي'),tx('Tracked targets vs simultaneous engagements','عدد الأهداف المتتبعة مقابل الاشتباكات المتزامنة')],
      [tx('EVIDENCE','الأدلة'),tx('Maturity, programmes, operational use','النضج، البرامج، الاستخدام التشغيلي'),tx('Trials, deployments, limits, price basis','التجارب، التشغيل، القيود، أساس السعر')]
    ];
    return '<section class="brief-framework">'+header('04 / '+tx('STANDARDIZED ENGINEERING DOSSIERS','الملفات الفنية الموحدة'),
      tx('Every system.<br><em>The same questions.</em>','كل منظومة.<br><em>نفس معايير التقييم.</em>'),
      tx('Use a consistent technical schema so the comparison is meaningful; unreported values are explicitly undisclosed.','تُستخدم حقول فنية ثابتة للمقارنة، مع توضيح أي بيانات غير معلنة دون افتراض قيم لها.'))+
      '<div class="brief-framework-table"><table><thead><tr><th>'+tx('EVALUATION FIELD','عنصر التقييم')+'</th><th>UAS</th><th>COUNTER-UAS</th></tr></thead><tbody>'+arr.map(function(r){return '<tr><th>'+r[0]+'</th><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>';}).join('')+'</tbody></table></div>'+
      '<div class="brief-bottom-action"><button class="brief-primary" data-action="country">'+tx('EXPLORE BY COUNTRY','استعرض حسب الدولة')+' →</button><button class="brief-secondary" data-action="weapon">'+tx('EXPLORE BY SYSTEM','استعرض حسب المنظومة')+'</button><button class="brief-secondary" data-action="compare">'+tx('COMPARISON TABLES','جداول المقارنة')+'</button></div></section>';
  }
  home = function(){
    var body = [cover,questions,comparison,framework][step]();
    return '<div class="brief-shell">'+controls()+'<div class="brief-stage">'+body+'</div>'+footer()+'</div>';
  };
  compareView = function(){
    return '<div class="brief-context"><strong>'+tx('RESEARCH TABLES','جداول الدراسة')+'</strong><span>'+tx('Countries · technologies · manufacturers · country × type. Select a table tab to change the view.','الدول · التقنيات · الشركات · الدولة × الفئة. اختر التبويب المناسب للمقارنة.')+'</span></div>'+originalCompare();
  };
  document.addEventListener('click',function(event){
    var stepBtn=event.target.closest('[data-brief]');
    if(stepBtn){
      event.preventDefault();
      step=Math.max(0,Math.min(3,Number(stepBtn.dataset.brief)||0));
      state.view='home';
      render();
      return;
    }
    var homeBtn=event.target.closest('[data-action="home"]');
    if(homeBtn){step=0;}
  },true);
  render();
  window.ATLAS_BRIEFING_REFRESH={version:'2026-11-22',getStep:function(){return step;},setStep:function(n){step=Math.max(0,Math.min(3,Number(n)||0));state.view='home';render();}};
})();