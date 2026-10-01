# The commercial extension, 1 October 2026

Six new English pages that give a visitor a next step — try the idea, come to an event,
invite Ivana — plus one section on the home page and links in the header, menu and
footer. Built from the author's handoff of 1 October 2026 (`01_PRODUCT_AND_PAGE_SPEC.md`,
`02_CONTENT_AND_CONFIG.json`, `03_IMPLEMENTATION_CONTRACT.md`, `04_QA_AND_RELEASE.md`
and her master prompt), inside this site's own architecture and design system
(`BRAND_BASELINE.md`).

**Live since 1 October 2026**, approved by the author after reviewing the preview
(`site.config.ts → extension.approved: true`, all four offers approved). Setting it back
to `false` takes every new page and link off the site together; with it `false`, the
pages return 404, nothing links to them, and previews show them under a "draft for
review" line.

## Turning things on

| To… | Change | Where |
|---|---|---|
| Publish the extension after reviewing the copy | `extension.approved: true` | `site.config.ts` |
| Publish an offer on /invite | that offer's `approvedForPublication: true` (production shows only approved ones; with none, /invite and /enquire stay off) | `content/extension.en.ts` |
| Change any word | the strings | `content/extension.en.ts` (+ its source in `CONTENT_SOURCES.md`) |
| Announce an event | add a record (template in the file's comment) | `content/events.ts` |
| Open booking for it | `status: "bookable"` + `checkoutUrl`, `bookingProvider`, `bookingTermsUrl`, and `currency` / `priceDisplay` / `priceIncludesFeesAndTaxes` unless `isFree` | same record |
| Mark it sold out / cancelled | `status: "sold_out"` / `"cancelled"` (+ `cancellationInformation`) | same record |
| Launch the app link | `extension.app: { status: "live", publicUrl: "https://…" }` — both, together | `site.config.ts` |
| Sell the book | unchanged: `editions.en.publicationStatus: "published"` + `amazonUrl` | `site.config.ts` |

Events pass into the past at the next deploy after they end (the pages are static).
Every change is a commit; Vercel previews it on a branch and publishes it from `main`.

## Routes

| Route | What it is | Without an approved value it shows… |
|---|---|---|
| `/en#explore-more` | One section after the form, before the footer: three doors and the app's status line | — |
| `/en/explore` | Three original scenes (`?scene=message|starting|evening`), each opening in place | the list of three |
| `/en/invite` | Four offers (`#teams`, `#talks`, `#workshops`, `#professionals`), practical questions, the author, the press kit | "Request availability and a quote"; no fee anywhere |
| `/en/enquire?format=…&source=…` | The organiser's enquiry, as an email draft | always the email draft: there is no backend |
| `/en/events` | Public events, upcoming then past | "Public dates will be announced here." + ask by email / invite |
| `/en/events/[slug]` | One event | no page exists until a real record is approved |
| `/en/app` | The STATE app's doorway | "In development", no link |
| `/en/research` | Research and limits, mostly in the book's own words | — |

French: none of these exist under `/fr` (404). On the English pages the FR mark reads
"FR · livre" and goes to the French book page. French and German pages are unchanged.

## Files

- `lib/extension/rules.ts` — every decision that could put an untrue claim on a page, as
  plain functions; `tests/extension.test.mjs` tests them (`npm test`).
- `lib/extension/index.ts` — the rules wired to the config and content; visibility from
  `process.env.VERCEL_ENV` at build time.
- `content/extension.en.ts`, `content/extension-types.ts`, `content/events.ts`.
- `components/Discovery.tsx` (home), `components/extension/*` (shell, scenes, enquiry,
  event parts, outbound link, scope note).
- `app/[lang]/{explore,invite,enquire,events,events/[slug],app,research}/page.tsx`.
- Changed: `app/[lang]/page.tsx` (one section, one prop), `app/[lang]/press/page.tsx`
  (one prop), `components/Nav.tsx` and `components/LanguageSwitcher.tsx` (opt-in props —
  without them they render as before), `components/Footer.tsx` (a second row, English
  only), `app/sitemap.ts`, `lib/analytics.ts` (six event names), `app/globals.css` (one
  scoped block at the end), `package.json` (`test`).

## Decisions

Where this departs from the handoff, and why.

1. **One fence for all new copy.** The repository's rule is that every sentence is
   printed, author-supplied, an interface label or a placeholder. The handoff's copy is a
   fifth kind — a draft for her review — so it is gated: on previews only until
   `approved`. Merging early changes nothing on the live site (verified: a production-mode
   build is pixel-identical to `137367e` on all six protected pages at four widths).
2. **Book quotations stay exact, or go.** Printed lines appear only verbatim, with their
   source. Explore's ending is now the author's own unquoted sentence. Research keeps its
   printed passages (page 7, The Scientific Heartbeat) with their page labels: the author
   chose to leave that page as it was. No em dashes in the new pages' wording.
3. **No cards.** The three doors are set like the evidence markers; offers and events
   like the press page's fact sheet; scenes like page 4's moments. No new type step,
   colour, spacing value or shadow. Status words (Sold out, Cancelled) stay ink: red has
   four jobs.
4. **Invite Ivana is a primary destination** (the author's brief, 1 October 2026): in the
   desktop bar after Press, and in the phone menu's main list. With six items, the bar
   moves behind Menu below 1024 px rather than shrink, and the wordmark shows from 1280.
   "More ways in" keeps Explore, Events, Research & limits and the app.
5. **The wording is the author's** (her editorial and booking-clarity brief, 1 October
   2026; `COPY_CHANGES.md`). Each offer shows audience, plain title, duration, takeaway
   and its own action before anything opens; the enquiry starts with four fields; every
   button says what the site actually does (an email draft). "Pre-order the book" uses a
   new `publicationStatus: "preorder"` that the original pages treat as forthcoming.
6. **On a phone, Menu at the top left, and "More ways in" first** (the author's request,
   1 October 2026). Close takes Menu's place. The sheet opens on a swipe strip of the
   ways in, each a word, a short line in mono and a stretch of the cover's pulse line;
   the next word is cut by the margin as the sign there is more. Invite Ivana and the
   book's own items and actions follow; the footer row stays. A scroll-progress line
   was considered and rejected: nothing on this site is driven by scroll position.
7. **Scenes open in place** (native `<details>`), not in a panel below the list: readable
   with no script, no jump on a phone. Focus therefore stays on the scene's own button,
   which the scene directly follows (the native disclosure pattern); "Back to the three
   moments" returns focus to it. Each "Read the scene" names its scene to screen readers.
8. **The book action reads the existing release switch** (`publicationStatus` +
   `amazonUrl`) rather than a second one: one switch cannot drift from another.
   "Forthcoming" with an old link still set never shows a purchase label.
9. **The scenes are one fictional day, written to "you"** (the author's choice): 16:10 a
   message, 16:12 the slide, 22:36 one more folder, 07:08 the kettle — the way page 4
   reads one day five times. Each scene still works alone; read together, the 16:12
   reveal names the message from two minutes earlier. **Drawn as one day** (her pick of
   two mockups): the cover's pulse line runs across the day above the list, and each
   time under it opens its moment; "See what happens the next morning" opens the evening
   scene with its 07:08 reveal. A motif, not data: no axis, no values.
10. **Invite is built to be scanned** (the author: "HR and readers are now on TikTok"):
    her portrait and the questions first; the offers as above; the rest one tap away, in
    the page. A shared `#teams` link arrives open. Research sets Time. Attention. Safety.
    in their own inks, as the home page does.
11. **`.btn-solid` on two more controls**: the enquiry's submit and an event's booking
    link. The system reserves the solid block for "a form control [that] must read as a
    control"; both are that.
12. **Event structured data without an offer**: schema.org wants a numeric price and the
    site holds the verified price as a sentence. None is emitted on previews or for past
    events.
13. **Email still required** in the email-draft form, as specified: the copyable fallback
    text then carries a reply address, and the form needs no change when a backend comes.

## Verified (1 October 2026)

- `npm run build`, `npx tsc --noEmit`, `npm run lint` (0 errors; the two warnings
  pre-date this work), `npm test` (13 tests).
- 100 browser checks of the journeys at 390 and 1440 (scenes, Back/Forward, direct and
  invalid `?scene=`, keyboard only, no-script reading, the header disclosure and phone
  menu, French untouched, all four offer → enquiry preselections, unknown query values,
  validation and error focus, the email draft's encoding and its honest wording, events'
  empty state and separate attendee email, app status, home section order, the notify
  form and its purpose line). No console errors.
- 15 state checks on a temporary local build with fictional records (never committed):
  announced, bookable, sold out, cancelled, past and draft events; a published book;
  a live app — including that the footer, header and home strip switch with the app.
- Before/after: protected pages compared by text, ids, links, headings, metadata and
  structured data, and by pixels, at 390/768/1024/1440. With the extension on, the home
  page from the hero to the form is pixel-identical; the only differences are the header
  row, the new section and the footer row. French is identical. With it off
  (production), everything is identical.
- No horizontal overflow on any page at 390 or 1440, protected pages also at 768/1024.
- No manuscript passages, February Readings, worksheets or app material in the build.
- Client JavaScript: +0.1 KB gzip on the home page.

Not verified here: real email clients opening the draft (desktop and phone handlers
differ; the copyable text is the fallback), Safari and Firefox (Chrome only), a screen
reader pass, and the preview deployment's own headers.

## Waiting on the author

1. ~~Review the copy on the preview, then `extension.approved` and each offer's flag.~~
   Done 1 October 2026.
2. Confirm the four offers' formats and durations, and which languages sessions run in.
3. Confirm enquiries go to `ivana@luxembourgpsychology.com` (the existing public address).
4. Check "FR · livre" and its French tooltip.
5. Real events, when there are some: date, venue, language, price, provider, terms.
6. The app's address, when it is live.
7. The Amazon link at publication (unchanged mechanism).

## Later (not built, in order of usefulness)

1. **An enquiry backend** (a form provider or a mail API through a Vercel function), with
   a privacy notice — needs a service choice and a policy page.
2. ~~**Analytics on**~~ — done 1 October 2026: Vercel Web Analytics (cookieless, standard
   option), with the six custom events named in `lib/analytics.ts`.
3. **French copy** for the new pages, through `translation/STANDARD.md`.
4. **An event-updates list**, separate from the publication list, with its own consent.
5. From the brainstorm: a presenter view and print pack of one scene ("One Sentence, Many
   Rooms"); a book-club host guide; one scene in the author's own voice.

## Rollback

- Before release: nothing to roll back — production does not show it.
- After `approved: true`: set it back to `false` and push; every page and link disappears
  together and the site returns to the pre-extension output.
- Or revert the merge commit, or use Vercel's instant rollback to the deployment before
  the merge. The deployment live when this work began is
  `dpl_7yMVMEXQHQByrkDZfBKSstDkb98b` (commit `137367e`).
