#!/usr/bin/env node
/* Verifica que el build local (out/) no cambió el contenido visible, el SEO ni
 * el JSON-LD respecto a producción (boltgolfcars.com). Ignora los scripts de
 * Next (chunks con hash no determinista). Uso: node scripts/verify-vs-prod.mjs */
import { readFileSync } from "node:fs";
const PAGES = ["", "flota/eco-cross-4-2/", "alquiler/cap-cana/", "precios/", "servicios/",
  "contacto/", "nosotros/", "en/", "en/fleet/eco-cross-4-2/", "blog/golf-cart-4-o-6-plazas/"];
const norm = (h) => {
  const ld = [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>m[1]).sort();
  let x = h.replace(/<!-- -->/g, "").replace(/<script(?! type="application\/ld\+json")[\s\S]*?<\/script>/g, "")
           .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
           .replace(/\/_next\/static\/[^"']+/g, "/_next/ASSET")
           .replace(/-[a-z0-9]{8,}\.(js|css|woff2|p)/g, ".$1");
  return { html: x.trim(), ld };
};
let ok = true;
for (const u of PAGES) {
  const prod = norm(await (await fetch(`https://boltgolfcars.com/${u}`)).text());
  const local = norm(readFileSync(`out/${u === "" ? "index.html" : u + "index.html"}`, "utf8"));
  const diff = prod.html !== local.html ? "CONTENIDO" : JSON.stringify(prod.ld) !== JSON.stringify(local.ld) ? "JSON-LD" : null;
  console.log(`${diff ? "✗" : "✓"} /${u || "(home)"}${diff ? " — " + diff : ""}`);
  if (diff) ok = false;
}
console.log(ok ? "\n✓ Sin regresión de contenido/SEO/JSON-LD vs producción" : "\n✗ REVISAR diferencias");
process.exit(ok ? 0 : 1);
