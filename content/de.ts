import type { SiteContent } from "./types";

/**
 * GERMAN CONTENT. Same structure as content/en.ts, the canonical architecture
 * of brief/REDESIGN.md. Written under translation/STANDARD.md and
 * translation/METHOD-de.md as an authored German edition, not a word-for-word
 * rendering. The book title stays untranslated; no German edition exists yet.
 *
 * Re-read as a whole on 22 September 2026, after a French author's review of
 * the French page showed English structure under sentences that were
 * grammatically fine. The same test was run on every German string against
 * the author's rhythm ruling (METHOD-de.md, amendments 56 to 59); the new
 * subtitle of 14 September 2026 is translated here for the first time.
 * Record in translation/METHOD-de.md, amendment 60.
 *
 * An empty string renders as ⟦de: some.key⟧ and never as silent English.
 */
export const de: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description: "Warum Ihr Körper entscheidet, was ein Moment bedeutet, bevor Sie dazu kommen. Ivana Budišin ist klinische Psychologin und lebt und arbeitet in Luxemburg. State. Not Situation. ist ihr erstes Buch.",
    ogImageAlt: "State. Not Situation. von Ivana Budišin. Warum Ihr Körper entscheidet, was ein Moment bedeutet, bevor Sie dazu kommen.",
    readTitle: "Leseprobe",
    readDescription: "Die ersten Seiten aus State. Not Situation. von Ivana Budišin.",
    pressTitle: "Presse",
    pressDescription: "Pressematerial zu State. Not Situation. von Ivana Budišin: Cover, Foto der Autorin, bibliografische Angaben, Leseprobe."
  },
  nav: {
    home: "State. Not Situation. Startseite",
    book: "Das Buch",
    read: "Leseprobe",
    author: "Autorin",
    press: "Presse",
    listen: "Hören",
    skipToContent: "Zum Inhalt springen",
    menu: "Menü",
    closeMenu: "Schließen"
  },
  status: {
    forthcoming: "Erscheint demnächst",
    published: "Jetzt erhältlich",
    publicationDatePrefix: "Erschienen",
    forthcomingDatePrefix: "Erscheint am",
    buy: "Bei Amazon kaufen",
    notifyCta: "Nachricht zum Erscheinen",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "name@beispiel.de",
    submit: "Benachrichtigen",
    success: "Danke. Sie hören genau einmal von mir, wenn das Buch da ist.",
    error: "Das hat nicht geklappt. Bitte versuchen Sie es noch einmal oder schreiben Sie mir direkt.",
    privacyNote: "Wird nur für diese Benachrichtigung verwendet.",
    mailtoSubject: "Benachrichtigung, wenn State. Not Situation. erscheint",
    mailtoBody: "Bitte geben Sie mir Bescheid, wenn das Buch erscheint."
  },
  hero: {
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "Warum Ihr Körper entscheidet, was ein Moment bedeutet, bevor Sie dazu kommen",
    strap: "Ihre erste Lesart ist nicht die ganze Geschichte.",
    authorPrefix: "von",
    credential: "Klinische Psychologin, Luxemburg",
    coverAlt: "Vorderseite des Covers von State. Not Situation. Das Wort STATE groß in Rot über NOT SITUATION in Schwarz, auf cremefarbenem Grund, bedruckt mit blassen, durchgestrichenen Sätzen und kleinen Instrumentenanzeigen.",
    readCta: "Zur Leseprobe"
  },
  premise: {
    eyebrow: "Die erste Fehldeutung",
    sensorLine: "Der Körper ist erst Sensor, dann Erzähler.",
    lines: [
      "Vielleicht reagieren Sie nicht auf die Welt.",
      "Vielleicht reagieren Sie auf Ihren Zustand."
    ],
    mechanism: [
      "Normalerweise nehmen wir diese Momente als Auskunft über das Leben: die Person, die Aufgabe, die Beziehung, den Tag.",
      "Aber die erste Lesart ist oft nicht die ganze Geschichte.",
      "Bevor der Kopf erklärt, hat der Körper schon abgestimmt. Schlafdruck, Hunger, Timing, Aufmerksamkeit, Bedrohungserkennung, Gedächtnis und Vorhersage prägen unbemerkt, was sich wahr anfühlt.",
      "Erst danach kommt der Kopf, und er liefert dem Gefühl einen Grund."
    ],
    folio: "4"
  },
  reading: {
    eyebrow: "Probieren Sie jetzt gleich etwas aus",
    lead: "Was auch immer Sie gerade fühlen, während Sie diesen Satz lesen.",
    steps: [
      "Spüren Sie Ihren Kiefer.",
      "Spüren Sie Ihren Atem.",
      "Spüren Sie Ihre Schultern."
    ],
    result: "Was Sie gefunden haben, ist ein Befund.",
    folio: "7"
  },
  variables: {
    sortingLines: [
      "Das sind keine Hirnregionen und keine Nervenbahnen.",
      "Das ist ein Werkzeug zum Sortieren, eine Art, drei Fragen zu stellen, wenn sich alles auf einmal falsch anfühlt."
    ],
    loops: [
      {
        key: "time",
        name: "Zeit",
        body: "Was war vor diesem Moment? Schlaf, Mahlzeiten, Koffein, Erholung, die Uhrzeit."
      },
      {
        key: "attention",
        name: "Aufmerksamkeit",
        body: "Was zieht mich immer wieder zurück? Eine Nachricht, ein Gedanke, ein Auslöser, eine offene Aufgabe."
      },
      {
        key: "safety",
        name: "Sicherheit",
        body: "Was steht auf dem Spiel? Was habe ich beobachtet, was nehme ich an, und muss etwas getan werden?"
      }
    ],
    folio: "7"
  },
  moments: {
    line: "16 Fälle. Drei Befunde. Eine Frage: Zustand oder Situation?",
    title: "Derselbe Tag, fünf Befunde",
    items: [
      { time: "06:38", line: "Eine Schwere ist da, bevor der Tag es ist." },
      { time: "09:12", line: "Eine zweizeilige E-Mail liest sich wie ein Urteil." },
      { time: "14:23", line: "Fünf neutrale Wörter lassen einen Kiefer fest werden." },
      { time: "17:45", line: "Eine unbeantwortete Nachricht fängt an, Miete zu kosten." },
      { time: "22:47", line: "Zwei Buchstaben und ein Punkt wirken feindselig." }
    ],
    closing: "Der Körper spricht zuerst. Der Kopf erklärt danach.",
    folio: "4"
  },
  evidence: {
    title: "Belege",
    grades: [
      {
        key: "high",
        label: "Hoch",
        description: "Wiederholt bestätigte oder belastbare Belege."
      },
      {
        key: "medium",
        label: "Mittel",
        description: "Hinweise, deren Unsicherheit ins Gewicht fällt."
      },
      {
        key: "low",
        label: "Niedrig",
        description: "Plausible Hypothese oder erste Belege."
      }
    ],
    closing: "Diese Markierungen gibt es, weil das Buch selbst dasselbe Risiko trägt, das es beschreibt.",
    folio: "7"
  },
  // German is switched off in site.config.ts and this draft is here to be
  // reworked. The credit is kept word for word as the author supplied it,
  // including "Dr" without the German full stop, because it is her name.
  foreword: {
    eyebrow: "Vorwort",
    credit: "Vorwort: Dr Kristina Herber",
    name: "Dr Kristina Herber",
    role: "Managing Director",
    organisation: "AIHE Academic Institute for Higher Education",
    quote: [
      "Unsere erste Deutung ist nicht zwangsläufig falsch. Aber sie muss nicht unsere letzte sein.",
      "Ein Buch, das uns davor warnt, eine überzeugende Deutung mit Gewissheit zu verwechseln, prüft auch die eigenen Deutungen."
    ]
  },
  excerpt: {
    title: "Vor den Kapiteln",
    sectionLabel: "Der Pilot",
    lead: "Das Buch will Ihnen weniger beibringen, Ihren Instinkten zu vertrauen, als Ihnen zeigen, worauf genau Sie da vertrauen.",
    teaserCount: 2,
    paragraphs: [
      "Am Abend des 16. Juli 1999 startete in New Jersey ein kleines einmotoriges Flugzeug. Sein Ziel war Martha’s Vineyard. Der Pilot war erfahren genug, um sich sicher zu fühlen, und unerfahren genug, um sich darüber zu täuschen, was diese Sicherheit bedeutete. Er hatte rund 300 Flugstunden. Die Ausbildung, die ihn zum Fliegen allein nach Instrumenten berechtigt hätte, hatte er nicht abgeschlossen.",
      "Beim Start war der Himmel klar, also schloss er daraus, dass er keine Instrumente brauchte. Als er die Küste erreichte, hatte sich Dunst über das Wasser gelegt. Jener Nebel, der die Linie zwischen Meer und Himmel so allmählich auslöscht, dass man den Horizont erst vermisst, wenn man ihn sucht und er nicht da ist. Über Land liegen unten Lichter. Man sieht Straßen, Gebäude, eine Geometrie, die den Augen sagt, wo unten ist. Über offenem Wasser bei Nacht, mit Dunst, der auf der Oberfläche liegt wie eine zweite Dunkelheit, ist nichts. Die Welt außerhalb des Cockpits wird in alle Richtungen zu einem einzigen Grau. Oben sieht aus wie unten. Eine sanfte Kurve fühlt sich an wie Geradeausflug. Ein langsames Sinken fühlt sich an, als hielte man die Höhe.",
      "Das Innenohr des Piloten, das Organ, das dem Gehirn meldet, wie der Körper im Raum ausgerichtet ist, funktioniert, indem es Veränderungen der Bewegung wahrnimmt. Geht man in eine Kurve, verschiebt sich die Flüssigkeit im Ohr, und das Gehirn registriert die Drehung. Hält die Kurve aber fünfzehn oder zwanzig Sekunden lang an, kommt die Flüssigkeit im Innenohr zur Ruhe. Sie bewegt sich nicht mehr. Das Gehirn, das Bewegung verfolgt, schließt daraus, dass die Kurve zu Ende ist. Man hat das Gefühl, waagerecht zu fliegen, tut es aber nicht.",
      "Irgendwo über dem dunklen Wasser ging das Flugzeug in eine sanfte Linkskurve. Die Instrumente des Piloten, die Anzeigen auf dem Instrumentenbrett vor ihm, zeigten die Kurve. Der künstliche Horizont, eine kleine Kreiselanzeige, die den Winkel des Flugzeugs zur Erde zeigt, sagte ihm deutlich, dass er in Schräglage war. Der Höhenmesser sagte ihm, dass er sank. Der Fahrtmesser sagte ihm, dass er schneller wurde. Sein Körper sagte ihm etwas anderes. Sein Körper sagte ihm, dass er geradeaus und waagerecht flog. Sein Körper fühlte sich richtig an. Seine Instrumente fühlten sich falsch an. Er vertraute seinem Körper.",
      "Die Kurve wurde enger. Die Nase senkte sich. Die Fahrt nahm zu. In den letzten Sekunden sank das Flugzeug mit mehr als 4.700 Fuß pro Minute, fast anderthalb Kilometer alle sechzig Sekunden, in einer immer engeren Spirale. Mit der düsteren Präzision eines Berufs, der die Arten benannt hat, auf die er Menschen verliert, nennen Piloten sie Friedhofsspirale. Er schlug mit voller Geschwindigkeit auf dem Wasser auf. Er und seine beiden Passagiere starben beim Aufprall.",
      "Die Untersuchung fand keinen mechanischen Defekt. Der Motor lief. Die Instrumente funktionierten. Die Daten waren die ganze Zeit da, auf dem Instrumentenbrett, fünfzehn Zentimeter vor seinen Augen, aber er las sie nicht ab. Er las stattdessen seinen Körper. Die amerikanische Luftfahrtbehörde, die Federal Aviation Administration, hat eine Anweisung für Piloten, die in diese Situation geraten. Sie ist einen Satz lang. Die Anweisung ist wörtlich gemeint, und sie gilt für Ihr Leben so unmittelbar wie für ein Cockpit:",
      "Der Pilot hieß John F. Kennedy Jr. Er war der Sohn eines amerikanischen Präsidenten. Man hatte ihm geraten, in dieser Nacht nicht ohne seinen Fluglehrer zu fliegen. Er sagte seinem Fluglehrer, er wolle es allein machen. Er war achtunddreißig Jahre alt.",
      "Sie steuern einen Körper, der Signale erzeugt, und Ihr Kopf hält diese Signale oft für die Wahrheit. Manchmal liegen die Signale so falsch wie das Gleichgewichtsorgan im Innenohr über dunklem Wasser. Die Müdigkeit, die als Frage nach Ihrer Karriere daherkommt. Der Koffeinschub, der als Angst wegen einer E-Mail daherkommt. Der niedrige Blutzucker, der als Beleg dafür daherkommt, dass Ihre Beziehung scheitert. Ihr Körper spricht zuerst, und Ihr Kopf erklärt danach. Weil die Erklärung mit dem ganzen Gewicht körperlicher Überzeugung kommt, dem angespannten Kiefer, dem schnellen Herzschlag, der Hitze hinter den Ohren, fühlt sie sich an wie tiefes Wissen. Es fühlt sich an, als würden Sie die Situation lesen. Aber Sie lesen nur das Instrument ab, das die Situation liest, und die Einstellungen des Instruments waren schon verstellt, bevor die Situation da war. Diese Instrumente gibt es. Sie haben sie. Puls, Kieferspannung, Atemtiefe, Schulterhaltung, das Tempo Ihrer Gedanken. Sie liefern gerade jetzt Daten, während Sie diesen Satz lesen. Aber der selbstsichere Wetterbericht, den der Körper über die Welt abgibt, ist nur ein Entwurf.",
    ],
    quoteAfter: 5,
    quote: "„vertrauen Sie Ihren Instrumenten und ignorieren Sie alle Signale Ihres Körpers, die dem widersprechen.“",
    continueCta: "Weiterlesen",
    back: "Zurück zum Buch",
    readingModeLabel: "Lesemodus",
    closing: "In diesem Buch geht es um denselben Fehler, im Maßstab einer Küche. Die Version, die jeden Dienstag passiert. Die Version, in der Ihr Körper eine Geschichte über eine Nachricht, ein Schweigen, einen Blick schreibt und Ihr Kopf diese Geschichte unter der Aufsicht dessen redigiert, was Ihr Körper gerade fühlt. Niemand stirbt, aber Entscheidungen fallen. Beziehungen verändern sich. Selbsteinschätzungen entstehen. Und nichts davon musste so kommen, wie es kam, denn die Daten waren die ganze Zeit da.",
    closingSource: "Seite 20",
    endNote: "Es folgt Kapitel Null: Ein Tag, der in Ordnung hätte sein sollen.",
    unavailable: "Die Leseprobe in dieser Sprache folgt.",
    folios: [
      "1",
      "2",
      "3"
    ]
  },
  names: {
    title: "Sechzehn Namen.",
    label: "Ein Name dafür",
    pageLabel: "Seite",
    note: "Jeder Name schließt sein Kapitel ab. Die Seitenzahl ist die des Eintrags.",
    items: [
      { number: "00", name: "Erzählmodus", page: 16 },
      { number: "01", name: "Fehlzuschreibung", page: 24 },
      { number: "02", name: "Das Rauchmelder-Prinzip", page: 36 },
      { number: "03", name: "Variable Belohnung", page: 50 },
      { number: "04", name: "Wollen und Mögen", page: 66 },
      { number: "05", name: "Wake Maintenance Zone", page: 80 },
      { number: "06", name: "Ruhezustandsnetzwerk", page: 96 },
      { number: "07", name: "Bewertungsbedrohung", page: 107 },
      { number: "08", name: "Grübeln", page: 126 },
      { number: "09", name: "Fordern–Rückzug", page: 141 },
      { number: "10", name: "Metakognition", page: 158 },
      { number: "11", name: "Stapeln", page: 176 },
      { number: "12", name: "Vorhersagefehler", page: 196 },
      { number: "13", name: "Kalibrierung", page: 210 },
      { number: "14", name: "Mildes Panel", page: 222 },
      { number: "15", name: "Vorhersage", page: 239 },
    ],
    example: {
      number: "01",
      name: "Fehlzuschreibung",
      body: "Einem Gefühl die falsche Ursache geben. Der Körper erzeugt das Gefühl. Der Kopf sucht einen Grund und nimmt den nächstbesten. Das Gefühl ist echt. Der Grund ist geraten.",
      showsUpLabel: "Wie es sich zeigt",
      showsUp: [
        "Müdigkeit, die als Frage nach der eigenen Laufbahn ankommt.",
        "Kaffee auf leeren Magen, der als Sorge wegen einer E-Mail ankommt.",
        "Niedriger Blutzucker, der als Zweifel an einer Beziehung ankommt."
      ],
      tryLabel: "Ausprobieren",
      tryIt: "Bevor Sie einem sicheren Urteil folgen, nennen Sie eine Tatsache, die Sie umstimmen könnte.",
      page: 24
    }
  },
  listen: {
    eyebrow: "Hören",
    title: "Hörprobe",
    subtitle: "Gelesen von der Autorin",
    play: "Abspielen",
    pause: "Pause",
    progress: "Wiedergabeposition",
    elapsed: "Verstrichen",
    duration: "Dauer",
    unavailable: "Die Aufnahme folgt hier."
  },
  author: {
    title: "Ivana Budišin",
    photoAlt: "Ivana Budišin, fotografiert vor dunkelgrauem Hintergrund.",
    photoPlaceholder: "Foto der Autorin folgt",
    bio: "Ivana Budišin ist klinische Psychologin und lebt und arbeitet in Luxemburg. State. Not Situation. ist ihr erstes Buch.",
    readers: "Für alle, die sich schon einmal sicher waren, was eine Situation bedeutete, und dann entdeckt haben, dass etwas anderes im Gange war. Und für Leserinnen und Leser, die sich für die Psychologie interessieren: dafür, wie wir die Welt um uns herum wahrnehmen, deuten und unsere Deutung revidieren.",
    pressLabel: "Pressematerial"
  },
  closing: {
    question: "Ist das die Situation? Oder ist das ihr Zustand?",
    source: "Seite 238",
    line: "Dasselbe Leben. Andere Einstellungen am Instrument."
  },
  press: {
    eyebrow: "Presse",
    title: "Pressematerial",
    intro: "Rezensionsexemplare, gedruckt und digital, auf Anfrage. Abdruckrechte, Interviews und Veranstaltungen nach Absprache.",
    contactHeading: "Kontakt",
    assetsHeading: "Downloads",
    kitLabel: "Vollständige Pressemappe herunterladen",
    assets: [
      {
        label: "Cover, Vorderseite, Druckauflösung",
        file: "/press/cover-front-300dpi.png",
        note: "PNG · 1801 × 2701"
      },
      {
        label: "Cover, komplett, Druckauflösung",
        file: "/press/cover-wrap-300dpi.png",
        note: "PNG · 3791 × 2701"
      },
      {
        label: "Cover, druckfertig",
        file: "/press/cover-print-6x9.pdf",
        note: "PDF · 6 × 9 in"
      },
      {
        label: "Foto der Autorin",
        file: "/press/author-photo-1600.jpg",
        note: "JPEG · 1600 × 1600"
      },
      {
        label: "Leseprobe, die ersten Seiten",
        file: "/press/State-Not-Situation-extract-the-opening.pdf",
        note: "PDF · 3 pp"
      },
      {
        label: "Webbanner",
        file: "/press/banner-web-2400x1000.jpg",
        note: "JPEG · 2400 × 1000"
      },
      {
        label: "Bild für Social Media, quadratisch",
        file: "/press/post-1x1-1080.jpg",
        note: "JPEG · 1080 × 1080"
      }
    ],
    photoUnavailable: "Foto der Autorin auf Anfrage.",
    photoCredit: "Foto: Zoe Larusson",
    bioHeading: "Biografie",
    bios: [
      {
        label: "Kurz",
        text: "Ivana Budišin ist klinische Psychologin und lebt und arbeitet in Luxemburg. State. Not Situation. ist ihr erstes Buch."
      },
      {
        label: "Lang",
        text: "Vor der Psychologie arbeitete Ivana Budišin im Design und im Produktdesign. Später wandte sie sich der angewandten Psychologie zu und ist heute klinische Psychologin, mit anhaltendem Interesse an Forschung und Kognitionswissenschaft. Geboren in den Vereinigten Staaten, hat sie in den USA, in Serbien und Luxemburg gelebt und ist heute Luxemburgerin. Sie leitet Luxembourg Psychology. State. Not Situation. führt diese Interessen zusammen: wie wir die Welt erleben, und wie sich dieses Erleben leichter verstehen lässt."
      }
    ],
    factsHeading: "Bibliografische Angaben",
    publicationFactLabel: "Erscheinungstermin",
    forewordLabel: "Vorwort",
    facts: [
      {
        label: "Titel",
        value: "State. Not Situation."
      },
      {
        label: "Untertitel",
        value: "Warum Ihr Körper entscheidet, was ein Moment bedeutet, bevor Sie dazu kommen"
      },
      {
        label: "Autorin",
        value: "Ivana Budišin"
      },
      {
        label: "Erscheinungstermin",
        value: "2026"
      },
      {
        label: "Format",
        value: "Paperback, 6 × 9 Zoll (15,2 × 22,9 cm)"
      },
      {
        label: "Umfang",
        value: "304 Seiten"
      },
      {
        label: "ISBN-13",
        value: "978-2-87996-258-0"
      },
      {
        label: "Kategorie",
        value: "Psychologie / Kognitive Psychologie"
      },
      {
        label: "Sprache",
        value: "Englisch. Französische und deutsche Ausgabe folgen."
      },
      {
        label: "Pflichtexemplar",
        value: "Bibliothèque nationale du Luxembourg"
      }
    ],
    descriptionHeading: "Über das Buch",
    description: [
      "Es will Ihnen weniger beibringen, Ihren Instinkten zu vertrauen, als Ihnen zeigen, worauf genau Sie da vertrauen.",
      "Für alle, die sich schon einmal sicher waren, was eine Situation bedeutete, und dann entdeckt haben, dass etwas anderes im Gange war. Und für Leserinnen und Leser, die sich für die Psychologie interessieren: dafür, wie wir die Welt um uns herum wahrnehmen, deuten und unsere Deutung revidieren."
    ],
    mapHeading: "Die Kapitel",
    mapLabel: "Dieses Buch ist die",
    mapTitle: "Untersuchung.",
    mapLine: "16 Fälle. Drei Befunde. Eine Frage: Zustand oder Situation?",
    pageColumn: "Seite",
    chapters: [
      {
        number: "00",
        title: "Ein Tag, der in Ordnung hätte sein sollen",
        page: 11
      },
      {
        number: "01",
        title: "Das Radar hatte recht",
        page: 17
      },
      {
        number: "02",
        title: "Warum sich neutraler Input bei Schlafmangel feindselig anfühlt",
        page: 25
      },
      {
        number: "03",
        title: "Die Erleichterung, die zum Juckreiz wird",
        page: 37
      },
      {
        number: "04",
        title: "Der vorhersehbare Auslöser",
        page: 51
      },
      {
        number: "05",
        title: "Warum sich der Abend dehnt und der Morgen schrumpft",
        page: 69
      },
      {
        number: "06",
        title: "Warum Ruhe nicht immer erholsam ist",
        page: 81
      },
      {
        number: "07",
        title: "Warum Sie mit dem, was zählt, nicht anfangen können",
        page: 97
      },
      {
        number: "08",
        title: "Die offene Akte",
        page: 109
      },
      {
        number: "09",
        title: "Kommen zwei Nervensysteme in eine Küche",
        page: 127
      },
      {
        number: "10",
        title: "Der Streit, der Dienstag war",
        page: 143
      },
      {
        number: "11",
        title: "Der Donnerstag, der Mittwochabend war",
        page: 161
      },
      {
        number: "12",
        title: "Das saubere Instrumentenbrett",
        page: 179
      },
      {
        number: "13",
        title: "Das eine Mal, als der Körper recht hatte",
        page: 197
      },
      {
        number: "14",
        title: "Es geht nicht um mich",
        page: 211
      },
      {
        number: "15",
        title: "Die Vorhersage",
        page: 223
      }
    ],
    sortingTool: "Die folgenden Kapitel sind um drei Systeme herum aufgebaut, die prägen, wie die Signale Ihres Körpers gewichtet werden, bevor Ihr Kopf daraus eine Geschichte macht. Es sind keine Hirnregionen und keine Nervenbahnen. Diese Systeme sind ein Werkzeug zum Sortieren, eine Art, drei Fragen zu stellen, wenn sich alles auf einmal falsch anfühlt.",
    sourcesHeading: "Quellen und Belege",
    sources: [
      "Jedes Kapitel hat hier drei Teile: eine kurze Notiz dazu, woher die Überlegungen kamen, eine Liste der Arbeiten, auf denen das Kapitel aufbaut, und eine Liste der Arbeiten, die es einschränken, komplizierter machen oder dieselben Belege anders erklären.",
      "Ließe man sie weg, sähe die Argumentation aufgeräumter aus, als sie ist."
    ],
    sourcesLabel: "Der wissenschaftliche Herzschlag, Seite 220",
    creditsHeading: "Mitwirkende",
    credits: [
      {
        label: "Umschlaggestaltung",
        value: "Zoe Larusson"
      },
      {
        label: "Fotografie",
        value: "Zoe Larusson"
      },
      {
        label: "Buchgestaltung und Satz",
        value: "Ivana Budišin"
      },
      {
        label: "Erschienen bei",
        value: "Budisin Publishing"
      }
    ],
    back: "Zurück zum Buch"
  },
  footer: {
    band: "Bevor Sie der Geschichte glauben.",
    pressLink: "Presse",
    contactLink: "Kontakt",
    rights: "© 2026 Budisin Publishing",
    translationNote:
      "Diese Seiten hat eine KI aus dem Englischen übersetzt."
  },
  a11y: {
    mainLandmark: "Hauptinhalt",
    coverFigure: "Das Buch",
    languageSwitcher: "Sprache wählen",
    menu: "Menü"
  }
};
