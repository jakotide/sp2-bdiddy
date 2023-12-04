import { load } from "../storage/load";

export function getApiHeaders() {
    const token = load("token");
  
    if (token) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      return {
        "Content-Type": "application/json",
      };
    }
  }