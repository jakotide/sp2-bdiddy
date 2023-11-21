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
    const thumbnailsContainer = document.querySelector('.thumbnails-container');

    createForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission
        // Your form submission logic here
    });

    uploadImagesForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        // Get image URLs from the form
        const url1 = document.querySelector('[name="url1"]').value.trim();
        const url2 = document.querySelector('[name="url2"]').value.trim();
        const url3 = document.querySelector('[name="url3"]').value.trim();
    
        // Create thumbnails only for non-empty URLs
        if (url1 !== '') {
            createThumbnail(url1, 1);
        }
    
        if (url2 !== '') {
            createThumbnail(url2, 2);
        }
    
        if (url3 !== '') {
            createThumbnail(url3, 3);
        }
    });

    function createThumbnail(imageUrl, position) {
        const thumbnail = document.createElement("img");
        thumbnail.src = imageUrl;
        
        // Assuming you have an element with class 'thumbnail-box'
        const thumbnailBox = document.querySelector(`.thumbnail-box:nth-child(${position})`);
        thumbnailBox.innerHTML = '';
        // Append the thumbnail to the corresponding thumbnail box
        thumbnailBox.append(thumbnail);
    }
   

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

