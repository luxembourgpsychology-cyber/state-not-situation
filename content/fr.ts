import type { SiteContent } from "./types";

/**
 * FRENCH CONTENT. Same structure as content/en.ts.
 *
 * Every "" is a string still to translate. Until it is filled it renders as
 * ⟦fr: the.key⟧ so nothing English can leak through unnoticed.
 *
 * Identifiers, page numbers, times and file paths are already correct and
 * should not be changed. Do not enable this language in site.config.ts
 * until the file is complete.
 */
export const fr: SiteContent = {
  "meta": {
    "title": "",
    "titleTemplate": "",
    "description": "",
    "ogImageAlt": "",
    "readTitle": "",
    "readDescription": "",
    "pressTitle": "",
    "pressDescription": ""
  },
  "nav": {
    "book": "",
    "read": "",
    "listen": "",
    "author": "",
    "press": "",
    "skipToContent": "",
    "home": ""
  },
  "status": {
    "forthcoming": "",
    "published": "",
    "publicationDatePrefix": "",
    "buy": "",
    "notifyHeading": "",
    "emailLabel": "",
    "emailPlaceholder": "",
    "submit": "",
    "success": "",
    "error": "",
    "privacyNote": "",
    "mailtoLabel": "",
    "mailtoSubject": "",
    "mailtoBody": ""
  },
  "hero": {
    "eyebrow": "",
    "titleA": "",
    "titleB": "",
    "subtitle": "",
    "strap": "",
    "authorPrefix": "",
    "coverAlt": "",
    "openAlt": "",
    "readCta": "",
    "scrollHint": ""
  },
  "reading": {
    "eyebrow": "",
    "lead": "",
    "steps": [
      "",
      "",
      ""
    ],
    "result": "",
    "afterResult": "",
    "question": ""
  },
  "loops": {
    "eyebrow": "",
    "title": "",
    "intro": "",
    "items": [
      {
        "key": "time",
        "name": "",
        "legend": "",
        "body": ""
      },
      {
        "key": "attention",
        "name": "",
        "legend": "",
        "body": ""
      },
      {
        "key": "safety",
        "name": "",
        "legend": "",
        "body": ""
      }
    ],
    "outro": ""
  },
  "cases": {
    "eyebrow": "",
    "title": "",
    "intro": "",
    "pageLabel": "",
    "items": [
      {
        "chapter": "00",
        "page": 16,
        "time": "06:38",
        "quote": "",
        "inputLabel": "",
        "input": "",
        "verifiedLabel": "",
        "verified": ""
      },
      {
        "chapter": "02",
        "page": 28,
        "time": "22:47",
        "quote": "",
        "inputLabel": "",
        "input": "",
        "verifiedLabel": "",
        "verified": ""
      },
      {
        "chapter": "05",
        "page": 66,
        "time": "22:30",
        "quote": "",
        "inputLabel": "",
        "input": "",
        "verifiedLabel": "",
        "verified": ""
      },
      {
        "chapter": "11",
        "page": 150,
        "time": "16:00",
        "quote": "",
        "inputLabel": "",
        "input": "",
        "verifiedLabel": "",
        "verified": ""
      },
      {
        "chapter": "13",
        "page": 182,
        "time": "22:40",
        "quote": "",
        "inputLabel": "",
        "input": "",
        "verifiedLabel": "",
        "verified": ""
      },
      {
        "chapter": "15",
        "page": 208,
        "time": "22:14",
        "quote": "",
        "inputLabel": "",
        "input": "",
        "verifiedLabel": "",
        "verified": ""
      }
    ]
  },
  "excerpt": {
    "eyebrow": "",
    "title": "",
    "sectionLabel": "",
    "runningHead": "",
    "teaserCount": 2,
    "cta": "",
    "continueCta": "",
    "back": "",
    "readingModeLabel": "",
    "paragraphs": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ],
    "quoteAfter": 5,
    "quote": "",
    "endNote": "",
    "unavailable": "",
    "folios": [
      "",
      "",
      ""
    ]
  },
  "listen": {
    "eyebrow": "",
    "title": "",
    "subtitle": "",
    "play": "",
    "pause": "",
    "progress": "",
    "elapsed": "",
    "duration": "",
    "unavailable": ""
  },
  "about": {
    "eyebrow": "",
    "title": "",
    "quote": "",
    "quoteSource": "",
    "paragraphs": [
      ""
    ],
    "mapLine": "",
    "evidenceEyebrow": "",
    "evidenceIntro": "",
    "grades": [
      {
        "key": "high",
        "label": "",
        "shape": "",
        "meaning": ""
      },
      {
        "key": "medium",
        "label": "",
        "shape": "",
        "meaning": ""
      },
      {
        "key": "low",
        "label": "",
        "shape": "",
        "meaning": ""
      }
    ],
    "overreachEyebrow": "",
    "overreach": "",
    "readersEyebrow": "",
    "readers": "",
    "mapEyebrow": "",
    "mapTitle": "",
    "mapSubtitle": "",
    "pageColumn": "",
    "chapters": [
      {
        "number": "00",
        "title": "",
        "page": 17
      },
      {
        "number": "01",
        "title": "",
        "page": 23
      },
      {
        "number": "02",
        "title": "",
        "page": 29
      },
      {
        "number": "03",
        "title": "",
        "page": 39
      },
      {
        "number": "04",
        "title": "",
        "page": 51
      },
      {
        "number": "05",
        "title": "",
        "page": 67
      },
      {
        "number": "06",
        "title": "",
        "page": 79
      },
      {
        "number": "07",
        "title": "",
        "page": 95
      },
      {
        "number": "08",
        "title": "",
        "page": 105
      },
      {
        "number": "09",
        "title": "",
        "page": 121
      },
      {
        "number": "10",
        "title": "",
        "page": 135
      },
      {
        "number": "11",
        "title": "",
        "page": 151
      },
      {
        "number": "12",
        "title": "",
        "page": 167
      },
      {
        "number": "13",
        "title": "",
        "page": 183
      },
      {
        "number": "14",
        "title": "",
        "page": 195
      },
      {
        "number": "15",
        "title": "",
        "page": 209
      }
    ],
    "mapFooter": ""
  },
  "author": {
    "eyebrow": "",
    "title": "",
    "photoAlt": "",
    "photoPlaceholder": "",
    "bio": "",
    "websiteLabel": "",
    "contactLabel": "",
    "pressLabel": ""
  },
  "companion": {
    "eyebrow": "",
    "line": ""
  },
  "press": {
    "eyebrow": "",
    "title": "",
    "intro": "",
    "contactHeading": "",
    "assetsHeading": "",
    "assets": [
      {
        "label": "",
        "file": "/press/cover-front-2400.jpg",
        "note": ""
      },
      {
        "label": "",
        "file": "/press/author-photo-1600.jpg",
        "note": ""
      },
      {
        "label": "",
        "file": "/press/mockup-3d-transparent.png",
        "note": ""
      },
      {
        "label": "",
        "file": "/press/banner-web-2400x1000.jpg",
        "note": ""
      },
      {
        "label": "",
        "file": "/press/post-1x1-1080.jpg",
        "note": ""
      },
      {
        "label": "",
        "file": "/press/post-4x5-1080x1350.jpg",
        "note": ""
      },
      {
        "label": "",
        "file": "/press/post-16x9-1920x1080.jpg",
        "note": ""
      },
      {
        "label": "",
        "file": "/press/excerpt-the-opening.pdf",
        "note": ""
      }
    ],
    "photoUnavailable": "",
    "bioHeading": "",
    "bios": [
      {
        "label": "",
        "text": ""
      },
      {
        "label": "",
        "text": ""
      }
    ],
    "factsHeading": "",
    "facts": [
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      }
    ],
    "descriptionHeading": "",
    "description": [
      "",
      "",
      ""
    ],
    "creditsHeading": "",
    "credits": [
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      },
      {
        "label": "",
        "value": ""
      }
    ],
    "back": ""
  },
  "footer": {
    "band": "",
    "rights": "",
    "pressLink": "",
    "contactLink": "",
    "madeLine": ""
  },
  "a11y": {
    "mainLandmark": "",
    "coverFigure": "",
    "languageSwitcher": "",
    "languageComing": "",
    "casesRegion": "",
    "bookOpening": ""
  }
};
