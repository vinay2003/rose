import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, X } from 'lucide-react';

export const FinalSurprise: React.FC = () => {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);

  const triggerSurprise = () => {
    setIsSurpriseOpen(true);

    // Fire romantic heart and pastel confetti
    try {
      // First burst
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FDA4AF', '#F43F5E', '#E11D48', '#FED7AA', '#DDD6FE', '#FFF1F2'],
      });

      // Second gentle wave
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.2, y: 0.65 },
          colors: ['#F43F5E', '#FB7185', '#FFF1F2'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.8, y: 0.65 },
          colors: ['#F43F5E', '#FB7185', '#FFF1F2'],
        });
      }, 350);
    } catch (e) {
      console.warn('Confetti trigger failed:', e);
    }
  };

  return (
    <section id="surprise" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-16 text-center">
      
      {/* Decorative Container */}
      <div className="relative bg-gradient-to-br from-rose-100/60 via-pink-50 to-purple-100/50 rounded-3xl p-10 sm:p-16 shadow-xl border border-rose-200/80">
        
        {/* Gift badge */}
        <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-500/25 animate-float-gentle">
          <Gift className="w-8 h-8" />
        </div>

        {/* Heading */}
        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4 tracking-tight">
          One last little thing, Rose.
        </h2>

        {/* Message */}
        <p className="font-script-handwriting text-2xl sm:text-3xl text-rose-950/90 leading-relaxed max-w-xl mx-auto mb-10">
          &ldquo;I'm really glad you became one of my favorite parts of life.&rdquo;
        </p>

        {/* Button */}
        <button
          onClick={triggerSurprise}
          id="open-your-surprise-btn"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium text-white rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span>Open Your Surprise</span>
          <Heart className="w-5 h-5 fill-current text-white group-hover:scale-125 transition-transform" />
        </button>
      </div>

      {/* Grand Romantic Surprise Modal */}
      {isSurpriseOpen && (
        <div
          onClick={() => setIsSurpriseOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F7] to-[#FAF5FF] rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-rose-300 text-center transform transition-all duration-500 scale-100"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSurpriseOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Glowing Heart Animation */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute w-36 h-36 rounded-full bg-rose-400/30 blur-2xl animate-pulse" />
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-2xl shadow-rose-500/50 animate-bounce">
                <Heart className="w-12 h-12 fill-white text-white" />
              </div>
            </div>

            {/* Romantic Sparkles Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>A Keepsake For You</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            <h3 className="font-serif-romantic text-3xl sm:text-4xl text-stone-900 mb-4 font-semibold">
              To My Beautiful Rose
            </h3>

            <p className="font-script-handwriting text-2xl sm:text-3xl text-stone-700 leading-relaxed mb-6">
              Meeting you was fate, choosing you is every day, and loving you is the easiest thing I will ever do.
            </p>

            {/* Required exact note */}
            <div className="py-6 px-4 my-6 rounded-2xl bg-white/90 border border-rose-200 shadow-sm">
              <p className="font-calligraphy text-4xl sm:text-5xl text-rose-600 font-bold tracking-wide">
                With love, Your husband.
              </p>
            </div>

            {/* Re-trigger Confetti / Close */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={triggerSurprise}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Celebrate Again</span>
              </button>

              <button
                onClick={() => setIsSurpriseOpen(false)}
                className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Cherish & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
