// ─── Site-wide config ────────────────────────────────────────────────────────
// Edit this file to update content across the whole site.

export const SITE = {
  name: 'ALSA',
  fullName: 'Auckland Lankan Students Association',
  description:
    "Your home away from home — connecting Sri Lankan students across Auckland's universities through culture, community and unforgettable moments.",
  email: 'info@alsa.org.nz',
  instagram: 'https://instagram.com/alsa_nz',
  instagramHandle: '@alsa_nz',
  facebook: 'https://facebook.com/alsanz',
  flickr: 'https://flickr.com',
  location: 'Auckland, New Zealand 🇳🇿',
  year: '2026',
  // Replace with your Stripe publishable key from Stripe Dashboard → Developers → API Keys
  stripeKey: 'pk_test_YOUR_KEY_HERE',
};

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Join', href: '#join' },
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

// ─── Upcoming events ──────────────────────────────────────────────────────────
export const EVENTS = [
  {
    date: '14 APR',
    time: '6:00 PM',
    title: 'Sinhala & Tamil New Year — Avurudu 2026',
    location: 'University of Auckland — Fale Pasifika',
    tag: 'Flagship',
    description: 'Traditional games, rabaan drumming, milk rice and a kiribath feast. Bring family and friends.',
    color: 'gold',
  },
  {
    date: '08 MAY',
    time: '7:30 PM',
    title: 'Cultural Night — Raaga',
    location: 'AUT City Campus — WZ Theatre',
    tag: 'Headliner',
    description: 'A showcase of Lankan dance, music and fashion performed by Auckland students.',
    color: 'blue',
  },
  {
    date: '22 JUN',
    time: '11:00 AM',
    title: 'Winter Cricket Cup',
    location: 'Albany Fields, North Shore',
    tag: 'Sport',
    description: 'Inter-university cricket tournament. Teams of 8, casual day format.',
    color: 'gold',
  },
  {
    date: '19 SEP',
    time: '6:30 PM',
    title: 'ALSA Food Festival',
    location: 'Britomart Square',
    tag: 'Community',
    description: 'Kottu, hoppers, string hoppers and more — open to the public, tickets at door.',
    color: 'blue',
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
  { name: 'Ishara Fernando', role: 'President', initial: 'IF', accent: '#F5B800' },
  { name: 'Kavindu Jayasuriya', role: 'Vice President', initial: 'KJ', accent: '#2255cc' },
  { name: 'Senuri de Silva', role: 'Secretary', initial: 'SD', accent: '#F5B800' },
  { name: 'Raveen Gunathilake', role: 'Treasurer', initial: 'RG', accent: '#2255cc' },
  { name: 'Amaya Hettiarachchi', role: 'Events Director', initial: 'AH', accent: '#F5B800' },
  { name: 'Dilan Wijesinghe', role: 'Sports Director', initial: 'DW', accent: '#2255cc' },
  { name: 'Pavani Ratnayake', role: 'Cultural Director', initial: 'PR', accent: '#F5B800' },
  { name: 'Menaka Karunaratne', role: 'Marketing Lead', initial: 'MK', accent: '#2255cc' },
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

// ─── Gallery placeholders ─────────────────────────────────────────────────────
export const GALLERY_PLACEHOLDERS = [
  { icon: '📸', label: 'Avurudu 2025' },
  { icon: '🎊', label: 'Welcome Night' },
  { icon: '🌟', label: 'Cultural Night' },
  { icon: '🏏', label: 'Cricket Day' },
  { icon: '🍛', label: 'Food Festival' },
  { icon: '🎓', label: 'Grad Celebration' },
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
export const CONTACT_INFO = [
  { icon: '📧', label: 'Email', value: 'info@alsa.org.nz', href: 'mailto:info@alsa.org.nz', external: false },
  { icon: '📸', label: 'Instagram', value: '@alsa_nz', href: 'https://instagram.com/alsa_nz', external: true },
  { icon: '📘', label: 'Facebook', value: 'ALSA Auckland', href: 'https://facebook.com/alsanz', external: true },
  { icon: '💬', label: 'WhatsApp Group', value: 'Join as member to access', href: '#join', external: false },
  { icon: '📍', label: 'Location', value: 'Auckland, New Zealand 🇳🇿', href: null },
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
