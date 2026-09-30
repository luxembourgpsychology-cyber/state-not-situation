#!/usr/bin/env python3
"""
Every cover asset on the site and in the press kit, from one file.

    python3 lib/make_cover_assets.py

SOURCE is the KDP cover PDF and nothing else. The flat cuts are taken at the
trim, at 300 dpi. The book mockup, the banners and the social images are
composed here, and the only type they add is DIN Alternate Bold, which is the
site's own navigational face and the one face of the book's five that exists
as a file on this machine. Everything else — the title lockup, the strapline,
the author credit — is lifted from the cover artwork itself, so it is set in
the book's real typefaces and cannot drift from the printed object.

When the page count changes the cover is rebuilt and its width changes with
it. Point SOURCE at the new PDF and run this again: the geometry below is
derived from the PDF's own page size, so nothing here needs editing.

After running:  node lib/make-press-kit.mjs
"""

from __future__ import annotations

import math
import shutil
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw, ImageFilter, ImageFont

try:
    import numpy as np
except ImportError:  # pragma: no cover
    sys.exit("numpy is required: python3 -m pip install numpy")

ROOT = Path(__file__).resolve().parent.parent

# The cover to cut from. Pass a path as the first argument to use a different
# one — that is what lib/new-cover.sh does — otherwise this is the cover.
DEFAULT_SOURCE = Path(
    "/Users/ivanalarussonbudisin/Desktop/STATE NOT SITUATION - v46 PROOF CORRECTIONS"
    "/v48 - towards final/COVER for v50/State Not Situation - COVER v50 (304 pages).pdf"
)
SOURCE = Path(sys.argv[1]).expanduser() if len(sys.argv) > 1 else DEFAULT_SOURCE
IMAGES = ROOT / "public/images"
PRESS = ROOT / "public/press"

DPI = 300
BLEED_IN = 0.125
PANEL_IN = 6.0
TRIM_H_IN = 9.0

# The site's own tokens, from app/globals.css.
CREAM = (247, 243, 236)
RED = (181, 41, 28)
INK = (17, 17, 17)
QUIET = (111, 106, 98)

DIN = "/System/Library/Fonts/Supplemental/DIN Alternate Bold.ttf"


# ----------------------------------------------------------------- helpers --

