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
 * The structure below follows the canonical architecture decided in
 * brief/REDESIGN.md (6 September 2026), which implements the author's brief
 * at brief/REDESIGN-BRIEF.md. Eight homepage sections: hero, premise (the
 * mechanism and the reading), variables, moments, evidence, excerpt, author,
 * closing. Section ids are English in every language, by contract.
 */

/** One of the book's three systems, printed on the cover and on pages 13 to 14. */
export interface Loop {
  key: "time" | "attention" | "safety";
  name: string;
  /** The definition from the book's front matter. */
  body: string;
}

/** One confidence marker, printed on page 13; the description is the author's. */
export interface EvidenceGrade {
  key: "high" | "medium" | "low";
  /** The label printed under the pulse on page 13. */
  label: string;
  /** The author's own description, from the redesign brief. */
  description: string;
}

/** One CASE EVIDENCE page, reproduced. */
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
    home: string;
    book: string;
    read: string;
    author: string;
    press: string;
    listen: string;
    skipToContent: string;
    /** The word on the phone bar. Never an unlabelled icon. */
    menu: string;
    closeMenu: string;
  };

  status: {
    forthcoming: string;
    published: string;
    publicationDatePrefix: string;
    buy: string;
    /** The second hero action and the closing form's heading. */
    notifyCta: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    success: string;
    error: string;
    privacyNote: string;
    /** Offline fallback only, used when no newsletter endpoint is set. */
    mailtoSubject: string;
    mailtoBody: string;
  };

  hero: {
    titleA: string;
    titleB: string;
    subtitle: string;
    strap: string;
    authorPrefix: string;
    coverAlt: string;
    readCta: string;
  };

  /** Section 2, movement one: page 10 and the printed back cover. */
  premise: {
    eyebrow: string;
    /** Page 181. The line the author calls crucial. */
    sensorLine: string;
    /** Page 10, three lines. */
    lines: string[];
    /** The back cover's own four sentences. */
    mechanism: string[];
    folio: string;
  };

  /** Section 2, movement two: page 13, where the reader takes a reading. */
  reading: {
    eyebrow: string;
    lead: string;
    steps: string[];
    result: string;
    folio: string;
  };

  /** Section 3. The three variables as an editorial spread. */
  variables: {
    /** Two printed sentences from page 13. */
    sortingLines: string[];
    loops: Loop[];
    folio: string;
  };

  /** Section 4. Three printed CASE EVIDENCE pages. */
  moments: {
    /** Page 11: "16 cases. Three readings. One question: state or situation?" */
    line: string;
    /** Printed at the head of every CASE EVIDENCE page. */
    label: string;
    pageLabel: string;
    items: CaseEvidence[];
    /** Page 20. */
    closing: string;
    closingSource: string;
  };

  /** Section 5. The book's confidence markers. */
  evidence: {
    title: string;
    grades: EvidenceGrade[];
    /** Page 13. */
    closing: string;
    folio: string;
  };

  /** Section 6 on the home page, and the whole of /read. */
  excerpt: {
    title: string;
    sectionLabel: string;
    /** The author's line, at the head of the extract. */
    lead: string;
    /** How many paragraphs the home page shows. */
    teaserCount: number;
    paragraphs: string[];
    /** The pull quote sits after this paragraph index, on /read. */
    quoteAfter: number;
    quote: string;
    continueCta: string;
    back: string;
    readingModeLabel: string;
    /** Page 26, at the foot of the complete extract on /read. */
    closing: string;
    closingSource: string;
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

  author: {
    title: string;
    photoAlt: string;
    photoPlaceholder: string;
    bio: string;
    /** The author's own line on who the book is for. */
    readers: string;
    pressLabel: string;
  };

  /** Section 8. Page 225, then the cover line, then the form. */
  closing: {
    question: string;
    source: string;
    /** Printed on the cover foot and the title page. */
    line: string;
  };

  press: {
    eyebrow: string;
    title: string;
    intro: string;
    contactHeading: string;
    assetsHeading: string;
    /** The one download the brief asks for, at the head of the list. */
    kitLabel: string;
    assets: { label: string; file: string; note: string }[];
    photoUnavailable: string;
    photoCredit: string;
    bioHeading: string;
    bios: { label: string; text: string }[];
    factsHeading: string;
    facts: { label: string; value: string }[];
    descriptionHeading: string;
    description: string[];
    /** The chapter map and the book's reference apparatus, relocated here. */
    mapHeading: string;
    mapLabel: string;
    mapTitle: string;
    mapLine: string;
    pageColumn: string;
    chapters: Chapter[];
    sortingTool: string;
    sourcesHeading: string;
    sources: string[];
    sourcesLabel: string;
    creditsHeading: string;
    credits: { label: string; value: string }[];
    back: string;
  };

  footer: {
    band: string;
    pressLink: string;
    contactLink: string;
    rights: string;
  };

  a11y: {
    mainLandmark: string;
    coverFigure: string;
    languageSwitcher: string;
    menu: string;
  };
}
