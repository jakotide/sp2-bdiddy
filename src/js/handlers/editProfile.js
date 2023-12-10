import { editProfileImage } from "../api/listings/editProfile";
import { load } from "../storage/load";


export function editImage() {
    const editForm = document.querySelector(".profile-img-form");
    const button = document.querySelector("#successBtn");
    if(editForm) {
        let name = load("User");
        editForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const editForm = event.target;
            const editFormData = new FormData(editForm);
            const user = Object.fromEntries(editFormData.entries());
            user.name = name;
            console.log(user)
            try {
                button.innerHTML = '<span class="loader"></span>';
                await editProfileImage(user);
                button.innerText = "Success";
                setTimeout(() => {
                    location.reload();
                }, 600);

            } catch(error) {
                console.log("error");
            }
        })
    }
}