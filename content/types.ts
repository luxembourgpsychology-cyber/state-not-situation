/**
 * The shape every language file must follow. Interface strings and book copy
 * live together so a translator receives exactly one file per language.
 *
 * RULE OF THIS FILE: a string here is either
 *   (a) set in the printed book or on the printed cover, word for word,
 *   (b) a plain functional interface label, or
 *   (c) a marked [COPY NEEDED: …] placeholder.
 * Nothing else. See CONTENT_SOURCES.md for the page reference behind each line.
 */

export interface CaseEvidence {
  /** Chapter number as printed, e.g. "00". */
  chapter: string;
  /** Printed page the panel appears on. */
  page: number;
  time: string;
  /** The line in quotation marks, as printed. */
  quote: string;
  inputLabel: string;
  input: string;
  /** VERIFIED EVENT / VERIFIED TONE / NEXT READING … varies by chapter. */
  verifiedLabel: string;
  verified: string;
}

export interface Loop {
  key: "time" | "attention" | "safety";
  name: string;
  /** The one-line definition from the state-line legend. */
  legend: string;
  /** The fuller definition from the book's front matter. */
  body: string;
}

export interface EvidenceGrade {
  key: "high" | "medium" | "low";
  label: string;
  shape: string;
  meaning: string;
}

export interface Chapter {
  number: string;
  title: string;
  page: number;
}

export interface SiteContent {
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    ogImageAlt: string;
    readTitle: string;
    readDescription: string;
    pressTitle: string;
    pressDescription: string;
  };
  nav: {
    book: string;
    read: string;
    listen: string;
    author: string;
    press: string;
    skipToContent: string;
    home: string;
  };
  status: {
    forthcoming: string;
    published: string;
    publicationDatePrefix: string;
    buy: string;
    notifyHeading: string;
    /** The short button label. Never derive a button from the heading. */
    notifyCta: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    success: string;
    error: string;
    privacyNote: string;
    mailtoLabel: string;
    mailtoSubject: string;
    mailtoBody: string;
  };
  hero: {
    eyebrow: string;
    /** Title as set on the half title: "State." + "Not Situation" */
    titleA: string;
    titleB: string;
    subtitle: string;
    strap: string;
    authorPrefix: string;
    coverAlt: string;
    openAlt: string;
    readCta: string;
    scrollHint: string;
  };
  /** Page 13: the reader is asked to take a reading. Verbatim. */
  reading: {
    eyebrow: string;
    lead: string;
    steps: string[];
    result: string;
    afterResult: string;
    question: string;
  };
  loops: {
    eyebrow: string;
    title: string;
    intro: string;
    outro: string;
    items: Loop[];
  };
  cases: {
    eyebrow: string;
    title: string;
    intro: string;
    pageLabel: string;
    items: CaseEvidence[];
  };
  excerpt: {
    eyebrow: string;
    title: string;
    sectionLabel: string;
    runningHead: string;
    teaserCount: number;
    cta: string;
    continueCta: string;
    back: string;
    readingModeLabel: string;
    paragraphs: string[];
    quoteAfter: number;
    quote: string;
    endNote: string;
    unavailable: string;
    folios: string[];
  };
  listen: {
    eyebrow: string;
    title: string;
    subtitle: string;
    play: string;
    pause: string;
    progress: string;
    elapsed: string;
    duration: string;
    unavailable: string;
  };
  about: {
    eyebrow: string;
    title: string;
    /** A passage lifted from the book, shown as a quotation with its page. */
    quote: string;
    quoteSource: string;
    paragraphs: string[];
    mapLine: string;
    evidenceEyebrow: string;
    evidenceIntro: string;
    grades: EvidenceGrade[];
    overreachEyebrow: string;
    overreach: string;
    readersEyebrow: string;
    readers: string;
    mapEyebrow: string;
    mapTitle: string;
    mapSubtitle: string;
    chapters: Chapter[];
    mapFooter: string;
    pageColumn: string;
  };
  author: {
    eyebrow: string;
    title: string;
    photoAlt: string;
    photoPlaceholder: string;
    bio: string;
    websiteLabel: string;
    contactLabel: string;
    pressLabel: string;
  };
  companion: {
    eyebrow: string;
    line: string;
  };
  press: {
    eyebrow: string;
    title: string;
    intro: string;
    contactHeading: string;
    assetsHeading: string;
    assets: { label: string; file: string; note: string }[];
    photoUnavailable: string;
    bioHeading: string;
    bios: { label: string; text: string }[];
    factsHeading: string;
    facts: { label: string; value: string }[];
    descriptionHeading: string;
    description: string[];
    creditsHeading: string;
    credits: { label: string; value: string }[];
    back: string;
  };
  footer: {
    band: string;
    rights: string;
    pressLink: string;
    contactLink: string;
    madeLine: string;
  };
  a11y: {
    mainLandmark: string;
    coverFigure: string;
    languageSwitcher: string;
    languageComing: string;
    casesRegion: string;
    bookOpening: string;
  };
}
