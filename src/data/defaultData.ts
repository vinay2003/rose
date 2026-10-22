import type { OpenWhenLetter, SongTrack, LoveNoteCard, PhotoMemory, TimelineMilestone, ChatQuote } from '../types';

export const DEFAULT_PHOTOS: PhotoMemory[] = [
  {
    id: 'photo-1',
    url: '/images/PHOTO-2026-10-11-19-43-06.jpg',
    caption: 'Matching in our Spider-Man hoodies — always your superhero',
    date: 'October 11, 2026',
    location: 'Our Cozy Space',
    createdAt: 1728666186000,
  },
  {
    id: 'photo-2',
    url: '/images/PHOTO-2026-10-05-19-13-13.jpg',
    caption: 'My favorite wallpaper — you looking breathtaking in saree',
    date: 'October 5, 2026',
    location: 'My Lockscreen & My Heart',
    createdAt: 1728148393000,
  },
  {
    id: 'photo-3',
    url: '/images/PHOTO-2026-09-27-19-33-20.jpg',
    caption: 'That beautiful floral dress and your radiant, angelic smile',
    date: 'September 27, 2026',
    location: 'Mountain Resort',
    createdAt: 1727456000000,
  },
  {
    id: 'photo-4',
    url: '/images/PHOTO-2026-09-24-11-09-34.jpg',
    caption: 'Sunlit afternoon and the most beautiful girl in the world',
    date: 'September 24, 2026',
    location: 'Under the Palm Trees',
    createdAt: 1727166574000,
  },
  {
    id: 'photo-5',
    url: '/images/PHOTO-2026-09-24-11-09-39.jpg',
    caption: 'Cafe dates, gentle breeze, and getting lost in your eyes',
    date: 'September 24, 2026',
    location: 'Our Favorite Cafe',
    createdAt: 1727166579000,
  },
  {
    id: 'photo-6',
    url: '/images/PHOTO-2026-10-02-14-20-21.jpg',
    caption: 'Your sweet cheek rest and that soft, adorable smile',
    date: 'October 2, 2026',
    location: 'Pure Sweetness',
    createdAt: 1727878821000,
  },
  {
    id: 'photo-7',
    url: '/images/PHOTO-2026-09-28-21-22-38.jpg',
    caption: 'Late night calls with earphones — counting seconds till we talk',
    date: 'September 28, 2026',
    location: 'Late Night Whispers',
    createdAt: 1727548958000,
  },
  {
    id: 'photo-8',
    url: '/images/PHOTO-2026-09-24-11-29-09.jpg',
    caption: 'Rose with glasses and red lips — absolutely stunning',
    date: 'September 24, 2026',
    location: 'Simply Gorgeous',
    createdAt: 1727167749000,
  },
  {
    id: 'photo-9',
    url: '/images/PHOTO-2026-10-08-11-33-50.jpg',
    caption: 'Hello Kitty cozy pajama mornings and sleepy smiles',
    date: 'October 8, 2026',
    location: 'Cozy Mornings',
    createdAt: 1728380030000,
  },
  {
    id: 'photo-10',
    url: '/images/PHOTO-2026-09-29-21-01-10.jpg',
    caption: 'That smile that lights up the quietest of nights',
    date: 'September 29, 2026',
    location: 'Bedtime Talks',
    createdAt: 1727634070000,
  },
  {
    id: 'photo-11',
    url: '/images/PHOTO-2026-09-30-11-14-29.jpg',
    caption: 'Shopping fun, mirror selfie, and cute quirks',
    date: 'September 30, 2026',
    location: 'Out and About',
    createdAt: 1727685269000,
  },
  {
    id: 'photo-12',
    url: '/images/PHOTO-2026-10-01-17-02-33.jpg',
    caption: 'Proud of you always — your sweetest professional look with pink bow',
    date: 'October 1, 2026',
    location: 'Workday Shine',
    createdAt: 1727792553000,
  },
];

