import type { OpenWhenLetter, SongTrack, LoveNoteCard, PhotoMemory, TimelineMilestone, ChatQuote } from '../types';

export const DEFAULT_PHOTOS: PhotoMemory[] = [
  // --- NOVEMBER 2026 (Recent & Today) ---
  {
    id: 'photo-nov-12-cafe',
    url: '/images/PHOTO-2026-11-12-15-38-10.jpg',
    caption: 'Our secret cafe date — laughing because your mom didn\'t even know ☕✨',
    date: 'November 12, 2026',
    time: '3:38 PM',
    location: 'Secret Cafe Date',
    category: 'dates',
    mediaType: 'photo',
    createdAt: 1731406090000,
  },
  {
    id: 'photo-nov-11-glow',
    url: '/images/PHOTO-2026-11-11-09-51-35.jpg',
    caption: 'Morning sunshine and your most beautiful, peaceful smile',
    date: 'November 11, 2026',
    time: '9:51 AM',
    location: 'Morning Glow',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1731298895000,
  },
  {
    id: 'photo-nov-10-sweet',
    url: '/images/PHOTO-2026-11-10-12-57-41.jpg',
    caption: 'Midday check-in — making my whole day brighter just seeing you',
    date: 'November 10, 2026',
    time: '12:57 PM',
    location: 'Campus Break',
    category: 'dates',
    mediaType: 'photo',
    createdAt: 1731223661000,
  },
  {
    id: 'photo-nov-09-college',
    url: '/images/PHOTO-2026-11-09-07-59-48.jpg',
    caption: 'Early college mornings, sleepy eyes, and pure sweetness',
    date: 'November 9, 2026',
    time: '7:59 AM',
    location: 'College Bound',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1731119388000,
  },
  {
    id: 'video-nov-08-waves',
    url: '/videos/VIDEO-2026-11-08-17-13-49.mp4',
    caption: 'Sunday evening waves & sweet giggles sent across the ocean 🎬🌊',
    date: 'November 8, 2026',
    time: '5:13 PM',
    location: 'Golden Hour Reel',
    category: 'video',
    mediaType: 'video',
    createdAt: 1731066229000,
  },
  {
    id: 'photo-nov-08-selfie',
    url: '/images/PHOTO-2026-11-08-13-11-14.jpg',
    caption: 'That gorgeous smile that keeps my world spinning',
    date: 'November 8, 2026',
    time: '1:11 PM',
    location: 'Afternoon Happiness',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1731051674000,
  },
  {
    id: 'photo-nov-07-latenight',
    url: '/images/PHOTO-2026-11-07-02-03-48.jpg',
    caption: '2 AM late night video calls — never wanting to hang up',
    date: 'November 7, 2026',
    time: '2:03 AM',
    location: 'Late Night Whispers',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1730925228000,
  },
  {
    id: 'photo-nov-06-radiance',
    url: '/images/PHOTO-2026-11-06-09-30-52.jpg',
    caption: 'My favorite good morning view in the entire universe',
    date: 'November 6, 2026',
    time: '9:30 AM',
    location: 'Morning Check-in',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1730865652000,
  },
  {
    id: 'video-nov-05-cozy',
    url: '/videos/VIDEO-2026-11-05-19-36-44.mp4',
    caption: 'Cozy evening banter and laughing at our private jokes 🎬🌙',
    date: 'November 5, 2026',
    time: '7:36 PM',
    location: 'Evening Reel',
    category: 'video',
    mediaType: 'video',
    createdAt: 1730815604000,
  },
  {
    id: 'photo-nov-05-playful',
    url: '/images/PHOTO-2026-11-05-09-17-01.jpg',
    caption: 'Playful wink and that cute smirk — stole my heart again',
    date: 'November 5, 2026',
    time: '9:17 AM',
    location: 'Cute Moments',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1730778421000,
  },
  {
    id: 'photo-nov-02-pati',
    url: '/images/PHOTO-2026-11-02-14-25-49.jpg',
    caption: 'The afternoon you called me "Mere pati 🫣" and made my heart flutter',
    date: 'November 2, 2026',
    time: '2:25 PM',
    location: 'Heartfelt Melody',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1730537749000,
  },
  {
    id: 'photo-nov-01-home',
    url: '/images/PHOTO-2026-11-01-15-56-01.jpg',
    caption: 'Messy hair, sleepy eyes, and yet the most stunning woman alive',
    date: 'November 1, 2026',
    time: '3:56 PM',
    location: 'Home Sweet Home',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1730456761000,
  },

  // --- OCTOBER 2026 ---
  {
    id: 'video-oct-28-daily',
    url: '/videos/VIDEO-2026-10-28-13-49-14.mp4',
    caption: 'Sharing lunch breaks and daily campus stories 🎬🎒',
    date: 'October 28, 2026',
    time: '1:49 PM',
    location: 'Campus Reel',
    category: 'video',
    mediaType: 'video',
    createdAt: 1730103554000,
  },
  {
    id: 'photo-oct-28-sun',
    url: '/images/PHOTO-2026-10-28-08-36-18.jpg',
    caption: 'Sunshine on your face — you outshine every golden hour',
    date: 'October 28, 2026',
    time: '8:36 AM',
    location: 'Morning Glow',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1730084778000,
  },
  {
    id: 'photo-oct-25-weekend',
    url: '/images/PHOTO-2026-10-25-15-12-31.jpg',
    caption: 'Relaxing weekend vibes and our endless deep talks',
    date: 'October 25, 2026',
    time: '3:12 PM',
    location: 'Weekend Bliss',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1729849351000,
  },
  {
    id: 'photo-oct-22-soft',
    url: '/images/PHOTO-2026-10-22-08-13-25.jpg',
    caption: 'Waking up to your photo makes every workday easy',
    date: 'October 22, 2026',
    time: '8:13 AM',
    location: 'Morning Check-in',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1729565005000,
  },
  {
    id: 'photo-oct-15-bedtime',
    url: '/images/PHOTO-2026-10-15-02-31-15.jpg',
    caption: 'The night of "Mahal kita mahal ko" and "I love you 😘❤️"',
    date: 'October 15, 2026',
    time: '2:31 AM',
    location: 'Under the Stars',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1728949275000,
  },
  {
    id: 'video-oct-11-spiderman',
    url: '/videos/VIDEO-2026-10-11-17-19-53.mp4',
    caption: 'Teasing me about being your Spider-Man husband 🎬🕷️❤️',
    date: 'October 11, 2026',
    time: '5:19 PM',
    location: 'Spider-Man Fun Reel',
    category: 'video',
    mediaType: 'video',
    createdAt: 1728647393000,
  },
  {
    id: 'photo-oct-11-hoodies',
    url: '/images/PHOTO-2026-10-11-19-43-06.jpg',
    caption: 'Matching Spider-Man hoodies — your superhero forever and ever',
    date: 'October 11, 2026',
    time: '7:43 PM',
    location: 'Our Cozy Haven',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1728666186000,
  },
  {
    id: 'video-oct-11-giggles',
    url: '/videos/VIDEO-2026-10-11-09-56-18.mp4',
    caption: 'Morning laughs and that cute head tilt I adore 🎬🥰',
    date: 'October 11, 2026',
    time: '9:56 AM',
    location: 'Sweet Morning Reel',
    category: 'video',
    mediaType: 'video',
    createdAt: 1728620778000,
  },
  {
    id: 'photo-oct-08-pajama',
    url: '/images/PHOTO-2026-10-08-11-33-50.jpg',
    caption: 'Hello Kitty cozy pajama mornings and sweetest sleepy smiles',
    date: 'October 8, 2026',
    time: '11:33 AM',
    location: 'Cozy Mornings',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1728380030000,
  },
  {
    id: 'photo-oct-05-saree',
    url: '/images/PHOTO-2026-10-05-19-13-13.jpg',
    caption: 'My permanent lockscreen — you looking breathtaking in crimson saree',
    date: 'October 5, 2026',
    time: '7:13 PM',
    location: 'My Lockscreen & My Heart',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1728148393000,
  },
  {
    id: 'photo-oct-03-outfit',
    url: '/images/PHOTO-2026-10-03-14-16-30.jpg',
    caption: 'Style, grace, and that effortless natural beauty',
    date: 'October 3, 2026',
    time: '2:16 PM',
    location: 'Weekend Walk',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1727964990000,
  },
  {
    id: 'video-oct-02-explore',
    url: '/videos/VIDEO-2026-10-02-09-58-09.mp4',
    caption: 'Showing you the sights while walking outside 🎬🐪',
    date: 'October 2, 2026',
    time: '9:58 AM',
    location: 'Exploring Together',
    category: 'video',
    mediaType: 'video',
    createdAt: 1727843289000,
  },
  {
    id: 'photo-oct-02-cheek',
    url: '/images/PHOTO-2026-10-02-14-20-21.jpg',
    caption: 'Your sweet cheek rest and that soft, adorable glance',
    date: 'October 2, 2026',
    time: '2:20 PM',
    location: 'Pure Sweetness',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1727878821000,
  },
  {
    id: 'video-oct-01-heart',
    url: '/videos/VIDEO-2026-10-01-17-10-00.mp4',
    caption: '"I\'m happy that for a long time, I feel things again" 🎬💖',
    date: 'October 1, 2026',
    time: '5:10 PM',
    location: 'Heartfelt Video Reel',
    category: 'video',
    mediaType: 'video',
    createdAt: 1727782800000,
  },
  {
    id: 'photo-oct-01-pinkbow',
    url: '/images/PHOTO-2026-10-01-17-02-33.jpg',
    caption: 'Proud of you always — sweetest professional look with the pink bow',
    date: 'October 1, 2026',
    time: '5:02 PM',
    location: 'Workday Shine',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1727792553000,
  },

  // --- SEPTEMBER 2026 (The Beginning) ---
  {
    id: 'photo-sep-30-mirror',
    url: '/images/PHOTO-2026-09-30-11-14-29.jpg',
    caption: 'Shopping fun, mirror selfies, and your cute quirks',
    date: 'September 30, 2026',
    time: '11:14 AM',
    location: 'Out and About',
    category: 'dates',
    mediaType: 'photo',
    createdAt: 1727685269000,
  },
  {
    id: 'photo-sep-29-bedtime',
    url: '/images/PHOTO-2026-09-29-21-01-10.jpg',
    caption: 'That smile that lights up the quietest of nights',
    date: 'September 29, 2026',
    time: '9:01 PM',
    location: 'Bedtime Talks',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1727634070000,
  },
  {
    id: 'video-sep-28-dinner',
    url: '/videos/VIDEO-2026-09-28-18-39-39.mp4',
    caption: 'Talking during dinner — wishing you were sitting right across 🎬🍽️',
    date: 'September 28, 2026',
    time: '6:39 PM',
    location: 'Dinner Date Reel',
    category: 'video',
    mediaType: 'video',
    createdAt: 1727538579000,
  },
  {
    id: 'photo-sep-28-earphones',
    url: '/images/PHOTO-2026-09-28-21-22-38.jpg',
    caption: 'Late night calls with earphones — counting seconds till we talk',
    date: 'September 28, 2026',
    time: '9:22 PM',
    location: 'Late Night Whispers',
    category: 'cozy',
    mediaType: 'photo',
    createdAt: 1727548958000,
  },
  {
    id: 'photo-sep-27-floraldress',
    url: '/images/PHOTO-2026-09-27-19-33-20.jpg',
    caption: 'That gorgeous navy floral dress and your radiant, angelic smile',
    date: 'September 27, 2026',
    time: '7:33 PM',
    location: 'Mountain Resort',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1727456000000,
  },
  {
    id: 'video-sep-26-earlymorning',
    url: '/videos/VIDEO-2026-09-26-05-41-55.mp4',
    caption: '5:41 AM sunrise video — waking up early just to talk to my Rose 🎬🌅',
    date: 'September 26, 2026',
    time: '5:41 AM',
    location: '5 AM Morning Reel',
    category: 'video',
    mediaType: 'video',
    createdAt: 1727319115000,
  },
  {
    id: 'photo-sep-24-glasses',
    url: '/images/PHOTO-2026-09-24-11-29-09.jpg',
    caption: 'Rose with glasses and soft red lips — absolutely stunning',
    date: 'September 24, 2026',
    time: '11:29 AM',
    location: 'Simply Gorgeous',
    category: 'outfit',
    mediaType: 'photo',
    createdAt: 1727167749000,
  },
  {
    id: 'photo-sep-24-cafe',
    url: '/images/PHOTO-2026-09-24-11-09-34.jpg',
    caption: 'Sunlit afternoon under the palms — the day my world found its Rose',
    date: 'September 24, 2026',
    time: '11:09 AM',
    location: 'Under the Palm Trees',
    category: 'dates',
    mediaType: 'photo',
    createdAt: 1727166574000,
  },
];

