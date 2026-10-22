import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onOpen: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-[#FFFDF9] via-[#FFF0F3] to-[#F5F3FF] transition-all duration-700">
      {/* Decorative ambient background rings */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Postcard Container */}
      <div className="relative max-w-xl w-full mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-rose-100 text-center transform transition-all duration-500 hover:scale-[1.01]">
        
        {/* Cute Scrapbook Washi Tape at Top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 washi-tape-pink rounded-sm flex items-center justify-center text-xs tracking-wider text-rose-800 font-medium select-none">
          FOR MY ROSE 🌹
        </div>

        {/* Small floating hearts badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Our Little World</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        </div>

        {/* Heading */}
        <h1 className="font-serif-romantic text-4xl sm:text-5xl md:text-6xl text-stone-900 tracking-tight mb-6">
          Hey, Rose.
        </h1>

        {/* Romantic Message */}
        <p className="font-script-handwriting text-2xl sm:text-3xl text-rose-900/90 leading-relaxed mb-8 max-w-md mx-auto">
          &ldquo;I made this little world just for you, filled with little moments and things that remind me of us.&rdquo;
        </p>

        {/* Divider with Rose */}
        <div className="flex items-center justify-center gap-3 mb-8 text-rose-300">
          <span className="h-px w-12 bg-rose-200" />
          <Heart className="w-5 h-5 fill-rose-300 text-rose-400 animate-pulse" />
          <span className="h-px w-12 bg-rose-200" />
        </div>

        {/* Open Button */}
        <button
          onClick={onOpen}
          id="open-our-little-world-btn"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium text-white rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-500 shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
        >
          <span>Open Our Little World</span>
          <Heart className="w-5 h-5 fill-current text-white/90 group-hover:scale-125 transition-transform duration-300" />
        </button>

        {/* Sign-off */}
        <p className="mt-8 text-xs text-stone-400 font-sans tracking-wide">
          Created with love by Vinay
        </p>
      </div>
    </div>
  );
};
