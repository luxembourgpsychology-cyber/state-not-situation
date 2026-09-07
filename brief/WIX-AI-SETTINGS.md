# Wix AI Marketing Settings — values to paste, field by field

Sized for the boxes. Copy each block into the field with the same name.

**Read this first.** These settings belong to LuxembourgPsychology, the
practice. Changing them changes every piece of AI marketing the site makes, not
only the book posts. The values below deliberately let the two sit together: the
book is the practice's flagship content, written by the same person, on the same
subject. If you would rather keep the practice voice untouched, change only
**Tone of voice**, **Site topics** and **Excluded topics**, and leave General
alone.

Two things in there now are worth fixing whatever you decide.

1. **Tone of voice** currently holds your offers, the two free self-checks. That
   is not a tone of voice, so the field is doing nothing and the AI is writing
   in its own voice. The self-checks are a good idea and belong under Custom
   events or in a campaign, not here.
2. **Image style** currently asks for soft daylight and a warm neutral palette.
   That is the wellness look your book is the opposite of. Left as it is, every
   generated image will fight the cover.

---

## GENERAL

### Business goal

```
LuxembourgPsychology is the practice of Ivana Budišin, clinical psychologist in
Luxembourg, and the home of her first book, State. Not Situation. (publishing
soon). It aims to be the trusted reference for accessible, evidence-based
psychological support in Luxembourg. For the next month the priority is the
book: build its readership and grow the publication-notice list at
statenotsituation.com.
```

### Unique selling point

```
Written by a practising clinical psychologist, not a content team. The material
comes from her own book, which grades its own claims High, Medium or Low and
prints the work that complicates them. The distinctive idea: your body produces
a reading before your mind produces a story about the situation, and the two are
not the same thing. Read the dashboard before you believe the story.
```

### Target audience

```
Adults and couples in Luxembourg seeking practical, science-based psychological
support. And, for the book: anyone who has ever been certain about what a
situation meant, then discovered that something else was happening. Readers
interested in the psychology of how we notice, interpret and revise the world
around us. Clinicians and journalists are a secondary audience on LinkedIn.
```

### Main marketing goal

Choose **Custom**, then:

```
Grow the publication-notice list at statenotsituation.com before the book goes
on sale.
```

---

## CONTENT FOCUS

### Calendars & special days

**Check what "Marketing calendar" actually contains before you save it.** A
general marketing calendar is built for retail and will offer you Black Friday
and Valentine's Day hooks. A book about misreading your own state cannot take
those without looking cheap. If there is a quieter calendar, take it. If not,
consider leaving this off and driving the month from Custom events instead.

### Custom events

Add these two. **Do not add a publication date until the date is real** — an
event with a placeholder date will produce posts that promise it.

| Event | When |
|---|---|
| Extract published — first chapter live at statenotsituation.com/en/read | already live, use as an evergreen anchor |
| Publication of State. Not Situation. | **leave until you have the date** |

### Site topics (maximum 6)

Replace the current four with these. They are the book's own structure, so
anything generated from them can be sourced.

```
state versus situation
time, attention and safety
sleep debt and next-day judgement
attention capture and the cheapest available input
social threat and false alarms
taking a reading of your own body
```

If you want to keep practice topics too, keep **emotional resilience
strategies** and drop the two weakest from the list above.

### Excluded topics (maximum 6)

This field is nearly empty and it is the one that protects you.

```
diagnosis and symptom checklists
crisis and emergency advice
generic self-care and wellness tips
supplements, diets and biohacking
publication dates, pre-orders and sales claims
reviews, endorsements and testimonials
```

---

## BRAND VOICE

### Tone of voice guidelines

Replace the offers currently in this box with this.

```
Write as a clinical psychologist: precise, calm, never breathless. Short
sentences. Concrete nouns. Name the mechanism, not the mood. Prefer the book's
own printed sentences to any paraphrase, and cite the page.

Never use: "it's not X, it's Y" or any not-this-but-that construction; repeated
cadences like "Same morning. Same paragraph. Same Katrin."; openers such as
"Here's the thing" or "Let that sink in"; emoji; exclamation marks.

Never diagnose, never give crisis advice, never promise an outcome, never invent
a statistic or a study. Where the evidence is uncertain, say so.
```

### Writing point of view

**First person.** Already correct. Leave it.

### Imagery guidelines

Replace the current photography description entirely.

