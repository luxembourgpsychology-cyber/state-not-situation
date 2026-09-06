# Where every sentence on this site comes from

The rule for this project: **the site may not say anything about the book that the book does not say about itself.** Every line of prose in `content/en.ts` is one of four things.

1. **Printed.** Set in the almost-final book or on its printed cover, word for word.
2. **Author-supplied.** Written by Ivana Budišin and given to the team, word for word.
3. **Interface.** A plain functional label: Play, Press, Email address.
4. **Placeholder.** Marked `[COPY NEEDED: …]`, waiting for Ivana.

If you add a sentence to `content/en.ts`, add its source here. If you cannot give it a source, it should be a placeholder instead.

Page numbers refer to the almost-final 278-page 6 × 9 in text (`~/Desktop/State Not Situation by Ivana Budisin.pdf`, supplied 5 September 2026), which supersedes the v39 files in the working folder. Every passage below was checked against that text's extraction, and the display pages (10, 11, 13, 14, 17) against page renders.

The section order follows `translation/EDITORIAL-POSITIONING.md` (5 September 2026).

---

## Printed on the cover

| Key | Where |
|---|---|
| `hero.eyebrow` | Front cover: TIME · ATTENTION · SAFETY |
| `hero.titleA` / `hero.titleB` | Half title, page 1, and the title page, page 3 |
| `hero.subtitle` | Front cover: "A field guide to the moment before interpretation becomes reality" |
| `hero.strap` | Front cover: "Your first reading is not the whole story." |
| `footer.band` | Back cover, red band: "Before you believe the story." |
| `footer.madeLine` | Front cover foot and title page: "Same life. Different instrument settings." |
| Title page inside the 3D book | Page 3, reproduced: strapline, title, author, imprint |

## Printed in the book, in page order

| Key | Page / source |
|---|---|
| `excerpt.paragraphs` + `excerpt.quote` | Pages 7 to 9, the opening, verbatim. The teaser shows three paragraphs, ending "You feel level, but you are not." |
| `misreading.*` | Page 10, the display page, verbatim and in the page's own order: the heading, three lines, "This book is the / Investigation.", "The same day, five readings", the five timestamped lines, "The body speaks first." / "The mind explains second." |
| `map.investigationTitle`, `map.mapLine`, `map.chapters[]` | Page 11, the map, with its printed page numbers. Page 11 prints TIME, ATTENTION and SAFETY as labels with their colours only; it prints no legend descriptions, so none appear on the site. |
| `knowTheDay.runs[0..2]` | Page 12, under the printed heading "You Know The Day", three runs quoted in order. Run 1 stops at "…like rainy weather behind glass."; run 2 at "…make the story dissolve."; run 3 is "The body spoke first. The mind explained second, and this explanation felt like the event." The sentence between runs 2 and 3 ("The story that is build on a day like this…") is not quoted because it carries a typo in the almost-final text. |
| `knowTheDay.runs[3]` | Pages 12 to 13, across the page break, after the book's section mark: "This book is about that mistake… try something right now." |
| `reading.*` | Page 13, verbatim: "Whatever you are feeling as you read this sentence. Check your jaw…" to "Is this the situation? Or is this the state?" The eyebrow "Try something right now" is the page's own phrase. |
| `map.evidenceIntro`, `map.evidenceMarkers` | Page 13, "Before We Begin", both paragraphs, verbatim. The second describes each marker in words. |
| `map.grades[]` | Page 13 prints the three pulses with the labels HIGH, MEDIUM, LOW beneath them and nothing else. The caption lines used earlier ("Clean, strong heartbeat." and the others) are not printed anywhere in the almost-final book and were removed. |
| `map.sortingTool`, `map.loops[].body` | Pages 13 to 14, the front-matter passage on the three systems, verbatim. |
| `book.readersAnchor` | Page 14: "This book does not replace professional support… the space where most people live on most days." |
| `book.heading` | Page 20: "Same morning. Same paragraph. Same Katrin. Different instrument settings." |
| `cases.closing` | Page 20: "It said I am failing; the data was I am tired." |
| `map.systemsIntro` | Page 20: "Three systems ran through Katrin's morning… David is the smallest part of it." |
| `cases.items[]` | The CASE EVIDENCE pages, reproduced: 00 p16, 02 p28, 11 p150, 13 p182. Seven chapters open on such a page (00, 02, 05, 11, 12, 13, 15); nine do not, which is why the site carries no sentence claiming otherwise. |
| `excerpt.closing` | Page 26: "This book is about the same error at kitchen scale…" quoted from that sentence; the preceding sentence, "The warships are the extreme case.", is omitted because a visitor who has not read Chapter One would meet an unexplained word. Flagged to the author as question 6 in the editorial decision. |
| `closing.question` | Page 225, the book's last sentence: "Is this the situation? Or is this their state?" |
| `map.heartbeat[]`, `press.description[3..4]` | Page 226, The Scientific Heartbeat: "Each chapter has three parts here…" and "Leaving them out would make the argument look tidier than it is." |
| `footer.method[]` | Page 278, the back page: "Read the dashboard. Delay the story. Take the reading again." |
| `press.facts` ISBN, publisher, extent | Copyright page, page 4: ISBN-13 978-2-87996-258-0, Budisin Publishing, 278 pages |
| `press.credits` | Copyright page: cover design Zoe Larusson; book design and typesetting Ivana Budišin |
| `footer.rights` | Copyright page: © 2026 Budisin Publishing |

