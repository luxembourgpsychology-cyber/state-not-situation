# State. Not Situation. — launch website

The official site for the book by Ivana Budišin. Next.js 16, TypeScript, Tailwind CSS 4. No animation library: the book opens with CSS 3D and about forty lines of scroll handling.

Two files hold everything you will want to change:

| What | Where |
|---|---|
| Launch settings per language: publication status, Amazon link, audio file, newsletter endpoint, ISBN, which languages are switched on, analytics, Adobe Fonts kit, author photo, social links | `site.config.ts` |
| Every word on the site, per language | `content/en.ts`, `content/fr.ts`, `content/de.ts` |

You never need to open `components/` or `app/` to change copy or launch state.

Two more documents worth reading once:

- **`CONTENT_SOURCES.md`** — the page of the book behind every sentence on the site, what is still a placeholder, and what was removed from the first draft because the book does not say it.
- **`DESIGN_SYSTEM.md`** — the typography, colour and devices taken from the printed book, and how the 3D book is built.

---

## 1. Run the site locally

Node 20 or newer.

```bash
cd website && npm install && npm run dev
```

Open http://localhost:3000. It redirects to `/en`.

`npm run build` builds and type-checks. Run it before pushing: if it passes here, it passes on Vercel.

## 2. Push it to GitHub

The `website` folder is its own git repository.

```bash
cd website && git add -A && git commit -m "Update site"
```

On github.com: New repository, name it, leave it empty. Then run the two lines GitHub shows you:

```bash
git remote add origin https://github.com/YOUR-USER/state-not-situation.git
git push -u origin main
```

Private is fine; Vercel can still read it.

## 3. Deploy to Vercel

1. vercel.com, sign in with GitHub.
2. Add New, Project, import the repository.
3. Vercel detects Next.js. Change nothing. Deploy.

Every push to `main` redeploys.

**Cost.** Hobby is free but its terms are non-commercial, and this sells a book. Pro is USD 20 a month. Launch on Hobby if you like, move to Pro when the Amazon link goes live.

## 4. Connect the custom domain

1. Buy the domain anywhere (roughly EUR 10–20 a year for a .com).
2. Vercel, Project, Settings, Domains. Add `yourdomain.com` and `www.yourdomain.com`.
3. Enter the A record and CNAME Vercel gives you at your registrar. HTTPS is automatic.
4. Set `siteUrl` in `site.config.ts` to `https://yourdomain.com`, commit, push. That fixes canonical URLs, hreflang, the sitemap and the social preview.

## 5. Replace the temporary content

Open `content/en.ts` and search for `[COPY NEEDED`. Two things are waiting for you:

| Key | What is needed |
|---|---|
| `press.bios[1]` | A longer biography, 100 to 150 words |
| `press.photoCredit` | The photographer's name, for the author photograph credit |

Everything else on the site is already printed in the book, written by you, or a plain interface label. The order of the sections and the treatment of every string are set out in `brief/REDESIGN.md`, which implements your brief at `brief/REDESIGN-BRIEF.md`. `CONTENT_SOURCES.md` lists the source of each line. **If you add a sentence, add its source there too.** That rule is why a journalist can check this site against the book and find nothing that fails.

Other things you may want to set in `site.config.ts`:

- `author.website` — your practice website. Null hides the link.
- `author.social` — Instagram, LinkedIn, X. Empty ones are hidden.
- `press.pressKitZipUrl` — put a zip in `public/press/` and point at it.

The author photograph is already in place at `public/images/author.jpg` (and `public/press/author-photo-1600.jpg` for download). To change it, replace those two files.

## 6. Add the Amazon link when publication goes live

In `site.config.ts`, under `editions.en`:

```ts
publicationStatus: "published",
amazonUrl: "https://www.amazon.com/dp/XXXXXXXXXX",
publicationDate: "2026-09-15",   // optional, shown beside the status
```

Commit and push. Every "Publishing soon" and "Be notified" element becomes "Buy on Amazon" on its own, the notify form disappears, and the Book structured data gains an offer. Each language has its own block, so the French edition can stay forthcoming while English is on sale.

## 7. Add or replace the audio

1. Export as MP3 (128 kbps mono is plenty for voice).
2. Save it at `public/audio/extract-en.mp3`.
3. Set `editions.en.audioUrl: "/audio/extract-en.mp3"`.

The player, and the Listen links in the navigation and footer, appear by themselves. Until then nothing on the site mentions a recording. To replace it later, overwrite the file. Over about 10 MB, host it elsewhere and paste the absolute URL instead.

---

## Languages

