import { load } from "../storage/load";

// const token = load("token");

// export function getApiHeaders(token) {
//     return {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//     };
// }

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