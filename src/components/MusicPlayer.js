import React from "react";
import { motion } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioContext";

const MusicPlayer = ({ className = "", showVolumeControl = true }) => {
  // Obtener todo el estado y las funciones del contexto global
  const {
    isPlaying,
    isLoading,
    error,
    volume,
    isMuted,
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
  } = useAudio();

  // Si hay error, mostrar mensaje de error
  if (error) {
    return (
      <div
        className={`inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs ${className}`}
      >
        <Music size={14} className="mr-1" />
        <span className="text-xs">Audio Error</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Botón principal de Play/Pause */}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlayPause}
        disabled={isLoading}
        animate={
          !isPlaying && !isLoading
            ? {
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 4px 20px rgba(251, 191, 36, 0.5)",
                  "0 6px 30px rgba(251, 191, 36, 0.8)",
                  "0 4px 20px rgba(251, 191, 36, 0.5)",
                ],
              }
            : {}
        }
        transition={
          !isPlaying && !isLoading
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
        className={`flex items-center gap-1 px-3 py-1.5 text-yellow-900 text-sm font-bold rounded-full transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden ${
          isPlaying
            ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-[length:200%_100%] shadow-lg shadow-yellow-300/50"
            : isLoading
            ? "bg-yellow-400"
            : "bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 shadow-xl"
        }`}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {/* Efecto de brillo cuando está reproduciéndose */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Icono que rota cuando está reproduciéndose */}
        <motion.div
          animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
          transition={{
            duration: 2,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear",
          }}
        >
          {isLoading ? (
            <Music size={12} className="animate-spin" />
          ) : isPlaying ? (
            <Pause size={12} />
          ) : (
            <Play size={12} />
          )}
        </motion.div>

        {/* Texto que parpadea cuando está reproduciéndose */}
        <motion.span
          animate={isPlaying ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {isLoading ? "Cargando..." : isPlaying ? "PAUSE" : "PLAY"}
        </motion.span>
      </motion.button>

      {/* Controles de volumen (solo si showVolumeControl es true) */}
      {showVolumeControl && (
        <div className="hidden sm:flex items-center gap-1">
          {/* Botón de mute/unmute */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="text-yellow-600 hover:text-yellow-700 p-1 rounded-full transition-all duration-300"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            <motion.div
              animate={
                !isMuted && isPlaying ? { scale: [1, 1.1, 1] } : { scale: 1 }
              }
              transition={{
                duration: 0.8,
                repeat: !isMuted && isPlaying ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </motion.div>
          </motion.button>

          {/* Slider de volumen */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, 
                #f59e0b 0%, 
                #f59e0b ${(isMuted ? 0 : volume) * 100}%, 
                #e5e7eb ${(isMuted ? 0 : volume) * 100}%, 
                #e5e7eb 100%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
