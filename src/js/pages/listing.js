// SCSS
import "../../scss/main.scss";

// JS
import "../components/hamburger";
import "../components/imageCarousel.js";


const biddingForm = document.querySelector(".bid-form");

biddingForm.addEventListener("click", (e) => {
    e.preventDefault();
})