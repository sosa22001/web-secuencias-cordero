import { Track, WeeklyEvent } from '@/types/music';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Groove',
    artist: 'Luna Sessions',
    duration: 195, // 3:15
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // placeholder
    genre: 'Chill',
    bpm: 85,
  },
  {
    id: '2',
    title: 'Urban Pulse',
    artist: 'City Beats',
    duration: 240, // 4:00
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Electronic',
    bpm: 128,
  },
  {
    id: '3',
    title: 'Ethereal Dreams',
    artist: 'Ambient Collective',
    duration: 315, // 5:15
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Ambient',
    bpm: 72,
  },
  {
    id: '4',
    title: 'Rhythmic Flow',
    artist: 'Flow State',
    duration: 180, // 3:00
    cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Lo-fi',
    bpm: 95,
  },
  {
    id: '5',
    title: 'Cosmic Journey',
    artist: 'Space Harmony',
    duration: 270, // 4:30
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Synthwave',
    bpm: 110,
  },
  {
    id: '6',
    title: 'Ocean Waves',
    artist: 'Natural Sounds',
    duration: 420, // 7:00
    cover: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    genre: 'Nature',
    bpm: 60,
  },
];

export const mockEvents: WeeklyEvent[] = [
  {
    id: '1',
    title: 'Sesión de Chill Matutina',
    description: 'Comienza el día con música relajante y meditativa',
    date: new Date(),
    time: '08:00',
    duration: 60,
    type: 'sequence',
    trackId: '1',
  },
  {
    id: '2',
    title: 'Workshop de Producción',
    description: 'Aprende técnicas avanzadas de producción musical',
    date: new Date(),
    time: '15:00',
    duration: 120,
    type: 'workshop',
  },
  {
    id: '3',
    title: 'Set en Vivo - DJ Luna',
    description: 'Transmisión en vivo con música electrónica',
    date: new Date(),
    time: '20:00',
    duration: 90,
    type: 'live',
  },
  {
    id: '4',
    title: 'Ambient Night',
    description: 'Sesión nocturna de música ambiental para relajarse',
    date: new Date(Date.now() + 86400000), // tomorrow
    time: '22:00',
    duration: 180,
    type: 'sequence',
    trackId: '3',
  },
  {
    id: '5',
    title: 'Meditación Sonora',
    description: 'Sesión guiada de meditación con música natural',
    date: new Date(Date.now() + 172800000), // day after tomorrow
    time: '07:30',
    duration: 45,
    type: 'sequence',
    trackId: '6',
  },
];