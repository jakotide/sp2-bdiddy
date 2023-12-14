import { placeBidApi } from "../api/listings";
import { load } from "../storage/load";

export function placeBid() {
  const placeBidForm = document.querySelector(".bid-form");
  const btn = document.querySelector(".bid-btn");
  const plussBtn = document.querySelector(".pluss");
  const minusBtn = document.querySelector(".minus");
  const inputValue = document.querySelector("#amount");

  plussBtn.addEventListener("click", () => {
    let currentValue = parseInt(inputValue.value, 10) || 0;

    currentValue += 10;

    inputValue.value = Math.max(currentValue, 0);
  });

  minusBtn.addEventListener("click", () => {
    let currentValue = parseInt(inputValue.value, 10) || 0;

    currentValue -= 10;
    currentValue = Math.max(currentValue, 0);

    inputValue.value = currentValue;
  });

  if (placeBidForm) {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const inputValue = document.querySelector("input[name=amount]").value;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");
      const userLoggedIn = load("User");

      if (!inputValue || isNaN(inputValue) || +inputValue <= 0) {
        alert("Invalid amount. Please enter a valid bid amount.");
        return;
      }

      try {
        if (userLoggedIn) {
          await placeBidApi(+inputValue, id);
          btn.textContent = "Success!";
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          alert("FAIL");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}