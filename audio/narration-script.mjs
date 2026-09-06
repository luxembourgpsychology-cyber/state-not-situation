/**
 * Turns a passage into an ElevenLabs-ready narration script: one numbered chunk
 * per paragraph, with explicit breaks written in.
 *
 *   node audio/narration-script.mjs                     # the site's extract
 *   node audio/narration-script.mjs chapter-01.txt      # any plain text file
 *
 * Why per paragraph. A single five-minute generation drifts in level and holds
 * one tempo throughout; that is what made the first two takes sound metronomic.
 * Generating a paragraph at a time gives each one its own delivery, lets a bad
 * paragraph be re-rolled without redoing the rest, and removes the drift.
 *
 * The breaks are the part that matters. Measured on the takes so far: pause
 * variability 0.53 where engaged narration runs 0.6 to 1.0, and no pause longer
 * than 1.4 s in five minutes. Written breaks put the holds back.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { unlinkSync } from "node:fs";

const root = fileURLToPath(new URL("..", import.meta.url));
const arg = process.argv[2];

let paragraphs;
let title = "The opening";
if (arg) {
  paragraphs = readFileSync(arg, "utf8").split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
  title = arg;
} else {
  const src = readFileSync(join(root, "content/en.ts"), "utf8")
    .replace(/^import[^\n]*\n/gm, "")
    .replace("export const en: SiteContent =", "export default");
  const tmp = join(tmpdir(), `sns-narr-${process.pid}.mjs`);
  writeFileSync(tmp, src);
  const en = (await import(`file://${tmp}`)).default;
  unlinkSync(tmp);
  paragraphs = [...en.excerpt.paragraphs];
  paragraphs.splice(en.excerpt.quoteAfter + 1, 0, en.excerpt.quote.replace(/^[“"]|[”"]$/g, ""));
}

/** Split into sentences without breaking initials, abbreviations or decimals. */
const ABBR = /\b(?:Mr|Mrs|Ms|Dr|Prof|St|Jr|Sr|vs|etc|e\.g|i\.e|U\.S|No)\.$/i;
function sentences(text) {
  const out = [];
  let buf = "";
  for (const tok of text.split(/(?<=[.!?:])\s+/)) {
    buf = buf ? `${buf} ${tok}` : tok;
    const trimmed = buf.trimEnd();
    // a single capital plus a stop is an initial ("John F."), not a sentence end
    const initial = /(?:^|\s)[A-Z]\.$/.test(trimmed);
    const decimal = /\d\.$/.test(trimmed);
    if (initial || decimal || ABBR.test(trimmed)) continue;
    out.push(trimmed);
    buf = "";
  }
  if (buf.trim()) out.push(buf.trim());          // never drop a remainder
  return out;
}

const words = (s) => s.split(/\s+/).filter(Boolean).length;

/**
 * Where the breath goes. Not after every short sentence — this book is full of
 * them and a break after each one plods. A beat belongs where a long build is
 * followed by a short landing, and there are at most three per paragraph.
 */
function withBreaks(paragraph) {
  const ss = sentences(paragraph);
  if (ss.length < 2) return paragraph;
  const candidates = [];
  for (let i = 0; i < ss.length - 1; i++) {
    const before = words(ss[i]), after = words(ss[i + 1]);
    if (before >= 18 && after <= 12) candidates.push({ i, weight: before - after });
  }
  candidates.sort((a, b) => b.weight - a.weight);
  const chosen = new Set(candidates.slice(0, 3).map((c) => c.i));
  return ss.map((s, i) => (chosen.has(i) ? `${s} <break time="0.6s" />` : s)).join(" ");
}

const lines = [];
lines.push(`NARRATION SCRIPT — ${title}`);
lines.push(`${paragraphs.length} chunks. Generate one at a time; keep the file names in order.`);
lines.push("");
lines.push("SETTINGS TO START FROM (then trust your ear, not the numbers):");
lines.push("  Model            Eleven v3 if you have it, otherwise Multilingual v2");
lines.push("  Stability        0.40   — higher is steadier and flatter; this is the");
lines.push("                            slider that makes it sound like a machine");
lines.push("  Similarity       0.80   — how close to your own voice");
lines.push("  Style            0.15   — above about 0.35 it starts to wobble");
lines.push("  Speaker boost    on");
lines.push("");
lines.push("Breaks are written in. Do not add more: too many in one chunk make the");
lines.push("model unstable, which is the opposite of what you want.");
lines.push("");
lines.push("=".repeat(72));

paragraphs.forEach((p, i) => {
  lines.push("");
  lines.push(`--- ${String(i + 1).padStart(2, "0")} ---`);
  lines.push(withBreaks(p));
  // the hold between paragraphs: this is where the reader breathes
  lines.push('<break time="1.4s" />');
});

lines.push("");
lines.push("=".repeat(72));
lines.push("AFTER GENERATING");
lines.push("  Concatenate the chunks in order, then:");
lines.push("    python3 audio/master.py <the joined file> --out public/audio/extract-en.m4a");
lines.push("  Check it:");
lines.push(`    python3 audio/qc.py <the joined file> ${paragraphs.join(" ").split(/\s+/).length}`);
lines.push("  Aim for: drift under 3 dB, signal to noise over 40 dB, pitch range 8 st or");
lines.push("  more, pause variety 0.6 or more, at least one hold of 2 s.");

const out = join(root, "audio/narration-script.txt");
writeFileSync(out, lines.join("\n") + "\n");
console.log(`wrote ${out} — ${paragraphs.length} chunks, ${paragraphs.join(" ").split(/\s+/).length} words`);
