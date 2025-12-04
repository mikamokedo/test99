import { delayWithError } from "./utils.js";

export const handleSubmit = async () => {
  const submitButton = document.querySelector(".submit-button");
  const errorMessage = document.querySelector(".error-message");
  const inputReceive = document.querySelector("#output-amount").value;
  const tokenReceive = document.querySelector("#receive-section .token-name").innerText;
  const inputSend = document.querySelector("#input-amount").value;
  if (!inputSend || !inputReceive || isNaN(inputSend) || isNaN(inputReceive)) {
    errorMessage.innerHTML = "Please enter valid amounts";
    return;
  }

  try {
    submitButton.innerHTML = "Processing...";
    submitButton.disabled = true;
    errorMessage.innerHTML = "";
    await delayWithError(1000); // Simulate delay when submitting with possible error
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="success-message">
        <div>Swap completed successfully!</div>
        <div>You received ${inputReceive} ${tokenReceive} tokens.</div>
        </div>`
    );
    setTimeout(() => {
      const successMessage = document.querySelector(".success-message");
      if (successMessage) {
        successMessage.remove();
      }
    }, 3000);
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "Confirm Swap";
  }
};
