import { API_AUCTION_URL } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function createListing(listing) {
  try {
    const response = await fetch(`${API_AUCTION_URL}/listings`, {
      method: "POST",
      headers: await getApiHeaders(),
      body: JSON.stringify(listing),
    });

    if (response.ok) {
      const responseBody = await response.json(); // Read and parse the JSON once

      return responseBody; // Return the parsed JSON response
    } else {
      const errorText = await response.text(); // Read the error response
      console.error("Response Body:", errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error("Error creating listing:", error.message);
    throw error;
  }
}
