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

  // Generar partículas doradas más sutiles
  useEffect(() => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 3,
      size: Math.random() * 2 + 1,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Parsear la fecha del evento desde las variables de entorno
    const parseEventDate = () => {
      try {
        // Remover el día de la semana si existe
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

        // Convertir fecha del formato español a inglés
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

        // Extraer la hora de inicio
        const horaInicio = horaEvento.split(" - ")[0];
        const fechaCompleta = `${fechaLimpia} ${horaInicio}`;

        return new Date(fechaCompleta).getTime();
      } catch (error) {
        console.error("Error parsing event date:", error);
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

        if (newTimeLeft.seconds !== timeLeft.seconds) {
          setPulseKey((prev) => prev + 1);
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [fechaEvento, horaEvento, timeLeft.seconds]);

  const timeUnits = [
    {
      label: "Días",
      value: timeLeft.days,
      icon: Crown,
      color: "from-amber-400 to-yellow-500",
    },
    {
      label: "Horas",
      value: timeLeft.hours,
      icon: Clock,
      color: "from-yellow-400 to-amber-500",
    },
    {
      label: "Minutos",
      value: timeLeft.minutes,
      icon: Sparkles,
      color: "from-amber-500 to-yellow-400",
    },
    {
      label: "Segundos",
      value: timeLeft.seconds,
      icon: Heart,
      color: "from-yellow-500 to-amber-400",
    },
  ];

  const eventPassed =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <section className="relative py-10 bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/40 overflow-hidden">
      {/* Partículas flotantes sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          >
            <Star className="w-full h-full text-amber-300/40" />
          </div>
        ))}
      </div>

      {/* Sparkles decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-amber-400/40" />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Header delicado */}
        <div className="mb-8">
          <div className="relative inline-block mb-3">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-yellow-200/30 blur-lg rounded-full"></div>
            <Clock className="relative w-6 h-6 mx-auto text-amber-600" />
          </div>

          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            {eventPassed
              ? `¡El Evento de ${nombre} ya Pasó!`
              : "Cuenta Regresiva"}
          </h2>

          <p className="text-sm md:text-base text-amber-800 font-medium max-w-2xl mx-auto">
            {eventPassed
              ? "Esperamos que hayas disfrutado de esta celebración mágica"
              : `¡La fiesta de ${nombre} está por comenzar!`}
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Countdown Cards - compactas */}
        {!eventPassed && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mb-8">
            {timeUnits.map((unit, index) => {
              const IconComponent = unit.icon;
              return (
                <div
                  key={unit.label}
                  className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icono pequeño */}
                  <div className="mb-2">
                    <div
                      className={`w-6 h-6 mx-auto rounded-lg bg-gradient-to-r ${unit.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Número */}
                  <div
                    key={`${unit.label}-${unit.value}-${pulseKey}`}
                    className="text-lg md:text-xl font-bold text-amber-800 mb-1 transition-transform duration-300"
                    style={{ textShadow: "0 2px 8px rgba(217, 119, 6, 0.2)" }}
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </div>

                  {/* Label */}
                  <div className="text-xs md:text-sm font-medium text-amber-700 uppercase tracking-wide">
                    {unit.label}
                  </div>

                  {/* Línea decorativa */}
                  <div className="mt-2 flex justify-center">
                    <div
                      className={`h-0.5 w-6 bg-gradient-to-r ${unit.color} rounded-full`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mensaje inspiracional delicado */}
        <div className="bg-white/70 backdrop-blur-sm border border-amber-200/50 rounded-xl p-4 md:p-6 max-w-2xl mx-auto shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-amber-500" />
            <Crown className="w-5 h-5 text-amber-600" />
            <Heart className="w-4 h-4 text-amber-500" />
          </div>

          <p className="text-sm md:text-base text-amber-800 font-medium leading-relaxed">
            {eventPassed
              ? `Gracias por ser parte de la celebración de ${nombre}. Los recuerdos durarán para siempre.`
              : "Cada momento cuenta cuando se trata de crear recuerdos mágicos que durarán toda la vida"}
          </p>

          {/* Decoración final */}
          <div className="flex justify-center gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
