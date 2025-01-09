import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Pesquisar fotos..."
        className="p-2 border border-gray-300 rounded w-full"
      />
    </div>
  );
}

export default SearchBar;
