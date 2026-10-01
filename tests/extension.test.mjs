// The decisions that could put an untrue claim on the page. Run: npm test
// (Node's own runner; Node 22.18+ reads the TypeScript directly.)
//
// The event records below are fixtures for these tests only. They are not
// events, they are never imported by the site, and nothing here may be
// copied into content/events.ts.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extensionVisible, draftsAllowed, resolveBookAction, resolveAppState,
  isPublishable, effectiveStatus, bookingLink, partitionEvents, eventProblems, bookingProblems, formatEventWhen,
  parseFormat, parseSource, validateEnquiry, composeEnquiry, mailtoHref, cleanField, ENQUIRY_LIMITS,
} from "../lib/extension/rules.ts";

const labels = { buy: "Buy the book", preorder: "Pre-order the book", details: "About the book" };
const AMAZON = "https://www.amazon.com/dp/EXAMPLE";

test("visibility: production shows the extension only once approved", () => {
  const off = { approved: false, locales: ["en"] };
  const on = { approved: true, locales: ["en"] };
  assert.equal(extensionVisible(off, "en", "production"), false);
  assert.equal(extensionVisible(off, "en", "preview"), true);
  assert.equal(extensionVisible(off, "en", undefined), true);
  assert.equal(extensionVisible(on, "en", "production"), true);
  assert.equal(extensionVisible(on, "fr", "production"), false, "no French pages without French copy");
  assert.equal(extensionVisible(off, "fr", "preview"), false);
  assert.equal(draftsAllowed("production"), false);
});

test("book action: never a purchase label without a published edition and a verified link", () => {
  const d = (s, u) => resolveBookAction({ publicationStatus: s, amazonUrl: u }, labels, "/en#top");
  assert.deepEqual(d("forthcoming", null), { kind: "details", href: "/en#top", label: labels.details });
  // A paused edition with an old link still pasted in: details, never Buy.
  assert.equal(d("forthcoming", AMAZON).kind, "details");
  assert.equal(d("published", null).kind, "details");
  assert.equal(d("published", "").kind, "details");
  assert.equal(d("published", "#").kind, "details");
  assert.equal(d("published", "http://insecure.example/book").kind, "details");
  assert.deepEqual(d("published", AMAZON), { kind: "buy", href: AMAZON, label: labels.buy });
  // Pre-order only with a verified link; without one, book information.
  assert.deepEqual(d("preorder", AMAZON), { kind: "preorder", href: AMAZON, label: labels.preorder });
  assert.equal(d("preorder", null).kind, "details");
  assert.equal(d("preorder", "http://insecure.example/book").kind, "details");
});

test("app: live needs an https address, otherwise development copy and a warning", () => {
  assert.deepEqual(resolveAppState({ status: "in_development", publicUrl: null }), { status: "in_development", configWarning: null });
  const missing = resolveAppState({ status: "live", publicUrl: null });
  assert.equal(missing.status, "in_development");
  assert.match(missing.configWarning, /publicUrl/);
  assert.equal(resolveAppState({ status: "live", publicUrl: "javascript:alert(1)" }).status, "in_development");
  assert.deepEqual(resolveAppState({ status: "live", publicUrl: "https://app.example.org/start" }), { status: "live", url: "https://app.example.org/start", host: "app.example.org" });
  // A URL with no live status stays in development.
  assert.equal(resolveAppState({ status: "in_development", publicUrl: "https://app.example.org" }).status, "in_development");
});

// ---- Events --------------------------------------------------------------

const NOW = new Date("2026-11-01T12:00:00Z");
const base = {
  slug: "fixture-reading", title: "Fixture reading", format: "Reading and conversation",
  approvedForPublication: true, status: "announced",
  startAt: "2026-11-20T19:00:00+01:00", endAt: "2026-11-20T21:00:00+01:00", timeZone: "Europe/Luxembourg",
  language: "English", venueOrOnline: "Fixture venue", accessInformation: "Step-free", organiserContact: "fixture@example.org",
  description: ["Fixture."], includedItems: ["A conversation"], bookIncluded: null,
};
const bookable = {
  ...base, status: "bookable", currency: "EUR", priceDisplay: "€25, including fees and VAT", priceIncludesFeesAndTaxes: true,
  checkoutUrl: "https://tickets.example.org/e/1", bookingProvider: "Fixture Tickets", bookingTermsUrl: "https://tickets.example.org/terms",
};

