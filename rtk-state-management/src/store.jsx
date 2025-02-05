import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./container/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
