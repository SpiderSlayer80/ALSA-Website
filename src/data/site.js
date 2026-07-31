// ─── Site-wide config ────────────────────────────────────────────────────────
// Edit this file to update content across the whole site.

export const SITE = {
  name: 'ALSA',
  fullName: 'Auckland Lankan Students Association',
  description:
    "The home away from home for Sri Lankan students in Auckland. Five universities, one big family, and a calendar that never stays quiet for long.",
  email: 'uoa.alsa2020@gmail.com',
  instagram: 'https://instagram.com/uoa.alsa',
  instagramHandle: '@uoa.alsa',
  facebook: 'https://facebook.com/alsanz',
  location: 'Auckland, New Zealand 🇳🇿',
  year: '2026',
  // Replace with your Stripe publishable key from Stripe Dashboard → Developers → API Keys
  stripeKey: 'pk_test_51TQJK7KtECflMRWtFDN5ENA7AaCY6U4nqrNOeumNi0UVtcKCrv30FOkujDmfp4j33qbrq9at1dioXMN0abHrvLMy00lT3HUDlp',
  // Paste your Google Apps Script web app URL here after deploying (see README / setup instructions)
  sheetsUrl: 'https://script.google.com/macros/s/AKfycbxKThZaBCGeq5E6BxbIqo5DotExV4JqXub_TW2Nqgn52vGF6hZb4LpYXwWVGt_Ewp6s/exec',
};

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_WORDS = ['Hello', 'ආයුබෝවන්', 'வணக்கம்'];

// ─── About pillars ───────────────────────────────────────────────────────────
export const PILLARS = [
// icon: key into the PILLAR_ICONS map in About.jsx (custom SVG line icons)
  {
    icon: 'lamp',
    title: 'Cultural Events',
    text: 'Avurudu games, Raaga on stage, kiribath at midday. The traditions we grew up with, kept alive right here in Auckland.',
  },
  {
    icon: 'people',
    title: 'Community Support',
    text: 'Seniors who remember their own first week look out for the ones just arriving. Nobody should navigate uni in a new country alone.',
  },
  {
    icon: 'cap',
    title: 'Academic Network',
    text: 'Study groups, course advice and career leads that reach across UoA, AUT, Massey and Unitec.',
  },
  {
    icon: 'cricket',
    title: 'Sport & Social',
    text: 'Cricket rivalries, futsal, karaoke you might regret and steins you definitely won\'t. Where classmates become lifelong friends.',
  },
];

