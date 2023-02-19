import cartList from "./shoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cart = new cartList("so-cart", ".product-list");
cart.renderCartContents();
cart.price();

if (cart) {
  document.querySelector(".hide").style.visibility = "visible";
}
