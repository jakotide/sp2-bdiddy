import { API_AUCTION_URL } from "../constants";
import { PROFILE } from "../constants";
import { getApiHeaders } from "../../handlers/headers";

export async function editProfileImage(user) {
    try {
      if (!user.name) {
        throw new Error("Update requires a name");
      }
  
      const response = await fetch(`${API_AUCTION_URL}${PROFILE}${user.name}/media`, {
        method: "PUT",
        headers: getApiHeaders(),
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        console.log(error)
      }
    } catch (error) {
      throw error;
    }
  }