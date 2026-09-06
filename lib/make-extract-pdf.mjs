/**
 * Builds public/press/State-Not-Situation-extract-the-opening.pdf from the
 * verified text in content/en.ts, so the press extract always carries the
 * words the site and the author agree on.
 *
 *   node lib/make-extract-pdf.mjs
 *
 * This is a plain setting of the book's opening, not a facsimile of the
 * printed pages. When the book is re-exported, replace it with pages 7 to 9
 * of the interior PDF, which is better.
 */
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const src = readFileSync(join(root, "content/en.ts"), "utf8")
  .replace(/^import[^\n]*\n/gm, "")
  .replace("export const en: SiteContent =", "export default");
const tmp = join(tmpdir(), `sns-extract-${process.pid}.mjs`);
writeFileSync(tmp, src);
const en = (await import(`file://${tmp}`)).default;
unlinkSync(tmp);

const W = 432, H = 648;                    // 6 × 9 in at 72 pt
const M = 64, TOP = 76, BOT = 64;
const LEAD = 13.6, SIZE = 9.6;
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
const toWin = (s) => s
  .replace(/\u2018/g, "\\221").replace(/\u2019/g, "\\222").replace(/[\u201C]/g, "\\223").replace(/[\u201D]/g, "\\224")
  .replace(/\u2014/g, "\\227").replace(/\u2013/g, "\\226").replace(/š/g, "\\232").replace(/Š/g, "\\212").replace(/\u00a9/g, "\\251");

/** Greedy wrap using Times widths, close enough for a press extract. */
const WID = { " ": 250, default: 500 };
const widthOf = (ch) => {
  if (ch === " ") return 250;
  if ("iljt.,;:'!|".includes(ch)) return 280;
  if ("fr".includes(ch)) return 333;
  if ("MW".includes(ch)) return 880;
  if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) return 680;
  return 500;
};
const textWidth = (s, size) => [...s].reduce((a, c) => a + widthOf(c), 0) * size / 1000;
function wrap(text, size, maxW) {
  const out = []; let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (textWidth(next, size) > maxW && line) { out.push(line); line = word; }
    else line = next;
  }
  if (line) out.push(line);
  return out;
}

const pages = [];
let ops = [];
let y = 0;
const newPage = () => { if (ops.length) pages.push(ops); ops = []; y = H - TOP; };
const show = (s, size, font, xoff = 0) => {
  ops.push(`BT /${font} ${size} Tf 1 0 0 1 ${M + xoff} ${y.toFixed(1)} Tm (${toWin(esc(s))}) Tj ET`);
};
const para = (text, { size = SIZE, font = "F1", lead = LEAD, indent = 0, gapBefore = 0 } = {}) => {
  y -= gapBefore;
  for (const line of wrap(text, size, W - 2*M - indent)) {
    if (y < BOT + lead) { newPage(); }
    show(line, size, font, indent);
    y -= lead;
  }
};

newPage();
y = H - 150;
show("STATE. NOT SITUATION.", 11, "F2");
y -= 20; show("Ivana Budišin", 11, "F1");
y -= 34; show("The opening", 18, "F3");
y -= 16; show("Pages 7 to 9", 8.5, "F2");
y -= 44;

en.excerpt.paragraphs.forEach((p, i) => {
  para(p, { gapBefore: i ? 8 : 0 });
  if (i === en.excerpt.quoteAfter) {
    para(en.excerpt.quote, { size: 9.6, font: "F3", indent: 26, gapBefore: 12 });
    y -= 4;
  }
});
y -= 16;
para(en.excerpt.endNote, { size: 8.5, font: "F2" });
y -= 26;
para("\u00a9 2026 Budisin Publishing. ISBN-13 978-2-87996-258-0. Extract reproduced for press use.", { size: 7.6, font: "F2" });
newPage();

const objs = [];
const add = (s) => { objs.push(s); return objs.length; };
const fonts = { F1: "Times-Roman", F2: "Helvetica", F3: "Times-Italic" };
const fontIds = {};
for (const [k, v] of Object.entries(fonts)) fontIds[k] = add(`<< /Type /Font /Subtype /Type1 /BaseFont /${v} /Encoding /WinAnsiEncoding >>`);
const contentIds = pages.map((p) => {
  const stream = p.join("\n");
  return add(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
});
const pagesId = objs.length + pages.length + 1;
const pageIds = pages.map((_, i) => add(
  `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W} ${H}] ` +
  `/Resources << /Font << ${Object.entries(fontIds).map(([k, id]) => `/${k} ${id} 0 R`).join(" ")} >> >> ` +
  `/Contents ${contentIds[i]} 0 R >>`));
add(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
const infoId = add(`<< /Title (State. Not Situation. \\227 the opening) /Author (Ivana Budi\\232in) /Subject (Extract, pages 7 to 9) /Producer (Budisin Publishing) >>`);

let pdf = "%PDF-1.4\n";
const offsets = [0];
objs.forEach((o, i) => { offsets.push(pdf.length); pdf += `${i+1} 0 obj\n${o}\nendobj\n`; });
const xref = pdf.length;
pdf += `xref\n0 ${objs.length+1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objs.length; i++) pdf += `${String(offsets[i]).padStart(10,"0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objs.length+1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

const out = join(root, "public/press/State-Not-Situation-extract-the-opening.pdf");
writeFileSync(out, pdf, "latin1");
console.log(`wrote ${out} — ${pages.length} pages, ${(Buffer.byteLength(pdf,"latin1")/1024).toFixed(0)} KB`);