test("events: an approved announcement publishes without a price, terms or checkout, and has no button", () => {
  assert.equal(isPublishable(base), true);
  assert.equal(effectiveStatus(base, NOW), "announced");
  assert.equal(bookingLink(base, NOW), null);
});

test("events: drafts, unapproved and incomplete records never publish", () => {
  assert.equal(isPublishable({ ...base, status: "draft" }), false);
  assert.equal(isPublishable({ ...base, approvedForPublication: false }), false);
  assert.equal(isPublishable({ ...base, venueOrOnline: "" }), false);
  assert.equal(isPublishable({ ...base, startAt: "2026-11-20 19:00" }), false, "a time without an offset is ambiguous");
  assert.equal(isPublishable({ ...base, timeZone: "CET" }), false);
  assert.equal(isPublishable({ ...base, endAt: base.startAt }), false);
  assert.ok(eventProblems({ ...base, slug: "Bad Slug" }).length > 0);
});

test("events: bookable needs provider, https checkout, terms and a verified price", () => {
  assert.deepEqual(bookingProblems(bookable), []);
  assert.deepEqual(bookingLink(bookable, NOW), { url: bookable.checkoutUrl, provider: "Fixture Tickets", termsUrl: bookable.bookingTermsUrl });
  for (const broken of [
    { checkoutUrl: null }, { checkoutUrl: "http://tickets.example.org" }, { bookingProvider: "" },
    { bookingTermsUrl: null }, { priceDisplay: null }, { currency: null }, { priceIncludesFeesAndTaxes: null },
  ]) {
    const e = { ...bookable, ...broken };
    assert.equal(effectiveStatus(e, NOW), "announced", `falls back to announced: ${JSON.stringify(broken)}`);
    assert.equal(bookingLink(e, NOW), null);
  }
  // A free event needs no price, but still a provider, link and terms.
  const free = { ...bookable, isFree: true, currency: null, priceDisplay: null, priceIncludesFeesAndTaxes: null };
  assert.notEqual(bookingLink(free, NOW), null);
  // The approved flag never overrides missing booking requirements.
  assert.equal(bookingLink({ ...bookable, checkoutUrl: null, approvedForPublication: true }, NOW), null);
});

test("events: sold out, cancelled and past remove the button", () => {
  assert.equal(effectiveStatus({ ...bookable, status: "sold_out" }, NOW), "sold_out");
  assert.equal(bookingLink({ ...bookable, status: "sold_out" }, NOW), null);
  assert.equal(effectiveStatus({ ...bookable, status: "cancelled" }, NOW), "cancelled");
  assert.equal(bookingLink({ ...bookable, status: "cancelled" }, NOW), null);
  const after = new Date("2026-11-21T00:00:00Z");
  assert.equal(effectiveStatus(bookable, after), "past", "a finished event is past even if still marked bookable");
  assert.equal(bookingLink(bookable, after), null);
  // Cancelled outranks the date.
  assert.equal(effectiveStatus({ ...bookable, status: "cancelled" }, after), "cancelled");
});

test("events: listing separates upcoming from past and drops drafts", () => {
  const records = [
    { ...base, slug: "later", startAt: "2026-12-01T19:00:00+01:00", endAt: "2026-12-01T21:00:00+01:00" },
    { ...base, slug: "sooner" },
    { ...base, slug: "gone", startAt: "2026-10-01T19:00:00+02:00", endAt: "2026-10-01T21:00:00+02:00" },
    { ...base, slug: "draft", status: "draft" },
  ];
  const { upcoming, past } = partitionEvents(records, NOW);
  assert.deepEqual(upcoming.map((e) => e.slug), ["sooner", "later"]);
  assert.deepEqual(past.map((e) => e.slug), ["gone"]);
  assert.deepEqual(partitionEvents([], NOW), { upcoming: [], past: [] });
});

test("events: dates show the year and the zone, in the event's own time", () => {
  const w = formatEventWhen(base);
  assert.equal(w.date, "Friday 20 November 2026");
  assert.match(w.time, /^19:00–21:00 (CET|GMT\+1)$/);
});

