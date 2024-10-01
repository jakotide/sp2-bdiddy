import { load } from "../storage/load";
import { createApiKey } from "../api/auth/apikey";

export async function getApiHeaders() {
  try {
    const accessToken = load("token");

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const apiKey = await createApiKey();

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    };
  } catch (error) {
    console.error("Error getting API headers:", error.message);
    return {
      "Content-Type": "application/json",
    };
  }
}
