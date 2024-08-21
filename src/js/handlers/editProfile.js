import { editProfileImage } from "../api/listings/editProfile";
import { load } from "../storage/load";

/**
 * Function to handle the profile image editing form submission.
 */
export function editImage() {
  const editForm = document.querySelector(".profile-img-form");
  const button = document.querySelector("#successBtn");

  if (editForm) {
    const user = load("User");
    const editName = user?.data?.name; // Adjust according to actual data structure

    editForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission

      const editFormData = new FormData(editForm);
      const userFormData = Object.fromEntries(editFormData.entries());

      if (!userFormData.avatar) {
        console.log("No avatar provided.");
        return;
      }

      try {
        button.innerHTML = '<span class="loader"></span>'; // Show loading indicator
        await editProfileImage(userFormData);
        button.innerText = "Success";
        setTimeout(() => {
          location.reload(); // Refresh the page after a short delay
        }, 600);
      } catch (error) {
        console.error("Error updating profile image:", error);
        button.innerText = "Error";
      }
    });
  } else {
    console.warn("Edit form not found.");
  }
}
