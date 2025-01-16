import React, { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const ProductFormModal = ({ isVisible, onClose, onSave, sections }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [section, setSection] = useState("");

  const handleSave = () => {
    if (!brand || !model || !price || !section) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    onSave({ brand, model, price: parseFloat(price), section });
  };

  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Добавить товар</h2>
      </div>
      <div className="modal-body">
        <input
          type="text"
          placeholder="Бренд"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Модель"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control mb-2"
        />
        <select
          className="form-select mb-2"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="">Выберите раздел</option>
          {sections.map((section, index) => (
            <option key={index} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>
      <div className="modal-footer">
        <button onClick={handleSave} className="btn btn-primary">
          Сохранить
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          Закрыть
        </button>
      </div>
    </ReactModal>
  );
};

export default ProductFormModal;
