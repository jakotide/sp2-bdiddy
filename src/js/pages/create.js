// SCSS
import "../../scss/main.scss";

// JS
import "../components/hamburger";
import "../components/tags";

const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

gsap.set(modal, { y: -50, opacity: 1 });

openModalBtn.addEventListener("click", () => {
  modal.showModal();
  gsap.to(modal, {
    duration: 0.8,
    ease: "elastic.out(1.2,0.5)",
    y: 0,
    opacity: 1,
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.close();
  gsap.to(modal, { duration: 0.8, ease: "elastic.out(1.2,0.5)", y: -50 });
});

document.addEventListener("DOMContentLoaded", function () {
  const createForm = document.querySelector(".create-form");
  const uploadImagesForm = document.querySelector(".upload-images-form");

  createForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  uploadImagesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const url1 = document.querySelector('[name="url1"]').value.trim();
    const url2 = document.querySelector('[name="url2"]').value.trim();
    const url3 = document.querySelector('[name="url3"]').value.trim();

    if (url1 !== "") {
      createThumbnail(url1, 1);
    }

    if (url2 !== "") {
      createThumbnail(url2, 2);
    }

    if (url3 !== "") {
      createThumbnail(url3, 3);
    }
  });

  function createThumbnail(imageUrl, position) {
    const thumbnail = document.createElement("img");
    thumbnail.src = imageUrl;

    const thumbnailBox = document.querySelector(
      `.thumbnail-box:nth-child(${position})`
    );
    if (thumbnailBox) {
      thumbnailBox.innerHTML = "";
    }

    const xThumbnail = document.createElement("div");
    xThumbnail.classList.add("remove-thumbnail");
    xThumbnail.textContent = " 🗙 ";

    xThumbnail.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      if (parent) {
        parent.remove();
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
