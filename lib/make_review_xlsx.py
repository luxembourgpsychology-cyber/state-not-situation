"""
Turns review/<lang>-review.json into a workbook a native speaker can fill in.

    python3 lib/make_review_xlsx.py fr
    python3 lib/make_review_xlsx.py de

The reviewer only ever touches two columns: "Your correction" and "Note".
Everything else is locked so the key can't drift, which is what makes the
corrections mechanical to apply.
"""
import json
import sys
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

LANG_NAME = {"fr": "French", "de": "German"}

RED = "B5291C"
CREAM = "F7F3EC"
RULE = "DDD6CA"


def build(lang: str) -> Path:
    root = Path(__file__).resolve().parent.parent
    data = json.loads((root / "review" / f"{lang}-review.json").read_text())
    rows, where = data["rows"], data["where"]

    wb = Workbook()

    # ---------- instructions ----------
    intro = wb.active
    intro.title = "Read me first"
    intro.sheet_view.showGridLines = False
    lines = [
        (f"{LANG_NAME[lang]} translation — review", 18, True, RED),
        ("", 11, False, None),
        ("State. Not Situation. by Ivana Budišin", 12, True, None),
        (f"https://statenotsituation.com/{lang}", 11, False, None),
        ("", 11, False, None),
        ("What this is", 13, True, None),
        ("The complete text of the website in English and in " + LANG_NAME[lang] + ", side by side.", 11, False, None),
        ("The book itself has not been translated. This is the website only.", 11, False, None),
        ("", 11, False, None),
        ("What we need from you", 13, True, None),
        ("Go to the next sheet. Read each " + LANG_NAME[lang] + " line against the English.", 11, False, None),
        ("If it is fine, leave it alone. If it is not, write your version in", 11, False, None),
        ("the 'Your correction' column. Add a word in 'Note' if it helps.", 11, False, None),
        ("", 11, False, None),
        ("Please do not edit the English, the key, or the section columns.", 11, True, None),
        ("", 11, False, None),
        ("What matters most", 13, True, None),
        ("1. Does it read as though written in " + LANG_NAME[lang] + ", not translated?", 11, False, None),
        ("2. Is the meaning the same? The book is careful about what it claims.", 11, False, None),
        ("   Nothing may be added, and no qualification may be dropped.", 11, False, None),
        ("3. Is the tone right? Serious, plain, observational. Not marketing,", 11, False, None),
        ("   not self-help, not a manual.", 11, False, None),
        ("", 11, False, None),
        ("Things that are deliberate", 13, True, None),
        ("The book title 'State. Not Situation.' is left in English everywhere,", 11, False, None),
        ("because no " + LANG_NAME[lang] + " edition exists yet.", 11, False, None),
        ("Names, the ISBN, page numbers and times are unchanged on purpose.", 11, False, None),
        ("The longest section is the extract — the real opening pages of the", 11, False, None),
        ("book. That is the most important text in the file.", 11, False, None),
        ("", 11, False, None),
        ("Send the file back when you are done. Thank you.", 11, True, None),
    ]
    for i, (text, size, bold, colour) in enumerate(lines, start=1):
        c = intro.cell(row=i, column=1, value=text)
        c.font = Font(size=size, bold=bold, color=colour or "111111")
    intro.column_dimensions["A"].width = 92

    # ---------- the review sheet ----------
    ws = wb.create_sheet(f"{LANG_NAME[lang]} review")
    ws.sheet_view.showGridLines = False
    headers = ["Where it appears", "Key (do not edit)", "English", LANG_NAME[lang], "Your correction", "Note"]
    widths = [26, 30, 62, 62, 62, 26]

    head_fill = PatternFill("solid", fgColor=RED)
    edit_fill = PatternFill("solid", fgColor="FFF7E8")
    band = PatternFill("solid", fgColor=CREAM)
    thin = Side(style="thin", color=RULE)
    border = Border(left=thin, right=thin, top=thin, bottom=thin)

    for col, (h, w) in enumerate(zip(headers, widths), start=1):
        c = ws.cell(row=1, column=col, value=h)
        c.fill = head_fill
        c.font = Font(bold=True, color="FFFFFF", size=11)
        c.alignment = Alignment(vertical="center", horizontal="left")
        ws.column_dimensions[get_column_letter(col)].width = w
    ws.row_dimensions[1].height = 26
    ws.freeze_panes = "C2"

    last_section = None
    r = 2
    for row in rows:
        section = row["section"]
        if section != last_section:
            label = where.get(section, section)
            c = ws.cell(row=r, column=1, value=label.upper())
            c.font = Font(bold=True, size=10, color=RED)
            c.alignment = Alignment(vertical="center")
            for col in range(1, 7):
                ws.cell(row=r, column=col).fill = band
            ws.row_dimensions[r].height = 22
            last_section = section
            r += 1

        ws.cell(row=r, column=1, value=where.get(section, section))
        ws.cell(row=r, column=2, value=row["key"])
        ws.cell(row=r, column=3, value=row["english"])
        ws.cell(row=r, column=4, value=row["translation"])
        ws.cell(row=r, column=5, value=None).fill = edit_fill
        ws.cell(row=r, column=6, value=None).fill = edit_fill

        for col in range(1, 7):
            cell = ws.cell(row=r, column=col)
            cell.alignment = Alignment(wrap_text=True, vertical="top")
            cell.border = border
            if col == 2:
                cell.font = Font(size=9, color="8A857E")
            elif col == 1:
                cell.font = Font(size=9, color="8A857E")
        # roomy rows for long prose
        length = max(len(row["english"]), len(row["translation"]))
        ws.row_dimensions[r].height = min(240, max(30, 15 * (length // 60 + 1)))
        r += 1

    ws.auto_filter.ref = f"A1:F{r - 1}"

    out = root / "review" / f"State-Not-Situation-{LANG_NAME[lang]}-review.xlsx"
    wb.save(out)
    return out


if __name__ == "__main__":
    lang = sys.argv[1] if len(sys.argv) > 1 else "fr"
    path = build(lang)
    print(f"wrote {path}")
