import type { SiteContent } from "./types";

/**
 * ENGLISH CONTENT. Every word of book copy here is taken from the book, the
 * cover, or the press pack. Anything still needed is marked [COPY NEEDED: ...].
 */
export const en: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description:
      "A field guide to the moment before interpretation becomes reality. Sixteen ordinary days, read twice. By Ivana Budišin. Publishing soon.",
    ogImageAlt:
      "The cover of State. Not Situation. by Ivana Budišin: the word STATE in red on cream, above NOT SITUATION in black.",
    readTitle: "Read an excerpt",
    readDescription:
      "The opening pages of State. Not Situation. by Ivana Budišin: a pilot, a haze over open water, and one sentence from the Federal Aviation Administration.",
    pressTitle: "Press",
    pressDescription:
      "Press materials for State. Not Situation. by Ivana Budišin: cover art, author biography, fact sheet and contact.",
  },
  nav: {
    book: "Book",
    read: "Read",
    listen: "Listen",
    author: "Author",
    press: "Press",
    skipToContent: "Skip to content",
    languageLabel: "Language",
    home: "State. Not Situation. Home",
  },
  status: {
    forthcoming: "Publishing soon",
    published: "Out now",
    publicationDatePrefix: "Published",
    buy: "Buy on Amazon",
    notifyHeading: "Be notified when the book is released.",
    notifyBody:
      "One message when it is available, and nothing else.",
    emailLabel: "Email address",
    emailPlaceholder: "your@email.com",
    submit: "Notify me",
    success: "Thank you. You will hear from me once, when the book is out.",
    error: "That did not go through. Please try again, or write to me directly.",
    privacyNote:
      "Your address is used for this one notification and is not shared.",
    mailtoLabel: "Email me to be notified",
    mailtoSubject: "Tell me when State. Not Situation. is out",
    mailtoBody:
      "Hello Ivana, please let me know when State. Not Situation. is available.",
  },
  hero: {
    eyebrow: "Time · Attention · Safety",
    titleA: "State",
    titleB: "Not Situation",
    subtitle: "A field guide to the moment before interpretation becomes reality",
    strap: "Your first reading is not the whole story.",
    authorPrefix: "by",
    coverAlt:
      "Front cover of State. Not Situation. The word STATE set large in red, NOT SITUATION beneath it in black, on a cream ground printed with faint struck-through sentences and small instrument readings.",
    readCta: "Read the excerpt",
    listenCta: "Listen to an extract",
  },
  proposition: {
    eyebrow: "The first misreading",
    headline: ["You may not be reacting", "to the world.", "You may be reacting"],
    headlineAccent: "to your state.",
    tableHeaders: ["Input", "First reading", "Possible state"],
    tableRows: [
      ["A short message", "feels cold", "sleep pressure"],
      ["A meeting", "feels dangerous", "threat load"],
      ["A craving", "feels like a decision", "cue training"],
      ["A quiet room", "feels like judgment", "attention bias"],
    ],
    paragraphs: [
      "We usually treat these moments as information about life: the person, the task, the relationship, the day.",
      "But the first reading is often not the whole story. Before the mind explains, the body has already voted. Sleep pressure, hunger, timing, attention, threat detection, memory and prediction quietly shape what feels true. Then the mind arrives second and gives that feeling a reason.",
      "Sixteen ordinary days, read twice. Once the way we usually read them, and once with the instrument checked first.",
    ],
    closer: "Check the signal",
    band: "Before you believe the story.",
  },
  day: {
    eyebrow: "Chapter Zero",
    title: "A day, read twice",
    intro:
      "Katrin wakes at 06:38, two minutes before the alarm. Nothing happens to her all morning. Here is the morning the way she read it, and beside it, the reading the instrument would have given.",
    columnFirst: "First reading",
    columnState: "Possible state",
    rows: [
      {
        time: "06:38",
        loop: "time",
        firstReading:
          "She knows immediately that something is off. Nothing hurts, nothing has happened, but she feels off. The word she would use is heavy.",
        state: ["↑ sleep: about five hours", "↑ bedtime: 23:50, by drift, not decision"],
      },
      {
        time: "06:52",
        loop: "attention",
        firstReading:
          "Coffee first, before food. The phone is there and her thumb knows what to do. For three minutes she is somewhere floating over the kitchen.",
        state: ["↑ habit: running four years", "↑ sampling: three minutes, no decision taken", "↑ last meal: none"],
      },
      {
        time: "07:25",
        loop: "safety",
        firstReading:
          "An email from her manager: can we find 15 min today? Nothing urgent. She reads it twice. Is it the restructure, the project review, the comment on Thursday?",
        state: ["↑ caffeine: empty stomach, twenty minutes in", "↑ threat load: elevated", "↑ ambiguity: cannot be left alone"],
      },
      {
        time: "08:05",
        loop: "safety",
        firstReading:
          "The paragraph she left on Friday is not good, and it feels like it is about her. About whether she is the kind of person who can do this work.",
        state: ["↑ jaw: tight", "↑ breathing: high in the chest", "↑ thoughts: racing", "↑ energy: wired but hollow"],
      },
      {
        time: "09:30",
        loop: "time",
        firstReading:
          "A sandwich at her desk. Fifteen minutes later, the paragraph looks like a paragraph that needs a better opening sentence.",
        state: ["↓ glucose: restored", "↓ jaw: loosens by a fraction", "↓ breathing: drops"],
      },
      {
        time: "10:00",
        loop: "safety",
        firstReading:
          "Her chest tightens in the corridor. David wants to talk about the budget timeline. The meeting takes nine minutes.",
        state: ["verified event: four words and a number about a spreadsheet"],
      },
    ],
    closing: ["Same morning. Same paragraph. Same Katrin.", "Different instrument settings."],
    loopLabels: { time: "Time", attention: "Attention", safety: "Safety" },
  },
  excerpt: {
    eyebrow: "Read",
    title: "Before the chapters",
    sectionLabel: "The pilot",
    runningHead: "State. Not Situation",
    runningHeadVerso: "Ivana Budišin",
    teaserCount: 2,
    cta: "Read the excerpt",
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
    endNote: "The book continues with Chapter Zero, A Day That Should Have Been Fine.",
    unavailable: "The excerpt in this language will follow.",
    folios: ["7", "8", "9"],
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
    unavailableDetail: "A short extract, read by the author, is being recorded.",
  },
  about: {
    eyebrow: "About the book",
    title: "Sixteen ordinary days, read twice.",
    paragraphs: [
      "The book follows one woman, Katrin, through sixteen ordinary days. In the first, nothing happens: she sleeps five hours, reads a short email from her manager and spends the rest of the day certain her position is in danger. Fifteen chapters later she lives the same kind of day again, having learned to ask a question first. Between the two sit the mechanisms, drawn from sleep science, stress physiology, habit research and the study of how the body’s internal signals reach awareness.",
      "The premise is narrow and testable. Before the mind explains a feeling, the body has already produced it, and the conditions that produced it are usually knowable in advance. A two-letter message at 22:47 after five hours of sleep and the same message on a rested Tuesday morning are the same words arriving at two different instruments.",
    ],
    auditEyebrow: "The Scientific Heartbeat",
    audit:
      "At the back of this book, every chapter lists the research it is built on and the research that limits it, including the study that failed to replicate and the theory that would undo the argument.",
    facts: [
      { label: "Chapters, numbered zero to fifteen", value: "16" },
      { label: "Reference entries", value: "320" },
      { label: "DOIs verified against Crossref", value: "207" },
      { label: "Places it declares it overreaches", value: "9" },
      { label: "Years of reading behind it", value: "4" },
    ],
    readersEyebrow: "Who it is for",
    readers:
      "[COPY NEEDED: two or three sentences, in your voice, on the reader who will find this book interesting. The fact sheet’s one-line position could be the seed: among books that hand a reader a daily practice, this has the best evidence handling on the shelf; among books with that level of evidence handling, this is the only one that hands the reader a practice.]",
    mapEyebrow: "A map of the book",
    mapTitle: "The Investigation",
    mapSubtitle: "16 cases. Three readings. One question: state or situation?",
    chapters: [
      { number: "00", title: "A Day That Should Have Been Fine" },
      { number: "01", title: "The Radar Was Right" },
      { number: "02", title: "Why Sleep Loss Makes Neutral Input Feel Hostile" },
      { number: "03", title: "The Relief That Becomes Itch" },
      { number: "04", title: "The Predictable Cue" },
      { number: "05", title: "Why Evenings Stretch and Mornings Shrink" },
      { number: "06", title: "Why Rest Doesn’t Always Restore" },
      { number: "07", title: "Why You Cannot Start the Thing That Matters" },
      { number: "08", title: "The Open File" },
      { number: "09", title: "Two Nervous Systems Walk Into a Kitchen" },
      { number: "10", title: "The Argument That Was Tuesday" },
      { number: "11", title: "The Thursday That Was Wednesday Night" },
      { number: "12", title: "The Clean Panel" },
      { number: "13", title: "The Time the Body Was Right" },
      { number: "14", title: "Not About Me" },
      { number: "15", title: "The Forecast" },
    ],
    mapFooter: "Same life. Different instrument settings.",
  },
  author: {
    eyebrow: "The author",
    title: "Ivana Budišin",
    photoAlt: "[ALT TEXT NEEDED: describe the author photograph, e.g. Ivana Budišin photographed in daylight, looking at the camera.]",
    photoPlaceholder: "Author photograph to follow",
    paragraphs: [
      "Ivana Budišin is a writer and business owner based in Luxembourg. She runs two food and beverage companies, one of which includes a government-accredited barista academy, and she studied psychology, including a period at the University of Luxembourg working with Prof. Robert Reuter.",
      "State. Not Situation. is her first book. It follows one woman through sixteen ordinary days and asks a single question of each: is this the situation, or is this the state of the instrument reading it. The book is unusual in its field for printing, beside every chapter, the research that limits its own claims as well as the research that supports them.",
    ],
    websiteLabel: "Psychology website",
    contactLabel: "Contact",
    pressLabel: "Press materials",
  },
  companion: {
    eyebrow: "Alongside the book",
    line: "Something else is being built alongside the book.",
    detail:
      "A companion measurement tool is in development. It turns the book’s closing exercise, a nightly written forecast of tomorrow’s state, into something a reader can score against what actually happened, so that the book’s central claim can be tested rather than believed.",
  },
  press: {
    eyebrow: "Press",
    title: "Press materials",
    intro:
      "Everything here is built from the book itself. Review copies, print and digital, are available now. Extract licensing, interviews and event appearances by arrangement. The author writes and speaks in English and is based in the Central European time zone.",
    contactHeading: "Press contact",
    contactBody: "Ivana Budišin",
    assetsHeading: "Downloads",
    assets: [
      { label: "Front cover, high resolution", file: "/press/cover-front-2400.jpg", note: "JPEG, 2400 px wide" },
      { label: "Book render, transparent background", file: "/press/mockup-3d-transparent.png", note: "PNG" },
      { label: "Web banner", file: "/press/banner-web-2400x1000.jpg", note: "JPEG, 2400 × 1000" },
      { label: "Social image, square", file: "/press/post-1x1-1080.jpg", note: "JPEG, 1080 × 1080" },
      { label: "Social image, portrait", file: "/press/post-4x5-1080x1350.jpg", note: "JPEG, 1080 × 1350" },
      { label: "Social image, landscape", file: "/press/post-16x9-1920x1080.jpg", note: "JPEG, 1920 × 1080" },
      { label: "The opening extract", file: "/press/excerpt-the-opening.pdf", note: "PDF, four pages" },
    ],
    photoUnavailable: "Author photograph: available on request until it is added here.",
    bioHeading: "Author biography",
    bios: [
      {
        label: "25 words",
        text: "Ivana Budišin is a writer and business owner in Luxembourg. State. Not Situation. is her first book.",
      },
      {
        label: "50 words",
        text: "Ivana Budišin is a writer and business owner based in Luxembourg, where she runs two food and beverage companies. She studied psychology and spent a period at the University of Luxembourg working with Prof. Robert Reuter. State. Not Situation. is her first book.",
      },
      {
        label: "100 words",
        text: "Ivana Budišin is a writer and business owner based in Luxembourg. She runs two food and beverage companies, one of which includes a government-accredited barista academy, and she studied psychology, including a period at the University of Luxembourg working with Prof. Robert Reuter. State. Not Situation., her first book, grew out of four years reading the primary research on how the condition of a body changes what its owner believes. She is building a companion measurement tool that turns the book’s closing exercise into something a reader can score against what actually happened.",
      },
    ],
    factsHeading: "Fact sheet",
    facts: [
      { label: "Title", value: "State. Not Situation." },
      { label: "Subtitle", value: "A field guide to the moment before interpretation becomes reality" },
      { label: "Author", value: "Ivana Budišin" },
      { label: "Publisher", value: "Budisin Publishing, Luxembourg" },
      { label: "Publication", value: "[TO BE CONFIRMED]" },
      { label: "Format", value: "Paperback" },
      { label: "Category", value: "Psychology / Cognitive Psychology" },
      { label: "ISBN", value: "[TO BE CONFIRMED]" },
      { label: "Language", value: "English. French and German editions to follow." },
    ],
    descriptionHeading: "About the book",
    description: [
      "State. Not Situation. argues that most of what we take to be judgement about our lives is a reading taken on an instrument nobody checked.",
      "The book follows one woman, Katrin, through sixteen ordinary days. In the first, nothing happens: she sleeps five hours, reads a short email from her manager and spends the rest of the day certain her position is in danger. Fifteen chapters later she lives the same kind of day again, having learned to ask a question first. Between the two sit the mechanisms, drawn from sleep science, stress physiology, habit research and the study of how the body’s internal signals reach awareness.",
      "What sets the book apart is the last fifty pages. Under the title The Scientific Heartbeat, every chapter carries two reference lists rather than one. The first is the work the chapter is built on. The second, headed Pushed Against, is the work that limits what the chapter is allowed to claim.",
    ],
    back: "Back to the book",
  },
  footer: {
    band: "Before you believe the story.",
    publisher: "Budisin Publishing, Luxembourg",
    rights: "© Ivana Budišin. All rights reserved.",
    pressLink: "Press",
    contactLink: "Contact",
    madeLine: "Same life. Different instrument settings.",
  },
  a11y: {
    mainLandmark: "Main content",
    coverFigure: "Book cover",
    pulseMark: "Pulse mark",
    languageSwitcher: "Choose language",
    externalLink: "opens in a new tab",
    dayRegion: "Katrin’s morning, read twice",
  },
};
