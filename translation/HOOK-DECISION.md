# The hook, decided

Date: 6 September 2026
Decided by: the editor-in-chief, chairing the design call, after the author saw the built page.
Scope: everything between the hero and the Author section. The hero, Author, Companion, Closing, Launch, Footer and the /read and /press pages are not changed here.
Supersedes, in part: `translation/EDITORIAL-POSITIONING.md` (5 September 2026). Every departure from that decision is listed with its reason in **Changes from the editorial decision**.

**No new prose is written for the site by this decision.** Every sentence that appears on the page after this build is already in `content/en.ts`, already printed in the book or already supplied by the author. Two new strings are added and both are plain interface labels; they are listed, with their reason, under **New interface labels**. Passages are shown at a different size, in a different place, or behind one disclosure. Nothing is paraphrased, nothing is cut from the site, and nothing is moved to `/read`.

---

## The author's feedback, verbatim (6 September 2026)

> "Honestly I am not happy now with the layout of the hook…. I feel it is too much text… I like the big font with jaw and other checks… then a few cool graphics from the book (the scientific heartbeat) somehow a mix of this design and the older one… pls self verify that I have the best drawing in any reader of shallow and deep attention"

---

## The decision

Pages 12 and 13 stop being two sections and become one, because the book prints them as one unbroken passage; inside it the page 12 material drops from 205 words to 117 set in three sizes with the paragraph spacing that is currently broken, one 88-word paragraph goes behind a single native disclosure, and the three checks the author named go from a computed 32 px to 51 px on a 390 px phone, arriving one screen sooner and ending, as before, on the book's question. Immediately after them comes a new section that is page 13's lower half kept whole — the printed eyebrow "Before we begin", the two evidence paragraphs open in plain text, and the three HIGH / MEDIUM / LOW pulses set as the full-width plate the book prints, which is the scientific heartbeat she asked for, arriving on phone screen six instead of screen twelve. Then the plain page: the page 20 heading freed from its narrow rail, the page 20 Katrin paragraph moved down out of the map to sit under the heading that names her, the author's own paragraphs and who it is for. Then the four case cards, moved up above the extract and carrying, for the first time, the short coloured rule the book actually prints under CASE EVIDENCE / NN — verified from the print file, four colours read, none guessed. Then the extract, unchanged but with a second "Read an extract" button at its head, because on a phone there is currently no route to it from anywhere but the hero. Then the map, shorter by the evidence block, opening on the page 13 sentence written for a reader who has met nobody, and finally carrying page 11's own artwork: the three-segment rail down the chapter list and the three TIME / ATTENTION / SAFETY colour keys above it, drawn in CSS in the book's own inks. One disclosure on the whole page, holding 88 words; every other word stays in plain sight.

---

## What the printed pages actually show

These were checked against the render set and against the content streams of `Final State Not Situation 38.pdf`. They settle four questions the design call was arguing about, and three of them overturn what was proposed.

1. **Page 13's checks are body prose, not a display page.** `final-p13.png` sets "…try something right now. Whatever you are feeling as you read this sentence. Check your jaw. Check your breath. Check your shoulders." as a run-on clause in a justified body paragraph, at body size. Setting them large is a promotion the brief permits ("you may SET IT BIGGER"); it is **not** a reproduction, and no comment, commit message or `CONTENT_SOURCES.md` entry may describe it as printed display type.

2. **Pages 12 and 13 are one continuous passage.** `final-p13.png` runs "…the reason the instrument was miscalibrated yesterday, try something right now. Whatever you are feeling…" with no break. The site currently puts a full `--section` gap and a ground change between them.

3. **Page 13 prints the evidence note above the pulses, and the three systems after them.** Printed order: "Before We Begin" → `evidenceIntro` → `evidenceMarkers` → the row of three pulses with hairline verticals → "The chapters that follow are organised around three systems…". The site's map runs this backwards and opens on a page 20 sentence.

