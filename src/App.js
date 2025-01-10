import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import PhotoGrid from "./components/PhotoGrid";

function App() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [query, setQuery] = useState("");

  const apiKey = "wbxBHGirygu3H1oGp6RRdTf6FZcBbVTidbUq1MscZwRkjtmR9Sc9rjSS";

  useEffect(() => {

    const fetchPhotos = async () => {
      try {
        const response = await axios.get("https://api.pexels.com/v1/curated", {
          headers: {
            Authorization: apiKey,
          },
          params: {
            per_page: 12,
          },
        });

        const photosData = response.data.photos.map((photo) => ({
          id: photo.id,
          url: photo.src.medium,
          title: photo.alt_description || `Foto ${photo.id}`,
        }));


        setPhotos(photosData);
        setFilteredPhotos(photosData);
      } catch (error) {
        console.error("Erro ao buscar fotos: ", error);
      }
    };

    fetchPhotos();
  }, []);


  const handleSearch = (query) => {
    setQuery(query);
    if (!query) {
      setFilteredPhotos(photos);
    } else {

      const filtered = photos.filter((photo) =>
        photo.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPhotos(filtered);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {filteredPhotos.length > 0 ? (
        <PhotoGrid photos={filteredPhotos} />
      ) : (
        <p className="text-center mt-4">Nenhuma foto encontrada</p>
      )}
      <Footer />
    </div>
  );
}

export default App;


