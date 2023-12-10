// SCSS 
import '../../scss/main.scss';

// JS
import "../storage/load.js";
import '../components/hamburger';
import { renderProfile } from '../templates/profilePage';

const modal = document.querySelector("[data-modal]");
const close = document.querySelector("[data-close-modal]");
const open = document.querySelector("[data-open-modal]");

renderProfile();

gsap.set(modal, { y: -50, opacity: 1 });

open.addEventListener("click", () => {
    modal.showModal();
    gsap.to(modal, {
      duration: 1,
      ease: "elastic.out(1.2,0.5)",
      y: 0,
      opacity: 1,
    });
  });

close.addEventListener("click", () => {
    modal.close();
});