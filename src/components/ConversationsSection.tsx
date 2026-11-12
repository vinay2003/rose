import React, { useState, useMemo } from 'react';
import type { ChatQuote } from '../types';
import {
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  X,
  Heart,
  Quote,
} from 'lucide-react';

interface ConversationsSectionProps {
  quotes: ChatQuote[];
  onAddQuote: (quote: Omit<ChatQuote, 'id'>) => void;
  onEditQuote: (id: string, updates: Partial<ChatQuote>) => void;
  onDeleteQuote: (id: string) => void;
  isEditMode: boolean;
}

export const ConversationsSection: React.FC<ConversationsSectionProps> = ({
  quotes,
  onAddQuote,
  onEditQuote,
  onDeleteQuote,
  isEditMode,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<ChatQuote | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Form states
  const [sender, setSender] = useState<'Vinay' | 'Rose' | 'Both'>('Rose');
  const [quoteText, setQuoteText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');

  // Extract unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    quotes.forEach((q) => {
      if (q.tag) set.add(q.tag);
    });
    return Array.from(set);
  }, [quotes]);

  const filteredQuotes = useMemo(() => {
    if (selectedTag === 'all') return quotes;
    return quotes.filter((q) => q.tag === selectedTag);
  }, [quotes, selectedTag]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteText.trim()) return;

    onAddQuote({
      sender,
      quote: quoteText.trim(),
      date: date.trim() || 'A sweet moment',
      time: time.trim() || undefined,
      note: note.trim() || undefined,
      tag: tag.trim() || undefined,
    });

    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuote || !quoteText.trim()) return;

    onEditQuote(editingQuote.id, {
      sender,
      quote: quoteText.trim(),
      date: date.trim() || editingQuote.date,
      time: time.trim() || undefined,
      note: note.trim() || undefined,
      tag: tag.trim() || undefined,
    });

    setEditingQuote(null);
    resetForm();
  };

  const resetForm = () => {
    setSender('Rose');
    setQuoteText('');
    setDate('');
    setTime('');
    setNote('');
    setTag('');
  };

  const openEditModal = (q: ChatQuote) => {
    setEditingQuote(q);
    setSender(q.sender);
    setQuoteText(q.quote);
    setDate(q.date);
    setTime(q.time || '');
    setNote(q.note || '');
    setTag(q.tag || '');
  };

  return (
    <section id="conversations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100/70 text-violet-700 text-xs font-medium mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Echoes of Our Words</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
          Our Real Conversations
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          The unforgettable texts, playful laughter, and deep vows that captured our hearts and defined our story.
        </p>

        {/* Add Quote Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="add-conversation-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium shadow-md shadow-violet-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add A Conversation Quote</span>
          </button>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
            selectedTag === 'all'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-violet-50 hover:text-violet-700'
          }`}
        >
          All Quotes ({quotes.length})
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedTag === t
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-violet-50 hover:text-violet-700'
            }`}
          >
            #{t}
          </button>
        ))}
      </div>

      {/* Quotes Scrapbook Grid */}
      {filteredQuotes.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm border-2 border-dashed border-violet-200 rounded-3xl p-10 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-violet-50 text-violet-400 mx-auto flex items-center justify-center mb-4">
            <Quote className="w-8 h-8" />
          </div>
          <h3 className="font-serif-romantic text-xl text-stone-800 mb-2">No Chat Memories In This Category</h3>
          <p className="text-sm text-stone-500 mb-6 leading-relaxed">
            Click below to add a real quote or choose another category tag.
          </p>
          <button
            onClick={() => setSelectedTag('all')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-800 text-sm font-medium transition-colors cursor-pointer"
          >
            <span>View All Quotes</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map((item, idx) => (
            <div
              key={item.id}
              className="relative group bg-white/95 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-violet-100/80 flex flex-col justify-between"
            >
              {/* Paper pin / washi tape */}
              <div
                className={`absolute -top-2 left-8 w-14 h-4 ${
                  idx % 2 === 0 ? 'washi-tape-lavender' : 'washi-tape-pink'
                } rounded-xs`}
              />

              {/* Top Meta: Sender & Date */}
              <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.sender === 'Rose'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : item.sender === 'Vinay'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-violet-100 text-violet-800 border border-violet-200'
                      }`}
                    >
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{item.sender}</span>
                    </span>

                    {item.tag && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium">
                        #{item.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-violet-400" />
                      <span>{item.date}</span>
                    </span>
                    {item.time && (
                      <span className="flex items-center gap-1 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100 text-stone-600">
                        <Clock className="w-3 h-3 text-violet-400" />
                        <span>{item.time}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Dialogue Bubbles or Standard Quote */}
                {item.dialogue && item.dialogue.length > 0 ? (
                  <div className="space-y-2.5 my-4 bg-stone-50/70 p-3.5 rounded-2xl border border-stone-100">
                    {item.dialogue.map((d, dIdx) => {
                      const isVinay = d.speaker === 'Vinay';
                      return (
                        <div
                          key={dIdx}
                          className={`flex flex-col ${isVinay ? 'items-end' : 'items-start'}`}
                        >
                          <div className="text-[10px] font-medium text-stone-400 mb-0.5 px-1">
                            {d.speaker} {d.time ? `• ${d.time}` : ''}
                          </div>
                          <div
                            className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                              isVinay
                                ? 'bg-sky-500 text-white rounded-tr-xs'
                                : 'bg-white text-stone-800 border border-rose-100 rounded-tl-xs'
                            }`}
                          >
                            {d.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="relative pl-3 border-l-2 border-violet-300 my-4">
                    <Quote className="w-4 h-4 text-violet-300 absolute -top-2 -left-2 fill-violet-100" />
                    <p className="font-serif-romantic italic text-base sm:text-lg text-stone-800 leading-relaxed whitespace-pre-line">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                )}

                {/* Personal Note / Why this made me smile */}
                {item.note && (
                  <div className="mt-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs">
                    <span className="font-semibold text-amber-800 block mb-0.5">
                      Why this made my heart race:
                    </span>
                    <p className="font-script-handwriting text-lg text-amber-900 leading-snug">
                      {item.note}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div
                className={`pt-4 mt-2 border-t border-stone-100 flex items-center justify-end gap-2 text-stone-400 ${
                  isEditMode ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                }`}
              >
                <button
                  onClick={() => openEditModal(item)}
                  title="Edit quote"
                  className="p-1.5 rounded-lg hover:text-violet-600 hover:bg-violet-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this conversation memory?')) {
                      onDeleteQuote(item.id);
                    }
                  }}
                  title="Delete quote"
                  className="p-1.5 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Quote Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-violet-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                resetForm();
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">Add Chat Memory</h3>
            <p className="text-xs text-stone-500 mb-6">
              Record a real quote or dialogue from our WhatsApp conversations.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Who said it?</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Rose', 'Vinay', 'Both'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSender(s)}
                      className={`py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        sender === s
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Quote / Message</label>
                <textarea
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="e.g. It's locked and I threw the key already! 🗝️"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Exact Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 3:48 PM"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Tag (Optional)</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Locked Forever, Banter, Dreams"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Why this made my heart race (Personal Note)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Because she said she threw away the key forever..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
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
                  className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium shadow-md shadow-violet-600/20"
                >
                  Save Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Quote Modal */}
      {editingQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-violet-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEditingQuote(null);
                resetForm();
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">Edit Quote</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Speaker</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Rose', 'Vinay', 'Both'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSender(s)}
                      className={`py-2 rounded-xl text-xs font-medium transition-all ${
                        sender === s
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Quote</label>
                <textarea
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Exact Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Tag</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Personal Note</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingQuote(null)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium shadow-md shadow-violet-600/20"
                >
                  Update Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
