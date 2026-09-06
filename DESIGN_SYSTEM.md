# The visual system, read from the book

If something on the site looks wrong, check it against this before changing it.

## Sources inspected
Front and back cover (6 × 9 build), the 278-page interior PDF (half title p1, title page p3, copyright p4, the map p11, "Before We Begin" p13, the CASE EVIDENCE pages, chapter openers with the loop bar, body pages, the Five Readings dashboard, The Scientific Heartbeat), the state-line artwork and its legend, the confidence-marker legend, the pulse mark, the social set, the manuscript dump.

## Typography
- **Cover word.** Bebas Neue Bold, red, enormous. It appears **once** on the site: on the cover of the 3D book, which is the printed artwork itself. The site does not re-set it as type, because that would compete with the object.
- **Secondary cover type.** DIN Condensed / DIN Alternate Bold, tracked wide, uppercase. On the site: eyebrows, navigation, buttons, the loop names. Stack: DIN Alternate (built into Apple devices) → din-2014 (Adobe kit) → Barlow Semi Condensed.
- **Interior titles.** IvyPresto Display Regular, tight, never bold. On the site: every section title, the case times, the reading instructions. Stack: ivypresto-display → Instrument Serif.
- **Body.** Source Sans Pro Regular 10/13. On the site: Source Sans 3, 17–20 px, leading 1.55–1.62, measure 60–66 characters.
- **Instrument text.** IBM Plex Mono, small, tracked. On the site: times, labels, page numbers, the five readings on page 10, the colophon.

## Colour
| Role | Value | Where it came from |
|---|---|---|
| Cover red | `#B5291C` | sampled from the cover artwork |
| Cream | `#F7F3EC` | the cover ground |
| Page | `#FFFDF9` | the interior page |
| Ink | `#111111` | the interior text |
| Safety | `#BF372A` | the page 11 rectangles of the print file, CMYK 0 .71 .78 .25 |
| Time | `#2C6E8A` | the page 11 rectangles, CMYK .68 .2 0 .46 |
| Attention | `#8C7432` | the page 11 rectangles, CMYK 0 .17 .64 .45 |
| Evidence high / medium / low | `#C0392B` / `#D4881F` / `#A8A29A` | the confidence-marker legend |

Rules are ink at 14%. The only grey is the running-head grey `#8A857E`.

The three system inks were corrected on 6 September 2026. The site had carried lighter values (`#C75043`, `#4B839A`, `#988349`) described as sampled from the state line; they were not. The values above are what the book prints. Safety and the high-evidence marker (`#C0392B`) are near-identical by the book's own choice; they never appear in the same eyeful.

## Graphic devices carried over
- The **pulse mark** from the cover foot and spine: navigation mark, hero rule, audio player, footer.
- The **red band** with reversed tracked caps: the footer.
- **Page 10, the display page**: reproduced in its own order and its own layout — the heading, the two lines, "This book is the / Investigation.", the five timestamped readings with their coloured dots, "The body speaks first."
- The **vertical loop bar** beside chapter openers: the three systems in the map. The tall labelled state line itself is the chapter-opener device and is not used on the site.
- **Page 11's colour keys and rail**: three short rules over TIME / ATTENTION / SAFETY above the chapter list, and one bar in exact thirds down its left edge, both drawn in CSS in the inks above. The per-chapter stubs the page also prints do not ship until the artwork export is corrected.
- **The CASE EVIDENCE rule**: the short bar each such page prints under its label, on the four cards, in the page's own ink, read per page.
- **The page 13 marker row**: the three pulses in three cells behind hairlines, labels beneath, full width, never stacked.
- The **CASE EVIDENCE page**: reproduced as the cards, label for label. Four of the seven printed pages are shown; the site claims nothing about the others.
- **The chapter map on page 11**: labels, numbers and page numbers only, as printed. Page 11 prints no legend text, so the site shows none.
- **The printed HIGH / MEDIUM / LOW pulses from page 13**, with the page's own paragraph describing them. No captions were invented for them.
- The **confidence markers**: redrawn as SVG so they stay crisp, matching the printed shapes.
- **Eyebrow above a short red rule**, as on the back cover and the map page: section openers.

## The book, in CSS
`components/Book3D.tsx` builds the object from the printed artwork: front board (`cover-front.jpg`), spine (`cover-spine.jpg`), back board, page block, and page 3 set inside it as live type. It reads one custom property, `--open` (0 shut, 1 open); it never animates on its own.

**Spine depth.** The printed spine is 17.65 mm on a 152.4 mm board, a ratio of 0.116. At the rotation the hero uses, that reads flat on a screen, so `--bd` is set to `0.19 × board width` — the restrained version of what every trade mockup does. It is one line in `app/globals.css` if you want it thinner or thicker.

## Motion
One idea, driven by scroll, with no library:

- **The hero.** A sticky stage inside a taller track. Scroll position writes `--open` inside a `requestAnimationFrame`, and the front board swings on the spine to the title page. It reaches fully open at 80% of the track and holds. Scrolling never changes speed and the section can never trap you. With reduced motion the track collapses and the book is shown shut, which is the cover.
- **The reading.** Three instructions brighten as they reach the middle of the screen. The dimming class is added by script, so with no JavaScript every line is at full contrast. They are set at `--check`, `clamp(2.5rem, 13vw, 6rem)`, with a `:lang(de)` override one step smaller; the book prints them at body size, and the site's size is a promotion, recorded as such in `CONTENT_SOURCES.md`.
- **The one disclosure.** Page 12's first run sits behind a native `<details>`; it opens with scripts off and from the keyboard, and nothing about it moves.
- **Everything else.** A single fade-and-rise on first sight, skipped for anything already on screen at load, and switched off entirely under reduced motion.

## What must stay true
Cream ground. Red for emphasis only. Serif titles never bold. Mono for anything measured. Tracked DIN caps for anything navigational. No gradients, no glass, no icon set, and one shadow: the one under the book.
