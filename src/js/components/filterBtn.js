const filterBtnMobile = document.querySelector(".filter__menu-btn");
const filterMenuMobile = document.querySelector(".filter__menu");
const filterBtns = document.querySelectorAll(".filter__btn");
let activeBtn = filterBtns[0];

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn === activeBtn) {
      return;
    }
    if (activeBtn) {
      activeBtn.classList.remove("active");
    }

    btn.classList.add("active");
    activeBtn = btn;
  });
});

filterBtnMobile.addEventListener("click", () => {
  filterMenuMobile.classList.toggle("active");
});
