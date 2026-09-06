# Handoff — State. Not Situation. website

Paste this whole file into a new assistant session before asking it to change anything. It is written to be understood without access to the conversation that built the site.

---

## 1. What this is

The launch website for **State. Not Situation.**, a psychology trade book by **Ivana Budišin**, a clinical psychologist living and working in Luxembourg. The book is finished, typeset and printed in English. It is not yet on sale.

The site is an extension of the printed book, not a description of it. Everything on it — typography, colour, the 3D book that opens as you scroll, and above all the words — is taken from the physical object.

- **Live:** https://statenotsituation.com
- **Repo:** `git@github.com:luxembourgpsychology-cyber/state-not-situation.git` (private)
- **Hosting:** Vercel, project `state-not-situation`, auto-deploys from `main`
- **Owner:** Ivana Budišin · ivana@luxembourgpsychology.com

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4. No animation library. No UI kit. Node 20+.

---

## 2. The one rule

> **The site may not say anything about the book that the book does not say about itself.**

Every user-visible string is one of exactly four things:

1. **Printed** — in the book or on its cover, word for word.
2. **Author-supplied** — written by Ivana and given to the team, word for word, and recorded as such in `CONTENT_SOURCES.md`.
3. **Interface** — a plain functional label: Play, Press, Email address.
4. **Placeholder** — marked `[COPY NEEDED: …]`, waiting for Ivana.

There is no fifth category. **Do not write marketing copy. Do not paraphrase the book into something smoother. Do not invent a statistic, a credential, a review or a publication date.**

`CONTENT_SOURCES.md` in the repo records the page of the book behind every line. **If you add a sentence, add its source there.** If you cannot cite a source, write a placeholder and tell Ivana what you need.

This is not fussiness. An early draft of this site carried claims lifted from a machine-written press pack: a reference count, a DOI-verification count, a biography describing her as a business owner. **None of it appears in the manuscript.** A journalist who checked would have found the site overstating the book. That is the failure this rule exists to prevent.

---

## 3. Where everything lives

You should almost never need to open `components/` or `app/` to change what the site *says*.

| What | File |
|---|---|
| Launch settings per language: publication status, Amazon link, audio file, ISBN, newsletter endpoint, analytics, which languages are on | `site.config.ts` |
| Every word, English | `content/en.ts` |
| Every word, French | `content/fr.ts` |
| Every word, German | `content/de.ts` |
| The interface all three must satisfy | `content/types.ts` |
| Page of the book behind each line | `CONTENT_SOURCES.md` |
| **The author's brief for the site** | `brief/REDESIGN-BRIEF.md` — verbatim, and it governs everything |
| **The canonical architecture and every string's treatment** | `brief/REDESIGN.md` |
| How the page got here | `translation/EDITORIAL-POSITIONING.md`, `translation/HOOK-DECISION.md` (superseded, kept as record) |
| The standard every French and German sentence must meet | `translation/STANDARD.md` — Ivana's own document; it governs all translation work |
| The per-language method, glossary and typography | `translation/METHOD-fr.md`, `translation/METHOD-de.md` |
| Typography, colour, graphic devices | `DESIGN_SYSTEM.md` |
| Run, deploy, translate, go on sale | `README.md` |
| Agent rules (loaded automatically by Claude Code) | `CLAUDE.md` |

```
app/[lang]/          page.tsx (home), read/ (reading mode), press/
components/          one file per section, plus Book3D
lib/i18n.ts          language helpers, missing-translation markers
lib/analytics.ts     track() helper
lib/make-stubs.mjs   adds new keys to fr.ts / de.ts from en.ts
lib/make-review-pack.mjs + lib/make_review_xlsx.py   builds the reviewer's workbook for one language
translation/         the editorial decision, the translation standard, the two methods
proxy.ts             sends / to the visitor's best enabled language
public/images        cover, spine, author photograph, social preview
public/press         downloadable press assets
public/audio         recordings go here (none yet)
```

---

## 4. Current state

**Working and live:** custom domain with SSL, `www` → apex 308 redirect, GitHub → Vercel auto-deploy, three languages, reading mode, press page, sitemap, robots, Book and Person structured data carrying the real ISBN, social preview card.

