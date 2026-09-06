# REDESIGN — the canonical decision

Editorial Director, 6 September 2026. This document is what the engineer builds from.
It governs `app/[lang]/page.tsx`, `components/`, `content/*.ts`, `content/types.ts` and
`app/globals.css`. Where it disagrees with `DESIGN_SYSTEM.md`,
`translation/EDITORIAL-POSITIONING.md` or `translation/HOOK-DECISION.md`, this wins and
those files are amended to match. Where the author's brief
(`brief/REDESIGN-BRIEF.md`, 6 September 2026) disagrees with this document, her brief
wins — the four places I have departed from it are marked **DEPARTURE** with the reason.

The one rule is unchanged. Every user-visible string below is tagged
`[PRINTED …]`, `[AUTHOR …]`, `[INTERFACE]` or `[COPY NEEDED]`. There is no fifth
category, and nothing in this document was written for the site.

---

## THE DECISION

The site does not have too much design; it has too much explanation, and the explanation
is the book's own, which is why nobody has been willing to cut it. Twelve sections and
roughly 1,210 visible words are spent saying one thing — your first reading is not the
whole story — and several of them say it twice: 06:38 and 22:47 appear as page 10
readings and again as case panels five screens later, "Investigation" fills two
consecutive screens at display size, and page 13's question returns eight thousand pixels
later as page 225's. So: twelve sections become eight, and about 1,210 visible words
become about 690. Almost every cut is authorised — her brief replaces page 13's 169 words
of evidence prose with seventeen of her own, her §9 hands over the relocation list, and
her §27 is the test I would have applied anyway. The one place her brief cannot be
followed as written is §2's Premise: the book's interior does not supply 70 to 120 words
at that position, and rather than write the difference I have taken the passage the object
already owns — the back cover, which is printed, is exactly 63 words, and is the one
paragraph on the whole book written to make a stranger pick it up. The three checks she
particularly likes stay, at display size, on one screen, undimmed: they are the second
movement of section 2, and they are the only moment on this site where the reader does
something instead of reading something. Two things go that nobody will miss and one that
someone will: the 3D book, which is a mockup with a 64-per-cent-inflated spine and a
32-per-cent gloss on a page whose brief forbids both; the site's four remaining slogans;
and the sixteen-chapter map, which is beautiful and which relocates whole to /press.

---

## THE CANONICAL ARCHITECTURE

Eight sections. Section ids are English in all three languages and are a structural
contract, not a translation choice: `#premise`, `#variables`, `#moments`, `#evidence`,
`#read`, `#author`, `#closing`, `#notify`.

---

### 1. HERO — `Hero.tsx` (rebuilt; `Book3D.tsx` retired)

**Purpose.** The book as an object, its title, and no more than two decisions.

**Strings**

| String | Tag |
|---|---|
| "State." | `[PRINTED half title p.1, title page p.3, front cover]` |
| "Not Situation" | `[PRINTED half title p.1, title page p.3, front cover]` |
| "A field guide to the moment before interpretation becomes reality" | `[PRINTED front cover]` |
| "Your first reading is not the whole story." | `[PRINTED front cover]` |
| "by" | `[INTERFACE]` |
| "Ivana Budišin" | `[PRINTED front cover, title page p.3]` |
| "Publishing soon" | `[INTERFACE]` |
| "Read an extract" | `[AUTHOR, brief §8.1]` |
| "Publication updates" | `[AUTHOR, brief §8.1]` |
| Cover alt text | `[INTERFACE]` |

**Content keys.** `hero.titleA`, `hero.titleB`, `hero.subtitle`, `hero.strap`,
`hero.authorPrefix`, `hero.coverAlt`, `hero.readCta`, `status.forthcoming`,
`status.notifyCta`.
**Retire:** `hero.eyebrow`, `hero.scrollHint`, `hero.openAlt`, `a11y.bookOpening`.
**Change:** `status.notifyCta` value becomes "Publication updates".

**Treatment.** Title at COVER, two lines, red full stop kept. Subtitle at LEAD in
`--ink`, not red — three red lines in French turn the accent into a block. Strap at BODY.
Byline at LEAD serif. Status at LABEL mono. Two text actions, "Read an extract" primary
in `btn-red`, "Publication updates" in `btn`; they stack on a 0.75rem gap where they must,
and the stacked state is designed, because German always stacks.
The cover is flat, front-on, still, with one shadow: `0 24px 48px -24px rgba(17,17,17,.35)`
plus a 1px right edge at `rgba(17,17,17,.10)`. This is the site's only shadow.
*Phone:* eyebrow row gone; title → subtitle → **cover at 72vw** → strap, byline, status,
actions. The cover is above the actions, not 990px below them (brief §25). Hero capped at
one viewport plus the cover.
*1440:* words in columns 1–6, vertically centred in `min-height: calc(100svh - 3.5rem)`;
cover 380px in columns 8–12, optical centre aligned to the centre of the title block, and
running taller than the text column. That height difference is the whole of its authority.

**Must not carry.** The 3D book, `--open`, `.hero-track`, `.hero-stage`, `.hero-hint`,
the rAF scroll listener, `.book__gloss`, the inflated `--bd`. "Time · Attention · Safety"
— printed on the cover eight centimetres away and the entire headline of section 3.
"Scroll". A third action. Any credential not in her own words (see open question 2).
Budisin Publishing in any form: with the title page gone, the imprint lives in the footer
only, which is what §11 asks.

---

### 2. THE PREMISE — `Premise.tsx` (new; replaces `Misreading`, `TheReading`, `BeforeWeBegin`'s prose, `TheBook`)

**Purpose.** State the mechanism, then make the reader perform it; nothing else on the
homepage explains the book.

Two movements, one rule and one full section space between them.

#### Movement one — the mechanism

| String | Tag |
|---|---|
| "The first misreading" | `[PRINTED p.10 eyebrow, and back cover eyebrow]` |
| "The body is a sensor before it is a narrator." | `[PRINTED p.181; reinstated AUTHOR, brief §4]` |
| "Nothing went wrong on this day." | `[PRINTED p.10]` |
| "The instruments were working." | `[PRINTED p.10]` |
| "The data was there the whole time." | `[PRINTED p.10]` |
| "We usually treat these moments as information about life: the person, the task, the relationship, the day." | `[PRINTED back cover]` |
| "But the first reading is often not the whole story." | `[PRINTED back cover]` |
| "Before the mind explains, the body has already voted. Sleep pressure, hunger, timing, attention, threat detection, memory, and prediction quietly shape what feels true." | `[PRINTED back cover]` |
| "Then the mind arrives second and gives that feeling a reason." | `[PRINTED back cover]` |
| "10" | `[INTERFACE — printed folio]` |

Nine words plus sixteen plus sixty-three: eighty-eight, inside her 70–120, assembled from
two printed pages and the printed jacket, with no word changed and no sentence bridged.

**DEPARTURE (§2).** Her brief proposes the Premise be written to 70–120 words; the book's
interior does not supply them at that position (page 12 is cut, page 13 belongs to the
reading, page 10 is 25 display words), so the mechanism paragraph is the back cover's own
— printed, sixty-three words, and the only passage on the object written to make a
stranger pick the book up. See open question 1.

**DEPARTURE (Creative Director, Copy Editor).** Both desks would set page 10's heading as
the section's display line. It sits at LEAD instead: her brief proposes the sensor line as
the Premise's opening and names it crucial, and putting the site's largest type on the
hook and its smallest on the mechanism is the opposite of what §2 asks the section to do.

#### Movement two — the reading

| String | Tag |
|---|---|
| "Try something right now" | `[PRINTED p.13]` |
| "Whatever you are feeling as you read this sentence." | `[PRINTED p.13]` |
| "Check your jaw." | `[PRINTED p.13]` |
| "Check your breath." | `[PRINTED p.13]` |
| "Check your shoulders." | `[PRINTED p.13]` |
| "What you found is a reading." | `[PRINTED p.13]` |
| "13" | `[INTERFACE — printed folio]` |

**This is the moment the author has said she particularly likes, and it stays.** It is
kept large and it is kept whole. What is fixed is the two faults that made it look broken,
not the moment: it will no longer take three phone screens to deliver nine words, and it
will no longer sit at 45 per cent opacity waiting for an observer to switch it on.

