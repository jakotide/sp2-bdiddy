import { getListings } from "../api/listings";
import { listingsTemplate } from "../templates/listings";

export async function filterListings() {
  const listings = await getListings();
  const searchResultsContainer = document.querySelector("#searchResults");
  const allBtn = document.querySelector("#all");
  const electroBtn = document.querySelector("#electronics");
  const fashionBtn = document.querySelector("#fashion");
  const vehiclesBtn = document.querySelector("#vehicles");
  const retroBtn = document.querySelector("#retro");
  const artBtn = document.querySelector("#art");

  allBtn.addEventListener("click", () => handleFilterClick("all", listings, searchResultsContainer));
  electroBtn.addEventListener("click", () => handleFilterClick("Electronics", listings, searchResultsContainer));
  fashionBtn.addEventListener("click", () => handleFilterClick("Fashion", listings, searchResultsContainer));
  vehiclesBtn.addEventListener("click", () => handleFilterClick("Vehicles", listings, searchResultsContainer));
  retroBtn.addEventListener("click", () => handleFilterClick("Retro", listings, searchResultsContainer));
  artBtn.addEventListener("click", () => handleFilterClick("Art", listings, searchResultsContainer));
}

function handleFilterClick(category, listings, searchResultsContainer) {
  const filteredResults = filterListingsByCategory(category, listings);
  console.log("Filtered results:", filteredResults);

  renderFiltered(filteredResults, searchResultsContainer);
}

function filterListingsByCategory(category, listings) {
  
  const lowerCategory = category.toLowerCase();

  const keywordsMap = {
    electronics: ["electronics", "iphone", "computer"],
    fashion: ["clothing", "jacket"],
    vehicles: ["car", "volvo"],
    retro: ["vintage", "retro", "zoo"],
    art: ["painting", "sculpture"],
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

// export function renderFiltered(filteredResults, parent) {
//   // Clear previous results
//   parent.innerHTML = "";

//   if (!filteredResults || filteredResults.length === 0) {
//     console.log("No results");
//     return;
//   }

//   // Map the filtered results to HTML elements
//   const filteredResultCards = filteredResults.map(listingsTemplate);

//   // Append the cards to the container
//   filteredResultCards.forEach(cardTemplate => {
//     const card = document.createElement("div");
//     card.innerHTML = cardTemplate;
//     parent.appendChild(card);
//   });
// }

export function renderFiltered(filteredResults, parent) {
  // Clear previous results
  parent.innerHTML = "";

  if (!filteredResults || filteredResults.length === 0) {
    console.log("No results");
    return;
  }

  // Map the filtered results to HTML elements
  const fragment = document.createDocumentFragment();
  filteredResults.forEach(listing => {
    const card = listingsTemplate(listing);
    fragment.appendChild(card);
  });

  // Append the fragment to the container
  parent.appendChild(fragment);
}






