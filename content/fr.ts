import type { SiteContent } from "./types";

/**
 * FRENCH CONTENT. Same structure as content/en.ts.
 *
 * A literary translation of the English site copy, for review by a native
 * speaker. No French edition of the book exists: the title "State. Not
 * Situation." is therefore left untranslated everywhere, including inside
 * sentences, and the [COPY NEEDED: …] placeholders are left in English so
 * they stay visibly unfinished.
 *
 * Terminology held constant: state = état, situation = situation,
 * reading = lecture (verb: lire), settings = réglages, input = entrée (as the
 * case-file label) or sollicitation (in prose),
 * cue = signal, draft = brouillon.
 *
 * Identifiers, page numbers, times, ISBN and file paths are unchanged.
 */
export const fr: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description:
      "Un guide de terrain du moment qui précède celui où l’interprétation devient réalité. Seize cas. Trois lectures. Une question : état ou situation ? Par Ivana Budišin.",
    ogImageAlt:
      "La couverture de State. Not Situation. d’Ivana Budišin : le mot STATE en grand, en rouge, au-dessus de NOT SITUATION en noir, sur fond crème.",
    readTitle: "Lire un extrait",
    readDescription:
      "Les premières pages de State. Not Situation. d’Ivana Budišin : un pilote, la brume sur la pleine mer et une phrase de la Federal Aviation Administration.",
    pressTitle: "Presse",
    pressDescription:
      "Dossier de presse pour State. Not Situation. d’Ivana Budišin : couverture, photographie de l’autrice, biographie, informations de publication et contact.",
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
    forthcoming: "Parution prochaine",
    published: "Disponible",
    publicationDatePrefix: "Paru le",
    buy: "Acheter sur Amazon",
    notifyHeading: "Recevoir un message à la parution du livre.",
    notifyCta: "Me prévenir",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "votre@email.com",
    submit: "Me prévenir",
    success: "Merci. Vous aurez de mes nouvelles à la parution du livre.",
    error: "L’envoi n’a pas abouti. Réessayez, ou écrivez-moi directement.",
    privacyNote: "Utilisée uniquement pour cette notification.",
    mailtoLabel: "M’écrire pour être prévenu",
    mailtoSubject: "Prévenez-moi de la parution de State. Not Situation.",
    mailtoBody: "Merci de me prévenir quand State. Not Situation. sera disponible.",
  },

  hero: {
    // Front cover, all of it.
    eyebrow: "Temps · Attention · Sécurité",
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "Un guide de terrain du moment qui précède celui où l’interprétation devient réalité",
    strap: "Votre première lecture n’est pas le fin mot de l’histoire.",
    authorPrefix: "par",
    coverAlt:
      "Première de couverture de State. Not Situation. Le mot STATE en grand, en rouge, au-dessus de NOT SITUATION en noir, sur un fond crème imprimé de pâles phrases barrées et de petites lectures d’instruments.",
    openAlt:
      "Le livre ouvert à sa page de faux-titre, où l’on lit State. Not Situation.",
    readCta: "Lire un extrait",
    scrollHint: "Faites défiler",
  },

  // Page 13, verbatim. The book asks the reader to take a reading; the site asks the same.
  reading: {
    eyebrow: "Avant de commencer",
    lead: "Quoi que vous ressentiez en lisant cette phrase.",
    steps: ["Vérifiez votre mâchoire.", "Vérifiez votre respiration.", "Vérifiez vos épaules."],
    result: "Ce que vous avez trouvé est une lecture.",
    afterResult:
      "Une lecture de l’instrument qui interprète tout ce qui vous entoure, en ce moment, y compris ces mots. La lecture peut être exacte. Elle peut ne pas l’être. Vous ne pouvez pas le savoir tant que vous n’avez pas vu les réglages.",
    question: "Est-ce la situation ? Ou est-ce l’état ?",
  },

  // Front matter, verbatim, plus the state-line legend printed with the chapter bars.
  loops: {
    eyebrow: "La ligne d’état",
    title: "Trois systèmes ont traversé la matinée de Katrin.",
    intro:
      "Les chapitres qui suivent sont organisés autour de trois systèmes qui façonnent la manière dont les signaux de votre corps sont pondérés avant que votre esprit ne construise une histoire. Ce ne sont ni des régions du cerveau ni des voies neuronales. C’est un outil de tri, une manière de poser trois questions quand tout semble aller de travers en même temps.",
    items: [
      {
        key: "time",
        name: "Temps",
        legend: "Phase circadienne, dette de sommeil, état métabolique",
        body:
          "Sommeil, nourriture, caféine, phase circadienne, récupération. Quand le rythme est décalé, la sensibilité de base augmente. Le même monde paraît plus dur.",
      },
      {
        key: "attention",
        name: "Attention",
        legend: "Boucles de récompense, vérification, passage d’une tâche à l’autre",
        body:
          "Le système qui suit la récompense, la nouveauté et le prochain signal. Quand il est capturé, la concentration se resserre sur la sollicitation disponible la moins coûteuse, et le travail coûteux paraît difficile.",
      },
      {
        key: "safety",
        name: "Sécurité",
        legend: "Détection des menaces, premiers brouillons, erreurs de lecture",
        body:
          "Le système qui surveille la menace, et surtout la menace sociale. L’évaluation sociale, l’exclusion, l’ambiguïté, le statut. Il est rapide, il est ancien, et il est biaisé vers les fausses alertes. Il produit des interprétations qui donnent l’impression d’être des faits.",
      },
    ],
    outro:
      "Le Temps a démarré à 06:38 et ne s’est jamais arrêté. L’Attention a pris le téléphone à 06:52. La Sécurité a écrit le sens de l’e-mail à 07:25. Elle ne peut en nommer aucun. La seule chose qu’elle peut nommer, c’est David, et David en est la plus petite partie.",
  },

  // The CASE EVIDENCE pages, reproduced from the book.
  cases: {
    eyebrow: "Pièces du dossier",
    title: "Seize cas. Trois lectures.",
    intro: "Chaque chapitre s’ouvre sur une de ces pages.",
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
        verified: "Rien ne s’est produit.",
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
        chapter: "05",
        page: 66,
        time: "22:30",
        quote: "« Étrangement capable. »",
        inputLabel: "Entrée",
        input: "Maison silencieuse. Écran ouvert. Heure tardive.",
        verifiedLabel: "Lecture suivante",
        verified: "06:38.",
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
        input: "Carburant bas. Lumière morte. Un bruit sur le gravier.",
        verifiedLabel: "Menace vérifiée",
        verified: "Pas encore visible.",
      },
      {
        chapter: "15",
        page: 208,
        time: "22:14",
        quote: "« Elle lit celle de demain. »",
        inputLabel: "Entrée",
        input: "Reposée. Nourrie. Calme.",
        verifiedLabel: "Lundi vérifié",
        verified: "Pas encore arrivé.",
      },
    ],
  },

  // Pages 7 to 9 of the book, verbatim.
  excerpt: {
    eyebrow: "Lire",
    title: "Avant les chapitres",
    sectionLabel: "Le pilote",
    runningHead: "State. Not Situation",
    teaserCount: 2,
    cta: "Lire un extrait",
    continueCta: "Continuer la lecture",
    back: "Retour au livre",
    readingModeLabel: "Mode lecture",
    paragraphs: [
      "Le soir du 16 juillet 1999, un petit avion monomoteur décolla du New Jersey. Il se dirigeait vers Martha’s Vineyard. Le pilote avait assez d’expérience pour être sûr de lui et assez peu pour se tromper sur ce que valait cette assurance. Il avait environ 300 heures de vol. Il n’avait pas terminé la formation qui l’aurait qualifié pour voler aux seuls instruments.",
      "Le ciel était dégagé au départ, et il en conclut qu’il n’avait pas besoin d’instruments. Quand il atteignit la côte, il ne l’était plus. Une brume s’était installée sur l’eau. Le genre de brume qui efface la ligne entre la mer et le ciel si progressivement que vous ne remarquez pas que l’horizon a disparu avant de le chercher et de ne pas le trouver. Au-dessus des terres, cela n’a pas d’importance. Il y a des lumières en dessous. Vous voyez des routes, des bâtiments, une géométrie qui dit à vos yeux où est le bas. Au-dessus de la pleine mer, la nuit, avec la brume posée sur la surface comme une seconde obscurité, il n’y a rien. Le monde en dehors du cockpit devient un gris uniforme dans toutes les directions. Le haut ressemble au bas. Un virage léger donne la sensation d’un vol en palier. Une descente lente donne la sensation de tenir son altitude.",
      "L’oreille interne du pilote, l’organe qui indique au cerveau comment le corps est orienté dans l’espace, fonctionne en détectant les changements de mouvement. Quand vous entrez en virage, le liquide contenu dans l’oreille se déplace et le cerveau enregistre une rotation. Mais si le virage se maintient quinze ou vingt secondes, le liquide de l’oreille interne se stabilise. Il cesse de bouger. Le cerveau, qui suit le mouvement et non la position, en conclut que le virage est terminé. Vous vous sentez à l’horizontale, mais vous ne l’êtes pas.",
      "Quelque part au-dessus de l’eau sombre, l’avion entra dans un léger virage à gauche. Les instruments du pilote, les cadrans du tableau de bord devant lui, indiquaient le virage. L’horizon artificiel, un petit indicateur gyroscopique qui donne l’angle de l’appareil par rapport à la terre, lui disait qu’il s’inclinait. L’altimètre lui disait qu’il descendait. L’indicateur de vitesse lui disait qu’il accélérait. Son corps lui disait autre chose. Son corps lui disait qu’il volait en ligne droite et à l’horizontale. Son corps lui semblait juste. Ses instruments lui semblaient faux. Il fit confiance à son corps.",
      "Le virage se resserra. Le nez plongea. La vitesse augmenta. Dans les dernières secondes, l’avion descendait à plus de 4 700 pieds par minute, près d’un kilomètre et demi toutes les soixante secondes, dans une spirale de plus en plus serrée que les pilotes appellent, avec la précision sinistre d’un métier qui a nommé les façons dont il perd des gens, une « spirale du cimetière ». Il percuta l’eau à pleine vitesse. Lui et ses deux passagers furent tués sur le coup.",
      "L’enquête ne trouva aucune défaillance mécanique. Le moteur tournait. Les instruments fonctionnaient. Les données étaient là, sur le tableau de bord, à quinze centimètres de ses yeux, pendant tout ce temps, mais il ne les lut pas. Il lut son corps à la place. L’instruction que la Federal Aviation Administration américaine donne aux pilotes qui se trouvent dans cette situation tient en une phrase. C’est une instruction littérale, qui s’applique à votre vie aussi directement qu’à un cockpit :",
      "Le pilote s’appelait John F. Kennedy Jr. C’était le fils d’un président américain. On lui avait déconseillé de voler ce soir-là sans son instructeur. Il dit à son instructeur qu’il voulait le faire seul. Il avait trente-huit ans.",
      "Vous pilotez un corps qui produit des signaux, et votre esprit traite souvent ces signaux comme des vérités. Ces signaux se trompent parfois autant que le système vestibulaire de l’oreille interne au-dessus de l’eau sombre. La fatigue qui se présente comme une question sur votre carrière. Le pic de caféine qui se présente comme de l’anxiété au sujet d’un e-mail. La baisse de sucre dans le sang qui se présente comme la preuve que votre relation est en train de se défaire. Votre corps parle d’abord, votre esprit explique ensuite. L’explication, parce qu’elle arrive avec tout le poids de la conviction physique, la mâchoire serrée, le cœur qui bat vite, la chaleur derrière les oreilles, donne l’impression d’un savoir profond. Elle donne l’impression que vous lisez la situation. Mais vous ne lisez que l’instrument qui lit la situation, et les réglages de l’instrument étaient décalés avant que la situation n’arrive. Ces instruments existent. Vous les avez. Le rythme cardiaque, la tension de la mâchoire, la profondeur du souffle, la position des épaules, la vitesse de vos pensées. Ils produisent des données en ce moment même, pendant que vous lisez cette phrase. Mais le bulletin météo que le corps annonce sur le monde, avec toute son assurance, n’est qu’un brouillon.",
    ],
    quoteAfter: 5,
    quote:
      "« ayez confiance en vos instruments et ignorez tous les signaux contradictoires que votre corps vous envoie. »",
    endNote: "Vient ensuite le chapitre zéro : Une journée qui aurait dû bien se passer.",
    unavailable: "L’extrait dans cette langue suivra.",
    folios: ["7", "8", "9"],
  },

  listen: {
    eyebrow: "Écouter",
    title: "Écouter un extrait",
    subtitle: "Lu par l’autrice",
    play: "Lecture",
    pause: "Pause",
    progress: "Position de lecture",
    elapsed: "Écoulé",
    duration: "Durée",
    unavailable: "L’enregistrement sera ajouté ici.",
  },

  about: {
    eyebrow: "Le livre",
    // Chapter Twelve, verbatim. It stands on its own, which a heading has to.
    title: "Le corps est un capteur avant d’être un narrateur.",
    // Page 12, verbatim, shown as a quotation so "that mistake" keeps its own context.
    quote:
      "Ce livre parle de cette méprise. Il parle de cette erreur comme d’un trait quotidien, ambiant, invisible du fait d’être vivant dans un corps qui produit sans cesse des signaux, que votre esprit ne cesse de lire, ou de mal lire.",
    quoteSource: "Page 12",
    // Ivana's own words, supplied 5 September 2026.
    paragraphs: [
      "Au fil de seize jours, Katrin traverse des situations ordinaires où sa première lecture de ce qui se passe n’est pas toujours celle qui résiste à un examen plus attentif. Chaque chapitre suit l’un de ces moments jusqu’à la psychologie qui le sous-tend, de l’attention et de la prédiction à la mémoire, la menace, l’incertitude et l’inférence sociale. Le livre ne promet pas de meilleurs instincts. Il demande ce qui devient possible lorsque nous apprenons d’où vient notre première lecture.",
      "Il cherche moins à vous apprendre à faire confiance à vos instincts qu’à vous montrer à quoi, exactement, vous faites confiance.",
    ],
    mapLine: "16 cas. Trois lectures. Une question : état ou situation ?",

    // "Before We Begin", page 13, verbatim, and the printed legend for the markers.
    evidenceEyebrow: "Avant de commencer",
    evidenceIntro:
      "Ce livre avance des affirmations sur le cerveau et sur le corps, et ces affirmations ne reposent pas toutes sur la même quantité de preuves. Certaines s’appuient sur des décennies de recherches répliquées. Certaines s’appuient sur des résultats plus récents, prometteurs mais pas encore établis. Certaines sont des prolongements plausibles d’une science établie qui n’ont pas été testés directement sous la forme précise que décrit ce livre. Vous devez pouvoir les distinguer.",
    grades: [
      { key: "high", label: "Élevé", shape: "Battement net et fort.", meaning: "Preuves répliquées et robustes." },
      { key: "medium", label: "Moyen", shape: "Irrégulier, amplitude plus faible.", meaning: "Preuves indicatives mais incomplètes." },
      { key: "low", label: "Faible", shape: "Tracé presque plat, faible ondulation.", meaning: "Simple hypothèse plausible." },
    ],
    overreachEyebrow: "Là où les chapitres en disent plus que leurs sources",
    overreach:
      "Les chapitres sont des récits et ont été laissés tels qu’ils ont été écrits. Voici les passages qu’un lecteur attentif relèvera, réunis ici en un seul endroit.",

    readersEyebrow: "À qui il s’adresse",
    readers:
      "Pour quiconque a déjà été certain du sens d’une situation, puis a découvert qu’autre chose était en train de se passer. Et pour les lecteurs intéressés par la psychologie de notre manière de remarquer, d’interpréter et de réviser le monde qui nous entoure.",

    mapEyebrow: "Une carte du livre",
    mapTitle: "L’enquête",
    mapSubtitle: "Même vie. Instruments réglés autrement.",
    pageColumn: "Page",
    chapters: [
      { number: "00", title: "Une journée qui aurait dû bien se passer", page: 17 },
      { number: "01", title: "Le radar avait raison", page: 23 },
      { number: "02", title: "Pourquoi le manque de sommeil fait paraître hostile ce qui est neutre", page: 29 },
      { number: "03", title: "Le soulagement qui tourne à la démangeaison", page: 39 },
      { number: "04", title: "Le signal prévisible", page: 51 },
      { number: "05", title: "Pourquoi les soirées s’étirent et les matins rétrécissent", page: 67 },
      { number: "06", title: "Pourquoi le repos ne répare pas toujours", page: 79 },
      { number: "07", title: "Pourquoi vous n’arrivez pas à commencer ce qui compte", page: 95 },
      { number: "08", title: "Le dossier ouvert", page: 105 },
      { number: "09", title: "Deux systèmes nerveux entrent dans une cuisine", page: 121 },
      { number: "10", title: "La dispute qui était mardi", page: 135 },
      { number: "11", title: "Le jeudi qui était mercredi soir", page: 151 },
      { number: "12", title: "Le tableau de bord propre", page: 167 },
      { number: "13", title: "La fois où le corps avait raison", page: 183 },
      { number: "14", title: "Il ne s’agit pas de moi", page: 195 },
      { number: "15", title: "La prévision", page: 209 },
    ],
    mapFooter: "Le Battement scientifique vient après les chapitres.",
  },

  author: {
    eyebrow: "L’autrice",
    title: "Ivana Budišin",
    photoAlt: "Ivana Budišin, photographiée sur un fond gris foncé.",
    photoPlaceholder: "Photographie de l’autrice à venir",
    bio: "Ivana Budišin est psychologue clinicienne ; elle vit et travaille au Luxembourg. State. Not Situation. est son premier livre.",
    websiteLabel: "Site du cabinet",
    contactLabel: "Contact",
    pressLabel: "Dossier de presse",
  },

  companion: {
    eyebrow: "En complément du livre",
    line: "[COPY NEEDED: one sentence about the companion tool, if you want it mentioned before it exists. Otherwise set companion.enabled to false in site.config.ts and this section disappears.]",
  },

  press: {
    eyebrow: "Presse",
    title: "Dossier de presse",
    intro:
      "Des exemplaires de presse, papier et numériques, sont disponibles sur demande. Droits de reproduction d’extraits, entretiens et rencontres à convenir.",
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
        text: "Ivana Budišin est psychologue clinicienne ; elle vit et travaille au Luxembourg. State. Not Situation. est son premier livre.",
      },
      {
        label: "Longue",
        text: "[COPY NEEDED: a longer biography, 100 to 150 words, in your own words. Qualifications, where you practise, and how the book came out of that work. Only what you would be happy to see checked.]",
      },
    ],
    factsHeading: "Publication",
    facts: [
      { label: "Titre", value: "State. Not Situation." },
      { label: "Sous-titre", value: "Un guide de terrain du moment qui précède celui où l’interprétation devient réalité" },
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
      "Au fil de seize jours, Katrin traverse des situations ordinaires où sa première lecture de ce qui se passe n’est pas toujours celle qui résiste à un examen plus attentif. Chaque chapitre suit l’un de ces moments jusqu’à la psychologie qui le sous-tend, de l’attention et de la prédiction à la mémoire, la menace, l’incertitude et l’inférence sociale. Le livre ne promet pas de meilleurs instincts. Il demande ce qui devient possible lorsque nous apprenons d’où vient notre première lecture.",
      "Il cherche moins à vous apprendre à faire confiance à vos instincts qu’à vous montrer à quoi, exactement, vous faites confiance.",
      "Seize cas. Trois lectures. Une question : état ou situation ?",
      "Chaque chapitre porte un indice de confiance indiquant la quantité de preuves sur laquelle reposent ses affirmations, et la section des références recense à la fois les travaux sur lesquels chaque chapitre s’appuie et ceux qui en limitent la portée, ainsi que les endroits où les chapitres en disent plus que leurs sources.",
    ],
    creditsHeading: "Crédits",
    credits: [
      { label: "Conception de la couverture", value: "Zoe Larusson" },
      { label: "Conception et composition du livre", value: "Ivana Budišin" },
      { label: "Publié par", value: "Budisin Publishing" },
    ],
    back: "Retour au livre",
  },

  footer: {
    band: "Avant de croire l’histoire.",
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
    casesRegion: "Pièces du dossier extraites du livre",
    bookOpening: "Le livre qui s’ouvre",
  },
};
