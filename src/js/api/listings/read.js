import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function getListings() {
  const listingsURL = `${API_AUCTION_URL}${LISTING}?_bids=true&_seller=true&_tags=true&_active=true`;

  try {
    const response = await fetch(listingsURL, {
      headers: getApiHeaders(),
    });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function getListing(id) {
  if (!id) {
    throw new Error("Get listing requires ID.");
  };
  const listingURL = `${API_AUCTION_URL}${LISTING}${id}`;
  try {
    const response = await fetch(listingURL, {
      headers: getApiHeaders(),
    });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};