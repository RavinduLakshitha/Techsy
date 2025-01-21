import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer,
  },
});
