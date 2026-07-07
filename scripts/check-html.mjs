/** Validador del build final (F9) — corre sobre out/**.html tras el postbuild.
 *  Guardas de arquitectura y de enlaces que ningún test unitario puede dar:
 *   1. Exactamente un <h1> por página (SEO/a11y).
 *   2. Cero __next_f (el strip de hidratación siguió funcionando).
 *   3. Todo enlace interno <a href="/..."> apunta a una página que EXISTE en
 *      out/ (caza enlaces rotos en build, antes del deploy).
 *   4. hreflang recíproco: cada alternate apunta a una página existente.
 *   5. Canonical presente en toda página indexable.
 *  Sale con código 1 y lista los fallos si algo no cumple. */
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";
const SITE = "https://boltgolfcars.com";

async function walk(dir) {
  const files = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

const all = await walk(OUT);
const htmlFiles = all.filter((f) => f.endsWith(".html"));
// Set de rutas servibles: "/x/" si existe out/x/index.html; también ficheros
// sueltos (sitemap.xml, robots.txt, imágenes) por su ruta exacta.
const servable = new Set();
for (const f of all) {
  const rel = "/" + f.slice(OUT.length + 1).replace(/\\/g, "/");
  servable.add(rel);
  if (rel.endsWith("/index.html")) servable.add(rel.slice(0, -"index.html".length));
  if (rel.endsWith(".html")) servable.add(rel.slice(0, -".html".length) + "/");
}
servable.add("/");

/** Normaliza un href interno a ruta comprobable (sin query/hash, con /). */
function normalize(href) {
  let h = href.startsWith(SITE) ? href.slice(SITE.length) : href;
  h = h.split("#")[0].split("?")[0];
  if (h === "") return "/"; // era solo un ancla
  if (!h.endsWith("/") && !/\.[a-z0-9]+$/i.test(h)) h += "/";
  return h;
}

const errors = [];
for (const f of htmlFiles) {
  const page = "/" + f.slice(OUT.length + 1).replace(/\\/g, "/");
  const html = await readFile(f, "utf8");
  // Páginas de error de Next (404.html, /404/, /_not-found/): no indexables,
  // no llevan canonical.
  const is404 = /(^|\/)(404|_not-found)(\.html|\/index\.html)$/.test(page);

  // 1. Un solo h1.
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${page}: ${h1s} <h1> (debe ser exactamente 1)`);

  // 2. Sin restos de hidratación.
  if (html.includes("__next_f")) errors.push(`${page}: contiene __next_f (falló el strip)`);

  // 3. Enlaces internos rotos (solo <a href>; externos/mailto/tel/wa se ignoran).
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:)?\/\//.test(href) && !href.startsWith(SITE)) continue;
    if (/^(mailto:|tel:|#)/.test(href)) continue;
    const path = normalize(href);
    if (!servable.has(path)) errors.push(`${page}: enlace roto → ${href}`);
  }

  // 4. hreflang apunta a páginas existentes.
  for (const m of html.matchAll(/<link rel="alternate" hrefLang="[^"]+" href="([^"]+)"/g)) {
    const path = normalize(m[1]);
    if (!servable.has(path)) errors.push(`${page}: hreflang roto → ${m[1]}`);
  }

  // 5. Canonical presente (excepto 404).
  if (!is404 && !html.includes('rel="canonical"')) errors.push(`${page}: sin canonical`);
}

if (errors.length) {
  console.error(`✗ check-html: ${errors.length} problema(s) en ${htmlFiles.length} páginas:`);
  for (const e of errors.slice(0, 40)) console.error("  " + e);
  if (errors.length > 40) console.error(`  … y ${errors.length - 40} más`);
  process.exit(1);
}
console.log(`✓ check-html: ${htmlFiles.length} páginas — h1 único, 0 __next_f, enlaces internos y hreflang íntegros, canonicals OK`);
