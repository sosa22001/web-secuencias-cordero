export interface WeeklyEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number; // in minutes
  type: "sequence" | "live" | "workshop";
  trackId?: string;
}

export interface MetronomeSettings {
  bpm: number;
  timeSignature: {
    beats: number;
    noteValue: number;
  };
  isPlaying: boolean;
  volume: number;
}

export type NavigationSection = "sequences" | "schedule" | "metronome";
