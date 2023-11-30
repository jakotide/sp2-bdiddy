import { load } from "../storage/load";

const token = load("token");

export function getApiHeaders(token) {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}