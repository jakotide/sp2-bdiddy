import { authorizeToken } from "../storage/authorizeToken";
import { remove } from "../storage/remove";

const hamburgerBtn = document.querySelector(".lines");
const lineOne = document.querySelector(".line-one");
const lineTwo = document.querySelector(".line-two");
const navContent = document.querySelector(".nav__content");
const listingLink = document.querySelector(".listingLink");
const mobileListingBtn = document.querySelector(".mobile-listing");
const logOutBtn = document.querySelector(".logOutBtn");
const profileBtn = document.querySelector(".profileBtn");

/**
 * Toggles active class and rotates the hamburger btn lines.
 *
 *
 */
hamburgerBtn.addEventListener("click", () => {
  navContent.classList.toggle("active");
  lineOne.classList.toggle("active");
  lineTwo.classList.toggle("active");
});

/**
 * Changes create navigation to login if user don't have token.
 *
 *
 */
const token = authorizeToken();
if (token) {
  listingLink.textContent = "Create Listing";
  mobileListingBtn.textContent = "Create Listing";
} else {
  listingLink.textContent = "Login";
  listingLink.href = "/authentication/";
  logOutBtn.textContent = "Login";
  logOutBtn.href = "/authentication/";
  profileBtn.style.display = "None";
}

logOutBtn.addEventListener("click", () => {
  remove("token");
  remove("User");
});
