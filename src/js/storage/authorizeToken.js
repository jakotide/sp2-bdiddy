import { load } from "./load";

export function authorizeToken() {
  const token = load("token");

  return token || false;
}
