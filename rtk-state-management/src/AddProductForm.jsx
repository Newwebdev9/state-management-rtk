import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { productSlice } from "./container/productSlice";
import "./App.css";

const schema = z.object({
  productName: z.string().nonempty("Product Name is required"),
  price: z
    .number()
    .positive("Price must be positive")
    .refine((val) => val > 0, "Price is required"),
  category: z.string().nonempty("Category is required"),
  stock: z.boolean().optional(),
});

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(productSlice.actions.addProduct(data));
    localStorage.setItem("productData", JSON.stringify(data));
    alert("Product added successfully!");
  };

  return (
    <div className={`form-container ${darkMode ? "dark-mode" : ""}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            {...register("productName")}
            className="border p-2 w-full"
          />
          {errors.productName && (
            <p className="text-red-500">{errors.productName.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="border p-2 w-full"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Category</label>
          <select {...register("category")} className="border p-2 w-full">
            <option value="">Select Category</option>
            <option value="Jacket">Jacket</option>
            <option value="Shirt">Shirt</option>
            <option value="Pants">Pants</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Stock Availability</label>
          {/* <input
            type="checkbox"
            {...register("stock")}
            className="border p-2"
          /> */}
          <label className="switch">
            <input type="checkbox" {...register("stock")} />
            <span className="slider"></span>
          </label>
          {errors.stock && (
            <p className="text-red-500">{errors.stock.message}</p>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-4 bg-gray-500 text-white p-2 rounded"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default AddProductForm;
export { schema };