export const DEFAULT_TIMELINE: TimelineMilestone[] = [
  {
    id: 'timeline-1',
    date: 'September 24, 2026',
    time: '8:51 AM',
    title: 'The First Hello & The Painter\'s Heart',
    description: 'Where our entire universe began. Vinay finding Rose on WhatsApp, excited to get to know the creative painter and kind soul behind the profile. Rose replying with her trademark warm laughter: "Oh hi there, Vinay. Welcome here 🤣". From that single minute, two hearts across borders started beating as one.',
    location: 'WhatsApp • The Beginning',
    photoUrl: '/images/PHOTO-2026-09-24-11-09-34.jpg',
    tag: '#FirstHello',
  },
  {
    id: 'timeline-2',
    date: 'September 24, 2026',
    time: '9:17 AM',
    title: 'Hong Kong Disneyland & Fashion Design Dreams',
    description: 'Rose shared her deep dreams: studying Tourism Management, drafting fashion design patterns, and longing to visit Hong Kong Disneyland to heal her inner child. Vinay listened with awe, making a silent promise to one day hold her hand in front of the Disney castle.',
    location: 'Heart to Heart',
    photoUrl: '/images/PHOTO-2026-09-24-11-29-09.jpg',
    tag: '#InnerChildDreams',
  },
  {
    id: 'timeline-3',
    date: 'September 24, 2026',
    time: '9:49 AM',
    title: 'The Foundation: Trust, Loyalty & Small Details',
    description: '"Long distance or not, it needs trust and loyalty so the relationship will grow stronger and no one can take that apart." Rose shared that remembering the little things, checking in, and making someone feel included is what truly matters in love.',
    location: 'Our Shared Values',
    photoUrl: '/images/PHOTO-2026-09-24-17-53-51.jpg',
    tag: '#OurFoundation',
  },
  {
    id: 'timeline-4',
    date: 'September 26, 2026',
    time: '5:41 AM',
    title: '5 AM Wakeup & The First Sunrise Video',
    description: '"You wake up so early today, it\'s still 5am there, right?" Vinay waking up before dawn just to catch Rose before her morning routine, sending the first video message bridging the miles between India and the Philippines.',
    location: 'Sunrise Across Oceans',
    videoUrl: '/videos/VIDEO-2026-09-26-05-41-55.mp4',
    mediaType: 'video',
    tag: '#5AMWakeupCall',
  },
  {
    id: 'timeline-5',
    date: 'September 27, 2026',
    time: '7:33 PM',
    title: 'Mountain Resort & The Radiant Floral Dress',
    description: 'Surrounded by mountain greenery and poolside breeze, Rose shared photos in her stunning navy floral dress. Her radiant smile lit up Vinay\'s phone screen and left him completely mesmerized.',
    location: 'Mountain Resort',
    photoUrl: '/images/PHOTO-2026-09-27-19-33-20.jpg',
    tag: '#AngelicSmile',
  },
  {
    id: 'timeline-6',
    date: 'September 28, 2026',
    time: '8:10 PM',
    title: 'The First "Mahal Kita, Rose Wifey Ko"',
    description: 'Vinay surprised Rose by speaking in her native Tagalog: "Mahal kita. Mahal na mahal kita, Rose wifey ko." Rose laughed with shy delight: "That\'s a good start 😆". That night, the nicknames "Wifey" and "Hubby" became our language.',
    location: 'Late Night Confession',
    photoUrl: '/images/PHOTO-2026-09-28-21-22-38.jpg',
    tag: '#MahalKita',
  },
  {
    id: 'timeline-7',
    date: 'October 1, 2026',
    time: '5:10 PM',
    title: 'Pink Bow, Sweet Giggles & "I Feel Things Again"',
    description: 'Looking gorgeous with her neat pink bow and professional dress. Rose confided softly: "I\'m happy that for a long time, I feel things again 🫣". The quiet, tender moment when friendship transformed into deep, mutual devotion.',
    location: 'Heart Awakening',
    videoUrl: '/videos/VIDEO-2026-10-01-17-10-00.mp4',
    mediaType: 'video',
    tag: '#RealFeelings',
  },
  {
    id: 'timeline-8',
    date: 'October 2, 2026',
    time: '2:20 PM',
    title: 'Cheek Rest & Gentle Sweetness',
    description: 'That irresistible photo of Rose resting her cheek on her hand, looking with soft, playful eyes. Every video call turned into an anchor for the soul, making thousands of miles feel like inches.',
    location: 'Pure Sweetness',
    photoUrl: '/images/PHOTO-2026-10-02-14-20-21.jpg',
    tag: '#SoftMoments',
  },
  {
    id: 'timeline-9',
    date: 'October 5, 2026',
    time: '7:13 PM',
    title: 'The Crimson Saree & Marriage Dreams',
    description: 'The moment Rose sent the photo wearing a crimson Indian saree, Vinay set it as his lockscreen — where it stayed permanently. That evening, they talked about meeting parents, asking for her hand, and building a real marriage together.',
    location: 'Lockscreen & Forever',
    photoUrl: '/images/PHOTO-2026-10-05-19-13-13.jpg',
    tag: '#ForeverLockscreen',
  },
  {
    id: 'timeline-10',
    date: 'October 11, 2026',
    time: '7:43 PM',
    title: 'Matching Spider-Man Hoodies & Silly Laughs',
    description: 'Posing in matching Spider-Man hoodies! Rose teased Vinay as her "Spider-Man husband 😂", while Vinay claimed he was her "wifey-man husband". Proving that true love is when you can be completely, beautifully silly together.',
    location: 'Our Cozy Haven',
    photoUrl: '/images/PHOTO-2026-10-11-19-43-06.jpg',
    tag: '#SpiderManHoodies',
  },
  {
    id: 'timeline-11',
    date: 'October 15, 2026',
    time: '5:41 PM',
    title: '"Goodnight 😘 I Love You 😘❤️"',
    description: 'Vinay: "Mahal kita mahal ko." Rose replying from the bottom of her heart: "Goodnight 😘 I love you 😘❤️". The words that melted every doubt, sealing our bond with absolute sincerity and tenderness.',
    location: 'Bedtime Whisper',
    photoUrl: '/images/PHOTO-2026-10-15-02-31-15.jpg',
    tag: '#ILoveYou',
  },
  {
    id: 'timeline-12',
    date: 'October 28, 2026',
    time: '1:49 PM',
    title: 'Everyday Comfort & College Break Videos',
    description: 'Sharing daily life: college halls, cooking at home, and walking under the sun. With Rose, even an ordinary Tuesday afternoon became a cherished memory worth keeping forever.',
    location: 'Everyday Magic',
    videoUrl: '/videos/VIDEO-2026-10-28-13-49-14.mp4',
    mediaType: 'video',
    tag: '#EverydayJoy',
  },
  {
    id: 'timeline-13',
    date: 'November 2, 2026',
    time: '10:18 AM',
    title: '"Mere Pati 🫣😘" — Love Across Cultures',
    description: 'Rose whispered in sweet Hindi: "Mere pati 🫣😘" (My husband). Transcending languages and continents with pure warmth, showing how naturally our lives have intertwined.',
    location: 'Language of Love',
    photoUrl: '/images/PHOTO-2026-11-02-14-25-49.jpg',
    tag: '#MerePati',
  },
  {
    id: 'timeline-14',
    date: 'November 8, 2026',
    time: '5:13 PM',
    title: 'Sunday Sunset & Sweetest Waves',
    description: 'A cozy Sunday full of giggles, playful banter, and sweet waving videos across the ocean. Reminding each other that no distance can dim the warmth we share every day.',
    location: 'Sunset Across Oceans',
    videoUrl: '/videos/VIDEO-2026-11-08-17-13-49.mp4',
    mediaType: 'video',
    tag: '#GoldenMoments',
  },
  {
    id: 'timeline-15',
    date: 'November 12, 2026',
    time: '3:38 PM',
    title: 'Secret Cafe Date, "It\'s Locked & I Threw the Key" 🗝️❤️',
    description: '"Went to a café and my mom didn\'t know 🥲🤣". Sneaking sweet smiles on video call. When Vinay said "You\'ve kept my heart with you", Rose declared: "It\'s locked and I threw the key already! 🗝️🤣". Sealing it with: "I dream for us to meet and decide to be together forever. I date to marry, not to waste time."',
    location: 'Secret Cafe Date',
    photoUrl: '/images/PHOTO-2026-11-12-15-38-10.jpg',
    tag: '#DateToMarry',
  },
];

