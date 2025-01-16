import React, { useState } from "react";
import ReactModal from "react-modal";
import BarcodeScanner from "./BarcodeScanner";

ReactModal.setAppElement("#root");

const InventoryModal = ({ isVisible, onClose, onScan, products }) => {
  const [scannedProduct, setScannedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");

  const handleScan = (barcode) => {
    const product = products.find((p) => p.code === barcode);
    if (product) {
      setScannedProduct(product); // Устанавливаем найденный товар
    } else {
      const shouldAdd = window.confirm("Товар не найден. Добавить его?");
      if (shouldAdd) {
        onClose(); // Закрываем окно инвентаризации
        onScan(barcode); // Передаем штрихкод для добавления товара
      }
    }
  };

  const handleUpdateQuantity = () => {
    if (!quantity) {
      alert("Пожалуйста, введите количество");
      return;
    }
    onScan(scannedProduct.code, parseInt(quantity)); // Передаем код и количество
    setScannedProduct(null); // Сбрасываем найденный товар
    setQuantity(""); // Очищаем поле ввода
  };

  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Инвентаризация</h2>
      </div>
      <div className="modal-body">
        {scannedProduct ? (
          <div>
            <p>
              Товар:{" "}
              <strong>
                {scannedProduct.brand} {scannedProduct.model}
              </strong>
            </p>
            <input
              type="number"
              placeholder="Количество"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control mb-2"
            />
            <button onClick={handleUpdateQuantity} className="btn btn-primary">
              Сохранить
            </button>
          </div>
        ) : (
          <BarcodeScanner onScan={handleScan} onClose={onClose} />
        )}
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn btn-secondary">
          Закрыть
        </button>
      </div>
    </ReactModal>
  );
};

export default InventoryModal;
