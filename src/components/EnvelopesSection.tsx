import React, { useState } from 'react';
import type { OpenWhenLetter } from '../types';
import { Mail, Heart, Edit2, Plus, Trash2, X, RotateCcw } from 'lucide-react';
import { DEFAULT_ENVELOPES } from '../data/defaultData';

interface EnvelopesSectionProps {
  envelopes: OpenWhenLetter[];
  onUpdateEnvelope: (id: string, updates: Partial<OpenWhenLetter>) => void;
  onAddEnvelope: (envelope: Omit<OpenWhenLetter, 'id'>) => void;
  onDeleteEnvelope: (id: string) => void;
  isEditMode: boolean;
}

export const EnvelopesSection: React.FC<EnvelopesSectionProps> = ({
  envelopes,
  onUpdateEnvelope,
  onAddEnvelope,
  onDeleteEnvelope,
  isEditMode,
}) => {
  // Reading modal
  const [openedEnvelope, setOpenedEnvelope] = useState<OpenWhenLetter | null>(null);

  // Edit modal
  const [editingLetter, setEditingLetter] = useState<OpenWhenLetter | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editSealColor, setEditSealColor] = useState('#E11D48');

  // Add custom envelope modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSealColor, setNewSealColor] = useState('#E11D48');

  // Open Reading Modal
  const openEnvelope = (letter: OpenWhenLetter) => {
    setOpenedEnvelope(letter);
  };

  // Open Edit Modal
  const openEditModal = (letter: OpenWhenLetter) => {
    setEditingLetter(letter);
    setEditTitle(letter.title);
    setEditSubtitle(letter.subtitle);
    setEditContent(letter.content);
    setEditSealColor(letter.waxSealColor);
  };

  // Save Edit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLetter) return;

    onUpdateEnvelope(editingLetter.id, {
      title: editTitle.trim(),
      subtitle: editSubtitle.trim(),
      content: editContent.trim(),
      waxSealColor: editSealColor,
      lastEdited: new Date().toLocaleDateString(),
    });

    // Update opened letter if currently viewing
    if (openedEnvelope?.id === editingLetter.id) {
      setOpenedEnvelope({
        ...openedEnvelope,
        title: editTitle.trim(),
        subtitle: editSubtitle.trim(),
        content: editContent.trim(),
        waxSealColor: editSealColor,
      });
    }

    setEditingLetter(null);
  };

  // Add custom envelope
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddEnvelope({
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'A special note for you',
      category: 'custom',
      waxSealColor: newSealColor,
      paperStyle: 'cream',
      content: newContent.trim(),
      lastEdited: new Date().toLocaleDateString(),
    });

    setNewTitle('');
    setNewSubtitle('');
    setNewContent('');
    setIsAddModalOpen(false);
  };

  // Reset to default
  const handleResetToDefault = (id: string) => {
    const original = DEFAULT_ENVELOPES.find((d) => d.id === id);
    if (original && confirm('Reset this letter to its original text?')) {
      onUpdateEnvelope(id, {
        content: original.content,
        title: original.title,
        subtitle: original.subtitle,
      });
      if (openedEnvelope?.id === id) {
        setOpenedEnvelope({
          ...openedEnvelope,
          content: original.content,
          title: original.title,
          subtitle: original.subtitle,
        });
      }
    }
  };

  return (
    <section id="open-when" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-medium mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Little Love Letters</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4">
          Open When You Need Love
        </h2>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          Tender letters folded with care, meant to be opened whenever your heart needs a warm hug or a reminder of my love.
        </p>

        {/* Add Custom Envelope */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            id="add-envelope-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium shadow-md shadow-rose-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Another &ldquo;Open When&rdquo; Letter</span>
          </button>
        </div>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {envelopes.map((env) => (
          <div
            key={env.id}
            className="group relative flex flex-col items-center select-none"
          >
            {/* The Physical Envelope Simulation Card */}
            <div
              onClick={() => openEnvelope(env)}
              className="relative w-full aspect-16/11 bg-[#FAF5EF] rounded-3xl p-6 shadow-md hover:shadow-2xl border border-stone-200 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FFFDF9 0%, #FBF6EF 100%)',
              }}
            >
              {/* Envelope Triangular Fold Lines (CSS decorative) */}
              <div className="absolute inset-x-0 top-0 h-1/2 border-b border-stone-300/40 pointer-events-none transform -skew-y-3 origin-left" />
              <div className="absolute inset-x-0 top-0 h-1/2 border-b border-stone-300/40 pointer-events-none transform skew-y-3 origin-right" />

              {/* Top: Header note */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-rose-500">
                  OPEN WHEN...
                </span>
                <span className="text-xs text-stone-400 font-script-handwriting text-lg">
                  To: Rose
                </span>
              </div>

              {/* Center: Wax Seal Emblem */}
              <div className="relative z-10 my-auto flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: env.waxSealColor || '#E11D48',
                    boxShadow: `0 8px 20px -3px ${env.waxSealColor}55`,
                  }}
                >
                  <Heart className="w-8 h-8 text-white fill-white/90" />
                </div>
                <h3 className="font-serif-romantic font-semibold text-lg sm:text-xl text-stone-900 mt-4 text-center">
                  {env.title}
                </h3>
                <p className="text-xs text-stone-500 text-center max-w-xs mt-1">
                  {env.subtitle}
                </p>
              </div>

              {/* Bottom: Stamp info */}
              <div className="relative z-10 pt-2 flex items-center justify-between border-t border-stone-200/60 text-[11px] text-stone-400">
                <span className="font-sans flex items-center gap-1 text-rose-600 font-medium group-hover:underline">
                  <Mail className="w-3 h-3" />
                  <span>Click to open letter</span>
                </span>
                <span className="font-script-handwriting text-base text-stone-500">
                  From: Vinay
                </span>
              </div>
            </div>

            {/* Quick Action buttons below card */}
            <div className={`mt-3 flex items-center gap-3 text-xs text-stone-500 ${
              isEditMode ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
            }`}>
              <button
                onClick={() => openEditModal(env)}
                className="flex items-center gap-1 hover:text-rose-600 transition-colors py-1 px-2 rounded-md hover:bg-rose-50"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Letter</span>
              </button>

              {env.category === 'custom' && (
                <button
                  onClick={() => {
                    if (confirm(`Delete "${env.title}"?`)) {
                      onDeleteEnvelope(env.id);
                    }
                  }}
                  className="flex items-center gap-1 hover:text-red-600 transition-colors py-1 px-2 rounded-md hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reading Letter Modal */}
      {openedEnvelope && (
        <div
          onClick={() => setOpenedEnvelope(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto"
            style={{
              backgroundImage: 'radial-gradient(#FBCFE8 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpenedEnvelope(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Top Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-pink rounded-xs flex items-center justify-center text-[10px] font-semibold text-rose-900 tracking-wider">
              WITH ALL MY HEART
            </div>

            {/* Letter Header */}
            <div className="text-center mb-8 pb-6 border-b border-rose-100">
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3 shadow-md"
                style={{ backgroundColor: openedEnvelope.waxSealColor }}
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h3 className="font-serif-romantic text-2xl sm:text-3xl text-stone-900 mb-1">
                {openedEnvelope.title}
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                {openedEnvelope.subtitle}
              </p>
            </div>

            {/* Letter Content Styled as Lined Stationery Paper */}
            <div className="px-2 sm:px-6">
              <div className="font-script-handwriting text-2xl sm:text-3xl text-stone-800 leading-loose whitespace-pre-line">
                {openedEnvelope.content}
              </div>
            </div>

            {/* Letter Footer Actions */}
            <div className="mt-10 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(openedEnvelope)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit This Letter</span>
                </button>

                {DEFAULT_ENVELOPES.some((d) => d.id === openedEnvelope.id) && (
                  <button
                    onClick={() => handleResetToDefault(openedEnvelope.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-stone-500 hover:bg-stone-100 transition-colors"
                    title="Reset to default original wording"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setOpenedEnvelope(null)}
                className="px-6 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Fold Letter & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Letter Modal */}
      {editingLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingLetter(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Edit Letter: {editingLetter.title}
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Write your own personalized love letter for Rose when she opens this envelope.
            </p>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Envelope Title (e.g. When you miss me)
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Envelope Subtitle
                </label>
                <input
                  type="text"
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Wax Seal Color
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { color: '#E11D48', label: 'Rose Red' },
                    { color: '#D97706', label: 'Warm Amber' },
                    { color: '#7C3AED', label: 'Lavender Royal' },
                    { color: '#DB2777', label: 'Blush Pink' },
                    { color: '#059669', label: 'Emerald' },
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      onClick={() => setEditSealColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        editSealColor === c.color ? 'scale-125 ring-2 ring-stone-900 ring-offset-2' : ''
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Letter Body (Supports paragraphs)
                </label>
                <textarea
                  rows={9}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm font-script-handwriting text-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 leading-relaxed"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingLetter(null)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                >
                  Save Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Envelope Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-romantic text-2xl text-stone-900 mb-1">
              Create New Envelope
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Create a custom &ldquo;Open When...&rdquo; prompt (e.g. &ldquo;When we are celebrating something big&rdquo;).
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Title (e.g. When you cannot fall asleep)
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="When..."
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Subtitle / Mood
                </label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. For quiet late nights..."
                  className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Wax Seal Color
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { color: '#E11D48', label: 'Rose Red' },
                    { color: '#D97706', label: 'Warm Amber' },
                    { color: '#7C3AED', label: 'Lavender Royal' },
                    { color: '#DB2777', label: 'Blush Pink' },
                    { color: '#059669', label: 'Emerald' },
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      onClick={() => setNewSealColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        newSealColor === c.color ? 'scale-125 ring-2 ring-stone-900 ring-offset-2' : ''
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Letter Content
                </label>
                <textarea
                  rows={8}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write the letter here..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm font-script-handwriting text-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 leading-relaxed"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                >
                  Create Envelope
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
