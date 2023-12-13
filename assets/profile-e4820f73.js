import"./main-fbfed023.js";import{l as m,a as D}from"./hamburger-5bbfc2df.js";import{g as k}from"./getProfile-c65c363c.js";import{A as I,L as T,P as B}from"./constants-88326297.js";import{g as C}from"./headers-246ce9a4.js";async function A(t){if(!t)throw new Error("Delete listing requires ID.");const o=`${I}${T}${t}`;try{const e=await fetch(o,{method:"DELETE",headers:C()});if(!e.ok)throw new Error(`Failed to delete listing. Status: ${e.status}`);const a=e.headers.get("content-type");if(a&&a.includes("application/json")){const r=await e.json();console.log(r)}else console.log("Listing deleted successfully.")}catch(e){console.error("Error:",e)}}async function $(){const t=m("User");if(!t||!t.name)throw new Error("Cannot find User");try{const{name:o}=m("User"),e=await k(o),a=document.querySelector(".name"),r=document.querySelector("#profileImage"),u=document.querySelector(".email"),c=document.querySelector(".wins"),v=document.querySelector(".funds"),w=document.querySelector(".listingAmount"),x=document.querySelector(".profile-card-container");r.src=e.avatar,r.alt=`${e.name}'s Profile Image`,a.textContent=e.name,u.textContent=e.email,v.textContent="Funds: "+e.credits+"$",Array.isArray(e.wins)&&e.wins.length===0?c.textContent+=`Number of Wins: ${e.wins.length}`:c.textContent+="No wins yet.",Array.isArray(e.listings)&&e.listings.length===0?w.textContent="No listings yet.":Array.isArray(e.listings)?w.textContent=`Listings: ${e.listings.length}`:console.log(error),e.listings.forEach(n=>{const y=document.createElement("div");y.classList.add("profile-card","border");const l=document.createElement("img");if(!n.media||n.media===" ")cardImage.src="/assets/img/noimage.jpg";else{const g=new Image;g.src=n.media,g.onload=function(){l.src=n.media,l.alt="Image of "+n.title},g.onerror=function(){l.src="/assets/img/noimage.jpg",l.alt="No image available"}}const b=document.createElement("div");b.textContent=n.title;const f=document.createElement("div");f.classList.add("btn-container");const i=document.createElement("a");i.textContent="Delete",i.classList.add("deleteBtn"),i.addEventListener("click",()=>N(n.id));const d=document.createElement("a");d.textContent="View",d.href="/sp2-bdiddy/listing/?id="+n.id,d.classList.add("viewBtn"),f.append(i,d),y.append(l,b,f),x.append(y)})}catch(o){console.error("Error fetching user profile:",o.message)}}const S=document.getElementById("confirmDelete"),q=document.getElementById("cancelDelete"),L=document.getElementById("overlay");function N(t){const o=document.getElementById("deleteModal");gsap.set(o,{y:-50,opacity:0}),L.style.display="block",o.style.display="block",gsap.to(o,{duration:.8,ease:"elastic.out(1.2, 0.5)",y:0,x:0,opacity:1}),S.onclick=()=>M(t),q.onclick=E,document.body.classList.add("modal-open"),L.onclick=()=>{E()}}function E(){const t=document.getElementById("deleteModal");L.style.display="none",t.style.display="none",document.body.classList.remove("modal-open")}const U=document.querySelector(".delete-text");async function M(t){try{D(async()=>{await A(t),S.style.display="none",q.style.display="none",U.textContent="Listing successfully deleted.",setTimeout(()=>{E(),location.reload()},1500)},()=>{console.error("Invalid token")})}catch(o){console.error("Error handling delete:",o)}}async function P(t){const o=m("User");try{o||console.log("Need username");const e=await fetch(`${I}${B}${o.name}/media`,{method:"PUT",headers:C(),body:JSON.stringify({avatar:t.avatar})});if(e.ok)return await e.json();console.log(e.statusText)}catch(e){throw e}}function F(){const t=document.querySelector(".profile-img-form"),o=document.querySelector("#successBtn");if(t){let e=m("User");t.addEventListener("submit",async a=>{a.preventDefault();const r=a.target,u=new FormData(r),c=Object.fromEntries(u.entries());if(c.name=e,!!c.avatar)try{o.innerHTML='<span class="loader"></span>',await P(c),o.innerText="Success",setTimeout(()=>{location.reload()},600)}catch{console.log("error")}})}}const s=document.querySelector("[data-modal]"),j=document.querySelector("[data-close-modal]"),O=document.querySelector("[data-open-modal]"),h=document.querySelector("#profile-url");$();F();gsap.set(s,{y:-50,opacity:1});O.addEventListener("click",()=>{s.classList.add("modal-visible"),h.disabled=!1,s.showModal(),document.body.classList.add("modal-open"),gsap.to(s,{duration:1,ease:"elastic.out(1.2,0.5)",y:0,opacity:1})});j.addEventListener("click",()=>{s.classList.remove("modal-visible"),h.disabled=!0,document.body.classList.remove("modal-open"),s.close()});const p=document.querySelector("dialog");p&&p.addEventListener("click",t=>{t.target===p&&(s.classList.remove("modal-visible"),h.disabled=!0,document.body.classList.remove("modal-open"),s.close())});
