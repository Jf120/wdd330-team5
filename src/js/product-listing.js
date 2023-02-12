import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
//const listing = new ProductList("Tents", dataSource, element);
const listing = await this.dataSource.getData(this.category);
listing.init();

loadHeaderFooter();
