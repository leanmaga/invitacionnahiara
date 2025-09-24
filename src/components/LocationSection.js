"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function LocationSection() {
  // Obtener datos de variables de entorno
  const lugar = process.env.NEXT_PUBLIC_LUGAR_EVENTO || "Victoria 2051";
  const direccion =
    process.env.NEXT_PUBLIC_DIRECCION_EVENTO ||
    "Entre Itaqui y Martín Fierro, B1716 Libertad, Merlo.";
  const telefono = process.env.NEXT_PUBLIC_TELEFONO || "+54 11 2776-4823";
  const horaEvento =
    process.env.NEXT_PUBLIC_HORA_EVENTO || "10:00 AM - 19:00 PM";

  // Generar URLs de mapas dinámicamente basado en la dirección
  const direccionCompleta = `${lugar}, ${direccion}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    direccionCompleta
  )}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
    direccionCompleta
  )}`;

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/assets/salon.jpg",
    "/assets/salon2.jpg",
    "/assets/salon3.jpg",
    "/assets/salon4.jpg",
    "/assets/salon5.jpg",
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // CSS para animaciones
  const styles = `
    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 0.8s ease-out forwards;
    }
    .fade-in-left {
      opacity: 0;
      transform: translateX(-50px);
      animation: fadeInLeft 0.8s ease-out forwards;
    }
    .fade-in-right {
      opacity: 0;
      transform: translateX(50px);
      animation: fadeInRight 0.8s ease-out forwards;
    }
    .scale-hover:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
    .rotate-element {
      animation: rotate 20s linear infinite;
    }
    .pulse-element {
      animation: pulse 2s infinite;
    }
    .slide-transition {
      transition: transform 0.5s ease-in-out;
    }

    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInLeft {
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
  `;

  return (
    <section
      id="location"
      className="py-20 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100"
    >
      <style>{styles}</style>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <MapPin className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-yellow-800 mb-4">
            Ubicación del Evento
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Location Details */}
          <div className="space-y-8 fade-in-left">
            <div className="bg-white/60 backdrop-blur-xl border border-yellow-300/40 rounded-3xl p-8 shadow-2xl">
              <h3 className="font-serif text-3xl font-bold text-yellow-800 mb-6">
                {lugar}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-yellow-100/50 transition-colors scale-hover">
                  <MapPin className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">
                      Dirección
                    </h4>
                    <p className="text-yellow-700">{direccion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-yellow-100/50 transition-colors scale-hover">
                  <Phone className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">
                      Contacto
                    </h4>
                    <p className="text-yellow-700">{telefono}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-yellow-100/50 transition-colors scale-hover">
                  <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">
                      Horario
                    </h4>
                    <p className="text-yellow-700">
                      Recepción: {horaEvento.split(" - ")[0]}
                      <br />
                      Evento hasta: {horaEvento.split(" - ")[1]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => window.open(googleMapsUrl, "_blank")}
                >
                  <Navigation className="w-5 h-5 inline mr-2" />
                  Ver en Google Maps
                </button>

                <button
                  className="flex-1 border-2 border-yellow-500 text-yellow-700 px-6 py-3 rounded-full font-semibold hover:bg-yellow-100/50 transition-all duration-300 hover:scale-105"
                  onClick={() => window.open(wazeUrl, "_blank")}
                >
                  Abrir en Waze
                </button>
              </div>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative fade-in-right">
            <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl overflow-hidden shadow-xl relative">
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full slide-transition"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0">
                      <img
                        src={image}
                        alt={`Imagen del salón ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-125 shadow-lg"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentSlide + 1} / {images.length}
                </div>

                {/* Overlay with salon info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="font-serif text-xl font-bold mb-1">
                      {lugar}
                    </h3>
                    <p className="text-sm opacity-90">
                      Conoce nuestras instalaciones
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4">
                  <div className="w-8 h-8 border-2 border-white/40 border-dashed rounded-full rotate-element"></div>
                </div>
              </div>
            </div>

            {/* Salon Description */}
            <div className="mt-4 text-center">
              <p className="text-yellow-700 text-sm">
                Desliza para ver más imágenes del salón
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center fade-in-up">
          <div className="bg-white/50 backdrop-blur-xl border border-yellow-300/40 rounded-2xl p-6 max-w-2xl mx-auto">
            <h4 className="font-serif text-xl font-bold text-yellow-800 mb-3">
              Información Adicional
            </h4>
            <p className="text-yellow-700">
              Te esperamos para celebrar juntos este día tan especial. No
              olvides confirmar tu asistencia y revisa los detalles del evento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
