# Where every sentence on this site comes from

The rule for this project: **the site may not say anything about the book that the book does not say about itself.** Every line of prose in `content/en.ts` is one of four things.

1. **Printed.** Set in the almost-final book or on its printed cover, word for word.
2. **Author-supplied.** Written by Ivana Budišin and given to the team, word for word. This includes anything she wrote in `brief/REDESIGN-BRIEF.md`.
3. **Interface.** A plain functional label: Menu, Press, Email address.
4. **Placeholder.** Marked `[COPY NEEDED: …]`, waiting for Ivana.

If you add a sentence to `content/en.ts`, add its source here. If you cannot give it a source, it should be a placeholder instead.

Page numbers refer to the almost-final 278-page 6 × 9 in text (`~/Desktop/State Not Situation by Ivana Budisin.pdf`, supplied 5 September 2026). Cover references are to `public/images/cover-front.jpg` and `cover-back.jpg`, which are the printed artwork.

The architecture is `brief/REDESIGN.md` (6 September 2026), which implements the author's brief. It supersedes `translation/EDITORIAL-POSITIONING.md` and `translation/HOOK-DECISION.md`, which are kept as the record of how the page got here.

---

## Printed on the cover

| Key | Where |
|---|---|
| `hero.titleA` / `hero.titleB` | Front cover; half title, page 1; title page, page 3 |
| `hero.subtitle` | Front cover: "A field guide to the moment before interpretation becomes reality" |
| `hero.strap` | Front cover: "Your first reading is not the whole story." |
| `premise.eyebrow` | Printed as the eyebrow on **both** page 10 and the back cover: "The first misreading" |
| `premise.lines[0..1]` | **Back cover**, the headline printed under the same eyebrow: "You may not be reacting to the world. You may be reacting to your state." It replaced page 10's three lines ("Nothing went wrong on this day…") on 6 September 2026 at the author's request: printed, they are the setup for "This book is the Investigation."; lifted onto a screen and set at lead size they read as three qualifications rather than a claim. The section now carries the whole back cover in its printed order — eyebrow, headline, paragraph. |
| `premise.mechanism[0..3]` | **Back cover**, the four sentences beneath the strap, verbatim: "We usually treat these moments as information about life…" to "…gives that feeling a reason." Sixty-three words. Used as the site's premise; see the note below. |
| `closing.line` | Front cover foot and title page: "Same life. Different instrument settings." |
| `footer.band` | Back cover, red band: "Before you believe the story." |

**On the back-cover premise.** The author's brief asks for a premise of 70 to 120 words introducing the mechanism. The book's interior does not supply them at that position, and no new prose may be written, so the site uses the passage the object already owns. It is printed, continuous, and it is the one paragraph on the whole book written to make a stranger pick it up. Recorded as open question 1 in `brief/REDESIGN.md`.

The INPUT / FIRST READING / POSSIBLE STATE table printed beside it on the back cover is **not** used: it read as a data table on screen.

## Printed in the book, in page order

