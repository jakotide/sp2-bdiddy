const filterBtnMobile = document.querySelector(".filter__menu-btn");
const filterMenuMobile = document.querySelector(".filter__menu");
const filterBtns = document.querySelectorAll(".filter__btn");
const overlay = document.querySelector("#overlay");
const mobileBtn = document.querySelectorAll(".filter-mobile-btn");
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
  overlay.style.display = "block";
  document.body.classList.add("modal-open");
});

filterMenuMobile.addEventListener("click", (event) => {
  event.stopPropagation(); 
  filterMenuMobile.classList.toggle("active");
  overlay.style.display = "none";
  document.body.classList.remove("modal-open");
})

overlay.onclick = () => {
  filterMenuMobile.classList.toggle("active");
  overlay.style.display = "none";
  document.body.classList.remove("modal-open");
};

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("filter-mobile-btn")) {
    overlay.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});
document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("active")) {
    overlay.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});
