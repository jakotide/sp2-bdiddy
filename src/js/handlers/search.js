import { getListings } from "../api/listings";
import { listingsTemplate } from "../templates/listings";

export async function search() {
  const listings = await getListings();
  const form = document.querySelector(".search");
  const searchInput = document.querySelector("#search-input");
  const searchResultsContainer = document.querySelector("#searchResults");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const searchValue = searchInput.value.trim().toLowerCase();

      const searchResults = listings.filter((listing) => {
        const title = (listing.title || "").toLowerCase();
        const desc = (listing.description || "").toLowerCase();
        const seller = (listing.seller?.name || "").toLowerCase();

        return (
          title.includes(searchValue) ||
          desc.includes(searchValue) ||
          seller.includes(searchValue)
        );
      });

      searchResultsContainer.innerHTML = "";

      renderSearchResults(searchResults, searchResultsContainer);
    });
  }

  return [];
}

export function renderSearchResults(searchResults, parent) {
  parent.innerHTML = "";

  if (!searchResults || !Array.isArray(searchResults) || searchResults.length === 0) {
    const searchContainer = document.querySelector("#searchContainer");
    const noResultsMessage = document.createElement("div");
    noResultsMessage.style.textAlign = "Center";
    noResultsMessage.style.fontFamily = 'MabryPro-Regular';
    noResultsMessage.textContent = "No matching results found.";
    searchContainer.style.display = "Block";
    parent.appendChild(noResultsMessage);
    return;
  }

  const searchResultCards = searchResults.map(listingsTemplate);

  parent.append(...searchResultCards);
}
