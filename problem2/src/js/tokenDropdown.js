import { PRICE_DATA } from "./initContent.js";

export const initTokenDropdowns = () => {
  document.addEventListener("click", function (event) {
    const swapTokenDropdown = event.target.closest(".swap-token-dropdown");
    if (swapTokenDropdown) {
      const dropdownId = swapTokenDropdown.dataset.dropdownId;
      const tokenSelected = event.target.closest(".token-selected");
      if (tokenSelected) {
        const dropdown = swapTokenDropdown.querySelector(`.token-dropdown-list`);
        if (dropdown) {
          // Toggle current dropdown
          const isVisible = dropdown.style.display !== "none";
          dropdown.style.display = isVisible ? "none" : "block";

          // add tokens to dropdown list and also filter out the selected token
          if (!isVisible) {
            const otherTokenSymbol = document.querySelector(
              `#${dropdownId === "send" ? "receive-section" : "send-section"} .token-name`
            ).innerText;

            dropdown.innerHTML = PRICE_DATA.filter((m) => m.currency !== otherTokenSymbol)
              .map(
                (m) => `<div class="token-item" data-token="${m.currency}">
        <img src="/images/tokens/${m.currency}.svg" alt="${m.currency}" />
        <div>${m.currency}</div>
      </div>`
              )
              .join("");
          }
        }
        return;
      }

      // select token option
      const selectOption = event.target.closest(".token-item");

      if (selectOption) {
        const selectedToken = selectOption.dataset.token;
        const nameDiv = swapTokenDropdown.querySelector(".token-name");
        const iconImg = swapTokenDropdown.querySelector(".token-icon");

        if (nameDiv) {
          nameDiv.textContent = selectedToken;
        }
        if (iconImg) {
          iconImg.src = `/images/tokens/${selectedToken}.svg`;
        }
        const dropdown = swapTokenDropdown.querySelector(`.token-dropdown-list`);
        if (dropdown) {
          dropdown.style.display = "none";
        }

        // update input
        const sendInput = document.querySelector("#input-amount");
        const receiveInput = document.querySelector("#output-amount");
        sendInput.value = "";
        receiveInput.value = "";
      }
    } else {
      //close dropdowns when clicking outside
      document.querySelectorAll(".token-dropdown-list").forEach((dropdown) => {
        dropdown.style.display = "none";
      });
    }
  });
};