| Key | Page / source |
|---|---|
| `premise.folio` | Page 10, the printed folio |
| `moments.line`, `press.mapLine` | Page 11: "16 cases. Three readings. One question: state or situation?" On the home page it heads the three moments, which is the only place a reader learns the book has sixteen cases. |
| `press.mapLabel`, `press.mapTitle` | Page 10: "This book is the" / "Investigation." Heads the chapter map on the press page, where the Investigation actually is. |
| `press.chapters[]`, `press.pageColumn` | Page 11, the map, with its printed page numbers. Page 11 prints TIME, ATTENTION and SAFETY as labels with their colours only, and no legend descriptions, so none appear. |
| `reading.*` | Page 13, verbatim: "Whatever you are feeling as you read this sentence. Check your jaw. Check your breath. Check your shoulders. What you found is a reading." The eyebrow "Try something right now" is the page's own phrase. In the book these are a run-on clause in a body paragraph; the site sets them as display type, which is a promotion and not a reproduction. |
| `evidence.grades[].label` | Page 13 prints the three markers with the labels HIGH, MEDIUM, LOW beneath them and nothing else. |
| `evidence.closing` | Page 13: "These markers exist because the book's own risk is the same risk it describes." |
| `variables.sortingLines[0..1]` | Page 13: "They are not brain regions or neural pathways." / "They are a sorting tool, a way to ask three questions when everything feels wrong at once." |
| `variables.loops[].name` / `.body` | Pages 13 to 14, the three definitions. **Safety's "Things like social evaluation, exclusion, ambiguity, status." is omitted** — seven words of examples before the reader has the mechanism, and the only reason Safety ran to twice the length of Time. The omission is deliberate and is recorded here so it is not read as a slip. |
| `press.sortingTool` | Page 13, the whole passage, on the press page, where "the chapters that follow" points at the chapter map above it. |
| `moments.items[]` | The CASE EVIDENCE pages, reproduced: 00 p.16, 02 p.28, 11 p.150. Seven chapters open on such a page (00, 02, 05, 11, 12, 13, 15); nine do not, which is why the site carries no sentence claiming otherwise. Each card carries the short rule the page prints under its label (28 × 1.6 pt), in the page's own ink, read per page from the print file: Time (CMYK .68 .2 0 .46) on 00 and 02, Safety (CMYK 0 .71 .78 .25) on 11. Chapter 12's page prints no rule, which is why the colours are read and not derived. |
| `moments.label` | "Case evidence", printed at the head of every such page. |
| `moments.closing` | Page 20: "It said I am failing; the data was I am tired." |
| `excerpt.paragraphs[]`, `excerpt.quote` | Pages 7 to 9, the opening, verbatim. The home page shows the first two paragraphs, both page 7, ending "A slow descent feels like holding steady."; the rest is on `/read`. |
| `excerpt.title`, `excerpt.sectionLabel` | Page 226: "Before the chapters" / "The pilot" |
| `excerpt.closing`, `excerpt.closingSource` | Page 26: "This book is about the same error at kitchen scale…" **On `/read` only**, at the foot of the complete extract, where the preceding sentence "The warships are the extreme case." has been read. This answers what was open question 6. |
| `premise.sensorLine` | Page 181: "The body is a sensor before it is a narrator." Reinstated at the author's request, brief §4, where she names it a crucial line. |
| `closing.question`, `closing.source` | Page 225, the book's last sentence: "Is this the situation? Or is this their state?" |
| `press.sources[0..1]` | Page 226, The Scientific Heartbeat: "Each chapter has three parts here…" and "Leaving them out would make the argument look tidier than it is." |
| `press.facts` ISBN, publisher, extent | Copyright page, page 4: ISBN-13 978-2-87996-258-0, Budisin Publishing, 278 pages |
| `press.credits` | Copyright page: cover design Zoe Larusson; book design and typesetting Ivana Budišin |
| `footer.rights` | Copyright page: © 2026 Budisin Publishing |

## Supplied by the author

| Key | Note |
|---|---|
| `author.bio`, `press.bios[0]` | "Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book." Given 4 September 2026. |
| `excerpt.lead`, `press.description[0]` | "It is less interested in teaching you to trust your instincts than in showing you what, exactly, you are trusting." Given 5 September 2026. |
| `author.readers`, `press.description[1]` | "For anyone who has ever been certain about what a situation meant…" Given 5 September 2026. |
| `evidence.grades[].description` | "Replicated or robust evidence." / "Suggestive evidence with meaningful uncertainty." / "Plausible hypothesis or emerging evidence." **Written by her in `brief/REDESIGN-BRIEF.md` §8 section 5, 6 September 2026.** They replace 169 words of the book explaining its own apparatus. They are hers, not printed: do not delete them as unsourced. |
| `evidence.title` | "Evidence", her section name, same brief. |
| `status.notifyCta` | "Publication updates", her wording, same brief §8.1. |
| `excerpt.continueCta` | "Continue reading", her wording, same brief §8.6. |
| `press.kitLabel` | "Download complete press kit", her wording, same brief §10. |
| `nav.book` / `nav.read` / `nav.author` / `nav.press` | Book · Extract · Author · Press, her navigation, same brief §21. |
| `public/audio/extract-en.m4a` | The author's reading of the pilot, second take, supplied 6 September 2026 as "The Pilot NEW.mp3", 5 minutes 22 seconds. Restored before publishing: level drift 4.8 dB to 0.8 dB, noise floor -53 to -64 dBFS, and a gentle shelf above 3 kHz, because this take sits 4.5 dB darker than the first and reads as further from the microphone. No words were altered. **`listen.subtitle`, "Read by the author", is no longer rendered.** On 6 September the author said she is generating the reading in ElevenLabs; the two files she supplied are statistically almost identical (140 and 141 words per minute, 9.0 and 9.8 semitones of pitch range, pause variability 0.53 and 0.56), which two human performances would not be. The site may not claim a performance it cannot stand behind. The string stays in all three content files; the component renders it again as soon as she says whose voice it is and how she wants it described. |

