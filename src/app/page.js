"use client";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import EventDetails from "@/components/EventDetails";
import DressCode from "@/components/DressCode";
import MusicRequests from "@/components/MusicRequests";
import LocationSection from "@/components/LocationSection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { AudioProvider } from "@/components/AudioContext";
import MasonryGallery from "@/components/MasonryGallery";

// ⭐ NUEVOS IMPORTS
import { LoadingProvider, useLoading } from "@/components/PageLoader";
import PageLoader from "@/components/PageLoader";

// ⭐ NUEVO: Componente del contenido principal
const MainContent = () => {
  const { isLoading } = useLoading();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full min-h-screen bg-gradient-to-br from-quince-50 via-white to-gold-50"
        >
          <Navigation />

          {/* Contenedor principal con control de ancho */}
          <main className="w-full overflow-x-hidden">
            <HeroSection />
            <CountdownSection />
            <EventDetails />
            <MasonryGallery /> {/* Tu galería ya modificada */}
            <DressCode />
            <LocationSection />
            <MusicRequests />
            <RSVPSection />
            <Footer />
          </main>
        </motion.div>
      )}
    </>
  );
};

export default function Home() {
  return (
    <LoadingProvider>
      <AudioProvider audioSrc="/IchikoAoba.mp3">
        <div className="min-h-screen w-full overflow-x-hidden">
          <MainContent />
        </div>
      </AudioProvider>
    </LoadingProvider>
  );
}
