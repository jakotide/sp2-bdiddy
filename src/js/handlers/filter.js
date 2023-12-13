import { getListings } from "../api/listings";
import { listingsTemplate } from "../templates/listings";

export async function filterListings() {
  const listings = await getListings();
  const electroBtn = document.querySelectorAll(".electronics");
  const fashionBtn = document.querySelectorAll(".fashion");
  const vehiclesBtn = document.querySelectorAll(".vehicles");
  const retroBtn = document.querySelectorAll(".retro");
  const foodBtn = document.querySelectorAll(".food");
  const artBtn = document.querySelectorAll(".art");
  const housingBtn = document.querySelectorAll(".housing");

  electroBtn.forEach((btn) => {
    btn.addEventListener("click", () =>
      handleFilterClick("Electronics", listings)
    );
  });
  fashionBtn.forEach((btn) => {
    btn.addEventListener("click", () => handleFilterClick("Fashion", listings));
  });
  vehiclesBtn.forEach((btn) => {
    btn.addEventListener("click", () =>
      handleFilterClick("Vehicles", listings)
    );
  });
  foodBtn.forEach((btn) => {
    btn.addEventListener("click", () => handleFilterClick("Food", listings));
  });
  retroBtn.forEach((btn) => {
    btn.addEventListener("click", () => handleFilterClick("Retro", listings));
  });
  artBtn.forEach((btn) => {
    btn.addEventListener("click", () => handleFilterClick("Art", listings));
  });
  housingBtn.forEach((btn) => {
    btn.addEventListener("click", () => handleFilterClick("Housing", listings));
  });
}

async function handleFilterClick(category, listings) {
  const filteredResults = await filterListingsByCategory(category, listings);

  const filterContainer = document.querySelector("#searchResults");
  renderFiltered(filteredResults, filterContainer);
}

async function filterListingsByCategory(category, listings) {
  const lowerCategory = category.toLowerCase();

  const keywordsMap = {
    electronics: ["electronics", "iphone", "computer", "data", "lamp"],
    fashion: ["clothing", "jacket", "hat", "gloves", "tux", "dress"],
    vehicles: [
      "car",
      "volvo",
      "nissan",
      "toyota",
      "ferrari",
      "boat",
      "plane",
      "motor",
      "offroad",
    ],
    retro: ["vintage", "retro", "vinyl", "old"],
    food: [
      "cake",
      "muffin",
      "banana",
      "apple",
      "food",
      "pizza",
      "burger",
      "candy",
      "pear"
    ],
    art: ["painting", "sculpture", "art"],
    housing: ["house", "apartment", "castle", "tower"],
  };

  const keywords = keywordsMap[lowerCategory] || [];

  const filteredResults = listings.filter((listing) => {
    const lowerTitle = listing.title.toLowerCase();

    const match = keywords.some((keyword) => lowerTitle.includes(keyword));
    return match;
  });

  return filteredResults;
}

export function renderFiltered(filteredResults, parent) {
  const filterContainer = document.querySelector("#searchContainer");
  const allBtn = document.querySelectorAll(".all");
  parent.innerHTML = "";
  allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterContainer.style.display = "none";
    });
  });

  if (!filteredResults || filteredResults.length === 0) {
    const searchContainer = document.querySelector("#searchContainer");
    const noResultsMessage = document.createElement("div");
    noResultsMessage.style.textAlign = "Center";
    noResultsMessage.style.fontFamily = "MabryPro-Regular";
    noResultsMessage.textContent = "No matching results found.";
    searchContainer.style.display = "Block";
    parent.appendChild(noResultsMessage);
    return;
  }

  const fragment = document.createDocumentFragment();
  filteredResults.forEach((listing) => {
    const card = listingsTemplate(listing);
    fragment.appendChild(card);
  });
  filterContainer.style.display = "Block";

  parent.appendChild(fragment);
}

filterListings();
