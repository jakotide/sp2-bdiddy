import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function deleteListing(listingData) {
  if (!id) {
    throw new Error("Delete listing requires ID.")
  }
  const deleteListingURL = `${API_AUCTION_URL}${LISTING}${listingData.id}`;
  try {
    const response = await fetch(deleteListingURL, {
      method: "DELETE",
      headers: getApiHeaders(),
      body: JSON.stringify(listingData),
    });

    const results = await response.json();
    console.log(results);
  } catch (error) {
    console.error("Error:", error);
  }
};