export const DEFAULT_CHAT_QUOTES: ChatQuote[] = [
  {
    id: 'quote-nov-12-key',
    sender: 'Both',
    quote: 'Vinay: "And you’ve kept my heart with you too."\nRose: "It’s locked and I threw the key already 🤣🗝️❤️"',
    date: 'November 12, 2026',
    time: '3:48 PM',
    note: 'Her saying she threw away the key means my heart is safely hers for eternity.',
    tag: 'Locked Forever',
    dialogue: [
      { speaker: 'Vinay', text: 'And you’ve kept my heart with you too ❤️', time: '3:48 PM' },
      { speaker: 'Rose', text: 'It\'s locked and I threw the key already 🤣🗝️', time: '3:48 PM' },
      { speaker: 'Vinay', text: 'Then accept that you\'re my wifey!', time: '3:48 PM' },
      { speaker: 'Rose', text: 'Nooo 🫣', time: '3:48 PM' },
    ],
  },
  {
    id: 'quote-nov-12-marry',
    sender: 'Rose',
    quote: 'I dream for us to meet one day and figure things out if we\'re really for each other and maybe we\'ll decide to be together forever. I date to marry, not to waste time.',
    date: 'November 12, 2026',
    time: '3:53 PM',
    note: 'The pure honesty and maturity of Rose. We are both building towards a lifetime together.',
    tag: 'Future & Marriage',
  },
  {
    id: 'quote-nov-12-secret-cafe',
    sender: 'Both',
    quote: 'Rose: "Went to a café and my mom didn\'t know 🥲🤣"\nVinay: "You talk to me and even kiss me in front of your mom? 🤣"\nRose: "Yes 🤣"',
    date: 'November 12, 2026',
    time: '3:38 PM',
    note: 'Sneaking smiles and calling me secretly during her cafe outing — purest cuteness.',
    tag: 'Playful Banter',
  },
  {
    id: 'quote-nov-02-pati',
    sender: 'Rose',
    quote: 'Mere pati 🫣😘',
    date: 'November 2, 2026',
    time: '10:18 AM',
    note: 'Rose softly calling me "My Husband" in Hindi. One of the sweetest surprises of my life.',
    tag: 'Sweet Whispers',
  },
  {
    id: 'quote-oct-16-spiderman',
    sender: 'Both',
    quote: 'Rose: "My Spider-Man husband 😂"\nVinay: "I love you infinity wifey! I\'m wifey-man husband 🫣"',
    date: 'October 16, 2026',
    time: '7:45 PM',
    note: 'Our official inside joke since the day we wore matching hoodies.',
    tag: 'Inside Joke',
  },
  {
    id: 'quote-oct-15-iloveyou',
    sender: 'Both',
    quote: 'Vinay: "Mahal kita mahal ko."\nRose: "Goodnight 😘 I love you 😘❤️"',
    date: 'October 15, 2026',
    time: '5:41 PM',
    note: 'The bedtime exchange that lives rent-free in my mind every single night.',
    tag: 'Deep Love',
  },
  {
    id: 'quote-oct-05-parents',
    sender: 'Rose',
    quote: 'A guy should ask the parents that he wants to marry the daughter 😅 then followed with the engagement.',
    date: 'October 5, 2026',
    time: '5:41 PM',
    note: 'Discussing our future tradition, respecting family, and taking each step with pure honor.',
    tag: 'Future & Marriage',
  },
  {
    id: 'quote-oct-01-feelings',
    sender: 'Rose',
    quote: 'I\'m happy that for a long time , I feel things again. 🫣',
    date: 'October 1, 2026',
    time: '6:52 PM',
    note: 'Knowing that our conversations brought genuine warmth and feelings back to her heart.',
    tag: 'Heartfelt',
  },
  {
    id: 'quote-sep-28-mahal',
    sender: 'Both',
    quote: 'Vinay: "Mahal na mahal kita, Rose wifey ko."\nRose: "That\'s a good start 😆"',
    date: 'September 28, 2026',
    time: '8:10 PM',
    note: 'Testing out my Tagalog for the first time — her playful reaction made me smile so hard.',
    tag: 'Mahal Kita',
  },
  {
    id: 'quote-sep-24-disneyland',
    sender: 'Rose',
    quote: 'I want to visit Disneyland. I guess all kids want to visit Disneyland, that\'s why I want to fulfill that dream of mine to heal the inner child in me.',
    date: 'September 24, 2026',
    time: '9:17 AM',
    note: 'Her innocent, vulnerable dream since grade school. I promised myself I will make it happen.',
    tag: 'Shared Dreams',
  },
  {
    id: 'quote-sep-24-foundation',
    sender: 'Rose',
    quote: 'Long distance or not, it needs trust and loyalty so the relationship will grow stronger and no one can take that apart. Remembering the small details has a big impact.',
    date: 'September 24, 2026',
    time: '9:49 AM',
    note: 'The very first morning we spoke — the foundation of everything we have built.',
    tag: 'Our Foundation',
  },
];