// ---- Enquiries -------------------------------------------------------------

const valid = {
  name: "A. Organiser", email: "organiser@example.org", organisation: "", format: "teams",
  groupSize: "", location: "", dateRange: "", language: "", purpose: "A team of twelve.", budget: "",
};

test("enquiry: query values are allow-listed", () => {
  assert.equal(parseFormat("teams"), "teams");
  assert.equal(parseFormat("TEAMS"), "not_sure");
  assert.equal(parseFormat("https://evil.example"), "not_sure");
  assert.equal(parseFormat(undefined), "not_sure");
  assert.equal(parseFormat(["teams"]), "not_sure");
  assert.equal(parseFormat("talks", ["teams", "not_sure"]), "not_sure", "an offer not yet published cannot be preselected");
  assert.equal(parseSource("invite"), "invite");
  assert.equal(parseSource("newsletter"), "direct");
});

test("enquiry: required fields, email syntax, lengths and choices", () => {
  assert.deepEqual(validateEnquiry(valid), {});
  const empty = validateEnquiry({ ...valid, name: " ", email: "", purpose: "" });
  assert.deepEqual(empty, { name: "required", email: "required", purpose: "required" });
  assert.equal(validateEnquiry({ ...valid, email: "not-an-address" }).email, "email");
  assert.equal(validateEnquiry({ ...valid, name: "x".repeat(ENQUIRY_LIMITS.name + 1) }).name, "tooLong");
  assert.equal(validateEnquiry({ ...valid, purpose: "x".repeat(1501) }).purpose, "tooLong");
  assert.equal(validateEnquiry({ ...valid, purpose: "x".repeat(1500) }).purpose, undefined);
  assert.equal(validateEnquiry({ ...valid, email: `${"a".repeat(250)}@b.co` }).email, "tooLong");
  assert.equal(validateEnquiry({ ...valid, format: "vip" }).format, "invalidChoice");
  assert.equal(validateEnquiry({ ...valid, language: "de" }).language, "invalidChoice");
  // Optional fields really are optional.
  assert.deepEqual(validateEnquiry({ ...valid, organisation: "", budget: "" }), {});
});

const composeLabels = {
  subjectPrefix: "Enquiry: ", greeting: "Hello Ivana,", opening: "I would like to ask about a session.",
  fields: { name: "Name", email: "Email", organisation: "Organisation or venue", format: "Interested in", groupSize: "Approximate group size", location: "Location or online", dateRange: "Preferred date or date range", language: "Preferred language", budget: "Indicative budget" },
  purposeHeading: "What the session should explore:", signOff: "This is an enquiry, not a booking.",
  formatNames: { teams: "For teams — Warm Panels at Work", not_sure: "Not sure yet" },
  languageNames: { en: "English", fr: "French", discuss: "To discuss" },
};

test("enquiry: the draft leaves out blank fields and keeps text as text", () => {
  const { subject, body } = composeEnquiry({ ...valid, purpose: "Line one\nLine two <b>&</b>" }, composeLabels);
  assert.equal(subject, "Enquiry: For teams — Warm Panels at Work");
  assert.match(body, /Name: A\. Organiser/);
  assert.doesNotMatch(body, /Organisation or venue:/, "blank optional fields are omitted");
  assert.match(body, /Line one\nLine two <b>&<\/b>/);
  // A header-injection attempt stays inside its own line of the body.
  const sneaky = composeEnquiry({ ...valid, name: "A\r\nBcc: someone@example.org" }, composeLabels);
  assert.match(sneaky.body, /Name: A {2}Bcc: someone@example\.org/);
  assert.equal(cleanField("a\u0007b"), "a b");
});

test("enquiry: mailto encodes subject and body with CRLF and a fixed recipient", () => {
  const href = mailtoHref("ivana@luxembourgpsychology.com", "Enquiry: Teams & talks", "Line one\nLine two?");
  assert.equal(href, "mailto:ivana@luxembourgpsychology.com?subject=Enquiry%3A%20Teams%20%26%20talks&body=Line%20one%0D%0ALine%20two%3F");
});
