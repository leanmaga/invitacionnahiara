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
  MessageSquare,
  Flower2,
  Sun,
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

  // Configuración - reemplaza con tu hook useQuinceaneraConfig()
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
      return;
    }

    try {
      setLoading(true);
      setError("");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      sendToWhatsApp(formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError(
        "Hubo un error al guardar la confirmación. El WhatsApp se abrirá de todas formas."
      );
      sendToWhatsApp(formData);
      setSubmitted(true);
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
      0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.5); }
      50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.8); }
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
            <div className="absolute inset-0 bg-gradient-to-br from-amber-800/90 via-orange-800/90 to-yellow-700/90"></div>

            <div className="relative z-10 text-center max-w-lg mx-auto px-6 fade-in-up">
              <div className="flex justify-center mb-8">
                <div className="bounce-icon">
                  {isExisting ? (
                    <CheckCircle className="w-20 h-20 text-amber-400" />
                  ) : (
                    <Heart className="w-20 h-20 text-orange-400" />
                  )}
                </div>
              </div>

              <h2
                className="font-bold text-4xl sm:text-5xl text-amber-100 mb-6 leading-tight"
                style={{
                  textShadow:
                    "0 0 30px rgba(245, 158, 11, 0.8), 0 0 60px rgba(251, 146, 60, 0.6)",
                }}
              >
                {isExisting ? "¡Ya Confirmaste!" : "¡Confirmación Enviada!"}
              </h2>

              <p className="text-lg text-white/90 max-w-lg mx-auto mb-8 font-medium drop-shadow-lg">
                {isExisting
                  ? `Hola ${rsvpData.name}, ya confirmaste tu asistencia para la fiesta de ${nombre}. ¡Te esperamos!`
                  : `Tu confirmación se envió por WhatsApp. ¡No podemos esperar a celebrar contigo en la fiesta de ${nombre}!`}
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setExistingRSVP(null);
                  setFormData({
                    name: "",
                    phone: "",
                    dietary: "",
                    message: "",
                  });
                }}
                className="bg-gradient-to-r from-white/20 to-white/30 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105"
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
          <div className="absolute inset-0 lg:w-1/2 lg:right-1/2 bg-gradient-to-br from-amber-800 via-orange-800 to-yellow-700"></div>

          <div className="relative z-10 h-screen flex items-center">
            <div className="w-full h-full">
              <div className="grid lg:grid-cols-2 gap-0 h-full min-h-screen">
                <div className="flex items-center justify-center h-full min-h-screen lg:min-h-0 px-8">
                  <div className="text-center scale-in">
                    <div className="flex justify-center mb-8">
                      <div className="bounce-icon">
                        {isExisting ? (
                          <CheckCircle className="w-24 h-24 text-amber-400" />
                        ) : (
                          <Heart className="w-24 h-24 text-orange-400" />
                        )}
                      </div>
                    </div>

                    <h2
                      className="font-bold text-5xl md:text-6xl text-amber-100 mb-6 leading-tight"
                      style={{
                        textShadow:
                          "0 0 30px rgba(245, 158, 11, 0.8), 0 0 60px rgba(251, 146, 60, 0.6)",
                      }}
                    >
                      {isExisting
                        ? "¡Ya Confirmaste!"
                        : "¡Confirmación Enviada!"}
                    </h2>

                    <p className="text-xl text-white/90 max-w-lg mx-auto mb-8 font-medium drop-shadow-lg">
                      {isExisting
                        ? `Hola ${rsvpData.name}, ya confirmaste tu asistencia para la fiesta de ${nombre}. ¡Te esperamos!`
                        : `Tu confirmación se envió por WhatsApp. ¡No podemos esperar a celebrar contigo en la fiesta de ${nombre}!`}
                    </p>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setExistingRSVP(null);
                        setFormData({
                          name: "",
                          phone: "",
                          dietary: "",
                          message: "",
                        });
                      }}
                      className="bg-gradient-to-r from-white/20 to-white/30 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105"
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
        {/* Primera sección: Hero con imagen de fondo (100vh) */}
        <div
          className="relative h-screen w-full flex items-center justify-center"
          style={{
            backgroundImage: `url('/assets/background2.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-800/90 via-orange-800/90 to-yellow-700/90"></div>

          <div className="relative z-10 text-center max-w-lg mx-auto px-6 fade-in-up">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 pulse-glow">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400/50 to-orange-400/50 rounded-full blur-2xl"></div>
              </div>
              <Send className="relative w-12 h-12 text-white drop-shadow-2xl" />
              <div className="absolute -top-2 -right-2 rotate-sparkles">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
            </div>

            <h2
              className="font-bold text-4xl sm:text-5xl text-white mb-6 leading-tight"
              style={{
                textShadow:
                  "0 0 30px rgba(245, 158, 11, 0.8), 0 0 60px rgba(251, 146, 60, 0.6)",
                background:
                  "linear-gradient(135deg, #f59e0b, #f97316, #eab308)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Confirma tu
              <br />
              <span className="text-3xl sm:text-4xl">Asistencia</span>
            </h2>

            <p className="text-lg text-white/90 mb-8 font-medium drop-shadow-lg">
              Confirma antes del{" "}
              <span className="font-bold text-amber-300">
                {fechaLimiteRSVP.split(",")[0]}
              </span>
              <br />
              para que podamos preparar la fiesta perfecta de {nombre}
            </p>

            <div className="mt-6 bounce-arrow">
              <svg
                className="w-6 h-6 text-white/60 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Segunda sección: Formulario (100vh) */}
        <div
          id="mobile-form-section"
          className="h-screen bg-gradient-to-br from-amber-800 via-orange-800 to-yellow-700 flex items-center justify-center"
        >
          <div className="w-full max-w-lg px-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl scale-in">
              <div className="mb-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Confirmar Asistencia
                </h3>
              </div>

              {error && (
                <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-200 mb-4">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2 flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-amber-300" />
                    Nombre Completo *
                    {checkingExisting && (
                      <Loader2 className="w-3 h-3 animate-spin text-amber-300" />
                    )}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-sm"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-orange-300" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm"
                    placeholder={telefono}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 flex items-center gap-2 text-sm">
                    <Utensils className="w-4 h-4 text-yellow-300" />
                    Restricciones Alimentarias
                  </label>
                  <input
                    type="text"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-sm"
                    placeholder="Vegetariano, sin gluten, alergias, etc."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-amber-300" />
                    Mensaje para {nombre}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                    disabled={loading}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none text-sm"
                    placeholder={`Comparte tus mejores deseos para ${nombre}...`}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.name.trim()}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-600 text-white px-4 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {loading ? "Enviando..." : "¡Confirmar Asistencia!"}
                </button>

                <div className="mt-4 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/20">
                  <p className="text-white/80 text-center text-xs">
                    <Calendar className="inline w-3 h-3 mr-1" />
                    <strong>Fecha límite:</strong> {fechaLimiteRSVP}
                    <br />
                    <Phone className="inline w-3 h-3 mr-1 mt-1" />
                    Contacto: {telefono}
                    <br />
                    <span className="text-xs text-white/60 mt-1 block">
                      Tu confirmación se enviará por WhatsApp automáticamente
                    </span>
                  </p>
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

        <div className="absolute inset-0 lg:w-1/2 lg:right-1/2 bg-gradient-to-br from-amber-800 via-orange-800 to-yellow-700"></div>

        <div className="relative z-10 h-screen flex items-center">
          <div className="w-full h-full">
            <div className="grid lg:grid-cols-2 gap-0 h-full min-h-screen">
              <div className="flex items-center justify-center h-full min-h-screen lg:min-h-0 px-8">
                <div className="w-full max-w-lg">
                  <div className="text-center mb-8 fade-in-up">
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="absolute inset-0 pulse-glow">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-400/50 to-orange-400/50 rounded-full blur-2xl"></div>
                      </div>
                      <Send className="relative w-16 h-16 text-white drop-shadow-2xl" />
                      <div className="absolute -top-2 -right-2 rotate-sparkles">
                        <Sparkles className="w-6 h-6 text-amber-300" />
                      </div>
                    </div>

                    <h2
                      className="font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight"
                      style={{
                        textShadow:
                          "0 0 30px rgba(245, 158, 11, 0.8), 0 0 60px rgba(251, 146, 60, 0.6)",
                        background:
                          "linear-gradient(135deg, #f59e0b, #f97316, #eab308)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Confirma tu
                      <br />
                      Asistencia
                    </h2>

                    <p className="text-lg text-white/90 max-w-lg mx-auto mb-6 font-medium drop-shadow-lg">
                      Confirma antes del{" "}
                      <span className="font-bold text-amber-300">
                        {fechaLimiteRSVP.split(",")[0]}
                      </span>{" "}
                      para que podamos preparar la fiesta perfecta de {nombre}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl scale-in">
                    <div>
                      {error && (
                        <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-200 mb-4">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{error}</span>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-white font-medium mb-2 flex items-center gap-2">
                            <User className="w-4 h-4 text-amber-300" />
                            <span className="text-sm">Nombre Completo *</span>
                            {checkingExisting && (
                              <Loader2 className="w-3 h-3 animate-spin text-amber-300" />
                            )}
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all backdrop-blur-sm disabled:opacity-50 text-sm"
                            placeholder="Tu nombre completo"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-2 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-orange-300" />
                            <span className="text-sm">Teléfono</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all backdrop-blur-sm disabled:opacity-50 text-sm"
                            placeholder={telefono}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-white font-medium mb-2 flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-yellow-300" />
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
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all backdrop-blur-sm disabled:opacity-50 text-sm"
                          placeholder="Vegetariano, sin gluten, alergias, etc."
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-white font-medium mb-2 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-amber-300" />
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
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none backdrop-blur-sm disabled:opacity-50 text-sm"
                          placeholder={`Comparte tus mejores deseos para ${nombre}...`}
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl hover:scale-105"
                        style={{
                          boxShadow: loading
                            ? ""
                            : "0 0 30px rgba(245, 158, 11, 0.5)",
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

                      <div className="mt-4 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/20">
                        <p className="text-white/80 text-center text-xs">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          <strong>Fecha límite:</strong> {fechaLimiteRSVP}
                          <br />
                          <Phone className="inline w-3 h-3 mr-1 mt-1" />
                          Contacto: {telefono}
                          <br />
                          <span className="text-xs text-white/60 mt-1 block">
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
