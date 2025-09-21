import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Cancion {
  title: string;
  url: string;
  format: string;
}

interface MusicPlayerProps {
  currentTrack: Cancion | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const MusicPlayer = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}: MusicPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Actualiza tiempo y duración
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [currentTrack]);

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) audio.play().catch(console.error);
    else audio.pause();
  }, [isPlaying, currentTrack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (value[0] / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 mx-4 mb-2 w-screen mr-5 border-l-indigo-950">
      <div className="music-card p-4 animate-slide-up">
        {/* Track Info */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center text-white font-bold">
            🎵
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              Desconocido
            </p>
          </div>
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            {showVolumeSlider && (
              <div className="absolute bottom-12 right-0 w-24 p-2 glass-effect rounded-lg">
                <Slider
                  value={[volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  orientation="vertical"
                  className="h-20"
                />
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button size="sm" variant="ghost" onClick={onPrevious}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <button onClick={onPlayPause} className="btn-play text-white">
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </button>
          <Button size="sm" variant="ghost" onClick={onNext}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={currentTrack.url} />
    </div>
  );
};
