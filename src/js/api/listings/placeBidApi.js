import { API_AUCTION_URL } from "../constants";
import { LISTING } from "../constants";
import { getApiHeaders } from "../../handlers/headers.js";

export async function placeBidApi(bid, id) {
  if (!id) {
    throw new Error("Bid requires ID.")
  }
  const placeBidUrl = `${API_AUCTION_URL}${LISTING}${id}/bids`;
  try {
    const response = await fetch(placeBidUrl, {
      method: "POST",
      headers: getApiHeaders(),
      body: JSON.stringify({ amount: bid }),
    });

    if(response.ok) {
      return await response.json();
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

