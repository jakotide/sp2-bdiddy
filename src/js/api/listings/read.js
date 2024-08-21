import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function getListings() {
  const listingsURL = `${API_AUCTION_URL}${LISTING}?_bids=true&_seller=true&_tags=true&_active=true`;

  try {
    const response = await fetch(listingsURL, {
      headers: getApiHeaders(),
    });
    console.log(response);
    const json = await response.json();

    console.log(json);
    return json;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getListing(id) {
  try {
    if (!id) {
      throw new Error("Get requires a listing id");
    }

    const response = await fetch(
      `${API_AUCTION_URL}${LISTING}${id}?_seller=true&_bids=true`,
      {
        method: "GET",
        headers: getApiHeaders(),
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error(error);
  }
}
