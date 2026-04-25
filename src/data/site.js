// ─── Site-wide config ────────────────────────────────────────────────────────
// Edit this file to update content across the whole site.

export const SITE = {
  name: 'ALSA',
  fullName: 'Auckland Lankan Students Association',
  description:
    "A welcoming community for Sri Lankan students across Auckland's universities, bringing together culture, friendship and shared experiences throughout your time in New Zealand.",
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
  sheetsUrl: 'https://script.google.com/macros/s/AKfycbwXpUnZtibDR33mnVIuHawHX969zp9aCRLVJm2IjzTIh6lN91rz_dvkG28QeScc4QxJ/exec',
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

export const HERO_WORDS = ['Hello', 'ආයුබෝවන්', 'வணக்கம்'];

// ─── About pillars ───────────────────────────────────────────────────────────
export const PILLARS = [
  {
    icon: '🎉',
    title: 'Cultural Events',
    text: 'From Avurudu celebrations to cultural showcases, we bring Sri Lankan traditions to life across Auckland.',
  },
  {
    icon: '🤝',
    title: 'Community Support',
    text: 'Peer networks, mentorship and a welcoming space for every Sri Lankan student in Auckland.',
  },
  {
    icon: '🎓',
    title: 'Academic Network',
    text: 'Study groups, career connections and academic support across UoA, AUT, Massey and beyond.',
  },
  {
    icon: '🏏',
    title: 'Sport & Social',
    text: 'Cricket matches, food festivals, movie nights and social gatherings throughout the year.',
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
    description: 'A casual evening to meet the ALSA 2026 committee and connect with fellow Sri Lankan students from across Auckland.',
    color: 'blue',
    poster: 'Meet & Greet Event poster 2026.jpg',
    eventbriteUrl: '',
  },
  {
    dateISO: '2026-04-14',
    date: '14 APR',
    time: '6:00 PM',
    title: 'Sinhala & Tamil New Year: Avurudu 2026',
    location: 'University of Auckland, Fale Pasifika',
    tag: 'Flagship',
    description: 'Traditional games, rabaan drumming and a kiribath feast as we celebrate the Sri Lankan New Year together in Auckland.',
    color: 'gold',
    poster: 'New Years Poster 2026.jpg',
    eventbriteUrl: '',
  },
  {
    dateISO: '2026-05-16',
    date: '16 MAY',
    time: '7:00 PM',
    title: 'South Asian Club Movie Night',
    location: 'University of Auckland',
    tag: 'Collab',
    description: 'A relaxed movie night hosted alongside the South Asian Club. Bring a friend, grab a seat and unwind with us.',
    color: 'blue',
    poster: '',          // e.g. 'movienight.jpg' inside src/event posters/
    eventbriteUrl: '',
    hidden: false  // paste Eventbrite link here if ticketed
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote: 'ALSA made Auckland feel like home in my first week. The welcome night, the group chats and the senior mentors all made a real difference.',
    name: 'Nethmi Perera',
    role: 'Engineering, Year 2 · UoA',
  },
  {
    quote: 'Avurudu at UoA was unforgettable. It honestly felt like being back home, and I\'m so grateful for this community.',
    name: 'Dinesh Rathnayake',
    role: 'Commerce, Year 3 · AUT',
  },
  {
    quote: 'The cricket days, the food festivals, the friendships I\'ve built through ALSA make every cent of the membership worth it.',
    name: 'Tharushi Silva',
    role: 'Med Sci, Year 4 · UoA',
  },
  {
    quote: 'I joined as a shy first year and ended up on the executive committee three years later. ALSA genuinely shapes your university experience.',
    name: 'Ashen Weerasinghe',
    role: 'Alumnus · Massey',
  },
];

// ─── Team / Committee ─────────────────────────────────────────────────────────
export const TEAM = [
  { name: 'Binuk',     role: 'Co-President',          photo: 'Binuk.jpg',     accent: '#F5B800' },
  { name: 'Hariene',   role: 'Co-President',          photo: 'Hariene.jpg',   accent: '#F5B800' },
  { name: 'Kalishika', role: 'Vice President',        photo: 'Kalshika.JPG',  accent: '#F5B800' },
  { name: 'Thisas',    role: 'Secretary',             photo: 'Thisas.jpg',    accent: '#F5B800' },
  { name: 'Shazana',   role: 'Events Manager',        photo: 'Shazana.jpeg',  accent: '#F5B800' },
  { name: 'Mahimi',    role: 'Events Co-ordinator',   photo: 'Mahimi.JPG',    accent: '#2255cc' },
  { name: 'Ravindu',   role: 'Events Co-ordinator',   photo: 'Ravindu.jpeg',  accent: '#2255cc' },
  { name: 'Lakindu',   role: 'Marketing Manager',     photo: 'Lakindu.jpg',   accent: '#F5B800' },
  { name: 'Misha',     role: 'Graphic Designer',      photo: 'Misha.jpg',     accent: '#2255cc' },
  { name: 'Sharon',    role: 'Graphic Designer',      photo: 'Sharon.jpeg',   accent: '#2255cc' },
  { name: 'Dinith',    role: 'Finance Manager',       photo: 'Dinith.jpeg',   accent: '#F5B800' },
  { name: 'Riveen',    role: 'Treasurer',             photo: 'Riveen.JPG',    accent: '#2255cc' },
  { name: 'Shakeel',   role: 'Treasurer',             photo: 'Shakeel.jpeg',  accent: '#2255cc' },
  { name: 'Shenan',    role: 'Junior Representative', photo: 'Shenan.jpg',    accent: '#2255cc' },
  { name: 'Navik',     role: 'Junior Representative', photo: 'Navik.jpg',     accent: '#2255cc' },
  { name: 'Chethani',  role: 'Junior Representative', photo: 'Chethani.jpg',  accent: '#2255cc' },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: 'Who can join ALSA?',
    a: 'Any student studying in Auckland with a connection to Sri Lanka, or anyone who loves Sri Lankan culture. Current students, alumni, exchange students, postgraduates and PhD candidates are all welcome.',
  },
  {
    q: 'What\'s the difference between Full and Social membership?',
    a: 'Full members (NZD $10 per year) receive priority event access, exclusive discounts, an official ALSA member card and voting rights at the AGM. Social members enjoy free access to our community channels and social events.',
  },
  {
    q: 'How many events do you run each year?',
    a: 'We typically run between 10 and 15 events each year, including Avurudu, our Cultural Night (Raaga), the ALSA Food Festival, cricket tournaments, welcome nights and study sessions.',
  },
  {
    q: 'Can businesses sponsor ALSA?',
    a: 'Absolutely. We partner with local Sri Lankan businesses, restaurants and brands. Please reach out via the contact form to request our sponsorship deck.',
  },
  {
    q: 'How do I get refunded if I change my mind?',
    a: 'Membership is refundable within 14 days, provided you haven\'t attended any members only events. Please email us at uoa.alsa2020@gmail.com to request a refund.',
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
    title: 'New Years 2026',
    date: 'APR 24TH 2026',
    year: 2026,
    photo: 'src/Covers/New Years 2026.JPG',
    albumUrl: '',
  },
  {
    title: 'Waka Ama 2026',
    date: '21ST MARCH 2026',
    year: 2026,
    photo: 'src/Covers/Waka ama 2026.JPG',
    albumUrl: '',
  },
  {
    title: 'Meet and Greet 2026',
    date: '19TH MARCH 2026',
    year: 2026,
    photo: 'src/Covers/Meet & Greet 2026.png',
    albumUrl: '',
  },
  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    title: 'One Last Stein 2025',
    date: '9TH OCTOBER 2025',
    year: 2025,
    photo: 'src/Covers/Stein 2025.jpg',
    albumUrl: '',
  },
  {
    title: 'ALSA vs AUIS Cricket Match 2025',
    date: '21ST SEPTEMBER 2025',
    year: 2025,
    photo: 'src/Covers/ALSA vs AUIS Cricket 2025.jpg',
    albumUrl: '',
  },
  {
    title: 'Futsal Tournament 2025',
    date: '24TH AUGUST 2025',
    year: 2025,
    photo: 'src/Covers/Futsal Tournament 2025.jpg',
    albumUrl: '',
  },
  {
    title: 'New Year\'s 2025',
    date: '10TH APRIL 2025',
    year: 2025,
    photo: 'src/Covers/New Year\'s 2025.jpg',
    albumUrl: '',
  },
  {
    title: 'Meet & Greet 2025',
    date: '13TH MARCH 2025',
    year: 2025,
    photo: 'src/Covers/Meet & Greet 2025.jpg',
    albumUrl: '',
  },
  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    title: 'Into the Jungle 2024',
    date: '10TH OCTOBER 2024',
    year: 2024,
    photo: 'src/Covers/Stein 2024.jpg',
    albumUrl: '',
  },
  {
    title: 'ALSA vs AUIS Cricket Match 2024',
    date: '22ND SEPTEMBER 2024',
    year: 2024,
    photo: 'src/Covers/ALSA vs AUIS 2024.jpg',
    albumUrl: '',
  },
  {
    title: 'Karoke Night 2024',
    date: '24TH JULY 2024',
    year: 2024,
    photo: 'src/Covers/Karoke Night 2024.jpg',
    albumUrl: '',
  },
  {
    title: 'New Year\'s 2024',
    date: '7TH MAY 2024',
    year: 2024,
    photo: 'src/Covers/New Years 2024.jpg',
    albumUrl: '',
  },
  {
    title: 'Meet & Greet 2024',
    date: '6TH MARCH 2024',
    year: 2024,
    photo: 'src/Covers/Meet & Greet 2024.jpg',
    albumUrl: '',
  },
  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    title: 'Angels & Devils 2023',
    date: '28TH SEPTEMBER 2023',
    year: 2023,
    photo: 'src/Covers/Stein 2023.jpg',
    albumUrl: '',
  },
  {
    title: 'Netball & Basketball Tournament 2023',
    date: '23RD JULY 2023',
    year: 2023,
    photo: 'src/Covers/Basketball 2023.jpg',
    albumUrl: '',
  },
  {
    title: 'Baila Party 2023',
    date: '20TH MAY 2023',
    year: 2023,
    photo: 'src/Covers/Baila party 2023.jpg',
    albumUrl: '',
  },
  {
    title: 'New Year\'s 2023',
    date: '26TH APRIL 2023',
    year: 2023,
    photo: 'src/Covers/New Years 2023.jpg',
    albumUrl: '',
  },
  {
    title: 'ALSA vs AUIS Cricket Match 2023',
    date: '26TH APRIL 2023',
    year: 2023,
    photo: 'src/Covers/ALSA vs AUIS 2023.jpg',
    albumUrl: '',
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    title: 'Coachella 2022',
    date: '16TH SEPTEMBER 2022',
    year: 2022,
    photo: 'src/Covers/Stein 2022.jpg',
    albumUrl: '',
  },
  {
    title: 'Basketball & Netball Tournament 2022',
    date: '23RD JULY 2022',
    year: 2022,
    photo: 'src/Covers/Basketball 2022.jpg',
    albumUrl: '',
  },
  {
    title: 'New Year\'s 2022',
    date: '18TH MAY 2022',
    year: 2022,
    photo: 'src/Covers/New Years 2022.jpg',
    albumUrl: '',
  },
  {
    title: 'ALSA vs AUIS Cricket Match 2022',
    date: '2ND APRIL 2022',
    year: 2022,
    photo: 'src/Covers/ALSA vs AUIS 2022.jpg',
    albumUrl: '',
  },
  // ── 2021 ──────────────────────────────────────────────────────────────────
  {
    title: 'New Year\'s 2021',
    date: '31ST MARCH 2021',
    year: 2021,
    photo: 'src/Covers/New Years 2021.jpg',
    albumUrl: '',
  },
  // ── 2020 ──────────────────────────────────────────────────────────────────
  {
    title: 'Meet & Greet 2020',
    date: '5TH AUGUST 2020',
    year: 2020,
    photo: 'src/Covers/Meet & Greet 2020.jpg',
    albumUrl: '',
  }
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
  { icon: 'facebook',  label: 'Facebook',  value: 'Auckland Lankan Students Association',          href: 'https://facebook.com/alsa.uoa',        external: true  },
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
      { label: 'Full Membership (NZD $10)', href: '#join' },
      { label: 'Social Membership (Free)', href: '#join' },
      { label: 'Sponsorship', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
];
