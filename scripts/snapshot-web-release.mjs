import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const branch = process.argv[2];
if (!branch?.startsWith('codex/')) throw new Error('Indica una nueva rama codex/...');
const temporary = mkdtempSync(join(tmpdir(), 'finanzas-web-index-'));
const env = { ...process.env, GIT_INDEX_FILE: join(temporary, 'index') };
const git = (...args) => execFileSync('git', args, { cwd: root, env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 20 * 1024 * 1024 }).trim();
const indexPath = resolve(root, execFileSync('git', ['rev-parse', '--git-path', 'index'], { cwd: root, encoding: 'utf8' }).trim());
const digest = () => existsSync(indexPath) ? createHash('sha256').update(readFileSync(indexPath)).digest('hex') : null;
const initialIndex = digest();
const paths = [
  'src', 'public', 'netlify/functions', 'index.html', 'package.json', 'package-lock.json', 'netlify.toml',
  'scripts/check-autonomos.mjs', 'scripts/check-autonomos-guides.py', 'scripts/snapshot-web-release.mjs',
  'docs/WEB-PUBLICACION.md', ':(glob,exclude)public/mi-plan*',
];

try {
  git('check-ref-format', '--branch', branch);
  git('read-tree', 'origin/main');
  git('add', '-A', '--', ...paths);
  const changed = git('diff', '--cached', '--name-only', 'origin/main').split('\n').filter(Boolean);
  if (!changed.length) throw new Error('No hay cambios web.');
  for (const name of changed) {
    if (/^(ios|android|node_modules|dist|build|backups)\//.test(name) || /(^|\/)\.env/.test(name)) {
      throw new Error(`Ruta no permitida: ${name}`);
    }
    let body;
    try { body = git('show', `:${name}`); } catch { continue; }
    if (/sk-(?:proj-)?[A-Za-z0-9_-]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}/.test(body)) {
      throw new Error(`Posible credencial en ${name}; no se ha creado la rama.`);
    }
  }
  const tree = git('write-tree');
  const parent = git('rev-parse', 'origin/main');
  const commit = git('commit-tree', tree, '-p', parent, '-m', 'feat(web): conservar web publicada y corregir calculadora de autonomos');
  git('update-ref', '--create-reflog', `refs/heads/${branch}`, commit, '0'.repeat(40));
  if (digest() !== initialIndex) throw new Error('El indice de trabajo ha cambiado inesperadamente.');
  console.log(JSON.stringify({ branch, commit, parent, files: changed.length, changed }, null, 2));
} finally {
  rmSync(temporary, { recursive: true });
}
