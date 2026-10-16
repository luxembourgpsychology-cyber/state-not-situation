# Item 03: Welcome message for people who sign up after publication

Item number and name: 03, revised welcome or confirmation message for new subscribers
Channel: the site's form success message and, if one exists, the MailerLite welcome or confirmation email attached to the "Book updates" form
To whom: anyone who signs up for the first 16 pages from now on
Suggested send date: not a send. The text replaces the current strings once Ivana approves it and the change is made in content/en.ts, which is a separate approval (see notes).
What the recipient is asked to do: nothing. They receive the pages they asked for and are told the book is out.
Attachments or links: the PDF the form already hands over, https://statenotsituation.com/press/State-Not-Situation-first-16-pages.pdf; the site https://statenotsituation.com
Approval status: awaiting Ivana

## The problem

The form still says "Your copy is ready the moment you sign up, and you hear once more, when the book is out." The book is out. From 15 October onwards that sentence promises an email that would arrive after the event it announces, and the privacy line "Used for these pages and one publication email. Nothing else." describes an email new subscribers do not need. The fix is to stop promising the email and to tell them, at the moment of signing up, that the book is out.

## The welcome message (under 80 words)

For the MailerLite welcome or confirmation email, if the form has one:

Here are your pages: the opening and all of Chapter Zero, exactly as printed.

Download the first 16 pages (PDF): https://statenotsituation.com/press/State-Not-Situation-first-16-pages.pdf

The book was published on 15 October 2026. The store links are at https://statenotsituation.com

Your address was used to send you these pages and will not be used for anything else.

Ivana Budišin

## The site strings that would change

All three live in content/en.ts under status.offer. Proposed replacements, with the current text for comparison:

| Key | Current | Proposed |
|---|---|---|
| status.offer.line | "The opening and all of Chapter Zero, exactly as printed. Your copy is ready the moment you sign up, and you hear once more, when the book is out." | "The opening and all of Chapter Zero, exactly as printed. Your copy is ready the moment you sign up." |
| status.offer.success | "Here are your pages. You will hear once more, when the book is out." | "Here are your pages. The book itself is out now." |
| status.offer.privacy | "Used for these pages and one publication email. Nothing else." | "Used for these pages. Nothing else." |

The plain form, used when no sample is offered, has status.success "Thank you. You will hear once, when the book is out." and status.privacyNote "Used for this notification only." Those are not shown while samplePdfUrl is set, so they can stay as they are; if the sample is ever switched off after publication, they would need the same treatment.

## Notes for Ivana

This is a change to the site's words, so it belongs in content/en.ts with a source line added to CONTENT_SOURCES.md recording that the strings are interface copy (category 3) revised after publication. The French and German strings under the same keys would need the same change, under their existing review status. That is a separate approval from this email, and the agency has not touched those files.

If MailerLite has a double opt-in confirmation email or a welcome automation on this form, its text needs replacing with the message above, and item 02 asks you to pause it until then.

Strongest reason not to send: if you would rather keep the right to write to new subscribers once more, for example when a French edition exists, then the privacy line must say so plainly instead, and the agency would redraft. The proposal above is the one that keeps the current "Nothing else." literally true.
