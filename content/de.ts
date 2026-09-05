import type { SiteContent } from "./types";

/**
 * GERMAN CONTENT. Same structure as content/en.ts.
 *
 * Plain trade German, not a technical manual. No German edition of the book
 * exists yet, so the title "State. Not Situation." is left untranslated
 * everywhere, as are the ISBN, page numbers, times, file paths and proper nouns.
 *
 * Terminology held constant throughout:
 *   state       → Zustand
 *   situation   → Situation
 *   reading     → Befund (the instrument sense; the verb stays lesen / ablesen)
 *   settings    → Einstellungen
 *   mind        → Kopf
 *   instrument  → Instrument, the cockpit panel → Instrumentenbrett
 *
 * Every [COPY NEEDED: …] placeholder is left in English on purpose, so that
 * nobody mistakes an unwritten line for a translation error.
 */
export const de: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description:
      "Ein Feldführer für den Moment, bevor aus Deutung Wirklichkeit wird. Sechzehn Fälle. Drei Befunde. Eine Frage: Zustand oder Situation? Von Ivana Budišin.",
    ogImageAlt:
      "Das Cover zu State. Not Situation. von Ivana Budišin: das Wort STATE groß in Rot über NOT SITUATION in Schwarz, auf cremefarbenem Grund.",
    readTitle: "Einen Auszug lesen",
    readDescription:
      "Die ersten Seiten von State. Not Situation. von Ivana Budišin: ein Pilot, Dunst über offenem Wasser und ein Satz der Federal Aviation Administration.",
    pressTitle: "Presse",
    pressDescription:
      "Pressematerial zu State. Not Situation. von Ivana Budišin: Covermotiv, Foto der Autorin, Biografie, Publikationsdaten und Kontakt.",
  },

  nav: {
    book: "Das Buch",
    read: "Lesen",
    listen: "Hören",
    author: "Autorin",
    press: "Presse",
    skipToContent: "Zum Inhalt springen",
    home: "State. Not Situation. Startseite",
  },

  status: {
    forthcoming: "Erscheint in Kürze",
    published: "Jetzt erhältlich",
    publicationDatePrefix: "Erschienen",
    buy: "Bei Amazon kaufen",
    notifyHeading: "Lassen Sie sich benachrichtigen, wenn das Buch erscheint.",
    notifyCta: "Benachrichtigen lassen",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "ihre@email.com",
    submit: "Benachrichtigen Sie mich",
    success: "Danke. Sie hören von mir, sobald das Buch da ist.",
    error: "Das hat nicht geklappt. Bitte versuchen Sie es noch einmal oder schreiben Sie mir direkt.",
    privacyNote: "Wird nur für diese Nachricht verwendet.",
    mailtoLabel: "Schreiben Sie mir, um benachrichtigt zu werden",
    mailtoSubject: "Sagen Sie mir Bescheid, wenn State. Not Situation. erscheint",
    mailtoBody: "Bitte sagen Sie mir Bescheid, wenn State. Not Situation. erhältlich ist.",
  },

  hero: {
    // Front cover, all of it. The title itself stays as printed.
    eyebrow: "Zeit · Aufmerksamkeit · Sicherheit",
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "Ein Feldführer für den Moment, bevor aus Deutung Wirklichkeit wird",
    strap: "Ihr erster Befund ist nicht die ganze Geschichte.",
    authorPrefix: "von",
    coverAlt:
      "Vorderseite des Covers von State. Not Situation. Das Wort STATE groß in Rot über NOT SITUATION in Schwarz, auf cremefarbenem Grund, bedruckt mit blassen, durchgestrichenen Sätzen und kleinen Instrumentenanzeigen.",
    openAlt:
      "Das Buch, aufgeschlagen auf dem Schmutztitel, der State. Not Situation. trägt.",
    readCta: "Einen Auszug lesen",
    scrollHint: "Scrollen",
  },

  // Seite 13, wortgetreu. Das Buch bittet die Lesenden um einen Befund; die Website tut dasselbe.
  reading: {
    eyebrow: "Bevor wir beginnen",
    lead: "Was auch immer Sie fühlen, während Sie diesen Satz lesen.",
    steps: ["Prüfen Sie Ihren Kiefer.", "Prüfen Sie Ihren Atem.", "Prüfen Sie Ihre Schultern."],
    result: "Was Sie gefunden haben, ist ein Befund.",
    afterResult:
      "Ein Befund des Instruments, das gerade alles um Sie herum deutet, auch diese Worte. Der Befund kann stimmen. Er kann auch falsch sein. Wissen können Sie es erst, wenn Sie die Einstellungen gesehen haben.",
    question: "Ist das die Situation? Oder ist das der Zustand?",
  },

  // Vorspann des Buches, wortgetreu, dazu die gedruckte Legende der Zustandslinie.
  loops: {
    eyebrow: "Die Zustandslinie",
    title: "Drei Systeme liefen durch Katrins Morgen.",
    intro:
      "Die folgenden Kapitel sind um drei Systeme herum aufgebaut, die bestimmen, wie viel Gewicht die Signale Ihres Körpers bekommen, bevor Ihr Kopf daraus eine Geschichte macht. Es sind keine Hirnregionen und keine Nervenbahnen. Sie sind ein Werkzeug zum Sortieren, eine Möglichkeit, drei Fragen zu stellen, wenn sich alles auf einmal falsch anfühlt.",
    items: [
      {
        key: "time",
        name: "Zeit",
        legend: "Zirkadiane Phase, Schlafdefizit, Stoffwechselzustand",
        body:
          "Schlaf, Essen, Koffein, zirkadiane Phase, Erholung. Wenn das Timing nicht stimmt, ist die Empfindlichkeit von vornherein höher. Dieselbe Welt fühlt sich härter an.",
      },
      {
        key: "attention",
        name: "Aufmerksamkeit",
        legend: "Belohnungsschleifen, ständiges Nachsehen, Aufgabenwechsel",
        body:
          "Das System, das Belohnung, Neues und den nächsten Reiz verfolgt. Wenn es gekapert ist, verengt sich die Aufmerksamkeit auf den billigsten Input, der gerade da ist, und die teure Arbeit fühlt sich schwer an.",
      },
      {
        key: "safety",
        name: "Sicherheit",
        legend: "Bedrohung erkennen, erste Entwürfe, Fehldeutungen",
        body:
          "Das System, das auf Bedrohung achtet, vor allem auf soziale. Auf Dinge wie Bewertung durch andere, Ausschluss, Unklarheit, Status. Es ist schnell, es ist alt, und es neigt zu Fehlalarmen. Es erzeugt Deutungen, die sich wie Tatsachen anfühlen.",
      },
    ],
  },

  // Die CASE-EVIDENCE-Seiten, aus dem Buch übernommen.
  cases: {
    eyebrow: "Beweismaterial",
    title: "Sechzehn Fälle. Drei Befunde.",
    intro: "Jedes Kapitel beginnt mit einer solchen Seite.",
    pageLabel: "Seite",
    items: [
      {
        chapter: "00",
        page: 16,
        time: "06:38",
        quote: "„Irgendetwas stimmt nicht.“",
        inputLabel: "Input",
        input: "Zwei Minuten vor dem Wecker.",
        verifiedLabel: "Bestätigtes Ereignis",
        verified: "Nichts ist geschehen.",
      },
      {
        chapter: "02",
        page: 28,
        time: "22:47",
        quote: "„ok.“",
        inputLabel: "Input",
        input: "Zwei Buchstaben. Ein Punkt.",
        verifiedLabel: "Bestätigter Tonfall",
        verified: "Keiner.",
      },
      {
        chapter: "05",
        page: 66,
        time: "22:30",
        quote: "„Seltsam tatkräftig.“",
        inputLabel: "Input",
        input: "Stilles Haus. Offener Bildschirm. Späte Stunde.",
        verifiedLabel: "Nächster Befund",
        verified: "06:38.",
      },
      {
        chapter: "11",
        page: 150,
        time: "16:00",
        quote: "„Mit meinem Leben stimmt etwas nicht.“",
        inputLabel: "Input",
        input: "Sechs gewöhnliche Ereignisse. Ein zehrender Tag.",
        verifiedLabel: "Bestätigte Krise",
        verified: "Keine.",
      },
      {
        chapter: "13",
        page: 182,
        time: "22:40",
        quote: "„Das ist Zustand, nicht Situation.“",
        inputLabel: "Input",
        input: "Wenig Treibstoff. Erloschenes Licht. Ein Geräusch auf Kies.",
        verifiedLabel: "Bestätigte Bedrohung",
        verified: "Noch nicht sichtbar.",
      },
      {
        chapter: "15",
        page: 208,
        time: "22:14",
        quote: "„Sie liest den von morgen.“",
        inputLabel: "Input",
        input: "Ausgeruht. Satt. Ruhig.",
        verifiedLabel: "Bestätigter Montag",
        verified: "Noch nicht eingetreten.",
      },
    ],
  },

  // Seiten 7 bis 9 des Buches, wortgetreu.
  excerpt: {
    eyebrow: "Lesen",
    title: "Vor den Kapiteln",
    sectionLabel: "Der Pilot",
    runningHead: "State. Not Situation",
    teaserCount: 2,
    cta: "Einen Auszug lesen",
    continueCta: "Weiterlesen",
    back: "Zurück zum Buch",
    readingModeLabel: "Lesemodus",
    paragraphs: [
      "Am Abend des 16. Juli 1999 startete ein kleines einmotoriges Flugzeug in New Jersey. Es war auf dem Weg nach Martha’s Vineyard. Der Pilot hatte genug Erfahrung, um sich sicher zu fühlen, und zu wenig, um zu wissen, was diese Sicherheit wert war. Er hatte rund 300 Stunden in der Luft. Die Ausbildung, die ihn berechtigt hätte, allein nach den Instrumenten zu fliegen, hatte er nicht abgeschlossen.",
      "Beim Start war der Himmel klar, also schloss er daraus, dass er keine Instrumente brauchte. Als er die Küste erreichte, war der Himmel es nicht mehr. Dunst hatte sich über das Wasser gelegt. Die Art von Dunst, die den Strich zwischen Meer und Himmel so langsam auslöscht, dass Sie erst merken, dass der Horizont weg ist, wenn Sie ihn suchen und er nicht da ist. Über Land macht das nichts. Unten sind Lichter. Sie sehen Straßen, Gebäude, ein Muster, das Ihren Augen sagt, wo unten ist. Über offenem Wasser bei Nacht, mit Dunst, der wie eine zweite Dunkelheit auf dem Wasser liegt, gibt es nichts. Vor dem Cockpit wird die Welt in jede Richtung gleichmäßig grau. Oben sieht aus wie unten. Eine sanfte Kurve fühlt sich an wie ruhiger Geradeausflug. Ein langsames Sinken fühlt sich an, als bliebe die Höhe gleich.",
      "Das Innenohr des Piloten, das Organ, das dem Gehirn meldet, wie der Körper im Raum liegt, misst Änderungen der Bewegung. Wenn Sie in eine Kurve gehen, verschiebt sich die Flüssigkeit im Ohr, und das Gehirn bemerkt die Drehung. Bleibt die Kurve aber fünfzehn oder zwanzig Sekunden lang gleich, kommt die Flüssigkeit im Innenohr zur Ruhe. Sie bewegt sich nicht mehr. Das Gehirn, das Bewegung verfolgt und nicht die Lage, schließt daraus, dass die Kurve vorbei ist. Sie haben das Gefühl, waagerecht zu fliegen, tun es aber nicht.",
      "Irgendwo über dem dunklen Wasser ging das Flugzeug in eine sanfte Linkskurve. Die Instrumente des Piloten, die Anzeigen auf dem Brett vor ihm, zeigten die Kurve. Der künstliche Horizont, eine kleine Kreiselanzeige, die den Winkel des Flugzeugs zur Erde zeigt, sagte ihm, dass er in Schräglage war. Der Höhenmesser sagte ihm, dass er sank. Der Fahrtmesser sagte ihm, dass er schneller wurde. Sein Körper sagte ihm etwas anderes. Sein Körper sagte ihm, dass er geradeaus und waagerecht flog. Sein Körper fühlte sich richtig an. Seine Instrumente fühlten sich falsch an. Er vertraute seinem Körper.",
      "Die Kurve wurde enger. Die Nase sank. Die Geschwindigkeit stieg. In den letzten Sekunden sank das Flugzeug mit mehr als 4.700 Fuß pro Minute, fast anderthalb Kilometer alle sechzig Sekunden, in einer immer engeren Spirale – Piloten haben dafür einen Namen, mit der düsteren Genauigkeit eines Berufs, der jede Art benannt hat, auf die er Menschen verliert: Todesspirale. Er schlug mit voller Geschwindigkeit auf dem Wasser auf. Er und seine beiden Passagiere kamen beim Aufprall ums Leben.",
      "Die Untersuchung ergab kein technisches Versagen. Der Motor lief. Die Instrumente arbeiteten. Die Daten waren die ganze Zeit da, auf dem Brett, fünfzehn Zentimeter vor seinen Augen, aber er las sie nicht ab. Er las stattdessen seinen Körper. Die Anweisung der amerikanischen Luftfahrtbehörde Federal Aviation Administration an Piloten, die in diese Situation geraten, ist einen Satz lang. Sie ist wörtlich gemeint und gilt für Ihr Leben so direkt wie für ein Cockpit:",
      "Der Pilot hieß John F. Kennedy Jr. Er war der Sohn eines amerikanischen Präsidenten. Man hatte ihm geraten, in dieser Nacht nicht ohne seinen Fluglehrer zu fliegen. Er sagte seinem Fluglehrer, er wolle allein fliegen. Er war achtunddreißig Jahre alt.",
      "Sie steuern einen Körper, der Signale sendet, und Ihr Kopf hält diese Signale oft für die Wahrheit. Manchmal liegen die Signale so falsch wie das Gleichgewichtsorgan im Innenohr über dunklem Wasser. Die Müdigkeit, die sich als Frage nach Ihrer Karriere ausgibt. Der Koffeinschub, der sich als Angst wegen einer E-Mail ausgibt. Der niedrige Blutzucker, der sich als Beweis dafür ausgibt, dass Ihre Beziehung scheitert. Ihr Körper spricht zuerst, Ihr Kopf erklärt danach. Weil die Erklärung mit dem ganzen Gewicht körperlicher Gewissheit kommt, dem festen Kiefer, dem schnellen Herzschlag, der Hitze hinter den Ohren, fühlt sie sich an wie tiefes Wissen. Es fühlt sich an, als würden Sie die Situation lesen. Aber Sie lesen nur das Instrument ab, das die Situation liest, und dieses Instrument war schon falsch eingestellt, bevor die Situation überhaupt da war. Diese Instrumente gibt es wirklich. Sie haben sie. Puls, Kieferspannung, Atemtiefe, Schulterhaltung, das Tempo Ihrer Gedanken. Sie liefern gerade jetzt Daten, während Sie diesen Satz lesen. Aber der selbstsichere Wetterbericht, den der Körper über die Welt abgibt, ist nur ein Entwurf.",
    ],
    quoteAfter: 5,
    quote:
      "„vertrauen Sie Ihren Instrumenten und ignorieren Sie alle Signale Ihres Körpers, die dem widersprechen.“",
    endNote: "Es folgt Kapitel Null: Ein Tag, der in Ordnung hätte sein sollen.",
    unavailable: "Der Auszug in dieser Sprache folgt.",
    folios: ["7", "8", "9"],
  },

  listen: {
    eyebrow: "Hören",
    title: "Einen Auszug hören",
    subtitle: "Gelesen von der Autorin",
    play: "Abspielen",
    pause: "Pause",
    progress: "Wiedergabeposition",
    elapsed: "Verstrichen",
    duration: "Dauer",
    unavailable: "Die Aufnahme kommt hier hinein.",
  },

  about: {
    eyebrow: "Das Buch",
    // Kapitel Zwölf, wortgetreu.
    title: "Der Körper ist ein Sensor, bevor er ein Erzähler ist.",
    // Seite 12, wortgetreu, als Zitat gesetzt, damit „dieser Fehler“ seinen Kontext behält.
    quote:
      "In diesem Buch geht es um diesen Fehler. Es geht um diesen Irrtum als tägliches, allgegenwärtiges, unsichtbares Merkmal des Lebens in einem Körper, der ständig Signale sendet, die Ihr Kopf ständig liest oder falsch liest.",
    quoteSource: "Seite 12",
    // Ivanas eigene Worte, geliefert am 5. September 2026.
    paragraphs: [
      "Über sechzehn Tage hinweg geht Katrin durch gewöhnliche Situationen, in denen ihr erster Befund von dem, was gerade geschieht, nicht immer der ist, der einem zweiten Blick standhält. Jedes Kapitel folgt einem dieser Momente in die Psychologie dahinter: von Aufmerksamkeit und Vorhersage über Gedächtnis, Bedrohung und Ungewissheit bis dahin, wie wir andere Menschen einschätzen. Das Buch verspricht keine besseren Instinkte. Es fragt, was möglich wird, wenn wir wissen, woher unser erster Befund kommt.",
      "Es will Ihnen weniger beibringen, Ihren Instinkten zu vertrauen, als Ihnen zeigen, worauf genau Sie da vertrauen.",
    ],
    mapLine: "16 Fälle. Drei Befunde. Eine Frage: Zustand oder Situation?",

    // „Bevor wir beginnen“, Seite 13, wortgetreu, und die gedruckte Legende der Marker.
    evidenceEyebrow: "Bevor wir beginnen",
    evidenceIntro:
      "Dieses Buch stellt Behauptungen über das Gehirn und den Körper auf, und diese Behauptungen sind unterschiedlich gut belegt. Manche stützen sich auf Jahrzehnte von Forschung, die immer wieder bestätigt wurde. Manche stützen sich auf neuere Ergebnisse, die vielversprechend, aber noch nicht gesichert sind. Manche führen gesichertes Wissen plausibel weiter, sind aber in der Form, die dieses Buch beschreibt, nie direkt geprüft worden. Sie sollten wissen, was davon was ist.",
    grades: [
      { key: "high", label: "Hoch", shape: "Sauberer, kräftiger Herzschlag.", meaning: "Vielfach bestätigt, belastbar." },
      { key: "medium", label: "Mittel", shape: "Unregelmäßig, geringere Amplitude.", meaning: "Deutet darauf hin, ist aber unvollständig." },
      { key: "low", label: "Niedrig", shape: "Nahezu Nulllinie, schwache Welle.", meaning: "Nur eine plausible Vermutung." },
    ],
    overreachEyebrow: "Wo die Kapitel mehr sagen als ihre Quellen",
    overreach:
      "Die Kapitel sind Geschichten und wurden so belassen, wie sie geschrieben sind. Dies sind die Stellen, die aufmerksamen Leserinnen und Lesern auffallen werden, hier einmal gesammelt.",

    readersEyebrow: "Für wen es ist",
    readers:
      "Für alle, die je sicher waren, was eine Situation bedeutet, und dann gemerkt haben, dass etwas anderes vor sich ging. Und für Leserinnen und Leser, die sich für die Psychologie davon interessieren, wie wir die Welt um uns herum wahrnehmen, deuten und wieder korrigieren.",

    mapEyebrow: "Eine Karte des Buches",
    mapTitle: "Die Untersuchung",
    mapSubtitle: "Dasselbe Leben. Andere Einstellungen am Instrument.",
    pageColumn: "Seite",
    chapters: [
      { number: "00", title: "Ein Tag, der in Ordnung hätte sein sollen", page: 17 },
      { number: "01", title: "Das Radar hatte recht", page: 23 },
      { number: "02", title: "Warum sich bei Schlafmangel neutraler Input feindselig anfühlt", page: 29 },
      { number: "03", title: "Die Erleichterung, die zum Juckreiz wird", page: 39 },
      { number: "04", title: "Der vorhersehbare Reiz", page: 51 },
      { number: "05", title: "Warum sich Abende dehnen und Morgen schrumpfen", page: 67 },
      { number: "06", title: "Warum Ruhe nicht immer erholt", page: 79 },
      { number: "07", title: "Warum Sie nicht anfangen können, was wirklich zählt", page: 95 },
      { number: "08", title: "Die offene Akte", page: 105 },
      { number: "09", title: "Kommen zwei Nervensysteme in eine Küche", page: 121 },
      { number: "10", title: "Der Streit, der der Dienstag war", page: 135 },
      { number: "11", title: "Der Donnerstag, der der Mittwochabend war", page: 151 },
      { number: "12", title: "Das saubere Instrumentenbrett", page: 167 },
      { number: "13", title: "Das eine Mal, als der Körper recht hatte", page: 183 },
      { number: "14", title: "Es geht nicht um mich", page: 195 },
      { number: "15", title: "Die Vorhersage", page: 209 },
    ],
    mapFooter: "Nach den Kapiteln folgt der wissenschaftliche Herzschlag.",
  },

  author: {
    eyebrow: "Die Autorin",
    title: "Ivana Budišin",
    photoAlt: "Ivana Budišin, fotografiert vor einem dunkelgrauen Hintergrund.",
    photoPlaceholder: "Foto der Autorin folgt",
    bio: "Ivana Budišin ist klinische Psychologin, sie lebt und arbeitet in Luxemburg. State. Not Situation. ist ihr erstes Buch.",
    websiteLabel: "Website der Praxis",
    contactLabel: "Kontakt",
    pressLabel: "Pressematerial",
  },

  companion: {
    eyebrow: "Begleitend zum Buch",
    line: "[COPY NEEDED: one sentence about the companion tool, if you want it mentioned before it exists. Otherwise set companion.enabled to false in site.config.ts and this section disappears.]",
  },

  press: {
    eyebrow: "Presse",
    title: "Pressematerial",
    intro:
      "Rezensionsexemplare, gedruckt und digital, gibt es auf Anfrage. Abdruckrechte für Auszüge sowie Interviews und Veranstaltungen nach Absprache.",
    contactHeading: "Kontakt",
    assetsHeading: "Downloads",
    assets: [
      { label: "Cover-Vorderseite, hohe Auflösung", file: "/press/cover-front-2400.jpg", note: "JPEG, 2400 px breit" },
      { label: "Foto der Autorin", file: "/press/author-photo-1600.jpg", note: "JPEG, 1600 × 1600" },
      { label: "Buch-Rendering, transparenter Hintergrund", file: "/press/mockup-3d-transparent.png", note: "PNG" },
      { label: "Web-Banner", file: "/press/banner-web-2400x1000.jpg", note: "JPEG, 2400 × 1000" },
      { label: "Social-Media-Bild, quadratisch", file: "/press/post-1x1-1080.jpg", note: "JPEG, 1080 × 1080" },
      { label: "Social-Media-Bild, Hochformat", file: "/press/post-4x5-1080x1350.jpg", note: "JPEG, 1080 × 1350" },
      { label: "Social-Media-Bild, Querformat", file: "/press/post-16x9-1920x1080.jpg", note: "JPEG, 1920 × 1080" },
      { label: "Der Auszug vom Anfang", file: "/press/excerpt-the-opening.pdf", note: "PDF, vier Seiten" },
    ],
    photoUnavailable: "Foto der Autorin auf Anfrage.",
    bioHeading: "Biografie",
    bios: [
      {
        label: "Kurz",
        text: "Ivana Budišin ist klinische Psychologin, sie lebt und arbeitet in Luxemburg. State. Not Situation. ist ihr erstes Buch.",
      },
      {
        label: "Lang",
        text: "[COPY NEEDED: a longer biography, 100 to 150 words, in your own words. Qualifications, where you practise, and how the book came out of that work. Only what you would be happy to see checked.]",
      },
    ],
    factsHeading: "Publikation",
    facts: [
      { label: "Titel", value: "State. Not Situation." },
      { label: "Untertitel", value: "Ein Feldführer für den Moment, bevor aus Deutung Wirklichkeit wird" },
      { label: "Autorin", value: "Ivana Budišin" },
      { label: "Verlag", value: "Budisin Publishing, Luxemburg" },
      { label: "Erscheinungsjahr", value: "2026" },
      { label: "Format", value: "Paperback, 6 × 9 in (15,2 × 22,9 cm)" },
      { label: "Umfang", value: "278 Seiten" },
      { label: "ISBN-13", value: "978-2-87996-258-0" },
      { label: "Kategorie", value: "Psychologie / Kognitive Psychologie" },
      { label: "Sprache", value: "Englisch. Französische und deutsche Ausgaben folgen." },
      { label: "Pflichtexemplar", value: "Eine CIP-Aufnahme liegt bei der Bibliothèque nationale du Luxembourg vor." },
    ],
    descriptionHeading: "Über das Buch",
    description: [
      "Über sechzehn Tage hinweg geht Katrin durch gewöhnliche Situationen, in denen ihr erster Befund von dem, was gerade geschieht, nicht immer der ist, der einem zweiten Blick standhält. Jedes Kapitel folgt einem dieser Momente in die Psychologie dahinter: von Aufmerksamkeit und Vorhersage über Gedächtnis, Bedrohung und Ungewissheit bis dahin, wie wir andere Menschen einschätzen. Das Buch verspricht keine besseren Instinkte. Es fragt, was möglich wird, wenn wir wissen, woher unser erster Befund kommt.",
      "Es will Ihnen weniger beibringen, Ihren Instinkten zu vertrauen, als Ihnen zeigen, worauf genau Sie da vertrauen.",
      "Sechzehn Fälle. Drei Befunde. Eine Frage: Zustand oder Situation?",
      "Jedes Kapitel trägt ein Zeichen dafür, wie gut seine Aussagen belegt sind, und im Literaturverzeichnis stehen sowohl die Arbeiten, auf denen ein Kapitel aufbaut, als auch die, die ihm Grenzen setzen, dazu die Stellen, an denen die Kapitel mehr sagen als ihre Quellen.",
    ],
    creditsHeading: "Mitwirkende",
    credits: [
      { label: "Covergestaltung", value: "Zoe Larusson" },
      { label: "Buchgestaltung und Satz", value: "Ivana Budišin" },
      { label: "Erschienen bei", value: "Budisin Publishing" },
    ],
    back: "Zurück zum Buch",
  },

  footer: {
    band: "Bevor Sie der Geschichte glauben.",
    rights: "© 2026 Budisin Publishing",
    pressLink: "Presse",
    contactLink: "Kontakt",
    madeLine: "Dasselbe Leben. Andere Einstellungen am Instrument.",
  },

  a11y: {
    mainLandmark: "Hauptinhalt",
    coverFigure: "Das Buch",
    languageSwitcher: "Sprache wählen",
    languageComing: "Ausgabe folgt",
    casesRegion: "Seiten mit Beweismaterial aus dem Buch",
    bookOpening: "Das Buch, das sich öffnet",
  },
};
