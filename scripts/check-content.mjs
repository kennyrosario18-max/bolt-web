#!/usr/bin/env node
/* Gate de integridad de contenido — corre antes del build (npm prebuild).
 * Falla (exit 1) si el contenido está incompleto o si un artículo del blog
 * menciona un precio que no existe en la tabla oficial. Barato de mantener,
 * imposible de saltarse: un modelo sin traducción o un precio inventado en el
 * blog paran el deploy antes de llegar a producción. */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const errors = [];

// 1) Cada modelo del catálogo tiene traducción EN e imagen en public/.
const models = JSON.parse(read("src/content/models.json"));
const modelsTs = read("src/content/models.ts");
const descEnKeys = new Set([...modelsTs.matchAll(/"([\w-]+)":\s*"/g)].map((m) => m[1]));
for (const m of models) {
  if (!descEnKeys.has(m.id)) errors.push(`Modelo "${m.id}" sin entrada en DESC_EN (models.ts)`);
  if (!existsSync(join(ROOT, `public/images/models/${m.id}.jpg`)))
    errors.push(`Modelo "${m.id}" sin imagen public/images/models/${m.id}.jpg`);
}

// 2) Cada zona tiene meta EN en zones-landing.ts (fuente única, no dict paralelo).
const zones = ["puntacana-resort", "cap-cana", "bavaro", "casa-de-campo"];
const zonesTs = read("src/content/zones-landing.ts");
const metaEnCount = (zonesTs.match(/metaTitleEn:/g) || []).length;
if (metaEnCount < zones.length)
  errors.push(`Solo ${metaEnCount}/${zones.length} zonas tienen metaTitleEn en zones-landing.ts`);

// 3) Toda TARIFA del blog (importe seguido de /día · /day · por día · per day)
//    debe existir en pricing.ts. Se ignoran cálculos en prosa (ej. "US$15 de diferencia").
const pricing = read("src/content/pricing.ts");
const validTariffs = new Set([...pricing.matchAll(/"[\w-]+":\s*(\d+)/g)].map((m) => `US$${m[1]}`));
const blog = read("src/content/blog.ts");
const tariffs = new Set(
  [...blog.matchAll(/US\$(\d+)(?:\/día|\/day| por día| per day)/g)].map((m) => `US$${m[1]}`)
);
for (const t of tariffs)
  if (!validTariffs.has(t))
    errors.push(`Blog cita la tarifa "${t}/día" que no existe en pricing.ts (¿desactualizada?)`);

// 4) Frases retiradas del sitio público (16/oct/2026) que no deben volver: promesas que ya no
//    existen o que chocan con la política vigente. `allow` = archivos donde la frase sí es correcta.
const BANNED = [
  { re: /semanal(es)? (y|o) mensual(es)?|semanal con descuento|discounted weekly|weekly (and|&|or) monthly rate/i,
    why: "no hay tarifa semanal/mensual con descuento (rentas de un mes o más: cotización por WhatsApp)" },
  { re: /gratis (desde|en reservas de) 2\+? días|free (from|on) 2\+? ?day/i,
    why: "transporte gratis desde 2 días no es condición pública" },
  { re: /donde estés|wherever you are/i, why: "'Entrega donde estés' se retiró (sugería gratis)", allow: ["src/views/sale.tsx"] },
  { re: /US\$40 \+ (ITBIS|tax)/i, why: "US$40 + ITBIS solo existe como cambio de reserva de aliados",
    allow: ["src/views/partners.tsx", "src/views/partner-policy.tsx", "src/app/(es)/anexo-aliados/page.tsx", "src/app/en/partner-change-policy/page.tsx"] },
  { re: /La Romana/, why: "La Romana ya no es zona (solo Casa de Campo)" },
  { re: /reembolsos? por antelación|notice-based refunds?/i, why: "la cancelación es por crédito, no reembolso" },
  { re: /un solo día, escríbenos|single day, message us/i, why: "no se renta por un solo día a clientes nuevos" },
];
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|json)$/.test(n) ? [p] : [];
  });
for (const file of walk(join(ROOT, "src"))) {
  const rel = relative(ROOT, file);
  const text = readFileSync(file, "utf8");
  for (const b of BANNED) {
    if (b.allow?.includes(rel)) continue;
    const m = text.match(b.re);
    if (m) errors.push(`${rel}: frase retirada "${m[0]}" — ${b.why}`);
  }
}

if (errors.length) {
  console.error("\n✗ check-content: contenido inconsistente\n" + errors.map((e) => "  · " + e).join("\n") + "\n");
  process.exit(1);
}
console.log(`✓ check-content: ${models.length} modelos, ${zones.length} zonas, precios del blog y frases retiradas OK`);
