import type { SiteContent } from "./types";

/**
 * GERMAN CONTENT. Same structure as content/en.ts, section order per
 * translation/EDITORIAL-POSITIONING.md, every sentence written under
 * translation/STANDARD.md (the author's standard, which governs) and
 * translation/METHOD-de.md (the team's method and translation memory).
 *
 * This is an authored German edition of the page, not a word-for-word
 * rendering: the sense, the mechanism, the certainty level and the rhythm
 * of each English sentence are kept; its word order is not.
 *
 * No German edition of the book exists yet, so the title "State. Not
 * Situation." stays untranslated everywhere, as do the ISBN, page numbers,
 * times, file paths and proper nouns. The country is Luxemburg in prose.
 *
 * Load-bearing terms, held constant (translation memory in METHOD-de.md):
 *   state / situation        → Zustand / Situation
 *   reading (noun)           → Befund; the verbs are ablesen (panel) and lesen
 *   instrument, panel        → Instrument, Instrumentenbrett
 *   settings                 → Einstellungen (off: verstellt)
 *   signal / story           → Signal / Geschichte
 *   mind / brain             → Kopf / Gehirn
 *   baseline                 → Grundniveau
 *   threat, attention        → Bedrohung, Aufmerksamkeit
 *   Time · Attention · Safety → Zeit · Aufmerksamkeit · Sicherheit
 *
 * Open questions for the author are in translation/QUERIES-de.md; the file
 * carries the recommended option in each case.
 *
 * Every [COPY NEEDED: …] placeholder is left in English on purpose, so that
 * nobody mistakes an unwritten line for a translation error.
 */
