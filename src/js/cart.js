import cartList from "./shoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cart = new cartList("so-cart", ".product-list");
cart.renderCartContents();
