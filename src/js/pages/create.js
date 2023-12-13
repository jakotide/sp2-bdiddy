// SCSS
import "../../scss/main.scss";

// JS
import "../components/hamburger";
import "../components/tags";
import "../handlers/submitListing.js";
import { submitListing } from "../handlers/submitListing.js";

const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

gsap.set(modal, { y: -50, opacity: 1 });

openModalBtn.addEventListener("click", () => {
  document.body.classList.add("modal-open");
  modal.classList.add("modal-visible");
  modal.showModal();
  gsap.to(modal, {
    duration: 0.8,
    ease: "elastic.out(1.2,0.5)",
    y: 0,
    opacity: 1,
  });

});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("modal-visible");
  document.body.classList.remove("modal-open");
  modal.close();
  gsap.to(modal, { duration: 0.8, ease: "elastic.out(1.2,0.5)", y: -50 });
});

const dialog = document.querySelector("dialog");

if (dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      modal.classList.remove("modal-visible");
      document.body.classList.remove("modal-open");
      modal.close();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const createForm = document.querySelector(".create-form");
  const uploadImagesForm = document.querySelector(".upload-images-form");

  createForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  uploadImagesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const url1 = document.querySelector("#url1").value.trim();
    const url2 = document.querySelector("#url2").value.trim();
    const url3 = document.querySelector("#url3").value.trim();

    if (url1 !== "") {
      createThumbnail(url1, 1);
    }

    if (url2 !== "") {
      createThumbnail(url2, 2);
    }

    if (url3 !== "") {
      createThumbnail(url3, 3);
    }

    const success = url1 !== "" || url2 !== "" || url3 !== "";

    if (success) {
      const submitButton = uploadImagesForm.querySelector("[type='submit']");
      submitButton.textContent = "Success";
      document.body.classList.remove("modal-open");
      
      setTimeout(() => {
        closeModalBtn.click();
        submitButton.textContent = "Upload";
      }, 1200);
    }
  });

  function createThumbnail(imageUrl, position) {
    const thumbnail = document.createElement("img");
    thumbnail.src = imageUrl;
    const inputId = `#url${position}`;
    const input = document.querySelector(inputId);

    const thumbnailBox = document.querySelector(
      `.thumbnail-box:nth-child(${position})`
    );
    if (thumbnailBox) {
      thumbnailBox.innerHTML = "";
      thumbnailBox.appendChild(thumbnail);
      input.value = "";
    }

    const xThumbnail = document.createElement("div");
    xThumbnail.classList.add("remove-thumbnail");
    xThumbnail.textContent = " 🗙 ";

    xThumbnail.addEventListener("click", (e) => {
      const parentThumbnailBox = e.target.closest(".thumbnail-box");
      const inputId = `#url${position}`;
      const input = document.querySelector(inputId);

      if (parentThumbnailBox && input) {
        parentThumbnailBox.innerHTML = "";
        input.value = "";
      }
    });

    thumbnailBox.append(thumbnail, xThumbnail);
  }

  const titleInput = document.getElementById("title");
  const tagsInput = document.getElementById("tags");

  titleInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  tagsInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});

submitListing();
