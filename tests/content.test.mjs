import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {resolve, join} from 'node:path';
const root = resolve(import.meta.dirname, '..');
const content = JSON.parse(readFileSync(join(root, 'src/app/data/portfolio.json'), 'utf8').replace(/^\uFEFF/, ''));

test('R01: el perfil generado conserva la fuente única sin cargar todas las credenciales al inicio', () => {
  const generated = readFileSync(join(root, 'src/app/data/profile.generated.ts'), 'utf8');
  assert.deepEqual(JSON.parse(generated.split('export const profile = ')[1].replace(/;\s*$/, '')), content.profile);
});
test('R02/R03: selección completa sin enlaces a repositorios', () => {
  assert.equal(content.projects.length, 4);
  assert.equal(content.projects.filter(p => p.featured).length, 3);
  assert.equal(new Set(content.projects.map(p => p.id)).size, 4);
  for(const project of content.projects) {
    assert.ok(project.description && project.problem && project.contribution && project.decisions.length);
    assert.equal(new URL(project.url).protocol, 'https:');
    assert.ok(!/github\.com|gitlab\.com/i.test(project.url));
  }
  const concept = content.projects.find(p => !p.featured);
  assert.match(concept.statusNote, /simulad|sin reservas/i);
});
test('R01/R12: recursos principales presentes y locales', () => {
  for(const asset of [content.profile.cvUrl, ...content.projects.map(p => p.image), ...content.education.flatMap(e => [e.asset, e.preview]).filter(Boolean)]) {
    assert.ok(asset.startsWith('assets/'), 'Ruta local esperada: ' + asset);
    assert.ok(!asset.includes('..'));
    assert.ok(existsSync(join(root,'src',asset)), 'Falta el recurso: ' + asset);
  }
});
test('R01/R09: no hay backend ni credenciales en el código de la app', () => {
  function walk(dir) { return readdirSync(dir,{withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(join(dir,entry.name)) : [join(dir,entry.name)]); }
  const code = walk(join(root,'src/app')).filter(path => /\.(ts|html)$/.test(path) && !path.endsWith('.spec.ts')).map(path => readFileSync(path,'utf8')).join('\n');
  assert.doesNotMatch(code, /HttpClient|supabaseUrl|supabaseKey|sb_publishable_|railway\.app|rest\/v1|fetch\(/);
  assert.doesNotMatch(code, /https:\/\/github\.com\/marignomaxy\//);
  assert.ok(content.education.every(e => e.verified && e.issuer && e.asset && e.preview && /^\d{4}-\d{2}-\d{2}$/.test(e.issuedAt)), 'Cada credencial debe tener emisor, evidencia local y fecha verificada.');
});
test('R10: CV conserva el original y la fuente tiene el empleo confirmado', () => {
  assert.ok(existsSync(join(root,'src/assets/pdf/Cv-Maximiliano-Marigno.pdf')));
  assert.equal(content.experience[0].company,'Federación Patronal');
  assert.match(content.experience[0].period,/2025/);
  assert.ok(existsSync(join(root,'tools/generate-cv.py')));
});
test('R12: no se cargan fuentes o estilos externos para mostrar el sitio', () => {
  const index = readFileSync(join(root,'src/index.html'),'utf8');
  assert.doesNotMatch(index, /fonts\.googleapis|fonts\.gstatic|<script[^>]+src="https:/);
  const config = JSON.parse(readFileSync(join(root,'angular.json'),'utf8').replace(/^\uFEFF/,''));
  assert.deepEqual(config.projects.portafolio.architect.build.options.styles,['src/styles.scss']);
});
