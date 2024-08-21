import { register } from "../api/auth/register.js";

/**
 * Function to listen for register form submissions.
 */
export function registerFormListener() {
  const regForm = document.querySelector(".register-form");

  regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Convert form data to an object
    const profile = Object.fromEntries(formData.entries());

    // Check if an avatar URL is provided and convert it into an object
    if (profile.avatar) {
      profile.avatar = { url: profile.avatar };
    }

    register(profile);
  });
}
