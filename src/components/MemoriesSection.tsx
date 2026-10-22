import React, { useState } from 'react';
import type { PhotoMemory } from '../types';
import { Camera, Plus, Edit2, Trash2, Maximize2, X, Calendar, MapPin, Image as ImageIcon } from 'lucide-react';

interface MemoriesSectionProps {
  photos: PhotoMemory[];
  onAddPhoto: (photo: Omit<PhotoMemory, 'id' | 'createdAt'>) => void;
  onEditPhoto: (id: string, updates: Partial<PhotoMemory>) => void;
  onDeletePhoto: (id: string) => void;
  isEditMode: boolean;
}

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

  // Form states
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file (PNG, JPG, WEBP, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setPreviewUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit Add Photo
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      setErrorMsg('Please upload a photo first.');
      return;
    }

    onAddPhoto({
      url: previewUrl,
      caption: caption.trim() || 'A sweet moment together',
      date: date.trim() || undefined,
      location: location.trim() || undefined,
    });

    // Reset and close
    setPreviewUrl('');
    setCaption('');
    setDate('');
    setLocation('');
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
      location: location.trim() || undefined,
      url: previewUrl || editingPhoto.url,
    });

    setEditingPhoto(null);
    setPreviewUrl('');
    setCaption('');
    setDate('');
    setLocation('');
  };

  const openEditModal = (photo: PhotoMemory) => {
    setEditingPhoto(photo);
    setCaption(photo.caption);
    setDate(photo.date || '');
    setLocation(photo.location || '');
    setPreviewUrl(photo.url);
  };

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-medium mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Our Visual Scrapbook</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
          Our Memories
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          Moments frozen in time, capturing all the laughter, gentle touches, and memories we share.
        </p>
        
        {/* Upload Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="add-memory-photo-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium shadow-md shadow-rose-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload A Photo Memory</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid or Empty State */}
      {photos.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm border-2 border-dashed border-rose-200 rounded-3xl p-10 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 mx-auto flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="font-serif-romantic text-xl text-stone-800 mb-2">
            No Photos Uploaded Yet
          </h3>
          <p className="text-sm text-stone-500 mb-6 leading-relaxed">
            This space is ready for our real photos! Click the upload button above to add your first cherished photo, add a personal caption, and frame it here in our scrapbook.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Our First Memory</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => {
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
                    index % 3 === 0
                      ? 'washi-tape-pink'
                      : index % 3 === 1
                      ? 'washi-tape-lavender'
                      : 'washi-tape-sunset'
                  } rounded-xs`}
                />

                {/* Photo Frame */}
                <div
                  onClick={() => setLightboxPhoto(photo)}
                  className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-stone-100 cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-stone-800 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Caption & Metadata */}
                <div className="pt-4 pb-2 px-1">
                  <p className="font-script-handwriting text-2xl text-stone-800 leading-snug mb-2">
                    {photo.caption}
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-rose-50">
                    <div className="flex items-center gap-3">
                      {photo.date && (
                        <span className="inline-flex items-center gap-1 text-rose-600">
                          <Calendar className="w-3 h-3" />
                          <span>{photo.date}</span>
                        </span>
                      )}
                      {photo.location && (
                        <span className="inline-flex items-center gap-1 text-stone-500">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span>{photo.location}</span>
                        </span>
                      )}
                    </div>

                    {/* Edit / Delete actions */}
                    <div className={`flex items-center gap-1 ${
                      isEditMode ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                    }`}>
                      <button
                        onClick={() => openEditModal(photo)}
                        title="Edit caption/details"
                        className="p-1.5 rounded-full text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this memory?')) {
                            onDeletePhoto(photo.id);
                          }
                        }}
                        title="Delete photo"
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

      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100">
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

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-2">
              Add A Photo Memory
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Upload a real photo of us, write a sweet caption, and save it to our collection.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Image selector */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Select Photo
                </label>
                <div className="border-2 border-dashed border-rose-200 rounded-2xl p-4 text-center hover:border-rose-400 transition-colors bg-rose-50/30">
                  {previewUrl ? (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-stone-100 mb-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
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
                      <span className="text-sm font-medium text-rose-600 block">
                        Choose photo file
                      </span>
                      <span className="text-xs text-stone-400">
                        Supports JPG, PNG, WEBP, HEIC
                      </span>
                      <input
                        type="file"
                        accept="image/*"
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
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Caption / Note
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Our cozy Sunday coffee date..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  required
                />
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Location / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Favorite cafe"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100">
            <button
              onClick={() => setEditingPhoto(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-2">
              Edit Photo Details
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={editingPhoto.url}
                  alt={editingPhoto.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Caption
                </label>
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
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  />
                </div>
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

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.caption}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />

            <div className="mt-4 text-center text-white px-4">
              <p className="font-script-handwriting text-3xl text-rose-200 mb-1">
                {lightboxPhoto.caption}
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-stone-300">
                {lightboxPhoto.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-300" />
                    <span>{lightboxPhoto.date}</span>
                  </span>
                )}
                {lightboxPhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-300" />
                    <span>{lightboxPhoto.location}</span>
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