**Content keys.** Rename `misreading` → `premise`: `premise.eyebrow`, `premise.sensorLine`
(new), `premise.lines[]`, `premise.mechanism[]` (new, four printed sentences),
`premise.folio`. Keep `reading.eyebrow`, `reading.lead`, `reading.steps[]`,
`reading.result`, add `reading.folio`.
**Retire:** `misreading.investigationLabel` and `misreading.investigation` (→ /press),
`misreading.readingsLabel`, `misreading.readings[]`, `misreading.closing[]`,
`reading.afterResult`, `reading.question`, `map.evidenceIntro`, `map.evidenceMarkers`,
`map.evidenceEyebrow`, the whole `book` block, `a11y.misreadingRegion`.
**Move:** `book.paragraphs[0]` → `excerpt.lead`; `book.readers` → `author.readers`.

**Treatment.** Movement one: eyebrow at LABEL red; sensor line at DISPLAY, alone, max
30ch; page 10's three lines at LEAD, each on its own line, `--space-tight` between; the
mechanism at BODY, 62ch, four paragraphs; folio at LABEL mono.
Movement two: eyebrow at LABEL red; lead at BODY; the three checks at DISPLAY, all three
on one screen, one size, no dimming, no `IntersectionObserver`; result at LEAD; folio.
*Phone:* one column; movement one ≈ 900px, movement two ≈ 700px.
*1440:* eyebrow and folio in columns 1–3, everything else in 4–11.

**Must not carry.** Page 10's five readings — the timestamps are spent in section 4 with
their verification, and spending them twice is the page's largest single redundancy.
"The body speaks first." / "The mind explains second." — the same proposition as the sensor
line, printed on the cover behind it, and the third statement of it in two screens.
"This book is the / Investigation." (→ /press). Page 13's 169 words of evidence prose.
Page 13's question "Is this the situation? Or is this the state?" — the reader meets page
225's at the close and two near-identical questions on one page reads as a loop.
`--check` at 6rem, `.reading-list.is-dimmed`, `.reading-step.is-on`.

---

### 3. TIME. ATTENTION. SAFETY. — `Variables.tsx` (new; replaces `ThreeSystems`)

**Purpose.** The three variables, once, as an editorial spread, so the reader has three
questions to ask before meeting three moments.

| String | Tag |
|---|---|
| "Time" · "Attention" · "Safety" | `[PRINTED front cover, p.11, pp.13–14]` |
| "They are not brain regions or neural pathways." | `[PRINTED p.13]` |
| "They are a sorting tool, a way to ask three questions when everything feels wrong at once." | `[PRINTED p.13]` |
| Time — "Sleep, food, caffeine, circadian phase, recovery. When the timing is off, baseline sensitivity rises. The same world feels harsher." | `[PRINTED pp.13–14]` — 19 words |
| Attention — "The system that tracks reward, novelty, and the next cue. When it is captured, focus narrows to the cheapest available input, and the expensive work feels hard." | `[PRINTED p.14]` — 27 words |
| Safety — "The system that monitors threat, and especially social threat. It is fast, it is old, and it is biased toward false alarms. It produces interpretations that feel like facts." | `[PRINTED p.14, one whole sentence removed]` — 29 words |
| "13" | `[INTERFACE — printed folio]` |

Safety's "Things like social evaluation, exclusion, ambiguity, status." is removed: seven
words of examples before the reader has the mechanism, and the only reason Safety ran to
twice the length of Time. The three now share one shape — line one says what the system
is, line two says what it does to you — which is what makes a spread read as designed
rather than as three paragraphs of different lengths. Record the omission in
`CONTENT_SOURCES.md`.

**Content keys.** New `variables` block: `variables.sortingLines[]` (the two printed
sentences), `variables.loops[]` (the existing `Loop` interface, unchanged),
`variables.folio`. **Retire:** `map.sortingTool` from the homepage (→ /press in full),
`map.eyebrow` here, `a11y.mapRegion`.

**Treatment.** No eyebrow — the three words are the heading. Each word at COVER, in its
own ink (Time `#2C6E8A`, Attention `#8C7432`, Safety `#BF372A`); the word carries the
colour, so the coloured left rules come out. The two printed sentences at BODY beneath the
three words, where "They" now points at the display words above — which reads better here
than it does in the book. Definitions at BODY. Time's first unit set in mono, because the
site reserves mono for anything measured and a specification list under a very large word
then reads as intentional rather than as a short paragraph beside two longer ones.
`--space-section × 1.5` above and below; nothing else on the screen.
*Phone:* three stacked blocks, hairline between, word at COVER (clamps to 44px), ≤1,100px
total. Not a horizontal scroller, not a carousel.
*1440:* columns 1–4 / 5–8 / 9–12, three words on one baseline, definitions beneath.
German takes DISPLAY in place of COVER here only (`:lang(de)`), because AUFMERKSAMKEIT at
72px overruns a four-column band between 1024 and 1280.

**Must not carry.** The 48-word `map.sortingTool` — it opens "The chapters that follow",
which on a website points at nothing. Feature cards, icons, a symmetrical three-up box
grid, chapter numbers, coloured left rules, the page 226 paragraphs.

---

### 4. THREE MOMENTS — `Moments.tsx` (renamed from `CaseEvidence.tsx`)

**Purpose.** Three timestamps that make the premise concrete, each with the book's own
falsification line under it. Curiosity, not explanation.

| String | Tag |
|---|---|
| "16 cases. Three readings. One question: state or situation?" | `[PRINTED p.11]` |
| "Case evidence" / "00" / "Page 16" / "06:38" / ""Something is off."" / "Input" / "Two minutes before the alarm." / "Verified event" / "Nothing has happened." | `[PRINTED p.16]` |
| "Case evidence" / "02" / "Page 28" / "22:47" / ""ok."" / "Input" / "Two letters. One full stop." / "Verified tone" / "None." | `[PRINTED p.28]` |
| "Case evidence" / "11" / "Page 150" / "16:00" / ""Something is wrong with my life."" / "Input" / "Six ordinary events. One depleted day." / "Verified crisis" / "None." | `[PRINTED p.150]` |
| "It said I am failing; the data was I am tired." | `[PRINTED p.20]` |
| "20" | `[INTERFACE — printed folio]` |

The page 11 line is the section's heading, not the map's. It is the only place a reader
learns the book has sixteen cases, and it is the answer to the overclaim risk: three
panels out of sixteen read as a sample, where three panels out of nothing read as a law.

**Content keys.** `cases.line` (new, moved from `map.mapLine`), `cases.items[]` cut from
four to three, `cases.pageLabel`, `cases.closing`, `cases.closingSource`.
**Retire:** `cases.eyebrow`, `cases.items[3]` (chapter 13, 22:40 → /press),
`a11y.casesRegion` (replaced by the visible heading).

**Treatment.** No box, no `--page` background, no border, no internal rule. The printed
28 × 1.6pt rule under each CASE EVIDENCE label **stays** in the page's own ink — with the
chapter map relocated, the system inks are now used in exactly two places on the homepage
(the three variables, and these rules), which is inside budget.
Mono label at LABEL; timestamp at DISPLAY; quote at LEAD; INPUT / VERIFIED as LABEL + BODY
pairs; page folio at LABEL. Roughly 380px of air per moment — the printed page gives each
of these a whole leaf, and that air is what makes it land.
*Phone:* three moments separated by a full-width hairline, ≈220–380px each.
*1440:* the mono label hangs in columns 1–3 opposite the timestamp, the way a printed
marginal folio sits opposite its text; the moment occupies 4–11. Not four abreast.

**DEPARTURE (Creative Director).** The coloured tick rule is kept, not deleted: it is
printed on the page being reproduced, and with the chapter map's rail and keys gone it is
the second of two uses of the system inks, not the fourth.

**Must not carry.** A fourth panel. The section-level "Case evidence" eyebrow standing
above panels each already printing "Case evidence / nn" — the phrase currently appears
five times in one section. A boxed grid. Any sentence explaining what the panels
demonstrate.

---

### 5. EVIDENCE — `Evidence.tsx` (replaces `BeforeWeBegin.tsx`)

**Purpose.** Show that the book grades its own claims. Sober, almost academic.

| String | Tag |
|---|---|
| "Evidence" | `[AUTHOR, brief §8.5]` |
| "High" / "Medium" / "Low" | `[PRINTED p.13]` |
| "Replicated or robust evidence." | `[AUTHOR, brief §8.5]` |
| "Suggestive evidence with meaningful uncertainty." | `[AUTHOR, brief §8.5]` |
| "Plausible hypothesis or emerging evidence." | `[AUTHOR, brief §8.5]` |
| "These markers exist because the book's own risk is the same risk it describes." | `[PRINTED p.13]` |
| "13" | `[INTERFACE — printed folio]` |

