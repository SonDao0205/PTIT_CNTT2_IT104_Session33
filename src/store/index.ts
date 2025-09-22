import { createStore } from "redux";
import { ShoppingAction } from "./ShoppingCart";

const store = createStore(ShoppingAction);
export default store;
