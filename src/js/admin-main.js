import { loadHeaderFooter } from "./utils.mjs";
import Admin from "./admin.mjs";

loadHeaderFooter();
const admin = new Admin("main");
admin.showLogin();