## The press pack

`public/press/` holds the assets a journalist, bookseller or event organiser needs, and `lib/make-press-kit.mjs` builds `State-Not-Situation-press-kit.zip` from them plus a fact sheet in each language generated from the content files, so the sheet can never drift from the page. Rebuild it with `node lib/make-press-kit.mjs` after any change to the press content.

Two things were **withdrawn** from the pack on 6 September 2026, and should not be put back without checking:

- **The 170 × 240 mm cover files** (`cover_front_300dpi.png`, `cover_back_300dpi.png`, `cover_wrap_300dpi.png`, `STATE_NOT_SITUATION_cover_170x240_PRINT.pdf`, `mockup_3d.png`, `mockup_3d_transparent.png` in the author's `Press Pack/` folder). The book is 6 × 9 in. Those files are a superseded trim, and the transparent render was the one the site had been offering. A journalist laying out a feature from them would print the wrong shape.
- **`Press Pack/01_Copy/`.** Machine-written, and the source of the claims this whole provenance regime exists to keep out. The fact sheet in the kit is generated from `content/*.ts` instead.

`State-Not-Situation-extract-the-opening.pdf` is set by `lib/make-extract-pdf.mjs` from the verified text in `content/en.ts`, because the extract PDF in the author's folder was exported on 4 September from the older text. It is a plain setting, not a facsimile: **when the book is next exported, replace it with pages 7 to 9 of the interior PDF**, which is better.

## Interface labels

Everything in `nav` (including `menu` and `closeMenu`), `status`, `listen`, `a11y`, the folios, and the short labels in `press` (Downloads, Biography, Publication, Credits, Contact, Sources and evidence, Back to the book) are functional interface strings.

| `press/excerpt-the-opening.pdf` | **Superseded.** The extract PDF in the press kit was exported on 4 September from the older text and does not match the book as it now reads. Re-export it from v40 before the kit goes to a journalist, or a review quotes a version that no longer exists. |

## Still placeholders

| Key | What is needed |
|---|---|
| `press.bios[1]` | A longer biography, 100 to 150 words. The press page hides the whole Biography block while only the short form exists, so a journalist currently has nothing to quote or verify. |
| `press.photoCredit` | The photographer's name for the author photograph. A picture desk will ask before it publishes. |

## Open questions for the author

From `brief/REDESIGN.md`. Everything else in the redesign was decided by the team.

1. **The premise paragraph.** The site uses the back cover verbatim, because the interior does not supply 70 to 120 words at that position and no new prose may be written. It is jacket copy, and she may not want the site to speak in that register. The alternative is an assembly of whole printed sentences from pages 8 and 9.
2. **A credential on the first screen.** Her brief §8.1 lists what the hero carries and a credential is not on the list, so the hero is clean and "clinical psychologist" first appears in the author section. Her sentence is in the metadata and the structured data either way. One line under the byline would put it on the first screen.
3. **Three moments, three "None."** The three she named all end "Verified event / tone / crisis: None." Read together they can be heard as a stronger claim than the book makes — the one Chapter Thirteen, "The Time the Body Was Right", exists to refute. Page 11's "16 cases" line above them is the hedge. Swapping 22:47 for 22:40 would end the set on the moment the body was right, at the cost of the most quotable panel on the page.
4. **"Then turn tightened."** Your corrected text carries this twice, and it reads as a slip for "The turn tightened." The English page prints it exactly as you wrote it. French and German translate the sense and do not carry the slip, because in those languages it could only read as the translator's error. One word from you settles all three.
5. **Is the recording your own voice?** The Listen section says "Read by the author". If the file is a synthesised reading, that line has to change, and the site's whole rule is that it does not claim what is not true.
6. Still open from before: a publication month or season in place of "Publishing soon"; whether she wants an audio recording; and, for her copy-editor, the typos noted in the almost-final text on or near the quoted pages (page 12 "is build"; page 15 "used in this book an analogy"; page 19 "safety,."; page 31 "is was fatigue"; page 181 "the he panel"; page 191 "mashine"; page 192 "somthing"; page 220 "itsel"). The site quotes none of those sentences.

---

## Provenance in French, 6 September 2026

Added by the French literary localisation editor. English is the source for every line on this
site; there is no French edition of the book, so a French string is never quoted from a printed
French original and must not be recorded as though it were. The reasoning behind each choice is in
`translation/METHOD-fr.md` under **The redesign, 2026-09-06**.

| Key | Source of the French |
|---|---|
| `premise.sensorLine` | Translated from page 181 of the English text. « Le corps est un capteur avant d’être un narrateur. » |
| `premise.lines[0..1]` | **Translated from the English back cover**, `public/images/cover-back.jpg`, where the headline is printed in caps over three lines with the last, TO YOUR STATE., in red. « Vous ne réagissez peut-être pas au monde. » / « Vous réagissez peut-être à votre état. » No French cover exists and neither line has a printed French original. *May* is carried by « peut-être » in the same slot in both halves; the French cleft was refused because it breaks the parity of the two lines. See `translation/METHOD-fr.md`, **The author’s corrected text, 2026-09-06**. |
| `premise.mechanism[0..3]` | **Translated from the English back cover**, `public/images/cover-back.jpg`, under the printed eyebrow THE FIRST MISREADING. No French cover exists and none of these sixty-three words has a printed French original. |
| `variables.sortingLines[0..1]` | Translated from page 13. The French uses « Ce ne sont pas… » so that the pronoun points at the three display words above it, as the English *They* does on the page but not in the book. |
| `evidence.title`, `evidence.grades[].description` | **Re-authored in French from the author’s own English**, `brief/REDESIGN-BRIEF.md` §8 section 5, 6 September 2026. Not lexically matched: `title` is « Niveau de preuve », because French cannot head three bare adjectives with a mass noun, and *evidence* is carried by « preuve » in the heading and « résultats » in two of the three cells. Open in `translation/QUERIES-fr.md`, query 1. |
| `evidence.closing` | Translated from page 13, carried over unchanged from the retired `map.evidenceMarkers`, where it had already passed two native reviews. |
| `moments.label` | Translated from the printed CASE EVIDENCE label: « Pièces du dossier ». |
| `nav.menu`, `nav.closeMenu`, `a11y.menu` | Interface. « Menu », « Fermer », « Menu ». |
| `press.kitLabel`, `press.mapHeading`, `press.sourcesHeading`, `press.sourcesLabel` | Interface. `sourcesLabel` uses the book’s own French for the page 226 section, « Le pouls scientifique ». |
| `press.photoCredit` | `[COPY NEEDED: …]`, byte-identical and in English, as the rule requires. |
| `variables.loops[2]` | Safety’s printed list of examples is removed in French as it is in English, so the three definitions share one shape. |

## Removed in the redesign, 6 September 2026

Nothing here was cut for being wrong. It was cut because the page said it twice, or said it where it did not land. The full table with reasons is in `brief/REDESIGN.md`.

**Deleted from the site.**

- **Page 10's five timestamped readings** and their label. 06:38 and 22:47 returned as case panels five screens later; the timestamps are stronger once, with their verification.
- **Page 10's three lines**, "Nothing went wrong on this day. / The instruments were working. / The data was there the whole time." Replaced by the back cover's headline at the author's request, 6 September 2026: on screen they read as hedging. Still printed on page 10, and the page 10 folio still stands beside the section.
- **Page 10's closing couplet**, "The body speaks first." / "The mind explains second." The same proposition as the sensor line, and printed on the cover behind it.
- **Page 13's evidence prose**, 169 words, both paragraphs. They describe in words the three markers shown directly beneath them. Replaced by the author's own three descriptions.
- **Page 13's question**, "Is this the situation? Or is this the state?" Page 225's version closes the page; two near-identical questions on one page read as a loop.
- **`reading.afterResult`**, 34 words explaining the reading the reader has just taken.
- **`map.investigationTitle`**, "The Investigation". Page 10's setting is stronger and the word filled two consecutive screens.
- **`hero.eyebrow`**, "Time · Attention · Safety" — printed on the cover beside it and the headline of section 3.
- **`hero.scrollHint`**, "Scroll".
- **`footer.method`**, page 278's "Read the dashboard. Delay the story. Take the reading again." The front cover prints READ THE DASHBOARD / BEFORE YOU BELIEVE THE STORY and is on screen at the top of the page.
- **`footer.madeLine`** as a footer line — the cover line is now the closing.
- **The second imprint line** in the footer, which printed beside "© 2026 Budisin Publishing" as two adjacent identical names, and the **Publisher row** in `press.facts`, which `press.credits` already carries.
- **The companion-tool section**, which had been switched off since it was built and whose one sentence was never written.

**Relocated, not deleted.**

- The sixteen-chapter map with its colour keys and rail, "This book is the / Investigation.", the page 13 sorting-tool passage, the fourth case panel (13 / p.182 / 22:40) and the page 226 Scientific Heartbeat paragraphs → **the press page**.
- The page 26 block → **the extract page**, at the foot of the complete extract.
- `book.paragraphs[0]` → the head of the extract; `book.readers` → the author section.

## Removed on 6 September 2026 at the author's request

Seen on her phone and crossed out, earlier the same day. Each was verbatim from the book or her own copy; she is revising the book's wording and did not want it on the launch page.

- **Page 12, "You know the day", all four runs** and the disclosure that held the first.
- **The page 20 heading** "Same morning. Same paragraph. Same Katrin. Different instrument settings." and **the page 20 paragraph** "Three systems ran through Katrin's morning…".
- **Her paragraph "Over sixteen days, Katrin moves…"**, from the home page and the press description.
- **Page 14, "This book does not replace professional support…"**: "this is a book launch".

## What was removed earlier, and why

The press pack in `Press Pack/01_Copy/` was machine-written and is **not** a source. Several claims in it appear nowhere in the book and were on the first version of this site:

- **"320 reference entries", "207 DOIs verified against Crossref", "15 corrections".** The book states no count of its references anywhere, and the word Crossref does not appear in the manuscript.
- **"Nine places where the book overreaches its sources."** The book lists them but never counts them.
- **"Four years of reading."** Not stated in the book.
- **"A writer and business owner", the barista academy, the University of Luxembourg and Prof. Robert Reuter.** Replaced by the single sentence Ivana gave.
- **The evidence-marker captions** ("Clean, strong heartbeat." and the other two) and **the state-line legend lines**: not printed anywhere in the almost-final book.
- **"Every chapter opens on one of these pages."** Not the book's sentence, and not true.
- **The overreach heading**, cut from the almost-final book itself.

A journalist who checks this site against the book will find nothing that does not survive the check. That is the point.

---

## Provenance of the German edition, 6 September 2026

`content/de.ts` is an authored German edition under `translation/STANDARD.md` and brief §14, not a word-for-word rendering. It carries no sentence that `content/en.ts` does not carry, and the one rule governs it identically. Three provenance facts have to stay on the record, because a later editor cannot recover them from the file.

- **No German edition of the book exists.** "State. Not Situation." is never translated, in any of the thirteen places it appears in `de.ts`, and nothing on the German pages says or implies that a German edition is available. `press.facts` says so explicitly: „Englisch. Französische und deutsche Ausgabe folgen."
- **The cover lines are translated from the English cover.** `hero.subtitle`, `hero.strap`, `premise.mechanism[0..3]`, `closing.line` and `footer.band` are printed on `public/images/cover-front.jpg` and `cover-back.jpg`, which are **English** artwork. The German is a translation of that printed English, not a quotation from a printed German original, and the cover artwork on the page stays English in all three languages.
- **The three evidence descriptions are author-supplied, not printed.** `evidence.grades[].description` comes from `brief/REDESIGN-BRIEF.md` §8 section 5, written by Ivana on 6 September 2026. In German they are **re-authored to the same register**, not lexically matched — three short definitions in the words German research prose uses. They are not unsourced sentences and must not be cut as such.

Two omissions in the German follow the English exactly and are recorded here as well: page 14's "Things like social evaluation, exclusion, ambiguity, status." is not in `variables.loops[2]`, and page 13's 169 words of evidence prose are not on the page.

The German glossary decision that governs the site's central term — *reading* is **Lesart** where it is a reading of the world and **Befund** where it is a reading taken off the instrument — is recorded as amendment 35 in `translation/METHOD-de.md`, with the one consequence put to the author in `translation/QUERIES-de.md`.
