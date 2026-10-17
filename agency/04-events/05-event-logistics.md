# 05 · Event logistics: run sheet, host checklist, and the record /en/events needs

Item number and name: 05 · Event logistics
Channel: internal working document, for Ivana and any host
To whom: Ivana; the host of each confirmed event
Suggested send date: use from the first confirmed booking
What the recipient is asked to do: agree the checklist with the host; fill the record so the event can go live on /en/events the same day
Attachments or links: https://statenotsituation.com/en/invite, https://statenotsituation.com/en/events, content/events.ts, lib/extension/rules.ts
Approval status: awaiting Ivana

Every quoted line in sections B and C is taken from /en/invite or from the site's own code. Nothing here states a fee, a date or a venue.

---

## A · Run sheet template: Reading and conversation, 75 minutes

Offer 2 on /en/invite: "Why the same situation can feel so different", series Same Life, Different Settings, "Reading and conversation: 75 minutes". The content and format are agreed with the host; this sheet is the default shape, to be edited for each booking.

| Clock | Minutes | What happens | Who | Notes |
|---|---|---|---|---|
| T minus 60 | | Arrive. Check room, chairs, lectern or table, water, light on the reader. | Ivana, host | One copy of the book on the table, cover facing the room. |
| T minus 45 | | Sound check if a microphone is used. Test any recording. | Host technician | Recording only if agreed in advance (see B). |
| T minus 30 | | Book table set up, if sales were agreed. Float and card reader checked. | Host or bookseller | Price per the agreed arrangement; see fact sheet €28.90. |
| T minus 15 | | Doors open. | Host | |
| 00:00 | 3 | Host welcomes the room and introduces the author with the short biography: "Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book." | Host | No other credential. Not "Dr". |
| 00:03 | 7 | Ivana opens: why the book exists, in her own words, and one line from the cover: "Your body speaks first, your mind explains second." | Ivana | |
| 00:10 | 15 | First reading: the opening, pages 1 to 3 (the 16 July 1999 flight), ending on "But the body’s confident weather report about the world is only a draft." | Ivana | Text as printed; the same passage is at /en/read. |
| 00:25 | 10 | A scene from the book, read or told: page 4, "The same day, five readings", 06:38 to 22:47. Then: "The body speaks first. The mind explains second." | Ivana | |
| 00:35 | 10 | The three questions, page 9: Time, Attention, Safety, read as printed. One invitation to the room, page 7: "Check your jaw. Check your breath. Check your shoulders. What you found is a reading." | Ivana | Optional for the room; no one is asked to report anything. |
| 00:45 | 25 | Conversation. Host or moderator opens with two prepared questions, then the room. | Host, Ivana | Audience language as agreed. If a question asks for personal advice, Ivana answers in general terms and points to the research page's line: "This framework offers questions, not a diagnosis or a substitute for professional support." |
| 01:10 | 5 | Close. Ivana reads the back cover sign off: "Check the signal. Before you believe the story." Host thanks the room and names where the book is sold tonight and online. | Ivana, host | |
| 01:15 | | Signing, if agreed. | Ivana | Up to 30 minutes; agree the end time with the host. |

Two prepared questions for the host, offered as a starting point, each tied to a printed line:

1. The subtitle is "Why your body decides what a moment means before you do." Where does the mind come in?
2. Page 7 says the evidence markers "exist because the book’s own risk is the same risk it describes." What is that risk?

What Ivana brings: two copies of the book, the reading passages marked; a printed copy of this sheet; a pen for signing; water.

What Ivana does not do: diagnose, assess, or invite anyone to share a private experience. The invite page: "Participants are not assessed, and no one is asked to share private experiences."

---

## B · Checklist: what to agree with a host before booking

Taken from the practical lines on /en/invite. Each is a line to settle in writing before the date is confirmed.

