# Sightline — the design system

*An interiors magazine laid out by an architect.* The site for **Lintel Interiors**, a fictional
one-designer studio in a converted mill building in Providence, Rhode Island.

## The business, and who it is for

Lintel is one designer, one calendar, one client at a time. The studio's specialism is deliberately
narrow and believable: **single rooms, small spaces and older homes** — apartments in triple-deckers
and mill conversions, rentals that can't be painted, family rooms that grew without a plan — and
**working with what people already own**. It is not an architecture practice and not a construction
firm; it doesn't take on kitchens or bathrooms that need building work.

The visitor is usually one of three people:

- someone with **one room that isn't working**, who doesn't know whether that is a "designer job";
- someone **stuck on a decision** — paint, fabric, where the sofa goes, whether a big purchase will fit;
- someone **planning a bigger change** who wants to know how a project would begin and what it costs to start.

So the site answers, in order: *does this designer like the kind of rooms I like?* (the first screen
and the gallery), *how do they think?* (approach), *which appointment do I need?* (where to begin),
*what exactly do I get, how long, where, for how much?* (consultations & fees), *what happens and what
do I prepare?* (how it works), *what if I need more?* (design projects), *who is it?* (the studio),
and the practical questions.

## The idea: the sightline

Interior designers think in **sightlines** — what you see from the door, from the sofa, from the
bed — and they draw with **dimension lines**: a fine rule between two end ticks, the measured
distance between two things. That one drawn mark is the only ornament on the site:

- in every section label: `04 ├──┤ CONSULTATIONS & FEES`;
- under the first-screen photograph, carrying its caption like a dimension on a drawing;
- along the six steps of *How a consultation works*, which join into one long dimension line on wide
  screens;
- beside each point of *How a project is agreed*.

It is honest (designers really draw it), quiet, and it says *measured, considered* without a single
icon of a sofa or a paint swatch. Everything else is typography, space and photographs.

## Colour

Derived from the photographs — plaster walls, walnut, old brick — so the page frames the rooms
rather than competing with them. Deliberately *not* beige-on-beige and not black-and-gold.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f4f1eb` limewash | the page — a warm white with a little grey in it |
| `--oat` | `#e6e5de` stone | *Where to begin*, the booking summary — a cool counterweight to the warm photos |
| `--raised` | `#ffffff` | consultation scope box, inputs, the booking sheet |
| `--ink` | `#1c1d1b` | headings and text (16:1) |
| `--muted` | `#5b5c56` | small print (≥ 5.5:1 on every light surface) |
| `--forest` | `#1f2522` charcoal green | design projects, the booking sheet's header, the footer |
| `--accent` | `#2e4a3b` bottle green (owner-editable) | buttons, the italic highlight, selected choices, the booking band; always carries white text (≈ 10:1) |
| `--accent-glow` | pale sage, mixed from the accent | highlights and focus on charcoal green |

The brand colour appears once as a full band (the call to book) and otherwise only where the visitor
acts. The editor refuses any colour that can't carry white text at 4.5:1. The measured contrast audit
of the rendered page found no pair below **5.35:1**.

## Typography

- **Cormorant Garamond 500** for headings, figures (lengths and fees) and the italic highlight —
  fine, high-contrast, editorial; the voice of a design magazine. Set large and loose, never bold.
- **Manrope 400 / 500 / 700** for reading and every label — architectural, calm, with clear figures.
  Small labels are spaced capitals with tabular numbers, like the lettering on a drawing.
- The owner's `*asterisks*` set a phrase in Cormorant italic in the brand colour — one per heading.
- A **sans** heading option (Website → Brand) swaps every heading to Manrope for a plainer studio.

## Photography

One shoot, one photographer, one apartment (Charlotte May, Pexels): exposed brick, walnut
mid-century pieces, a red daybed, rugs, plants, low sun. It suits a designer who loves rooms with
history and warmth more than show-home minimalism, and its consistency means the gallery reads as
*one point of view*. All of it is **labelled sample imagery** and never presented as the studio's work
(see `PHOTOS.md`). One shared, gentle grade — slightly calmer saturation, lifted shadows — keeps the
warm light from overpowering the pale page. Photographs are square-cornered and never filtered,
rounded or overlaid with text.

## Layout and composition

- **The first screen** is a magazine opener: words on the left (eyebrow, a three-line headline, one
  paragraph, *Book a consultation* and a quiet text link to fees), and on the right one wide
  photograph that runs to the edge of the screen, with the dimension-line caption under it and the
  *Not sure where to begin?* box beneath. On phones the room leads, cropped 4:3 so the headline and
  the main button stay in the first screen; the introduction follows the button.
- **Approach** sets the designer's statement large in the serif, three numbered principles on fine
  rules, and one upright photograph dropped lower than the words.
- **Inspiration** is three *spreads*: a wide room beside an upright corner; an upright corner beside a
  wide room (the wide one dropped lower); three square material details with the middle one dropped.
  Captions are set like magazine credits (`FIG. 03  An armchair corner against old brick`). On phones
  the spreads become an art-directed column — wide rooms bleed to both edges, upright corners and
  details are inset and alternate sides — not a compressed grid. Removing any photo closes the spread
  up; figure numbers stay continuous.
- **Where to begin** sits on the stone band: situations in the visitor's own words (set in italic
  serif, as quotations) with a short answer and a bordered link that names the appointment with its
  live length, fee and format.
- **Consultations & fees** is a ruled list, kinds in a sticky left column, each entry with its format
  mark (□ studio, ▭ video call, ○ phone), what it is, *Best for*, *You receive*, the length and fee set
  large in the serif, and Book. Then a white box: what a consultation covers vs what only a separately
  agreed design project includes — the "not" column in muted ink with a hairline dash, never red
  crosses.
- **How it works**: six steps on one long dimension line; what to prepare as a checklist; how to share
  photos in a stone note (the booking form takes no files).
- **Design projects** on charcoal green: the heading, two honest ways in (book a consultation, email an
  inquiry), what a project can include, and how it is agreed — clearly a separate offering.
- **The studio**: one upright photograph (sticky on wide screens) beside the words and a ruled table of
  facts (where consultations happen, home visits, the rooms the studio works on).
- **Questions**, the booking band, **Visit** and the footer follow the collection's proven patterns.

Spacing is generous (`--section-pad` up to 8.5 rem), the page is wide (`--page-max` 84 rem) so
photographs can be large, and nothing is centred for its own sake.

## Interaction

- **Booking** opens in a sheet over the page (a modal `<dialog>`, full screen on phones): choose a
  consultation (grouped like the page, each with its format), a day and time, details with the note
  *About your space (optional)*, the emailed code, and an honest pending result. The summary shows
  where it happens, the fee "paid after the consultation, not online" and "one consultation — not a
  design project"; the confirmation repeats where it happens (and that video links are emailed by the
  designer), what to prepare and that nothing is paid online.
- **Motion** is minimal: the first screen's words settle in once and its photograph develops from a
  1.03 scale; links underline in the brand colour; nothing else moves. `prefers-reduced-motion`
  removes all of it.
- 44 px minimum tap targets, visible 2 px focus rings (pale sage on charcoal), skip link, native
  `<details>` for questions, `aria-hidden` on every decorative mark, screen-reader text for durations.

## What it avoids

Luxury clichés (black and gold, marble, chandeliers), beige-on-beige, generic agency grids, SaaS
cards, renders presented as rooms, before/after sliders, stats, awards, testimonials, team photos,
invented credentials, and any feature the booking engine doesn't actually provide.
