const toTopBtn = document.querySelector(".to-top-btn");

/**
 * Scrolls to top of the page when clicked.
 */
export function toTopButton() {
    window.addEventListener("scroll", () => {
      if (window.innerWidth > 500) {
        if (window.scrollY > 1500) {
          toTopBtn.classList.add("active");
        } else {
          toTopBtn.classList.remove("active");
        }
      }
    });
  }
  