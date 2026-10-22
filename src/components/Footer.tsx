import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-rose-100/80 bg-white/60 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="font-serif-romantic text-lg font-semibold text-stone-900">
              Our Little World
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-rose-500 font-medium">Vinay & Rose</span>
          </div>
          <p className="font-script-handwriting text-xl text-stone-500">
            &ldquo;You will always be my favorite place to be.&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs text-stone-400 font-sans flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>by Vinay</span>
          </p>

          <button
            onClick={scrollToTop}
            title="Scroll to top"
            className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
