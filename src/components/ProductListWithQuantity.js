import React from "react";

const ProductListWithQuantity = ({ products }) => {
  return (
    <div className="product-list-with-quantity">
      <h2>Список товаров с количеством</h2>
      <ul className="list-group">
        {products.map((product, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              {product.brand} {product.model} (Код: {product.code})
            </div>
            <span className="badge bg-primary rounded-pill">
              {product.quantity || 0} шт.
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListWithQuantity;
