import { API_AUCTION_URL, PROFILE } from "../constants";
import { getApiHeaders } from "../../handlers/headers";

export async function getProfile(name) {
  try {
    if (!name) {
      throw new Error("Get requires a profile name");
    }

    const response = await fetch(
      `${API_AUCTION_URL}${PROFILE}${name}?_listings=true&_bids=true&_wins=true`,
      {
        method: "GET",
        headers: await getApiHeaders(), // Ensure headers are resolved
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `API request failed with status: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error; // Re-throw error for further handling
  }
}
