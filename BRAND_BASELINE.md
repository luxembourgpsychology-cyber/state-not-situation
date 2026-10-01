# Brand baseline — the rules the live site actually follows

Recorded on 1 October 2026, before the commercial extension was built, from the
repository at `137367e` (= the production deployment `dpl_7yMVMEXQHQByrkDZfBKSstDkb98b`)
and from the live site at 390, 768, 1024 and 1440 px. **The site is the visual
authority.** The handoff's wireframe (cream/red, default serif, cards) is a map of
journeys, not a style; none of its CSS was used.

`DESIGN_SYSTEM.md` is the full system and `brief/REDESIGN-BRIEF.md` the author's brief
behind it. This page is the short list a new page has to satisfy.

## Identity and images

| What | Source | Rule observed |
|---|---|---|
| Mark | `components/PulseMark.tsx` | The cover's heartbeat line, red, drawn as a path. It is the home link and the footer's divider. No other logo. |
| Wordmark | `components/Nav.tsx` | "STATE. NOT SITUATION." in tracked DIN caps beside the mark; hidden below 420 px. |
| Cover | `public/images/cover-front.jpg` (cut from the v50 cover PDF by `lib/make_cover_assets.py`) | Flat, front-on, still. The site's **only shadow** (`.cover-figure`). Never a mockup. |
| Portrait | `public/images/author.jpg`, credit "Photograph: Zoe Larusson" on `/press` | Square, no frame, no shadow, 240 px on a phone, ≤300 px on desktop. |
| Book page | `--page #FFFDF9` | Used **only** under the extract: "this is the book's paper". |

## Type — four families, one job each, six steps

| Family | Source | Job |
|---|---|---|
| IvyPresto Display → Instrument Serif (`--font-serif`) | `app/[lang]/layout.tsx` | All titles. Weight 400, **never bold**. |
| Source Sans 3 (`--font-body`) | same | All prose. One prose size. |
| DIN Alternate → Barlow Semi Condensed (`--font-din`) | same | Navigation, eyebrows, buttons. Tracked caps 0.16em. |
| IBM Plex Mono (`--font-mono`) | same | Anything measured: times, folios, page numbers, ISBN, status. Caps, 0.08em, quiet grey. |

Steps (`app/globals.css`): `.t-cover` (title, the three variable words — twice on the
site), `.t-display` (≤3 kinds per page), `.t-head` (every section title), `.t-lead`
(the one pulled sentence), `.t-body` (62ch), `.t-label` / `.t-mono` (12 px). **No other
sizes.** A section that does not fit is rewritten, not given a size.

Heading rhythm: eyebrow in red DIN or a folio in mono in the label column → title at
HEAD (or DISPLAY for one statement) → LEAD sentence → BODY.

## Colour and rules

Cream `#F7F3EC` ground, ink `#111`, ink-soft `#3A3835`, quiet `#6F6A62` (AA on cream),
cover red `#B5291C`. Red has **four jobs**: section eyebrow, one display word per page,
links, the footer band. Rules are ink at 14% (`--rule`); `--rule-strong` 45% for a
quotation edge. Time `#2C6E8A` / Attention `#8C7432` / Safety `#BF372A` only on the three
variable words, page 4's rules and the press page's chapter map. Evidence markers
`#C0392B` / `#D4881F` / `#A8A29A` only in the evidence row.

No gradients, no glass, no icon set, **no cards**, no boxes around content.

## Space and composition

Three values: `--space-section` (section padding), `--space-block` (between blocks),
`--space-tight` (paragraphs). Sections are separated by **space, not rules**. Container
72rem (78rem for the two spreads), gutter `clamp(1.25rem, 5vw, 4rem)`.

Two layouts only:
- **TEXT**: label / folio in columns 1–3, content in 4–11 (every home section after the hero, the press page).
- **SPREAD**: hero 1–6 / 8–12; variables 1–4 / 5–8 / 9–12.

Lists are ruled rows (`border-t` + `border-b` per row): page 4's moments, the sixteen
names, the press facts and downloads. Side-by-side items get a vertical rule between
them (the evidence markers, `.pulse-row`). Phone: one column, nothing full-bleed.

## Navigation, actions, states

- Header: opaque cream bar, 56 px, `border-b` rule; mark + wordmark left, four links
  centred (Book, Extract, Author, Press), EN · FR right. Measured free space beside the
  centred links: 52 px each side at 768, 168 at 1024, 267 at 1280.
- Below 768: the word **Menu** opens a full-screen sheet (a real dialog, Escape closes,
  focus managed), serif links over rules, then two actions.
- Footer: a rule with the pulse mark, then the **red band**: the back cover's sign-off,
  a row of mono-tracked links, the imprint.
- Buttons: a word in DIN caps over a 1.5 px rule (`.btn`), red for the primary
  (`.btn-red`). The solid block `.btn-solid` exists for a form control only.
- Hover: colour change, 150 ms. Focus: two-tone ring (cream outline + ink shadow),
  visible on cream and on red. Tap targets ≥ 44 px.
- Language: EN · FR marks; the switch keeps the reader's section (ids are English in
  every language). French is browsable, `noindex`, under review. German is off.

## Motion, illustration, tone

One transition: opacity + 8 px rise, 400 ms, once, below the fold only (`Reveal.tsx`),
removed under reduced motion. Nothing driven by scroll; nothing loops. No illustration
beyond the evidence markers and the pulse mark.

Tone: printed lines, short declaratives, no marketing language, no claims the book does
not make (`CLAUDE.md`, "The one rule"). Every sentence has a source in
`CONTENT_SOURCES.md`.

## Baseline captures

Live-site screenshots and DOM fingerprints (text, ids, links, metadata, structured data)
of `/en`, `/en/read`, `/en/press`, `/fr`, `/fr/read`, `/fr/press` at 390 and 1440 px,
and of a local build of `137367e` at 390, 768, 1024 and 1440 px, were taken on
1 October 2026 and used for the before/after comparison in `EXTENSION.md`. They are
working files, not committed (`docs-screenshots/` is git-ignored).
