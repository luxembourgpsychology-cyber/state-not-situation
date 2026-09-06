/**
 * One-off: re-shapes content/fr.ts and content/de.ts to the new content/en.ts
 * structure, carrying over every translation whose key survives and leaving
 * genuinely new strings empty, so they render as ⟦fr: key⟧ until an editor
 * writes them. Identifiers, numbers and file paths come from English.
 *
 *   node lib/migrate-content.mjs
 */
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const KEEP = new Set(["key", "chapter", "page", "number", "file", "time", "folio", "teaserCount", "quoteAfter"]);

/** new dotted path → old dotted path, for keys that moved or were renamed. */
const ALIAS = {
  "premise.eyebrow": "misreading.eyebrow",
  "premise.lines": "misreading.lines",
  "variables.loops": "map.loops",
  "moments.line": "map.mapLine",
  "moments.pageLabel": "cases.pageLabel",
  "moments.items": "cases.items",
  "moments.closing": "cases.closing",
  "moments.closingSource": "cases.closingSource",
  "evidence.grades": "map.grades",
  "excerpt.lead": "book.paragraphs.0",
  "author.readers": "book.readers",
  "closing.line": "footer.madeLine",
  "press.mapLabel": "misreading.investigationLabel",
  "press.mapTitle": "misreading.investigation",
  "press.mapLine": "map.mapLine",
  "press.pageColumn": "map.pageColumn",
  "press.chapters": "map.chapters",
  "press.sortingTool": "map.sortingTool",
  "press.sources": "map.heartbeat",
};

async function load(name, file) {
  const src = readFileSync(join(root, file), "utf8")
    .replace(/^import[^\n]*\n/gm, "")
    .replace(new RegExp(`export const ${name}: SiteContent =`), "export default");
  const tmp = join(tmpdir(), `sns-mig-${name}-${process.pid}.mjs`);
  writeFileSync(tmp, src);
  const mod = (await import(`file://${tmp}?t=${Date.now()}`)).default;
  unlinkSync(tmp);
  return mod;
}

const get = (obj, path) =>
  path.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);

const en = await load("en", "content/en.ts");

let carried = 0;
let blank = 0;

/** Resolve an alias that points at a container, so its children inherit it. */
function withAliases(path) {
  for (const [to, from] of Object.entries(ALIAS)) {
    if (path === to || path.startsWith(`${to}.`)) return path.replace(to, from);
  }
  return path;
}

function buildAliased(enNode, path, keyName, old) {
  if (typeof enNode === "string") {
    if (KEEP.has(keyName)) return enNode;
    if (enNode.startsWith("[COPY NEEDED")) return enNode;
    // Try the alias first, then the same path, so re-running is harmless.
    const prev = get(old, withAliases(path)) ?? get(old, path);
    if (typeof prev === "string" && prev.trim()) { carried++; return prev; }
    blank++;
    return "";
  }
  if (Array.isArray(enNode)) return enNode.map((v, i) => buildAliased(v, `${path}.${i}`, keyName, old));
  if (enNode && typeof enNode === "object") {
    return Object.fromEntries(
      Object.entries(enNode).map(([k, v]) => [k, buildAliased(v, path ? `${path}.${k}` : k, k, old)]),
    );
  }
  return enNode;
}

const HEAD = {
  fr: `import type { SiteContent } from "./types";

/**
 * FRENCH CONTENT. Same structure as content/en.ts, the canonical architecture
 * of brief/REDESIGN.md. Written under translation/STANDARD.md and
 * translation/METHOD-fr.md as an authored French edition, not a word-for-word
 * rendering. The book title stays untranslated; no French edition exists yet.
 *
 * An empty string renders as ⟦fr: some.key⟧ and never as silent English.
 */
export const fr: SiteContent = `,
  de: `import type { SiteContent } from "./types";

/**
 * GERMAN CONTENT. Same structure as content/en.ts, the canonical architecture
 * of brief/REDESIGN.md. Written under translation/STANDARD.md and
 * translation/METHOD-de.md as an authored German edition, not a word-for-word
 * rendering. The book title stays untranslated; no German edition exists yet.
 *
 * An empty string renders as ⟦de: some.key⟧ and never as silent English.
 */
export const de: SiteContent = `,
};

for (const lang of ["fr", "de"]) {
  carried = 0;
  blank = 0;
  const old = await load(lang, `content/${lang}.ts`);
  const next = buildAliased(en, "", "", old);
  const body = JSON.stringify(next, null, 2)
    .replace(/"([A-Za-z_][A-Za-z0-9_]*)":/g, "$1:")
    .replace(/\n/g, "\n");
  writeFileSync(join(root, `content/${lang}.ts`), `${HEAD[lang]}${body};\n`);
  console.log(`${lang}: ${carried} strings carried over, ${blank} left for the editor`);
}
