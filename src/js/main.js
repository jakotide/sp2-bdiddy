import "../scss/main.scss";

// JS
import "../js/components/index.js";
import * as templates from "../js/templates/listings.js";
import * as listings from "../js/api/listings/index.js";
import * as search from "../js/handlers/search.js";
import * as filter from "../js/handlers/filter.js";
import { authorizeToken } from "./storage/authorizeToken";
import { toTopButton } from "./components/toTopBtn";

const searchGrid = document.querySelector("#searchResults");

/**
 * Displays filtered results on the search grid.
 * Uses the `filter` module to filter listings and renders the results.
 *
 */
async function displayFilterResults() {
  const filteredResultCards = await filter.filterListings();
  if (filteredResultCards) {
    filter.renderFiltered(filteredResultCards, searchGrid);
  }
}

displayFilterResults();

/**
 * Displays search results on the search grid.
 * Uses the `search` module to perform a search and renders the results.
 *
 */
async function displaySearchResult() {
  const searchResults = await search.search();
  const searchBtn = document.querySelector("#searchButton");
  searchBtn.addEventListener("click", () => {
    search.renderSearchResults(searchResults, searchGrid);
  });
}

displaySearchResult();

/**
 * Fetches and renders listings on the home page.
 * Populates the `newContainer` and `allContainer` with listing cards.
 *
 */
async function listingsHomeTemplate() {
  const newContainer = document.querySelector("#newContainer");
  const allContainer = document.querySelector("#allContainer");
  const loader = document.querySelector(".loader");

  loader.style.display = "block";

  try {
    const cardListings = await listings.getListings();

    templates.renderListings(cardListings, newContainer, allContainer);
    loader.style.display = "none";
  } catch (error) {
    console.error("Error fetching listings:", error);
    loader.style.display = "none";
  }
}

listingsHomeTemplate();

const createLink = document.querySelector("#createBtn");

authorizeToken(
  () => {
    createLink.style.display = "block";
  },
  () => {
    createLink.style.display = "none";
  }
);

toTopButton();
