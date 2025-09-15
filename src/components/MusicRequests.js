import { useState, useEffect } from "react";
import {
  Music,
  Heart,
  Send,
  Headphones,
  Loader2,
  AlertCircle,
} from "lucide-react";

const supabase = {
  from: (table) => ({
    select: (columns) => ({
      order: (column, options) => ({
        limit: (count) => ({
          then: (resolve) => {
            resolve({
              data: [
                {
                  id: 1,
                  song_name: "Su Florencia",
                  artist_name: "Marylin",
                  message: "Esta canción me recuerda a mis amigas",
                  created_at: new Date().toISOString(),
                },
                {
                  id: 2,
                  song_name: "Soy cordobés",
                  artist_name: "Rodrigo",
                  message: null,
                  created_at: new Date(Date.now() - 3600000).toISOString(),
                },
              ],
              error: null,
            });
          },
        }),
      }),
    }),
    insert: (data) => ({
      select: () => ({
        then: (resolve) => {
          const newSong = {
            id: Date.now(),
            ...data[0],
            created_at: new Date().toISOString(),
          };
          resolve({
            data: [newSong],
            error: null,
          });
        },
      }),
    }),
  }),
};

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

  const handleSubmit = async () => {
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

      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting song:", error);
      setError(
        "Hubo un error al enviar tu solicitud. Por favor intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const getSongsCountText = (count) => {
    if (count === 0) return "0 canciones";
    if (count === 1) return "1 canción";
    return `${count} canciones`;
  };

  const scrollToFormSection = () => {
    const element = document.getElementById("mobile-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Estilos CSS inline */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .message-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #ff6b6b #f5f5f5;
          }
          .message-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .message-scrollbar::-webkit-scrollbar-track {
            background: #f5f5f5;
            border-radius: 10px;
          }
          .message-scrollbar::-webkit-scrollbar-thumb {
            background: #ff6b6b;
            border-radius: 10px;
          }
          .message-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #f44336;
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
        `,
        }}
      />

      {/* LAYOUT MÓVIL */}
      <div className="lg:hidden">
        {/* Primera sección: Hero con imagen de fondo (100vh) */}
        <div
          className="relative h-screen w-full flex items-center justify-center"
          style={{
            backgroundImage: `url('/assets/background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay oscuro */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-indigo-900/80"></div> */}

          {/* Contenido del hero */}
          <div className="relative z-10 text-center max-w-lg mx-auto px-6">
            {/* Icono musical animado */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400/50 to-purple-400/50 rounded-full blur-2xl animate-pulse"></div>
              </div>
              <Music className="w-12 h-12 text-white relative z-10" />
            </div>

            {/* Título principal */}
            <h2
              className="font-bold text-4xl sm:text-5xl text-white mb-6 leading-tight"
              style={{
                textShadow: "0 0 30px rgba(236, 72, 153, 0.8)",
                background:
                  "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pide tu Canción
              <br />
              <span className="text-3xl sm:text-4xl">Favorita</span>
            </h2>

            {/* Descripción */}
            <p className="text-lg text-white/90 mb-8 font-medium drop-shadow-lg">
              Ayúdanos a crear la playlist perfecta
              <br />
              ¡Tu canción favorita puede ser la que haga bailar a todos!
            </p>

            {/* Botón CTA y flecha */}
            <div className="flex flex-col items-center">
              {/* Indicador visual de scroll */}
              <div className="mt-6 animate-bounce">
                <svg
                  className="w-6 h-6 text-white/60"
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
        </div>

        {/* Segunda sección: Formulario (100vh) */}
        <div
          id="mobile-form-section"
          className="h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center"
        >
          <div className="w-full max-w-lg px-6">
            {!showForm ? (
              /* Vista inicial con botón y lista de canciones */
              <div className="space-y-6">
                {/* Botón principal para mostrar formulario */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-3">
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20  bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-bold text-lg text-white shadow-2xl overflow-hidden hover:scale-105 transition-transform"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <Music className="w-5 h-5" />
                        Agregar Mi Canción
                      </div>
                    </button>
                  </div>
                </div>

                {/* Contador de canciones */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                    <Headphones className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">
                      {getSongsCountText(dbSongs.length)} agregadas
                    </span>
                  </div>
                </div>

                {/* Lista de canciones recientes */}
                {dbSongs.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                    <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      Últimas Canciones
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto message-scrollbar">
                      {dbSongs.slice(0, 8).map((song, index) => (
                        <div
                          key={song.id}
                          className="flex items-center gap-2 p-3 bg-white/5 rounded-lg transition-opacity duration-300 fade-in-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate text-sm">
                              {song.song_name}
                            </p>
                            {song.artist_name && (
                              <p className="text-purple-200 text-xs truncate">
                                {song.artist_name}
                              </p>
                            )}
                            {song.message && (
                              <p className="text-gray-300 text-xs truncate italic mt-1">
                                {song.message}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Formulario de petición de canción */
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 relative shadow-2xl">
                {/* Botón cerrar */}
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all text-sm hover:rotate-90"
                >
                  ✕
                </button>

                {/* Título del formulario */}
                <div className="mb-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Tu Canción Favorita
                  </h3>
                </div>

                {!submitted ? (
                  /* Campos del formulario */
                  <div className="space-y-4">
                    {/* Mensaje de error */}
                    {error && (
                      <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-200">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs">{error}</span>
                      </div>
                    )}

                    {/* Campo nombre de canción */}
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Nombre de la Canción *
                      </label>
                      <input
                        type="text"
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-sm"
                        placeholder="Ej: Soy Cordobés"
                        disabled={loading}
                        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                      />
                    </div>

                    {/* Campo artista */}
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Artista
                      </label>
                      <input
                        type="text"
                        value={artistRequest}
                        onChange={(e) => setArtistRequest(e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-sm"
                        placeholder="Ej: Rodrigo"
                        disabled={loading}
                        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                      />
                    </div>

                    {/* Campo mensaje */}
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Mensaje Especial (Opcional)
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none text-sm"
                        placeholder="¿Por qué es especial esta canción?"
                        disabled={loading}
                      />
                    </div>

                    {/* Botón enviar */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading || !songRequest.trim()}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {loading ? "Enviando..." : "¡Agregar a la Playlist!"}
                    </button>
                  </div>
                ) : (
                  /* Mensaje de éxito */
                  <div className="text-center py-4">
                    <Heart className="w-12 h-12 text-pink-400 mx-auto mb-3 animate-pulse" />
                    <h4 className="text-white font-bold text-lg mb-2">
                      ¡Canción Agregada! 🎉
                    </h4>
                    <p className="text-purple-200 text-sm">
                      Tu canción ya está en la lista. ¡Esperamos que suene
                      durante la fiesta! 💫
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LAYOUT DESKTOP - Mantiene el diseño original */}
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
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900"></div>

        {/* Contenido principal */}
        <div className="relative z-10 min-h-screen">
          <div className="w-full mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
              {/* Lado izquierdo - Hero */}
              <div className="flex items-center justify-center">
                <div className="text-center lg:text-left lg:pl-12">
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="absolute inset-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-pink-400/50 to-purple-400/50 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    <Music className="w-12 h-12 text-white relative z-10" />
                  </div>

                  <h2
                    className="font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
                    style={{
                      textShadow: "0 0 30px rgba(236, 72, 153, 0.8)",
                      background:
                        "linear-gradient(135deg, #ec4899, #a855f7, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
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
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full px-8 py-4 font-bold text-xl text-white shadow-2xl hover:scale-105 transition-transform border border-white/20"
                        >
                          <Music className="w-6 h-6" />
                          <span>Agregar Mi Canción</span>
                        </button>
                      </div>

                      <div className="text-center">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
                          <Headphones className="w-6 h-6 text-white" />
                          <span className="text-white font-semibold text-xl">
                            {getSongsCountText(dbSongs.length)} agregadas
                          </span>
                        </div>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                          <Music className="w-6 h-6" />
                          Canciones Solicitadas
                        </h3>

                        {loadingSongs ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-8 h-8 animate-spin text-white" />
                          </div>
                        ) : dbSongs.length > 0 ? (
                          <div
                            className="space-y-3 overflow-y-auto message-scrollbar pr-2"
                            style={{ height: "240px" }}
                          >
                            {dbSongs.map((song, index) => (
                              <div
                                key={song.id}
                                className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="flex items-start gap-3">
                                  <Music className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1 group-hover:text-purple-300 transition-colors" />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-white truncate group-hover:text-purple-200 transition-colors">
                                      {song.song_name}
                                    </p>
                                    {song.artist_name && (
                                      <p className="text-sm text-purple-200 truncate">
                                        {song.artist_name}
                                      </p>
                                    )}
                                    {song.message && (
                                      <div
                                        className="text-xs text-gray-300 mt-1 italic message-scrollbar overflow-y-auto"
                                        style={{ maxHeight: "40px" }}
                                        title={song.message}
                                      >
                                        {song.message}
                                      </div>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">
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
                            <Music className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <p className="text-white/60">
                              Aún no hay canciones solicitadas. ¡Sé el primero!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative shadow-2xl">
                      <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all text-xl hover:rotate-90"
                      >
                        ✕
                      </button>

                      <div className="mb-6">
                        <h3 className="text-white font-bold text-2xl flex items-center gap-3">
                          <Music className="w-8 h-8" />
                          Solicita una Canción
                        </h3>
                      </div>

                      {!submitted ? (
                        <div className="space-y-6">
                          {error && (
                            <div className="p-4 bg-red-500/20 border border-red-400/50 rounded-xl flex items-center gap-2 text-red-200">
                              <AlertCircle className="w-5 h-5" />
                              <span>{error}</span>
                            </div>
                          )}

                          <div>
                            <label className="block text-white font-medium mb-2">
                              Nombre de la Canción *
                            </label>
                            <input
                              type="text"
                              value={songRequest}
                              onChange={(e) => setSongRequest(e.target.value)}
                              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                              placeholder="Ej: Soy Cordobés"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
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
                              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                              placeholder="Ej: Rodrigo"
                              disabled={loading}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSubmit()
                              }
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
                              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                              placeholder="¿Por qué es especial esta canción para ti?"
                              disabled={loading}
                            />
                          </div>

                          <button
                            onClick={handleSubmit}
                            disabled={loading || !songRequest.trim()}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-105"
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
                          <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-pulse" />
                          <h4 className="text-white font-bold text-2xl mb-3">
                            ¡Canción Agregada Exitosamente! 🎉
                          </h4>
                          <p className="text-purple-200 mb-4">
                            Tu canción aparece ahora en la lista. ¡Esperamos que
                            suene durante la fiesta! 💫
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
