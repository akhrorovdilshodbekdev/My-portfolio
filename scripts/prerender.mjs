/**
 * Renders every route in src/routes.ts to a static HTML file in dist/.
 *
 *   vite build                                   -> dist/index.html + /assets/*
 *   vite build --ssr src/entry-server.tsx        -> dist-ssr/entry-server.js
 *   node scripts/prerender.mjs                   -> dist/**\/index.html
 *
 * Without this, dist/index.html ships `<div id="root"></div>` and crawlers get
 * an empty page. Every head patch below throws on a failed match so a renamed
 * or reordered tag fails the build instead of silently shipping a wrong title.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

process.env.NODE_ENV = 'production';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const entryUrl = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href;
const { ROUTES, renderRoute } = await import(entryUrl);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Replace-or-throw: a silent no-op here means a wrong <title> in production.
 *
 * The guard tests that the pattern MATCHES, not that the text changed — for the
 * homepage the existing tags already hold the right values, so a
 * "did the output change?" check would fail the build on a correct no-op.
 */
function patch(html, re, repl, label) {
  if (!re.test(html)) throw new Error(`[prerender] head patch did not match: ${label}`);
  return html.replace(re, repl);
}

const shell = await readFile(path.join(dist, 'index.html'), 'utf8');

if (!shell.includes('<div id="root"></div>')) {
  throw new Error('[prerender] could not find <div id="root"></div> in dist/index.html');
}

const results = [];

for (const route of ROUTES) {
  const canonical = `https://akhrorov.com${route.path}`;
  let html = shell;

  html = patch(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`, `title (${route.path})`);
  html = patch(
    html,
    /(<meta name="description" content=")[^"]*(")/,
    `$1${esc(route.description)}$2`,
    `description (${route.path})`,
  );
  html = patch(
    html,
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${canonical}$2`,
    `canonical (${route.path})`,
  );
  html = patch(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`, `og:url (${route.path})`);
  html = patch(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`, `og:title (${route.path})`);
  html = patch(
    html,
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${esc(route.description)}$2`,
    `og:description (${route.path})`,
  );
  html = patch(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`, `twitter:title (${route.path})`);
  html = patch(
    html,
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${esc(route.description)}$2`,
    `twitter:description (${route.path})`,
  );

  const body = renderRoute(route.path);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (!html.includes('<div id="root"><')) {
    throw new Error(`[prerender] failed to inject body for ${route.path}`);
  }

  const outFile = route.path === '/' ? 'index.html' : path.join(route.path.slice(1), 'index.html');
  const outPath = path.join(dist, outFile);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');

  const textLength = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
  results.push({ path: route.path, outFile, bytes: html.length, textChars: textLength });
}

// A page whose visible text is missing means the animation fix regressed and
// the markup shipped hidden — fail loudly rather than deploy it.
const thin = results.filter((r) => r.textChars < 400);
if (thin.length) {
  throw new Error(
    `[prerender] suspiciously little rendered text: ${thin.map((r) => `${r.path} (${r.textChars} chars)`).join(', ')}`,
  );
}

console.log('[prerender] wrote:');
for (const r of results) {
  console.log(`  ${r.path.padEnd(18)} -> dist/${r.outFile.replace(/\\/g, '/')}  (${r.textChars} chars of text)`);
}
