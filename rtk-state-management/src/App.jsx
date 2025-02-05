import AddProductForm from "./AddProductForm.jsx"; // Import your form component
import ProductList from "./ProductList.jsx"; // A component to display the product list (see below)

function App() {
  return (
    <div className="App">
      <h1>Product Management</h1>
      <AddProductForm />
      <ProductList />
    </div>
  );
}

export default App;
