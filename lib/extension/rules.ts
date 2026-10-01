/**
 * THE RULES BEHIND THE COMMERCIAL EXTENSION, as plain functions.
 *
 * Every decision that could put an untrue claim on the page lives here — the
 * book action, the app's status, an event's state and its booking button,
 * what an enquiry may contain — so it can be tested without a browser
 * (`npm test`). Nothing in this file imports anything at runtime: the
 * callers pass in site.config.ts and the content, and get back a decision.
 */

/* ------------------------------------------------------------------ */
/* Visibility                                                          */
/* ------------------------------------------------------------------ */

/**
 * The new pages exist in a language when it is listed, and on production only
 * once the author has approved them. Previews and local builds show drafts.
 * `vercelEnv` is process.env.VERCEL_ENV: "production" | "preview" | "development" | undefined.
 */
export function draftsAllowed(vercelEnv: string | undefined): boolean {
  return vercelEnv !== "production";
}

export function extensionVisible(
  settings: { approved: boolean; locales: readonly string[] },
  locale: string,
  vercelEnv: string | undefined,
): boolean {
  if (!settings.locales.includes(locale)) return false;
  return settings.approved || draftsAllowed(vercelEnv);
}

/* ------------------------------------------------------------------ */
/* The book action                                                     */
/* ------------------------------------------------------------------ */

export type BookAction =
  | { kind: "buy"; href: string; label: string }
  | { kind: "preorder"; href: string; label: string }
  | { kind: "details"; href: string; label: string };

/**
 * The one book button on the new pages. It reads the release mechanism the
 * site already has (site.config.ts: publicationStatus + amazonUrl) rather than
 * a second one, so the two can never disagree.
 *
 * - "published" with a verified https link → "Buy the book"
 * - "preorder" with a verified https link → "Pre-order the book"
 * - anything else → "About the book", to the first screen
 *
 * A date passing changes nothing: "forthcoming" stays forthcoming until the
 * config says otherwise, and setting it back to "forthcoming" while an old
 * link is still pasted in suppresses every purchase label (a temporary pause).
 */
export function resolveBookAction(
  edition: { publicationStatus: string; amazonUrl: string | null },
  labels: { buy: string; preorder: string; details: string },
  detailsHref: string,
): BookAction {
  const linked = isHttpsUrl(edition.amazonUrl);
  if (edition.publicationStatus === "published" && linked) {
    return { kind: "buy", href: edition.amazonUrl as string, label: labels.buy };
  }
  if (edition.publicationStatus === "preorder" && linked) {
    return { kind: "preorder", href: edition.amazonUrl as string, label: labels.preorder };
  }
  return { kind: "details", href: detailsHref, label: labels.details };
}

/* ------------------------------------------------------------------ */
/* The app                                                             */
/* ------------------------------------------------------------------ */

export type AppState =
  | { status: "live"; url: string; host: string }
  | { status: "in_development"; configWarning: string | null };

/** "live" needs a real https address. Anything less keeps the development copy and says why. */
export function resolveAppState(app: { status: string; publicUrl: string | null }): AppState {
  if (app.status === "live") {
    if (isHttpsUrl(app.publicUrl)) {
      return { status: "live", url: app.publicUrl as string, host: new URL(app.publicUrl as string).host };
    }
    return {
      status: "in_development",
      configWarning: "extension.app.status is \"live\" but publicUrl is not an https address; showing the in-development copy.",
    };
  }
  return { status: "in_development", configWarning: null };
}

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export type EventStatus = "draft" | "announced" | "bookable" | "sold_out" | "cancelled" | "past";

export interface EventRecord {
  slug: string;
  title: string;
  /** Talk, reading, workshop… one line. */
  format: string;
  approvedForPublication: boolean;
  status: EventStatus;
  /** ISO 8601 with an offset, e.g. 2026-11-20T19:00:00+01:00. */
  startAt: string;
  endAt: string;
  /** IANA zone, e.g. Europe/Luxembourg. */
  timeZone: string;
  language: string;
  venueOrOnline: string;
  accessInformation: string;
  organiserContact: string;
  description: string[];
  whoFor?: string;
  includedItems: string[];
  /** true / false once confirmed; null while it is still to be decided. */
  bookIncluded: boolean | null;
  currency?: string | null;
  /** The verified total, as it should be read: "€25, including fees and VAT". */
  priceDisplay?: string | null;
  priceIncludesFeesAndTaxes?: boolean | null;
  /** Free events need no price, but still need a provider, link and terms to book. */
  isFree?: boolean;
  checkoutUrl?: string | null;
  bookingProvider?: string | null;
  bookingTermsUrl?: string | null;
  /** Shown as the organiser wrote it, when status is "cancelled". */
  cancellationInformation?: string | null;
}

/** Every field a public record needs, whatever its state. */
export const REQUIRED_EVENT_FIELDS = [
  "slug", "title", "format", "status", "startAt", "endAt", "timeZone", "language",
  "venueOrOnline", "accessInformation", "organiserContact", "description", "includedItems",
] as const;

