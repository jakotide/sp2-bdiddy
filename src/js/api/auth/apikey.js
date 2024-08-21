import { authorizeToken } from "../../storage/authorizeToken";

export async function createApiKey(name = "API Key") {
  const keyUrl = "https://v2.api.noroff.dev/auth/create-api-key";
  const accessToken = authorizeToken(); // Get the access token directly

  if (!accessToken) {
    console.error("No valid access token found. Please log in.");
    return; // Exit early if no valid token was found
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name }),
  };

  try {
    const response = await fetch(keyUrl, options);

    if (!response.ok) {
      throw new Error("Error creating API key");
    }

    const json = await response.json();

    return json.data.key; // Return the API key
  } catch (error) {
    console.error("Error:", error);
  }
}
