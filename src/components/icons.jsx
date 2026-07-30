// Hand-tuned line icons drawn for ALSA — replaces generic emoji so every glyph
// shares one visual language: 2px rounded strokes, 24px grid, currentColor.
// Usage: <LampIcon size={22} />  — color comes from the parent's CSS `color`.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const Svg = ({ size = 20, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...rest}>
    {children}
  </svg>
);

/* Pahana — the Sri Lankan oil lamp lit at every Avurudu and cultural night. */
export const LampIcon = props => (
  <Svg {...props}>
    <path d="M12 2.8c1.1 1.4 1.7 2.5 1.7 3.4a1.7 1.7 0 0 1-3.4 0c0-.9.6-2 1.7-3.4z" />
    <path d="M5.8 10.8h12.4l-.7 1.9a4 4 0 0 1-3.8 2.7h-3.4a4 4 0 0 1-3.8-2.7l-.7-1.9z" />
    <path d="M12 15.4v2.8" />
    <path d="M8.2 20.8c.9-1.2 2.2-1.8 3.8-1.8s2.9.6 3.8 1.8" />
  </Svg>
);

/* Two people — seniors and first-years, side by side. */
export const PeopleIcon = props => (
  <Svg {...props}>
    <circle cx="9" cy="7.6" r="3.1" />
    <path d="M3.4 19.8c.4-3.1 2.7-5 5.6-5s5.2 1.9 5.6 5" />
    <path d="M15.4 5.2a3.1 3.1 0 0 1 1.8 5.7" />
    <path d="M17 14.9c2.3.5 3.8 2.3 4.1 4.9" />
  </Svg>
);

/* Graduation cap. */
export const CapIcon = props => (
  <Svg {...props}>
    <path d="m2.2 9.3 9.8-4.4 9.8 4.4-9.8 4.4-9.8-4.4z" />
    <path d="M6.6 11.6v4.3c0 1.3 2.4 2.6 5.4 2.6s5.4-1.3 5.4-2.6v-4.3" />
    <path d="M21.8 9.3v5.2" />
  </Svg>
);

/* Cricket bat and ball. */
export const CricketIcon = props => (
  <Svg {...props}>
    <path d="M7 14.7 15.4 6a2.1 2.1 0 0 1 3 3l-8.7 8.4c-1 .9-2.4.9-3.3 0-.9-1-.8-2.1.6-2.7z" />
    <path d="M6.4 17.6 3.6 20.4" />
    <circle cx="18.6" cy="18.4" r="2.6" />
  </Svg>
);

export const CalendarIcon = props => (
  <Svg {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.8h17" />
    <path d="M8.2 2.8V7M15.8 2.8V7" />
    <path d="M8 14h2.4" />
  </Svg>
);

export const PinIcon = props => (
  <Svg {...props}>
    <path d="M12 21.2S5.5 15.7 5.5 10.8a6.5 6.5 0 0 1 13 0c0 4.9-6.5 10.4-6.5 10.4z" />
    <circle cx="12" cy="10.8" r="2.3" />
  </Svg>
);

export const TicketIcon = props => (
  <Svg {...props}>
    <path d="M3.5 9.2V7.3c0-1 .8-1.8 1.8-1.8h13.4c1 0 1.8.8 1.8 1.8v1.9a2.8 2.8 0 0 0 0 5.6v1.9c0 1-.8 1.8-1.8 1.8H5.3c-1 0-1.8-.8-1.8-1.8v-1.9a2.8 2.8 0 0 0 0-5.6z" />
    <path d="M14.6 6.2v2.2M14.6 11v2M14.6 15.8V18" />
  </Svg>
);

export const CameraIcon = props => (
  <Svg {...props}>
    <path d="M8.6 7.2 10.2 4.8h3.6l1.6 2.4H19a2 2 0 0 1 2 2v8.4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.2a2 2 0 0 1 2-2h3.6z" />
    <circle cx="12" cy="13" r="3.4" />
  </Svg>
);

export const LockIcon = props => (
  <Svg {...props}>
    <rect x="5.5" y="10.6" width="13" height="9.6" rx="2" />
    <path d="M8.6 10.6V8.1a3.4 3.4 0 0 1 6.8 0v2.5" />
    <path d="M12 14.4v2" />
  </Svg>
);

export const TrophyIcon = props => (
  <Svg {...props}>
    <path d="M7.2 4h9.6v5a4.8 4.8 0 0 1-9.6 0V4z" />
    <path d="M7.2 5.2H4.6v1.4a3 3 0 0 0 2.7 3M16.8 5.2h2.6v1.4a3 3 0 0 1-2.7 3" />
    <path d="M12 13.8v3M8.8 20.4h6.4M10 17h4l.7 3.4H9.3L10 17z" />
  </Svg>
);

export const InfoIcon = props => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 11v5M12 7.6v.2" />
  </Svg>
);

/* Liya-vela ornament — the curling vine motif from Kandyan woodwork, used as a
   section flourish. Wide and shallow: give it width via the `width` prop. */
export const Ornament = ({ width = 150, className = '' }) => (
  <svg
    width={width}
    height={width * 0.14}
    viewBox="0 0 150 21"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    {/* central bud */}
    <path d="M75 4.5 79 10.5 75 16.5 71 10.5 75 4.5z" strokeLinejoin="round" />
    {/* left vine */}
    <path d="M67 10.5 C 58 10.5, 56 4.5, 48 4.5 C 42 4.5, 40 8.5, 42 11 C 43.6 13, 47 12.2, 46.6 9.6" />
    <path d="M42 11 C 36 16.5, 26 16.5, 18 12.5" />
    <path d="M18 12.5 C 14 10.6, 8 10.5, 3 12" />
    {/* right vine (mirror) */}
    <path d="M83 10.5 C 92 10.5, 94 4.5, 102 4.5 C 108 4.5, 110 8.5, 108 11 C 106.4 13, 103 12.2, 103.4 9.6" />
    <path d="M108 11 C 114 16.5, 124 16.5, 132 12.5" />
    <path d="M132 12.5 C 136 10.6, 142 10.5, 147 12" />
  </svg>
);
