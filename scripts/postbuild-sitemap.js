import { promises as fs } from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const BASE_URL = 'https://finanzasmuyfacil.com';

/** HTML que redirigen 301 a URL canónica (no listar en sitemap) */
const SKIP_SITEMAP_HTML = new Set([
  'calcular-salario-neto-2025.html',
  'salario-neto-espana-2025.html',
  'salario-bruto-espana.html',
  '30000-brutos-a-netos.html',
  'calculadora-sueldo-neto-autonomos.html',
]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

function toUrlPath(relPath) {
  // Normalizar a URL con /
  return relPath.split(path.sep).join('/');
}

function escapeXml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function guessPriority(urlPath) {
  if (urlPath === '/') return 1.0;
  if (urlPath === '/calculadoras.html') return 0.95;
  if (urlPath.includes('/blog/')) return 0.8;
  if (urlPath.includes('calculadora') || urlPath.includes('tabla') || urlPath.includes('modelo-130')) return 0.9;
  if (urlPath.includes('privacidad') || urlPath.includes('terminos') || urlPath.includes('contacto') || urlPath.includes('acerca-de'))
    return 0.6;
  return 0.7;
}

function guessChangefreq(urlPath) {
  if (urlPath === '/') return 'daily';
  if (urlPath.includes('/blog/')) return 'monthly';
  return 'weekly';
}

async function main() {
  try {
    await fs.access(DIST_DIR);
  } catch {
    console.log('[postbuild-sitemap] dist/ no existe, saltando');
    return;
  }

  const allFiles = await walk(DIST_DIR);
  const htmlFiles = allFiles.filter((f) => f.toLowerCase().endsWith('.html'));

  const urls = [];

  for (const file of htmlFiles) {
    const rel = path.relative(DIST_DIR, file);
    const relUrl = toUrlPath(rel);

    // Excluir 404.html (no debe estar en el sitemap)
    if (relUrl.toLowerCase().includes('404')) continue;

    const baseName = path.basename(relUrl);
    if (SKIP_SITEMAP_HTML.has(baseName.toLowerCase())) continue;

    // Mapear index.html en raíz a /
    let urlPath = relUrl === 'index.html' ? '/' : `/${relUrl}`;
    // URLs limpias: /blog/slug/index.html -> /blog/slug/
    if (urlPath.endsWith('/index.html')) {
      urlPath = urlPath.replace(/\/index\.html$/, '/');
    }

    const stat = await fs.stat(file);
    const lastmod = new Date(stat.mtime).toISOString().slice(0, 10);
    const priority = guessPriority(urlPath).toFixed(2);
    const changefreq = guessChangefreq(urlPath);

    urls.push({ urlPath, lastmod, changefreq, priority });
  }

  // Orden estable (home primero, luego alfabético)
  urls.sort((a, b) => {
    if (a.urlPath === '/') return -1;
    if (b.urlPath === '/') return 1;
    return a.urlPath.localeCompare(b.urlPath);
  });

  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const u of urls) {
    const loc = u.urlPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${u.urlPath}`;
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(loc)}</loc>`);
    lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
    lines.push(`    <priority>${u.priority}</priority>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  lines.push('');

  const outPath = path.join(DIST_DIR, 'sitemap.xml');
  await fs.writeFile(outPath, lines.join('\n'), 'utf8');
  console.log(`[postbuild-sitemap] Generado sitemap.xml con ${urls.length} URL(s)`);
}

main().catch((err) => {
  console.error('[postbuild-sitemap] Error:', err);
  process.exitCode = 1;
});

