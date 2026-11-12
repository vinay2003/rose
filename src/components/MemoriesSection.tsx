import React, { useState, useMemo } from 'react';
import type { PhotoMemory } from '../types';
import {
  Camera,
  Plus,
  Edit2,
  Trash2,
  Maximize2,
  X,
  Calendar,
  MapPin,
  Clock,
  Play,
  Film,
  Sparkles,
  Heart,
  Coffee,
  Smile,
  Image as ImageIcon,
} from 'lucide-react';

interface MemoriesSectionProps {
  photos: PhotoMemory[];
  onAddPhoto: (photo: Omit<PhotoMemory, 'id' | 'createdAt'>) => void;
  onEditPhoto: (id: string, updates: Partial<PhotoMemory>) => void;
  onDeletePhoto: (id: string) => void;
  isEditMode: boolean;
}

type FilterCategory = 'all' | 'video' | 'cozy' | 'outfit' | 'dates';

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({
  photos,
  onAddPhoto,
  onEditPhoto,
  onDeletePhoto,
  isEditMode,
}) => {
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoMemory | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoMemory | null>(null);

  // Active filter tab
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Form states
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [category, setCategory] = useState<PhotoMemory['category']>('all');
  const [errorMsg, setErrorMsg] = useState('');

  // Helper to check if item is a video
  const isVideo = (item: PhotoMemory) => {
    return item.mediaType === 'video' || item.url.endsWith('.mp4') || item.url.includes('VIDEO-');
  };

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'all') return photos;
    if (activeFilter === 'video') {
      return photos.filter(isVideo);
    }
    return photos.filter((p) => p.category === activeFilter);
  }, [photos, activeFilter]);

  // Handle file selection (image or video)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    const isVid = file.type.startsWith('video/');
    const isImg = file.type.startsWith('image/');

    if (!isVid && !isImg) {
      setErrorMsg('Please select a valid image or video file.');
      return;
    }

    setMediaType(isVid ? 'video' : 'photo');

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setPreviewUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit Add Photo/Video
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      setErrorMsg('Please upload a photo or video first.');
      return;
    }

    onAddPhoto({
      url: previewUrl,
      caption: caption.trim() || 'A sweet moment together',
      date: date.trim() || undefined,
      time: time.trim() || undefined,
      location: location.trim() || undefined,
      mediaType,
      category: category || (mediaType === 'video' ? 'video' : 'cozy'),
    });

    // Reset and close
    setPreviewUrl('');
    setCaption('');
    setDate('');
    setTime('');
    setLocation('');
    setMediaType('photo');
    setErrorMsg('');
    setIsAddModalOpen(false);
  };

  // Submit Edit Photo
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    onEditPhoto(editingPhoto.id, {
      caption: caption.trim() || editingPhoto.caption,
      date: date.trim() || undefined,
      time: time.trim() || undefined,
      location: location.trim() || undefined,
      url: previewUrl || editingPhoto.url,
      mediaType: isVideo(editingPhoto) ? 'video' : 'photo',
      category: category || editingPhoto.category,
    });

    setEditingPhoto(null);
    setPreviewUrl('');
    setCaption('');
    setDate('');
    setTime('');
    setLocation('');
  };

  const openEditModal = (photo: PhotoMemory) => {
    setEditingPhoto(photo);
    setCaption(photo.caption);
    setDate(photo.date || '');
    setTime(photo.time || '');
    setLocation(photo.location || '');
    setPreviewUrl(photo.url);
    setCategory(photo.category || 'all');
    setMediaType(isVideo(photo) ? 'video' : 'photo');
  };

  const filterTabs: Array<{ id: FilterCategory; label: string; icon: React.ReactNode; count: number }> = [
    {
      id: 'all',
      label: 'All Memories',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      count: photos.length,
    },
    {
      id: 'video',
      label: 'Video Reels 🎬',
      icon: <Film className="w-3.5 h-3.5" />,
      count: photos.filter(isVideo).length,
    },
    {
      id: 'cozy',
      label: 'Cozy & Bedtime 🧸',
      icon: <Heart className="w-3.5 h-3.5" />,
      count: photos.filter((p) => p.category === 'cozy').length,
    },
    {
      id: 'outfit',
      label: 'Smiles & Outfits ✨',
      icon: <Smile className="w-3.5 h-3.5" />,
      count: photos.filter((p) => p.category === 'outfit').length,
    },
    {
      id: 'dates',
      label: 'Dates & Whispers ☕',
      icon: <Coffee className="w-3.5 h-3.5" />,
      count: photos.filter((p) => p.category === 'dates').length,
    },
  ];

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-medium mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Our Visual Scrapbook</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
          Our Cherished Memories
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          Every photo, video whisper, late-night laugh, and sunlit moment captured across our journey.
        </p>

        {/* Upload Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="add-memory-photo-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium shadow-md shadow-rose-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo or Video Memory</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                  : 'bg-white/80 text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-200/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/30 text-white' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid or Empty State */}
      {filteredPhotos.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm border-2 border-dashed border-rose-200 rounded-3xl p-10 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 mx-auto flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="font-serif-romantic text-xl text-stone-800 mb-2">No Memories in this category</h3>
          <p className="text-sm text-stone-500 mb-6 leading-relaxed">
            Switch tabs to view more photos and video moments from our journey.
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-sm font-medium transition-colors cursor-pointer"
          >
            <span>View All Memories</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => {
            const isVid = isVideo(photo);
            // Subtle alternating rotation for scrapbook feel
            const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
            const rotClass = rotations[index % rotations.length];

            return (
              <div
                key={photo.id}
                className={`relative group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 ${rotClass}`}
              >
                {/* Washi tape accent on top */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 ${
                    isVid
                      ? 'washi-tape-lavender'
                      : index % 3 === 0
                      ? 'washi-tape-pink'
                      : index % 3 === 1
                      ? 'washi-tape-lavender'
                      : 'washi-tape-sunset'
                  } rounded-xs z-10`}
                />

                {/* Media Container */}
                <div
                  onClick={() => setLightboxPhoto(photo)}
                  className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-stone-900 cursor-pointer group"
                >
                  {isVid ? (
                    <>
                      <video
                        src={photo.url}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        preload="metadata"
                        muted
                        playsInline
                      />
                      {/* Video indicator badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow-md">
                        <Film className="w-3 h-3 text-rose-400" />
                        <span>Video Reel</span>
                      </div>
                      {/* Big Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-13 h-13 rounded-full bg-rose-500/90 text-white shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 ml-0.5 fill-current" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Hover view overlay */}
                      <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="p-2.5 rounded-full bg-white/90 text-stone-800 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                          <Maximize2 className="w-5 h-5" />
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Caption & Metadata */}
                <div className="pt-4 pb-2 px-1">
                  <p className="font-script-handwriting text-2xl text-stone-800 leading-snug mb-2 line-clamp-2">
                    {photo.caption}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-rose-50 gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {photo.date && (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                          <Calendar className="w-3 h-3" />
                          <span>{photo.date}</span>
                        </span>
                      )}
                      {photo.time && (
                        <span className="inline-flex items-center gap-1 text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded-md border border-stone-100">
                          <Clock className="w-3 h-3 text-rose-400" />
                          <span>{photo.time}</span>
                        </span>
                      )}
                      {photo.location && (
                        <span className="inline-flex items-center gap-1 text-stone-400">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span className="truncate max-w-[120px]">{photo.location}</span>
                        </span>
                      )}
                    </div>

                    {/* Edit / Delete actions */}
                    <div
                      className={`flex items-center gap-1 ${
                        isEditMode ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(photo);
                        }}
                        title="Edit caption/details"
                        className="p-1.5 rounded-full text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this memory?')) {
                            onDeletePhoto(photo.id);
                          }
                        }}
                        title="Delete memory"
                        className="p-1.5 rounded-full text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setPreviewUrl('');
                setErrorMsg('');
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-2">Add Photo or Video Memory</h3>
            <p className="text-xs text-stone-500 mb-6">
              Add a moment from our journey, with the exact date, time, and sweet caption.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Media selector */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">Select Media File</label>
                <div className="border-2 border-dashed border-rose-200 rounded-2xl p-4 text-center hover:border-rose-400 transition-colors bg-rose-50/30">
                  {previewUrl ? (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-stone-100 mb-2">
                      {mediaType === 'video' ? (
                        <video src={previewUrl} controls className="w-full h-full object-contain" />
                      ) : (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                      )}
                      <button
                        type="button"
                        onClick={() => setPreviewUrl('')}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-4">
                      <Camera className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                      <span className="text-sm font-medium text-rose-600 block">Choose image or video file</span>
                      <span className="text-xs text-stone-400">Supports JPG, PNG, WEBP, MP4</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {errorMsg && <p className="text-xs text-red-500 mt-1">{errorMsg}</p>}
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Caption / Sweet Note</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Laughing at our private jokes..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. November 12, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Exact Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 3:38 PM"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
                </div>
              </div>

              {/* Location & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Location / Vibe</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Secret Cafe Date"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 bg-white"
                  >
                    <option value="all">General Memory</option>
                    <option value="video">Video Reel 🎬</option>
                    <option value="cozy">Cozy & Bedtime 🧸</option>
                    <option value="outfit">Smiles & Outfits ✨</option>
                    <option value="dates">Dates & Whispers ☕</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!previewUrl}
                  className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-sm font-medium shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                >
                  Save Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Memory Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingPhoto(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-2">Edit Memory Details</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-stone-900">
                {isVideo(editingPhoto) ? (
                  <video src={editingPhoto.url} controls className="w-full h-full object-contain" />
                ) : (
                  <img src={editingPhoto.url} alt={editingPhoto.caption} className="w-full h-full object-contain" />
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Caption</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Exact Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Location / Vibe</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                >
                  Update Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal (Photo & Video) */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center"
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {isVideo(lightboxPhoto) ? (
              <video
                src={lightboxPhoto.url}
                controls
                autoPlay
                playsInline
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl bg-black"
              />
            ) : (
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
            )}

            <div className="mt-4 text-center text-white px-4">
              <p className="font-script-handwriting text-3xl text-rose-200 mb-1.5">
                {lightboxPhoto.caption}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-stone-300">
                {lightboxPhoto.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-300" />
                    <span>{lightboxPhoto.date}</span>
                  </span>
                )}
                {lightboxPhoto.time && (
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-rose-300" />
                    <span>{lightboxPhoto.time}</span>
                  </span>
                )}
                {lightboxPhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-300" />
                    <span>{lightboxPhoto.location}</span>
                  </span>
                )}
                {isVideo(lightboxPhoto) && (
                  <span className="flex items-center gap-1 text-rose-300 font-medium bg-rose-500/20 px-2 py-0.5 rounded-full">
                    <Film className="w-3 h-3" />
                    <span>Playable Video Reel</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
