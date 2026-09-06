import type { SiteContent } from "./types";

/**
 * FRENCH CONTENT. Same structure as content/en.ts, in the section order of
 * translation/EDITORIAL-POSITIONING.md (5 September 2026).
 *
 * Translated under translation/STANDARD.md (the author's standard, which
 * governs) and translation/METHOD-fr.md (the team's method, amended to it),
 * after a full reading of the almost-final book and a rereading of every
 * quoted page in its context. This is an authored French edition of the
 * page, not a word-for-word rendering: each sentence does in French what its
 * English does to the reader, at the same length, the same strength and the
 * same level of certainty. Nothing is added, no hedge is dropped.
 *
 * No French edition of the book exists, so the title "State. Not Situation."
 * stays untranslated everywhere, and every [COPY NEEDED: …] placeholder stays
 * in English so it reads as unfinished.
 *
 * Glossary held constant (translation memory in METHOD-fr.md):
 *   state = état, situation = situation, reading = lecture (verb: lire),
 *   instrument = instrument, panel / dashboard = tableau de bord,
 *   settings = réglages, signal = signal, cue = déclencheur, story = histoire,
 *   first reading = première lecture, draft = brouillon, baseline = niveau de
 *   base, threat = menace, attention = attention, loop = boucle,
 *   Time / Attention / Safety = Temps / Attention / Sécurité,
 *   case evidence = pièces du dossier, verified = vérifié,
 *   the Scientific Heartbeat = le pouls scientifique.
 *
 * Open points for the author are in translation/QUERIES-fr.md.
 *
 * Typography: narrow no-break space (U+202F) before ; ! ? and inside « »,
 * no-break space (U+00A0) before :, curly apostrophes, guillemets, "vous".
 * Identifiers, page numbers, times, ISBN and file paths are unchanged.
 */
