# Queries to the author, German edition

Date: 6 September 2026, rewritten for the redesigned site. The rule applied is the addendum to `translation/STANDARD.md` of the same date: where one option is clearly superior after analysis the translator decides it and does not raise a query to move the responsibility; a query stands only where the choice could materially change meaning, metaphor, scientific precision, characterisation or the conceptual architecture of the book.

**What happened to the queries that stood here this morning.** Ten stood on 5 and 6 September. Eight were closed by the translator as amendments 25 to 32 in `translation/METHOD-de.md`. The two that remained — the lower pole of "the gap between fine and clinical", and where page 12's run should begin — were queries about `book.readersAnchor` and `knowTheDay`, and both of those sections were cut from the homepage in the redesign. Page 14's "professional support" sentence and the whole of page 12 are no longer on the site in any language, so neither query has a string standing behind it. They are recorded as closed by deletion. If either passage returns, in the book or on the site, the analysis is in the git history of this file and should be re-read rather than re-done.

Ten more decisions were taken today under §14 of your brief and are recorded, with their reasoning, as amendments 35 to 44 in `translation/METHOD-de.md`. None of them is here waiting for you.

**One query stands.** It is not a choice between two words. It is the one structural consequence of resolving the glossary, and it is a decision about the German book, not only about the site, so you should see it.

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
