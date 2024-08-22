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
  const profileUser = user?.data;

  if (!profileUser || !profileUser.name) {
    throw new Error("Cannot find User");
  }

  try {
    const userProfile = await getProfile(profileUser.name);

    const profileName = document.querySelector(".name");

    const profileImage = document.querySelector("#profileImage");
    const email = document.querySelector(".email");
    const winsContainer = document.querySelector(".wins");
    const funds = document.querySelector(".funds");
    const numberOfListings = document.querySelector(".listingAmount");
    const profileCardContainer = document.querySelector(
      ".profile-card-container"
    );

    if (userProfile.data.avatar) {
      profileImage.src = userProfile.data.avatar.url || "default-avatar.png";
      profileImage.alt = userProfile.data.avatar.alt || "Profile Image";
    } else {
      profileImage.src = "/assets/img/noimage.jpg";
      profileImage.alt = "No profile image available";
    }

    profileName.textContent = userProfile.data.name || "No name available";
    email.textContent = userProfile.data.email || "No email available";
    funds.textContent = `Funds: ${userProfile.data.credits || 0}$`;

    winsContainer.textContent = `Number of Wins: ${
      Array.isArray(userProfile.data.wins) ? userProfile.data.wins.length : 0
    }`;

    numberOfListings.textContent = Array.isArray(userProfile.data.listings)
      ? `Listings: ${userProfile.data.listings.length}`
      : "No listings available";

    userProfile.data.listings.forEach((listing) => {
      const profileCard = document.createElement("div");
      profileCard.classList.add("profile-card", "border");

      const profileCardImage = document.createElement("img");
      const defaultImage =
        "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=826&t=st=1702494458~exp=1702495058~hmac=d56fbe2332a59ded31ee5d1c49e38e5093f4405411d347c695155c6913e41d80";

      // Check if there are any media items
      if (
        !listing.media ||
        listing.media.length === 0 ||
        !listing.media[0].url ||
        listing.media[0].url.trim() === ""
      ) {
        profileCardImage.src = defaultImage;
        profileCardImage.alt = "No image available";
      } else {
        const image = new Image();
        image.src = listing.media[0].url;

        image.onload = function () {
          profileCardImage.src = listing.media[0].url;
          profileCardImage.alt =
            listing.media[0].alt || "Image of " + listing.title;
        };
        image.onerror = function () {
          profileCardImage.src = defaultImage;
          profileCardImage.alt = "No image available";
        };
      }

      profileCardImage.style.objectFit = "cover";
      profileCard.appendChild(profileCardImage);

      const profileCardTitle = document.createElement("div");
      profileCardTitle.textContent = listing.title || "No title available";

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("btn-container");

      const deleteBtn = document.createElement("a");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.addEventListener("click", () => openDeleteModal(listing.id));

      const viewBtn = document.createElement("a");
      viewBtn.textContent = "View";
      viewBtn.href = `/listing/?id=${listing.id}`;
      viewBtn.classList.add("viewBtn");

      buttonContainer.append(deleteBtn, viewBtn);
      profileCard.append(profileCardImage, profileCardTitle, buttonContainer);
      profileCardContainer.appendChild(profileCard);
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
  }
}

const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");
const overlay = document.getElementById("overlay");

function closeDeleteModal() {
  const deleteModal = document.getElementById("deleteModal");
  overlay.style.display = "none";
  deleteModal.style.display = "none";
  document.body.classList.remove("modal-open");
}

export async function handleDelete(listingId) {
  if (!listingId) {
    console.error("Listing ID is required to delete.");
    return;
  }

  try {
    console.log("Attempting to delete listing with ID:", listingId);

    // Assuming authorizeToken is a function that handles token validation
    await authorizeToken();

    const response = await deleteListing(listingId);

    if (response.ok) {
      console.log("Listing successfully deleted:", listingId);

      // Hide delete button and show success message
      confirmDeleteBtn.style.display = "none";
      cancelDeleteBtn.style.display = "none";

      const deleteText = document.querySelector(".delete-text");
      deleteText.textContent = "Listing successfully deleted.";

      setTimeout(() => {
        closeDeleteModal();
        location.reload(); // Reload the page after deletion
      }, 1500);
    } else {
      console.error(`Failed to delete listing. Status: ${response.status}`);
      alert("Failed to delete the listing. Please try again.");
    }
  } catch (error) {
    console.error("Error handling delete:", error);
    alert(
      "An error occurred while trying to delete the listing. Please try again later."
    );
  }
}

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

  overlay.onclick = closeDeleteModal;
}
