import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function getListings() {
  const listingsURL = API_AUCTION_URL + LISTING;
  try {
    const response = await fetch(listingsURL, {
      headers: getApiHeaders(),
    });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

getListings();

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

getListing("1fd16e0d-8bd0-4aa6-8e82-dc45ad4eb8ad").then(console.log);
