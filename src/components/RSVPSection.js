"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Phone,
  Utensils,
  Heart,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";

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

  // ⚠️ Validación de variables de entorno
  if (!whatsapp) {
    console.error(
      "❌ NEXT_PUBLIC_WHATSAPP_NUMBER no está configurado en .env.local"
    );
  }

  // 🔍 Función para verificar si ya existe una confirmación
  const checkExistingRSVP = async (name, phone) => {
    if (!name.trim()) return null;

    try {
      let query = supabase
        .from("rsvp_confirmations")
        .select("*")
        .ilike("name", name.trim());

      // Si también hay teléfono, verificar por teléfono también
      if (phone && phone.trim()) {
        const { data: phoneData } = await supabase
          .from("rsvp_confirmations")
          .select("*")
          .eq("phone", phone.trim());

        if (phoneData && phoneData.length > 0) {
          return phoneData[0];
        }
      }

      const { data, error } = await query;

      if (error) throw error;

      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error("Error checking existing RSVP:", error);
      return null;
    }
  };

  // 🔍 Verificar RSVP existente cuando cambia el nombre (con debounce)
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.name.trim().length >= 3) {
        setCheckingExisting(true);
        const existing = await checkExistingRSVP(formData.name, formData.phone);
        setExistingRSVP(existing);
        setCheckingExisting(false);

        // Si ya existe, mostrar como enviado
        if (existing) {
          setSubmitted(true);
        }
      } else {
        setExistingRSVP(null);
      }
    }, 1000); // Esperar 1 segundo después de que deje de escribir

    return () => clearTimeout(timeoutId);
  }, [formData.name, formData.phone]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Reset error y submitted cuando cambia el formulario
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

  const saveToDatabase = async (data) => {
    const { error } = await supabase.from("rsvp_confirmations").insert([
      {
        name: data.name,
        phone: data.phone || null,
        dietary_restrictions: data.dietary || null,
        message: data.message || null,
      },
    ]);

    if (error) throw error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si ya existe antes de enviar
    const existing = await checkExistingRSVP(formData.name, formData.phone);
    if (existing) {
      setExistingRSVP(existing);
      setSubmitted(true);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1. Guardar en base de datos
      await saveToDatabase(formData);

      // 2. Enviar por WhatsApp
      sendToWhatsApp(formData);

      // 3. Mostrar confirmación (SIN resetear después de 5 segundos)
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError(
        "Hubo un error al guardar la confirmación. El WhatsApp se abrirá de todas formas."
      );

      // Enviar por WhatsApp aunque falle la BD
      sendToWhatsApp(formData);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // 🎉 PANTALLA DE CONFIRMACIÓN (cuando submitted = true o existe RSVP)
  if (submitted || existingRSVP) {
    const rsvpData = existingRSVP || formData;
    const isExisting = !!existingRSVP;

    return (
      <section
        id="rsvp"
        className="py-20 bg-gradient-to-br from-quince-50 to-gold-50"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-12"
          >
            <div className="flex justify-center mb-6">
              {isExisting ? (
                <CheckCircle className="w-20 h-20 text-green-500" />
              ) : (
                <Heart className="w-20 h-20 text-quince-500" />
              )}
            </div>

            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
              {isExisting
                ? "¡Ya Confirmaste tu Asistencia!"
                : "¡Confirmación Enviada!"}
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              {isExisting
                ? `Hola ${rsvpData.name}, ya tienes confirmada tu asistencia a la quinceañera de ${nombre}. ¡Te esperamos!`
                : `Tu confirmación se envió por WhatsApp y se guardó en nuestro sistema. ¡No podemos esperar a celebrar contigo!`}
            </p>

            {/* Mostrar datos de la confirmación */}
            <div className="space-y-4 text-left max-w-md mx-auto mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5 text-quince-500" />
                <span>
                  <strong>Nombre:</strong> {rsvpData.name}
                </span>
              </div>

              {rsvpData.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span>
                    <strong>Teléfono:</strong> {rsvpData.phone}
                  </span>
                </div>
              )}

              {rsvpData.dietary_restrictions && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  <span>
                    <strong>Restricciones:</strong>{" "}
                    {rsvpData.dietary_restrictions}
                  </span>
                </div>
              )}

              {rsvpData.message && (
                <div className="flex items-start gap-3 text-gray-700">
                  <Heart className="w-5 h-5 text-pink-500 mt-1" />
                  <span>
                    <strong>Mensaje:</strong> {rsvpData.message}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Confirmación registrada exitosamente</span>
              </div>

              {!isExisting && (
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span>Enviado por WhatsApp</span>
                </div>
              )}
            </div>

            {/* Botón para modificar (opcional) */}
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
              className="mt-8 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Confirmar otra persona
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  // 📝 FORMULARIO PRINCIPAL (cuando submitted = false)
  return (
    <section
      id="rsvp"
      className="py-20 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Send className="w-12 h-12 mx-auto text-quince-500 mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Confirma tu Asistencia
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Por favor, confirma tu asistencia antes del{" "}
            {fechaLimiteRSVP.split(",")[0]} para que podamos preparar todo
            perfectamente para ti.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-xl flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-quince-500" />
                  Nombre Completo *
                  {checkingExisting && (
                    <Loader2 className="w-4 h-4 animate-spin text-quince-500" />
                  )}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-quince-500" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder={telefono}
                />
              </div>
            </div>

            {/* Dietary restrictions */}
            <div>
              <label className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-quince-500" />
                Restricciones Alimentarias
              </label>
              <input
                type="text"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Vegetariano, sin gluten, alergias, etc."
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-quince-500" />
                Mensaje Especial para {nombre}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                placeholder={`Comparte tus mejores deseos para ${nombre} en su día especial...`}
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-quince-500 to-quince-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Confirmar Asistencia
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-gradient-to-r from-gold-100 to-gold-200 rounded-2xl"
          >
            <p className="text-gray-700 text-center">
              <strong>Fecha límite para confirmar:</strong> {fechaLimiteRSVP}
              <br />
              Para preguntas, contacta a: {telefono}
              <br />
              <span className="text-sm text-gray-600">
                📱 Tu confirmación se enviará automáticamente por WhatsApp y se
                guardará en nuestro sistema
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
