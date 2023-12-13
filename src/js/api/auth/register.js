import { API_AUCTION_URL } from "../constants";
import { AUTH_REGISTER } from "../constants";
const loginBtn = document.getElementById("signUpBtn");
const main = document.querySelector(".main-login");

export async function register(profile) {
  const regUrl = API_AUCTION_URL + AUTH_REGISTER;

  try {
    const response = await fetch(regUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
      alert("Something went wrong with the registration. Try another username.");
    } else {
      loginBtn.innerHTML = '<span class="loader"></span>';

      const result = await response.json();
      console.log("Registration successful:", result);
      loginBtn.textContent = "Success!";
      setTimeout(() => {
        main.classList.toggle("active");
      }, 2000);
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  }
}
