import { PRICE_DATA } from "./initContent.js";

export const handleInput = () => {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const errorMessage = document.querySelector(".error-message");
      errorMessage.innerHTML = "";
      const currentAmount = e.target.value;
      const currentInputId = e.target.id;
      const otherAmount = document.querySelector(
        currentInputId === "input-amount" ? "#output-amount" : "#input-amount"
      );
      const submitButton = document.querySelector(".submit-button");
      if (!currentAmount) {
        submitButton.disabled = true;
        otherAmount.value = "";
      } else {
        submitButton.disabled = false;

        const currentTokenSymbol = document.querySelector(
          `#${currentInputId === "input-amount" ? "send-section" : "receive-section"} .token-name`
        ).innerText;
        const otherTokenSymbol = document.querySelector(
          `#${currentInputId === "input-amount" ? "receive-section" : "send-section"} .token-name`
        ).innerText;

        const currentTokenPrice = PRICE_DATA.find((p) => p.currency === currentTokenSymbol)?.price;
        const otherTokenPrice = PRICE_DATA.find((p) => p.currency === otherTokenSymbol)?.price;
        if(!currentTokenPrice && !isNaN(currentTokenPrice)){
        otherAmount.value = ((currentTokenPrice * parseFloat(currentAmount)) / otherTokenPrice).toFixed(6);

        }
      }
    });
  });
};
