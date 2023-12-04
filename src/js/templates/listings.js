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
      leader = document.createElement("div");
      leader.textContent = "Current leader: " + highestBid.bidderName;
    } else {
      leader = document.createElement("div");
      leader.textContent = "";
    }
  } else {
    leader = document.createElement("div");
    leader.textContent = "";
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
  const firstEightListings = listingsData.slice(0, 8);
  const restListings = listingsData.slice(8);

  parent1.append(...firstEightListings.map(listingsTemplate));
  parent2.append(...restListings.map(listingsTemplate));
}
