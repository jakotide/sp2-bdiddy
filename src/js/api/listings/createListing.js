import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function createListing(listing) {
  try {
    const response = await fetch(`${API_AUCTION_URL}/listings`, {
      method: "POST",
      headers: getApiHeaders(),
      body: JSON.stringify(listing),
    });
    
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

