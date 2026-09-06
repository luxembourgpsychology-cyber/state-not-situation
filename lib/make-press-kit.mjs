/**
 * Builds public/press/State-Not-Situation-press-kit.zip.
 *
 *   node lib/make-press-kit.mjs
 *
 * The kit holds the downloadable assets under professional file names, plus
 * one fact sheet per language generated from content/<lang>.ts, so the sheet
 * can never drift from the press page. It writes no new prose: every line in
 * the fact sheet is a string already on the site.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, unlinkSync, copyFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const press = join(root, "public/press");
const stage = join(tmpdir(), `sns-press-kit-${process.pid}`);
const KIT = "State-Not-Situation-press-kit";

async function load(name) {
  const src = readFileSync(join(root, `content/${name}.ts`), "utf8")
    .replace(/^import[^\n]*\n/gm, "")
    .replace(new RegExp(`export const ${name}: SiteContent =`), "export default");
  const tmp = join(tmpdir(), `sns-${name}-${process.pid}.mjs`);
  writeFileSync(tmp, src);
  const mod = (await import(`file://${tmp}`)).default;
  unlinkSync(tmp);
  return mod;
}

/** source file in public/press → name inside the kit */
const FILES = [
  // Cover, at print resolution and print ready. 6 × 9 in, the book's trim.
  ["cover-front-300dpi.png", "cover-front-300dpi.png"],
  ["cover-back-300dpi.png", "cover-back-300dpi.png"],
  ["cover-wrap-300dpi.png", "cover-wrap-300dpi.png"],
  ["cover-spine-300dpi.png", "cover-spine-300dpi.png"],
  ["cover-print-6x9.pdf", "cover-print-6x9.pdf"],
  ["cover-front-2400.jpg", "cover-front-2400px.jpg"],
  ["cover-front-1000px.jpg", "cover-front-1000px.jpg"],
  ["book-render.png", "book-render.png"],
  // The author.
  ["author-photo-1600.jpg", "author-photo-1600px.jpg"],
  // The extract, set from the text the author supplied on 6 September 2026.
  ["State-Not-Situation-extract-the-opening.pdf", "extract-the-opening.pdf"],
  // Banners and social.
  ["banner-web-2400x1000.jpg", "banner-web-2400x1000.jpg"],
  ["banner-linkedin-1584x396.jpg", "banner-linkedin-1584x396.jpg"],
  ["banner-x-1500x500.jpg", "banner-x-1500x500.jpg"],
  ["post-1x1-1080.jpg", "social-1x1-1080.jpg"],
  ["post-4x5-1080x1350.jpg", "social-4x5-1080x1350.jpg"],
  ["post-16x9-1920x1080.jpg", "social-16x9-1920x1080.jpg"],
  ["post-9x16-1080x1920.jpg", "social-9x16-1080x1920.jpg"],
  ["render-1x1-1080.jpg", "book-render-1x1-1080.jpg"],
];

const LANG_NAME = { en: "English", fr: "French", de: "German" };

function sheet(c, isbn) {
  const p = c.press;
  const line = (label, value) => `${label}\n${value}\n`;
  const out = [];
  out.push(`${p.title.toUpperCase()}\n${"=".repeat(p.title.length)}\n`);
  out.push(`${p.intro}\n`);
  out.push(`\n${p.factsHeading.toUpperCase()}\n`);
  for (const f of p.facts) out.push(line(f.label, f.label.startsWith("ISBN") && isbn ? isbn : f.value));
  out.push(`\n${p.descriptionHeading.toUpperCase()}\n`);
  for (const d of p.description) out.push(`${d}\n`);
  out.push(`\n${p.bioHeading.toUpperCase()}\n`);
  for (const b of p.bios.filter((b) => !b.text.startsWith("[COPY NEEDED"))) out.push(line(b.label, b.text));
  out.push(`\n${p.creditsHeading.toUpperCase()}\n`);
  for (const cr of p.credits) out.push(line(cr.label, cr.value));
  out.push(`\n${p.contactHeading.toUpperCase()}\n`);
  out.push(`${c.author.title}\nivana@luxembourgpsychology.com\nhttps://statenotsituation.com\n`);
  return out.join("");
}

rmSync(stage, { recursive: true, force: true });
mkdirSync(join(stage, KIT), { recursive: true });

for (const [from, to] of FILES) {
  const src = join(press, from);
  if (!existsSync(src)) { console.warn(`missing, skipped: ${from}`); continue; }
  copyFileSync(src, join(stage, KIT, `State-Not-Situation-${to}`));
}

for (const lang of ["en", "fr", "de"]) {
  const c = await load(lang);
  const isbn = readFileSync(join(root, "site.config.ts"), "utf8").match(/isbn: "([^"]+)"/)?.[1] ?? null;
  writeFileSync(join(stage, KIT, `State-Not-Situation-press-information-${LANG_NAME[lang]}.txt`), sheet(c, isbn));
}

const out = join(press, `${KIT}.zip`);
rmSync(out, { force: true });
execFileSync("zip", ["-r", "-q", "-X", out, KIT], { cwd: stage });
rmSync(stage, { recursive: true, force: true });
const bytes = readFileSync(out).length;
// A manifest the press page reads at build time, so the size and count on the
// page can never drift from the file.
writeFileSync(join(press, `${KIT}.json`), JSON.stringify({
  files: FILES.length + 3,
  bytes,
  megabytes: Number((bytes / 1024 / 1024).toFixed(1)),
}, null, 2));
console.log(`wrote public/press/${KIT}.zip (${(bytes/1024/1024).toFixed(1)} MB, ${FILES.length + 3} files)`);
