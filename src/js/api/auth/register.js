import { API_AUCTION_URL } from "../constants";

const path = "/auth/register/";
const method = "post";

export async function register(profile) {
    const regUrl = API_AUCTION_URL + path;
    console.log(regUrl)
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
            // console.error("Registration failed:", errorData);
        } else {
            const result = await response.json();
            console.log("Registration successful:", result);
        }
    } catch (error) {
        // console.error("An error occurred during registration:", error);
    }
}


