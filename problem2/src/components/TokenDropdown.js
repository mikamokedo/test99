import arrow from "/images/icons/arrow.svg?raw";

export const TokenDropdown = ({ id, defaultToken = "AAVE" }) => {
  const defaultIcon = `/images/tokens/${defaultToken}.svg`;

  return `<div class="swap-token-dropdown" data-dropdown-id="${id}">
    <div class="token-selected">
      <img class="token-icon" src="${defaultIcon}" alt="${defaultToken}" />
      <div class="token-name">${defaultToken}</div>
      ${arrow}
    </div>
    <div class="token-dropdown-list" style="display: none;">

    </div>
  </div>`;
};
