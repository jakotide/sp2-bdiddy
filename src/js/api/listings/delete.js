import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function deleteListing(listingId) {
  if (!listingId) {
    throw new Error("Delete listing requires ID.");
  }

  const deleteListingURL = `${API_AUCTION_URL}${LISTING}${listingId}`;

  try {
    const response = await fetch(deleteListingURL, {
      method: "DELETE",
      headers: getApiHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete listing. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const results = await response.json();
      console.log(results);
    } else {
      console.log("Listing deleted successfully.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

