// SCSS 
import '../../scss/main.scss';

// JS
import '../components/hamburger';
import '../components/tags.js';

const openModalBtn = document.querySelector("[data-open-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openModalBtn.addEventListener("click", () => {
    modal.showModal();
})

closeModalBtn.addEventListener("click", () => {
    modal.close();
})

document.addEventListener('DOMContentLoaded', function () {
    const createForm = document.querySelector('.create-form');
    const uploadImagesForm = document.querySelector('.upload-images-form');

    createForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission
        // Your form submission logic here
    });

    uploadImagesForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission
        // Your form submission logic here
    });

    const titleInput = document.getElementById('title');
    const tagsInput = document.getElementById('tags');

    titleInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            // Your logic for handling Enter key in the title input
        }
    });

    tagsInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            // Your logic for handling Enter key in the tags input
        }
    });
});

