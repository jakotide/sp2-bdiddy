import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function createListing(listing) {
  try {
    const response = await fetch(`${API_AUCTION_URL}${LISTING}`, {
      method: "POST",
      headers: getApiHeaders(),
      body: JSON.stringify(listing),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      console.error("Error Response:", errorResponse);
      throw new Error(errorResponse.errors[0].message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


