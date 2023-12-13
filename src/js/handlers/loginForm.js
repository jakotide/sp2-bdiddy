import { login } from '../api/auth/login.js';

export function loginFormListener() {
  const regForm = document.querySelector(".login-form");

  regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    login(profile);
  });
}