import React, { useState } from 'react';
import type { LoveNoteCard } from '../types';
import { Heart, Plus, Edit2, Trash2, Sparkles, Smile, MessageCircle, Sun, Coffee, X } from 'lucide-react';

interface LoveNotesSectionProps {
  notes: LoveNoteCard[];
  onAddNote: (note: Omit<LoveNoteCard, 'id'>) => void;
  onEditNote: (id: string, updates: Partial<LoveNoteCard>) => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isEditMode: boolean;
}

export const LoveNotesSection: React.FC<LoveNotesSectionProps> = ({
  notes,
  onAddNote,
  onEditNote,
  onDeleteNote,
  onToggleFavorite,
  isEditMode,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<LoveNoteCard | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<LoveNoteCard['category']>('heart');

  // Interactive flipped states for cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    onAddNote({
      title: title.trim(),
      message: message.trim(),
      category,
      favorite: false,
    });

    setTitle('');
    setMessage('');
    setCategory('heart');
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote || !title.trim() || !message.trim()) return;

    onEditNote(editingNote.id, {
      title: title.trim(),
      message: message.trim(),
      category,
    });

    setEditingNote(null);
    setTitle('');
    setMessage('');
  };

  const openEditModal = (note: LoveNoteCard) => {
    setEditingNote(note);
    setTitle(note.title);
    setMessage(note.message);
    setCategory(note.category || 'heart');
  };

  const getCategoryIcon = (cat?: string) => {
    switch (cat) {
      case 'smile':
        return <Smile className="w-5 h-5 text-amber-500" />;
      case 'laughter':
        return <Sparkles className="w-5 h-5 text-rose-500" />;
      case 'hug':
        return <Coffee className="w-5 h-5 text-orange-400" />;
      case 'voice':
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      case 'quirk':
        return <Sun className="w-5 h-5 text-pink-500" />;
      default:
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
    }
  };

  return (
    <section id="little-things" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/70 text-pink-700 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Little Details</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
          Little Things I Love About You
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          It is the tiny, quiet, everyday things about you that make my entire world so much brighter.
        </p>

        {/* Add Card Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="add-love-note-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium shadow-md shadow-pink-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Little Thing</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {notes.map((note, index) => {
          const isFlipped = !!flippedCards[note.id];

          return (
            <div
              key={note.id}
              onClick={() => toggleFlip(note.id)}
              className="relative group cursor-pointer perspective-1000 min-h-[240px] select-none"
            >
              {/* Card Container with interactive flip */}
              <div
                className={`w-full h-full rounded-3xl p-6 transition-all duration-500 flex flex-col justify-between shadow-md hover:shadow-xl border ${
                  note.favorite
                    ? 'bg-gradient-to-br from-rose-50/90 via-white to-pink-50/80 border-rose-200'
                    : 'bg-white/90 border-stone-200/80'
                } hover:-translate-y-1`}
              >
                {/* Washi tape accent on corner */}
                <div
                  className={`absolute -top-2.5 right-6 w-16 h-4 ${
                    index % 2 === 0 ? 'washi-tape-pink' : 'washi-tape-lavender'
                  } rounded-xs`}
                />

                {/* Top Row: Icon + Favorite Heart */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100">
                    {getCategoryIcon(note.category)}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(note.id);
                      }}
                      title="Favorite this note"
                      className="p-1.5 rounded-full text-stone-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          note.favorite ? 'fill-rose-500 text-rose-500' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="my-4">
                  <h3 className="font-serif-romantic text-lg font-semibold text-stone-900 mb-2">
                    {note.title}
                  </h3>
                  <p className="font-script-handwriting text-2xl text-stone-700 leading-relaxed">
                    {note.message}
                  </p>
                </div>

                {/* Bottom Row: Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-rose-50 text-xs text-stone-400">
                  <span className="font-sans text-[11px] text-rose-400">
                    {isFlipped ? '✨ Adored always' : 'Tap to cherish'}
                  </span>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-1 transition-opacity ${
                      isEditMode ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    <button
                      onClick={() => openEditModal(note)}
                      title="Edit note"
                      className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${note.title}"?`)) {
                          onDeleteNote(note.id);
                        }
                      }}
                      title="Delete note"
                      className="p-1 rounded-md text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Add Something You Love
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Write a sweet detail, quirk, or feeling that makes Rose special.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Title / Detail Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The way you scrunch your nose..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Category / Icon
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'heart', label: 'Heart' },
                    { id: 'smile', label: 'Smile' },
                    { id: 'laughter', label: 'Sparkle' },
                    { id: 'hug', label: 'Warmth' },
                    { id: 'voice', label: 'Chat' },
                    { id: 'quirk', label: 'Sunshine' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`px-3 py-1.5 text-xs rounded-xl border text-center transition-all ${
                        category === cat.id
                          ? 'bg-pink-500 text-white border-pink-500 shadow-xs'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Message / Thought
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write the heartfelt message here..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 font-script-handwriting text-xl"
                  required
                />
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
                  className="px-6 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium shadow-md shadow-pink-500/20 transition-all cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100">
            <button
              onClick={() => setEditingNote(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Edit Little Thing
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'heart', label: 'Heart' },
                    { id: 'smile', label: 'Smile' },
                    { id: 'laughter', label: 'Sparkle' },
                    { id: 'hug', label: 'Warmth' },
                    { id: 'voice', label: 'Chat' },
                    { id: 'quirk', label: 'Sunshine' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`px-3 py-1.5 text-xs rounded-xl border text-center transition-all ${
                        category === cat.id
                          ? 'bg-pink-500 text-white border-pink-500 shadow-xs'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 font-script-handwriting text-xl"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium shadow-md shadow-pink-500/20 transition-all cursor-pointer"
                >
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
