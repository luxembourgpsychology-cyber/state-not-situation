import type { SiteContent } from "./types";

/**
 * GERMAN CONTENT. Same structure as content/en.ts, the canonical architecture
 * of brief/REDESIGN.md. Written under translation/STANDARD.md and
 * translation/METHOD-de.md as an authored German edition, not a word-for-word
 * rendering. The book title stays untranslated; no German edition exists yet.
 *
 * An empty string renders as ⟦de: some.key⟧ and never as silent English.
 */
export const de: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description: "Ein Leitfaden für den Moment, bevor aus Deutung Wirklichkeit wird. Ivana Budišin ist klinische Psychologin und lebt und arbeitet in Luxemburg. State. Not Situation. ist ihr erstes Buch.",
    ogImageAlt: "State. Not Situation. von Ivana Budišin. Ein Leitfaden für den Moment, bevor aus Deutung Wirklichkeit wird.",
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
    subtitle: "Ein Leitfaden für den Moment, bevor aus Deutung Wirklichkeit wird",
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
      "Dann kommt der Kopf als Zweiter und liefert dem Gefühl einen Grund."
    ],
    folio: "10"
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
    folio: "13"
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
        body: "Schlaf, Essen, Koffein, zirkadiane Phase, Erholung. Stimmt das Timing nicht, steigt das Grundniveau der Empfindlichkeit. Dieselbe Welt fühlt sich härter an."
      },
      {
        key: "attention",
        name: "Aufmerksamkeit",
        body: "Das System, das Belohnung, Neues und den nächsten Auslöser verfolgt. Ist es eingefangen, verengt sich der Fokus auf den Reiz, der am wenigsten Aufwand verlangt, und anspruchsvollere Arbeit fühlt sich schwer an."
      },
      {
        key: "safety",
        name: "Sicherheit",
        body: "Das System, das auf Bedrohung achtet, vor allem auf soziale Bedrohung. Es ist schnell, es ist alt, und es neigt zu Fehlalarmen. Es erzeugt Deutungen, die sich wie Tatsachen anfühlen."
      }
    ],
    folio: "13"
  },
  moments: {
    line: "16 Fälle. Drei Befunde. Eine Frage: Zustand oder Situation?",
    label: "Beweismaterial",
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
        verified: "Nichts ist passiert."
      },
      {
        chapter: "02",
        page: 28,
        time: "22:47",
        quote: "„ok.“",
        inputLabel: "Input",
        input: "Zwei Buchstaben. Ein Punkt.",
        verifiedLabel: "Bestätigter Tonfall",
        verified: "Keiner."
      },
      {
        chapter: "11",
        page: 150,
        time: "16:00",
        quote: "„Mit meinem Leben stimmt etwas nicht.“",
        inputLabel: "Input",
        input: "Sechs gewöhnliche Ereignisse. Ein erschöpfter Tag.",
        verifiedLabel: "Bestätigte Krise",
        verified: "Keine."
      }
    ],
    closing: "Es hieß: Ich versage. Die Daten waren: Ich bin müde.",
    closingSource: "Seite 20"
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
    folio: "13"
  },
  excerpt: {
    title: "Vor den Kapiteln",
    sectionLabel: "Der Pilot",
    lead: "Das Buch will Ihnen weniger beibringen, Ihren Instinkten zu vertrauen, als Ihnen zeigen, worauf genau Sie da vertrauen.",
    teaserCount: 2,
    paragraphs: [
      "Am Abend des 16. Juli 1999 startete in New Jersey ein kleines einmotoriges Flugzeug. Es war unterwegs nach Martha’s Vineyard. Der Pilot war erfahren genug, um sich seiner Sache sicher zu sein, und neu genug, um sich darin zu irren, was diese Sicherheit bedeutete. Er hatte rund 300 Flugstunden. Die Ausbildung, die ihn berechtigt hätte, nur nach seinen Instrumenten zu fliegen, hatte er nicht abgeschlossen.",
      "Beim Start war der Himmel klar, also schloss er daraus, dass er keine Instrumente brauchte. Als er die Küste erreichte, hatte sich Dunst über das Wasser gelegt. Der Nebel kam, der die Linie zwischen Meer und Himmel so allmählich auslöscht, dass man erst merkt, dass der Horizont weg ist, wenn man ihn sucht und er nicht da ist. Über Land sind unten Lichter. Man sieht Straßen, Gebäude, eine Geometrie, die den Augen sagt, wo unten ist. Über offenem Wasser bei Nacht, mit Dunst, der auf der Oberfläche liegt wie eine zweite Dunkelheit, ist nichts. Die Welt außerhalb des Cockpits wird in alle Richtungen zu einem einzigen Grau. Oben sieht aus wie unten. Eine sanfte Kurve fühlt sich an wie Geradeausflug. Ein langsames Sinken fühlt sich an, als hielte man die Höhe.",
      "Das Innenohr des Piloten, das Organ, das dem Gehirn meldet, wie der Körper im Raum liegt, funktioniert, indem es Veränderungen der Bewegung wahrnimmt. Geht man in eine Kurve, verschiebt sich die Flüssigkeit im Ohr, und das Gehirn registriert die Drehung. Hält die Kurve aber fünfzehn oder zwanzig Sekunden lang an, kommt die Flüssigkeit im Innenohr zur Ruhe. Sie bewegt sich nicht mehr. Das Gehirn, das Bewegung verfolgt, schließt daraus, dass die Kurve zu Ende ist. Man hat das Gefühl, waagerecht zu fliegen, tut es aber nicht.",
      "Irgendwo über dem dunklen Wasser ging das Flugzeug in eine sanfte Linkskurve. Die Instrumente des Piloten, die Anzeigen auf dem Instrumentenbrett vor ihm, zeigten die Kurve. Der künstliche Horizont, eine kleine Kreiselanzeige, die den Winkel des Flugzeugs zur Erde zeigt, sagte ihm deutlich, dass er in Schräglage war. Der Höhenmesser sagte ihm, dass er sank. Der Fahrtmesser sagte ihm, dass er schneller wurde. Sein Körper sagte ihm etwas anderes. Sein Körper sagte ihm, dass er geradeaus und waagerecht flog. Sein Körper fühlte sich richtig an. Seine Instrumente fühlten sich falsch an. Er vertraute seinem Körper.",
      "Die Kurve wurde enger. Die Nase senkte sich. Die Fahrt nahm zu. In den letzten Sekunden sank das Flugzeug mit mehr als 4.700 Fuß pro Minute, fast anderthalb Kilometer alle sechzig Sekunden, in einer immer engeren Spirale. Mit der düsteren Präzision eines Berufs, der die Arten benannt hat, auf die er Menschen verliert, nennen Piloten sie Friedhofsspirale. Er schlug mit voller Geschwindigkeit auf dem Wasser auf. Er und seine beiden Passagiere starben beim Aufprall.",
      "Die Untersuchung fand keinen mechanischen Defekt. Der Motor lief. Die Instrumente funktionierten. Die Daten waren die ganze Zeit da, auf dem Instrumentenbrett, fünfzehn Zentimeter vor seinen Augen, aber er las sie nicht ab. Er las stattdessen seinen Körper. Die amerikanische Luftfahrtbehörde, die Federal Aviation Administration, hat eine Anweisung für Piloten, die in diese Situation geraten. Sie ist einen Satz lang. Die Anweisung ist wörtlich gemeint, und sie gilt für Ihr Leben so unmittelbar wie für ein Cockpit:",
      "Der Pilot hieß John F. Kennedy Jr. Er war der Sohn eines amerikanischen Präsidenten. Man hatte ihm geraten, in dieser Nacht nicht ohne seinen Fluglehrer zu fliegen. Er sagte seinem Fluglehrer, er wolle es allein machen. Er war achtunddreißig Jahre alt.",
      "Sie steuern einen Körper, der Signale erzeugt, und Ihr Kopf hält diese Signale oft für die Wahrheit. Manchmal liegen die Signale so falsch wie das Gleichgewichtsorgan im Innenohr über dunklem Wasser. Die Müdigkeit, die als Frage nach Ihrer Karriere daherkommt. Der Koffeinschub, der als Angst wegen einer E-Mail daherkommt. Der niedrige Blutzucker, der als Beleg dafür daherkommt, dass Ihre Beziehung scheitert. Ihr Körper spricht zuerst, und Ihr Kopf erklärt danach. Weil die Erklärung mit dem ganzen Gewicht körperlicher Überzeugung kommt, dem angespannten Kiefer, dem schnellen Herzschlag, der Hitze hinter den Ohren, fühlt sie sich an wie tiefes Wissen. Es fühlt sich an, als würden Sie die Situation lesen. Aber Sie lesen nur das Instrument ab, das die Situation liest, und die Einstellungen des Instruments waren schon verstellt, bevor die Situation da war. Diese Instrumente gibt es. Sie haben sie. Puls, Kieferspannung, Atemtiefe, Schulterhaltung, das Tempo Ihrer Gedanken. In diesem Moment liefern sie Daten, während Sie diesen Satz lesen. Aber der selbstsichere Wetterbericht, den der Körper über die Welt abgibt, ist nur ein Entwurf.",
    ],
    quoteAfter: 5,
    quote: "„vertrauen Sie Ihren Instrumenten und ignorieren Sie alle Signale Ihres Körpers, die dem widersprechen.“",
    continueCta: "Weiterlesen",
    back: "Zurück zum Buch",
    readingModeLabel: "Lesemodus",
    closing: "In diesem Buch geht es um denselben Fehler, im Maßstab einer Küche. Die Version, die jeden Dienstag passiert. Die Version, in der Ihr Körper eine Geschichte über eine Nachricht, ein Schweigen, einen Blick schreibt und Ihr Kopf diese Geschichte unter der Aufsicht dessen redigiert, was Ihr Körper gerade fühlt. Niemand stirbt, aber Entscheidungen fallen. Beziehungen verändern sich. Selbsteinschätzungen entstehen. Und nichts davon musste so kommen, wie es kam, denn die Daten waren die ganze Zeit da.",
    closingSource: "Seite 26",
    endNote: "Es folgt Kapitel Null: Ein Tag, der in Ordnung hätte sein sollen.",
    unavailable: "Die Leseprobe in dieser Sprache folgt.",
    folios: [
      "7",
      "8",
      "9"
    ]
  },
  readings: {
    title: "Die Befunde",
    label: "Befund",
    pageLabel: "Seite",
    items: [
      {
        number: "01",
        time: "KEINE AUSSAGE",
        attention: "GESCHWÄCHT",
        safety: "DOMINANT",
        page: 23,
        line: "Der Körper fällt ein Urteil, bevor die Aufmerksamkeit es prüft."
      },
      {
        number: "02",
        time: "DOMINANT",
        attention: "NACHSEH-SCHLEIFE",
        safety: "VERSTÄRKT",
        page: 29,
        line: "Müdigkeit nimmt der Gewissheit die Bremse."
      },
      {
        number: "03",
        time: "IN DEN LÜCKEN",
        attention: "IN DER SCHLEIFE",
        safety: "KEINE AUSSAGE",
        page: 39,
        line: "Die Hand greift, bevor der Kopf entscheidet."
      },
      {
        number: "04",
        time: "AUSLÖSER UM 15:28",
        attention: "GEWOHNHEITS-SCHLEIFE",
        safety: "STEIGT SPÄTER",
        page: 51,
        line: "Die Hand hält einen Termin ein, den der Kopf nie ausgemacht hat."
      },
      {
        number: "05",
        time: "DOMINANT",
        attention: "SPÄT EINGEFANGEN",
        safety: "KEINE AUSSAGE",
        page: 67,
        line: "Eine Stunde fühlt sich frei an, und der Morgen zahlt."
      },
      {
        number: "06",
        time: "DEFIZIT VOM MORGEN",
        attention: "GESCHWÄCHT",
        safety: "GRÜBELN",
        page: 79,
        line: "Das Wochenende macht alles richtig und bringt niemandem Erholung."
      },
      {
        number: "07",
        time: "DEFIZIT VOM NACHMITTAG",
        attention: "ZERSPLITTERT",
        safety: "STEIGT",
        page: 95,
        line: "Das Dokument bleibt dasselbe; der Leser verliert an Reichweite."
      },
      {
        number: "08",
        time: "ABEND",
        attention: "VERENGT",
        safety: "DOMINANT",
        page: 105,
        line: "Aus einem Wort werden sechs Tage Belege."
      },
      {
        number: "09",
        time: "20 MINUTEN UNGENUTZT",
        attention: "FENSTER, HALBE SEKUNDE",
        safety: "DOMINANT",
        page: 121,
        line: "Das Gespräch endet vor seinem ersten Satz."
      },
      {
        number: "10",
        time: "07:40 RESET",
        attention: "VERBRAUCHT",
        safety: "REST",
        page: 135,
        line: "Die Küche wird zurückgesetzt. Der Körper nicht."
      },
      {
        number: "11",
        time: "DEFIZIT VOM VORABEND",
        attention: "BIS 10:00 VERBRAUCHT",
        safety: "FÜLLT DIE LÜCKEN",
        page: 151,
        line: "Sechs gewöhnliche Dinge werden zum Beweis, dass nichts in Ordnung ist."
      },
      {
        number: "12",
        time: "KEINE AUSSAGE",
        attention: "ENG, VERFÜGBAR",
        safety: "SIGNAL VORHANDEN",
        page: 167,
        line: "Es ist nichts. Der Kiefer kommt nicht zur Ruhe."
      },
      {
        number: "13",
        time: "22:40",
        attention: "GENAU",
        safety: "RICHTIG",
        page: 183,
        line: "Dieser Alarm gehört zu vierzig Metern Beton."
      },
      {
        number: "14",
        time: "GESCHÜTZT",
        attention: "PLATZIERT",
        safety: "RUHIG",
        page: 195,
        line: "Der Tag, der Kapitel Null hätte sein sollen."
      },
      {
        number: "15",
        time: "VORHERSAGE",
        attention: "OFFENE AKTE, BENANNT",
        safety: "VORAB BENANNT",
        page: 209,
        line: "Der Befund von morgen, heute Abend abgelesen."
      }
    ]
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
    source: "Seite 225",
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
        note: "PNG · 3807 × 2701"
      },
      {
        label: "Cover, druckfertig",
        file: "/press/cover-print-6x9.pdf",
        note: "PDF · 6 × 9 in"
      },
      {
        label: "Buchansicht",
        file: "/press/book-render.png",
        note: "PNG · 1874 × 2782"
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
        text: "[COPY NEEDED: a longer biography, 100 to 150 words, in your own words. Qualifications, where you practise, and how the book came out of that work. Only what you would be happy to see checked.]"
      }
    ],
    factsHeading: "Bibliografische Angaben",
    facts: [
      {
        label: "Titel",
        value: "State. Not Situation."
      },
      {
        label: "Untertitel",
        value: "Ein Leitfaden für den Moment, bevor aus Deutung Wirklichkeit wird"
      },
      {
        label: "Autorin",
        value: "Ivana Budišin"
      },
      {
        label: "Erscheinungsjahr",
        value: "2026"
      },
      {
        label: "Format",
        value: "Paperback, 6 × 9 Zoll (15,2 × 22,9 cm)"
      },
      {
        label: "Umfang",
        value: "278 Seiten"
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
        value: "Eine CIP-Aufnahme liegt bei der Bibliothèque nationale du Luxembourg vor."
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
        page: 17
      },
      {
        number: "01",
        title: "Das Radar hatte recht",
        page: 23
      },
      {
        number: "02",
        title: "Warum sich neutraler Input bei Schlafmangel feindselig anfühlt",
        page: 29
      },
      {
        number: "03",
        title: "Die Erleichterung, die zum Juckreiz wird",
        page: 39
      },
      {
        number: "04",
        title: "Der vorhersehbare Auslöser",
        page: 51
      },
      {
        number: "05",
        title: "Warum sich der Abend dehnt und der Morgen schrumpft",
        page: 67
      },
      {
        number: "06",
        title: "Warum Ruhe nicht immer erholsam ist",
        page: 79
      },
      {
        number: "07",
        title: "Warum Sie mit dem, was zählt, nicht anfangen können",
        page: 95
      },
      {
        number: "08",
        title: "Die offene Akte",
        page: 105
      },
      {
        number: "09",
        title: "Kommen zwei Nervensysteme in eine Küche",
        page: 121
      },
      {
        number: "10",
        title: "Der Streit, der Dienstag war",
        page: 135
      },
      {
        number: "11",
        title: "Der Donnerstag, der Mittwochabend war",
        page: 151
      },
      {
        number: "12",
        title: "Das saubere Instrumentenbrett",
        page: 167
      },
      {
        number: "13",
        title: "Das eine Mal, als der Körper recht hatte",
        page: 183
      },
      {
        number: "14",
        title: "Es geht nicht um mich",
        page: 195
      },
      {
        number: "15",
        title: "Die Vorhersage",
        page: 209
      }
    ],
    sortingTool: "Die folgenden Kapitel sind um drei Systeme herum aufgebaut, die prägen, wie die Signale Ihres Körpers gewichtet werden, bevor Ihr Kopf daraus eine Geschichte macht. Es sind keine Hirnregionen und keine Nervenbahnen. Diese Systeme sind ein Werkzeug zum Sortieren, eine Art, drei Fragen zu stellen, wenn sich alles auf einmal falsch anfühlt.",
    sourcesHeading: "Quellen und Belege",
    sources: [
      "Jedes Kapitel hat hier drei Teile: eine kurze Notiz dazu, woher die Überlegungen kamen, eine Liste der Arbeiten, auf denen das Kapitel aufbaut, und eine Liste der Arbeiten, die es einschränken, komplizierter machen oder dieselben Belege anders erklären.",
      "Ließe man sie weg, sähe die Argumentation aufgeräumter aus, als sie ist."
    ],
    sourcesLabel: "Der wissenschaftliche Herzschlag, Seite 226",
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
