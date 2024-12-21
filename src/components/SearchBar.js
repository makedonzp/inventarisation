import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск по коду, бренду или модели"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control mb-3"
      />
      <button onClick={handleSearch} className="btn btn-primary">
        Поиск
      </button>
    </div>
  );
};

export default SearchBar;
