// SCSS
import "../../scss/main.scss";

import "../storage/load.js";
import "../components/hamburger";
import "../components/imageCarousel.js";
import { singleListingPage } from "../templates/listing";
import { placeBid } from "../handlers/placeBid";
import { getProfile } from "../api/listings/getProfile";
import { load } from "../storage/load.js";

const bidForm = document.querySelector(".bid-form");

bidForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

async function renderCurrentFunds() {
  const availableFunds = document.querySelector(".availableFunds");
  const user = load("User");

  if (user && user.name) {
    const userProfile = await getProfile(user.name);

    if (userProfile) {
      availableFunds.innerText +=
        "Funds available: " + userProfile.credits + "$";
    } else {
      console.error("Failed to fetch user profile");
    }
  } else {
    console.error("User not found or missing name property");
  }
}

singleListingPage();
placeBid();
renderCurrentFunds();
