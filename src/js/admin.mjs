import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

function Template() {
    return `<fieldset class="login-form">
    <legend>Login</legend>
    <p>
        <label for="email">Email</label>
        <input type="text" placeholder="email" id="email" value="user1@email.com"/>
    </p>
    <p>
        <label for="password">Password</label>
        <input type="password" placeholder="password" id="password" />
    </p>
    <button type="submit" id="loginButton">Login</button>
    </fieldset>`;
}

export default class Admin {
    
    constructor(output) {
        this.main = document.querySelector(output);
        this.token = null;
        this.services = new ExternalServices();
    }
    
    async login(credentials, callback) {
        try {
            this.token = await this.services.loginRequest(credentials);
            callback();
            } catch (err) {
                alertMessage(err.message.message);
            }
    }

    showLogin() {

        this.main.innerHTML = Template();
        document.querySelector("#loginButton").addEventListener("click", (e) => {
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;
            this.login({ email, password }, this.showOrders.bind(this));
        });
    }
    
    async showOrders() {
        try {
            const orders = await this.services.getOrders(this.token);
            this.mainElement.innerHTML = orderTemplate();
            const parent = document.querySelector("#orders tbody");
        
            parent.innerHTML = orders
            .map(
                (order) =>
                `<tr><td>${order.id}</td><td>${new Date(
                order.orderDate
                ).toLocaleDateString("en-US")}</td><td>${
                order.items.length
                }</td><td>${order.orderTotal}</td></tr>`
            )
            .join("");
        } catch (err) {
        console.log(err);
        }
    }
}

function orderTemplate() {

    return `<h2>Current Orders</h2>
    <table id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>
    `;
}