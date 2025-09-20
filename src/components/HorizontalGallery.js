"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HorizontalGallery = () => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Detectar cuando la galería debe estar activa
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Activar cuando la galería esté completamente visible
      const isInView = rect.top <= 0 && rect.bottom >= windowHeight;
      setIsActive(isInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Llamar inicialmente

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Imágenes de tu proyecto con títulos descriptivos
  const images = [
    {
      src: "/assets/nahi.jpg",
      title: "Momento Especial",
      caption: "Una noche mágica",
    },
    {
      src: "/assets/arbol.jpg",
      title: "Elegancia",
      caption: "Llena de sueños",
    },
    {
      src: "/assets/pileta.jpg",
      title: "Celebración",
      caption: "Recuerdos eternos",
    },
    {
      src: "/assets/desktop.png",
      title: "Quinceañera",
      caption: "Un día único",
    },
    {
      src: "/assets/vestidoMujer.jpg",
      title: "Vestido Soñado",
      caption: "Princesa por un día",
    },
    {
      src: "/assets/manTraje.jpg",
      title: "Elegancia",
      caption: "Acompañando la celebración",
    },
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      if (!containerRef.current || !backgroundRef.current) return;

      const container = containerRef.current;
      const background = backgroundRef.current;
      const rect = container.getBoundingClientRect();

      // Solo interceptar scroll cuando la galería esté EXACTAMENTE en la parte superior
      if (
        rect.top <= 0 &&
        rect.top >= -50 &&
        rect.bottom >= window.innerHeight
      ) {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const currentScrollLeft = container.scrollLeft;

        // Si estamos al inicio y scrolleamos hacia arriba, permitir scroll normal
        if (currentScrollLeft <= 0 && e.deltaY < 0) {
          return; // Permitir scroll hacia arriba para volver al hero
        }

        // Si estamos al final y scrolleamos hacia abajo, permitir scroll normal
        if (currentScrollLeft >= maxScrollLeft && e.deltaY > 0) {
          return; // Permitir scroll hacia abajo para ir a la siguiente sección
        }

        // Solo interceptar si estamos en el rango de la galería
        e.preventDefault();

        // Mover el contenedor de fotos
        const newScrollLeft = Math.max(
          0,
          Math.min(maxScrollLeft, currentScrollLeft + e.deltaY)
        );
        container.scrollLeft = newScrollLeft;

        // Mover el fondo a la misma velocidad que los polaroids
        const backgroundOffset = newScrollLeft * 0.3;
        background.style.backgroundPosition = `${backgroundOffset}px center`;

        // Actualizar progreso
        setScrollProgress(newScrollLeft / maxScrollLeft);
      }
    };

    const handleScrollContainer = () => {
      if (!containerRef.current || !backgroundRef.current) return;

      const container = containerRef.current;
      const background = backgroundRef.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // Sincronizar fondo con scroll horizontal
      const backgroundOffset = container.scrollLeft * 0.3;
      background.style.backgroundPosition = `${backgroundOffset}px center`;

      // Actualizar progreso
      setScrollProgress(container.scrollLeft / maxScrollLeft);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScrollContainer, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (container) {
        container.removeEventListener("scroll", handleScrollContainer);
      }
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className={`h-screen overflow-hidden relative transition-all duration-300 ${
        scrollProgress > 0.95 ? "opacity-90" : "opacity-100"
      }`}
      style={{
        backgroundImage: "url('/assets/paredclara.jpg')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundPosition: "0% center",
        transition: "background-position 0.1s ease-out, opacity 0.3s ease-out",
      }}
    >
      {/* Indicador de scroll dinámico */}
      <div className="absolute top-8 left-8 z-20 text-gray-800 font-medium text-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isActive ? 1 : 0.7,
            y: 0,
            scale: isActive ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
        >
          <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
            <motion.div
              className="w-2 h-2 bg-gray-600 rounded-full"
              animate={{
                scale: isActive ? [1, 1.3, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: isActive ? Infinity : 0,
              }}
            />
          </div>
          <span className="font-handwriting">
            {scrollProgress < 0.1
              ? "Desliza para ver más fotos"
              : scrollProgress > 0.9
              ? "Continúa hacia abajo"
              : `${Math.round(scrollProgress * 100)}% completado`}
          </span>
        </motion.div>
      </div>

      {/* Galería con scroll horizontal */}
      <div
        ref={containerRef}
        className="h-full flex overflow-x-auto overflow-y-hidden scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="min-w-[70vw] h-full flex-shrink-0 relative flex items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Contenedor de la imagen - Estilo Polaroid */}
            <motion.figure
              className="relative max-w-sm w-full bg-white rounded-lg shadow-2xl transform"
              style={{
                rotate: `${(Math.random() - 0.5) * 10}deg`, // Rotación aleatoria para simular colgado
                padding: "20px 20px 60px 20px", // Más padding abajo como polaroid real
              }}
              whileHover={{
                scale: 1.05,
                y: -15,
                rotate: 0,
                transition: { duration: 0.3 },
              }}
              initial={{
                y: Math.random() * 20 - 10,
                rotate: `${(Math.random() - 0.5) * 15}deg`,
              }}
            >
              {/* Imagen principal */}
              <div className="relative w-full h-80 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  priority={index < 2}
                />
              </div>

              {/* Texto en la parte inferior blanca de la polaroid */}
              <div className="mt-4 text-center">
                <h3 className="text-gray-800 font-handwriting text-lg font-medium">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 font-handwriting">
                  {image.caption}
                </p>
              </div>

              {/* Cinta adhesiva simulada en la parte superior */}
              <div
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-yellow-100 opacity-80 rounded-sm shadow-sm"
                style={{
                  background: "linear-gradient(45deg, #fef3c7, #fde68a)",
                  transform: `translateX(-50%) rotate(${
                    (Math.random() - 0.5) * 10
                  }deg)`,
                }}
              ></div>

              {/* Pequeña sombra proyectada en el paredón */}
              <div className="absolute inset-0 bg-black/5 blur-sm transform translate-y-1 -z-10 rounded-lg"></div>
            </motion.figure>
          </motion.div>
        ))}
      </div>

      {/* Indicadores de progreso dinámicos */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20 bg-white/90 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
        {images.map((_, index) => {
          const imageProgress = scrollProgress * images.length;
          const isActive = imageProgress >= index && imageProgress < index + 1;
          const isCompleted = imageProgress > index + 1;

          return (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full border-2 border-gray-400"
              animate={{
                backgroundColor: isCompleted
                  ? "#6b7280"
                  : isActive
                  ? "#9ca3af"
                  : "transparent",
                scale: isActive ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </div>

      {/* Indicador para continuar cuando termine la galería */}
      {scrollProgress > 0.9 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-white/90 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm text-gray-800 font-handwriting text-lg flex items-center gap-2"
          >
            <span>Continúa hacia abajo</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        .scroll-smooth::-webkit-scrollbar {
          display: none;
        }

        .font-handwriting {
          font-family: "Caveat", "Kalam", "Comic Sans MS", cursive;
          font-weight: 400;
        }

        /* Simular textura de polaroid */
        figure {
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
          border: 1px solid #e9ecef;
        }

        /* Efecto de sombra realista para fotos colgadas */
        figure::before {
          content: "";
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(145deg, #ffffff, #f1f3f4);
          border-radius: inherit;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default HorizontalGallery;
