import { getListing } from "../api/listings";

/**
 * Fetches the details of a single listing and updates the corresponding page.
 * @async
 * @function
 */
export async function singleListingPage() {
  try {
    // Get the listing ID from the URL parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    // Fetch listing data
    const listing = await getListing(id);

    // Get carousel elements
    const carouselSlides = [
      document.querySelector(".slide"),
      document.querySelector(".slide2"),
      document.querySelector(".slide3"),
    ];

    // Get elements for profile, description, date, and leader box
    const profileName = document.querySelector(".profileName");
    const profileAvatar = document.querySelector(".img-box");
    const listingDescription = document.querySelector(".description");
    const dateSection = document.querySelector(".start-end");
    const leaderBox = document.querySelector(".leader-flex");

    // Initialize slides array and buttons
    const slides = [];
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");

    console.log("Number of media items:", listing.data.media.length);

    // Handle media elements for the carousel
    if (listing.data.media.length === 0) {
      // No images, show placeholder
      const placeholder = document.createElement("img");
      placeholder.src =
        "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80";
      placeholder.alt = "No image available.";
      slides.push(placeholder);

      nextButton.style.display = "none";
      prevButton.style.display = "none";
    } else if (listing.data.media.length === 1) {
      // Only one image
      const slide = document.createElement("img");
      slide.src = listing.data.media[0].url;
      slide.alt = listing.data.media[0].alt || "Image of listing";
      slides.push(slide);

      nextButton.style.display = "none";
      prevButton.style.display = "none";
    } else {
      // Multiple images, create carousel
      for (let i = 0; i < listing.data.media.length; i++) {
        const slide = document.createElement("img");
        slide.src = listing.data.media[i].url;
        slide.alt = listing.data.media[i].alt || `Image ${i + 1} of listing`;
        slides.push(slide);
      }

      nextButton.style.display = "block";
      prevButton.style.display = "block";
    }

    // Append slides to carousel
    for (let i = 0; i < carouselSlides.length; i++) {
      if (slides[i]) {
        carouselSlides[i].appendChild(slides[i]);
      }
    }

    // Create and append profile information
    const avatar = document.createElement("img");
    avatar.classList.add("border", "img-avatar");
    avatar.src = listing.data.seller.avatar.url;
    avatar.alt = listing.data.seller.name || "Seller avatar";
    profileAvatar.append(avatar);

    const name = document.createElement("div");
    name.classList.add("profile-name");
    name.textContent = listing.data.seller.name;
    profileName.append(name);

    // Create and append listing title and description
    const title = document.createElement("h1");
    title.textContent = listing.data.title;

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = listing.data.description;

    listingDescription.append(title, description);

    // Format and display start and end dates
    const startDesktop = document.createElement("div");
    startDesktop.classList.add("desktop-start-date");
    startDesktop.textContent =
      "Started: " + formatCustomDate(listing.data.created);

    const endDate = document.createElement("div");
    endDate.classList.add("end");
    endDate.textContent = "Ends at: " + formatCustomDate(listing.data.endsAt);

    dateSection.append(startDesktop, endDate);

    // Handle bids and display the highest bid
    function findHighestBid(bids) {
      return bids.reduce(
        (highest, current) =>
          current.amount > highest.amount ? current : highest,
        bids[0]
      );
    }

    const highestBid = findHighestBid(listing.data.bids);

    let leadAmount, leader, noBidDisplay;

    if (highestBid) {
      leadAmount = document.createElement("div");
      leadAmount.textContent = highestBid.amount + "$";

      leader = document.createElement("div");
      leader.textContent = listing.data.bids[0].bidder.name;
      leader.classList.add("leader");
    } else {
      noBidDisplay = document.createElement("div");
      noBidDisplay.textContent = "No bids yet!";
    }

    // Append bidding information to the leader box
    if (highestBid) {
      leaderBox.append(leader, leadAmount);
    } else {
      leaderBox.append(noBidDisplay);
    }

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

    // Initialize carousel index
    let currentIndex = 0;

    // Function to update carousel display
    function updateCarousel() {
      carouselSlides.forEach((slide, index) => {
        if (slides[index]) {
          slide.innerHTML = ""; // Clear current slide content
          slide.appendChild(slides[currentIndex]); // Add current slide
        }
      });
      console.log("Current slide index:", currentIndex);
    }

    // Event listener for the "next" button
    nextButton.addEventListener("click", () => {
      console.log("Next button clicked");
      if (slides.length > 0) {
        currentIndex = (currentIndex + 1) % slides.length; // Move to next slide
        updateCarousel();
      }
    });

    // Event listener for the "prev" button
    prevButton.addEventListener("click", () => {
      console.log("Previous button clicked");
      if (slides.length > 0) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Move to previous slide
        updateCarousel();
      }
    });

    // Initial carousel update
    updateCarousel();
  } catch (error) {
    console.error("Error fetching or displaying listing:", error);
  }
}
