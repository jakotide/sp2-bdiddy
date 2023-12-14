import { getListing } from "../api/listings";

/**
 * Fetches the details of a single listing and updates the corresponding page.
 * @async
 * @function
 */
export async function singleListingPage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const listing = await getListing(id);

  const carouselSlides = [
    document.querySelector(".slide"),
    document.querySelector(".slide2"),
    document.querySelector(".slide3"),
  ];

  const profileName = document.querySelector(".profileName");
  const profileAvatar = document.querySelector(".img-box");
  const listingDescription = document.querySelector(".description");
  const dateSection = document.querySelector(".start-end");
  const leaderBox = document.querySelector(".leader-flex");

  const slides = [];
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  for (let i = 0; i < listing.media.length; i++) {
    const slide = document.createElement("img");
    slide.src = listing.media[i];
    slides.push(slide);
  }

  if (listing.media.length === 0) {
    const placeholder = document.createElement("img");
    placeholder.src =
      "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80";
    placeholder.alt = "No image available.";
    slides.push(placeholder);

    nextButton.style.display = "none";
    prevButton.style.display = "none";
  } else if (listing.media.length === 1) {
    const slide = document.createElement("img");
    slide.src = listing.media[0];
    slides.push(slide);

    nextButton.style.display = "none";
    prevButton.style.display = "none";
  } else {
    for (let i = 0; i < listing.media.length; i++) {
      const slide = document.createElement("img");
      slide.src = listing.media[i];
      slides.push(slide);
    }

    nextButton.style.display = "block";
    prevButton.style.display = "block";
  }

  const avatar = document.createElement("img");
  avatar.classList.add("border", "img-avatar");
  avatar.src = listing.seller.avatar;

  const name = document.createElement("div");
  name.classList.add("profile-name");
  name.textContent = listing.seller.name;

  const title = document.createElement("h1");
  title.textContent = listing.title;
  const description = document.createElement("p");
  description.classList.add(".description");
  description.textContent = listing.description;

  /**
   * Formats a custom date string.
   * @function
   * @param {string} dateString - The date string to be formatted.
   * @returns {string} - The formatted date string.
   */
  function formatCustomDate(dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const startDesktop = document.createElement("div");
  startDesktop.classList.add("desktop-start-date");
  startDesktop.textContent = "Started: " + formatCustomDate(listing.created);

  const endDate = document.createElement("div");
  endDate.classList.add("end");
  endDate.textContent = "Ends at: " + formatCustomDate(listing.endsAt);

  function findHighestBid(bids) {
    return bids.reduce(
      (highest, current) =>
        current.amount > highest.amount ? current : highest,
      bids[0]
    );
  }

  const highestBid = findHighestBid(listing.bids);

  let leadAmount, leader, noBidDisplay;

  if (highestBid) {
    leadAmount = document.createElement("div");
    leadAmount.textContent = highestBid.amount + "$";

    leader = document.createElement("div");
    leader.textContent = highestBid.bidderName;
    leader.classList.add("leader");
  } else {
    noBidDisplay = document.createElement("div");
    noBidDisplay.textContent = "No bids yet!";
  }

  carouselSlides.forEach((carouselSlide, index) => {
    carouselSlide.append(slides[index]);
  });
  profileAvatar.append(avatar);
  profileName.append(name);
  listingDescription.append(title, description);
  dateSection.append(startDesktop, endDate);
  if (highestBid) {
    leaderBox.append(leader, leadAmount);
  } else {
    leaderBox.append(noBidDisplay);
  }
}
