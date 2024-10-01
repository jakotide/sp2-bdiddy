import { authorizeToken } from "../../storage/authorizeToken";

export async function createApiKey(name = "API Key") {
  const keyUrl = "https://v2.api.noroff.dev/auth/create-api-key";
  const accessToken = authorizeToken();

  if (!accessToken) {
    console.error("No valid access token found. Please log in.");
    return null;
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
    console.log("API key response:", json);

    return json.data?.key || null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
