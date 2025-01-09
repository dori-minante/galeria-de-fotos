import { useState } from 'react'; // Importando o hook useState do React

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState(""); // Estado para armazenar o valor da pesquisa

  const handleSearch = (e) => {
    setQuery(e.target.value); // Atualizando o valor da pesquisa
    onSearch(e.target.value); // Passando o valor da pesquisa para o componente pai
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch} // Atualiza a pesquisa conforme o usuário digita
        placeholder="Pesquisar fotos..."
        className="p-2 border border-gray-300 rounded w-full mx-auto" // Estilizando a barra de pesquisa
      />
    </div>
  );
}

export default SearchBar;

