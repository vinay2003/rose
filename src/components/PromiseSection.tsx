import React, { useState } from 'react';
import { Heart, Sparkles, Edit3 } from 'lucide-react';
import { getLocalItem, setLocalItem } from '../utils/storage';

interface PromiseSectionProps {
  isEditMode: boolean;
}

export const PromiseSection: React.FC<PromiseSectionProps> = ({ isEditMode }) => {
  const DEFAULT_PROMISE_NOTE =
    "I promise to always listen with an open heart, to celebrate your happiest triumphs, to hold you through every storm, and to cherish every quiet ordinary day with you.";

  const [personalVow, setPersonalVow] = useState<string>(() =>
    getLocalItem('promise_personal_vow', DEFAULT_PROMISE_NOTE)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draftVow, setDraftVow] = useState(personalVow);

  const handleSave = () => {
    setPersonalVow(draftVow.trim());
    setLocalItem('promise_personal_vow', draftVow.trim());
    setIsEditing(false);
  };

  return (
    <section id="promise" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-16">
      
      {/* Decorative Outer Parchment Frame */}
      <div className="relative bg-gradient-to-br from-[#FFFDF9] via-[#FFF1F3] to-[#FAF5FF] rounded-3xl p-8 sm:p-14 md:p-16 shadow-2xl border-2 border-rose-200/80 text-center overflow-hidden">
        
        {/* Corner Washi Tape Ornaments */}
        <div className="absolute top-4 left-4 w-20 h-5 washi-tape-pink rounded-xs -rotate-12" />
        <div className="absolute top-4 right-4 w-20 h-5 washi-tape-lavender rounded-xs rotate-12" />
        <div className="absolute bottom-4 left-4 w-20 h-5 washi-tape-sunset rounded-xs rotate-6" />
        <div className="absolute bottom-4 right-4 w-20 h-5 washi-tape-pink rounded-xs -rotate-6" />

        {/* Wax Seal / Emblem at Top */}
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-xl shadow-rose-500/30 mb-8 transform hover:scale-105 transition-transform">
          <Heart className="w-8 h-8 fill-white" />
          <Sparkles className="w-4 h-4 text-amber-200 absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Section Pill */}
        <div className="block mb-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
            A Little Promise
          </span>
        </div>

        {/* Mandatory exact quote */}
        <blockquote className="font-serif-romantic text-2xl sm:text-3xl md:text-4xl text-stone-900 leading-snug max-w-3xl mx-auto mb-8 tracking-tight font-medium">
          &ldquo;Love isn't just about words. It's about listening, sharing the little moments, and showing up for each other.&rdquo;
        </blockquote>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 my-8 text-rose-300">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
          <Heart className="w-4 h-4 fill-rose-300 text-rose-400" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
        </div>

        {/* Personal Vow Note */}
        <div className={`max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl p-6 border shadow-xs mb-8 transition-colors ${
          isEditMode ? 'border-amber-300 ring-2 ring-amber-100' : 'border-rose-100'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              My Personal Promise To You
            </span>
            <button
              onClick={() => {
                setDraftVow(personalVow);
                setIsEditing(!isEditing);
              }}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit note'}</span>
            </button>
          </div>

          {isEditing ? (
            <div className="mt-2 space-y-3">
              <textarea
                rows={4}
                value={draftVow}
                onChange={(e) => setDraftVow(e.target.value)}
                className="w-full p-3 rounded-xl border border-rose-200 text-sm font-script-handwriting text-2xl focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 rounded-lg text-xs text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1.5 rounded-lg text-xs bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-xs"
                >
                  Save Promise
                </button>
              </div>
            </div>
          ) : (
            <p className="font-script-handwriting text-2xl sm:text-3xl text-rose-950/90 leading-relaxed">
              &ldquo;{personalVow}&rdquo;
            </p>
          )}
        </div>

        {/* Signature */}
        <div className="text-right max-w-2xl mx-auto pr-4">
          <p className="font-calligraphy text-3xl sm:text-4xl text-rose-700">
            Forever yours, Vinay
          </p>
        </div>
      </div>
    </section>
  );
};
