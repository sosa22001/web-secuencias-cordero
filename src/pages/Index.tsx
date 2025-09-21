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

  useEffect(() => {
    const cargarCanciones = async () => {
      try {
        const data = await obtenerTodasLaseSecuencias(); // llama al endpoint /api/secuencias
        console.log(data);
        setCanciones(data);
        if (data.length > 0) setCurrentTrack(data[0]); // opcional: seleccionar la primera canción
      } catch (error) {
        console.error("Error cargando canciones:", error);
      }
    };

    cargarCanciones();
  }, []);

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    const index = mockTracks.findIndex((t) => t.id === track.id);
    setCurrentTrackIndex(index);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % mockTracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(mockTracks[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const prevIndex =
      currentTrackIndex === 0 ? mockTracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(mockTracks[prevIndex]);
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

  const renderActiveSection = () => {
    switch (activeSection) {
      case "sequences":
        return (
          <SequencesSection
            tracks={canciones}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackSelect}
          />
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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Main Content */}
      <main className="animate-fade-in">{renderActiveSection()}</main>

      {/* Music Player */}
      {currentTrack && (
        <MusicPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}

      {/* Bottom Navigation */}
      <MobileNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
  );
};

export default Index;
