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
export const events: EventRecord[] = [];
