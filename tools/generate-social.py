"""Original typographic social card, generated from the same portfolio source."""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parents[1]
profile = json.loads((ROOT/'src/app/data/portfolio.json').read_text(encoding='utf-8-sig'))['profile']
def font(size, serif=False):
    return ImageFont.truetype('C:/Windows/Fonts/' + ('georgiai.ttf' if serif else 'arial.ttf'),size)
image=Image.new('RGB',(1200,630),'#121617')
draw=ImageDraw.Draw(image)
accent='#92ece4'
draw.line((58,88,1142,88),fill='#354341',width=1)
draw.text((58,37),profile['name'].upper(),font=font(17),fill='#f0f0e9')
draw.text((850,37),'SOFTWARE DEVELOPER',font=font(13),fill=accent)
draw.text((56,147),'Ideas claras.',font=font(88),fill='#f0f0e9')
draw.text((56,245),'Productos que',font=font(88),fill='#f0f0e9')
draw.text((56,337),'funcionan.',font=font(104,True),fill=accent)
draw.line((58,526,1142,526),fill='#354341',width=1)
draw.text((58,555),profile['role'],font=font(19),fill='#f0f0e9')
draw.text((900,555),profile['location'],font=font(16),fill='#a7afaf')
draw.line((1050,170,1120,100),fill=accent,width=3)
draw.line((1050,100,1120,100),fill=accent,width=3)
draw.line((1120,100,1120,170),fill=accent,width=3)
image.save(ROOT/'src/assets/social-preview.png',optimize=True)
print('Social preview created from local portfolio source.')
