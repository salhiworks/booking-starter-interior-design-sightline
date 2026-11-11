# Interior Design & Styling Studio Booking Website — "Sightline" Starter

A finished, premium booking website for an independent interior designer, ready to make your own
with Claude Code and publish on Hostinger. It ships as **Lintel Interiors**, a fictional
one-designer studio in a converted mill building in Providence, Rhode Island, for consultations on
single rooms, small spaces and older homes:

- a one-page studio website — a first screen with a calm, sunlit room, a fine editorial headline,
  **Book a consultation**, and **"Not sure where to begin?"**: your featured consultation and free
  introductory call with their real length, fee and format from the booking system, each opening
  the booking with it chosen; **your approach** — a short statement and three principles; an
  **inspiration gallery** laid out as magazine spreads (a wide room beside an upright corner, then
  mirrored, then three material details), every photo labelled *Sample imagery — illustrative
  design inspiration* until you replace it; **where to begin** — situations in the visitor's words
  ("One room just isn't working") each pointing to the right appointment; **consultations & fees**
  grouped as *Getting started*, *Focused design advice* and *Continuing the conversation*, each with
  where it happens (at the studio, by video call, by phone), what it is, who it is best for, what
  the client receives, its length and fee — plus what a consultation covers and what only a
  separately agreed design project includes; **how a consultation works** in six steps with what to
  prepare and how to share photos; **design projects**, set apart: quoted individually, agreed in
  writing, begun with a consultation or an email inquiry; **the studio**; *Questions* (sample
  policies, labelled); directions — from 320 px phones up, with booking in a sheet over the page;
- online booking — **one consultation per booking**, a day and time, contact details and an
  optional note **About your space**, and an emailed 6-digit code; the designer confirms each
  request ("Request received — we'll review your consultation and confirm the time shortly");
- the owner dashboard at `/admin/` — requests to confirm, consultations and fees, studio hours and
  closures, email health, and the website's own text, photos, brand colour and heading style.

The look — *Sightline*: an interiors magazine laid out by an architect. Limewash pages, a cool
stone band, a deep charcoal-green for design projects, and one **brand colour** (bottle green by
default) that carries white text. The one ornament is the **sightline** — a dimension line as
drawn on a floor plan. Cormorant Garamond over Manrope.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0-beta.3** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your studio. Claude edits a short list of files
(name, city, words, colours) — the booking system, the dashboard and the layout stay as they are.

Consultations, fees, hours and contact details are **not** code: you set them in the dashboard
once the booking backend is connected. **Your own photographs** — the first screen, your approach,
the seven gallery frames and the studio — go in the dashboard → Website. Each sample photo stays
labelled "Sample" until you replace it; use only photos of your own work, or ones you have
permission to use. Your name, training and experience are yours to add: the starter invents none.

**A booking is one consultation.** The booking engine books single appointments on one calendar —
one designer's time. It never books, commissions or tracks a design project: proposals, drawings,
mood boards, sourcing, orders, contractors and project fees are your own arrangements, agreed
separately. Consultation fees are paid after the session — nothing is paid online. Video-call
links are emailed by you after you confirm (the engine creates none). Project portals, uploads,
deposits, contracts, several designers' calendars and online checkout are not part of the engine
(see *What the engine does not do* in `CLAUDE.md`).

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and tells you
exactly what is left for you to do (your dashboard login and the two email secrets). Full steps:
the Profit Studio guide *Build a Premium Booking Website with Claude Code*, Step 3, or
`node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt or in
Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web App** from it
(Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero`, `Approach`, `Inspiration`, `WhereToBegin`, `Consultations`, `Process`, `Projects`, `Studio`, `GoodToKnow`, `Visit`…) and its booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample consultations and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How consultations find their kind (by the words in their names), where each happens ("Format:"), the featured consultation and call, lengths and fees, and "Best for:" / "You receive:" |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md`, `ASSETS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5197
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef Es-salhi).
Photographs and other third-party assets keep their own terms, listed file by file in
[`ASSETS.md`](ASSETS.md).
