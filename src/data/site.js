// ─── Site-wide config ────────────────────────────────────────────────────────
// Edit this file to update content across the whole site.

export const SITE = {
  name: 'ALSA',
  fullName: 'Auckland Lankan Students Association',
  description:
    "Your home away from home — connecting Sri Lankan students across Auckland's universities through culture, community and unforgettable moments.",
  email: 'uoa.alsa2020@gmail.com',
  instagram: 'https://instagram.com/uoa.alsa',
  instagramHandle: '@uoa.alsa',
  facebook: 'https://facebook.com/alsanz',
  flickr: 'https://flickr.com',
  location: 'Auckland, New Zealand 🇳🇿',
  year: '2026',
  // Replace with your Stripe publishable key from Stripe Dashboard → Developers → API Keys
  stripeKey: 'pk_test_YOUR_KEY_HERE',
  // Paste your Google Apps Script web app URL here after deploying (see README / setup instructions)
  sheetsUrl: '',
};

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

// ─── Hero stats ──────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { number: 183, suffix: '', label: 'Members 2026' },
  { number: 10, suffix: '+', label: 'Events/Year' },
  { number: 5, suffix: '+', label: 'Universities' },
  { number: 5, suffix: 'yrs', label: '& Growing' },
];

export const HERO_WORDS = ['Connect', 'Celebrate', 'Inspire', 'Belong'];

// ─── About pillars ───────────────────────────────────────────────────────────
export const PILLARS = [
  {
    icon: '🎉',
    title: 'Cultural Events',
    text: 'From Avurudu to cultural nights — we bring Sri Lankan traditions to life right here in Auckland.',
  },
  {
    icon: '🤝',
    title: 'Community Support',
    text: 'Peer networks, mentorship, and a welcoming space for every Lankan student in Auckland.',
  },
  {
    icon: '🎓',
    title: 'Academic Network',
    text: 'Study groups and career connections across UoA, AUT, Massey and beyond.',
  },
  {
    icon: '🏏',
    title: 'Sport & Social',
    text: 'Cricket, food fests, movie nights and social gatherings throughout the year.',
  },
];

// ─── Events ───────────────────────────────────────────────────────────────────
// dateISO:       YYYY-MM-DD — drives the upcoming/past split automatically.
// poster:        filename of the event poster inside src/event posters/ (square Instagram-post style works best).
// eventbriteUrl: paste the Eventbrite link if the event is ticketed — hovering the poster reveals a Buy Tickets overlay,
//                clicking opens Eventbrite. Leave as '' for free/non-ticketed events.
export const EVENTS = [
  {
    dateISO: '2026-03-15',
    date: '15 MAR',
    time: '6:00 PM',
    title: 'Meet and Greet',
    location: 'University of Auckland',
    tag: 'Social',
    description: 'A casual evening to meet the ALSA 2026 committee and connect with fellow Sri Lankan students across Auckland.',
    color: 'blue',
    poster: '',          // e.g. 'meetgreet.jpg' inside src/event posters/
    eventbriteUrl: '',
  },
  {
    dateISO: '2026-04-14',
    date: '14 APR',
    time: '6:00 PM',
    title: 'Sinhala & Tamil New Year — Avurudu 2026',
    location: 'University of Auckland — Fale Pasifika',
    tag: 'Flagship',
    description: 'Traditional games, rabaan drumming, milk rice and a kiribath feast. Celebrating the Sri Lankan New Year together right here in Auckland.',
    color: 'gold',
    poster: '',          // e.g. 'avurudu.jpg' inside src/event posters/
    eventbriteUrl: '',
  },
  {
    dateISO: '2026-05-16',
    date: '16 MAY',
    time: '7:00 PM',
    title: 'South Asian Club Movie Night',
    location: 'University of Auckland',
    tag: 'Collab',
    description: 'Joining forces with the South Asian Club for a relaxed movie night. Grab your snacks and bring a friend.',
    color: 'blue',
    poster: '',          // e.g. 'movienight.jpg' inside src/event posters/
    eventbriteUrl: '',   // paste Eventbrite link here if ticketed
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote: 'ALSA made Auckland feel like home in my first week. The welcome night, the WhatsApp group, the senior mentors — all of it made a huge difference.',
    name: 'Nethmi Perera',
    role: 'Engineering, Year 2 · UoA',
  },
  {
    quote: 'Avurudu at UoA was unforgettable. It felt like being back home. Grateful for this community.',
    name: 'Dinesh Rathnayake',
    role: 'Commerce, Year 3 · AUT',
  },
  {
    quote: 'Best part about ALSA? The cricket days, the food fests, the friends I\'ve made. Worth every cent of the membership.',
    name: 'Tharushi Silva',
    role: 'Med Sci, Year 4 · UoA',
  },
  {
    quote: 'Joined as a shy first-year and left exec three years later. ALSA genuinely shapes your uni experience.',
    name: 'Ashen Weerasinghe',
    role: 'Alumnus · Massey',
  },
];

