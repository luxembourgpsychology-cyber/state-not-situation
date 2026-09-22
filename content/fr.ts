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
    coverAlt: "Première de couverture de State. Not Situation. Le mot STATE en grand, en rouge, au-dessus de NOT SITUATION en noir, sur un fond crème imprimé de phrases barrées, à peine visibles, et de petits relevés d’instruments.",
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
        body: "Sommeil, alimentation, caféine, phase circadienne, récupération. Quand le rythme se dérègle, la sensibilité de base augmente. Le même monde paraît plus rude."
      },
      {
        key: "attention",
        name: "Attention",
        body: "Le système qui suit la récompense, la nouveauté et le prochain déclencheur. Quand il est accaparé, l’attention se rabat sur ce qui, à portée de main, demande le moins d’effort, et le travail qui en demande paraît difficile."
      },
      {
        key: "safety",
        name: "Sécurité",
        body: "Le système qui surveille la menace, et surtout la menace sociale. Il est rapide, il est ancien, et il penche du côté des fausses alertes. Il produit des interprétations qui ont tout l’air de faits."
      }
    ],
    folio: "7"
  },
  moments: {
    line: "16 cas. Trois lectures. Une question : état ou situation ?",
    label: "Pièces du dossier",
    pageLabel: "Page",
    items: [
      {
        chapter: "00",
        page: 10,
        time: "06:38",
        quote: "« Quelque chose cloche. »",
        inputLabel: "Entrée",
        input: "Deux minutes avant le réveil.",
        verifiedLabel: "Événement vérifié",
        verified: "Il ne s’est rien passé."
      },
      {
        chapter: "02",
        page: 22,
        time: "22:47",
        quote: "« ok. »",
        inputLabel: "Entrée",
        input: "Deux lettres. Un point.",
        verifiedLabel: "Ton vérifié",
        verified: "Aucun."
      },
      {
        chapter: "11",
        page: 144,
        time: "16:00",
        quote: "« Quelque chose ne va pas dans ma vie. »",
        inputLabel: "Entrée",
        input: "Six événements ordinaires. Une journée sans réserves.",
        verifiedLabel: "Crise vérifiée",
        verified: "Aucune."
      }
    ],
    closing: "Ça disait : je suis en train d’échouer. Les données, elles, disaient : je suis fatiguée.",
    closingSource: "Page 14"
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
  readings: {
    title: "Les lectures",
    label: "Lecture",
    pageLabel: "Page",
    items: [
      {
        number: "01",
        time: "NON SOLLICITÉ",
        attention: "DÉGRADÉE",
        safety: "DOMINANTE",
        page: 17,
        line: "Le corps rend son verdict avant que l’attention ne le mette à l’épreuve."
      },
      {
        number: "02",
        time: "DOMINANT",
        attention: "BOUCLE DE VÉRIFICATION",
        safety: "AMPLIFIÉE",
        page: 23,
        line: "La fatigue ôte son frein à la certitude."
      },
      {
        number: "03",
        time: "DANS LES ÉCARTS",
        attention: "EN BOUCLE",
        safety: "NON SOLLICITÉE",
        page: 33,
        line: "La main se tend avant que l’esprit ne décide."
      },
      {
        number: "04",
        time: "DÉCLENCHEUR À 15:28",
        attention: "BOUCLE D’HABITUDE",
        safety: "EN HAUSSE PLUS TARD",
        page: 45,
        line: "La main honore un rendez-vous que l’esprit n’a jamais pris."
      },
      {
        number: "05",
        time: "DOMINANT",
        attention: "CAPTURE TARDIVE",
        safety: "NON SOLLICITÉE",
        page: 61,
        line: "Une heure paraît gratuite et envoie la facture au matin."
      },
      {
        number: "06",
        time: "DETTE DU MATIN",
        attention: "DÉGRADÉE",
        safety: "RUMINATION",
        page: 73,
        line: "Le week-end fait tout comme il faut et ne ressource personne."
      },
      {
        number: "07",
        time: "DETTE DE L’APRÈS-MIDI",
        attention: "FRAGMENTÉE",
        safety: "EN HAUSSE",
        page: 89,
        line: "Le document ne change pas ; le lecteur, lui, perd en amplitude."
      },
      {
        number: "08",
        time: "SOIR",
        attention: "RESSERRÉE",
        safety: "DOMINANTE",
        page: 99,
        line: "Un mot devient six jours de preuves."
      },
      {
        number: "09",
        time: "20 MINUTES NON PRISES",
        attention: "FENÊTRE D’UNE DEMI-SECONDE",
        safety: "DOMINANTE",
        page: 115,
        line: "La conversation se termine avant sa première phrase."
      },
      {
        number: "10",
        time: "07:40 REMISE À ZÉRO",
        attention: "ÉPUISÉE",
        safety: "RÉSIDUELLE",
        page: 129,
        line: "La cuisine repart de zéro. Le corps, non."
      },
      {
        number: "11",
        time: "DETTE DE LA VEILLE",
        attention: "ÉPUISÉE DÈS 10:00",
        safety: "COMBLE LES ÉCARTS",
        page: 145,
        line: "Six choses ordinaires deviennent la preuve que rien ne va."
      },
      {
        number: "12",
        time: "NON SOLLICITÉ",
        attention: "ÉTROITE, DISPONIBLE",
        safety: "SIGNAL PRÉSENT",
        page: 161,
        line: "Rien ne cloche. La mâchoire ne se desserre pas."
      },
      {
        number: "13",
        time: "22:40",
        attention: "EXACTE",
        safety: "PRÉCAUTION PRISE",
        page: 177,
        line: "Cette alerte appartient à quarante mètres de béton."
      },
      {
        number: "14",
        time: "PROTÉGÉ",
        attention: "PLACÉE",
        safety: "CALME",
        page: 189,
        line: "La journée que le chapitre zéro aurait dû être."
      },
      {
        number: "15",
        time: "PRÉVISION",
        attention: "DOSSIER OUVERT, NOMMÉ",
        safety: "NOMMÉE À L’AVANCE",
        page: 203,
        line: "La lecture de demain, relevée ce soir."
      }
    ]
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
    source: "Page 218",
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
        note: "PNG · 1801 × 2701"
      },
      {
        label: "Couverture complète, résolution d’impression",
        file: "/press/cover-wrap-300dpi.png",
        note: "PNG · 3791 × 2701"
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
        text: "[COPY NEEDED: a longer biography, 100 to 150 words, in your own words. Qualifications, where you practise, and how the book came out of that work. Only what you would be happy to see checked.]"
      }
    ],
    factsHeading: "Publication",
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
        value: "282 pages"
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
        page: 23
      },
      {
        number: "03",
        title: "Le soulagement qui tourne à la démangeaison",
        page: 33
      },
      {
        number: "04",
        title: "Le déclencheur prévisible",
        page: 45
      },
      {
        number: "05",
        title: "Pourquoi les soirées s’étirent et les matins rétrécissent",
        page: 61
      },
      {
        number: "06",
        title: "Pourquoi le repos ne ressource pas toujours",
        page: 73
      },
      {
        number: "07",
        title: "Pourquoi vous n’arrivez pas à commencer ce qui compte",
        page: 89
      },
      {
        number: "08",
        title: "Le dossier ouvert",
        page: 99
      },
      {
        number: "09",
        title: "Deux systèmes nerveux entrent dans une cuisine",
        page: 115
      },
      {
        number: "10",
        title: "La dispute qui était mardi",
        page: 129
      },
      {
        number: "11",
        title: "Le jeudi qui était mercredi soir",
        page: 145
      },
      {
        number: "12",
        title: "Le tableau de bord au vert",
        page: 161
      },
      {
        number: "13",
        title: "La fois où le corps avait raison",
        page: 177
      },
      {
        number: "14",
        title: "Rien à voir avec moi",
        page: 189
      },
      {
        number: "15",
        title: "La prévision",
        page: 203
      }
    ],
    sortingTool: "Les chapitres qui suivent s’organisent autour de trois systèmes qui règlent le poids que prennent les signaux de votre corps avant que votre esprit n’en fasse une histoire. Ce ne sont pas des régions du cerveau ni des voies neuronales. C’est un outil de tri, une façon de poser trois questions quand tout semble aller de travers en même temps.",
    sourcesHeading: "Sources et preuves",
    sources: [
      "Chaque chapitre a ici trois parties : une courte note sur l’origine de la réflexion, une liste des travaux sur lesquels le chapitre est construit, et une liste des travaux qui le limitent, le compliquent, ou expliquent autrement les mêmes résultats.",
      "Les laisser de côté ferait paraître l’argumentation plus nette qu’elle ne l’est."
    ],
    sourcesLabel: "Le pouls scientifique, page 220",
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
