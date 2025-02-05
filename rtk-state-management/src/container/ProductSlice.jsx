import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",

  price: 0,
  stock: 0,
  category: "",

  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },
    saveProduct: (state) => {
      // Here you would typically make an API call to save the product data
      console.log("Saving product:", state); // Placeholder
      // Reset the form after saving (optional)
      return initialState; // You can also reset individual fields
    },
  },
});

export const { updateField, addProduct, setCategory, saveProduct } = productSlice.actions;
export default productSlice.reducer;