function present(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

/** Problems with a record, in plain words. An empty list means it may be published. */
export function eventProblems(e: EventRecord): string[] {
  const out: string[] = [];
  for (const f of REQUIRED_EVENT_FIELDS) if (!present(e[f])) out.push(`missing ${f}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug ?? "")) out.push("slug must be lowercase words joined by hyphens");
  const start = Date.parse(e.startAt), end = Date.parse(e.endAt);
  if (!hasOffset(e.startAt) || Number.isNaN(start)) out.push("startAt needs a full ISO date-time with an offset");
  if (!hasOffset(e.endAt) || Number.isNaN(end)) out.push("endAt needs a full ISO date-time with an offset");
  if (!Number.isNaN(start) && !Number.isNaN(end) && end <= start) out.push("endAt must be after startAt");
  if (!validTimeZone(e.timeZone)) out.push("timeZone must be an IANA zone such as Europe/Luxembourg");
  if (e.bookIncluded !== true && e.bookIncluded !== false && e.bookIncluded !== null) out.push("bookIncluded must be true, false or null");
  return out;
}

/** What booking needs before a button may exist. Missing anything → no button. */
export function bookingProblems(e: EventRecord): string[] {
  const out: string[] = [];
  if (!isHttpsUrl(e.checkoutUrl ?? null)) out.push("checkoutUrl must be an https address");
  if (!present(e.bookingProvider)) out.push("missing bookingProvider");
  if (!isHttpsUrl(e.bookingTermsUrl ?? null)) out.push("bookingTermsUrl must be an https address");
  if (!e.isFree) {
    if (!present(e.currency)) out.push("missing currency");
    if (!present(e.priceDisplay)) out.push("missing priceDisplay");
    if (e.priceIncludesFeesAndTaxes !== true && e.priceIncludesFeesAndTaxes !== false) out.push("priceIncludesFeesAndTaxes must be true or false");
  }
  return out;
}

/** Approved, not a draft, and complete. The `approved` flag never overrides a missing field. */
export function isPublishable(e: EventRecord): boolean {
  return e.approvedForPublication === true && e.status !== "draft" && eventProblems(e).length === 0;
}

/**
 * The state a visitor sees. Cancelled outranks everything, including the
 * date; a finished event is past; "bookable" without everything booking
 * needs falls back to "announced", so a broken record shows no button.
 */
export function effectiveStatus(e: EventRecord, now: Date): Exclude<EventStatus, "draft"> {
  if (e.status === "cancelled") return "cancelled";
  if (e.status === "past" || Date.parse(e.endAt) <= now.getTime()) return "past";
  if (e.status === "sold_out") return "sold_out";
  if (e.status === "bookable") return bookingProblems(e).length === 0 ? "bookable" : "announced";
  return "announced";
}

/** The booking link, or null. Only a bookable, complete, upcoming event has one. */
export function bookingLink(e: EventRecord, now: Date): { url: string; provider: string; termsUrl: string } | null {
  if (!isPublishable(e) || effectiveStatus(e, now) !== "bookable") return null;
  return { url: e.checkoutUrl as string, provider: e.bookingProvider as string, termsUrl: e.bookingTermsUrl as string };
}

/** Upcoming first by date; past ones separately, most recent first. Drafts and incomplete records never appear. */
export function partitionEvents(records: readonly EventRecord[], now: Date) {
  const pub = records.filter(isPublishable);
  const upcoming = pub.filter((e) => effectiveStatus(e, now) !== "past").sort((a, b) => Date.parse(a.startAt) - Date.parse(b.startAt));
  const past = pub.filter((e) => effectiveStatus(e, now) === "past").sort((a, b) => Date.parse(b.startAt) - Date.parse(a.startAt));
  return { upcoming, past };
}

/** "Friday 20 November 2026, 19:00–21:00 CET", in the event's own zone. */
export function formatEventWhen(e: EventRecord, locale = "en-GB"): { date: string; time: string } {
  const start = new Date(e.startAt), end = new Date(e.endAt);
  // Weekday and date set separately: ICU versions disagree about the comma
  // between them, and the site writes dates as "15 October 2026".
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: e.timeZone }).format(start);
  const day = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: e.timeZone }).format(start);
  const date = `${weekday} ${day}`;
  const t = (d: Date, zone: boolean) =>
    new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: e.timeZone, ...(zone ? { timeZoneName: "short" } : {}) }).format(d);
  return { date, time: `${t(start, false)}–${t(end, true)}` };
}

function hasOffset(s: string | undefined): boolean {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(s);
}

function validTimeZone(z: string | undefined): boolean {
  if (!z || !z.includes("/")) return false;
  try {
    new Intl.DateTimeFormat("en", { timeZone: z });
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Enquiries                                                           */
/* ------------------------------------------------------------------ */

export const ENQUIRY_FORMATS = ["teams", "talks", "workshops", "professionals", "not_sure"] as const;
export type EnquiryFormat = (typeof ENQUIRY_FORMATS)[number];
export const ENQUIRY_SOURCES = ["invite", "events", "explore", "home", "direct"] as const;
export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];
export const ENQUIRY_LANGUAGES = ["en", "fr", "discuss"] as const;
export type EnquiryLanguage = (typeof ENQUIRY_LANGUAGES)[number];

/** Only listed values survive a query string; anything else becomes the safe default. */
export function parseFormat(v: unknown, allowed: readonly string[] = ENQUIRY_FORMATS): EnquiryFormat {
  return typeof v === "string" && allowed.includes(v) && (ENQUIRY_FORMATS as readonly string[]).includes(v) ? (v as EnquiryFormat) : "not_sure";
}
export function parseSource(v: unknown): EnquirySource {
  return typeof v === "string" && (ENQUIRY_SOURCES as readonly string[]).includes(v) ? (v as EnquirySource) : "direct";
}

export interface EnquiryFields {
  name: string;
  email: string;
  organisation: string;
  format: string;
  groupSize: string;
  location: string;
  dateRange: string;
  language: string;
  purpose: string;
  budget: string;
}
export type EnquiryField = keyof EnquiryFields;

export const ENQUIRY_LIMITS: Record<EnquiryField, number> = {
  name: 120, email: 254, organisation: 180, format: 20, groupSize: 80,
  location: 180, dateRange: 180, language: 10, purpose: 1500, budget: 120,
};
export const ENQUIRY_REQUIRED: readonly EnquiryField[] = ["name", "email", "format", "purpose"];

export type EnquiryError = "required" | "email" | "tooLong" | "invalidChoice";

/** Removes control characters (keeping line breaks in the one long field) and outer spaces. */
export function cleanField(value: string, multiline = false): string {
  const pattern = multiline ? /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
  return value.replace(pattern, multiline ? "" : " ").trim();
}

export function validateEnquiry(f: EnquiryFields, allowedFormats: readonly string[] = ENQUIRY_FORMATS): Partial<Record<EnquiryField, EnquiryError>> {
  const errors: Partial<Record<EnquiryField, EnquiryError>> = {};
  for (const k of Object.keys(ENQUIRY_LIMITS) as EnquiryField[]) {
    const v = (f[k] ?? "").trim();
    if (ENQUIRY_REQUIRED.includes(k) && v === "") errors[k] = "required";
    else if (v.length > ENQUIRY_LIMITS[k]) errors[k] = "tooLong";
  }
  if (!errors.email && f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = "email";
  if (!errors.format && !allowedFormats.includes(f.format)) errors.format = "invalidChoice";
  if (!errors.language && f.language && !(ENQUIRY_LANGUAGES as readonly string[]).includes(f.language)) errors.language = "invalidChoice";
  return errors;
}

/**
 * The draft as plain text: subject and body. Blank optional fields are left
 * out. Every value is the visitor's text, kept as text — it is never placed
 * in a header, and the recipient is fixed by the caller.
 */
export function composeEnquiry(
  f: EnquiryFields,
  labels: {
    subjectPrefix: string;
    greeting: string;
    opening: string;
    fields: Record<Exclude<EnquiryField, "purpose">, string>;
    purposeHeading: string;
    signOff: string;
    formatNames: Record<string, string>;
    languageNames: Record<string, string>;
  },
): { subject: string; body: string } {
  const formatName = labels.formatNames[f.format] ?? labels.formatNames.not_sure;
  const rows: [string, string][] = [
    [labels.fields.format, formatName],
    [labels.fields.name, cleanField(f.name)],
    [labels.fields.email, cleanField(f.email)],
    [labels.fields.organisation, cleanField(f.organisation)],
    [labels.fields.groupSize, cleanField(f.groupSize)],
    [labels.fields.location, cleanField(f.location)],
    [labels.fields.dateRange, cleanField(f.dateRange)],
    [labels.fields.language, f.language ? labels.languageNames[f.language] ?? "" : ""],
    [labels.fields.budget, cleanField(f.budget)],
  ];
  const lines = [
    labels.greeting,
    "",
    labels.opening,
    "",
    ...rows.filter(([, v]) => v !== "").map(([k, v]) => `${k}: ${v}`),
    "",
    labels.purposeHeading,
    cleanField(f.purpose, true),
    "",
    labels.signOff,
  ];
  return { subject: `${labels.subjectPrefix}${formatName}`, body: lines.join("\n") };
}

/** RFC 6068: encoded subject and body, CRLF line breaks, fixed recipient. */
export function mailtoHref(to: string, subject: string, body: string): string {
  const enc = (s: string) => encodeURIComponent(s.replace(/\r?\n/g, "\r\n"));
  return `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`;
}

/* ------------------------------------------------------------------ */

export function isHttpsUrl(v: string | null | undefined): boolean {
  if (!v) return false;
  try {
    return new URL(v).protocol === "https:";
  } catch {
    return false;
  }
}
