import { createListing } from "../api/listings";

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
      

      const listing = {
        title: formData.get("title"),
        description: formData.get("description"),
        // tags: tagsList,
        endsAt: endsAt,
      };

      const modalForm = document.querySelector(".upload-images-form");
      if (modalForm) {
        const modalFormData = new FormData(modalForm);
        const mediaUrls = Array.from(modalFormData.getAll("media"));
        listing.media = mediaUrls;
      }

      try {
        await createListing(listing);
        console.log("Success!");
      } catch (error) {
        console.error("Error creating listing:", error);
      }
    });
  }
}
