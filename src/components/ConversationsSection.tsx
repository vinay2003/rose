import React, { useState } from 'react';
import type { ChatQuote } from '../types';
import { MessageSquare, Plus, Edit2, Trash2, Calendar, X, Heart, Quote } from 'lucide-react';

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

  // Form states
  const [sender, setSender] = useState<'Vinay' | 'Rose' | 'Both'>('Rose');
  const [quoteText, setQuoteText] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [tag, setTag] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteText.trim()) return;

    onAddQuote({
      sender,
      quote: quoteText.trim(),
      date: date.trim() || 'A sweet moment',
      note: note.trim() || undefined,
      tag: tag.trim() || undefined,
    });

    setQuoteText('');
    setDate('');
    setNote('');
    setTag('');
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuote || !quoteText.trim()) return;

    onEditQuote(editingQuote.id, {
      sender,
      quote: quoteText.trim(),
      date: date.trim() || editingQuote.date,
      note: note.trim() || undefined,
      tag: tag.trim() || undefined,
    });

    setEditingQuote(null);
    setQuoteText('');
    setDate('');
    setNote('');
    setTag('');
  };

  const openEditModal = (q: ChatQuote) => {
    setEditingQuote(q);
    setSender(q.sender);
    setQuoteText(q.quote);
    setDate(q.date);
    setNote(q.note || '');
    setTag(q.tag || '');
  };

  return (
    <section id="conversations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100/70 text-violet-700 text-xs font-medium mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Echoes of Our Words</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
          Our Conversations
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          A personal scrapbook of the real texts, late-night calls, and little words that still make my heart race.
        </p>

        {/* Add Quote Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="add-conversation-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium shadow-md shadow-violet-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add A Chat Memory</span>
          </button>
        </div>
      </div>

      {/* Quotes Scrapbook Grid or Empty State */}
      {quotes.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-sm border-2 border-dashed border-violet-200 rounded-3xl p-10 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-violet-50 text-violet-400 mx-auto flex items-center justify-center mb-4">
            <Quote className="w-8 h-8" />
          </div>
          <h3 className="font-serif-romantic text-xl text-stone-800 mb-2">
            No Chat Memories Added Yet
          </h3>
          <p className="text-sm text-stone-500 mb-6 leading-relaxed">
            Record real quotes, messages, and funny moments from our conversations. Click below to add the first real conversation quote!
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-800 text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Our First Chat Quote</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((item, idx) => (
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.sender === 'Rose'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : item.sender === 'Vinay'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{item.sender}</span>
                    </span>

                    {item.tag && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-500">
                        #{item.tag}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                </div>

                {/* Quote Text */}
                <div className="relative pl-3 border-l-2 border-violet-200 my-4">
                  <Quote className="w-4 h-4 text-violet-300 absolute -top-2 -left-2 fill-violet-100" />
                  <p className="font-serif-romantic italic text-lg sm:text-xl text-stone-800 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Personal Note / Why this made me smile sticky */}
                {item.note && (
                  <div className="mt-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs">
                    <span className="font-semibold text-amber-800 block mb-0.5">
                      Why this made me smile:
                    </span>
                    <p className="font-script-handwriting text-lg text-amber-900 leading-snug">
                      {item.note}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className={`pt-4 mt-2 border-t border-stone-100 flex items-center justify-end gap-2 text-stone-400 ${
                isEditMode ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
              }`}>
                <button
                  onClick={() => openEditModal(item)}
                  title="Edit quote"
                  className="p-1.5 rounded-lg hover:text-violet-600 hover:bg-violet-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this chat memory?')) {
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-violet-100">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Add Chat Memory
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Record a real quote from messages, late night talks, or cute moments.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Who said this?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Rose', 'Vinay', 'Both'] as const).map((person) => (
                    <button
                      key={person}
                      type="button"
                      onClick={() => setSender(person)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border text-center transition-all ${
                        sender === person
                          ? 'bg-violet-600 text-white border-violet-600 shadow-xs'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {person}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  The Quote / Message
                </label>
                <textarea
                  rows={3}
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="e.g. You always know how to make me laugh even on my worst day..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Date / Time (e.g. Oct 14, 2024 or 2am call)
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Oct 14, 2024"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. cute, late-night, funny"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Personal Note / Why this made me smile (Optional)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. I was having a stressful day at work and this message completely melted me."
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 font-script-handwriting text-lg"
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
                  className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium shadow-md shadow-violet-500/20 transition-all cursor-pointer"
                >
                  Save Chat Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-violet-100">
            <button
              onClick={() => setEditingQuote(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Edit Chat Memory
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Sender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Rose', 'Vinay', 'Both'] as const).map((person) => (
                    <button
                      key={person}
                      type="button"
                      onClick={() => setSender(person)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border text-center transition-all ${
                        sender === person
                          ? 'bg-violet-600 text-white border-violet-600 shadow-xs'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {person}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  The Quote
                </label>
                <textarea
                  rows={3}
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Date / Time
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Personal Note
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 font-script-handwriting text-lg"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingQuote(null)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium shadow-md shadow-violet-500/20 transition-all cursor-pointer"
                >
                  Update Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
