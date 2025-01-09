import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import PhotoGrid from "./components/PhotoGrid";

function App() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=10")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setFilteredPhotos(data);
      });
  }, []);

  const handleSearch = (query) => {
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
