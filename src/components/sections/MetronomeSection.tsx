import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Minus, Plus, Volume2 } from 'lucide-react';
import { MetronomeSettings } from '@/types/music';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface MetronomeSectionProps {}

export const MetronomeSection = ({}: MetronomeSectionProps) => {
  const [settings, setSettings] = useState<MetronomeSettings>({
    bpm: 120,
    timeSignature: { beats: 4, noteValue: 4 },
    isPlaying: false,
    volume: 0.8,
  });

  const [currentBeat, setCurrentBeat] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout>();
  const audioContextRef = useRef<AudioContext>();

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (settings.isPlaying) {
      const interval = 60000 / settings.bpm; // milliseconds per beat
      
      intervalRef.current = setInterval(() => {
        playClick();
        setCurrentBeat(prev => (prev % settings.timeSignature.beats) + 1);
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [settings.isPlaying, settings.bpm, settings.timeSignature.beats]);

  const playClick = () => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // Different frequency for first beat (downbeat)
    oscillator.frequency.value = currentBeat === 1 ? 800 : 600;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(settings.volume * 0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const togglePlay = () => {
    setSettings(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    if (!settings.isPlaying) {
      setCurrentBeat(1);
    }
  };

  const adjustBPM = (change: number) => {
    setSettings(prev => ({
      ...prev,
      bpm: Math.max(40, Math.min(208, prev.bpm + change))
    }));
  };

  const handleBPMChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, bpm: value[0] }));
  };

  const handleVolumeChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, volume: value[0] / 100 }));
  };

  const presetBPMs = [60, 80, 100, 120, 140, 160, 180];

  return (
    <div className="p-4 space-y-8 pb-32">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Metrónomo
        </h1>
        <p className="text-muted-foreground">
          Mantén el ritmo perfecto en tus prácticas
        </p>
      </div>

      {/* Main Metronome Display */}
      <div className="music-card text-center space-y-6">
        {/* BPM Display */}
        <div className="space-y-2">
          <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {settings.bpm}
          </div>
          <div className="text-sm text-muted-foreground">BPM</div>
        </div>

        {/* Beat Indicator */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: settings.timeSignature.beats }, (_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-150 ${
                currentBeat === i + 1 && settings.isPlaying
                  ? i === 0 
                    ? 'bg-primary shadow-medium animate-pulse-glow' 
                    : 'bg-accent shadow-soft animate-pulse'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Time Signature */}
        <div className="text-lg font-semibold">
          {settings.timeSignature.beats}/{settings.timeSignature.noteValue}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`btn-play mx-auto text-white transform transition-transform active:scale-95 ${
            settings.isPlaying ? 'animate-pulse-glow' : ''
          }`}
        >
          {settings.isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8 ml-1" />
          )}
        </button>
      </div>

      {/* BPM Controls */}
      <div className="space-y-4">
        <h3 className="font-semibold text-center">Ajustar Tempo</h3>
        
        {/* BPM Slider */}
        <div className="space-y-3">
          <Slider
            value={[settings.bpm]}
            onValueChange={handleBPMChange}
            min={40}
            max={208}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>40</span>
            <span>208</span>
          </div>
        </div>

        {/* BPM Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustBPM(-10)}
            className="w-10 h-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustBPM(-1)}
          >
            -1
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustBPM(1)}
          >
            +1
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustBPM(10)}
            className="w-10 h-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preset BPMs */}
      <div className="space-y-3">
        <h3 className="font-semibold text-center">Presets Comunes</h3>
        <div className="grid grid-cols-4 gap-2">
          {presetBPMs.map((bpm) => (
            <Button
              key={bpm}
              variant={settings.bpm === bpm ? "default" : "outline"}
              size="sm"
              onClick={() => setSettings(prev => ({ ...prev, bpm }))}
              className="text-xs"
            >
              {bpm}
            </Button>
          ))}
        </div>
      </div>

      {/* Volume Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Volumen</h3>
        </div>
        <Slider
          value={[settings.volume * 100]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Practice Tips */}
      <div className="music-card space-y-2">
        <h3 className="font-semibold text-sm">💡 Consejos de Práctica</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Comienza con un tempo lento y aumenta gradualmente</li>
          <li>• Usa el primer beat (más fuerte) como referencia</li>
          <li>• Practica escalas y ejercicios al tempo del metrónomo</li>
        </ul>
      </div>
    </div>
  );
};