/**
 * Builds a translation-review workbook for a native speaker to fill in.
 *
 *   node lib/make-review-pack.mjs fr
 *   node lib/make-review-pack.mjs de
 *
 * Writes review/<lang>-review.json next to the repo, which the companion
 * Python step turns into an .xlsx. Run both via: npm run review-pack
 *
 * The reviewer never sees code. They see, side by side: where the text
 * appears on the site, the English, the translation, and an empty column
 * to write a correction in. Their corrections come back keyed to the exact
 * string, so applying them is mechanical rather than a hunt.
 */
import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const lang = process.argv[2];
if (!["fr", "de"].includes(lang)) {
  console.error("usage: node lib/make-review-pack.mjs <fr|de>");
  process.exit(1);
}

async function load(name) {
  const src = readFileSync(new URL(`../content/${name}.ts`, import.meta.url), "utf8")
    .replace(/^import[^\n]*\n/gm, "")
    .replace(new RegExp(`export const ${name}: SiteContent =`), "export default");
  const tmp = join(tmpdir(), `sns-${name}-${process.pid}.mjs`);
  writeFileSync(tmp, src);
  const mod = (await import(`file://${tmp}`)).default;
  unlinkSync(tmp);
  return mod;
}

const en = await load("en");
const tr = await load(lang);

/** Where each top-level section appears, in words a reviewer understands. */
const WHERE = {
  meta: "Browser tab, Google result, link previews",
  nav: "Top navigation bar",
  status: "Publication status and the notify form",
  hero: "First screen — the book and title",
  misreading: "“The first misreading” — page 10, the five readings",
  knowTheDay: "“You know the day” — page 12, above the three instructions",
  reading: "“Try something right now” — the three instructions, page 13",
  book: "The book — the page 20 heading, the author’s account, who it is for",
  excerpt: "The extract — opening pages of the book, and the page 26 line",
  cases: "Case evidence cards",
  listen: "Audio player (hidden until a recording exists)",
  map: "“Before we begin” (page 13 markers) and the map — the three systems, the sixteen chapters, page 226",
  author: "About the author",
  closing: "The book’s last sentence, above the notify form",
  companion: "Companion tool (currently hidden)",
  press: "Press page",
  footer: "Foot of every page",
  a11y: "Screen-reader labels (invisible, but read aloud)",
};

/** Values that are identifiers, not prose: never sent for review. */
const SKIP_KEYS = new Set(["key", "chapter", "page", "number", "file", "time"]);

const rows = [];
function walk(a, b, path, keyName) {
  if (typeof a === "string") {
    if (SKIP_KEYS.has(keyName)) return;
    if (!a.trim()) return;
    if (a.startsWith("[COPY NEEDED")) return; // not yet written in English
    rows.push({ section: path.split(/[.[]/)[0], key: path, english: a, translation: typeof b === "string" ? b : "" });
    return;
  }
  if (Array.isArray(a)) {
    a.forEach((v, i) => walk(v, Array.isArray(b) ? b[i] : undefined, `${path}[${i}]`, keyName));
    return;
  }
  if (a && typeof a === "object") {
    for (const [k, v] of Object.entries(a)) {
      walk(v, b && typeof b === "object" ? b[k] : undefined, path ? `${path}.${k}` : k, k);
    }
  }
}
walk(en, tr, "", "");

mkdirSync(new URL("../review/", import.meta.url), { recursive: true });
writeFileSync(
  new URL(`../review/${lang}-review.json`, import.meta.url),
  JSON.stringify({ lang, where: WHERE, rows }, null, 2),
);
console.log(`${lang}: ${rows.length} strings for review → review/${lang}-review.json`);