## Supplied by the author

| Key | Note |
|---|---|
| `author.bio`, `press.bios[0]` | "Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book." Given 4 September 2026. |
| `book.paragraphs[0..1]`, `press.description[0..1]` | "Over sixteen days, Katrin moves through ordinary situations…" and "It is less interested in teaching you to trust your instincts than in showing you what, exactly, you are trusting." Given 5 September 2026. |
| `book.readers` | "For anyone who has ever been certain about what a situation meant…" Given 5 September 2026, in the same message as the paragraphs above. The editorial decision asked for confirmation because this file had not recorded it; the chat record is the source. |

## Interface labels

Everything in `nav`, `status`, `listen`, `a11y`, and the short labels in `press` (Downloads, Biography, Publication, Credits, Contact, Back to the book) are functional interface strings. `map.mapFooter` ("The Scientific Heartbeat follows the chapters.") is a functional signpost naming the printed section title; `map.eyebrow`, `book.eyebrow`, `cases.eyebrow`, `excerpt.eyebrow`, `author.eyebrow` are section labels.

## Still placeholders

| Key | What is needed |
|---|---|
| `press.bios[1]` | A longer biography, 100 to 150 words. The press page hides it until written. |
| `companion.line` | One sentence about the companion tool. The section is switched **off** in `site.config.ts` until this exists. |

## Open questions for the author, from the editorial decision

The decision's first question, whether the "who it is for" line is hers, is answered: it is (chat, 5 September 2026). Seven remain, numbered as in `translation/EDITORIAL-POSITIONING.md`.

2. A short hero byline in her own words, so that "clinical psychologist" is on the first screen.
3. One or two sentences on why she wrote the book, for the author section.
4. A publication month or season in place of "Publishing soon", if one exists; nothing is invented.
5. For information only: her description says "sixteen days"; the book says "16 cases", and four chapters are not Katrin's days. Her phrasing stands.
6. Whether page 26 may be quoted from "This book is about the same error at kitchen scale.", omitting the preceding sentence "The warships are the extreme case."
7. Whether she wants a recording; Listen is hidden until `audioUrl` exists.
8. For her copy-editor, typos noticed in the almost-final text on or near the quoted pages: page 12 "is build" (built); page 15 "used in this book an analogy" (is an analogy); page 19 "safety,."; page 31 "is was fatigue"; page 181 "the he panel"; page 191 "mashine"; page 192 "somthing"; page 220 "itsel". The site quotes none of these sentences.

---

## Removed on 5 September 2026 against the almost-final PDF and the editorial decision

- **The overreach heading.** "Where the chapters say more than their sources… collected once here." has been cut from the almost-final book (the nine entries remain, unheaded). Gone from the site.
- **The evidence-marker captions.** "Clean, strong heartbeat. Replicated, robust evidence." and the other two: not printed anywhere in the almost-final book. Page 13's own paragraph describes the markers instead.
- **The state-line legend lines.** "Circadian phase, sleep debt, metabolic state" and the other two: not printed; page 11 carries labels and colours only.
- **"Every chapter opens on one of these pages."** Not the book's sentence, and not true.
- **"The body is a sensor before it is a narrator."** (page 181) as the heading of the book section: Chapter Twelve's concession, not the book's thesis. Retired from the site.
- **The paraphrased fourth paragraph of the press description**, replaced by the page 226 sentences verbatim.
- **The earlier "Time started at 06:38…" closing paragraph and its section**, at the author's request; the passage now introduces the three systems inside the map, in full, where it explains them.

## What was removed earlier, and why

The press pack in `Press Pack/01_Copy/` was machine-written and is **not** a source. Several claims in it appear nowhere in the book and were on the first version of this site:

- **"320 reference entries", "207 DOIs verified against Crossref", "15 corrections".** The book states no count of its references anywhere, and the word Crossref does not appear in the manuscript.
- **"Nine places where the book overreaches its sources."** The book lists them but never counts them.
- **"Four years of reading."** Not stated in the book.
- **"A writer and business owner", the barista academy, the University of Luxembourg and Prof. Robert Reuter.** Replaced by the single sentence Ivana gave.
- **"Sixteen ordinary days, read twice."** A press-pack recommendation for a back cover that was never printed.
- **The INPUT / FIRST READING / POSSIBLE STATE table.** Printed on the back cover, but it read as a data table on screen; the page 10 readings now do that job in the book's own layout.

A journalist who checks this site against the book will find nothing that does not survive the check. That is the point.
