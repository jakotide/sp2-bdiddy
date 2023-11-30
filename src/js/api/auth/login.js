import { API_AUCTION_URL } from "../constants";
import { AUTH_LOGIN } from "../constants";
import { save } from "../../storage/save";

export async function login(profile) {
  const loginUrl = API_AUCTION_URL + AUTH_LOGIN;

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
      alert("Something went wrong!");
    } else {
      const { accessToken, ...user } = await response.json();

      save("token", accessToken);
      save("User", user);

      window.location.href = "/sp2-bdiddy/index";
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
}
