# Where every sentence on this site comes from

The rule for this project: **the site may not say anything about the book that the book does not say about itself.** Every line of prose in `content/en.ts` is one of four things.

1. **Printed.** Set in the final book (v44) or on its printed cover, word for word.
2. **Author-supplied.** Written by Ivana Budišin and given to the team, word for word. This includes anything she wrote in `brief/REDESIGN-BRIEF.md`.
3. **Interface.** A plain functional label: Menu, Press, Email address.
4. **Placeholder.** Marked `[COPY NEEDED: …]`, waiting for Ivana.

If you add a sentence to `content/en.ts`, add its source here. If you cannot give it a source, it should be a placeholder instead.

Page numbers are the printed page labels of the final interior, **v44**: 282 pages, 6 × 9 in, roman i–x then arabic 1–272 (`~/Desktop/State Not Situation 6x9 v44 KDP.pdf`, 14 September 2026). Every citation in this file was re-checked on 14 September 2026 by finding the passage in the v44 text; see *Re-verified against v44* below. The records in `brief/` and `translation/` cite the almost-final 278-page text: for body pages, v44 = old − 6, and old pages 1, 3 and 4 are now i, iii and iv. Cover references are to `public/images/cover-front.jpg` and `cover-back.jpg`, which are the printed artwork, rendered on 14 September 2026 from the final KDP cover file (`~/Desktop/STATE NOT SITUATION - KDP UPLOAD/COVER - UPLOAD.pdf`); see *The final cover, 14 September 2026* below.

The architecture is `brief/REDESIGN.md` (6 September 2026), which implements the author's brief. It supersedes `translation/EDITORIAL-POSITIONING.md` and `translation/HOOK-DECISION.md`, which are kept as the record of how the page got here.

---

## Re-verified against v44, 14 September 2026

The final interior added front matter (a dedication and a Foreword, pages v to ix), moved the half title, title page and copyright page to i, iii and iv, and starts arabic page 1 on the pilot. Every page reference on the site was moved by finding its passage in the v44 text, not by arithmetic; for body pages the result is always old page − 6. What else the check found:

- **Two words of the pilot.** v44 page 1 prints "The mist, the one that erases…" and page 2 prints "The turn tightened." The text the author supplied on 6 September had "The mist came, the one…" and "Then turn tightened." The English page now follows the book. **"The mist, the one that erases…" has no verb**, and "came" was her deliberate edit of 6 September, so the book may have lost it; if so, the book is the thing to correct and the site follows. French and German are unchanged (« La brume vint… », „Der Nebel kam…“): they read correctly either way.
- **Chapter 13's Safety value** is PRECAUTION TAKEN, not CORRECT. French « PRÉCAUTION PRISE », German „VORKEHRUNG GETROFFEN“, both for the native reviewer to confirm.
- **Legal deposit.** The copyright page prints "Legal deposit: Bibliothèque nationale du Luxembourg" and no CIP record. The site no longer claims one.
- **Extent.** 282 pages.
- **The closing question** is on page 218 and is no longer the book's last sentence; see `closing.question`. Page 219 is blank.
- **No author biography is printed inside the book.** The almost-final text had one on page 278; v44's last page, 272, prints only "Read the dashboard. Delay the story. Take the reading again." `author.bio` and `hero.credential` are the author's own words and stand on that; since the final cover of 14 September 2026 the back cover also prints the biography's first sentence and the front cover prints CLINICAL PSYCHOLOGIST under her name.
- **The eight typos** listed under open question 8 are all gone.

## The final cover, 14 September 2026

The cover went to KDP the same evening as v44: `~/Desktop/STATE NOT SITUATION - KDP UPLOAD/COVER - UPLOAD.pdf`, a full wrap of 12.885 × 9.25 in with 0.125 in bleed and a 0.635 in spine. Every cover image on the site and in the press kit was re-rendered from it that night: `public/images/cover-front.jpg`, `cover-back.jpg`, `cover-spine.jpg`, `mockup-3d.png`, `og.jpg`, and in `public/press/` the four 300 dpi PNGs, the two front-cover JPEGs, `book-render.png`, the print-ready PDF (now the KDP file itself), and the banners, social crops and framed render, which carry the render. Anything in `../Press Pack/` or the older `STATE_NOT_SITUATION_cover_6x9.pdf` on the Desktop is superseded. What changed on the cover, and what it means for the strings above:

- **Front.** READ THE DASHBOARD / BEFORE YOU BELIEVE THE STORY is gone. "Same life. Different instrument settings." now sits in red above the bottom band, which prints the author's name with CLINICAL PSYCHOLOGIST beneath it. The subtitle and "Your first reading is not the whole story." are unchanged. The spine reads "STATE. NOT SITUATION." with the full stop.
- **Back.** Eyebrow and headline unchanged. The INPUT / FIRST READING / POSSIBLE STATE table became four sentences: "A short message feels cold." / "A meeting feels dangerous." / "A craving feels like a decision." / "A quiet room feels like judgement." The paragraph is now set in a serif. Beneath it: "Ivana Budišin is a clinical psychologist living and working in Luxembourg.", then the sign-off CHECK THE SIGNAL / BEFORE YOU BELIEVE THE STORY., then the red band with the QR code to statenotsituation.com, "STATE. / THE COMPANION APP TO THIS BOOK / statenotsituation.com" and the ISBN barcode. "Is this the situation? Or is this the state?" no longer appears on the back.
- **Consequences.** `footer.band` is still printed, now as the sign-off rather than in the band. `hero.credential` and the first sentence of `author.bio` are now printed on the cover as well as author-supplied. The four new back-cover sentences are **not** on the site; whether they should be is the author's call, recorded as open question 9. Nothing else quoted from the cover changed.

---

## Printed on the cover

| Key | Where |
|---|---|
| `hero.titleA` / `hero.titleB` | Front cover; half title, page i; title page, page iii |
| `hero.subtitle` | Front cover and title page (since 14 Sep 2026): "Why your body decides what a moment means before you do". The earlier "A field guide to the moment before interpretation becomes reality" is retired. FR and DE translated the new sentence on 22 September 2026: « Pourquoi votre corps décide avant vous du sens d’un moment » and „Warum Ihr Körper entscheidet, was ein Moment bedeutet, bevor Sie dazu kommen“, in all four places each |
| `hero.strap` | Front cover: "Your first reading is not the whole story." |
| `premise.eyebrow` | Printed as the eyebrow on **both** page 4 and the back cover: "The first misreading" |
| `premise.lines[0..1]` | **Back cover**, the headline printed under the same eyebrow: "You may not be reacting to the world. You may be reacting to your state." It replaced page 4’s three lines ("Nothing went wrong on this day…") on 6 September 2026 at the author's request: printed, they are the setup for "This book is the Investigation."; lifted onto a screen and set at lead size they read as three qualifications rather than a claim. The section now carries the back cover in its printed order — eyebrow, headline, paragraph; the four sentences the final cover sets between the headline and the paragraph are not on the site, see *The final cover*. |
| `premise.mechanism[0..3]` | **Back cover**, the four sentences beneath the strap, verbatim: "We usually treat these moments as information about life…" to "…gives that feeling a reason." Sixty-three words. Used as the site's premise; see the note below. |
| `closing.line` | Front cover foot and title page: "Same life. Different instrument settings." |
| `footer.band` | Back cover, the sign-off under the paragraph: CHECK THE SIGNAL / "Before you believe the story." Until the final cover of 14 September 2026 it was set in the back cover's red band, which now carries the QR code and the ISBN. |

