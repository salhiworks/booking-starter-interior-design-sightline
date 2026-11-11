# Interior Design & Styling Studio "Sightline" Starter — project rules

A one-page booking website for an independent interior designer, shipped as **Lintel Interiors**
(a fictional one-designer studio in a converted mill building in Providence, Rhode Island:
consultations for single rooms, small spaces and older homes — a free discovery call, an initial
design consultation, room styling, colour & materials, a furniture & layout review by video call and
a follow-up — all one to one, with the designer) for the owner to make their own. Its identity lives
in `src/site.config.ts`; `CUSTOMIZE.md` is the prompt that personalizes it. Built around
**@profitstudio/booking-engine** **2.0.0-beta.3** (pinned; lock in `booking-engine.lock.json`). The
engine owns booking; this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll review your consultation and confirm the time shortly.",
  confirmed → "Your consultation is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one consultation: a reserved block of the designer's time with one client, on one
calendar.** Its length is the conversation itself. A consultation is **advice given during the
session** — plus, only where a service's description says so (the Room Styling Consultation), a short
written recap the designer writes and emails personally. It never includes measured drawings, CAD
plans, construction documents, 3D visualizations, a full mood board, a furniture specification,
product sourcing, ordering, deliveries, installation or contractor management. A **design project**
is quoted individually after a consultation or an email inquiry; its scope, deliverables, fee and
timeline are agreed in writing outside the engine. A booking never reserves, commissions or starts a
project. The free **Discovery Call** is an introduction (is a project a fit, which appointment next) —
never free design advice. Fees are paid after the consultation — never online. Video-call links are
emailed by the designer after confirming; the engine creates none. A new booking feature needs a new
engine version — never custom database code or browser-side logic in this project:

- design-project records, proposals, contracts, e-signatures, milestones, retainers, deposits,
  invoices or any online payment;
- client project portals, file or photo uploads, floor-plan storage, mood-board or drawing
  generation, AI room redesign;
- product sourcing databases, furniture inventory, shopping carts, procurement, contractor
  coordination;
- several designers or calendars, built-in video conferencing, home-visit travel time, routing or
  address checks.

Home visits are part of design projects, arranged and quoted individually — not booked online.

The booking notes field is **About your space (optional)** with the helper "Tell us which room you'd
like help with, what isn't working, and what you'd like to change. You can bring photos and
inspiration to the consultation." Never ask for a home address, floor plans, budgets, financial or
other sensitive details in the form. Proposed engine work: `docs/ENGINE-PROPOSAL-interior-design.md`
in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/New_York`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample consultations, hours, policies; "clients"/"consultations") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kinds (Getting started · Focused design advice · Continuing the conversation, from the name, then the description), roles (discovery · consult · follow · advice), formats (studio · video · phone, from "Format:"), the featured consultation and call (`featuredService`), exact-name mapping (`serviceNamed`), length and fee terms, "Format:" / "Best for:" / "You receive:" parsing, duration labels | `src/lib/services.ts` |
| What the owner can edit (texts, every photo and caption, the featured-service names, approach, the seven gallery frames, where to begin (situations → service names), the three booking facts and kind notes, what a consultation covers / doesn't, how it works and what to prepare, design projects, the studio and its facts, questions, logo, brand colour, heading style) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variables (`--accent`, `data-headings`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero `#top` with "Not sure where to begin?", Approach `#approach`, Inspiration `#inspiration` (three spreads), WhereToBegin `#where-to-begin`, Consultations `#consultations`, Process `#how-it-works`, Projects `#design-projects`, Studio `#studio`, GoodToKnow `#good-to-know`, Visit, Footer; `SectionMark` the number · sightline · name label; `Frame` a photo with caption and Sample tag; `Emphasis` renders the owner's `*highlight*` in italics); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Consultations, fees,
  durations, hours, the address, phone and email are NOT content: they come from the engine. The engine
  does not allow default images inside list fields — that is why each gallery photo is its own image field.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A consultation row's
  Book passes that service's engine id; the first screen's box and "Begin with a consultation" pass
  `featuredService(...)`; "Where to begin" passes `serviceNamed(services, item.service)`.
- **Which services are featured:** the engine gives services no build-time-stable key (only a database
  id), so `featuredService()` takes (1) the service named in Website → Welcome → *Featured consultation*
  / *Featured introductory call* (exact name, case/space-insensitive), else (2) by name: an initial /
  first / introductory *consultation* (never a call) — or a *discovery* / *intro call*, else (3) none.
  "Where to begin" uses only the owner's exact names. With none (deleted, hidden, renamed without
  updating the field) the box offers "See which consultation suits you", a situation offers "See all
  consultations", "Begin with a consultation" opens the list — never an unrelated service, never a stored
  fee. Keep `concepts/interior-design-sightline/featured-identity.mjs` and `consultations.test.mjs` passing.
- **Lengths and fees:** always from the engine (`timeTerms`, `priceTerms`). Never hard-code a
  consultation, length, fee or id in copy (FAQ answers included). Never suggest anything is paid online,
  never show a payment success.
- **Consultation vs project:** wherever a consultation is offered or booked (the box, rows, the summary,
  the done step) keep it clear that it is advice for one appointment — not a design project, drawings or
  sourcing; that projects are quoted separately and agreed in writing; that the discovery call is not a
  free consultation. Never imply project tracking, uploads, automatic deliverables or a video link the
  engine sends.
- **Sample photos:** every photo carries a "Sample" label until the owner replaces that field
  (`ownerFields`); the gallery says "Sample imagery — illustrative design inspiration" and that the
  photographs show another home (and, in preview and the Live Demo, that the studio is fictional). Never
  present a stock photograph as the studio's work, never invent a client, a project, a budget, a
  before/after, a location history, a name, qualifications, years of experience, awards, press,
  reviews or testimonials.
- **Default photos:** add your own variants to `public/photos/`, keep the default `src` in `site.ts` equal
  to a key in `photoVariants.ts`, record the source in `PHOTOS.md`. If the first-screen default changes,
  update both `<link rel="preload">` in `index.html` (`imagesizes` must match `HERO_SIZES` / `SMALL` in
  `src/components/Hero.tsx`).
- **Policies:** Questions shows a "Sample policies" label until the owner edits `faq.items`.
- **Copy:** warm, plain, first person ("I'll look at…"); practical and specific; no "transform your dream
  home", no "luxury", no pressure. Only consultations the owner really offers.
- **Style:** plain CSS with the tokens; no UI kit. Keep 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, and every text/background pair at 4.5:1. The brand colour is
  owner-editable and always carries white text (`--on-accent`); on charcoal green use `--accent-glow`.
  Photographs are square-cornered; controls are crisp (2 px).
- **Composition:** editorial and calm (DESIGN.md → Layout). New sections open with `.section-head`
  (SectionMark + h2 + intro). The sightline (`.sightline`, a dimension line) stays the one ornament — no
  icons of sofas or lamps, no swatch clip-art, no gradients, no gold.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5197 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
