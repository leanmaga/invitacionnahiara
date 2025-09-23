"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  const updateImageCount = (total) => {
    setTotalImages(total);
  };

  const incrementLoadedImages = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingProgress(20);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (totalImages > 0) {
      const imageProgress = (loadedImages / totalImages) * 70;
      const baseProgress = 20;
      const finalProgress = Math.min(baseProgress + imageProgress, 90);
      setLoadingProgress(finalProgress);

      if (loadedImages === totalImages) {
        setTimeout(() => {
          setLoadingProgress(100);
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
        }, 300);
      }
    }
  }, [loadedImages, totalImages]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingProgress,
        updateImageCount,
        incrementLoadedImages,
        setIsLoading,
        totalImages,
        loadedImages,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

const PageLoader = () => {
  const { loadingProgress, totalImages, loadedImages } = useLoading();
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsClient(true);
    const particleData = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 1000,
      y: Math.random() * 800 + 600,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
    }));
    setParticles(particleData);
  }, []);

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="text-center z-10 px-8">
          <div className="text-6xl mb-8">✨</div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-700">
            Cargando...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1, ease: "easeInOut" },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(217, 119, 6, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #fefce8 0%, #fef3c7 25%, #fed7aa 75%, #fdba74 100%)
        `,
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-70"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: particle.scale,
            }}
            animate={{
              y: -10,
              x: particle.x + Math.sin(particle.id) * 100,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 px-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-32 h-32 mx-auto border-4 border-yellow-400 rounded-full opacity-30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 w-28 h-28 mx-auto border-2 border-amber-400 rounded-full opacity-50"
            />
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600"
              >
                ✨
              </motion.span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-700 mb-8"
        >
          Cargando...
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="w-80 max-w-md mx-auto mb-6"
        >
          <div className="relative">
            <div className="h-3 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full overflow-hidden shadow-inner border border-amber-300">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"
        >
          <motion.span
            key={loadingProgress}
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {Math.round(loadingProgress)}%
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-4 text-amber-700 font-medium"
        >
          {loadingProgress < 30 && "Preparando la experiencia..."}
          {loadingProgress >= 30 &&
            loadingProgress < 90 &&
            totalImages > 0 &&
            `Cargando fotografías... ${loadedImages}/${totalImages}`}
          {loadingProgress >= 30 &&
            loadingProgress < 90 &&
            totalImages === 0 &&
            "Cargando fotografías..."}
          {loadingProgress >= 90 && loadingProgress < 100 && "Casi listo..."}
          {loadingProgress === 100 && "¡Completado!"}
        </motion.p>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-400/10"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default PageLoader;
