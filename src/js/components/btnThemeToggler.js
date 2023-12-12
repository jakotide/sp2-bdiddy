const desertFruitBtn = document.querySelector(".desertBtn");
const neonMountainBtn = document.querySelector(".mountainBtn");
const funkyCoralsBtn = document.querySelector(".coralBtn");
const mainBtn = document.querySelector(".mainBtn");
const flowerBtn = document.querySelector(".flowerBtn");

const body = document.querySelector(".body");
const nav = document.querySelector(".nav");
const hero = document.querySelector(".hero__grid");
const cardContainer = document.querySelectorAll(".card__container");
const marquee = document.querySelector(".marquee");
const themeContainer = document.querySelector(".theme__container");
const hideBtn = document.querySelector(".hideThemesBtn");
const showBtn = document.querySelector(".showThemesBtn");

/**
 * Applies the specified theme to the given elements.
 *
 * @param {Element[]} elememts - The elements to apply the theme to.
 * @param {string} theme - The theme to apply.
 */
function applyTheme(elememts, theme) {
  elememts.forEach((element) => {
    element.setAttribute("data-theme", theme);
  });
}

/**
 * Toggles the theme of a card container and its child cards.
 *
 * @param {Element} cardContainer - The card container element.
 * @param {string} theme - The theme to apply.
 */
function toggleCardTheme(cardContainer, theme) {
  const cards = document.querySelectorAll(".card");
  applyTheme(cards, theme);
  applyTheme([cardContainer], theme);
}

/**
 * Toggles the global theme for specified elements.
 *
 * @param {string} theme - The theme to apply.
 */
function toggleGlobalTheme(theme) {
  applyTheme([body, nav, hero, marquee, themeContainer, showBtn], theme);
}

function hideBtnMobile(mediaQuery) {
  if (mediaQuery.matches) {
    themeContainer.classList.toggle("active");
    showBtn.classList.toggle("active");
  }
}

let mediaQuery = window.matchMedia("(max-width: 30em)");

hideBtnMobile(mediaQuery);

mediaQuery.addEventListener("change", function (event) {
  hideBtnMobile(event.target);
});

desertFruitBtn.addEventListener("click", () => {
  cardContainer.forEach((container) =>
    toggleCardTheme(container, "desert-fruit")
  );
  toggleGlobalTheme("desert-fruit");
});

neonMountainBtn.addEventListener("click", () => {
  cardContainer.forEach((container) =>
    toggleCardTheme(container, "neon-mountain")
  );
  toggleGlobalTheme("neon-mountain");
});

funkyCoralsBtn.addEventListener("click", () => {
  cardContainer.forEach((container) =>
    toggleCardTheme(container, "funky-corals")
  );
  toggleGlobalTheme("funky-corals");
});

mainBtn.addEventListener("click", () => {
  cardContainer.forEach((container) => {
    toggleCardTheme(container, "main-theme");
    toggleGlobalTheme("main-theme");
  });
});

flowerBtn.addEventListener("click", () => {
  cardContainer.forEach((container) => {
    toggleCardTheme(container, "flower-power");
    toggleGlobalTheme("flower-power");
  });
});

hideBtn.addEventListener("click", () => {
  themeContainer.classList.toggle("active");
  showBtn.classList.toggle("active");
});

showBtn.addEventListener("click", () => {
  themeContainer.classList.toggle("active");
  showBtn.classList.toggle("active");
});
