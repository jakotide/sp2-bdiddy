import { getProfile } from "../api/listings/getProfile";
import { load } from "../storage/load";

export async function renderProfile() {
  const user = load("User");
  if (!user || !user.name) {
    throw new Error("Cannot find User");
  }

  try {
    const { name } = load("User");
    const user = await getProfile(name);
    const profileName = document.querySelector(".name");
    const profileImage = document.querySelector("#profileImage");
    const email = document.querySelector(".email");
    const winsContainer = document.querySelector(".wins");
    const funds = document.querySelector(".funds");
    const numberOfListings = document.querySelector(".listingAmount");
    const profileCardContainer = document.querySelector(
      ".profile-card-container"
    );

    profileImage.src = user.avatar;
    profileImage.alt = `${user.name}'s Profile Image`;

    profileName.textContent = user.name;

    email.textContent = user.email;

    funds.textContent = "Funds: " + user.credits + "$";

    if (Array.isArray(user.wins) && user.wins.length === 0) {
      winsContainer.textContent += `Number of Wins: ${user.wins.length}`;
    } else {
      winsContainer.textContent += "No wins yet.";
    }

    if (Array.isArray(user.listings) && user.listings.length === 0) {
      numberOfListings.textContent = `No listings yet.`;
    } else if (Array.isArray(user.listings)) {
      numberOfListings.textContent = `Listings: ${user.listings.length}`;
    } else {
      console.log(error);
    }

    user.listings.forEach((listing) => {
      const profileCard = document.createElement("a");
      profileCard.classList.add("profile-card", "border");
      profileCard.href = "/sp2-bdiddy/listing/?id=" + listing.id;

      const profileCardImage = document.createElement("img");
    
      if (!listing.media || listing.media === " ") {
        cardImage.src = "/assets/img/noimage.jpg";
      } else {
        const image = new Image();
        image.src = listing.media;
    
        image.onload = function () {
          profileCardImage.src = listing.media;
          profileCardImage.alt = "Image of " + listing.title;
        };
        image.onerror = function () {
          profileCardImage.src = "/assets/img/noimage.jpg";
          profileCardImage.alt = "No image available"
        };
      }

      const profileCardTitle = document.createElement("div");
      profileCardTitle.textContent = listing.title;

      profileCard.append(profileCardImage, profileCardTitle);
      profileCardContainer.append(profileCard);
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
  }
}
