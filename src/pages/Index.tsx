import { useEffect, useState } from "react";
import { NavigationSection } from "@/types/music";
import { MobileNavigation } from "@/components/MobileNavigation";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SequencesSection } from "@/components/sections/SequencesSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { MetronomeSection } from "@/components/sections/MetronomeSection";
import { mockTracks, mockEvents } from "@/data/mockData";
import { obtenerTodasLaseSecuencias } from "@/services/secuenciasService";

const Index = () => {
  const [activeSection, setActiveSection] =
    useState<NavigationSection>("sequences");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [canciones, setCanciones] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cargarCanciones = async () => {
      try {
        const data = await obtenerTodasLaseSecuencias();
        console.log(data);
        setCanciones(data);
        if (data.length > 0) setCurrentTrack(data[0]);
      } catch (error) {
        console.error("Error cargando canciones:", error);
      }
    };

    cargarCanciones();
  }, []); // Lógica de filtrado

  const filteredCanciones = canciones
    ? canciones.filter((track) =>
        track.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    const index = canciones.findIndex((t) => t.url === track.url);
    setCurrentTrackIndex(index);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!canciones || canciones.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % canciones.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(canciones[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!canciones || canciones.length === 0) return;
    const prevIndex =
      currentTrackIndex === 0 ? canciones.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(canciones[prevIndex]);
    setIsPlaying(true);
  };

  const handleEventSelect = (event: any) => {
    if (event.trackId) {
      const track = mockTracks.find((t) => t.id === event.trackId);
      if (track) {
        handleTrackSelect(track);
      }
    }
  };

  // **Agrega esta función para limpiar el título**
  const cleanTitle = (track) => {
    if (!track) return "";
    return track.title.split("_").slice(0, -1).join(" ");
  };

  // **Crea un nuevo objeto con el título limpio para el reproductor**
  const trackForPlayer = currentTrack
    ? {
        ...currentTrack,
        title: cleanTitle(currentTrack),
      }
    : null;

  const renderActiveSection = () => {
    switch (activeSection) {
      case "sequences":
        return (
          <div className="w-full max-w-lg mx-auto p-4 space-y-6 pb-60">
                       {" "}
            <div className="mb-4">
                           {" "}
              <input
                type="text"
                placeholder="Buscar canciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-xl bg-card/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder:text-gray-500"
              />
                         {" "}
            </div>
                       {" "}
            <SequencesSection
              tracks={filteredCanciones}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onTrackSelect={handleTrackSelect}
            />
                     {" "}
          </div>
        );
      case "schedule":
        return (
          <ScheduleSection
            events={mockEvents}
            onEventSelect={handleEventSelect}
          />
        );
      case "metronome":
        return <MetronomeSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col bg-orange-800">
           {" "}
      <main className="animate-fade-in flex-1 overflow-y-auto">
                {renderActiveSection()}     {" "}
      </main>
           {" "}
      {activeSection === "sequences" && trackForPlayer && (
        <div className="fixed bottom-16 left-0 right-0 z-40 px-4">
                   {" "}
          <MusicPlayer
            currentTrack={trackForPlayer} // Usa el nuevo objeto con el título limpio
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
                 {" "}
        </div>
      )}
           {" "}
      <MobileNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
         {" "}
    </div>
  );
};

export default Index;
