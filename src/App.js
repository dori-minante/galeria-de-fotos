import React, { useState, useEffect } from "react"; // Importando React e hooks necessários
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import PhotoGrid from "./components/PhotoGrid";

function App() {
  const [photos, setPhotos] = useState([]); // Estado para armazenar todas as fotos
  const [filteredPhotos, setFilteredPhotos] = useState([]); // Estado para armazenar as fotos filtradas
  const [query, setQuery] = useState(""); // Estado para armazenar a pesquisa

  const apiKey = "wbxBHGirygu3H1oGp6RRdTf6FZcBbVTidbUq1MscZwRkjtmR9Sc9rjSS"; // Substitua pela sua chave da API do Pexels

  // O useEffect será executado ao carregar a página
  useEffect(() => {
    // Função assíncrona para buscar as fotos
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("https://api.pexels.com/v1/curated", {
          headers: {
            Authorization: apiKey, // Usando a chave de API para autenticação
          },
          params: {
            per_page: 12, // Número de fotos a serem carregadas
          },
        });
        
        // Processando os dados recebidos da API
        const photosData = response.data.photos.map((photo) => ({
          id: photo.id,
          url: photo.src.medium, // URL da imagem em tamanho médio
          title: photo.alt_description || `Foto ${photo.id}`, // Exibe o nome da imagem ou um nome gerado com base no ID
        }));

        // Atualizando o estado com as fotos processadas
        setPhotos(photosData);
        setFilteredPhotos(photosData); // Exibe todas as fotos por padrão
      } catch (error) {
        console.error("Erro ao buscar fotos: ", error); // Exibe erro caso algo dê errado na requisição
      }
    };

    fetchPhotos(); // Chama a função para buscar as fotos
  }, []); // O array vazio [] garante que a requisição aconteça apenas uma vez, no carregamento inicial

  // Função para lidar com a pesquisa
  const handleSearch = (query) => {
    setQuery(query); // Atualiza o estado da pesquisa com o valor digitado
    if (!query) {
      setFilteredPhotos(photos); // Se não houver pesquisa, exibe todas as fotos
    } else {
      // Filtra as fotos com base no nome da foto (título)
      const filtered = photos.filter((photo) =>
        photo.title.toLowerCase().includes(query.toLowerCase()) // Pesquisa insensível a maiúsculas/minúsculas
      );
      setFilteredPhotos(filtered); // Atualiza as fotos filtradas
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {filteredPhotos.length > 0 ? (
        <PhotoGrid photos={filteredPhotos} />
      ) : (
        <p className="text-center mt-4">Nenhuma foto encontrada</p> // Mensagem caso não haja fotos
      )}
      <Footer />
    </div>
  );
}

export default App;


