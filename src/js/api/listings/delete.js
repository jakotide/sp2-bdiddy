import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function deleteListing(listingId) {
  if (!listingId) {
    throw new Error("Delete listing requires ID.");
  }

  const deleteListingURL = `${API_AUCTION_URL}${LISTING}${listingId}`;

  try {
    const headers = getApiHeaders(); // Get the headers including Authorization and API Key

    const response = await fetch(deleteListingURL, {
      method: "DELETE",
      headers: await headers, // Pass the headers here
    });

    if (!response.ok) {
      throw new Error(`Failed to delete listing. Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
