import type { SiteContent } from "./types";

/**
 * FRENCH CONTENT. Same structure as content/en.ts, the canonical architecture
 * of brief/REDESIGN.md. Written under translation/STANDARD.md and
 * translation/METHOD-fr.md as an authored French edition, not a word-for-word
 * rendering. The book title stays untranslated; no French edition exists yet.
 *
 * Re-authored 22 September 2026 after a French author's marked-up review of
 * the live page (Laurent Rouach, 20 September 2026): his corrections to the
 * strap, the sensor line and the opening extract are carried word for word,
 * and the rest of the file was re-read to the standard they set. Record in
 * translation/METHOD-fr.md, "The French author's review, 2026-09-22".
 *
 * An empty string renders as ⟦fr: some.key⟧ and never as silent English.
 */
export const fr: SiteContent = {
  meta: {
    title: "State. Not Situation.",
    titleTemplate: "%s · State. Not Situation.",
    description: "Pourquoi votre corps décide avant vous du sens d’un moment. Psychologue clinicienne, Ivana Budišin vit et travaille au Luxembourg. State. Not Situation. est son premier livre.",
    ogImageAlt: "State. Not Situation., d’Ivana Budišin. Pourquoi votre corps décide avant vous du sens d’un moment.",
    readTitle: "Lire un extrait",
    readDescription: "Les premières pages de State. Not Situation., d’Ivana Budišin.",
    pressTitle: "Presse",
    pressDescription: "Dossier de presse de State. Not Situation., d’Ivana Budišin : couverture, photographie de l’autrice, informations de publication, extrait."
  },
  nav: {
    home: "State. Not Situation., accueil",
    book: "Le livre",
    read: "L’extrait",
    author: "L’autrice",
    press: "Presse",
    listen: "Écouter",
    skipToContent: "Aller au contenu",
    menu: "Menu",
    closeMenu: "Fermer"
  },
  status: {
    forthcoming: "À paraître",
    published: "Paru",
    publicationDatePrefix: "Parution",
    forthcomingDatePrefix: "Parution le",
    buy: "Acheter sur Amazon",
    notifyCta: "Avis de parution",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "votre@email.com",
    submit: "Me prévenir",
    success: "Merci. Vous recevrez un seul message, à la sortie du livre.",
    error: "L’envoi n’a pas abouti. Réessayez, ou écrivez-moi directement.",
    privacyNote: "Adresse utilisée pour cet avis de parution, et pour rien d’autre.",
    mailtoSubject: "State. Not Situation., avis de parution",
    mailtoBody: "Merci de me prévenir quand le livre paraîtra."
  },
  hero: {
    titleA: "State.",
    titleB: "Not Situation",
    subtitle: "Pourquoi votre corps décide avant vous du sens d’un moment",
    // Laurent Rouach's correction, 20 September 2026, word for word.
    strap: "Votre première interprétation n’est pas l’histoire.",
    authorPrefix: "par",
    credential: "Psychologue clinicienne, Luxembourg",
    coverAlt: "Première de couverture de State. Not Situation. Sur un fond rouge profond, un panneau crème porte l’accroche, le sous-titre en italique rouge, et le mot STATE en très grand, en rouge, au-dessus de NOT SITUATION en noir. En dessous, dans un encadré à coins, Your body speaks first, your mind explains second. Le nom de l’autrice est au pied, sur le rouge.",
    readCta: "Lire un extrait"
  },
  premise: {
    eyebrow: "La première erreur de lecture",
    // Laurent Rouach's correction, 20 September 2026: « témoin », not « narrateur ».
    sensorLine: "Le corps est un capteur avant d’être un témoin.",
    lines: [
      "Vous ne réagissez peut-être pas au monde.",
      "Vous réagissez peut-être à votre état."
    ],
    mechanism: [
      "D’ordinaire, nous prenons ces moments pour des informations sur la vie : la personne, la tâche, la relation, la journée.",
      "Mais souvent, la première interprétation ne dit pas tout.",
      "Avant que l’esprit n’explique, le corps a déjà voté. La pression de sommeil, la faim, l’heure qu’il est, l’attention, la détection de la menace, la mémoire et la prédiction façonnent en silence ce qui paraît vrai.",
      "L’esprit, lui, n’arrive qu’ensuite, et il trouve une raison à cette sensation."
    ],
    folio: "4"
  },
  reading: {
    eyebrow: "Faites un essai, tout de suite",
    lead: "Quoi que vous ressentiez en lisant cette phrase.",
    steps: [
      "Observez votre mâchoire.",
      "Observez votre respiration.",
      "Observez vos épaules."
    ],
    result: "Ce que vous avez trouvé, c’est une lecture.",
    folio: "7"
  },
  variables: {
    sortingLines: [
      "Ce ne sont pas des régions du cerveau ni des voies neuronales.",
      "C’est un outil de tri, une façon de poser trois questions quand tout semble aller de travers en même temps."
    ],
    loops: [
      {
        key: "time",
        name: "Temps",
        body: "Qu’y a-t-il eu avant ce moment ? Le sommeil, les repas, la caféine, la récupération, l’heure."
      },
      {
        key: "attention",
        name: "Attention",
        body: "Qu’est-ce qui me ramène sans cesse ? Un message, une pensée, un déclencheur, une tâche en suspens."
      },
      {
        key: "safety",
        name: "Sécurité",
        body: "Qu’est-ce qui est en jeu ? Qu’ai-je observé, qu’est-ce que je suppose, et y a-t-il quelque chose à faire ?"
      }
    ],
    folio: "7"
  },
  // Page 4 de la v50. Les trois lignes d’ouverture de la page ne sont pas
  // reprises : l’autrice les a retirées du site le 6 septembre 2026.
  moments: {
    line: "16 cas. Trois lectures. Une question : état ou situation ?",
    title: "La même journée, cinq lectures",
    items: [
      { time: "06:38", line: "Une lourdeur arrive avant la journée." },
      { time: "09:12", line: "Un e-mail de deux lignes se lit comme un jugement." },
      { time: "14:23", line: "Cinq mots neutres serrent une mâchoire." },
      { time: "17:45", line: "Un message sans réponse commence à prélever un loyer mental." },
      { time: "22:47", line: "Deux lettres et un point paraissent hostiles." }
    ],
    closing: "Le corps parle d’abord. L’esprit explique ensuite.",
    folio: "4"
  },
  evidence: {
    title: "Niveau de preuve",
    grades: [
      {
        key: "high",
        label: "Élevé",
        description: "Résultats répliqués ou robustes."
      },
      {
        key: "medium",
        label: "Moyen",
        description: "Résultats évocateurs, incertitude réelle."
      },
      {
        key: "low",
        label: "Faible",
        description: "Hypothèse plausible ou premiers résultats."
      }
    ],
    closing: "Ces marqueurs existent parce que ce livre court lui-même le risque qu’il décrit.",
    folio: "7"
  },
  // The credit is kept as the author supplied it, word for word. The title and
  // the institute are not translated: they are what she is called there. For
  // the French reviewer: whether « Managing Director » should stand in French,
  // or read « directrice générale », is Dr Herber's to say, not ours.
  foreword: {
    eyebrow: "Préface",
    credit: "Préface : Dr Kristina Herber",
    name: "Dr Kristina Herber",
    role: "Managing Director",
    organisation: "AIHE Academic Institute for Higher Education",
    // Dr Herber's foreword, translated under translation/STANDARD.md like the
    // rest of this page. For the French reviewer: these are a third party's
    // words, not the book's, and worth a second look.
    quote: [
      "Notre première interprétation n’est pas nécessairement fausse. Mais elle n’a pas à être la dernière.",
      "Un livre qui nous met en garde contre la confusion entre une interprétation convaincante et une certitude soumet aussi ses propres interprétations à cet examen."
    ]
  },
  excerpt: {
    title: "Avant les chapitres",
    sectionLabel: "Le pilote",
    lead: "Ce livre cherche moins à vous apprendre à faire confiance à votre instinct qu’à vous montrer à quoi, au juste, vous faites confiance.",
    teaserCount: 2,
    // Paragraphs 1 and 2 carry Laurent Rouach's corrections of 20 September 2026.
    paragraphs: [
      "Le soir du 16 juillet 1999, un petit monomoteur décolla du New Jersey. Il faisait route vers Martha’s Vineyard. Le pilote avait assez d’expérience pour être sûr de lui, et assez peu pour se tromper sur ce que signifiait cette confiance. Il avait environ 300 heures de vol. Il n’avait pas terminé la formation qui l’aurait qualifié pour voler aux instruments.",
      "Le ciel était dégagé au départ, alors il en conclut qu’il n’avait pas besoin d’instruments. Le temps qu’il atteigne la côte, une brume s’était posée sur l’eau. La brume qui efface la limite entre la mer et le ciel si progressivement que vous ne remarquez que l’horizon a disparu qu’au moment où vous le cherchez et qu’il n’est plus là. Au-dessus de la terre, il y a des lumières en dessous. Vous voyez des routes, des bâtiments, une géométrie qui indique à vos yeux où se trouve le bas. Au large, la nuit, avec la brume posée sur la surface comme une seconde obscurité, il n’y a rien. Le monde à l’extérieur du cockpit prend un gris uniforme. Le haut ressemble au bas. Un léger virage donne la sensation d’un vol en palier. Une descente lente passe inaperçue.",
      "L’oreille interne du pilote, l’organe qui indique au cerveau comment le corps est orienté dans l’espace, fonctionne en détectant les changements de mouvement. Quand vous entrez en virage, le liquide qu’elle contient se déplace, et le cerveau enregistre une rotation. Mais si le virage se maintient quinze ou vingt secondes, le liquide de l’oreille interne se stabilise. Il ne bouge plus. Le cerveau, qui suit le mouvement, en conclut que le virage est terminé. Vous vous sentez en palier, mais vous ne l’êtes pas.",
      "Quelque part au-dessus de l’eau sombre, l’avion s’engagea dans un léger virage à gauche. Les instruments du pilote, les cadrans du tableau de bord devant lui, indiquaient le virage. L’horizon artificiel, un petit cadran gyroscopique qui montre l’inclinaison de l’appareil par rapport au sol, lui disait clairement qu’il s’inclinait. L’altimètre lui disait qu’il descendait. L’indicateur de vitesse lui disait qu’il accélérait. Son corps lui disait autre chose. Son corps lui disait qu’il volait droit, en palier. Son corps sonnait juste. Ses instruments sonnaient faux. Il fit confiance à son corps.",
      "Le virage se resserra. Le nez tomba. La vitesse augmenta. Dans les dernières secondes, l’avion descendait à plus de 4 700 pieds par minute, près d’un kilomètre et demi toutes les soixante secondes, dans une spirale de plus en plus serrée que les pilotes appellent, avec la précision sinistre d’un métier qui a donné un nom à chacune des façons dont il perd les siens, une spirale de la mort. Il percuta l’eau à pleine vitesse. Lui et ses deux passagers furent tués sur le coup.",
      "L’enquête ne releva aucune défaillance mécanique. Le moteur tournait. Les instruments fonctionnaient. Les données étaient là, sur le tableau de bord, à quinze centimètres de ses yeux, depuis le début, mais il ne les lut pas. C’est son corps qu’il lut. La consigne que la Federal Aviation Administration américaine donne aux pilotes qui se retrouvent dans cette situation tient en une phrase. Elle est à prendre au pied de la lettre, et elle s’applique à votre vie aussi directement qu’à un cockpit :",
      "Le pilote s’appelait John F. Kennedy Jr. C’était le fils d’un président américain. On lui avait déconseillé de voler ce soir-là sans son instructeur. Il avait répondu à son instructeur qu’il voulait le faire seul. Il avait trente-huit ans.",
      "Vous pilotez un corps qui produit des signaux, et votre esprit prend souvent ces signaux pour la vérité. Ils se trompent parfois autant que le système vestibulaire de l’oreille interne au-dessus d’une eau sombre. La fatigue qui se présente comme une question sur votre carrière. Le pic de caféine qui se présente comme de l’anxiété à propos d’un e-mail. L’hypoglycémie qui se présente comme la preuve que votre relation se défait. Votre corps parle d’abord et votre esprit explique ensuite. L’explication, parce qu’elle arrive avec tout le poids de la conviction physique, la mâchoire serrée, le cœur qui s’emballe, la chaleur derrière les oreilles, a tout d’un savoir profond. Vous avez l’impression de lire la situation. Mais vous ne lisez que l’instrument qui lit la situation, et ses réglages étaient faussés avant même que la situation n’arrive. Ces instruments existent. Vous les avez. Le rythme cardiaque, la tension de la mâchoire, la profondeur de la respiration, la position des épaules, la vitesse de vos pensées. Ils produisent des données en ce moment même, pendant que vous lisez cette phrase. Mais le bulletin météo que le corps établit sur le monde, si sûr de lui soit-il, n’est qu’un brouillon.",
    ],
    quoteAfter: 5,
    quote: "« faites confiance à vos instruments et ignorez tous les signaux contraires que vous envoie votre corps. »",
    continueCta: "Lire la suite",
    back: "Retour au livre",
    readingModeLabel: "Mode lecture",
    closing: "Ce livre parle de la même erreur, à l’échelle de la cuisine. La version qui arrive tous les mardis. La version où votre corps écrit une histoire à partir d’un message, d’un silence, d’un regard, et où votre esprit retouche cette histoire sous la supervision de ce que votre corps ressent à ce moment-là. Personne ne meurt, mais des décisions se prennent. Des relations changent. Des jugements sur soi se forment. Et rien de tout cela n’avait à se passer ainsi, parce que les données étaient là depuis le début.",
    closingSource: "Page 20",
    endNote: "Vient ensuite le chapitre zéro : Une journée qui aurait dû bien se passer.",
    unavailable: "L’extrait en français est à venir.",
    folios: [
      "1",
      "2",
      "3"
    ]
  },
  // Les seize noms, page 292. Les noms restent en regard du livre : ils sont
  // la terminologie de l’ouvrage, en anglais dans l’édition anglaise. Pour le
  // relecteur : faut-il les traduire, ou les garder tels que le livre les
  // imprime, avec la traduction entre parenthèses ?
  names: {
    title: "Seize noms.",
    label: "Un nom pour cela",
    pageLabel: "Page",
    note: "Chaque nom clôt son chapitre. Le numéro de page est celui de l’entrée.",
    items: [
      { number: "00", name: "Mode récit", page: 16 },
      { number: "01", name: "Attribution erronée", page: 24 },
      { number: "02", name: "Le principe du détecteur de fumée", page: 36 },
      { number: "03", name: "Récompense variable", page: 50 },
      { number: "04", name: "Vouloir et aimer", page: 66 },
      { number: "05", name: "Zone de maintien de l’éveil", page: 80 },
      { number: "06", name: "Réseau du mode par défaut", page: 96 },
      { number: "07", name: "Menace d’évaluation", page: 107 },
      { number: "08", name: "Rumination", page: 126 },
      { number: "09", name: "Exigence–retrait", page: 141 },
      { number: "10", name: "Métacognition", page: 158 },
      { number: "11", name: "Empilement", page: 176 },
      { number: "12", name: "Erreur de prédiction", page: 196 },
      { number: "13", name: "Calibrage", page: 210 },
      { number: "14", name: "Tableau clément", page: 222 },
      { number: "15", name: "Prévision", page: 239 },
    ],
    example: {
      number: "01",
      name: "Attribution erronée",
      body: "Donner à une sensation la mauvaise cause. Le corps produit la sensation. L’esprit cherche une raison et prend la plus proche. La sensation est réelle. La raison est une supposition.",
      showsUpLabel: "Comment cela se manifeste",
      showsUp: [
        "Une fatigue qui arrive comme une question sur votre carrière.",
        "Un café à jeun qui arrive comme de l’inquiétude à propos d’un e-mail.",
        "Une hypoglycémie qui arrive comme un doute sur une relation."
      ],
      tryLabel: "À essayer",
      tryIt: "Avant d’agir sur un jugement assuré, nommez un fait qui pourrait vous faire changer d’avis.",
      page: 24
    }
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
    unavailable: "L’enregistrement sera ajouté ici."
  },
  author: {
    title: "Ivana Budišin",
    photoAlt: "Ivana Budišin, photographiée sur fond gris foncé.",
    photoPlaceholder: "Photographie de l’autrice à venir",
    bio: "Psychologue clinicienne, Ivana Budišin vit et travaille au Luxembourg. State. Not Situation. est son premier livre.",
    readers: "Pour quiconque a déjà été certain du sens d’une situation, puis a découvert qu’il se passait autre chose. Et pour les lecteurs qui s’intéressent à la psychologie de la façon dont nous remarquons, interprétons et révisons le monde qui nous entoure.",
    pressLabel: "Dossier de presse"
  },
  closing: {
    question: "Est-ce la situation ? Ou est-ce leur état ?",
    source: "Page 238",
    line: "Même vie. Instruments réglés autrement."
  },
  press: {
    eyebrow: "Presse",
    title: "Dossier de presse",
    intro: "Des exemplaires de presse, imprimés ou numériques, sont disponibles sur demande. Reproduction d’extraits, entretiens et rencontres : sur accord.",
    contactHeading: "Contact",
    assetsHeading: "Téléchargements",
    kitLabel: "Télécharger le dossier complet",
    assets: [
      {
        label: "Première de couverture, résolution d’impression",
        file: "/press/cover-front-300dpi.png",
        note: "PNG · 1800 × 2700"
      },
      {
        label: "Couverture complète, résolution d’impression",
        file: "/press/cover-wrap-300dpi.png",
        note: "PNG · 3805 × 2700"
      },
      {
        label: "Couverture, prête à imprimer",
        file: "/press/cover-print-6x9.pdf",
        note: "PDF · 6 × 9 in"
      },
      {
        label: "Photographie de l’autrice",
        file: "/press/author-photo-1600.jpg",
        note: "JPEG · 1600 × 1600"
      },
      {
        label: "L’extrait d’ouverture",
        file: "/press/State-Not-Situation-extract-the-opening.pdf",
        note: "PDF · 3 pp"
      },
      {
        label: "Bannière web",
        file: "/press/banner-web-2400x1000.jpg",
        note: "JPEG · 2400 × 1000"
      },
      {
        label: "Image pour les réseaux, carrée",
        file: "/press/post-1x1-1080.jpg",
        note: "JPEG · 1080 × 1080"
      }
    ],
    photoUnavailable: "Photographie de l’autrice disponible sur demande.",
    photoCredit: "Photographie : Zoe Larusson",
    bioHeading: "Biographie",
    bios: [
      {
        label: "Courte",
        text: "Psychologue clinicienne, Ivana Budišin vit et travaille au Luxembourg. State. Not Situation. est son premier livre."
      },
      {
        label: "Longue",
        text: "Avant la psychologie, Ivana Budišin a travaillé dans le design et le design produit. Elle s’est ensuite tournée vers la psychologie appliquée et elle est aujourd’hui psychologue clinicienne, avec un intérêt constant pour la recherche et les sciences cognitives. Née aux États-Unis, elle a vécu aux États-Unis, en Serbie et au Luxembourg, et elle est aujourd’hui luxembourgeoise. Elle dirige Luxembourg Psychology. State. Not Situation. réunit ces intérêts : comment nous faisons l’expérience du monde, et comment rendre cette expérience plus facile à comprendre."
      }
    ],
    factsHeading: "Publication",
    publicationFactLabel: "Parution",
    forewordLabel: "Préface",
    facts: [
      {
        label: "Titre",
        value: "State. Not Situation."
      },
      {
        label: "Sous-titre",
        value: "Pourquoi votre corps décide avant vous du sens d’un moment"
      },
      {
        label: "Autrice",
        value: "Ivana Budišin"
      },
      {
        label: "Parution",
        value: "2026"
      },
      {
        label: "Format",
        value: "Broché, 15,2 × 22,9 cm (6 × 9 pouces)"
      },
      {
        label: "Pagination",
        value: "304 pages"
      },
      {
        label: "ISBN-13",
        value: "978-2-87996-258-0"
      },
      {
        label: "Catégorie",
        value: "Psychologie / Psychologie cognitive"
      },
      {
        label: "Langue",
        value: "Anglais. Éditions française et allemande à venir."
      },
      {
        label: "Dépôt légal",
        value: "Bibliothèque nationale du Luxembourg"
      }
    ],
    descriptionHeading: "À propos du livre",
    description: [
      "Ce livre cherche moins à vous apprendre à faire confiance à votre instinct qu’à vous montrer à quoi, au juste, vous faites confiance.",
      "Pour quiconque a déjà été certain du sens d’une situation, puis a découvert qu’il se passait autre chose. Et pour les lecteurs qui s’intéressent à la psychologie de la façon dont nous remarquons, interprétons et révisons le monde qui nous entoure."
    ],
    mapHeading: "Les chapitres",
    mapLabel: "Ce livre mène",
    mapTitle: "L’enquête.",
    mapLine: "16 cas. Trois lectures. Une question : état ou situation ?",
    pageColumn: "Page",
    chapters: [
      {
        number: "00",
        title: "Une journée qui aurait dû bien se passer",
        page: 11
      },
      {
        number: "01",
        title: "Le radar avait raison",
        page: 17
      },
      {
        number: "02",
        title: "Pourquoi le manque de sommeil fait paraître hostile ce qui est neutre",
        page: 25
      },
      {
        number: "03",
        title: "Le soulagement qui tourne à la démangeaison",
        page: 37
      },
      {
        number: "04",
        title: "Le déclencheur prévisible",
        page: 51
      },
      {
        number: "05",
        title: "Pourquoi les soirées s’étirent et les matins rétrécissent",
        page: 69
      },
      {
        number: "06",
        title: "Pourquoi le repos ne ressource pas toujours",
        page: 81
      },
      {
        number: "07",
        title: "Pourquoi vous n’arrivez pas à commencer ce qui compte",
        page: 97
      },
      {
        number: "08",
        title: "Le dossier ouvert",
        page: 109
      },
      {
        number: "09",
        title: "Deux systèmes nerveux entrent dans une cuisine",
        page: 127
      },
      {
        number: "10",
        title: "La dispute qui était mardi",
        page: 143
      },
      {
        number: "11",
        title: "Le jeudi qui était mercredi soir",
        page: 161
      },
      {
        number: "12",
        title: "Le tableau de bord au vert",
        page: 179
      },
      {
        number: "13",
        title: "La fois où le corps avait raison",
        page: 197
      },
      {
        number: "14",
        title: "Rien à voir avec moi",
        page: 211
      },
      {
        number: "15",
        title: "La prévision",
        page: 223
      }
    ],
    sortingTool: "Les chapitres qui suivent s’organisent autour de trois systèmes qui règlent le poids que prennent les signaux de votre corps avant que votre esprit n’en fasse une histoire. Ce ne sont pas des régions du cerveau ni des voies neuronales. C’est un outil de tri, une façon de poser trois questions quand tout semble aller de travers en même temps.",
    sourcesHeading: "Sources et preuves",
    sources: [
      "Chaque chapitre a ici trois parties : une courte note sur l’origine de la réflexion, une liste des travaux sur lesquels le chapitre est construit, et une liste des travaux qui le limitent, le compliquent, ou expliquent autrement les mêmes résultats.",
      "Les laisser de côté ferait paraître l’argumentation plus nette qu’elle ne l’est."
    ],
    sourcesLabel: "Le pouls scientifique, page 242",
    creditsHeading: "Crédits",
    credits: [
      {
        label: "Conception de la couverture",
        value: "Zoe Larusson"
      },
      {
        label: "Photographie",
        value: "Zoe Larusson"
      },
      {
        label: "Conception graphique et mise en page",
        value: "Ivana Budišin"
      },
      {
        label: "Publié par",
        value: "Budisin Publishing"
      }
    ],
    back: "Retour au livre"
  },
  footer: {
    band: "Avant de croire l’histoire.",
    pressLink: "Presse",
    contactLink: "Contact",
    rights: "© 2026 Budisin Publishing",
    translationNote:
      "Le livre est publié en anglais ; ces pages en ont été traduites par une intelligence artificielle."
  },
  a11y: {
    mainLandmark: "Contenu principal",
    coverFigure: "Le livre",
    languageSwitcher: "Choisir la langue",
    menu: "Menu"
  }
};
