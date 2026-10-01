# The commercial extension, 1 October 2026

Six new English pages that give a visitor a next step — try the idea, come to an event,
invite Ivana — plus one section on the home page and links in the header, menu and
footer. Built from the author's handoff of 1 October 2026 (`01_PRODUCT_AND_PAGE_SPEC.md`,
`02_CONTENT_AND_CONFIG.json`, `03_IMPLEMENTATION_CONTRACT.md`, `04_QA_AND_RELEASE.md`
and her master prompt), inside this site's own architecture and design system
(`BRAND_BASELINE.md`).

**It is off on production.** `site.config.ts → extension.approved` is `false`: the pages
return 404 and no link to them renders on the live site. Preview deployments and
`npm run dev` show everything under a "draft for review" line.

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
2. **The book's own lines over paraphrase.** Explore ends on the v50 back cover's
   "…examines the gap between what happened and what it felt like it meant." Research
   quotes page 7 and The Scientific Heartbeat instead of summarising them. The handoff's
   "The instrument panel is an analogy" was left out: it could not be checked against v50.
3. **No cards.** The three doors are set like the evidence markers; offers and events
   like the press page's fact sheet; scenes like page 4's moments. No new type step,
   colour, spacing value or shadow. Status words (Sold out, Cancelled) stay ink: red has
   four jobs.
4. **One header item, not three.** At 768 the bar has 52 px either side of its links;
   three more would crowd it. "More ways in" opens a second quiet bar. Between 768 and
   1023 the wordmark yields to the pulse mark (as it already does below 420) so the bar
   keeps one row with ≥ 74 px either side. The phone sheet lists the links after its own.
5. **Scenes open in place** (native `<details>`), not in a panel below the list: readable
   with no script, no jump on a phone. Focus therefore stays on the scene's own button,
   which the scene directly follows (the native disclosure pattern); "Back to the three
   moments" returns focus to it.
6. **The book action reads the existing release switch** (`publicationStatus` +
   `amazonUrl`) rather than adding the handoff's four-state status: one switch cannot
   drift from another. "Forthcoming" with an old link still set never shows Buy. The
   site's own label "Read an extract" replaces the handoff's "Read the opening".
7. **Timestamps moved out of the scenes' sentences** into the mono column, in 24-hour
   form ("At 4:10" → `16:10`); the evening reveal carries its own `07:08`.
8. **Talk durations say who they are for** (conferences vs bookshops and libraries), as
   the spec asks.
9. **`.btn-solid` on two more controls**: the enquiry's submit and an event's booking
   link. The system reserves the solid block for "a form control [that] must read as a
   control"; both are that.
10. **Event structured data without an offer**: schema.org wants a numeric price and the
    site holds the verified price as a sentence. None is emitted on previews or for past
    events.
11. **Email still required** in the email-draft form, as specified: the copyable fallback
    text then carries a reply address, and the form needs no change when a backend comes.

## Verified (1 October 2026)

- `npm run build`, `npx tsc --noEmit`, `npm run lint` (0 errors; the two warnings
  pre-date this work), `npm test` (13 tests).
- 74 browser checks of the journeys at 390 and 1440 (scenes, Back/Forward, direct and
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

1. Review the copy on the preview, then `extension.approved` and each offer's flag.
2. Confirm the four offers' formats and durations, and which languages sessions run in.
3. Confirm enquiries go to `ivana@luxembourgpsychology.com` (the existing public address).
4. Check "FR · livre" and its French tooltip.
5. Real events, when there are some: date, venue, language, price, provider, terms.
6. The app's address, when it is live.
7. The Amazon link at publication (unchanged mechanism).

## Later (not built, in order of usefulness)

1. **An enquiry backend** (a form provider or a mail API through a Vercel function), with
   a privacy notice — needs a service choice and a policy page.
2. **Analytics on** (`analytics.provider: "vercel"`, cookieless) to see which doors are
   used; the six events are already named.
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
