"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Phone,
  Utensils,
  Heart,
  Loader2,
  AlertCircle,
  CheckCircle,
  Star,
  Sparkles,
  Calendar,
  MessageSquare,
  Flower2,
  Sun,
} from "lucide-react";

// Mock hook para la demo
const useQuinceaneraConfig = () => ({
  nombre: "Sofia",
  whatsapp: "5493511234567",
  telefono: "(351) 123-4567",
  fechaLimiteRSVP: "15 de marzo, 2025",
});

// Mock supabase para la demo
const supabase = {
  from: () => ({
    select: () => ({
      ilike: () => ({ then: () => Promise.resolve({ data: [], error: null }) }),
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: [{}], error: null }),
    }),
  }),
};

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

  const { nombre, whatsapp, telefono, fechaLimiteRSVP } =
    useQuinceaneraConfig();

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

  // PANTALLA DE CONFIRMACIÓN
  if (submitted || existingRSVP) {
    const rsvpData = existingRSVP || formData;
    const isExisting = !!existingRSVP;

    return (
      <section id="rsvp" className="relative min-h-screen overflow-hidden">
        {/* Background image - Right 50% */}
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

        {/* Desktop: Beige gradient on left 50% */}
        <div className="absolute inset-0 lg:w-1/2 lg:right-1/2 bg-gradient-to-br from-amber-800 via-orange-800 to-yellow-700"></div>

        {/* Mobile overlay */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-amber-800/90 via-orange-800/90 to-yellow-700/90"></div>

        {/* Success particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const icons = [Heart, Flower2, Sun];
            const Icon = icons[i % icons.length];
            const colors = [
              "text-amber-200",
              "text-orange-200",
              "text-yellow-200",
            ];
            const color = colors[i % colors.length];

            return (
              <motion.div
                key={i}
                className={`absolute ${color}`}
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1200),
                  y:
                    typeof window !== "undefined"
                      ? window.innerHeight + 10
                      : 800,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 1, 0],
                  rotate: 360,
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1200),
                }}
                transition={{
                  duration: Math.random() * 8 + 12,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 8,
                }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-10 h-screen flex items-center">
          <div className="w-full h-full">
            <div className="grid lg:grid-cols-2 gap-0 h-full min-h-screen">
              {/* Left side - Success message */}
              <div className="flex items-center justify-center h-full min-h-screen lg:min-h-0 px-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-8">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isExisting ? (
                        <CheckCircle className="w-24 h-24 text-amber-400" />
                      ) : (
                        <Heart className="w-24 h-24 text-orange-400" />
                      )}
                    </motion.div>
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-bold text-5xl md:text-6xl text-amber-100 mb-6 leading-tight"
                    style={{
                      textShadow:
                        "0 0 30px rgba(245, 158, 11, 0.8), 0 0 60px rgba(251, 146, 60, 0.6)",
                    }}
                  >
                    {isExisting ? "¡Ya Confirmaste!" : "¡Confirmación Enviada!"}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl text-white/90 max-w-lg mx-auto mb-8 font-medium drop-shadow-lg"
                  >
                    {isExisting
                      ? `Hola ${rsvpData.name}, ya confirmaste tu asistencia para la fiesta de ${nombre}. ¡Te esperamos!`
                      : `Tu confirmación se envió por WhatsApp. ¡No podemos esperar a celebrar contigo en la fiesta de ${nombre}!`}
                  </motion.p>

                  {/* Confirmation details */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md mx-auto mb-8"
                  >
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3 text-white">
                        <User className="w-5 h-5 text-amber-400" />
                        <span>
                          <strong>Nombre:</strong> {rsvpData.name}
                        </span>
                      </div>

                      {rsvpData.phone && (
                        <div className="flex items-center gap-3 text-white">
                          <Phone className="w-5 h-5 text-orange-400" />
                          <span>
                            <strong>Teléfono:</strong> {rsvpData.phone}
                          </span>
                        </div>
                      )}

                      {(rsvpData.dietary_restrictions || rsvpData.dietary) && (
                        <div className="flex items-center gap-3 text-white">
                          <Utensils className="w-5 h-5 text-yellow-400" />
                          <span>
                            <strong>Restricciones:</strong>{" "}
                            {rsvpData.dietary_restrictions || rsvpData.dietary}
                          </span>
                        </div>
                      )}

                      {rsvpData.message && (
                        <div className="flex items-start gap-3 text-white">
                          <MessageSquare className="w-5 h-5 text-amber-400 mt-1" />
                          <span>
                            <strong>Mensaje:</strong> {rsvpData.message}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <motion.button
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-white/20 to-white/30 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/30"
                  >
                    Confirmar otra persona
                  </motion.button>
                </motion.div>
              </div>

              {/* Right side - Image space */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // FORMULARIO PRINCIPAL
  return (
    <section id="rsvp" className="relative min-h-screen overflow-hidden">
      {/* Background image - Right 50% */}
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

      {/* Desktop: Beige gradient on left 50% */}
      <div className="absolute inset-0 lg:w-1/2 lg:right-1/2 bg-gradient-to-br from-amber-800 via-orange-800 to-yellow-700"></div>

      {/* Mobile overlay */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-amber-800/90 via-orange-800/90 to-yellow-700/90"></div>

      {/* Floating particles - flores de loto, budas, corazones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const icons = [Heart, Flower2, Sun, Calendar];
          const Icon = icons[i % icons.length];
          const colors = [
            "text-amber-200",
            "text-orange-200",
            "text-yellow-200",
            "text-orange-100",
          ];
          const color = colors[i % colors.length];

          return (
            <motion.div
              key={i}
              className={`absolute ${color}`}
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
                y:
                  typeof window !== "undefined" ? window.innerHeight + 10 : 800,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                y: -50,
                opacity: [0, 1, 1, 0],
                rotate: 360,
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 8,
              }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 h-screen flex items-center">
        <div className="w-full h-full">
          <div className="grid lg:grid-cols-2 gap-0 h-full min-h-screen">
            {/* Left side - Form and title */}
            <div className="flex items-center justify-center h-full min-h-screen lg:min-h-0 px-8">
              <div className="w-full max-w-lg">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.3,
                      type: "spring",
                      bounce: 0.6,
                    }}
                    viewport={{ once: true }}
                    className="relative inline-flex items-center justify-center mb-6"
                  >
                    <div className="absolute inset-0 animate-pulse">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-400/50 to-orange-400/50 rounded-full blur-2xl"></div>
                    </div>
                    <Send className="relative w-16 h-16 text-white drop-shadow-2xl" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -top-2 -right-2"
                    >
                      <Sparkles className="w-6 h-6 text-amber-300" />
                    </motion.div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
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
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="text-lg text-white/90 max-w-lg mx-auto mb-6 font-medium drop-shadow-lg"
                  >
                    Confirma antes del{" "}
                    <span className="font-bold text-amber-300">
                      {fechaLimiteRSVP.split(",")[0]}
                    </span>{" "}
                    para que podamos preparar la fiesta perfecta de {nombre}
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
                >
                  <div>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-200 mb-4"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{error}</span>
                      </motion.div>
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

                    <motion.button
                      onClick={handleSubmit}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl"
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
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="mt-4 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/20"
                    >
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
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right side - Image space */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
