import { useSelector } from "react-redux";

const ProductList = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.productName} - ${product.price} - {product.category} -{" "}
            {product.stockAvailability ? "In Stock" : "Out of Stock"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
