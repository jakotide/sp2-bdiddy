import { load } from "./load";

export function authorizeToken() {
  // Load the 'User' object from local storage
  const user = load("User");

  // Check if the user object exists and has an accessToken property
  const token = user?.data.accessToken;

  return token;
}
