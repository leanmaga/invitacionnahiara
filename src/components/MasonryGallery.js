import React, { useState, useEffect, useRef } from "react";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useLoading } from "@/components/PageLoader";

const MasonryGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [illuminatedImages, setIlluminatedImages] = useState(new Set());
  const [imageHeights, setImageHeights] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const { updateImageCount, incrementLoadedImages } = useLoading();
  const loadedCount = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const heights = {};
    for (let i = 1; i <= 51; i++) {
      heights[i] = Math.floor(Math.random() * 3) + 1;
    }
    setImageHeights(heights);
  }, []);

  useEffect(() => {
    updateImageCount(51);
  }, [updateImageCount]);

  const images = Array.from({ length: 51 }, (_, i) => ({
    id: i + 1,
    src: `/assets/${i + 1}.jpg`,
    alt: `Image ${i + 1}`,
  }));

  const handleImageLoad = () => {
    loadedCount.current += 1;
    incrementLoadedImages();
  };

  const handleImageError = () => {
    loadedCount.current += 1;
    incrementLoadedImages();
  };

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const handleImageClick = (image) => {
    if (isMobile) {
      const newIlluminated = new Set(illuminatedImages);
      if (newIlluminated.has(image.id)) {
        newIlluminated.delete(image.id);
      } else {
        newIlluminated.add(image.id);
      }
      setIlluminatedImages(newIlluminated);
    } else {
      openModal(image);
    }
  };

  const handleZoomClick = (e, image) => {
    e.stopPropagation();
    openModal(image);
  };

  const isImageIlluminated = (imageId) => {
    if (isMobile) {
      return illuminatedImages.has(imageId);
    } else {
      return hoveredImage === imageId;
    }
  };

  const getImageStyle = (imageId) => {
    const height = imageHeights[imageId] || 1;
    return {
      gridRowEnd: `span ${height * 10}`,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-50 overflow-hidden">
      <div
        className="masonry-grid p-1 md:p-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gridAutoRows: "10px",
          gap: "2px",
        }}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden"
            style={getImageStyle(image.id)}
            onMouseEnter={() => !isMobile && setHoveredImage(image.id)}
            onMouseLeave={() => !isMobile && setHoveredImage(null)}
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                filter: isImageIlluminated(image.id)
                  ? "brightness(1)"
                  : "brightness(0.4)",
                transform: isImageIlluminated(image.id)
                  ? "scale(1.02)"
                  : "scale(1)",
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={true}
              loading="eager"
            />

            <div className="absolute inset-0">
              {(isImageIlluminated(image.id) ||
                (!isMobile && hoveredImage === image.id)) && (
                <div
                  className="absolute bottom-2 right-2"
                  onClick={(e) => handleZoomClick(e, image)}
                >
                  <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-80 transition-all duration-200 hover:scale-110">
                    <ZoomIn
                      className="text-white drop-shadow-lg"
                      size={isMobile ? 20 : 24}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative animate-in zoom-in-95 duration-500 ease-out"
            style={{
              animation: "polaroidFloat 3s ease-in-out infinite",
              transform: "rotate(-1deg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-yellow-100 opacity-70 rounded-sm shadow-lg z-10"
              style={{
                transform: "translateX(-50%) rotate(2deg)",
                background:
                  "linear-gradient(45deg, #f4f1de 0%, #e8dcc0 50%, #f4f1de 100%)",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)",
              }}
            />

            <div className="bg-white p-4 pb-16 shadow-2xl max-w-sm mx-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto object-cover"
                style={{ maxHeight: "400px", aspectRatio: "auto" }}
              />
              <div className="text-center mt-4 text-gray-600 font-handwriting">
                Imagen {selectedImage.id}
              </div>
            </div>

            <button
              onClick={closeModal}
              className="absolute -top-8 -left-8 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200 shadow-lg hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes polaroidFloat {
          0%,
          100% {
            transform: rotate(-1deg) translateY(0px);
          }
          50% {
            transform: rotate(-0.5deg) translateY(-5px);
          }
        }
        .font-handwriting {
          font-family: "Kalam", "Comic Sans MS", cursive;
          font-weight: 400;
        }
        @media (max-width: 480px) {
          .masonry-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .masonry-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .masonry-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (min-width: 1025px) {
          .masonry-grid {
            grid-template-columns: repeat(6, 1fr) !important;
          }
        }
        @media (min-width: 1400px) {
          .masonry-grid {
            grid-template-columns: repeat(8, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MasonryGallery;
