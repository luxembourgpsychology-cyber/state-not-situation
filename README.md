# State. Not Situation. — launch website

The official site for the book by Ivana Budišin. Built with Next.js 16, TypeScript and Tailwind CSS 4. No animation library: motion is CSS plus a small IntersectionObserver.

Everything you will want to change lives in two places:

| What | Where |
|---|---|
| Launch settings: publication status, Amazon link, audio file, newsletter endpoint, ISBN, languages on/off, analytics, Adobe Fonts kit, social links | `site.config.ts` |
| Every word on the site, per language | `content/en.ts`, `content/fr.ts`, `content/de.ts` |

You never need to touch `components/` or `app/` to change copy or launch state.

---

## 1. Run the site locally

You need Node.js 20 or newer (you have 24).

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/en`.

`npm run build` makes the production build and type-checks everything. Run it before you push: if it passes locally, Vercel will build it too.

## 2. Push it to GitHub

The `website` folder is its own git repository (created by the scaffold). From inside it:

```bash
git add -A
git commit -m "Launch site"
```

Then on github.com: New repository → name it `state-not-situation` → leave it empty (no README, no .gitignore). Copy the two commands GitHub shows under "push an existing repository" and run them, which will look like:

```bash
git remote add origin https://github.com/YOUR-USER/state-not-situation.git
git push -u origin main
```

Keep the repository private if you like; Vercel can still read it.

## 3. Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. Add New → Project → Import `state-not-situation`.
3. Vercel detects Next.js. Change nothing. Click Deploy.
4. Two minutes later you have a URL like `state-not-situation.vercel.app`.

Every later `git push` to `main` redeploys automatically.

**Cost.** Vercel's Hobby plan is free and is enough for this site technically. Its terms restrict Hobby to non-commercial use; a site for a book you sell is a grey area, and Vercel's own guidance is to use Pro for anything commercial. Pro is USD 20 per month per member. My recommendation: launch on Hobby, and move to Pro if Vercel flags it or once the Amazon link is live. The domain is the only other cost (below).

## 4. Connect the custom domain

1. Buy the domain from any registrar (Gandi, Namecheap, OVH, Cloudflare; roughly EUR 10–20 a year for a .com, more for .lu).
2. In Vercel: Project → Settings → Domains → add `yourdomain.com` and `www.yourdomain.com`.
3. Vercel shows you either an A record (`76.76.21.21`) for the bare domain and a CNAME (`cname.vercel-dns.com`) for `www`, or asks you to point nameservers at Vercel. Enter those at your registrar.
4. Wait for DNS (minutes to a few hours). Vercel issues the HTTPS certificate on its own.
5. In `site.config.ts` set `siteUrl` to `https://yourdomain.com`, commit and push. This fixes canonical URLs, hreflang links, the sitemap and the social preview image.

## 5. Replace the temporary content

Open `content/en.ts`. Search for `[COPY NEEDED` and `[ALT TEXT NEEDED` and `[TO BE CONFIRMED]`. Each is a placeholder for text only you can write. Edit in place; the file is plain text in a typed object, so a missing quote mark will show up as a build error rather than a broken page.

- **Author photograph:** put the file at `public/images/author.jpg` and set `press.authorPhoto: "/images/author.jpg"` in `site.config.ts`. Write the alt text in `content/en.ts` under `author.photoAlt`.
- **Psychology website link:** `author.website` in `site.config.ts`.
- **Social links:** `author.social` in `site.config.ts`. Empty ones are hidden.
- **Companion tool line:** `companion` in `content/en.ts`. Hide the whole section with `companion.enabled: false`.
- **Press page:** copy and downloads are listed under `press` in `content/en.ts`; the files live in `public/press/`. To add a press kit zip, put it in `public/press/` and set `press.pressKitZipUrl`.
- **The excerpt:** `excerpt.paragraphs` in `content/en.ts`. `teaserCount` is how many paragraphs show on the home page before "Continue reading".

## 6. Add the Amazon link when publication goes live

In `site.config.ts`, under `editions.en`:

```ts
publicationStatus: "published",
amazonUrl: "https://www.amazon.com/dp/XXXXXXXXXX",
publicationDate: "2026-09-15",   // optional, shown next to the status
isbn: "978-...",                 // optional, goes into structured data and the press page
```

Commit and push. Every "Publishing soon" and "Be notified" element becomes "Buy on Amazon" on its own; the notify form disappears; the Book structured data gains an offer. Each language has its own block, so the French edition can stay "forthcoming" while English is on sale.

## 7. Add or replace the audio file

1. Export the recording as MP3 (128 kbps mono is fine for voice) or M4A.
2. Put it at `public/audio/extract-en.mp3`.
3. In `site.config.ts`: `editions.en.audioUrl: "/audio/extract-en.mp3"`.

The player activates automatically. To replace it later, overwrite the file. For other languages, add `extract-fr.mp3` and set `editions.fr.audioUrl`.

If the file is larger than about 10 MB, host it elsewhere (Vercel Blob, Cloudflare R2, or your podcast host) and paste the absolute URL instead.

---

## Languages

`site.config.ts` → `languages`. English is on. French and German are off, so they do not appear in the switcher, the sitemap or the hreflang tags.

To add French:

1. Open `content/fr.ts`. It mirrors `content/en.ts` with every string empty.
2. Fill in the strings. Anything still empty renders as a visible `⟦fr: key⟧` marker, never as silent English.
3. Set `languages.fr.enabled: true` and, when the French edition exists, fill in `editions.fr`.
4. Push. `/fr` appears, with its own metadata, canonical URL and hreflang links.

If you ever add a fourth language: add it to the `Locale` type in `site.config.ts`, add a content file, and register it in `lib/i18n.ts`.

## Newsletter

The notify form needs an endpoint. With `newsletterUrl: null` it offers a pre-filled email instead, which is honest and works. To connect a tool:

- **Buttondown:** `newsletterUrl: "https://buttondown.com/api/emails/embed-subscribe/YOUR-NAME"`, `newsletterEmailField: "email"`.
- **Mailchimp:** use the form action URL from Audience → Signup forms → Embedded; the field is `EMAIL`.
- **MailerLite / ConvertKit:** the form's POST URL and email field name from their embed code.

All are GDPR-adequate with double opt-in turned on in the tool. Submissions are a plain form post; nothing else is collected.

## Analytics

`site.config.ts` → `analytics.provider`:

- `"none"` (default): no script, nothing loaded.
- `"vercel"`: Vercel Web Analytics. Turn it on in the Vercel project (Analytics tab). Cookieless, no personal data, no consent banner required under current EU guidance. Free tier covers 2,500 events a month; enough for launch.
- `"plausible"`: EU-hosted, cookieless, EUR 9 a month. Set `plausibleDomain`.

Both receive the same four custom events: `excerpt_open`, `audio_play`, `amazon_click`, `notify_submit`, plus page views and referrers. Because no cookies and no personal identifiers are used, no consent banner is needed; keep it that way.

## Fonts

The book's display serif is IvyPresto Display (Adobe Fonts). The site ships with Instrument Serif as a close open substitute, Bebas Neue for the cover word, IBM Plex Mono, Source Sans 3, and Barlow Semi Condensed standing in for DIN Alternate (Apple devices show real DIN Alternate, which they have built in).

To use the real IvyPresto: at fonts.adobe.com create a Web Project containing IvyPresto Display (add DIN 2014 too if you like), copy the kit id, and set `fonts.adobeFontsKitId` in `site.config.ts`. The CSS already names `ivypresto-display` and `din-2014` first in the stacks.

## Structure

```
site.config.ts        launch settings, per language
content/              en.ts (complete), fr.ts, de.ts (stubs), types.ts
app/[lang]/           page.tsx (home), read/ (reading mode), press/
components/           one file per section
lib/i18n.ts           language helpers and the missing-translation marker
lib/analytics.ts      the track() helper
proxy.ts              sends / to the visitor's best enabled language
public/images         cover, render, social preview
public/press          downloadable press assets
public/audio          put recordings here
```