4. **The CASE EVIDENCE device is a short horizontal rule, not a vertical bar.** Every CASE EVIDENCE page draws one filled rectangle, 28 × 1.6 pt at (72, 467.4), directly under the label. The vertical labelled bar is the *chapter-opener* device (`pages/p209.png`), and CASE EVIDENCE pages are not chapter openers. The four colours the site needs are now known exactly, from the print file, and none of them is a guess:

   | Card | Printed CMYK | Ink |
   |---|---|---|
   | CASE EVIDENCE / 00 | 0.68 0.2 0 0.46 | Time `#2C6E8A` |
   | CASE EVIDENCE / 02 | 0.68 0.2 0 0.46 | Time `#2C6E8A` |
   | CASE EVIDENCE / 11 | 0 0.71 0.78 0.25 | Safety `#BF372A` |
   | CASE EVIDENCE / 13 | 0 0.71 0.78 0.25 | Safety `#BF372A` |

   (Chapter 12's CASE EVIDENCE page draws no rule at all, which is why the rule may not be generated from a rule; it is read per page.)

5. **Page 11 prints three devices, and the site shows none of them.** From the map page's content stream: a left rail of three stacked rectangles, each 8 × 144 pt, in Time / Attention / Safety top to bottom — one bar in exact thirds, **not** a stack of sixteen chapter lines; three key rules of 24 × 3 pt above TIME / ATTENTION / SAFETY in tracked caps; and a small multi-segment stub beside each chapter number. **Chapter 00 has no stub** — the printed set is 01 to 15.

6. **The state-line export set in `public/images` is misnamed and cannot be used.** Comparing each printed stub's colour proportions with each PNG: files 01–11 match chapters 01–11 exactly; `state-line-12.png` is in fact chapter **13** (T20/A18/S62 against the printed T19/A19/S62); `state-line-13.png` is in fact chapter **14** (T30/A25/S25/T20 against the printed T29/A27/S25/T19). Printed chapter 12 (S48/T52) and printed chapter 15 (T30/A70) match nothing in the folder. `state-line-15.png` and `state-line-12-real.png` are a different export (57 × 2000 rather than 59 × 2043) and contain a fourth ink, `#14323D`, that page 11 never prints. **Therefore: no per-chapter stub ships in this build.** Two of fifteen chapters would carry another chapter's reading, which is a false claim about the book's own taxonomy — the exact failure the one rule exists to prevent — and a blank row reads as a bug. The rail and the keys are flat colour and ship as CSS instead.

7. **The site's three loop colours are not the book's inks.** The book prints Time `#2C6E8A`, Attention `#8C7432`, Safety `#BF372A` (CMYK 0.68 0.2 0 0.46 / 0 0.17 0.64 0.45 / 0 0.71 0.78 0.25, read from the page 11 rectangles). `app/globals.css` carries `#4B839A`, `#988349`, `#C75043`, and `DESIGN_SYSTEM.md` says they were sampled from the state line; they were not — the state-line artwork itself samples at `#2C6E8A` / `#8B7332` / `#C0392B`. **Set the three tokens to the printed inks** and record the correction in `DESIGN_SYSTEM.md`. This is a one-line change affecting exactly three places (the page 10 dots, the map loop bars, the CASE EVIDENCE `INPUT` label) plus everything this decision adds, and it is what keeps one palette on the page.

8. **Part of "too much text" is a rendering defect.** `globals.css` has `.prose-book p + p { margin-top: 1.1em }`, but `KnowTheDay.tsx` wraps every run in its own `<div>`, so the adjacent-sibling selector never fires and all 205 words render as one unbroken block (`m-02400.png`, `d-03000.png`). Fix the markup first. Also: `knowTheDay.runs` is a selection from page 12, not the page — the printed page opens "A day with a crisis has a shape…", each printed paragraph is trimmed, and one sentence is skipped for a typo. No label anywhere may say "page 12 in full".

Two build-level faults, free to fix while the files are open: `Hero.tsx` owns `id="book"` (the scroll track) while `TheBook.tsx` uses `id="book-about"`, so the desktop nav's "The book" scrolls back to the hero — **point the nav link at `#book-about`; do not rename the section, that would duplicate the id on the element driving the 3D book.** And `Nav.tsx` marks every in-page link `mobile: false` except Press, so from phone screen three onward there is no route to the extract at all.

---

## The page order

Sizes are the computed value at a 390 px viewport, then at 1440. Gutter is 20 px on a phone, 64 px at 1440; content width 350 px and 1120 px. `--section` is 80 px on a phone, 144 px at 1440.

### 1. `Misreading` — page 10 (existing component, re-scaled)

**Purpose.** The book's own one-page account of itself, first thing under the cover. It answers what the book is, how it is told and what it claims before the visitor reads a paragraph.

**Keys and treatment.** All of `misreading.*`, nothing hidden, nothing cut.
- `misreading.eyebrow` — `.eyebrow .eyebrow-red`, over the existing hairline.
- `misreading.lines[0]` — `h2.serif-title`, raised from `clamp(2.4rem,7vw,4.6rem)` to **`clamp(2.5rem,11.5vw,5.6rem)`** → 44.9 px / 89.6 px (today 38.4 / 73.6).
- `misreading.lines[1]`, `[2]` — two stacked lines as printed, `clamp(1.1rem,1.6vw,1.35rem)`.
- `misreading.investigationLabel` — `.eyebrow` ink. `misreading.investigation` — `.serif-title` red, raised to **`clamp(2.6rem,12vw,6rem)`** → 46.8 px / 96 px.
- `misreading.readingsLabel` — `.mono-label`.
- `misreading.readings` — the five-row instrument list unchanged in structure; dot 9 px → **11 px**, time `.mono` 0.78 rem → 0.8 rem, text 1 rem → **1.05 rem / 1.25 rem**.
- `misreading.closing[0]`, `[1]` — tracked caps under a full-measure rule, second line red.
- Phone rhythm tightened: the three `mt-12` become `mt-8`, section bottom padding `calc(var(--section)*0.7)`. This is the section's only compression and it buys back most of a phone screen for the checks.

**Layout.** Phone: one column, as now. Desktop ≥ 1024: 12 columns — statement in cols 1–7 (eyebrow, rule, heading, the two lines, `THIS BOOK IS THE` / `Investigation.`), the five readings as a panel in cols 8–12 top-aligned to the heading's first baseline, the closing couplet full width under a rule spanning 1–12. Below 1024 the single column widens from `max-w-2xl` to `46rem`, the book's own 67 % measure.

**Graphics.** The five coloured dots on their hairline rail — the printed page 10 dashboard, dot order unchanged (Time, Safety, Safety, Attention, Time), now in the corrected inks. The eyebrow-over-rule device. Nothing added.

**Demoted.** Nothing.

### 2. `TheReading` — pages 12 to 13 as one passage (existing component, extended; `KnowTheDay.tsx` deleted)

**Purpose.** The mistake is named, the reader is asked to take a reading, the section ends on the book's question. This is the section the author's complaint is about and the section she says she likes, joined as the book joins them.

`KnowTheDay.tsx` is deleted and its content moves into `TheReading.tsx`, which already owns the scroll observer. Its `id="the-day"` is retired; nothing links to it (verified). The merged section keeps `id="reading"`. The section is `aria-labelledby` the first eyebrow, which becomes the `h2`; the second eyebrow is an `h3`, so headings stay in order.

**Block A — page 12.**
- `knowTheDay.eyebrow` — `h2.eyebrow .eyebrow-red`; `.mono-label` "12" beneath.
- **Disclosure**, on a hairline directly under that row: `<details>` whose `<summary>` is the new label **More from page 12**, `.eyebrow` caps, 44 px tap target, holding `knowTheDay.runs[0]` at `.prose-book`, 62 ch. Native element, no script.
- `knowTheDay.runs[1]` — the recognition sentence, promoted one step from body: **`clamp(1.2rem,4.4vw,1.5rem)` / line-height 1.45**, ink, 44 ch measure → 19.2 px / 24 px.
- `knowTheDay.runs[2]` — `.prose-book`, `--ink-soft`. **Deliberately small.** Page 10 closes two screens above on THE BODY SPEAKS FIRST. / THE MIND EXPLAINS SECOND., and the editorial decision rejected that repetition twice; setting the echo as quiet run-in prose, in a different face, colour and register, is what keeps the antecedent of "that mistake" on screen without saying the line twice at display weight.
- The printed `§`, red, centred, as now.
- `knowTheDay.runs[3]` — `.prose-book`, ink, ending on "try something right now." and handing straight to Block B.
- Gap to Block B: `calc(var(--section)*0.45)`, not a section break, not a ground change, not a rule.

**Block B — page 13.**
- `reading.eyebrow` — `h3.eyebrow .eyebrow-red`; `.mono-label` "13".
- `reading.lead` — `.serif-title`, `--quiet`, `clamp(1.4rem,5.5vw,2.1rem)` → 21.5 px / 33.6 px.
- `reading.steps[0..2]` — `.reading-step`, new token **`--check: clamp(2.5rem,13vw,6rem)`** → **50.7 px** at 390, 46.8 at 360, 55.9 at 430, **96 px** at 1440 (today: 32 px at 390, 64 px at 1440). Phone step gap `space-y-8` → `space-y-7`. The 01 / 02 / 03 mono numbers and the brighten-on-scroll behave exactly as built.
- Hairline.
- `reading.result` — `.serif-title` red, `clamp(1.85rem,7vw,2.8rem)` → 29.6 px / 44.8 px.
- `reading.afterResult` — demoted in weight but **kept visible**: 0.95 rem, `--ink-soft`, 42 ch, tight under the result. It carries "The reading may be accurate. It may not.", the hedge that stops the exercise reading as a party trick to a clinician; set as a small note it reads as an instrument caption, not as text.
- `reading.question` — `.serif-title` ink, `clamp(2rem,9vw,3.6rem)` → 35.1 px / 57.6 px, alone, the last thing in the section.

**Layout.** Phone: one column; the bottom margin of Block A is tuned so that "Check your jaw." breaks the fourth fold rather than sitting wholly above or below it — check at 390 and 430. Desktop: 12 columns; eyebrows and folios in cols 1–3 (the book's margin, the folio in it), Block A prose in cols 4–10 at 62 ch, Block B lead and checks in cols 4–12, the hairline across 1–12, result / afterResult / question in cols 4–10.

**Graphics.** The `§`, printed, as now. The eyebrow-over-hairline device twice, once per folio, so neither printed heading does two jobs. **No state line beside the checks**: the state line is a chapter's own reading and page 13 is not a chapter; a semantic device used where it means nothing is decoration, which the design system forbids. The checks are the graphic.

**Demoted.** `knowTheDay.runs[0]`, 88 words, into the disclosure above — on the home page, in the DOM, indexable, keyboard-reachable, open with scripts off, untouched by reduced motion.

### 3. `BeforeWeBegin` — page 13, lower half (NEW component, ~60 lines, no new content keys)

**Purpose.** The scientific heartbeat, at the size of a graphic and at the place the book prints it: on the same page as the checks, under the note that says what the markers mean. This is the "cool graphic from the book" the author named, moved from roughly phone screen twelve to phone screen six and given its own plate.

**Keys and treatment.** All four keys move here from `MapOfBook`; there is one home for them.
- `map.evidenceEyebrow` ("Before we begin") — `.eyebrow .eyebrow-red`; `.mono-label` "13".
- `map.evidenceIntro` (64 words) and `map.evidenceMarkers` (105 words) — `.prose-book`, ink, 62 ch, **open, in plain running text**. They are not folded. The open evidence stance is the site's whole defence against the machine-written press pack; a reader who meets three graphics and must tap to find the hedging is the one reader this site cannot afford to lose.
- `map.grades[0..2].label` — `.din-head` 0.72 rem / 0.28 em tracking, in `var(--grade-high|medium|low)`, beneath each pulse.

**Layout.** Ground `--paper` against the `--page` above and below, hairline top and bottom, so the section reads as a plate. Section padding `calc(var(--section)*0.8)`. Phone: eyebrow row, the two paragraphs, then the band. Desktop: eyebrow and folio cols 1–3, the two paragraphs cols 4–10, the band full width across 1–12.

**Graphics.** Three `EvidencePulse` SVGs, paths unmodified, **in a row of three at every breakpoint**, divided by 1 px `--rule` verticals exactly as page 13 sets them, labels beneath, left-aligned in each cell. Phone: full-bleed band, 12 px inner gutters, cells ~118 px, pulse ~112 px wide × 37 px tall. Desktop: three equal cells of ~373 px, pulse ~300 px wide × 100 px tall (today `max-w-[9rem]` = 144 px). `preserveAspectRatio` stays `xMidYMid meet`; the drawn line is never stretched. **The three must never be stacked**, at any width: their meaning is comparative — HIGH is a strong trace, LOW is a near-flatline — and a full-width LOW cell alone reads as a broken image and loses the comparison that is the whole point. `PulseMark` (the cover mark) must not appear in this band; two different pulse marks on one screen would be a defect. Static SVG: nothing to degrade under reduced motion or without JavaScript.

**Naming.** The band is **never** labelled "The Scientific Heartbeat" on screen, in a comment, or in an `aria-label`. That is the name of the page 226 back-matter section, not of the page 13 markers, and using it here would mislabel the graphic. The section's accessible name is `a11y.evidenceRegion`, "Confidence markers, page 13" — "confidence marker" is page 13's own noun.

**Demoted.** Nothing. This is the promotion.

### 4. `TheBook` — page 20 and page 14 (existing component, one key gained, heading freed)

**Purpose.** The plain page after two graphic ones: what the book contains, in the book's words and then the author's, and who it is for. The deep reader's first plain answer.

**Keys and treatment.**
- `book.eyebrow` — `.eyebrow .eyebrow-red`.
- `book.heading` (page 20) — `h2.serif-title`, raised to `clamp(2rem,7.5vw,3.6rem)` → 32 px / 57.6 px, and **lifted out of the 4-column rail**, where 66 characters currently break over four lines beside an empty left third (`d-05000.png`). `book.headingSource` `.mono-label` beneath.
- **`map.systemsIntro` moves here from the map**, as the section's first paragraph, `.prose-book` ink: same page 20, same voice, directly under the heading that names Katrin, and it makes the three abstractions concrete at the point where the reader is being told what the book contains.
- `book.paragraphs[0]` — `.prose-book`. `book.paragraphs[1]` — serif 1.25 em, as now.
- `book.readersEyebrow`, `book.readersAnchor` (page 14), `book.readers` — inside the red left rule, unchanged.

**Layout.** Phone: one column. Desktop: eyebrow cols 1–4; heading and `headingSource` cols 5–12; the four paragraphs and the who-it-is-for block cols 5–12 at 62 ch.

**Graphics.** The red left rule on "Who it is for", as built. No image; after the pulse plate the page needs a plain page, and page 20 is printed as plain text.

**Demoted.** Nothing.

### 5. `CaseEvidence` — four printed pages (existing component, moved up, printed rule added)

**Purpose.** Four of the book's own pages, label for label; pure picture for the skimmer, primary source for the journalist. Moved above the extract so that "Same morning. Same paragraph. Same Katrin." and "Time started at 06:38 and never stopped." land one screen before the 06:38 card, which turns the cards from texture into evidence for the sentence just made.

**Keys and treatment.** Every key as built. `case-card__time` raised from `clamp(2.4rem,6vw,3.4rem)` to `clamp(2.8rem,10vw,4rem)` → 44.8 px / 64 px. `cases.closing` raised from `clamp(1.6rem,3.6vw,2.6rem)` to `clamp(1.9rem,7vw,3.2rem)` → 30.4 px / 51.2 px, `cases.closingSource` in mono beneath. The `INPUT` label keeps `var(--time)`, now in the corrected ink.

**Layout.** Unchanged: one across, two at `sm`, four at `lg`, hairline gutters on a `--rule` ground.

**Graphics.** The printed CASE EVIDENCE rule: a **40 × 2 px horizontal bar directly under the `CASE EVIDENCE / NN` label**, inside the card, `aria-hidden`. Card 00 and card 02 in Time `#2C6E8A`; card 11 and card 13 in Safety `#BF372A`. Read from the print file (28 × 1.6 pt at (72, 467.4); CMYK above); none guessed, and none derived from a rule, because chapter 12's CASE EVIDENCE page prints no bar at all. No vertical bar on the card edge: that is the chapter-opener device and these are not chapter openers.

**Demoted.** Nothing.

### 6. `ExcerptTeaser` — the pilot (existing component, one addition)

**Purpose.** The primary conversion, at full length. Unchanged in content and unchanged at three paragraphs.

**Keys and treatment.** Everything as built: `excerpt.eyebrow`, `title`, `sectionLabel`, `runningHead`, `paragraphs[0..2]` with the drop cap, `continueCta`, the folio, then `excerpt.closing` (page 26) and `closingSource` in the red rule. **Addition:** a second `excerpt.cta` ("Read an extract", existing key) as a `btn-red` directly under `excerpt.sectionLabel` at the head of the section, so a phone visitor who has arrived here can tap without scrolling past 285 words. This is the only route to the extract on a phone other than the hero.

**Layout.** Unchanged 4 / 8 split; the added button sits in cols 1–4 under `sectionLabel`.

**Graphics.** The interior-page setting itself — running head, drop cap, folio on a rule. Unchanged.

**Demoted.** Nothing. `excerpt.paragraphs[3..7]`, `excerpt.quote` and `excerpt.endNote` already live on `/read` and stay there.

`Listen` keeps its conditional slot immediately after this section and remains hidden until `editions[lang].audioUrl` is set.

### 7. `MapOfBook` — the reference block (existing component, evidence block removed, page 11 artwork added)

**Purpose.** One reference block for the psychologist, the journalist and the editor: the sorting tool, the three systems, the sixteen chapters, and how the reference section is built. Shorter by 220 words and one graphic, both of which moved up to where the book prints them.

**Keys and treatment.**
- `map.eyebrow` ("A map of the book", page 11's own eyebrow).
- **`map.sortingTool` (page 13) now introduces the section**, `.prose-book` ink, in place of `map.systemsIntro`. It is written for a reader who has met nobody; the page 20 paragraph it replaces names Katrin and has moved to section 4, under the heading that names her.
- The three `map.loops` — full-height colour bar 5 px → **6 px**, name in `.din-head` tracked caps in its colour, `loop.body` at 0.98 rem. This is the older design's three coloured columns, unchanged except for the bar weight and the corrected inks; the removed state-line legend lines do not return.
- `map.investigationTitle`, `map.mapLine`, the sixteen `map.chapters`, `map.mapFooter`, `map.heartbeat[0..1]` and `map.heartbeatSource` in the red rule — all as built.

**Layout.** Unchanged 4 / 8 splits; the chapter list two columns of eight at `sm`, one column of sixteen on a phone, with the rail at the left edge of the list.

**Graphics.** Two devices from page 11, both printed, both drawn in CSS in the book's inks — no image file, so nothing to mismatch and nothing to load:
- **The three colour keys**, immediately above the chapter list: a 40 × 3 px rule over TIME / ATTENTION / SAFETY in `.din-head` tracked caps, in Time / Attention / Safety. (Printed at 24 × 3 pt; the names are printed, the descriptive legend lines that were cut do not return.)
- **The rail**: one bar down the left of the whole chapter list, 8 px wide on a phone, 10 px from 640 px, full list height, in exact thirds — Time, Attention, Safety, top to bottom, `aria-hidden`. (Printed as three 8 × 144 pt rectangles.)
- **No per-chapter stubs in this build.** See finding 6: the export set is misnamed from chapter 12 on and two chapters have no correct file. They ship when a corrected export exists and not before.

**Demoted.** Nothing leaves the site. `map.evidenceEyebrow`, `map.evidenceIntro`, `map.evidenceMarkers` and `map.grades` are section 3 now. `map.systemsIntro` is in section 4. Both are on the home page, in plain text, higher up the page than they are today.

---

## The first three phone screens after the hero

390 × 844, sticky nav 56 px, so 788 px of live area per screen. The hero and its scroll track occupy about 1.7 screens as built (see **Open questions**, item 5).

```
SCREEN 2 — Misreading, page 10 (ground --page)
+------------------------------------------------+
| THE FIRST MISREADING            DIN 11.5 red    |
| ---------------------------------- hairline     |
|                                                 |
| Nothing went                    serif 45px      |
| wrong on this                   (2.5rem,11.5vw, |
| day.                             5.6rem)        |
|                                                 |
| The instruments were working.   17.6px          |
| The data was there the whole time.              |
|                                                 |
| THIS BOOK IS THE                DIN 11.5 ink    |
| Investigation.                  serif 47px RED  |
|                                                 |
| THE SAME DAY, FIVE READINGS     mono 11.5 quiet |
|  * 06:38  A heaviness arrives before  [fold]    |
+------------------------------------------------+

SCREEN 3 — the dashboard, then the hinge begins
+------------------------------------------------+
|  |        the day does.         mono 12 + 16.8  |
|  * 09:12  A two-line email reads like a verdict.|
|  * 14:23  Five neutral words tighten a jaw.     |
|  * 17:45  An unanswered message starts charging |
|  |        rent.                                 |
|  * 22:47  Two letters and a full stop feel      |
|  |        hostile.                              |
|     dots 11px: Time / Safety / Safety /         |
|     Attention / Time, on a hairline rail        |
| ---------------------------------- hairline     |
| THE BODY SPEAKS FIRST.          DIN 13 ink      |
| THE MIND EXPLAINS SECOND.       DIN 13 RED      |
|=== section join, ground -> --paper ============ |
| YOU KNOW THE DAY   12           DIN 11.5 / mono |
| ------------------  More from page 12  + -----  |
| You have had this day. Everyone has  19.2px ink |
| had this day. You have had it dozens [fold]     |
+------------------------------------------------+

SCREEN 4 — the hinge closes, the first check breaks the fold
+------------------------------------------------+
| of times and you will have it again and each    |
| time the story will feel like the truth and     |
| each time the morning after will make the       |
| story dissolve.                                 |
|                                                 |
| The body spoke first. The mind explained  17px  |
| second, and this explanation felt like    quiet |
| the event.                                      |
|                  §                    red serif |
| This book is about that mistake. It is    17px  |
| about that error as a daily, ambient,     ink   |
| invisible feature of being alive in a body      |
| that is constantly producing signals, which     |
| your mind is constantly reading or misreading.  |
| Before any of that, before the science and the  |
| mechanism and the reason the instrument was     |
| miscalibrated yesterday, try something right    |
| now.                                            |
|                                                 |
| TRY SOMETHING RIGHT NOW  13     DIN 11.5 / mono |
| Whatever you are feeling as you serif 21.5 quiet|
| read this sentence.                             |
| 01                              mono 11 red     |
| Check your jaw.                 serif 51px [fold]|
+------------------------------------------------+
```

Screen 5 is the three checks at 51 px and the hairline; screen 6 is "What you found is a reading.", the 34-word note and the question at 35 px; screen 7 is BEFORE WE BEGIN, the two evidence paragraphs and the three-pulse plate. Screens 8 to 10 are the page 20 heading, the author's paragraphs and who it is for; 11 to 12 the four case cards; then the extract, then the map.

Against the current build the changes a thumb actually meets are: the fourth screen is no longer a full screen of unbroken grey prose with no heading, no rule and no picture (`m-02400.png`); the first check enters the fourth screen rather than the fifth; the checks are 51 px rather than 32 px; and the first printed graphic after the page 10 dashboard arrives on screen seven rather than screen twelve. Words met between the hero and the question: about 270, against about 355 today, and set in four sizes rather than one.

---

## Content keys no longer shown on the home page

**None.** Every key that renders today still renders on the home page after this build, and nothing moves to `/read`.

One passage is behind one native `<details>`:

| Key | Words | Where it lives | How it is reached |
|---|---|---|---|
| `knowTheDay.runs[0]` | 88 | Section 2, Block A, on the hairline under the eyebrow row | `<summary>` "More from page 12". Native element: in the DOM, indexable, found by in-page search, opens by keyboard, works with JavaScript off, unaffected by reduced motion. |

Two passages change section but stay in plain running text, both higher up the page than today:

| Keys | Was | Now |
|---|---|---|
| `map.evidenceEyebrow`, `map.evidenceIntro`, `map.evidenceMarkers`, `map.grades` | inside `MapOfBook`, about phone screen 12 | section 3, `BeforeWeBegin`, about phone screen 7, with the pulses at roughly twice the desktop size |
| `map.systemsIntro` | opening `MapOfBook` | section 4, `TheBook`, as the first paragraph under the page 20 heading that names Katrin |

Everything else — `book.*`, all of `excerpt.*`, all four `cases.items` and `cases.closing`, `map.sortingTool`, the three `map.loops`, `map.investigationTitle`, `map.mapLine`, the sixteen `map.chapters` with their page numbers, `map.mapFooter`, both `map.heartbeat` sentences, and `reading.afterResult` — is visible and unchanged in content. A journalist auditing the site against the book finds every passage the editorial decision put there, in the book's order, with its page number beside it.

---

## New interface labels

Two strings. Both are plain interface labels under category 3 of the one rule, neither is a quotation, and both need French and German or they render as `⟦fr: …⟧`. Add them to `content/types.ts`, `en.ts`, `fr.ts`, `de.ts` and to `CONTENT_SOURCES.md` under interface labels. Do not run `lib/make-stubs.mjs --force`.

1. **"More from page 12"** — the `<summary>` of the one disclosure, in section 2. Reason: it must say what is inside before the reader taps, and it must make no claim of completeness. `knowTheDay.runs` is a **selection** from page 12, not the page: the printed page opens on "A day with a crisis has a shape…", each printed paragraph is trimmed, and one sentence is skipped for a typo. "Page 12 in full" and "the first paragraph" would both be false. Note for the translators: an interface label, not a sentence from the book; keep it short and neutral.
2. **`a11y.evidenceRegion` — "Confidence markers, page 13"** — the `aria-label` of the new `BeforeWeBegin` section, matching the pattern of `a11y.misreadingRegion` ("Page 10 of the book"). Never rendered as visible text. Reason: the section needs an accessible name and it must not be called "The Scientific Heartbeat", which is the page 226 back-matter section. "Confidence marker" is page 13's own noun.

---

## Changes from the editorial decision of 5 September, each with its reason

1. **`KnowTheDay` and `TheReading` merge into one section** (its sections 3 and 4). `final-p13.png` runs pages 12 to 13 as one unbroken passage, so the merge restores a printed continuity that the site currently splits with a full section gap; both printed headings survive, one per folio, so no label does two jobs.
2. **88 words of page 12 go behind a disclosure and 117 stay visible in three sizes.** The decision required the passage to be present and to restore the antecedent of "that mistake"; both hold, and the passage that folds is the texture paragraph, which is the least load-bearing for an evidence-minded reader and the most costly for a thumb-scrolling one.
3. **`knowTheDay.runs[2]` is set small rather than large.** The decision rejected repeating "The body speaks first. The mind explains second." within one screen, twice; page 10's couplet is now half a screen above, so the echo is kept but held in a different face, colour and size so it reads as a run-in rather than a repeat.
4. **The evidence note and the three pulses leave the map for their own section at position 3** (its section 8, "one reference block, not two"). What the decision rejected was a second reference block assembled from the back matter; this is page 13 kept whole, the markers set beside the checks they are printed beside, and the reference apparatus proper — the map footer and the two page 226 sentences — stays in the map, so there is still exactly one reference block.
5. **Inside the map, `map.sortingTool` replaces `map.systemsIntro` as the introduction to the three systems.** Page 13 prints the sorting-tool sentence as the introduction and it is written for a reader who has met nobody; the page 20 paragraph names Katrin, and at that point on the page the visitor has not met her — the same objection the decision itself used to demote the old three-systems section.
6. **`map.systemsIntro` moves into `TheBook`.** Same page of the book, same voice, and under the page 20 heading that names Katrin it makes concrete the three abstractions the reader met two sections earlier.
7. **The case cards move above the extract** (its sections 6 and 7). The frame the decision wanted in place before the cards is now supplied by page 10, the merged pages 12 to 13 and the evidence plate; putting the cards immediately after the page 20 sentences about Katrin's morning makes the four printed times evidence for the sentence above them, and it breaks 527 words of continuous prose with four pictures.
8. **A second `excerpt.cta` is added at the head of the extract section.** `Nav.tsx` shows no in-page link on a phone except Press, so from screen three onward there is currently no way to reach the extract at all; the key already exists and no new copy is involved.
9. **Page 10 becomes a two-column spread at ≥ 1024 px.** The printed page is one page seen whole; at 1440 the site currently uses the left half and leaves the right half empty (`d-02000.png`), and the panel layout is what lets the whole of page 10 be seen at once, which is the printed condition. Reading order and DOM order are unchanged.
10. **Page 11's rail and colour keys are added to the map.** Printed on page 11, verified in the print file, currently shown nowhere; the decision did not consider them, and they turn sixteen grey rows into a page with a picture at no copy cost.
11. **The printed CASE EVIDENCE rule is added to the four cards.** Printed on every CASE EVIDENCE page, colours read from the print file rather than chosen.
12. **The three loop-colour tokens are corrected to the book's inks.** `DESIGN_SYSTEM.md` says they were sampled from the state line; they were not, and a mixed palette on one page is the visible cost.

Not changed: `Listen` stays hidden, `Companion` stays off, the extract stays at three paragraphs, the removed state-line legend lines and the evidence-marker shape captions do not come back, the reading section still ends on the question and nothing is added after it, the author section keeps its size and position, and no sentence anywhere is new.

---

## Checks the verifier must run

**Shallow reader, on new phone screenshots at 390 px (and spot-check 360 and 430).**
- Re-photograph the full scroll before and after. The "before" reference is `m-02400.png`: a full screen of unbroken grey prose with no heading, no rule and no picture. No screen in the "after" set may look like it.
- "Check your jaw." measures 50–52 px at 390 px, 46–48 px at 360 px. Measure it in the screenshot; do not read it off the clamp.
- The first check breaks the fourth fold — visible at the bottom of screen 4, not wholly above it and not pushed onto screen 5. Tune Block A's bottom margin until it does, at 390 and at 430.
- The three-pulse plate is reached within seven screens of the top, and the LOW pulse is legible as a near-flatline beside the other two, not as an empty box.
- The four case cards are reached before the extract, and the times measure 44–46 px.
- From any screen below the hero, a phone visitor can reach the extract: the button at the head of section 6 exists and is ≥ 44 px.
- Count the words a thumb passes between the hero and "Is this the situation? Or is this the state?" It should be about 270.

**Deep reader, on new desktop screenshots at 1440 px.**
- Page 10 fits one viewport as a two-column spread, with no empty right half (compare `d-02000.png`).
- `book.heading` is no longer broken over four lines in a narrow rail beside an empty column (compare `d-05000.png`).
- Both evidence paragraphs are in plain running text under the eyebrow "Before we begin", with the folio 13, and nothing about the evidence stance is behind a tap.
- The map's chapter list carries the tricolour rail and the three colour keys, and there is exactly one set of pulses on the whole page.
- Open the one disclosure and read `knowTheDay.runs[0]` against page 12 of the PDF, word for word.
- Read every visible passage against `CONTENT_SOURCES.md`; every page number on screen matches the printed page.
- Confirm no comment, label or `aria-label` anywhere calls the page 13 markers "The Scientific Heartbeat", and no comment claims the checks are printed as display type.

**Structure and build.**
- `npm run build` clean; it type-checks too.
- **No horizontal overflow at 360, 390, 430 and 1440**, in English, French and German. The display clamps are the exposure: check `misreading.lines[0]`, the three checks, `reading.question`, `book.heading` and `cases.closing` in German at 360. If a check overflows, add a `:lang(de)` override on `--check` (`clamp(2.25rem,11vw,5rem)`) rather than lowering the floor for every English reader; a check wrapping to two lines is acceptable, three is not.
- One `h1` (the hero). The merged section contributes exactly one `h2` ("You know the day") and one `h3` ("Try something right now"); headings in order throughout.
- `id="the-day"` is gone and nothing links to it. `id="reading"`, `id="book-about"`, `id="cases"`, `id="read"`, `id="map"` unchanged. `Nav`'s "The book" link points at `#book-about`; `id="book"` remains only on the hero track; no duplicate ids on the page.
- Tap targets ≥ 44 px, including the `<summary>`.
- `alt=""` and `aria-hidden` on every decorative rule, bar, dot and pulse; the visible label carries the meaning in the pulse band.

**Reduced motion.** The hero track still collapses; the three checks are at full contrast with no transition; the first-sight fade-and-rise is off. Nothing this decision adds moves.

**No JavaScript.** With scripting disabled: every check is at full contrast (the dimming class is added by script); the `<details>` opens and closes; the pulse band, the rail, the keys and the card rules render (inline SVG and CSS, no images); every word of the page is present.

**Palette.** After the token correction, sample the page 10 dots, the map loop bars, the map keys and rail, and the four card rules: all Time marks are `#2C6E8A`, all Attention `#8C7432`, all Safety `#BF372A`. Note that the corrected Safety and `--grade-high` (`#C0392B`) are near-identical; they never appear in the same eyeful and this is the book's own choice, but confirm it on screen.

---

## Open questions for the author

1. **The order inside the new page 13 section.** The book prints the evidence note above the three pulses, and the build follows the print. If you would rather the plate came first and the two paragraphs beneath it, say so — it is a one-line reorder and it puts the graphic about half a screen earlier.
2. **The three loop colours.** The book prints Time `#2C6E8A`, Attention `#8C7432`, Safety `#BF372A`; the site currently carries lighter versions (`#4B839A`, `#988349`, `#C75043`). The build corrects the site to the print. You designed the book, so: was the lighter set a deliberate screen palette, or should the site simply use the inks?
3. **The state-line export set.** `public/images/state-line-12.png` is in fact chapter 13's artwork and `state-line-13.png` is chapter 14's; chapters 12 and 15 have no matching file; `state-line-15.png` and `state-line-12-real.png` are a different export at a different size containing a fourth ink (`#14323D`) that page 11 does not print. No per-chapter stub ships until this is resolved. If you can re-export the sixteen strips named by chapter, the map gets page 11's third printed device too.
4. **The CASE EVIDENCE rule on the cards.** The build reproduces the short coloured rule the book prints under `CASE EVIDENCE / NN` — blue on cards 00 and 02, red on 11 and 13, read from the print file. Confirm you are happy for it to appear on the site.
5. **The hero.** Outside this decision, but it is the largest saving still on the table: the hero and its scroll track are about 1.7 phone screens, and the 5 September decision already asked for the track to be shortened on narrow screens and for the words and buttons to precede the 3D book in reading order. Neither has been done. Doing it in the same pass moves the three checks onto phone screen three.
6. The seven questions at the end of `CONTENT_SOURCES.md` are still open and none of them is answered by this decision.

---

## Housekeeping that must travel with the build

- `CONTENT_SOURCES.md`: add the two new interface labels; record that `knowTheDay.runs` is a **selection** from page 12, not the page, with the omissions named; record that the three checks and the page 10 heading are set larger by the site than the book prints them, as a promotion, not as a reproduction; record the four CASE EVIDENCE rule colours with their CMYK.
- `DESIGN_SYSTEM.md`: correct the loop-colour row — the values in it were not sampled from the state line; the printed inks are `#2C6E8A` / `#8C7432` / `#BF372A`. Add the page 11 rail and keys, and the CASE EVIDENCE rule, to "Graphic devices carried over". Note that the vertical labelled state line is the chapter-opener device and is not used on the site.
- `CLAUDE.md`, "The page, in order": update to the seven sections above; `KnowTheDay` is gone, `BeforeWeBegin` is new.
- `components/KnowTheDay.tsx` is deleted. `components/CaseEvidence.tsx`'s comment is already corrected; leave it.
- `content/types.ts` gains the two label keys; `fr.ts` and `de.ts` get them by hand. Do not run `lib/make-stubs.mjs --force` — French and German are `underReview: true` and a forced run discards existing translations.


---

## Build notes, 6 September 2026, after verification

The build was verified on real screenshots by a shallow reader (8/10, from 4), a deep reader (8/10, from 6), the design director (8/10) and both translation leads (9/10, no label changed). Their fixes were applied, and five of them depart from the spec above, each for a reason found on screen:

1. **The extract teaser shows two paragraphs, not three.** Three ran to about 1.4 phone screens of unbroken prose, the one wall left on the page; all three are page 7, so no folio could honestly break them. It now ends on "A slow descent feels like holding steady." The third paragraph is on `/read`.
2. **"Be notified" is paired with the second "Read an extract" at the head of the extract section** (existing key, `status.notifyCta`), because from page 10 onward a phone had no signup route on screen; the extract button is the filled `btn-solid` so it reads as a control.
3. **The pulse row is centred in its cells, as page 13 prints it**, not left-aligned; the trace is capped at 260 px so it is never stretched flatter than the printed mark. The LOW label uses a darker ink (`--grade-low-ink`) than the LOW trace so it passes contrast; the trace keeps the book's faded grey.
4. **The chapter list runs column-major (00 to 07, then 08 to 15) and carries no rules**, as page 11 sets it. The map's folio is 11, the page of its eyebrow; the page 13 sorting-tool paragraph carries its own folio. Page 10 now carries its folio too.
5. **The checks' resting state is legible** (opacity 0.45, not 0.2) and they brighten as soon as they are well inside the viewport, so a fast thumb or a screenshot never catches three ghosted lines; in German all three were pale at once.

Also applied: the evidence note in two registers (the first paragraph a step up, the second body); `reading.afterResult` at body size and ink, as printed; the map's three system names as labels, not headings, and the map owning an `h2`; "Before we begin" as an `h2`; duplicate list labels removed; the disclosure's plus and minus hidden from screen readers; a `:lang(de)` measure on the book heading; shorter joins around the cards and the extract. The French lead measured the French checks at two lines each and asked for no override; the German lead confirmed the German override holds at 360.


---

## Cut back by the author, 6 September 2026, from her phone

Seen live and crossed out: all of page 12 ("You know the day" and the disclosure); the page 20 heading ("Same morning. Same paragraph. Same Katrin…") and the page 20 Katrin paragraph; her own "Over sixteen days, Katrin moves…" paragraph; page 14's "This book does not replace professional support…" ("this is a book launch!"). She also asked for the Investigation to sit higher and the case cards lower, and for the cream ground back. The page now runs: cover; page 10; page 11 (the Investigation, with its keys and rail); page 13, the checks and the question; page 13's markers; her line and "who it is for"; the extract; the case cards; the three systems and page 226; the author; the closing question. The retired keys were removed from `content/types.ts` and all three content files; `MapOfBook.tsx` became `Investigation.tsx` and `ThreeSystems.tsx`.
