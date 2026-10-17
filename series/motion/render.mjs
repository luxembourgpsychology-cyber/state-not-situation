#!/usr/bin/env node
// Renders each motion piece in this folder to an MP4 and a poster PNG.
//
//   node series/motion/render.mjs            renders M1 to M8
//   node series/motion/render.mjs M2 M5      renders only those
//
// Frames are captured at a fixed timestep: every CSS animation on the page is paused and
// seeked to the frame's time before the screenshot, so a render is deterministic and does
// not depend on how fast the machine happens to draw. Each piece declares its length in
// <meta name="motion:duration" content="milliseconds">.
//
// Needs the global Playwright (1.56) with Chromium under /opt/pw-browsers, and ffmpeg on
// the path. Nothing is installed by this script.

import { spawn } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const FPS = 25;
const WIDTH = 1920;
const HEIGHT = 1080;

process.env.PLAYWRIGHT_BROWSERS_PATH ||= '/opt/pw-browsers';

async function loadPlaywright() {
  const candidates = ['playwright', '/opt/node-tools/node_modules/playwright/index.mjs'];
  for (const c of candidates) {
    try { return await import(c); } catch {}
  }
  throw new Error('Playwright not found. Install it globally or point this script at it.');
}

function durationOf(htmlPath) {
  const html = readFileSync(htmlPath, 'utf8');
  const m = html.match(/<meta\s+name="motion:duration"\s+content="(\d+)"/);
  if (!m) throw new Error(`${htmlPath} declares no motion:duration`);
  return Number(m[1]);
}

function startFfmpeg(outPath) {
  const args = [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-r', String(FPS),
    '-movflags', '+faststart',
    outPath,
  ];
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => {
    ff.on('close', code => (code === 0 ? res() : rej(new Error(`ffmpeg exited ${code}`))));
    ff.on('error', rej);
  });
  return { ff, done };
}

function write(stream, buf) {
  return new Promise(res => {
    if (stream.write(buf)) res(); else stream.once('drain', res);
  });
}

async function renderOne(browser, name) {
  const htmlPath = join(here, `${name}.html`);
  if (!existsSync(htmlPath)) throw new Error(`${htmlPath} does not exist`);
  const duration = durationOf(htmlPath);
  const frames = Math.round(duration / 1000 * FPS) + 1; // the last frame is the end state, held

  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // Freeze the page's animations the moment the document is parsed, before any real time
  // has passed, so that nothing has run on the browser's own clock before we take over.
  await page.addInitScript(() => {
    const freeze = () => { for (const a of document.getAnimations()) { a.pause(); a.currentTime = 0; } };
    document.addEventListener('DOMContentLoaded', freeze);
    window.addEventListener('load', freeze);
  });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  // Give the Google faces a chance to arrive; carry on with the fallbacks if they do not.
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  // Which of the design system's faces arrived. A face the page does not use is not loaded
  // and is not listed; a face the page uses that is missing has been drawn with its fallback.
  const faces = await page.evaluate(() =>
    [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))].sort());

  // Freeze every animation; from here the clock is ours.
  await page.evaluate(() => { for (const a of document.getAnimations()) { a.pause(); a.currentTime = 0; } });

  const mp4 = join(here, `${name}.mp4`);
  const { ff, done } = startFfmpeg(mp4);
  let last;
  for (let i = 0; i < frames; i++) {
    const t = Math.min(i * 1000 / FPS, duration);
    // Seek, then let two frames pass: Chromium paints SVG a frame behind a programmatic seek.
    await page.evaluate(ms => {
      for (const a of document.getAnimations()) { a.pause(); a.currentTime = ms; }
      return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    }, t);
    last = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    await write(ff.stdin, last);
  }
  ff.stdin.end();
  await done;

  const { writeFileSync } = await import('node:fs');
  writeFileSync(join(here, `${name}.png`), last);
  await page.close();
  return { name, duration, frames, faces };
}

const wanted = process.argv.slice(2).length ? process.argv.slice(2) : ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'];
const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
try {
  for (const name of wanted) {
    const r = await renderOne(browser, name);
    console.log(`${r.name}  ${(r.duration / 1000).toFixed(1)} s  ${r.frames} frames  faces loaded: ${r.faces.length ? r.faces.join(', ') : 'none (fallbacks drawn)'}`);
  }
} finally {
  await browser.close();
}
