# Queries to the author, German edition

Date: 6 September 2026, rewritten for the redesigned site. The rule applied is the addendum to `translation/STANDARD.md` of the same date: where one option is clearly superior after analysis the translator decides it and does not raise a query to move the responsibility; a query stands only where the choice could materially change meaning, metaphor, scientific precision, characterisation or the conceptual architecture of the book.

**What happened to the queries that stood here this morning.** Ten stood on 5 and 6 September. Eight were closed by the translator as amendments 25 to 32 in `translation/METHOD-de.md`. The two that remained — the lower pole of "the gap between fine and clinical", and where page 12's run should begin — were queries about `book.readersAnchor` and `knowTheDay`, and both of those sections were cut from the homepage in the redesign. Page 14's "professional support" sentence and the whole of page 12 are no longer on the site in any language, so neither query has a string standing behind it. They are recorded as closed by deletion. If either passage returns, in the book or on the site, the analysis is in the git history of this file and should be re-read rather than re-done.

Ten more decisions were taken today under §14 of your brief and are recorded, with their reasoning, as amendments 35 to 44 in `translation/METHOD-de.md`. None of them is here waiting for you.

**Nothing is waiting on you in this file.** Query 2 was closed the same evening,
on your own instruction to reconsider the lexical decision, and query 1 is
superseded by the same work. The analysis below is kept as the record of how the
question was reached; the answer is at the foot of the file.

**One query stood when this file was rewritten.** It is not a choice between two words. It is the one structural consequence of resolving the glossary, and it is a decision about the German book, not only about the site, so you should see it. A second was added later the same day, with the new section of fifteen chapter readings; it is the standing tail of the first and it is query 2 at the end of this file.

---

## 1. German has to use two nouns where the book uses one

### SOURCE

Front cover: "Your first reading is not the whole story."
Back cover: "But the first reading is often not the whole story."
Page 11: "16 cases. Three readings. One question: state or situation?"
Page 13: "Check your jaw. Check your breath. Check your shoulders. **What you found is a reading.** A reading of the instrument that is interpreting everything around you, in this moment, including these words."

### CURRENT TRANSLATION

„Ihre erste Lesart ist nicht die ganze Geschichte." · „Aber die erste Lesart ist oft nicht die ganze Geschichte." · „16 Fälle. Drei Lesarten. Eine Frage: Zustand oder Situation?" · „Was Sie gefunden haben, ist ein **Befund**."

### ISSUE

Conceptual consistency, and it follows directly from your ruling in §14. *Reading* is one word in English doing three jobs at once: what an instrument shows, the act of reading a person or a room, and an interpretation of events. The book fuses them deliberately — "you are only reading the instrument that is reading the situation" — and German has no noun that holds all three. Befund held the whole term until today; you have ruled it too clinical for the strap, and the book agrees with you, because it places itself "in the gap between fine and clinical" and its cover noun cannot be the word from a doctor's letter. Lesart takes the strap. But Lesart cannot take page 13: what you found is a tight jaw, and a tight jaw is not an interpretation. So the German site now says **Lesart** on the cover and **Befund** four screens later, and the reader is not told that the thing on the cover is the thing they just did with their own jaw. In English that identity is free, carried by one repeated word.

### OPTION A — the split, with the rule stated once (what the file now does)

**Lesart** wherever the reading is of the world: the reading the instrument hands you as a fact. The strap, the back cover, page 11. **Befund** wherever the reading is of the instrument: what a check of the body or a look at the panel returns. Page 13, the case panels, the state lines, "Take the reading again."

The English pun is lost and something is gained in its place: German states, in two words, the move the book spends 278 pages teaching. Your instruction on the front cover — read the dashboard before you believe the story — becomes, in German, the instruction to turn a Lesart into a Befund. „Was Sie gefunden haben, ist ein Befund." also keeps the sentence's own echo, *gefunden / Befund*, which is the best small thing the German has.

### OPTION B — one noun, Lesart, everywhere

Page 13 would then have to be recast, because „Was Sie gefunden haben, ist eine Lesart." is not true of a jaw. The nearest honest German is verbal — „Was Sie gefunden haben, haben Sie abgelesen." — which keeps the family and the cover word but turns your flat declarative into a perfect tense and loses the noun the sentence lands on. Every state-line heading in the book (READING / 01) and every "Next reading: 06:38" would move to Lesart too, where the reading is plainly a measurement and Lesart is plainly wrong.

