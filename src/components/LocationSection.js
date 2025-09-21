"use client";

import { useState } from "react";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";

export default function LocationSection() {
  // Configuración - reemplaza con tu hook useQuinceaneraConfig()
  const lugar = "Salón Crystal";
  const direccion = "Av. Principal 123, Córdoba";
  const telefono = "(351) 123-4567";
  const horaEvento = "7:00 PM - 2:00 AM";

  // Generar URLs de mapas dinámicamente basado en la dirección
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    direccion
  )}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(direccion)}`;

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

          {/* Map Placeholder */}
          <div className="relative fade-in-right">
            <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl overflow-hidden shadow-xl">
              {/* Map placeholder */}
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-yellow-800 mb-2">
                    {lugar}
                  </h3>
                  <p className="text-yellow-700">
                    Haz clic para ver el mapa interactivo
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 border-2 border-yellow-400 border-dashed rounded-full rotate-element"></div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full pulse-element"></div>
                </div>
              </div>

              {/* Click overlay */}
              <div
                className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                onClick={() => window.open(googleMapsUrl, "_blank")}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="font-semibold text-yellow-800">
                    Ver Mapa Completo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
