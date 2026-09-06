# The design system

Small on purpose. Six type steps, three spacing values, four jobs for red, one shadow,
one transition. Everything here is taken from the printed book or decided in
`brief/REDESIGN.md` against the author's brief at `brief/REDESIGN-BRIEF.md`.

If something on the site will not fit this system, the answer is to change the thing,
not to add a step.

## Sources inspected

Front and back cover (6 × 9 build) and the 278-page interior: half title p.1, title page
p.3, copyright p.4, the map p.11, page 10, "Before We Begin" p.13, the three systems
pp.13–14, the CASE EVIDENCE pages, chapter openers with the loop bar, page 181, page 225,
The Scientific Heartbeat p.226, the back page p.278.

## Typography

Four families, one job each. Never two of them at the same size, adjacent.

| Family | Job |
|---|---|
| **IvyPresto Display**, 400, never bold | Everything display and every section title |
| **Source Sans 3** | All prose. There is no second prose size. |
| **DIN Alternate**, 700, tracked caps | Navigation, section labels, buttons |
| **IBM Plex Mono** | Anything measured: times, folios, page references, ISBN, status |

Open-source substitutes ship (Instrument Serif, Barlow Semi Condensed); an Adobe Fonts
kit id in `site.config.ts` swaps in the real IvyPresto and DIN.

### The six steps

| Step | Class | Clamp | 390px | 1440px | Where |
|---|---|---|---|---|---|
| COVER | `.t-cover` | `clamp(2.75rem, 7vw, 4.5rem)` | 44px | 72px | The book title, and the three variable words. Twice on the site, nowhere else. |
| DISPLAY | `.t-display` | `clamp(2.25rem, 6.2vw, 3.75rem)` | 36px | 60px | The sensor line, the three checks, each timestamp, the closing question. At most three kinds per page. |
| HEAD | `.t-head` | `clamp(1.75rem, 3.4vw, 2.5rem)` | 28px | 40px | **Every** section title, without exception. |
| LEAD | `.t-lead` | `clamp(1.3rem, 1.8vw, 1.6rem)` | 20.8px | 25.6px | The one pulled sentence inside a section. |
| BODY | `.t-body` | `clamp(1.0625rem, 0.95rem + 0.4vw, 1.1875rem)` | 17px | 19px | All prose, 62ch. |
| LABEL | `.t-label` / `.t-mono` | `0.75rem` | 12px | 12px | Every eyebrow, nav item, button, folio, status line, INPUT / VERIFIED label. One size replaces six. |

Measures: DISPLAY 30ch, HEAD 24ch, LEAD 40ch, BODY 62ch, reading mode 34rem.

## Colour

| Role | Value | Where it came from |
|---|---|---|
| Cream | `#F7F3EC` | the cover ground |
| Page | `#FFFDF9` | the interior page — used only under the extract |
| Ink | `#111111` | the interior text |
| Quiet | `#6F6A62` | folios and measured values; raised from `#8A857E`, which failed contrast |
| Cover red | `#B5291C` | sampled from the cover artwork |
| Time | `#2C6E8A` | the page 11 rectangles, CMYK .68 .2 0 .46 |
| Attention | `#8C7432` | the page 11 rectangles, CMYK 0 .17 .64 .45 |
| Safety | `#BF372A` | the page 11 rectangles, CMYK 0 .71 .78 .25 |
| Evidence high / medium / low | `#C0392B` / `#D4881F` / `#A8A29A` | the printed confidence markers |

**Red has four jobs and no fifth:** the section eyebrow, one display word per page at most,
links, and the footer band. Rules are ink at 14%.

**The three system inks appear in exactly two places on the home page:** the three variable
words, and the short printed rule on each case moment. On the press page they also draw
page 11's own colour keys and rail.

## Spacing

Three values. Every ad-hoc margin collapses into them.

```
--space-section  clamp(4.5rem, 8vw, 7.5rem)   padding-block on every section
--space-block    clamp(2rem, 3.5vw, 3rem)     between blocks inside a section
--space-tight    1.1em                        paragraph to paragraph
```

`.section-tall` multiplies the section value by 1.5, used twice: the three variables and
the closing. **Sections are separated by space, not by rules.** The only boundary mark on
the home page is the ground changing to `--page` under the extract, which is the one thing
on the site that says "this is the book's paper".

## Grid

12 columns, `column-gap: clamp(1rem, 2vw, 2rem)`, page gutter `clamp(1.25rem, 5vw, 4rem)`.
Container 72rem; the hero and the three variables take `.container-wide` at 78rem, which is
how a spread reads as a spread without a device. Two layouts only:

- **TEXT** — label or folio in columns 1–3, content in 4–11.
- **SPREAD** — hero 1–6 and 8–12; variables 1–4 / 5–8 / 9–12.

Phone: one column, nothing full-bleed, no exceptions.

## The three motifs

Everything else is typography, spacing and the book's own imagery.

1. **Instrument reading** — the three confidence markers, drawn as SVG from the printed
   shapes (`EvidencePulse.tsx`).
2. **Timestamp** — the case moments, in mono, at DISPLAY.
3. **Heartbeat or signal** — the pulse mark from the cover foot and spine
   (`PulseMark.tsx`): navigation, footer, audio player.

Retired: the CSS 3D book, the coloured dots on page 10's readings, the case-evidence boxes,
the full-bleed marker band, the seven full-width hairlines, the red rule under the
navigation, the three-line method in the footer.

## The cover

The hero object is the printed front cover, flat, front-on and still, at 72vw on a phone
and 380px at 1440. One shadow, and it is the only shadow on the site:

```css
box-shadow: 0 24px 48px -24px rgba(17,17,17,.35), 1px 0 0 rgba(17,17,17,.10);
```

No 3D, no perspective, no gloss, no float, no scroll-driven opening. The book should look
like a book worth holding, and a photograph of it does that better than a render.

## Motion

1. One transition exists: opacity 0→1 with an 8px rise, 400ms, fired once when a block
   first enters the viewport, skipped for anything on screen at load (`Reveal.tsx`).
2. Nothing rests dimmed.
3. Nothing is driven by scroll position.
4. Hover is a colour change, 150ms. No transform, no shadow.
5. `prefers-reduced-motion: reduce` removes rule 1 entirely.
6. Nothing loops, except the audio player's pulse while audio is playing — a state
   indicator, not decoration.

If a visitor notices the motion before the writing, remove it.

## Components

`Hero` · `Premise` · `Variables` · `Moments` · `Evidence` · `ExcerptTeaser` · `Readings` ·
`Author` · `Closing` — one per home-page section, in that order. Plus `Nav`, `Footer`,
`LanguageSwitcher`, `Notify`, `Reveal`, `EvidencePulse`, `PulseMark`, `AmazonButton`,
`ExcerptLink`, `JsonLd`. `Listen` and `AudioPlayer` are built and switched off.

`Readings` adds no type step, no colour and no CSS class. It is fifteen rows of
existing parts: LABEL in mono for the chapter number and the page, BODY for the
line, and the three system inks on the three system names — the same three words
in the same three inks the reader met four sections earlier, which is the whole
reason the section needs no legend.

## Buttons

One style: a word in DIN caps at LABEL over a 1.5px rule. Ink by default, `.btn-red` for
primary. The solid red block, `.btn-solid`, appears **exactly once on the whole site** — the
notify submit — because a form control must read as a control and not as a link.

## What must stay true

Cream ground. Red for emphasis only. Serif titles never bold. Mono for anything measured.
Tracked DIN caps for anything navigational. No gradients, no glass, no icon set, no cards,
and one shadow: the one under the cover.
