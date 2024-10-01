// import { createApiKey } from "./apikey";

// const loginBtn = document.getElementById("signUpBtn");
// const main = document.querySelector(".main-login");
// const errorMsg = document.querySelector(".reg-error-message");

// export async function register(profile) {
//   const regUrl = "https://v2.api.noroff.dev/auth/register";

//   try {
//     const response = await fetch(regUrl, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(profile),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Registration failed:", errorData);
//       errorMsg.style.display = "block";
//     } else {
//       loginBtn.innerHTML = '<span class="loader"></span>';

//       const result = await response.json();
//       console.log("Registration successful:", result);

//       // Create the API key
//       const apiKey = await createApiKey();
//       console.log(apiKey);
//       if (apiKey) {
//         console.log("API Key created:", apiKey);
//         loginBtn.textContent = "Success!";
//       } else {
//         console.error("Failed to create API key.");
//       }

//       // Transition to the next view
//       setTimeout(() => {
//         main.classList.toggle("active");
//       }, 2000);
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

const loginBtn = document.getElementById("signUpBtn");
const main = document.querySelector(".main-login");
const errorMsg = document.querySelector(".reg-error-message");

export async function register(profile) {
  const regUrl = "https://v2.api.noroff.dev/auth/register";

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
    } else {
      loginBtn.innerHTML = '<span class="loader"></span>';

      const result = await response.json();
      console.log("Registration successful:", result);

      // User registration is complete; no need to create API key or login here.
      loginBtn.textContent = "Success!";

      // Transition to the next view (if required)
      setTimeout(() => {
        main.classList.toggle("active");
      }, 2000);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
