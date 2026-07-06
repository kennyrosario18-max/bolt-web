#!/usr/bin/env node
/* Gate de integridad de contenido — corre antes del build (npm prebuild).
 * Falla (exit 1) si el contenido está incompleto o si un artículo del blog
 * menciona un precio que no existe en la tabla oficial. Barato de mantener,
 * imposible de saltarse: un modelo sin traducción o un precio inventado en el
 * blog paran el deploy antes de llegar a producción. */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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
const zones = ["puntacana-resort", "cap-cana", "bavaro", "casa-de-campo", "la-romana"];
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

if (errors.length) {
  console.error("\n✗ check-content: contenido inconsistente\n" + errors.map((e) => "  · " + e).join("\n") + "\n");
  process.exit(1);
}
console.log(`✓ check-content: ${models.length} modelos, ${zones.length} zonas y precios del blog OK`);
