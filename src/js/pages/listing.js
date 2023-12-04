// SCSS
import "../../scss/main.scss";

import "../storage/load.js";
import "../components/hamburger";
import "../components/imageCarousel.js";
// import * as listings from "../api/listings/index.js";
// import * as render from "../templates/listing.js";
import { singleListingPage } from "../templates/listing";

const biddingForm = document.querySelector(".bid-form");

biddingForm.addEventListener("click", (e) => {
    e.preventDefault();
});

singleListingPage()