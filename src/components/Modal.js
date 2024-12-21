import React, { useState } from "react";
import ReactModal from "react-modal";

// Устанавливаем корневой элемент приложения
ReactModal.setAppElement("#root");

const Modal = ({ isVisible, product, onClose, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    if (!quantity) {
      alert("Пожалуйста, введите количество");
      return;
    }
    onUpdateQuantity(parseInt(quantity)); // Передаем количество в родительский компонент
    setQuantity(""); // Очищаем поле ввода
  };

  return (
    <ReactModal
      isOpen={isVisible} // Указываем, открыто ли модальное окно
      onRequestClose={onClose} // Функция закрытия модального окна
      className="modal-content" // Класс для стилизации контента модального окна
      overlayClassName="modal-overlay" // Класс для стилизации фона модального окна
      ariaHideApp={false} // Отключаем предупреждение (временно)
    >
      <div className="modal-header">
        <h2>Введите количество</h2>
      </div>
      <div className="modal-body">
        <p>
          Товар:{" "}
          <strong>{product ? `${product.brand} ${product.model}` : ""}</strong>
        </p>
        <input
          type="number"
          placeholder="Количество"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control mb-2"
        />
      </div>
      <div className="modal-footer">
        <button onClick={handleSubmit} className="btn btn-primary">
          Сохранить
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          Закрыть
        </button>
      </div>
    </ReactModal>
  );
};

export default Modal;
