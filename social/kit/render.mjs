// Renders one post spec (JSON) to 1080 x 1350 PNG slides and one HTML file.
// Usage: node social/kit/render.mjs social/posts/<slug>/post.json
// The look is the practice site's own: navy opening, white panel, paper ground,
// Newsreader for sentences, Hanken Grotesk for labels. Nothing else is allowed in.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const specPath = resolve(process.argv[2] ?? "");
const spec = JSON.parse(readFileSync(specPath, "utf8"));
const out = dirname(specPath);
const font = (f) => pathToFileURL(join(here, "fonts", f)).href;
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const css = `
@font-face{font-family:"Newsreader";font-weight:400 500;src:url(${font("newsreader-latin.woff2")}) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+2000-206F,U+20AC}
@font-face{font-family:"Newsreader";font-weight:400 500;src:url(${font("newsreader-latin-ext.woff2")}) format("woff2");unicode-range:U+0100-02BA,U+1E00-1E9F}
@font-face{font-family:"Hanken Grotesk";font-weight:400 600;src:url(${font("hanken-grotesk-latin.woff2")}) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+2000-206F,U+20AC}
@font-face{font-family:"Hanken Grotesk";font-weight:400 600;src:url(${font("hanken-grotesk-latin-ext.woff2")}) format("woff2");unicode-range:U+0100-02BA,U+1E00-1E9F}
:root{--paper:#f6f8fc;--white:#fff;--ink:#15253c;--muted:#4c5e76;--blue:#204dbd;--line:#cbd7e8;--navy:#132747;--navy-muted:#c1d3ea}
*{box-sizing:border-box;margin:0}
body{background:#888;font:400 34px/1.45 "Hanken Grotesk",sans-serif;-webkit-font-smoothing:antialiased}
.slide{position:relative;width:1080px;height:1350px;padding:96px 88px;display:flex;flex-direction:column;overflow:hidden}
.navy{background:var(--navy);color:var(--white)}
.paper{background:var(--paper);color:var(--ink)}
.label{font:600 24px/1.4 "Hanken Grotesk",sans-serif;letter-spacing:.105em;text-transform:uppercase;color:var(--blue)}
.navy .label{color:var(--navy-muted)}
.sentence{font:400 92px/1.06 "Newsreader",serif;letter-spacing:-.025em;margin-top:auto;margin-bottom:auto;max-width:11.5em}
.sentence.long{font-size:76px}
.foot{display:flex;justify-content:space-between;align-items:baseline;font:600 22px/1.4 "Hanken Grotesk",sans-serif;letter-spacing:.105em;text-transform:uppercase;color:var(--muted)}
.navy .foot{color:var(--navy-muted)}
.panel{margin-top:auto;margin-bottom:auto;background:var(--white);color:var(--ink);border:1px solid #d4dfeb;border-radius:12px;padding:64px 60px 56px}
.panel h2{font:400 84px/1.04 "Newsreader",serif;letter-spacing:-.025em;margin:14px 0 34px}
.row{display:grid;grid-template-columns:270px 1fr;column-gap:28px;padding:26px 0;border-top:1px solid var(--line);font-size:36px;line-height:1.3}
.row:last-child{border-bottom:1px solid var(--line)}
.row dt{color:var(--blue);font-weight:600}
.row dd{margin:0}
.brand{font:500 46px/1 "Newsreader",serif;letter-spacing:-.025em;text-transform:none;color:var(--ink)}
.navy .brand{color:var(--white)}
.brand span{display:block;margin-top:9px;font:500 19px/1.2 "Hanken Grotesk",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.navy .brand span{color:var(--navy-muted)}
.scene{background-size:cover;background-position:center}
.scene.navy{text-shadow:0 1px 24px #0b1a3266}
.scene .panel{text-shadow:none;border-color:#ffffff66}
.who{display:flex;align-items:center;gap:16px}
.mark{width:52px;height:52px;flex:none}
.close-who{display:flex;align-items:center;gap:22px}
.close-who .mark{width:84px;height:84px}
.sub{margin-top:28px;color:var(--muted);font-size:36px;line-height:1.45;max-width:22em}
.navy .sub{color:var(--navy-muted)}
`;

