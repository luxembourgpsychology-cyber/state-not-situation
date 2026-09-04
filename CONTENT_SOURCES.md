# Where every sentence on this site comes from

The rule for this project: **the site may not say anything about the book that the book does not say about itself.** Every line of prose in `content/en.ts` is one of three things.

1. **Printed.** Set in the book or on its printed cover, word for word.
2. **Interface.** A plain functional label: Play, Press, Email address.
3. **Placeholder.** Marked `[COPY NEEDED: …]`, waiting for Ivana.

If you add a sentence to `content/en.ts`, add its source here. If you cannot give it a source, it should be a placeholder instead.

Page numbers refer to the 278-page 6 × 9 in interior (`State Not Situation 6x9 v39 KDP.pdf`).

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

## Printed in the book

| Key | Page / source |
|---|---|
| `reading.*` (the whole section) | Page 13, verbatim: "Whatever you are feeling as you read this sentence. Check your jaw. Check your breath. Check your shoulders. What you found is a reading. A reading of the instrument … Is this the situation? Or is this the state?" |
| `loops.intro` | Front matter, before Chapter Zero: "The chapters that follow are organised around three systems…" |
| `loops.items[].body` | Same passage: the Time, Attention and Safety definitions |
| `loops.items[].legend` | The printed state-line legend: "Circadian phase, sleep debt, metabolic state" / "Reward loops, checking, task switching" / "Threat detection, first drafts, misreads" |
| `loops.title` + `loops.outro` | Chapter Zero, closing paragraph: "Three systems ran through Katrin's morning. Time started at 06:38…" |
| `cases.title` | Page 11, the map: "16 CASES. THREE READINGS." |
| `cases.items[]` | The CASE EVIDENCE pages, reproduced: 00 p16, 02 p28, 05 p66, 11 p150, 13 p182, 15 p208 |
| `excerpt.paragraphs` + `excerpt.quote` | Pages 7 to 9, the opening, verbatim |
| `about.title` | Chapter Twelve: "The body is a sensor before it is a narrator." |
| `about.quote` | Page 12: "This book is about that mistake. It is about that error as a daily, ambient, invisible feature…" Shown as a quotation with its page, because "that mistake" needs its own context. |
| `about.mapLine` / `about.mapSubtitle` | Page 11 |
| `about.evidenceIntro` | Page 13, "Before We Begin", verbatim |
| `about.grades[]` | The printed confidence-marker legend: High / Medium / Low with their two lines each |
| `about.overreachEyebrow` + `about.overreach` | The Scientific Heartbeat: "Where the chapters say more than their sources, or something different. The chapters are stories and have been left as written…" |
| `about.chapters[]` | Page 11, the contents map, with its printed page numbers |
| `press.facts` ISBN, publisher, extent | Copyright page, page 4: ISBN-13 978-2-87996-258-0, Budisin Publishing, 278 pages |
| `press.credits` | Copyright page: cover design Zoe Larusson; book design and typesetting Ivana Budišin |
| `footer.rights` | Copyright page: © 2026 Budisin Publishing |

## Supplied by the author

| Key | Note |
|---|---|
| `author.bio`, `press.bios[0]` | "Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book." Given by Ivana on 4 September 2026. |

## Still placeholders

| Key | What is needed |
|---|---|
| `about.paragraphs[0]` | Two or three sentences describing what the book contains, in her own words |
| `about.readers` | One or two sentences on the reader it is for |
| `press.bios[1]` | A longer biography, 100 to 150 words |
| `companion.line` | One sentence about the companion tool. The section is switched **off** in `site.config.ts` until this exists. |
| `author.photoAlt` | Written; check she is happy with the description |

---

## What was removed, and why

The press pack in `Press Pack/01_Copy/` was machine-written and is **not** a source. Several claims in it appear nowhere in the book. These were on the first version of this site and have been taken out:

- **"320 reference entries", "207 DOIs verified against Crossref", "15 corrections".** The book states no count of its references anywhere, and the word Crossref does not appear in the manuscript. Unverifiable as printed.
- **"Nine places where the book overreaches its sources."** The book does list nine such places, but never counts them. The site now quotes the section's own heading instead of asserting a number.
- **"Four years of reading."** Not stated in the book.
- **"A writer and business owner", the barista academy, the University of Luxembourg and Prof. Robert Reuter.** Replaced by the single sentence Ivana gave.
- **"Sixteen ordinary days, read twice."** A press-pack recommendation for a back cover that was never printed.
- **The INPUT / FIRST READING / POSSIBLE STATE table.** It is printed on the back cover, but it read as a data table on screen. Replaced by the three loops, which is the same idea in the book's own longer words.

A journalist who checks this site against the book will find nothing that does not survive the check. That is the point.