| Agree | Source line on /en/invite |
|---|---|
| Format, date and fee | "The format, date and fee are agreed before you book." |
| That an enquiry is not a booking | "An enquiry does not reserve a date or confirm a booking." |
| The quote, before the host decides | "Fees depend on the session and the agreed arrangements. You will receive a quote before deciding whether to book." |
| Audience language | "Audience language, technical needs, questions, book sales, signing and recording arrangements are agreed in advance." |
| Technical needs (microphone, lectern, light, recording) | same line |
| Who moderates, and the first questions | same line ("questions") |
| Book sales: who sells, at what price, who brings stock, card payment | same line, and the FAQ: "Book copies and signing can be discussed. They are included only when agreed in the proposal." |
| Signing: yes or no, how long | same lines |
| Recording or photography: yes or no, by whom, for what use | same line ("recording arrangements") |
| Whether the audience needs to have read the book | "No one needs to have read the book." |
| Location and access needs | "Include any preferences or requirements in your enquiry so they can be discussed before booking." |
| For a team session: group size, location, language, materials, follow up | "Group size, location, language, materials and any follow-up are agreed with the organiser." |
| For a workshop: group size, venue, language, access needs, materials, book copies | "Group size, venue, language, access needs, materials and any book copies are agreed before booking." |
| For a seminar: audience, learning objectives, reading material, language, duration | "The audience, learning objectives, reading material, language and duration are agreed in advance." |
| What the session is not | "They are educational talks, workshops and literary events. Participants are not assessed, and no one is asked to share private experiences." |
| The scope line of the chosen offer, repeated in the host's own announcement | Offer 1: "The session does not replace addressing workload or harmful behaviour. Personal reflections are not reported to management." Offer 3: "This is an educational workshop. Taking part in an activity is optional. It is not group therapy." Offer 4: "The seminar does not carry a claim of CPD accreditation. The framework and its exercises are not presented as a validated treatment." |
| How the host will describe the author | Short biography only; "clinical psychologist"; no "Dr", no other credential. Host text to be seen by Ivana before it is published. |
| For a public event: everything in section C, including the booking link and terms | content/events.ts |

---

## C · The record /en/events needs before an event can be published

From content/events.ts and lib/extension/rules.ts. A record appears on the site only when approvedForPublication is true, status is not "draft", and every required field is filled. A booking button appears only when status is "bookable" and checkoutUrl, bookingProvider and bookingTermsUrl are set, plus currency, priceDisplay and priceIncludesFeesAndTaxes unless isFree is true. Missing anything, the event shows as "Booking details to follow" rather than a broken button. npm test checks these rules.

Required for any public record (REQUIRED_EVENT_FIELDS):

| Field | What to supply | Example shape from events.ts |
|---|---|---|
| slug | lowercase words joined by hyphens, unique | reading-luxembourg-2026-11 |
| title | the event title as the host announces it | |
| format | one line: Talk, Reading and conversation, Workshop, Seminar | "Reading and conversation" |
| status | announced, then bookable, sold_out, cancelled, past | "announced" |
| startAt | full ISO date time with offset | "2026-11-20T19:00:00+01:00" |
| endAt | same, after startAt | "2026-11-20T21:00:00+01:00" |
| timeZone | IANA zone | "Europe/Luxembourg" |
| language | | "English" |
| venueOrOnline | venue name and town, or "Online" | "…, Luxembourg" |
| accessInformation | step free access, lift, hearing loop, parking, public transport, as the host states it | |
| organiserContact | the host's public contact | |
| description | one or more paragraphs, as an array | ["…"] |
| includedItems | what the ticket includes, as an array | ["…"] |

Also set on every record:

| Field | Value |
|---|---|
| approvedForPublication | true only once Ivana has approved the record |
| bookIncluded | true, false, or null while undecided; the site then shows "A copy of the book is included.", "The ticket does not include a book.", or "Book inclusion details will be confirmed before booking opens." |
| whoFor | optional, one line |

Required before a booking button appears (bookingProblems):

| Field | Value |
|---|---|
| checkoutUrl | an https address on the provider's site |
| bookingProvider | the provider's name, shown as "Book tickets with …" or "Register with …" |
| bookingTermsUrl | an https address of the provider's terms |
| isFree | true for a free event; then no price fields are needed |
| currency | "EUR" (not needed if isFree) |
| priceDisplay | the verified total as it should be read: "€…, including fees and VAT" (not needed if isFree) |
| priceIncludesFeesAndTaxes | true or false (not needed if isFree) |
| cancellationInformation | shown as the organiser wrote it, when status is "cancelled"; otherwise null |

The site's own notice to attendees, shown with every booking button: "Booking and payment take place on the provider’s site, under its terms. Your place is confirmed by the provider."

Process for a confirmed event:

1. Host confirms format, date, fee and the section B items in writing.
2. Ivana sends the agency the filled table above, with the host's announcement text.
3. The record is added to content/events.ts with approvedForPublication false and status "draft"; npm test and npm run build pass.
4. Ivana approves the record as it reads on the preview. approvedForPublication is set to true and status to "announced" (or "bookable" if the provider link and terms exist).
5. Push to main. The event is live at /en/events within minutes. The newsletter (folder 05) and social (folder 06) may then name it; before step 5 nothing anywhere may say a public event exists.

Notes for Ivana: Nothing on the site may announce an event before step 5. The fact sheet is clear: "No public events: none are scheduled." Decide now who holds stock and takes payment at a public event; neither the site nor the booking provider sells the book.
