"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Crown,
  Sparkles,
  Phone,
  MessageCircle,
  Instagram,
  Star,
  Gem,
} from "lucide-react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  // Configuración desde variables de entorno
  const nombre = process.env.NEXT_PUBLIC_NOMBRE_QUINCEANERA || "Nahiara";
  const telefono = process.env.NEXT_PUBLIC_TELEFONO || "+54 11 2776-4823";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+541155299849";
  const fechaEvento =
    process.env.NEXT_PUBLIC_FECHA_EVENTO || "Sábado 08 de Noviembre, 2025";
  const horaEvento =
    process.env.NEXT_PUBLIC_HORA_EVENTO || "10:00 AM - 19:00 PM";
  const lugar =
    process.env.NEXT_PUBLIC_LUGAR_EVENTO || "Sociedad de fomento 'La Helvecia'";
  const direccion =
    process.env.NEXT_PUBLIC_DIRECCION_EVENTO ||
    "Victoria 2051, B1716 Libertad, Merlo";
  const instagramUser = process.env.NEXT_PUBLIC_INSTAGRAM_USER || "nahi.gaa";

  const nombreFamilia =
    process.env.NEXT_PUBLIC_NOMBRE_FAMILIA || "Familia Garbán";

  // Solo ejecutar en el cliente
  useEffect(() => {
    setMounted(true);

    // Generar partículas doradas para el footer
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 4,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  const whatsappLink = `https://wa.me/${whatsapp.replace(
    /[^0-9]/g,
    ""
  )}?text=Hola! Te escribo por la invitación de los 15 de ${nombre}`;

  const styles = `
    @keyframes floatGently {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-15px) rotate(45deg); }
      50% { transform: translateY(-25px) rotate(90deg); }
      75% { transform: translateY(-15px) rotate(135deg); }
    }

    @keyframes shimmerGold {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes pulseGlow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 0 40px rgba(251, 191, 36, 0.5);
        transform: scale(1.05);
      }
    }

    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .particle-gentle {
      animation: floatGently var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }

    .shimmer-text {
      background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmerGold 3s ease-in-out infinite;
    }

    .glass-dark {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 1px solid rgba(251, 191, 36, 0.2);
    }

    .slide-in-up {
      animation: slideInUp 0.8s ease-out forwards;
    }

    .slide-in-left {
      animation: slideInLeft 0.6s ease-out forwards;
    }

    .slide-in-right {
      animation: slideInRight 0.6s ease-out forwards;
    }

    .pulse-glow {
      animation: pulseGlow 3s ease-in-out infinite;
    }

    .hover-lift {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hover-lift:hover {
      transform: translateY(-5px) scale(1.05);
    }
  `;

  if (!mounted) return null;

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-20 overflow-hidden">
      <style>{styles}</style>

      {/* Imagen de fondo con efecto sombreado */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url(/assets/budaNight.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Overlay adicional para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>

      {/* Partículas doradas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute particle-gentle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              "--delay": `${particle.delay}s`,
              "--duration": `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          >
            <Star className="w-full h-full text-yellow-400/30" />
          </div>
        ))}
      </div>

      {/* Overlay de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header del Footer */}
        <div className="text-center mb-16 slide-in-up">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 blur-3xl pulse-glow"></div>
            <Crown className="relative w-16 h-16 mx-auto text-yellow-400" />
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 shimmer-text">
            {nombre}
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
            Gracias por ser parte de este momento tan especial en mi vida.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Heart className="w-5 h-5 text-yellow-400 animate-pulse" />
            <Gem className="w-6 h-6 text-yellow-500" />
            <Heart className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Grid de Contenido */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {/* Sección de Contacto */}
          <div className="slide-in-left">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Phone className="w-6 h-6 text-yellow-400" />
                <h3 className="font-serif text-2xl font-bold text-yellow-300">
                  Contacto
                </h3>
              </div>

              <div className="space-y-4 text-gray-300">
                <p className="font-semibold text-lg text-yellow-200">
                  {nombreFamilia}
                </p>

                {telefono && (
                  <div className="flex items-center gap-3 justify-center">
                    <Phone className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{telefono}</span>
                  </div>
                )}

                {whatsapp && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-6 py-3 rounded-2xl transition-all duration-300 font-semibold hover-lift shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Detalles del Evento */}
          <div className="slide-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <h3 className="font-serif text-2xl font-bold text-yellow-300">
                  Detalles del Evento
                </h3>
              </div>

              <div className="space-y-3 text-gray-300">
                <p className="font-bold text-lg text-yellow-200">
                  {fechaEvento}
                </p>
                <p className="font-semibold">{horaEvento}</p>
                <p className="font-bold text-yellow-200">{lugar}</p>
                <p className="text-sm text-gray-400">{direccion}</p>
              </div>

              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mx-auto"></div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="slide-in-right" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <h3 className="font-serif text-2xl font-bold text-yellow-300">
                  Sígueme
                </h3>
                <Heart className="w-6 h-6 text-yellow-400" />
              </div>

              <div className="flex gap-4 justify-center mb-4">
                {instagramUser && (
                  <a
                    href={`https://instagram.com/${instagramUser}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center hover:shadow-xl transition-all duration-300 hover-lift"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
              </div>

              {instagramUser && (
                <p className="text-sm text-yellow-400 font-medium">
                  @{instagramUser}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Separador Decorativo */}
        <div className="flex items-center justify-center mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-32"></div>
          <div className="mx-6 relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-xl"></div>
            <Sparkles className="relative text-yellow-400 w-8 h-8 animate-pulse" />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-32"></div>
        </div>

        {/* Sección Final */}
        <div
          className="text-center slide-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex items-center justify-center gap-3 text-gray-500 text-sm">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>para {nombre}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
