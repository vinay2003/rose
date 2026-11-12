export interface PhotoMemory {
  id: string;
  url: string; // Base64 data URL, blob URL, or static asset path
  caption: string;
  date?: string;
  time?: string;
  location?: string;
  category?: 'all' | 'cozy' | 'outfit' | 'video' | 'dates' | 'recent';
  mediaType?: 'photo' | 'video';
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  createdAt: number;
}

export interface LoveNoteCard {
  id: string;
  title: string;
  message: string;
  category?: 'smile' | 'voice' | 'heart' | 'hug' | 'laughter' | 'quirk' | 'custom';
  favorite?: boolean;
}

export interface ChatQuote {
  id: string;
  sender: 'Vinay' | 'Rose' | 'Both';
  quote: string;
  date: string;
  time?: string;
  note?: string; // Personal note / why this made me smile
  tag?: string;
  dialogue?: Array<{ speaker: 'Vinay' | 'Rose'; text: string; time?: string }>;
}

export interface SongTrack {
  id: 'en' | 'tl' | 'hi';
  languageName: string;
  nativeTitle: string;
  songTitle: string;
  artistNote: string;
  lyrics: string;
  hasAudio: boolean;
  audioBlobId?: string; // Key in IndexedDB
  audioFileName?: string;
  audioUrl?: string;
}

export interface OpenWhenLetter {
  id: string;
  title: string;
  subtitle: string;
  category: 'miss-me' | 'need-smile' | 'difficult-day' | 'custom';
  content: string;
  waxSealColor: string;
  paperStyle?: 'cream' | 'rose' | 'lavender';
  lastEdited?: string;
}

export interface TimelineMilestone {
  id: string;
  date: string;
  time?: string;
  title: string;
  description: string;
  photoUrl?: string;
  videoUrl?: string;
  mediaType?: 'photo' | 'video';
  tag?: string;
  location?: string;
}
