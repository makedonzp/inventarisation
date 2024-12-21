import React from "react";

const ProductList = ({
  products,
  onSelectProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <div className="product-list">
      <h2>Список товаров</h2>
      <ul className="list-group">
        {products.map((product, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div onClick={() => onSelectProduct(product)}>
              {product.brand} {product.model} (Код: {product.code})
            </div>
            <div className="redacting-wrapper">
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEditProduct(product)}
              >
                Редактировать
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDeleteProduct(product.code)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