**On the back-cover premise.** The author's brief asks for a premise of 70 to 120 words introducing the mechanism. The book's interior does not supply them at that position, and no new prose may be written, so the site uses the passage the object already owns. It is printed, continuous, and it is the one paragraph on the whole book written to make a stranger pick it up. Recorded as open question 1 in `brief/REDESIGN.md`.

The INPUT / FIRST READING / POSSIBLE STATE table printed beside it on the earlier back cover was **not** used: it read as a data table on screen. The final cover replaced the table with four sentences ("A short message feels cold." and three more), which are not on the site either; see *The final cover, 14 September 2026*.

## Printed in the book, in page order

| Key | Page / source |
|---|---|
| `premise.folio` | Page 4, the printed folio |
| `moments.line`, `press.mapLine` | Page 5: "16 cases. Three readings. One question: state or situation?" On the home page it heads the three moments, which is the only place a reader learns the book has sixteen cases. |
| `press.mapLabel`, `press.mapTitle` | Page 4: "This book is the" / "Investigation." Heads the chapter map on the press page, where the Investigation actually is. |
| `press.chapters[]`, `press.pageColumn` | Page 5, the map, with its printed page numbers, each checked against the chapter's opening page in v44. Page 5 prints TIME, ATTENTION and SAFETY as labels with their colours only, and no legend descriptions, so none appear. |
| `reading.*` | Page 7, verbatim: "Whatever you are feeling as you read this sentence. Check your jaw. Check your breath. Check your shoulders. What you found is a reading." The eyebrow "Try something right now" is the page's own phrase. In the book these are a run-on clause in a body paragraph; the site sets them as display type, which is a promotion and not a reproduction. |
| `evidence.grades[].label` | Page 7 prints the three markers with the labels HIGH, MEDIUM, LOW beneath them and nothing else. |
| `evidence.closing` | Page 7: "These markers exist because the book's own risk is the same risk it describes." |
| `variables.sortingLines[0..1]` | Page 7: "They are not brain regions or neural pathways." / "They are a sorting tool, a way to ask three questions when everything feels wrong at once." |
| `variables.loops[].name` / `.body` | Pages 7 to 8, the three definitions. **Safety's "Things like social evaluation, exclusion, ambiguity, status." is omitted** — seven words of examples before the reader has the mechanism, and the only reason Safety ran to twice the length of Time. The omission is deliberate and is recorded here so it is not read as a slip. |
| `press.sortingTool` | Page 7, the whole passage, on the press page, where "the chapters that follow" points at the chapter map above it. |
| `moments.items[]` | The CASE EVIDENCE pages, reproduced: 00 p.10, 02 p.22, 11 p.144. Seven chapters open on such a page (00, 02, 05, 11, 12, 13, 15); nine do not, which is why the site carries no sentence claiming otherwise. Each card carries the short rule the page prints under its label (28 × 1.6 pt), in the page's own ink, read per page from the print file: Time (CMYK .68 .2 0 .46) on 00 and 02, Safety (CMYK 0 .71 .78 .25) on 11. Chapter 12's page prints no rule, which is why the colours are read and not derived. |
| `moments.label` | "Case evidence", printed at the head of every such page. |
| `moments.closing` | Page 14: "It said I am failing; the data was I am tired." |
| `excerpt.paragraphs[]`, `excerpt.quote` | Pages 1 to 3, the opening, verbatim. The home page shows the first two paragraphs, both page 1, ending "A slow descent feels like holding steady."; the rest is on `/read`. Two words follow v44 rather than the text the author supplied on 6 September; see *Re-verified against v44*. |
| `excerpt.title`, `excerpt.sectionLabel` | Page 220, The Scientific Heartbeat: "Before the chapters. The pilot" |
| `excerpt.closing`, `excerpt.closingSource` | Page 20: "This book is about the same error at kitchen scale…" **On `/read` only**, at the foot of the complete extract, where the preceding sentence "The warships are the extreme case." has been read. This answers what was open question 6. |
| `premise.sensorLine` | Page 175: "The body is a sensor before it is a narrator." Reinstated at the author's request, brief §4, where she names it a crucial line. |
| `closing.question`, `closing.source` | Page 218, near the end of the last chapter, "The World of Instruments": "Is this the situation? Or is this their state?" **In v44 it is no longer the book's last sentence:** the page follows it with "What belongs to the situation, and what might state be adding?" The site still sets the question alone; whether to add the second sentence is the author's call. |
| `press.sources[0..1]` | Page 220, The Scientific Heartbeat: "Each chapter has three parts here…" and "Leaving them out would make the argument look tidier than it is." |
| `press.facts` ISBN, publisher, extent | Copyright page, page iv: ISBN-13 978-2-87996-258-0, Budisin Publishing. Extent: 282 pages, the page count of the final interior PDF (x + 272); the copyright page prints no extent. |
| `press.facts` legal deposit | Copyright page, page iv: "Legal deposit: Bibliothèque nationale du Luxembourg". **Until 14 September 2026 the site said "A CIP record is available at Bibliothèque nationale du Luxembourg."** v44 prints no CIP record, so the row now carries only the printed words, in all three languages. |
| `readings.items[]` | The opening page of chapters 01 to 15, reproduced whole: the chapter number, the three systems with the value each was holding, and the one line printed beneath them. Read from the print file with `awk`, not retyped. Pages 17, 23, 33, 45, 61, 73, 89, 99, 115, 129, 145, 161, 177, 189 and 203, from the printed map on page 5, each checked against the opening page itself in v44. **Chapter 13's Safety value is PRECAUTION TAKEN in v44**; the almost-final text printed CORRECT, and the site carried it until 14 September 2026. **There are fifteen, not sixteen:** chapter 00 opens on a CASE EVIDENCE panel instead, which is why the site never says "sixteen readings". The values are set in capitals on the page and are carried in capitals here. **The book prints no legend explaining what a value means, and neither does the site.** |
| `readings.label` | "Reading", the word printed before each chapter number. |
| `press.credits` | Copyright page: cover design Zoe Larusson; book design and typesetting Ivana Budišin |
| `press.credits` Photography row | **Author-supplied, 6 September 2026**, not on the copyright page. She wrote: "Zoe LARUSSON is the photographer and book designer." The photography credit is recorded. **The book-design credit is not**: page iv prints "Book design and typesetting: Ivana Budišin" and "Cover design: Zoe Larusson", and the site may not contradict the printed book. Flagged to the author on the same day; if page 4 is wrong, the book is the thing to correct. |
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

