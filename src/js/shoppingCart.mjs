import { getLocalStorage } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${product.Name}</h2>
    </a>
    <p class="cart-card__color">${product.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${product.FinalPrice}</p>
  </li>`;
}

export default class cartList {
    constructor (key, parent) {
      // we decided to use this information in order to make our class as reusable as possible 
      // the ability to be able to define these things when we use the class will make  it flexible
      this.key = key;
      this.parent = parent;
      this.total = 0;
    }

    renderCartContents() {
      const cartItems = getLocalStorage(this.key);
      const htmlItems = cartItems.map((item) => productCardTemplate(item));
      document.querySelector(this.parent).innerHTML = htmlItems.join("");
    }

    async price() {
      const products = getLocalStorage(this.key);
      this.totalPrice(products);
    }

    totalPrice(products) {
      const total = products.map((product) => product.FinalPrice);
      this.total = total.reduce((sum, product) => sum + product);
      document.querySelector(".cart-total").innerText += `Total: $${this.total}`;
    }
}