export const DEFAULT_ENVELOPES: OpenWhenLetter[] = [
  {
    id: 'env-miss-me',
    title: 'When you miss me',
    subtitle: 'For when the miles between India and the Philippines feel a little too quiet',
    category: 'miss-me',
    waxSealColor: '#E11D48',
    paperStyle: 'rose',
    content: `My dearest Rose,

Whenever the distance feels a little too heavy or your room feels too quiet, close your eyes and remember what you told me today:

"It's locked and I threw the key already 🗝️❤️"

You carry my heart with you in every step you take. When you walk around campus, when you're drafting your fashion design patterns, and when you're taking your afternoon naps — I am right there with you in spirit.

Every 5 AM wakeup call, every late night whisper with earphones, and every "Mahal kita mahal ko" is a brick in the home we are building together. We date to marry, and every single second apart is just counting down until I can hold you for real.

I love you endlessly, wifey.

Forever yours,
Vinay (Your Spider-Man husband)`,
    lastEdited: 'Original',
  },
  {
    id: 'env-need-smile',
    title: 'When you need a smile',
    subtitle: 'A sweet reminder of your inner child and how radiant you are',
    category: 'need-smile',
    waxSealColor: '#D97706',
    paperStyle: 'cream',
    content: `Hey gorgeous Rose,

If you are opening this, you need a little sunshine today. 

Picture this: One day soon, you and I are walking through the gates of Hong Kong Disneyland. You're wearing your prettiest smile, wearing Mickey ears, and finally healing that sweet grade-school inner child of yours. I'll be right beside you carrying our bags, buying you treats, and taking a million photos of you smiling.

Remember how you laughed when you snuck away to the cafe and your mom didn't know? Or how you called me "Mere pati 🫣"? You have the most infectious, radiant laugh in the whole world.

Go look in the mirror, soften those shoulders, and give that beautiful face a big smile. You are deeply, unconditionally loved.

Love always,
Vinay`,
    lastEdited: 'Original',
  },
  {
    id: 'env-difficult-day',
    title: 'When you have an exhausting day',
    subtitle: 'A quiet, safe shelter after a long day of college and work',
    category: 'difficult-day',
    waxSealColor: '#7C3AED',
    paperStyle: 'lavender',
    content: `My hardworking sweet Rose,

Being a 3rd-year Tourism Management student, balancing college, work, and life is so demanding. You carry so much responsibilities with so much strength and grace, but please remember: you don't have to be strong all the time with me.

When your body is tired and your mind feels overwhelmed, take off that weight. Put on your softest pajamas, wrap yourself in your warm blanket, and let me take care of you. 

Even if you're tired and your hair is messy, you are the most precious person to me. Tomorrow will take care of itself. For tonight, just rest.

"Goodnight 😘 I love you 😘❤️"

Always right here beside you,
Vinay`,
    lastEdited: 'Original',
  },
];

