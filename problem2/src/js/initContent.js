import { MainContent } from "../components/Swap.js";
import { initTokenDropdowns } from "./tokenDropdown.js";
import { handleSubmit } from "./handleSubmit.js";
import { handleInput } from "./handleInput.js";
import { delay } from "./utils.js";

export const PRICE_API_URL = "https://interview.switcheo.com/prices.json";
export let PRICE_DATA = [];
export const initContent = async () => {
  try {
    await delay(1000); // Simulate initial delay before fetching prices
    const response = await fetch(PRICE_API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch price data");
    }
    PRICE_DATA = await response.json();
    onSuccess();
  } catch (error) {
    onError();
  }
};

const onError = () => {
  document.querySelector("#app").innerHTML = "<h2>Error loading price data. Please try again later.</h2>";
};
const onSuccess = () => {
  document.querySelector("#app").innerHTML = MainContent();
  initTokenDropdowns();
  handleInput();
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit();
  });
};