def din(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(DIN, size)


def tracked(draw: ImageDraw.ImageDraw, xy, text: str, font, fill, tracking: float):
    """DIN caps with letter-spacing, which PIL has no setting for."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x - tracking - xy[0]


def tracked_width(draw: ImageDraw.ImageDraw, text: str, font, tracking: float) -> float:
    return sum(draw.textlength(c, font=font) for c in text) + tracking * (len(text) - 1)


def trim_to_content(img: Image.Image, bg, tol: int = 18) -> Image.Image:
    """Crop to the pixels that differ from the panel colour."""
    a = np.asarray(img.convert("RGB")).astype(int)
    diff = np.abs(a - np.array(bg)).sum(axis=2)
    ys, xs = np.where(diff > tol)
    if len(xs) == 0:
        return img
    return img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def fit(img: Image.Image, w: int, h: int) -> Image.Image:
    return img.resize((w, h), Image.LANCZOS)


def scale_to_height(img: Image.Image, h: int) -> Image.Image:
    return fit(img, max(1, round(img.width * h / img.height)), h)


def scale_to_width(img: Image.Image, w: int) -> Image.Image:
    return fit(img, w, max(1, round(img.height * w / img.width)))


def save_jpg(img: Image.Image, path: Path, quality: int = 92):
    img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {path.relative_to(ROOT)}  {img.width}×{img.height}")


def save_png(img: Image.Image, path: Path):
    img.save(path, "PNG", optimize=True)
    print(f"  {path.relative_to(ROOT)}  {img.width}×{img.height}")


# ------------------------------------------------------------- the cutting --

def render_source():
    if not SOURCE.exists():
        sys.exit(f"Cover PDF not found:\n  {SOURCE}")
    doc = pymupdf.open(SOURCE)
    page = doc[0]
    page_w_in = page.rect.width / 72
    page_h_in = page.rect.height / 72
    spine_in = page_w_in - 2 * BLEED_IN - 2 * PANEL_IN
    print(f"Cover  {page_w_in:.4f} × {page_h_in:.4f} in with bleed")
    print(f"Trim   {page_w_in - 2 * BLEED_IN:.4f} × {page_h_in - 2 * BLEED_IN:.4f} in")
    print(f"Spine  {spine_in:.4f} in\n")

    pm = page.get_pixmap(dpi=DPI)
    full = Image.frombytes("RGB", (pm.width, pm.height), pm.samples)

    px = lambda inches: round(inches * DPI)
    top, bottom = px(BLEED_IN), px(BLEED_IN + TRIM_H_IN)
    x_back = px(BLEED_IN)
    x_spine = px(BLEED_IN + PANEL_IN)
    x_front = px(BLEED_IN + PANEL_IN + spine_in)
    x_end = px(BLEED_IN + PANEL_IN + spine_in + PANEL_IN)

    return {
        "full": full,
        "wrap": full.crop((x_back, top, x_end, bottom)),
        "back": full.crop((x_back, top, x_spine, bottom)),
        "spine": full.crop((x_spine, top, x_front, bottom)),
        "front": full.crop((x_front, top, x_end, bottom)),
        "spine_in": spine_in,
    }


def lockup_from(front: Image.Image) -> Image.Image:
    """
    The title lockup off the front panel: eyebrow, hairline with the heartbeat,
    STATE, NOT SITUATION. Cropped generously, then trimmed to its own ink, so a
    change to the lockup's position on the cover does not need a change here.
    """
    w, h = front.size  # 6 × 9 in at DPI
    # The band runs from above the eyebrow to below NOT SITUATION and stops
    # short of the bracket box under it. Generous on every side, because the
    # trim does the real work.
    band = front.crop((round(w * 0.05), round(h * 0.25), round(w * 0.95), round(h * 0.655)))
    return trim_to_content(band, CREAM)


# -------------------------------------------------------------- the mockup --

def find_coeffs(dst, src):
    m = []
    for (dx, dy), (sx, sy) in zip(dst, src):
        m.append([dx, dy, 1, 0, 0, 0, -sx * dx, -sx * dy])
        m.append([0, 0, 0, dx, dy, 1, -sy * dx, -sy * dy])
    A = np.array(m, dtype=float)
    B = np.array(src, dtype=float).reshape(8)
    return np.linalg.lstsq(A, B, rcond=None)[0]


def warp(img: Image.Image, quad, size):
    """Map the whole of img onto quad (tl, tr, br, bl) on a canvas of `size`."""
    w, h = img.size
    coeffs = find_coeffs(quad, [(0, 0), (w, 0), (w, h), (0, h)])
    warped = img.convert("RGB").transform(size, Image.PERSPECTIVE, coeffs, Image.BICUBIC)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).polygon(quad, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(0.6))
    out = Image.new("RGBA", size, (0, 0, 0, 0))
    out.paste(warped, (0, 0), mask)
    return out


def mockup(
    front: Image.Image,
    spine: Image.Image,
    size: int = 2000,
    spine_in: float = 0.6846,
    theta_deg: float = 30.0,
) -> Image.Image:
    """
    The book as an object, on transparency: front face and spine, one soft
    shadow, no gloss and no floor. For press and social only — the site's hero
    is the flat printed cover, and the brief forbids a render there.

    The corners are projected rather than placed by eye. The book is a real
    box, 6 × 9 × `spine_in` inches, turned `theta_deg` about its vertical axis
    and seen from a camera 26 inches away, level with the middle of the cover.
    That matters: a 0.6846 in spine is a ninth of a 6 in face, and any spine
    drawn wider than the projection gives reads as a box rather than a book.
    The camera is level on purpose — no top face, nothing tipped. The object
    stays as still as the cover on the first screen.
    """
    S = size
    W, H, D = PANEL_IN, TRIM_H_IN, spine_in
    th = math.radians(theta_deg)
    dist = 26.0

    # Three vertical edges, in inches, after turning the box about y.
    edges = {
        "spine_out": (-D * math.sin(th), D * math.cos(th)),
        "seam": (0.0, 0.0),
        "front_out": (W * math.cos(th), W * math.sin(th)),
    }
    cx = W * math.cos(th) / 2

    def project(key, top: bool):
        x, z = edges[key]
        k = dist / (dist + z)
        return ((x - cx) * k, (H / 2 if top else -H / 2) * k)

    raw = {k: (project(k, True), project(k, False)) for k in edges}
    xs = [p[0] for pair in raw.values() for p in pair]
    ys = [p[1] for pair in raw.values() for p in pair]
    span_x, span_y = max(xs) - min(xs), max(ys) - min(ys)

    # Fit the silhouette into the canvas with room for the shadow.
    scale = min(S * 0.80 / span_x, S * 0.88 / span_y)
    ox = S / 2 - (min(xs) + max(xs)) / 2 * scale
    oy = S / 2 + (min(ys) + max(ys)) / 2 * scale

    def to_px(pt):
        return (round(ox + pt[0] * scale), round(oy - pt[1] * scale))

    spine_top, spine_bot = (to_px(p) for p in raw["spine_out"])
    seam_top, seam_bot = (to_px(p) for p in raw["seam"])
    front_top, front_bot = (to_px(p) for p in raw["front_out"])

    canvas = Image.new("RGBA", (S, S), (0, 0, 0, 0))

    # Shadow first, cast down and a little left, under the whole silhouette.
    shadow = Image.new("L", (S, S), 0)
    ImageDraw.Draw(shadow).polygon(
        [spine_top, seam_top, front_top, front_bot, seam_bot, spine_bot], fill=88
    )
    shadow = shadow.transform(
        (S, S), Image.AFFINE, (1, 0, round(S * 0.010), 0, 1, -round(S * 0.020))
    ).filter(ImageFilter.GaussianBlur(S * 0.020))
    canvas.paste(Image.new("RGBA", (S, S), (17, 17, 17, 255)), (0, 0), shadow)

    # The two faces.
    canvas.alpha_composite(warp(spine, [spine_top, seam_top, seam_bot, spine_bot], (S, S)))
    canvas.alpha_composite(warp(front, [seam_top, front_top, front_bot, seam_bot], (S, S)))

    # The spine turns away from the light, so it sits a little darker, and the
    # seam catches a hairline of it.
    shade = Image.new("L", (S, S), 0)
    ImageDraw.Draw(shade).polygon([spine_top, seam_top, seam_bot, spine_bot], fill=46)
    canvas.paste(Image.new("RGBA", (S, S), (17, 17, 17, 255)), (0, 0), shade)

    seam = Image.new("L", (S, S), 0)
    ImageDraw.Draw(seam).line([seam_top, seam_bot], fill=60, width=max(2, S // 500))
    canvas.paste(
        Image.new("RGBA", (S, S), (255, 255, 255, 255)),
        (0, 0),
        seam.filter(ImageFilter.GaussianBlur(S / 900)),
    )
    return canvas


# --------------------------------------------------------- the compositions --

def frame(w: int, h: int) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    """Cream ground with the one hairline the press assets have always had."""
    img = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(img)
    inset = round(min(w, h) * 0.030)
    d.rectangle(
        [inset, inset, w - inset - 1, h - inset - 1],
        outline=RED,
        width=max(1, round(min(w, h) / 600)),
    )
    return img, d


def place(canvas: Image.Image, art: Image.Image, cx: int, cy: int):
    canvas.paste(art, (round(cx - art.width / 2), round(cy - art.height / 2)), art)


def banner(w: int, h: int, render: Image.Image, lock: Image.Image, author: str) -> Image.Image:
    """The book on the left, the cover's own lockup on the right."""
    img, d = frame(w, h)
    pad = round(min(w, h) * 0.105)

    bk = scale_to_height(render, round(h - 2 * pad))
    bx = pad + round(bk.width / 2)
    img.paste(bk, (pad, round(h / 2 - bk.height / 2)), bk)

    left = bx + round(bk.width / 2) + round(w * 0.035)
    avail = w - left - pad
    lw = min(avail, round(w * 0.46))
    lk = scale_to_width(lock, lw)

    fs = max(10, round(h * 0.030))
    f = din(fs)
    gap = round(h * 0.075)
    block_h = lk.height + gap + fs
    top = round(h / 2 - block_h / 2)

    img.paste(lk, (left, top))
    tracked(d, (left + 3, top + lk.height + gap), author, f, QUIET, fs * 0.22)
    return img


def post(w: int, h: int, render: Image.Image, lock: Image.Image, author: str) -> Image.Image:
    """
    Stacked: the book above, the lockup below. The book is the subject and
    takes rather more than half the column — a thumbnail of it under a huge
    title reads as a title with a decoration, which is the wrong way round for
    a book announcement.
    """
    img, d = frame(w, h)
    pad = round(min(w, h) * 0.085)
    avail_h = h - 2 * pad

    fs = max(11, round(min(w, h) * 0.026))
    f = din(fs)
    gap = round(min(w, h) * 0.050)

    lk = scale_to_width(lock, min(w - 2 * pad, round(w * 0.60)))
    # Never let the lockup take more than a quarter of the column.
    if lk.height > avail_h * 0.25:
        lk = scale_to_height(lock, round(avail_h * 0.25))

    bk_h = avail_h - lk.height - gap - round(gap * 0.75) - fs
    bk = scale_to_height(render, max(40, bk_h))
    if bk.width > w - 2 * pad:
        bk = scale_to_width(bk, w - 2 * pad)

    total = bk.height + gap + lk.height + round(gap * 0.75) + fs
    y = round(h / 2 - total / 2)

    place(img, bk, w // 2, y + bk.height // 2)
    y += bk.height + gap
    img.paste(lk, (round(w / 2 - lk.width / 2), y))
    y += lk.height + round(gap * 0.75)
    tw = tracked_width(d, author, f, fs * 0.22)
    tracked(d, (round(w / 2 - tw / 2), y), author, f, QUIET, fs * 0.22)
    return img


def render_card(w: int, h: int, render: Image.Image) -> Image.Image:
    """The book alone, framed. The press kit's book-render shots."""
    img, _ = frame(w, h)
    pad = round(min(w, h) * 0.115)
    bk = scale_to_height(render, h - 2 * pad)
    if bk.width > w - 2 * pad:
        bk = scale_to_width(bk, w - 2 * pad)
    place(img, bk, w // 2, h // 2)
    return img


# -------------------------------------------------------------------- main --

def main():
    IMAGES.mkdir(parents=True, exist_ok=True)
    PRESS.mkdir(parents=True, exist_ok=True)

    cut = render_source()
    front, back, spine, wrap = cut["front"], cut["back"], cut["spine"], cut["wrap"]

    print("Site images")
    save_jpg(scale_to_height(front, 1800), IMAGES / "cover-front.jpg")
    save_jpg(scale_to_height(back, 1800), IMAGES / "cover-back.jpg")
    save_jpg(scale_to_height(spine, 1800), IMAGES / "cover-spine.jpg")

    lock = lockup_from(front)
    book = mockup(front, spine, spine_in=cut["spine_in"])
    save_png(scale_to_width(book, 1600), IMAGES / "mockup-3d.png")

    author = "IVANA BUDIŠIN"
    save_jpg(banner(1200, 630, book, lock, author), IMAGES / "og.jpg")

    print("\nPress, flat")
    save_png(front, PRESS / "cover-front-300dpi.png")
    save_png(back, PRESS / "cover-back-300dpi.png")
    save_png(spine, PRESS / "cover-spine-300dpi.png")
    save_png(wrap, PRESS / "cover-wrap-300dpi.png")
    save_jpg(scale_to_height(front, 2400), PRESS / "cover-front-2400.jpg")
    save_jpg(scale_to_height(front, 1000), PRESS / "cover-front-1000px.jpg")
    shutil.copyfile(SOURCE, PRESS / "cover-print-6x9.pdf")
    print(f"  {(PRESS / 'cover-print-6x9.pdf').relative_to(ROOT)}  the KDP file itself")

    print("\nPress, composed")
    save_png(book, PRESS / "book-render.png")
    save_jpg(render_card(1080, 1080, book), PRESS / "render-1x1-1080.jpg")
    save_jpg(banner(2400, 1000, book, lock, author), PRESS / "banner-web-2400x1000.jpg")
    save_jpg(banner(1584, 396, book, lock, author), PRESS / "banner-linkedin-1584x396.jpg")
    save_jpg(banner(1500, 500, book, lock, author), PRESS / "banner-x-1500x500.jpg")
    save_jpg(post(1080, 1080, book, lock, author), PRESS / "post-1x1-1080.jpg")
    save_jpg(post(1080, 1350, book, lock, author), PRESS / "post-4x5-1080x1350.jpg")
    save_jpg(banner(1920, 1080, book, lock, author), PRESS / "post-16x9-1920x1080.jpg")
    save_jpg(post(1080, 1920, book, lock, author), PRESS / "post-9x16-1080x1920.jpg")

    print("\nDone. Next:  node lib/make-press-kit.mjs")


if __name__ == "__main__":
    main()
