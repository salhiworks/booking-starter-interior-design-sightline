import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Consultations, fees, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 * The engine does not allow default images inside list fields, so every
 * gallery photo is its own image field.
 */
const MARK_HELP = 'Wrap a few words in *asterisks* to set them in italics, in your brand colour.';
const SAMPLE_HELP = 'A “Sample” label stays on it until you replace it with your own photo — use only photos of your own work, or ones you have permission to use.';

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const Q = (name: string, alt: string): Img => ({ src: `/photos/${name}-640.webp`, alt, width: 640, height: 640 });
const L = (name: string, alt: string): Img => ({ src: `/photos/${name}-1000.webp`, alt, width: 1000, height: 667 });

/** One gallery frame: a photo of a set shape and its caption. */
function frame(n: number, shape: string, ratio: number, image: Img, caption: string) {
  return [
    {
      type: 'image',
      id: `gallery.photo${n}`,
      label: `Photo ${n} (${shape})`,
      help: `${shape[0].toUpperCase()}${shape.slice(1)}. Remove it and the gallery closes up around the others. ${SAMPLE_HELP}`,
      default: image,
      aspectRatio: ratio,
    },
    {
      type: 'text',
      id: `gallery.caption${n}`,
      label: `Photo ${n} — caption`,
      help: 'Describe what the picture shows (light, materials, how the space is used). For your own projects you can add the room and the year — never a client’s name without their permission.',
      default: caption,
      maxLength: 90,
    },
  ] as const;
}

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the brand colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer. One or two words read best.',
          default: 'Lintel',
          maxLength: 22,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name mark',
          help: 'What you are, in a few words. Shown small beside the name in the header.',
          default: 'Interiors',
          maxLength: 32,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header is a warm white. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Brand colour',
          help: 'Used for the main buttons, highlighted words, selected choices and the booking band. Buttons carry white text, so pick a deep colour: a bottle green, ink blue, oxblood, deep umber. Light colours are refused because white text would not read on them.',
          default: '#2e4a3b',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'serif',
          options: [
            { value: 'serif', label: 'Serif', description: 'Fine, editorial headings with italic highlights — the original design.' },
            { value: 'sans', label: 'Sans serif', description: 'The same layout with plainer, more modern headings.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Lintel Interiors — interior design consultations in Providence, RI',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An independent interior design studio in Providence: one-to-one consultations for single rooms, small spaces and older homes — layout, styling, colour and materials. Book a consultation online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen: the headline, the buttons, “Not sure where to begin?” and one photograph.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Interior design & styling · Providence, RI',
          maxLength: 64,
        },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: MARK_HELP,
          default: 'Rooms that fit the way *you actually live.*',
          maxLength: 64,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'One-to-one design consultations for a single room, a small apartment or an older house that never quite came together. We look at how you use the space, what you already own and the light you have — and you leave with clear, practical advice.',
          maxLength: 300,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', help: 'Opens the booking so the visitor can choose a consultation.', default: 'Book a consultation', maxLength: 28, required: true },
        {
          type: 'text',
          id: 'hero.secondary',
          label: 'Second button',
          help: 'Leads to your consultations and fees. Leave empty to hide it.',
          default: 'Consultations & fees',
          maxLength: 32,
        },
        {
          type: 'text',
          id: 'hero.startTitle',
          label: '“Not sure where to begin?” — title',
          help: 'Above your featured consultation and introductory call (their names, lengths and fees come from Services). Leave empty to hide the box.',
          default: 'Not sure where to begin?',
          maxLength: 48,
        },
        {
          type: 'text',
          id: 'hero.startNote',
          label: '“Not sure where to begin?” — small print',
          help: 'Keep it true: a consultation is advice, and larger projects are quoted separately.',
          default: 'A consultation is advice for your room — larger design projects are quoted separately.',
          maxLength: 110,
        },
        {
          type: 'text',
          id: 'start.consultService',
          label: 'Featured consultation (only if renamed)',
          help: 'Leave empty if its name in Services says “initial”, “first” or “introductory” and “consultation”. If you rename it, type its exact new name here so the first screen still offers it. If none is found, the box offers “See all consultations” instead.',
          default: '',
          maxLength: 120,
        },
        {
          type: 'text',
          id: 'start.discoveryService',
          label: 'Featured introductory call (only if renamed)',
          help: 'Leave empty if its name in Services says “discovery” or “intro call”. If you rename it, type its exact new name here.',
          default: '',
          maxLength: 120,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (wide)',
          help: `Wide (3:2) — a calm room with good light reads best. Phones show it upright, so keep the main subject near the middle. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-sideboard-1200.webp',
            alt: 'A sunlit living room: a walnut sideboard with a ribbed green ceramic lamp and a white globe lamp, tall black-framed windows, a window seat and a red rug on dark wooden floorboards.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'text',
          id: 'hero.caption',
          label: 'Photo caption',
          help: 'A short line under the photo. Leave empty to hide it.',
          default: 'Walnut, plaster and afternoon light',
          maxLength: 72,
        },
      ],
    },
    {
      id: 'approach',
      label: 'Approach',
      description: 'How you think about rooms: a short statement, three principles and one photo.',
      fields: [
        { type: 'text', id: 'approach.title', label: 'Title', help: MARK_HELP, default: 'Start with the life, *then the look*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'approach.text',
          label: 'Statement',
          default:
            'A room works when it suits the people in it: where the morning light falls, where the bag gets dropped, which chair everyone actually sits in. I start there — with how you live and what you already have — and only then talk about colour, furniture and finish.',
          maxLength: 520,
          rows: 4,
        },
        {
          type: 'list',
          id: 'approach.principles',
          label: 'Principles',
          itemLabel: 'Principle',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Principle', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 240, rows: 2 },
          ],
          default: [
            { title: 'Keep what’s good', text: 'Most rooms already have a few pieces worth building around. Rearranging, editing and re-covering often do more than replacing.' },
            { title: 'Light before objects', text: 'Daylight, lamps and the colour of the walls change everything placed in a room. We decide those first.' },
            { title: 'Proportion, then texture', text: 'The right scale and enough space to move around come first; wood, linen, wool and plaster make it feel lived-in.' },
          ],
        },
        {
          type: 'image',
          id: 'approach.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5). Remove it to show text only. ${SAMPLE_HELP}`,
          default: P('approach-sofa', 'A low sofa with patterned cushions under a gallery wall of black-framed prints, a trailing plant and a lamp on a lacquered red side table.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'approach.caption', label: 'Photo caption', default: 'A wall of small frames above a low sofa', maxLength: 72 },
      ],
    },
    {
      id: 'gallery',
      label: 'Inspiration gallery',
      description:
        'Seven photographs: two wide, two upright and three square details. Until you replace them they are labelled “Sample imagery — illustrative design inspiration”, and the page says they show another home. Replace them with your own work, or with photos you have permission to use.',
      fields: [
        { type: 'text', id: 'gallery.title', label: 'Title', help: MARK_HELP, default: 'Rooms, corners & *materials*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'gallery.intro',
          label: 'Introduction',
          default:
            'The kind of rooms I love working with: warm wood, worn textiles, plain walls, strong colour used once, and corners made for one person and a cup of tea.',
          maxLength: 320,
          rows: 3,
        },
        ...frame(1, 'wide', 3 / 2, L('room-living', 'A sunlit room with an exposed brick wall and open shelving, a tan armchair, a red daybed with cushions and patterned rugs on wooden floorboards.'), 'Brick, walnut and one strong red, held together by plain shelving'),
        ...frame(2, 'upright', 4 / 5, P('room-dining', 'A dining corner against a brick wall: a walnut table with upholstered chairs under a white pendant lamp, shelves of kitchenware beyond.'), 'A dining corner under a low pendant'),
        ...frame(3, 'upright', 4 / 5, P('corner-armchair', 'A tan upholstered armchair and a bent-wood stool beside a brick wall, a red rug at their feet.'), 'An armchair corner against old brick'),
        ...frame(4, 'wide', 3 / 2, L('corner-window-seat', 'A window seat upholstered in patterned fabric beneath a tall window with trees outside, a wooden screen and a dining chair beside it.'), 'A window seat where the light is best'),
        ...frame(5, 'square', 1, Q('detail-desk', 'A small desk alcove in a brick wall: a wooden chair with a striped cushion, shelves, a lamp and a potted tree.'), 'A writing corner built into shelving'),
        ...frame(6, 'square', 1, Q('detail-upholstery', 'Close-up of a scroll-armed seat covered in blue and cream patterned fabric, beside a window.'), 'Patterned upholstery, worn soft'),
        ...frame(7, 'square', 1, Q('detail-throw', 'Low sun across a red knitted throw and an embroidered pale blue cushion with a fringe.'), 'Texture in low sun'),
      ],
    },
    {
      id: 'begin',
      label: 'Where to begin',
      description:
        'Helps visitors choose the right appointment. Each situation can point to one of your services by its exact name in Services: its button then opens the booking with it chosen, with its live length and fee. If the name doesn’t match a bookable service (renamed, hidden or deleted), the button says “See all consultations” instead.',
      fields: [
        { type: 'text', id: 'begin.title', label: 'Title', help: MARK_HELP, default: 'Not sure *where to begin?*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'begin.intro',
          label: 'Introduction',
          default: 'Pick the sentence that sounds most like you. If none of them do, a discovery call is the easiest place to start.',
          maxLength: 280,
          rows: 2,
        },
        {
          type: 'list',
          id: 'begin.items',
          label: 'Situations',
          itemLabel: 'Situation',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'situation', label: 'In the visitor’s words', default: '', maxLength: 64, required: true },
            { type: 'longText', id: 'text', label: 'Your answer', default: '', maxLength: 240, rows: 2 },
            {
              type: 'text',
              id: 'service',
              label: 'Service to book (exact name in Services)',
              help: 'Leave empty to link to all consultations.',
              default: '',
              maxLength: 120,
            },
          ],
          default: [
            {
              situation: '“I’d like to talk it through first.”',
              text: 'A short, free call to hear what you have in mind and suggest the right next step. No design advice yet — just a good start.',
              service: 'Discovery Call',
            },
            {
              situation: '“One room just isn’t working.”',
              text: 'Start with an initial consultation: we look at the whole room together and decide what to change first.',
              service: 'Initial Design Consultation',
            },
            {
              situation: '“It’s nearly there, but it doesn’t feel finished.”',
              text: 'A styling session: arrangement, editing, lamps, art and textiles, mostly with what you already own.',
              service: 'Room Styling Consultation',
            },
            {
              situation: '“I can’t decide on paint or fabric.”',
              text: 'Bring your samples and photos of the room; we choose against the studio’s sample library.',
              service: 'Color & Materials Consultation',
            },
            {
              situation: '“The furniture won’t fit — or I’m about to buy something big.”',
              text: 'A layout review by video call, with your floor plan and measurements on screen.',
              service: 'Furniture & Layout Review',
            },
            {
              situation: '“I’m planning a bigger change.”',
              text: 'Begin with an initial consultation or a project inquiry by email. A full design project is scoped and quoted separately.',
              service: 'Initial Design Consultation',
            },
          ],
        },
      ],
    },
    {
      id: 'consult',
      label: 'Consultations & fees',
      description:
        'Names, lengths and fees come from Services in this dashboard. The page groups them by the words in their names: discovery, initial, first → Getting started; follow-up → Continuing the conversation; styling, colour, materials, furniture, layout, lighting, consultation → Focused design advice. End a description with “Format:”, “Best for:” and “You receive:” (items separated by “·”) to show where it happens, who it suits and what the client leaves with.',
      fields: [
        { type: 'text', id: 'consult.title', label: 'Title', help: MARK_HELP, default: 'Consultations & *fees*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'consult.intro',
          label: 'Introduction',
          default:
            'Every appointment is one to one, with me, for a fixed length and a fixed fee. Some take place at the studio, where the samples are; others by video call, so you can show me the room.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'consult.terms',
          label: 'How booking works',
          help: 'Three short facts shown above the list.',
          itemLabel: 'Fact',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 52, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 220, rows: 2 },
          ],
          default: [
            {
              title: 'A consultation is advice, not a design package',
              text: 'You book my time and attention for one conversation. Drawings, plans, sourcing and full room designs are part of separate design projects.',
            },
            {
              title: 'The time shown is the session',
              text: 'Each appointment’s length is the conversation itself. Video-call links are emailed by me after I confirm your time.',
            },
            {
              title: 'Nothing is paid online',
              text: 'Fees are paid after the consultation, by card or bank transfer. Booking sends a request, which I confirm personally.',
            },
          ],
        },
        {
          type: 'longText',
          id: 'consult.noteStart',
          label: 'Note beside “Getting started”',
          default: 'A free call to see if we’re a good fit, or a first consultation about one room.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'consult.noteFocused',
          label: 'Note beside “Focused design advice”',
          default: 'When you know what the question is: styling, colour and materials, or the layout.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'consult.noteFollow',
          label: 'Note beside “Continuing the conversation”',
          default: 'For clients I’ve already met, when the next decision comes round.',
          maxLength: 200,
          rows: 2,
        },
        { type: 'text', id: 'scope.title', label: 'What a consultation covers — title', help: MARK_HELP, default: 'What a consultation *covers*', maxLength: 56, required: true },
        {
          type: 'list',
          id: 'scope.included',
          label: 'Covered in a consultation',
          itemLabel: 'Item',
          maxItems: 7,
          fields: [{ type: 'text', id: 'text', label: 'Item', default: '', maxLength: 90, required: true }],
          default: [
            { text: 'Understanding the room, how you use it and what isn’t working' },
            { text: 'Your goals, constraints and what you’d like to keep' },
            { text: 'Looking through your photos, measurements and references' },
            { text: 'Layout possibilities, colour and materials' },
            { text: 'Clear recommendations and practical next steps' },
          ],
        },
        {
          type: 'list',
          id: 'scope.excluded',
          label: 'Not part of a consultation',
          help: 'Keep it honest: what only a separately agreed design project includes.',
          itemLabel: 'Item',
          maxItems: 7,
          fields: [{ type: 'text', id: 'text', label: 'Item', default: '', maxLength: 90, required: true }],
          default: [
            { text: 'Measured drawings, CAD plans or construction documents' },
            { text: '3D visualizations or a complete mood board' },
            { text: 'A full furniture specification or product sourcing' },
            { text: 'Ordering, deliveries, installation or contractor management' },
            { text: 'A complete room redesign — that’s a design project' },
          ],
        },
        {
          type: 'longText',
          id: 'consult.priceNote',
          label: 'About fees',
          help: 'Shown under the list. Keep it honest: nothing is paid online, and booking reserves one consultation.',
          default:
            'Fees are paid after your consultation, by card or bank transfer — nothing is charged when you book. A booking reserves one appointment with me; it doesn’t commission or start a design project.',
          maxLength: 480,
          rows: 4,
        },
      ],
    },
    {
      id: 'process',
      label: 'How it works',
      description: 'What happens from choosing a consultation to the next step, and how to prepare. The booking form takes no uploads: say how clients can share photos.',
      fields: [
        { type: 'text', id: 'process.title', label: 'Title', help: MARK_HELP, default: 'How a consultation *works*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'process.intro',
          label: 'Introduction',
          default: 'Simple and unhurried. You don’t need a plan, a budget spreadsheet or perfect measurements — just the room, and what you’d like it to do.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'process.steps',
          label: 'Steps',
          itemLabel: 'Step',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Step', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 260, rows: 2 },
          ],
          default: [
            { title: 'Choose a consultation', text: 'Pick the appointment that fits your question and a time that suits you. It’s a request until I confirm it.' },
            { title: 'Tell me about the room', text: 'A few words in the booking note: which room, what isn’t working, what you’d like to change. Nothing more is needed yet.' },
            { title: 'Gather a few things', text: 'Photos of the room, rough measurements and anything you’ve saved for inspiration. Bring them, or email them once I’ve confirmed.' },
            { title: 'We meet', text: 'At the studio or by video call, depending on the appointment. We look, talk, and decide together.' },
            { title: 'You leave with advice', text: 'Recommendations during the session — plus a short written recap only where the consultation says it includes one.' },
            { title: 'If it needs more', text: 'If the room needs a full design, I’ll describe what a project would involve and send a separate written proposal.' },
          ],
        },
        { type: 'text', id: 'process.prepareTitle', label: 'What to prepare — title', default: 'What to prepare', maxLength: 48 },
        {
          type: 'list',
          id: 'process.prepare',
          label: 'What to prepare',
          itemLabel: 'Item',
          maxItems: 6,
          fields: [{ type: 'text', id: 'text', label: 'Item', default: '', maxLength: 110, required: true }],
          default: [
            { text: 'Photos of the room from each corner, in daylight if you can' },
            { text: 'Rough measurements: walls, windows, doors and the big pieces — a tape measure is plenty' },
            { text: 'A few images you love (and one or two you don’t)' },
            { text: 'A note of what’s staying: furniture, art, rugs, things with a story' },
            { text: 'Paint chips or fabric samples you’re already considering' },
          ],
        },
        {
          type: 'longText',
          id: 'process.shareNote',
          label: 'How to share photos',
          help: 'The booking form takes no files. Say how you’d like to receive them.',
          default:
            'The booking form doesn’t take files. Once I confirm your appointment, reply to my email with your photos and measurements — or bring them on your phone or on paper. Exact measurements aren’t needed for a first consultation.',
          maxLength: 400,
          rows: 3,
        },
      ],
    },
    {
      id: 'projects',
      label: 'Design projects',
      description:
        'Larger work, set apart from consultations: what a project can include and how it is agreed. Projects are not booked online — they begin with a consultation or an email inquiry.',
      fields: [
        { type: 'text', id: 'projects.title', label: 'Title', help: MARK_HELP, default: 'When a room needs *more than a conversation*', maxLength: 64, required: true },
        {
          type: 'longText',
          id: 'projects.text',
          label: 'Text',
          default:
            'Some rooms need a full design: a measured plan, a scheme for colour and materials, a furniture and lighting list, and someone to see it through. I take on a small number of these projects at a time, each scoped and quoted for the room in question.',
          maxLength: 520,
          rows: 4,
        },
        { type: 'text', id: 'projects.includesTitle', label: 'What a project can include — title', default: 'A project can include', maxLength: 48 },
        {
          type: 'list',
          id: 'projects.includes',
          label: 'What a project can include',
          itemLabel: 'Item',
          maxItems: 6,
          fields: [{ type: 'text', id: 'text', label: 'Item', default: '', maxLength: 90, required: true }],
          default: [
            { text: 'A measured layout plan for the room' },
            { text: 'A colour, material and finish scheme' },
            { text: 'A furniture, lighting and textile list' },
            { text: 'Help with ordering and with your trades — if agreed' },
          ],
        },
        { type: 'text', id: 'projects.termsTitle', label: 'How a project is agreed — title', default: 'How a project is agreed', maxLength: 48 },
        {
          type: 'list',
          id: 'projects.terms',
          label: 'How a project is agreed',
          itemLabel: 'Point',
          maxItems: 5,
          fields: [{ type: 'text', id: 'text', label: 'Point', default: '', maxLength: 120, required: true }],
          default: [
            { text: 'Every project is quoted individually, after we’ve talked' },
            { text: 'Scope, deliverables, fee and timeline are agreed in writing before any work begins' },
            { text: 'Booking a consultation doesn’t reserve or start a project' },
            { text: 'A consultation fee is for that consultation only' },
          ],
        },
        { type: 'text', id: 'projects.consultButton', label: 'Button — begin with a consultation', help: 'Opens the booking with your featured consultation.', default: 'Begin with a consultation', maxLength: 36, required: true },
        { type: 'text', id: 'projects.inquiryButton', label: 'Button — email inquiry', help: 'Opens an email to your business address. Hidden while no email address is set.', default: 'Email a project inquiry', maxLength: 36, required: true },
        { type: 'text', id: 'projects.inquirySubject', label: 'Email subject', default: 'Design project inquiry', maxLength: 80 },
        {
          type: 'longText',
          id: 'projects.inquiryNote',
          label: 'Under the buttons',
          default: 'Inquiries come to my inbox, and I reply personally — usually within two working days. They aren’t booked or tracked online.',
          maxLength: 260,
          rows: 2,
        },
      ],
    },
    {
      id: 'studio',
      label: 'The studio',
      description: 'About you and the studio: a few paragraphs, one photo and a few facts. No team photos or credentials you don’t hold.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Title', help: MARK_HELP, default: 'One designer, *one room at a time*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'Lintel is a one-person interior design studio in a converted mill building in Providence. I work mostly with apartments, older houses and the people who rent them — single rooms, small spaces and homes that have grown over the years.\n\nEvery appointment is with me, one client at a time. There’s a big table, good north light and a wall of paint, wood and fabric samples to try against your photos.',
          maxLength: 900,
          rows: 6,
        },
        {
          type: 'image',
          id: 'studio.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5). Remove it to show text only. ${SAMPLE_HELP}`,
          default: P('studio-niche', 'A plaster wall niche with open timber shelves holding plants and small objects, above a walnut cabinet with a bowl of dried branches.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'studio.caption', label: 'Photo caption', default: 'Open shelving set into a plaster niche', maxLength: 72 },
        {
          type: 'list',
          id: 'studio.facts',
          label: 'Facts',
          itemLabel: 'Fact',
          maxItems: 5,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 48, required: true },
            { type: 'text', id: 'text', label: 'Detail', default: '', maxLength: 160 },
          ],
          default: [
            { title: 'At the studio', text: 'Initial, styling and colour consultations happen here, with the sample library on the table.' },
            { title: 'By video call', text: 'Layout reviews and follow-ups. I email you the link myself once I’ve confirmed your time.' },
            { title: 'Home visits', text: 'Part of design projects in and around Providence, arranged and quoted individually — not booked online.' },
            { title: 'Rooms I work on', text: 'Living rooms, bedrooms, dining rooms, home offices and small apartments. Not kitchens or bathrooms that need building work.' },
          ],
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Questions',
      description: 'Practical answers before a consultation. These are sample policies — make them yours.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: MARK_HELP, default: 'Good *questions*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 16,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'What happens during the initial consultation?',
              answer:
                'We talk about the room and how you use it, look through your photos, measurements and references, and go through layout, colour and materials together. You leave with clear recommendations and a short list of next steps. It’s a conversation — not a finished design.',
            },
            {
              question: 'Do I need a full design project?',
              answer:
                'Usually not. Most people need good advice and a plan they can carry out themselves. If your room really needs a full design, I’ll tell you, and we can talk about a project separately.',
            },
            {
              question: 'Can you help with just one room?',
              answer: 'Yes — that’s most of what I do. One room, one corner, even one decision.',
            },
            {
              question: 'Can you help with a space I already live in?',
              answer: 'Yes. Working with what you already own — rearranging, editing and adding a few things — is often where the biggest difference is.',
            },
            {
              question: 'What should I prepare? Do I need exact measurements?',
              answer:
                'Photos of the room, rough measurements, and a few images you love. Exact measurements aren’t needed for a first consultation; if a decision depends on them, I’ll tell you which ones to take.',
            },
            {
              question: 'Can I show you inspiration photos?',
              answer: 'Please do — on your phone, printed, or by email after I confirm your time. The ones you don’t like help too.',
            },
            {
              question: 'Are consultations online or in person?',
              answer:
                'Each consultation lists where it happens. Initial, styling and colour consultations are at the studio; layout reviews and follow-ups are by video call, and I email you the link myself after confirming. The discovery call is by phone — I call you.',
            },
            {
              question: 'Does a consultation include drawings or a mood board?',
              answer:
                'No. A consultation is advice during the session. The Room Styling Consultation also includes a one-page written recap I email you afterwards. Drawings, plans, mood boards and 3D views are only part of separately agreed design projects.',
            },
            {
              question: 'Will you source furniture for me?',
              answer:
                'In a consultation I’ll tell you what to look for — the size, shape, material and where to look. Sourcing, ordering and deliveries are only part of a separately agreed project.',
            },
            {
              question: 'How does a larger design project begin?',
              answer:
                'With an initial consultation, or an email describing the room. If a project makes sense, I send a written proposal with the scope, deliverables, fee and timeline. Nothing starts until we’ve both agreed it.',
            },
            {
              question: 'Is the free discovery call a free consultation?',
              answer: 'No — it’s a short call to understand what you need and suggest the right next step. Design advice on the room itself happens in a consultation.',
            },
            {
              question: 'Is the consultation fee paid online?',
              answer: 'No. Nothing is paid when you book. The fee is paid after your consultation, by card or bank transfer.',
            },
            {
              question: 'Can I reschedule?',
              answer:
                'Of course — please call or email at least 48 hours before your appointment and I’ll move it for you. The booking system doesn’t move appointments by itself: I change it for you.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: MARK_HELP, default: 'Book a *consultation*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose an appointment, then a time. No account needed — tell me a little about your room, and I’ll confirm your consultation personally.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: MARK_HELP, default: 'Visit the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'On the third floor of the old mill on Valley Street — take the freight lift or the stairs by the loading dock, and Lintel is the second door on the left. There’s free parking in the mill lot. The studio is open by appointment only: please book before you visit.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Interior design consultations for single rooms, small spaces and older homes — Providence, Rhode Island.',
          maxLength: 110,
        },
      ],
    },
  ],
});
