"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

// Componente de destellos estilo Ghibli
const GhibliSparkles = ({ count = 15 }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      color: ["#f97316", "#eab308"][Math.floor(Math.random() * 2)],
    }));
    setSparkles(newSparkles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, sparkle.opacity, 0],
            scale: [0, 1, 0.5, 1, 0],
            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
            y: [0, -Math.random() * 30 - 10, -Math.random() * 60 - 20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Componente de partículas grandes para efectos
const ColorfulParticles = ({ count = 8 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ["#f97316", "#eab308"]; // naranja, amarillo
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 8,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0.8, 1.2, 0],
            x: [0, Math.random() * 30 - 15, Math.random() * 50 - 25],
            y: [0, -Math.random() * 40 - 20, -Math.random() * 80 - 30],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function HeroSection() {
  const { nombre, edad } = useQuinceaneraConfig();

  // Estilos consistentes para todos los elementos principales
  const titleStyles = {
    className:
      "text-6xl md:text-8xl lg:text-9xl font-bold text-amber-200 mb-4 relative z-10",
    style: {
      fontFamily: "var(--font-dancing)",
      textShadow:
        "0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #fbbf24, 2px 2px 8px rgba(0,0,0,0.8)",
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets/1.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Fondo para dispositivos más grandes */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url('/assets/3.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Glassmorphism overlay para mejorar legibilidad */}
      {/* <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-amber-900/30" /> */}

      {/* Destellos mágicos estilo Ghibli */}
      <GhibliSparkles count={25} />
      <ColorfulParticles count={12} />

      <div className="text-center z-10 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative"
        >
          <Crown className="w-16 h-16 mx-auto text-amber-400 mb-4 animate-bounce drop-shadow-lg" />

          {/* Contenedor del nombre */}
          <div className="relative">
            <motion.h1
              className={titleStyles.className}
              style={titleStyles.style}
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #fbbf24, 2px 2px 8px rgba(0,0,0,0.8)",
                  "0 0 30px #fbbf24, 0 0 50px #f59e0b, 0 0 70px #fbbf24, 2px 2px 8px rgba(0,0,0,0.8)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {nombre}
            </motion.h1>
          </div>

          {/* Sección con número 15 entre líneas */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-24"></div>

            {/* Número 15 con efectos especiales */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className={titleStyles.className}
                style={titleStyles.style}
                animate={{
                  //
                  textShadow: [
                    "0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #fbbf24, 2px 2px 8px rgba(0,0,0,0.8)",
                    "0 0 30px #fbbf24, 0 0 50px #f59e0b, 0 0 70px #fbbf24, 2px 2px 8px rgba(0,0,0,0.8)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {edad}
              </motion.span>

              {/* Partículas alrededor del número */}
              <ColorfulParticles count={6} />
            </motion.div>

            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-24"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 relative"
        >
          {/* "AÑOS" con los mismos estilos que el nombre */}
          <motion.h1
            className={titleStyles.className}
            style={titleStyles.style}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Años
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-light relative z-10 text-amber-100"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 15px #f97316",
            }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Una celebración que no puedes perderte
          </motion.p>
        </motion.div>
      </div>

      {/* Luciérnagas decorativas */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
          x: [0, 10, -5, 0],
          y: [0, -8, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div
          className="w-3 h-3 rounded-full bg-amber-400"
          style={{
            boxShadow: "0 0 15px #fbbf24, 0 0 30px #fbbf2460",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-20 right-16"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.6, 1, 0.6],
          x: [0, -15, 8, 0],
          y: [0, 12, -6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 2,
        }}
      >
        <div
          className="w-2 h-2 rounded-full bg-amber-300"
          style={{
            boxShadow: "0 0 12px #fcd34d, 0 0 24px #fcd34d40",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20"
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scale: [0.7, 1.1, 0.7],
          x: [0, 18, -10, 0],
          y: [0, -12, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        <div
          className="w-4 h-4 rounded-full bg-amber-400"
          style={{
            boxShadow: "0 0 18px #fbbf24, 0 0 36px #fbbf2450",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-24"
        animate={{
          opacity: [0.6, 1, 0.4, 0.8],
          scale: [0.8, 1.2, 0.9, 1],
          x: [0, -20, 15, 0],
          y: [0, -18, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full bg-amber-300"
          style={{
            boxShadow: "0 0 14px #fcd34d, 0 0 28px #fcd34d40",
          }}
        />
      </motion.div>
    </section>
  );
}
