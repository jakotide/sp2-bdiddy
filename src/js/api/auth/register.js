import { API_AUCTION_URL } from "../constants";
const loginBtn = document.getElementById("signUpBtn");
const path = "/auth/register/";
const method = "post";

export async function register(profile) {
    const regUrl = API_AUCTION_URL + path;
    
    try {
        const response = await fetch(regUrl, {
            headers: {
                "Content-Type": "application/json"
            },
            method,
            body: JSON.stringify(profile)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Registration failed:", errorData);
            alert("Something went wrong!");
        } else {
            loginBtn.innerHTML = '<span class="loader"></span>';

            const result = await response.json();
            console.log("Registration successful:", result);

            // After 1 second, change the textContent to "Success!"
            setTimeout(() => {
                loginBtn.textContent = "Success!";
            }, 1000);
        }
    } catch (error) {
        console.error("An error occurred during registration:", error);
    }
}


