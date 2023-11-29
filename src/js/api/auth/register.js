import { API_AUCTION_URL } from "../constants";

const path = "/auth/register";
const method = "post";

export async function register(profile) {
    const regUrl = API_AUCTION_URL + path;
    
    const response = await fetch(regUrl, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body: JSON.stringify(profile)
    })
    const result = await response.json();
    console.log(result);
}