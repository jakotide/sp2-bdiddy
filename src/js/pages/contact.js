import "../../scss/main.scss";

import "../components/hamburger";
import { authorizeToken } from "../storage/authorizeToken";
const createLink = document.querySelector("#createBtn");
const submitBtn = document.querySelector(".create-btn");

authorizeToken(
  () => {
    createLink.style.display = "block";
  },
  () => {
    createLink.style.display = "none";
  }
);

document.getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    showSuccessMessage();
  });

function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  submitBtn.innerHTML = `<span class="loader"></span>`

  setTimeout(() => {
    successMessage.style.display = "block";
    document.getElementById("name").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    submitBtn.innerText = "Success";
  }, 1000);
}
