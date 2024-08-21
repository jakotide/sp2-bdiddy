import { API_AUCTION_URL } from "../constants";
import { PROFILE } from "../constants";
import { getApiHeaders } from "../../handlers/headers";
import { load } from "../../storage/load";

export async function editProfileImage(user) {
  const username = load("User");
  const editUser = username.data;
  console.log(editUser);

  try {
    if (!editUser) {
      console.log("Need username");
    }

    const response = await fetch(
      `${API_AUCTION_URL}${PROFILE}${editUser.name}/media`,
      {
        method: "PUT",
        headers: getApiHeaders(),
        body: JSON.stringify({ avatar: user.avatar }),
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      console.log(response.statusText);
    }
  } catch (error) {
    throw error;
  }
}
