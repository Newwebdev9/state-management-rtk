import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store"; // Import your store
import ProductForm from "./AddProductForm"; // Import your component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductForm />
    </Provider>
  </React.StrictMode>
);