About 31 words, down from 169. This is the largest single saving on the page and it costs
the site no fact.

**Content keys.** New `evidence` block: `evidence.title`, `evidence.grades[]` — the
`EvidenceGrade` interface gains a `description: string` field — `evidence.closing`,
`evidence.folio`. **Retire:** `map.evidenceIntro`, `map.evidenceMarkers`,
`map.evidenceEyebrow`, `map.grades[]`, `a11y.evidenceRegion` (replaced by the visible
heading).

**Treatment.** `h2` "Evidence" at HEAD. Three cells across the text column, the existing
`EvidencePulse` traces, hairline verticals only — no top or bottom rule, because page 13
prints none. Label at LABEL mono caps; description at BODY. The printed closing sentence
at BODY beneath, then the folio.
*Phone:* three rows, hairline between, trace at the text column's full width, no box, no
full-bleed. Three six-word descriptions cannot sit three-up in 110px, so below 400px the
row recomposes to three full-width rows, trace left, words right. This overrules
`DESIGN_SYSTEM.md`'s "never stacked": the author's descriptions win and the layout adapts
to them.
*1440:* three cells across columns 4–11.

**Must not carry.** Any count of references, DOIs or corrections — that machine-written
press-pack material is what this whole provenance regime exists to keep out. The page 226
Scientific Heartbeat paragraphs, which are about the back matter, not about the markers.
The full-bleed `.pulse-band` negative margins and their top and bottom borders. Any
gamification: no percentages, no bars, no counters.

---

### 6. EXTRACT — `ExcerptTeaser.tsx` (shortened)

**Purpose.** Prove the writing, then get out of the way.

| String | Tag |
|---|---|
| "Before the chapters" | `[PRINTED p.226]` |
| "The pilot" | `[PRINTED p.226]` |
| "It is less interested in teaching you to trust your instincts than in showing you what, exactly, you are trusting." | `[AUTHOR, chat 5 September 2026]` |
| Paragraph 1, "On the evening of 16 July 1999 …" | `[PRINTED p.7]` |
| Paragraph 2, "The sky was clear when he departed … A slow descent feels like holding steady." | `[PRINTED p.7]` |
| "Continue reading" | `[AUTHOR, brief §8.6]` |
| "7" | `[INTERFACE — printed folio]` |

**Content keys.** `excerpt.title`, `excerpt.sectionLabel`, `excerpt.lead` (new, from
`book.paragraphs[0]`), `excerpt.paragraphs[0..1]` via `excerpt.teaserCount`,
`excerpt.continueCta`, `excerpt.folios[0]`.
**Retire from the homepage:** `excerpt.eyebrow`, `excerpt.cta` (the head CTA),
`excerpt.runningHead`. **Move:** `excerpt.closing` and `excerpt.closingSource` render on
/read only.

**Treatment.** Background changes to `--page` — the clearest signal on the site that you
have stepped inside the book, and nearly free. `h2` at HEAD; mono section label; her line
at LEAD; two paragraphs at BODY with the drop cap, held to 62ch; then "Continue reading"
over a hairline with the folio at its right end. **Keep that folio detail exactly as
built** — it is the best small piece of typography on the site.
*Phone:* one column, one action at the foot.
*1440:* label column 1–3, prose 5–10 at 62ch, not running to column 11 as it does now.

**Must not carry.** The "Read an extract" / "Be notified" pair at the section head — the
third and fourth appearance of the same two actions, existing only because the mobile bar
had no in-page links, which the menu now fixes. The 78-word page 26 block — a second
excerpt after the excerpt; it goes to /read, where "the warships" has been read. A third
paragraph. `btn-solid` anywhere in this section.

---

### 7. AUTHOR — `Author.tsx`

**Purpose.** A face, a credential, and the answer to "is this for me?" at the moment the
reader is deciding.

| String | Tag |
|---|---|
| "Ivana Budišin" | `[PRINTED front cover, title page p.3]` |
| "Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book." | `[AUTHOR, chat 4 September 2026]` |
| "For anyone who has ever been certain about what a situation meant, then discovered that something else was happening. And for readers interested in the psychology of how we notice, interpret and revise the world around us." | `[AUTHOR, chat 5 September 2026]` |
| "Press" | `[AUTHOR, brief §21]` |
| Photograph alt text | `[INTERFACE]` |

Five lines, which is brief §8.7's "approximately three to five".

**Content keys.** `author.title`, `author.photoAlt`, `author.bio`, `author.readers`
(new, from `book.readers`), `author.pressLabel`.
**Retire:** `author.eyebrow`, `author.contactLabel` on the homepage, `author.websiteLabel`,
`author.photoPlaceholder` if `press.authorPhoto` is non-null at build.

**Treatment.** No eyebrow; `h2` is her name at HEAD. Photograph cropped square to head and
shoulders, warm monochrome consistent with the ink palette, capped at 240px on a phone —
it currently runs the full 434px column and dominates the section more than the cover
dominates the hero. The untouched original stays in the press kit at full colour; picture
desks want the raw file. Bio and readers at BODY. One text link.
*Phone:* photo, then name, then two paragraphs, then the link.
*1440:* photo in columns 1–4, name and prose in 6–10.

**Must not carry.** A CV, an institution, or anything from `Press Pack/01_Copy/`. A
"Contact" mailto — the footer carries it, and a mailto beside a biography reads as a
practice enquiry, which is the adjacency §11 asks us to avoid. The imprint. A second link.

---

### 8. CLOSING — `Closing.tsx` (merged with `Launch.tsx`)

**Purpose.** End once, quietly, on the book's last sentence and the cover's own line, with
the only remaining action.

| String | Tag |
|---|---|
| "Is this the situation? Or is this their state?" | `[PRINTED p.225, the book's last sentence]` |
| "225" | `[INTERFACE — printed folio]` |
| "Same life. Different instrument settings." | `[PRINTED front cover foot, title page p.3, foot of p.11; AUTHOR names it the closing thought, brief §4 and §8.8]` |
| "Publication updates" | `[AUTHOR, brief §8.1]` |
| "Email address" | `[INTERFACE]` |
| "your@email.com" | `[INTERFACE]` |
| "Notify me" | `[INTERFACE]` |
| "Used for this notification only." | `[INTERFACE]` |
| success / error strings | `[INTERFACE]` |

The question first, the cover line last: she names the cover line the closing thought, and
ending a launch page on a question immediately above an email field makes the question
read as a marketing hook rather than as a book's last sentence.

**Content keys.** `closing.question`, `closing.source`, `closing.line` (new, moved from
`footer.madeLine`), `status.updatesHeading` (new, replaces `status.notifyHeading`),
`status.emailLabel`, `status.emailPlaceholder`, `status.submit`, `status.success`,
`status.error`, `status.privacyNote`.
**Retire:** `status.notifyHeading`, `status.mailtoLabel`; keep `status.mailtoSubject` /
`mailtoBody` only as the offline fallback, never as the shipped path.
`Launch.tsx` is deleted and `Notify.tsx` renders inside `Closing.tsx`, so the page ends
once. `Notify.tsx` and `Launch.tsx` both declare `id="notify-title"` today; after the
merge there must be exactly one `h3` with that id.

**Treatment.** Question at DISPLAY, alone, `--space-section × 1.5` around it; folio; cover
line at LEAD beneath. Then `h3` "Publication updates" at HEAD, the field, the submit
button, one line of privacy note. The solid red block button appears **exactly once on the
whole site**, here, because a form control must read as a control and not as a link.
*Phone:* field full width at `min-h-12`, button stacked below — both already correct.
*1440:* closing line in columns 4–11, notify block in 4–8.

**Must not carry.** "Publishing soon" a second time. "Be notified when the book is
released." above a button reading "Email me to be notified" — one imperative per form.
A second CTA. Any restatement of an earlier claim.

---

### FOOTER — `Footer.tsx` (all pages)

Red band with "Before you believe the story." `[PRINTED back cover band]`, reversed
tracked caps. Section links: Book · Extract · Author · Press · Contact `[AUTHOR, brief
§21 / INTERFACE]`. Legal line: "© 2026 Budisin Publishing" `[PRINTED copyright page p.4]`
· "ISBN 978-2-87996-258-0" `[PRINTED p.4]`. That is where the imprint belongs, and it
appears once.

