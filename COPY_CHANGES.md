# Copy changes — editorial and booking-clarity pass, 1 October 2026

From the author's brief `CLAUDE_FULL_WEBSITE_LANGUAGE_AND_BOOKINGS_BRIEF.md`. Its
replacement copy is used as written; small differences are listed under *Adaptations*.
All words live in `content/extension.en.ts`. Stable ids (scene ids, offer ids, anchors,
`?scene=` / `?format=` values, analytics names) are unchanged.

## Finished copy, by surface

| Surface | Before (main) | After |
|---|---|---|
| Header, desktop | Book · Extract · Author · Press · More ways in | Book · Extract · Author · Press · **Invite Ivana** · More ways in. Below 1024 px the six items sit behind Menu rather than shrink; the wordmark shows from 1280 px |
| Phone menu | Strip: Explore, Events, Invite Ivana, Research, App | **Invite Ivana** in the main list after Press; strip: Explore, Events, Research & limits, App |
| Home — section intro | Try a small moment from the world of the book. Come to a reading. Or bring the conversation to your own audience. | Try a short scene, come to a public event, or invite Ivana to speak with your group. You don’t need to have read the book. |
| Home — three doors | Try a moment / Explore the idea · Come to an event / See public events · Invite Ivana / Explore the formats | Try a short scene / **Try the scenes** · Come to an event / **View public events** · Invite Ivana / **Explore talks and workshops** (new texts as the brief) |
| Home — app line | THE COMPANION APP — IN DEVELOPMENT (a mono link) | The STATE companion app is in development. **About the app** |
| New-page book action | Book & publication details | **About the book**; Pre-order the book / Buy the book only for a verified link in that state |
| Explore — intro and label | One ordinary day, three small moments… / Three made-up moments from one day… | An email you read twice. A task that suddenly feels difficult… / Three fictional moments from one day, inspired by the book. No prior reading needed. |
| Explore — scene button | Step into the scene | **Read the scene** (each names its scene to screen readers) |
| Explore — 16:10 | A message from a colleague… / Something’s gone wrong. · Just a quick question. / See it another way | Brief’s scene / Something has gone wrong. · They have a quick question. / **Consider another possibility** |
| Explore — 16:12 | Look again / …You’re judging whether you belong in that meeting. | **Look at what changed** / …Perhaps the afternoon is part of the reading too. / What changed: the slide, the afternoon, or both? |
| Explore — 22:36 | Next morning / You got to bed after one in the morning… / Is it really the kettle? | **See the next morning** / The photos are sorted. You went to bed after one… / The kettle hasn’t changed. What else might be part of this morning? |
| Explore — morning row | Open 22:36 to see the morning. | **See what happens the next morning** (opens the evening scene with its 07:08 reveal) |
| Explore — boundary | How you feel can change what a moment seems to mean. If something is really wrong, it still deserves attention. | How you feel can shape what a moment seems to mean. A real problem still deserves attention. |
| Explore — ending | BACK COVER · “…examines the gap between what happened and what it felt like it meant.” | **The book** · State. Not Situation. explores why an ordinary moment can feel so certain—and what we might notice when we look again. (website copy, unquoted) |
| Explore — teams link | Sessions for teams → | **Explore sessions for teams** |
| Invite — head | Bring a different reading to the room. / Request availability and a quote | **Talks, workshops and readings with Ivana.** / the brief’s intro and support line / **Check availability** / Tell Ivana about your audience… |
| Invite — offers | Book title as heading, one short line, duration · who; “See the format” | **Find a session for your audience**: audience, plain-language title, book name (secondary), description, duration(s), what you take away, an offer-specific action (**Ask about a team session / a talk or reading / a group workshop / a seminar**); **What happens in the session / Hide session details** holds what we explore, practical details and scope |
| Invite — FAQ | Practical questions (4) | **Before you enquire** (6, the brief’s answers) |
| Invite — author | Ivana Budišin / short bio / More about Ivana / Press materials | **Meet Ivana** / the brief’s bio / More about Ivana / **Biography and press materials** |
| Enquiry | Tell me about your audience. / ten fields in a row / Back to the formats | **Tell me what you have in mind.** / name, email, session, message first; **Add practical details (optional)** for the rest / **Back to talks and workshops** |
| Enquiry — options | For teams — Warm Panels at Work … | Team session · Talk or author reading · Group workshop · Professional seminar · Not sure yet |
| Enquiry — action and after | Now send it from your email app. Nothing has been sent yet… | Beside the button: This opens a draft in your email app. Review it and press Send there. Nothing is sent from this website. After: **Send the draft from your email app to complete your enquiry.** / If your email app did not open, copy the message below and send it to ivana@luxembourgpsychology.com. |
| Enquiry — errors | Please check these fields / Please enter an email address such as name@example.com. … | **Please check the highlighted fields.** / Please enter your name. / Please enter a valid email address. / Please add a short message about the session you have in mind. / Please shorten this message to 1,500 characters. |
| Enquiry — draft subject | Enquiry: For teams — Warm Panels at Work | **Session enquiry: Team session** |
| Events | Events · Meet the book in a room. · Public dates will be announced here. · Ask about a future workshop · Invite Ivana to your venue | **Public events · Come to a talk, reading or workshop. · New dates will be listed here.** · **Ask about future workshops** (subject: Question about future public workshops) · **Have a group or venue in mind? Invite Ivana to your event** |
| Event detail | Status words; Book with [provider] | **What to expect · Who it is for · Date and location · What your ticket includes · Access and practical information · Booking and cancellation terms**; **Book tickets with / Register with [provider]**; full status sentences (sold out → View other events; past → View upcoming events) |
| App | Another way into the book. / …being built as a separate product. / In the meantime | **Another way to explore the book.** / the brief’s body and “A release date and access details have not yet been announced.” / **While you wait: Try a short scene · Read an extract** |
| Research | A good question leaves room for uncertainty. / page 7 and Scientific Heartbeat passages quoted, with their page labels | **What the book draws on—and where its ideas have limits.** / three sections in the brief’s words; the quoted passages and their page labels removed; markers captioned **The book’s evidence markers**; links **About the book · Read an extract · See the book’s evidence markers** |
| Page titles | Explore · Invite Ivana · Enquiry · Events · The companion app · Research and limits | Explore the book · Talks, workshops and readings with Ivana · Enquire about a talk or workshop · Public talks, readings and workshops · The STATE companion app · Research and the limits of the book’s ideas (descriptions as the brief) |

## Adaptations, and why

- **Tablet header.** Six items do not fit one row at 768–1023 px without crowding, so they sit behind Menu there (the brief: use the menu, don’t shrink type). From 1024 px they are inline.
- **“Pre-order the book”** needed a state the site did not have: `publicationStatus: "preorder"`. It changes only the new pages’ book action; the original hero still changes only at `"published"`.
- **Card status words** on the events list stay short (Booking details to follow, Booking open, Sold out, Cancelled, Taken place); the brief’s full sentences are on each event’s page.
- **The email-draft explanation** sits beside the button rather than above the form, so the first step is four fields.
- **Research, Chapter 13** is still cited by its printed title and page (13, The Time the Body Was Right, 197): a reference, not a quotation.
- The brief’s direct-sending states (Send enquiry, Sending…, received) are **not shown**: no sending service exists, and the button says what it does.

## Still needed from the author

None of these block the preview; each is described honestly until supplied.

- A real public event (date, venue, price, provider, terms).
- The Amazon link (pre-order or sale) when it exists.
- Confirmation of session durations and languages.
- A sending service, if enquiries should be sent from the site rather than as an email draft.
- Optional later: a short introduction video, or authorised testimonials.
