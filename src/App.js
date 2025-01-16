import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./components/AddProduct";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import ProductListWithQuantity from "./components/ProductListWithQuantity";
import Modal from "./components/Modal";
import EditProductModal from "./components/EditProductModal";
import InventoryModal from "./components/InventoryModal";
import GroupManagementModal from "./components/GroupManagementModal";
import InventoryResult from "./components/InventoryResult";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isInventoryModalVisible, setIsInventoryModalVisible] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFullList, setShowFullList] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [newSection, setNewSection] = useState("");
  const [inventoryResults, setInventoryResults] = useState([]);

  useEffect(() => {
    loadProducts();
    loadSections();
  }, []);

  const loadProducts = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  const saveProducts = (updatedProducts) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const loadSections = () => {
    const storedSections = localStorage.getItem("sections");
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    }
  };

  const saveSections = (updatedSections) => {
    localStorage.setItem("sections", JSON.stringify(updatedSections));
    setSections(updatedSections);
  };

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
  };

  const handleSearch = (query) => {
    const filtered = products.filter(
      (product) =>
        product.code.includes(query) ||
        product.brand.includes(query) ||
        product.model.includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleUpdateQuantity = (quantity) => {
    const updatedProducts = products.map((product) =>
      product.code === selectedProduct.code
        ? { ...product, quantity: (product.quantity || 0) + quantity }
        : product
    );
    saveProducts(updatedProducts);
    setIsModalVisible(false);

    // Обновляем результаты инвентаризации
    const existingResult = inventoryResults.find(
      (item) => item.code === selectedProduct.code
    );
    if (existingResult) {
      const updatedResults = inventoryResults.map((item) =>
        item.code === selectedProduct.code
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setInventoryResults(updatedResults);
    } else {
      setInventoryResults([
        ...inventoryResults,
        {
          code: selectedProduct.code,
          brand: selectedProduct.brand,
          model: selectedProduct.model,
          quantity: quantity,
        },
      ]);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const handleSaveEditedProduct = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product.code === editedProduct.code ? editedProduct : product
    );
    saveProducts(updatedProducts);
    setIsEditModalVisible(false);
  };

  const handleDeleteProduct = (productCode) => {
    const updatedProducts = products.filter(
      (product) => product.code !== productCode
    );
    saveProducts(updatedProducts);

    // Удаляем товар из результатов инвентаризации
    const updatedResults = inventoryResults.filter(
      (item) => item.code !== productCode
    );
    setInventoryResults(updatedResults);
  };

  const handleSort = (sortType) => {
    let sortedProducts = [...products];
    switch (sortType) {
      case "priceAsc":
        sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "alphabetAsc":
        sortedProducts.sort((a, b) => a.model.localeCompare(b.model));
        break;
      case "alphabetDesc":
        sortedProducts.sort((a, b) => b.model.localeCompare(a.model));
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
    setSortBy(sortType);
  };

  const handleAddSection = () => {
    if (!newSection) {
      alert("Пожалуйста, введите название раздела");
      return;
    }
    const updatedSections = [...sections, newSection];
    saveSections(updatedSections);
    setNewSection("");
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    const filtered = products.filter((product) => product.section === section);
    setFilteredProducts(filtered);
  };

  const handleResetQuantities = () => {
    const updatedProducts = products.map((product) => ({
      ...product,
      quantity: 0,
    }));
    saveProducts(updatedProducts);
    setInventoryResults([]); // Очищаем результаты инвентаризации
    alert("Остатки товара обнулены!");
  };

  const handleInventoryScan = (barcode) => {
    const product = products.find((p) => p.code === barcode);
    if (product) {
      setSelectedProduct(product);
      setIsModalVisible(true);
    } else {
      alert("Товар не найден");
    }
  };

  const handleEditGroup = (oldGroup, newGroup) => {
    const updatedSections = sections.map((group) =>
      group === oldGroup ? newGroup : group
    );
    saveSections(updatedSections);
  };

  const handleDeleteGroup = (group) => {
    const updatedSections = sections.filter((g) => g !== group);
    const updatedProducts = products.filter((p) => p.section !== group);
    saveSections(updatedSections);
    saveProducts(updatedProducts);

    // Удаляем результаты инвентаризации для товаров из удаленной группы
    const updatedResults = inventoryResults.filter(
      (item) => !updatedProducts.some((p) => p.code === item.code)
    );
    setInventoryResults(updatedResults);
  };

  return (
    <div className="app container">
      <h1 className="title">Инвентаризация товаров</h1>

      {selectedSection && (
        <p className="alert alert-info">
          Выбран раздел: <strong>{selectedSection}</strong>
        </p>
      )}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Добавить раздел"
          className="form-control"
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={handleAddSection}>
          Создать раздел
        </button>
      </div>

      <div className="mb-3">
        <select
          className="form-select"
          onChange={(e) => handleSelectSection(e.target.value)}
        >
          <option value="">Выберите раздел</option>
          {sections.map((section, index) => (
            <option key={index} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-warning mb-3" onClick={handleResetQuantities}>
        Обнулить остатки
      </button>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setIsInventoryModalVisible(true)}
      >
        Инвентаризация
      </button>

      <button
        className="btn btn-secondary mb-3"
        onClick={() => setIsGroupModalVisible(true)}
      >
        Управление группами
      </button>

      <AddProduct onAddProduct={handleAddProduct} sections={sections} />
      <SearchBar onSearch={handleSearch} />
      <div className="sort-buttons mb-3">
        <button
          className={`btn btn-sm ${
            sortBy === "priceAsc" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleSort("priceAsc")}
        >
          От дешевого к дорогому
        </button>
        <button
          className={`btn btn-sm ${
            sortBy === "priceDesc" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleSort("priceDesc")}
        >
          От дорогого к дешевому
        </button>
        <button
          className={`btn btn-sm ${
            sortBy === "alphabetAsc" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleSort("alphabetAsc")}
        >
          По алфавиту (А-Я)
        </button>
        <button
          className={`btn btn-sm ${
            sortBy === "alphabetDesc" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleSort("alphabetDesc")}
        >
          По алфавиту (Я-А)
        </button>
      </div>
      {showFullList ? (
        <ProductListWithQuantity products={products} />
      ) : (
        <ProductList
          products={filteredProducts.length > 0 ? filteredProducts : []}
          onSelectProduct={handleSelectProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
      <Modal
        isVisible={isModalVisible}
        product={selectedProduct}
        onClose={() => setIsModalVisible(false)}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <EditProductModal
        isVisible={isEditModalVisible}
        product={selectedProduct}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleSaveEditedProduct}
      />
      <InventoryModal
        isVisible={isInventoryModalVisible}
        onClose={() => setIsInventoryModalVisible(false)}
        onManualInventory={() => {}}
        onScan={handleInventoryScan}
      />
      <GroupManagementModal
        isVisible={isGroupModalVisible}
        onClose={() => setIsGroupModalVisible(false)}
        groups={sections}
        onEditGroup={handleEditGroup}
        onDeleteGroup={handleDeleteGroup}
      />
      <InventoryResult
        inventoryResults={inventoryResults}
        onFilter={(filter) => {
          // Логика фильтрации результатов инвентаризации
          let sortedResults = [...inventoryResults];
          switch (filter) {
            case "priceAsc":
              sortedResults.sort((a, b) => (a.price || 0) - (b.price || 0));
              break;
            case "priceDesc":
              sortedResults.sort((a, b) => (b.price || 0) - (a.price || 0));
              break;
            case "nameAsc":
              sortedResults.sort((a, b) => a.model.localeCompare(b.model));
              break;
            case "nameDesc":
              sortedResults.sort((a, b) => b.model.localeCompare(a.model));
              break;
            default:
              break;
          }
          setInventoryResults(sortedResults);
        }}
        onGroupBy={(groupBy) => {
          // Логика группировки результатов инвентаризации
          if (groupBy) {
            const groupedResults = inventoryResults.reduce((acc, item) => {
              const section =
                products.find((p) => p.code === item.code)?.section ||
                "Без группы";
              if (!acc[section]) {
                acc[section] = [];
              }
              acc[section].push(item);
              return acc;
            }, {});
            setInventoryResults(Object.values(groupedResults).flat());
          } else {
            setInventoryResults([...inventoryResults]);
          }
        }}
      />
      <button
        className="btn btn-primary mt-3"
        onClick={() => setShowFullList(!showFullList)}
      >
        {showFullList ? "Скрыть список" : "Вывести список товаров"}
      </button>
    </div>
  );
};

export default App;
