/**
 * Generates a card element representing a listing.
 * @param {Object} listingData - The data for the listing.
 * @returns {HTMLAnchorElement} - The generated card element.
 */
export function listingsTemplate(listingData) {
  const card = document.createElement("a");
  card.classList.add("card", "shadow");
  card.href = "/listing/?id=" + listingData.id;

  const listingImg = document.createElement("img");
  listingImg.classList.add("card__img");
  listingImg.loading = "lazy";

  // Log the media data for debugging

  // Check if media is an array and contains at least one item
  if (!listingData.media || listingData.media.length === 0) {
    // No images available
    listingImg.src =
      "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80";
    listingImg.alt = "No image available";
    listingImg.style.objectFit = "cover";
  } else {
    // Use the first image in the media array
    const firstMedia = listingData.media[0];

    // Check if the URL exists in the media object
    if (firstMedia && firstMedia.url) {
      const image = new Image();
      image.src = firstMedia.url;

      // Set image onload and onerror handlers
      image.onload = function () {
        listingImg.src = firstMedia.url;
        listingImg.alt = firstMedia.alt || "Image of " + listingData.title;
      };
      image.onerror = function () {
        listingImg.src =
          "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80";
        listingImg.alt = "No image available";
        listingImg.style.objectFit = "cover";
      };
    } else {
      // If media object does not have a valid URL
      listingImg.src =
        "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80";
      listingImg.alt = "No image available";
      listingImg.style.objectFit = "cover";
    }
  }

  const listingDetails = document.createElement("div");
  listingDetails.classList.add("card__details");

  const seller = document.createElement("div");

  if (listingData.seller && listingData.seller.name) {
    seller.textContent = `${listingData.seller.name} listed:`;
  } else {
    seller.textContent = "User listed:";
  }

  const title = document.createElement("h3");
  title.textContent = listingData.title;

  /**
   * Finds the highest bid among the listing bids.
   * @param {Array} bids - The array of bids for the listing.
   * @returns {Object|null} - The highest bid or null if no bids.
   */
  function findHighestBid(bids) {
    return bids.reduce(
      (highest, current) =>
        current.amount > highest.amount ? current : highest,
      bids[0]
    );
  }

  const highestBid = findHighestBid(listingData.bids);

  let leader;

  if (window.innerWidth < 450) {
    if (highestBid) {
      const leaderElement = document.createElement("div");
      leaderElement.style.overflow = "hidden";
      leaderElement.textContent = "Current leader: " + highestBid.bidderName;
      leader = leaderElement;
    } else {
      const leaderElement = document.createElement("div");
      leaderElement.textContent = "";
      leader = leaderElement;
    }
  } else {
    const leaderElement = document.createElement("div");
    leaderElement.textContent = "";
    leader = leaderElement;
  }

  const priceSection = document.createElement("div");
  priceSection.classList.add("card__price", "flex-row");

  const currentBid = document.createElement("div");
  const bidsCount = listingData._count.bids;

  if (bidsCount > 0) {
    const bidsArraySorted = listingData.bids.sort(
      (a, b) => (b.amount || 0) - (a.amount || 0)
    );
    const highestBid = bidsArraySorted[0] && bidsArraySorted[0].amount;
    if (bidsArraySorted.length === 0 || highestBid === undefined) {
      currentBid.innerHTML = "No bids";
    } else {
      currentBid.innerHTML = highestBid + "$";
    }
  } else {
    currentBid.innerHTML = "No bids";
  }

  const arrow = document.createElement("i");
  arrow.classList.add("fa-solid", "fa-arrow-right");

  listingDetails.append(seller, title, leader);
  priceSection.append(currentBid, arrow);
  card.append(listingImg, listingDetails, priceSection);
  return card;
}

/**
 * Renders the listings on the page with a show more button for additional listings.
 * @param {Array} listingsData - The array of listing data to be rendered.
 * @param {HTMLElement} parent1 - The first parent element to append the initial listings.
 * @param {HTMLElement} parent2 - The second parent element to append additional listings.
 */
export function renderListings(listingsData, parent1, parent2) {
  const filteredListings = listingsData.data.filter((listing) => {
    const lowerCaseTitle = listing.title.toLowerCase();
    return (
      !lowerCaseTitle.includes("test") &&
      !lowerCaseTitle.includes("testing") &&
      !lowerCaseTitle.includes("tester") &&
      !lowerCaseTitle.includes("title") &&
      !lowerCaseTitle.includes("tiger") &&
      !lowerCaseTitle.includes("wool") &&
      !lowerCaseTitle.includes("tewtdj") &&
      !lowerCaseTitle.includes("thingy") &&
      !lowerCaseTitle.includes("diverse")
    );
  });

  const sortedNewest = filteredListings.sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  const firstEightListings = sortedNewest.slice(0, 8);
  let restListings = sortedNewest.slice(8, 40);

  const showMoreBtn = document.querySelector(".showMoreBtn");

  showMoreBtn.addEventListener("click", () => {
    showMoreBtn.innerHTML = `<span class="loader"></span>`;
    setTimeout(() => {
      restListings = sortedNewest.slice(41, 100);
      parent2.append(...restListings.map(listingsTemplate));
      showMoreBtn.style.display = "none";
    }, 2000);
  });

  parent1.append(...firstEightListings.map(listingsTemplate));
  parent2.append(...restListings.map(listingsTemplate));
}