export const DEFAULT_LOVE_NOTES: LoveNoteCard[] = [
  {
    id: 'note-1',
    title: 'The Key Thrown Away 🗝️',
    message: '"It\'s locked and I threw the key already" — knowing my heart is safe with you forever.',
    category: 'heart',
    favorite: true,
  },
  {
    id: 'note-2',
    title: 'Our Disneyland Promise 🏰',
    message: 'To hold your hand at Hong Kong Disneyland and watch your inner child jump with pure joy.',
    category: 'smile',
    favorite: true,
  },
  {
    id: 'note-3',
    title: 'Tulips & Daisies Bouquet 🌷',
    message: 'Your dream bouquet of fresh blooming tulips and daisies, matching the gentleness of your soul.',
    category: 'smile',
    favorite: true,
  },
  {
    id: 'note-4',
    title: 'Spider-Man & Wifey 🕷️❤️',
    message: 'Matching in our Spider-Man hoodies, being silly, and proving we are each other\'s favorite person.',
    category: 'laughter',
    favorite: true,
  },
  {
    id: 'note-5',
    title: 'Pork Adobo & Halo-Halo 🍽️',
    message: 'Can\'t wait to eat your favorite pork adobo, sip Mogu Mogu, and share cold sweet halo-halo together.',
    category: 'hug',
    favorite: true,
  },
  {
    id: 'note-6',
    title: 'Dating to Marry 💍',
    message: 'Building something real, rooted in trust and loyalty, with our eyes fixed on forever.',
    category: 'heart',
    favorite: true,
  },
  {
    id: 'note-7',
    title: 'A Thousand Years 🎶',
    message: 'Listening to "A Thousand Years" and "Dance With My Father", knowing our love was written in the stars.',
    category: 'voice',
    favorite: true,
  },
  {
    id: 'note-8',
    title: 'Your Artist Heart 🎨',
    message: 'Art has always been your favorite subject, and your eye for fashion design makes me so proud.',
    category: 'quirk',
    favorite: true,
  },
  {
    id: 'note-9',
    title: 'Your Soft Heart for Dogs 🐶',
    message: 'The tender way you adore puppies and dogs reflects the pure, loving soul inside you.',
    category: 'quirk',
    favorite: true,
  },
  {
    id: 'note-10',
    title: 'The Saree Lockscreen 📸',
    message: 'You looking like royalty in that crimson saree — the easiest choice for my permanent lockscreen.',
    category: 'voice',
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
    nativeTitle: 'English Translation / Acoustic',
    songTitle: 'Rose, You Are My Home',
    artistNote: 'English translation of our promise song',
    hasAudio: false,
    audioFileName: undefined,
    lyrics: `[Verse 1]
Walking across the quiet miles
Finding peace in all your smiles
No matter how far apart we stand
My heart is resting in your hand

[Chorus]
Rose, you are my home and grace
My quiet shelter and sweet embrace
Through every storm and sunny sky
You're the answer to every why

[Bridge]
With every melody we share
Beneath the late night quiet air
I date to marry, true and bold
The sweetest love that life could hold`,
  },
};
