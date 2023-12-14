import { getProfile } from "../api/listings/getProfile";
import { load } from "../storage/load";
import { deleteListing } from "../api/listings/delete";
import { authorizeToken } from "../storage/authorizeToken";

/**
 * Renders the user profile, including user details, funds, wins, listings, and profile cards.
 *
 */
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
      const profileCard = document.createElement("div");
      profileCard.classList.add("profile-card", "border");

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
          profileCardImage.alt = "No image available";
        };
      }

      const profileCardTitle = document.createElement("div");
      profileCardTitle.textContent = listing.title;

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("btn-container");

      const deleteBtn = document.createElement("a");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("deleteBtn");

      deleteBtn.addEventListener("click", () => openDeleteModal(listing.id));

      const viewBtn = document.createElement("a");
      viewBtn.textContent = "View";
      viewBtn.href = "/sp2-bdiddy/listing/?id=" + listing.id;
      viewBtn.classList.add("viewBtn");

      buttonContainer.append(deleteBtn, viewBtn);
      profileCard.append(profileCardImage, profileCardTitle, buttonContainer);
      profileCardContainer.append(profileCard);
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
  }
}
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const overlay = document.getElementById("overlay");

function openDeleteModal(listingId) {
  const deleteModal = document.getElementById("deleteModal");

  gsap.set(deleteModal, { y: -50, opacity: 0 });

  overlay.style.display = "block";
  deleteModal.style.display = "block";

  gsap.to(deleteModal, {
    duration: 0.8,
    ease: "elastic.out(1.2, 0.5)",
    y: 0,
    x: 0,
    opacity: 1,
  });

  confirmDeleteBtn.onclick = () => handleDelete(listingId);
  cancelDeleteBtn.onclick = closeDeleteModal;
  document.body.classList.add("modal-open");

  overlay.onclick = () => {
    closeDeleteModal();
  };
}

function closeDeleteModal() {
  const deleteModal = document.getElementById("deleteModal");
  overlay.style.display = "none";
  deleteModal.style.display = "none";
  document.body.classList.remove("modal-open");
}

const deleteText = document.querySelector(".delete-text");
async function handleDelete(listingId) {
  try {
    authorizeToken(
      async () => {
        await deleteListing(listingId);
        confirmDeleteBtn.style.display = "none";
        cancelDeleteBtn.style.display = "none";
        deleteText.textContent = "Listing successfully deleted.";
        setTimeout(() => {
          closeDeleteModal();
          location.reload();
        }, 1500);
      },
      () => {
        console.error("Invalid token");
      }
    );
  } catch (error) {
    console.error("Error handling delete:", error);
  }
}
