#!/usr/bin/env python3
"""
The free sample: the book's opening exactly as it is printed.

    python3 lib/make_opening_pdf.py

Front cover, title page (iii), copyright page (iv), then printed pages 1 to 16:
the pilot, the first misreading, the map, You Know the Day, Before We Begin,
the three ways to read a moment, how to read the cases, all of Chapter Zero,
and its A NAME FOR IT entry. It ends on one page of our own that says what
comes next and when.

Pages are copied from the interior PDF, not re-set, so the sample cannot drift
from the book. Amazon's Look Inside shows these same pages from publication
day, so nothing here is given away that will not be public anyway.

Writes public/press/State-Not-Situation-first-16-pages.pdf.
"""
from pathlib import Path
import sys
import pymupdf

ROOT = Path(__file__).resolve().parent.parent
INTERIOR = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
    "/Users/ivanalarussonbudisin/Desktop/STATE NOT SITUATION - v46 PROOF CORRECTIONS"
    "/v48 - towards final/State Not Situation 6x9 v50.pdf")
COVER = ROOT / "public/images/cover-front.jpg"
OUT = ROOT / "public/press/State-Not-Situation-first-16-pages.pdf"
FONTS = Path("/Users/ivanalarussonbudisin/Desktop/State-Not-Situation-book-publicity/KINDLE/src/fonts")

ROMAN = {"iii": 3, "iv": 4}          # PDF page numbers, 1-based
FIRST_ARABIC_PDF = 11                # printed page 1
LAST_PRINTED = 16

RED = (181 / 255, 41 / 255, 28 / 255)
INK = (17 / 255, 17 / 255, 17 / 255)
QUIET = (111 / 255, 106 / 255, 98 / 255)


def main():
    src = pymupdf.open(INTERIOR)
    W, H = src[0].rect.width, src[0].rect.height  # 6 × 9 in
    out = pymupdf.open()

    # 1. The front cover, full page.
    page = out.new_page(width=W, height=H)
    page.insert_image(page.rect, filename=str(COVER))

    # 2. Title page and copyright page.
    for label in ("iii", "iv"):
        n = ROMAN[label] - 1
        out.insert_pdf(src, from_page=n, to_page=n)

    # 3. Printed pages 1 to 16.
    a = FIRST_ARABIC_PDF - 1
    out.insert_pdf(src, from_page=a, to_page=a + LAST_PRINTED - 1)

    # 4. One closing page: what follows, and when.
    end = out.new_page(width=W, height=H)
    end.insert_font(fontname="bebas", fontfile=str(FONTS / "BebasNeue-Regular.ttf"))
    end.insert_font(fontname="mono", fontfile=str(FONTS / "PlexMono-Regular.ttf"))
    end.insert_font(fontname="sans", fontfile=str(FONTS / "SourceSans3-Regular.ttf"))

    def centred(y, text, font, size, colour, spacing=0.0):
        width = pymupdf.get_text_length(text, fontname="helv", fontsize=size)  # fallback
        try:
            f = pymupdf.Font(fontfile=str(FONTS / {
                "bebas": "BebasNeue-Regular.ttf", "mono": "PlexMono-Regular.ttf",
                "sans": "SourceSans3-Regular.ttf"}[font]))
            width = f.text_length(text, fontsize=size) + spacing * (len(text) - 1)
        except Exception:
            pass
        x = (W - width) / 2
        if spacing:
            for ch in text:
                end.insert_text((x, y), ch, fontname=font, fontsize=size, color=colour)
                x += pymupdf.Font(fontfile=str(FONTS / ("PlexMono-Regular.ttf" if font == "mono" else "SourceSans3-Regular.ttf"))).text_length(ch, fontsize=size) + spacing
        else:
            end.insert_text((x, y), text, fontname=font, fontsize=size, color=colour)

    centred(H * 0.36, "CHAPTER 01 FOLLOWS", "mono", 8, RED, spacing=1.6)
    centred(H * 0.36 + 30, "The Radar Was Right", "sans", 17, INK)
    centred(H * 0.52, "STATE", "bebas", 64, RED)
    centred(H * 0.52 + 30, "NOT SITUATION", "bebas", 26, INK)
    centred(H * 0.70, "PUBLISHING 15 OCTOBER 2026", "mono", 8, QUIET, spacing=1.6)
    centred(H * 0.70 + 20, "statenotsituation.com", "sans", 11, RED)

    out.set_metadata({
        "title": "State. Not Situation. — the first 16 pages",
        "author": "Ivana Budišin",
        "subject": "Why your body decides what a moment means before you do",
        "creator": "statenotsituation.com",
    })
    out.save(OUT, garbage=4, deflate=True)
    print(f"wrote {OUT.relative_to(ROOT)}  {out.page_count} pages  {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
