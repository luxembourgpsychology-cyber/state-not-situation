import type { SiteContent } from "./types";

/**
 * GERMAN CONTENT. Same structure as content/en.ts.
 *
 * A literary translation of the English site copy, for review by a native
 * speaker. No German edition of the book exists yet, so the title
 * "State. Not Situation." is left untranslated everywhere, as are the ISBN,
 * page numbers, times, file paths and proper nouns.
 *
 * Terminology held constant throughout:
 *   state       → Zustand
 *   situation   → Situation
 *   reading     → Messwert (the instrument sense; the verb is lesen / ablesen)
 *   settings    → Einstellungen
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
      "Ein Feldführer für den Moment, bevor aus Deutung Wirklichkeit wird. Sechzehn Fälle. Drei Messwerte. Eine Frage: Zustand oder Situation? Von Ivana Budišin.",
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
    notifyCta: "Benachrichtigt werden",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "ihre@email.com",
    submit: "Benachrichtigen Sie mich",
    success: "Danke. Sie hören von mir, sobald das Buch erschienen ist.",
    error: "Das wurde nicht gesendet. Bitte versuchen Sie es noch einmal oder schreiben Sie mir direkt.",
    privacyNote: "Wird nur für diese Benachrichtigung verwendet.",
    mailtoLabel: "Schreiben Sie mir, um benachrichtigt zu werden",
    mailtoSubject: "Sagen Sie mir Bescheid, wenn State. Not Situation. erscheint",
    mailtoBody: "Bitte lassen Sie mich wissen, wenn State. Not Situation. erhältlich ist.",
  },

  hero: {
    // Front cover, all of it. The title itself stays as printed.
    eyebrow: "Zeit · Aufmerksamkeit · Sicherheit",
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "Ein Feldführer für den Moment, bevor aus Deutung Wirklichkeit wird",
    strap: "Ihr erster Messwert ist nicht die ganze Geschichte.",
    authorPrefix: "von",
    coverAlt:
      "Vorderseite des Covers von State. Not Situation. Das Wort STATE groß in Rot über NOT SITUATION in Schwarz, auf cremefarbenem Grund, bedruckt mit blassen, durchgestrichenen Sätzen und kleinen Messwerten.",
    openAlt:
      "Das Buch, aufgeschlagen auf dem Schmutztitel, der State. Not Situation. trägt.",
    readCta: "Einen Auszug lesen",
    scrollHint: "Scrollen",
  },

  // Seite 13, wortgetreu. Das Buch bittet die Lesenden um einen Messwert; die Website tut dasselbe.
  reading: {
    eyebrow: "Bevor wir beginnen",
    lead: "Was auch immer Sie fühlen, während Sie diesen Satz lesen.",
    steps: ["Prüfen Sie Ihren Kiefer.", "Prüfen Sie Ihren Atem.", "Prüfen Sie Ihre Schultern."],
    result: "Was Sie gefunden haben, ist ein Messwert.",
    afterResult:
      "Ein Messwert des Instruments, das in diesem Moment alles um Sie herum deutet, auch diese Worte. Der Messwert kann zutreffen. Er kann auch nicht zutreffen. Sie können es nicht wissen, bevor Sie die Einstellungen gesehen haben.",
    question: "Ist das die Situation? Oder ist das der Zustand?",
  },

  // Vorspann des Buches, wortgetreu, dazu die gedruckte Legende der Zustandslinie.
  loops: {
    eyebrow: "Die Zustandslinie",
    title: "Drei Systeme liefen durch Katrins Morgen.",
    intro:
      "Die folgenden Kapitel sind um drei Systeme herum angeordnet, die prägen, wie die Signale Ihres Körpers gewichtet werden, bevor Ihr Verstand daraus eine Geschichte baut. Es sind keine Hirnregionen und keine neuronalen Bahnen. Sie sind ein Sortierwerkzeug, eine Möglichkeit, drei Fragen zu stellen, wenn sich alles auf einmal falsch anfühlt.",
    items: [
      {
        key: "time",
        name: "Zeit",
        legend: "Zirkadiane Phase, Schlafdefizit, Stoffwechselzustand",
        body:
          "Schlaf, Essen, Koffein, zirkadiane Phase, Erholung. Wenn das Timing nicht stimmt, steigt die Grundempfindlichkeit. Dieselbe Welt fühlt sich härter an.",
      },
      {
        key: "attention",
        name: "Aufmerksamkeit",
        legend: "Belohnungsschleifen, Kontrollieren, Aufgabenwechsel",
        body:
          "Das System, das Belohnung, Neuheit und den nächsten Reiz verfolgt. Wenn es vereinnahmt ist, verengt sich der Fokus auf den billigsten verfügbaren Input, und die teure Arbeit fühlt sich schwer an.",
      },
      {
        key: "safety",
        name: "Sicherheit",
        legend: "Bedrohungserkennung, erste Entwürfe, Fehldeutungen",
        body:
          "Das System, das Bedrohung überwacht, vor allem soziale Bedrohung. Zum Beispiel soziale Bewertung, Ausschluss, Mehrdeutigkeit, Status. Es ist schnell, es ist alt, und es neigt zu Fehlalarmen. Es erzeugt Deutungen, die sich wie Tatsachen anfühlen.",
      },
    ],
    outro:
      "Zeit begann um 06:38 und hörte nie auf. Aufmerksamkeit nahm um 06:52 das Telefon. Sicherheit schrieb um 07:25 die Bedeutung der E-Mail. Katrin kann keines von ihnen benennen. Das Einzige, was sie benennen kann, ist David, und David ist der kleinste Teil davon.",
  },

  // Die CASE-EVIDENCE-Seiten, aus dem Buch übernommen.
  cases: {
    eyebrow: "Beweismaterial",
    title: "Sechzehn Fälle. Drei Messwerte.",
    intro: "Jedes Kapitel beginnt mit einer dieser Seiten.",
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
        verifiedLabel: "Nächster Messwert",
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
      "Am Abend des 16. Juli 1999 startete ein kleines einmotoriges Flugzeug in New Jersey. Es war auf dem Weg nach Martha’s Vineyard. Der Pilot war erfahren genug, um selbstsicher zu sein, und neu genug, um sich darüber zu täuschen, was diese Selbstsicherheit wert war. Er hatte etwa 300 Stunden in der Luft. Er hatte die Ausbildung nicht abgeschlossen, die ihn berechtigt hätte, nur nach seinen Instrumenten zu fliegen.",
      "Der Himmel war klar, als er startete, also schloss er daraus, dass er keine Instrumente brauchte. Als er die Küste erreichte, war der Himmel es nicht mehr. Dunst hatte sich über das Wasser gelegt. Die Art von Dunst, die die Linie zwischen Meer und Himmel so allmählich auslöscht, dass Sie nicht bemerken, dass der Horizont fort ist, bis Sie ihn suchen und er nicht da ist. Über Land spielt das keine Rolle. Unten sind Lichter. Sie sehen Straßen, Gebäude, eine Geometrie, die Ihren Augen sagt, wo unten ist. Über offenem Wasser bei Nacht, mit Dunst, der wie eine zweite Dunkelheit auf der Oberfläche liegt, gibt es nichts. Die Welt außerhalb des Cockpits wird in jeder Richtung zu einem gleichmäßigen Grau. Oben sieht aus wie unten. Eine sanfte Kurve fühlt sich an wie Horizontalflug. Ein langsames Sinken fühlt sich an, als hielte man die Höhe.",
      "Das Innenohr des Piloten – das Organ, das dem Gehirn sagt, wie der Körper im Raum ausgerichtet ist – arbeitet, indem es Bewegungsänderungen wahrnimmt. Wenn Sie in eine Kurve gehen, verschiebt sich die Flüssigkeit im Ohr, und das Gehirn registriert die Drehung. Wenn die Kurve aber fünfzehn oder zwanzig Sekunden lang gleichmäßig bleibt, kommt die Flüssigkeit im Innenohr zur Ruhe. Sie hört auf, sich zu bewegen. Das Gehirn, das Bewegung verfolgt, nicht Position, schließt daraus, dass die Kurve zu Ende ist. Sie haben das Gefühl, waagerecht zu fliegen, tun es aber nicht.",
      "Irgendwo über dem dunklen Wasser ging das Flugzeug in eine sanfte Linkskurve. Die Instrumente des Piloten, die Anzeigen auf dem Instrumentenbrett vor ihm, zeigten die Kurve. Der künstliche Horizont, eine kleine Kreiselanzeige, die den Winkel des Flugzeugs zur Erde darstellt, sagte ihm, dass er in Schräglage war. Der Höhenmesser sagte ihm, dass er sank. Der Fahrtmesser sagte ihm, dass er schneller wurde. Sein Körper sagte ihm etwas anderes. Sein Körper sagte ihm, dass er geradeaus und waagerecht flog. Sein Körper fühlte sich richtig an. Seine Instrumente fühlten sich falsch an. Er vertraute seinem Körper.",
      "Die Kurve wurde enger. Die Nase sank. Die Fahrt nahm zu. In den letzten Sekunden sank das Flugzeug mit mehr als 4.700 Fuß pro Minute, fast anderthalb Kilometer alle sechzig Sekunden, in einer sich immer enger ziehenden Spirale. Piloten haben ihr, mit der grimmigen Genauigkeit eines Berufsstandes, der die Arten benannt hat, auf die er Menschen verliert, einen Namen gegeben: Todesspirale. Er schlug mit voller Geschwindigkeit auf dem Wasser auf. Er und seine beiden Passagiere kamen beim Aufprall ums Leben.",
      "Die Untersuchung ergab kein technisches Versagen. Der Motor lief. Die Instrumente funktionierten. Die Daten waren genau da, auf dem Instrumentenbrett, fünfzehn Zentimeter vor seinen Augen, die ganze Zeit, aber er las sie nicht ab. Er las stattdessen seinen Körper. Die Anweisung der amerikanischen Luftfahrtbehörde (Federal Aviation Administration) an Piloten, die sich in dieser Situation wiederfinden, ist einen Satz lang. Sie ist wörtlich gemeint und gilt für Ihr Leben so unmittelbar wie für ein Cockpit:",
      "Der Pilot hieß John F. Kennedy Jr. Er war der Sohn eines amerikanischen Präsidenten. Man hatte ihm geraten, in dieser Nacht nicht ohne seinen Fluglehrer zu fliegen. Er sagte seinem Fluglehrer, er wolle es allein tun. Er war achtunddreißig Jahre alt.",
      "Sie bedienen einen Körper, der Signale erzeugt, und Ihr Verstand behandelt diese Signale oft als Wahrheit. Die Signale sind manchmal so falsch wie das Gleichgewichtssystem des Innenohrs über dunklem Wasser. Die Müdigkeit, die sich als Frage nach Ihrer Karriere darstellt. Der Koffeinschub, der sich als Angst wegen einer E-Mail darstellt. Der niedrige Blutzucker, der sich als Beweis dafür darstellt, dass Ihre Beziehung scheitert. Ihr Körper spricht zuerst, Ihr Verstand erklärt danach. Weil die Erklärung mit dem vollen Gewicht körperlicher Überzeugung ankommt, dem festen Kiefer, dem schnellen Herzschlag, der Hitze hinter den Ohren, fühlt sie sich wie tiefes Wissen an. Es fühlt sich an, als würden Sie die Situation lesen. Aber Sie lesen nur das Instrument, das die Situation liest, und die Einstellungen des Instruments waren schon verstellt, bevor die Situation eintrat. Diese Instrumente gibt es. Sie haben sie. Herzfrequenz, Kieferspannung, Atemtiefe, Schulterhaltung, die Geschwindigkeit Ihrer Gedanken. Diese Instrumente erzeugen gerade jetzt Daten, während Sie diesen Satz lesen. Aber der selbstsichere Wetterbericht, den der Körper über die Welt abgibt, ist nur ein Entwurf.",
    ],
    quoteAfter: 5,
    quote:
      "„haben Sie Vertrauen in Ihre Instrumente und ignorieren Sie alle widersprüchlichen Signale, die Ihr Körper Ihnen gibt.“",
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
    unavailable: "Die Aufnahme wird hier ergänzt.",
  },

  about: {
    eyebrow: "Das Buch",
    // Kapitel Zwölf, wortgetreu.
    title: "Der Körper ist ein Sensor, bevor er ein Erzähler ist.",
    // Seite 12, wortgetreu, als Zitat gesetzt, damit „dieser Fehler“ seinen Kontext behält.
    quote:
      "In diesem Buch geht es um diesen Fehler. Es geht um diesen Irrtum als tägliches, allgegenwärtiges, unsichtbares Merkmal des Lebens in einem Körper, der ständig Signale erzeugt, die Ihr Verstand ständig liest oder falsch liest.",
    quoteSource: "Seite 12",
    // Ivanas eigene Worte, geliefert am 5. September 2026.
    paragraphs: [
      "Über sechzehn Tage hinweg bewegt sich Katrin durch gewöhnliche Situationen, in denen ihr erster Messwert dessen, was geschieht, nicht immer der ist, der einem genaueren Blick standhält. Jedes Kapitel folgt einem dieser Momente in die darunterliegende Psychologie, von Aufmerksamkeit und Vorhersage über Gedächtnis, Bedrohung und Ungewissheit bis zur sozialen Inferenz. Das Buch verspricht keine besseren Instinkte. Es fragt, was möglich wird, wenn wir lernen, woher unser erster Messwert kam.",
      "Es ist weniger daran interessiert, Ihnen beizubringen, Ihren Instinkten zu vertrauen, als daran, Ihnen zu zeigen, worauf genau Sie vertrauen.",
    ],
    mapLine: "16 Fälle. Drei Messwerte. Eine Frage: Zustand oder Situation?",

    // „Bevor wir beginnen“, Seite 13, wortgetreu, und die gedruckte Legende der Marker.
    evidenceEyebrow: "Bevor wir beginnen",
    evidenceIntro:
      "Dieses Buch stellt Behauptungen über das Gehirn und den Körper auf, und diese Behauptungen sind unterschiedlich gut belegt. Manche stützen sich auf Jahrzehnte replizierter Forschung. Manche stützen sich auf neuere Befunde, die vielversprechend, aber noch nicht gesichert sind. Manche Behauptungen sind plausible Erweiterungen gesicherter Erkenntnisse, die in der konkreten Form, die dieses Buch beschreibt, nicht direkt geprüft wurden. Sie sollten wissen, was worauf beruht.",
    grades: [
      { key: "high", label: "Hoch", shape: "Sauberer, kräftiger Herzschlag.", meaning: "Replizierte, robuste Evidenz." },
      { key: "medium", label: "Mittel", shape: "Unregelmäßig, geringere Amplitude.", meaning: "Hinweise, aber unvollständig." },
      { key: "low", label: "Niedrig", shape: "Nahezu Nulllinie, schwache Welle.", meaning: "Nur eine plausible Hypothese." },
    ],
    overreachEyebrow: "Wo die Kapitel mehr sagen als ihre Quellen",
    overreach:
      "Die Kapitel sind Geschichten und wurden so belassen, wie sie geschrieben sind. Dies sind die Stellen, die aufmerksamen Leserinnen und Lesern auffallen werden, hier einmal gesammelt.",

    readersEyebrow: "Für wen es ist",
    readers:
      "Für alle, die je sicher waren, was eine Situation bedeutete, und dann feststellten, dass etwas anderes geschah. Und für Leserinnen und Leser, die sich für die Psychologie dessen interessieren, wie wir die Welt um uns herum wahrnehmen, deuten und revidieren.",

    mapEyebrow: "Eine Karte des Buches",
    mapTitle: "Die Untersuchung",
    mapSubtitle: "Dasselbe Leben. Andere Instrumenteneinstellungen.",
    pageColumn: "Seite",
    chapters: [
      { number: "00", title: "Ein Tag, der in Ordnung hätte sein sollen", page: 17 },
      { number: "01", title: "Das Radar hatte recht", page: 23 },
      { number: "02", title: "Warum sich neutraler Input bei Schlafmangel feindselig anfühlt", page: 29 },
      { number: "03", title: "Die Erleichterung, die zum Juckreiz wird", page: 39 },
      { number: "04", title: "Der vorhersehbare Reiz", page: 51 },
      { number: "05", title: "Warum Abende sich dehnen und Morgen schrumpfen", page: 67 },
      { number: "06", title: "Warum Ruhe nicht immer erholsam ist", page: 79 },
      { number: "07", title: "Warum Sie mit dem, was zählt, nicht anfangen können", page: 95 },
      { number: "08", title: "Die offene Akte", page: 105 },
      { number: "09", title: "Kommen zwei Nervensysteme in eine Küche", page: 121 },
      { number: "10", title: "Der Streit, der der Dienstag war", page: 135 },
      { number: "11", title: "Der Donnerstag, der der Mittwochabend war", page: 151 },
      { number: "12", title: "Das saubere Instrumentenbrett", page: 167 },
      { number: "13", title: "Das eine Mal, als der Körper recht hatte", page: 183 },
      { number: "14", title: "Es geht nicht um mich", page: 195 },
      { number: "15", title: "Die Vorhersage", page: 209 },
    ],
    mapFooter: "Der wissenschaftliche Herzschlag folgt auf die Kapitel.",
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
      "Rezensionsexemplare, gedruckt und digital, sind auf Anfrage erhältlich. Abdruckrechte für Auszüge sowie Interviews und Veranstaltungen nach Absprache.",
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
      { label: "Der einleitende Auszug", file: "/press/excerpt-the-opening.pdf", note: "PDF, vier Seiten" },
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
      "Über sechzehn Tage hinweg bewegt sich Katrin durch gewöhnliche Situationen, in denen ihr erster Messwert dessen, was geschieht, nicht immer der ist, der einem genaueren Blick standhält. Jedes Kapitel folgt einem dieser Momente in die darunterliegende Psychologie, von Aufmerksamkeit und Vorhersage über Gedächtnis, Bedrohung und Ungewissheit bis zur sozialen Inferenz. Das Buch verspricht keine besseren Instinkte. Es fragt, was möglich wird, wenn wir lernen, woher unser erster Messwert kam.",
      "Es ist weniger daran interessiert, Ihnen beizubringen, Ihren Instinkten zu vertrauen, als daran, Ihnen zu zeigen, worauf genau Sie vertrauen.",
      "Sechzehn Fälle. Drei Messwerte. Eine Frage: Zustand oder Situation?",
      "Jedes Kapitel trägt einen Konfidenzmarker, der zeigt, auf wie viel Evidenz seine Behauptungen ruhen, und das Literaturverzeichnis nennt sowohl die Arbeiten, auf denen das jeweilige Kapitel aufbaut, als auch jene, die es begrenzen, zusammen mit den Stellen, an denen die Kapitel mehr sagen als ihre Quellen.",
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
    madeLine: "Dasselbe Leben. Andere Instrumenteneinstellungen.",
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
