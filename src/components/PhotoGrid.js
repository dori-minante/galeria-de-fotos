function PhotoGrid({ photos }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => {
          return (
            <div key={photo.id} className="relative">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-center mt-2 text-lg font-semibold text-gray-700">
                {photo.title} {/* Exibe o nome da imagem */}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  
  export default PhotoGrid;
  
  