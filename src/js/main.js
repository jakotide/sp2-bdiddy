import "../scss/main.scss";

// JS
import "../js/components/index.js";
import * as templates from "../js/templates/listings.js";
import * as listings from "../js/api/listings/index.js";

async function listingsHomeTemplate() {
  const cardListings = await listings.getListings();
  const newContainer = document.querySelector("#newContainer");
  const allContainer = document.querySelector("#allContainer");
  templates.renderListings(cardListings, newContainer, allContainer);
}

listingsHomeTemplate();
