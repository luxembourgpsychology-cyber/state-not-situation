# Item 08.5. Translation notes: decisions, verbatim lines, and what a native reviewer must check

Item: 08.5, Translation notes for the French and German press material
Channel: Internal, for Ivana and the native reviewers. Nothing in this file goes out.
To whom: Ivana Budišin; the French reviewer (Laurent Rouach reviewed the French site on 20 September 2026); a German reviewer [TO CONFIRM: none has yet reviewed the German site]
Suggested send date: With items 08.1 to 08.4, before anything in this folder is sent
What the recipient is asked to do: Read the sections marked for review before approving 08.1 to 08.4
Attachments or links: content/fr.ts, content/de.ts, translation/STANDARD.md, translation/METHOD-fr.md, translation/METHOD-de.md
Approval status: awaiting Ivana

## Read this first

**No French or German edition of State. Not Situation. exists.** The book is published in English only; the site says "French and German editions to follow" and nothing more. Every quotation from the book in 08.1 to 08.4 is therefore a translation of the English printed text, made by the localisation desk, not a line a reader can find in a French or German book. The site itself discloses this at the foot of every French and German page (`footer.translationNote`: « Le livre est publié en anglais ; ces pages en ont été traduites par une intelligence artificielle. » / „Diese Seiten hat eine KI aus dem Englischen übersetzt.“). The press material must do the same, so each release carries the disclosure in one line under the subtitle, "Citations traduites de l’édition anglaise." / "Zitate aus der englischen Ausgabe übersetzt.", repeats it in the notes to editors, and each pitch closes with it. A journalist who quotes a translated line as if it were printed would be misquoting the book; the disclosure is what prevents that.

The same applies to the listing descriptions. If they are used on a French or German retail page, they must keep their last sentence.

## What governs

translation/STANDARD.md in full: the sense and the effect, not the word order; every hedge kept; no claim added; the English sets the length and the register. The two glossaries in translation/METHOD-fr.md and translation/METHOD-de.md. And one rule above both for this folder: wherever the site already renders a printed line in French or German, the press material uses the site's rendering word for word, so that the agency never contradicts statenotsituation.com.

## Decisions

### Both languages

1. The title stays "State. Not Situation." in every sentence, as on the site, including « State. Not Situation. est son premier livre. » and „State. Not Situation. ist ihr erstes Buch.“
2. The subtitle is the site's: « Pourquoi votre corps décide avant vous du sens d’un moment » / „Warum Ihr Körper entscheidet, was ein Moment bedeutet, bevor Sie dazu kommen“. In the publication facts it stands in the target language, as the site's press page does. A reviewer may prefer the English subtitle in brackets after it, since it is what the cover prints.
3. Dr Herber's credit is kept as the site keeps it: "Dr Kristina Herber, Managing Director, AIHE Academic Institute for Higher Education", title and institute untranslated, "Dr" without the German full stop because it is her name as supplied.
4. Bracketed items stay in English and untranslated: €28.90, [CONTACT TO CONFIRM], [DRAFT QUOTE FOR IVANA TO APPROVE OR REWRITE], [TO CONFIRM: …].
5. "Luxembourg clinical psychologist" in the English headline says where she works. French: « psychologue clinicienne au Luxembourg »; German: „klinische Psychologin … aus Luxemburg“. Neither claims nationality; « luxembourgeoise » and „Luxemburgerin“ were not used in the headline even though page 293 says she is now a Luxembourger, because the English headline does not say it.
6. The draft quotation. Its first sentence is the author's own line and is the site's rendering word for word (`excerpt.lead`). Its second, "It offers questions, not a diagnosis.", is new in the English draft and is translated as plainly: « Il propose des questions, pas un diagnostic. » / „Es bietet Fragen an, keine Diagnose.“ It is hers to accept or strike.
7. Page numbers follow the fact sheet (v50). The Scientific Heartbeat is cited at page 242. Note for the site: content/de.ts `press.sourcesLabel` still prints „Seite 220“ where content/fr.ts and the fact sheet give 242. Not changed here (this task edits nothing outside agency/08-localisation/); flagged for whoever maintains de.ts.
8. No em or en dashes, no exclamation marks, no bullet points inside any text that goes out. Checked by script after writing.
9. Section and chapter names: Le pouls scientifique / Der wissenschaftliche Herzschlag, as content/fr.ts and content/de.ts print them. "This book is the Investigation." becomes « Ce livre mène l’enquête. » / „Dieses Buch ist die Untersuchung.“, assembled from the site's own press map label and title (`press.mapLabel` + `press.mapTitle`). Only the German pitch to the Journal uses it, as „die Untersuchung“.
10. Interface and trade words follow the site's press page: exemplaire de presse / Rezensionsexemplar; dossier de presse / Pressemappe; extrait / Leseprobe; Reproduction d’extraits / Abdruckrechte; broché / Taschenbuch (the German press facts on the site say „Paperback“; the release says Taschenbuch, which is what the site's buy block says and what a German reader expects in running prose. A reviewer may align one with the other).

