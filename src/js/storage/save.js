export function save(key, value) {
  // No need to JSON.stringify if the value is already a string (like accessToken)
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
