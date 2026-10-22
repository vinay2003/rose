import React, { useState, useEffect } from 'react';
import type {
  PhotoMemory,
  LoveNoteCard,
  ChatQuote,
  SongTrack,
  OpenWhenLetter,
  TimelineMilestone,
} from './types';
import {
  DEFAULT_ENVELOPES,
  DEFAULT_LOVE_NOTES,
  DEFAULT_SONG_TRACKS,
  DEFAULT_PHOTOS,
  DEFAULT_TIMELINE,
  DEFAULT_CHAT_QUOTES,
} from './data/defaultData';
import { getLocalItem, setLocalItem, removeLocalItem } from './utils/storage';

// Components
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navbar } from './components/Navbar';
import { FloatingHearts } from './components/FloatingHearts';
import { MemoriesSection } from './components/MemoriesSection';
import { LoveNotesSection } from './components/LoveNotesSection';
import { ConversationsSection } from './components/ConversationsSection';
import { SongSection } from './components/SongSection';
import { EnvelopesSection } from './components/EnvelopesSection';
import { TimelineSection } from './components/TimelineSection';
import { PromiseSection } from './components/PromiseSection';
import { FinalSurprise } from './components/FinalSurprise';
import { Footer } from './components/Footer';
import { BackupModal } from './components/BackupModal';