| `hero.credential` | **The author's own, 6 September 2026**: "Put my name and job as you suggested." Compressed from her biography to the words that fit one line under the byline. The almost-final text printed that biography on page 278; **v44 prints no author biography**, so this line rested on her word alone until the final cover of 14 September 2026, which prints CLINICAL PSYCHOLOGIST under her name on the front and her biography's first sentence on the back. Answers open question 2, which is now closed. |
| `press.photoCredit` | **The author named the photographer, 6 September 2026**: Zoe Larusson. Answers the placeholder, which is now closed. |

## The press pack

`public/press/` holds the assets a journalist, bookseller or event organiser needs, and `lib/make-press-kit.mjs` builds `State-Not-Situation-press-kit.zip` from them plus a fact sheet in each language generated from the content files, so the sheet can never drift from the page. Rebuild it with `node lib/make-press-kit.mjs` after any change to the press content.

Two things were **withdrawn** from the pack on 6 September 2026, and should not be put back without checking:

- **The 170 × 240 mm cover files** (`cover_front_300dpi.png`, `cover_back_300dpi.png`, `cover_wrap_300dpi.png`, `STATE_NOT_SITUATION_cover_170x240_PRINT.pdf`, `mockup_3d.png`, `mockup_3d_transparent.png` in the author's `Press Pack/` folder). The book is 6 × 9 in. Those files are a superseded trim, and the transparent render was the one the site had been offering. A journalist laying out a feature from them would print the wrong shape.
- **`Press Pack/01_Copy/`.** Machine-written, and the source of the claims this whole provenance regime exists to keep out. The fact sheet in the kit is generated from `content/*.ts` instead.

`State-Not-Situation-extract-the-opening.pdf` is set by `lib/make-extract-pdf.mjs` from the verified text in `content/en.ts`, because the extract PDF in the author's folder was exported on 4 September from the older text. It is a plain setting, not a facsimile: **it could now be replaced with pages 1 to 3 of the v44 interior PDF**, which is better. Re-set on 14 September 2026 from the text as checked against v44, and the press kit rebuilt with it.

## Interface labels

Everything in `nav` (including `menu` and `closeMenu`), `status`, `listen`, `a11y`, the folios, and the short labels in `press` (Downloads, Biography, Publication, Credits, Contact, Sources and evidence, Back to the book) are functional interface strings.

| `press/excerpt-the-opening.pdf` | **Re-set 14 September 2026** by `lib/make-extract-pdf.mjs` from the English text as checked against v44 pages 1 to 3, and the press kit rebuilt with it. |

## Site-operational strings, 7 September 2026

Deliberately not under *Printed in the book* or *Supplied by the author*. This is
the publisher speaking about the website, not about the book, so it has no page
number behind it and needs none. The one rule is satisfied: it states the book's
language and how these pages were made, and nothing about the book's content.

| Key | Source |
|---|---|
| `footer.translationNote` | **The author asked for it**, 7 September 2026: *"Can you add that French and German are ai translated… somehow so it's not too bad… but professional"*. Her words are the source of the requirement, not of the wording. English reference: "The book is published in English; these pages were translated from it by AI." **Shortened by the author on 7 September 2026**, who cut the pending-review clause and the authoritative-version clause: she asked for one simple sentence. **The French and German are authored natively to the same four facts, not translated from that English line** — reasoning in `METHOD-fr.md` and `METHOD-de.md`. Two facts, and no third: the book is English, and AI translated these pages. |
| Where it renders | The footer imprint row, beside the copyright, gated on `isUnderReview(locale)`. **English carries the reference wording and never displays it.** The note removes itself when a language is signed off and `underReview` flips in `site.config.ts`; there is nothing to delete by hand. Not repeated on `/read`: that page renders the same footer, and a second notice above the book's own prose would be a warning label on her writing, which is the thing she ruled out. |

## Still placeholders

| Key | What is needed |
|---|---|
| `press.bios[1]` | A longer biography, 100 to 150 words. The press page hides the whole Biography block while only the short form exists, so a journalist currently has nothing to quote or verify. |

## Open questions for the author

From `brief/REDESIGN.md`. Everything else in the redesign was decided by the team.

1. **The premise paragraph.** The site uses the back cover verbatim, because the interior does not supply 70 to 120 words at that position and no new prose may be written. It is jacket copy, and she may not want the site to speak in that register. The alternative is an assembly of whole printed sentences from pages 2 and 3.
2. ~~**A credential on the first screen.**~~ **Closed 6 September 2026.** She asked for it: one line, "Clinical psychologist, Luxembourg", set in mono under the byline.
3. **Three moments, three "None."** The three she named all end "Verified event / tone / crisis: None." Read together they can be heard as a stronger claim than the book makes — the one Chapter Thirteen, "The Time the Body Was Right", exists to refute. Page 5’s "16 cases" line above them is the hedge. Swapping 22:47 for 22:40 would end the set on the moment the body was right, at the cost of the most quotable panel on the page.
4. ~~**"Then turn tightened."**~~ **Closed 14 September 2026 by the book itself:** v44 page 2 prints "The turn tightened.", and the English page now does too. French and German already translated the sense.
5. ~~**Is the recording your own voice?**~~ **Closed 6 September 2026, by removal.** She listened and took the reading off the site: "take out the reading… it's bad." `editions.en.audioUrl` is `null`, so the Listen section, its footer link and its link from `/read` are all gone, and no claim about a voice is made anywhere. What was learned about generating a better one is in `audio/README.md`.
6. **One translation query is open.** Two were raised on 6 September 2026 in the author's own query format; the German one closed the same evening.
   - **French, `QUERIES-fr.md` query 2 — which way the claim runs in NOT CLAIMED.** English leaves it open and French must close it: either the system claims the state, or nothing has claimed the system. The file carries « NON SOLLICITÉ », the one wording that does not choose. It governs four chapter openings and both halfway maps.
   - ~~**German, `QUERIES-de.md` query 2.**~~ **Closed 6 September 2026** on her own instruction to reconsider the lexicon. Page 11 is now „Drei Befunde", amendment 35 is replaced, and nothing German is waiting on her. One line is recorded at medium confidence rather than queried: „Drei Befunde" as a serif display heading on the home page, where no *Untersuchung* stands above it. Her ear may overrule it.

7. **Should the translation note survive sign-off?** As built it disappears when a native speaker signs a language off and `underReview` flips, although those pages will still have been AI-translated. That is an architecture decision rather than a translation one, and it is hers. If she wants the AI fact to outlive the review, the note splits into two strings on two gates: one that says how the pages were made, which never goes away, and one that says the review is pending, which does. Nothing already written needs rewriting to allow it.

8. Still open from before: a publication month or season in place of "Publishing soon"; whether she wants an audio recording; and, for her copy-editor, the typos noted in the almost-final text on or near the quoted pages (page 12 "is build"; page 15 "used in this book an analogy"; page 19 "safety,."; page 31 "is was fatigue"; page 181 "the he panel"; page 191 "mashine"; page 192 "somthing"; page 220 "itsel"). The site quotes none of those sentences. **Checked 14 September 2026: none of the eight survives in v44.**

9. **The four back-cover sentences.** The final cover of 14 September 2026 prints "A short message feels cold." / "A meeting feels dangerous." / "A craving feels like a decision." / "A quiet room feels like judgement." between the headline and the paragraph. They are printed and could stand in the premise between `premise.lines` and `premise.mechanism`, where the site otherwise carries the back cover in order; the earlier table in that position was left off because it read as data on screen. Adding them is her call. The 16 × 9 social crop in the press kit already carries them, because it had carried the table.

---

## Provenance in French, 6 September 2026

Added by the French literary localisation editor. English is the source for every line on this
site; there is no French edition of the book, so a French string is never quoted from a printed
French original and must not be recorded as though it were. The reasoning behind each choice is in
`translation/METHOD-fr.md` under **The redesign, 2026-09-06**.

| Key | Source of the French |
|---|---|
| `premise.sensorLine` | Translated from page 175 of the English text. « Le corps est un capteur avant d’être un narrateur. » |
| `premise.lines[0..1]` | **Translated from the English back cover**, `public/images/cover-back.jpg`, where the headline is printed in caps over three lines with the last, TO YOUR STATE., in red. « Vous ne réagissez peut-être pas au monde. » / « Vous réagissez peut-être à votre état. » No French cover exists and neither line has a printed French original. *May* is carried by « peut-être » in the same slot in both halves; the French cleft was refused because it breaks the parity of the two lines. See `translation/METHOD-fr.md`, **The author’s corrected text, 2026-09-06**. |
| `premise.mechanism[0..3]` | **Translated from the English back cover**, `public/images/cover-back.jpg`, under the printed eyebrow THE FIRST MISREADING. No French cover exists and none of these sixty-three words has a printed French original. |
| `variables.sortingLines[0..1]` | Translated from page 7. The French uses « Ce ne sont pas… » so that the pronoun points at the three display words above it, as the English *They* does on the page but not in the book. |
| `evidence.title`, `evidence.grades[].description` | **Re-authored in French from the author’s own English**, `brief/REDESIGN-BRIEF.md` §8 section 5, 6 September 2026. Not lexically matched: `title` is « Niveau de preuve », because French cannot head three bare adjectives with a mass noun, and *evidence* is carried by « preuve » in the heading and « résultats » in two of the three cells. Open in `translation/QUERIES-fr.md`, query 1. |
| `evidence.closing` | Translated from page 7, carried over unchanged from the retired `map.evidenceMarkers`, where it had already passed two native reviews. |
| `moments.label` | Translated from the printed CASE EVIDENCE label: « Pièces du dossier ». |
| `nav.menu`, `nav.closeMenu`, `a11y.menu` | Interface. « Menu », « Fermer », « Menu ». |
| `press.kitLabel`, `press.mapHeading`, `press.sourcesHeading`, `press.sourcesLabel` | Interface. `sourcesLabel` uses the book’s own French for the page 220 section, « Le pouls scientifique ». |
| `press.photoCredit` | **Translated from the author's own attribution**, 6 September 2026: « Photographie : Zoe Larusson », with the no-break space French takes before a colon. The name does not change. Replaces the row that recorded the `[COPY NEEDED]` placeholder. |
| `press.credits` Photography row | Translated label, author-supplied value: « Photographie » / « Zoe Larusson », after « Conception de la couverture », as in the English. |
| `hero.credential` | **Translated from the author's own English line**, 6 September 2026: « Psychologue clinicienne, Luxembourg ». *Clinicienne* is the word of the approved French biography; the place stands bare after the comma, as a French byline sets it. |
| `hero.subtitle`, and the same sentence in `meta.description`, `meta.ogImageAlt` and the `press.facts` subtitle row | **The author's own French, 6 September 2026**, given verbatim: « Un guide de terrain pour l'instant qui précède le moment où l'interprétation devient réalité ». It replaces the editor's translation, « … de l'instant où l'interprétation n'est pas encore devenue réalité », in all four places. This line was no longer a translation: it was category (b), her own words. **Superseded 22 September 2026**: the English subtitle changed on 14 September 2026, so her French sentence no longer had an English original; the new subtitle is translated (« Pourquoi votre corps décide avant vous du sens d’un moment ») and the French author who reviewed the page had, independently, marked her old sentence up as well. |
| `readings.title`, `.label`, `.pageLabel` | Translated from the English: « Les lectures », « Lecture », « Page ». The glossary term for *reading*; page 11 already prints « Trois lectures » in French. |
| `readings.items[].time` / `.attention` / `.safety` | **Translated from the printed English chapter openings**, pages 17 to 203. Forty-five gauge labels, set in capitals as the book sets them, with the accents French capitals take. No French edition exists and none has a printed French original. Nine come straight from the `METHOD-fr.md` glossary. Adjectives agree with the system they stand under: TEMPS / DOMINANT against SÉCURITÉ / DOMINANTE. NOT CLAIMED is « NON SOLLICITÉ » and is **open**, `QUERIES-fr.md` query 2. Chapter 13's Safety value became « PRÉCAUTION PRISE » on 14 September 2026, when v44 printed PRECAUTION TAKEN in place of CORRECT; it replaces « CORRECTE » and is for the native reviewer to confirm. |
| `readings.items[].line` | **Translated from the fifteen printed lines.** Aphorisms, held to the English length: 36 to 61 characters against the English 33 to 54. |
| `readings.items[].number` / `.page` | The book's own figures, byte-identical in all three languages. **`readings.items[].time` is not**, unlike `moments.items[].time`, which is a printed clock time — a mechanical parity check will flag all twelve translated Time cells, and that is correct. |
| `variables.loops[2]` | Safety’s printed list of examples is removed in French as it is in English, so the three definitions share one shape. |

## Removed in the redesign, 6 September 2026

Nothing here was cut for being wrong. It was cut because the page said it twice, or said it where it did not land. The full table with reasons is in `brief/REDESIGN.md`.

**Deleted from the site.**

- **Page 4’s five timestamped readings** and their label. 06:38 and 22:47 returned as case panels five screens later; the timestamps are stronger once, with their verification.
- **Page 4’s three lines**, "Nothing went wrong on this day. / The instruments were working. / The data was there the whole time." Replaced by the back cover's headline at the author's request, 6 September 2026: on screen they read as hedging. Still printed on page 4, and the page 4 folio still stands beside the section.
- **Page 4’s closing couplet**, "The body speaks first." / "The mind explains second." The same proposition as the sensor line, and printed on the cover behind it.
- **Page 7’s evidence prose**, 169 words, both paragraphs. They describe in words the three markers shown directly beneath them. Replaced by the author's own three descriptions.
- **Page 7’s question**, "Is this the situation? Or is this the state?" Page 218’s version closes the page; two near-identical questions on one page read as a loop.
- **`reading.afterResult`**, 34 words explaining the reading the reader has just taken.
- **`map.investigationTitle`**, "The Investigation". Page 4’s setting is stronger and the word filled two consecutive screens.
- **`hero.eyebrow`**, "Time · Attention · Safety" — printed on the cover beside it and the headline of section 3.
- **`hero.scrollHint`**, "Scroll".
- **`footer.method`**, page 272’s "Read the dashboard. Delay the story. Take the reading again." The front cover then printed READ THE DASHBOARD / BEFORE YOU BELIEVE THE STORY and was on screen at the top of the page. (The final cover of 14 September 2026 dropped that pair from the front; the back now signs off CHECK THE SIGNAL / BEFORE YOU BELIEVE THE STORY. Page 272 still prints the line, and it stays off the site.)
- **`footer.madeLine`** as a footer line — the cover line is now the closing.
- **The second imprint line** in the footer, which printed beside "© 2026 Budisin Publishing" as two adjacent identical names, and the **Publisher row** in `press.facts`, which `press.credits` already carries.
- **The companion-tool section**, which had been switched off since it was built and whose one sentence was never written.

**Relocated, not deleted.**

- The sixteen-chapter map with its colour keys and rail, "This book is the / Investigation.", the page 7 sorting-tool passage, the fourth case panel (13 / p.176 / 22:40) and the page 220 Scientific Heartbeat paragraphs → **the press page**.
- The page 20 block → **the extract page**, at the foot of the complete extract.
- `book.paragraphs[0]` → the head of the extract; `book.readers` → the author section.

## Removed on 6 September 2026 at the author's request

Seen on her phone and crossed out, earlier the same day. Each was verbatim from the book or her own copy; she is revising the book's wording and did not want it on the launch page.

- **Page 6, "You know the day", all four runs** and the disclosure that held the first.
- **The page 14 heading** "Same morning. Same paragraph. Same Katrin. Different instrument settings." and **the page 14 paragraph** "Three systems ran through Katrin's morning…".
- **Her paragraph "Over sixteen days, Katrin moves…"**, from the home page and the press description.
- **Page 8, "This book does not replace professional support…"**: "this is a book launch".

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

*Added 6 September 2026 with the readings section. English is the source for every line on this
site; there is no German edition of the book, so a German string is never quoted from a printed
German original. The reasoning is in `translation/METHOD-de.md`, amendments 52 to 55.*

| Key | Source of the German |
|---|---|
| `readings.title`, `.label` | Translated from the English: „Die Befunde", „Befund". **Not Lesart.** Amendment 35 splits the noun — *Lesart* where the reading is of the world, *Befund* where it is taken off the instrument — and fifteen panels of three system values are readings taken. **Closed the same day, `QUERIES-de.md` query 2, on the author's instruction to reconsider the whole lexical decision.** `moments.line` and `press.mapLine` are now „16 Fälle. **Drei Befunde.**" Amendment 35 is replaced by amendment 59: the split is not world-against-instrument but **datum against construal** — a *Befund* is what came back, a *Lesart* is what someone made of it. Page 4 already printed „Derselbe Tag, fünf Befunde", so verso and recto of one printed opening had been disagreeing about what the book counts. |
| `readings.items[].time` / `.attention` / `.safety` | **Translated from the printed English chapter openings**, pages 17 to 203, in capitals as the book sets them. The debt trio is „DEFIZIT VOM MORGEN / VOM NACHMITTAG / VOM VORABEND": *Schuld* alone in capitals reads as guilt and *Schulden* reads as a bank, while *Defizit* is what German itself says in *Schlafdefizit*. Seven of the fifteen value rows wrap to two lines at 1440 px because *Aufmerksamkeit* costs five characters over *Attention*; nothing was shortened to force a line, per amendment 45. Chapter 13's Safety value became „VORKEHRUNG GETROFFEN“ on 14 September 2026, when v44 printed PRECAUTION TAKEN in place of CORRECT; it replaces „RICHTIG“ and is for the native reviewer to confirm. |
| `readings.items[].line` | **Translated from the fifteen printed lines.** Line 11 says „zum Beweis" and not *Belege*, because the English says *proof* and amendment 12 bars *Beweis* for *evidence* precisely so the word stays free here; line 08, which does say *evidence*, is „Belege". Line 05 is the one place a shade of the image was traded for length: „stellt dem Morgen die Rechnung" is exact but runs 66 characters against 40 and stops being an aphorism, so the billing became paying, a shift the chapter itself contains. |
| `hero.credential` | **Translated from the author's own English line**, 6 September 2026: „Klinische Psychologin, Luxemburg" — her own biography sentence with the verbs taken out, which is what the English does. |
| `press.photoCredit` | **Translated from the author's own attribution**: „Foto: Zoe Larusson". Replaces the `[COPY NEEDED]` placeholder. The name does not change. |
| `press.credits` Photography row | Translated label, author-supplied value: „Fotografie" / „Zoe Larusson". |


`content/de.ts` is an authored German edition under `translation/STANDARD.md` and brief §14, not a word-for-word rendering. It carries no sentence that `content/en.ts` does not carry, and the one rule governs it identically. Three provenance facts have to stay on the record, because a later editor cannot recover them from the file.

- **No German edition of the book exists.** "State. Not Situation." is never translated, in any of the thirteen places it appears in `de.ts`, and nothing on the German pages says or implies that a German edition is available. `press.facts` says so explicitly: „Englisch. Französische und deutsche Ausgabe folgen."
- **The cover lines are translated from the English cover.** `hero.subtitle`, `hero.strap`, `premise.mechanism[0..3]`, `closing.line` and `footer.band` are printed on `public/images/cover-front.jpg` and `cover-back.jpg`, which are **English** artwork. The German is a translation of that printed English, not a quotation from a printed German original, and the cover artwork on the page stays English in all three languages.
- **The three evidence descriptions are author-supplied, not printed.** `evidence.grades[].description` comes from `brief/REDESIGN-BRIEF.md` §8 section 5, written by Ivana on 6 September 2026. In German they are **re-authored to the same register**, not lexically matched — three short definitions in the words German research prose uses. They are not unsourced sentences and must not be cut as such.

Two omissions in the German follow the English exactly and are recorded here as well: page 8’s "Things like social evaluation, exclusion, ambiguity, status." is not in `variables.loops[2]`, and page 7’s 169 words of evidence prose are not on the page.

The German glossary decision that governs the site's central term — *reading* is **Lesart** where it is a reading of the world and **Befund** where it is a reading taken off the instrument — is recorded as amendment 35 in `translation/METHOD-de.md`, with the one consequence put to the author in `translation/QUERIES-de.md`.

---

## The foreword and the date, 28 September 2026

Two things the site did not carry: the book's foreword, and when the book comes out.

**The foreword.** The final interior prints a Foreword in its front matter, pages v to
ix (recorded above, under *Re-verified against v44*). Its author, and the credit as
Ivana gave it on 28 September 2026, word for word:

> Dr Kristina Herber, Managing Director, AIHE Academic Institute for Higher Education

That credit is author-supplied, category 2, and it is carried in three places, all
reading the same three strings in `content/*.ts`:

| Key | Where it appears |
|---|---|
| `foreword.credit` | Under the byline on the first screen, at LABEL |
| `foreword.name` / `.role` / `.organisation` | The contributor row on `/press`, under the author; the `contributor` object in the book's structured data; the attribution under the quoted passage |
| `foreword.eyebrow` | The section label, the footer link, and the `/press` row label |

`name`, `role` and `organisation` are identical in English, French and German: a
person's name and her official title at a named institute are not translated. Whether
"Managing Director" should stand in the French page or read *directrice générale* is
Dr Herber's to say; it is left as given and noted as an open question.

**No passage is quoted yet.** `foreword.quote` is an empty array in all three content
files, and `components/Foreword.tsx` returns nothing while it is empty, the way
`Listen` returns nothing without an `audioUrl`. So the home page shows the credit and
not a placeholder. Filling the array with one or two sentences from pages v to ix —
verbatim, and cleared with Dr Herber, since the words are hers and not the book's —
brings the section, its footer link and its attribution in one edit. The first
sentence sets at DISPLAY, anything after it at BODY.

**The date.** Ivana gave 15 October 2026 on 28 September 2026. It is written once, as
`editions[lang].publicationDate` in `site.config.ts`, and `lib/publication.ts` sets it
in the reader's own language: *15 October 2026*, *15 octobre 2026*, *15. Oktober 2026*.
English uses the en-GB form because the site's prose is British.

From that one value:

- the first screen replaces "Publishing soon" with "Publishing 15 October 2026";
- the closing section prints the date above the email form, so the one thing the site
  asks for has a reason a reader can see;
- the Publication row on `/press` carries the date instead of the bare year — matched
  by `press.publicationFactLabel`, so the value is never written twice;
- `datePublished` appears in the book's structured data.

Setting `publicationStatus: "published"` and an `amazonUrl` still switches every one of
these to the published wording with no further edit. `status.forthcomingDatePrefix`
("Publishing" / "Parution le" / "Erscheint am") is a plain interface label, category 3.

**Open question 10.** Should the French and German pages print "Managing Director,
AIHE Academic Institute for Higher Education" as it stands, or Dr Herber's own French
and German titles if she has them? The site does not invent either one.

## The foreword's words, and the biography, 28 September 2026

**The passage.** `~/Desktop/SNS 38 Working/Foreword.pdf` embeds a subset font, so its
text extracts as a substitution cipher — glyphs numbered in the order they first
appear. It was decoded letter by letter and the whole of it written to
`Foreword.txt` beside the PDF, so it can be read against the original. Two passages
are quoted on the home page, word for word:

> Our first interpretation is not necessarily wrong. But it does not have to be our last.

> A book that cautions us against confusing a persuasive interpretation with certainty
> also applies scrutiny to its own interpretations.

They are chosen to follow the Evidence section without repeating it. The book says its
own risk is the risk it describes; the foreword says the same thing from outside the
book, which is the one thing the site could not say for itself. **The words are Dr
Herber's, not the book's** — they should be read back against the PDF, and cleared
with her, before the site goes to press. French and German are translations under
`translation/STANDARD.md`, and the French reviewer should be told they are a third
party's words.

**No folio.** The `Foreword` section prints no page number. The author's note of
28 September 2026: the front matter is still moving and the interior will be 302 pages.
Every other folio on the site is a verified printed page, so this one waits rather than
guess.

**The long biography.** `press.bios[1]`, the site's last `[COPY NEEDED]`, is filled
from Ivana's own *About the author* page, supplied 28 September 2026, word for word:

> Before psychology, Ivana Budišin worked in design and product design. She later moved
> into applied psychology and is now a clinical psychologist, with a continuing interest
> in research and cognitive science. Born in the United States, she has lived in Serbia
> and Luxembourg and is now a Luxembourger. She runs Luxembourg Psychology.
> State. Not Situation. brings those interests together: how we experience the world,
> and how we might make that experience easier to understand.

Author-supplied, category 2. **No page is cited**: she has said the page is not at the
end of the book and the pagination is not settled. When v47 is final, this can be
recorded as printed and given its page. It is 78 words rather than the 100 to 150 the
placeholder asked for; it is hers and it is complete, so it stands. Filling it brings
the whole Biography block on `/press` back, which has been hidden since the site was
built.

The page it comes from also names LuxembourgPsychology.com, so
`siteConfig.author.website` is set. It reaches the author's structured data only —
nothing on the page links to it yet.

**The extent.** Changed to **302 pages** on 28 September 2026, on the author's word
("will be 302"), which is v47. Everything else on the site still cites **v44** — every
folio and every page reference in this file. That is deliberate: the extent is one
bibliographic fact a journalist needs now, and the page citations are twenty-odd
claims that can only be re-checked against the finished interior. Re-check them all
against v47 when it is final, the way they were re-checked against v44 on
14 September 2026, and update this file's opening paragraph at the same time.

## Rebuilt against v50, 30 September 2026

Read from `~/Desktop/STATE NOT SITUATION - v46 PROOF CORRECTIONS/v48 - towards final/State Not Situation 6x9 v50.pdf`, **304 pages**, with the v48, v49 and v50 change logs. The proposal the author approved is `brief/WEBSITE-UPDATE-v50.md`.

**Two sections were quoting devices the book had dropped.** In v50 the string "CASE EVIDENCE" appears zero times and "VERIFIED" appears zero times; the chapter openers no longer print `NOT CLAIMED / DEGRADED / DOMINANT`. Both sections were rebuilt in place. No section moved.

### `moments` — page 4, whole

Page 4 was redrawn for v50 and now prints **THE SAME DAY, FIVE READINGS**: five times, five lines. All five are verbatim, and so is `moments.closing`, "The body speaks first. The mind explains second." — which had never been on the site and which Dr Herber's foreword singles out as the line that captures the book. `moments.line` is still page 5.

Page 4's own three opening lines ("Nothing went wrong on this day. The instruments were working. The data was there the whole time.") are **deliberately not on the site**. The author cut them on 6 September 2026: printed, they set up "This book is the Investigation."; at lead size on a screen they read as three qualifications rather than a claim. That ruling still stands and this section does not reverse it.

Retired: `CaseEvidence`, the three panels, their INPUT / VERIFIED labels, and page 14's "It said I am failing; the data was I am tired." The page-14 line is still printed and could return elsewhere; it was dropped so the section closes once, on page 4.

### `names` — the sixteen names

Every chapter of v50 now closes on *A name for it*: the word, a plain explanation outside Katrin's story, three examples, the pages that explain it, and a TRY IT. Page 292 lists all sixteen with the page each entry sits on; the list and its note are verbatim from that page, and so are the sixteen names and their pages.

One entry is opened in full: **chapter 01, Misattribution, page 24**, verbatim including its three examples and its TRY IT. Chapter 01 was chosen because those three examples are already on the page — the pilot extract gives them as prose two sections above ("The tiredness that presents itself as a question about your career…"). A reader meets them twice, the second time with a name on them.

Retired: `ChapterReading` and the fifteen chapter-opening instrument readings. The openers now carry a question and three plain phrases instead; they are in the PDF if the section is ever wanted back, and they are tabulated in `brief/WEBSITE-UPDATE-v50.md`.

### `variables` — three questions

`variables.loops[].body` now carries page 9's **THREE WAYS TO READ A MOMENT**, verbatim: one question and a short list each. The pages 7 to 8 definitions the site used before are retired — three paragraphs of fifty-odd words read as lectures on a screen, and v50 leads with the questions. Page 7's own passage on the three systems is still on `/press` as `press.sortingTool`, so the long form is not lost.

### Pages moved

| Key | Was | v50 |
|---|---|---|
| `press.facts` extent | 302 pages | **304 pages** |
| `closing.source` | Page 218 | **Page 238** |
| `press.sourcesLabel` | The Scientific Heartbeat, page 220 | **page 242** |
| `press.chapters` | 11, 17, 23, 33, 45, 61, 73, 89, 99, 115, 129, 145, 161, 177, 189, 203 | **11, 17, 25, 37, 51, 69, 81, 97, 109, 127, 143, 161, 179, 197, 211, 223** |

Unchanged: pages 4, 5, 7, 14 and 20. `premise.sensorLine` ("The body is a sensor before it is a narrator.") is now on **page 193**, was 175; the section's folio still reads 4, which is where its eyebrow is printed. The closing question on page 238 still reads "Is this the situation? Or is this their state?", and v50 follows it with "What belongs to the situation, and what might state be adding?"

### The foreword credit is now printed

It moves from category 2 to **category 1**. v50 prints it twice:

- **Title page, iii:** *With a foreword by Dr Kristina Herber*
- **Imprint, iv:** *Foreword: Dr Kristina Herber, AIHE Academic Institute for Higher Education*

So `foreword.credit`, `foreword.name`, `foreword.role` and `foreword.organisation` are printed, not author-supplied. The two sentences quoted in the `Foreword` section are still Dr Herber's words rather than the book's; the author confirmed on 30 September 2026 that she has seen them.

### The biography follows the book

`press.bios[1]` now matches page 293 word for word, including "she has lived in **US**, Serbia and Luxembourg" after "Born in the United States". That reads as a slip and was raised with the author on 30 September 2026; she asked the site to match the book. **If page 293 is corrected, correct this too** — in all three languages.

### Not the site

The v48 log puts the spine at about **0.685 in** at 304 pages. The KDP cover is built for 0.635.

## The cover was replaced, 30 September 2026

The v50 cover is a **different design**, not a re-cut of the old one:
`~/Desktop/STATE NOT SITUATION - v46 PROOF CORRECTIONS/v48 - towards final/COVER for v50/State Not Situation - COVER v50 (304 pages).pdf`, 12.9346 × 9.25 in with bleed, trim 12.6846 × 9.0000, **spine 0.6846 in for 304 pages**. Its notes are in `COVER v50 - notes.md` beside it; the InDesign file is the master. Everything in `COVER - EDITABLE v48.ai` and the old `STATE NOT SITUATION - KDP UPLOAD/` folder is superseded — those are built for 282 pages.

What changed on the object: the ground is now **red**, with a flat cream panel on each face; the texture is gone from both panels; the front carries the page iii lockup (eyebrow, hairline with the heartbeat, STATE, NOT SITUATION) with the subtitle in IvyPresto italic in red; the spine reads **bottom to top**; the back has a new blurb, a new four-line table and a much longer biography with the author's portrait; the barcode zone is built to KDP's own template.

### Every cover asset is regenerated, by one script

`lib/make_cover_assets.py` cuts the flat assets from the PDF at the trim at 300 dpi and composes the rest. Run it, then `node lib/make-press-kit.mjs`. The geometry is read from the PDF's own page size, so **when the page count changes again, point `SOURCE` at the new cover and re-run** — nothing in the script needs editing.

- **Site:** `cover-front.jpg`, `cover-back.jpg`, `cover-spine.jpg`, `og.jpg`, `mockup-3d.png`.
- **Press, flat:** the four 300 dpi PNGs, the two front JPEGs, and `cover-print-6x9.pdf`, which is the KDP file itself.
- **Press, composed:** `book-render.png`, `render-1x1-1080.jpg`, three banners, four social sizes.

The composed images add **no type but DIN Alternate Bold**, which is the site's navigational face and the only one of the book's five that exists as a font file on this machine. The title lockup in every banner and post is **lifted from the cover artwork itself**, so it is set in the book's real typefaces and cannot drift from the printed object. IvyPresto and Bebas are Adobe Fonts and are not available as files; re-typesetting them in substitutes would have been the wrong trade.

**The book render is back in the press kit.** It was withdrawn on 20 September 2026 because it still showed the retired subtitle. It is re-rendered from the v50 cover as a projected box — 6 × 9 × 0.6846 in, turned 30° about its vertical axis, camera 26 in away and level with the middle of the cover. The camera is level on purpose: no top face, nothing tipped. A spine drawn any wider than that projection gives reads as a box rather than a book.

The kit is now **2.7 MB against 9.6 MB**. The artwork is flat where the old cover was textured, so the PNGs compress an order of magnitude better at the same resolution.

### Two strings followed the artwork

- `hero.coverAlt`, in all three languages, described a cream ground with struck-through sentences. It now describes the red ground, the cream panel and the bracketed box. Alt text is a description of the asset, so it had to move with it.
- The two dimension notes on `/press`: the front is **1800 × 2700** and the wrap **3805 × 2700**, the wrap being wider than before because the spine is.

### What the new back cover means for the site, still open

The back cover's text changed, and two things on the site now quote a version of it that is no longer printed:

1. **`premise.mechanism`** — the four sentences beginning "We usually treat these moments as information about life…". The back now reads: *"We often mistake a state for a fact. A person seems hostile. A task feels impossible. A relationship appears wrong. A whole day looks lost."* / *"But what feels true is not produced by the situation alone. Sleep, hunger, stress, timing, attention, memory and threat detection affect what we notice and how we interpret it. Together, they shape the explanation that feels most convincing."* / *"State. Not Situation. examines the gap between what happened and what it felt like it meant."*
2. **A new short biography is printed on the back**, different again from page 293's: *"Ivana Budišin trained first to look, then to measure. With a background in design and later in clinical psychology, she is interested in what happens between an event and the certainty we build around it."* and two sentences more.

Also now printed on the back, as a four-line table: *A short message feels cold. / A meeting feels dangerous. / A craving feels like a decision. / A quiet room feels like judgement.* — the four sentences recorded under *The final cover* as open question 9, which the site has never carried.

`premise.lines`, `premise.eyebrow`, `closing.line`, `hero.strap` and `footer.band` are all still printed and are unaffected. **Raised with the author on 30 September 2026; no copy was changed without her.**

## The commercial extension, 1 October 2026

Six English-only pages and one home-page section (`EXTENSION.md`). Their words are in
`content/extension.en.ts`, apart from `content/en.ts`, and they introduce **a fifth kind
of string** this file has not had before:

5. **Handoff draft.** Copy the author supplied on 1 October 2026 in
   `02_CONTENT_AND_CONFIG.json`, which marks itself `"copyStatus": "draft-for-Ivana-review"`.
   Written for her, not by her, and not yet approved.

**Approved on 1 October 2026.** The author reviewed the preview — Explore, Invite with its
four offers, Enquiry, Events, the app's doorway and Research — and wrote "good. lets go
live". From that date every string in `content/extension.en.ts` stands as
**author-approved (2)**, and `extension.approved` and all four offers'
`approvedForPublication` are `true`. Three practical points were left open by her
choice and can be changed in the content file at any time: the offers' durations, the
languages sessions run in, and that enquiries go to the public address.

Because of that, all of it is fenced: `site.config.ts → extension.approved` is `false`,
so production renders none of it, and every preview page says it is a draft. **When the
author approves a line, it becomes author-supplied (2); when she changes one, record the
change here.**

### What each part rests on

| Strings | Kind | Source |
|---|---|---|
| `explore.endText` — "State. Not Situation. examines the gap between what happened and what it felt like it meant." | 1, printed | Back cover of v50 (see *What the new back cover means for the site*, above). Chosen over the handoff's own summary of the book. |
| `research`: page 7's systems passage, the three markers and their descriptions, page 7's closing line, The Scientific Heartbeat's two sentences | 1 / 2 | Read from `content/en.ts` (`press.sortingTool`, `evidence.*`, `press.sources`, `press.sourcesLabel`) — already sourced above, not copied. |
| `research`: Chapter 13's number, title and page | 1, printed | `press.chapters` (page 5's map). |
| Author lines on the new pages | 2 | `author.bio`, `hero.credential`, `press.bios` "Long" — read from `content/en.ts`. |
| `discovery.*`, `explore.eyebrow/title/endTitle`, `invite.title/intro/availabilityNote`, the four offers, `enquiry.title/intro/purposeHint/boundary/emailFallbackIntro`, `events.*` titles, empty state and attendee email, `app.copyByStatus`, `research.title/intro/evidence.related/situation.body` | 5 | `02_CONTENT_AND_CONFIG.json`, word for word, with the edits below. |
| `explore.intro/sceneLabel/boundary`, the three scenes | 5, rewritten | See *Edits made to the handoff draft*, below. |
| `invite.faq` | 5, assembled | Each answer is made of handoff lines: booking from `enquiry.boundary`; books from `invite.booksNote`; language from the offers' `practical` lines ("language … agreed in advance"); "what these sessions are not" from the talks' and workshops' `scope` lines. |
| Every label, field name, error, status word, "More ways in", "FR · livre", the draft note, "Nothing is sent from this website…", "Now send it from your email app…" | 3, interface | Functional text: what a control does, or what has (not) happened. The French tooltip is for the author to check. |

