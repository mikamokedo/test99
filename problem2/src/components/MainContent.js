import { TokenDropdown } from "./TokenDropdown.js";
export const MainContent = () => `<div>
<h1>Token Swap</h1>
   <form>
  <div class="item-swap" id="send-section">
   <div class="item-swap-amount">
    <label for="input-amount">Amount to send</label>
    <input id="input-amount" placeholder="0.0"  oninput="this.value = this.value.replace(/[^0-9.]/g, '');" maxlength="10"/>
  </div>
    ${TokenDropdown({ id: "send", defaultToken: "ETH" })}
  </div>
  <div class="item-swap"  id="receive-section">
   <div class="item-swap-amount">
    <label for="output-amount">Amount to receive</label>
    <input id="output-amount" placeholder="0.0" oninput="this.value = this.value.replace(/[^0-9.]/g, '');" maxlength="10"/>
   </div>
    ${TokenDropdown({ id: "receive", defaultToken: "USD" })}
  </div>
    <div class="error-message"></div>
      <button class="submit-button" disabled>Confirm Swap</button>
  </form>
  </div>`;
