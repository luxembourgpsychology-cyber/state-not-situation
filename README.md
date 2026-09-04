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

Open `content/en.ts` and search for `[COPY NEEDED`. Four things are waiting for you:

| Key | What is needed |
|---|---|
| `about.paragraphs[0]` | Two or three sentences on what the book contains, in your words |
| `about.readers` | One or two sentences on the reader it is for |
| `press.bios[1]` | A longer biography, 100 to 150 words |
| `companion.line` | One sentence about the companion tool |

Everything else on the site is already either printed in the book or a plain interface label. `CONTENT_SOURCES.md` lists the source of each line. **If you add a sentence, add its source there too.** That rule is why a journalist can check this site against the book and find nothing that fails.

Other things you may want to set in `site.config.ts`:

- `author.website` — your practice website. Null hides the link.
- `author.social` — Instagram, LinkedIn, X. Empty ones are hidden.
- `companion.enabled` — currently **false**. Turn it on once `companion.line` is written.
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

The player activates itself. To replace it later, overwrite the file. Over about 10 MB, host it elsewhere and paste the absolute URL instead.

---

## Languages

`site.config.ts` → `languages`. English is on; French and German are off.

FR and DE **still appear in the switcher**, greyed and not clickable, so a visitor can see other editions are coming. They do not appear in the sitemap or the hreflang tags, and their routes return 404 until you enable them.

To add French:

1. Open `content/fr.ts`. It mirrors `content/en.ts` with every translatable string empty. Page numbers, times and file paths are already filled in and should not change.
2. Translate. Anything left empty renders as a visible `⟦fr: some.key⟧`, never as silent English.
3. Set `languages.fr.enabled: true`, and fill in `editions.fr` when the French edition exists.

To walk through an unfinished translation privately, set `previewDraftLanguages: true` and run `npm run dev`. The greyed marks become links and missing strings show their markers. Production builds ignore the flag.

If the English content structure changes, `node lib/make-stubs.mjs` adds any new keys (it will not overwrite an existing file; `--force` rebuilds from scratch and discards translations).

French and German run longer than English. Headings, buttons, navigation and the loop columns all wrap rather than clip, and German compounds hyphenate.

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
content/              en.ts (complete), fr.ts, de.ts (stubs), types.ts
app/[lang]/           page.tsx (home), read/ (reading mode), press/
components/           one file per section, plus Book3D
lib/i18n.ts           language helpers and the missing-translation marker
lib/analytics.ts      the track() helper
lib/make-stubs.mjs    regenerates fr.ts and de.ts from en.ts
proxy.ts              sends / to the visitor's best enabled language
public/images         cover, spine, author photograph, social preview
public/press          downloadable press assets
public/audio          put recordings here
```

## Checked before hand-off

Production build and type-check clean. No horizontal overflow at 360, 390 or 1440 px. One `h1`, headings in order, every image has alt text, no empty links, all tap targets at least 44 px. Canonical and hreflang tags, sitemap, robots, Book and Person structured data carrying the real ISBN, 1200 × 630 social preview. Reduced motion collapses the scroll track and shows the book shut. With JavaScript off, no text is hidden or dimmed.