### RECOMMENDATION

A. Option B buys one repeated word on the website and pays for it with the wrong noun on roughly a hundred instrument readings in the book, and with a recast of the one sentence on the site you have said you particularly like. The split is a real cost and it is the smaller one; it is stated as a rule in the method so that a second translator applies it the same way, and it is the kind of thing German asks of a book built on an English pun.

### CONFIDENCE

High on A for the book. Medium on one detail, which is the only thing I would like you to look at: on page 11, "Three readings" is now „Drei Lesarten" — three ways of reading the same case, which is what the three system words under it appear to mean. If you meant three readings *taken*, as an instrument takes them, the German is „Drei Befunde" and I will change that line and the two places it is repeated. One word, one answer, and I have implemented Lesarten in the meantime.

---

*Added 6 September 2026, with the new home-page section of fifteen chapter readings. One query, and it is the standing tail of query 1 above, now with evidence behind it rather than a hunch.*

## 2. ~~Page 11 says „Drei Lesarten" and the new section says „Die Befunde" for the same printed thing~~ — **CLOSED**

### SOURCE

Page 11: "16 cases. Three readings. One question: state or situation?"
The opening of chapter 01, and of every chapter to 15: "READING / 01 — Time: NOT CLAIMED · Attention: DEGRADED · Safety: DOMINANT — The body makes a verdict before attention tests it."
The new home-page section that reproduces those fifteen openings is headed "The readings".

### CURRENT TRANSLATION

Section 4, page 11's line: „16 Fälle. **Drei Lesarten.** Eine Frage: Zustand oder Situation?" (`moments.line`, and the same sentence again on the press page as `press.mapLine`).
Section 7, two screens below it: „**Die Befunde**", and fifteen rows each labelled „**Befund** / 01", „Befund / 02", and so on.

### ISSUE

Conceptual consistency. Your ruling in §14 took Befund off the strap as too clinical, and amendment 35 split the noun accordingly: **Lesart** where the reading is of the world, the reading that arrives feeling like a fact; **Befund** where the reading is of the instrument, what a check of the body or a look at the panel returns. Page 11's line went to Lesart with the strap. I recorded Medium confidence on it at the time and asked you one question about it: whether "three readings" meant three ways of reading a case, or three readings taken.

The new section answers that question, and it answers it the other way. A chapter's reading is three instrument values printed in capitals — NOT CLAIMED, MORNING DEBT, HALF-SECOND WINDOW — one for each of the three systems, at the hour the chapter opens. Those are readings taken, not interpretations offered, and under amendment 35's own rule a reading taken is a Befund. So the German homepage now says Lesarten in section 4 and Befund fifteen times in section 7, for the same three printed values, two screens apart, and a German reader has no way to know they are the same thing. In English one repeated word carries the identity for free.

The strap is not in question. „Ihre erste Lesart ist nicht die ganze Geschichte." stands, and so does the back cover's second sentence: those are readings of the world and Lesart is right for both. What is in question is the one line in the middle, which names what the fifteen panels contain.

### OPTION A — page 11's line becomes „16 Fälle. Drei Befunde."

The three values under each case are Befunde, the section that prints them is „Die Befunde", and page 11 names them with the same word. The reader meets one noun for one thing, and the book's move is legible in German: the cover hands you a **Lesart**, the panel gives you a **Befund**, and the whole instruction is to get from the first to the second. Cost: „Drei Befunde" is a shade more clinical than „Drei Lesarten" in a line that sits directly under the cover, which is the objection you raised in §14. It is one word, in body type, four sections below the strap, not on the cover.

### OPTION B — the file as it stands: „Drei Lesarten" on page 11, „Die Befunde" in section 7

Page 11's line keeps the softer noun and the cover's family, and the split is simply not visible to a reader who does not compare the two sections. Cost: the two sections describe the same fifteen panels and call them different things, and the German book will have to make the same choice at every one of the sixteen case pages and every state line, where „Lesart" for a printed value would be plainly wrong. If page 11 stays Lesarten, the book carries an inconsistency the site has just made visible.

### RECOMMENDATION