export const App: React.FC = () => {
  // Navigation / Welcome screen state
  const [hasEntered, setHasEntered] = useState<boolean>(() =>
    getLocalItem('has_entered_world', false)
  );

  // Edit Mode state (allows Vinay to toggle editing and Rose to view pristine version)
  const [isEditMode, setIsEditMode] = useState<boolean>(() =>
    getLocalItem('edit_mode_active', false)
  );

  // Backup modal state
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  // Core Data States - loaded with real photos, real audio, and real timeline
  const [photos, setPhotos] = useState<PhotoMemory[]>(() => {
    const saved = getLocalItem<PhotoMemory[]>('photos', []);
    return saved.length > 0 ? saved : DEFAULT_PHOTOS;
  });

  const [loveNotes, setLoveNotes] = useState<LoveNoteCard[]>(() =>
    getLocalItem('love_notes', DEFAULT_LOVE_NOTES)
  );

  const [chatQuotes, setChatQuotes] = useState<ChatQuote[]>(() => {
    const saved = getLocalItem<ChatQuote[]>('chat_quotes', []);
    return saved.length > 0 ? saved : DEFAULT_CHAT_QUOTES;
  });

  const [songTracks, setSongTracks] = useState<Record<'en' | 'tl' | 'hi', SongTrack>>(() => {
    const saved = getLocalItem<Record<'en' | 'tl' | 'hi', SongTrack> | null>('song_tracks', null);
    return {
      hi: {
        ...DEFAULT_SONG_TRACKS.hi,
        ...(saved?.hi || {}),
        // Enforce the real audio file from public/songs/ unless custom recording uploaded
        songTitle: saved?.hi?.audioBlobId ? saved.hi.songTitle : 'Meri Rose',
        nativeTitle: 'मेरी रोज़ — Hindi Version',
        hasAudio: true,
        audioUrl: saved?.hi?.audioBlobId ? undefined : '/songs/Meri%20Rose.m4a',
        audioFileName: saved?.hi?.audioBlobId ? saved.hi.audioFileName : 'Meri Rose.m4a',
      },
      tl: {
        ...DEFAULT_SONG_TRACKS.tl,
        ...(saved?.tl || {}),
        songTitle: saved?.tl?.audioBlobId ? saved.tl.songTitle : 'Rose, Ikaw ang Tahan Ko',
        nativeTitle: 'Rose, Ikaw ang Tahan Ko — Filipino Version',
        hasAudio: true,
        audioUrl: saved?.tl?.audioBlobId ? undefined : '/songs/Rose,%20Ikaw%20ang%20Tahan%20Ko.m4a',
        audioFileName: saved?.tl?.audioBlobId ? saved.tl.audioFileName : 'Rose, Ikaw ang Tahan Ko.m4a',
      },
      en: {
        ...DEFAULT_SONG_TRACKS.en,
        ...(saved?.en || {}),
      },
    };
  });

  const [envelopes, setEnvelopes] = useState<OpenWhenLetter[]>(() =>
    getLocalItem('envelopes', DEFAULT_ENVELOPES)
  );

  const [milestones, setMilestones] = useState<TimelineMilestone[]>(() => {
    const saved = getLocalItem<TimelineMilestone[]>('timeline_milestones', []);
    return saved.length > 0 ? saved : DEFAULT_TIMELINE;
  });

  // LocalStorage Synchronizers
  useEffect(() => {
    setLocalItem('photos', photos);
  }, [photos]);

  useEffect(() => {
    setLocalItem('love_notes', loveNotes);
  }, [loveNotes]);

  useEffect(() => {
    setLocalItem('chat_quotes', chatQuotes);
  }, [chatQuotes]);

  useEffect(() => {
    setLocalItem('song_tracks', songTracks);
  }, [songTracks]);

  useEffect(() => {
    setLocalItem('envelopes', envelopes);
  }, [envelopes]);

  useEffect(() => {
    setLocalItem('timeline_milestones', milestones);
  }, [milestones]);

  useEffect(() => {
    setLocalItem('edit_mode_active', isEditMode);
  }, [isEditMode]);

  useEffect(() => {
    setLocalItem('has_entered_world', hasEntered);
  }, [hasEntered]);

  // Handlers for Photos
  const handleAddPhoto = (newPhoto: Omit<PhotoMemory, 'id' | 'createdAt'>) => {
    const photo: PhotoMemory = {
      ...newPhoto,
      id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: Date.now(),
    };
    setPhotos((prev) => [photo, ...prev]);
  };

  const handleEditPhoto = (id: string, updates: Partial<PhotoMemory>) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Handlers for Love Notes
  const handleAddNote = (newNote: Omit<LoveNoteCard, 'id'>) => {
    const note: LoveNoteCard = {
      ...newNote,
      id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
    setLoveNotes((prev) => [note, ...prev]);
  };

  const handleEditNote = (id: string, updates: Partial<LoveNoteCard>) => {
    setLoveNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  const handleDeleteNote = (id: string) => {
    setLoveNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleToggleFavoriteNote = (id: string) => {
    setLoveNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite } : n))
    );
  };

  // Handlers for Conversations
  const handleAddQuote = (newQuote: Omit<ChatQuote, 'id'>) => {
    const quote: ChatQuote = {
      ...newQuote,
      id: `quote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
    setChatQuotes((prev) => [quote, ...prev]);
  };

  const handleEditQuote = (id: string, updates: Partial<ChatQuote>) => {
    setChatQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleDeleteQuote = (id: string) => {
    setChatQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  // Handlers for Song Tracks
  const handleUpdateTrack = (lang: 'en' | 'tl' | 'hi', updates: Partial<SongTrack>) => {
    setSongTracks((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        ...updates,
      },
    }));
  };

  // Handlers for Envelopes
  const handleUpdateEnvelope = (id: string, updates: Partial<OpenWhenLetter>) => {
    setEnvelopes((prev) =>
      prev.map((env) => (env.id === id ? { ...env, ...updates } : env))
    );
  };

  const handleAddEnvelope = (newEnv: Omit<OpenWhenLetter, 'id'>) => {
    const env: OpenWhenLetter = {
      ...newEnv,
      id: `env_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
    setEnvelopes((prev) => [...prev, env]);
  };

  const handleDeleteEnvelope = (id: string) => {
    setEnvelopes((prev) => prev.filter((env) => env.id !== id));
  };

  // Handlers for Milestones
  const handleAddMilestone = (newMilestone: Omit<TimelineMilestone, 'id'>) => {
    const item: TimelineMilestone = {
      ...newMilestone,
      id: `milestone_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
    setMilestones((prev) => [item, ...prev]);
  };

  const handleEditMilestone = (id: string, updates: Partial<TimelineMilestone>) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  // Export Backup
  const handleExportBackup = () => {
    const backupData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      photos,
      loveNotes,
      chatQuotes,
      songTracks,
      envelopes,
      milestones,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `our_little_world_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import Backup
  const handleImportBackup = (data: any) => {
    if (data.photos) setPhotos(data.photos);
    if (data.loveNotes) setLoveNotes(data.loveNotes);
    if (data.chatQuotes) setChatQuotes(data.chatQuotes);
    if (data.songTracks) setSongTracks(data.songTracks);
    if (data.envelopes) setEnvelopes(data.envelopes);
    if (data.milestones) setMilestones(data.milestones);
  };

  // Reset to Defaults
  const handleResetAll = () => {
    removeLocalItem('photos');
    removeLocalItem('love_notes');
    removeLocalItem('chat_quotes');
    removeLocalItem('song_tracks');
    removeLocalItem('envelopes');
    removeLocalItem('timeline_milestones');
    removeLocalItem('promise_personal_vow');

    setPhotos(DEFAULT_PHOTOS);
    setLoveNotes(DEFAULT_LOVE_NOTES);
    setChatQuotes(DEFAULT_CHAT_QUOTES);
    setSongTracks(DEFAULT_SONG_TRACKS);
    setEnvelopes(DEFAULT_ENVELOPES);
    setMilestones(DEFAULT_TIMELINE);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 relative selection:bg-rose-200 selection:text-rose-900 scrapbook-texture">
      
      {/* Ambient Floating Rose Petals and Hearts */}
      <FloatingHearts />

      {/* Welcome Screen Curtain */}
      {!hasEntered ? (
        <WelcomeScreen onOpen={() => setHasEntered(true)} />
      ) : (
        <>
          {/* Top Sticky Header */}
          <Navbar
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            onOpenBackup={() => setIsBackupOpen(true)}
            onReturnToWelcome={() => setHasEntered(false)}
          />

          {/* Main Website Sections */}
          <main className="relative z-20">
            {/* Edit Mode Notice banner if active */}
            {isEditMode && (
              <div className="bg-amber-100/90 border-b border-amber-300 text-amber-900 text-xs px-4 py-2 text-center font-medium">
                ✏️ Edit Mode is active! You can upload photos, add timeline memories, customize love letters, and upload audio recordings. Click &ldquo;Edit Mode (Active)&rdquo; above to switch to Rose&apos;s view.
              </div>
            )}

            {/* 1. Our Memories Photo Gallery */}
            <MemoriesSection
              photos={photos}
              onAddPhoto={handleAddPhoto}
              onEditPhoto={handleEditPhoto}
              onDeletePhoto={handleDeletePhoto}
              isEditMode={isEditMode}
            />

            {/* 2. Little Things I Love About You */}
            <LoveNotesSection
              notes={loveNotes}
              onAddNote={handleAddNote}
              onEditNote={handleEditNote}
              onDeleteNote={handleDeleteNote}
              onToggleFavorite={handleToggleFavoriteNote}
              isEditMode={isEditMode}
            />

            {/* 3. Our Conversations */}
            <ConversationsSection
              quotes={chatQuotes}
              onAddQuote={handleAddQuote}
              onEditQuote={handleEditQuote}
              onDeleteQuote={handleDeleteQuote}
              isEditMode={isEditMode}
            />

            {/* 4. Our Special Song */}
            <SongSection
              tracks={songTracks}
              onUpdateTrack={handleUpdateTrack}
              isEditMode={isEditMode}
            />

            {/* 5. Open When You Need Love */}
            <EnvelopesSection
              envelopes={envelopes}
              onUpdateEnvelope={handleUpdateEnvelope}
              onAddEnvelope={handleAddEnvelope}
              onDeleteEnvelope={handleDeleteEnvelope}
              isEditMode={isEditMode}
            />

            {/* 6. Our Timeline */}
            <TimelineSection
              milestones={milestones}
              onAddMilestone={handleAddMilestone}
              onEditMilestone={handleEditMilestone}
              onDeleteMilestone={handleDeleteMilestone}
              isEditMode={isEditMode}
            />

            {/* 7. A Little Promise */}
            <PromiseSection isEditMode={isEditMode} />

            {/* 8. Final Surprise */}
            <FinalSurprise />
          </main>

          {/* Romantic Footer */}
          <Footer />

          {/* Backup & Restore Modal */}
          <BackupModal
            isOpen={isBackupOpen}
            onClose={() => setIsBackupOpen(false)}
            onExport={handleExportBackup}
            onImport={handleImportBackup}
            onResetAll={handleResetAll}
          />
        </>
      )}
    </div>
  );
};

export default App;
