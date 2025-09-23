"use client";

import { useState, useEffect } from "react";
import { Clock, Sparkles, Star, Crown, Heart } from "lucide-react";

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [particles, setParticles] = useState([]);
  const [pulseKey, setPulseKey] = useState(0);

  // Configuración desde variables de entorno
  const fechaEvento =
    process.env.NEXT_PUBLIC_FECHA_EVENTO || "Sábado 08 de Noviembre, 2025";
  const horaEvento =
    process.env.NEXT_PUBLIC_HORA_EVENTO || "10:00 AM - 19:00 PM";
  const nombre = process.env.NEXT_PUBLIC_NOMBRE_QUINCEANERA || "Nahiara";

  // Generar partículas doradas
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 3,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Parsear la fecha del evento desde las variables de entorno
    const parseEventDate = () => {
      try {
        // Remover el día de la semana si existe (ej: "Sábado 08 de Noviembre, 2025")
        let fechaLimpia = fechaEvento;
        const diasSemana = [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ];
        diasSemana.forEach((dia) => {
          if (fechaLimpia.startsWith(dia)) {
            fechaLimpia = fechaLimpia.replace(dia + " ", "");
          }
        });

        // Convertir fecha del formato "08 de Noviembre, 2025" a formato que Date pueda parsear
        fechaLimpia = fechaLimpia
          .replace(" de ", " ")
          .replace("Enero", "January")
          .replace("Febrero", "February")
          .replace("Marzo", "March")
          .replace("Abril", "April")
          .replace("Mayo", "May")
          .replace("Junio", "June")
          .replace("Julio", "July")
          .replace("Agosto", "August")
          .replace("Septiembre", "September")
          .replace("Octubre", "October")
          .replace("Noviembre", "November")
          .replace("Diciembre", "December");

        // Extraer la hora de inicio (ej: "10:00 AM" de "10:00 AM - 19:00 PM")
        const horaInicio = horaEvento.split(" - ")[0];

        // Combinar fecha y hora
        const fechaCompleta = `${fechaLimpia} ${horaInicio}`;

        console.log("Fecha original:", fechaEvento);
        console.log("Fecha limpia:", fechaLimpia);
        console.log("Fecha completa:", fechaCompleta);
        console.log("Fecha parseada:", new Date(fechaCompleta));

        return new Date(fechaCompleta).getTime();
      } catch (error) {
        console.error("Error parsing event date:", error);
        // Fecha de fallback: 1 año desde hoy
        const fallback = new Date();
        fallback.setFullYear(fallback.getFullYear() + 1);
        return fallback.getTime();
      }
    };

    const targetDate = parseEventDate();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };

        setTimeLeft(newTimeLeft);

        // Crear efecto de pulso en cada cambio de segundo
        if (newTimeLeft.seconds !== timeLeft.seconds) {
          setPulseKey((prev) => prev + 1);
        }
      } else {
        // Si el evento ya pasó, mostrar zeros
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [fechaEvento, horaEvento, timeLeft.seconds]);

  const timeUnits = [
    {
      label: "Días",
      value: timeLeft.days,
      icon: Crown,
      color: "from-yellow-400 to-amber-500",
    },
    {
      label: "Horas",
      value: timeLeft.hours,
      icon: Clock,
      color: "from-amber-400 to-yellow-500",
    },
    {
      label: "Minutos",
      value: timeLeft.minutes,
      icon: Sparkles,
      color: "from-yellow-500 to-amber-400",
    },
    {
      label: "Segundos",
      value: timeLeft.seconds,
      icon: Heart,
      color: "from-amber-500 to-yellow-400",
    },
  ];

  const eventPassed =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const styles = `
    @keyframes floatGolden {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-15px) rotate(90deg); }
      50% { transform: translateY(-30px) rotate(180deg); }
      75% { transform: translateY(-15px) rotate(270deg); }
    }

    @keyframes sparkleGlow {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }

    @keyframes shimmerGold {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes pulseNumber {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    @keyframes glowRing {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(251, 191, 36, 0.3), 
                    0 0 40px rgba(251, 191, 36, 0.2),
                    inset 0 0 20px rgba(251, 191, 36, 0.1);
      }
      50% { 
        box-shadow: 0 0 40px rgba(251, 191, 36, 0.6), 
                    0 0 80px rgba(251, 191, 36, 0.4),
                    inset 0 0 30px rgba(251, 191, 36, 0.2);
      }
    }

    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInScale {
      from { opacity: 0; transform: scale(0.5) translateY(30px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .particle-golden {
      animation: floatGolden var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }

    .sparkle-glow {
      animation: sparkleGlow 3s ease-in-out infinite;
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

    .glass-golden {
      background: rgba(254, 243, 199, 0.15);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 2px solid rgba(251, 191, 36, 0.3);
    }

    .number-pulse {
      animation: pulseNumber 0.6s ease-in-out;
    }

    .glow-ring {
      animation: glowRing 2s ease-in-out infinite;
    }

    .slide-in-up {
      animation: slideInUp 0.8s ease-out forwards;
    }

    .slide-in-scale {
      animation: slideInScale 0.6s ease-out forwards;
    }

    .hover-lift {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hover-lift:hover {
      transform: translateY(-15px) scale(1.05);
      filter: brightness(1.1);
    }
  `;

  return (
    <section className="relative py-24 min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 overflow-hidden flex items-center">
      <style>{styles}</style>

      {/* Partículas flotantes doradas */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute particle-golden"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              "--delay": `${particle.delay}s`,
              "--duration": `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          >
            <Star className="w-full h-full text-yellow-400/60" />
          </div>
        ))}
      </div>

      {/* Sparkles decorativos grandes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute sparkle-glow"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              "--delay": `${i * 0.4}s`,
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400/50" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Header Espectacular */}
        <div className="mb-16 slide-in-up">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 blur-3xl glow-ring"></div>
            <Clock className="relative w-20 h-20 mx-auto text-yellow-600" />
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight shimmer-text">
            {eventPassed
              ? `¡El Evento de ${nombre} ya Pasó!`
              : "Cuenta Regresiva"}
          </h2>

          <p className="text-2xl md:text-3xl text-yellow-800 font-medium max-w-3xl mx-auto leading-relaxed">
            {eventPassed
              ? "Esperamos que hayas disfrutado de esta celebración mágica"
              : `¡La fiesta de ${nombre} está por comenzar!`}
          </p>
        </div>

        {/* Countdown Cards */}
        {!eventPassed && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mb-16">
            {timeUnits.map((unit, index) => {
              const IconComponent = unit.icon;
              return (
                <div
                  key={unit.label}
                  className="slide-in-scale hover-lift glass-golden rounded-3xl p-6 md:p-8 shadow-2xl glow-ring"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Icono decorativo */}
                  <div className="mb-4">
                    <div
                      className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-r ${unit.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Número con efecto especial */}
                  <div
                    key={`${unit.label}-${unit.value}-${pulseKey}`}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-800 mb-3 number-pulse"
                    style={{
                      textShadow: "0 4px 20px rgba(217, 119, 6, 0.3)",
                    }}
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </div>

                  {/* Label */}
                  <div className="text-lg md:text-xl font-bold text-yellow-700 uppercase tracking-wider">
                    {unit.label}
                  </div>

                  {/* Decoración inferior */}
                  <div className="mt-4 flex justify-center">
                    <div
                      className={`h-1 w-16 bg-gradient-to-r ${unit.color} rounded-full`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mensaje inspiracional */}
        <div className="slide-in-up" style={{ animationDelay: "0.8s" }}>
          <div className="glass-golden rounded-3xl p-8 md:p-10 max-w-4xl mx-auto shadow-2xl mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart className="w-8 h-8 text-yellow-600" />
              <Crown className="w-10 h-10 text-yellow-500" />
              <Heart className="w-8 h-8 text-yellow-600" />
            </div>

            <p className="text-xl md:text-2xl text-yellow-800 font-medium leading-relaxed">
              {eventPassed
                ? `Gracias por ser parte de la celebración de ${nombre}. Los recuerdos durarán para siempre.`
                : "Cada momento cuenta cuando se trata de crear recuerdos mágicos que durarán toda la vida"}
            </p>
          </div>

          {/* Información del evento con estilo */}
          <div className="space-y-4">
            {/* Sparkles finales */}
            <div className="flex justify-center gap-3 mt-8">
              {Array.from({ length: 7 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-500 sparkle-glow"
                  style={{ "--delay": `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
