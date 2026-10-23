"""Build publication copies from private originals in ignored tmp/certificates.

Requires Pillow, pdfplumber, reportlab, pypdf, and Poppler on PATH.
Originals are never copied to public assets. PDFs are rasterized, sensitive
tokens erased, and reconstructed without the original text/object streams.
Dates and issuers are read from the verified portfolio content source.
"""
from pathlib import Path
import argparse
import hashlib
import json
import re
import subprocess

import pdfplumber
from PIL import Image, ImageDraw, ImageFont, ImageOps
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'tmp/certificates'
DEST = ROOT / 'src/assets/certificates'
RENDER = SOURCE / 'rendered-public'

CONTENT = json.loads((ROOT / 'src/app/data/portfolio.json').read_text(encoding='utf-8-sig'))
ITEMS = [(item['sourceFile'], Path(item['asset']).stem, item['title'],
          item['issuer'], item['issuedAt'], item.get('hours'))
         for item in CONTENT['education'] if item.get('verified') and item.get('asset')]


def add_publication_footer(image, redacted):
    image = ImageOps.contain(image, (1800, 1800), Image.Resampling.LANCZOS)
    footer_height = max(45, int(image.width * .028))
    output = Image.new('RGB', (image.width, image.height + footer_height), '#f1f4f7')
    output.paste(image, (0, 0))
    font_path = Path('C:/Windows/Fonts/arial.ttf')
    font = ImageFont.truetype(str(font_path), max(12, int(image.width * .010))) if font_path.exists() else ImageFont.load_default()
    label = 'Copia para publicación · DNI y/o códigos personales omitidos' if redacted else 'Copia para publicación'
    ImageDraw.Draw(output).text((image.width // 2, image.height + footer_height // 2), label, fill='#465264', font=font, anchor='mm')
    return output


def pdf_pages(source, slug):
    prefix = RENDER / slug
    subprocess.run(['pdftoppm', '-scale-to', '1800', '-png', str(source), str(prefix)], check=True, capture_output=True)
    output = []
    with pdfplumber.open(source) as document:
        for index, page in enumerate(document.pages):
            image_path = RENDER / f'{slug}-{index + 1}.png'
            image = Image.open(image_path).convert('RGB')
            draw = ImageDraw.Draw(image)
            factor_x, factor_y = image.width / page.width, image.height / page.height
            for word in page.extract_words():
                if re.search(r'DNI|\b\d{1,3}(?:\.\d{3}){2}\b|\b\d{7,8}\b|CER-', word['text']):
                    draw.rectangle((round((word['x0'] - 1) * factor_x), round((word['top'] - 1) * factor_y), round((word['x1'] + 1) * factor_x), round((word['bottom'] + 1) * factor_y)), fill='white')
            # UTN validation text leads to original copies containing personal ID.
            # Keep signatures and institutional attribution outside this block.
            if source.name in {'Angular.pdf', 'FullStack.pdf', 'NodeJs.pdf', 'React.pdf'}:
                draw.rectangle((round(140 * factor_x), round(427 * factor_y), round(355 * factor_x), round(497 * factor_y)), fill='white')
            if slug.startswith('platzi-'):
                # Verified image-only Platzi template: the personal code line.
                # Preserve course, learner, date, hours, public profile and signatures.
                draw.rectangle((round(image.width * .30), round(image.height * .895), round(image.width * .70), round(image.height * .917)), fill='white')
            output.append(add_publication_footer(image, True))
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--issuer', help='Prepare only one issuer from the canonical records')
    args = parser.parse_args()
    DEST.mkdir(parents=True, exist_ok=True)
    RENDER.mkdir(parents=True, exist_ok=True)
    records = []
    for filename, slug, title, issuer, date, hours in ITEMS:
        if args.issuer and issuer != args.issuer:
            continue
        source = SOURCE / filename
        if not source.is_file():
            raise FileNotFoundError(source)
        is_pdf = source.suffix.lower() == '.pdf'
        if is_pdf:
            images = pdf_pages(source, slug)
            public = DEST / f'{slug}.pdf'
            document = canvas.Canvas(str(public), pageCompression=1)
            document.setTitle(title + ' - copia para publicación')
            document.setAuthor(CONTENT['profile']['name'])
            for image in images:
                width, height = image.size
                document.setPageSize((width / 2, height / 2))
                document.drawImage(ImageReader(image), 0, 0, width=width / 2, height=height / 2)
                document.showPage()
            document.save()
            # No original document text, metadata, form field, attachment or ID can survive.
            check = PdfReader(public)
            assert not any((page.extract_text() or '').strip() for page in check.pages)
            assert '/EmbeddedFiles' not in str(check.trailer['/Root'])
        else:
            image = Image.open(source).convert('RGB')
            redacted = issuer == 'EDteam'
            if redacted:
                # Verified fixed template: UUID line below course URL.
                ImageDraw.Draw(image).rectangle((390, 1980, 1900, 2080), fill='white')
            images = [add_publication_footer(image, redacted)]
            public = DEST / f'{slug}.jpg'
            images[0].save(public, quality=92, optimize=True)
        preview = DEST / f'{slug}-preview.webp'
        ImageOps.contain(images[0], (780, 580), Image.Resampling.LANCZOS).save(preview, quality=84, method=6)
        records.append({
            'id': slug, 'title': title, 'issuer': issuer, 'year': int(date[:4]),
            'issuedAt': date, 'hours': hours,
            'asset': 'assets/certificates/' + public.name,
            'preview': 'assets/certificates/' + preview.name,
            'sourceFile': 'tmp/certificates/' + filename,
            'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
            'verified': True, 'verification': 'Original document visual review; text extraction when available',
            'publicationCopy': True,
            'redactions': (['personal verification code'] if issuer == 'Platzi' else ['DNI', 'personal verification codes'] if slug.startswith('utn-') else ['DNI']) if is_pdf else (['personal verification code'] if issuer == 'EDteam' else []),
            'pages': len(images),
        })
    manifest = {'source': 'src/app/data/portfolio.json', 'publicAssetsPrepared': True, 'items': records}
    manifest_name = 'manifest-' + args.issuer.lower() + '.json' if args.issuer else 'manifest.json'
    (SOURCE / manifest_name).write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'Prepared {len(records)} verified certificates in {DEST}')


if __name__ == '__main__':
    main()