**The site was redesigned on 6 September 2026** to the author's own brief (`brief/REDESIGN-BRIEF.md`), by a team working in the roles she named: editorial director, creative director, publishing marketing director, senior UX designer, English copy editor, French and German literary localisation editors. The decision they reached is `brief/REDESIGN.md`, and it is what the code implements.

**Eight sections, in this order:** the cover · the premise (page 181's line, page 10's three lines, the back cover's four sentences) and the reading (page 13's three checks) · Time. Attention. Safety. · three printed case moments under page 11's "16 cases" line · the evidence markers with the author's own descriptions · two paragraphs of the extract · the reading, when audio exists · the author · page 225 and the form.

**What that cost:** twelve sections to eight, about 1,210 visible words to about 690, and a phone page from 12,300 px to about 8,600 px — a third shorter, which is what her brief asked for. Nothing was cut for being wrong; it was cut because the page said it twice or said it where it did not land. The chapter map, the page 13 sorting passage, the fourth case panel and page 226 moved to `/press`; the page 26 block moved to `/read`. All of it is in the table in `brief/REDESIGN.md`.

**Gone and not coming back:** the CSS 3D book and its scroll track (her brief forbids scroll choreography and unnecessary 3D), the case-evidence boxes, page 10's five readings, page 13's 169 words of evidence prose, the footer's three-line method, the second imprint line, the companion section.

**English is complete** apart from two placeholders (below). Every English line was re-verified against the almost-final 278-page PDF on 5 September 2026.

**Listen is hidden** — in the navigation, the footer, the reading page and the home page — until `editions[lang].audioUrl` is set. There is no recording yet.

**French and German are translated but `underReview: true`.** They are browsable and appear in the language switcher so native speakers can check them, but they carry `noindex`, and are excluded from the sitemap and from hreflang. **This is deliberate and important:** there is no French or German edition of the book, so those pages contain a translation of Ivana's English, including the real opening pages. Fine for review; wrong for a search engine to present as the book's published text.

When a native speaker signs a language off, set `underReview: false` for that language in `site.config.ts`. Nothing else.

**Two placeholders remain**, neither currently visible:

| Key | What is needed | Why it isn't showing |
|---|---|---|
| `press.bios[1]` | A long biography, 100–150 words | The press page filters out any bio starting `[COPY NEEDED` |
| `companion.line` | One sentence about the companion tool | `companion.enabled` is `false` in `site.config.ts` |

---

## 5. Verified facts — do not state anything else as fact

- **ISBN-13:** 978-2-87996-258-0
- © 2026 Budisin Publishing · 278 pages · 6 × 9 in paperback
- Cover design: **Zoe Larusson**. Book design and typesetting: **Ivana Budišin**
- CIP record at the Bibliothèque nationale du Luxembourg
- Author biography, in full and verbatim: *"Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book."*
- Publication status: **forthcoming**. No date has been announced. Do not invent one.

The book states **no** count of references, **no** DOI verification, **no** "years of reading". Anything of that kind found in the sibling `Press Pack/` folder is machine-written and **is not a source**.

---

## 6. Design constraints

Full detail in `DESIGN_SYSTEM.md`. In short:

- **Colour:** cream `#F7F3EC`, cover red `#B5291C`, ink `#111111`. The three system inks: Time `#2C6E8A`, Attention `#8C7432`, Safety `#BF372A`, read from the page 11 rectangles of the print file (corrected 6 September 2026).
- **Type:** IvyPresto Display (serif titles, **never bold**), DIN Alternate Bold (tracked caps, navigation), Source Sans 3 (body), IBM Plex Mono (anything measured). Open-source substitutes ship; an Adobe Fonts kit id can be set in `site.config.ts`.
- Red is emphasis only. No gradients, no glass, no icon sets, exactly one shadow — under the book.
- The hero is a **CSS 3D book** built from the real cover, spine and page block, opening on scroll to the book's own title page. It reads one custom property, `--open`. **Do not add an animation library.**
- **Do not** re-enable `hyphens: auto` on display type — it broke words mid-line ("sen-tence") and was removed deliberately.

