import { register } from '../api/auth/register.js';

export function registerFormListener() {
  const regForm = document.querySelector(".register-form");

  regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("hello")
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    register(profile);
  });
}