**Retire:** `footer.method[]` — page 278's "Read the dashboard. Delay the story. Take the
reading again." The front cover already prints READ THE DASHBOARD / BEFORE YOU BELIEVE THE
STORY and is on screen at the top of the page; setting the three-line version as type in
the footer of every page turns a printed device into the site's only imperative
instruction to the reader and its most self-help sentence (§12, "repeated three-part
slogans"). `footer.madeLine` — the cover line is now the Closing, and it cannot be both
one screen apart. The second imprint line `{publisher.name}, {publisher.place}`, which
currently prints beside "© 2026 Budisin Publishing" as two adjacent identical names. The
repeat of the full primary nav, which existed only because the phone bar hid it.

---

## WHAT MOVES AND WHAT GOES

**Homepage sections: 12 today → 8.**
**Visible words: about 1,210 → about 690, a 43 per cent reduction.**
**Phone scroll at 390px: about 11,900px → about 7,400px, a 38 per cent reduction.**

Both figures exceed the brief's 25 to 35 per cent, and deliberately. Her target counts
pixels; the real excess is in paragraphs. Nearly the whole reduction comes from
repetition, apparatus and relocation — the hero track, the chapter map, the 169 words of
evidence prose, the page 226 note, the duplicated CTAs, the fourth case panel and the
section padding. Her authored sentences are almost untouched: of the words removed, four
are hers (the `book` section's two paragraphs, which both survive elsewhere on the
homepage) and the rest are the book's own front matter, repeated devices, or interface
labels. Anyone who reaches the number by trimming her prose has met the target and failed
the brief.

| Section / string | Decision | Reason |
|---|---|---|
| **`Hero`** | Shorten | Words right; the object and the interaction wrong. |
| `hero.eyebrow` "Time · Attention · Safety" | Delete | Printed on the cover beside it and the entire headline of section 3. |
| `hero.titleA` / `titleB` / `subtitle` / `strap` | Retain | Named in brief §8.1. |
| `hero.scrollHint` "Scroll" | Delete | A page that tells you to scroll is telling on itself; §26 generic CTA language. |
| `hero.openAlt`, the 3D book, `.hero-track`, `.hero-stage`, `.hero-hint`, `--open`, `.book__gloss`, `--bd: 0.19` | Delete | §18 forbids mockups that cheapen the object and unnecessary 3D; §19 forbids scroll choreography. The spine is 64% past the printed 0.116 ratio and the gloss is a 32% white sheen — both rationalised in writing in `DESIGN_SYSTEM.md`, which is how a device survives a review it should have failed. |
| **`Misreading`** | Shorten into `Premise` | Best editorial moment on the site; carries three redundancies. |
| `misreading.eyebrow` | Retain | Printed on p.10 and on the back cover. |
| `misreading.lines[]` | Retain | Printed p.10; now at LEAD. |
| `misreading.readingsLabel` + `readings[]` | Delete | 06:38 and 22:47 return as case panels five screens later; the timestamps are stronger once, with their verification. |
| `misreading.closing[]` "The body speaks first." / "The mind explains second." | Delete | Same proposition as the sensor line, printed on the cover behind it. §4: use strong lines sparingly. |
| `misreading.investigationLabel` + `investigation` | Relocate to /press | Heads the chapter map, where the Investigation actually is; the stronger of the two printed settings, replacing `map.investigationTitle`. |
| **`Investigation`** | Relocate to /press | §9 names the detailed chapter map. Two phone screens of a table of contents for a book nobody can buy, colour-keyed to a system defined seven sections later. |
| `map.chapters[]`, `.map-rail`, `.map-keys`, `map.pageColumn` | Relocate to /press | Whole, with page numbers and colour keys. |
| `map.investigationTitle` "The Investigation" | Delete | Superseded by p.10's stronger setting; "Investigation" currently fills two consecutive screens at display size. |
| `map.mapLine` "16 cases. Three readings…" | Relocate to §4 | Becomes the Three Moments heading; the only evidence of scale left on the homepage. |
| **`TheReading`** | Retain, compress | The only moment where the site does something to the reader. |
| `reading.eyebrow` / `lead` / `steps[]` / `result` | Retain | Movement two of the Premise. |
| `reading.afterResult` (34 words) | Delete | Explains the reading the reader has just taken; §27. |
| `reading.question` | Delete | Page 225 is the close; two near-identical questions on one page reads as a loop. |
| **`BeforeWeBegin`** | Shorten, hard → `Evidence` | 169 words of the book explaining its own apparatus. |
| `map.evidenceIntro` (64 w) | Delete | Its three middle sentences are the prose form of HIGH/MEDIUM/LOW, which is now the row. |
| `map.evidenceMarkers` (105 w) | Delete | Describes in prose the red, orange and grey heartbeats shown in the row directly beneath it. Superseded by her own three descriptions. |
| `map.grades[]` | Retain, extended | Gains her `description` field. |
| **`TheBook`** | Delete as a section | Both her lines survive: `paragraphs[0]` → head of the Extract, `readers` → Author. The lines work; the section does not. |
| `book.eyebrow`, `book.readersEyebrow` | Delete | Interface labels dressed as book furniture; §26 repeated explanatory subheadings. |
| **`ExcerptTeaser`** | Shorten | Two paragraphs of the pilot is right. |
| `excerpt.cta` + notify pair at the head | Delete | Third and fourth appearance of the same two actions; the code comment justifying them stops being true once the phone has a menu. |
| `excerpt.eyebrow` "Read", `excerpt.runningHead` | Delete | An interface label as an eyebrow; a printed folio imitated on a page that is not the book. |
| `excerpt.closing` + `closingSource` (p.26, 78 w) | Relocate to /read | A second excerpt after the excerpt. At the foot of the complete extract, "the warships" has been read — which also answers `CONTENT_SOURCES.md` open question 6. |
| `excerpt.paragraphs[0..1]`, drop cap, folio rule | Retain | The best small typography on the site. |
| **`CaseEvidence`** | Shorten to three → `Moments` | §8.4 names 06:38, 22:47, 16:00. |
| `cases.eyebrow` | Delete | "Case evidence" appears five times in one section; each panel prints its own. |
| `cases.items[0..2]` | Retain | Printed pages 16, 28, 150. |
| `cases.items[3]` (13 / p.182 / 22:40) | Relocate to /press | Hands the reader the title as a resolution and is the least curious of the set. |
| `.case-card` border and `--page` ground, the four-up grid | Delete | The printed page prints no box; §26 unnecessary cards and symmetrical grids. |
| `.case-card__rule` | Retain | Printed on the page; second of two remaining uses of the system inks. |
| `cases.closing` (p.20) | Retain | The best short sentence in the book; closes the section alone, at size. |
| **`ThreeSystems`** | Relocate up and split → `Variables` | The organising frame belongs at position 3, not 10. |
| `map.sortingTool` (48 w) | Relocate to /press | Opens "The chapters that follow", which on a website points at nothing. Two printed sentences survive here. |
| `map.loops[]` | Retain, one cut | Safety loses "Things like social evaluation, exclusion, ambiguity, status." for parity. |
| `map.heartbeat[]` + `map.mapFooter` (p.226) | Relocate to /press | Back matter about an unpublished book's reference apparatus; already in `press.description`. |
| **`Author`** | Retain, give it more to say | Correct and restrained, and slightly empty. |
| `author.eyebrow`, `contactLabel`, `websiteLabel` | Delete | Interface eyebrow; the footer carries contact. |
| author photograph treatment | Change | Square crop, warm monochrome, 240px cap on phone. Not a reshoot — a crop and a scale. |
| **`Closing`** + **`Launch`** | Merge | The page currently ends twice. |
| `closing.question` (p.225) | Retain | The book's last sentence, and now unique on the page. |
| `status.notifyHeading` | Delete | The heading and the button are the same sentence twice. |
| `status.notifyCta` "Be notified" | Rename | "Publication updates" — her wording, brief §8.1. "Be notified" makes the reader the object of the site's marketing. |
| **`Nav`** | Rebuild | Below 640px the only link is PRESS — the one a general reader wants least. |
| `nav.book` "The book" → "Book"; `nav.read` "Read" → "Extract" | Rename | Brief §21's own words. `#book-about` no longer exists; repoint to `#premise`. |
| **`Footer`** | Shorten | Four separate book quotations compete at the foot. |
| `footer.method[]` (p.278) | Delete | The front cover already prints it; as type it is the site's only imperative and its most self-help sentence. |
| `footer.madeLine` | Move to `closing.line` | It cannot be the closing thought and a footer trinket one screen apart. |
| duplicate `{publisher.name}, {publisher.place}` | Delete | Prints "Budisin Publishing" twice on one row. |
| footer section list | Shorten | Existed only because the phone bar hid it. |
| **`Companion`** | Delete the component | Off in config, holding an unresolved `[COPY NEEDED]`; do not ship dead code. Retire the `companion` block from `types.ts`. |
| **`Listen`** | Retain, unchanged | Gated on `audioUrl`; nothing to decide until she answers question 7. |
| `a11y.languageComing` | Delete | All three languages are browsable; the greyed branch is dead and invisible on touch. |
| **`/read`** | Retain, add | Does exactly one thing. Gains the p.26 block, the notify form, a language switcher, a Press link and a footer. |
| **`/press`** | Retain, add | The strongest page on the site. Receives everything the homepage sheds. |

**Two measurements after launch, not questions for the author.** (1) Clicks from the
homepage into /read and /press before and after the chapter map moves; if it fails, the
cheap recovery is one line under the Extract linking to the map on /press — do not restore
the section. (2) Scroll depth to the Extract on mobile; if it collapses, the recovery is
the persistent phone action the UX desk specified, not CTAs planted in the Premise, the
Moments and the Evidence.

---

## THE TYPE SCALE AND SPACING

The single source for the build. Six steps, and nothing outside them. Four families, one
job each, never two of them at the same size adjacent. Serif = IvyPresto Display, 400,
never bold. Body = Source Sans 3. DIN Alternate = navigation and section labels. IBM Plex
Mono = measured values only (times, folios, ISBN, status).

| Step | Family | Clamp | Line height | Tracking | Measure |
|---|---|---|---|---|---|
| **COVER** | serif | `clamp(2.75rem, 7vw, 4.5rem)` | 1.02 | −0.012em | column |
| **DISPLAY** | serif | `clamp(2.25rem, 6.2vw, 3.75rem)` | 1.06 | −0.008em | max 30ch |
| **HEAD** | serif | `clamp(1.75rem, 3.4vw, 2.5rem)` | 1.12 | −0.005em | max 24ch |
| **LEAD** | serif | `clamp(1.3rem, 1.8vw, 1.6rem)` | 1.30 | 0 | max 40ch |
| **BODY** | sans | `clamp(1.0625rem, 0.95rem + 0.4vw, 1.1875rem)` | 1.58 | 0 | max 62ch |
| **LABEL** | DIN 700 / Plex 400 | `0.75rem` fixed | 1.35 | 0.16em / 0.08em | — |

COVER is used twice on the site: the book title in the hero, and the three variables in
section 3. Nowhere else, ever. DISPLAY: at most three per page — the sensor line, each
case timestamp, the closing question. HEAD: **every** section title, without exception —
one treatment, which is the single change that most repairs §17. LEAD: the one pulled
sentence inside a section. BODY: all prose; no second prose size. LABEL: every eyebrow,
nav item, button, folio, status line, INPUT/VERIFIED label — one size replaces the current
six.

Phone (390): 44 / 36 / 28 / 20.8 / 17 / 12px. Desktop (1440): 72 / 60 / 40 / 25.6 / 19 /
12px. Ratios 1.20 / 1.50 / 1.56 / 1.35 / 1.58 — wide enough that no two steps are ever
mistaken for a mistake.

**Fourteen of the eighteen current display ramps and five of the six sub-0.8rem label
sizes are deleted.** The current state did not begin with eighteen ramps; it began with a
good scale and eighteen local decisions. A section that will not fit the scale is a
section that needs rewriting, not a section that needs a new size.

**Spacing — three values, and nothing else.**

```
--space-section  clamp(4.5rem, 8vw, 7.5rem)   padding-block on every section
--space-block    clamp(2rem, 3.5vw, 3rem)     between blocks inside a section
--space-tight    1.1em                        paragraph to paragraph, label to value
```

Sections 3 and 8 multiply `--space-section` by 1.5. Every current `mt-5 / mt-6 / mt-8 /
mt-10 / mt-12 / mt-16 / space-y-7 / space-y-10` collapses into these three. Sections are
separated by space, not by rules: the seven full-width hairlines on the homepage come out.
The one remaining boundary is the background change to `--page` under the Extract, which
is the only mark on the site that says "this is the book's paper".

**Grid.** 12 columns, `column-gap: clamp(1rem, 2vw, 2rem)`, page gutter
`clamp(1.25rem, 5vw, 4rem)`. Container 72rem, except the hero and the three variables at
78rem — those two moments are visibly wider, which is how a spread reads as a spread
without a device. Two layouts only: TEXT (label 1–3, content 4–11, column 12 free) and
SPREAD (hero 1–6 / 8–12; variables 1–4 / 5–8 / 9–12). Phone: one column, 1.25rem gutter,
nothing full-bleed, no exceptions.

**Colour.** Red currently carries eleven jobs and eight separate marks appear on the first
phone screen. Reduced to four: the section eyebrow, one display word per page at most,
links, and the footer band. The 6px red rule under the nav is the heaviest single mark on
the page and comes out. The three red left rules come out. The hero subtitle goes to
`--ink`. The system inks appear in exactly two places: the three variables, and the printed
rule on each case moment.

**Buttons.** One style — a word in DIN caps at LABEL over a 1.5px rule, ink by default,
red for primary. The solid red block appears exactly once on the whole site, on the notify
submit.

**Motion — six rules.**
1. One transition exists: opacity 0→1 with an 8px rise, 400ms ease-out, fired once when a
   block first enters the viewport, skipped for anything on screen at load. Bring `.reveal`
   from 700ms/14px to 400ms/8px — 700ms is above the noticing threshold.
2. Nothing rests dimmed. `.reading-list.is-dimmed`, `.reading-step.is-on` and their
   observer are deleted: text at 45 per cent opacity fails contrast and reads as a bug.
3. Nothing is driven by scroll position. `--open`, the rAF listener, `.hero-track`,
   `.hero-stage` and `.hero-hint` are deleted.
4. Hover is a colour change, 150ms. No transform, no shadow, no underline animation.
5. `prefers-reduced-motion: reduce` removes rule 1 entirely.
6. Nothing loops. `pulse-trace` stays, because it runs only while audio is playing — a
   state indicator, not decoration.

If a visitor notices the motion before the writing, remove it.

---

## NAVIGATION, CTAs AND HEADINGS

### Navigation

**Desktop (≥768px)** — sticky, 56px, **opaque `var(--paper)`**, hairline beneath. The
current `bg-paper/92 backdrop-blur-[2px]` lets display type ghost through the bar in every
mobile frame; on a site whose standard is "nothing should look accidental" that reads as a
rendering fault, and `DESIGN_SYSTEM.md` forbids glass anyway.

Left: pulse mark + "State. Not Situation." → home. Centre: **Book · Extract · Author ·
Press** `[AUTHOR, brief §21]`. Right: **EN · FR · DE**.

Targets: Book → `/[lang]#premise` (the current `#book-about` target is the deleted
`TheBook` section); Extract → `/[lang]/read`; Author → `/[lang]#author`; Press →
`/[lang]/press`. No dropdowns, no mega menu, no scroll-spy. The only state shown is
`aria-current="page"`, rendered as a 1.5px ink rule beneath the word.

**Phone (<768px)** — sticky, 56px, opaque. Left: pulse mark (wordmark from 420px).
Middle-right: **Menu** `[INTERFACE]` — the word, not an icon; an unlabelled hamburger is
one of the AI-design tells §26 lists. Right: EN · FR · DE. At 360px: 36 + 42 + 92 + gutters
≈ 260px, comfortable. The four links cannot fit (≈388px at 360), so a menu, not a
truncated bar.

**On tap — a full-screen sheet, not a drawer.** Ground `var(--paper)`, edge to edge, no
backdrop blur, no shadow, no rounded corners. One column, left-aligned on the page gutter.
Four items in the serif at ~30px, 1.4 leading, hairline between. Beneath a heavier rule:
**Read an extract** and **Publication updates** in the existing `.btn` language. At the
foot: the language row, full size. Close via an X in the bar's own position, any item, or
Escape. Motion: 120ms opacity only; nothing slides.

Required, not optional: `aria-expanded` and `aria-controls` on the button; `role="dialog"`
`aria-modal="true"` with an accessible name; focus to the first item on open and back to
the button on close; background scroll locked and `inert`; every item a real `<a>`.

**DEPARTURE (UX Designer).** No persistent phone action bar. Brief §19 explicitly forbids
floating interface elements, and the menu — which carries both actions and sits in the
sticky bar on every screen — solves the dead-end the UX desk correctly identified without
adding furniture to a page whose whole purpose is subtraction. If scroll depth to the
Extract collapses after launch, the bar is the recovery, and it ships to the UX desk's
specification: one action, 56px, `var(--paper)`, hairline top only, no icon, no fill, no
shadow, hidden while its target is on screen or the keyboard is up, in the DOM after
`</main>`.

**Language switcher.** Three marks, not a `<select>`. Six changes: (1) preserve the
**section**, not the offset — track the id crossing the top of the viewport and append it,
which works because the architecture is now canonical and the ids identical; (2) on
arrival jump, don't glide, and honour `scroll-margin-top`; (3) delete the greyed branch
(`LanguageSwitcher.tsx:34–42`) and `a11y.languageComing` from `types.ts` and all three
content files — a greyed, unclickable mark with a `title` tooltip is invisible on touch;
(4) `aria-label="Français" / "Deutsch" / "English"` so a screen reader running in English
does not announce "eff arr"; (5) `min-width: 2.75rem` per mark; (6) never auto-redirect —
no `Accept-Language` sniffing, no geo-IP. Someone who typed the English URL gets English.
The switcher must appear on every page; it is missing from `/[lang]/read` today.

### CTAs

Two actions exist on this site, and only two. Post-launch `site.config.ts` swaps the
second for **Buy on Amazon** automatically; that machinery works and must survive the
rewrite untouched. Add it to the QA checklist explicitly: flip `publicationStatus` to
`published` in a branch and confirm every CTA on every page, in the menu, changes.

| Where | Primary | Secondary |
|---|---|---|
| Hero | **Read an extract** (`btn btn-red`) | **Publication updates** (`btn`) |
| Premise · Variables · Moments · Evidence | none | none |
| Extract, at the foot | **Continue reading** | none |
| Author | **Press** (text link) | none |
| Closing | the form itself | none |
| Phone menu | **Read an extract** | **Publication updates** |
| Foot of `/read` | the form itself, inline | none |
| `/press` Downloads | **Download complete press kit** | contact |

Nine CTA instances today become five. Deleted: the `ExcerptTeaser` head pair, the Author
"Contact", the second "Publishing soon", and the duplicate notify heading/button pair.

**`StatusLine.tsx:25` must stop emitting `href="#notify"` unconditionally.** `id="notify"`
exists only in `Launch.tsx`, which renders only on the homepage — so at the foot of
`/[lang]/read`, the highest-intent moment on the site, that button does nothing. The fix
is to render the notify block inline at the end of the extract, not to point it home.
Automate the check: every in-page href must resolve on the page that renders it.

**`newsletterUrl` is `null` for all three editions**, so `Notify.tsx` falls to its mailto
branch and the site's loudest button opens a draft email into a clinical practice inbox.
Set a real endpoint (Buttondown, MailerLite — `Notify.tsx` already posts a plain form and
handles the opaque response, so this is config, not a build). Keep `privacyNote` exactly as
it stands; it is honest and it is the reason the ask deserves to be granted.

### Heading outline

The governing correction: **the eyebrow is never the heading.** Four sections currently
make the filing label the `h2`, so a screen reader's heading list reads like a filing
system rather than like the book. Eyebrows become `<p class="eyebrow">`; the `h2` becomes
the sentence the section is about; `aria-labelledby` points at it.

```
h1  State. Not Situation.                                  [Hero]
      subtitle and strap are <p>, not headings
h2  The body is a sensor before it is a narrator.          [The Premise]
      page 10's three lines and the back-cover mechanism sit under it;
      the three checks are an <ol>, not headings
h3  Try something right now                                [movement two]
h2  Time. Attention. Safety.                               [Variables]
  h3  Time
  h3  Attention
  h3  Safety
h2  16 cases. Three readings. One question: state or situation?   [Moments]
      three <li>; the timestamp is <p class="mono-label">, the quoted line
      is body type. A timestamp is not a heading and "ok." is not a heading.
h2  Evidence                                               [Evidence]
      a <dl>: <dt>High</dt><dd>Replicated or robust evidence.</dd> …
      three one-word h3s for a three-cell legend is heading inflation
h2  Before the chapters                                    [Extract]
h2  Ivana Budišin                                          [Author]
h2  Is this the situation? Or is this their state?         [Closing]
  h3  Publication updates
```

Read the `h2` sequence alone: *The body is a sensor before it is a narrator. / Time.
Attention. Safety. / 16 cases. Three readings. One question: state or situation? /
Evidence / Before the chapters / Ivana Budišin / Is this the situation? Or is this their
state?* That reads like a contents page. That is the test.

`/[lang]/read`: `h1` "The pilot" (already correct and already the only `h1`), plus `h2`
"Publication updates" for the new foot block. `/[lang]/press`: `h1` "Press materials",
`h2` per block — structurally sound already, leave it alone.

### Accessibility — testable, not aspirational

1. **`--quiet` (#8a857e) fails AA** at ≈3.3 : 1 on #f7f3ec, and it is the colour of every
   timestamp, folio, page reference, "PUBLISHING SOON" and "Used for this notification
   only." Merge it into `#6f6a62`, which already exists as `--grade-low-ink` at ≈4.9 : 1.
   A token merge, not a new colour, and the tonal step down from body ink is preserved. Do
   not "fix" it by going to ink: if folios end up the same colour as body text the site
   loses the quiet instrument register §32 protects.
2. **Focus is invisible in the red band.** `:focus-visible { outline: 2px solid var(--red) }`
   is the only focus rule; every footer link and the solid submit sit on `var(--red)`. Add
   a two-tone ring — 2px paper over 1px ink — which works on both grounds.
3. **`scroll-margin-top: calc(var(--nav-h) + 1rem)`** on every anchored section and on
   `#main`. There is no `scroll-margin` anywhere in the codebase today, so every hash link
   on the site — including the skip link — lands behind the sticky bar.
4. **No dead fragments.** See `StatusLine.tsx:25` above.
5. **Every section carries a visible heading** with `aria-labelledby` pointing at it. An
   `aria-label` serves one assistive path and quietly escapes the translation workflow.
6. **Colour is never the only carrier.** On /press the chapter grouping must be in text as
   three real subheadings, not only in the rail and keys (both `aria-hidden` today). In
   Evidence, her HIGH/MEDIUM/LOW descriptions already solve this; keep them as words.
7. Menu sheet semantics as specified above.
8. Target size: language marks to 44px minimum; everything else keeps `min-h-11`.
9. `Reveal`'s "already on screen stays visible" guard must be preserved — it is why
   nothing disappears when scripts fail.
10. `--measure: 62ch` and `.reading-body` at 34rem are right. Keep.
11. Any English string inside a French or German page needs `lang="en"` — or, better, a
    content key. Prefer the key.
12. **Sign-off test:** from the homepage at 390px, Tab alone must reach the extract, the
    press page, the author section, each language and the email field, with the menu both
    open and closed.

---

## THE PRESS PAGE

The strongest page on the site. Preserve its seriousness; it now receives what the
homepage sheds.

**Reorder.** A journalist's first four questions are title, author, date, ISBN, and those
are currently the fourth block, below eight download rows and four paragraphs. New order:
contact and intro → **Publication** → About the book → Biography → Downloads → **Sources
and evidence** → Credits. One screen to the answer.

**Receives from the homepage**, each with its source recorded in `CONTENT_SOURCES.md`:

- The sixteen-chapter map, whole, with its printed page numbers, colour keys and rail,
  under Publication. `press.map.chapters[]`, `press.map.keys[]`, `press.map.pageColumn`.
- "This book is the" / "Investigation." `[PRINTED p.10]` as the map's heading, replacing
  `map.investigationTitle`. `press.map.title`.
- `map.sortingTool` in full, 48 words `[PRINTED p.13]` — under the map, where "The chapters
  that follow" finally points at something. `press.map.sortingTool`.
- The fourth case panel, 13 / p.182 / 22:40 `[PRINTED p.182]`, as an illustration of the
  book's page furniture. `press.map.casePanel`.
- "For anyone who has ever been certain about what a situation meant…" `[AUTHOR, chat 5
  September 2026]` added to About the book, which currently carries no statement of
  readership at all.

**Add.**

1. **Download complete press kit** `[AUTHOR, brief §10]` — a single line at the **head** of
   Downloads, above the individual files, as the section's one solid action. It is
   currently the ninth list row, gated on `siteConfig.press.pressKitZipUrl` (still `null`),
   and its label is hard-coded English at `app/[lang]/press/page.tsx:86` — it would appear
   untranslated on the French and German press pages. New key `press.kitLabel`.
2. **A press address.** `siteConfig.author.pressEmail` is `ivana@luxembourgpsychology.com`.
   Two costs: it routes journalists into a therapy inbox, and it ties the book to a
   clinical practice on the one page whose job is to establish the book. Use
   `press@statenotsituation.com`, forwarding wherever she likes.
3. **A photographer credit** for the author photograph. A picture desk will ask before it
   publishes, and its absence will hold up a piece.
4. **A "Sources and evidence" note** `[INTERFACE]` carrying `press.description[2]` and
   `[3]` — the page 226 paragraphs. Inside "About the book" the deictic "here" has no
   referent and a journalist reads it as a broken sentence; under a heading about the
   book's reference apparatus, "here" can be given one. New key `press.sourcesHeading`.
   `press.description` then reads as three paragraphs each doing distinct work: her own
   line, the map line, the readership line.

**Remove.** The "Publisher: Budisin Publishing, Luxembourg" row from `press.facts` —
`press.credits` already carries "Published by: Budisin Publishing". One or the other, not
both (§11).

**The press kit**, from `website/public/press/`, professionally renamed:

| File | Kit name |
|---|---|
| `cover-front-2400.jpg` | `State-Not-Situation_cover-front_2400px.jpg` |
| `mockup-3d-transparent.png` | `State-Not-Situation_book-render_transparent.png` |
| `author-photo-1600.jpg` | `Ivana-Budisin_author-photo_1600px.jpg` |
| `banner-web-2400x1000.jpg` | `State-Not-Situation_banner_2400x1000.jpg` |
| `post-1x1-1080.jpg` / `post-4x5-1080x1350.jpg` / `post-16x9-1920x1080.jpg` | `State-Not-Situation_social_1x1.jpg` etc. |
| `excerpt-the-opening.pdf` | `State-Not-Situation_extract_the-opening.pdf` |

Plus two files that do not exist yet and should: `State-Not-Situation_fact-sheet.pdf` (one
page — the facts table, both biographies, contact, credits, cover thumbnail; the file a
journalist actually opens) and `credits-and-permissions.txt`.

Two provenance notes for whoever assembles it. **First:** the slogan on the 1×1 and 4×5
social assets and the INPUT / FIRST READING / POSSIBLE STATE table on the 16×9 are
**printed on the back cover, word for word** — they pass the one rule. `CONTENT_SOURCES.md`
audits only `content/*.ts` and says nothing about `public/press/`; add a section recording
this, or the next person will redo the check, and the one after may assume the worst and
delete good assets. **Second:** `excerpt-the-opening.pdf` is dated 4 September, a day
before the almost-final PDF landed. Re-export it from the current text before it goes in
the kit, or a journalist quotes a superseded version — the precise failure the one rule
exists to prevent.

**Still needed from the author before launch**, both already blocked on her and both easy
to defer because the page renders without them: `press.bios[1]`, the long biography, 100
to 150 words (`page.tsx` silently hides the whole Biography block while only the short form
exists, so a journalist currently has nothing to quote or verify); and a publication month
or season in place of "Publishing soon" (`publicationDate` is `null`, so no one can
diarise, schedule an embargo or plan coverage). A launch site that cannot answer *when* and
*who is she* is not a launch site. Chase both; invent neither.

---

## THE EXTRACT PAGE

Retain the page itself unchanged — it does exactly one thing and does it well. Four
additions, three of which are repairs.

1. **The notify form, inline at the foot.** A reader who has just finished nine pages of
   the pilot is the most valuable visitor the site will ever have; do not send them back to
   the homepage to scroll for a form. This also kills the dead `#notify` fragment.
2. **`excerpt.closing` and `excerpt.closingSource`** — the page 26 block, at the foot of the
   complete extract, where "The warships are the extreme case." has been read. This answers
   `CONTENT_SOURCES.md` open question 6: the sentence is no longer omitted for a reader who
   would meet an unexplained word, because by then they have met it. Keep the red left rule
   — that is a printed device, not decoration.
3. **A language switcher** in the top bar. It is missing today.
4. **A Press link and the footer.** The page currently has neither.

Type: `.reading-body` at 34rem and the folio rule stay exactly as built.

---

## FOR THE LOCALISATION EDITORS

French and German are rebuilt to this architecture by their own literary localisation
editors in a later stage, under `translation/STANDARD.md` and brief §13–14. **Hold them
until the English architecture and strings are frozen.** Two of the largest deletions —
page 13's 169 words of evidence prose, and the chapter map — exist in all three languages,
and translating either is wasted work.

**The parity contract.** Same eight sections, same order, same section ids
(`#premise`, `#variables`, `#moments`, `#evidence`, `#read`, `#author`, `#closing`,
`#notify` — English in every language, because the section-preserving language switch
depends on it), same number of CTAs, same conceptual claim, same evidence level, same
visual treatment. Word counts need not match; meaning and editorial weight must. No
language may feel like the secondary translation.

**Strings that are new source text and have never been on this site.** Each needs a
per-language provenance line in `CONTENT_SOURCES.md`.

| String | Status |
|---|---|
| "The body is a sensor before it is a narrator." (p.181) | New. The one line she calls crucial, so it gets the most care in both. It is currently filed under "Removed on 5 September 2026" — **move it**, or someone will remove it again next week on the authority of that file. |
| The back-cover mechanism, four sentences | New. Printed on the **English** cover. If no French or German back cover exists, this is translated from the English cover, not from a printed FR/DE original, and must be recorded that way per language. |
| HIGH / MEDIUM / LOW descriptions | **Author-supplied, 6 September 2026, source `brief/REDESIGN-BRIEF.md` §8 section 5.** The first strings on this site whose English source is the brief itself. They must be **re-authored** to the same register in French and German, not lexically matched — they are three short definitions, not slogans. Without the provenance line the next editor will find three unsourced sentences and cut them exactly as the press-pack claims were cut. |
| "The Premise", "Three Moments", "Evidence", "Publication updates", "Continue reading", "Download complete press kit", "Book / Extract / Author / Press" | Author-supplied, same date and source. |
| Safety's definition | Printed pp.13–14, **one whole sentence removed**. Record the omission. |

**Wordings the author has already ruled on. These are decided; do not relitigate them.**

*French (brief §13):*
- "Ce livre mène l'enquête." — **not** "Ce livre est l'enquête."
- "Le lecteur doit pouvoir les distinguer." — **not** "Vous devriez savoir lesquelles sont
  lesquelles."
- "Suspendez l'histoire." — or, where clarity matters more, "Attendez avant de conclure."
  **Not** "Différez l'histoire."
- "ÊTRE PRÉVENU" carries the same passive framing as "Be notified" and must follow whatever
  "Publication updates" becomes.
- The French hero currently reads well, but note the subtitle sets three red lines where
  English sets two; with the subtitle now in `--ink` that resolves itself.

*German (brief §14):*
- **"Leitfaden"**, or another contextually appropriate formulation, for *field guide*.
  **Not "Bestimmungsbuch"** — which is what `de-m-00000.png` shows on the first German
  screen today.
- **"Ihre erste Lesart ist nicht die ganze Geschichte."** or **"Der erste Eindruck ist
  nicht die ganze Geschichte."** — **not "Ihr erster Befund…"**, which she flags as
  unnecessarily clinical, and which is also on the first German screen today.
- **Flag for the German editor, glossary level:** *Befund* is currently the German
  glossary's standing equivalent for *reading* throughout `content/de.ts` and
  `translation/METHOD-de.md`. Her ruling on the hero strap is therefore not a single-string
  fix — it is a decision about the book's central term in German, and it has to be taken
  once, deliberately, and applied consistently. *Lesart* and *Eindruck* are not
  interchangeable across every occurrence: "What you found is a reading." and "Your first
  reading is not the whole story." may not want the same noun as "16 cases. Three
  readings." Resolve the glossary first, then the strings.

**Layout constraints they must design to, not translate around.**
- COVER and DISPLAY must hold a 40 per cent longer string. German takes DISPLAY in place of
  COVER in section 3 (`:lang(de)`); check every variable word between 1024 and 1280.
- The two hero CTAs stack into separate rows in German where English and French sit on one
  line. **The stacked state is specified** — do not shorten a label to force one line.
- The persistent-action fallback and the menu are one line in a 56px bar: about 26
  characters at 0.78rem tracked caps. That is a character budget, not a translation to
  match.
- Menu label: FR "Menu", DE "Menü".
- `--check` and its `:lang(de)` override disappear with the 6rem promotion.
- The three evidence descriptions set the cell height in every language; they are not
  labels and must not be compressed into one line.
- The cover artwork stays English in all three languages. Removing the duplicated hero
  stack fixes the current French mismatch — a French subtitle set directly above an English
  cover printing the English subtitle — for free.
- Nothing in the interface announces the `underReview` state. No badge, no asterisk, no
  "beta".

---

## OPEN QUESTIONS FOR THE AUTHOR

Three. Everything else in this document is decided.

---

**1. The Premise paragraph**

- **SOURCE** — Back cover, `public/images/cover-back.jpg`, printed word for word. Sixty-three
  words, under the printed eyebrow THE FIRST MISREADING.
- **CURRENT** — The homepage has no premise. Section 2 is 169 words of page 13 explaining
  the book's evidence apparatus, before the reader has been given a reason to care.
- **ISSUE** — Your brief asks for 70 to 120 words introducing the mechanism. The book's
  interior does not supply them at that position: page 12 is cut, page 13 belongs to the
  reading, page 10 is 25 display words. I will not write the difference, so the only honest
  sources are your own jacket or an assembly of whole sentences lifted from pages 8, 9 and
  181. The jacket is the one paragraph on the object written to make a stranger pick the
  book up — but it is jacket copy, and you may not want the site to speak in that register.
- **OPTION A** — The back cover, verbatim, four sentences: "We usually treat these moments
  as information about life: the person, the task, the relationship, the day. But the first
  reading is often not the whole story. Before the mind explains, the body has already
  voted. Sleep pressure, hunger, timing, attention, threat detection, memory, and prediction
  quietly shape what feels true. Then the mind arrives second and gives that feeling a
  reason."
- **OPTION B** — An assembly from page 8, three whole sentences kept and two whole sentences
  cut out of the middle: "The tiredness that presents itself as a question about your
  career. The caffeine spike that presents itself as anxiety about an email. The low blood
  sugar that presents itself as evidence that your relationship is failing." plus page 9's
  "But the body's confident weather report about the world is only a draft." — 63 words,
  more concrete, three nouns a stranger already owns, but it is the book's interior rearranged
  by us rather than a passage you already approved as a whole.
- **RECOMMENDATION** — A. It is printed, it is continuous, it needs no editorial surgery, its
  own printed eyebrow is the same as page 10's, and it does the job of the section exactly.
- **CONFIDENCE** — High.

---

**2. A credential on the first screen**

- **SOURCE** — Your biography, supplied 4 September 2026: "Ivana Budišin is a clinical
  psychologist living and working in Luxembourg. State. Not Situation. is her first book."
  This is `CONTENT_SOURCES.md` open question 2, still open.
- **CURRENT** — The first screen gives the title, the subtitle, the strapline and "by Ivana
  Budišin", and nothing else about you. The words "clinical psychologist" appear for the
  first time about 10,500px down, after eleven sections — by which point the reader has been
  handed a great deal of intellectual apparatus, all of it asking to be taken seriously,
  none of it accompanied by a standing.
- **ISSUE** — For a first book from an imprint that shares your surname, that ordering is
  backwards; credibility is a precondition, not a section. But your brief §8.1 lists exactly
  what the hero should carry and a credential is not on the list, and §8.7 gives the
  credential job to the author section. I have followed your brief and left the hero clean.
  The invisible half ships regardless: your sentence goes into `meta.description` and the
  JSON-LD `person` object either way, which is what a search result or an AI summary will
  quote.
- **OPTION A** — Leave the hero as your brief has it. Nothing changes.
- **OPTION B** — One line under the byline, at body size: your first sentence, whole and
  unedited — "Ivana Budišin is a clinical psychologist living and working in Luxembourg."
  The author section then keeps the full two-sentence biography, so the phrase appears twice
  on the page, which is a real cost.
- **RECOMMENDATION** — B, but with a byline of your own if you would rather write one:
  a single line in your words, shorter than the biography's first sentence, that puts
  "clinical psychologist" on the first screen without repeating the author section.
  Thirteen words is the cheapest credibility on this project.
- **CONFIDENCE** — Medium. This is a voice decision and it is the only thing I have left in
  your hands on the hero.

---

**3. Three moments, three "None."**

- **SOURCE** — CASE EVIDENCE pages 16, 28 and 150, reproduced. Your brief §8.4 names 06:38,
  22:47 and 16:00.
- **CURRENT** — Four panels, four abreast on desktop. The fourth, chapter 13 / page 182 /
  22:40, ends "Verified threat: Not yet visible."
- **ISSUE** — I have cut to your three. But all three then end "Verified event / tone /
  crisis: None." Read together on a homepage, with no chapter around them, they can be heard
  as *your feelings are always wrong* — a stronger claim than the book makes, and the one
  Chapter Thirteen, "The Time the Body Was Right", exists to refute. Page 11's printed line
  now heads the section, so the reader is told these are three of sixteen, which helps. It
  may not be enough.
- **OPTION A** — 00, 02, 11, exactly as your brief names them. Three "None."s, hedged only by
  "16 cases" above and by your line at the Extract about what, exactly, you are trusting.
- **OPTION B** — 00, 11, 13. Swap 22:47 for 22:40, so the set ends on the moment the body
  was right. It costs the "ok." panel, which is the most quotable thing on the page, and it
  hands the reader the book's title as a resolution before they have bought it.
- **RECOMMENDATION** — A, and we test it: three variants shown to eight to ten readers who do
  not know the book, one question — "What is this book claiming?" If more than two say
  "don't trust your feelings", the set is overclaiming and 13 goes in, most likely replacing
  02. I will bring you the result rather than the question.
- **CONFIDENCE** — Medium. The claim the homepage makes about the book is yours to set, which
  is why this is here rather than decided.

---

## WHAT I EXPECT TO GO WRONG

Recorded so it can be checked against, not to be read.

1. **The team performs subtraction instead of doing it** — shrinking type, widening gutters,
   adding whitespace, keeping all twelve sections. The desktop already shows the symptom: two
   screens with a completely empty left half. That is not confidence, it is thinness.
2. **Someone writes the Premise.** There is no fifth category. If option B in question 1 is
   chosen it is whole printed sentences reordered, not one smooth linking clause — and a
   smoothing pass will read well, which is exactly why it will not be caught in review.
3. **The sensor line is added without the couplet being removed.** She authorised reinstating
   "The body is a sensor before it is a narrator." She did not authorise saying the same
   thing three times in two screens.
4. **The relocations are treated as deletions.** The chapter map, the sortingTool paragraph,
   the page 226 note, the fourth panel and the page 26 block must actually land on /press and
   /read with their sources recorded. A relocation that is never built is a deletion nobody
   decided on.
5. **Provenance drift.** Every cut above goes into `CONTENT_SOURCES.md` under a new "Removed
   on the redesign, 6 September 2026" heading with its reason, and page 181's line must move
   out of the 5 September removals. That file is the only thing standing between this site and
   the machine-written press pack it was built to replace.
6. **Four bordered cards become three bordered cards.** The target is the box, not the count.
   The same trap waits in the Evidence row and the three variables.
7. **The scale is rebuilt as six steps and then given a seventh "just for this one heading".**
   The current state began with a good scale and eighteen local decisions.
8. **Someone mourns the 3D book and saves a piece of it** — a small tilt, a hover that lifts, a
   shadow that shifts. There is no restrained 15 per cent version of a perspective effect. The
   reason the flat press-page cover works is that nobody tried to make it interesting.
9. **Faithfulness is mistaken for design.** Every weak element on this page got there honestly
   and each was defended as a reproduction of a printed page. The book has page turns, margins
   and a fixed trim; a scroll has none of those. The one rule governs the words. It does not
   govern the layout, and it must not be used to protect a device.
10. **The dead `#notify` survives the rebuild.** It is invisible in every screenshot, throws no
    error, and sits in a shared component that looks correct in isolation.
11. **The homepage will feel short, and someone senior will want to put something back.** The
    standard is hers: someone even better knew when to stop.
