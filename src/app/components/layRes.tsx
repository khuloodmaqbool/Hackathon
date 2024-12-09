export default function MasonryLayout() {
    const images = [
      { src: "/image1.jpg", alt: "Image 1", size: "large" },
      { src: "/image2.jpg", alt: "Image 2", size: "small" },
      { src: "/image3.jpg", alt: "Image 3", size: "medium" },
      { src: "/image4.jpg", alt: "Image 4", size: "large" },
      { src: "/image5.jpg", alt: "Image 5", size: "small" },
      { src: "/image6.jpg", alt: "Image 6", size: "medium" },
      { src: "/image7.jpg", alt: "Image 7", size: "small" },
      { src: "/image8.jpg", alt: "Image 8", size: "large" },
    ];
  
    return (
      <div className="bg-white py-10">
        <h1 className="text-center text-2xl font-bold mb-8">#FuniroFurniture</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 grid-flow-dense">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                image.size === "large"
                  ? "row-span-2 col-span-2"
                  : image.size === "medium"
                  ? "row-span-2"
                  : "row-span-1"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  