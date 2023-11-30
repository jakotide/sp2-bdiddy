import { authorizeToken } from "../storage/authorizeToken";
import { remove } from "../storage/remove";

const hamburgerBtn = document.querySelector(".lines");
const lineOne = document.querySelector(".line-one");
const lineTwo = document.querySelector(".line-two");
const navContent = document.querySelector(".nav__content");
const listingBtn = document.querySelector(".listing");
const listingLink = document.querySelector(".listingLink");
const mobileListingBtn = document.querySelector(".mobile-listing");
const logOutBtn = document.querySelector(".logOutBtn");

hamburgerBtn.addEventListener("click", () => {
  navContent.classList.toggle("active");
  lineOne.classList.toggle("active");
  lineTwo.classList.toggle("active");
});

authorizeToken(
    () => {
      listingLink.textContent = "Create Listing";
      mobileListingBtn.textContent = "Create Listing";
    },
    () => {
      listingLink.textContent = "Login";
      listingLink.href = "/sp2-bdiddy/authentication/";
      logOutBtn.textContent = "Login";
      logOutBtn.href = "/sp2-bdiddy/authentication/";
    }
  );
  

logOutBtn.addEventListener("click", () => {
  remove("token");
  remove("User");
});
