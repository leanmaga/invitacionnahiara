"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Crown,
  Sparkles,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import { useQuinceaneraConfig } from "@/hooks/useQuinceaneraConfig";
import AnimatedButterflies from "./AnimatedButterflies";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const {
    nombre,
    telefono,
    whatsapp,
    fechaEvento,
    horaEvento,
    lugar,
    direccion,
    instagramUser,
    facebookPage,
    nombreFamilia,
  } = useQuinceaneraConfig();

  // Solo ejecutar en el cliente para evitar errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const whatsappLink = `https://wa.me/${whatsapp.replace(
    /[^0-9]/g,
    ""
  )}?text=Hola! Te escribo por la invitación de los 15 de ${nombre}`;

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
      <AnimatedButterflies
        count={20}
        animationDuration={4}
        delayBetweenButterflies={0.3}
      />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Crown className="w-12 h-12 mx-auto text-gold-400 mb-4" />
          <h2 className="font-coockie text-4xl md:text-5xl font-bold text-white mb-4">
            {nombre}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Gracias por ser parte de este momento tan especial en mi vida.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="font-serif text-xl font-bold mb-4 text-quince-300">
              Contacto
            </h3>
            <div className="space-y-3 text-gray-300">
              <p className="font-medium">{nombreFamilia}</p>

              {telefono && (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4 text-quince-400" />
                  <span>{telefono}</span>
                </div>
              )}

              {whatsapp && (
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-serif text-xl font-bold mb-4 text-quince-300">
              Detalles del Evento
            </h3>
            <div className="space-y-2 text-gray-300">
              <p className="font-medium">{fechaEvento}</p>
              <p>{horaEvento}</p>
              <p className="font-medium">{lugar}</p>
              <p className="text-sm">{direccion}</p>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h3 className="font-serif text-xl font-bold mb-4 text-quince-300">
              Sígueme
            </h3>
            <div className="flex gap-4 justify-center md:justify-end">
              {instagramUser && (
                <motion.a
                  href={`https://instagram.com/${instagramUser}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
              )}

              {facebookPage && (
                <motion.a
                  href={`https://facebook.com/${facebookPage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
              )}
            </div>

            {instagramUser && (
              <p className="text-sm text-gray-400 mt-2">@{instagramUser}</p>
            )}
          </motion.div>
        </div>

        {/* Decorative separator */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-quince-400 to-transparent w-32"></div>
          <Sparkles className="mx-4 text-gold-400 w-6 h-6" />
          <div className="h-px bg-gradient-to-r from-transparent via-quince-400 to-transparent w-32"></div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">
            Una princesa no necesita ser salvada. Ella puede salvarse a sí
            misma.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-quince-400" />
            <span>
              para {nombre} • {new Date().getFullYear()}
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
