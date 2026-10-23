import {readFileSync, writeFileSync} from 'node:fs';
import {resolve, join} from 'node:path';
const root = resolve(import.meta.dirname,'..');
const content = JSON.parse(readFileSync(join(root,'src/app/data/portfolio.json'),'utf8').replace(/^\uFEFF/,''));
const profile = content.profile;
// Derived build artifact: factual content is edited only in portfolio.json.
writeFileSync(join(root,'src/app/data/profile.generated.ts'),'// Generado por tools/sync-site.mjs. No editar.\nexport const profile = '+JSON.stringify(profile,null,2)+';\n');
const escape = text => String(text).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const base = profile.portfolio.replace(/\/$/,'');
const title = escape(profile.name + ' · ' + profile.role);
const description = escape(profile.summary);
let index = readFileSync(join(root,'src/index.html'),'utf8').replace(/^\uFEFF/,'');
index = index.replace(/<title>.*?<\/title>/,'<title>'+title+'</title>')
  .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+description+'">')
  .replace(/<meta property="og:title" content="[^"]*">/,'<meta property="og:title" content="'+title+'">')
  .replace(/<meta property="og:description" content="[^"]*">/,'<meta property="og:description" content="'+description+'">')
  .replace(/<meta property="og:url" content="[^"]*">/,'<meta property="og:url" content="'+escape(base)+'/">')
  .replace(/<meta property="og:image" content="[^"]*">/,'<meta property="og:image" content="'+escape(base)+'/assets/social-preview.png">')
  .replace(/<link rel="canonical" href="[^"]*">/,'<link rel="canonical" href="'+escape(base)+'/">');
writeFileSync(join(root,'src/index.html'),index);
const locations = [base+'/',...content.projects.map(p=>base+'/proyectos/'+p.id)];
writeFileSync(join(root,'src/sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+locations.map(url=>'  <url><loc>'+escape(url)+'</loc></url>').join('\n')+'\n</urlset>\n');
writeFileSync(join(root,'src/robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n');
console.log('Metadatos y sitemap sincronizados con portfolio.json.');
