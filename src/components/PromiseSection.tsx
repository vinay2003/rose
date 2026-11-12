import React, { useState } from 'react';
import { Heart, Sparkles, Edit3, ShieldCheck, Compass, CheckCircle2, Star } from 'lucide-react';
import { getLocalItem, setLocalItem } from '../utils/storage';

interface PromiseSectionProps {
  isEditMode: boolean;
}

export const PromiseSection: React.FC<PromiseSectionProps> = ({ isEditMode }) => {
  const DEFAULT_PROMISE_NOTE =
    "I promise to always include you in my future plans, remember every small detail you share, stand by you through every storm, take you to Hong Kong Disneyland to heal your inner child, and love you with absolute trust and loyalty forever. I date to marry you, Rose.";

  const [personalVow, setPersonalVow] = useState<string>(() =>
    getLocalItem('promise_personal_vow_v2', DEFAULT_PROMISE_NOTE)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draftVow, setDraftVow] = useState(personalVow);

  const handleSave = () => {
    setPersonalVow(draftVow.trim());
    setLocalItem('promise_personal_vow_v2', draftVow.trim());
    setIsEditing(false);
  };

  const corePromises = [
    {
      title: 'Always Include You in My Future',
      quote: '"Someone that includes me in his future plans — through ups and downs in life."',
      desc: 'You will never have to wonder where you stand. Every dream, every milestone, and every tomorrow has you at the very center.',
      icon: <Compass className="w-5 h-5 text-rose-500" />,
    },
    {
      title: 'Remember Every Small Detail',
      quote: '"The little things mean the most — remembering small details, making time for me."',
      desc: 'From your favorite food and fashion pattern sketches to your exact nap times and coffee cravings — I will never stop cherishing the little things.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    },
    {
      title: 'Hong Kong Disneyland Hand in Hand',
      quote: '"To fulfill that dream of mine to heal the inner child in me."',
      desc: 'I promise to walk through the Disney castle with you, buy you Mickey ears, and make that grade-school dream come true with pure joy.',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    },
    {
      title: 'Unshakable Trust & Loyalty',
      quote: '"Long distance or not, it needs trust and loyalty so no one can take that apart."',
      desc: 'A love built on honesty, respect, and steadfast presence. Distance is just a test of time, and my loyalty belongs solely to you.',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
    },
    {
      title: 'Cheering for Your Passions',
      quote: '"I actually draft some patterns about fashion designing."',
      desc: 'I will always champion your creative heart, encourage your studies in Tourism, and celebrate every single sketch and accomplishment.',
      icon: <Star className="w-5 h-5 text-violet-500" />,
    },
    {
      title: 'Dating to Marry — Forever Wifey',
      quote: '"I date to marry, not to waste time. Decide to be together forever."',
      desc: 'I am not here for temporary moments. I love you with the certainty of a husband, forever your Spider-Man, building a forever home together.',
      icon: <Heart className="w-5 h-5 text-rose-600 fill-rose-100" />,
    },
  ];

  return (
    <section id="promise" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-16">
      {/* Decorative Outer Parchment Frame */}
      <div className="relative bg-gradient-to-br from-[#FFFDF9] via-[#FFF1F3] to-[#FAF5FF] rounded-3xl p-6 sm:p-12 md:p-14 shadow-2xl border-2 border-rose-200/80 text-center overflow-hidden">
        {/* Corner Washi Tape Ornaments */}
        <div className="absolute top-4 left-4 w-20 h-5 washi-tape-pink rounded-xs -rotate-12" />
        <div className="absolute top-4 right-4 w-20 h-5 washi-tape-lavender rounded-xs rotate-12" />
        <div className="absolute bottom-4 left-4 w-20 h-5 washi-tape-sunset rounded-xs rotate-6" />
        <div className="absolute bottom-4 right-4 w-20 h-5 washi-tape-pink rounded-xs -rotate-6" />

        {/* Wax Seal / Emblem at Top */}
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-xl shadow-rose-500/30 mb-6 transform hover:scale-105 transition-transform">
          <Heart className="w-8 h-8 fill-white" />
          <Sparkles className="w-4 h-4 text-amber-200 absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Section Pill */}
        <div className="block mb-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-rose-500 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
            Sacred Promises to My Rose
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif-romantic text-3xl sm:text-4xl text-stone-900 mb-4 font-semibold">
          The Vows That Guide My Heart
        </h2>

        {/* Mandatory exact quote */}
        <blockquote className="font-serif-romantic text-xl sm:text-2xl text-stone-800 leading-snug max-w-2xl mx-auto mb-8 font-medium">
          &ldquo;Love isn&apos;t just about words. It&apos;s about listening, sharing the little moments, and showing up for each other.&rdquo;
        </blockquote>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left my-8">
          {corePromises.map((p, idx) => (
            <div
              key={idx}
              className="bg-white/85 backdrop-blur-xs rounded-2xl p-5 border border-rose-100 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">{p.icon}</div>
                <h3 className="font-serif-romantic font-semibold text-base text-stone-900">{p.title}</h3>
              </div>
              <p className="text-xs text-rose-700/80 italic font-medium mb-1.5">{p.quote}</p>
              <p className="text-xs text-stone-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 my-8 text-rose-300">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
          <Heart className="w-4 h-4 fill-rose-300 text-rose-400" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
        </div>

        {/* Personal Vow Note */}
        <div
          className={`max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 border shadow-xs mb-8 transition-colors ${
            isEditMode ? 'border-amber-300 ring-2 ring-amber-100' : 'border-rose-100'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              My Personal Vow to You
            </span>
            <button
              onClick={() => {
                setDraftVow(personalVow);
                setIsEditing(!isEditing);
              }}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit vow'}</span>
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
                  className="px-4 py-1.5 rounded-lg text-xs bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-xs cursor-pointer"
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
          <p className="text-xs text-stone-400 mt-1 font-sans">
            Your Spider-Man husband • November 2026
          </p>
        </div>
      </div>
    </section>
  );
};
