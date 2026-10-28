import type { EventRecord } from "@/lib/extension/rules";

/**
 * PUBLIC EVENTS. Empty until a real event is approved, and that is the
 * correct state: /events then says "Public dates will be announced here."
 *
 * A record appears only when approvedForPublication is true, its status is
 * not "draft", and every required field is filled (lib/extension/rules.ts,
 * REQUIRED_EVENT_FIELDS). A booking button appears only when status is
 * "bookable" AND checkoutUrl, bookingProvider and bookingTermsUrl are set —
 * plus currency, priceDisplay and priceIncludesFeesAndTaxes unless isFree.
 * Missing anything, the event shows as announced with "Booking details to
 * follow" rather than a broken button. `npm test` checks those rules.
 *
 * Never add a demonstration or example event here: everything in this list
 * is published, indexed and given structured data.
 *
 * The shape of one record, for when the first real event is confirmed:
 *
 *   {
 *     slug: "reading-luxembourg-2026-11",          // lowercase-with-hyphens
 *     title: "…",
 *     format: "Reading and conversation",
 *     approvedForPublication: true,
 *     status: "announced",                          // then "bookable", "sold_out", "cancelled"
 *     startAt: "2026-11-20T19:00:00+01:00",         // with the offset
 *     endAt: "2026-11-20T21:00:00+01:00",
 *     timeZone: "Europe/Luxembourg",
 *     language: "English",
 *     venueOrOnline: "…, Luxembourg",
 *     accessInformation: "…",
 *     organiserContact: "…",
 *     description: ["…"],
 *     whoFor: "…",
 *     includedItems: ["…"],
 *     bookIncluded: null,                           // true / false once confirmed
 *     currency: "EUR", priceDisplay: "€…, including fees and VAT", priceIncludesFeesAndTaxes: true,
 *     checkoutUrl: "https://…", bookingProvider: "…", bookingTermsUrl: "https://…",
 *     cancellationInformation: null,
 *   }
 */
export const events: EventRecord[] = [
  // The launch evening, set by Ivana on 27 October 2026 ("I will do it at
  // Cereal Lovers on 03.12 from 18"). Announced, not bookable: no booking
  // provider or price is decided. Sources in CONTENT_SOURCES.md, "Events".
  {
    slug: "launch-evening-luxembourg-2026-12",
    title: "Launch evening: State. Not Situation.",
    format: "Reading and conversation",
    approvedForPublication: true,
    status: "announced",
    startAt: "2026-12-03T18:00:00+01:00",
    endAt: "2026-12-03T20:00:00+01:00",
    timeZone: "Europe/Luxembourg",
    language: "English",
    venueOrOnline: "Cereal Lovers, 11C place du Théâtre, Luxembourg",
    accessInformation: "For any question about access, write to ivana@luxembourgpsychology.com.",
    organiserContact: "Ivana Budišin, ivana@luxembourgpsychology.com",
    description: [
      "The launch of State. Not Situation., with its author, Ivana Budišin.",
      "A short reading from the book, a conversation, and time to talk.",
    ],
    includedItems: [
      "A short reading from the book",
      "A conversation, with time for questions",
      "Copies of the book to buy and have signed",
    ],
    bookIncluded: null,
  },
];
