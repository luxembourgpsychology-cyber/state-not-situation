import type { SiteContent } from "./types";

/**
 * ENGLISH CONTENT.
 *
 * Every sentence below is one of four things, and nothing else:
 *   1. printed in the almost-final book or on its cover, word for word;
 *   2. supplied by Ivana, word for word;
 *   3. a plain interface label (Play, Press, Email address);
 *   4. a [COPY NEEDED: …] placeholder only Ivana can fill.
 *
 * CONTENT_SOURCES.md lists the page behind each entry. If you add a sentence
 * here, add its source there. Nothing on this site should be sayable about the
 * book that the book does not say about itself.
 *
 * Section order follows translation/EDITORIAL-POSITIONING.md (5 September 2026).
 */
export const en: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description:
      "A field guide to the moment before interpretation becomes reality. Sixteen cases. Three readings. One question: state or situation? By Ivana Budišin.",
    ogImageAlt:
      "The cover of State. Not Situation. by Ivana Budišin: the word STATE set large in red above NOT SITUATION in black, on cream.",
    readTitle: "Read an extract",
    readDescription:
      "The opening pages of State. Not Situation. by Ivana Budišin: a pilot, haze over open water, and one sentence from the Federal Aviation Administration.",
    pressTitle: "Press",
    pressDescription:
      "Press materials for State. Not Situation. by Ivana Budišin: cover art, author photograph, biography, publication details and contact.",
  },

  nav: {
    book: "The book",
    read: "Read",
    listen: "Listen",
    author: "Author",
    press: "Press",
    skipToContent: "Skip to content",
    home: "State. Not Situation. Home",
  },

  status: {
    forthcoming: "Publishing soon",
    published: "Out now",
    publicationDatePrefix: "Published",
    buy: "Buy on Amazon",
    notifyHeading: "Be notified when the book is released.",
    notifyCta: "Be notified",
    emailLabel: "Email address",
    emailPlaceholder: "your@email.com",
    submit: "Notify me",
    success: "Thank you. You will hear from me when the book is out.",
    error: "That did not send. Please try again, or write to me directly.",
    privacyNote: "Used for this notification only.",
    mailtoLabel: "Email me to be notified",
    mailtoSubject: "Tell me when State. Not Situation. is out",
    mailtoBody: "Please let me know when State. Not Situation. is available.",
  },

  hero: {
    // Front cover, all of it.
    eyebrow: "Time · Attention · Safety",
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "A field guide to the moment before interpretation becomes reality",
    strap: "Your first reading is not the whole story.",
    authorPrefix: "by",
    coverAlt:
      "Front cover of State. Not Situation. The word STATE set large in red above NOT SITUATION in black, on a cream ground printed with faint struck-through sentences and small instrument readings.",
    openAlt: "The book open at its title page, which reads State. Not Situation.",
    readCta: "Read an extract",
    scrollHint: "Scroll",
  },

  // Page 10, verbatim, in the order the page sets it.
  misreading: {
    eyebrow: "The first misreading",
    lines: ["Nothing went wrong on this day.", "The instruments were working.", "The data was there the whole time."],
    investigationLabel: "This book is the",
    investigation: "Investigation.",
    readingsLabel: "The same day, five readings",
    readings: [
      { time: "06:38", text: "A heaviness arrives before the day does." },
      { time: "09:12", text: "A two-line email reads like a verdict." },
      { time: "14:23", text: "Five neutral words tighten a jaw." },
      { time: "17:45", text: "An unanswered message starts charging rent." },
      { time: "22:47", text: "Two letters and a full stop feel hostile." },
    ],
    closing: ["The body speaks first.", "The mind explains second."],
  },


  // Page 13, verbatim. The eyebrow is the page's own phrase.
  reading: {
    eyebrow: "Try something right now",
    lead: "Whatever you are feeling as you read this sentence.",
    steps: ["Check your jaw.", "Check your breath.", "Check your shoulders."],
    result: "What you found is a reading.",
    afterResult:
      "A reading of the instrument that is interpreting everything around you, in this moment, including these words. The reading may be accurate. It may not. You cannot know until you have seen the settings.",
    question: "Is this the situation? Or is this the state?",
  },

  book: {
    eyebrow: "The book",
    // Ivana's own words, supplied 5 September 2026.
    paragraphs: [
      "It is less interested in teaching you to trust your instincts than in showing you what, exactly, you are trusting.",
    ],
    readersEyebrow: "Who it is for",
    // Ivana's own words, supplied 5 September 2026.
    readers:
      "For anyone who has ever been certain about what a situation meant, then discovered that something else was happening. And for readers interested in the psychology of how we notice, interpret and revise the world around us.",
  },

  // Pages 7 to 9 of the book, verbatim; the closing line is page 26.
  excerpt: {
    eyebrow: "Read",
    title: "Before the chapters",
    sectionLabel: "The pilot",
    runningHead: "State. Not Situation",
    teaserCount: 2,
    cta: "Read an extract",
    continueCta: "Continue reading",
    back: "Back to the book",
    readingModeLabel: "Reading mode",
    paragraphs: [
      "On the evening of 16 July 1999, a small single engine plane took off from New Jersey. It was heading for Martha’s Vineyard. The pilot was experienced enough to be confident and new enough to be wrong about what that confidence was worth. He had about 300 hours in the air. He had not finished the training that would qualify him to fly using only his instruments.",
      "The sky was clear when he departed so he concluded that he did not need instruments. By the time he reached the coast, it was not. Haze had settled over the water. The sort of haze that erases the line between sea and sky so gradually that you do not notice the horizon is gone until you look for it and it is not there. Over land, this does not matter. There are lights below. You see roads, buildings, a geometry that tells your eyes which way is down. Over open water at night, with haze sitting on the surface like a second darkness, there is nothing. The world outside the cockpit becomes a uniform grey in every direction. Up looks like down. A gentle turn feels like level flight. A slow descent feels like holding steady.",
      "The pilot’s inner ear, the organ that tells the brain which way the body is oriented in space, works by detecting changes in motion. When you enter a turn, the fluid inside the ear shifts, and the brain registers rotation. But if the turn holds steady for fifteen or twenty seconds, the fluid in the inner ear settles. It stops moving. The brain, which tracks movement, not position, concludes that the turn has ended. You feel level, but you are not.",
      "Somewhere over the dark water, the plane entered a gentle left turn. The pilot’s instruments, the dials on the panel in front of him, showed the turn. The artificial horizon, a small gyroscope display that shows the aircraft’s angle relative to the earth, was telling him he was banking. The altimeter was telling him he was descending. The airspeed indicator was telling him he was accelerating. His body was telling him something different. His body was telling him he was flying straight and level. His body felt right. His instruments felt wrong. He trusted his body.",
      "The turn tightened. The nose dropped. The airspeed built. In the final seconds, the plane was descending at more than 4,700 feet per minute, nearly a mile every sixty seconds, in a tightening spiral that pilots call, with the grim precision of a profession that has named the ways it loses people, a graveyard spiral. He hit the water at full speed. He and his two passengers were killed on impact.",
      "The investigation found no mechanical failure. The engine was running. The instruments were working. The data was right there, on the panel, six inches from his eyes, the whole time, but he did not read it. He read his body instead. The American Federal Aviation Administration’s instruction to pilots who find themselves in this situation is one sentence long. It is a literal instruction that applies to your life as directly as it applies to a cockpit:",
      "The pilot’s name was John F. Kennedy Jr. He was the son of an American president. He had been advised not to fly that night without his instructor. He told his instructor he wanted to do it alone. He was thirty-eight years old.",
      "You operate a body that produces signals and your mind often treats those signals as truth. The signals are sometimes as wrong as the inner ear’s vestibular system over dark water. The tiredness that presents itself as a question about your career. The caffeine spike that presents itself as anxiety about an email. The low blood sugar that presents itself as evidence that your relationship is failing. Your body speaks first and your mind explains second. The explanation, because it arrives with the full weight of physical conviction, the tight jaw, the fast heartbeat, the heat behind the ears, feels like deep knowledge. It feels like you are reading the situation. But you are only reading the instrument that is reading the situation, and the instrument’s settings were off before the situation arrived. These instruments exist. You have them. Heart rate, jaw tension, breathing depth, shoulder position, the speed of your thoughts. They are producing data right now, as you read this sentence. But the body’s confident weather report about the world is only a draft.",
    ],
    quoteAfter: 5,
    quote: "“have confidence in your instruments and ignore all conflicting signals your body gives you.”",
    closing:
      "This book is about the same error at kitchen scale. The version that happens every Tuesday. The version where your body writes a story about a message, a silence, a look, and your mind edits that story under the supervision of whatever your body is feeling at the time. Nobody dies, but decisions get made. Relationships change. Self-assessments form. And none of it had to happen the way it did, because the data was right there the whole time.",
    closingSource: "Page 26",
    endNote: "Chapter Zero follows: A Day That Should Have Been Fine.",
    unavailable: "The extract in this language will follow.",
    folios: ["7", "8", "9"],
  },

  // Four CASE EVIDENCE pages, reproduced from the book; the closing line is page 20.
  cases: {
    eyebrow: "Case evidence",
    pageLabel: "Page",
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
      {
        chapter: "13",
        page: 182,
        time: "22:40",
        quote: "“This is state, not situation.”",
        inputLabel: "Input",
        input: "Low fuel. Dead light. A sound on grit.",
        verifiedLabel: "Verified threat",
        verified: "Not yet visible.",
      },
    ],
    closing: "It said I am failing; the data was I am tired.",
    closingSource: "Page 20",
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

  map: {
    eyebrow: "A map of the book",
    // Page 13.
    sortingTool:
      "The chapters that follow are organised around three systems that shape how your body’s signals get weighted before your mind builds a story. They are not brain regions or neural pathways. They are a sorting tool, a way to ask three questions when everything feels wrong at once.",
    // Pages 13 to 14.
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
        body: "The system that monitors threat, and especially social threat. Things like social evaluation, exclusion, ambiguity, status. It is fast, it is old, and it is biased toward false alarms. It produces interpretations that feel like facts.",
      },
    ],
    // Page 13, "Before We Begin", both paragraphs, verbatim.
    evidenceEyebrow: "Before we begin",
    evidenceIntro:
      "This book makes claims about the brain and the body and those claims carry different amounts of evidence. Some rest on decades of replicated research. Some rest on newer findings that are promising but not yet settled. Some claims are plausible extensions of established science that have not been directly tested in the specific form this book describes. You should know which is which.",
    evidenceMarkers:
      "Throughout the book scientific claims carry a confidence marker. When a finding rests on solid, replicated evidence, you will see a graphic marked as high evidence and illustrated with a deep red heartbeat on the margin. When the evidence is suggestive but incomplete it is noted as medium evidence with an orange heartbeat. When a claim is a plausible hypothesis that needs stronger tests, it is marked as low in faded grey. These markers exist because the book’s own risk is the same risk it describes. It does not want to treat a plausible story as settled truth. These markers are a brake on that.",
    grades: [
      { key: "high", label: "High" },
      { key: "medium", label: "Medium" },
      { key: "low", label: "Low" },
    ],
    // Page 11.
    investigationTitle: "The Investigation",
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
    mapFooter: "The Scientific Heartbeat follows the chapters.",
    // Page 226.
    heartbeat: [
      "Each chapter has three parts here: a short note on where the thinking came from, a list of the work the chapter is built on, and a list of the work that limits it, complicates it, or explains the same evidence differently.",
      "Leaving them out would make the argument look tidier than it is.",
    ],
    heartbeatSource: "Page 226",
  },

  author: {
    eyebrow: "The author",
    title: "Ivana Budišin",
    photoAlt: "Ivana Budišin, photographed against a dark grey background.",
    photoPlaceholder: "Author photograph to follow",
    bio: "Ivana Budišin is a clinical psychologist living and working in Luxembourg. State. Not Situation. is her first book.",
    websiteLabel: "Practice website",
    contactLabel: "Contact",
    pressLabel: "Press materials",
  },

  // Page 225, the book's last sentence.
  closing: {
    question: "Is this the situation? Or is this their state?",
    source: "Page 225",
  },

  companion: {
    eyebrow: "Alongside the book",
    line: "[COPY NEEDED: one sentence about the companion tool, if you want it mentioned before it exists. Otherwise set companion.enabled to false in site.config.ts and this section disappears.]",
  },

  press: {
    eyebrow: "Press",
    title: "Press materials",
    intro:
      "Review copies, print and digital, are available on request. Extract licensing, interviews and events by arrangement.",
    contactHeading: "Contact",
    assetsHeading: "Downloads",
    assets: [
      { label: "Front cover, high resolution", file: "/press/cover-front-2400.jpg", note: "JPEG, 2400 px wide" },
      { label: "Author photograph", file: "/press/author-photo-1600.jpg", note: "JPEG, 1600 × 1600" },
      { label: "Book render, transparent background", file: "/press/mockup-3d-transparent.png", note: "PNG" },
      { label: "Web banner", file: "/press/banner-web-2400x1000.jpg", note: "JPEG, 2400 × 1000" },
      { label: "Social image, square", file: "/press/post-1x1-1080.jpg", note: "JPEG, 1080 × 1080" },
      { label: "Social image, portrait", file: "/press/post-4x5-1080x1350.jpg", note: "JPEG, 1080 × 1350" },
      { label: "Social image, landscape", file: "/press/post-16x9-1920x1080.jpg", note: "JPEG, 1920 × 1080" },
      { label: "The opening extract", file: "/press/excerpt-the-opening.pdf", note: "PDF, four pages" },
    ],
    photoUnavailable: "Author photograph available on request.",
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
      { label: "Publisher", value: "Budisin Publishing, Luxembourg" },
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
      "16 cases. Three readings. One question: state or situation?",
      "Each chapter has three parts here: a short note on where the thinking came from, a list of the work the chapter is built on, and a list of the work that limits it, complicates it, or explains the same evidence differently.",
      "Leaving them out would make the argument look tidier than it is.",
    ],
    creditsHeading: "Credits",
    credits: [
      { label: "Cover design", value: "Zoe Larusson" },
      { label: "Book design and typesetting", value: "Ivana Budišin" },
      { label: "Published by", value: "Budisin Publishing" },
    ],
    back: "Back to the book",
  },

  footer: {
    band: "Before you believe the story.",
    // Page 278.
    method: ["Read the dashboard.", "Delay the story.", "Take the reading again."],
    rights: "© 2026 Budisin Publishing",
    pressLink: "Press",
    contactLink: "Contact",
    madeLine: "Same life. Different instrument settings.",
  },

  a11y: {
    mainLandmark: "Main content",
    coverFigure: "The book",
    languageSwitcher: "Choose language",
    languageComing: "edition to follow",
    casesRegion: "Case evidence pages from the book",
    bookOpening: "The book, opening",
    misreadingRegion: "Page 10 of the book",
    mapRegion: "A map of the book",
    evidenceRegion: "Confidence markers, page 13",
  },
};
