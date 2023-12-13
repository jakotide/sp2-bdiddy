// SCSS
import "../../scss/main.scss";

// JS
import "../storage/load.js";
import "../components/hamburger";
import { renderProfile } from "../templates/profilePage";
import { editImage } from "../handlers/editProfile";

const modal = document.querySelector("[data-modal]");
const close = document.querySelector("[data-close-modal]");
const open = document.querySelector("[data-open-modal]");
const editInput = document.querySelector("#profile-url");

renderProfile();
editImage();

gsap.set(modal, { y: -50, opacity: 1 });

open.addEventListener("click", () => {
  modal.classList.add("modal-visible");
  editInput.disabled = false;
  modal.showModal();
  document.body.classList.add("modal-open");
  gsap.to(modal, {
    duration: 1,
    ease: "elastic.out(1.2,0.5)",
    y: 0,
    opacity: 1,
  });
});

close.addEventListener("click", () => {
  modal.classList.remove("modal-visible");
  editInput.disabled = true;
  document.body.classList.remove("modal-open");
  modal.close();
});

const dialog = document.querySelector("dialog");

if (dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      modal.classList.remove("modal-visible");
      editInput.disabled = true;
      document.body.classList.remove("modal-open");
      modal.close();
    }
  });
}
