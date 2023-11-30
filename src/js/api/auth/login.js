import { API_AUCTION_URL } from "../constants";
import { save } from "../../storage/save";


const path = "/auth/login/";
const method = "post";

export async function login(profile) {
  const loginUrl = API_AUCTION_URL + path;
  console.log(loginUrl);
  try {
    const response = await fetch(loginUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      alert("Something went wrong!");
    } else {
      const { accessToken, ...user} = await response.json();
    //   console.log("Registration successful:", result);

      save("token", accessToken);
      save("User", user);

      window.location.href = "/sp2-bdiddy/index";
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
}