// ─── Events ───────────────────────────────────────────────────────────────────
// id:            unique stable string (e.g. 'meet-greet-2026'). Used to dedupe email blasts —
//               never reuse an id, never change it after a blast has been sent.
// dateISO:       YYYY-MM-DD — drives the upcoming/past split automatically.
// poster:        filename of the event poster inside src/event posters/ (square Instagram-post style works best).
// eventbriteUrl: paste the Eventbrite event link if the event is ticketed — hovering the poster reveals a Buy Tickets overlay,
//               clicking opens Eventbrite in a new tab. Leave as '' for free/non-ticketed events.
// tickets:      optional array of ticket tiers shown directly on the event card, e.g.
//                 [{ name: 'ALSA Member', price: 15 }, { name: 'Non-member', price: 20 }]
//               Use `note` instead of `price` for non-numeric tiers (e.g. { name: 'Door sales', note: 'Cash only' }).
//               Leave undefined or [] to hide the price list. Buying still happens on Eventbrite.
// notifyMembers: set to true and run `npm run notify` to email all opted-in members about this event.
//               Apps Script dedupes by id, so re-running notify after a blast is sent is a no-op.
export const EVENTS = [
  {
    id: 'meet-greet-2026',
    dateISO: '2026-03-19',
    date: '19 MAR',
    time: '6:00 PM',
    title: 'Meet and Greet',
    location: 'Albert Park, Mt Eden',
    tag: 'Social',
    description: 'The first hangout of the year. Come meet the 2026 committee, put faces to names and leave with a few new friends before lectures ramp up.',
    color: 'blue',
    poster: 'Meet & Greet Event poster 2026.jpg',
    eventbriteUrl: '',
    notifyMembers: false,
  },
  {
    id: 'avurudu-2026',
    dateISO: '2026-04-24',
    date: '24 APR',
    time: '6:00 PM',
    title: 'Sinhala & Tamil New Year: Avurudu 2026',
    location: 'B201 Atrium (Arts Building), UoA',
    tag: 'Flagship',
    description: 'Kiribath, rabaan drumming and a full afternoon of aluth avurudu games. Wherever in Sri Lanka you call home, this one will feel like it.',
    color: 'gold',
    poster: 'New Years Poster 2026.jpg',
    eventbriteUrl: '',
    notifyMembers: false,
  },
  {
    id: 'sac-movie-night-2026',
    dateISO: '2026-05-16',
    date: '16 MAY',
    time: '7:00 PM',
    title: 'South Asian Club Movie Night',
    location: 'University of Auckland',
    tag: 'Collab',
    description: 'Snacks, a big screen and good company, hosted with the South Asian Club. Come solo or bring a mate; either way you won\'t be sitting alone for long.',
    color: 'blue',
    poster: '',          // e.g. 'movienight.jpg' inside src/event posters/
    eventbriteUrl: '',    // paste Eventbrite event URL here when ticketed
    tickets: [
      { name: 'ALSA Member', price: 10 },
      { name: 'Non-member', price: 15 },
    ],
    notifyMembers: false,
    hidden: true,
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
// crop: CSS object-position value controlling which part of the photo shows inside
// the circle. Format is "X% Y%" or named values like "center top".
// Examples: 'center top' (default), 'center 20%', '30% 10%', 'right top'
export const TEAM = [
  { name: 'Binuk',     role: 'President',             group: 'Executive Committee', photo: 'Binuk.jpg',     accent: '#F5B800', crop: 'center 50%' },
  { name: 'Kalishika', role: 'Vice President',        group: 'Executive Committee', photo: 'Kalshika.JPG',  accent: '#F5B800', crop: 'center top' },
  { name: 'Thisas',    role: 'Secretary',             group: 'Executive Committee', photo: 'Thisas.jpg',    accent: '#F5B800', crop: 'center top' },
  { name: 'Lakindu',   role: 'Marketing Manager',     group: 'Managers',   photo: 'Lakindu.jpg',   accent: '#F5B800', crop: '100% 50%' },
  { name: 'Shazana',   role: 'Events Manager',        group: 'Managers',   photo: 'Shazana.jpeg',  accent: '#F5B800', crop: 'center top' },
  { name: 'Dinith',    role: 'Finance Manager',       group: 'Managers',   photo: 'Dinith.jpeg',   accent: '#F5B800', crop: 'center top' },
  { name: 'Mahimi',    role: 'Events Co-ordinator',   group: 'Committee', photo: 'Mahimi.JPG',    accent: '#2255cc', crop: 'center top' },
  { name: 'Ravindu',   role: 'Events Co-ordinator',   group: 'Committee', photo: 'Ravindu.jpeg',  accent: '#2255cc', crop: 'center top' },
  { name: 'Misha',     role: 'Graphic Designer',      group: 'Committee', photo: 'Misha.jpg',     accent: '#2255cc', crop: 'center' },
  { name: 'Sharon',    role: 'Graphic Designer',      group: 'Committee', photo: 'Sharon.jpeg',   accent: '#2255cc', crop: 'center' },
  { name: 'Riveen',    role: 'Treasurer',             group: 'Committee', photo: 'Riveen.JPG',    accent: '#2255cc', crop: 'center top' },
  { name: 'Shakeel',   role: 'Treasurer',             group: 'Committee', photo: 'Shakeel.jpeg',  accent: '#2255cc', crop: '5% top' },
  { name: 'Shenan',    role: 'Junior Representative', group: 'Junior Reps', photo: 'Shenan.jpg',   accent: '#2255cc', crop: 'center top' },
  { name: 'Navik',     role: 'Junior Representative', group: 'Junior Reps', photo: 'Navik.jpg',    accent: '#2255cc', crop: 'center top' },
  { name: 'Chethani',  role: 'Junior Representative', group: 'Junior Reps', photo: 'Chethani.jpg', accent: '#2255cc', crop: 'center top' },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: 'Who can join ALSA?',
    a: 'If you study in Auckland and have any connection to Sri Lanka, you\'re in. And if you don\'t but you love the culture anyway, you\'re in too. Undergrads, postgrads, PhD students, exchange students and alumni are all welcome.',
  },
  {
    q: 'What\'s the difference between Full and Social membership?',
    a: 'Full membership costs NZD $10 for the year and gets you into everything: priority spots at events, member discounts, an official ALSA card and a vote at the AGM. Social membership is free and covers our community channels and social events. Plenty of people start Social and upgrade once they\'ve been to their first event.',
  },
  {
    q: 'How many events do you run each year?',
    a: 'Usually somewhere between 10 and 15. The big ones are Avurudu, Raaga (our cultural night) and the food festival, and around them we fit cricket, welcome nights, study sessions and whatever else the year throws up.',
  },
  {
    q: 'Can businesses sponsor ALSA?',
    a: 'Yes, and we\'d love to chat. We work with Sri Lankan businesses, restaurants and brands around Auckland. Send us a message through the contact form and we\'ll get our sponsorship deck to you.',
  },
  {
    q: 'How do I get refunded if I change my mind?',
    a: 'No hard feelings. Email uoa.alsa2020@gmail.com within 14 days of paying and, as long as you haven\'t been to a members-only event yet, we\'ll refund your $10 in full.',
  },
];

// ─── Sponsors ─────────────────────────────────────────────────────────────────
// photo: filename inside src/sponsors/ — leave blank if no image yet
export const SPONSORS = [
  { name: 'Aaraksha',         photo: 'Aaraskha.jpeg' },
  { name: 'Eco Air & Cargo',  photo: 'Eco Air & cargo.jpg' },
  { name: 'Sithari Cars',     photo: 'Sithari Cars.jpg' },
  { name: 'Sri Lanka NZ',     photo: 'SriLankaNZ.png' },
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
    albumUrl: 'https://drive.google.com/drive/folders/1G5zkrxuQQCXWQ7CB1ELq3iF9ZhjVXq2d?usp=drive_link',
  },
  {
    title: 'Waka Ama 2026',
    date: '21ST MARCH 2026',
    year: 2026,
    photo: 'src/Covers/Waka ama 2026.JPG',
    albumUrl: 'https://drive.google.com/drive/folders/1-wjy8PCuMxG_vYRcMI-x0a7mxz5KMys5?usp=drive_link',
  },
  {
    title: 'Meet and Greet 2026',
    date: '19TH MARCH 2026',
    year: 2026,
    photo: 'src/Covers/Meet & Greet 2026.png',
    albumUrl: 'https://drive.google.com/drive/folders/1KvPq9WpwWGN3aouM9NQvXsYaLqZDhD2L?usp=drive_link',
  },
  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    title: 'One Last Stein 2025',
    date: '9TH OCTOBER 2025',
    year: 2025,
    photo: 'src/Covers/Stein 2025.jpg',
    albumUrl: 'https://www.facebook.com/media/set/?set=a.122105249805051554&type=3&rdid=wcPqqDur6EEsX2hZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CQovLWwGv%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio#',
  },
  {
    title: 'ALSA vs AUIS Cricket Match 2025',
    date: '21ST SEPTEMBER 2025',
    year: 2025,
    photo: 'src/Covers/ALSA vs AUIS Cricket 2025.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1Y4jBAwib2SpikPqohL4-ERHxTh26FKvE?usp=sharing',
  },
  {
    title: 'Futsal Tournament 2025',
    date: '24TH AUGUST 2025',
    year: 2025,
    photo: 'src/Covers/Futsal Tournament 2025.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1_XnPlPDwBIuF52OzLH0GfCis8ra3zuRf?usp=sharing',
  },
  {
    title: 'New Year\'s 2025',
    date: '10TH APRIL 2025',
    year: 2025,
    photo: 'src/Covers/New Year\'s 2025.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1XzYyu85doL_qFkdn-67p_AEu8cSMsTPs?usp=sharing',
  },
  {
    title: 'Meet & Greet 2025',
    date: '13TH MARCH 2025',
    year: 2025,
    photo: 'src/Covers/Meet & Greet 2025.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1guWuNBB0sAniAPN8iqs9X8eRLHMVQeId?usp=sharing',
  },
  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    title: 'Into the Jungle 2024',
    date: '10TH OCTOBER 2024',
    year: 2024,
    photo: 'src/Covers/Stein 2024.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1TSpH-SA_d90ogWobg9iYQtWAD9rPCmNE?usp=sharing',
  },
  {
    title: 'ALSA vs AUIS Cricket Match 2024',
    date: '22ND SEPTEMBER 2024',
    year: 2024,
    photo: 'src/Covers/ALSA vs AUIS 2024.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1Fi_yw1JHrNOMOi9uNFf1jUlhTNxnBfqz?usp=sharing',
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
    albumUrl: 'https://drive.google.com/drive/folders/1p-y4HxmBtm3cS-Mqv6zF4AGgEsh1opDW?usp=sharing',
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
    albumUrl: 'https://drive.google.com/drive/folders/1F9_FhpONUmC9ZpludoKwCkSQ88XBLXW0?usp=sharing',
  },
  {
    title: 'Netball & Basketball Tournament 2023',
    date: '23RD JULY 2023',
    year: 2023,
    photo: 'src/Covers/Basketball 2023.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1xkYXo1ccdu_1ki3tsGAlsx3A97i7FoTR?usp=sharing',
  },
  {
    title: 'Baila Party 2023',
    date: '20TH MAY 2023',
    year: 2023,
    photo: 'src/Covers/Baila party 2023.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1MC6x6JKu5DSX0UcTDdD-WrXwLemo4hPP?usp=sharing',
  },
  {
    title: 'New Year\'s 2023',
    date: '26TH APRIL 2023',
    year: 2023,
    photo: 'src/Covers/New Years 2023.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1nsC_tpxee731HY82oq9I1AYE6K1ByrQI?usp=sharing',
  },
  {
    title: 'ALSA vs AUIS Cricket Match 2023',
    date: '26TH APRIL 2023',
    year: 2023,
    photo: 'src/Covers/ALSA vs AUIS 2023.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1BIlKUgbSNVzRW1A3nb1uG0xugKlyxcPo?usp=sharing',
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    title: 'Coachella 2022',
    date: '16TH SEPTEMBER 2022',
    year: 2022,
    photo: 'src/Covers/Stein 2022.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1mZ0iBsYftcEgvuyFN3yxpkZGcSyun4Hg?usp=sharing',
  },
  {
    title: 'Basketball & Netball Tournament 2022',
    date: '23RD JULY 2022',
    year: 2022,
    photo: 'src/Covers/Basketball 2022.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1-5384JLvDJG3sMeyv77CoOPYJmuoFxGd?usp=sharing',
  },
  {
    title: 'New Year\'s 2022',
    date: '18TH MAY 2022',
    year: 2022,
    photo: 'src/Covers/New Years 2022.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1PbTpopivIIF9avne-X8P-tskbLj65cFw?usp=sharing',
  },
  {
    title: 'ALSA vs AUIS Cricket Match 2022',
    date: '2ND APRIL 2022',
    year: 2022,
    photo: 'src/Covers/ALSA vs AUIS 2022.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1xr-JQO-FJHr1TPuUoyRhfWGclTj0LIQN?usp=sharing',
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
    albumUrl: 'https://drive.google.com/drive/folders/1ZtDQ3m7RFdo-VDd_GQgtzdoOqmMxrCiv?usp=sharing',
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
