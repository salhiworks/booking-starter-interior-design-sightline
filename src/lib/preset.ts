import type { Preset } from '@profitstudio/booking-engine';

/**
 * Lintel Interiors' own preset (INTEGRATION.md §5): the sample consultations,
 * hours and policies preview mode shows, and the starter set the dashboard
 * offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE consultation: a reserved block of
 * the designer's time with ONE client, on the studio's one calendar. Its length
 * is the real length of that conversation. It is never a design project:
 *   - a consultation is advice given during the session (plus, only where its
 *     description says so, a short written recap the designer writes and emails
 *     personally). It never includes drawings, CAD plans, construction documents,
 *     3D visualizations, full mood boards, product sourcing, procurement,
 *     installation or contractor management;
 *   - a full design project is quoted individually, after a consultation or an
 *     email inquiry; its scope, deliverables, fee and timeline are agreed in
 *     writing, outside the engine. A booking never reserves or starts a project;
 *   - the Discovery Call is free and short: it is for understanding a possible
 *     project and the right next step — not free design advice on the room.
 * The buffer after each session is the designer's time to reset the sample table
 * (studio) or write up notes (calls).
 *
 * WHERE IT HAPPENS. Each description says it after "Format:" — at the studio,
 * by video call (the designer emails the link personally after confirming; the
 * engine creates no meeting link) or by phone (the designer calls the number
 * given). The engine has no location field: this text is the owner's own.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the fee for that
 * one consultation, paid after it — never online (src/lib/services.ts →
 * priceTerms). Zero reads as free. The studio confirms every request
 * (`autoConfirm: false`).
 *
 * A description ends with three short labelled parts the website shows as their
 * own lines (src/lib/services.ts → splitDescription):
 *   "Format: At the studio"
 *   "Best for: … · …"      — who the session suits
 *   "You receive: … · …"   — what the client actually leaves with
 */
export const sitePreset = {
  id: 'interior-design',
  label: 'Interior Design & Styling Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'consultation', bookings: 'consultations' },
  previewBusiness: {
    name: 'Sample Interior Design Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 401-555-0100',
      address: '100 Example Street, Providence, RI',
    },
  },
  policies: {
    slotIntervalMinutes: 30,
    minNoticeMinutes: 1440,
    maxAdvanceDays: 60,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Consultations Tuesday to Friday, a later Thursday for after work, Saturday mornings; closed Sunday and Monday.
  workingHours: [
    { weekday: 2, start: '10:00', end: '17:30' },
    { weekday: 3, start: '10:00', end: '17:30' },
    { weekday: 4, start: '11:00', end: '19:30' },
    { weekday: 5, start: '10:00', end: '16:00' },
    { weekday: 6, start: '10:00', end: '14:00' },
  ],
  services: [
    {
      name: 'Discovery Call',
      description:
        'A short call to hear about your home and what you’d like to change, so we can see whether working together makes sense and which appointment would help most. It isn’t a design consultation — the advice comes later. Format: By phone — I call the number you give. Best for: anyone unsure where to start · a possible larger project. You receive: a clear recommendation for the right next step',
      durationMinutes: 20,
      bufferAfterMinutes: 10,
      priceCents: 0,
      priceFrom: false,
    },
    {
      name: 'Initial Design Consultation',
      description:
        'A focused first conversation about one room: how you use it, what isn’t working and what you’d like to keep. We go through your photos, rough measurements and references together, talk about layout, colour and materials, and I give you clear recommendations and practical next steps. Format: At the studio. Best for: a first appointment about one room · the start of a possible larger project. You receive: professional advice during the session · a short list of next steps, agreed before you leave',
      durationMinutes: 75,
      bufferAfterMinutes: 30,
      priceCents: 18500,
      priceFrom: false,
    },
    {
      name: 'Room Styling Consultation',
      description:
        'For a room that’s nearly there but doesn’t feel finished: how the furniture sits, what to edit out, where art, lamps, rugs and textiles would do the most, and what to look for next. Format: At the studio. Best for: a living room, bedroom or dining room you mostly like · working with what you already own. You receive: styling recommendations during the session · a one-page written recap of the main points, emailed by me within five working days',
      durationMinutes: 90,
      bufferAfterMinutes: 30,
      priceCents: 26000,
      priceFrom: false,
    },
    {
      name: 'Color & Materials Consultation',
      description:
        'Paint colours, fabrics, wood tones and finishes, looked at together against your room’s light — with the studio’s sample library and any samples you bring. Format: At the studio. Best for: a paint decision you keep putting off · choosing fabric, flooring or a worktop finish. You receive: a short list of colours and finishes to test at home · advice on how to test them',
      durationMinutes: 75,
      bufferAfterMinutes: 30,
      priceCents: 19500,
      priceFrom: false,
    },
    {
      name: 'Furniture & Layout Review',
      description:
        'We look at your floor plan, photos and measurements together and work out where things should go: walkways, the scale of pieces you’re considering, and how one room can do two jobs. Format: By video call — I email you the link after confirming. Best for: small spaces and awkward rooms · deciding before you buy a large piece. You receive: layout recommendations during the call',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 16500,
      priceFrom: false,
    },
    {
      name: 'Design Follow-Up',
      description:
        'A shorter session after an earlier consultation: what you’ve changed, what you’re still weighing, and the next decision. Format: By video call — I email you the link after confirming. Best for: clients who have already had a consultation with me. You receive: advice on the next step during the call',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 11000,
      priceFrom: false,
    },
  ],
} satisfies Preset;
