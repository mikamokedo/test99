import "./styles/style.css";
import loading from "/images/icons/loading.svg?raw";
import { initContent } from "./js/initContent.js";

document.querySelector("#app").innerHTML = loading;

document.addEventListener("DOMContentLoaded", () => {
  initContent();
});
