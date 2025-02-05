// AddProductForm.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AddProductForm from "./AddProductForm";
import productReducer from "./container/productSlice";

const renderWithProviders = (ui, { reduxState } = {}) => {
  const store = configureStore({
    reducer: { product: productReducer },
    preloadedState: reduxState,
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("AddProductForm", () => {
  test("renders form inputs", () => {
    renderWithProviders(<AddProductForm />);

    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stock Availability/i)).toBeInTheDocument();
  });

  test("shows validation errors on submit", async () => {
    renderWithProviders(<AddProductForm />);

    fireEvent.click(screen.getByText(/Submit/i));

    expect(
      await screen.findByText(/Product Name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Price is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Category is required/i)
    ).toBeInTheDocument();
  });

  test("submits form data successfully", async () => {
    renderWithProviders(<AddProductForm />);

    fireEvent.change(screen.getByLabelText(/Product Name/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "Jacket" },
    });
    fireEvent.click(screen.getByLabelText(/Stock Availability/i));

    fireEvent.click(screen.getByText(/Submit/i));

    expect(
      await screen.findByText(/Product added successfully!/i)
    ).toBeInTheDocument();
  });

  test("toggles dark mode", () => {
    renderWithProviders(<AddProductForm />);

    const toggleButton = screen.getByText(/Toggle Dark Mode/i);

    fireEvent.click(toggleButton);
    expect(document.querySelector(".form-container").classList).toContain(
      "dark-mode"
    );

    fireEvent.click(toggleButton);
    expect(document.querySelector(".form-container").classList).not.toContain(
      "dark-mode"
    );
  });
});
