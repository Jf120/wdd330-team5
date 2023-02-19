import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function packageItems(items) {
  const finalItems = items.map(function(item) {
    return {
      id : item.Id,
      name : item.Name,
      price : item.FinalPrice,
      quantity : 1
    };
  });

  return finalItems;
}

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
    constructor(key) {
        this.key = key;
        this.list = [];
        this.itemTotal = 0;
        this.subTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      this.itemTotal = this.list.length;

      const totalList = this.list.map((product) => product.FinalPrice);
      this.subTotal = totalList.reduce((sum, product) => sum + product);

      document.querySelector("#num-items").innerText = `${this.itemTotal}`;
      document.querySelector("#cartTotal").innerText = `$${this.subTotal}`;
    
      this.calculateOrdertotal();
    }
    calculateOrdertotal() {
      
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.calculateShippingandTax();   

      this.orderTotal = (
        parseFloat(this.subTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
      ).toFixed(2);
    }
    calculateShippingandTax() {
          
      if (this.list) {
        this.shipping = 10.00;

        if (this.list.length > 1) {
          this.shipping += 2.00 * (this.list.length - 1);
        }

        this.tax = this.subTotal * 0.06;
        };
      }

      displayTotals() {
        // display the totals.
        document.querySelector("#shipping").innerText = `$${this.shipping}`;
        document.querySelector("#tax").innerText = `$${this.tax.toFixed(2)}`;
        document.querySelector("#orderTotal").innerText = `$${this.orderTotal}`;
      }
    
      async checkout() {
        const formElement = document.forms["checkout"];

        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax.toFixed(2);
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
          const res = await services.checkout(json);
          console.log(res);
          } catch (err) {
          console.log(err);
          }
        }
}