export const DEFAULT_TIMELINE: TimelineMilestone[] = [
  {
    id: 'timeline-1',
    date: 'October 11, 2026',
    title: 'Matching Spider-Man Hoodies',
    description: 'Cozying up together in our matching Spider-Man hoodies. Laughing, posing with silly faces, and proving to the world that we are each other\'s favorite person.',
    location: 'Our Cozy Space',
    photoUrl: '/images/PHOTO-2026-10-11-19-43-06.jpg',
  },
  {
    id: 'timeline-2',
    date: 'October 5, 2026',
    title: 'My Forever Lockscreen — Saree Elegance',
    description: 'The moment you wore that crimson saree with golden earrings, my breath was completely taken away. You looked like royalty, and this became my permanent lockscreen.',
    location: 'A Special Day',
    photoUrl: '/images/PHOTO-2026-10-05-19-13-13.jpg',
  },
  {
    id: 'timeline-3',
    date: 'September 27, 2026',
    title: 'Mountain Resort & The Floral Dress',
    description: 'Surrounded by mountain greenery and pool breeze, you wore that gorgeous navy floral dress. Your laugh echoed with happiness all afternoon.',
    location: 'Mountain Resort',
    photoUrl: '/images/PHOTO-2026-09-27-19-33-20.jpg',
  },
  {
    id: 'timeline-4',
    date: 'September 24, 2026',
    title: 'Cafe Date & Sunshine Under Palms',
    description: 'A peaceful, sunny afternoon together under the palm trees. Chatting about our dreams and taking silly selfies together.',
    location: 'Palm Grove Cafe',
    photoUrl: '/images/PHOTO-2026-09-24-11-09-34.jpg',
  },
];

export const DEFAULT_CHAT_QUOTES: ChatQuote[] = [
  {
    id: 'quote-1',
    sender: 'Rose',
    quote: 'You always know how to make me laugh and feel safe even on my most exhausting days.',
    date: 'October 2026',
    note: 'Sent right before falling asleep on call — melted my heart completely.',
    tag: 'sweet',
  },
  {
    id: 'quote-2',
    sender: 'Vinay',
    quote: 'No matter how busy the world gets, talking to you is my favorite part of 24 hours.',
    date: 'September 2026',
    note: 'Midnight video call while she was lying down with earphones.',
    tag: 'late-night',
  },
  {
    id: 'quote-3',
    sender: 'Rose',
    quote: 'I love you so much, my husband. Forever and always.',
    date: 'October 2026',
    note: 'A precious message I read whenever I need warmth.',
    tag: 'favorite',
  },
];

export const DEFAULT_ENVELOPES: OpenWhenLetter[] = [
  {
    id: 'env-miss-me',
    title: 'When you miss me',
    subtitle: 'For when the distance or day feels a little too quiet',
    category: 'miss-me',
    waxSealColor: '#E11D48',
    paperStyle: 'rose',
    content: `My dearest Rose,

Whenever you feel like you miss me, I want you to remember that no matter where we are, you carry my heart with you everywhere you go.

Close your eyes for a moment. Picture me holding your hand, listening to you laugh, and telling you how much you mean to me. Every minute apart is just counting down until I see you again.

You are never truly alone, my love. I'm always thinking of you.

Forever yours,
Vinay`,
    lastEdited: 'Original',
  },
  {
    id: 'env-need-smile',
    title: 'When you need a smile',
    subtitle: 'A sweet reminder of how beautiful your happiness is',
    category: 'need-smile',
    waxSealColor: '#D97706',
    paperStyle: 'cream',
    content: `Hey beautiful Rose,

If you are opening this, you need a little sunshine today. 

Here's your gentle reminder: your smile is genuinely one of the brightest things in this world. The way your eyes light up when you're truly happy is something I could admire forever.

Take a deep breath, soften your shoulders, and remember how deeply adored you are. Go look in the mirror and give that pretty face the biggest smile, because you deserve all the joy in the universe.

Love always,
Vinay`,
    lastEdited: 'Original',
  },
  {
    id: 'env-difficult-day',
    title: 'When you have a difficult day',
    subtitle: 'A quiet, safe shelter when things feel heavy',
    category: 'difficult-day',
    waxSealColor: '#7C3AED',
    paperStyle: 'lavender',
    content: `My sweet Rose,

I'm so sorry today was tough on you. Please be gentle with yourself. You carry so much with so much grace, but you don't have to be strong all the time.

It is okay to rest. It is okay to breathe. It is okay to let tomorrow take care of itself. Whatever went wrong today does not diminish who you are or how much you are loved.

Wrap yourself in a warm blanket, picture a soft hug from me, and rest your mind. We will face everything together, step by step.

I'm always right here for you.

With all my love,
Vinay`,
    lastEdited: 'Original',
  },
];