`site.config.ts` → `languages`. English is on and indexed. French and German are translated, on, and **under review** (`underReview: true`): a visitor can open `/fr` and `/de` from the switcher, but the pages carry `noindex` and are left out of the sitemap and the hreflang tags, because no French or German edition of the book exists yet and a search engine should not present a translation as the published text.

When a native speaker signs a language off, set `underReview: false` for it. Nothing else changes.

Every French and German sentence follows `translation/STANDARD.md`, Ivana's own standard, with the method and glossary for each language in `translation/METHOD-fr.md` and `translation/METHOD-de.md`. Questions for the author go in `translation/QUERIES-<lang>.md`.

To give a reviewer something to mark up:

```bash
node lib/make-review-pack.mjs fr && python3 lib/make_review_xlsx.py fr
```

writes `review/State-Not-Situation-French-review.xlsx` (same with `de`): where each line appears, the English, the translation, and an empty column for corrections. The `review/` folder is not committed.

If a translation ever goes missing, anything empty renders as a visible `⟦fr: some.key⟧`, never as silent English.

To walk through an unfinished translation privately, set `previewDraftLanguages: true` and run `npm run dev`. The greyed marks become links and missing strings show their markers. Production builds ignore the flag.

If the English content structure changes, `node lib/make-stubs.mjs` adds any new keys (it will not overwrite an existing file; `--force` rebuilds from scratch and discards translations).

French and German run longer than English. Headings, buttons, navigation and the three system columns all wrap rather than clip. `hyphens: auto` is deliberately off on display type: it broke words mid-line.

## Newsletter

The notify form needs an endpoint. With `newsletterUrl: null` it offers a pre-filled email instead, which is honest and works today. To connect a tool:

- **Buttondown** — `https://buttondown.com/api/emails/embed-subscribe/YOUR-NAME`, field `email`.
- **Mailchimp** — the form action from Audience, Signup forms, Embedded; field `EMAIL`.
- **MailerLite / ConvertKit** — the POST URL and field name from their embed code.

All are GDPR-adequate with double opt-in switched on in the tool itself.

## Analytics

`site.config.ts` → `analytics.provider`:

- `"none"` (default) ships no script at all.
- `"vercel"` — Vercel Web Analytics. Cookieless, no personal data, no consent banner needed. Free tier is enough for launch.
- `"plausible"` — EU-hosted, cookieless, about EUR 9 a month. Set `plausibleDomain`.

Both receive four custom events: `excerpt_open`, `audio_play`, `amazon_click`, `notify_submit`, plus page views and referrers. No cookies and no identifiers, so no consent banner. Keep it that way.

## Fonts

The book's display serif is IvyPresto Display (Adobe Fonts). The site ships with Instrument Serif as a close substitute, plus Source Sans 3, IBM Plex Mono and Barlow Semi Condensed standing in for DIN Alternate (Apple devices already have real DIN Alternate).

For the real IvyPresto: create a Web Project at fonts.adobe.com containing `ivypresto-display` (add `din-2014` too), copy the kit id, and set `fonts.adobeFontsKitId`. The CSS already names both first in the stacks, so nothing else changes.

## The 3D book

`components/Book3D.tsx` builds the object from the printed artwork. If you want the spine thicker or thinner, there is one line in `app/globals.css`:

```css
.book-stage { --bd: calc(var(--bw) * 0.19); }
```

`0.116` is the true printed ratio (17.65 mm on a 152.4 mm board). `0.19` is what the site uses, because the true ratio reads flat on screen.

## Structure

```
site.config.ts        launch settings, per language
content/              en.ts (complete), fr.ts, de.ts (translated, under review), types.ts
translation/          the editorial decision, the translation standard, the two methods
app/[lang]/           page.tsx (home), read/ (reading mode), press/
components/           one file per section, plus Book3D
lib/i18n.ts           language helpers and the missing-translation marker
lib/analytics.ts      the track() helper
lib/make-stubs.mjs    adds new keys to fr.ts and de.ts from en.ts
lib/make-review-pack.mjs, lib/make_review_xlsx.py   the reviewer's workbook
proxy.ts              sends / to the visitor's best enabled language
public/images         cover, spine, author photograph, social preview
public/press          downloadable press assets
public/audio          put recordings here
```

## Checked before hand-off

Production build and type-check clean. No horizontal overflow at 360, 390 or 1440 px. One `h1`, headings in order, every image has alt text, no empty links, all tap targets at least 44 px. Canonical and hreflang tags, sitemap, robots, Book and Person structured data carrying the real ISBN, 1200 × 630 social preview. Reduced motion collapses the scroll track and shows the book shut. With JavaScript off, no text is hidden or dimmed.