### Edits made to the handoff draft

- **The three scenes were rewritten** the same day, at the author's request ("the wording
  needs to be more natural… who is Emil?"). She chose: written to "you" instead of the
  handoff's invented Ada and Emil, and one connected day — 16:10 the message, 16:12 the
  slide (whose reveal names the message two minutes earlier), 22:36 one more folder,
  07:08 the kettle. The hook lines and per-scene categories were dropped; the
  "inspired by the book" label is said once, above the list. The new wording, the intro
  and the boundary line ("How you feel can change what a moment seems to mean. If
  something is really wrong, it still deserves attention.") are still kind 5: drafted
  for her, awaiting her approval of the exact words.
- **Then the page was redrawn** (her choice of "idea 1", 1 October 2026): each moment's
  title became the one big line a skimmer reads ("“Can we talk before you go?”", "The
  title looked fine at lunch.", "Just one more folder."), and the scenes no longer repeat
  them. The 07:08 turn now says the cause she could not see ("dont get the photos?"):
  "The photos are sorted, every last one. You got to bed after one in the morning…".
- **Invite, for someone who scans** (same day, at her request): each offer gained three
  short strings — `short`, `duration`, `who` — and the rest opens on a tap. They are
  derived, not new claims: `short` is the first sentence of the teams hook, and a
  shortening of the other three hooks; `duration` restates the offer's own `formats`
  ("60 or 90 minutes", "20, 40 or 75 minutes", "Three hours, or two × 90 minutes");
  `who` shortens its `audience`. Kind 5, awaiting her approval.
- **Talk durations name their audience**: "20-minute talk, for conferences and
  associations", "40-minute talk, for conferences and associations", "75-minute reading
  and conversation, for bookshops, libraries and book clubs" (the spec asks for it).
- **Not used**: the handoff's Explore `endText` (replaced by the printed back cover, above);
  its three research `body` paragraphs where the book's own words exist; and
  "The instrument panel is an analogy", which could not be checked against v50.
- "Read the opening" is the site's existing "Read an extract".

### What the new pages must never say

No fee, date, venue, capacity, testimonial, accreditation, outcome, app feature, app
date or app price. The scenes are original and labelled "An example inspired by the
book."; none is a passage of the book. The February Readings, worksheets, chapter
endings and app material are not on the site in any form, visible or hidden.
