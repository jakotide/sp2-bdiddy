import { placeBidApi } from "../api/listings";
import { getListing } from "../api/listings";
import { load } from "../storage/load";

/**
 * Function to handle placing bids.
 * 
 */
export async function placeBid() {
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
          const currentListing = await getListing(id);
          const currentHighestBid = findHighestBid(currentListing.bids);

          if (currentHighestBid && +inputValue <= currentHighestBid.amount) {
            alert("Your bid must be higher than the current highest bid.");
            return;
          }

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

/**
 * Function to find the highest bid from a list of bids.
 * @param {Array} bids - Array of bids.
 * @returns {Object} - The highest bid object.
 */
function findHighestBid(bids) {
  return bids.reduce(
    (highest, current) => (current.amount > highest.amount ? current : highest),
    bids[0]
  );
}
