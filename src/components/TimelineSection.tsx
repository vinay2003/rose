import React, { useState } from 'react';
import type { TimelineMilestone } from '../types';
import { Calendar, Plus, Edit2, Trash2, MapPin, Camera, X, Heart, Clock } from 'lucide-react';

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

  // Form states
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  // Handle Photo input
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setPhotoUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    onAddMilestone({
      date: date.trim(),
      title: title.trim(),
      description: description.trim(),
      location: location.trim() || undefined,
      photoUrl: photoUrl || undefined,
    });

    setDate('');
    setTitle('');
    setDescription('');
    setLocation('');
    setPhotoUrl('');
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !title.trim() || !date.trim()) return;

    onEditMilestone(editingItem.id, {
      date: date.trim(),
      title: title.trim(),
      description: description.trim(),
      location: location.trim() || undefined,
      photoUrl: photoUrl || editingItem.photoUrl,
    });

    setEditingItem(null);
    setDate('');
    setTitle('');
    setDescription('');
    setLocation('');
    setPhotoUrl('');
  };

  const openEditModal = (item: TimelineMilestone) => {
    setEditingItem(item);
    setDate(item.date);
    setTitle(item.title);
    setDescription(item.description);
    setLocation(item.location || '');
    setPhotoUrl(item.photoUrl || '');
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
          Our Timeline
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          The dates, milestones, and memories that mark our story. Add real memories as our adventure unfolds.
        </p>

        {/* Add Milestone Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="add-timeline-milestone-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow-md shadow-amber-600/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory To Timeline</span>
          </button>
        </div>
      </div>

      {/* Timeline List or Empty State */}
      {milestones.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm border-2 border-dashed border-amber-200 rounded-3xl p-10 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="font-serif-romantic text-xl text-stone-800 mb-2">
            No Timeline Events Added Yet
          </h3>
          <p className="text-sm text-stone-500 mb-6 leading-relaxed">
            Every love story has its unforgettable days. Click below to document our real first date, anniversary, or special milestone without any fabricated events.
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
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-rose-200 via-amber-200 to-rose-200" />

          <div className="space-y-12">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;

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
                    <div className="bg-white/95 rounded-3xl p-6 shadow-md hover:shadow-xl border border-rose-100/80 transition-all duration-300">
                      
                      {/* Date badge & Location */}
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                          <Calendar className="w-3 h-3" />
                          <span>{item.date}</span>
                        </span>

                        {item.location && (
                          <span className="flex items-center gap-1 text-xs text-stone-500">
                            <MapPin className="w-3 h-3 text-rose-400" />
                            <span>{item.location}</span>
                          </span>
                        )}
                      </div>

                      {/* Milestone Title */}
                      <h3 className="font-serif-romantic text-xl text-stone-900 font-semibold mb-2">
                        {item.title}
                      </h3>

                      {/* Photo if provided */}
                      {item.photoUrl && (
                        <div className="aspect-16/9 w-full rounded-2xl overflow-hidden bg-stone-100 my-3">
                          <img
                            src={item.photoUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <p className="font-sans text-sm text-stone-600 leading-relaxed whitespace-pre-line mb-4">
                        {item.description}
                      </p>

                      {/* Actions */}
                      <div className={`pt-2 border-t border-stone-100 flex items-center justify-end gap-2 text-stone-400 text-xs ${
                        isEditMode ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                      }`}>
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

      {/* Add Milestone Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setPhotoUrl('');
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Add Timeline Milestone
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Add a real moment from our story with the date, description, and optional photo.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. October 12, 2024"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. By the ocean"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Day We Met / Our First Trip"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Story & Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell the story of what happened on this day..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                />
              </div>

              {/* Optional Photo upload */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Photo from this Day (Optional)
                </label>
                <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50">
                  {photoUrl ? (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-stone-200">
                      <img
                        src={photoUrl}
                        alt="Milestone preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotoUrl('')}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 py-3 text-xs text-amber-700 hover:text-amber-800 cursor-pointer font-medium">
                      <Camera className="w-4 h-4" />
                      <span>Upload milestone photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow-md shadow-amber-600/20 transition-all cursor-pointer"
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
              onClick={() => setEditingItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Edit Milestone
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                    required
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Story & Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Photo
                </label>
                <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50">
                  {photoUrl ? (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-stone-200">
                      <img
                        src={photoUrl}
                        alt="Milestone"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotoUrl('')}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center gap-2 py-3 text-xs text-amber-700 hover:text-amber-800 cursor-pointer font-medium">
                      <Camera className="w-4 h-4" />
                      <span>Upload milestone photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium shadow-md shadow-amber-600/20 transition-all cursor-pointer"
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
