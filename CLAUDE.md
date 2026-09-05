@AGENTS.md

---

# State. Not Situation. — read this before changing anything

The launch website for a psychology trade book by Ivana Budišin, a clinical psychologist in Luxembourg. The book is real, finished and typeset; the site is an extension of it, not a description of it.

**Owner:** Ivana Budišin · ivana@luxembourgpsychology.com
**Live:** connected to Vercel, auto-deploys from `main`
**Repo:** `luxembourgpsychology-cyber/state-not-situation`

## The one rule that matters

**The site may not say anything about the book that the book does not say about itself.**

Every sentence in `content/*.ts` is one of exactly three things:

1. printed in the book or on its cover, word for word;
2. a plain interface label (Play, Press, Email address);
3. a `[COPY NEEDED: …]` placeholder only Ivana can fill.

There is no fourth category. Do not write marketing copy. Do not paraphrase the book into something smoother. Do not invent a statistic, a credential, or a review.

`CONTENT_SOURCES.md` records the page of the book behind every line. **If you add a sentence, add its source there.** If you cannot cite a source, write a placeholder instead and tell Ivana what you need.

This is not fussiness. An earlier draft of this site carried claims taken from a machine-written press pack — a reference count, a DOI-verification count, a biography describing her as a business owner. None of it appears in the manuscript. A journalist who checked would have found the site overstating the book. That is the failure mode this rule exists to prevent.

## Where things live

| What | Where |
|---|---|
| Launch settings per language: publication status, Amazon link, audio file, ISBN, newsletter, analytics, which languages are on | `site.config.ts` |
| Every word on the site | `content/en.ts`, `content/fr.ts`, `content/de.ts` |
| The shape those files must follow | `content/types.ts` |
| Provenance of each sentence | `CONTENT_SOURCES.md` |
| Typography, colour, devices taken from the printed book | `DESIGN_SYSTEM.md` |
| How to run, deploy, translate, go on sale | `README.md` |

Copy and launch state change in those two top files. You should not need to touch `components/` or `app/` to change a word.

## Design constraints

Taken from the printed book, documented in `DESIGN_SYSTEM.md`. Briefly: cream `#F7F3EC`, cover red `#B5291C`, ink `#111`; loop colours Time `#4B839A`, Attention `#988349`, Safety `#C75043`. Serif titles are never bold. Red is emphasis only. Mono is for anything measured. No gradients, no glass, no icon sets, and exactly one shadow — under the book.

The hero is a CSS 3D book built from the real cover, spine and page block, opening on scroll to the book's own title page. It reads one custom property, `--open`. No animation library is installed and none should be added.

## Verified facts (do not restate anything else as fact)

- ISBN-13 **978-2-87996-258-0**, © 2026 Budisin Publishing, 278 pages, 6 × 9 in
- Cover design: Zoe Larusson. Book design and typesetting: Ivana Budišin
- CIP record at Bibliothèque nationale du Luxembourg
- Author biography, in full: *"Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book."*

The book states **no** count of references, no DOI verification, no "years of reading". Anything of that kind found in `../Press Pack/` is machine-written and is not a source.

## Still outstanding from Ivana

Search `content/en.ts` for `[COPY NEEDED`:

- `about.paragraphs[0]` — what the book contains, in her words
- `about.readers` — who it is for
- `press.bios[1]` — a long biography
- `companion.line` — the companion tool sentence (that section is switched off in `site.config.ts` until it exists)

## Working here

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before pushing; it type-checks too
```

Pushing to `main` deploys to production automatically. There is no manual deploy step and no Vercel CLI login on this machine.

Before you push: `npm run build` clean, no horizontal overflow at 360/390/1440 px, one `h1` per page, headings in order, alt text on every image, tap targets ≥ 44 px, and reduced motion still collapses the hero scroll track.

## Multilingual

English is live. French and German are structural stubs, disabled in `site.config.ts`, and their marks show greyed in the switcher. An untranslated string renders as a visible `⟦fr: some.key⟧` — never as silent English. `node lib/make-stubs.mjs` regenerates the stubs when the English structure changes; `--force` discards existing translations.
