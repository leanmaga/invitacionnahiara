import { useState, useEffect } from "react";
import {
  Crown,
  Waves,
  Sun,
  Sparkles,
  Heart,
  Star,
  Gem,
  Flower2,
  Wind,
} from "lucide-react";
import Image from "next/image";

export default function DressCodeSection() {
  const [activeCategory, setActiveCategory] = useState("formal");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [particles, setParticles] = useState([]);

  // Generar partículas flotantes
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const formalStyles = {
    caballeros: [
      {
        title: "Elegante",
        image: "/assets/manTraje.jpg",
      },
    ],
    damas: [
      {
        title: "Elegante",
        image: "/assets/vestidoMujer.jpg",
      },
    ],
  };

  const categories = {
    formal: {
      title: "Elegancia Formal",
      subtitle: "Para la ceremonia y el vals",
      icon: Crown,
      color: "from-yellow-400 to-amber-500",
    },
    pileta: {
      title: "Diversión Acuática",
      subtitle: "Ropa informal para andar por el parque",
      icon: Waves,
      color: "from-blue-400 to-cyan-500",
      items: {
        general: {
          title: "Esenciales para la Pileta",
          icon: Sun,
          items: [
            "Traje de baño o bikini",
            "Toallón personal",
            "Ojotas o sandalias",
            "Protector solar",
            "Gorra o sombrero",
            "Ropa de cambio",
          ],
          tips: "No olvides traer una bolsa impermeable para tu ropa seca",
        },
      },
    },
  };

  const styles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-10px) rotate(90deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
      75% { transform: translateY(-10px) rotate(270deg); }
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
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

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .particle {
      animation: float var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }
    
    .sparkle-particle {
      animation: sparkle 2s ease-in-out infinite;
      animation-delay: var(--delay);
    }

    .slide-up {
      animation: slideInUp 0.8s ease-out forwards;
    }

    .slide-left {
      animation: slideInLeft 0.6s ease-out forwards;
    }

    .slide-right {
      animation: slideInRight 0.6s ease-out forwards;
    }

    .shimmer-text {
      background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s ease-in-out infinite;
    }

    .glass-morphism {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .card-hover {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-hover:hover {
      transform: translateY(-20px) scale(1.02);
      box-shadow: 0 25px 50px rgba(251, 191, 36, 0.3);
    }
  `;

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 overflow-hidden">
      <style>{styles}</style>

      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              "--delay": `${particle.delay}s`,
              "--duration": `${particle.duration}s`,
            }}
          >
            <Star className="w-full h-full text-yellow-300/40" />
          </div>
        ))}
      </div>

      {/* Sparkles decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute sparkle-particle"
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + (i % 3) * 30}%`,
              "--delay": `${i * 0.5}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400/60" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Espectacular */}
        <div className="text-center mb-16 slide-up">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 blur-3xl"></div>
            <Crown className="relative w-16 h-16 mx-auto text-yellow-600" />
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-8 p-4 shimmer-text">
            Código de Vestimenta
          </h2>

          <p className="text-xl md:text-2xl text-yellow-700 max-w-2xl mx-auto leading-relaxed">
            Una celebración elegante requiere el atuendo perfecto.
            <br />
            <span className="font-semibold">
              Prepárate para brillar en cada momento
            </span>
          </p>
        </div>

        {/* Navegación de Categorías */}
        <div
          className="flex justify-center mb-12 slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="glass-morphism rounded-full p-2 shadow-2xl">
            <div className="flex space-x-2">
              {Object.entries(categories).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-500 flex items-center gap-3 ${
                      activeCategory === key
                        ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-110`
                        : "text-yellow-700 hover:bg-yellow-100/50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="hidden sm:block">{category.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contenido de la Categoría Activa */}
        <div className="slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-800 mb-2">
              {categories[activeCategory].title}
            </h3>
            <p className="text-xl text-yellow-600">
              {categories[activeCategory].subtitle}
            </p>
          </div>

          {/* Cards para Categoría Formal */}
          {activeCategory === "formal" && (
            <div className="max-w-7xl mx-auto">
              {/* Restricción de Colores */}
              <div className="glass-morphism rounded-2xl p-6 mb-12 max-w-4xl mx-auto border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-yellow-600" />
                  <h4 className="text-xl font-bold text-yellow-800">
                    Nota Importante sobre Colores
                  </h4>
                </div>
                <p className="text-yellow-700 text-lg">
                  Para que la quinceañera brille en su día especial, te pedimos
                  evitar los tonos
                  <span className="font-bold text-yellow-800">
                    {" "}
                    Beige y Arena
                  </span>
                </p>
              </div>

              {/* Grid de Cards para Caballeros y Damas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Card Caballeros */}
                <div className="glass-morphism rounded-2xl overflow-hidden shadow-2xl card-hover h-full slide-left">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      width={300}
                      height={400}
                      src={formalStyles.caballeros[0].image}
                      alt={formalStyles.caballeros[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Card Damas */}
                <div className="glass-morphism rounded-2xl overflow-hidden shadow-2xl card-hover h-full slide-right">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      width={300}
                      height={400}
                      src={formalStyles.damas[0].image}
                      alt={formalStyles.damas[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards para Categoría Pileta */}
          {activeCategory === "pileta" && (
            <div className="flex justify-center">
              <div className="max-w-lg">
                {Object.entries(categories[activeCategory].items).map(
                  ([itemKey, item], index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={itemKey}
                        className="card-hover glass-morphism rounded-3xl p-8 shadow-2xl relative slide-up"
                        style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                        onMouseEnter={() => setHoveredCard(itemKey)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {/* Header de la Card */}
                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className={`p-4 rounded-2xl bg-gradient-to-r ${categories[activeCategory].color}`}
                          >
                            <ItemIcon className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="text-2xl font-bold text-yellow-800">
                            {item.title}
                          </h4>
                        </div>

                        {/* Lista de Items */}
                        <div className="space-y-3 mb-6">
                          {item.items.map((listItem, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-yellow-100/30 transition-all duration-300"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex-shrink-0"></div>
                              <span className="text-yellow-800 font-medium">
                                {listItem}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tip especial */}
                        <div className="bg-gradient-to-r from-yellow-100/50 to-amber-100/50 rounded-2xl p-4 border border-yellow-300/30">
                          <div className="flex items-start gap-3">
                            <Heart className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-yellow-700 text-sm italic">
                              <span className="font-semibold">
                                Tip especial:
                              </span>{" "}
                              {item.tips}
                            </p>
                          </div>
                        </div>

                        {/* Efecto hover especial */}
                        {hoveredCard === itemKey && (
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-3xl pointer-events-none">
                            <div className="absolute top-4 right-4">
                              <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mensaje Final Inspirador */}
        <div
          className="text-center mt-16 slide-up"
          style={{ animationDelay: "1s" }}
        >
          <div className="glass-morphism rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Flower2 className="w-8 h-8 text-yellow-600" />
              <Gem className="w-10 h-10 text-yellow-500" />
              <Flower2 className="w-8 h-8 text-yellow-600" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-4">
              Una Celebración Inolvidable Te Espera
            </h3>

            <p className="text-lg text-yellow-700 leading-relaxed">
              Recuerda que lo más importante es que te sientas cómodo y seguro
              para disfrutar al máximo de esta celebración única. Tu presencia
              es el mejor regalo y tu sonrisa será el accesorio más hermoso de
              la noche.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-500 sparkle-particle"
                  style={{ "--delay": `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
