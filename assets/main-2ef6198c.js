import"./main-87429a99.js";import{a as P}from"./hamburger-5bbfc2df.js";import{g as B}from"./read-eeac6ab1.js";import"./constants-88326297.js";import"./headers-246ce9a4.js";const I=document.querySelector(".desertBtn"),z=document.querySelector(".mountainBtn"),G=document.querySelector(".coralBtn"),V=document.querySelector(".mainBtn"),W=document.querySelector(".flowerBtn"),$=document.querySelector(".body"),Q=document.querySelector(".nav"),U=document.querySelector(".hero__grid"),p=document.querySelectorAll(".card__container"),Y=document.querySelector(".marquee"),q=document.querySelector(".theme__container"),J=document.querySelector(".hideThemesBtn"),h=document.querySelector(".showThemesBtn");function S(e,n){e.forEach(t=>{t.setAttribute("data-theme",n)})}function g(e,n){const t=document.querySelectorAll(".card");S(t,n),S([e],n)}function v(e){S([$,Q,U,Y,q,h],e)}function M(e){e.matches&&(q.classList.toggle("active"),h.classList.toggle("active"))}let T=window.matchMedia("(max-width: 30em)");M(T);T.addEventListener("change",function(e){M(e.target)});I.addEventListener("click",()=>{p.forEach(e=>g(e,"desert-fruit")),v("desert-fruit")});z.addEventListener("click",()=>{p.forEach(e=>g(e,"neon-mountain")),v("neon-mountain")});G.addEventListener("click",()=>{p.forEach(e=>g(e,"funky-corals")),v("funky-corals")});V.addEventListener("click",()=>{p.forEach(e=>{g(e,"main-theme"),v("main-theme")})});W.addEventListener("click",()=>{p.forEach(e=>{g(e,"flower-power"),v("flower-power")})});J.addEventListener("click",()=>{q.classList.toggle("active"),h.classList.toggle("active")});h.addEventListener("click",()=>{q.classList.toggle("active"),h.classList.toggle("active")});const K=document.querySelector(".filter__menu-btn"),A=document.querySelector(".filter__menu"),x=document.querySelectorAll(".filter__btn"),w=document.querySelector("#overlay");document.querySelectorAll(".filter-mobile-btn");let E=x[0];x.forEach(e=>{e.addEventListener("click",()=>{e!==E&&(E&&E.classList.remove("active"),e.classList.add("active"),E=e)})});K.addEventListener("click",()=>{A.classList.toggle("active"),w.style.display="block",document.body.classList.add("modal-open")});w.onclick=()=>{A.classList.toggle("active"),w.style.display="none",document.body.classList.remove("modal-open")};document.body.addEventListener("click",e=>{e.target.classList.contains("filter-mobile-btn")&&(w.style.display="none",document.body.classList.remove("modal-open"))});gsap.to(".marquee__part",{xPercent:100,repeat:-1,duration:10,ease:"linear"}).totalProgress(.5);gsap.set(".marquee__inner",{xPercent:-50});function y(e){const n=document.createElement("a");n.classList.add("card","shadow"),n.href="/sp2-bdiddy/listing/?id="+e.id;const t=document.createElement("img");if(t.classList.add("card__img"),!e.media||e.media===" ")t.src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80",t.style.objectFit="cover";else{const s=new Image;s.src=e.media,s.onload=function(){t.src=e.media,t.alt="Image of "+e.title},s.onerror=function(){t.src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80",t.alt="No image available",t.style.objectFit="cover"}}const r=document.createElement("div");r.classList.add("card__details");const c=document.createElement("div");e.seller&&e.seller.name?c.textContent=`${e.seller.name} listed:`:c.textContent="User listed:";const l=document.createElement("h3");l.textContent=e.title;function i(s){return s.reduce((f,L)=>L.amount>f.amount?L:f,s[0])}const a=i(e.bids);let o;if(window.innerWidth<450)if(a){const s=document.createElement("div");s.style.overflow="hidden",s.textContent="Current leader: "+a.bidderName,o=s}else{const s=document.createElement("div");s.textContent="",o=s}else{const s=document.createElement("div");s.textContent="",o=s}const d=document.createElement("div");d.classList.add("card__price","flex-row");const m=document.createElement("div");if(e._count.bids>0){const s=e.bids.sort((L,j)=>(j.amount||0)-(L.amount||0)),f=s[0]&&s[0].amount;s.length===0||f===void 0?m.innerHTML="No bids":m.innerHTML=f+"$"}else m.innerHTML="No bids";const k=document.createElement("i");return k.classList.add("fa-solid","fa-arrow-right"),r.append(c,l,o),d.append(m,k),n.append(t,r,d),n}function O(e,n,t){const c=e.filter(o=>{const d=o.title.toLowerCase();return!d.includes("test")&&!d.includes("testing")&&!d.includes("tester")&&!d.includes("title")}).sort((o,d)=>new Date(d.created)-new Date(o.created)),l=c.slice(0,8);let i=c.slice(8,40);const a=document.querySelector(".showMoreBtn");a.addEventListener("click",()=>{a.innerHTML='<span class="loader"></span>',setTimeout(()=>{i=c.slice(41,100),t.append(...i.map(y)),a.style.display="none"},2e3)}),n.append(...l.map(y)),t.append(...i.map(y))}async function X(){const e=await B(),n=document.querySelector(".search"),t=document.querySelector("#search-input"),r=document.querySelector("#searchResults");return n&&n.addEventListener("submit",async c=>{c.preventDefault();const l=t.value.trim().toLowerCase(),i=e.filter(a=>{var C;const o=(a.title||"").toLowerCase(),d=(a.description||"").toLowerCase(),m=(((C=a.seller)==null?void 0:C.name)||"").toLowerCase();return o.includes(l)||d.includes(l)||m.includes(l)});r.innerHTML="",R(i,r)}),[]}function R(e,n){if(n.innerHTML="",!e||!Array.isArray(e)||e.length===0){const r=document.querySelector("#searchContainer"),c=document.createElement("div");c.style.textAlign="Center",c.style.fontFamily="MabryPro-Regular",c.textContent="No matching results found.",r.style.display="Block",n.appendChild(c);return}const t=e.map(y);n.append(...t)}async function F(){const e=await B(),n=document.querySelectorAll(".electronics"),t=document.querySelectorAll(".fashion"),r=document.querySelectorAll(".vehicles"),c=document.querySelectorAll(".retro"),l=document.querySelectorAll(".food"),i=document.querySelectorAll(".art"),a=document.querySelectorAll(".housing");n.forEach(o=>{o.addEventListener("click",()=>u("Electronics",e))}),t.forEach(o=>{o.addEventListener("click",()=>u("Fashion",e))}),r.forEach(o=>{o.addEventListener("click",()=>u("Vehicles",e))}),l.forEach(o=>{o.addEventListener("click",()=>u("Food",e))}),c.forEach(o=>{o.addEventListener("click",()=>u("Retro",e))}),i.forEach(o=>{o.addEventListener("click",()=>u("Art",e))}),a.forEach(o=>{o.addEventListener("click",()=>u("Housing",e))})}async function u(e,n){const t=await Z(e,n),r=document.querySelector("#searchResults");H(t,r)}async function Z(e,n){const t=e.toLowerCase(),c={electronics:["electronics","iphone","computer","data","lamp"],fashion:["clothing","jacket","hat","gloves","tux","dress"],vehicles:["car","volvo","nissan","toyota","ferrari","boat","plane","motor","offroad"],retro:["vintage","retro","vinyl","old"],food:["cake","muffin","banana","apple","food","pizza","burger","candy","pear"],art:["painting","sculpture","art"],housing:["house","apartment","castle","tower"]}[t]||[];return n.filter(i=>{const a=i.title.toLowerCase();return c.some(d=>a.includes(d))})}function H(e,n){const t=document.querySelector("#searchContainer"),r=document.querySelectorAll(".all");if(n.innerHTML="",r.forEach(l=>{l.addEventListener("click",()=>{t.style.display="none"})}),!e||e.length===0){const l=document.querySelector("#searchContainer"),i=document.createElement("div");i.style.textAlign="Center",i.style.fontFamily="MabryPro-Regular",i.textContent="No matching results found.",l.style.display="Block",n.appendChild(i);return}const c=document.createDocumentFragment();e.forEach(l=>{const i=y(l);c.appendChild(i)}),t.style.display="Block",n.appendChild(c)}F();const b=document.querySelector(".to-top-btn");function D(){window.addEventListener("scroll",()=>{window.innerWidth>500&&(window.scrollY>1500?b.classList.add("active"):b.classList.remove("active"))})}const N=document.querySelector("#searchResults");async function ee(){const e=await F();e&&H(e,N)}ee();async function te(){const e=await X();document.querySelector("#searchButton").addEventListener("click",()=>{R(e,N)})}te();async function ne(){const e=document.querySelector("#newContainer"),n=document.querySelector("#allContainer"),t=document.querySelector(".loader");t.style.display="block";try{const r=await B();O(r,e,n),t.style.display="none"}catch(r){console.error("Error fetching listings:",r),t.style.display="none"}}ne();const _=document.querySelector("#createBtn");P(()=>{_.style.display="block"},()=>{_.style.display="none"});D();