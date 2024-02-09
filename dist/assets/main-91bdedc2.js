import"./main-a8e93a93.js";import{a as P}from"./hamburger-5bbfc2df.js";import{g as B}from"./read-eeac6ab1.js";import"./constants-88326297.js";import"./headers-246ce9a4.js";const z=document.querySelector(".desertBtn"),I=document.querySelector(".mountainBtn"),G=document.querySelector(".coralBtn"),V=document.querySelector(".mainBtn"),W=document.querySelector(".flowerBtn"),$=document.querySelector(".body"),Q=document.querySelector(".nav"),U=document.querySelector(".hero__grid"),g=document.querySelectorAll(".card__container"),Y=document.querySelector(".marquee"),C=document.querySelector(".theme__container"),J=document.querySelector(".hideThemesBtn"),p=document.querySelector(".showThemesBtn");function k(e,n){e.forEach(t=>{t.setAttribute("data-theme",n)})}function v(e,n){const t=document.querySelectorAll(".card");k(t,n),k([e],n)}function L(e){k([$,Q,U,Y,C,p],e)}function T(e){e.matches&&(C.classList.toggle("active"),p.classList.toggle("active"))}let A=window.matchMedia("(max-width: 30em)");T(A);A.addEventListener("change",function(e){T(e.target)});z.addEventListener("click",()=>{g.forEach(e=>v(e,"desert-fruit")),L("desert-fruit")});I.addEventListener("click",()=>{g.forEach(e=>v(e,"neon-mountain")),L("neon-mountain")});G.addEventListener("click",()=>{g.forEach(e=>v(e,"funky-corals")),L("funky-corals")});V.addEventListener("click",()=>{g.forEach(e=>{v(e,"main-theme"),L("main-theme")})});W.addEventListener("click",()=>{g.forEach(e=>{v(e,"flower-power"),L("flower-power")})});J.addEventListener("click",()=>{C.classList.toggle("active"),p.classList.toggle("active")});p.addEventListener("click",()=>{C.classList.toggle("active"),p.classList.toggle("active")});const K=document.querySelector(".filter__menu-btn"),q=document.querySelector(".filter__menu"),x=document.querySelectorAll(".filter__btn"),y=document.querySelector("#overlay");document.querySelectorAll(".filter-mobile-btn");let w=x[0];x.forEach(e=>{e.addEventListener("click",()=>{e!==w&&(w&&w.classList.remove("active"),e.classList.add("active"),w=e)})});K.addEventListener("click",()=>{q.classList.toggle("active"),y.style.display="block",document.body.classList.add("modal-open")});q.addEventListener("click",e=>{e.stopPropagation(),q.classList.toggle("active"),y.style.display="none",document.body.classList.remove("modal-open")});y.onclick=()=>{q.classList.toggle("active"),y.style.display="none",document.body.classList.remove("modal-open")};document.body.addEventListener("click",e=>{e.target.classList.contains("filter-mobile-btn")&&(y.style.display="none",document.body.classList.remove("modal-open"))});document.body.addEventListener("click",e=>{e.target.classList.contains("active")&&(y.style.display="none",document.body.classList.remove("modal-open"))});gsap.to(".marquee__part",{xPercent:100,repeat:-1,duration:10,ease:"linear"}).totalProgress(.5);gsap.set(".marquee__inner",{xPercent:-50});function h(e){const n=document.createElement("a");n.classList.add("card","shadow"),n.href="/sp2-bdiddy/listing/?id="+e.id;const t=document.createElement("img");if(t.classList.add("card__img"),t.loading="lazy",!e.media||e.media===" ")t.src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80",t.style.objectFit="cover";else{const s=new Image;s.src=e.media,s.onload=function(){t.src=e.media,t.alt="Image of "+e.title},s.onerror=function(){t.src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80",t.alt="No image available",t.style.objectFit="cover"}}const r=document.createElement("div");r.classList.add("card__details");const c=document.createElement("div");e.seller&&e.seller.name?c.textContent=`${e.seller.name} listed:`:c.textContent="User listed:";const l=document.createElement("h3");l.textContent=e.title;function i(s){return s.reduce((f,E)=>E.amount>f.amount?E:f,s[0])}const d=i(e.bids);let o;if(window.innerWidth<450)if(d){const s=document.createElement("div");s.style.overflow="hidden",s.textContent="Current leader: "+d.bidderName,o=s}else{const s=document.createElement("div");s.textContent="",o=s}else{const s=document.createElement("div");s.textContent="",o=s}const a=document.createElement("div");a.classList.add("card__price","flex-row");const m=document.createElement("div");if(e._count.bids>0){const s=e.bids.sort((E,j)=>(j.amount||0)-(E.amount||0)),f=s[0]&&s[0].amount;s.length===0||f===void 0?m.innerHTML="No bids":m.innerHTML=f+"$"}else m.innerHTML="No bids";const b=document.createElement("i");return b.classList.add("fa-solid","fa-arrow-right"),r.append(c,l,o),a.append(m,b),n.append(t,r,a),n}function O(e,n,t){const c=e.filter(o=>{const a=o.title.toLowerCase();return!a.includes("test")&&!a.includes("testing")&&!a.includes("tester")&&!a.includes("title")&&!a.includes("tiger")&&!a.includes("wool")&&!a.includes("tewtdj")}).sort((o,a)=>new Date(a.created)-new Date(o.created)),l=c.slice(0,8);let i=c.slice(8,40);const d=document.querySelector(".showMoreBtn");d.addEventListener("click",()=>{d.innerHTML='<span class="loader"></span>',setTimeout(()=>{i=c.slice(41,100),t.append(...i.map(h)),d.style.display="none"},2e3)}),n.append(...l.map(h)),t.append(...i.map(h))}async function X(){const e=await B(),n=document.querySelector(".search"),t=document.querySelector("#search-input"),r=document.querySelector("#searchResults");return n&&n.addEventListener("submit",async c=>{c.preventDefault();const l=t.value.trim().toLowerCase(),i=e.filter(d=>{var S;const o=(d.title||"").toLowerCase(),a=(d.description||"").toLowerCase(),m=(((S=d.seller)==null?void 0:S.name)||"").toLowerCase();return o.includes(l)||a.includes(l)||m.includes(l)});r.innerHTML="",R(i,r)}),[]}function R(e,n){if(n.innerHTML="",!e||!Array.isArray(e)||e.length===0){const r=document.querySelector("#searchContainer"),c=document.createElement("div");c.style.textAlign="Center",c.style.fontFamily="MabryPro-Regular",c.textContent="No matching results found.",r.style.display="Block",n.appendChild(c);return}const t=e.map(h);n.append(...t)}async function F(){const e=await B(),n=document.querySelectorAll(".electronics"),t=document.querySelectorAll(".fashion"),r=document.querySelectorAll(".vehicles"),c=document.querySelectorAll(".retro"),l=document.querySelectorAll(".food"),i=document.querySelectorAll(".art"),d=document.querySelectorAll(".housing");n.forEach(o=>{o.addEventListener("click",()=>u("Electronics",e))}),t.forEach(o=>{o.addEventListener("click",()=>u("Fashion",e))}),r.forEach(o=>{o.addEventListener("click",()=>u("Vehicles",e))}),l.forEach(o=>{o.addEventListener("click",()=>u("Food",e))}),c.forEach(o=>{o.addEventListener("click",()=>u("Retro",e))}),i.forEach(o=>{o.addEventListener("click",()=>u("Art",e))}),d.forEach(o=>{o.addEventListener("click",()=>u("Housing",e))})}async function u(e,n){const t=await Z(e,n),r=document.querySelector("#searchResults");H(t,r)}async function Z(e,n){const t=e.toLowerCase(),c={electronics:["electronics","iphone","computer","data","lamp"],fashion:["clothing","jacket","hat","gloves","tux","dress"],vehicles:["car","volvo","nissan","toyota","ferrari","boat","plane","motor","offroad"],retro:["vintage","retro","vinyl","old"],food:["cake","muffin","banana","apple","food","pizza","burger","candy","pear"],art:["painting","sculpture","art"],housing:["house","apartment","castle","tower"]}[t]||[];return n.filter(i=>{const d=i.title.toLowerCase();return c.some(a=>d.includes(a))})}function H(e,n){const t=document.querySelector("#searchContainer"),r=document.querySelectorAll(".all");if(n.innerHTML="",r.forEach(l=>{l.addEventListener("click",()=>{t.style.display="none"})}),!e||e.length===0){const l=document.querySelector("#searchContainer"),i=document.createElement("div");i.style.textAlign="Center",i.style.fontFamily="MabryPro-Regular",i.textContent="No matching results found.",l.style.display="Block",n.appendChild(i);return}const c=document.createDocumentFragment();e.forEach(l=>{const i=h(l);c.appendChild(i)}),t.style.display="Block",n.appendChild(c)}F();const _=document.querySelector(".to-top-btn");function D(){window.addEventListener("scroll",()=>{window.innerWidth>500&&(window.scrollY>1500?_.classList.add("active"):_.classList.remove("active"))})}const N=document.querySelector("#searchResults");async function ee(){const e=await F();e&&H(e,N)}ee();async function te(){const e=await X();document.querySelector("#searchButton").addEventListener("click",()=>{R(e,N)})}te();async function ne(){const e=document.querySelector("#newContainer"),n=document.querySelector("#allContainer"),t=document.querySelector(".loader");t.style.display="block";try{const r=await B();O(r,e,n),t.style.display="none"}catch(r){console.error("Error fetching listings:",r),t.style.display="none"}}ne();const M=document.querySelector("#createBtn");P(()=>{M.style.display="block"},()=>{M.style.display="none"});D();
