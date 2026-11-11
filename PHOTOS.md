# Photographs

Every default photograph on this site is **sample imagery**: eleven frames from ten Pexels
photographs by **one photographer, Charlotte May, from one shoot of one apartment** — a sunlit,
brick-walled apartment with walnut mid-century furniture, a red daybed, open shelving, a window seat,
patterned rugs and plants (Pexels ids 5824513–5824625, published together). Choosing one shoot keeps
the light, the materials and the grade consistent, and avoids stitching unrelated properties into
something that looks like one "project".

**They are not the studio's work.** Lintel Interiors is fictional; the apartment was not designed,
styled or photographed by it, and nothing on the page says otherwise. The page:

- labels every photo **Sample** (the first screen says **Sample image**) until the owner replaces that
  field in the dashboard (`ownerFields`);
- heads the gallery with **Sample imagery — Illustrative design inspiration**, and says the licensed
  photographs show another home, not projects designed by the studio (in preview and the Live Demo it
  also says the studio is fictional);
- captions describe only what is visible — light, materials, how a corner is used — never a client, a
  location history, a budget, a before/after or a date.

No people appear in any frame.

## The frames

| Frame (`public/photos/`) | Ratio | Where it is used | Pexels photo | Crop |
|---|---|---|---|---|
| `hero-sideboard` (800–2000 w) | 3:2 | First screen (tablet and up) | [5824527 — table lamps on a wooden cabinet in a sunlit room](https://www.pexels.com/photo/elegant-table-lamps-placed-on-wooden-cabinet-in-stylish-room-with-windows-in-sunlight-5824527/) | the full frame |
| `hero-sideboard-phone` (480–1200 w) | 4:3 | First screen on phones (art-directed `<source>`) | the same photo, 5824527 | right-aligned 4:3 crop: windows, sideboard and lamps |
| `approach-sofa` | 4:5 | Approach | [5824529 — couch and display cabinet below framed pictures](https://www.pexels.com/photo/couch-and-small-display-cabinet-with-elegant-lamp-near-wall-decorated-with-framed-pictures-at-home-5824529/) | 4:5 from 10 % down |
| `room-living` | 3:2 | Gallery Fig. 1 (wide) | [5824522 — brick wall, wooden furniture and antique carpets](https://www.pexels.com/photo/classic-bedroom-interior-with-wooden-furniture-and-antique-carpets-5824522/) | the full frame |
| `room-dining` | 4:5 | Gallery Fig. 2 (upright) | [5824543 — dining corner with wooden furniture and a brick wall](https://www.pexels.com/photo/vintage-styled-kitchen-with-classic-wooden-furniture-and-weathered-brick-wall-5824543/) | 4:5 from 12 % down |
| `corner-armchair` | 4:5 | Gallery Fig. 3 (upright) | [5824587 — an armchair corner in the apartment](https://www.pexels.com/photo/area-for-drawing-in-cozy-apartment-5824587/) | 4:5 from 14 % down |
| `corner-window-seat` | 3:2 | Gallery Fig. 4 (wide) | [5824535 — an upholstered bench under a window](https://www.pexels.com/photo/elegant-ottoman-bench-placed-under-window-in-elegant-room-5824535/) | the full frame |
| `detail-desk` | 1:1 | Gallery Fig. 5 (detail) | [5824533 — a work corner in the apartment](https://www.pexels.com/photo/interior-of-stylish-work-zone-in-cozy-apartment-5824533/) | square from 18 % across |
| `detail-upholstery` | 1:1 | Gallery Fig. 6 (detail) | [5824538 — patterned upholstery on a bench under the window](https://www.pexels.com/photo/classic-ottoman-bench-placed-under-window-in-room-5824538/) | square from 24 % across |
| `detail-throw` | 1:1 | Gallery Fig. 7 (detail) | [5824581 — a cushion on a red knitted throw](https://www.pexels.com/photo/pillow-placed-on-red-blanket-5824581/) | square from 22 % across |
| `studio-niche` | 4:5 | The studio | [5824614 — open shelving in a plaster niche](https://www.pexels.com/photo/cozy-room-with-decorative-elements-on-wall-5824614/) | 4:5 from 10 % down |

Photographer: **Charlotte May** — [pexels.com/@charlotte-may](https://www.pexels.com/@charlotte-may).
Licence: [Pexels License](https://www.pexels.com/license/) (checked on each photo page, 2026-11-11:
"Free to use"). Free to use and modify, no attribution required (credited here anyway); you may not
sell unaltered copies or imply endorsement.

## How they were processed

The originals were downloaded once at full size (never hot-linked) and kept outside the project.
`concepts/interior-design-sightline/photo-pipeline/photos.mjs` in the Niche Pack workspace crops each
to its frame, applies **one shared grade** to all of them — saturation × 0.90, brightness × 1.04, a
gentle lift of the shadows (`linear(0.94, 9)`) so the warm, contrasty light sits quietly on the
limewash page — and exports AVIF (q 52) and WebP (q 78) at three or four widths, writing
`src/content/photoVariants.ts`. Nothing is retouched, added or removed. Only the processed frames are
in this repository (68 files, about 5.3 MB in all; a page view loads only the sizes it needs).

## Replacing them

Upload your own in the dashboard → Website (the "Sample" label disappears for that photo). To change a
**default** instead, add your variants to `public/photos/`, point the field's default `src` in
`src/content/site.ts` at one of them, add it to `photoVariants.ts` and record its source here. Use
photographs of your own work (with your clients' permission) or images you are licensed to use, and
caption them honestly.
