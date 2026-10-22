import React, { useState, useRef, useEffect } from 'react';
import type { SongTrack } from '../types';
import { saveAudioBlob, getAudioBlob, deleteAudioBlob } from '../utils/storage';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Trash2,
  Edit3,
  FileAudio,
  AlertCircle,
  Sparkles,
  RotateCcw,
  RotateCw,
  X,
  Disc3,
  CheckCircle2,
} from 'lucide-react';

interface SongSectionProps {
  tracks: Record<'en' | 'tl' | 'hi', SongTrack>;
  onUpdateTrack: (lang: 'en' | 'tl' | 'hi', updates: Partial<SongTrack>) => void;
  isEditMode: boolean;
}

export const SongSection: React.FC<SongSectionProps> = ({
  tracks,
  onUpdateTrack,
  isEditMode,
}) => {
  // Active language track
  const [activeLang, setActiveLang] = useState<'en' | 'tl' | 'hi'>('hi');

  // Audio Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(tracks['hi']?.audioUrl || null);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Modals
  const [isLyricsModalOpen, setIsLyricsModalOpen] = useState(false);
  const [editedLyrics, setEditedLyrics] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [uploadError, setUploadError] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentTrack = tracks[activeLang];

  // Resolve audio URL whenever activeLang or track changes
  useEffect(() => {
    let currentObjectUrl: string | null = null;
    let isCancelled = false;
    setAudioError(null);

    const loadAudioSource = async () => {
      // 1. If direct public URL is available (e.g. from public/songs/ folder)
      if (currentTrack.audioUrl) {
        setAudioUrl(currentTrack.audioUrl);
        return;
      }

      // 2. If uploaded custom blob in IndexedDB
      if (currentTrack.hasAudio && currentTrack.audioBlobId) {
        const blob = await getAudioBlob(`song_${activeLang}`);
        if (!isCancelled && blob) {
          currentObjectUrl = URL.createObjectURL(blob);
          setAudioUrl(currentObjectUrl);
        } else if (!isCancelled) {
          setAudioUrl(null);
        }
      } else {
        setAudioUrl(null);
      }
    };

    loadAudioSource();

    return () => {
      isCancelled = true;
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [activeLang, currentTrack.audioUrl, currentTrack.hasAudio, currentTrack.audioBlobId]);

  // Audio Element Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setAudioError(null);
    };
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      console.error('Audio playback error on URL:', audioUrl);
      setAudioError('Unable to load audio file. Please check file format.');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [audioUrl]);

  // Handle Play/Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio play request interrupted or blocked:', err);
          setIsPlaying(false);
        });
    }
  };

  // Play a specific track directly from the cards
  const playTrack = (lang: 'en' | 'tl' | 'hi') => {
    if (activeLang === lang) {
      togglePlay();
      return;
    }

    // Changing song
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveLang(lang);

    // After switching, start playing automatically once loaded
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay deferred:', err));
      }
    }, 150);
  };

  // Seek time
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  // Skip backwards 10s
  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  // Skip forward 10s
  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  // Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.85;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Upload Audio Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|m4a|aac|ogg)$/i)) {
      setUploadError('Please choose a valid audio file (.mp3, .wav, .m4a, .ogg).');
      return;
    }

    try {
      const blobKey = `song_${activeLang}`;
      await saveAudioBlob(blobKey, file);
      onUpdateTrack(activeLang, {
        hasAudio: true,
        audioBlobId: blobKey,
        audioFileName: file.name,
      });
    } catch (err) {
      console.error('Failed to save audio track:', err);
      setUploadError('Failed to save audio file to local database.');
    }
  };

  // Delete Audio Handler
  const handleDeleteAudio = async () => {
    if (confirm(`Remove the audio recording for ${currentTrack.languageName}?`)) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      await deleteAudioBlob(`song_${activeLang}`);
      setAudioUrl(null);
      onUpdateTrack(activeLang, {
        hasAudio: false,
        audioBlobId: undefined,
        audioUrl: undefined,
        audioFileName: undefined,
      });
    }
  };

  // Open Lyrics Editor
  const openLyricsEditor = () => {
    setEditedLyrics(currentTrack.lyrics);
    setEditedTitle(currentTrack.songTitle);
    setIsLyricsModalOpen(true);
  };

  // Save Lyrics
  const saveLyrics = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTrack(activeLang, {
      lyrics: editedLyrics,
      songTitle: editedTitle.trim() || currentTrack.songTitle,
    });
    setIsLyricsModalOpen(false);
  };

  // Format MM:SS helper
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="special-song" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      
      {/* HTML5 Audio Element */}
      {audioUrl && (
        <audio
          key={audioUrl}
          ref={audioRef}
          src={audioUrl}
          preload="auto"
          loop={false}
        />
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/90 text-rose-800 text-xs font-semibold mb-3 border border-rose-200/60 shadow-xs">
          <Music className="w-3.5 h-3.5 animate-bounce" />
          <span>Our Love Soundtrack • Real Audio from public/songs/</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
          Our Special Songs
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          I made two heartfelt songs for my Rose — one in <strong className="text-stone-900 font-semibold">Hindi (&ldquo;Meri Rose&rdquo;)</strong> and one in <strong className="text-stone-900 font-semibold">Filipino (&ldquo;Rose, Ikaw ang Tahan Ko&rdquo;)</strong>. Both are loaded and ready to play!
        </p>
      </div>

      {/* TWO PRIMARY SONG CARDS (Showing Hindi & Filipino Songs from public/songs/) */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        
        {/* Track 1: Meri Rose (Hindi) */}
        <div
          onClick={() => {
            if (activeLang !== 'hi') {
              playTrack('hi');
            }
          }}
          className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer border ${
            activeLang === 'hi'
              ? 'bg-gradient-to-br from-rose-50/90 via-pink-50/70 to-white border-rose-300 shadow-xl shadow-rose-200/40 ring-2 ring-rose-400/40 scale-[1.01]'
              : 'bg-white/80 hover:bg-rose-50/40 border-stone-200/80 shadow-md hover:shadow-lg hover:border-rose-200'
          }`}
        >
          {/* Active Badge */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500 text-white shadow-xs">
              <span>🇮🇳</span>
              <span>Hindi Song</span>
            </span>
            <span className="text-[11px] font-mono font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>public/songs/Meri Rose.m4a</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Spinning Vinyl Indicator */}
            <div className="relative shrink-0">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-900 flex items-center justify-center shadow-lg border-2 border-stone-700 ${
                  activeLang === 'hi' && isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center border-2 border-white">
                  <Disc3 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              {activeLang === 'hi' && isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
                </span>
              )}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0 pr-1">
              <h3 className="font-serif-romantic text-lg sm:text-xl md:text-2xl font-bold text-stone-900 leading-tight">
                Meri Rose
              </h3>
              <p className="text-xs sm:text-sm text-rose-600 font-medium font-serif-romantic mt-0.5">
                मेरी रोज़ — Dedicated to Rose
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500 font-sans">
                <span>Duration: 4:07</span>
                <span>•</span>
                <span>By Vinay</span>
              </div>
            </div>

            {/* Play/Pause Button on Card */}
            <button
              id="btn-play-hindi-meri-rose"
              onClick={(e) => {
                e.stopPropagation();
                playTrack('hi');
              }}
              aria-label="Play Meri Rose"
              className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${
                activeLang === 'hi' && isPlaying
                  ? 'bg-rose-600 text-white shadow-rose-500/30 scale-105'
                  : 'bg-rose-500 hover:bg-rose-600 text-white hover:scale-105'
              }`}
            >
              {activeLang === 'hi' && isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Mini Equalizer Bar for Active Track */}
          {activeLang === 'hi' && isPlaying && (
            <div className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-rose-200/60">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-rose-500 animate-pulse"
                  style={{
                    height: `${Math.sin(i * 0.9 + currentTime * 4) * 8 + 12}px`,
                    animationDelay: `${i * 0.09}s`,
                  }}
                />
              ))}
              <span className="ml-2 text-[11px] font-medium text-rose-700">Playing Now</span>
            </div>
          )}
        </div>

        {/* Track 2: Rose, Ikaw ang Tahan Ko (Filipino / Tagalog) */}
        <div
          id="card-filipino-rose-ikaw"
          onClick={() => {
            if (activeLang !== 'tl') {
              playTrack('tl');
            }
          }}
          className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer border ${
            activeLang === 'tl'
              ? 'bg-gradient-to-br from-rose-50/90 via-pink-50/70 to-white border-rose-300 shadow-xl shadow-rose-200/40 ring-2 ring-rose-400/40 scale-[1.01]'
              : 'bg-white/80 hover:bg-rose-50/40 border-stone-200/80 shadow-md hover:shadow-lg hover:border-rose-200'
          }`}
        >
          {/* Active Badge */}
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500 text-white shadow-xs">
              <span>🇵🇭</span>
              <span>Filipino / Tagalog</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>public/songs/Rose, Ikaw ang Tahan Ko.m4a</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Spinning Vinyl Indicator */}
            <div className="relative shrink-0">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-900 flex items-center justify-center shadow-lg border-2 border-stone-700 ${
                  activeLang === 'tl' && isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-rose-500 flex items-center justify-center border-2 border-white">
                  <Disc3 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              {activeLang === 'tl' && isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
                </span>
              )}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0 pr-1">
              <h3 className="font-serif-romantic text-lg sm:text-xl md:text-2xl font-bold text-stone-900 leading-tight">
                Rose, Ikaw ang Tahan Ko
              </h3>
              <p className="text-xs sm:text-sm text-rose-600 font-medium font-serif-romantic mt-0.5">
                Aking Asawa, Aking Buhay
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500 font-sans">
                <span>Duration: 4:08</span>
                <span>•</span>
                <span>Inalay para kay Rose</span>
              </div>
            </div>

            {/* Play/Pause Button on Card */}
            <button
              id="btn-play-filipino-rose-ikaw"
              onClick={(e) => {
                e.stopPropagation();
                playTrack('tl');
              }}
              aria-label="Play Rose, Ikaw ang Tahan Ko"
              className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md ${
                activeLang === 'tl' && isPlaying
                  ? 'bg-rose-600 text-white shadow-rose-500/30 scale-105'
                  : 'bg-rose-500 hover:bg-rose-600 text-white hover:scale-105'
              }`}
            >
              {activeLang === 'tl' && isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Mini Equalizer Bar for Active Track */}
          {activeLang === 'tl' && isPlaying && (
            <div className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-rose-200/60">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-rose-500 animate-pulse"
                  style={{
                    height: `${Math.sin(i * 0.9 + currentTime * 4) * 8 + 12}px`,
                    animationDelay: `${i * 0.09}s`,
                  }}
                />
              ))}
              <span className="ml-2 text-[11px] font-medium text-rose-700">Playing Now</span>
            </div>
          )}
        </div>
      </div>

      {/* Language Switcher Pills (Including English Lyrics option) */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-full bg-stone-100/90 border border-stone-200 shadow-xs">
          {(
            [
              { id: 'hi', label: '🇮🇳 Hindi (Meri Rose)' },
              { id: 'tl', label: '🇵🇭 Filipino (Ikaw ang Tahan Ko)' },
              { id: 'en', label: '🇬🇧 English Lyrics' },
            ] as const
          ).map((lang) => {
            const isActive = activeLang === lang.id;
            return (
              <button
                key={lang.id}
                id={`tab-btn-${lang.id}`}
                onClick={() => {
                  if (activeLang !== lang.id) {
                    if (audioRef.current) audioRef.current.pause();
                    setIsPlaying(false);
                    setCurrentTime(0);
                    setActiveLang(lang.id);
                  }
                }}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-102 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                }`}
              >
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN AUDIO PLAYER CARD */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-rose-50/40 to-pink-50/30 rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-100/80">
        
        {/* Header & Controls bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-rose-100/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-bold text-rose-600">
                {currentTrack.nativeTitle}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-xs text-stone-500">{currentTrack.artistNote}</span>
            </div>
            <h3 className="font-serif-romantic text-2xl sm:text-3xl text-stone-900 font-bold">
              {currentTrack.songTitle}
            </h3>
            {currentTrack.audioFileName && (
              <p className="text-xs font-mono text-emerald-700 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                <span>Active File: /songs/{currentTrack.audioFileName}</span>
              </p>
            )}
          </div>

          {/* Action buttons: Upload Audio & Edit Lyrics */}
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              id={`upload-song-${activeLang}-btn`}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                isEditMode
                  ? 'bg-amber-200 text-amber-900 border border-amber-300 shadow-xs hover:bg-amber-300'
                  : 'bg-rose-100/80 hover:bg-rose-200 text-rose-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{currentTrack.hasAudio ? 'Replace Audio' : 'Upload Audio Track'}</span>
            </button>

            {currentTrack.hasAudio && currentTrack.audioBlobId && (
              <button
                onClick={handleDeleteAudio}
                title="Remove uploaded custom audio"
                className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={openLyricsEditor}
              id={`edit-lyrics-${activeLang}-btn`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Lyrics</span>
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {audioError && (
          <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{audioError}</span>
          </div>
        )}

        {/* Player Controls or English upload prompt */}
        {!currentTrack.hasAudio ? (
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <FileAudio className="w-6 h-6" />
            </div>
            <h4 className="font-serif-romantic text-lg font-semibold text-amber-900 mb-1">
              Audio track available in Hindi and Filipino!
            </h4>
            <p className="text-xs sm:text-sm text-amber-800/80 max-w-md mx-auto mb-5">
              Click either <button onClick={() => playTrack('hi')} className="underline font-bold hover:text-rose-600">Hindi (Meri Rose)</button> or <button onClick={() => playTrack('tl')} className="underline font-bold hover:text-rose-600">Filipino (Rose, Ikaw ang Tahan Ko)</button> above to listen to our real songs. If you record an English vocal, you can also upload it here!
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium shadow-xs transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload English Audio File</span>
            </button>
          </div>
        ) : (
          <div className="my-6 p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-rose-100 shadow-sm">
            
            {/* Visualizer animation when playing */}
            <div className="flex items-center justify-center gap-1.5 h-10 mb-6">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full bg-gradient-to-t from-rose-400 via-pink-500 to-rose-300 transition-all duration-200 ${
                    isPlaying ? 'animate-pulse' : 'h-1.5 opacity-30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.sin(i * 0.6 + currentTime * 3) * 16 + 18}px` : '4px',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>

            {/* Scrubber / Progress Bar */}
            <div className="space-y-1 mb-5">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play, Pause, Skip, and Volume controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              
              {/* Left & Center: Controls */}
              <div className="flex items-center gap-3">
                
                {/* 10s back */}
                <button
                  onClick={handleSkipBack}
                  title="Rewind 10 seconds"
                  className="p-2.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                {/* Big Main Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  id={`play-pause-${activeLang}-btn`}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                {/* 10s forward */}
                <button
                  onClick={handleSkipForward}
                  title="Forward 10 seconds"
                  className="p-2.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-5 h-5" />
                </button>

                <div className="ml-2 text-xs">
                  <span className="font-semibold text-stone-900 block font-serif-romantic text-sm">
                    {currentTrack.songTitle}
                  </span>
                  <span className="text-emerald-600 font-medium">
                    {isPlaying ? '♪ Playing for Rose...' : 'Ready to play'}
                  </span>
                </div>
              </div>

              {/* Right: Volume Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-stone-400" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-rose-500" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-24 sm:w-28 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Full Lyrics Section */}
        <div className="mt-8 pt-8 border-t border-rose-100/70">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif-romantic text-lg sm:text-xl text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Song Lyrics ({currentTrack.languageName})</span>
            </h4>
            <button
              onClick={openLyricsEditor}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline cursor-pointer"
            >
              Edit lyrics
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white/70 border border-rose-100/60 max-h-96 overflow-y-auto shadow-inner">
            <pre className="font-serif-romantic text-base sm:text-lg text-stone-700 whitespace-pre-line leading-relaxed text-center font-normal">
              {currentTrack.lyrics}
            </pre>
          </div>
        </div>
      </div>

      {/* Edit Lyrics Modal */}
      {isLyricsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100">
            <button
              onClick={() => setIsLyricsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Edit Lyrics ({currentTrack.languageName})
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Customize or paste the exact lyrics for the {currentTrack.languageName} version of our song.
            </p>

            <form onSubmit={saveLyrics} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Song Title
                </label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Lyrics
                </label>
                <textarea
                  rows={10}
                  value={editedLyrics}
                  onChange={(e) => setEditedLyrics(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 leading-relaxed"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLyricsModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                >
                  Save Lyrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
