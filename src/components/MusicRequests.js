"use client";

import { useState, useEffect } from "react";
import {
  Music,
  Heart,
  Send,
  Headphones,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function MusicRequests() {
  const [songRequest, setSongRequest] = useState("");
  const [artistRequest, setArtistRequest] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [dbSongs, setDbSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

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

      if (error) {
        console.error("Error loading songs:", error);
        throw error;
      }

      console.log("Canciones cargadas:", data);
      setDbSongs(data || []);
    } catch (error) {
      console.error("Error loading songs:", error);
      // En caso de error, mostrar datos vacíos en lugar de fallar completamente
      setDbSongs([]);
    } finally {
      setLoadingSongs(false);
    }
  };

  const handleSubmit = async () => {
    if (!songRequest.trim()) return;

    try {
      setLoading(true);
      setError("");

      console.log("Enviando canción:", {
        song_name: songRequest.trim(),
        artist_name: artistRequest.trim() || null,
        message: message.trim() || null,
      });

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
        console.error("Error de Supabase:", error);
        throw error;
      }

      console.log("Canción guardada exitosamente:", data);

      if (data && data[0]) {
        // Agregar la nueva canción al inicio de la lista
        setDbSongs((prev) => [data[0], ...prev]);
      }

      setSubmitted(true);
      setSongRequest("");
      setArtistRequest("");
      setMessage("");

      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setIsFlipped(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting song:", error);
      let errorMessage =
        "Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.";

      if (error.message.includes("policy")) {
        errorMessage = "Error de permisos en la base de datos";
      } else if (error.message.includes("network")) {
        errorMessage = "Error de conexión a internet";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getSongsCountText = (count) => {
    if (count === 0) return "0 canciones";
    if (count === 1) return "1 canción";
    return `${count} canciones`;
  };

  const handleShowForm = () => {
    console.log("Mostrando formulario...", { showForm, isFlipped });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    console.log("Cerrando formulario...", { showForm, isFlipped });
    setShowForm(false);
  };

  const handleFlipBack = () => {
    console.log("Volviendo atrás...", { showForm, isFlipped });
    setIsFlipped(false);
    setShowForm(false);
  };

  return (
    <div className="relative">
      {/* Estilos CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .message-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #f59e0b #fef3c7;
          }
          .message-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .message-scrollbar::-webkit-scrollbar-track {
            background: #fef3c7;
            border-radius: 10px;
          }
          .message-scrollbar::-webkit-scrollbar-thumb {
            background: #f59e0b;
            border-radius: 10px;
          }
          .message-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #d97706;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-in-up {
            animation: fadeInUp 0.3s ease-out forwards;
          }

          /* Efecto 3D Flip Card - Corregido */
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

          /* Control de pointer-events basado en estado */
          .flip-card:not(.flipped) .flip-card-front {
            pointer-events: auto;
            z-index: 10;
          }
          
          .flip-card:not(.flipped) .flip-card-back {
            pointer-events: none;
            z-index: 1;
          }
          
          .flip-card.flipped .flip-card-front {
            pointer-events: none;
            z-index: 1;
          }
          
          .flip-card.flipped .flip-card-back {
            pointer-events: auto;
            z-index: 10;
          }

          .flip-card.flipped .flip-card-back * {
            pointer-events: auto;
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

          .rotate-sparkles {
            animation: rotateSpark 4s linear infinite;
          }

          @keyframes rotateSpark {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `,
        }}
      />

      {/* LAYOUT MÓVIL */}
      <div className="lg:hidden">
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">
            {/* FRONT: Imagen con botón */}
            <div className="flip-card-front">
              <div
                className="relative h-screen w-full flex items-center justify-center"
                style={{
                  backgroundImage: `url('/assets/background.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-amber-800/30 to-yellow-700/40"></div>

                <div className="relative z-10 text-center max-w-lg mx-auto px-6">
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="absolute inset-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/50 to-amber-500/50 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    <Music className="w-12 h-12 text-yellow-100 relative z-10" />
                    <div className="absolute -top-2 -right-2 rotate-sparkles">
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </div>
                  </div>

                  <h2
                    className="font-bold text-4xl sm:text-5xl text-yellow-100 mb-6 leading-tight"
                    style={{
                      textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    Pide tu Canción
                    <br />
                    <span className="text-3xl sm:text-4xl">Favorita</span>
                  </h2>

                  <p className="text-lg text-yellow-100/90 mb-12 font-medium drop-shadow-lg">
                    Ayúdanos a crear la playlist perfecta
                    <br />
                    ¡Tu canción favorita puede ser la que haga bailar a todos!
                  </p>

                  {/* Botón dorado para voltear la tarjeta */}
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="golden-button text-yellow-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center gap-3 mx-auto"
                  >
                    <Music className="w-6 h-6" />
                    Agregar Mi Canción
                  </button>
                </div>
              </div>
            </div>

            {/* BACK: Formulario y lista */}
            <div className="flip-card-back">
              <div className="h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-lg px-6 py-8">
                  {!showForm ? (
                    /* Vista inicial con botón y lista de canciones */
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-yellow-800 font-bold text-lg flex items-center gap-2">
                          <Music className="w-5 h-5" />
                          Playlist de la Fiesta
                        </h3>
                        {/* Botón para volver */}
                        <button
                          onClick={handleFlipBack}
                          className="clickable text-yellow-600 hover:text-yellow-800 transition-colors"
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

                      {/* Botón principal para mostrar formulario */}
                      <div className="text-center">
                        <button
                          onClick={handleShowForm}
                          className="clickable inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-full px-6 py-3 font-bold text-lg text-yellow-900 shadow-2xl hover:scale-105 transition-transform"
                        >
                          <Music className="w-5 h-5" />
                          Agregar Mi Canción
                        </button>
                      </div>

                      {/* Contador de canciones */}
                      <div className="text-center">
                        <div className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-300/40">
                          <Headphones className="w-5 h-5 text-yellow-700" />
                          <span className="text-yellow-800 font-semibold">
                            {loadingSongs
                              ? "Cargando..."
                              : getSongsCountText(dbSongs.length)}{" "}
                            agregadas
                          </span>
                        </div>
                      </div>

                      {/* Lista de canciones recientes */}
                      {loadingSongs ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-8 h-8 animate-spin text-yellow-600" />
                        </div>
                      ) : dbSongs.length > 0 ? (
                        <div className="bg-white/40 backdrop-blur-sm border border-yellow-300/40 rounded-2xl p-4">
                          <h4 className="text-yellow-800 font-bold text-sm mb-3 flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            Últimas Canciones
                          </h4>
                          <div className="space-y-2 max-h-60 overflow-y-auto message-scrollbar">
                            {dbSongs.slice(0, 8).map((song, index) => (
                              <div
                                key={song.id}
                                className="flex items-center gap-2 p-3 bg-white/30 rounded-lg transition-opacity duration-300 fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-yellow-900 font-medium truncate text-sm">
                                    {song.song_name}
                                  </p>
                                  {song.artist_name && (
                                    <p className="text-yellow-700 text-xs truncate">
                                      {song.artist_name}
                                    </p>
                                  )}
                                  {song.message && (
                                    <p className="text-yellow-600 text-xs truncate italic mt-1">
                                      {song.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Music className="w-12 h-12 text-yellow-400/60 mx-auto mb-4" />
                          <p className="text-yellow-600">
                            Aún no hay canciones solicitadas. ¡Sé el primero!
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Formulario de petición de canción */
                    <div className="bg-white/60 backdrop-blur-xl border border-yellow-300/40 rounded-3xl p-6 relative shadow-2xl">
                      {/* Botón cerrar */}
                      <button
                        onClick={handleCloseForm}
                        className="clickable absolute top-4 right-4 w-8 h-8 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center text-yellow-800 transition-all text-sm hover:rotate-90"
                      >
                        ✕
                      </button>

                      {/* Título del formulario */}
                      <div className="mb-4">
                        <h3 className="text-yellow-800 font-bold text-lg flex items-center gap-2">
                          <Music className="w-5 h-5" />
                          Tu Canción Favorita
                        </h3>
                      </div>

                      {!submitted ? (
                        /* Campos del formulario */
                        <div className="space-y-4">
                          {/* Mensaje de error */}
                          {error && (
                            <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-700">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs">{error}</span>
                            </div>
                          )}

                          {/* Campo nombre de canción */}
                          <div>
                            <label className="block text-yellow-800 font-medium mb-2 text-sm">
                              Nombre de la Canción *
                            </label>
                            <input
                              type="text"
                              value={songRequest}
                              onChange={(e) => setSongRequest(e.target.value)}
                              className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                              placeholder="Ej: Soy Cordobés"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
                            />
                          </div>

                          {/* Campo artista */}
                          <div>
                            <label className="block text-yellow-800 font-medium mb-2 text-sm">
                              Artista
                            </label>
                            <input
                              type="text"
                              value={artistRequest}
                              onChange={(e) => setArtistRequest(e.target.value)}
                              className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm"
                              placeholder="Ej: Rodrigo"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
                            />
                          </div>

                          {/* Campo mensaje */}
                          <div>
                            <label className="block text-yellow-800 font-medium mb-2 text-sm">
                              Mensaje Especial (Opcional)
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none text-sm"
                              placeholder="¿Por qué es especial esta canción?"
                              disabled={loading}
                            />
                          </div>

                          {/* Botón enviar */}
                          <button
                            onClick={handleSubmit}
                            disabled={loading || !songRequest.trim()}
                            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-yellow-900 px-4 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105"
                          >
                            {loading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                            {loading
                              ? "Enviando..."
                              : "¡Agregar a la Playlist!"}
                          </button>
                        </div>
                      ) : (
                        /* Mensaje de éxito */
                        <div className="text-center py-4">
                          <Heart className="w-12 h-12 text-yellow-600 mx-auto mb-3 animate-pulse" />
                          <h4 className="text-yellow-800 font-bold text-lg mb-2">
                            ¡Canción Agregada!
                          </h4>
                          <p className="text-yellow-700 text-sm">
                            Tu canción ya está en la lista. ¡Esperamos que suene
                            durante la fiesta!
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYOUT DESKTOP */}
      <div className="hidden lg:block relative min-h-screen overflow-hidden">
        {/* Imagen de fondo - Mitad izquierda */}
        <div className="absolute inset-0 lg:w-1/2 lg:left-0 lg:inset-y-0">
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

        {/* Fondo degradado - Mitad derecha */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100"></div>

        {/* Contenido principal */}
        <div className="relative z-10 min-h-screen">
          <div className="w-full mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
              {/* Lado izquierdo - Hero */}
              <div className="flex items-center justify-center">
                <div className="text-center lg:text-left lg:pl-12">
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="absolute inset-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/50 to-amber-500/50 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    <Music className="w-12 h-12 text-white relative z-10" />
                    <div className="absolute -top-2 -right-2 rotate-sparkles">
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </div>
                  </div>

                  <h2
                    className="font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
                    style={{
                      textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    Pide tu Canción
                    <br />
                    <span className="text-4xl md:text-5xl lg:text-6xl">
                      Favorita
                    </span>
                  </h2>

                  <p className="text-xl text-white/90 max-w-lg mx-auto lg:mx-0 mb-8 font-medium drop-shadow-lg">
                    Ayúdanos a crear la playlist perfecta
                    <br />
                    ¡Tu canción favorita puede ser la que haga bailar a todos!
                  </p>
                </div>
              </div>

              {/* Lado derecho - Interactivo */}
              <div className="flex items-center justify-center py-12">
                <div className="w-full max-w-lg">
                  {!showForm ? (
                    <div className="space-y-8">
                      <div className="text-center">
                        <button
                          onClick={handleShowForm}
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-full px-8 py-4 font-bold text-xl text-yellow-900 shadow-2xl hover:scale-105 transition-transform border border-yellow-300/40"
                        >
                          <Music className="w-6 h-6" />
                          <span>Agregar Mi Canción</span>
                        </button>
                      </div>

                      <div className="text-center">
                        <div className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-sm rounded-full px-8 py-4 border border-yellow-300/40">
                          <Headphones className="w-6 h-6 text-yellow-700" />
                          <span className="text-yellow-800 font-semibold text-xl">
                            {loadingSongs
                              ? "Cargando..."
                              : getSongsCountText(dbSongs.length)}{" "}
                            agregadas
                          </span>
                        </div>
                      </div>

                      <div className="bg-white/40 backdrop-blur-sm border border-yellow-300/40 rounded-2xl p-6">
                        <h3 className="text-yellow-800 font-bold text-xl mb-4 flex items-center gap-2">
                          <Music className="w-6 h-6" />
                          Canciones Solicitadas
                        </h3>

                        {loadingSongs ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin text-yellow-600" />
                          </div>
                        ) : dbSongs.length > 0 ? (
                          <div
                            className="space-y-3 overflow-y-auto message-scrollbar pr-2"
                            style={{ height: "240px" }}
                          >
                            {dbSongs.map((song, index) => (
                              <div
                                key={song.id}
                                className="p-3 bg-white/30 rounded-xl hover:bg-white/50 transition-all cursor-pointer group fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="flex items-start gap-3">
                                  <Music className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1 group-hover:text-yellow-700 transition-colors" />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-yellow-900 truncate group-hover:text-yellow-800 transition-colors">
                                      {song.song_name}
                                    </p>
                                    {song.artist_name && (
                                      <p className="text-sm text-yellow-700 truncate">
                                        {song.artist_name}
                                      </p>
                                    )}
                                    {song.message && (
                                      <div
                                        className="text-xs text-yellow-600 mt-1 italic message-scrollbar overflow-y-auto"
                                        style={{ maxHeight: "40px" }}
                                        title={song.message}
                                      >
                                        {song.message}
                                      </div>
                                    )}
                                    <p className="text-xs text-yellow-500 mt-1">
                                      {new Date(
                                        song.created_at
                                      ).toLocaleDateString("es-ES", {
                                        day: "numeric",
                                        month: "short",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Music className="w-12 h-12 text-yellow-400/60 mx-auto mb-4" />
                            <p className="text-yellow-600">
                              Aún no hay canciones solicitadas. ¡Sé el primero!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/60 backdrop-blur-xl border border-yellow-300/40 rounded-3xl p-8 relative shadow-2xl">
                      <button
                        onClick={handleCloseForm}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center text-yellow-800 transition-all text-xl hover:rotate-90"
                      >
                        ✕
                      </button>

                      <div className="mb-6">
                        <h3 className="text-yellow-800 font-bold text-2xl flex items-center gap-3">
                          <Music className="w-8 h-8" />
                          Solicita una Canción
                        </h3>
                      </div>

                      {!submitted ? (
                        <div className="space-y-6">
                          {error && (
                            <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-700">
                              <AlertCircle className="w-5 h-5" />
                              <span>{error}</span>
                            </div>
                          )}

                          <div>
                            <label className="block text-yellow-800 font-medium mb-2">
                              Nombre de la Canción *
                            </label>
                            <input
                              type="text"
                              value={songRequest}
                              onChange={(e) => setSongRequest(e.target.value)}
                              className="w-full px-4 py-3 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                              placeholder="Ej: Soy Cordobés"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-yellow-800 font-medium mb-2">
                              Artista
                            </label>
                            <input
                              type="text"
                              value={artistRequest}
                              onChange={(e) => setArtistRequest(e.target.value)}
                              className="w-full px-4 py-3 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                              placeholder="Ej: Rodrigo"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-yellow-800 font-medium mb-2">
                              Mensaje Especial (Opcional)
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={3}
                              className="w-full px-4 py-3 bg-white/50 border border-yellow-300/50 rounded-xl text-yellow-900 placeholder-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none"
                              placeholder="¿Por qué es especial esta canción para ti?"
                              disabled={loading}
                            />
                          </div>

                          <button
                            onClick={handleSubmit}
                            disabled={loading || !songRequest.trim()}
                            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-yellow-900 px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-105"
                          >
                            {loading ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                              <Send className="w-6 h-6" />
                            )}
                            {loading ? "Enviando..." : "Enviar Solicitud"}
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Heart className="w-16 h-16 text-yellow-600 mx-auto mb-4 animate-pulse" />
                          <h4 className="text-yellow-800 font-bold text-2xl mb-3">
                            ¡Canción Agregada Exitosamente!
                          </h4>
                          <p className="text-yellow-700 mb-4">
                            Tu canción aparece ahora en la lista. ¡Esperamos que
                            suene durante la fiesta!
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
