import { useState, useEffect } from "react";
import {
  Send,
  User,
  Phone,
  Utensils,
  Heart,
  Loader2,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingRSVP, setExistingRSVP] = useState(null);
  const [checkingExisting, setCheckingExisting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Configuración
  const nombre = "Sofia";
  const whatsapp = "5493511234567";
  const telefono = "(351) 123-4567";
  const fechaLimiteRSVP = "15 de marzo, 2025";

  const checkExistingRSVP = async (name, phone) => {
    if (!name.trim()) return null;
    return null;
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.name.trim().length >= 3) {
        setCheckingExisting(true);
        const existing = await checkExistingRSVP(formData.name, formData.phone);
        setExistingRSVP(existing);
        setCheckingExisting(false);

        if (existing) {
          setSubmitted(true);
          setIsFlipped(false);
        }
      } else {
        setExistingRSVP(null);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData.name, formData.phone]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    if (e.target.name === "name" && !e.target.value.trim()) {
      setSubmitted(false);
      setExistingRSVP(null);
      setIsFlipped(false);
    }
  };

  const formatWhatsAppMessage = (data) => {
    let message = `🎉 *CONFIRMACIÓN DE ASISTENCIA - QUINCEAÑERA ${nombre.toUpperCase()}*\n\n`;
    message += `👤 *Nombre:* ${data.name}\n`;
    message += `📱 *Teléfono:* ${data.phone || "No proporcionado"}\n`;

    if (data.dietary) {
      message += `🍽️ *Restricciones alimentarias:* ${data.dietary}\n`;
    }

    if (data.message) {
      message += `💌 *Mensaje para ${nombre}:* ${data.message}\n`;
    }

    message += `\n📅 *Fecha:* ${new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    return encodeURIComponent(message);
  };

  const sendToWhatsApp = (data) => {
    const message = formatWhatsAppMessage(data);
    const whatsappURL = `https://wa.me/${whatsapp}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existing = await checkExistingRSVP(formData.name, formData.phone);
    if (existing) {
      setExistingRSVP(existing);
      setSubmitted(true);
      setIsFlipped(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      sendToWhatsApp(formData);
      setSubmitted(true);
      setIsFlipped(false); // Resetear el flip cuando se envía
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError(
        "Hubo un error al guardar la confirmación. El WhatsApp se abrirá de todas formas."
      );
      sendToWhatsApp(formData);
      setSubmitted(true);
      setIsFlipped(false); // También resetear en caso de error
    } finally {
      setLoading(false);
    }
  };

  // CSS para animaciones
  const styles = `
    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 0.8s ease-out forwards;
    }
    .scale-in {
      opacity: 0;
      transform: scale(0.8);
      animation: scaleIn 0.8s ease-out forwards;
    }
    .bounce-icon {
      animation: bounceIcon 2s infinite;
    }
    .rotate-sparkles {
      animation: rotateSpark 4s linear infinite;
    }
    .pulse-glow {
      animation: pulseGlow 2s infinite;
    }
    .bounce-arrow {
      animation: bounceArrow 2s infinite;
    }

    /* Efecto 3D Flip Card */
    .flip-card {
      perspective: 1000px;
      width: 100%;
      height: 100vh;
    }
    
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transform-style: preserve-3d;
    }
    
    .flip-card.flipped .flip-card-inner {
      transform: rotateY(180deg);
    }
    
    .flip-card-front, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    
    .flip-card-back {
      transform: rotateY(180deg);
    }

    .golden-button {
      background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
      box-shadow: 0 8px 32px rgba(251, 191, 36, 0.3);
      animation: pulseGolden 2s infinite;
    }

    @keyframes pulseGolden {
      0%, 100% { 
        box-shadow: 0 8px 32px rgba(251, 191, 36, 0.3);
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 12px 40px rgba(251, 191, 36, 0.5);
        transform: scale(1.05);
      }
    }

    @keyframes fadeInUp {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes bounceIcon {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.2) rotate(10deg); }
    }
    @keyframes rotateSpark {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
      50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8); }
    }
    @keyframes bounceArrow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `;

  // PANTALLA DE CONFIRMACIÓN
  if (submitted || existingRSVP) {
    const rsvpData = existingRSVP || formData;
    const isExisting = !!existingRSVP;

    return (
      <div className="relative">
        <style>{styles}</style>

        {/* LAYOUT MÓVIL - Confirmación */}
        <div className="lg:hidden">
          <div
            className="relative h-screen w-full flex items-center justify-center"
            style={{
              backgroundImage: `url('/assets/background2.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/90 via-amber-50/85 to-yellow-100/80"></div>

            <div className="relative z-10 text-center max-w-lg mx-auto px-6 fade-in-up">
              <div className="flex justify-center mb-8">
                <div className="bounce-icon">
                  {isExisting ? (
                    <CheckCircle className="w-20 h-20 text-yellow-600" />
                  ) : (
                    <Heart className="w-20 h-20 text-yellow-600" />
                  )}
                </div>
              </div>

              <h2
                className="font-bold text-4xl sm:text-5xl text-yellow-800 mb-6 leading-tight"
                style={{
                  textShadow: "0 4px 20px rgba(217, 119, 6, 0.3)",
                }}
              >
                {isExisting ? "¡Ya Confirmaste!" : "¡Confirmación Enviada!"}
              </h2>

              <p className="text-lg text-yellow-900/80 max-w-lg mx-auto mb-8 font-medium">
                {isExisting
                  ? `Hola ${rsvpData.name}, ya confirmaste tu asistencia para la fiesta de ${nombre}. ¡Te esperamos!`
                  : `Tu confirmación se envió por WhatsApp. ¡No podemos esperar a celebrar contigo en la fiesta de ${nombre}!`}
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setExistingRSVP(null);
                  setIsFlipped(false);
                  setFormData({
                    name: "",
                    phone: "",
                    dietary: "",
                    message: "",
                  });
                }}
                className="bg-gradient-to-r from-yellow-200/80 to-yellow-300/80 text-yellow-800 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-yellow-400/30 hover:scale-105"
              >
                Confirmar otra persona
              </button>
            </div>
          </div>
        </div>

        {/* LAYOUT DESKTOP - Confirmación */}
        <section className="hidden lg:block relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 lg:left-1/2 w-full lg:w-1/2">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url('/assets/background2.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
          <div className="absolute inset-0 lg:w-1/2 lg:right-1/2 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100"></div>

          <div className="relative z-10 h-screen flex items-center">
            <div className="w-full h-full">
              <div className="grid lg:grid-cols-2 gap-0 h-full min-h-screen">
                <div className="flex items-center justify-center h-full min-h-screen lg:min-h-0 px-8">
                  <div className="text-center scale-in">
                    <div className="flex justify-center mb-8">
                      <div className="bounce-icon">
                        {isExisting ? (
                          <CheckCircle className="w-24 h-24 text-yellow-600" />
                        ) : (
                          <Heart className="w-24 h-24 text-yellow-600" />
                        )}
                      </div>
                    </div>

                    <h2
                      className="font-bold text-5xl md:text-6xl text-yellow-800 mb-6 leading-tight"
                      style={{
                        textShadow: "0 4px 20px rgba(217, 119, 6, 0.3)",
                      }}
                    >
                      {isExisting
                        ? "¡Ya Confirmaste!"
                        : "¡Confirmación Enviada!"}
                    </h2>

                    <p className="text-xl text-yellow-900/80 max-w-lg mx-auto mb-8 font-medium">
                      {isExisting
                        ? `Hola ${rsvpData.name}, ya confirmaste tu asistencia para la fiesta de ${nombre}. ¡Te esperamos!`
                        : `Tu confirmación se envió por WhatsApp. ¡No podemos esperar a celebrar contigo en la fiesta de ${nombre}!`}
                    </p>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setExistingRSVP(null);
                        setIsFlipped(false);
                        setFormData({
                          name: "",
                          phone: "",
                          dietary: "",
                          message: "",
                        });
                      }}
                      className="bg-gradient-to-r from-yellow-200/80 to-yellow-300/80 text-yellow-800 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-yellow-400/30 hover:scale-105"
                    >
                      Confirmar otra persona
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // FORMULARIO PRINCIPAL
  return (
    <div className="relative">
      <style>{styles}</style>

      {/* LAYOUT MÓVIL */}
      <div className="lg:hidden">
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">
            {/* FRONT: Imagen con botón */}
            <div className="flip-card-front">
              <div
                className="relative h-screen w-full flex items-center justify-center"
                style={{
                  backgroundImage: `url('/assets/background2.webp')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-amber-800/30 to-yellow-700/40"></div>

                <div className="relative z-10 text-center max-w-lg mx-auto px-6 fade-in-up">
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="absolute inset-0 pulse-glow">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/50 to-amber-500/50 rounded-full blur-2xl"></div>
                    </div>
                    <Send className="relative w-12 h-12 text-yellow-100 drop-shadow-lg" />
                    <div className="absolute -top-2 -right-2 rotate-sparkles">
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </div>
                  </div>

                  <h2
                    className="font-bold text-4xl sm:text-5xl mb-6 leading-tight text-yellow-100"
                    style={{
                      textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    Confirma tu
                    <br />
                    <span className="text-3xl sm:text-4xl">Asistencia</span>
                  </h2>

                  <p className="text-lg text-yellow-100/90 mb-12 font-medium drop-shadow-lg">
                    Confirma antes del{" "}
                    <span className="font-bold text-yellow-200">
                      {fechaLimiteRSVP.split(",")[0]}
                    </span>
                    <br />
                    para que podamos preparar la fiesta perfecta de {nombre}
                  </p>

                  {/* Botón dorado para voltear la tarjeta */}
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="golden-button text-yellow-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center gap-3 mx-auto"
                  >
                    <Send className="w-6 h-6" />
                    Confirmar Asistencia
                  </button>
                </div>
              </div>
            </div>

            {/* BACK: Formulario */}
            <div className="flip-card-back">
              <div className="h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center">
                <div className="w-full max-w-lg px-6">
                  <div className="bg-white/60 backdrop-blur-lg border border-yellow-300/40 rounded-3xl p-6 shadow-2xl scale-in">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-yellow-800 font-bold text-lg flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Confirmar Asistencia
                      </h3>
                      {/* Botón para volver */}
                      <button
                        onClick={() => setIsFlipped(false)}
                        className="text-yellow-600 hover:text-yellow-800 transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                      </button>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-700 mb-4">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-yellow-800 font-medium mb-2 flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-yellow-600" />
                          Nombre Completo *
                          {checkingExisting && (
                            <Loader2 className="w-3 h-3 animate-spin text-yellow-600" />
                          )}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className="block text-yellow-800 font-medium mb-2 flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-yellow-600" />
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                          placeholder={telefono}
                        />
                      </div>

                      <div>
                        <label className="block text-yellow-800 font-medium mb-2 flex items-center gap-2 text-sm">
                          <Utensils className="w-4 h-4 text-yellow-600" />
                          Restricciones Alimentarias
                        </label>
                        <input
                          type="text"
                          name="dietary"
                          value={formData.dietary}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                          placeholder="Vegetariano, sin gluten, alergias, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-yellow-800 font-medium mb-2 flex items-center gap-2 text-sm">
                          <Heart className="w-4 h-4 text-yellow-600" />
                          Mensaje para {nombre}
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={2}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none text-sm"
                          placeholder={`Comparte tus mejores deseos para ${nombre}...`}
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={loading || !formData.name.trim()}
                        className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-yellow-900 px-4 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {loading ? "Enviando..." : "¡Confirmar Asistencia!"}
                      </button>

                      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100/80 to-amber-100/80 rounded-xl border border-yellow-300/40">
                        <p className="text-yellow-800/80 text-center text-xs">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          <strong>Fecha límite:</strong> {fechaLimiteRSVP}
                          <br />
                          <Phone className="inline w-3 h-3 mr-1 mt-1" />
                          Contacto: {telefono}
                          <br />
                          <span className="text-xs text-yellow-700/60 mt-1 block">
                            Tu confirmación se enviará por WhatsApp
                            automáticamente
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYOUT DESKTOP */}
      <section
        id="rsvp"
        className="hidden lg:block relative min-h-screen overflow-hidden"
      >
        <div className="absolute inset-0 lg:left-1/2 w-full lg:w-1/2">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('/assets/background2.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <div className="absolute inset-0 lg:w-1/2 lg:right-1/2 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100"></div>

        <div className="relative z-10 h-screen flex items-center">
          <div className="w-full h-full">
            <div className="grid lg:grid-cols-2 gap-0 h-full min-h-screen">
              <div className="flex items-center justify-center h-full min-h-screen lg:min-h-0 px-8">
                <div className="w-full max-w-lg">
                  <div className="text-center mb-8 fade-in-up">
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="absolute inset-0 pulse-glow">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/50 to-amber-500/50 rounded-full blur-2xl"></div>
                      </div>
                      <Send className="relative w-16 h-16 text-yellow-800 drop-shadow-lg" />
                      <div className="absolute -top-2 -right-2 rotate-sparkles">
                        <Sparkles className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>

                    <h2
                      className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight text-yellow-800"
                      style={{
                        textShadow: "0 4px 20px rgba(217, 119, 6, 0.3)",
                      }}
                    >
                      Confirma tu
                      <br />
                      Asistencia
                    </h2>

                    <p className="text-lg text-yellow-900/80 max-w-lg mx-auto mb-6 font-medium">
                      Confirma antes del{" "}
                      <span className="font-bold text-yellow-700">
                        {fechaLimiteRSVP.split(",")[0]}
                      </span>{" "}
                      para que podamos preparar la fiesta perfecta de {nombre}
                    </p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-lg border border-yellow-300/40 rounded-3xl p-6 shadow-2xl scale-in">
                    <div>
                      {error && (
                        <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-700 mb-4">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{error}</span>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-yellow-800 font-medium mb-2 flex items-center gap-2">
                            <User className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">Nombre Completo *</span>
                            {checkingExisting && (
                              <Loader2 className="w-3 h-3 animate-spin text-yellow-600" />
                            )}
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-lg text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all backdrop-blur-sm disabled:opacity-50 text-sm"
                            placeholder="Tu nombre completo"
                          />
                        </div>

                        <div>
                          <label className="block text-yellow-800 font-medium mb-2 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">Teléfono</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-lg text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all backdrop-blur-sm disabled:opacity-50 text-sm"
                            placeholder={telefono}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-yellow-800 font-medium mb-2 flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">
                            Restricciones Alimentarias
                          </span>
                        </label>
                        <input
                          type="text"
                          name="dietary"
                          value={formData.dietary}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-lg text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all backdrop-blur-sm disabled:opacity-50 text-sm"
                          placeholder="Vegetariano, sin gluten, alergias, etc."
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-yellow-800 font-medium mb-2 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">
                            Mensaje Especial para {nombre}
                          </span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          disabled={loading}
                          className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-lg text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none backdrop-blur-sm disabled:opacity-50 text-sm"
                          placeholder={`Comparte tus mejores deseos para ${nombre}...`}
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-yellow-900 px-6 py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl hover:scale-105"
                        style={{
                          boxShadow: loading
                            ? ""
                            : "0 0 30px rgba(251, 191, 36, 0.4)",
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            ¡Confirmar Asistencia!
                          </>
                        )}
                      </button>

                      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100/80 to-amber-100/80 rounded-xl border border-yellow-300/40">
                        <p className="text-yellow-800/80 text-center text-xs">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          <strong>Fecha límite:</strong> {fechaLimiteRSVP}
                          <br />
                          <Phone className="inline w-3 h-3 mr-1 mt-1" />
                          Contacto: {telefono}
                          <br />
                          <span className="text-xs text-yellow-700/60 mt-1 block">
                            Tu confirmación se enviará por WhatsApp
                            automáticamente
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
