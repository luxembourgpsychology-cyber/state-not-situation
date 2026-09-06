/**
 * The shape every language file must follow. Interface strings and book copy
 * live together so a translator receives exactly one file per language.
 *
 * RULE OF THIS FILE: a string here is either
 *   (a) set in the printed book or on the printed cover, word for word,
 *   (b) supplied by the author, word for word,
 *   (c) a plain functional interface label, or
 *   (d) a marked [COPY NEEDED: …] placeholder.
 * Nothing else. See CONTENT_SOURCES.md for the page behind each line.
 *
 * The section order below follows the editorial decision of 5 September 2026
 * (translation/EDITORIAL-POSITIONING.md): the site follows the arc the book
 * itself builds in pages 10 to 14, then the extract, then the reference block.
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
  /** VERIFIED EVENT / VERIFIED TONE / VERIFIED CRISIS … varies by chapter. */
  verifiedLabel: string;
  verified: string;
}

export interface Loop {
  key: "time" | "attention" | "safety";
  name: string;
  /** The definition from the book's front matter, pages 13 to 14. */
  body: string;
}

export interface EvidenceGrade {
  key: "high" | "medium" | "low";
  /** The label printed under the pulse on page 13. Nothing else is printed there. */
  label: string;
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
  /** Page 10, the book's own one-page account of itself, set as the display page it is. */
  misreading: {
    eyebrow: string;
    lines: string[];
    investigationLabel: string;
    investigation: string;
    readingsLabel: string;
    readings: { time: string; text: string }[];
    closing: string[];
  };
  /** Pages 12 to 13, "You Know The Day", in three runs; the last hands to the reading. */
  knowTheDay: {
    eyebrow: string;
    /** Interface label on the one disclosure, which holds runs[0]. Not a quotation. */
    moreLabel: string;
    runs: string[];
  };
  /** Page 13: the reader is asked to take a reading. */
  reading: {
    eyebrow: string;
    lead: string;
    steps: string[];
    result: string;
    afterResult: string;
    question: string;
  };
  /** The author's account of the book, under a heading from page 20. */
  book: {
    eyebrow: string;
    heading: string;
    headingSource: string;
    paragraphs: string[];
    readersEyebrow: string;
    /** Page 14. */
    readersAnchor: string;
    /** Supplied by the author. */
    readers: string;
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
    /** Page 26, closing the extract on the site. */
    closing: string;
    closingSource: string;
    endNote: string;
    unavailable: string;
    folios: string[];
  };
  cases: {
    eyebrow: string;
    pageLabel: string;
    items: CaseEvidence[];
    /** Page 20. */
    closing: string;
    closingSource: string;
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
  /** One reference block: the three systems, the evidence markers, the chapters, the Heartbeat. */
  map: {
    eyebrow: string;
    /** Page 20. */
    systemsIntro: string;
    /** Front matter, page 13. */
    sortingTool: string;
    loops: Loop[];
    evidenceEyebrow: string;
    /** Page 13, "Before We Begin", first paragraph. */
    evidenceIntro: string;
    /** Page 13, second paragraph, which describes the markers in words. */
    evidenceMarkers: string;
    grades: EvidenceGrade[];
    investigationTitle: string;
    mapLine: string;
    pageColumn: string;
    chapters: Chapter[];
    mapFooter: string;
    /** Page 226, two sentences. */
    heartbeat: string[];
    heartbeatSource: string;
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
  /** Page 225, the book's last sentence, above the form. */
  closing: {
    question: string;
    source: string;
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
    /** Page 278, the back page's three lines. */
    method: string[];
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
    misreadingRegion: string;
    mapRegion: string;
    /** Accessible name of the page 13 markers section. Never rendered. */
    evidenceRegion: string;
  };
}
