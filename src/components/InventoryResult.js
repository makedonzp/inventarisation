import React from "react";

const InventoryResult = ({ inventoryResults, onFilter, onGroupBy }) => {
  return (
    <div className="inventory-result">
      <h2>Результаты инвентаризации</h2>
      <div className="filters mb-3">
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="form-select"
        >
          <option value="default">По умолчанию</option>
          <option value="priceAsc">Цена (по возрастанию)</option>
          <option value="priceDesc">Цена (по убыванию)</option>
          <option value="nameAsc">Название (А-Я)</option>
          <option value="nameDesc">Название (Я-А)</option>
        </select>
        <label>
          <input
            type="checkbox"
            onChange={(e) => onGroupBy(e.target.checked)}
            className="form-check-input"
          />
          Группировать по категориям
        </label>
      </div>
      <ul className="list-group">
        {inventoryResults.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.name} - {item.quantity} шт.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryResult;