### French

11. Typography as content/fr.ts: narrow no-break space (U+202F) before ; ? ! and inside « », no-break space (U+00A0) before :, curly apostrophe (U+2019), « » for every quotation, French sentence case in headings, accents on capitals, thousands with a narrow no-break space, decimals with a comma (2,8 Mo; 15,2 × 22,9 cm). Applied by script to every French body line; the English header blocks and URLs are untouched.
12. « e-mail » with a hyphen (the glossary's Luxembourg usage), « l’autrice », « le lecteur » masculine generic, « vous » throughout.
13. The glossary's two-noun rule for *reading* (METHOD-fr.md, "The French author's review, 2026-09-22"): what came back is a « lecture », what someone made of it is an « interprétation ». "before believing the first reading" in the L'essentiel pitch is « avant de croire la première lecture » because the English is about the datum, not the construal.
14. "the gap" is « l’écart » (glossary), not « fossé » or « décalage ».
15. "timing" in the back cover list is « l’heure qu’il est », the site's rendering of the same word in `premise.mechanism`.
16. "A relationship appears wrong." is « Une relation semble aller de travers. », the site's own verb for *feels wrong* (`variables.sortingLines[1]`: « quand tout semble aller de travers »). "A whole day looks lost." is « Une journée entière a l’air perdue. » The four verbs seems / feels / appears / looks become semble / paraît / semble / a l’air, which is French variety rather than English repetition; a reviewer may prefer « paraît » throughout.
17. "Check the signal." (back cover sign off) is « Vérifiez le signal. » The standard withdrew « vérifier » for interoceptive noticing (« Observez votre mâchoire »); this is not that case. Checking a signal before believing a story is checking whether something is wrong with it, which is what « vérifier » means. "Before you believe the story." is the site's footer band, « Avant de croire l’histoire. »
18. "A craving feels like a decision. A quiet room feels like judgement." are « Une envie passe pour une décision. Une pièce silencieuse passe pour un jugement. » « Passer pour » is the site's rendering of *felt like* (METHOD-fr.md: « est passée pour l’événement »). « Envie » for *craving* is the plain word; « manque » would say withdrawal, which the English does not.
19. "22 files" in the press kit note is « 22 fichiers ». The glossary refuses « fichier » for the book's *file* (a paper file in a drawer) and for the download labels on the press page; here the word names computer files in a zip and nothing else fits. A reviewer may prefer « 22 éléments ».
20. Salutation and close: « Madame, Monsieur, » and « Bien cordialement, », which is how a Luxembourg press email in French opens and closes; « Cher rédacteur » is not French.
21. In the Paperjam pitch the team session is described rather than titled (« une session sur la façon dont des messages ordinaires deviennent des malentendus au travail »), because the title exists only in English on /en/invite and a reader who clicks lands on an English page; the pitch says « en anglais ».

### German

22. Typography as content/de.ts: „ “ for quotations, ‚ ‘ inside them, ß where standard German has it, Sie / Ihr / Ihnen capitalised, decimal comma and thousands point (2,8 MB; 4.700), 6 × 9 Zoll, dates „16. Oktober 2026“.
23. The glossary's two nouns for *reading* (METHOD-de.md, amendment 59): what came back is a Befund, what someone made of it is a Lesart. In the investigation frame a counted reading is always a Befund, so "sixteen cases, each read three ways" in the Journal pitch is „sechzehn Fälle, jeder mit drei Befunden“, following the site's „Drei Befunde“. "What you found is a reading." is the site's „Was Sie gefunden haben, ist ein Befund.“
24. mind is Kopf, never Verstand or Geist (glossary). "the gap" is „die Lücke“ (glossary). cue is Auslöser, never Reiz. "sorting tool" is „ein Werkzeug zum Sortieren“.
25. "Check the signal." is „Prüfen Sie das Signal.“ The standard replaced „Prüfen Sie Ihren Kiefer“ with „Spüren Sie“ for interoceptive noticing; a signal is checked, not felt, so „prüfen“ is right here. "Before you believe the story." is the site's footer band, „Bevor Sie der Geschichte glauben.“
26. The v50 back cover's four lines: „Eine kurze Nachricht wirkt kalt. Eine Besprechung wirkt gefährlich. Ein Verlangen wirkt wie eine Entscheidung. Ein stiller Raum wirkt wie ein Urteil.“ „Wirkt“ is the site's verb for *feel hostile* in `moments.items[4]`. These lines are not used in any German pitch in this folder (they appear only in the L'essentiel pitch in French); they are recorded here so that the German is fixed before anyone needs it.
27. "We often mistake a state for a fact." is „Wir halten einen Zustand oft für eine Tatsache.“ „Halten für“ is the site's verb for *treats as truth* („hält diese Signale oft für die Wahrheit“), and it carries *mistake for* without „verwechseln“, which would make the two things interchangeable rather than one taken for the other.
28. "A relationship appears wrong." is „Eine Beziehung scheint nicht zu stimmen.“ A German reviewer should hear this one: „stimmt nicht“ is what a German says of a relationship that is off, and it avoids „falsch“, which would say the relationship is the wrong one.
29. "trained first to look, then to measure" is „hat zuerst das Sehen gelernt, dann das Messen“. „Ausgebildet“ is an institution's verb; „gelernt“ is what a person did, and the two nominalised infinitives carry the English pair without a compound.
30. "a Luxembourg psychologist's first" in a subject line becomes „ein erstes Buch aus Luxemburg“; German does not nominalise *first* alone.
31. Salutation and close: „Sehr geehrte Damen und Herren,“ with the first word of the body in lower case, as German letters do after a comma, and „Mit freundlichen Grüßen“ without a comma.

## Lines taken verbatim from content/fr.ts and content/de.ts

Where a line below is quoted in 08.1 to 08.4, it is the site's rendering, character for character, including its no-break spaces. The key is the field in the content file.

| English (printed or author's) | content/fr.ts | content/de.ts |
|---|---|---|
| Subtitle | `hero.subtitle` | `hero.subtitle` |
| "You may not be reacting to the world. You may be reacting to your state." | `premise.lines` | `premise.lines` |
| "The body speaks first. The mind explains second." | `moments.closing` | `moments.closing` |
| Page 4, the five times | `moments.items` | `moments.items` |
| "16 cases. Three readings. One question: state or situation?" | `moments.line` | `moments.line` |
| "Try something right now. Whatever you are feeling … What you found is a reading." | `reading.eyebrow`, `reading.lead`, `reading.steps`, `reading.result` | same |
| "They are not brain regions … when everything feels wrong at once." | `variables.sortingLines` | `variables.sortingLines` |
| "The chapters that follow are organised around three systems …" | `press.sortingTool`, first sentence | `press.sortingTool`, first sentence |
| Time, Attention, Safety and their questions | `variables.loops` | `variables.loops` |
| High / Medium / Low and their descriptions | `evidence.grades` | `evidence.grades` |
| The Scientific Heartbeat, page 242, two sentences | `press.sources`, `press.sourcesLabel` | `press.sources` (label there says Seite 220, see decision 7) |
| Page 3: "You operate a body …", "Your body speaks first and your mind explains second.", "But the body's confident weather report …" | `excerpt.paragraphs[7]` | `excerpt.paragraphs[7]` |
| Page 20, the closing block | `excerpt.closing` | `excerpt.closing` |
| Page 24, Misattribution | `names.example.body` | `names.example.body` |
| Page 193, the sensor line | `premise.sensorLine` (« témoin », Laurent Rouach's correction) | `premise.sensorLine` („Erzähler“) |
| "It is less interested in teaching you to trust your instincts …" | `excerpt.lead` | `excerpt.lead` |
| Readers, "For anyone who has ever been certain …" | `author.readers` | `author.readers` |
| Dr Herber, "Our first interpretation is not necessarily wrong …" | `foreword.quote[0]` | `foreword.quote[0]` |
| Short biography | `author.bio` | `author.bio` |
| Long biography (not used in the release; available) | `press.bios[1]` | `press.bios[1]` |
| "Is this the situation? Or is this their state?" (not used; available) | `closing.question` | `closing.question` |
| "Same life. Different instrument settings." (not used; available) | `closing.line` | `closing.line` |
| "Before you believe the story." | `footer.band` | `footer.band` |
| Press intro, review copies and licensing | `press.intro` | `press.intro` |
| Publication facts: format, pages, ISBN, category, language, legal deposit | `press.facts` | `press.facts` |
| Credits | `press.credits` | `press.credits` |
| "Each store sets its own price and delivery" | `status.pricesVary` | `status.pricesVary` |

## Translated here for the first time: a native reviewer must read these before anything is sent

These lines are printed in the English book but are not on the site in French or German, so no French or German reader has seen them. Each is given with the English.

| English (P, v50 back cover unless stated) | French | German |
|---|---|---|
| We often mistake a state for a fact. | Nous prenons souvent un état pour un fait. | Wir halten einen Zustand oft für eine Tatsache. |
| A person seems hostile. A task feels impossible. A relationship appears wrong. A whole day looks lost. | Une personne semble hostile. Une tâche paraît impossible. Une relation semble aller de travers. Une journée entière a l’air perdue. | Eine Person wirkt feindselig. Eine Aufgabe erscheint unmöglich. Eine Beziehung scheint nicht zu stimmen. Ein ganzer Tag sieht verloren aus. |
| But what feels true is not produced by the situation alone. | Mais ce qui paraît vrai n’est pas produit par la seule situation. | Aber was sich wahr anfühlt, entsteht nicht aus der Situation allein. |
| Sleep, hunger, stress, timing, attention, memory and threat detection affect what we notice and how we interpret it. | Le sommeil, la faim, le stress, l’heure qu’il est, l’attention, la mémoire et la détection de la menace agissent sur ce que nous remarquons et sur la façon dont nous l’interprétons. | Schlaf, Hunger, Stress, Timing, Aufmerksamkeit, Gedächtnis und Bedrohungserkennung beeinflussen, was wir wahrnehmen und wie wir es deuten. |
| Together, they shape the explanation that feels most convincing. | Ensemble, ils façonnent l’explication qui paraît la plus convaincante. | Zusammen formen sie die Erklärung, die am überzeugendsten wirkt. |
| State. Not Situation. examines the gap between what happened and what it felt like it meant. | State. Not Situation. examine l’écart entre ce qui s’est passé et ce que cela semblait vouloir dire. | State. Not Situation. untersucht die Lücke zwischen dem, was geschehen ist, und dem, was es zu bedeuten schien. |
| Check the signal. Before you believe the story. | Vérifiez le signal. Avant de croire l’histoire. | Prüfen Sie das Signal. Bevor Sie der Geschichte glauben. |
| A short message feels cold. A meeting feels dangerous. A craving feels like a decision. A quiet room feels like judgement. | Un message court paraît froid. Une réunion paraît dangereuse. Une envie passe pour une décision. Une pièce silencieuse passe pour un jugement. | Eine kurze Nachricht wirkt kalt. Eine Besprechung wirkt gefährlich. Ein Verlangen wirkt wie eine Entscheidung. Ein stiller Raum wirkt wie ein Urteil. |
| Ivana Budišin trained first to look, then to measure. With a background in design and later in clinical psychology, she is interested in what happens between an event and the certainty we build around it. | not used in French; if needed: Ivana Budišin a d’abord appris à regarder, puis à mesurer. Venue du design, puis de la psychologie clinique, elle s’intéresse à ce qui se passe entre un événement et la certitude que nous construisons autour de lui. | Ivana Budišin hat zuerst das Sehen gelernt, dann das Messen. Mit einem Hintergrund im Design und später in der klinischen Psychologie interessiert sie sich für das, was zwischen einem Ereignis und der Gewissheit geschieht, die wir um dieses Ereignis herum aufbauen. |
| This book is the Investigation. (page 5) | Ce livre mène l’enquête. (site's own words, assembled) | Dieses Buch ist die Untersuchung. (site's own words, assembled) |
| "It offers questions, not a diagnosis." (draft, not printed) | Il propose des questions, pas un diagnostic. | Es bietet Fragen an, keine Diagnose. |

Other points for the reviewer:

- The English connective prose (who, what, when, where to buy) is the desk's and was written as French and German press prose, not translated sentence by sentence; a reviewer should read it for register, not against the English.
- Both: the listing descriptions carry the disclosure sentence at the end, so they run longer than the English. French: short 58 words against 58, long 138 against 120. German: short 65 against 58, long 129 against 120. The French long text is longest because French needs more words for the back cover list than English does. Cut the disclosure only if the retail page carries it elsewhere.
- German: "Psychologiebuch für ein allgemeines Publikum" for "a psychology book for general readers" in the Wort pitch; „Sachbuch“ was not used because the English does not say it.
- German: the Journal subject line „Erst sehen, dann messen“ is a headline, translated as one (STANDARD.md, Headlines), not a quotation; the quoted back cover sentence in the body uses „das Sehen gelernt, dann das Messen“.
- Both: the 100,7 pitch quotes page 193 through the site's sensor line. In French the site prints « témoin » for *narrator* (Laurent Rouach's correction) while the German prints „Erzähler“; the French pitch to 100,7 does not exist, so no French line was needed, but if one is made it must use « témoin », as the site does.
- Both: "Luxemburger Wort if addressed in French" in the task. It is addressed in German, as the source pitch says; no French Wort pitch was made.

## Checks run

Every file in this folder was searched after writing for U+2014 and U+2013 (none), for "!" outside the header blocks (none), and, in the French files, for a regular space before ; : ? ! or inside « » (none remain: every such space is U+202F, or U+00A0 before a colon). The bracketed items were searched for and are byte identical to the English source.
