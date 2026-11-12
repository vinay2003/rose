import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, Heart, Calendar, X, Edit3, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEFAULT_DAILY_LETTERS, type DailyLetter } from '../data/dailyLetters';
import { getLocalItem, setLocalItem } from '../utils/storage';

interface DailyLoveLetterSectionProps {
  isEditMode: boolean;
}

export const DailyLoveLetterSection: React.FC<DailyLoveLetterSectionProps> = ({ isEditMode }) => {
  // Letters loaded from local storage or defaults
  const [letters, setLetters] = useState<DailyLetter[]>(() =>
    getLocalItem<DailyLetter[]>('daily_love_letters', DEFAULT_DAILY_LETTERS)
  );

  // Sync with local storage
  useEffect(() => {
    setLocalItem('daily_love_letters', letters);
  }, [letters]);

  // Today's date info
  const today = new Date();
  const currentDayOfMonth = today.getDate(); // 1 to 31
  const [selectedDay, setSelectedDay] = useState<number>(currentDayOfMonth);

  // Modal open state
  const [isOpen, setIsOpen] = useState(false);

  // Editing state for Vinay
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSalutation, setEditSalutation] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [editWhisper, setEditWhisper] = useState('');

  // Active letter for current view
  const activeLetter = letters.find((l) => l.day === selectedDay) || letters[0];

  // Formatted date string
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate day count since Official Date (October 15, 2026)
  const officialDate = new Date(2026, 9, 15); // Month is 0-indexed: 9 = October
  const diffTime = today.getTime() - officialDate.getTime();
  const dayStreak = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);

  // Trigger Letter Opening with Daisy & Tulip Confetti
  const handleOpenLetter = () => {
    setIsOpen(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#FB7185', '#FDE047', '#FEF08A', '#FFFFFF', '#F472B6'],
      });
    } catch {
      // safe fallback
    }
  };

  // Start edit
  const handleStartEdit = () => {
    setEditTitle(activeLetter.title);
    setEditSalutation(activeLetter.salutation);
    setEditMessage(activeLetter.message);
    setEditWhisper(activeLetter.whisper);
    setIsEditing(true);
  };

  // Save edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setLetters((prev) =>
      prev.map((l) =>
        l.day === selectedDay
          ? {
              ...l,
              title: editTitle.trim() || l.title,
              salutation: editSalutation.trim() || l.salutation,
              message: editMessage.trim() || l.message,
              whisper: editWhisper.trim() || l.whisper,
            }
          : l
      )
    );
    setIsEditing(false);
  };

  // Reset all daily letters to defaults
  const handleResetLetters = () => {
    if (window.confirm('Reset all 31 daily letters back to default messages?')) {
      setLetters(DEFAULT_DAILY_LETTERS);
      setIsEditing(false);
    }
  };

  return (
    <section id="daily-letter" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
      
      {/* Outer Romantic Envelope Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/90 via-white to-amber-50/80 rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-rose-200/80 backdrop-blur-sm">
        
        {/* Floral Top Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="tulip">🌷</span>
            <span className="text-2xl" role="img" aria-label="daisy">🌼</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-romantic text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
                  Today&apos;s Love Letter
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-700 uppercase tracking-wider">
                  Daily Fresh
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span>{formattedDate}</span>
                <span className="text-rose-300">•</span>
                <span className="text-rose-600 font-medium">Day {dayStreak} with My Rose ❤️</span>
              </p>
            </div>
          </div>

          {/* Edit Mode Day Selector */}
          {isEditMode && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-1.5 text-xs text-amber-900">
              <span className="font-medium px-1">Preview Day:</span>
              <select
                value={selectedDay}
                onChange={(e) => {
                  setSelectedDay(Number(e.target.value));
                  setIsEditing(false);
                }}
                className="bg-white border border-amber-300 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Day {d} {d === currentDayOfMonth ? '(Today)' : ''}
                  </option>
                ))}
              </select>
              <button
                onClick={handleResetLetters}
                title="Reset to original 31 letters"
                className="p-1 text-amber-700 hover:text-amber-900 rounded hover:bg-amber-100"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Envelope Interactive Preview Box */}
        <div className="relative bg-gradient-to-b from-[#FFFDF9] to-[#FFF8F8] border border-rose-200/90 rounded-2xl p-6 sm:p-8 text-center shadow-inner">
          {/* Cute Floating Tulips & Daisies in corner */}
          <div className="absolute top-3 left-4 text-xl opacity-60 select-none">🌷</div>
          <div className="absolute top-3 right-4 text-xl opacity-60 select-none">🌼</div>
          <div className="absolute bottom-3 left-4 text-xl opacity-60 select-none">🌼</div>
          <div className="absolute bottom-3 right-4 text-xl opacity-60 select-none">🌷</div>

          {/* Stamp & Wax Seal Mockup */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 p-1 shadow-lg shadow-rose-500/30 flex items-center justify-center transform transition-all duration-300 hover:scale-105 cursor-pointer"
               onClick={handleOpenLetter}>
            <div className="w-full h-full rounded-full border-2 border-dashed border-rose-200 flex flex-col items-center justify-center text-white">
              <span className="text-xl sm:text-2xl">🌷🌼</span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-rose-100 mt-0.5">
                Day {selectedDay}
              </span>
            </div>
          </div>

          <h3 className="font-serif-romantic text-2xl sm:text-3xl text-stone-900 font-semibold mb-2">
            &ldquo;{activeLetter.title}&rdquo;
          </h3>

          <p className="font-script-handwriting text-xl sm:text-2xl text-rose-800/90 max-w-xl mx-auto mb-6">
            {activeLetter.whisper}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleOpenLetter}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-500 text-white font-medium text-sm sm:text-base shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Open Today&apos;s Letter</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </button>

            {isEditMode && (
              <button
                onClick={handleStartEdit}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Day {selectedDay}&apos;s Letter</span>
              </button>
            )}
          </div>

          {/* Subtext info */}
          <p className="mt-4 text-xs text-stone-400 font-sans">
            A brand new love letter unlocks automatically every day at 12:00 AM midnight 💌
          </p>
        </div>
      </div>

      {/* READING MODAL */}
      {isOpen && (
        <div
          onClick={() => {
            if (!isEditing) setIsOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-rose-200 text-stone-800"
          >
            {/* Top Close Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsEditing(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-rose-50 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Vintage Postcard Floral Header */}
            <div className="text-center pb-5 mb-6 border-b border-rose-100">
              <div className="flex items-center justify-center gap-2 text-2xl mb-2">
                <span>🌷</span>
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
                <span>🌼</span>
              </div>
              <span className="text-[11px] font-semibold text-rose-500 uppercase tracking-widest block">
                Written with love for Rose • Day {activeLetter.day} of 31
              </span>
              <h3 className="font-serif-romantic text-2xl sm:text-3xl text-stone-900 font-bold mt-1">
                {activeLetter.title}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {formattedDate} • Visayas to My Heart
              </p>
            </div>

            {/* Editing Form for Vinay OR Letter Display */}
            {isEditing ? (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Letter Title:
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Salutation (e.g., My Dearest Rose / Mahal Kong Palangga):
                  </label>
                  <input
                    type="text"
                    value={editSalutation}
                    onChange={(e) => setEditSalutation(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Letter Message:
                  </label>
                  <textarea
                    rows={6}
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none leading-relaxed"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Daily Whisper Quote:
                  </label>
                  <input
                    type="text"
                    value={editWhisper}
                    onChange={(e) => setEditWhisper(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Salutation */}
                <p className="font-serif-romantic text-xl sm:text-2xl text-rose-900 font-semibold">
                  {activeLetter.salutation}
                </p>

                {/* Letter Body */}
                <div className="font-serif text-base sm:text-lg text-stone-700 leading-relaxed space-y-4 whitespace-pre-line">
                  {activeLetter.message}
                </div>

                {/* Whisper Quote Highlight */}
                <div className="bg-rose-50/70 border-l-4 border-rose-400 p-4 rounded-r-xl">
                  <p className="font-script-handwriting text-xl sm:text-2xl text-rose-900">
                    {activeLetter.whisper}
                  </p>
                </div>

                {/* Sign-off */}
                <div className="pt-4 border-t border-rose-100 flex items-center justify-between">
                  <div>
                    <p className="font-serif-romantic text-xs text-stone-400 uppercase tracking-widest">
                      Forever Yours,
                    </p>
                    <p className="font-calligraphy text-3xl sm:text-4xl text-rose-600 font-bold mt-1">
                      Vinay ❤️
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditMode && (
                      <button
                        onClick={handleStartEdit}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    )}

                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      Keep in My Heart ✨
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