// ─── Team / Committee ─────────────────────────────────────────────────────────
export const TEAM = [
  { name: 'Binuk Silva',              role: 'Co-President',          photo: 'Binuk.jpg',     accent: '#F5B800' },
  { name: 'Hariene Prabaharan',       role: 'Co-President',          photo: 'Hariene.jpg',   accent: '#F5B800' },
  { name: 'Kalishika Karunatilaka',   role: 'Vice President',        photo: 'Kalshika.JPG',  accent: '#2255cc' },
  { name: 'Thisas Gamage',            role: 'Secretary',             photo: 'Thisas.jpg',    accent: '#2255cc' },
  { name: 'Shazana Sharker',          role: 'Events Manager',        photo: 'Shazana.jpeg',  accent: '#F5B800' },
  { name: 'Mahimi Nadungoda',         role: 'Events Co-ordinator',   photo: 'Mahimi.JPG',    accent: '#F5B800' },
  { name: 'Ravindu Jayawardane',      role: 'Events Co-ordinator',   photo: 'Ravindu.jpeg',  accent: '#F5B800' },
  { name: 'Lakindu Balasooriya',      role: 'Marketing Manager',     photo: 'Lakindu.jpg',   accent: '#2255cc' },
  { name: 'Misha Kumarr',             role: 'Graphic Designer',      photo: 'Misha.jpg',     accent: '#2255cc' },
  { name: 'Sharon Fernando',          role: 'Graphic Designer',      photo: 'Sharon.jpeg',   accent: '#2255cc' },
  { name: 'Dinith de Alwis',          role: 'Finance Manager',       photo: 'Dinith.jpeg',   accent: '#F5B800' },
  { name: 'Riveen Kariyawasam',       role: 'Treasurer',             photo: 'Riveen.JPG',    accent: '#F5B800' },
  { name: 'Shakeel Shamaail',         role: 'Treasurer',             photo: 'Shakeel.jpeg',  accent: '#F5B800' },
  { name: 'Shenan Rajasekara',        role: 'Junior Representative', photo: 'Shenan.jpg',    accent: '#2255cc' },
  { name: 'Navik Alwis',              role: 'Junior Representative', photo: 'Navik.jpg',     accent: '#2255cc' },
  { name: 'Chethani Wilegoda Gamage', role: 'Junior Representative', photo: 'Chethani.jpg',  accent: '#2255cc' },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: 'Who can join ALSA?',
    a: 'Any student studying in Auckland with a connection to Sri Lanka — or anyone who loves Sri Lankan culture. Current students, alumni, exchange students, postgrads and PhD candidates are all welcome.',
  },
  {
    q: 'What\'s the difference between Full and Social membership?',
    a: 'Full members (NZD $10/year) get priority event access, discounts, an ALSA member card, and voting rights at the AGM. Social members get free access to our community channels and social events.',
  },
  {
    q: 'How many events do you run each year?',
    a: 'We typically run 10–15 events per year — Avurudu, Cultural Night (Raaga), the ALSA Food Festival, cricket tournaments, welcome nights, study jams, and more.',
  },
  {
    q: 'Can businesses sponsor ALSA?',
    a: 'Absolutely. We partner with local Sri Lankan businesses, restaurants, and brands. Reach out via the contact form for our sponsorship deck.',
  },
  {
    q: 'How do I get refunded if I change my mind?',
    a: 'Membership is refundable within 14 days if you haven\'t attended any members-only events. Email us at info@alsa.org.nz.',
  },
];

// ─── Sponsors ─────────────────────────────────────────────────────────────────
export const SPONSORS = [
  { name: 'Ceylon Spice Co.', tier: 'Gold' },
  { name: 'Sigiriya Café', tier: 'Gold' },
  { name: 'Lanka Travel NZ', tier: 'Silver' },
  { name: 'Kandy Kitchen', tier: 'Silver' },
  { name: 'Colombo Catering', tier: 'Silver' },
  { name: 'Orient Groceries', tier: 'Bronze' },
  { name: 'Serendib Sweets', tier: 'Bronze' },
  { name: 'Tea & Toddy Bar', tier: 'Bronze' },
];

