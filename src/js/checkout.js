import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { clearLocalStorage } from "./utils.mjs";

const checkout = new CheckoutProcess("so-cart");
checkout.init();

document
  .querySelector("#zip")
  .addEventListener("keyup", checkout.displayTotals.bind(checkout));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  var myForm = document.forms[0];//this should return the correct form
  var check_status = myForm.checkValidity();
  myForm.reportValidity();
  if(check_status){
    checkout.checkout();
    window.location.href = "../checkout/success.html";
    clearLocalStorage();
  }
});

loadHeaderFooter();
