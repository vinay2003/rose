import React, { useState, useEffect } from 'react';
import { Heart, Clock, Sparkles, Key, MessageCircle, Film, Globe } from 'lucide-react';

export const LoveCounter: React.FC = () => {
  // Start date: September 24, 2026, 8:51:25 AM
  const START_DATE = new Date('2026-09-24T08:51:25+05:30').getTime();

  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [philippinesTime, setPhilippinesTime] = useState('');
  const [indiaTime, setIndiaTime] = useState('');

  useEffect(() => {
    const updateCounters = () => {
      const now = Date.now();
      const diff = Math.max(0, now - START_DATE);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });

      // Local clocks
      const phTimeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date());

      const inTimeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date());

      setPhilippinesTime(phTimeStr);
      setIndiaTime(inTimeStr);
    };

    updateCounters();
    const interval = setInterval(updateCounters, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="relative bg-gradient-to-br from-white/95 via-rose-50/70 to-amber-50/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-200/80 text-center overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />

        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold mb-4 border border-rose-200/60 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Together Since September 24, 2026 • 8:51 AM</span>
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
        </div>

        <h2 className="font-serif-romantic text-2xl sm:text-3xl md:text-4xl text-stone-900 mb-2 font-semibold">
          Every Second Loving My Rose
        </h2>

        <p className="font-script-handwriting text-xl sm:text-2xl text-rose-900/90 mb-6">
          &ldquo;It&apos;s locked and I threw the key already 🗝️❤️&rdquo;
        </p>

        {/* Live Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-6">
          <div className="bg-white/90 rounded-2xl p-3.5 border border-rose-100 shadow-sm transform hover:-translate-y-0.5 transition-transform">
            <span className="block font-serif-romantic text-3xl sm:text-4xl font-bold text-rose-600">
              {timeElapsed.days}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
              Days of Love
            </span>
          </div>

          <div className="bg-white/90 rounded-2xl p-3.5 border border-rose-100 shadow-sm transform hover:-translate-y-0.5 transition-transform">
            <span className="block font-serif-romantic text-3xl sm:text-4xl font-bold text-rose-600">
              {timeElapsed.hours}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
              Hours
            </span>
          </div>

          <div className="bg-white/90 rounded-2xl p-3.5 border border-rose-100 shadow-sm transform hover:-translate-y-0.5 transition-transform">
            <span className="block font-serif-romantic text-3xl sm:text-4xl font-bold text-rose-600">
              {timeElapsed.minutes}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
              Minutes
            </span>
          </div>

          <div className="bg-white/90 rounded-2xl p-3.5 border border-rose-100 shadow-sm transform hover:-translate-y-0.5 transition-transform">
            <span className="block font-serif-romantic text-3xl sm:text-4xl font-bold text-rose-600">
              {timeElapsed.seconds}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500">
              Seconds
            </span>
          </div>
        </div>

        {/* Story Stats & Timezone Clocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-rose-100/80 text-xs">
          <div className="flex items-center justify-center gap-2 text-stone-600 bg-white/70 py-2 px-3 rounded-xl border border-rose-50">
            <MessageCircle className="w-3.5 h-3.5 text-rose-500" />
            <span><strong>11,800+</strong> Messages Shared</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-stone-600 bg-white/70 py-2 px-3 rounded-xl border border-rose-50">
            <Film className="w-3.5 h-3.5 text-rose-500" />
            <span><strong>500+</strong> Photos &amp; Video Moments</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-stone-600 bg-white/70 py-2 px-3 rounded-xl border border-rose-50">
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span><strong>1 Heart</strong> Locked Forever</span>
          </div>
        </div>

        {/* Live dual clocks for India and Philippines */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-500" />
            <span>Rose (Philippines): <strong>{philippinesTime || '...'}</strong></span>
          </div>
          <span className="text-stone-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Vinay (India): <strong>{indiaTime || '...'}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

