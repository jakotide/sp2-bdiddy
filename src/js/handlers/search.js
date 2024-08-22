import { list } from "postcss";
import { getListings } from "../api/listings";
import { listingsTemplate } from "../templates/listings";

/**
 * Asynchronously fetches listings and handles search functionality.
 *
 */
export async function search() {
  const listings = await getListings();
  console.log(listings.data);
  const form = document.querySelector(".search");
  const searchInput = document.querySelector("#search-input");
  const searchResultsContainer = document.querySelector("#searchResults");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const searchValue = searchInput.value.trim().toLowerCase();

      const searchResults = listings.data.filter((listing) => {
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

/**
 * Renders search results to the specified parent container.
 * @param {Array} searchResults - The array of search results to be rendered.
 * @param {HTMLElement} parent - The parent container to which the search results will be appended.
 */
export function renderSearchResults(searchResults, parent) {
  parent.innerHTML = "";

  if (
    !searchResults ||
    !Array.isArray(searchResults) ||
    searchResults.length === 0
  ) {
    const searchContainer = document.querySelector("#searchContainer");
    const noResultsMessage = document.createElement("div");
    noResultsMessage.style.textAlign = "Center";
    noResultsMessage.style.fontFamily = "MabryPro-Regular";
    noResultsMessage.textContent = "No matching results found.";
    searchContainer.style.display = "Block";
    parent.appendChild(noResultsMessage);
    return;
  }

  const searchResultCards = searchResults.map(listingsTemplate);

  parent.append(...searchResultCards);
}
