// SCSS 
import '../../scss/main.scss';

// JS
import "../storage/load.js";
import '../components/hamburger';
import { renderProfile } from '../templates/profilePage';
import { editImage } from '../handlers/editProfile';

const modal = document.querySelector("[data-modal]");
const close = document.querySelector("[data-close-modal]");
const open = document.querySelector("[data-open-modal]");
const editInput = document.querySelector("#profile-url");

renderProfile();
editImage();

gsap.set(modal, { y: -50, opacity: 1 });

open.addEventListener("click", () => {
  editInput.disabled = false;
    modal.showModal();
    gsap.to(modal, {
      duration: 1,
      ease: "elastic.out(1.2,0.5)",
      y: 0,
      opacity: 1,
    });
  });

close.addEventListener("click", () => {
  editInput.disabled = true;
    modal.close();
});