@AGENTS.md

---

# State. Not Situation. — read this before changing anything

The launch website for a psychology trade book by Ivana Budišin, a clinical psychologist in Luxembourg. The book is real, finished and typeset; the site is an extension of it, not a description of it.

**Owner:** Ivana Budišin · ivana@luxembourgpsychology.com
**Live:** connected to Vercel, auto-deploys from `main`
**Repo:** `luxembourgpsychology-cyber/state-not-situation`

## The one rule that matters

**The site may not say anything about the book that the book does not say about itself.**

Every sentence in `content/*.ts` is one of exactly four things:

1. printed in the book or on its cover, word for word;
2. written by Ivana and given to the team, word for word (recorded as such in `CONTENT_SOURCES.md`);
3. a plain interface label (Play, Press, Email address);
4. a `[COPY NEEDED: …]` placeholder only Ivana can fill.

There is no fifth category. Do not write marketing copy. Do not paraphrase the book into something smoother. Do not invent a statistic, a credential, or a review.

`CONTENT_SOURCES.md` records the page of the book behind every line. **If you add a sentence, add its source there.** If you cannot cite a source, write a placeholder instead and tell Ivana what you need.

This is not fussiness. An earlier draft of this site carried claims taken from a machine-written press pack — a reference count, a DOI-verification count, a biography describing her as a business owner. None of it appears in the manuscript. A journalist who checked would have found the site overstating the book. That is the failure mode this rule exists to prevent.

## Where things live

| What | Where |
|---|---|
| Launch settings per language: publication status, Amazon link, audio file, ISBN, newsletter, analytics, which languages are on | `site.config.ts` |
| Every word on the site | `content/en.ts`, `content/fr.ts`, `content/de.ts` |
| The shape those files must follow | `content/types.ts` |
| Provenance of each sentence | `CONTENT_SOURCES.md` |
| The author's brief for the site | `brief/REDESIGN-BRIEF.md` — verbatim, and it governs |
| The canonical architecture and every string's treatment | `brief/REDESIGN.md` |
| How the page got here | `translation/EDITORIAL-POSITIONING.md`, `translation/HOOK-DECISION.md` (both superseded, kept as record) |
| The standard every French and German sentence must meet | `translation/STANDARD.md` (Ivana's own document; it governs) |
| The per-language method and glossary | `translation/METHOD-fr.md`, `translation/METHOD-de.md` |
| Typography, colour, devices taken from the printed book | `DESIGN_SYSTEM.md` |
| How to run, deploy, translate, go on sale | `README.md` |

Copy and launch state change in those two top files. You should not need to touch `components/` or `app/` to change a word.

## Design constraints

Documented in `DESIGN_SYSTEM.md`, and it is deliberately small: **six type steps, three spacing values, four jobs for red, one shadow, one transition.** Cream `#F7F3EC`, cover red `#B5291C`, ink `#111`; the three system inks Time `#2C6E8A`, Attention `#8C7432`, Safety `#BF372A`, read from the page 11 rectangles of the print file. Serif titles never bold. Mono for anything measured. No gradients, no glass, no icon sets, no cards.

The hero is the printed front cover, flat and still, with the site's only shadow. There is no 3D book and nothing driven by scroll position: the author's brief forbids scroll choreography and unnecessary 3D effects. No animation library is installed and none should be added.

**A section that will not fit the type scale is a section that needs rewriting, not a new size.**

## Verified facts (do not restate anything else as fact)

- ISBN-13 **978-2-87996-258-0**, © 2026 Budisin Publishing, 278 pages, 6 × 9 in
- Cover design: Zoe Larusson. Book design and typesetting: Ivana Budišin
- CIP record at Bibliothèque nationale du Luxembourg
- Author biography, in full: *"Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book."*

The book states **no** count of references, no DOI verification, no "years of reading". Anything of that kind found in `../Press Pack/` is machine-written and is not a source.

## The page, in order

Eight sections, decided in `brief/REDESIGN.md` against the author's brief. Section ids are English in every language, by contract: the language switcher keeps a reader in the section they are in. Do not reorder without reading that file.

1. `Hero` — the printed cover, the title, two actions and no more
2. `Premise` — the mechanism (page 181's line, page 10's three lines, the back cover's four sentences), then the reading (page 13's three checks)
3. `Variables` — Time. Attention. Safety., as a spread
4. `Moments` — three printed CASE EVIDENCE pages, under page 11's "16 cases" line
5. `Evidence` — the three markers with the author's own descriptions
6. `ExcerptTeaser` — two opening paragraphs on the book's paper, then Continue reading
7. `Readings` — the fifteen printed chapter openings, as one dashboard
8. `Author`, then `Closing` — page 225, the cover line, and the one form

The chapter map, the page 13 sorting passage, the fourth case panel and page 226 live on `/press`. The page 26 block lives on `/read`.

`Listen` still exists and is switched off. It renders only when `editions[lang].audioUrl` is set, and on 6 September 2026 the author took the reading down: *"take out the reading… it's bad."* Setting a path there brings the section, its footer link and its link from `/read` back in one value. Read `audio/README.md` before generating anything: the model choice and the direction tags were both measured that day and both were wrong in the takes she heard.

## Still outstanding from Ivana

Search `content/en.ts` for `[COPY NEEDED`:

- `press.bios[1]` — a long biography, 100 to 150 words (the press page hides the whole Biography block until it exists)

Four open questions are listed at the end of `CONTENT_SOURCES.md`. Two more were
closed on 6 September 2026: the credential on the first screen, and whose voice
the recording was.

One thing needs her word rather than a decision: she wrote that Zoe Larusson is
"the photographer and book designer", but page 4 prints **Book design and
typesetting: Ivana Budišin**. The photography credit is on the site; the book
design credit is left as the book prints it, because the site may not contradict
the printed page.

## Working here

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before pushing; it type-checks too
```

Pushing to `main` deploys to production automatically. There is no manual deploy step and no Vercel CLI login on this machine.

Before you push: `npm run build` clean, no horizontal overflow at 360/390/1440 px, one `h1` per page, headings in order, alt text on every image, tap targets ≥ 44 px, and reduced motion still collapses the hero scroll track.

## Multilingual

English is live and indexed. French and German are translated, enabled and **under review** in `site.config.ts` (`underReview: true`): browsable, in the switcher, but `noindex` and outside the sitemap and hreflang until a native speaker signs them off. An untranslated string renders as a visible `⟦fr: some.key⟧` — never as silent English. `node lib/make-stubs.mjs` adds new keys when the English structure changes; `--force` discards existing translations.

Every French or German sentence must meet `translation/STANDARD.md`. In short: translate the sense and the effect, not the word order; keep every hedge; never add a claim; the English original sets the length and the register; if a reader would notice it is a translation, it is not finished. `node lib/make-review-pack.mjs fr` then `python3 lib/make_review_xlsx.py fr` builds the reviewer's workbook.