export const de: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description:
      "Ein Bestimmungsbuch für den Moment, bevor aus Deutung Wirklichkeit wird. Sechzehn Fälle. Drei Befunde. Eine Frage: Zustand oder Situation? Von Ivana Budišin.",
    ogImageAlt:
      "Das Cover von State. Not Situation. von Ivana Budišin: das Wort STATE groß in Rot über NOT SITUATION in Schwarz, auf Cremeweiß.",
    readTitle: "Leseprobe",
    readDescription:
      "Die ersten Seiten von State. Not Situation. von Ivana Budišin: ein Pilot, Dunst über offenem Wasser und ein Satz der Federal Aviation Administration.",
    pressTitle: "Presse",
    pressDescription:
      "Pressematerial zu State. Not Situation. von Ivana Budišin: Cover, Foto der Autorin, Biografie, bibliografische Angaben und Kontakt.",
  },

  nav: {
    book: "Das Buch",
    read: "Leseprobe",
    listen: "Hören",
    author: "Autorin",
    press: "Presse",
    skipToContent: "Zum Inhalt springen",
    home: "State. Not Situation. Startseite",
  },

  status: {
    forthcoming: "Erscheint demnächst",
    published: "Jetzt erhältlich",
    publicationDatePrefix: "Erschienen",
    buy: "Bei Amazon kaufen",
    notifyHeading: "Lassen Sie sich benachrichtigen, wenn das Buch erscheint.",
    notifyCta: "Benachrichtigen lassen",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "name@beispiel.de",
    submit: "Benachrichtigen",
    success: "Danke. Sie hören von mir, sobald das Buch da ist.",
    error: "Das hat nicht geklappt. Bitte versuchen Sie es noch einmal oder schreiben Sie mir direkt.",
    privacyNote: "Wird nur für diese Benachrichtigung verwendet.",
    mailtoLabel: "Per E-Mail benachrichtigen lassen",
    mailtoSubject: "Benachrichtigung, wenn State. Not Situation. erscheint",
    mailtoBody: "Bitte geben Sie mir Bescheid, wenn State. Not Situation. erhältlich ist.",
  },

  hero: {
    // Das Cover, vollständig. Der Titel selbst bleibt, wie er gedruckt ist.
    eyebrow: "Zeit · Aufmerksamkeit · Sicherheit",
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "Ein Bestimmungsbuch für den Moment, bevor aus Deutung Wirklichkeit wird",
    strap: "Ihr erster Befund ist nicht die ganze Geschichte.",
    authorPrefix: "von",
    coverAlt:
      "Vorderseite des Covers von State. Not Situation. Das Wort STATE groß in Rot über NOT SITUATION in Schwarz, auf cremefarbenem Grund, bedruckt mit blassen, durchgestrichenen Sätzen und kleinen Instrumentenanzeigen.",
    openAlt: "Das Buch, aufgeschlagen auf der Titelseite, auf der State. Not Situation. steht.",
    readCta: "Leseprobe lesen",
    scrollHint: "Scrollen",
  },

  // Seite 10, in der Reihenfolge, in der die Seite es setzt.
  misreading: {
    eyebrow: "Die erste Fehldeutung",
    lines: ["An diesem Tag ging nichts schief.", "Die Instrumente funktionierten.", "Die Daten waren die ganze Zeit da."],
    investigationLabel: "Dieses Buch ist die",
    investigation: "Untersuchung.",
    readingsLabel: "Derselbe Tag, fünf Befunde",
    readings: [
      { time: "06:38", text: "Eine Schwere ist da, bevor der Tag da ist." },
      { time: "09:12", text: "Eine zweizeilige E-Mail liest sich wie ein Urteil." },
      { time: "14:23", text: "Fünf neutrale Wörter spannen einen Kiefer an." },
      { time: "17:45", text: "Eine unbeantwortete Nachricht fängt an, Miete zu verlangen." },
      { time: "22:47", text: "Zwei Buchstaben und ein Punkt fühlen sich feindselig an." },
    ],
    closing: ["Der Körper spricht zuerst.", "Der Kopf erklärt danach."],
  },

  // Seiten 12 bis 13. Im Buch steht zwischen dem dritten und vierten Lauf ein Abschnittszeichen.
  knowTheDay: {
    eyebrow: "Sie kennen diesen Tag",
    runs: [
      "Der Tag, den ich meine, ist von der anderen Art. Der Tag, an dem nichts schiefging und sich alles falsch anfühlte. Er fing an, bevor Sie merkten, dass er anfing. Irgendwo zwischen Wecker und Dusche, zwischen Dusche und Küche, zwischen Küche und dem ersten Schluck von dem, was auch immer Sie trinken, um der Mensch zu werden, den der Morgen verlangt. Etwas war schon da. Es fühlte sich eher an wie eine Textur. Eine Trägheit in den Gliedern, ein Widerstreben in der Brust, eine leise Schwere, die hinter Ihren Gedanken saß wie Regenwetter hinter Glas.",
      "Sie haben diesen Tag schon erlebt. Jeder hat diesen Tag schon erlebt. Sie haben ihn Dutzende Male erlebt und Sie werden ihn wieder erleben und jedes Mal wird sich die Geschichte anfühlen wie die Wahrheit und jedes Mal wird der Morgen danach die Geschichte auflösen.",
      "Der Körper sprach zuerst. Der Kopf erklärte danach, und diese Erklärung fühlte sich an wie das Ereignis.",
      "In diesem Buch geht es um diesen Fehler. Es geht um diesen Irrtum als etwas Tägliches, Beiläufiges, Unsichtbares, das zum Leben in einem Körper dazugehört, der ständig Signale erzeugt, die Ihr Kopf ständig liest oder falsch liest. Vor all dem, vor der Wissenschaft und dem Mechanismus und dem Grund, warum das Instrument gestern falsch kalibriert war, probieren Sie jetzt gleich etwas aus.",
    ],
  },

  // Seite 13. Die Zeile über dem Abschnitt ist die Wendung der Seite selbst.
  reading: {
    eyebrow: "Probieren Sie jetzt gleich etwas aus",
    lead: "Was auch immer Sie gerade fühlen, während Sie diesen Satz lesen.",
    steps: ["Spüren Sie Ihren Kiefer.", "Spüren Sie Ihren Atem.", "Spüren Sie Ihre Schultern."],
    result: "Was Sie gefunden haben, ist ein Befund.",
    afterResult:
      "Ein Befund, abgelesen an dem Instrument, das in diesem Moment alles um Sie herum deutet, auch diese Worte. Der Befund kann stimmen. Oder auch nicht. Das können Sie nicht wissen, bevor Sie die Einstellungen gesehen haben.",
    question: "Ist das die Situation? Oder ist das der Zustand?",
  },

  book: {
    eyebrow: "Das Buch",
    // Seite 20.
    heading: "Derselbe Morgen. Derselbe Absatz. Dieselbe Katrin. Andere Einstellungen am Instrument.",
    headingSource: "Seite 20",
    // Ivanas eigene Worte, geliefert am 5. September 2026.
    paragraphs: [
      "Sechzehn Tage lang geht Katrin durch alltägliche Situationen, in denen ihr erster Befund nicht immer der ist, der einem genaueren Blick standhält. Jedes Kapitel verfolgt einen dieser Momente in die Psychologie dahinter, von Aufmerksamkeit und Vorhersage über Gedächtnis, Bedrohung und Ungewissheit bis hin zu den Schlüssen, die wir über andere Menschen ziehen. Das Buch verspricht keine besseren Instinkte. Es fragt, was möglich wird, wenn wir lernen, woher unser erster Befund kam.",
      "Es will Ihnen weniger beibringen, Ihren Instinkten zu vertrauen, als Ihnen zeigen, worauf genau Sie da vertrauen.",
    ],
    readersEyebrow: "Für wen es ist",
    // Seite 14.
    readersAnchor:
      "Dieses Buch ersetzt keine professionelle Hilfe, und es behandelt komplexe Erkrankungen nicht als Fragen des Lebensstils. Es arbeitet in der Lücke zwischen gesund und klinisch, in dem Raum, in dem die meisten Menschen an den meisten Tagen leben.",
    // Ivanas eigene Worte, geliefert am 5. September 2026.
    readers:
      "Für alle, die sich schon einmal sicher waren, was eine Situation bedeutete, und dann entdeckt haben, dass etwas anderes im Gange war. Und für Leserinnen und Leser, die sich für die Psychologie interessieren: dafür, wie wir die Welt um uns herum wahrnehmen, deuten und unsere Deutung revidieren.",
  },

  // Seiten 7 bis 9 des Buches; die Schlusszeile ist Seite 26.
  excerpt: {
    eyebrow: "Lesen",
    title: "Vor den Kapiteln",
    sectionLabel: "Der Pilot",
    runningHead: "State. Not Situation",
    teaserCount: 3,
    cta: "Leseprobe lesen",
    continueCta: "Weiterlesen",
    back: "Zurück zum Buch",
    readingModeLabel: "Lesemodus",
    paragraphs: [
      "Am Abend des 16. Juli 1999 startete in New Jersey ein kleines einmotoriges Flugzeug. Es war unterwegs nach Martha’s Vineyard. Der Pilot war erfahren genug, um sich seiner Sache sicher zu sein, und neu genug, um sich darin zu irren, was diese Sicherheit wert war. Er hatte rund 300 Flugstunden. Die Ausbildung, die ihn berechtigt hätte, nur nach seinen Instrumenten zu fliegen, hatte er nicht abgeschlossen.",
      "Beim Start war der Himmel klar, also schloss er daraus, dass er keine Instrumente brauchte. Als er die Küste erreichte, war der Himmel es nicht mehr. Dunst hatte sich über das Wasser gelegt. Die Art von Dunst, die die Linie zwischen Meer und Himmel so allmählich auslöscht, dass man nicht merkt, dass der Horizont weg ist, bis man ihn sucht und er nicht da ist. Über Land macht das nichts. Unten sind Lichter. Man sieht Straßen, Gebäude, eine Geometrie, die den Augen sagt, wo unten ist. Über offenem Wasser bei Nacht, mit Dunst, der auf der Oberfläche liegt wie eine zweite Dunkelheit, ist da nichts. Die Welt außerhalb des Cockpits wird in alle Richtungen zu einem einzigen Grau. Oben sieht aus wie unten. Eine sanfte Kurve fühlt sich an wie Geradeausflug. Ein langsames Sinken fühlt sich an, als hielte man die Höhe.",
      "Das Innenohr des Piloten, das Organ, das dem Gehirn meldet, wie der Körper im Raum liegt, funktioniert, indem es Veränderungen der Bewegung wahrnimmt. Geht man in eine Kurve, verschiebt sich die Flüssigkeit im Ohr, und das Gehirn registriert die Drehung. Hält die Kurve aber fünfzehn oder zwanzig Sekunden lang an, kommt die Flüssigkeit im Innenohr zur Ruhe. Sie bewegt sich nicht mehr. Das Gehirn, das Bewegung verfolgt, nicht Lage, schließt daraus, dass die Kurve zu Ende ist. Man hat das Gefühl, waagerecht zu fliegen, tut es aber nicht.",
      "Irgendwo über dem dunklen Wasser ging das Flugzeug in eine sanfte Linkskurve. Die Instrumente des Piloten, die Anzeigen auf dem Instrumentenbrett vor ihm, zeigten die Kurve. Der künstliche Horizont, eine kleine Kreiselanzeige, die den Winkel des Flugzeugs zur Erde zeigt, sagte ihm, dass er in Schräglage war. Der Höhenmesser sagte ihm, dass er sank. Der Fahrtmesser sagte ihm, dass er schneller wurde. Sein Körper sagte ihm etwas anderes. Sein Körper sagte ihm, dass er geradeaus und waagerecht flog. Sein Körper fühlte sich richtig an. Seine Instrumente fühlten sich falsch an. Er vertraute seinem Körper.",
      "Die Kurve wurde enger. Die Nase senkte sich. Die Fahrt nahm zu. In den letzten Sekunden sank das Flugzeug mit mehr als 4.700 Fuß pro Minute, fast anderthalb Kilometer alle sechzig Sekunden, in einer immer engeren Spirale. Piloten nennen sie, mit der düsteren Präzision eines Berufs, der die Arten benannt hat, auf die er Menschen verliert, Friedhofsspirale. Er schlug mit voller Geschwindigkeit auf dem Wasser auf. Er und seine beiden Passagiere starben beim Aufprall.",
      "Die Untersuchung fand keinen mechanischen Defekt. Der Motor lief. Die Instrumente funktionierten. Die Daten waren die ganze Zeit da, auf dem Instrumentenbrett, fünfzehn Zentimeter vor seinen Augen, aber er las sie nicht ab. Er las stattdessen seinen Körper. Die amerikanische Luftfahrtbehörde, die Federal Aviation Administration, hat eine Anweisung für Piloten, die in diese Situation geraten. Sie ist einen Satz lang. Die Anweisung ist wörtlich gemeint, und sie gilt für Ihr Leben so unmittelbar wie für ein Cockpit:",
      "Der Pilot hieß John F. Kennedy Jr. Er war der Sohn eines amerikanischen Präsidenten. Man hatte ihm geraten, in dieser Nacht nicht ohne seinen Fluglehrer zu fliegen. Er sagte seinem Fluglehrer, er wolle es allein machen. Er war achtunddreißig Jahre alt.",
      "Sie steuern einen Körper, der Signale erzeugt, und Ihr Kopf hält diese Signale oft für die Wahrheit. Manchmal liegen die Signale so falsch wie das Gleichgewichtsorgan im Innenohr über dunklem Wasser. Die Müdigkeit, die als Frage nach Ihrer Karriere daherkommt. Der Koffeinschub, der als Angst wegen einer E-Mail daherkommt. Der niedrige Blutzucker, der als Beleg dafür daherkommt, dass Ihre Beziehung scheitert. Ihr Körper spricht zuerst, und Ihr Kopf erklärt danach. Weil die Erklärung mit dem ganzen Gewicht körperlicher Überzeugung kommt, dem angespannten Kiefer, dem schnellen Herzschlag, der Hitze hinter den Ohren, fühlt sie sich an wie tiefes Wissen. Es fühlt sich an, als würden Sie die Situation lesen. Aber Sie lesen nur das Instrument ab, das die Situation liest, und die Einstellungen des Instruments waren schon verstellt, bevor die Situation da war. Diese Instrumente gibt es. Sie haben sie. Puls, Kieferspannung, Atemtiefe, Schulterhaltung, das Tempo Ihrer Gedanken. In diesem Moment liefern sie Daten, während Sie diesen Satz lesen. Aber der selbstsichere Wetterbericht, den der Körper über die Welt abgibt, ist nur ein Entwurf.",
    ],
    quoteAfter: 5,
    quote: "„vertrauen Sie Ihren Instrumenten und ignorieren Sie alle Signale Ihres Körpers, die dem widersprechen.“",
    closing:
      "In diesem Buch geht es um denselben Fehler, im Maßstab einer Küche. Die Version, die jeden Dienstag passiert. Die Version, in der Ihr Körper eine Geschichte über eine Nachricht, ein Schweigen, einen Blick schreibt und Ihr Kopf diese Geschichte redigiert, unter der Aufsicht dessen, was Ihr Körper gerade fühlt. Niemand stirbt, aber Entscheidungen fallen. Beziehungen verändern sich. Selbsteinschätzungen entstehen. Und nichts davon musste so kommen, wie es kam, denn die Daten waren die ganze Zeit da.",
    closingSource: "Seite 26",
    endNote: "Es folgt Kapitel Null: Ein Tag, der in Ordnung hätte sein sollen.",
    unavailable: "Die Leseprobe in dieser Sprache folgt.",
    folios: ["7", "8", "9"],
  },

  // Vier BEWEISMATERIAL-Seiten, aus dem Buch übernommen; die Schlusszeile ist Seite 20.
  cases: {
    eyebrow: "Beweismaterial",
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
        verified: "Nichts ist passiert.",
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
        chapter: "11",
        page: 150,
        time: "16:00",
        quote: "„Mit meinem Leben stimmt etwas nicht.“",
        inputLabel: "Input",
        input: "Sechs gewöhnliche Ereignisse. Ein erschöpfter Tag.",
        verifiedLabel: "Bestätigte Krise",
        verified: "Keine.",
      },
      {
        chapter: "13",
        page: 182,
        time: "22:40",
        quote: "„Das ist Zustand, nicht Situation.“",
        inputLabel: "Input",
        input: "Wenig Treibstoff. Kaputtes Licht. Ein Geräusch auf Splitt.",
        verifiedLabel: "Bestätigte Bedrohung",
        verified: "Noch nicht sichtbar.",
      },
    ],
    closing: "Es hieß: Ich versage. Die Daten waren: Ich bin müde.",
    closingSource: "Seite 20",
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
    unavailable: "Die Aufnahme folgt hier.",
  },

  map: {
    eyebrow: "Eine Karte des Buches",
    // Seite 20.
    systemsIntro:
      "An Katrins Morgen waren drei Systeme am Werk. Zeit fing um 06:38 an und hörte nicht mehr auf. Aufmerksamkeit griff um 06:52 nach dem Handy. Sicherheit schrieb um 07:25, was die E-Mail bedeutete. Sie kann keines davon benennen. Das Einzige, was sie benennen kann, ist David, und David ist der kleinste Teil davon.",
    // Seite 13.
    sortingTool:
      "Die folgenden Kapitel sind um drei Systeme herum aufgebaut, die prägen, wie die Signale Ihres Körpers gewichtet werden, bevor Ihr Kopf daraus eine Geschichte macht. Es sind keine Hirnregionen und keine Nervenbahnen. Diese Systeme sind ein Werkzeug zum Sortieren, eine Art, drei Fragen zu stellen, wenn sich alles auf einmal falsch anfühlt.",
    // Seiten 13 bis 14.
    loops: [
      {
        key: "time",
        name: "Zeit",
        body: "Schlaf, Essen, Koffein, zirkadiane Phase, Erholung. Stimmt das Timing nicht, steigt das Grundniveau der Empfindlichkeit. Dieselbe Welt fühlt sich härter an.",
      },
      {
        key: "attention",
        name: "Aufmerksamkeit",
        body: "Das System, das Belohnung, Neues und den nächsten Auslöser verfolgt. Ist es eingefangen, verengt sich der Fokus auf das, was gerade da ist und am wenigsten Mühe macht, und die Arbeit, die einem viel abverlangt, fühlt sich schwer an.",
      },
      {
        key: "safety",
        name: "Sicherheit",
        body: "Das System, das auf Bedrohung achtet, vor allem auf soziale Bedrohung. Auf Dinge wie Bewertung durch andere, Ausgrenzung, Mehrdeutigkeit, Status. Es ist schnell, es ist alt, und es neigt zu Fehlalarmen. Es erzeugt Deutungen, die sich wie Tatsachen anfühlen.",
      },
    ],
    // Seite 13, „Bevor wir anfangen“, beide Absätze.
    evidenceEyebrow: "Bevor wir anfangen",
    evidenceIntro:
      "Dieses Buch macht Aussagen über Gehirn und Körper, und diese Aussagen sind unterschiedlich gut belegt. Manche stützen sich auf Jahrzehnte replizierter Forschung. Manche stützen sich auf neuere Ergebnisse, die vielversprechend, aber noch nicht gesichert sind. Manche sind plausible Weiterführungen gesicherter Erkenntnisse, die in genau der Form, die dieses Buch beschreibt, noch nicht direkt geprüft wurden. Sie sollten wissen, was davon was ist.",
    evidenceMarkers:
      "Im ganzen Buch tragen wissenschaftliche Aussagen eine Markierung, die zeigt, wie gut sie belegt sind. Stützt sich ein Ergebnis auf solide, replizierte Belege, sehen Sie am Rand eine Grafik, gekennzeichnet als hoch belegt, mit einem tiefroten Herzschlag. Sind die Belege zwar ein Hinweis, aber unvollständig, steht dort mittel belegt, mit einem orangefarbenen Herzschlag. Ist eine Aussage eine plausible Hypothese, die noch strengere Prüfungen braucht, ist sie als niedrig markiert, in verblasstem Grau. Diese Markierungen gibt es, weil das Buch selbst dasselbe Risiko trägt, das es beschreibt. Es will eine plausible Geschichte nicht als gesicherte Wahrheit behandeln. Diese Markierungen sind eine Bremse dagegen.",
    grades: [
      { key: "high", label: "Hoch" },
      { key: "medium", label: "Mittel" },
      { key: "low", label: "Niedrig" },
    ],
    // Seite 11.
    investigationTitle: "Die Untersuchung",
    mapLine: "16 Fälle. Drei Befunde. Eine Frage: Zustand oder Situation?",
    pageColumn: "Seite",
    chapters: [
      { number: "00", title: "Ein Tag, der in Ordnung hätte sein sollen", page: 17 },
      { number: "01", title: "Das Radar hatte recht", page: 23 },
      { number: "02", title: "Warum sich neutraler Input bei Schlafmangel feindselig anfühlt", page: 29 },
      { number: "03", title: "Die Erleichterung, die zum Juckreiz wird", page: 39 },
      { number: "04", title: "Der vorhersehbare Auslöser", page: 51 },
      { number: "05", title: "Warum sich der Abend dehnt und der Morgen schrumpft", page: 67 },
      { number: "06", title: "Warum Ruhe nicht immer erholsam ist", page: 79 },
      { number: "07", title: "Warum Sie mit dem, was zählt, nicht anfangen können", page: 95 },
      { number: "08", title: "Die offene Akte", page: 105 },
      { number: "09", title: "Kommen zwei Nervensysteme in eine Küche", page: 121 },
      { number: "10", title: "Der Streit, der Dienstag war", page: 135 },
      { number: "11", title: "Der Donnerstag, der Mittwochabend war", page: 151 },
      { number: "12", title: "Das saubere Instrumentenbrett", page: 167 },
      { number: "13", title: "Das eine Mal, als der Körper recht hatte", page: 183 },
      { number: "14", title: "Es geht nicht um mich", page: 195 },
      { number: "15", title: "Die Vorhersage", page: 209 },
    ],
    mapFooter: "Nach den Kapiteln folgt „Der wissenschaftliche Herzschlag“.",
    // Seite 226.
    heartbeat: [
      "Jedes Kapitel hat hier drei Teile: eine kurze Notiz dazu, woher die Überlegungen kamen, eine Liste der Arbeiten, auf denen das Kapitel aufbaut, und eine Liste der Arbeiten, die es einschränken, komplizierter machen oder dieselben Belege anders erklären.",
      "Ließe man sie weg, sähe die Argumentation aufgeräumter aus, als sie ist.",
    ],
    heartbeatSource: "Seite 226",
  },

  author: {
    eyebrow: "Die Autorin",
    title: "Ivana Budišin",
    photoAlt: "Ivana Budišin, fotografiert vor dunkelgrauem Hintergrund.",
    photoPlaceholder: "Foto der Autorin folgt",
    bio: "Ivana Budišin ist klinische Psychologin und lebt und arbeitet in Luxemburg. State. Not Situation. ist ihr erstes Buch.",
    websiteLabel: "Website der Praxis",
    contactLabel: "Kontakt",
    pressLabel: "Pressematerial",
  },

  // Seite 225, der letzte Satz des Buches.
  closing: {
    question: "Ist das die Situation? Oder ist das ihr Zustand?",
    source: "Seite 225",
  },

  companion: {
    eyebrow: "Begleitend zum Buch",
    line: "[COPY NEEDED: one sentence about the companion tool, if you want it mentioned before it exists. Otherwise set companion.enabled to false in site.config.ts and this section disappears.]",
  },

  press: {
    eyebrow: "Presse",
    title: "Pressematerial",
    intro:
      "Rezensionsexemplare, gedruckt und digital, auf Anfrage. Abdruckrechte, Interviews und Veranstaltungen nach Absprache.",
    contactHeading: "Kontakt",
    assetsHeading: "Downloads",
    assets: [
      { label: "Cover, Vorderseite, hohe Auflösung", file: "/press/cover-front-2400.jpg", note: "JPEG, 2400 px breit" },
      { label: "Foto der Autorin", file: "/press/author-photo-1600.jpg", note: "JPEG, 1600 × 1600" },
      { label: "Buchansicht, freigestellt", file: "/press/mockup-3d-transparent.png", note: "PNG" },
      { label: "Webbanner", file: "/press/banner-web-2400x1000.jpg", note: "JPEG, 2400 × 1000" },
      { label: "Bild für Social Media, quadratisch", file: "/press/post-1x1-1080.jpg", note: "JPEG, 1080 × 1080" },
      { label: "Bild für Social Media, Hochformat", file: "/press/post-4x5-1080x1350.jpg", note: "JPEG, 1080 × 1350" },
      { label: "Bild für Social Media, Querformat", file: "/press/post-16x9-1920x1080.jpg", note: "JPEG, 1920 × 1080" },
      { label: "Leseprobe, die ersten Seiten", file: "/press/excerpt-the-opening.pdf", note: "PDF, vier Seiten" },
    ],
    photoUnavailable: "Foto der Autorin auf Anfrage.",
    bioHeading: "Biografie",
    bios: [
      {
        label: "Kurz",
        text: "Ivana Budišin ist klinische Psychologin und lebt und arbeitet in Luxemburg. State. Not Situation. ist ihr erstes Buch.",
      },
      {
        label: "Lang",
        text: "[COPY NEEDED: a longer biography, 100 to 150 words, in your own words. Qualifications, where you practise, and how the book came out of that work. Only what you would be happy to see checked.]",
      },
    ],
    factsHeading: "Bibliografische Angaben",
    facts: [
      { label: "Titel", value: "State. Not Situation." },
      { label: "Untertitel", value: "Ein Bestimmungsbuch für den Moment, bevor aus Deutung Wirklichkeit wird" },
      { label: "Autorin", value: "Ivana Budišin" },
      { label: "Verlag", value: "Budisin Publishing, Luxemburg" },
      { label: "Erscheinungsjahr", value: "2026" },
      { label: "Format", value: "Paperback, 6 × 9 Zoll (15,2 × 22,9 cm)" },
      { label: "Umfang", value: "278 Seiten" },
      { label: "ISBN-13", value: "978-2-87996-258-0" },
      { label: "Kategorie", value: "Psychologie / Kognitive Psychologie" },
      { label: "Sprache", value: "Englisch. Französische und deutsche Ausgabe folgen." },
      { label: "Pflichtexemplar", value: "Ein CIP-Eintrag liegt bei der Bibliothèque nationale du Luxembourg vor." },
    ],
    descriptionHeading: "Über das Buch",
    description: [
      "Sechzehn Tage lang geht Katrin durch alltägliche Situationen, in denen ihr erster Befund nicht immer der ist, der einem genaueren Blick standhält. Jedes Kapitel verfolgt einen dieser Momente in die Psychologie dahinter, von Aufmerksamkeit und Vorhersage über Gedächtnis, Bedrohung und Ungewissheit bis hin zu den Schlüssen, die wir über andere Menschen ziehen. Das Buch verspricht keine besseren Instinkte. Es fragt, was möglich wird, wenn wir lernen, woher unser erster Befund kam.",
      "Es will Ihnen weniger beibringen, Ihren Instinkten zu vertrauen, als Ihnen zeigen, worauf genau Sie da vertrauen.",
      "16 Fälle. Drei Befunde. Eine Frage: Zustand oder Situation?",
      "Jedes Kapitel hat hier drei Teile: eine kurze Notiz dazu, woher die Überlegungen kamen, eine Liste der Arbeiten, auf denen das Kapitel aufbaut, und eine Liste der Arbeiten, die es einschränken, komplizierter machen oder dieselben Belege anders erklären.",
      "Ließe man sie weg, sähe die Argumentation aufgeräumter aus, als sie ist.",
    ],
    creditsHeading: "Mitwirkende",
    credits: [
      { label: "Umschlaggestaltung", value: "Zoe Larusson" },
      { label: "Buchgestaltung und Satz", value: "Ivana Budišin" },
      { label: "Erschienen bei", value: "Budisin Publishing" },
    ],
    back: "Zurück zum Buch",
  },

  footer: {
    band: "Bevor Sie der Geschichte glauben.",
    // Seite 278.
    method: ["Lesen Sie die Instrumente ab.", "Lassen Sie die Geschichte warten.", "Lesen Sie noch einmal ab."],
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
    bookOpening: "Das Buch beim Aufschlagen",
    misreadingRegion: "Seite 10 des Buches",
    mapRegion: "Eine Karte des Buches",
  },
};
