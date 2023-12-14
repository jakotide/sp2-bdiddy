import { getListing } from "../api/listings";

export async function singleListingPage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const listing = await getListing(id);

  const carouselSlides = [
    document.querySelector(".slide"),
    document.querySelector(".slide2"),
    document.querySelector(".slide3")
  ];
  
  const profileName = document.querySelector(".profileName");
  const profileAvatar = document.querySelector(".img-box");
  const listingDescription = document.querySelector(".description");
  const dateSection = document.querySelector(".start-end");
  const leaderBox = document.querySelector(".leader-flex");
  
  const slides = [];
  for (let i = 0; i < listing.media.length; i++) {
    const slide = document.createElement("img");
    slide.src = listing.media[i];
    slides.push(slide);
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
    return bids.reduce((highest, current) => (current.amount > highest.amount ? current : highest), bids[0]);
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