// The practice's mark, exactly as in the site's favicon.svg: three circles on a dark tile.
const mark = `<svg class="mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#101C22"/><circle cx="32" cy="24" r="13" fill="#B9D0FA" opacity=".95"/><circle cx="23" cy="40" r="13" fill="#D9C7FA" opacity=".9"/><circle cx="41" cy="40" r="13" fill="#FBD3C2" opacity=".9"/></svg>`;
const foot = (i, n) =>
  `<div class="foot"><span class="who">${mark}<span>Luxembourg Psychology</span></span><span>${i} / ${n}</span></div>`;
// Softened photographs in social/kit/scenery/<name>-soft.jpg, under a veil of the ground colour
// so the sentence stays the loudest thing on the slide.
const scene = (s, ground) => {
  if (!s.scenery) return ["", ""];
  const veil = ground === "paper"
    ? "linear-gradient(#f6f8fcb8,#f6f8fcd9)"
    : "linear-gradient(#132747a6,#132747d1)";
  const url = pathToFileURL(join(here, "scenery", `${s.scenery}-soft.jpg`)).href;
  return [" scene", ` style="background-image:${veil},url(${url})"`];
};

function slide(s, i, n) {
  const ground = s.ground === "paper" ? "paper" : "navy";
  const [sc, bg] = scene(s, ground);
  if (s.type === "line") {
    const long = s.text.length > 70 ? " long" : "";
    return `<section class="slide ${ground}${sc}"${bg}>
  ${s.label ? `<p class="label">${esc(s.label)}</p>` : ""}
  <p class="sentence${long}">${esc(s.text)}</p>
  ${foot(i, n)}</section>`;
  }
  if (s.type === "matrix") {
    return `<section class="slide ${ground}${sc}"${bg}>
  <div class="panel"><p class="label" style="color:var(--blue)">${esc(s.label)}</p><h2>${esc(s.title)}</h2>
  <dl>${s.rows.map(([k, v]) => `<div class="row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl></div>
  ${foot(i, n)}</section>`;
  }
  if (s.type === "close") {
    return `<section class="slide ${ground}${sc}"${bg}>
  <p class="label">${esc(s.label ?? "")}</p>
  <div style="margin-top:auto;margin-bottom:auto"><p class="sentence" style="margin:0">${esc(s.text)}</p>
  ${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ""}</div>
  <div class="foot" style="align-items:flex-end"><div class="close-who">${mark}<div class="brand">Luxembourg Psychology<span>Ivana Budišin</span></div></div><span>${esc(s.url ?? "")}</span></div></section>`;
  }
  throw new Error(`Unknown slide type: ${s.type}`);
}

const n = spec.slides.length;
const html = `<!doctype html><html lang="${spec.lang ?? "en"}"><head><meta charset="utf-8">
<meta name="hz:slide-selector" content=".slide"><title>${esc(spec.slug)}</title><style>${css}</style></head>
<body>${spec.slides.map((s, i) => slide(s, i + 1, n)).join("\n")}</body></html>`;
writeFileSync(join(out, "post.html"), html);

const { chromium } = require("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(out, "post.html")).href);
await page.evaluate(() => document.fonts.ready);
const slides = await page.locator(".slide").all();
let overflow = [];
for (const [i, el] of slides.entries()) {
  const over = await el.evaluate((e) => e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1);
  if (over) overflow.push(i + 1);
  await el.screenshot({ path: join(out, `${String(i + 1).padStart(2, "0")}.png`) });
}
await browser.close();
if (overflow.length) {
  console.error(`Overflow on slide(s) ${overflow.join(", ")}: shorten the text, do not shrink the type.`);
  process.exit(1);
}
console.log(`${n} slide(s) written to ${out}`);
