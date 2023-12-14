import { API_AUCTION_URL } from "../constants";
import { AUTH_REGISTER } from "../constants";
const loginBtn = document.getElementById("signUpBtn");
const main = document.querySelector(".main-login");
const errorMsg = document.querySelector(".reg-error-msg");


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
      errorMsg.style.display = "block";
      gsap.to(loginBtn, { x: -4, yoyo: true, repeat: 3, duration: 1 });
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
  }
}
