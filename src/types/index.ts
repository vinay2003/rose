export interface PhotoMemory {
  id: string;
  url: string; // Base64 data URL or blob URL
  caption: string;
  date?: string;
  location?: string;
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
  note?: string; // Personal note / why this made me smile
  tag?: string;
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
  title: string;
  description: string;
  photoUrl?: string;
  tag?: string;
  location?: string;
}
