/** Strip de hidratación post-build (F8, habilitado por F3: grep "use client" = 0).
 *  Ninguna página usa componentes cliente, así que el runtime de React y el
 *  payload RSC son peso muerto: la página renderiza idéntica sin ellos y nuestros
 *  shims vanilla (menú Popover, formularios, analytics) corren igual porque son
 *  <script> planos, no React. Quita SOLO lo de Next; conserva shims, JSON-LD y CSS.
 *
 *  Se ejecuta como postbuild sobre out/**.html. Determinista, sin red ni sharp. */
import { readdir, readFile, writeFile, stat, unlink } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

// Payloads RSC en .txt: sin JS de React jamás se piden, pero duplican el peso del
// deploy (~11MB de 20MB). Se borran SOLO los patrones conocidos de Next —
// robots.txt y .well-known/security.txt se conservan.
const isRscTxt = (name) => name === "index.txt" || (name.startsWith("__next") && name.endsWith(".txt"));

async function walk(dir, txts) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) out.push(...(await walk(p, txts)));
    else if (name.endsWith(".html")) out.push(p);
    else if (isRscTxt(name)) txts.push(p);
  }
  return out;
}

function strip(html) {
  return (
    html
      // 1. <script src="/_next/..."> — runtime + chunks de página
      .replace(/<script\b[^>]*\bsrc="\/_next\/[^"]*"[^>]*><\/script>/g, "")
      // 2. inline flight RSC: <script>(self.__next_f=...  y  <script>self.__next_f.push(...
      .replace(/<script>\(self\.__next_f=self\.__next_f\|\|\[\]\)\.push\([\s\S]*?<\/script>/g, "")
      .replace(/<script>self\.__next_f\.push\([\s\S]*?<\/script>/g, "")
      // 3. SOLO preloads/modulepreloads de script (no toca el CSS stylesheet ni el
      //    preload de la fuente Bricolage, que se conservan para el LCP).
      .replace(/<link\b[^>]*\bas="script"[^>]*>/g, "")
      .replace(/<link\b[^>]*\brel="modulepreload"[^>]*>/g, "")
  );
}

const txts = [];
const files = await walk(OUT, txts);
let before = 0, after = 0, nextf = 0;
for (const f of files) {
  const html = await readFile(f, "utf8");
  const out = strip(html);
  before += Buffer.byteLength(html);
  after += Buffer.byteLength(out);
  if (out.includes("__next_f")) nextf++;
  if (out !== html) await writeFile(f, out);
}
for (const t of txts) await unlink(t);
const kb = (n) => (n / 1024).toFixed(0);
console.log(
  `✓ strip-hydration: ${files.length} páginas · ${kb(before)}→${kb(after)} KB HTML ` +
    `(-${kb(before - after)} KB) · payloads RSC .txt borrados: ${txts.length} · páginas con __next_f restante: ${nextf}`
);
if (nextf > 0) { console.error("✗ quedó payload RSC en algunas páginas"); process.exit(1); }
