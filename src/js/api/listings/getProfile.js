import { API_AUCTION_URL } from "../constants";
import { PROFILE } from "../constants";
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
