(()=>{const a={dalin:[["20261104-dalin-group.webp","大林公民電廠｜現勘合影","左二江志明縣議員；左四江志宏監事主席。"]],roof:[["20261104-roof-visit.webp","邱俐怡老師住宅｜屋頂光電現勘","現場檢視太陽光電模組及逆變器。"]],gao:[["20261104-gaozheng-solar.webp","高鉦繁殖場｜經營管理簡報","謝孟桓執行長現場簡報，介紹養殖經營管理與漁電共生實務。"],["20261104-gaozheng-nursery.webp","高鉦繁殖場｜育苗池現勘","觀察育苗池。"],["20261104-gaozheng-briefing.webp","高鉦繁殖場｜漁電共生設施","現勘魚塭光電棚架、支撐結構與養殖水域配置。"],["20261104-gaozheng-group.webp","高鉦繁殖場｜交流合影","左三為林篤毅董事長，與現勘團隊交流合影。"]]};let pending=false;function run(){document.querySelectorAll('#timeline .stop').forEach(el=>{if(el.dataset.photosDone)return;let name=el.querySelector('h3')?.textContent||'';let k=name.includes('大林公民電廠')?'dalin':name.includes('邱老師住宅')?'roof':name.includes('高鉦台灣鯛')?'gao':null;if(!k)return;const photos=a[k];Promise.all(photos.map(p=>new Promise((res,rej)=>{let im=new Image;im.onload=res;im.onerror=rej;im.src='./images/'+p[0]}))).then(()=>{if(!el.isConnected||el.dataset.photosDone)return;const old=el.querySelector('.site-photos');if(!old)return;const box=document.createElement('div');box.className='site-photos'+(photos.length>1?' site-photos-multi':'');photos.forEach(p=>{let f=document.createElement('figure');f.className='site-photo';const im=new Image;im.src='./images/'+p[0];im.alt=p[1];im.loading='lazy';const cap=document.createElement('figcaption');const strong=document.createElement('strong');strong.textContent=p[1];const note=document.createElement('span');note.textContent=p[2];cap.append(strong,note);f.append(im,cap);box.append(f)});old.replaceWith(box);el.dataset.photosDone='1'}).catch(()=>{})})}run();let tl=document.querySelector('#timeline');if(tl)new MutationObserver(run).observe(tl,{childList:true});})();
;(()=>{
  const style=document.createElement("style");
  style.textContent=[
  ".site-photo img{cursor:zoom-in}",
  ".site-photo:has(img) figcaption:after{content:'點擊照片可放大完整檢視';font-size:10px;color:#6e8e86;margin-top:4px}",
  "dialog.visit-lightbox{position:fixed;inset:0;width:100vw;max-width:none;height:100dvh;max-height:none;background:#0a1820;box-sizing:border-box;color:#fff;border:none;margin:0;padding:0;overflow:hidden;z-index:99999}",
  "dialog.visit-lightbox::backdrop{background:rgba(0,0,0,.92)}",
  ".visit-lightbox .view-body{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:58px 15px 98px;box-sizing:border-box}",
  ".visit-lightbox .full-image{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;box-shadow:0 10px 38px #0009}",
  ".visit-lightbox .view-title{position:absolute;bottom:50px;left:48px;right:48px;text-align:center;font-weight:700;font-size:13px;line-height:1.65}",
  ".visit-lightbox .counter{position:absolute;bottom:24px;left:0;right:0;text-align:center;color:#bdccce;font-size:11px}",
  ".visit-lightbox button{border:0;background:#ffffff25;color:#fff;border-radius:40px;cursor:pointer;touch-action:manipulation}",
  ".visit-lightbox .close{position:absolute;right:16px;top:15px;width:42px;height:42px;font-size:26px;z-index:1}",
  ".visit-lightbox .nav{position:absolute;top:48%;width:36px;height:52px;font-size:28px}",
  ".visit-lightbox .prev{left:7px}.visit-lightbox .next{right:7px}",
  "@media(min-width:700px){.visit-lightbox .view-body{padding:70px 70px 108px}.visit-lightbox .nav{width:45px}}"
  ].join("");
  document.head.appendChild(style);
  const dlg=document.createElement("dialog");
  dlg.className="visit-lightbox";
  dlg.setAttribute("aria-label","現勘照片放大檢視");
  dlg.innerHTML='<button class="close" aria-label="關閉">×</button><button class="nav prev" aria-label="上一張">‹</button><div class="view-body"><img class="full-image" alt=""><div class="view-title"></div><div class="counter"></div></div><button class="nav next" aria-label="下一張">›</button>';
  document.body.appendChild(dlg);
  let current=0,items=[];
  const collect=()=>[...document.querySelectorAll(".site-photo img")].filter(im=>im.offsetWidth>0);
  const display=i=>{
    if(!items.length)return;
    current=(i+items.length)%items.length;
    const img=items[current];
    dlg.querySelector(".full-image").src=img.currentSrc||img.src;
    dlg.querySelector(".full-image").alt=img.alt||"現勘照片";
    dlg.querySelector(".view-title").textContent=img.closest("figure")?.querySelector("figcaption strong")?.textContent||img.alt||"現勘照片";
    dlg.querySelector(".counter").textContent=(current+1)+" / "+items.length;
  };
  document.addEventListener("click",e=>{
    const img=e.target.closest(".site-photo img");
    if(!img)return;
    e.preventDefault();
    items=collect();let index=items.indexOf(img);
    if(index<0)return;
    display(index);if(!dlg.open)dlg.showModal();
  });
  dlg.querySelector(".close").onclick=()=>dlg.close();
  dlg.querySelector(".prev").onclick=()=>display(current-1);
  dlg.querySelector(".next").onclick=()=>display(current+1);
  dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
  dlg.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")display(current-1);if(e.key==="ArrowRight")display(current+1)});
  let startX=null;
  dlg.addEventListener("touchstart",e=>{startX=e.touches[0]?.clientX??null},{passive:true});
  dlg.addEventListener("touchend",e=>{if(startX==null)return;const dx=(e.changedTouches[0]?.clientX??startX)-startX;if(Math.abs(dx)>55)display(current+(dx<0?1:-1));startX=null},{passive:true});
})();
