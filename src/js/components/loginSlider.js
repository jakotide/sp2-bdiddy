const toggleBtns = document.querySelectorAll(".login-toggle");
const main = document.querySelector(".main-login");

toggleBtns.forEach((btn => {
    btn.addEventListener("click", () => {
        main.classList.toggle("active");
    });
}))