// Generates content/fr.ts and content/de.ts as structural copies of en.ts with
// every string emptied. Run once: node lib/make-stubs.mjs
// Existing translations are NOT overwritten: it only writes a file if missing.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const enTs = readFileSync(new URL("../content/en.ts", import.meta.url), "utf8");
// crude but safe: evaluate the object literal through a TS→JS strip
const src = enTs.replace(/import[^\n]*\n/g, "").replace(/export const en: SiteContent =/, "export default");
writeFileSync("/tmp/_en_tmp.mjs", src);
const en = (await import("/tmp/_en_tmp.mjs")).default;
const blank = (v) => typeof v === "string" ? "" : Array.isArray(v) ? v.map(blank) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)])) : v;
for (const [loc, name] of [["fr", "French"], ["de", "German"]]) {
  const p = new URL(`../content/${loc}.ts`, import.meta.url);
  if (existsSync(p)) { console.log(`${loc}.ts exists, skipped`); continue; }
  const obj = blank(en);
  // keep non-translatable structure values
  obj.excerpt.teaserCount = en.excerpt.teaserCount; obj.excerpt.quoteAfter = en.excerpt.quoteAfter;
  obj.day.rows = en.day.rows.map((r) => ({ ...blank(r), time: r.time, loop: r.loop }));
  obj.about.chapters = en.about.chapters.map((c) => ({ number: c.number, title: "" }));
  obj.press.assets = en.press.assets.map((a) => ({ ...blank(a), file: a.file }));
  const body = `import type { SiteContent } from "./types";\n\n/**\n * ${name.toUpperCase()} CONTENT. Structure mirrors content/en.ts.\n * Every "" is a string still to translate; it renders as ⟦${loc}: key⟧ until filled.\n * Do not enable this language in site.config.ts until the file is complete.\n */\nexport const ${loc}: SiteContent = ${JSON.stringify(obj, null, 2)};\n`;
  writeFileSync(p, body); console.log(`wrote ${loc}.ts`);
}
