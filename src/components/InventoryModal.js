import React, { useState } from "react";
import ReactModal from "react-modal";
import BarcodeScanner from "./BarcodeScanner";

ReactModal.setAppElement("#root");

const InventoryModal = ({ isVisible, onClose, onManualInventory, onScan }) => {
  const [mode, setMode] = useState(null);

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
        {mode === null ? (
          <>
            <button
              onClick={() => setMode("manual")}
              className="btn btn-primary me-2"
            >
              Вручную
            </button>
            <button onClick={() => setMode("scan")} className="btn btn-primary">
              Сканировать
            </button>
          </>
        ) : mode === "manual" ? (
          <div>
            <input
              type="text"
              placeholder="Введите штрихкод, модель или бренд"
              className="form-control mb-3"
            />
            <button onClick={onManualInventory} className="btn btn-success">
              Подтвердить
            </button>
          </div>
        ) : (
          <BarcodeScanner onScan={onScan} onClose={onClose} />
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
