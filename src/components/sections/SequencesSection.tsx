import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Cancion {
  title: string;
  url: string;
  format: string;
}

interface SequencesSectionProps {
  tracks: Cancion[] | null; // puede ser null mientras carga
  currentTrack: Cancion | null;
  isPlaying: boolean;
  onTrackSelect: (track: Cancion) => void;
}

export const SequencesSection = ({
  tracks,
  currentTrack,
  isPlaying,
  onTrackSelect,
}: SequencesSectionProps) => {
  const isCurrentTrack = (track: Cancion) => currentTrack?.url === track.url;

  // Mientras no haya canciones, mostramos un mensaje de carga
  if (!tracks) {
    return <p className="p-4 text-center">Cargando canciones...</p>;
  }

  if (tracks.length === 0) {
    return <p className="p-4 text-center">No hay canciones disponibles.</p>;
  }

  return (
    <div className="p-4 space-y-6 pb-32">
      <h2 className="text-lg font-semibold">Todas las Secuencias</h2>

      <div className="grid gap-3">
        {tracks.map((track) => {
          // Quitamos el último sufijo y reemplazamos "_" por espacio
          const cleanTitle = track.title.split("_").slice(0, -1).join(" ");

          return (
            <div
              key={track.url}
              className="flex items-center space-x-3 p-3 rounded-xl bg-card/50 hover:bg-card transition-colors cursor-pointer group"
              onClick={() => onTrackSelect(track)}
            >
              {/* Placeholder de ícono */}
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center text-white font-bold">
                🎵
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{cleanTitle}</h3>
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="h-3 w-3" />
              </Button>

              {isCurrentTrack(track) && isPlaying && (
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
