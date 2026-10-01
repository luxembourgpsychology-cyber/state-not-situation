/**
 * The shape of the commercial extension's words (content/extension.en.ts).
 *
 * Kept apart from SiteContent on purpose: the new pages are English only, so
 * the French and German files, their stubs and their review packs do not
 * grow keys that nobody has translated.
 */

export interface LinkCopy {
  label: string;
  href: string;
}

export interface SceneCopy {
  id: "message" | "starting" | "evening";
  /** The hour the scene happens at, set in mono like page 4's timestamps. */
  time: string;
  /** One line, like page 4's: what the moment is. */
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
  id: "teams" | "talks" | "workshops" | "professionals";
  label: string;
  title: string;
  /** What a skimmer reads: one line, the length, who it is for. The rest opens on a tap. */
  short: string;
  duration: string;
  who: string;
  hook: string;
  description: string;
  audience: string;
  formats: string[];
  explore: string[];
  takeaway: string;
  glimpse: string;
  practical: string;
  scope: string;
  /** The author's sign-off for this offer. Production shows only approved offers. */
  approvedForPublication: boolean;
}

export interface ExtensionContent {
  draftNote: string;
  moreWaysIn: string;
  nav: { explore: string; events: string; invite: string; research: string };
  /** On an English-only page, the other languages link to their own home page and say so. */
  homeOnlyLanguage: Partial<Record<"fr" | "de", { label: string; title: string }>>;
  book: { details: string; detailsHref: string };

  meta: Record<"explore" | "invite" | "enquire" | "events" | "app" | "research", { title: string; description: string }>;

  discovery: {
    eyebrow: string;
    title: string;
    intro: string;
    items: (LinkCopy & { title: string; text: string })[];
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
    endTitle: string;
    endText: string;
    endSource: string;
    scenes: SceneCopy[];
  };

  invite: {
    eyebrow: string;
    title: string;
    intro: string;
    indexLabel: string;
    quoteLabel: string;
    availabilityNote: string;
    rows: {
      audience: string;
      formats: string;
      explore: string;
      glimpse: string;
      takeaway: string;
      practical: string;
      scope: string;
    };
    draftOffer: string;
    seeFormat: string;
    closeFormat: string;
    moreAbout: string;
    offers: OfferCopy[];
    faqTitle: string;
    faq: { q: string; a: string }[];
    pressLabel: string;
    pressNote: string;
  };

  enquiry: {
    eyebrow: string;
    title: string;
    intro: string;
    howLabel: string;
    emailFallbackIntro: string;
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
    formatNames: Record<string, string>;
    languageNames: Record<string, string>;
    boundary: string;
    privacy: string;
    action: string;
    errorsTitle: string;
    errors: { required: Record<string, string>; email: string; tooLong: string; invalidChoice: string };
    sentTitle: string;
    sentBody: string;
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
    hostLabel: string;
    detailLink: string;
    back: string;
    seeUpcoming: string;
    rows: { date: string; time: string; place: string; language: string; price: string; book: string; access: string; contact: string };
    status: { announced: string; bookable: string; sold_out: string; cancelled: string; past: string };
    bookingToFollow: string;
    bookIncluded: { yes: string; no: string; unknown: string };
    bookWith: string;
    providerNotice: string;
    termsLabel: string;
    whoFor: string;
    whatHappens: string;
    included: string;
    cancellationLabel: string;
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
      intro: string;
      body: string;
      stripLabel: string;
      menuLabel: string;
    }>;
    meanwhile: string;
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
