/**
 * Generates content/fr.ts and content/de.ts as structural copies of content/en.ts
 * with every translatable string emptied.
 *
 *   node lib/make-stubs.mjs          # writes only files that do not exist
 *   node lib/make-stubs.mjs --force  # rebuilds them, discarding any translation
 *
 * An empty string renders on the site as ⟦fr: some.key⟧, so an unfinished
 * translation is always visible and never silently falls back to English.
 */
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** Field names that are identifiers or file paths, not prose: never blanked. */
const KEEP = new Set(["key", "chapter", "page", "number", "file", "time"]);

const force = process.argv.includes("--force");
const enPath = new URL("../content/en.ts", import.meta.url);
const src = readFileSync(enPath, "utf8")
  .replace(/^import[^\n]*\n/gm, "")
  .replace(/export const en: SiteContent =/, "export default");

const tmp = join(tmpdir(), `sns-en-${process.pid}.mjs`);
writeFileSync(tmp, src);
const en = (await import(`file://${tmp}`)).default;
unlinkSync(tmp);

const blank = (value, keyName) => {
  if (typeof value === "string") return KEEP.has(keyName) ? value : "";
  if (Array.isArray(value)) return value.map((v) => blank(v, keyName));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, blank(v, k)]));
  }
  return value; // numbers and booleans carry over unchanged
};

for (const [loc, name] of [["fr", "French"], ["de", "German"]]) {
  const path = new URL(`../content/${loc}.ts`, import.meta.url);
  if (existsSync(path) && !force) {
    console.log(`content/${loc}.ts exists — left alone (use --force to rebuild)`);
    continue;
  }
  const body =
    `import type { SiteContent } from "./types";\n\n` +
    `/**\n * ${name.toUpperCase()} CONTENT. Same structure as content/en.ts.\n *\n` +
    ` * Every "" is a string still to translate. Until it is filled it renders as\n` +
    ` * ⟦${loc}: the.key⟧ so nothing English can leak through unnoticed.\n *\n` +
    ` * Identifiers, page numbers, times and file paths are already correct and\n` +
    ` * should not be changed. Do not enable this language in site.config.ts\n` +
    ` * until the file is complete.\n */\n` +
    `export const ${loc}: SiteContent = ${JSON.stringify(blank(en), null, 2)};\n`;
  writeFileSync(path, body);
  console.log(`wrote content/${loc}.ts`);
}
