import { save } from "../../storage/save";
import { load } from "../../storage/load";
import { createApiKey } from "./apikey";
const errorMessage = document.querySelector(".error-message");

export async function login(profile) {
  const loginUrl = "https://v2.api.noroff.dev/auth/login";

  try {
    const response = await fetch(loginUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      errorMessage.style.display = "block";
      errorMessage.textContent =
        errorData.message || "Login failed. Please try again.";
    } else {
      const { data } = await response.json();
      const { accessToken, ...user } = data;

      // Save token and user details locally
      save("token", accessToken);
      save("User", user);
      console.log(accessToken);

      let apiKey = load("apiKey");

      if (!apiKey) {
        console.log("No API key found, creating a new one...");
        apiKey = await createApiKey();
        if (apiKey) {
          save("apiKey", apiKey);
          console.log("API Key created and saved:", apiKey);
        } else {
          console.error("Failed to create API key.");
        }
      }

      // Redirect user after successful login and API key creation
      window.location.href = "/sp2-bdiddy/index";
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
}
