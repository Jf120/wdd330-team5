import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart");
checkout.init();

document
  .querySelector("#zip")
  .addEventListener("keyup", checkout.displayTotals.bind(checkout));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  checkout.checkout();
});

loadHeaderFooter();