export const fr: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description:
      "Un guide de terrain de l’instant où l’interprétation n’est pas encore devenue réalité. Seize cas. Trois lectures. Une question : état ou situation ? Par Ivana Budišin.",
    ogImageAlt:
      "La couverture de State. Not Situation. d’Ivana Budišin : le mot STATE en grand, en rouge, au-dessus de NOT SITUATION en noir, sur fond crème.",
    readTitle: "Lire un extrait",
    readDescription:
      "Les premières pages de State. Not Situation. d’Ivana Budišin : un pilote, de la brume au large, et une phrase de la Federal Aviation Administration.",
    pressTitle: "Presse",
    pressDescription:
      "Dossier de presse de State. Not Situation. d’Ivana Budišin : couverture, photographie de l’autrice, biographie, informations de publication et contact.",
  },

  nav: {
    book: "Le livre",
    read: "Lire",
    listen: "Écouter",
    author: "L’autrice",
    press: "Presse",
    skipToContent: "Aller au contenu",
    home: "State. Not Situation. Accueil",
  },

  status: {
    forthcoming: "À paraître",
    published: "Disponible",
    publicationDatePrefix: "Parution",
    buy: "Acheter sur Amazon",
    notifyHeading: "Être prévenu à la parution du livre.",
    notifyCta: "Être prévenu",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "votre@email.com",
    submit: "Prévenez-moi",
    success: "Merci. Vous aurez de mes nouvelles à la sortie du livre.",
    error: "L’envoi n’a pas abouti. Réessayez, ou écrivez-moi directement.",
    privacyNote: "Utilisée uniquement pour cette notification.",
    mailtoLabel: "M’écrire pour être prévenu",
    mailtoSubject: "Prévenez-moi de la sortie de State. Not Situation.",
    mailtoBody: "Merci de me prévenir quand State. Not Situation. sera disponible.",
  },

  hero: {
    // Front cover, all of it.
    eyebrow: "Temps · Attention · Sécurité",
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "Un guide de terrain de l’instant où l’interprétation n’est pas encore devenue réalité",
    strap: "Votre première lecture n’est pas toute l’histoire.",
    authorPrefix: "par",
    coverAlt:
      "Première de couverture de State. Not Situation. Le mot STATE en grand, en rouge, au-dessus de NOT SITUATION en noir, sur un fond crème imprimé de phrases barrées, à peine visibles, et de petits relevés d’instruments.",
    openAlt: "Le livre ouvert à sa page de titre, où l’on lit State. Not Situation.",
    readCta: "Lire un extrait",
    scrollHint: "Défiler",
  },

  // Page 10, in the order the page sets it.
  misreading: {
    eyebrow: "La première erreur de lecture",
    lines: ["Ce jour-là, rien ne s’est mal passé.", "Les instruments fonctionnaient.", "Les données étaient là depuis le début."],
    investigationLabel: "Ce livre est",
    investigation: "L’enquête.",
    readingsLabel: "Le même jour, cinq lectures",
    readings: [
      { time: "06:38", text: "Une lourdeur arrive avant la journée." },
      { time: "09:12", text: "Un e-mail de deux lignes se lit comme un verdict." },
      { time: "14:23", text: "Cinq mots neutres crispent une mâchoire." },
      { time: "17:45", text: "Un message sans réponse se met à réclamer un loyer." },
      { time: "22:47", text: "Deux lettres et un point ont l’air hostiles." },
    ],
    closing: ["Le corps parle d’abord.", "L’esprit explique ensuite."],
  },

  // Pages 12 to 13. A section mark sits in the book between runs 3 and 4.
  knowTheDay: {
    eyebrow: "Vous connaissez cette journée",
    runs: [
      "La journée dont je parle, c’est l’autre. La journée où rien ne s’est mal passé et où tout clochait. Elle a commencé avant que vous ne remarquiez qu’elle commençait. Quelque part entre le réveil et la douche, entre la douche et la cuisine, entre la cuisine et la première gorgée de ce que vous buvez pour devenir la personne que le matin exige. Quelque chose était déjà là. On aurait plutôt dit une texture. Une pesanteur dans les membres, une réticence dans la poitrine, une légère lourdeur posée derrière vos pensées comme un jour de pluie derrière une vitre.",
      "Vous avez eu cette journée. Tout le monde a eu cette journée. Vous l’avez eue des dizaines de fois et vous l’aurez encore et chaque fois l’histoire aura l’air vraie et chaque fois le lendemain matin dissoudra l’histoire.",
      "Le corps a parlé d’abord. L’esprit a expliqué ensuite, et cette explication est passée pour l’événement.",
      "Ce livre parle de cette méprise. Il parle de cette erreur comme d’un aspect quotidien, ambiant, invisible de la vie dans un corps qui produit sans cesse des signaux, que votre esprit, sans cesse, lit ou lit de travers. Avant tout cela, avant la science et le mécanisme et la raison pour laquelle l’instrument était mal calibré hier, essayez quelque chose tout de suite.",
    ],
  },

  // Page 13. The eyebrow is the page's own phrase.
  reading: {
    eyebrow: "Essayez quelque chose tout de suite",
    lead: "Quoi que vous ressentiez en lisant cette phrase.",
    steps: ["Observez votre mâchoire.", "Observez votre respiration.", "Observez vos épaules."],
    result: "Ce que vous avez trouvé, c’est une lecture.",
    afterResult:
      "Une lecture de l’instrument qui interprète tout ce qui vous entoure, en ce moment, y compris ces mots. La lecture est peut-être exacte. Peut-être pas. Vous ne pouvez pas le savoir tant que vous n’avez pas vu les réglages.",
    question: "Est-ce la situation ? Ou est-ce l’état ?",
  },

  book: {
    eyebrow: "Le livre",
    // Page 20.
    heading: "Même matin. Même paragraphe. Même Katrin. Instruments réglés autrement.",
    headingSource: "Page 20",
    // Ivana's own words, supplied 5 September 2026.
    paragraphs: [
      "Pendant seize jours, Katrin traverse des situations ordinaires où sa première lecture de ce qui se passe n’est pas toujours celle qui tient, à y regarder de plus près. Chaque chapitre suit l’un de ces moments jusque dans la psychologie qui le sous-tend, de l’attention et de la prédiction à la mémoire, à la menace, à l’incertitude et à l’inférence sociale. Le livre ne promet pas un meilleur instinct. Il demande ce qui devient possible quand nous apprenons d’où venait notre première lecture.",
      "Il cherche moins à vous apprendre à faire confiance à votre instinct qu’à vous montrer à quoi, au juste, vous faites confiance.",
    ],
    readersEyebrow: "À qui il s’adresse",
    // Page 14.
    readersAnchor:
      "Ce livre ne remplace pas l’aide d’un professionnel et il ne traite pas les troubles complexes comme des problèmes d’hygiène de vie. Il travaille dans l’écart entre « ça va » et « clinique », l’espace où la plupart des gens vivent la plupart des jours.",
    // Ivana's own words, supplied 5 September 2026.
    readers:
      "Pour quiconque a déjà été certain du sens d’une situation, puis a découvert qu’il se passait autre chose. Et pour les lecteurs qui s’intéressent à la psychologie de notre façon de remarquer, d’interpréter et de revoir le monde qui nous entoure.",
  },

  // Pages 7 to 9 of the book; the closing line is page 26.
  excerpt: {
    eyebrow: "Lire",
    title: "Avant les chapitres",
    sectionLabel: "Le pilote",
    runningHead: "State. Not Situation",
    teaserCount: 3,
    cta: "Lire un extrait",
    continueCta: "Lire la suite",
    back: "Retour au livre",
    readingModeLabel: "Mode lecture",
    paragraphs: [
      "Le soir du 16 juillet 1999, un petit avion monomoteur décolla du New Jersey. Il faisait route vers Martha’s Vineyard. Le pilote avait assez d’expérience pour être sûr de lui, et assez peu pour se tromper sur ce que valait cette assurance. Il avait environ 300 heures de vol. Il n’avait pas terminé la formation qui l’aurait qualifié pour voler aux seuls instruments.",
      "Le ciel était dégagé au départ, alors il en conclut qu’il n’avait pas besoin d’instruments. Le temps qu’il atteigne la côte, il ne l’était plus. Une brume s’était posée sur l’eau. Le genre de brume qui efface la limite entre la mer et le ciel si progressivement que vous ne remarquez pas que l’horizon a disparu, jusqu’au moment où vous le cherchez et où il n’est plus là. Au-dessus des terres, cela n’a pas d’importance. Il y a des lumières en dessous. Vous voyez des routes, des bâtiments, une géométrie qui dit à vos yeux où est le bas. Au large, la nuit, avec la brume posée sur la surface comme une seconde obscurité, il n’y a rien. Hors du cockpit, le monde devient un gris uniforme dans toutes les directions. Le haut ressemble au bas. Un léger virage donne la sensation d’un vol en palier. Une descente lente donne la sensation de tenir l’altitude.",
      "L’oreille interne du pilote, l’organe qui dit au cerveau dans quel sens le corps est orienté dans l’espace, fonctionne en détectant les changements de mouvement. Quand vous entrez en virage, le liquide à l’intérieur de l’oreille se déplace, et le cerveau enregistre une rotation. Mais si le virage se maintient pendant quinze ou vingt secondes, le liquide de l’oreille interne se stabilise. Il ne bouge plus. Le cerveau, qui suit le mouvement et non la position, en conclut que le virage est terminé. Vous vous sentez en palier, mais vous ne l’êtes pas.",
      "Quelque part au-dessus de l’eau sombre, l’avion s’engagea dans un léger virage à gauche. Les instruments du pilote, les cadrans du tableau de bord devant lui, indiquaient le virage. L’horizon artificiel, un petit cadran gyroscopique qui montre l’angle de l’appareil par rapport au sol, lui disait qu’il s’inclinait. L’altimètre lui disait qu’il descendait. L’indicateur de vitesse lui disait qu’il accélérait. Son corps lui disait autre chose. Son corps lui disait qu’il volait droit et en palier. Son corps sonnait juste. Ses instruments sonnaient faux. Il fit confiance à son corps.",
      "Le virage se resserra. Le nez tomba. La vitesse augmenta. Dans les dernières secondes, l’avion descendait à plus de 4 700 pieds par minute, près d’un kilomètre et demi toutes les soixante secondes, dans une spirale de plus en plus serrée que les pilotes appellent, avec la précision sinistre d’un métier qui a donné un nom aux façons dont il perd les siens, une spirale de la mort. Il percuta l’eau à pleine vitesse. Lui et ses deux passagers furent tués sur le coup.",
      "L’enquête ne releva aucune défaillance mécanique. Le moteur tournait. Les instruments fonctionnaient. Les données étaient là, sur le tableau de bord, à quinze centimètres de ses yeux, depuis le début, mais il ne les lut pas. Il lut son corps à la place. La consigne que la Federal Aviation Administration américaine donne aux pilotes qui se retrouvent dans cette situation tient en une phrase. C’est une consigne à prendre au pied de la lettre, et elle s’applique à votre vie aussi directement qu’à un cockpit :",
      "Le pilote s’appelait John F. Kennedy Jr. C’était le fils d’un président américain. On lui avait déconseillé de voler ce soir-là sans son instructeur. Il avait dit à son instructeur qu’il voulait le faire seul. Il avait trente-huit ans.",
      "Vous pilotez un corps qui produit des signaux, et votre esprit prend souvent ces signaux pour la vérité. Les signaux se trompent parfois autant que le système vestibulaire de l’oreille interne au-dessus de l’eau sombre. La fatigue qui se présente comme une question sur votre carrière. Le pic de caféine qui se présente comme de l’anxiété à propos d’un e-mail. Le manque de sucre dans le sang qui se présente comme la preuve que votre relation est en train de se défaire. Votre corps parle d’abord et votre esprit explique ensuite. L’explication, parce qu’elle arrive avec tout le poids de la conviction physique, la mâchoire serrée, le cœur qui bat vite, la chaleur derrière les oreilles, donne l’impression d’un savoir profond. Vous avez l’impression de lire la situation. Mais vous ne lisez que l’instrument qui lit la situation, et les réglages de l’instrument étaient faussés avant que la situation n’arrive. Ces instruments existent. Vous les avez. Le rythme cardiaque, la tension de la mâchoire, la profondeur de la respiration, la position des épaules, la vitesse de vos pensées. Ils produisent des données en ce moment même, pendant que vous lisez cette phrase. Mais le bulletin météo plein d’assurance que le corps établit sur le monde n’est qu’un brouillon.",
    ],
    quoteAfter: 5,
    quote:
      "« ayez confiance en vos instruments et ne tenez aucun compte des signaux contradictoires que vous envoie votre corps. »",
    // Page 26.
    closing:
      "Ce livre parle de la même erreur à l’échelle de la cuisine. La version qui arrive tous les mardis. La version où votre corps écrit une histoire à propos d’un message, d’un silence, d’un regard, et où votre esprit retouche cette histoire sous la supervision de ce que votre corps ressent à ce moment-là. Personne ne meurt, mais des décisions se prennent. Des relations changent. Des jugements sur soi se forment. Et rien de tout cela n’avait à se passer ainsi, parce que les données étaient là depuis le début.",
    closingSource: "Page 26",
    endNote: "Vient ensuite le chapitre zéro : Une journée qui aurait dû bien se passer.",
    unavailable: "L’extrait en français est à venir.",
    folios: ["7", "8", "9"],
  },

  // Four CASE EVIDENCE pages, reproduced from the book; the closing line is page 20.
  cases: {
    eyebrow: "Pièces du dossier",
    pageLabel: "Page",
    items: [
      {
        chapter: "00",
        page: 16,
        time: "06:38",
        quote: "« Quelque chose cloche. »",
        inputLabel: "Entrée",
        input: "Deux minutes avant le réveil.",
        verifiedLabel: "Événement vérifié",
        verified: "Il ne s’est rien passé.",
      },
      {
        chapter: "02",
        page: 28,
        time: "22:47",
        quote: "« ok. »",
        inputLabel: "Entrée",
        input: "Deux lettres. Un point.",
        verifiedLabel: "Ton vérifié",
        verified: "Aucun.",
      },
      {
        chapter: "11",
        page: 150,
        time: "16:00",
        quote: "« Quelque chose ne va pas dans ma vie. »",
        inputLabel: "Entrée",
        input: "Six événements ordinaires. Une journée à plat.",
        verifiedLabel: "Crise vérifiée",
        verified: "Aucune.",
      },
      {
        chapter: "13",
        page: 182,
        time: "22:40",
        quote: "« C’est l’état, pas la situation. »",
        inputLabel: "Entrée",
        input: "Réservoir bas. Néon mort. Un bruit sur le gravier.",
        verifiedLabel: "Menace vérifiée",
        verified: "Pas encore visible.",
      },
    ],
    closing: "Ça disait je suis en train d’échouer ; les données, c’était je suis fatiguée.",
    closingSource: "Page 20",
  },

  listen: {
    eyebrow: "Écouter",
    title: "Écouter un extrait",
    subtitle: "Lu par l’autrice",
    play: "Écouter",
    pause: "Pause",
    progress: "Position dans l’enregistrement",
    elapsed: "Écoulé",
    duration: "Durée",
    unavailable: "L’enregistrement sera ajouté ici.",
  },

  map: {
    eyebrow: "Une carte du livre",
    // Page 20.
    systemsIntro:
      "Trois systèmes ont tourné pendant toute la matinée de Katrin. Le Temps a démarré à 06:38 et ne s’est jamais arrêté. L’Attention a pris le téléphone à 06:52. La Sécurité a écrit le sens de l’e-mail à 07:25. Elle ne peut en nommer aucun. La seule chose qu’elle peut nommer, c’est David, et David en est la plus petite part.",
    // Page 13.
    sortingTool:
      "Les chapitres qui suivent sont organisés autour de trois systèmes qui règlent le poids que prennent les signaux de votre corps avant que votre esprit ne construise une histoire. Ce ne sont pas des régions du cerveau ni des voies neuronales. C’est un outil de tri, une façon de poser trois questions quand tout semble aller de travers en même temps.",
    // Pages 13 to 14.
    loops: [
      {
        key: "time",
        name: "Temps",
        body: "Sommeil, alimentation, caféine, phase circadienne, récupération. Quand le rythme est décalé, la sensibilité de base augmente. Le même monde paraît plus dur.",
      },
      {
        key: "attention",
        name: "Attention",
        body: "Le système qui suit la récompense, la nouveauté et le prochain déclencheur. Quand il est accaparé, l’attention se resserre sur ce qu’il y a de moins exigeant à portée de main, et le travail exigeant paraît difficile.",
      },
      {
        key: "safety",
        name: "Sécurité",
        body: "Le système qui surveille la menace, et surtout la menace sociale. Des choses comme l’évaluation sociale, l’exclusion, l’ambiguïté, le statut. Il est rapide, il est ancien, et il penche du côté des fausses alertes. Il produit des interprétations qui ressemblent à des faits.",
      },
    ],
    // Page 13, "Before We Begin", both paragraphs.
    evidenceEyebrow: "Avant de commencer",
    evidenceIntro:
      "Ce livre avance des affirmations sur le cerveau et sur le corps, et ces affirmations ne sont pas toutes également étayées. Certaines s’appuient sur des décennies de recherches répliquées. Certaines s’appuient sur des résultats plus récents, prometteurs mais pas encore consolidés. Certaines sont des prolongements plausibles d’une science établie, qui n’ont pas été testés directement sous la forme précise que décrit ce livre. Vous devriez savoir lesquelles sont lesquelles.",
    evidenceMarkers:
      "Tout au long du livre, les affirmations scientifiques portent un marqueur de confiance. Quand un résultat est solidement étayé et répliqué, vous verrez un repère indiquant un niveau de preuve élevé, sous la forme d’un pouls rouge profond dans la marge. Quand les preuves vont dans le sens de l’affirmation mais restent incomplètes, le niveau de preuve est noté moyen, avec un pouls orange. Quand une affirmation est une hypothèse plausible qui demande des tests plus poussés, elle est marquée faible, en gris délavé. Ces marqueurs existent parce que le risque que court ce livre est celui-là même qu’il décrit. Il ne veut pas traiter une histoire plausible comme une vérité établie. Ces marqueurs sont un frein à cela.",
    grades: [
      { key: "high", label: "Élevé" },
      { key: "medium", label: "Moyen" },
      { key: "low", label: "Faible" },
    ],
    // Page 11.
    investigationTitle: "L’enquête",
    mapLine: "16 cas. Trois lectures. Une question : état ou situation ?",
    pageColumn: "Page",
    chapters: [
      { number: "00", title: "Une journée qui aurait dû bien se passer", page: 17 },
      { number: "01", title: "Le radar avait raison", page: 23 },
      { number: "02", title: "Pourquoi le manque de sommeil fait paraître hostile ce qui est neutre", page: 29 },
      { number: "03", title: "Le soulagement qui tourne à la démangeaison", page: 39 },
      { number: "04", title: "Le déclencheur prévisible", page: 51 },
      { number: "05", title: "Pourquoi les soirées s’étirent et les matins rétrécissent", page: 67 },
      { number: "06", title: "Pourquoi le repos ne ressource pas toujours", page: 79 },
      { number: "07", title: "Pourquoi vous n’arrivez pas à commencer ce qui compte", page: 95 },
      { number: "08", title: "Le dossier ouvert", page: 105 },
      { number: "09", title: "Deux systèmes nerveux entrent dans une cuisine", page: 121 },
      { number: "10", title: "La dispute qui était mardi", page: 135 },
      { number: "11", title: "Le jeudi qui était mercredi soir", page: 151 },
      { number: "12", title: "Le tableau de bord au vert", page: 167 },
      { number: "13", title: "La fois où le corps avait raison", page: 183 },
      { number: "14", title: "Rien à voir avec moi", page: 195 },
      { number: "15", title: "La prévision", page: 209 },
    ],
    mapFooter: "Le pouls scientifique suit les chapitres.",
    // Page 226.
    heartbeat: [
      "Chaque chapitre a ici trois parties : une courte note sur l’origine de la réflexion, une liste des travaux sur lesquels le chapitre est construit, et une liste des travaux qui le limitent, le compliquent, ou expliquent autrement les mêmes résultats.",
      "Les laisser de côté ferait paraître l’argumentation plus nette qu’elle ne l’est.",
    ],
    heartbeatSource: "Page 226",
  },

  author: {
    eyebrow: "L’autrice",
    title: "Ivana Budišin",
    photoAlt: "Ivana Budišin, photographiée sur fond gris foncé.",
    photoPlaceholder: "Photographie de l’autrice à venir",
    bio: "Psychologue clinicienne, Ivana Budišin vit et travaille au Luxembourg. State. Not Situation. est son premier livre.",
    websiteLabel: "Site du cabinet",
    contactLabel: "Contact",
    pressLabel: "Dossier de presse",
  },

  // Page 225, the book's last sentence.
  closing: {
    question: "Est-ce la situation ? Ou est-ce leur état ?",
    source: "Page 225",
  },

  companion: {
    eyebrow: "En complément du livre",
    line: "[COPY NEEDED: one sentence about the companion tool, if you want it mentioned before it exists. Otherwise set companion.enabled to false in site.config.ts and this section disappears.]",
  },

  press: {
    eyebrow: "Presse",
    title: "Dossier de presse",
    intro:
      "Des exemplaires de presse, papier et numérique, sont disponibles sur demande. Reproduction d’extraits, entretiens et rencontres à convenir.",
    contactHeading: "Contact",
    assetsHeading: "Téléchargements",
    assets: [
      { label: "Première de couverture, haute résolution", file: "/press/cover-front-2400.jpg", note: "JPEG, 2400 px de large" },
      { label: "Photographie de l’autrice", file: "/press/author-photo-1600.jpg", note: "JPEG, 1600 × 1600" },
      { label: "Rendu du livre, fond transparent", file: "/press/mockup-3d-transparent.png", note: "PNG" },
      { label: "Bannière web", file: "/press/banner-web-2400x1000.jpg", note: "JPEG, 2400 × 1000" },
      { label: "Image pour les réseaux, carrée", file: "/press/post-1x1-1080.jpg", note: "JPEG, 1080 × 1080" },
      { label: "Image pour les réseaux, portrait", file: "/press/post-4x5-1080x1350.jpg", note: "JPEG, 1080 × 1350" },
      { label: "Image pour les réseaux, paysage", file: "/press/post-16x9-1920x1080.jpg", note: "JPEG, 1920 × 1080" },
      { label: "L’extrait d’ouverture", file: "/press/excerpt-the-opening.pdf", note: "PDF, quatre pages" },
    ],
    photoUnavailable: "Photographie de l’autrice disponible sur demande.",
    bioHeading: "Biographie",
    bios: [
      {
        label: "Courte",
        text: "Psychologue clinicienne, Ivana Budišin vit et travaille au Luxembourg. State. Not Situation. est son premier livre.",
      },
      {
        label: "Longue",
        text: "[COPY NEEDED: a longer biography, 100 to 150 words, in your own words. Qualifications, where you practise, and how the book came out of that work. Only what you would be happy to see checked.]",
      },
    ],
    factsHeading: "Publication",
    facts: [
      { label: "Titre", value: "State. Not Situation." },
      { label: "Sous-titre", value: "Un guide de terrain de l’instant où l’interprétation n’est pas encore devenue réalité" },
      { label: "Autrice", value: "Ivana Budišin" },
      { label: "Éditeur", value: "Budisin Publishing, Luxembourg" },
      { label: "Parution", value: "2026" },
      { label: "Format", value: "Broché, 15,2 × 22,9 cm (6 × 9 pouces)" },
      { label: "Pagination", value: "278 pages" },
      { label: "ISBN-13", value: "978-2-87996-258-0" },
      { label: "Catégorie", value: "Psychologie / Psychologie cognitive" },
      { label: "Langue", value: "Anglais. Éditions française et allemande à venir." },
      { label: "Dépôt légal", value: "Une notice CIP est disponible à la Bibliothèque nationale du Luxembourg." },
    ],
    descriptionHeading: "À propos du livre",
    description: [
      "Pendant seize jours, Katrin traverse des situations ordinaires où sa première lecture de ce qui se passe n’est pas toujours celle qui tient, à y regarder de plus près. Chaque chapitre suit l’un de ces moments jusque dans la psychologie qui le sous-tend, de l’attention et de la prédiction à la mémoire, à la menace, à l’incertitude et à l’inférence sociale. Le livre ne promet pas un meilleur instinct. Il demande ce qui devient possible quand nous apprenons d’où venait notre première lecture.",
      "Il cherche moins à vous apprendre à faire confiance à votre instinct qu’à vous montrer à quoi, au juste, vous faites confiance.",
      "16 cas. Trois lectures. Une question : état ou situation ?",
      "Chaque chapitre a ici trois parties : une courte note sur l’origine de la réflexion, une liste des travaux sur lesquels le chapitre est construit, et une liste des travaux qui le limitent, le compliquent, ou expliquent autrement les mêmes résultats.",
      "Les laisser de côté ferait paraître l’argumentation plus nette qu’elle ne l’est.",
    ],
    creditsHeading: "Crédits",
    credits: [
      { label: "Conception de la couverture", value: "Zoe Larusson" },
      { label: "Conception graphique et mise en page", value: "Ivana Budišin" },
      { label: "Publié par", value: "Budisin Publishing" },
    ],
    back: "Retour au livre",
  },

  footer: {
    band: "Avant de croire l’histoire.",
    // Page 278.
    method: ["Lisez le tableau de bord.", "Différez l’histoire.", "Refaites la lecture."],
    rights: "© 2026 Budisin Publishing",
    pressLink: "Presse",
    contactLink: "Contact",
    madeLine: "Même vie. Instruments réglés autrement.",
  },

  a11y: {
    mainLandmark: "Contenu principal",
    coverFigure: "Le livre",
    languageSwitcher: "Choisir la langue",
    languageComing: "édition à venir",
    casesRegion: "Pièces du dossier tirées du livre",
    bookOpening: "Le livre qui s’ouvre",
    misreadingRegion: "Page 10 du livre",
    mapRegion: "Une carte du livre",
  },
};
