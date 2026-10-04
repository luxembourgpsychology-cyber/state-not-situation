import type { SiteContent } from "./types";

/**
 * ENGLISH CONTENT — the canonical source language.
 *
 * Every string below is one of exactly four things:
 *   1. printed in the book or on its cover, word for word;
 *   2. written by Ivana and given to the team, word for word;
 *   3. a plain functional interface label;
 *   4. a [COPY NEEDED: …] placeholder only Ivana can fill.
 *
 * CONTENT_SOURCES.md records the page or the date behind every line. If you
 * add a sentence, add its source there. If you cannot cite one, write a
 * placeholder instead.
 *
 * The structure follows brief/REDESIGN.md (6 September 2026).
 */
export const en: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description:
      "Why your body decides what a moment means before you do. Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book.",
    ogImageAlt:
      "State. Not Situation. by Ivana Budišin. Why your body decides what a moment means before you do.",
    readTitle: "Read an extract",
    readDescription: "The opening pages of State. Not Situation. by Ivana Budišin.",
    pressTitle: "Press",
    pressDescription:
      "Press materials for State. Not Situation. by Ivana Budišin: cover, author photograph, publication details, extract.",
  },

  nav: {
    home: "State. Not Situation., home",
    book: "Book",
    read: "Extract",
    author: "Author",
    press: "Press",
    listen: "Listen",
    skipToContent: "Skip to content",
    menu: "Menu",
    closeMenu: "Close",
  },

  status: {
    forthcoming: "Publishing soon",
    published: "Published",
    publicationDatePrefix: "Published",
    forthcomingDatePrefix: "Publishing",
    buy: "Buy on Amazon",
    notifyCta: "Publication updates",
    // Interface, 4 October 2026: the form offers the first 16 pages, as printed.
    offer: {
      cta: "Get the first 16 pages free",
      line: "The opening and all of Chapter Zero, exactly as printed. Your copy is ready the moment you sign up, and you hear once more, when the book is out.",
      submit: "Send me the pages",
      success: "Here are your pages. You will hear once more, when the book is out.",
      download: "Download the first 16 pages (PDF)",
      privacy: "Used for these pages and one publication email. Nothing else.",
    },
    emailLabel: "Email address",
    emailPlaceholder: "your@email.com",
    submit: "Notify me",
    success: "Thank you. You will hear once, when the book is out.",
    error: "That did not send. Please try again, or email me directly.",
    privacyNote: "Used for this notification only.",
    mailtoSubject: "State. Not Situation. — publication updates",
    mailtoBody: "Please let me know when the book is published.",
  },

  hero: {
    // Front cover and title page, page iii.
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "Why your body decides what a moment means before you do",
    strap: "Your first reading is not the whole story.",
    authorPrefix: "by",
    // The author's own, 6 September 2026, compressed from her biography sentence (v44 prints no biography).
    credential: "Clinical psychologist, Luxembourg",
    coverAlt:
      "Front cover of State. Not Situation. On a deep red ground, a cream panel carries the strapline, the subtitle in red italic, and the word STATE set very large in red above NOT SITUATION in black. Under them, in a bracketed box, Your body speaks first, your mind explains second. The author’s name stands at the foot, on the red.",
    readCta: "Read an extract",
  },

  premise: {
    // Page 4, and the back cover, print the same eyebrow.
    eyebrow: "The first misreading",
    // Page 175.
    sensorLine: "The body is a sensor before it is a narrator.",
    // Back cover, the headline set under the same eyebrow. The most direct
    // statement of the book's claim, and printed. It replaced page 4’s three
    // lines, which read on screen as qualifications rather than as a claim.
    lines: [
      "You may not be reacting to the world.",
      "You may be reacting to your state.",
    ],
    // The back cover, verbatim.
    mechanism: [
      "We usually treat these moments as information about life: the person, the task, the relationship, the day.",
      "But the first reading is often not the whole story.",
      "Before the mind explains, the body has already voted. Sleep pressure, hunger, timing, attention, threat detection, memory, and prediction quietly shape what feels true.",
      "Then the mind arrives second and gives that feeling a reason.",
    ],
    folio: "4",
  },

  // Page 7, verbatim. The eyebrow is the page's own phrase.
  reading: {
    eyebrow: "Try something right now",
    lead: "Whatever you are feeling as you read this sentence.",
    steps: ["Check your jaw.", "Check your breath.", "Check your shoulders."],
    result: "What you found is a reading.",
    folio: "7",
  },

  variables: {
    // Page 7.
    sortingLines: [
      "They are not brain regions or neural pathways.",
      "They are a sorting tool, a way to ask three questions when everything feels wrong at once.",
    ],
    // Page 9, "Three ways to read a moment", verbatim. v50 sets the three
    // systems as three questions; the pages 7 to 8 definitions the site used
    // before are three paragraphs, and on a screen they read as lectures. A
    // question invites an answer. The long definitions are retired from the
    // site; page 7's own passage on the three systems is still on /press.
    loops: [
      {
        key: "time",
        name: "Time",
        body: "What came before this moment? Sleep, meals, caffeine, recovery, the hour.",
      },
      {
        key: "attention",
        name: "Attention",
        body: "What keeps pulling me back? A message, a thought, a cue, an unfinished task.",
      },
      {
        key: "safety",
        name: "Safety",
        body: "What seems at stake? What have I observed, what am I assuming, and does anything need action?",
      },
    ],
    folio: "7",
  },

  // Page 4 of v50, whole. The five readings and the line under them are
  // printed; the page's own three opening lines ("Nothing went wrong on this
  // day…") are deliberately not here — the author cut them from the site on
  // 6 September 2026 because at lead size they read as qualifications rather
  // than a claim. See CONTENT_SOURCES.md, "Page 4 rebuilt".
  moments: {
    // Page 5.
    line: "16 cases. Three readings. One question: state or situation?",
    // Page 4.
    title: "The same day, five readings",
    items: [
      { time: "06:38", line: "A heaviness arrives before the day does." },
      { time: "09:12", line: "A two-line email reads like a judgement." },
      { time: "14:23", line: "Five neutral words tighten a jaw." },
      { time: "17:45", line: "An unanswered message starts charging cognitive rent." },
      { time: "22:47", line: "Two letters and a full stop feel hostile." },
    ],
    // Page 4, and the sentence Dr Herber's foreword calls the book's most
    // memorable. It had never been on the site.
    closing: "The body speaks first. The mind explains second.",
    folio: "4",
  },

  evidence: {
    title: "Evidence",
    // Labels printed on page 7; descriptions supplied by the author, 6 September 2026.
    grades: [
      { key: "high", label: "High", description: "Replicated or robust evidence." },
      { key: "medium", label: "Medium", description: "Suggestive evidence with meaningful uncertainty." },
      { key: "low", label: "Low", description: "Plausible hypothesis or emerging evidence." },
    ],
    // Page 7.
    closing: "These markers exist because the book’s own risk is the same risk it describes.",
    folio: "7",
  },

  // The foreword, printed in the front matter of the final interior, pages v
  // to ix. The credit is the author's own, supplied 28 September 2026, word
  // for word: Dr Kristina Herber, Managing Director, AIHE Academic Institute
  // for Higher Education. `quote` stays empty until she clears a passage of
  // the foreword for the site; the section does not render without one, and
  // the credit shows on the first screen and the press sheet either way.
  foreword: {
    eyebrow: "Foreword",
    credit: "With a foreword by Dr Kristina Herber",
    name: "Dr Kristina Herber",
    role: "Managing Director",
    organisation: "AIHE Academic Institute for Higher Education",
    // Dr Herber's own words, from Foreword.pdf, verbatim. Two beats: the
    // sentence pair sets at DISPLAY, the paragraph under it at BODY. They are
    // chosen to stand under the Evidence section without repeating it — the
    // book says its own risk is the risk it describes, and the foreword
    // confirms that from outside the book.
    quote: [
      "Our first interpretation is not necessarily wrong. But it does not have to be our last.",
      "A book that cautions us against confusing a persuasive interpretation with certainty also applies scrutiny to its own interpretations.",
    ],
  },

  // Pages 1 to 3 of the book, verbatim, checked word for word against the
  // final interior (v44) on 14 September 2026. v44 prints "The mist, the one
  // that erases…" and "The turn tightened." where the text the author
  // supplied on 6 September had "The mist came, …" and "Then turn tightened.";
  // the site follows the printed page. The closing line is page 20.
  excerpt: {
    title: "Before the chapters",
    sectionLabel: "The pilot",
    // Ivana's own words, supplied 5 September 2026.
    lead: "It is less interested in teaching you to trust your instincts than in showing you what, exactly, you are trusting.",
    teaserCount: 2,
    paragraphs: [
      "On the evening of 16 July 1999, a small single engine plane took off from New Jersey. It was heading for Martha’s Vineyard. The pilot was experienced enough to be confident and new enough to be wrong about what that confidence meant. He had about 300 hours in the air. He had not finished the training that would qualify him to fly using only his instruments.",
      "The sky was clear when he departed so he concluded that he did not need instruments. By the time he reached the coast, a haze had settled over the water. The mist, the one that erases the line between sea and sky so gradually that you do not notice the horizon is gone until you look for it and it is not there. Over land there are lights below. You see roads, buildings, a geometry that tells your eyes which way is down. Over open water at night, with haze sitting on the surface like a second darkness, there is nothing. The world outside the cockpit becomes a uniform grey in every direction. Up looks like down. A gentle turn feels like level flight. A slow descent feels like holding steady.",
      "The pilot’s inner ear, the organ that tells the brain which way the body is oriented in space, works by detecting changes in motion. When you enter a turn, the fluid inside the ear shifts, and the brain registers rotation. But if the turn holds steady for fifteen or twenty seconds, the fluid in the inner ear settles. It stops moving. The brain, which tracks movement, concludes that the turn has ended. You feel level, but you are not.",
      "Somewhere over the dark water, the plane entered a gentle left turn. The pilot’s instruments, the dials on the panel in front of him, showed the turn. The artificial horizon, a small gyroscope display that shows the aircraft’s angle relative to the earth, was telling him clearly that he was banking. The altimeter was telling him he was descending. The airspeed indicator was telling him he was accelerating. His body was telling him something different. His body was telling him he was flying straight and level. His body felt right. His instruments felt wrong. He trusted his body.",
      "The turn tightened. The nose dropped. The airspeed built. In the final seconds, the plane was descending at more than 4,700 feet per minute, nearly a mile every sixty seconds, in a tightening spiral that pilots call, with the grim precision of a profession that has named the ways it loses people, a graveyard spiral. He hit the water at full speed. He and his two passengers were killed on impact.",
      "The investigation found no mechanical failure. The engine was running. The instruments were working. The data was right there, on the panel, six inches from his eyes, the whole time, but he did not read it. He read his body instead. The American Federal Aviation Administration’s instruction to pilots who find themselves in this situation is one sentence long. It is a literal instruction that applies to your life as directly as it applies to a cockpit:",
      "The pilot’s name was John F. Kennedy Jr. He was the son of an American president. He had been advised not to fly that night without his instructor. He told his instructor he wanted to do it alone. He was thirty-eight years old.",
      "You operate a body that produces signals and your mind often treats those signals as truth. The signals are sometimes as wrong as the inner ear’s vestibular system over dark water. The tiredness that presents itself as a question about your career. The caffeine spike that presents itself as anxiety about an email. The low blood sugar that presents itself as evidence that your relationship is failing. Your body speaks first and your mind explains second. The explanation, because it comes with the full weight of physical conviction, the tight jaw, the fast heartbeat, the heat behind the ears, feels like deep knowledge. It feels like you are reading the situation. But you are only reading the instrument that is reading the situation, and the instrument’s settings were off before the situation arrived. These instruments exist. You have them. Heart rate, jaw tension, breathing depth, shoulder position, the speed of your thoughts. They are producing data right now, as you read this sentence. But the body’s confident weather report about the world is only a draft.",
    ],
    quoteAfter: 5,
    quote: "“have confidence in your instruments and ignore all conflicting signals your body gives you.”",
    continueCta: "Continue reading",
    back: "Back to the book",
    readingModeLabel: "Reading mode",
    // Page 20.
    closing:
      "This book is about the same error at kitchen scale. The version that happens every Tuesday. The version where your body writes a story about a message, a silence, a look, and your mind edits that story under the supervision of whatever your body is feeling at the time. Nobody dies, but decisions get made. Relationships change. Self-assessments form. And none of it had to happen the way it did, because the data was right there the whole time.",
    closingSource: "Page 20",
    endNote: "Chapter Zero follows: A Day That Should Have Been Fine.",
    unavailable: "The extract in this language will follow.",
    folios: ["1", "2", "3"],
  },

  // The sixteen names, as page 292 lists them, word for word, with the pages
  // that page gives. Every chapter of v50 now closes on one. This replaced the
  // fifteen chapter-opening instrument readings on 30 September 2026: the book
  // stopped printing those values, and the openers now carry a question and
  // three plain phrases instead.
  names: {
    // Page 292.
    title: "Sixteen names.",
    label: "A name for it",
    pageLabel: "Page",
    // Page 292, under the list.
    note: "Each name closes its chapter. The page number is where the entry sits.",
    items: [
      { number: "00", name: "Narrating mode", page: 16 },
      { number: "01", name: "Misattribution", page: 24 },
      { number: "02", name: "The smoke detector principle", page: 36 },
      { number: "03", name: "Variable reward", page: 50 },
      { number: "04", name: "Wanting and liking", page: 66 },
      { number: "05", name: "Wake Maintenance Zone", page: 80 },
      { number: "06", name: "Default mode network", page: 96 },
      { number: "07", name: "Evaluation threat", page: 107 },
      { number: "08", name: "Rumination", page: 126 },
      { number: "09", name: "Demand–withdraw", page: 141 },
      { number: "10", name: "Metacognition", page: 158 },
      { number: "11", name: "Stacking", page: 176 },
      { number: "12", name: "Prediction error", page: 196 },
      { number: "13", name: "Calibration", page: 210 },
      { number: "14", name: "Warm panel", page: 222 },
      { number: "15", name: "Forecast", page: 239 },
    ],
    // Page 24, whole. Chapter 01's three examples are the three the extract
    // already gives as prose, six sections above: tiredness as a question
    // about a career, caffeine as worry about an email, low blood sugar as
    // doubt about a relationship. The reader meets them twice, the second
    // time with a name on them.
    example: {
      number: "01",
      name: "Misattribution",
      body: "Giving a feeling the wrong cause. The body produces the feeling. The mind looks for a reason and takes the nearest one. The feeling is real. The reason is a guess.",
      showsUpLabel: "How it shows up",
      showsUp: [
        "Tiredness that arrives as a question about your career.",
        "Coffee on an empty stomach that arrives as worry about an email.",
        "Low blood sugar that arrives as doubt about a relationship.",
      ],
      tryLabel: "Try it",
      tryIt: "Before acting on a confident judgement, name one fact that could change your mind.",
      page: 24,
    },
  },

  listen: {
    eyebrow: "Listen",
    title: "Listen to an extract",
    subtitle: "Read by the author",
    play: "Play",
    pause: "Pause",
    progress: "Playback position",
    elapsed: "Elapsed",
    duration: "Duration",
    unavailable: "The recording will be added here.",
  },

  author: {
    title: "Ivana Budišin",
    photoAlt: "Ivana Budišin, photographed against a dark grey background.",
    photoPlaceholder: "Author photograph to follow",
    // Ivana's own words, supplied 4 September 2026.
    bio: "Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book.",
    // Ivana's own words, supplied 5 September 2026.
    readers:
      "For anyone who has ever been certain about what a situation meant, then discovered that something else was happening. And for readers interested in the psychology of how we notice, interpret and revise the world around us.",
    pressLabel: "Press",
  },

  closing: {
    // Page 238 of v50. The book follows it with one more sentence —
    // "What belongs to the situation, and what might state be adding?" —
    // so it is no longer the last.
    question: "Is this the situation? Or is this their state?",
    source: "Page 238",
    // Front cover foot and title page.
    line: "Same life. Different instrument settings.",
  },

  press: {
    eyebrow: "Press",
    title: "Press materials",
    intro:
      "Review copies, print and digital, are available on request. Extract licensing, interviews and events by arrangement.",
    contactHeading: "Contact",
    assetsHeading: "Downloads",
    kitLabel: "Download complete press kit",
    assets: [
      { label: "Front cover, print resolution", file: "/press/cover-front-300dpi.png", note: "PNG · 1800 × 2700" },
      { label: "Full cover, print resolution", file: "/press/cover-wrap-300dpi.png", note: "PNG · 3805 × 2700" },
      { label: "Cover, print ready", file: "/press/cover-print-6x9.pdf", note: "PDF · 6 × 9 in" },
      { label: "Author photograph", file: "/press/author-photo-1600.jpg", note: "JPEG · 1600 × 1600" },
      { label: "The opening extract", file: "/press/State-Not-Situation-extract-the-opening.pdf", note: "PDF · 3 pp" },
      { label: "Web banner", file: "/press/banner-web-2400x1000.jpg", note: "JPEG · 2400 × 1000" },
      { label: "Social image, square", file: "/press/post-1x1-1080.jpg", note: "JPEG · 1080 × 1080" },
    ],
    photoUnavailable: "Author photograph available on request.",
    // The author named the photographer, 6 September 2026.
    photoCredit: "Photograph: Zoe Larusson",
    bioHeading: "Biography",
    bios: [
      {
        label: "Short",
        text: "Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book.",
      },
      {
        label: "Long",
        // Ivana's own words, from her About the author page, supplied
        // 28 September 2026. No page is cited: v47's pagination is still
        // moving and she has said the page is not at the end of the book.
        text: "Before psychology, Ivana Budišin worked in design and product design. She later moved into applied psychology and is now a clinical psychologist, with a continuing interest in research and cognitive science. Born in the United States, she has lived in US, Serbia and Luxembourg and is now a Luxembourger. She runs Luxembourg Psychology. State. Not Situation. brings those interests together: how we experience the world, and how we might make that experience easier to understand.",
      },
    ],
    factsHeading: "Publication",
    publicationFactLabel: "Publication",
    forewordLabel: "Foreword",
    facts: [
      { label: "Title", value: "State. Not Situation." },
      { label: "Subtitle", value: "Why your body decides what a moment means before you do" },
      { label: "Author", value: "Ivana Budišin" },
      { label: "Publication", value: "2026" },
      { label: "Format", value: "Paperback, 6 × 9 in" },
      // v47, the author's figure, 28 September 2026. The page references
      // elsewhere on the site are still v44's and move when v47 is final.
      { label: "Extent", value: "304 pages" },
      { label: "ISBN-13", value: "978-2-87996-258-0" },
      { label: "Category", value: "Psychology / Cognitive psychology" },
      { label: "Language", value: "English. French and German editions to follow." },
      { label: "Legal deposit", value: "Bibliothèque nationale du Luxembourg" },
    ],
    descriptionHeading: "About the book",
    description: [
      "It is less interested in teaching you to trust your instincts than in showing you what, exactly, you are trusting.",
      "For anyone who has ever been certain about what a situation meant, then discovered that something else was happening. And for readers interested in the psychology of how we notice, interpret and revise the world around us.",
    ],
    // Page 5, relocated here whole. Pages are v50.
    mapHeading: "The chapters",
    mapLabel: "This book is the",
    mapTitle: "Investigation.",
    mapLine: "16 cases. Three readings. One question: state or situation?",
    pageColumn: "Page",
    chapters: [
      { number: "00", title: "A Day That Should Have Been Fine", page: 11 },
      { number: "01", title: "The Radar Was Right", page: 17 },
      { number: "02", title: "Why Sleep Loss Makes Neutral Input Feel Hostile", page: 25 },
      { number: "03", title: "The Relief That Becomes Itch", page: 37 },
      { number: "04", title: "The Predictable Cue", page: 51 },
      { number: "05", title: "Why Evenings Stretch and Mornings Shrink", page: 69 },
      { number: "06", title: "Why Rest Doesn’t Always Restore", page: 81 },
      { number: "07", title: "Why You Cannot Start the Thing That Matters", page: 97 },
      { number: "08", title: "The Open File", page: 109 },
      { number: "09", title: "Two Nervous Systems Walk Into a Kitchen", page: 127 },
      { number: "10", title: "The Argument That Was Tuesday", page: 143 },
      { number: "11", title: "The Thursday That Was Wednesday Night", page: 161 },
      { number: "12", title: "The Clean Panel", page: 179 },
      { number: "13", title: "The Time the Body Was Right", page: 197 },
      { number: "14", title: "Not About Me", page: 211 },
      { number: "15", title: "The Forecast", page: 223 },
    ],
    // Page 7.
    sortingTool:
      "The chapters that follow are organised around three systems that shape how your body’s signals get weighted before your mind builds a story. They are not brain regions or neural pathways. They are a sorting tool, a way to ask three questions when everything feels wrong at once.",
    sourcesHeading: "Sources and evidence",
    // Page 220, The Scientific Heartbeat.
    sources: [
      "Each chapter has three parts here: a short note on where the thinking came from, a list of the work the chapter is built on, and a list of the work that limits it, complicates it, or explains the same evidence differently.",
      "Leaving them out would make the argument look tidier than it is.",
    ],
    sourcesLabel: "The Scientific Heartbeat, page 242",
    creditsHeading: "Credits",
    credits: [
      { label: "Cover design", value: "Zoe Larusson" },
      // Author-supplied, 6 September 2026; the copyright page does not list it.
      { label: "Photography", value: "Zoe Larusson" },
      { label: "Book design and typesetting", value: "Ivana Budišin" },
      { label: "Published by", value: "Budisin Publishing" },
    ],
    back: "Back to the book",
  },

  footer: {
    // Back cover, the sign-off under the paragraph: CHECK THE SIGNAL /
    // BEFORE YOU BELIEVE THE STORY. (The final cover of 14 September 2026
    // moved it out of the red band, which now carries the QR and the ISBN.)
    band: "Before you believe the story.",
    pressLink: "Press",
    contactLink: "Contact",
    // Copyright page, page iv.
    rights: "© 2026 Budisin Publishing",
    translationNote:
      "The book is published in English; these pages were translated from it by AI.",
  },

  a11y: {
    mainLandmark: "Main content",
    coverFigure: "The book",
    languageSwitcher: "Choose language",
    menu: "Menu",
  },
};