```
A printed instrument panel, not wellness photography. Cream ground #F7F3EC, ink
#111111, accent red #B5291C. Three data colours: blue #2C6E8A, ochre #8C7432,
red #BF372A. A serif for display type, never bold. Monospace for anything
measured: times, page numbers, values. Tracked capitals for labels. Generous
white space and one idea per image.

Never: stock photography of people looking anxious or serene, hands holding
mugs, sunlight through leaves, gradients, glassy or 3D effects, drop shadows,
icon sets, rounded card interfaces.
```

---

## PLAN PREFERENCES

### Suggestion frequency

| Field | Now | Set to | Why |
|---|---|---|---|
| Social media | 5 per week | **5 per week** | Right for one author with no team. But check whether this is five in total or five *per connected platform*. Five platforms are connected, so the second reading is twenty-five a week, which you cannot review honestly. |
| Blog | **3 per week** | **1 per week** | This is the setting to change. Three AI blog posts a week is twelve a month of psychology writing published under a practising clinician's name. Approval does not fix it: at that volume you either rubber-stamp or stop looking, and both are worse than posting less. |
| Email marketing | 2 per month | **1 per month**, or 2 if one is the practice and one is the book | See the note on the list below, which is the real problem. |

### The list the campaign is supposed to grow does not exist yet

`newsletterUrl` on statenotsituation.com is still empty, so the publication-notice
form falls back to a mailto: signups arrive as individual emails to
ivana@luxembourgpsychology.com and land in no list at all. Two consequences.

1. **Wix email marketing will send to your Wix contacts**, who are practice
   contacts, not people who asked to hear about a book. Marketing a book to
   people who came to you for psychological support is a different relationship
   and deserves a deliberate decision rather than a default. If you do it, a
   separate opt-in segment is the clean way.
2. **Connect a real list before the campaign starts**, or the month's stated goal
   has nowhere to land. One line in `site.config.ts` points the form at any
   provider. Tell me which one and I will wire it.

### Social platforms

| Connected | Use it for the book? |
|---|---|
| **LinkedIn, Ivana Budišin** | **Yes, this is the book's best channel.** Clinicians and journalists are here, the instrument-reading format suits the feed, and it is your own name rather than the practice's. |
| **YouTube, Mind Matters** | **Yes.** The strongest untapped asset: the Kennedy opening is a told story, and the fifteen readings are a natural short-form series. |
| **Instagram** | Yes. The typographic cards belong here. |
| **Facebook** | Yes, but expect little. Do not write for it separately. |
| **Google Business Profile** | **No.** That profile exists so someone in Luxembourg can find a psychologist. Book teasers there are a category error and dilute the local listing. If the frequency setting cannot exclude it, post there manually. |
| Pinterest, TikTok, not connected | **Leave them.** Pinterest would suit the cards and is the better of the two, but neither is worth opening a channel you then have to feed. |

---

## AGENT TASKS

The reassurance at the top is real: nothing publishes without you. The risk is
not publication, it is **volume of things to approve**, and content written about
psychology in your name by something that has not read your book.

**Do this before you touch the General tab.** Homepage optimization and Page
optimization are both on, and they read the Business goal and Unique selling
point you set. If you paste the book-forward General values while those are
running, the agent will propose rewriting your *practice* homepage around the
book. Either leave General alone, or turn those two off first.

| Task | Now | Set to | Why |
|---|---|---|---|
| Keyword research | on | **on** | Research only, changes nothing, runs twice a year. |
| Homepage optimization | on | **off** | Your practice positioning is careful and hard-won. An AI rewrite proposal every six months is churn you have to argue with. |
| Page optimization | on | **off** | Same, across more pages. |
| Weekly blog posts creation | on | **off**, or leave on only after you cut Blog to 1 per week | This is the one that fills your queue. |
| Blog post optimization | on | **off** | It rewrites posts you already wrote. If the words are yours, they should stay yours. |
| FAQ creation | on | **off** | AI-written questions and answers about mental health, published under a clinical psychologist's name, once a month. This is the highest-risk switch on the page. |
| FAQ optimization | on | **off** | Same, on the ones that exist. |
| Google Ads, below the fold | not seen | **off for now** | There is nothing to buy. Ads for a book with no retail link spend money to reach people you cannot convert, and pre-order language would promise a date you do not have. |

**Note that none of these tasks touches statenotsituation.com.** The book site
runs from the GitHub repository on Vercel, not from Wix, so Wix SEO tasks cannot
reach it. The book's own pages are already indexed, structured and clean. Wix's
job here is social, email and the practice site, and nothing else.

---

## THE ONE-LINE VERSION, IF YOU ONLY CHANGE THREE THINGS

1. **Tone of voice** — put the voice rules in, take the offers out.
2. **Excluded topics** — fill all six. This is what stops invented claims.
3. **Imagery guidelines** — swap the wellness photography for the book's palette.
