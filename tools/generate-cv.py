"""Generate the public CV from the portfolio's single content source.

Run with Python and reportlab installed. No personal content is duplicated here.
The original CV is deliberately preserved.
"""
from pathlib import Path
import argparse
import json
from html import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
INK = colors.HexColor("#182938")
MUTED = colors.HexColor("#52616c")
ACCENT = colors.HexColor("#087f8c")


def clean(value):
    return str(value).replace("\u2011", "-").replace("\u2013", "-").replace("\u2014", "-")


def txt(value):
    return escape(clean(value))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=ROOT / "src/app/data/portfolio.json")
    parser.add_argument("--output", type=Path, default=ROOT / "src/assets/pdf/Maximiliano-Marigno-CV.pdf")
    args = parser.parse_args()
    data = json.loads(args.source.read_text(encoding="utf-8-sig"))
    profile = data["profile"]
    name = profile.get("fullName", profile["name"])

    styles = {
        "name": ParagraphStyle("Name", fontName="Helvetica-Bold", fontSize=25, leading=29, textColor=INK, spaceAfter=5),
        "role": ParagraphStyle("Role", fontName="Helvetica-Bold", fontSize=12, leading=16, textColor=ACCENT, spaceAfter=9),
        "contact": ParagraphStyle("Contact", fontName="Helvetica", fontSize=8.2, leading=12, textColor=MUTED),
        "body": ParagraphStyle("Body", fontName="Helvetica", fontSize=10, leading=14, textColor=INK, spaceAfter=3),
        "small": ParagraphStyle("Small", fontName="Helvetica", fontSize=9, leading=12.5, textColor=MUTED, spaceAfter=3),
        "section": ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=9.4, leading=12.5, textColor=ACCENT, spaceBefore=13, spaceAfter=6),
        "entry": ParagraphStyle("Entry", fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=INK, spaceAfter=1),
        "bullet": ParagraphStyle("Bullet", fontName="Helvetica", fontSize=9.6, leading=13.5, textColor=INK, leftIndent=10, firstLineIndent=-8, spaceAfter=2),
    }
    story = []

    def p(value, style="body"):
        return Paragraph(value, styles[style])

    def section(label):
        story.append(p(label.upper(), "section"))

    def link(url, label):
        return '<a href="' + escape(url, quote=True) + '" color="#087f8c">' + txt(label) + '</a>'

    story.extend([p(txt(name), "name"), p(txt(profile["role"]), "role")])
    contact = [txt(profile["location"]), link("mailto:" + profile["email"], profile["email"])]
    if profile.get("phone"):
        contact.append(txt(profile["phone"]))
    story.append(p(" &nbsp; | &nbsp; ".join(contact), "contact"))
    links = []
    for key, label in [("linkedin", "LinkedIn"), ("portfolio", "Portafolio")]:
        if profile.get(key):
            url = profile[key]
            links.append(link(url, url.replace("https://", "").replace("www.", "").rstrip("/")))
    if links:
        story.append(p(" &nbsp; | &nbsp; ".join(links), "contact"))
    story.append(Spacer(1, 13))
    story.append(p(txt(profile["summary"])))

    section("Experiencia")
    for experience in data["experience"]:
        block = [p(txt(experience["role"]), "entry")]
        meta = [experience.get("company"), experience.get("period")]
        block.append(p(" | ".join(txt(x) for x in meta if x), "small"))
        for highlight in experience.get("highlights", []):
            block.append(p("- " + txt(highlight), "bullet"))
        block.append(Spacer(1, 4))
        story.append(KeepTogether(block))

    section("Proyectos seleccionados")
    for project in (project for project in data["projects"] if project.get("featured")):
        title = txt(project["name"])
        if project.get("url"):
            title += " &nbsp; " + link(project["url"], project["url"].replace("https://", "").rstrip("/"))
        block = [p(title, "entry"), p(txt(project.get("description", project["summary"])), "body")]
        if project.get("technologies"):
            block.append(p(txt(" · ".join(project["technologies"])), "small"))
        block.append(Spacer(1, 3))
        story.append(KeepTogether(block))

    section("Formación")
    for education in (item for item in data["education"] if item.get("category") == "Carrera" and item.get("primary", True)):
        story.append(p(txt(education["title"]), "entry"))
        story.append(p(" | ".join(txt(x) for x in [education["issuer"], education.get("year")] if x), "small"))
    courses = [item for item in data["education"] if item.get("cvFeatured")]
    if courses:
        story.append(p("<b>Formación complementaria:</b> " + "; ".join(txt(item["title"] + " (" + item["issuer"] + ", " + item["year"] + ")") for item in courses) + ".", "small"))

    section("Tecnologías y prácticas")
    for group in data["skills"]:
        story.append(p("<b>" + txt(group["label"]) + ":</b> " + txt(", ".join(group["items"])), "body"))

    def page_decoration(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(ACCENT)
        canvas.rect(43, A4[1] - 28, 42, 3, fill=1, stroke=0)
        canvas.setStrokeColor(colors.HexColor("#d9e4e7"))
        canvas.line(43, 35, A4[0] - 43, 35)
        canvas.restoreState()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(args.output), pagesize=A4, rightMargin=43, leftMargin=43,
                           topMargin=42, bottomMargin=45, title=f"{name} - CV",
                           author=name, subject="Desarrollo de software full stack")
    doc.build(story, onFirstPage=page_decoration, onLaterPages=page_decoration)
    pdf = PdfReader(str(args.output))
    if len(pdf.pages) != 1:
        raise RuntimeError(f"Expected a one-page CV; generated {len(pdf.pages)} pages. Shorten source content.")
    extracted = pdf.pages[0].extract_text()
    if clean(name) not in extracted or len(extracted) < 900:
        raise RuntimeError("The generated CV did not pass selectable text verification.")
    print(f"Generated one-page CV: {args.output}")


if __name__ == "__main__":
    main()
