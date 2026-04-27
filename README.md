# ALSA Website

The Auckland Lankan Students Association website. Built with React + Vite, deployed on Vercel, with payments via Stripe and member data + event email blasts via Google Apps Script.

This README is the handover document for future committee members. **You don't need to be a programmer to update this site.** Most updates are just editing one file (`src/data/site.js`) and pushing the change to GitHub. Auto-deploys to the live site within ~60 seconds.

---

## Table of contents

1. [Quick reference: I want to…](#quick-reference)
2. [How the site works (the big picture)](#how-the-site-works)
3. [First-time setup on your computer](#first-time-setup)
4. [Editing site content (the most common task)](#editing-site-content)
5. [Adding images: posters, photos, sponsors, gallery covers](#adding-images)
6. [Member event email notifications](#email-notifications)
7. [Stripe payments](#stripe-payments)
8. [Deploying changes (push to GitHub)](#deploying-changes)
9. [Project structure reference](#project-structure)
10. [What every component does](#component-reference)
11. [NPM scripts reference](#npm-scripts)
12. [Troubleshooting](#troubleshooting)

---

## Quick reference

> "I want to…"

| Task | Where to look |
|---|---|
| Add or change an event | [Edit `src/data/site.js` → `EVENTS`](#editing-events) |
| Hide an event | Add `hidden: true` to the event in `EVENTS` |
| Add or remove a committee member | [Edit `src/data/site.js` → `TEAM`](#editing-team) |
| Update team photos | Drop the new photo into `src/exec photos/` |
| Add an event poster | Drop the image into `src/event posters/` and reference the filename in `EVENTS` |
| Add a sponsor | [Edit `src/data/site.js` → `SPONSORS`](#editing-sponsors), drop logo into `src/sponsors/` |
| Add a gallery album | [Edit `src/data/site.js` → `GALLERY_EVENTS`](#editing-gallery) |
| Update FAQ, testimonials, hero stats | Edit the matching section in `src/data/site.js` |
| Email opted-in members about a new event | [Member email notifications](#email-notifications) |
| Change the membership price | `api/create-payment-intent.js` (`amount`) and the price text in `MEMBERSHIP_TIERS` |
| Update the Stripe key | See [Stripe payments](#stripe-payments) |

---

## How the site works

Three moving pieces:

1. **The website itself** — a React app that lives in `src/`. The content (events, team, sponsors, etc.) lives in **one file**: `src/data/site.js`. Edit that file, push to GitHub, and the site updates automatically (~60 seconds).

2. **Stripe payments** — when someone pays the $10 Full Membership fee, the site calls a tiny serverless function (`api/create-payment-intent.js`) that talks to Stripe. Stripe handles the actual card processing. Your Stripe dashboard is where the money lands.

3. **Google Apps Script (`apps-script.gs`)** — a Google-owned script attached to your Members Google Sheet. It does two jobs:
   - Receives signups from the join form and writes them to the sheet.
   - Sends event announcement emails to members who opted in. You trigger it from your laptop with `npm run notify`.

```
                  ┌─ Visitor ──────────────────────────────────┐
                  │  ↕   browses pages, fills out join form    │
                  ↓                                            ↑
              [ Vercel: live site ]                            │
                  │                ↓                           │
                  │           (POST signup)                    │
                  ↓                ↓                           │
            [ Stripe API ]   [ Google Apps Script ]            │
            (card payment)   ↓                                 │
                             [ Members Google Sheet ]          │
                                                               │
                             ↑                                 │
                  npm run notify (from your laptop)            │
                  triggers event email blast → opted-in members
```

The site is a **static React app** — there is no traditional backend server. All the dynamic stuff happens via:
- Vercel serverless functions (just the Stripe one)
- Google Apps Script (membership signups + event emails)

---

## First-time setup

You'll need to do this once on a new computer. ~10 minutes.

### 1. Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org).
2. Download the **LTS** version (the green button on the left).
3. Run the installer. Click "Next" through everything; defaults are fine.
4. Restart your computer so the install takes effect everywhere.

To verify it worked: open a terminal (on Windows, search "PowerShell" or "Command Prompt"; on Mac, "Terminal") and type:

```
node --version
```

You should see something like `v20.11.0`. If you see an error, the install didn't complete — try restarting again.

### 2. Install Git (if you don't have it)

- **Windows**: [https://git-scm.com/download/win](https://git-scm.com/download/win) — defaults are fine through the installer.
- **Mac**: open Terminal and type `git --version` — Mac will offer to install it.

### 3. Clone the repository

In a terminal, navigate to where you want the project to live (e.g. `Documents`) and run:

```
git clone https://github.com/SpiderSlayer80/ALSA-Website.git
cd ALSA-Website
```

### 4. Install the project's dependencies

```
npm install
```

This downloads ~300 MB of libraries into a `node_modules` folder. Takes 1–2 minutes. You won't need to do this again unless `package.json` changes.

### 5. Set up local environment secrets

The site uses a Stripe **secret key** for the payment serverless function. Locally, this lives in a file called `.env.local` at the root of the repo. **This file is gitignored** — never commit it.

Create `alsa-react/.env.local` with:

```
STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_KEY
```

Get the key from [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/apikeys). For local development use the **test mode** key (starts with `sk_test_`).

### 6. Start the dev server

```
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Any change you save to a file will hot-reload in the browser instantly. Use `Ctrl+C` in the terminal to stop the server.

---

## Editing site content

**95% of updates happen in one file: `src/data/site.js`.** Open it in any text editor (VS Code, Notepad, Sublime — anything works).

The file is split into clearly-labelled sections with comments at the top of each. Find the section you want to update, make the change, save the file, then [push to GitHub](#deploying-changes).

### Editing events

Find the `EVENTS` array in `site.js`. Each event is an object with fields like:

```javascript
{
  id: 'meet-greet-2026',                      // unique, never reuse
  dateISO: '2026-03-19',                      // YYYY-MM-DD format — the site uses this to sort upcoming/past
  date: '19 MAR',                             // shown on the card
  time: '6:00 PM',
  title: 'Meet and Greet',
  location: 'Albert Park, Mt Eden',
  tag: 'Social',                              // small label on the card (Social / Flagship / Collab)
  description: 'A casual evening to meet…',
  color: 'blue',                              // 'blue' or 'gold' theme accent
  poster: 'Meet & Greet Event poster 2026.jpg', // filename in src/event posters/
  eventbriteUrl: '',                          // paste full Eventbrite URL when ticketed, leave '' if free
  notifyMembers: false,                       // set true and run `npm run notify` to email members
  // optional:
  tickets: [
    { name: 'ALSA Member', price: 10 },
    { name: 'Non-member', price: 15 },
  ],
  hidden: true,                               // hide event from the site entirely
}
```

**To add an event**: copy an existing event object, paste it as a new entry, change all the fields, give it a unique `id`.

**To hide an event**: add `hidden: true` to the object.

**To delete an event**: remove the object entirely (keep the surrounding `[ ]` brackets and commas correct).

The site automatically separates upcoming and past events using `dateISO`. Events in the past appear in the "Recent Events" grid; the soonest upcoming event is featured at the top.

> ⚠️ **Important about the `id` field**: once you've used `npm run notify` to email members about an event, **never change that event's `id`**. The notification system uses it to remember which events have already been emailed. If you change it, members might get the same email twice.

### Editing team

Find the `TEAM` array. Each member is one line:

```javascript
{ name: 'Binuk', role: 'Co-President', group: 'Leadership', photo: 'Binuk.jpg', accent: '#F5B800', crop: 'center 50%' },
```

- `group` controls which row they appear in: `'Leadership'`, `'Managers'`, `'Executives'`, or `'Junior Reps'`.
- `photo` is the filename of their photo in `src/exec photos/`.
- `accent` is the colour of the ring around their photo (gold `#F5B800` for leadership, blue `#2255cc` for execs).
- `crop` controls how their face is positioned inside the circle. Try `'center top'` first, adjust if their head is cropped weirdly. Format: `'X% Y%'`.

**To add a member**: drop their photo (square, JPG/PNG) into `src/exec photos/`, then add a new line in `TEAM`.

### Editing sponsors

Find the `SPONSORS` array. Drop the sponsor's logo (white background or transparent works best) into `src/sponsors/`, then add:

```javascript
{ name: 'New Sponsor Co.', photo: 'NewSponsor.jpg' },
```

### Editing gallery

Find the `GALLERY_EVENTS` array. The first entry is the featured (large) tile.

```javascript
{
  title: 'Avurudu 2026',
  date: 'APR 24TH 2026',
  year: 2026,
  photo: 'src/Covers/Avurudu 2026.jpg',  // path from project root
  albumUrl: 'https://drive.google.com/drive/folders/...',
}
```

- Drop the cover photo into `src/Covers/`.
- The `albumUrl` is the public Google Drive folder (or Facebook album) that opens when someone clicks the tile. Make sure the folder is set to "Anyone with the link → Viewer".

### Editing FAQ, testimonials, hero stats, sponsors, etc.

Each is a clearly-labelled array in `site.js`. Edit, add, or remove entries the same way. The structure of each entry is shown in the existing examples.

### Editing site-wide info (email, Instagram, year, etc.)

Top of `site.js`, the `SITE` object:

```javascript
export const SITE = {
  name: 'ALSA',
  fullName: 'Auckland Lankan Students Association',
  email: 'uoa.alsa2020@gmail.com',
  instagram: 'https://instagram.com/uoa.alsa',
  // …
  year: '2026',  // change this each January
  stripeKey: 'pk_test_…',  // Stripe publishable key (safe to commit, not the secret)
  sheetsUrl: 'https://script.google.com/macros/s/…/exec',  // Apps Script web app URL
};
```

---

## Adding images

Vite (the build tool) automatically picks up images from these folders. **You don't need to "register" images anywhere** — just drop the file in the right folder and reference its filename in `site.js`.

| What | Where | Notes |
|---|---|---|
| Event posters | `src/event posters/` | Square Instagram-post style works best. JPG or PNG. Reference by filename in `EVENTS[*].poster`. |
| Team / committee photos | `src/exec photos/` | Square crop, head-and-shoulders. Reference by filename in `TEAM[*].photo`. |
| Sponsor logos | `src/sponsors/` | Transparent or white background, square or wide. Reference in `SPONSORS[*].photo`. |
| Gallery covers | `src/Covers/` | Reference by full path `src/Covers/filename.jpg` in `GALLERY_EVENTS[*].photo`. |
| Past exec photos | `src/past execs/` | Used by `HallOfFame` component. |

Filenames can have spaces, capital letters, etc. — Vite handles them. Images are auto-compressed at build time (`vite-plugin-image-optimizer`), so don't worry about file sizes too much.

---

## Email notifications

Members who tick the **"Email me about upcoming ALSA events"** checkbox on the join form get added to the email list (a `promoOptIn` column on the Members Google Sheet, set to `Yes`). When you publish a new event, you can email all of them in one command.

### One-time setup

If this is the first time anyone is using the email system, follow these steps. **You only need to do this once for the lifetime of the project.**

1. Open [script.google.com](https://script.google.com) and find the Apps Script project bound to the **Members Google Sheet** (the one the join form posts to). It's the same script that's been receiving signups.

2. Open `apps-script.gs` from this repo and copy **every function in it**. Paste them at the bottom of the existing `Code.gs` in your Apps Script project. Don't delete any of the existing functions — just append.

3. Update the existing `doPost(e)` function in `Code.gs` so it handles the `notify` action. At the very top of the `try` block, add:

   ```javascript
   var body = JSON.parse(e.postData.contents);
   if (body.action === 'notify') {
     return jsonOut(handleNotify(body.event));
   }
   // …existing signup code below stays exactly the same…
   ```

4. Open the **Members Google Sheet** (the one the join form populates). Add a new column at the end with the header `promoOptIn` (case-sensitive — type it exactly).

5. Back in the Apps Script editor, run the function `setupOnce` once. Click `Run` at the top of the editor. Google will pop up a permissions prompt — approve it. This grants the script permission to send email and create triggers.

6. Click `Deploy` → `Manage deployments` → pencil icon next to your existing deployment → `Version: New version` → `Deploy`. The webhook URL stays the same.

That's it. The system is now wired up.

### How to send an event email blast

Whenever you want to email opted-in members about an upcoming event:

1. Open `src/data/site.js` in your editor.
2. Find the event in the `EVENTS` array.
3. Make sure it has a unique `id` field (e.g. `'avurudu-2026'`). **Never reuse an id from a past event.**
4. Set `notifyMembers: true` on that event.
5. Save the file.
6. Open a terminal in the `alsa-react/` folder and run:

   ```
   npm run notify
   ```

7. The script prints out what happened — either `sent to N member(s)` (success), `partial: sent X now, Y queued for tomorrow morning` (over the daily quota), or `already sent — skipped` (the event was already emailed before).

8. Push the change to GitHub when you're done so the change is reflected in source control.

### What if there are more members than the daily limit?

Free Gmail caps emails at **100 per day** when sent from a script. If you have more than ~95 opted-in members, the script:

- sends the first 95 immediately,
- queues the rest in a `Notifications` tab on the Members Sheet,
- automatically schedules a Google trigger to send the remainder the **next morning at 9 AM**.

You don't need to do anything — it just happens. You can watch the progress on the `Notifications` sheet (Apps Script auto-creates this tab; columns are eventId, title, total, sent, status, etc.).

### Editing the email template

The email itself is rendered by the function `renderEventEmailHtml` in `apps-script.gs`. To change the wording, colours, or layout, edit that function in your Apps Script project (and update the file in this repo to keep it in sync).

### Removing someone from the email list

Open the Members Google Sheet and change their `promoOptIn` cell from `Yes` to `No`. They'll be skipped on the next blast.

### Why isn't [member] receiving emails?

Check, in order:
1. Their `promoOptIn` cell on the Members Sheet — is it `Yes`?
2. Their email column — is the address correct and includes `@`?
3. The `Notifications` tab — what does the `status` column say for that event id?
4. Their spam folder — script-sent emails sometimes land there. Tell them to mark "Not spam".

---

## Stripe payments

The Full Membership ($10) is processed by Stripe. The flow:

1. User fills out the join form, gets to the payment step.
2. Browser calls `/api/create-payment-intent` (a Vercel serverless function).
3. That function calls Stripe with the secret key and creates a "payment intent".
4. Stripe returns a `clientSecret` to the browser.
5. The browser uses Stripe.js to confirm the card payment.
6. Money lands in your Stripe account (instantly visible on the dashboard).

### Two keys, two places

| Key | Lives in | Safe to commit? |
|---|---|---|
| Publishable key (`pk_test_…` or `pk_live_…`) | `SITE.stripeKey` in `src/data/site.js` | ✅ Yes — public by design |
| Secret key (`sk_test_…` or `sk_live_…`) | Vercel environment variable `STRIPE_SECRET_KEY`; locally in `.env.local` | ❌ Never |

### Switching from test mode to live mode

Stripe gives you separate test and live keys. **Test mode keys** start with `pk_test_` / `sk_test_` — useful while developing because card `4242 4242 4242 4242` is treated as valid but not actually charged.

When you're ready for real payments:

1. In Stripe Dashboard, switch from **Test mode** to **Live mode** (top-right toggle).
2. Copy your **live publishable key** (`pk_live_…`) into `SITE.stripeKey` in `src/data/site.js`.
3. Copy your **live secret key** (`sk_live_…`) into Vercel: Project Settings → Environment Variables → edit `STRIPE_SECRET_KEY`. Redeploy.
4. Update your `.env.local` to use the live key only if you're testing real payments locally (otherwise keep test key for local dev).

### Changing the price

Two places:

1. `api/create-payment-intent.js` line 17: `amount: 1000` is in **cents** (NZD $10.00). Change to e.g. `1500` for $15.
2. The displayed price in `src/data/site.js` → `MEMBERSHIP_TIERS` array.

---

## Deploying changes

The site auto-deploys from GitHub. Push your changes to `main` and Vercel will rebuild and deploy in ~60 seconds. **There is no manual deploy step.**

### Pushing changes (the standard flow)

From a terminal in `alsa-react/`:

```bash
# See what you've changed
git status

# Stage your changes (replace with the actual files you edited)
git add src/data/site.js

# Commit with a short message describing what you did
git commit -m "added avurudu 2026 event"

# Push to GitHub
git push
```

GitHub triggers Vercel, Vercel rebuilds, the live site updates. You can watch the build progress on [vercel.com](https://vercel.com) → your project → Deployments.

### If the build fails

- Open Vercel → Deployments → click the failed build → check the logs.
- Common cause: a syntax error in `site.js` (missing comma, unmatched quote). Open the file in VS Code — it'll highlight the broken line in red.
- Fix it locally, commit, push again. The previous (working) deploy stays live until the new one succeeds.

### Rolling back

On Vercel → Deployments → find a previous successful deploy → `…` menu → Promote to Production. Done. (Use this if you push something broken and need to revert in seconds while you debug.)

---

## Project structure

```
alsa-react/
├── api/
│   └── create-payment-intent.js   ← Vercel serverless function for Stripe
├── scripts/
│   └── notify.js                  ← CLI for sending event emails
├── src/
│   ├── App.jsx                    ← Top-level layout: stitches all sections together
│   ├── main.jsx                   ← React entry point
│   ├── components/                ← All UI components (one per section)
│   ├── context/                   ← React contexts (e.g. ToastContext)
│   ├── data/
│   │   └── site.js                ← ⭐ ALL editable content lives here
│   ├── hooks/                     ← Custom React hooks
│   ├── styles/
│   │   └── global.css             ← All site styles in one file
│   ├── event posters/             ← Drop event poster images here
│   ├── exec photos/               ← Committee photos
│   ├── Exec Intros/               ← Committee intro videos
│   ├── Covers/                    ← Gallery cover images
│   ├── sponsors/                  ← Sponsor logos
│   ├── past execs/                ← Hall of Fame photos
│   ├── Photos/                    ← Misc decorative photos
│   ├── Logos/                     ← ALSA logos
│   └── svg icons/                 ← SVG icon assets
├── apps-script.gs                 ← Google Apps Script source (paste into script.google.com)
├── index.html                     ← HTML shell, includes Stripe.js script tag
├── package.json                   ← Project dependencies and npm scripts
├── vercel.json                    ← Vercel deployment config
├── vite.config.js                 ← Vite build config + dev API mock
└── README.md                      ← This file
```

---

## Component reference

Each component lives in `src/components/`. Most are stitched together by `App.jsx` to form the page sections.

| Component | What it does |
|---|---|
| `Hero.jsx` | The big landing section at the top of the page — animated multilingual greeting, hero stats, CTA buttons. |
| `About.jsx` | "About ALSA" section with the 4 pillar cards (Cultural, Community, Academic, Sport & Social). |
| `Events.jsx` | Featured upcoming event card + "Recent Events" grid. Includes the redesigned "no upcoming" placeholder. |
| `Gallery.jsx` | Photo album grid grouped by year. The first entry in `GALLERY_EVENTS` is shown larger as the featured tile. |
| `Team.jsx` | Committee photos grouped by Leadership / Managers / Executives / Junior Reps. Uses `TiltCard` for the hover effect. |
| `HallOfFame.jsx` | Past committees, used at the bottom of the Team section. |
| `Sponsors.jsx` | Sponsor logos as a marquee or grid. |
| `Testimonials.jsx` | Member quote slider. |
| `FAQ.jsx` | Accordion of frequently-asked questions. |
| `Contact.jsx` | Contact form + email/Instagram links. |
| `Join.jsx` | The 3-step membership form: details → choose tier → payment (Stripe). Posts to Apps Script on submit. |
| `Footer.jsx` | Site footer: links, socials, copyright. |
| `Nav.jsx` | Top navigation bar. |
| `MobileMenu.jsx` | Hamburger menu shown on mobile devices. |
| `ScrollProgress.jsx` | The thin gold progress bar at the top of the viewport showing how far down the page you've scrolled. |
| `ScrollToTop.jsx` | The floating "↑" button bottom-right that appears once you scroll. |
| `CustomCursor.jsx` | The custom dot cursor effect (desktop only). |
| `Loader.jsx` | The full-page loading screen shown briefly on first load. |
| `Modal.jsx` | Reusable modal/dialog (used for join success message). |
| `Lightbox.jsx` | Reusable image lightbox (used by Gallery). |
| `TiltCard.jsx` | Wrapper that gives elements a 3D tilt-on-hover effect. |
| `AnimatedNumber.jsx` | Number that counts up from 0 when scrolled into view (used for hero stats). |

---

## NPM scripts

Run these from `alsa-react/` in a terminal.

| Script | What it does |
|---|---|
| `npm install` | Downloads all dependencies into `node_modules/`. Run once after cloning, and again if `package.json` changes. |
| `npm run dev` | Starts the local dev server at [localhost:5173](http://localhost:5173). Hot-reloads on save. Also serves the `/api/*` serverless functions locally so Stripe payments work in dev. |
| `npm run build` | Builds the production bundle into `dist/`. Vercel runs this automatically on every push — you rarely need to run it yourself. |
| `npm run preview` | Serves the production build locally (after `npm run build`). Useful for sanity-checking what Vercel will deploy. |
| `npm run notify` | Reads `EVENTS` in `site.js`, finds entries with `notifyMembers: true`, and POSTs each to the Apps Script to email opted-in members. Idempotent — safe to re-run. |

---

## Apps Script reference

`apps-script.gs` is the Google Apps Script source code. It's **not** part of the Vite build — it's a standalone Google service that lives at [script.google.com](https://script.google.com). The file in this repo is the "source of truth" for what's been pasted into Google.

### Key functions in `apps-script.gs`

| Function | What it does |
|---|---|
| `handleNotify(event)` | Entry point for email blasts. Called from your `doPost` when `body.action === 'notify'`. Filters opted-in members, sends a batch up to the Gmail quota, queues the rest. Dedupes by `event.id`. |
| `resumeNotifications()` | Auto-runs from a scheduled trigger the morning after a partial blast. Drains any remaining queued emails. |
| `getOptedInMembers()` | Reads the Members sheet, finds rows where `promoOptIn` is `Yes`/`true`, returns a deduplicated list of `{email, firstName}`. |
| `sendEventEmail(recipient, event)` | Sends one branded HTML+plaintext email via `MailApp.sendEmail`. |
| `renderEventEmailHtml(recipient, event)` | Builds the HTML email body — edit this to change colours, layout, copy. |
| `setupOnce()` | One-shot helper to grant Mail/Trigger permissions. Run from the Apps Script editor when first installing. |
| `getOrCreateNotificationsSheet()` | Auto-creates the `Notifications` tab on first run, used as a dedupe + queue log. |

### Configuration constants

At the top of `apps-script.gs`:

```javascript
var MEMBERS_SHEET_NAME    = 'Form responses 1';   // ← change if your members tab is named differently
var FROM_NAME             = 'ALSA Auckland';
var REPLY_TO              = 'uoa.alsa2020@gmail.com';
var SITE_URL              = 'https://uoaalsa.com';   // used in email "View on website" link
var QUOTA_HEADROOM        = 5;                    // safety buffer below Gmail's 100/day cap
var NEXT_DAY_HOUR_NZ      = 9;                    // when the trigger resumes the next day
```

After editing, you must **redeploy** the Apps Script for changes to take effect: `Deploy` → `Manage deployments` → pencil → `New version` → `Deploy`.

---

## Troubleshooting

### `npm run dev` fails with "command not found"

Node.js isn't installed or isn't on your PATH. Reinstall from [nodejs.org](https://nodejs.org), restart your computer, try again.

### The dev server starts but Stripe payments fail

Probably missing the `.env.local` file or the secret key inside it. See [first-time setup → step 5](#first-time-setup).

### `npm run notify` says `SITE.sheetsUrl is empty`

The `sheetsUrl` field in `src/data/site.js` is missing or blank. It should be your Apps Script web app URL, ending in `/exec`. You can find it in Apps Script → `Deploy` → `Manage deployments`.

### `npm run notify` fails with HTTP errors

- **HTTP 401 / 403**: Apps Script deployment access is set to "Only myself". Change to "Anyone" in the deployment settings.
- **HTTP 500**: There's an error inside the Apps Script. Open the script editor → `Executions` to see the stack trace.
- **Network error**: Your internet, or Google's servers being temporarily down.

### Members aren't receiving emails

Check the [email notifications troubleshooting](#email-notifications) section above.

### A page change isn't showing up on the live site

1. Did you `git push`?
2. Did the Vercel build succeed? Check vercel.com → Deployments.
3. Try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R) — your browser may have cached the old version.

### I broke something — how do I undo?

If you've pushed a broken change:
- **On Vercel**: go to Deployments, find the last working build, click `…` → "Promote to Production". Live site is fixed in ~10 seconds.
- **In the code**: `git revert HEAD` will create a new commit that undoes the most recent commit. Then `git push`.

### Where do I get help?

- **Site bugs / build issues**: open an issue at the GitHub repo.
- **Stripe questions**: [stripe.com/docs](https://stripe.com/docs).
- **Apps Script questions**: [developers.google.com/apps-script](https://developers.google.com/apps-script).
- **Anything else**: ask whoever set up the site originally, or post in the committee group chat.

---

## Credits

Site built and maintained by the ALSA committee. Tech stack: React + Vite, Vercel, Stripe, Google Apps Script, Framer Motion.
