const tagForm = document.querySelector(".create-form");
const tagInput = document.getElementById("tags");
const tagsContainer = document.querySelector(".tags-container");

const colors = [
  { background: "#23A79A", font: "#000000" },
  { background: "#FF91E7", font: "#000000" },
  { background: "#91A8EC", font: "#000000" },
];

let colorIndex = 0;

/**
 * Get the next color in the colors array and update the color index.
 * @returns {Object} The next color object.
 */
const getNextColor = () => {
  const nextColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return nextColor;
};

const removeTag = (event) => {
  if (event.target.classList.contains("tag-close")) {
    event.target.parentElement.remove();
  }
};

/**
 * Create a tag element with the specified value and color.
 * @param {string} value - The tag value.
 * @param {Object} color - The color from color array.
 * @returns {HTMLSpanElement} The created tag element.
 */
function createTagElement(value, color) {
  const spanElement = document.createElement("span");
  spanElement.classList.add("tag");
  spanElement.style.backgroundColor = color.background;
  spanElement.style.color = color.font;

  const tagText = document.createElement("span");
  tagText.classList.add("tag-text");
  tagText.textContent = value;

  const tagClose = document.createElement("span");
  tagClose.classList.add("tag-close");
  tagClose.textContent = " x ";

  spanElement.appendChild(tagText);
  spanElement.appendChild(tagClose);

  return spanElement;
}

/**
 * Add a tag when the Enter key is pressed in the tag input.
 * @param {KeyboardEvent} event - The keyup event.
 */
const addTag = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const value = event.target.value;
    const tagColor = getNextColor();
    const spanElement = createTagElement(value, tagColor);
    tagsContainer.appendChild(spanElement);
    tagInput.value = "";
  }
};

tagForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

tagInput.addEventListener("keyup", addTag);

window.onload = () => {
  tagsContainer.addEventListener("click", removeTag);
};
