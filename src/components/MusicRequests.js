"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Heart,
  Send,
  Headphones,
  Loader2,
  AlertCircle,
  Star,
  Sparkles,
  X,
  Plus,
  Volume2,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function MusicRequests() {
  const [songRequest, setSongRequest] = useState("");
  const [artistRequest, setArtistRequest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Estados para la base de datos
  const [dbSongs, setDbSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);

  // Función para obtener el texto del contador de canciones
  const getSongsCountText = (count) => {
    if (count === 0) return "0 canciones";
    if (count === 1) return "1 canción";
    return `${count} canciones`;
  };

  // Cargar canciones al montar el componente
  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      setLoadingSongs(true);
      const { data, error } = await supabase
        .from("song_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setDbSongs(data || []);
    } catch (error) {
      console.error("Error loading songs:", error);
    } finally {
      setLoadingSongs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songRequest.trim()) return;

    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("song_requests")
        .insert([
          {
            song_name: songRequest.trim(),
            artist_name: artistRequest.trim() || null,
            message: message.trim() || null,
            ip_address: null,
          },
        ])
        .select();

      if (error) {
        console.error("Error details:", error);
        throw error;
      }

      if (data && data[0]) {
        setDbSongs((prev) => [data[0], ...prev]);
      }

      setSubmitted(true);
      setSongRequest("");
      setArtistRequest("");
      setMessage("");

      // Cerrar formulario después de enviar
      setTimeout(() => {
        setShowForm(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting song:", error);

      let errorMessage = "Hubo un error al enviar tu solicitud. ";

      if (error.code === "PGRLS0001" || error.message?.includes("RLS")) {
        errorMessage +=
          "Error de permisos en la base de datos. Contacta al administrador.";
      } else if (error.code === "42501") {
        errorMessage += "Sin permisos para insertar datos.";
      } else if (error.message?.includes("JWT")) {
        errorMessage += "Error de autenticación con la base de datos.";
      } else {
        errorMessage += "Por favor intenta de nuevo.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="music" className="relative min-h-screen overflow-hidden">
      {/* Background image - Left 50% */}
      <div className="absolute inset-0 lg:w-1/2 lg:left-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url('/assets/background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* Desktop: K-pop inspired gradient on right 50% */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900"></div>

      {/* Mobile overlay */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-indigo-900/80"></div>

      {/* Floating K-pop themed particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const icons = [Heart, Star, Sparkles];
          const Icon = icons[i % icons.length];
          const colors = [
            "text-pink-300",
            "text-purple-300",
            "text-yellow-300",
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

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-0 min-h-screen lg:h-screen">
            {/* Left side - Title and intro (over image) */}
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center lg:text-left lg:pl-12"
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
                  className="relative inline-flex items-center justify-center mb-8"
                >
                  <div className="absolute inset-0 animate-pulse">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-400/50 to-purple-400/50 rounded-full blur-2xl"></div>
                  </div>
                  <Music className="relative w-20 h-20 text-white drop-shadow-2xl" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-3 -right-3"
                  >
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
                  style={{
                    textShadow:
                      "0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(168, 85, 247, 0.6)",
                    background:
                      "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Pide tu Canción
                  <br />
                  <span className="text-4xl md:text-5xl lg:text-6xl">
                    K-Favorita
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-xl text-white/90 max-w-lg mx-auto lg:mx-0 mb-8 font-medium drop-shadow-lg"
                >
                  🎵 Crea la playlist perfecta para los 15 de Nahiara
                  <br />
                  ¡Que suene tu canción favorita! ✨
                </motion.p>
              </motion.div>
            </div>

            {/* Right side - Interactive area (black gradient) */}
            <div className="flex items-center justify-center py-12 lg:py-0">
              <div className="w-full max-w-lg">
                <AnimatePresence mode="wait">
                  {!showForm ? (
                    <motion.div
                      key="main-buttons"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-8"
                    >
                      {/* Main CTA Button */}
                      <motion.button
                        onClick={() => setShowForm(true)}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 50px rgba(236, 72, 153, 0.8)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-full h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl font-bold text-xl text-white shadow-2xl overflow-hidden group"
                        style={{
                          boxShadow: "0 0 40px rgba(236, 72, 153, 0.6)",
                        }}
                      >
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          <Plus className="w-8 h-8" />
                          Agregar Mi Canción
                        </div>
                      </motion.button>

                      {/* Songs Counter */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                          <Volume2 className="w-6 h-6 text-purple-300" />
                          <span className="text-white font-semibold text-lg">
                            {getSongsCountText(dbSongs.length)} agregadas
                          </span>
                        </div>
                      </motion.div>

                      {/* Songs Preview */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                          <Headphones className="w-6 h-6 text-purple-300" />
                          Últimas Canciones
                        </h3>

                        {loadingSongs ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin text-purple-300" />
                          </div>
                        ) : dbSongs.length > 0 ? (
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {dbSongs.slice(0, 4).map((song, index) => (
                              <motion.div
                                key={song.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-medium truncate">
                                    {song.song_name}
                                  </p>
                                  {song.artist_name && (
                                    <p className="text-purple-200 text-sm truncate">
                                      {song.artist_name}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-white/60 text-center py-4">
                            ¡Sé el primero en agregar una canción! 🎤
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        bounce: 0.3,
                      }}
                      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
                    >
                      {/* Close button */}
                      <motion.button
                        onClick={() => setShowForm(false)}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>

                      <div className="mb-6">
                        <h3 className="text-white font-bold text-2xl flex items-center gap-3">
                          <Music className="w-8 h-8 text-purple-300" />
                          Tu Canción K-Pop
                        </h3>
                      </div>

                      {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-200"
                            >
                              <AlertCircle className="w-5 h-5" />
                              <span>{error}</span>
                            </motion.div>
                          )}

                          <div>
                            <label className="block text-white font-medium mb-2">
                              Nombre de la Canción *
                            </label>
                            <input
                              type="text"
                              value={songRequest}
                              onChange={(e) => setSongRequest(e.target.value)}
                              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                              placeholder="Ej: Dynamite, IDOL, etc..."
                              required
                              disabled={loading}
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">
                              Artista
                            </label>
                            <input
                              type="text"
                              value={artistRequest}
                              onChange={(e) => setArtistRequest(e.target.value)}
                              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm"
                              placeholder="Ej: BTS, BLACKPINK, etc..."
                              disabled={loading}
                            />
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-2">
                              Mensaje Especial (Opcional)
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none backdrop-blur-sm"
                              placeholder="¿Por qué es especial esta canción para Sofia?"
                              disabled={loading}
                            />
                          </div>

                          <motion.button
                            type="submit"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl"
                            style={{
                              boxShadow: loading
                                ? ""
                                : "0 0 30px rgba(236, 72, 153, 0.5)",
                            }}
                          >
                            {loading ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                              <Send className="w-6 h-6" />
                            )}
                            {loading
                              ? "Enviando..."
                              : "¡Agregar a la Playlist!"}
                          </motion.button>
                        </form>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-8"
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0],
                            }}
                            transition={{ duration: 0.6, repeat: 2 }}
                          >
                            <Heart className="w-20 h-20 text-pink-400 mx-auto mb-4" />
                          </motion.div>
                          <h4 className="text-white font-bold text-2xl mb-3">
                            ¡Canción Agregada! 🎉
                          </h4>
                          <p className="text-purple-200 mb-4">
                            Tu canción ya está en la playlist de Sofia.
                            ¡Esperamos que suene toda la noche! 💫
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
