import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Home,
  Users,
  GraduationCap,
  Briefcase,
  Infinity as InfinityIcon,
} from 'lucide-react';

export const OurStoryDetailsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'love' | 'favorites' | 'family'>('all');

  return (
    <section id="our-story" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold mb-3 border border-rose-200/60 shadow-2xs">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>❤️ Our Story — Vinay &amp; Rose</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        </div>

        <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-4 font-semibold">
          Every Little Detail About Us &amp; My Rose
        </h2>

        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          The milestone dates written in the stars, the little things that make her smile, and the family roots of the most wonderful girl in the world.
        </p>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                : 'bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-200'
            }`}
          >
            All Details
          </button>
          <button
            onClick={() => setActiveTab('love')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'love'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                : 'bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-200'
            }`}
          >
            <span>💕 Our Love Story</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                : 'bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-200'
            }`}
          >
            <span>🌸 Rose’s Favourites</span>
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'family'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-105'
                : 'bg-white text-stone-600 hover:bg-rose-50 hover:text-rose-600 border border-stone-200'
            }`}
          >
            <span>👨‍👩‍👧‍👦 Rose’s Family &amp; World</span>
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {/* CARD 1: 💕 Our Love Story */}
        {(activeTab === 'all' || activeTab === 'love') && (
          <div className="relative bg-gradient-to-br from-white via-rose-50/50 to-pink-50/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-rose-200/80">
            {/* Corner washi tape */}
            <div className="absolute -top-3 left-8 w-24 h-5 washi-tape-pink rounded-xs" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-serif-romantic text-2xl sm:text-3xl font-semibold text-stone-900">
                  💕 Our Love Story Milestones
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  The sacred dates where our paths crossed and merged forever.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Rose Birthday */}
              <div className="bg-white/90 rounded-2xl p-4 border border-rose-100/90 shadow-2xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-rose-500 mb-1">
                  <span className="text-lg">🎂</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Rose’s Birthday
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  11 April 2001
                </div>
                <p className="text-xs text-rose-700/80 mt-1 font-medium">
                  The day an angel was born into this world 🌸
                </p>
              </div>

              {/* Vinay Birthday */}
              <div className="bg-white/90 rounded-2xl p-4 border border-rose-100/90 shadow-2xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-sky-500 mb-1">
                  <span className="text-lg">🎂</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Vinay’s Birthday
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  9 September 2001
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Born to find, cherish, and love his Rose
                </p>
              </div>

              {/* First Met */}
              <div className="bg-white/90 rounded-2xl p-4 border border-rose-100/90 shadow-2xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  <span className="text-lg">💫</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    First Met / First Text
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  24 September 2026
                </div>
                <p className="text-xs text-amber-700/90 mt-1 font-medium">
                  8:51 AM — The moment our universe changed forever
                </p>
              </div>

              {/* Official Couple */}
              <div className="bg-white/90 rounded-2xl p-4 border border-rose-100/90 shadow-2xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-rose-600 mb-1">
                  <span className="text-lg">❤️</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Official Couple
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  15 October 2026
                </div>
                <p className="text-xs text-rose-700/90 mt-1 font-medium">
                  Official love anniversary — choosing each other forever
                </p>
              </div>

              {/* First I Love You */}
              <div className="bg-white/90 rounded-2xl p-4 border border-rose-100/90 shadow-2xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-rose-500 mb-1">
                  <span className="text-lg">💌</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    First &ldquo;I Love You&rdquo;
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  15 October 2026
                </div>
                <p className="text-xs text-rose-700/90 mt-1 font-medium">
                  &ldquo;Goodnight 😘 I love you 😘❤️&rdquo;
                </p>
              </div>

              {/* Forever Together */}
              <div className="bg-white/90 rounded-2xl p-4 border border-rose-200/90 shadow-2xs hover:shadow-md transition-shadow bg-gradient-to-br from-white to-rose-50/70">
                <div className="flex items-center gap-2 text-rose-600 mb-1">
                  <InfinityIcon className="w-5 h-5 text-rose-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Forever Together
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-rose-700">
                  Forever, no matter what ❤️
                </div>
                <p className="text-xs text-stone-600 mt-1 font-script-handwriting text-lg">
                  &ldquo;The key is thrown away already 🗝️&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CARD 2: 🌸 Rose’s Favourite Things */}
        {(activeTab === 'all' || activeTab === 'favorites') && (
          <div className="relative bg-gradient-to-br from-white via-amber-50/40 to-rose-50/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-amber-200/80">
            {/* Corner washi tape */}
            <div className="absolute -top-3 left-8 w-24 h-5 washi-tape-lavender rounded-xs" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-serif-romantic text-2xl sm:text-3xl font-semibold text-stone-900">
                  🌸 Rose’s Favourite Things
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  The flavors, colors, flowers, and songs that light up her soul.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Food */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍽️</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Food
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Pork Adobo
                </div>
                <p className="text-xs text-stone-500 mt-1">Savory, classic Filipino comfort</p>
              </div>

              {/* Chocolate */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍫</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Chocolate
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Chocolate
                </div>
                <p className="text-xs text-stone-500 mt-1">Her sweetest daily delight</p>
              </div>

              {/* Dessert */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍰</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Dessert
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Chiffon Cake &amp; Halo-Halo
                </div>
                <p className="text-xs text-stone-500 mt-1">Fluffy sweetness &amp; cold shaved ice</p>
              </div>

              {/* Drink */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🥤</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Drink
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Mogu Mogu (Magu Magu)
                </div>
                <p className="text-xs text-stone-500 mt-1">Refreshing juice with chewy nata de coco</p>
              </div>

              {/* Fruit */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🥭</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Fruit
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Mango (Mongo)
                </div>
                <p className="text-xs text-stone-500 mt-1">Sweet, juicy tropical goodness</p>
              </div>

              {/* Flower & Dream Bouquet */}
              <div className="bg-white/90 rounded-2xl p-4 border border-rose-200/90 shadow-2xs hover:shadow-md transition-all bg-gradient-to-br from-white to-rose-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🌷</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
                    Favourite Flower &amp; Bouquet
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Tulips &amp; Daisies
                </div>
                <p className="text-xs text-rose-700/80 mt-1">
                  Her dream bouquet — gentle, bright, and pure
                </p>
              </div>

              {/* Colour */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🖤</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Colour
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Black
                </div>
                <p className="text-xs text-stone-500 mt-1">Timeless, elegant, and chic</p>
              </div>

              {/* Songs */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎶</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Songs
                  </span>
                </div>
                <div className="font-serif-romantic text-base font-bold text-stone-900 leading-snug">
                  Dance With My Father / A Thousand Years
                </div>
                <p className="text-xs text-stone-500 mt-1">Deep emotion &amp; eternal romance</p>
              </div>

              {/* Movie */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎬</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Movie / Drama
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Hotel Del Luna
                </div>
                <p className="text-xs text-stone-500 mt-1">Beautiful fantasy, drama, and aesthetics</p>
              </div>

              {/* Subject */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎨</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Subject
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Art
                </div>
                <p className="text-xs text-stone-500 mt-1">The painter and fashion designer in her</p>
              </div>

              {/* Animal */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🐶</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Favourite Animal
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Dog
                </div>
                <p className="text-xs text-stone-500 mt-1">Soft heart for furry friends</p>
              </div>

              {/* Dream Bouquet */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💐</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Dream Bouquet
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Tulips and Daisy
                </div>
                <p className="text-xs text-stone-500 mt-1">A bundle of pure happiness</p>
              </div>
            </div>
          </div>
        )}

        {/* CARD 3: 👨‍👩‍👧‍👦 Rose’s Family & Her World */}
        {(activeTab === 'all' || activeTab === 'family') && (
          <div className="relative bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-indigo-200/80">
            {/* Corner washi tape */}
            <div className="absolute -top-3 left-8 w-24 h-5 washi-tape-sunset rounded-xs" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
                <Users className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-serif-romantic text-2xl sm:text-3xl font-semibold text-stone-900">
                  👨‍👩‍👧‍👦 Rose’s Family &amp; Her Roots
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  The hardworking, loving family in Visayas that raised the girl I love.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Hometown */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-1 text-indigo-500">
                  <Home className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Hometown
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  Visayas, Philippines
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Warm island warmth, peaceful breeze, and gentle heart
                </p>
              </div>

              {/* Total Family Members */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-1 text-indigo-500">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Total Family Members
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  5 Members
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  A close-knit, loving household
                </p>
              </div>

              {/* Mother */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-1 text-rose-500">
                  <span className="text-base">👩</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Mother
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  Rafael
                </div>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Occupation: Housewife (Heart of the home)
                </p>
              </div>

              {/* Father */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-1 text-emerald-600">
                  <span className="text-base">👨</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Father
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  Rosalina
                </div>
                <p className="text-xs text-stone-600 mt-1 font-medium">
                  Occupation: Farmer (Hardworking &amp; grounded)
                </p>
              </div>

              {/* Sister */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-1 text-purple-500">
                  <span className="text-base">👧</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Sister
                  </span>
                </div>
                <div className="font-serif-romantic text-xl font-bold text-stone-900">
                  Ritchelle
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Cherished sisterhood
                </p>
              </div>

              {/* Course & Studies */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-1 text-blue-500">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Course / Degree
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  Tourism Management
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  3rd Year College Student • Dreams of travel &amp; fashion design
                </p>
              </div>

              {/* Job */}
              <div className="bg-white/90 rounded-2xl p-4 border border-stone-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-1 text-amber-500">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Work / Profession
                  </span>
                </div>
                <div className="font-serif-romantic text-lg font-bold text-stone-900">
                  House Worker
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Dedicated working student balancing life with endless patience
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
