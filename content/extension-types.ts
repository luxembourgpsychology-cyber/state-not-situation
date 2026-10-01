/**
 * The shape of the commercial extension's words (content/extension.en.ts).
 *
 * Kept apart from SiteContent on purpose: the new pages are English only, so
 * the French and German files, their stubs and their review packs do not
 * grow keys that nobody has translated.
 *
 * Labels are stored in sentence case. Capitals, where the design has them,
 * come from CSS (.btn, .t-label, .t-mono), so a screen reader hears words.
 */

export interface LinkCopy {
  label: string;
  href: string;
}

export interface SceneCopy {
  id: "message" | "starting" | "evening";
  /** The hour the scene happens at, set in mono like page 4's timestamps. */
  time: string;
  /** One line: what the moment is. */
  title: string;
  scene: string;
  /** The question before a choice; empty when the scene has none. */
  prompt: string;
  /** Two possible readings (the message scene only). Either leads to the same reveal. */
  options: string[];
  revealLabel: string;
  /** A second timestamp, when the reveal moves the clock (the evening scene). */
  revealTime?: string;
  reveal: string;
  question: string;
  /** The one quiet extra link, for the scene that has an organiser angle. */
  relatedOffer: "teams" | null;
}

export interface OfferCopy {
  /** Stable: the anchor, the enquiry's format value and the analytics id. */
  id: "teams" | "talks" | "workshops" | "professionals";
  /** Who it is for, in the eyebrow. */
  audience: string;
  /** What it is, in words a nonreader understands. */
  title: string;
  /** The book's name for it, secondary. */
  series: string;
  description: string;
  /** One line each; a talk and a reading are listed apart. */
  durations: string[];
  takeaway: string;
  /** The enquiry link's label, specific to the offer. */
  action: string;
  /** A quiet second link, where one helps (workshops → public events). */
  alternative?: LinkCopy;
  /** Behind "What happens in the session". */
  details?: string;
  explore: string[];
  takeawayDetail?: { label: string; text: string };
  practical: string;
  scope?: string;
  /** The author's sign-off for this offer. Production shows only approved offers. */
  approvedForPublication: boolean;
}

export interface ExtensionContent {
  draftNote: string;
  moreWaysIn: string;
  nav: { explore: string; events: string; invite: string; research: string };
  /** One line under each word in the phone menu's swipe strip. */
  ways: { explore: string; events: string; research: string; app: string };
  /** On an English-only page, the other languages link to their own home page and say so. */
  homeOnlyLanguage: Partial<Record<"fr" | "de", { label: string; title: string }>>;
  /** The book action on the new pages, by the state site.config.ts gives. */
  book: { details: string; detailsHref: string; preorder: string; buy: string };

  meta: Record<"explore" | "invite" | "enquire" | "events" | "app" | "research", { title: string; description: string }>;

  discovery: {
    eyebrow: string;
    title: string;
    intro: string;
    items: (LinkCopy & { title: string; text: string })[];
    appLink: string;
  };

  explore: {
    eyebrow: string;
    title: string;
    intro: string;
    listLabel: string;
    sceneLabel: string;
    stepIn: string;
    close: string;
    back: string;
    chosen: string;
    /** The day line's accessible description, and the morning row under the three moments. */
    dayLabel: string;
    morningTime: string;
    morningHint: string;
    boundary: string;
    teamsLink: string;
    endEyebrow: string;
    endTitle: string;
    endText: string;
    scenes: SceneCopy[];
  };

  invite: {
    eyebrow: string;
    title: string;
    intro: string;
    support: string;
    primaryAction: string;
    practicalLine: string;
    listTitle: string;
    takeawayLabel: string;
    exploreLabel: string;
    practicalLabel: string;
    openDetails: string;
    closeDetails: string;
    draftOffer: string;
    offers: OfferCopy[];
    faqTitle: string;
    faq: { q: string; a: string }[];
    authorTitle: string;
    authorBio: string;
    authorMore: string;
    authorMoreLabel: string;
    pressLabel: string;
    pressNote: string;
  };

  enquiry: {
    eyebrow: string;
    title: string;
    intro: string;
    optional: string;
    fields: {
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
    };
    purposeHint: string;
    languageHint: string;
    moreDetails: string;
    formatNames: Record<string, string>;
    languageNames: Record<string, string>;
    boundary: string;
    draftNote: string;
    action: string;
    errorsTitle: string;
    errors: { name: string; email: string; format: string; purpose: string; purposeTooLong: string; tooLong: string; invalidChoice: string };
    sentTitle: string;
    fallbackIntro: string;
    copyLabel: string;
    copied: string;
    copyFailed: string;
    againLabel: string;
    draft: {
      subjectPrefix: string;
      greeting: string;
      opening: string;
      purposeHeading: string;
      signOff: string;
    };
    back: LinkCopy;
  };

  events: {
    eyebrow: string;
    title: string;
    intro: string;
    upcomingLabel: string;
    pastLabel: string;
    emptyTitle: string;
    emptyText: string;
    attendee: { label: string; subject: string; body: string; hint: string };
    hostQuestion: string;
    hostLabel: string;
    detailLink: string;
    back: string;
    otherEvents: string;
    seeUpcoming: string;
    rows: { date: string; time: string; place: string; language: string; price: string; contact: string };
    /** One or two words on a card. */
    status: { announced: string; bookable: string; sold_out: string; cancelled: string; past: string };
    /** The full sentence on the event's own page. */
    statusLine: { announced: string; sold_out: string; cancelled: string; past: string };
    bookIncluded: { yes: string; no: string; unknown: string };
    bookTickets: string;
    register: string;
    providerNotice: string;
    termsLabel: string;
    sections: { expect: string; whoFor: string; when: string; included: string; access: string; terms: string };
    free: string;
  };

  app: {
    eyebrow: string;
    title: string;
    statusPrefix: string;
    liveActionLabel: string;
    destinationPrefix: string;
    copyByStatus: Record<"in_development" | "live", {
      statusLabel: string;
      body: string;
      /** Only while it is true. Empty when there is nothing to say. */
      support: string;
      /** The home page's line about the app. */
      stripText: string;
      menuLabel: string;
    }>;
    meanwhile: string;
    tryScene: string;
  };

  research: {
    eyebrow: string;
    title: string;
    intro: string;
    questions: { title: string; source: string };
    evidence: { title: string; source: string; related: string };
    situation: { title: string; body: string; chapterLabel: string };
    homeEvidence: LinkCopy;
  };

  footer: { label: string };
}
