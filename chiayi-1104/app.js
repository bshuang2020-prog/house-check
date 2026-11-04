const stops=[
{id:'yunlin',n:'高鐵雲林站｜集合',t:'09:30',e:'09:30–10:00',kind:'travel',tag:'集合／出發',lat:23.7361,lng:120.4169,addr:'雲林縣虎尾鎮站前東路301號',query:'高鐵雲林站 3號出口',desc:'09:30 在高鐵雲林站 3 號出口集合，搭車前往大林公民電廠；車程約 30 分鐘。'},
{id:'dalin',n:'嘉義大林公民電廠',t:'10:00',e:'10:00–11:30',kind:'visit',tag:'上午現勘',lat:23.593272,lng:120.442676,addr:'嘉義縣溪口鄉下員林270號',query:'23.593272,120.442676',desc:'與合作社交流居民參與、集資分紅、收益資訊公開及公益回饋；了解如何透過透明揭露和社區協作建立地方信任。'},
{id:'roof',n:'邱老師住宅屋頂光電',t:'上午',e:'10:00–11:30 時段內',kind:'visit',tag:'屋頂訪視',lat:23.607,lng:120.456,addr:'嘉義縣大林鎮明和里甘蔗崙43-85號',query:'嘉義縣大林鎮明和里甘蔗崙43-85號',desc:'大林交流後前往住宅屋頂案場，車程約 5 分鐘；訪談住戶參與原因與實際設置經驗。此站無獨立指定抵達時間。',estimate:true},
{id:'lunch',n:'蘊味・臺菜嘉餚',t:'12:10',e:'12:10–13:30',kind:'travel',tag:'午餐',lat:23.472,lng:120.29,addr:'嘉義縣太保市故宮大道795號',query:'嘉義縣太保市故宮大道795號 蘊味 臺菜嘉餚',desc:'11:30 自大林出發，約 40 分鐘車程；午餐安排至 13:30。',estimate:true},
{id:'orange',n:'橙光嘉義東石布袋漁電共生案場',t:'途經',e:'13:30–14:00 途中（視情況停留約 5 分鐘）',kind:'visit',tag:'備選短停',optional:true,lat:23.415685,lng:120.217207,addr:'嘉義縣布袋鎮嘉18-1鄉道附近（途經暫留參考點）',query:'23.415685,120.217207',desc:'午餐後前往高鉦途中可視時間、交通與現場安全暫留約 5 分鐘；非正式固定行程，可能影響後續抵達時間。此座標為途中觀察點，並非爭議單元的精確地號或位置。'},
{id:'gao',n:'高鉦台灣鯛繁殖場',t:'14:00',e:'14:00–16:00',kind:'visit',tag:'下午現勘',lat:23.405194,lng:120.204491,addr:'嘉義縣布袋鎮考試里考試潭206號',query:'23.405194,120.204491',desc:'觀察漁電共生完工復養，了解承租養殖戶如何與地主及開發業者協調光電配置、施工期間及養殖需求。入口轉入魚塭區位置：23.401305, 120.206435。'},
{id:'chiayi',n:'高鐵嘉義站｜賦歸',t:'16:30',e:'16:00–16:30',kind:'travel',tag:'結束／返程',lat:23.4594,lng:120.3234,addr:'嘉義縣太保市高鐵西路168號',query:'高鐵嘉義站',desc:'16:00 離開高鉦繁殖場，車程約 30 分鐘，預計 16:30 抵達高鐵嘉義站。'}];
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nav=s=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.query);
let includeOptional=false;
const activeStops=()=>stops.filter(s=>!s.optional||includeOptional);
const routeLink=()=>{const list=activeStops();return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent('高鐵雲林站')+'&destination='+encodeURIComponent('高鐵嘉義站')+'&travelmode=driving&waypoints='+encodeURIComponent(list.slice(1,-1).map(s=>s.query).join('|'));};
document.getElementById('all-nav').href=routeLink();
let map, markers={}, line;
if(typeof L!=='undefined'){
 map=L.map('map',{zoomControl:false,scrollWheelZoom:false}).setView([23.52,120.34],10);
 L.control.zoom({position:'bottomright'}).addTo(map);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap contributors'}).addTo(map);
 stops.forEach((s,i)=>{
 const html='<div class="marker '+(s.optional?'opt':s.kind==='visit'?'vis':'')+'"><span>'+(s.optional?'＋':stops.filter(x=>!x.optional).indexOf(s)+1)+'</span></div>';
 const icon=L.divIcon({html,className:'',iconSize:[32,32],iconAnchor:[16,32]});
 let marker=L.marker([s.lat,s.lng],{icon}).addTo(map);
 marker.bindPopup('<b>'+escapeHtml(s.n)+'</b><br>'+escapeHtml(s.e)+(s.optional?'<br><strong>備選：非正式固定行程</strong><br><small>僅為途經觀察座標，非陳情單元精確位置</small>':'')+'<br>'+escapeHtml(s.addr)+(s.estimate?'<br><small>※ 地圖位置為地址參考定位</small>':'')+'<br><a href="'+nav(s)+'" target="_blank" rel="noopener">Google Maps 導航 ↗</a>');
 markers[s.id]=marker;
 });
 const coords=activeStops().map(s=>[s.lat,s.lng]);
 line=L.polyline(coords,{color:'#0d8b83',weight:3,opacity:.65,dashArray:'7 9'}).addTo(map);
 const fit=()=>map.fitBounds(line.getBounds().pad(.15));
 fit();document.getElementById('fit').addEventListener('click',fit);
}else{
 document.querySelector('#map').innerHTML='<p style="padding:28px">地圖載入失敗，仍可使用下方各站 Google Maps 導航。</p>';
 document.getElementById('fit').disabled=true;
}
const visitGoals={
 dalin:['了解合作社、社區發展協會與居民的參與、決策及溝通方式。','確認售電收益存摺公告、社員分紅及屋頂租金如何揭露，包含公開頻率、內容與查閱對象。','了解收益分配說明、契約公證及社區公益回饋如何建立信任與監督。','討論可借鏡於漁電共生的資訊透明作法，例如回饋承諾公開、執行情形揭露及追蹤。'],
 roof:['詢問住戶參與公民電廠、提供屋頂的動機與實際經驗。','了解合作社及社區發展協會在申設與溝通過程中提供哪些協助。','觀察住宅屋頂光電的設置與使用情形，蒐集居民端的回饋。'],
 orange:['觀察途經位置與村落廟宇、主要出入口及周邊住宅之相對關係，留意此點不必然為陳情單元精確位置。','對照既有環社檢核結果與地方陳情，釐清居民關切事項及早期溝通是否充分。','若現場可確認，了解光電業者與主管機關後續回應、因應對策及資訊揭露情況。'],
 gao:['了解承租養殖戶如何在地主與光電業者之間實際參與規劃及協商。','確認光電配置如何避開核心育苗池，並與功能池、蓄水池及養殖動線協調。','了解打樁、施工通知、曬池與空池安排，及其對產季和養殖操作的影響。','現地觀察完工復養、施工問題處理與營運協調經驗，討論一般養殖戶可適用的保障機制。']
};
const siteBackgrounds={
 dalin:'明華社區早期運用金牌社區獎金，在社區活動中心屋頂設置約 9kW 太陽光電，之後成立公民電廠合作社，推動在地居民微型集資。收益涵蓋社員分紅、屋頂租金與社區公益，形成「社區發電、社區受益」的模式。',
 roof:'本次走訪的是大林公民電廠安排的住宅屋頂光電案場，距離室內簡報交流地點約 5 分鐘車程。相較於合作社組織層面的經驗，這一站可從住戶角度了解參與動機、設備設置與日常使用。',
 orange:'依內部案件資料，橙光嘉義東石布袋漁電共生案於 2023 年 9 月通過環社檢核，並於 2025 年 3 月取得施工許可。2026 年 10 月 14 日內部通報記載，部分單元因靠近布袋鎮樹林里廟宇、重要出入口而引發居民抗議與陳情。案場範圍分散，途經參考點不等於爭議單元精確位置。',
 gao:'高鉦為嘉義布袋台灣鯛魚苗繁殖業者，養殖環境對水質、魚池配置與繁殖季節較為敏感。案場土地由高鉦承租，地主與光電業者合作開發，因此高鉦雖非地主，卻是直接受配置與施工影響、必須提出養殖需求的經營者。'
};
function renderBackground(s){
 const bg=siteBackgrounds[s.id];if(!bg)return '';
 return '<div class="site-background"><div class="site-background-title">案場背景</div><p>'+escapeHtml(bg)+'</p></div>';
}
function renderOptionalToggle(s){
 if(!s.optional)return '';
 return '<div class="optional-panel"><div class="optional-info"><strong>沿途備選｜約 5 分鐘</strong><span>非正式固定站點；納入後會加入互動路線與全程導航，是否停留依現場交通與時間決定。</span></div>'+
 '<label class="optional-toggle"><input class="optional-checkbox" type="checkbox" '+(includeOptional?'checked':'')+'><span>'+(includeOptional?'已納入路線':'納入路線')+'</span></label></div>';
}
function renderGoals(s){
 const gs=visitGoals[s.id];if(!gs)return '';
 return '<div class="goals"><div class="goals-title"><span>◎ 本站現勘目標</span><span class="goals-hint">現場交流／觀察事項</span></div><ol>'+gs.map(g=>'<li>'+escapeHtml(g)+'</li>').join('')+'</ol></div>';
}
const sitePhotos={
  dalin:[{
    src:"./images/dalin-real.jpg",
    alt:"嘉義大林公民電廠的屋頂太陽能板與合作社相關人員實景",
    title:"大林公民電廠｜屋頂光電實景",
    note:"2023 年資料照片，非 11/04 當日拍攝",
    credit:"ESG遠見｜蘇義傑 攝",
    source:"https://esg.gvm.com.tw/article/25737"
  }],
  roof:[{
    src:"./images/rooftop-real.jpg",
    alt:"嘉義大林公民電廠合作社相關屋頂光電實景，非邱老師住宅",
    title:"大林合作社｜其他屋頂光電案例",
    note:"同合作社案例照片，非邱老師住宅、非當日拍攝",
    credit:"今周刊｜劉咸昌 攝",
    source:"https://www.businesstoday.com.tw/article/category/183027/post/202312130027/"
  }],
  orange:[{
    src:"./images/orange-202610-report.webp",
    alt:"橙光案場爭議路口附近布條與居民情形，為2026年10月14日內部通報附圖",
    title:"橙光案場｜爭議路口觀察影像",
    note:"2026/10/14 內部通報附圖，非當日照片；非途經標記點精確定位",
    credit:"《嘉義內部補充資訊 v1.1》第7頁",
    source:null
  }],
  gao:[{
    src:"./images/gaozheng-farm-work.jpg",
    alt:"嘉義布袋高鉦台灣鯛繁殖場實際育苗及種魚作業照片",
    title:"高鉦繁殖場｜魚塭育苗作業",
    note:"2026 年 2 月資料照片，非 11/04 當日拍攝",
    credit:"聯合新聞網｜圖取自張建成臉書",
    source:"https://udn.com/news/story/7470/9314786"
  },{
    src:"./images/gaozheng-real.jpg",
    alt:"高鉦台灣鯛繁殖場飼養之吉富品系台灣鯛",
    title:"高鉦繁殖場｜台灣鯛養殖實況",
    note:"2025 年資料照片，為養殖作業照片",
    credit:"農傳媒／豐年雜誌｜梁鴻彬 攝",
    source:"https://www.agriharvest.tw/archives/127138/"
  }]
};
function renderPhotos(s){
 const arr=sitePhotos[s.id];if(!arr)return '';
 return '<div class="site-photos '+(arr.length>1?'site-photos-multi':'')+'">'+arr.map(p=>{
  const img='<img src="'+p.src+'" alt="'+escapeHtml(p.alt)+'" loading="lazy" decoding="async">';
  const frame=p.source?'<a href="'+p.source+'" target="_blank" rel="noopener" aria-label="開啟圖片資料來源：'+escapeHtml(p.title)+'">'+img+'</a>':'<div class="photo-no-link">'+img+'</div>';
  const source=p.source?'<a href="'+p.source+'" target="_blank" rel="noopener">圖片來源：'+escapeHtml(p.credit)+' ↗</a>':'<span class="photo-source">來源：'+escapeHtml(p.credit)+'</span>';
  return '<figure class="site-photo">'+frame+'<figcaption><strong>'+escapeHtml(p.title)+'</strong><span>'+escapeHtml(p.note)+'</span>'+source+'</figcaption></figure>';
 }).join('')+'</div>';
}
function renderEvidence(s){
 if(s.id!=='dalin')return '';
 return '<aside class="case-evidence">'+
 '<div class="case-evidence-label">值得借鏡｜收益資訊公開</div>'+
 '<p>既有參訪資料記載，合作社曾於社區公告欄定期公開售電收益存摺，並透過收益分配說明、契約公證增進居民信任。今日可進一步確認公開頻率、查閱對象、執行現況，以及漁電共生如何建立相應的回饋資訊揭露與追蹤方式。</p>'+
 '<small>資料依據：《嘉義內部補充資訊 v1.1》，第 11、13 頁（既有案例，現況以現勘確認為準）</small>'+
 '</aside>';
}
function syncRoute(){
 document.getElementById('all-nav').href=routeLink();
 const toggle=document.getElementById('orangeMapToggle'); if(toggle)toggle.checked=includeOptional;
 if(line)line.setLatLngs(activeStops().map(s=>[s.lat,s.lng]));
}
function paint(filter='all'){
 const list=stops.filter(s=>filter==='all'||s.kind===filter);
 const official=stops.filter(s=>!s.optional);
 document.getElementById('timeline').innerHTML=list.map(s=>
  '<article class="stop '+s.kind+(s.optional?' optional':'')+'">'+
    '<div class="stem"><div class="number">'+(s.optional?'＋':String(official.indexOf(s)+1).padStart(2,'0'))+'</div></div>'+
    '<div class="stop-card"><div class="stop-top"><span class="time">'+escapeHtml(s.e)+'</span><span class="type">'+escapeHtml(s.tag)+'</span></div>'+
      '<h3>'+escapeHtml(s.n)+'</h3>'+
      renderBackground(s)+renderPhotos(s)+
      '<p class="stop-highlight"><strong>今日觀察：</strong>'+escapeHtml(s.desc)+'</p>'+
      renderOptionalToggle(s)+renderGoals(s)+renderEvidence(s)+
      '<div class="addr">⌖ '+escapeHtml(s.addr)+(s.estimate?' <small>（標記位置請以導航地址確認）</small>':'')+'</div>'+
      '<div class="card-buttons"><a class="nav-btn" href="'+nav(s)+'" target="_blank" rel="noopener">↗ Google Maps 導航</a><button class="locate-btn" data-id="'+s.id+'">◎ 地圖定位</button></div>'+
    '</div></article>'
 ).join('');
 document.querySelectorAll('.locate-btn').forEach(b=>b.addEventListener('click',()=>{
  const m=markers[b.dataset.id];if(m&&map){document.querySelector('.map-section').scrollIntoView({behavior:'smooth',block:'start'});map.setView(m.getLatLng(),13,{animate:true});setTimeout(()=>m.openPopup(),250);}
 }));
 document.querySelectorAll('.optional-checkbox').forEach(cb=>cb.addEventListener('change',()=>{
   includeOptional=cb.checked;syncRoute();paint(document.querySelector('#tabs button.active')?.dataset.filter||'all');
   toast(includeOptional?'已將橙光備選點加入導航路線':'已恢復正式行程路線');
 }));
}
paint();
document.getElementById('orangeMapToggle')?.addEventListener('change',e=>{includeOptional=e.target.checked;syncRoute();paint(document.querySelector('#tabs button.active')?.dataset.filter||'all');toast(includeOptional?'已將橙光備選點加入路線':'已恢復六站正式行程');});
document.getElementById('tabs').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');paint(b.dataset.filter)}));
function toast(s){const t=document.getElementById('toast');t.innerText=s;t.style.display='block';setTimeout(()=>t.style.display='none',2600)}
document.getElementById('share').addEventListener('click',async()=>{
 if(navigator.share){try{await navigator.share({title:'嘉義 11/04 現勘互動地圖',text:'嘉義一日現勘行程、地點與導航',url:location.href});return}catch(e){if(e.name==='AbortError')return}}
 try{await navigator.clipboard.writeText(location.href);toast('網址已複製，可貼給同事')}catch(e){toast('請複製瀏覽器網址分享')}
});