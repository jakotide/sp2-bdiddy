import"./main-a8e93a93.js";import{l as m,a as k}from"./hamburger-5bbfc2df.js";import{g as D}from"./getProfile-c65c363c.js";import{A as I,L as T,P as B}from"./constants-88326297.js";import{g as C}from"./headers-246ce9a4.js";async function A(t){if(!t)throw new Error("Delete listing requires ID.");const o=`${I}${T}${t}`;try{const e=await fetch(o,{method:"DELETE",headers:C()});if(!e.ok)throw new Error(`Failed to delete listing. Status: ${e.status}`);const r=e.headers.get("content-type");if(r&&r.includes("application/json")){const a=await e.json();console.log(a)}else console.log("Listing deleted successfully.")}catch(e){console.error("Error:",e)}}async function $(){const t=m("User");if(!t||!t.name)throw new Error("Cannot find User");try{const{name:o}=m("User"),e=await D(o),r=document.querySelector(".name"),a=document.querySelector("#profileImage"),u=document.querySelector(".email"),c=document.querySelector(".wins"),b=document.querySelector(".funds"),w=document.querySelector(".listingAmount"),q=document.querySelector(".profile-card-container");a.src=e.avatar,a.alt=`${e.name}'s Profile Image`,r.textContent=e.name,u.textContent=e.email,b.textContent="Funds: "+e.credits+"$",Array.isArray(e.wins)&&e.wins.length===0?c.textContent+=`Number of Wins: ${e.wins.length}`:c.textContent+="No wins yet.",Array.isArray(e.listings)&&e.listings.length===0?w.textContent="No listings yet.":Array.isArray(e.listings)?w.textContent=`Listings: ${e.listings.length}`:console.log(error),e.listings.forEach(n=>{const y=document.createElement("div");y.classList.add("profile-card","border");const l=document.createElement("img");if(!n.media||n.media===" ")cardImage.src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80",cardImage.style.objectFit="cover";else{const p=new Image;p.src=n.media,p.onload=function(){l.src=n.media,l.alt="Image of "+n.title},p.onerror=function(){l.src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80",l.alt="No image available",l.style.objectFit="cover"}}const E=document.createElement("div");E.textContent=n.title;const f=document.createElement("div");f.classList.add("btn-container");const i=document.createElement("a");i.textContent="Delete",i.classList.add("deleteBtn"),i.addEventListener("click",()=>F(n.id));const d=document.createElement("a");d.textContent="View",d.href="/sp2-bdiddy/listing/?id="+n.id,d.classList.add("viewBtn"),f.append(i,d),y.append(l,E,f),q.append(y)})}catch(o){console.error("Error fetching user profile:",o.message)}}const S=document.getElementById("confirmDelete"),x=document.getElementById("cancelDelete"),h=document.getElementById("overlay");function F(t){const o=document.getElementById("deleteModal");gsap.set(o,{y:-50,opacity:0}),h.style.display="block",o.style.display="block",gsap.to(o,{duration:.8,ease:"elastic.out(1.2, 0.5)",y:0,x:0,opacity:1}),S.onclick=()=>U(t),x.onclick=v,document.body.classList.add("modal-open"),h.onclick=()=>{v()}}function v(){const t=document.getElementById("deleteModal");h.style.display="none",t.style.display="none",document.body.classList.remove("modal-open")}const N=document.querySelector(".delete-text");async function U(t){try{k(async()=>{await A(t),S.style.display="none",x.style.display="none",N.textContent="Listing successfully deleted.",setTimeout(()=>{v(),location.reload()},1500)},()=>{console.error("Invalid token")})}catch(o){console.error("Error handling delete:",o)}}async function j(t){const o=m("User");try{o||console.log("Need username");const e=await fetch(`${I}${B}${o.name}/media`,{method:"PUT",headers:C(),body:JSON.stringify({avatar:t.avatar})});if(e.ok)return await e.json();console.log(e.statusText)}catch(e){throw e}}function M(){const t=document.querySelector(".profile-img-form"),o=document.querySelector("#successBtn");if(t){let e=m("User");t.addEventListener("submit",async r=>{r.preventDefault();const a=r.target,u=new FormData(a),c=Object.fromEntries(u.entries());if(c.name=e,!!c.avatar)try{o.innerHTML='<span class="loader"></span>',await j(c),o.innerText="Success",setTimeout(()=>{location.reload()},600)}catch{console.log("error")}})}}const s=document.querySelector("[data-modal]"),P=document.querySelector("[data-close-modal]"),O=document.querySelector("[data-open-modal]"),L=document.querySelector("#profile-url");$();M();gsap.set(s,{y:-50,opacity:1});O.addEventListener("click",()=>{s.classList.add("modal-visible"),L.disabled=!1,s.showModal(),document.body.classList.add("modal-open"),gsap.to(s,{duration:1,ease:"elastic.out(1.2,0.5)",y:0,opacity:1})});P.addEventListener("click",()=>{s.classList.remove("modal-visible"),L.disabled=!0,document.body.classList.remove("modal-open"),s.close()});const g=document.querySelector("dialog");g&&g.addEventListener("click",t=>{t.target===g&&(s.classList.remove("modal-visible"),L.disabled=!0,document.body.classList.remove("modal-open"),s.close())});
