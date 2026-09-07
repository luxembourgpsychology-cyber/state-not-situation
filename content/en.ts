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
      "A field guide to the moment before interpretation becomes reality. Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book.",
    ogImageAlt:
      "State. Not Situation. by Ivana Budišin. A field guide to the moment before interpretation becomes reality.",
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
    buy: "Buy on Amazon",
    notifyCta: "Publication updates",
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
    // Front cover and title page, page 3.
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "A field guide to the moment before interpretation becomes reality",
    strap: "Your first reading is not the whole story.",
    authorPrefix: "by",
    // The author's own, 6 September 2026, compressed from her printed biography.
    credential: "Clinical psychologist, Luxembourg",
    coverAlt:
      "Front cover of State. Not Situation. The word STATE set large in red above NOT SITUATION in black, on a cream ground printed with faint struck-through sentences and small instrument readings.",
    readCta: "Read an extract",
  },

  premise: {
    // Page 10, and the back cover, print the same eyebrow.
    eyebrow: "The first misreading",
    // Page 181.
    sensorLine: "The body is a sensor before it is a narrator.",
    // Back cover, the headline set under the same eyebrow. The most direct
    // statement of the book's claim, and printed. It replaced page 10's three
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
    folio: "10",
  },

  // Page 13, verbatim. The eyebrow is the page's own phrase.
  reading: {
    eyebrow: "Try something right now",
    lead: "Whatever you are feeling as you read this sentence.",
    steps: ["Check your jaw.", "Check your breath.", "Check your shoulders."],
    result: "What you found is a reading.",
    folio: "13",
  },

  variables: {
    // Page 13.
    sortingLines: [
      "They are not brain regions or neural pathways.",
      "They are a sorting tool, a way to ask three questions when everything feels wrong at once.",
    ],
    // Pages 13 to 14. Safety's list of examples is not shown; see CONTENT_SOURCES.md.
    loops: [
      {
        key: "time",
        name: "Time",
        body: "Sleep, food, caffeine, circadian phase, recovery. When the timing is off, baseline sensitivity rises. The same world feels harsher.",
      },
      {
        key: "attention",
        name: "Attention",
        body: "The system that tracks reward, novelty, and the next cue. When it is captured, focus narrows to the cheapest available input, and the expensive work feels hard.",
      },
      {
        key: "safety",
        name: "Safety",
        body: "The system that monitors threat, and especially social threat. It is fast, it is old, and it is biased toward false alarms. It produces interpretations that feel like facts.",
      },
    ],
    folio: "13",
  },

  moments: {
    // Page 11.
    line: "16 cases. Three readings. One question: state or situation?",
    label: "Case evidence",
    pageLabel: "Page",
    // Three CASE EVIDENCE pages, reproduced.
    items: [
      {
        chapter: "00",
        page: 16,
        time: "06:38",
        quote: "“Something is off.”",
        inputLabel: "Input",
        input: "Two minutes before the alarm.",
        verifiedLabel: "Verified event",
        verified: "Nothing has happened.",
      },
      {
        chapter: "02",
        page: 28,
        time: "22:47",
        quote: "“ok.”",
        inputLabel: "Input",
        input: "Two letters. One full stop.",
        verifiedLabel: "Verified tone",
        verified: "None.",
      },
      {
        chapter: "11",
        page: 150,
        time: "16:00",
        quote: "“Something is wrong with my life.”",
        inputLabel: "Input",
        input: "Six ordinary events. One depleted day.",
        verifiedLabel: "Verified crisis",
        verified: "None.",
      },
    ],
    // Page 20.
    closing: "It said I am failing; the data was I am tired.",
    closingSource: "Page 20",
  },

  evidence: {
    title: "Evidence",
    // Labels printed on page 13; descriptions supplied by the author, 6 September 2026.
    grades: [
      { key: "high", label: "High", description: "Replicated or robust evidence." },
      { key: "medium", label: "Medium", description: "Suggestive evidence with meaningful uncertainty." },
      { key: "low", label: "Low", description: "Plausible hypothesis or emerging evidence." },
    ],
    // Page 13.
    closing: "These markers exist because the book’s own risk is the same risk it describes.",
    folio: "13",
  },

  // Pages 7 to 9 of the book, verbatim from the text the author supplied on
  // 6 September 2026, which is v40 plus one further edit ("The mist came, the
  // one that erases…"). The closing line is page 26.
  excerpt: {
    title: "Before the chapters",
    sectionLabel: "The pilot",
    // Ivana's own words, supplied 5 September 2026.
    lead: "It is less interested in teaching you to trust your instincts than in showing you what, exactly, you are trusting.",
    teaserCount: 2,
    paragraphs: [
      "On the evening of 16 July 1999, a small single engine plane took off from New Jersey. It was heading for Martha’s Vineyard. The pilot was experienced enough to be confident and new enough to be wrong about what that confidence meant. He had about 300 hours in the air. He had not finished the training that would qualify him to fly using only his instruments.",
      "The sky was clear when he departed so he concluded that he did not need instruments. By the time he reached the coast, a haze had settled over the water. The mist came, the one that erases the line between sea and sky so gradually that you do not notice the horizon is gone until you look for it and it is not there. Over land there are lights below. You see roads, buildings, a geometry that tells your eyes which way is down. Over open water at night, with haze sitting on the surface like a second darkness, there is nothing. The world outside the cockpit becomes a uniform grey in every direction. Up looks like down. A gentle turn feels like level flight. A slow descent feels like holding steady.",
      "The pilot’s inner ear, the organ that tells the brain which way the body is oriented in space, works by detecting changes in motion. When you enter a turn, the fluid inside the ear shifts, and the brain registers rotation. But if the turn holds steady for fifteen or twenty seconds, the fluid in the inner ear settles. It stops moving. The brain, which tracks movement, concludes that the turn has ended. You feel level, but you are not.",
      "Somewhere over the dark water, the plane entered a gentle left turn. The pilot’s instruments, the dials on the panel in front of him, showed the turn. The artificial horizon, a small gyroscope display that shows the aircraft’s angle relative to the earth, was telling him clearly that he was banking. The altimeter was telling him he was descending. The airspeed indicator was telling him he was accelerating. His body was telling him something different. His body was telling him he was flying straight and level. His body felt right. His instruments felt wrong. He trusted his body.",
      "Then turn tightened. The nose dropped. The airspeed built. In the final seconds, the plane was descending at more than 4,700 feet per minute, nearly a mile every sixty seconds, in a tightening spiral that pilots call, with the grim precision of a profession that has named the ways it loses people, a graveyard spiral. He hit the water at full speed. He and his two passengers were killed on impact.",
      "The investigation found no mechanical failure. The engine was running. The instruments were working. The data was right there, on the panel, six inches from his eyes, the whole time, but he did not read it. He read his body instead. The American Federal Aviation Administration’s instruction to pilots who find themselves in this situation is one sentence long. It is a literal instruction that applies to your life as directly as it applies to a cockpit:",
      "The pilot’s name was John F. Kennedy Jr. He was the son of an American president. He had been advised not to fly that night without his instructor. He told his instructor he wanted to do it alone. He was thirty-eight years old.",
      "You operate a body that produces signals and your mind often treats those signals as truth. The signals are sometimes as wrong as the inner ear’s vestibular system over dark water. The tiredness that presents itself as a question about your career. The caffeine spike that presents itself as anxiety about an email. The low blood sugar that presents itself as evidence that your relationship is failing. Your body speaks first and your mind explains second. The explanation, because it comes with the full weight of physical conviction, the tight jaw, the fast heartbeat, the heat behind the ears, feels like deep knowledge. It feels like you are reading the situation. But you are only reading the instrument that is reading the situation, and the instrument’s settings were off before the situation arrived. These instruments exist. You have them. Heart rate, jaw tension, breathing depth, shoulder position, the speed of your thoughts. They are producing data right now, as you read this sentence. But the body’s confident weather report about the world is only a draft.",
    ],
    quoteAfter: 5,
    quote: "“have confidence in your instruments and ignore all conflicting signals your body gives you.”",
    continueCta: "Continue reading",
    back: "Back to the book",
    readingModeLabel: "Reading mode",
    // Page 26.
    closing:
      "This book is about the same error at kitchen scale. The version that happens every Tuesday. The version where your body writes a story about a message, a silence, a look, and your mind edits that story under the supervision of whatever your body is feeling at the time. Nobody dies, but decisions get made. Relationships change. Self-assessments form. And none of it had to happen the way it did, because the data was right there the whole time.",
    closingSource: "Page 26",
    endNote: "Chapter Zero follows: A Day That Should Have Been Fine.",
    unavailable: "The extract in this language will follow.",
    folios: ["7", "8", "9"],
  },

  // Chapters 01 to 15, each opening page, word for word. Chapter 00 opens on
  // a CASE EVIDENCE panel instead, so there are fifteen readings, not sixteen.
  readings: {
    title: "The readings",
    label: "Reading",
    pageLabel: "Page",
    items: [
      { number: "01", time: "NOT CLAIMED", attention: "DEGRADED", safety: "DOMINANT", page: 23,
        line: "The body makes a verdict before attention tests it." },
      { number: "02", time: "DOMINANT", attention: "CHECKING LOOP", safety: "AMPLIFIED", page: 29,
        line: "Fatigue removes the brake from certainty." },
      { number: "03", time: "IN THE GAPS", attention: "LOOPING", safety: "NOT CLAIMED", page: 39,
        line: "The hand reaches before the mind decides." },
      { number: "04", time: "CUE AT 15:28", attention: "HABIT LOOP", safety: "RISING LATER", page: 51,
        line: "The hand keeps an appointment the mind never made." },
      { number: "05", time: "DOMINANT", attention: "LATE CAPTURE", safety: "NOT CLAIMED", page: 67,
        line: "An hour feels free and bills the morning." },
      { number: "06", time: "MORNING DEBT", attention: "DEGRADED", safety: "RUMINATION", page: 79,
        line: "The weekend does everything right and restores nobody." },
      { number: "07", time: "AFTERNOON DEBT", attention: "FRAGMENTED", safety: "RISING", page: 95,
        line: "The document stays the same; the reader loses range." },
      { number: "08", time: "EVENING", attention: "NARROWED", safety: "DOMINANT", page: 105,
        line: "One word becomes six days of evidence." },
      { number: "09", time: "20 MINUTES UNTAKEN", attention: "HALF-SECOND WINDOW", safety: "DOMINANT", page: 121,
        line: "The conversation ends before its first sentence." },
      { number: "10", time: "07:40 RESET", attention: "SPENT", safety: "RESIDUAL", page: 135,
        line: "The kitchen resets. The body does not." },
      { number: "11", time: "NIGHT-BEFORE DEBT", attention: "SPENT BY 10:00", safety: "FILLING THE GAPS", page: 151,
        line: "Six ordinary things become proof that nothing is fine." },
      { number: "12", time: "NOT CLAIMED", attention: "NARROW, AVAILABLE", safety: "SIGNAL PRESENT", page: 167,
        line: "Nothing is wrong. The jaw will not settle." },
      { number: "13", time: "22:40", attention: "ACCURATE", safety: "CORRECT", page: 183,
        line: "This alarm belongs to forty metres of concrete." },
      { number: "14", time: "PROTECTED", attention: "PLACED", safety: "QUIET", page: 195,
        line: "The day Chapter Zero was supposed to be." },
      { number: "15", time: "FORECAST", attention: "OPEN FILE, NAMED", safety: "NAMED IN ADVANCE", page: 209,
        line: "Tomorrow’s reading, taken tonight." },
    ],
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
    // Page 225, the book's last sentence.
    question: "Is this the situation? Or is this their state?",
    source: "Page 225",
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
      { label: "Front cover, print resolution", file: "/press/cover-front-300dpi.png", note: "PNG · 1801 × 2701" },
      { label: "Full cover, print resolution", file: "/press/cover-wrap-300dpi.png", note: "PNG · 3807 × 2701" },
      { label: "Cover, print ready", file: "/press/cover-print-6x9.pdf", note: "PDF · 6 × 9 in" },
      { label: "Book render", file: "/press/book-render.png", note: "PNG · 1874 × 2782" },
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
        text: "[COPY NEEDED: a longer biography, 100 to 150 words, in your own words. Qualifications, where you practise, and how the book came out of that work. Only what you would be happy to see checked.]",
      },
    ],
    factsHeading: "Publication",
    facts: [
      { label: "Title", value: "State. Not Situation." },
      { label: "Subtitle", value: "A field guide to the moment before interpretation becomes reality" },
      { label: "Author", value: "Ivana Budišin" },
      { label: "Publication", value: "2026" },
      { label: "Format", value: "Paperback, 6 × 9 in" },
      { label: "Extent", value: "278 pages" },
      { label: "ISBN-13", value: "978-2-87996-258-0" },
      { label: "Category", value: "Psychology / Cognitive psychology" },
      { label: "Language", value: "English. French and German editions to follow." },
      { label: "Legal deposit", value: "A CIP record is available at Bibliothèque nationale du Luxembourg." },
    ],
    descriptionHeading: "About the book",
    description: [
      "It is less interested in teaching you to trust your instincts than in showing you what, exactly, you are trusting.",
      "For anyone who has ever been certain about what a situation meant, then discovered that something else was happening. And for readers interested in the psychology of how we notice, interpret and revise the world around us.",
    ],
    // Page 11, relocated here whole.
    mapHeading: "The chapters",
    mapLabel: "This book is the",
    mapTitle: "Investigation.",
    mapLine: "16 cases. Three readings. One question: state or situation?",
    pageColumn: "Page",
    chapters: [
      { number: "00", title: "A Day That Should Have Been Fine", page: 17 },
      { number: "01", title: "The Radar Was Right", page: 23 },
      { number: "02", title: "Why Sleep Loss Makes Neutral Input Feel Hostile", page: 29 },
      { number: "03", title: "The Relief That Becomes Itch", page: 39 },
      { number: "04", title: "The Predictable Cue", page: 51 },
      { number: "05", title: "Why Evenings Stretch and Mornings Shrink", page: 67 },
      { number: "06", title: "Why Rest Doesn’t Always Restore", page: 79 },
      { number: "07", title: "Why You Cannot Start the Thing That Matters", page: 95 },
      { number: "08", title: "The Open File", page: 105 },
      { number: "09", title: "Two Nervous Systems Walk Into a Kitchen", page: 121 },
      { number: "10", title: "The Argument That Was Tuesday", page: 135 },
      { number: "11", title: "The Thursday That Was Wednesday Night", page: 151 },
      { number: "12", title: "The Clean Panel", page: 167 },
      { number: "13", title: "The Time the Body Was Right", page: 183 },
      { number: "14", title: "Not About Me", page: 195 },
      { number: "15", title: "The Forecast", page: 209 },
    ],
    // Page 13.
    sortingTool:
      "The chapters that follow are organised around three systems that shape how your body’s signals get weighted before your mind builds a story. They are not brain regions or neural pathways. They are a sorting tool, a way to ask three questions when everything feels wrong at once.",
    sourcesHeading: "Sources and evidence",
    // Page 226, The Scientific Heartbeat.
    sources: [
      "Each chapter has three parts here: a short note on where the thinking came from, a list of the work the chapter is built on, and a list of the work that limits it, complicates it, or explains the same evidence differently.",
      "Leaving them out would make the argument look tidier than it is.",
    ],
    sourcesLabel: "The Scientific Heartbeat, page 226",
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
    // Back cover, the red band.
    band: "Before you believe the story.",
    pressLink: "Press",
    contactLink: "Contact",
    // Copyright page, page 4.
    rights: "© 2026 Budisin Publishing",
    translationNote:
      "The book is published in English; these pages were translated from it by AI, not yet reviewed by a native speaker. The English text is authoritative.",
  },

  a11y: {
    mainLandmark: "Main content",
    coverFigure: "The book",
    languageSwitcher: "Choose language",
    menu: "Menu",
  },
};