A. The evidence moved: when I assigned page 11 to Lesart the fifteen openings were not on the site and "three readings" could still have meant three interpretations. It cannot now. Against that, the clinical objection is real but small in this slot — it is one noun in running text, and the sentence it sits in is a caption for an evidence table, which is where a German reader expects Befund and does not flinch at it. If you take A, I change three strings and nothing else: `moments.line`, `press.mapLine`, and the memory row. If you prefer B, I will record it as a deliberate two-word split and add the rule to the method so a second translator does not "correct" it.

### CONFIDENCE

High that the two sections must not disagree. Medium on which word wins, because the objection that put Lesart there is yours and it is about how the German sounds under the cover, which is your call and not mine.


---

# CLOSED, 6 September 2026, on the author's instruction

She reopened the whole decision herself:

> "I would seriously reconsider this lexical decision. German has possibilities
> around: Lesart / Eindruck / Messwert / Ablesung / Deutung. None maps
> perfectly. But you may actually need two terms depending on context rather
> than forcing 'reading' into a single German equivalent."

Five complete German schemes were built independently and three judges — a
German trade commissioning editor, a cold German ear with no English, and the
editor responsible for the book's architecture — ranked all five. All three put
the same one first. The decision was taken against all 194 occurrences of
*reading* in the almost-final PDF rather than against the method file, and it is
recorded in full as **amendment 59** in `translation/METHOD-de.md`.

**Query 2 closes as Option A.** Page 11 becomes „16 Fälle. **Drei Befunde.**
Eine Frage: Zustand oder Situation?", on the home page and on the press page.

It closes for a stronger reason than the one the query gives. Pages 149 and 207
print CHAPTERS 01 TO 10 / 11 TO 15. **THREE LOOPS.** in the identical slot where
page 11 prints 16 CASES. THREE READINGS., and all three sit under THE
INVESTIGATION. The three readings are the three loops, which is exactly what the
fifteen chapter openings print. And page 10, the facing verso of one printed
opening, already reads „Derselbe Tag, fünf Befunde". Verso and recto disagreed
about what the book counts. That is unshippable, and it is a better argument than
the two-screens-apart defect the query records.

**Query 1 is superseded.** Its premise was that German must split a noun the book
uses once. That is right, and you said so independently. But the line amendment
35 drew was wrong: it split „the reading of the world" from „the reading off the
instrument", and the first of those categories is not in the book. Page 13 prints
*The reading may be accurate. It may not.* Page 213 prints *In every case the
reading was fine.* The thing that arrives with the force of fact is the **story**,
not the reading — which is your argument, and which the glossary already carries
as Geschichte and Erzähler.

The line the book actually draws is between **what came back** and **what
someone made of it**. A **Befund** is what came back. A **Lesart** is what
someone made of it. Getting it is **ablesen** or **lesen**. Your other four
candidates were each refused on evidence from the book, not on taste, and the
reasons are in amendment 59.

**Your ruling on the strap was right, and right for a better reason than the file
had.** „Ihre erste Lesart ist nicht die ganze Geschichte." stays. Befund there
would claim your first *datum* is not the whole story, and the book denies that:
the datum is usually fine.

**Two things are recorded rather than raised, and you may still overrule either.**

1. All three judges heard „die ganze Geschichte" as the loudest English rhythm on
   the cover. Ordinary German says „nicht die ganze Wahrheit", and „die ganze
   Geschichte" often means *the whole affair*, so there is a half-beat misparse.
   It stays, because Geschichte is the book's own term, paired with Erzähler, and
   „die ganze Wahrheit" would change the claim from what-your-mind-writes to
   what-is-true. Decided, not queried, under your own rule.
2. **„Drei Befunde" on the home page is the one line held at medium confidence**,
   because there it is a serif display heading with no Untersuchung above it to
   light the room. The argument for it is that the word is defined two sections
   earlier by your own jaw, and that *der empirische Befund* is ordinary
   investigative German and not only the Arztbrief. But this is a line where your
   ear is worth more than the argument, and you should know it is the one place
   the team did not reach high confidence.

**For the designer, before German cover artwork exists.**
„IHRE ERSTE LESART / IST NICHT DIE GANZE GESCHICHTE." measures a balance of 0.57
against the English strap's 0.80: a stub over a long line, sitting directly above
a two-line red subtitle. The block wants roughly three-quarters of the English
type size. Better known now than rediscovered after the artwork exists.
