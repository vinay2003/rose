import React, { useState } from 'react';
import type { TimelineMilestone } from '../types';
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Camera,
  X,
  Heart,
  Clock,
  Film,
  Sparkles,
} from 'lucide-react';

interface TimelineSectionProps {
  milestones: TimelineMilestone[];
  onAddMilestone: (milestone: Omit<TimelineMilestone, 'id'>) => void;
  onEditMilestone: (id: string, updates: Partial<TimelineMilestone>) => void;
  onDeleteMilestone: (id: string) => void;
  isEditMode: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  milestones,
  onAddMilestone,
  onEditMilestone,
  onDeleteMilestone,
  isEditMode,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineMilestone | null>(null);
  const [previewMedia, setPreviewMedia] = useState<{ url: string; type: 'photo' | 'video'; title: string } | null>(null);

  // Form states
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [tag, setTag] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

  // Handle Photo / Video input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVid = file.type.startsWith('video/');
    setMediaType(isVid ? 'video' : 'photo');

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        if (isVid) {
          setVideoUrl(event.target.result);
          setPhotoUrl('');
        } else {
          setPhotoUrl(event.target.result);
          setVideoUrl('');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    onAddMilestone({
      date: date.trim(),
      time: time.trim() || undefined,
      title: title.trim(),
      description: description.trim(),
      location: location.trim() || undefined,
      photoUrl: photoUrl || undefined,
      videoUrl: videoUrl || undefined,
      mediaType,
      tag: tag.trim() || undefined,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !title.trim() || !date.trim()) return;

    onEditMilestone(editingItem.id, {
      date: date.trim(),
      time: time.trim() || undefined,
      title: title.trim(),
      description: description.trim(),
      location: location.trim() || undefined,
      photoUrl: photoUrl || editingItem.photoUrl,
      videoUrl: videoUrl || editingItem.videoUrl,
      mediaType: mediaType || editingItem.mediaType,
      tag: tag.trim() || editingItem.tag,
    });

    setEditingItem(null);
    resetForm();
  };

  const resetForm = () => {
    setDate('');
    setTime('');
    setTitle('');
    setDescription('');
    setLocation('');
    setPhotoUrl('');
    setVideoUrl('');
    setTag('');
    setMediaType('photo');
  };

  const openEditModal = (item: TimelineMilestone) => {
    setEditingItem(item);
    setDate(item.date);
    setTime(item.time || '');
    setTitle(item.title);
    setDescription(item.description);
    setLocation(item.location || '');
    setPhotoUrl(item.photoUrl || '');
    setVideoUrl(item.videoUrl || '');
    setTag(item.tag || '');
    setMediaType(item.mediaType || (item.videoUrl ? 'video' : 'photo'));
  };

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-medium mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Our Journey Together</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
          Our Story Timeline
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          Every milestone, exact moment, and real conversation marking the evolution of our love from day one to today.
        </p>

        {/* Add Milestone Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="add-timeline-milestone-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow-md shadow-amber-600/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone To Timeline</span>
          </button>
        </div>
      </div>

      {/* Timeline List */}
      {milestones.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm border-2 border-dashed border-amber-200 rounded-3xl p-10 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="font-serif-romantic text-xl text-stone-800 mb-2">No Timeline Events Added Yet</h3>
          <p className="text-sm text-stone-500 mb-6 leading-relaxed">
            Click below to document our real milestones with photos, videos, and exact timestamps.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Our First Milestone</span>
          </button>
        </div>
      ) : (
        <div className="relative max-w-4xl mx-auto">
          {/* Central connecting line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-300 via-amber-300 to-rose-400" />

          <div className="space-y-12">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const hasVideo = item.mediaType === 'video' || (item.videoUrl && item.videoUrl.length > 0);

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Central Heart Marker */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-rose-400 flex items-center justify-center shadow-md z-10 group-hover:scale-125 transition-transform">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                    <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 shadow-md hover:shadow-xl border border-rose-100/80 transition-all duration-300">
                      {/* Date & Time badges */}
                      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                            <Calendar className="w-3 h-3 text-rose-500" />
                            <span>{item.date}</span>
                          </span>

                          {item.time && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-100">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>{item.time}</span>
                            </span>
                          )}
                        </div>

                        {item.tag && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-100">
                            <Sparkles className="w-2.5 h-2.5 text-purple-500" />
                            <span>{item.tag}</span>
                          </span>
                        )}
                      </div>

                      {/* Milestone Title */}
                      <h3 className="font-serif-romantic text-xl text-stone-900 font-semibold mb-2">
                        {item.title}
                      </h3>

                      {/* Location */}
                      {item.location && (
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      )}

                      {/* Media: Video or Photo */}
                      {hasVideo && item.videoUrl ? (
                        <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-stone-900 my-3 shadow-inner">
                          <video
                            src={item.videoUrl}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium flex items-center gap-1 pointer-events-none">
                            <Film className="w-3 h-3 text-rose-400" />
                            <span>Video Moment</span>
                          </div>
                        </div>
                      ) : item.photoUrl ? (
                        <div
                          onClick={() => setPreviewMedia({ url: item.photoUrl!, type: 'photo', title: item.title })}
                          className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-stone-100 my-3 cursor-pointer group/media"
                        >
                          <img
                            src={item.photoUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/media:scale-105"
                            loading="lazy"
                          />
                        </div>
                      ) : null}

                      {/* Description */}
                      <p className="font-sans text-sm text-stone-600 leading-relaxed whitespace-pre-line mb-4">
                        {item.description}
                      </p>

                      {/* Actions */}
                      <div
                        className={`pt-2 border-t border-stone-100 flex items-center justify-end gap-2 text-stone-400 text-xs ${
                          isEditMode ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                        }`}
                      >
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Edit milestone"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${item.title}"?`)) {
                              onDeleteMilestone(item.id);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete milestone"
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
        </div>
      )}

      {/* Lightbox Preview for Photos */}
      {previewMedia && (
        <div
          onClick={() => setPreviewMedia(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-4xl w-full flex flex-col items-center">
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewMedia.url}
              alt={previewMedia.title}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-white text-base font-serif-romantic">{previewMedia.title}</p>
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                resetForm();
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">Add Milestone</h3>
            <p className="text-xs text-stone-500 mb-6">
              Add a real moment with exact date, time, and emotional context.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Secret Cafe Date"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
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
                    placeholder="e.g. November 12, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Exact Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 3:38 PM"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Location / Context</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. WhatsApp Call / Cafe"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Tag</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. #DateToMarry"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Story / Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what happened, what was said, and why it is special..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                />
              </div>

              {/* Media selector */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Attach Photo or Video</label>
                <div className="border-2 border-dashed border-amber-200 rounded-2xl p-3 text-center bg-amber-50/30">
                  {photoUrl || videoUrl ? (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-stone-100">
                      {mediaType === 'video' ? (
                        <video src={videoUrl} controls className="w-full h-full object-contain" />
                      ) : (
                        <img src={photoUrl} alt="Preview" className="w-full h-full object-contain" />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoUrl('');
                          setVideoUrl('');
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-3">
                      <Camera className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                      <span className="text-xs text-amber-800 font-medium block">Choose image or video</span>
                      <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow-md shadow-amber-600/20"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Milestone Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEditingItem(null);
                resetForm();
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">Edit Milestone</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Exact Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Story / Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow-md shadow-amber-600/20"
                >
                  Update Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
