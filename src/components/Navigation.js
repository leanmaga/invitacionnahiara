"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music } from "lucide-react";
import MusicPlayer from "./MusicPlayer"; // Importar el nuevo componente

const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Detalles", href: "#details" },
  { name: "Dress Code", href: "#dresscode" },
  { name: "Ubicación", href: "#location" },
  { name: "Música", href: "#music" },
  { name: "RSVP", href: "#rsvp" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Variable de entorno para el nombre de la quinceañera
  const nombreQuinceanera =
    process.env.NEXT_PUBLIC_NOMBRE_QUINCEANERA || "Quinceañera";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil cuando se hace click en un enlace
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar fijo siempre arriba */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-lg backdrop-blur-md bg-amber-50/90 border-b border-amber-200/50"
            : "bg-amber-50/80 backdrop-blur-sm border-b border-amber-100/30"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-coockie text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 flex-shrink-0"
              style={{
                textShadow: "0 0 10px #fbbf24, 0 0 20px #f59e0b",
                fontFamily: "var(--font-dancing)",
              }}
            >
              {nombreQuinceanera}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px #fbbf24",
                  }}
                  className="text-amber-800 hover:text-amber-600 font-semibold transition-all text-sm lg:text-base whitespace-nowrap px-3 py-2 rounded-lg hover:bg-amber-100/50"
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Reproductor de música en desktop */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="ml-2 lg:ml-4"
              >
                {/* AHORA SOLO UNA INSTANCIA - todas estarán sincronizadas */}
                <MusicPlayer showVolumeControl={true} />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Reproductor de música en móvil */}
              <div>
                {/* ESTA instancia también estará sincronizada */}
                <MusicPlayer showVolumeControl={false} />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-amber-800 hover:text-amber-600 p-2 rounded-lg hover:bg-amber-100/50 transition-all"
                style={{
                  boxShadow: "0 2px 8px rgba(251, 191, 36, 0.3)",
                }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 bg-amber-900/20 backdrop-blur-sm"
                style={{ top: "64px" }}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-0 right-0 w-full bg-amber-50/95 backdrop-blur-md shadow-lg border-t border-amber-200/50"
                style={{
                  boxShadow: "0 8px 32px rgba(251, 191, 36, 0.3)",
                }}
              >
                <div className="px-4 py-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={handleLinkClick}
                      whileHover={{
                        scale: 1.02,
                        textShadow: "0 0 8px #fbbf24",
                      }}
                      className="block py-3 px-3 text-amber-800 hover:text-amber-600 hover:bg-amber-100/60 font-semibold rounded-lg transition-all"
                      style={{
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {item.name}
                    </motion.a>
                  ))}

                  {/* Control de música adicional en menú móvil */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-2 mt-2 border-t border-amber-400/40"
                  >
                    <div
                      className="py-2 px-3 text-amber-200 text-sm font-semibold flex items-center gap-2"
                      style={{
                        textShadow:
                          "0 0 8px rgba(251, 191, 36, 0.4), 1px 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          color: [
                            "#fcd34d",
                            "#fbbf24",
                            "#f59e0b",
                            "#eab308",
                            "#fcd34d",
                          ],
                          filter: [
                            "drop-shadow(0 0 8px #fbbf24)",
                            "drop-shadow(0 0 12px #f59e0b)",
                            "drop-shadow(0 0 8px #fbbf24)",
                          ],
                        }}
                        transition={{
                          rotate: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          color: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          filter: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <Music size={16} />
                      </motion.div>
                      Control de Música
                    </div>
                    <div className="px-3 py-2">
                      {/* Y ESTA instancia TAMBIÉN estará sincronizada */}
                      <MusicPlayer
                        className="w-full justify-center"
                        showVolumeControl={true}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer para compensar el navbar fijo */}
      <div className="h-16 md:h-20" />
    </>
  );
}
