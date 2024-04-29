
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductListingPage.css";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [expiredOnly, setExpiredOnly] = useState(false);
  const [lowStockOnly, setLowStockOnly] = useState(false);

  useEffect(() => {
    // Fetch products from API on page load
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleExpiredChange = () => {
    setExpiredOnly(!expiredOnly);
  };

  const handleLowStockChange = () => {
    setLowStockOnly(!lowStockOnly);
  };

  const filteredProducts = products.filter((product) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const isExpired = new Date(product.expiryDate) < new Date(currentDate);
    const isLowStock = product.stock < 100;

    if (expiredOnly && lowStockOnly) {
      return true;
    } else if (expiredOnly) {
      return isExpired;
    } else if (lowStockOnly) {
      return isLowStock;
    } else {
      return true;
    }
  });

  return (
    <div className="productPageWrapper">
      <h2 className="products-text">Product</h2>
      <div className="products-wrapper">
        <div className="ProductListingPage_FilterWrapper__s0fKS">
          <h3>Filters</h3>
          <p>Count: {filteredProducts.length}</p>
          <label>
            <input
              type="checkbox"
              checked={expiredOnly}
              onChange={handleExpiredChange}
            />
            Expired
          </label>
          <label>
            <input
              type="checkbox"
              checked={lowStockOnly}
              onChange={handleLowStockChange}
            />
            Low Stock
          </label>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="secondaryColor">{product.id}</td>
                  <td className="primaryColor">{product.medicineName}</td>
                  <td className="secondaryColor">{product.medicineBrand}</td>
                  <td className="primaryColor">{product.expiryDate}</td>
                  <td className="secondaryColor">{product.unitPrice}</td>
                  <td className="secondaryColor">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
