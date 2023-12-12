export function listingsTemplate(listingData) {
  const card = document.createElement("a");
  card.classList.add("card", "shadow");
  card.href = "/sp2-bdiddy/listing/?id=" + listingData.id;

  const listingImg = document.createElement("img");
  listingImg.classList.add("card__img");

  if (!listingData.media || listingData.media === " ") {
    cardImage.src = "/assets/img/noimage.jpg";
  } else {
    const image = new Image();
    image.src = listingData.media;

    image.onload = function () {
      listingImg.src = listingData.media;
      listingImg.alt = "Image of " + listingData.title;
    };
    image.onerror = function () {
      listingImg.src = "/assets/img/noimage.jpg";
      listingImg.alt = "No image available"
    };
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

export function renderListings(listingsData, parent1, parent2) {
  const filteredListings = listingsData.filter((listing) => {
    const lowerCaseTitle = listing.title.toLowerCase();
    return (
      !lowerCaseTitle.includes("test") &&
      !lowerCaseTitle.includes("testing") &&
      !lowerCaseTitle.includes("tester") &&
      !lowerCaseTitle.includes("title")
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
      restListings = sortedNewest.slice(41, 100)
      parent2.append(...restListings.map(listingsTemplate));
      showMoreBtn.style.display = "none";
    }, 2000);
  });

  parent1.append(...firstEightListings.map(listingsTemplate));
  parent2.append(...restListings.map(listingsTemplate));
}


