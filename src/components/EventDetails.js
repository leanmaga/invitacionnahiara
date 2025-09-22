"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Star,
  Crown,
  Gift,
} from "lucide-react";

export default function EventDetails() {
  const [particles, setParticles] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Configuración - reemplaza con tu hook useQuinceaneraConfig()
  const fechaEvento =
    process.env.NEXT_PUBLIC_FECHA_EVENTO || "Sábado 08 de Noviembre, 2025";
  const horaEvento =
    process.env.NEXT_PUBLIC_HORA_EVENTO || "10:00 AM - 19:00 PM";
  const lugar =
    process.env.NEXT_PUBLIC_LUGAR_EVENTO || "Sociedad de fomento 'La Helvecia'";
  const direccion =
    process.env.NEXT_PUBLIC_DIRECCION_EVENTO ||
    "Victoria 2051, B1716 Libertad, Merlo";
  const alias = process.env.NEXT_PUBLIC_ALIAS_BANCARIO || "nahiara.933.mp";
  const nombre = process.env.NEXT_PUBLIC_NOMBRE_QUINCEANERA || "Nahiara";

  // Generar partículas flotantes
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: Math.random() * 4 + 2,
    }));
    setParticles(newParticles);
  }, []);

  const details = [
    {
      icon: Calendar,
      title: "Fecha",
      value: fechaEvento,
      description: "Una fecha para recordar",
      color: "from-yellow-400 to-amber-500",
      bgColor: "from-yellow-100/50 to-amber-100/30",
    },
    {
      icon: Clock,
      title: "Hora",
      value: horaEvento,
      description: "Tiempo de celebrar",
      color: "from-amber-400 to-yellow-500",
      bgColor: "from-amber-100/50 to-yellow-100/30",
    },
    {
      icon: MapPin,
      title: "Lugar",
      value: lugar,
      description: direccion,
      color: "from-yellow-500 to-amber-400",
      bgColor: "from-yellow-100/50 to-amber-100/30",
    },
  ];

  const styles = `
    @keyframes floatMagic {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-20px) rotate(90deg); }
      50% { transform: translateY(-35px) rotate(180deg); }
      75% { transform: translateY(-20px) rotate(270deg); }
    }

    @keyframes sparkleRotate {
      0% { transform: rotate(0deg) scale(0); opacity: 0; }
      50% { transform: rotate(180deg) scale(1); opacity: 1; }
      100% { transform: rotate(360deg) scale(0); opacity: 0; }
    }

    @keyframes shimmerGold {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(60px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInScale {
      from { opacity: 0; transform: scale(0.8) translateY(40px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    @keyframes pulseGlow {
      0%, 100% { 
        box-shadow: 0 0 30px rgba(251, 191, 36, 0.3), 
                    0 0 60px rgba(251, 191, 36, 0.2);
      }
      50% { 
        box-shadow: 0 0 50px rgba(251, 191, 36, 0.6), 
                    0 0 100px rgba(251, 191, 36, 0.4);
      }
    }

    @keyframes iconSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .particle-magic {
      animation: floatMagic var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }

    .sparkle-rotate {
      animation: sparkleRotate 3s ease-in-out infinite;
      animation-delay: var(--delay);
    }

    .shimmer-text {
      background: linear-gradient(90deg, #d97706 0%, #f59e0b 25%, #fbbf24 50%, #f59e0b 75%, #d97706 100%);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmerGold 3s ease-in-out infinite;
    }

    .glass-premium {
      background: rgba(254, 243, 199, 0.25);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 2px solid rgba(251, 191, 36, 0.3);
    }

    .slide-in-up {
      animation: slideInUp 0.8s ease-out forwards;
    }

    .slide-in-scale {
      animation: slideInScale 0.6s ease-out forwards;
    }

    .pulse-glow {
      animation: pulseGlow 3s ease-in-out infinite;
    }

    .card-hover {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-hover:hover {
      transform: translateY(-20px) scale(1.05);
    }

    .card-hover:hover .icon-spin {
      animation: iconSpin 0.6s ease-in-out;
    }

    .gift-section {
      background: linear-gradient(135deg, 
        rgba(254, 243, 199, 0.8) 0%, 
        rgba(253, 230, 138, 0.6) 50%, 
        rgba(254, 243, 199, 0.8) 100%);
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      border: 3px solid rgba(251, 191, 36, 0.4);
    }
  `;

  return (
    <section
      id="details"
      className="relative py-24 min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 overflow-hidden"
    >
      <style>{styles}</style>

      {/* Partículas flotantes mágicas */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute particle-magic"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              "--delay": `${particle.delay}s`,
              "--duration": `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          >
            <Star className="w-full h-full text-yellow-400/40" />
          </div>
        ))}
      </div>

      {/* Sparkles decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute sparkle-rotate"
            style={{
              left: `${5 + i * 6.5}%`,
              top: `${20 + (i % 5) * 15}%`,
              "--delay": `${i * 0.4}s`,
            }}
          >
            <Sparkles className="w-5 h-5 text-yellow-400/60" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Espectacular */}
        <div className="text-center mb-20 slide-in-up">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 blur-3xl pulse-glow"></div>
            <Crown className="relative w-20 h-20 mx-auto text-yellow-600" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 shimmer-text">
            Detalles del Evento
          </h2>
        </div>

        {/* Cards de Detalles */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {details.map((detail, index) => {
            const IconComponent = detail.icon;
            return (
              <div
                key={detail.title}
                className="slide-in-scale card-hover glass-premium rounded-3xl p-8 shadow-2xl pulse-glow"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icono con efecto especial */}
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${detail.color} rounded-3xl mb-4 shadow-xl icon-spin`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-yellow-800 mb-3">
                    {detail.title}
                  </h3>
                </div>

                {/* Contenido principal */}
                <div className="text-center space-y-3">
                  <p className="text-xl md:text-2xl font-bold text-yellow-700 leading-relaxed">
                    {detail.value}
                  </p>

                  <p className="text-yellow-600 font-medium">
                    {detail.description}
                  </p>
                </div>

                {/* Línea decorativa */}
                <div className="mt-6 flex justify-center">
                  <div
                    className={`h-2 w-24 bg-gradient-to-r ${detail.color} rounded-full shadow-lg`}
                  ></div>
                </div>

                {/* Efecto hover especial */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-3xl pointer-events-none">
                    <div className="absolute top-4 right-4">
                      <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Heart className="w-5 h-5 text-yellow-500 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sección de Regalos Espectacular */}
        <div className="slide-in-scale" style={{ animationDelay: "0.8s" }}>
          <div className="gift-section rounded-3xl p-10 md:p-12 text-center shadow-2xl pulse-glow max-w-5xl mx-auto">
            {/* Header de la sección regalo */}
            <div className="mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 to-amber-400/40 blur-2xl"></div>
                <Gift className="relative w-16 h-16 mx-auto text-yellow-600" />
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-bold text-yellow-800 mb-4 shimmer-text">
                Un Detalle Especial
              </h3>
            </div>

            {/* Mensaje principal */}
            <div className="space-y-6 mb-8">
              <p className="text-xl md:text-2xl text-yellow-800 font-medium leading-relaxed">
                Tu presencia es muy importante para mí, pero si querés dejarme
                un detalle te dejo mi alias:
              </p>

              {/* Alias destacado */}
              <div className="inline-block glass-premium rounded-2xl px-8 py-4 shadow-xl">
                <div className="text-2xl md:text-3xl font-bold text-yellow-700 shimmer-text">
                  {alias}
                </div>
              </div>
            </div>

            {/* Decoración final */}
            <div className="flex justify-center items-center gap-4">
              <Heart className="w-6 h-6 text-yellow-500 animate-pulse" />
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 sparkle-rotate"
                    style={{ "--delay": `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <Heart className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
