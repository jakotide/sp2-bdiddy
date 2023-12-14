import { createListing } from "../api/listings";

/**
 * Submits a new listing based on the form input.
 */
export async function submitListing() {
  const form = document.querySelector(".create-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const date = formData.get("date");
      const time = formData.get("time");
      const endsAt = `${date}T${time}`;
      const tagsInput = document.getElementById("tags");
      const tagsContainer = document.querySelector(".tags-container");
      const createBtn = document.querySelector(".create-btn");
      const header = document.querySelector(".create-h1");

      const listing = {
        title: formData.get("title"),
        description: formData.get("description"),
        endsAt: endsAt,
      };

      const tags = Array.from(tagsContainer.children)
        .filter((tagElement) => tagElement.classList.contains("tag"))
        .map((tagElement) =>
          tagElement.querySelector(".tag-text").textContent.trim()
        )
        .filter((tag) => tag !== "");

      if (tags.length > 0) {
        listing.tags = tags;
      }

      const modalForm = document.querySelector(".upload-images-form");
      if (modalForm) {
        const modalFormData = new FormData(modalForm);
        const mediaUrls = Array.from(modalFormData.getAll("media"));
        const nonEmptyMediaUrls = mediaUrls.filter((url) => url.trim() !== "");

        if (nonEmptyMediaUrls.length > 0) {
          listing.media = nonEmptyMediaUrls;
        }
      }

      try {
        createBtn.innerHTML = '<span class="loader"></span>';
        await createListing(listing);
        createBtn.textContent = "Success!";
        header.textContent = "Listing succesfully created!";
        setTimeout(() => {
          location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error creating listing:", error);
      }
    });
  }
}
