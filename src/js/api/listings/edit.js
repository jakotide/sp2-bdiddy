import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function editListing(listingData) {
  if (!listingData.id) {
    throw new Error("Edit listing requires ID.")
  }
  const editListingURL = `${API_AUCTION_URL}${LISTING}${listingData.id}`;
  console.log(editListingURL);
  try {
    const response = await fetch(editListingURL, {
      method: "PUT",
      headers: getApiHeaders(),
      body: JSON.stringify(listingData),
    });

    const results = await response.json();
    console.log(results);
  } catch (error) {
    console.error("Error:", error);
  }
};

