import "../scss/main.scss";

// JS
import "../js/components/index.js";
import * as templates from "../js/templates/listings.js";
import * as listings from "../js/api/listings/index.js";
import * as search from "../js/handlers/search.js";
import * as filter from "../js/handlers/filter.js";



async function displayFilterResults() {
  const filterGrid = document.querySelector("#filterResults");
  const filteredResultCards = await filter.filterListings();
  if (filteredResultCards) {
    filter.renderFiltered(filteredResultCards, filterGrid);
  } else {
    console.log("No results");
  }
}

displayFilterResults();



async function displaySearchResult() {
  const searchGrid = document.querySelector("#searchResults");
  const searchContainer = document.querySelector("#searchContainer");
  const searchResults = await search.search();
  const searchBtn = document.querySelector("#searchButton");
  searchBtn.addEventListener("click", () => {
    search.renderSearchResults(searchResults, searchGrid);
  });
}

displaySearchResult();

async function listingsHomeTemplate() {
  const cardListings = await listings.getListings();
  const newContainer = document.querySelector("#newContainer");
  const allContainer = document.querySelector("#allContainer");
  templates.renderListings(cardListings, newContainer, allContainer);
}

listingsHomeTemplate();