export const DEFAULT_LOVE_NOTES: LoveNoteCard[] = [
  {
    id: 'note-1',
    title: 'Your Beautiful Laughter',
    message: 'The sound of your real, unfiltered laugh makes every ordinary day feel like a celebration.',
    category: 'laughter',
    favorite: true,
  },
  {
    id: 'note-2',
    title: 'The Way You Care',
    message: 'Your genuine kindness, softness, and the thoughtful way you show love inspire me every day.',
    category: 'heart',
    favorite: true,
  },
  {
    id: 'note-3',
    title: 'Our Late Night Calls',
    message: 'Lying in bed with earphones, talking about anything and everything until you softly drift to sleep.',
    category: 'hug',
    favorite: true,
  },
  {
    id: 'note-4',
    title: 'Your Radiant Smile',
    message: 'Just one glimpse of your smile instantly softens everything around me.',
    category: 'smile',
    favorite: true,
  },
];

export const DEFAULT_SONG_TRACKS: Record<'en' | 'tl' | 'hi', SongTrack> = {
  hi: {
    id: 'hi',
    languageName: 'Hindi',
    nativeTitle: 'मेरी रोज़ — Hindi Version',
    songTitle: 'Meri Rose',
    artistNote: 'Dedicated with all my heart to Rose by Vinay',
    hasAudio: true,
    audioUrl: '/songs/Meri%20Rose.m4a',
    audioFileName: 'Meri Rose.m4a',
    lyrics: `[मुखड़ा]
चलते-चलते इस राह में
मिल गई मुझे मेरी मंज़िल
तेरी एक मुस्कान पे
हार बैठा ये सारा दिल

[अंतरा 1]
मेरी रोज़, तू ही मेरी सुबह, तू ही शाम
मेरी हर धड़कन पे बस तेरा ही नाम
चाहे कितनी भी दूरियां हों इस जहां में
तेरा प्यार ही है मेरी असली पनाह

[अंतरा 2]
तेरी हँसी से रोशन है मेरा जहाँ
तू पास हो तो गम रहे कहाँ
हाथों में तेरा हाथ हो अगर
खूबसूरत है ये ज़िंदगी का सफ़र

[समापन]
वादा है मेरा तुमसे, कभी साथ ना छोड़ेंगे
हर मोड़ पे, हर तूफ़ान में, हम साथ रहेंगे
मेरी दुनिया, मेरी जान, मेरी रोज़
हमेशा के लिए सिर्फ़ तुम्हारी...`,
  },
  tl: {
    id: 'tl',
    languageName: 'Filipino / Tagalog',
    nativeTitle: 'Rose, Ikaw ang Tahanan Ko — Tagalog Version',
    songTitle: 'Rose, Ikaw ang Tahan Ko',
    artistNote: 'Buong pusong inalay para kay Rose ni Vinay',
    hasAudio: true,
    audioUrl: '/songs/Rose,%20Ikaw%20ang%20Tahan%20Ko.m4a',
    audioFileName: 'Rose, Ikaw ang Tahan Ko.m4a',
    lyrics: `[Talata 1]
Sa bawat hakbang ng ating buhay
Ikaw ang nagbigay ng kulay
Kahit anong layo ng distansya
Sa puso ko, ikaw lang ang nag-iisa

[Koro]
Rose, ikaw ang tahanan ko
Pangakong hindi magbabago
Sa hirap at ginhawa ng bawat araw
Ikaw lang ang tangi kong tinatanaw

[Talata 2]
Ang iyong ngiti'y liwanag sa dilim
Pag-ibig mo'y lihim na dalangin
Hawak-kamay sa bawat pagsubok
Pagmamahal na walang hanggan at tutok

[Tulay]
Magpakailanman, ikaw at ako
Walang ibang hahanapin sa mundo
Rose, aking asawa, aking buhay
Sayo lang ibubuhos ang pag-ibig na tunay...`,
  },
  en: {
    id: 'en',
    languageName: 'English',
    nativeTitle: 'English Version',
    songTitle: 'Our Special Song (English)',
    artistNote: 'Recorded with love for Rose by Vinay',
    hasAudio: false,
    audioFileName: undefined,
    lyrics: `[Verse 1]
Walking through the quiet evening
Holding memories close to heart
Every moment spent beside you
Feels like where I'm meant to start

[Chorus]
You are my home, my sweetest grace
The warmth within a crowded space
No matter where the road may lead
You're every little thing I need

[Bridge]
With every melody and tune
Beneath the sunshine and the moon
My heart is yours, always and true
Forever singing only you`,
  },
};
