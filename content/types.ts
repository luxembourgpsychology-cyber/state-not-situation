/**
 * The shape every language file must follow. Interface strings and book copy
 * live together so a translator receives one file per language.
 */
export interface DayRow {
  time: string;
  /** The loop that dominates this moment, colours the margin bar. */
  loop: "time" | "attention" | "safety";
  /** What the moment feels like: the first reading, in Katrin's words. */
  firstReading: string;
  /** What the instrument was set to, in the cover's annotation grammar. */
  state: string[];
}

export interface Chapter {
  number: string;
  title: string;
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
    languageLabel: string;
    home: string;
  };
  status: {
    forthcoming: string;
    published: string;
    publicationDatePrefix: string;
    buy: string;
    notifyHeading: string;
    notifyBody: string;
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
    readCta: string;
    listenCta: string;
  };
  proposition: {
    eyebrow: string;
    headline: string[];
    headlineAccent: string;
    tableHeaders: [string, string, string];
    tableRows: [string, string, string][];
    paragraphs: string[];
    closer: string;
    band: string;
  };
  day: {
    eyebrow: string;
    title: string;
    intro: string;
    columnFirst: string;
    columnState: string;
    rows: DayRow[];
    closing: string[];
    loopLabels: { time: string; attention: string; safety: string };
  };
  excerpt: {
    eyebrow: string;
    title: string;
    sectionLabel: string;
    runningHead: string;
    runningHeadVerso: string;
    teaserCount: number;
    cta: string;
    continueCta: string;
    back: string;
    readingModeLabel: string;
    paragraphs: string[];
    /** Index of the paragraph after which the FAA quotation is set. */
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
    unavailableDetail: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    auditEyebrow: string;
    audit: string;
    facts: { label: string; value: string }[];
    readersEyebrow: string;
    readers: string;
    mapEyebrow: string;
    mapTitle: string;
    mapSubtitle: string;
    chapters: Chapter[];
    mapFooter: string;
  };
  author: {
    eyebrow: string;
    title: string;
    photoAlt: string;
    photoPlaceholder: string;
    paragraphs: string[];
    websiteLabel: string;
    contactLabel: string;
    pressLabel: string;
  };
  companion: {
    eyebrow: string;
    line: string;
    detail: string;
  };
  press: {
    eyebrow: string;
    title: string;
    intro: string;
    contactHeading: string;
    contactBody: string;
    assetsHeading: string;
    assets: { label: string; file: string; note: string }[];
    photoUnavailable: string;
    bioHeading: string;
    bios: { label: string; text: string }[];
    factsHeading: string;
    facts: { label: string; value: string }[];
    descriptionHeading: string;
    description: string[];
    back: string;
  };
  footer: {
    band: string;
    publisher: string;
    rights: string;
    pressLink: string;
    contactLink: string;
    madeLine: string;
  };
  a11y: {
    mainLandmark: string;
    coverFigure: string;
    pulseMark: string;
    languageSwitcher: string;
    externalLink: string;
    dayRegion: string;
  };
}
