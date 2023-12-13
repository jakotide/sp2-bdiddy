const toTopBtn = document.querySelector(".to-top-btn");

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
  