import type { ExtensionContent } from "./extension-types";

/**
 * THE COMMERCIAL EXTENSION — English, the only language it exists in.
 *
 * DRAFT FOR THE AUTHOR'S REVIEW. Most of this is the copy Ivana supplied in
 * the handoff of 1 October 2026 (02_CONTENT_AND_CONFIG.json, itself marked
 * "draft-for-Ivana-review"). It is a fifth kind of string the rest of the
 * site does not have, so it is fenced: site.config.ts → extension.approved
 * keeps all of it off production until she signs it off.
 *
 * Where the book already prints a better line, the printed line is used and
 * its page is given. CONTENT_SOURCES.md, "The commercial extension", records
 * every sentence: printed, author-supplied, handoff draft, or interface.
 *
 * Nothing here describes a fee, a date, a venue, a testimonial, an
 * accreditation or an outcome. Scenes are original and labelled as examples;
 * none is a passage of the book.
 */
export const extensionEn: ExtensionContent = {
  draftNote: "Preview · draft copy for the author’s review · not on the public site",
  moreWaysIn: "More ways in",
  nav: { explore: "Explore", events: "Events", invite: "Invite Ivana", research: "Research & limits" },
  homeOnlyLanguage: {
    fr: { label: "FR · livre", title: "Français — accueil du livre (cette page n’existe qu’en anglais)" },
    de: { label: "DE · Buch", title: "Deutsch — Startseite des Buches (diese Seite gibt es nur auf Englisch)" },
  },
  book: { details: "Book & publication details", detailsHref: "/en#top" },

  meta: {
    explore: {
      title: "Explore",
      description: "Three short scenes inspired by State. Not Situation. by Ivana Budišin. No reading required.",
    },
    invite: {
      title: "Invite Ivana",
      description: "Talks, readings, team sessions and workshops with Ivana Budišin, author of State. Not Situation.",
    },
    enquire: {
      title: "Enquiry",
      description: "Ask about a talk, reading, team session or workshop with Ivana Budišin.",
    },
    events: {
      title: "Events",
      description: "Public readings, talks and workshops with Ivana Budišin.",
    },
    app: {
      title: "The companion app",
      description: "The STATE companion app is in development as a separate product.",
    },
    research: {
      title: "Research and limits",
      description: "How State. Not Situation. grades its evidence, and where its framework stops.",
    },
  },

  // The one new section on the home page, after the form and before the footer.
  discovery: {
    eyebrow: "Beyond the page",
    title: "There is more than one way in.",
    intro: "Try a small moment from the world of the book. Come to a reading. Or bring the conversation to your own audience.",
    items: [
      { title: "Try a moment", text: "Three short scenes. Something familiar, seen a little differently.", label: "Explore the idea", href: "/en/explore" },
      { title: "Come to an event", text: "Readings, talks and workshops with Ivana, as public dates are announced.", label: "See public events", href: "/en/events" },
      { title: "Invite Ivana", text: "A talk, a workshop or a session shaped around your audience.", label: "Explore the formats", href: "/en/invite" },
    ],
  },

  explore: {
    eyebrow: "A small taste of State. Not Situation.",
    title: "You know that moment.",
    intro: "One ordinary day, three small moments. Step into any of them. You don’t need to have read the book.",
    listLabel: "Three moments",
    sceneLabel: "Three made-up moments from one day, inspired by the book.",
    stepIn: "Step into the scene",
    close: "Close the scene",
    back: "Back to the three moments",
    chosen: "Your first guess",
    boundary: "How you feel can change what a moment seems to mean. If something is really wrong, it still deserves attention.",
    teamsLink: "Sessions for teams",
    endTitle: "There is more to the moment.",
    // The back cover of v50, printed.
    endText: "State. Not Situation. examines the gap between what happened and what it felt like it meant.",
    endSource: "Back cover",
    // Rewritten on 1 October 2026 at the author's request: written to "you",
    // in plain words, and one day — the message at 16:10 is still in the air
    // at 16:12, and the late night reaches the morning — the way page 4 reads
    // one day five times. Each scene still stands on its own.
    scenes: [
      {
        id: "message",
        time: "16:10",
        title: "A message arrives just before you leave.",
        scene: "A colleague writes: “Can we talk before you go?” No reason. Nothing else. You read it twice. By the second time, you’re already having the conversation in your head.",
        prompt: "What do they want?",
        options: ["Something’s gone wrong.", "Just a quick question."],
        revealLabel: "See it another way",
        reveal: "Either could be true. So could ten other things. The message says they want to talk. It doesn’t say why. Your mind filled that part in.",
        question: "Which part came from the message, and which part came from you?",
        relatedOffer: null,
      },
      {
        id: "starting",
        time: "16:12",
        title: "The title that looked fine at lunch.",
        scene: "You go back to tomorrow’s slides. The title looked fine at lunch. Now it looks weak. A bit embarrassing, even. You delete it, then type the same words back in.",
        prompt: "",
        options: [],
        revealLabel: "Look again",
        reveal: "The slide hasn’t changed since lunch. Your afternoon has. Two minutes ago, a message asked to talk before you go. Right now you’re not only judging a title. You’re judging whether you belong in that meeting.",
        question: "What changed since lunch: the slide, or the afternoon?",
        relatedOffer: "teams",
      },
      {
        id: "evening",
        time: "22:36",
        title: "One more folder before bed.",
        scene: "You could go to bed. Instead you open the photo folder you’ve been meaning to sort for months. It’s easy. It’s satisfying. Everything goes somewhere. Then you find another folder.",
        prompt: "",
        options: [],
        revealLabel: "Next morning",
        revealTime: "07:08",
        reveal: "The photos look great. You’re standing by the kettle, annoyed by the noise it has made every morning for six years. Last night felt like time you found. This morning feels like time someone took.",
        question: "Is it really the kettle?",
        relatedOffer: null,
      },
    ],
  },

  invite: {
    eyebrow: "Invite Ivana",
    title: "Bring a different reading to the room.",
    intro: "A talk, a team session, a workshop or a reading with Ivana Budišin. No one needs to have read the book. Choose your audience and explore a format.",
    indexLabel: "Four formats",
    quoteLabel: "Request availability and a quote",
    availabilityNote: "Dates, format and fees are agreed by enquiry.",
    rows: {
      audience: "Who it is for",
      formats: "Proposed formats",
      explore: "What we will explore",
      glimpse: "A glimpse",
      takeaway: "What people take away",
      practical: "Practical",
      scope: "Scope",
    },
    draftOffer: "Draft · not yet approved for publication",
    // The four offers from the handoff, word for word. The durations are
    // proposals, and the page says so. No fee appears anywhere.
    offers: [
      {
        id: "teams",
        label: "For teams",
        title: "Warm Panels at Work",
        hook: "A short email becomes a verdict. An unfinished task follows someone home. Small pressures collect until an ordinary afternoon feels personal.",
        description: "A session with Ivana gives teams a shared language for these moments through scenes from the book and guided discussion. It also makes room for what really needs changing in the work itself.",
        audience: "Organisations, HR and wellbeing leads, and team leaders",
        formats: ["60-minute introduction", "90-minute session with discussion"],
        explore: [
          "What a message says and what a reading adds",
          "Unclear tasks and the pressure to get them right",
          "The working conditions that need attention",
        ],
        takeaway: "A shared set of questions and one small experiment to discuss after the session.",
        glimpse: "One ordinary email. Several plausible readings. A conversation about what information is still missing.",
        practical: "Audience size, location or online delivery, language, materials and any follow-up are agreed in the proposal.",
        scope: "This session does not replace addressing workload, harmful conduct or organisational problems. Individual reflections are not reported to management.",
        approvedForPublication: false,
      },
      {
        id: "talks",
        label: "For audiences and venues",
        title: "Same Life, Different Settings",
        hook: "A memorable talk about the distance between a feeling and the story that follows it.",
        description: "Everyday scenes, clear psychology and a brief audience experience introduce the central idea of State. Not Situation. Bookshops and libraries can choose a reading and conversation instead.",
        audience: "Conferences, associations, libraries, bookshops and book clubs",
        // Who each length is for, so a duration has a purpose (handoff, 01 §7).
        formats: [
          "20-minute talk, for conferences and associations",
          "40-minute talk, for conferences and associations",
          "75-minute reading and conversation, for bookshops, libraries and book clubs",
        ],
        explore: [
          "Why the same moment can carry different meanings",
          "The stories that form before we notice them",
          "When the situation deserves more attention",
        ],
        takeaway: "An idea to recognise in ordinary life and a question to take into the next conversation.",
        glimpse: "A room hears the same few words—and discovers how many meanings can fit inside them.",
        practical: "Host questions, screen or audio needs, audience language, book sales, signing and recording rights are agreed in advance.",
        scope: "A public educational talk or literary event. It is not therapy or an assessment of audience members.",
        approvedForPublication: false,
      },
      {
        id: "workshops",
        label: "For curious groups",
        title: "The Instrument Panel",
        hook: "Some ideas are easier to understand when there is time to try them, ask a question and hear another reading.",
        description: "A small-group workshop combines scenes, selected activities and conversation with Ivana. Participants can explore the framework without sharing private experiences.",
        audience: "Private groups, cultural venues and adults curious about the book",
        formats: ["Three hours, including a break", "Two 90-minute sessions"],
        explore: [
          "Recognising the gap between observation and interpretation",
          "Trying selected ideas through fictional examples",
          "Choosing one appropriate question to take into the week",
        ],
        takeaway: "Selected session materials and one idea to explore further. Exact inclusions are agreed before booking.",
        glimpse: "A shared scene becomes a conversation. No one has to make their own life the example.",
        practical: "Group size, venue, language, access requirements, materials and books are confirmed with the organiser. Announced public sessions appear on Events.",
        scope: "An educational workshop, not group therapy. Participation in any activity is optional.",
        approvedForPublication: false,
      },
      {
        id: "professionals",
        label: "For professional audiences",
        title: "Reading Mode",
        hook: "Put the framework and its evidence on the table before deciding where it may be useful.",
        description: "A seminar for practitioners and students examines the book’s language, supporting research, limitations and competing explanations. Discussion includes where the framework ends.",
        audience: "Professional associations, practitioners, educators and psychology students",
        formats: ["60-minute seminar", "90-minute seminar with discussion"],
        explore: [
          "A useful analogy and the limits of that analogy",
          "What the sources support and what remains uncertain",
          "Using hypothetical cases without overextending the framework",
        ],
        takeaway: "A clearer basis for judging the framework’s relevance and limits, with selected source references.",
        glimpse: "One case, two plausible accounts. What would distinguish them, and what remains unknown?",
        practical: "Audience, learning objectives, reading material, language and duration are agreed in advance.",
        scope: "No CPD accreditation is claimed. The book’s framework and derived exercises are not presented as a validated treatment.",
        approvedForPublication: false,
      },
    ],
    faqTitle: "Practical questions",
    faq: [
      { q: "How booking works", a: "Send a few practical details and a short description of your audience. This is an enquiry, not a booking. Dates, scope and fees are agreed separately." },
      { q: "Books", a: "Book copies and signing can be discussed as part of the proposal." },
      { q: "Language", a: "The language of the session is agreed with the organiser in advance." },
      { q: "What these sessions are not", a: "They are educational talks, readings and workshops. They are not therapy, and they are not an assessment of anyone taking part." },
    ],
    pressLabel: "Press materials",
    pressNote: "Biography, photograph, cover and publication facts for your programme.",
  },

  enquiry: {
    eyebrow: "Invite Ivana",
    title: "Tell me about your audience.",
    intro: "A few practical details are enough to begin. You do not need a finished plan.",
    howLabel: "How this works",
    emailFallbackIntro: "Send your enquiry by email. The button prepares a draft in your email app; you will need to send it there.",
    optional: "optional",
    fields: {
      name: "Name",
      email: "Email",
      organisation: "Organisation or venue",
      format: "Interested in",
      groupSize: "Approximate group size",
      location: "Location or online",
      dateRange: "Preferred date or date range",
      language: "Preferred language",
      purpose: "What would you like the session to explore?",
      budget: "Indicative budget",
    },
    purposeHint: "A few lines about your audience. Please leave out private health or personal details.",
    formatNames: {
      teams: "For teams — Warm Panels at Work",
      talks: "For audiences and venues — Same Life, Different Settings",
      workshops: "For curious groups — The Instrument Panel",
      professionals: "For professional audiences — Reading Mode",
      not_sure: "Not sure yet",
    },
    languageNames: { en: "English", fr: "French", discuss: "To discuss" },
    boundary: "This is an enquiry, not a booking. Dates, scope and fees are agreed separately.",
    privacy: "Nothing is sent from this website. The draft goes from your own email app, and only when you send it.",
    action: "Open email draft",
    errorsTitle: "Please check these fields",
    errors: {
      required: {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        format: "Please choose what you are interested in.",
        purpose: "Please write a few lines about your audience.",
      },
      email: "Please enter an email address such as name@example.com.",
      tooLong: "Please shorten this to {max} characters.",
      invalidChoice: "Please choose one of the listed options.",
    },
    sentTitle: "Now send it from your email app.",
    sentBody: "If a draft opened, check it and send it there. Nothing has been sent yet, and nothing is booked.",
    fallbackIntro: "If no draft opened, copy the text below and email it to",
    copyLabel: "Copy the text",
    copied: "Copied",
    copyFailed: "Select the text and copy it",
    againLabel: "Open the draft again",
    draft: {
      subjectPrefix: "Enquiry: ",
      greeting: "Hello Ivana,",
      opening: "I would like to ask about a session.",
      purposeHeading: "What we would like the session to explore:",
      signOff: "Prepared on statenotsituation.com. This is an enquiry, not a booking.",
    },
    back: { label: "Back to the formats", href: "/en/invite" },
  },

  events: {
    eyebrow: "Events",
    title: "Meet the book in a room.",
    intro: "Public readings, talks and workshops with Ivana. Come curious; you do not need to have read the book.",
    upcomingLabel: "Upcoming",
    pastLabel: "Past events",
    emptyTitle: "Public dates will be announced here.",
    emptyText: "If you would like to attend a future workshop, you can ask about plans. If you have an audience or venue in mind, explore hosting a session.",
    attendee: {
      label: "Ask about a future workshop",
      subject: "Interest in attending a public workshop",
      body: "Hello Ivana,\n\nI am interested in attending a future public workshop. Could you share any confirmed plans?\n\nThank you.",
      hint: "Opens an email draft. This is a question about attending, not a reservation or mailing-list signup.",
    },
    hostLabel: "Invite Ivana to your venue",
    detailLink: "See event details",
    back: "All events",
    seeUpcoming: "See upcoming events",
    rows: { date: "Date", time: "Time", place: "Place", language: "Language", price: "Price", book: "The book", access: "Access", contact: "Organiser" },
    status: {
      announced: "Booking details to follow",
      bookable: "Booking open",
      sold_out: "Sold out",
      cancelled: "Cancelled",
      past: "This event has taken place",
    },
    bookingToFollow: "Booking details to follow",
    bookIncluded: { yes: "A copy of the book is included.", no: "The book is not included.", unknown: "Book details to follow." },
    bookWith: "Book with",
    providerNotice: "Booking and payment take place on the provider’s site, under its terms. Your booking is confirmed by the provider.",
    termsLabel: "Booking terms",
    whoFor: "Who it is for",
    whatHappens: "What happens",
    included: "What is included",
    cancellationLabel: "From the organiser",
    free: "Free",
  },

  app: {
    eyebrow: "The companion app",
    title: "Another way into the book.",
    statusPrefix: "Status",
    liveActionLabel: "Open the app",
    destinationPrefix: "Opens",
    copyByStatus: {
      in_development: {
        statusLabel: "In development",
        intro: "The STATE companion app is in development. It explores chapter-based interactive experiences and is being built as a separate product.",
        body: "This website offers a first taste of the book and ways to meet Ivana’s work. Details of the app will be shared here when they are ready.",
        stripLabel: "The companion app — in development",
        menuLabel: "App — in development",
      },
      live: {
        statusLabel: "Available",
        intro: "Explore the separate STATE companion app.",
        body: "Visit the app to see its current experiences, access details and pricing. The app opens as a separate product.",
        stripLabel: "The STATE companion app",
        menuLabel: "App",
      },
    },
    meanwhile: "In the meantime",
  },

  research: {
    eyebrow: "Research and limits",
    title: "A good question leaves room for uncertainty.",
    intro: "State. Not Situation. brings together stories, research and practical questions. It also asks where its own explanation stops being enough.",
    // The bodies of the first two are printed (page 7, and The Scientific
    // Heartbeat), taken from content/en.ts so they cannot drift from it.
    questions: { title: "A way to ask better questions", source: "Page 7" },
    evidence: {
      title: "Evidence has different strengths",
      source: "Page 7",
      related: "Evidence for a related mechanism does not automatically prove that a particular exercise works.",
    },
    situation: {
      title: "The situation still matters",
      body: "A person’s state can influence an interpretation while a real concern remains. This framework offers questions, not a diagnosis or a substitute for professional support.",
      chapterLabel: "In the book",
    },
    homeEvidence: { label: "The evidence markers", href: "/en#evidence" },
  },

  footer: { label: "More ways in" },
};
