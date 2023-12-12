const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slidesContainer = button.closest("[data-carousel]");
    const slides = slidesContainer.querySelector("[data-slides]");

    const activeSlide = slides.querySelector(".slideImg.active");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.querySelectorAll(".slideImg").forEach(slide => {
      slide.classList.remove("active");
    });

    slides.children[newIndex].classList.add("active");
  });
});


