import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Crown,
  Gift,
} from "lucide-react";

export default function DelicateEventDetails() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Configuración - usando variables de entorno
  const fechaEvento = process.env.NEXT_PUBLIC_FECHA_EVENTO;
  const horaEvento = process.env.NEXT_PUBLIC_HORA_EVENTO;
  const lugar = process.env.NEXT_PUBLIC_LUGAR_EVENTO;
  const direccion =
    process.env.NEXT_PUBLIC_DIRECCION_EVENTO ||
    "Victoria 2051, B1716 Libertad, Merlo";
  const alias = process.env.NEXT_PUBLIC_ALIAS_BANCARIO || "nahiara.933.mp";

  const details = [
    {
      icon: Calendar,
      title: "Fecha",
      value: fechaEvento,
      color: "bg-gradient-to-br from-amber-400 to-yellow-500",
    },
    {
      icon: Clock,
      title: "Hora",
      value: horaEvento,
      color: "bg-gradient-to-br from-yellow-400 to-amber-500",
    },
    {
      icon: MapPin,
      title: "Lugar",
      value: lugar,
      description: direccion,
      color: "bg-gradient-to-br from-amber-500 to-yellow-400",
    },
  ];

  return (
    <section className="relative py-8 bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/40 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sparkles flotantes */}
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
            <Sparkles className="w-3 h-3 text-amber-300/40" />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header elegante y delicado */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-3">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-yellow-200/30 blur-lg rounded-full"></div>
            <Crown className="relative w-6 h-6 mx-auto text-amber-600" />
          </div>

          <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
            Detalles del Evento
          </h2>

          <div className="w-12 h-px bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Cards de información - compactas y elegantes */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {details.map((detail, index) => {
            const IconComponent = detail.icon;
            return (
              <div
                key={detail.title}
                className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icono */}
                <div className="text-center mb-3">
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 ${detail.color} rounded-xl mb-2 shadow-md`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="font-serif text-base font-semibold text-amber-800">
                    {detail.title}
                  </h3>
                </div>

                {/* Contenido */}
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-amber-700">
                    {detail.value}
                  </p>

                  {detail.description && (
                    <p className="text-xs text-amber-600">
                      {detail.description}
                    </p>
                  )}
                </div>

                {/* Línea decorativa */}
                <div className="mt-3 flex justify-center">
                  <div className="h-0.5 w-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"></div>
                </div>

                {/* Efectos hover sutiles */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-yellow-100/20 rounded-xl pointer-events-none">
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sección de regalos - delicada */}
        <div className="bg-white/70 backdrop-blur-sm border border-amber-200/50 rounded-xl p-6 text-center shadow-sm max-w-2xl mx-auto">
          {/* Header de regalos */}
          <div className="mb-4">
            <div className="relative inline-block mb-2">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-yellow-200/30 blur-md rounded-full"></div>
              <Gift className="relative w-6 h-6 mx-auto text-amber-600" />
            </div>

            <h3 className="font-serif text-lg font-semibold text-amber-800 mb-2 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
              Un Detalle Especial
            </h3>
          </div>

          {/* Contenido de regalos */}
          <div className="space-y-3 mb-4">
            <p className="text-sm text-amber-800 font-medium">
              Podés dejar tu obsequio de manera monetaria al:
            </p>

            {/* Alias destacado */}
            <div className="inline-block bg-amber-50/80 border border-amber-200/50 rounded-lg px-3 py-1.5 shadow-sm">
              <div className="text-base font-bold text-amber-700 bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
                {alias}
              </div>
            </div>

            <p className="text-sm text-amber-800 font-medium leading-relaxed">
              Otros regalos que me gustan: Perfumes, Maquillaje, Ropa talle
              1(38), Accesorios bijuterí, Adornos de cerámica, Agendas y
              Librería.
            </p>
          </div>

          {/* Decoración final */}
          <div className="flex justify-center items-center gap-2">
            <Heart className="w-3 h-3 text-amber-500 animate-pulse" />
            <div className="flex gap-1">
              <div
                className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <Heart className="w-3 h-3 text-amber-500 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
