import { register } from '../api/auth/register.js';

/**
 * Function to listen for register form submissions.
 */
export function registerFormListener() {
  const regForm = document.querySelector(".register-form");

  regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    register(profile);
  });
}
