# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-06-13

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** alsa-website
- **Description:** The Auckland Lankan Students Association website. Built with React + Vite, deployed on Vercel, with payments via Stripe and member data + event email blasts via Google Apps Script.
- **Apps Script notify route is token-protected (2026-07-31):** doPost's `action:'notify'` requires `token` matching the NOTIFY_TOKEN Script Property. `npm run notify` reads NOTIFY_TOKEN from .env.local. Changing apps-script.gs requires manual redeploy in script.google.com (repo copy is reference only).
- **Stripe key in site.js is a TEST key (pk_test…):** payments are in test mode until swapped for pk_live + STRIPE_SECRET_KEY live value in Vercel env.
- **Event `hidden: true` flag** must be honoured in BOTH the upcoming and past filters in Events.jsx.
- **CSP lives in vercel.json headers** — any new third-party script/font/API domain must be added there or it will be blocked in production (but not in `vite dev`, which serves no CSP).
- **Copy voice:** warm, specific, student-run tone; avoid generic "vibrant community" phrasing. Testimonials are attributed quotes — never rewrite them.
- **Icons (2026-07-31):** never use emoji as UI icons — use the custom line-icon set in `src/components/icons.jsx` (24px grid, 2px rounded strokes, currentColor). Includes a liya-vela `Ornament` flourish for section headings. Pillar icons are keyed via `PILLAR_ICONS` in About.jsx.
- **Gotcha:** global.css styles the bare `footer` element (site footer). Any `<footer>` inside a component (e.g. blockquote footers) inherits its dark background — override or use a div.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
