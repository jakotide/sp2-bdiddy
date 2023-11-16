const hamburgerBtn = document.querySelector(".lines");
const lineOne = document.querySelector(".line-one");
const lineTwo = document.querySelector(".line-two");
const navContent = document.querySelector(".nav__content");

hamburgerBtn.addEventListener("click", () => {
    navContent.classList.toggle("active");
    lineOne.classList.toggle("active");
    lineTwo.classList.toggle("active");
});