import type { ExtensionContent } from "./extension-types";

/**
 * THE COMMERCIAL EXTENSION — English, the only language it exists in.
 *
 * The words are the author's: her editorial and booking-clarity brief of
 * 1 October 2026 (CLAUDE_FULL_WEBSITE_LANGUAGE_AND_BOOKINGS_BRIEF.md), which
 * supersedes the earlier handoff draft. They are website copy, not book
 * text: nothing here carries quotation marks, a page number or an
 * attribution to the book unless it is printed there. CONTENT_SOURCES.md,
 * "The commercial extension", records every sentence; COPY_CHANGES.md lists
 * what this pass replaced.
 *
 * Nothing here describes a fee, a date, a venue, a testimonial, an
 * accreditation, a response time or an outcome. Scenes are fictional and
 * say so; none is a passage of the book.
 *
 * Stable ids (scene ids, offer ids, anchors, query values, analytics names)
 * never change with the words.
 */
export const extensionEn: ExtensionContent = {
  draftNote: "Preview · draft copy for the author’s review · not on the public site",
  moreWaysIn: "More ways in",
  nav: { explore: "Explore", events: "Events", invite: "Invite Ivana", research: "Research & limits" },
  ways: { explore: "Three short scenes", events: "Talks, readings, workshops", research: "Evidence and limits", app: "App" },
  homeOnlyLanguage: {
    fr: { label: "FR · livre", title: "Français — accueil du livre (cette page n’existe qu’en anglais)" },
    de: { label: "DE · Buch", title: "Deutsch — Startseite des Buches (diese Seite gibt es nur auf Englisch)" },
  },
  book: { details: "About the book", detailsHref: "/en#top", preorder: "Pre-order the book", buy: "Buy the book" },

  meta: {
    explore: {
      title: "Explore the book",
      description: "Explore three short fictional scenes inspired by State. Not Situation. No prior reading needed.",
    },
    invite: {
      title: "Talks, workshops and readings with Ivana",
      description: "Invite psychologist and author Ivana Budišin for a team session, talk, reading or workshop. Explore formats and ask about availability.",
    },
    enquire: {
      title: "Enquire about a talk or workshop",
      description: "Tell Ivana about your audience and the talk, reading or workshop you have in mind. Dates, format and fees are agreed before booking.",
    },
    events: {
      title: "Public talks, readings and workshops",
      description: "Find public talks, readings and workshops with Ivana Budišin as dates are announced.",
    },
    app: {
      title: "The STATE companion app",
      description: "Find the latest confirmed information about the STATE companion app, currently in development.",
    },
    research: {
      title: "Research and the limits of the book’s ideas",
      description: "Learn how State. Not Situation. uses research, evidence markers and questions about the limits of its framework.",
    },
  },

  // The one new section on the home page, after the form and before the footer.
  discovery: {
    eyebrow: "Beyond the page",
    title: "There is more than one way in.",
    intro: "Try a short scene, come to a public event, or invite Ivana to speak with your group. You don’t need to have read the book.",
    items: [
      { title: "Try a short scene", text: "An ordinary moment. A different way to look at it. Explore three short examples inspired by the book.", label: "Try the scenes", href: "/en/explore" },
      { title: "Come to an event", text: "Find public talks, readings and workshops with Ivana, as dates are announced.", label: "View public events", href: "/en/events" },
      { title: "Invite Ivana", text: "Explore talks, team sessions and workshops for your organisation, venue or group.", label: "Explore talks and workshops", href: "/en/invite" },
    ],
    appLink: "About the app",
  },

  explore: {
    eyebrow: "A small taste of State. Not Situation.",
    title: "You know that moment.",
    intro: "An email you read twice. A task that suddenly feels difficult. One more thing before bed. Explore three short scenes and see what else might be shaping the moment.",
    listLabel: "Three moments",
    sceneLabel: "Three fictional moments from one day, inspired by the book. No prior reading needed.",
    stepIn: "Read the scene",
    close: "Close the scene",
    back: "Back to the three moments",
    chosen: "Your first guess",
    dayLabel: "One fictional day: 16:10, 16:12, 22:36, and 07:08 the next morning",
    morningTime: "07:08",
    morningHint: "See what happens the next morning",
    boundary: "How you feel can shape what a moment seems to mean. A real problem still deserves attention.",
    teamsLink: "Explore sessions for teams",
    endEyebrow: "The book",
    endTitle: "There is more to the moment.",
    endText: "State. Not Situation. explores why an ordinary moment can feel so certain—and what we might notice when we look again.",
    // One fictional day, written to "you" (the author's choice): the message
    // at 16:10 is still in the air at 16:12, and the late night reaches the
    // morning. Each scene still stands on its own.
    scenes: [
      {
        id: "message",
        time: "16:10",
        title: "“Can we talk before you go?”",
        scene: "A colleague sends a message just as you’re getting ready to leave. No reason given. You read it twice. Before you reply, a whole conversation has already started in your head.",
        prompt: "What might they mean?",
        options: ["Something has gone wrong.", "They have a quick question."],
        revealLabel: "Consider another possibility",
        reveal: "Either could be true. So could something you haven’t thought of. The message tells you they want to talk. It doesn’t tell you why.",
        question: "What did the message actually say—and what did you add?",
        relatedOffer: null,
      },
      {
        id: "starting",
        time: "16:12",
        title: "The title looked fine at lunch.",
        scene: "You return to tomorrow’s presentation. Now the title looks weak. A little embarrassing, even. You delete it, then type the same words again.",
        prompt: "",
        options: [],
        revealLabel: "Look at what changed",
        reveal: "The slide hasn’t changed since lunch. Your afternoon has. Two minutes ago, a colleague asked to talk before you leave. Now a simple title feels like something you need to get exactly right. Perhaps it needs work. Perhaps the afternoon is part of the reading too.",
        question: "What changed: the slide, the afternoon, or both?",
        relatedOffer: "teams",
      },
      {
        id: "evening",
        time: "22:36",
        title: "Just one more folder.",
        scene: "You could go to bed. Instead, you open the photo folder you’ve been meaning to sort for months. It feels easy. Satisfying. Everything has a place. Then you find another folder.",
        prompt: "",
        options: [],
        revealLabel: "See the next morning",
        revealTime: "07:08",
        reveal: "The photos are sorted. You went to bed after one. Now you’re standing beside the kettle, irritated by the noise it has made every morning for six years. Last night felt like time you found. This morning feels like time someone took.",
        question: "The kettle hasn’t changed. What else might be part of this morning?",
        relatedOffer: null,
      },
    ],
  },

  invite: {
    eyebrow: "Invite Ivana",
    title: "Talks, workshops and readings with Ivana.",
    intro: "Why does a short email feel personal? Why can an ordinary task suddenly feel difficult? Ivana Budišin, clinical psychologist and author of State. Not Situation., explores these questions through everyday examples and conversation.",
    support: "For teams, organisations, venues and groups. No one needs to have read the book.",
    primaryAction: "Check availability",
    practicalLine: "Tell Ivana about your audience. The format, date and fee are agreed before you book.",
    listTitle: "Find a session for your audience",
    takeawayLabel: "What you take away",
    exploreLabel: "What we explore",
    practicalLabel: "Practical details",
    openDetails: "What happens in the session",
    closeDetails: "Hide session details",
    draftOffer: "Draft · not yet approved for publication",
    offers: [
      {
        id: "teams",
        audience: "For teams and organisations",
        title: "Why ordinary messages become workplace misunderstandings",
        series: "Warm Panels at Work",
        description: "A short email can feel personal. An unfinished task can follow someone home. This session explores how pressure shapes the way teams read everyday situations—and how to ask better questions before settling on an explanation.",
        durations: ["60-minute introduction or 90-minute session with discussion"],
        takeaway: "Practise separating what happened from what you assumed, using examples from working life.",
        action: "Ask about a team session",
        details: "Ivana uses fictional workplace scenes and guided discussion to explore the gap between an event and the meaning we give it. The conversation also makes room for problems in the work itself.",
        explore: [
          "What an email says and what we read into it.",
          "How unclear tasks and pressure to get things right affect a moment.",
          "When better questions help, and when working conditions need attention.",
        ],
        takeawayDetail: { label: "What your team takes away", text: "A shared set of questions to use in everyday conversations, and one small idea to discuss after the session." },
        practical: "Group size, location, language, materials and any follow-up are agreed with the organiser.",
        scope: "The session does not replace addressing workload or harmful behaviour. Personal reflections are not reported to management.",
        approvedForPublication: true,
      },
      {
        id: "talks",
        audience: "For conferences, bookshops, libraries and other venues",
        title: "Why the same situation can feel so different",
        series: "Same Life, Different Settings",
        description: "A talk or author reading about the stories we build around everyday moments. Through scenes from the book and audience discussion, Ivana explores why our first interpretation may not be the only one.",
        durations: ["Talk: 20 or 40 minutes", "Reading and conversation: 75 minutes"],
        takeaway: "A familiar experience seen from another angle, and a question to take into the next conversation.",
        action: "Ask about a talk or reading",
        details: "Choose a talk for your event or a reading and conversation for a literary audience. The content and format are agreed with the host.",
        explore: [
          "Why the same words can carry different meanings.",
          "How an explanation can form before we notice it.",
          "When the situation itself needs closer attention.",
        ],
        practical: "Audience language, technical needs, questions, book sales, signing and recording arrangements are agreed in advance.",
        approvedForPublication: true,
      },
      {
        id: "workshops",
        audience: "For small groups",
        title: "Put the book’s ideas into practice",
        series: "The Instrument Panel",
        description: "Spend time with the ideas through fictional scenes, selected activities and conversation. There is room to try something, ask questions and hear another point of view. You do not need to share private experiences.",
        durations: ["Three hours, including a break, or two 90-minute sessions"],
        takeaway: "A clearer way to distinguish what you noticed from what you concluded, and one idea to explore afterwards.",
        action: "Ask about a group workshop",
        alternative: { label: "Looking for a public workshop? View events.", href: "/en/events" },
        explore: [
          "The difference between observing something and interpreting it.",
          "Selected ideas from the book, using fictional examples.",
          "A useful question to take into an ordinary day.",
        ],
        practical: "Group size, venue, language, access needs, materials and any book copies are agreed before booking.",
        scope: "This is an educational workshop. Taking part in an activity is optional. It is not group therapy.",
        approvedForPublication: true,
      },
      {
        id: "professionals",
        audience: "For practitioners, educators and psychology students",
        title: "The book’s ideas, evidence and limits",
        series: "Reading Mode",
        description: "A seminar examining the framework in State. Not Situation.: what the research supports, what remains uncertain and where another explanation may fit better.",
        durations: ["60-minute seminar or 90-minute seminar with discussion"],
        takeaway: "A clearer basis for judging where the framework may be useful and where its limits matter.",
        action: "Ask about a seminar",
        explore: [
          "What the book’s analogies help explain—and what they do not.",
          "The supporting research, uncertainty and alternative explanations.",
          "Hypothetical cases and the questions they leave open.",
        ],
        takeawayDetail: { label: "What participants take away", text: "A discussion of the framework’s relevance and limitations, with selected source references." },
        practical: "The audience, learning objectives, reading material, language and duration are agreed in advance.",
        scope: "The seminar does not carry a claim of CPD accreditation. The framework and its exercises are not presented as a validated treatment.",
        approvedForPublication: true,
      },
    ],
    faqTitle: "Before you enquire",
    faq: [
      { q: "How do I arrange a session?", a: "Send a few details about your audience and what you have in mind. Ivana will discuss the format, availability and fee with you. An enquiry does not reserve a date or confirm a booking." },
      { q: "What does it cost?", a: "Fees depend on the session and the agreed arrangements. You will receive a quote before deciding whether to book." },
      { q: "Do we need to read the book first?", a: "No. The sessions introduce the relevant ideas through examples and discussion." },
      { q: "Are books included?", a: "Book copies and signing can be discussed. They are included only when agreed in the proposal." },
      { q: "What about language, location and access needs?", a: "Include any preferences or requirements in your enquiry so they can be discussed before booking." },
      { q: "Are these therapy sessions?", a: "No. They are educational talks, workshops and literary events. Participants are not assessed, and no one is asked to share private experiences." },
    ],
    authorTitle: "Meet Ivana",
    authorBio: "Ivana Budišin is a clinical psychologist living and working in Luxembourg and the author of State. Not Situation. Her work explores how people notice, interpret and respond to everyday experiences.",
    authorMore: "Before moving into psychology, Ivana worked in design and product design. She runs Luxembourg Psychology and has a continuing interest in research and cognitive science. The book brings these interests together through stories, questions and the details of ordinary life.",
    authorMoreLabel: "More about Ivana",
    pressLabel: "Biography and press materials",
    pressNote: "Author photograph, biography, book cover and publication details for organisers.",
  },

  enquiry: {
    eyebrow: "Invite Ivana",
    title: "Tell me what you have in mind.",
    intro: "A few details are enough to start. Tell me who the session is for and what you would like to explore. You don’t need a finished plan.",
    optional: "optional",
    fields: {
      name: "Your name",
      email: "Your email",
      organisation: "Organisation or venue",
      format: "Which session interests you?",
      groupSize: "Approximate group size",
      location: "Location or online",
      dateRange: "Preferred date or dates",
      language: "Preferred language",
      purpose: "Who is the session for, and what do you have in mind?",
      budget: "Budget, if known",
    },
    purposeHint: "A sentence or two is enough. Please leave out private health information or personal details about other people.",
    languageHint: "We will confirm what is possible when discussing the session.",
    moreDetails: "Add practical details (optional)",
    // Readable names; the stored values (teams, talks…) do not change.
    formatNames: {
      teams: "Team session",
      talks: "Talk or author reading",
      workshops: "Group workshop",
      professionals: "Professional seminar",
      not_sure: "Not sure yet",
    },
    languageNames: { en: "English", fr: "French", discuss: "To discuss" },
    boundary: "This is an enquiry. The date, format and fee are agreed before a booking is confirmed.",
    // The site has no sending service, so the button prepares an email.
    draftNote: "This opens a draft in your email app. Review it and press Send there. Nothing is sent from this website.",
    action: "Open email draft",
    errorsTitle: "Please check the highlighted fields.",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      format: "Please choose which session interests you.",
      purpose: "Please add a short message about the session you have in mind.",
      purposeTooLong: "Please shorten this message to {max} characters.",
      tooLong: "Please shorten this to {max} characters.",
      invalidChoice: "Please choose one of the listed options.",
    },
    sentTitle: "Send the draft from your email app to complete your enquiry.",
    fallbackIntro: "If your email app did not open, copy the message below and send it to",
    copyLabel: "Copy the message",
    copied: "Copied",
    copyFailed: "Select the message and copy it",
    againLabel: "Open the draft again",
    draft: {
      subjectPrefix: "Session enquiry: ",
      greeting: "Hello Ivana,",
      opening: "I would like to ask about a session.",
      purposeHeading: "Who the session is for, and what I have in mind:",
      signOff: "Prepared on statenotsituation.com. This is an enquiry, not a booking.",
    },
    back: { label: "Back to talks and workshops", href: "/en/invite" },
  },

  events: {
    eyebrow: "Public events",
    title: "Come to a talk, reading or workshop.",
    intro: "Join Ivana for a public event exploring the ideas in State. Not Situation. Come curious—no prior reading is needed.",
    upcomingLabel: "Upcoming",
    pastLabel: "Past events",
    emptyTitle: "New dates will be listed here.",
    emptyText: "There are no upcoming public events listed at the moment. If you’d like to attend a future workshop, you can ask Ivana about her plans.",
    attendee: {
      label: "Ask about future workshops",
      subject: "Question about future public workshops",
      body: "Hello Ivana,\n\nI am interested in attending a future public workshop. Could you share any confirmed plans?\n\nThank you.",
      hint: "Opens an email draft for you to send. This does not reserve a place or sign you up for updates.",
    },
    hostQuestion: "Have a group or venue in mind?",
    hostLabel: "Invite Ivana to your event",
    detailLink: "View event details",
    back: "All events",
    otherEvents: "View other events",
    seeUpcoming: "View upcoming events",
    rows: { date: "Date", time: "Time", place: "Place", language: "Language", price: "Price", contact: "Organiser" },
    status: {
      announced: "Booking details to follow",
      bookable: "Booking open",
      sold_out: "Sold out",
      cancelled: "Cancelled",
      past: "Taken place",
    },
    statusLine: {
      announced: "Booking details will be added here when confirmed.",
      sold_out: "This event is sold out.",
      cancelled: "This event has been cancelled.",
      past: "This event has taken place.",
    },
    bookIncluded: {
      yes: "A copy of the book is included.",
      no: "The ticket does not include a book.",
      unknown: "Book inclusion details will be confirmed before booking opens.",
    },
    bookTickets: "Book tickets with",
    register: "Register with",
    providerNotice: "Booking and payment take place on the provider’s site, under its terms. Your place is confirmed by the provider.",
    termsLabel: "Read the booking terms",
    sections: {
      expect: "What to expect",
      whoFor: "Who it is for",
      when: "Date and location",
      included: "What your ticket includes",
      access: "Access and practical information",
      terms: "Booking and cancellation terms",
    },
    free: "Free",
  },

  app: {
    eyebrow: "The STATE companion app",
    title: "Another way to explore the book.",
    statusPrefix: "Status",
    liveActionLabel: "Open the app",
    destinationPrefix: "Opens",
    copyByStatus: {
      in_development: {
        statusLabel: "In development",
        body: "A companion app is being developed alongside State. Not Situation. The plan is to explore ideas from the chapters through interactive experiences. More details will be shared here when they are ready.",
        support: "A release date and access details have not yet been announced.",
        stripText: "The STATE companion app is in development.",
        menuLabel: "App — in development",
      },
      live: {
        statusLabel: "Available",
        body: "Visit the STATE companion app to explore its current experiences and access options.",
        support: "",
        stripText: "The STATE companion app is available.",
        menuLabel: "App",
      },
    },
    meanwhile: "While you wait",
    tryScene: "Try a short scene",
  },

  research: {
    eyebrow: "Research and limits",
    title: "What the book draws on—and where its ideas have limits.",
    intro: "State. Not Situation. uses stories and research to explore how we interpret everyday experiences. The research matters, and so does being clear about what it can and cannot explain.",
    questions: {
      title: "Three ways to ask a better question",
      body: "Time, Attention and Safety are the book’s organising ideas. They help readers ask what came before a moment, what keeps drawing their attention and what seems to be at stake. They are not three measured scores, brain regions or a diagnosis.",
    },
    evidence: {
      title: "Not all evidence carries the same weight",
      body: "The book uses evidence markers to distinguish stronger findings from less settled research and emerging ideas. It also includes sources that challenge or complicate its argument.",
      markersLabel: "The book’s evidence markers",
      related: "Evidence for a related process does not, on its own, show that a particular exercise works. A useful question and a proven intervention are different things.",
    },
    situation: {
      title: "The situation still matters",
      body: "Your state can influence an interpretation while a real problem remains. The book offers questions to consider; it does not diagnose a person, dismiss their concerns or replace professional support.",
      chapterLabel: "In the book",
    },
    homeEvidence: { label: "See the book’s evidence markers", href: "/en#evidence" },
  },

  footer: { label: "More ways in" },
};