// ─── Gallery events ───────────────────────────────────────────────────────────
// photo:    paste the Google Drive direct image URL for the cover photo.
//   How to get it: right-click file in Drive → Share → Anyone with link → copy link.
//   Then change the URL from:
//     https://drive.google.com/file/d/FILE_ID/view
//   to:
//     https://drive.google.com/uc?export=view&id=FILE_ID
// albumUrl: link to the full Google Drive/Photos folder for this event.
// year:     used for the year-filter browser below the main grid.
// The first entry is displayed larger as the featured/most recent event.
export const GALLERY_EVENTS = [
  // ── 2026 ──────────────────────────────────────────────────────────────────
  {
    title: 'Avurudu 2026',
    date: 'APR 2026',
    year: 2026,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Meet and Greet 2026',
    date: 'MAR 2026',
    year: 2026,
    photo: '',
    albumUrl: '',
  },
  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    title: 'Avurudu 2025',
    date: 'APR 2025',
    year: 2025,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Cultural Night — Raaga',
    date: 'MAY 2025',
    year: 2025,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Winter Cricket Cup',
    date: 'JUN 2025',
    year: 2025,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Food Festival 2025',
    date: 'SEP 2025',
    year: 2025,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Welcome Night 2025',
    date: 'FEB 2025',
    year: 2025,
    photo: '',
    albumUrl: '',
  },
  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    title: 'Avurudu 2024',
    date: 'APR 2024',
    year: 2024,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Cultural Night 2024',
    date: 'MAY 2024',
    year: 2024,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Food Festival 2024',
    date: 'SEP 2024',
    year: 2024,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Grad Celebration 2024',
    date: 'NOV 2024',
    year: 2024,
    photo: '',
    albumUrl: '',
  },
  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    title: 'Avurudu 2023',
    date: 'APR 2023',
    year: 2023,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Cultural Night 2023',
    date: 'MAY 2023',
    year: 2023,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Food Festival 2023',
    date: 'SEP 2023',
    year: 2023,
    photo: '',
    albumUrl: '',
  },
  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    title: 'Avurudu 2022',
    date: 'APR 2022',
    year: 2022,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Welcome Night 2022',
    date: 'FEB 2022',
    year: 2022,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Cricket Cup 2022',
    date: 'JUL 2022',
    year: 2022,
    photo: '',
    albumUrl: '',
  },
  // ── 2021 ──────────────────────────────────────────────────────────────────
  {
    title: 'Avurudu 2021',
    date: 'APR 2021',
    year: 2021,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Virtual Social Night',
    date: 'JUN 2021',
    year: 2021,
    photo: '',
    albumUrl: '',
  },
  // ── 2020 ──────────────────────────────────────────────────────────────────
  {
    title: 'Avurudu 2020',
    date: 'APR 2020',
    year: 2020,
    photo: '',
    albumUrl: '',
  },
  {
    title: 'Welcome Night 2020',
    date: 'FEB 2020',
    year: 2020,
    photo: '',
    albumUrl: '',
  },
];

// ─── Membership tiers ────────────────────────────────────────────────────────
export const MEMBERSHIP_TIERS = [
  {
    id: 'full',
    badge: 'Most Popular',
    badgeClass: 'badge-full',
    price: '$10',
    pricePrefix: 'NZD ',
    period: '/year',
    perks: [
      'Access to all ALSA events',
      'Member discounts & deals',
      'Voting rights at AGM',
      'Official ALSA member card',
      'Priority event registration',
    ],
    isDefault: true,
  },
  {
    id: 'social',
    badge: 'Free',
    badgeClass: 'badge-social',
    price: '$0',
    pricePrefix: '',
    period: '/year',
    perks: [
      'Access to social events',
      'ALSA WhatsApp community',
      'Monthly newsletter',
      'No voting rights',
    ],
    isDefault: false,
  },
];

// ─── Join form options ────────────────────────────────────────────────────────
export const UNIVERSITIES = [
  'University of Auckland (UoA)',
  'Auckland University of Technology (AUT)',
  'Massey University (Albany)',
  'Unitec Institute of Technology',
  'MIT Manukau',
  'Other',
];

export const STUDY_YEARS = [
  '1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year',
  'Postgraduate', 'PhD', 'Alumni',
];

export const FIELDS_OF_STUDY = [
  'Engineering', 'Science', 'Commerce', 'Medical and Health Sciences',
  'Law', 'Arts', 'Architecture', 'Education', 'Other',
];

// ─── Contact info ─────────────────────────────────────────────────────────────
// icon: SVG key — 'email' | 'instagram' | 'facebook'
export const CONTACT_INFO = [
  { icon: 'email',     label: 'Email',     value: 'uoa.alsa2020@gmail.com',                        href: 'mailto:uoa.alsa2020@gmail.com',      external: false },
  { icon: 'instagram', label: 'Instagram', value: '@uoa.alsa',                                     href: 'https://instagram.com/uoa.alsa',     external: true  },
  { icon: 'facebook',  label: 'Facebook',  value: 'Auckland Lankan Students Association — ALSA',   href: 'https://facebook.com/alsa.uoa',        external: true  },
];

// ─── Footer navigation ────────────────────────────────────────────────────────
export const FOOTER_NAV = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Events', href: '#events' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Team', href: '#team' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Full Membership — NZD $10', href: '#join' },
      { label: 'Social Membership — Free', href: '#join' },
      { label: 'Sponsorship', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
];
