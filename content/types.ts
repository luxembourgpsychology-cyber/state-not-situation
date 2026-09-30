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

/** One of the book's three systems, printed on the cover and on pages 7 to 8. */
export interface Loop {
  key: "time" | "attention" | "safety";
  name: string;
  /** The definition from the book's front matter. */
  body: string;
}

/** One confidence marker, printed on page 7; the description is the author's. */
export interface EvidenceGrade {
  key: "high" | "medium" | "low";
  /** The label printed under the pulse on page 7. */
  label: string;
  /** The author's own description, from the redesign brief. */
  description: string;
}

/**
 * One of the five readings printed on page 4: a time, and what the moment
 * felt like. The CASE EVIDENCE panel this replaced is not in the book any
 * more — v50 prints the words "CASE EVIDENCE" and "VERIFIED" nowhere at all.
 */
export interface DayReading {
  /** As printed, e.g. "06:38". */
  time: string;
  /** The single line printed beside it. */
  line: string;
}

export interface Chapter {
  number: string;
  title: string;
  page: number;
}

/**
 * One of the sixteen names, as page 292 lists them. Every chapter now closes
 * on a name for the mechanism it described: the word, a plain explanation
 * outside Katrin's story, three examples, the pages that explain it, and one
 * thing to try.
 */
export interface BookName {
  /** As printed, e.g. "00". */
  number: string;
  name: string;
  /** The page the entry sits on, as page 292 gives it. */
  page: number;
}

/**
 * The book's foreword, printed in the front matter of the final interior,
 * pages v to ix.
 *
 * `name`, `role` and `organisation` are the author-supplied credit, word for
 * word, and they are the same in every language: a person's name and her
 * official title at a named institute are not translated. `quote` is the
 * passage the site may show, and the home-page section does not render until
 * there is one — the credit appears with or without it.
 */
export interface Foreword {
  /** The section label, and the word this language credits a foreword with. */
  eyebrow: string;
  /** The jacket line, under the byline on the first screen. */
  credit: string;
  name: string;
  role: string;
  organisation: string;
  /** Verbatim from the foreword. Empty until a passage is cleared. */
  quote: string[];
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
    /** Before publication, in front of the date: "Publishing 15 October 2026". */
    forthcomingDatePrefix: string;
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
    /** One line under the byline. The author's own, approved 6 September 2026. */
    credential: string;
    coverAlt: string;
    readCta: string;
  };

  /** Section 2, movement one: page 4 and the printed back cover. */
  premise: {
    eyebrow: string;
    /** Page 175. The line the author calls crucial. */
    sensorLine: string;
    /** The back cover’s headline, which replaced page 4’s three lines. */
    lines: string[];
    /** The back cover's own four sentences. */
    mechanism: string[];
    folio: string;
  };

  /** Section 2, movement two: page 7, where the reader takes a reading. */
  reading: {
    eyebrow: string;
    lead: string;
    steps: string[];
    result: string;
    folio: string;
  };

  /** Section 3. The three variables as an editorial spread. */
  variables: {
    /** Two printed sentences from page 7. */
    sortingLines: string[];
    loops: Loop[];
    folio: string;
  };

  /**
   * Section 4. Page 4, whole: one ordinary day, read five times.
   *
   * It replaced three CASE EVIDENCE panels on 30 September 2026. Those panels
   * are gone from the book, and on screen all three ended on a negation —
   * Nothing has happened. / None. / None. — which told a reader skimming that
   * the book was about nothing. Five readings of one day say the opposite with
   * the same devices.
   */
  moments: {
    /** Page 5: "16 cases. Three readings. One question: state or situation?" */
    line: string;
    /** Page 4's own heading over the five. */
    title: string;
    items: DayReading[];
    /** Page 4, printed under them, and the line the foreword singles out. */
    closing: string;
    folio: string;
  };

  /** Section 5. The book's confidence markers. */
  evidence: {
    title: string;
    grades: EvidenceGrade[];
    /** Page 7. */
    closing: string;
    folio: string;
  };

  /** Section 6. The foreword, credited as the front matter credits it. */
  foreword: Foreword;

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
    /** Page 20, at the foot of the complete extract on /read. */
    closing: string;
    closingSource: string;
    endNote: string;
    unavailable: string;
    folios: string[];
  };

  /**
   * Section 7. The sixteen names, as page 292 lists them, and one entry opened
   * in full so a reader can see what an entry is.
   *
   * It replaced the fifteen chapter-opening instrument readings on
   * 30 September 2026. The book stopped printing those values (NOT CLAIMED,
   * DEGRADED, DOMINANT) in v50; the openers now carry a question and three
   * plain phrases. The names are what a reader takes away, and sixteen nouns
   * answer "what is in this book" in a way fifteen telegrams could not.
   */
  names: {
    /** Page 292: "Sixteen names." */
    title: string;
    /** The printed label above every entry: A NAME FOR IT. */
    label: string;
    /** For screen readers on the page number at the end of each row. */
    pageLabel: string;
    /** Page 292's line under the list. */
    note: string;
    items: BookName[];
    /**
     * One entry, whole. Chapter 01, because its three examples are already on
     * this page: the reader met them as prose in the extract, and meets them
     * again here with a name on them.
     */
    example: {
      number: string;
      name: string;
      body: string;
      showsUpLabel: string;
      showsUp: string[];
      tryLabel: string;
      tryIt: string;
      page: number;
    };
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

  /** Section 8. Page 218, then the cover line, then the form. */
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
    /**
     * The label of the Publication row, so its value can be set from the one
     * date in site.config.ts instead of being written twice.
     */
    publicationFactLabel: string;
    /** The label of the contributor row that credits the foreword. */
    forewordLabel: string;
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
    /**
     * Printed in the imprint row, beside the copyright and the ISBN, and only
     * on a language `isUnderReview()` returns true for. One sentence: these
     * pages were translated from the English **by AI**. Not "with AI
     * assistance", which implies a human translator the site does not have.
     * The author cut the review and authoritative-version clauses on
     * 7 September 2026; do not put them back. It disappears by itself when the language is signed off and
     * `underReview` flips to false in site.config.ts — there is nothing to
     * remove by hand. English carries the reference wording and never shows it.
     */
    translationNote: string;
  };

  a11y: {
    mainLandmark: string;
    coverFigure: string;
    languageSwitcher: string;
    menu: string;
  };
}
