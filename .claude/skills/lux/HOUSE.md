# The house: how Ivana works and what her sites look like

Read from source on 16 November 2026: the preview deployment of `luxembourg-psychology`
(Vercel `dpl_Fhss8z2CaKJAAoAsadZdEDQBB9nn`, 14 November) and the production deployment of
`ivana-budisin` (`dpl_9QaLJfE6nKe1EUs1HXqgJLgxsceb`). The CSS and HTML were read; the pages were
not rendered or screenshotted, because this container cannot reach the hosts. Re-read the source
before trusting any number here: she redesigns often, and this file is a record, not the authority.
**The deployed site is the authority.**

## Three properties, two visual systems

| Property | Where it lives | System |
|---|---|---|
| luxembourgpsychology.com, the practice | Vercel project `luxembourg-psychology`, static HTML in `site/`, deployed by CLI from her computer. Not in any repository this session can see. | Practice (blue) |
| ivanabudisin.com, the person | Vercel project `ivana-budisin`, same build, same stylesheet family, three pages | Practice (blue) |
| statenotsituation.com, the book | This repository, Next.js, deploys from `main` | Book (cream and red), `DESIGN_SYSTEM.md` |

The two systems do not mix. The book is cream `#F7F3EC`, cover red `#B5291C`, serif titles never
bold. The practice is cool, blue and clinical. A practice page never borrows the red; a book page
never borrows the blue. Where the practice shows the book, it shows the cover as an image on navy.

## The practice system, as built

**Colour.** Paper `#f6f8fc`. White `#fff` for panels. Ink `#15253c`. Muted `#4c5e76` for secondary
prose. Blue `#204dbd` for labels, links and the solid button (hover `#163b99`). Pale `#e8f0fd` for
page heads. Line `#cbd7e8` for every rule. Navy `#142d54` for the booking banner and the book
block; `#132747` for the home opening, with `#c1d3ea` as its muted text. No gradients. One shadow
on the whole site, under the mobile menu.

**Type.** Two families, both self-hosted, both SIL Open Font Licence.
Newsreader, weight 400 (500 for the wordmark), for every heading, line height 1.04, tracking
-0.025em: h1 `clamp(46px, 6vw, 87px)`, h2 `clamp(34px, 4vw, 55px)`, h3 `clamp(24px, 2.5vw, 33px)`.
Hanken Grotesk for everything else: body 17px / 1.6, lede `clamp(17px, 1.62vw, 22px)` in muted,
labels 13px / 600 / uppercase / 0.105em in blue. Headings are never bold.

**Composition.** `.wrap` is `min(1280px, 100% - 2 gutters)`, gutter `clamp(18px, 4.5vw, 72px)`.
Sections are separated by space, `clamp(56px, 7vw, 104px)`, and lists by 1px rules, not by boxes.
Radius is small and consistent: 6px controls, 8 to 9px images and cards, 12px large blocks.
Breakpoints 1120 (nav becomes Menu), 860 (hero stacks), 790, 560.

**Components that exist.** Wordmark with a small-caps second line. Header with four links, FR
switch, one solid button. Home opening: navy band, h1 and lede left, the white biopsychosocial
panel right. Three-up ruled link grids. Numbered process list. FAQ as native `details`. Page head
on pale blue. Ruled `panel` sections. Fees table. Three appointment cards with the Cal.com embed.
Navy booking banner closing every page. Three-column footer with the CNS line and Urgent help.

**Motion.** One transition, 150ms, on colour and border. Nothing scrolls, loops or reveals.
Reduced motion removes even that.

**Accessibility as built.** Skip link, one h1, `aria-labelledby` on sections, 44px minimum targets,
3px blue focus ring (pale on navy), `lang` on the FR switch. Keep all of it.

**Security as built.** A strict Content-Security-Policy in `vercel.json`: `default-src 'none'`,
scripts only from self, one hashed inline script and Cal.com. A new script, font host, image host
or embed will be blocked unless the policy is changed with it. Check before proposing any.

**The mark.** Three overlapping circles on a dark rounded tile, `assets/favicon.svg`: tile
`#101C22`, circles `#B9D0FA` (top), `#D9C7FA` (left), `#FBD3C2` (right). It is the only place
lilac and peach appear. Use the file as it is.

**Where it is live.** On 16 November 2026 www.luxembourgpsychology.com answered from Vercel with
this design, these fonts and this mark.

## The biopsychosocial model on the home page

A white panel in the opening, `data-pressure-examples`, driven by `pressure-examples.js`: three
tabs (Stress, Anxiety, Burnout at work), each a three-row definition list (Body, Mind,
Environment) and one sentence of example. Without JavaScript all three panels show, which is the
right fallback. Its text is the source for the first social series; see `social/posts/`.

## Her words about her own scope: never contradict them

She offers **psychological counselling as a clinical psychologist**. The site says psychotherapy
under Luxembourg's psychotherapist authorisation, and psychiatric treatment, are outside the
practice. So: never "therapy", "therapist", "treatment", "patients", "cure" or "diagnosis" in
anything written for her. "Counselling", "sessions", "clients" or simply "you".

Fees and facts printed on the site on 14 November 2026: free 20-minute introductory call online;
individual €120 for 50 minutes; couples €160 for 75 minutes; private, not reimbursed by the CNS;
adults, couples and teenagers from 14; English and French. Re-read before repeating any of them.

## How she works

- She thinks in mechanisms and wants the causal story, not the mood. Give the observation, then
  the reason, then the one next step.
- Short paragraphs. Plain, warm, exact. British spelling. No em dashes or en dashes. No bullet
  lists in prose to her unless she asks. No self-help register, no marketing language.
- Challenge a weak idea and offer the cleaner one, with its strongest counterargument and a quick
  way to test it. She asked for a sparring partner, not agreement.
- Research claims carry an APA 7 citation that has been checked. If it has not been checked, write
  "citation needed" and say what to look up. Never invent a source, a number or a page.
- She was worn down by approval prompts in October. Decide routine things. Ask only when blocked.
- She iterates fast with other tools (Codex, Wix AI). Always read what is deployed now before
  advising; assume the last record is stale.
- "Study it, do not touch it" is a normal instruction from her. When she says it, nothing on a
  live site, a deployment or a domain changes, and the reply says so.
- She found plain type on flat navy boring (16 November 2026) and asked for blurred scenery and
  calm. Calm is the brief: soft photographs of water, fog and distance behind the words.
- Her standard for sameness: a section that will not fit the system is rewritten, not given a new
  size, colour or component.
