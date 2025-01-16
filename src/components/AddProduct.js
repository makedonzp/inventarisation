import React, { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";

const AddProduct = ({ onAddProduct, sections }) => {
  const [code, setCode] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [section, setSection] = useState("");
  const [mode, setMode] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code || !brand || !model || !section) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    onAddProduct({
      code,
      brand,
      model,
      price: parseFloat(price) || 0,
      section,
    });
    setCode("");
    setBrand("");
    setModel("");
    setPrice("");
    setSection("");
  };

  const handleScan = (barcode) => {
    setCode(barcode);
  };

  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <h2>Добавить товар</h2>
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
        <>
          <input
            type="text"
            placeholder="Код товара"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Бренд"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Модель"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control mb-3"
          />
          <select
            className="form-select mb-3"
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
          <button type="submit" className="btn btn-success">
            Добавить
          </button>
        </>
      ) : (
        <BarcodeScanner onScan={handleScan} onClose={() => setMode(null)} />
      )}
    </form>
  );
};

export default AddProduct;
