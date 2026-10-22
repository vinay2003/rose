import React, { useState } from 'react';

interface HeartItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
}

export const FloatingHearts: React.FC = () => {
  const [hearts] = useState<HeartItem[]>(() => {
    // Generate gentle ambient floating symbols
    const symbols = ['🌸', '✨', '🤍', '💖', '🌹', '💕', '✨'];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 14) + 12,
      duration: Math.random() * 12 + 14,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.25,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-10"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-50px] select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `swayFloating ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
};
