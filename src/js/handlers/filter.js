import { getListings } from "../api/listings";
import { listingsTemplate } from "../templates/listings";

export async function filterListings() {
  const listings = await getListings();
  const allBtn = document.querySelector("#all");
  const electroBtn = document.querySelector("#electronics");
  const fashionBtn = document.querySelector("#fashion");
  const vehiclesBtn = document.querySelector("#vehicles");
  const retroBtn = document.querySelector("#retro");
  const artBtn = document.querySelector("#art");
  const housingBtn = document.querySelector("#housing");

  allBtn.addEventListener("click", () => handleFilterClick("all", listings));
  electroBtn.addEventListener("click", () => handleFilterClick("Electronics", listings));
  fashionBtn.addEventListener("click", () => handleFilterClick("Fashion", listings));
  vehiclesBtn.addEventListener("click", () => handleFilterClick("Vehicles", listings));
  retroBtn.addEventListener("click", () => handleFilterClick("Retro", listings));
  artBtn.addEventListener("click", () => handleFilterClick("Art", listings));
  housingBtn.addEventListener("click", () => handleFilterClick("Housing", listings));
}

async function handleFilterClick(category, listings) {
  const filteredResults = await filterListingsByCategory(category, listings);
  console.log("Filtered results:", filteredResults);

  const filterContainer = document.querySelector("#filterResults");
  renderFiltered(filteredResults, filterContainer);
}

async function filterListingsByCategory(category, listings) {
  const lowerCategory = category.toLowerCase();

  const keywordsMap = {
    electronics: ["electronics", "iphone", "computer", "data", "lamp"],
    fashion: ["clothing", "jacket", "hat", "gloves"],
    vehicles: ["car", "volvo", "nissan", "toyota", "ferrari", "boat", "plane", "motor"],
    retro: ["vintage", "retro", "vinyl", "old"],
    art: ["painting", "sculpture", "art"],
    housing: ["house", "apartment", "castle", "tower"],
  };

  const keywords = keywordsMap[lowerCategory] || [];

  const filteredResults = listings.filter((listing) => {
    const lowerTitle = listing.title.toLowerCase();
    const match = keywords.some(keyword => lowerTitle.includes(keyword));
    return match;
  });

  console.log("Filtered results:", filteredResults);
  return filteredResults;
}

export function renderFiltered(filteredResults, parent) {
  console.log("Rendering filtered results:", filteredResults);
  parent.innerHTML = "";

  if (!filteredResults || filteredResults.length === 0) {
    console.log("No results");
    return;
  }

  const fragment = document.createDocumentFragment();
  filteredResults.forEach(listing => {
    const card = listingsTemplate(listing);
    fragment.appendChild(card);
  });

  parent.appendChild(fragment);
}

// Call filterListings to set up event listeners
filterListings();