---

## 7. How to work on it

```bash
git clone git@github.com:luxembourgpsychology-cyber/state-not-situation.git
cd state-not-situation
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before pushing — it type-checks too
```

**Deploying:** push to `main`. Vercel builds and publishes automatically, usually inside a minute. There is no manual deploy step and no Vercel CLI login on Ivana's machine.

**Before you push, check:** `npm run build` clean; no horizontal overflow at 360, 390 and 1440 px; one `h1` per page; headings in order; alt text on every image; tap targets ≥ 44 px; reduced motion still collapses the hero scroll track; and with JavaScript disabled no text is hidden or dimmed.

---

## 8. Multilingual notes

- An untranslated string renders as a visible `⟦fr: some.key⟧`, never as silent English. That is intentional — nothing may leak through unnoticed.
- `node lib/make-stubs.mjs` adds any new keys to `fr.ts` and `de.ts` without overwriting existing translations. `--force` rebuilds from scratch and **discards** them.
- French and German run longer than English. Headings, buttons, navigation and the loop columns wrap rather than clip. Test at 360 px.
- French typography: narrow no-break space (U+202F) before `; ! ?`, U+00A0 before `:`, guillemets `« »`, curly apostrophes.
- German: `„ "` quotation marks, `Sie` for the reader, **Luxemburg** (German exonym) in German prose.
- Ivana's standing instruction on translation: **translate the context, not word by word.** Recast sentences so they read as native prose. But never add a claim and never drop a qualification — the book is careful about what it does and does not assert.
- **`translation/STANDARD.md` is the full standard, in her words, and it governs.** Read it before touching `fr.ts` or `de.ts`. Its test: if the reader notices the translation, the work is not finished. It fixes specific choices, among them: FR "Observez votre mâchoire" not "Vérifiez", "augmente" not "monte"; DE "Spüren Sie Ihren Kiefer" not "Prüfen Sie", no "billig/teuer" for cognitive cost, no "Grundempfindlichkeit". Open questions to the author go in `translation/QUERIES-<lang>.md` in the TRANSLATION QUERY format the standard defines.
- **Reviewer workbooks:** `node lib/make-review-pack.mjs fr && python3 lib/make_review_xlsx.py fr` writes `review/State-Not-Situation-French-review.xlsx` (same for `de`). The `review/` folder is gitignored.

---

## 9. Going on sale

When the book is published, in `site.config.ts` under `editions.en`:

```ts
publicationStatus: "published",
amazonUrl: "https://www.amazon.com/dp/XXXXXXXXXX",
publicationDate: "2026-09-15",   // optional
```

Push. Every "Publishing soon" and "Be notified" element becomes "Buy on Amazon" by itself, the notify form disappears, and the structured data gains an offer. Each language has its own block, so the French edition can stay forthcoming while English is on sale.

Vercel is currently on the **Pro** plan, which is required once the book is commercial.

---

## 10. Things that will look like bugs but are not

- `/fr` and `/de` are `noindex` and missing from the sitemap — deliberate, see §4.
- Two `[COPY NEEDED` strings appear in the page's JSON payload but render nowhere — the sections are filtered or disabled.
- `AGENTS.md` is rewritten by `next dev` on every run. Commit it with your work rather than fighting it.
- The site has no cookie banner because it sets no cookies and ships no analytics by default. Keep it that way; if analytics are switched on, use the cookieless option.

---

## 11. Open questions for Ivana

1. The long press biography (§4).
2. Whether the companion-tool section should exist at all, and if so what one sentence goes in it.
3. Sign-off on the French and German from native speakers, then `underReview: false`.
4. An audio recording of her reading an extract — the player is built and appears the moment `editions.en.audioUrl` points at a file in `public/audio/`.
5. From the editorial decision (listed in full at the end of `CONTENT_SOURCES.md`): a hero byline in her words; one or two sentences on why she wrote the book; a publication month if one exists; permission to quote page 26 without its preceding sentence; the typos noted in the almost-final text.
