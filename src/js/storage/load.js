export function load(key) {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value; // If it's a string (like accessToken), return it directly
  }
}
