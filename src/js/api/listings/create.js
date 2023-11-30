import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function createListing(listingData) {
  const createPostURL = API_AUCTION_URL + LISTING;
  try {
    const response = await fetch(createPostURL, {
      method: "POST",
      headers: getApiHeaders(),
      body: JSON.stringify(listingData),
    });

    const results = await response.json();
    console.log(results);
  } catch (error) {
    console.error("Error:", error);
  }
};

