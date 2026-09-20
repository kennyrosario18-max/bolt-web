/** OG cards de marca (F5-D) — imágenes 1200×630 con el rayo BOLT, título y precio,
 *  para que al compartir en WhatsApp/redes salga una card de marca (no un recorte).
 *  SVG → PNG con sharp. Se corre LOCAL (npm run gen:og) y los PNG SE COMITEAN: el
 *  build/CI no depende de sharp. Reejecuta al cambiar modelos/zonas/precios. */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import models from "../src/content/models.json" with { type: "json" };

const OUT = "public/og";
await mkdir(OUT, { recursive: true });

// Precio por modelo (espejo de src/content/pricing.ts — mantener sincronizado).
const MODEL_PRICES = {
  "eco-cross-4": 65, "eco-cross-4-2": 85, "eco-plus-2-2": 60, "eco-plus-4-2": 75,
  "eco-track-4-2": 100, "eco-sport-4-2": 75, "cc-limo-4-2": 65, "cc-precedent-2-2": 50,
  "cc-tempo-2-2": 60, "zycar-4": 65, "zycar-4-2": 75,
};
const modelPrice = (id) => MODEL_PRICES[id] ?? 50;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BOLT = "M58 0 L0 78 L36 78 L28 140 L100 50 L60 50 L70 0 Z";
// Wordmark TRAZADO (Bricolage Grotesque 800 en curvas), copiado de
// public/brand/bolt-logo-horizontal-dark.svg. Antes iba como <text> en Arial:
// se renderizaba distinto en cada máquina y no es la tipografía de marca.
const WORDMARK = `<g transform="translate(0.0,118) scale(0.14545,-0.14545)"><path d="M69 0V660H354Q416 660 465.5 649.5Q515 639 550.0 617.5Q585 596 603.5 562.5Q622 529 622 483Q622 444 605.5 415.0Q589 386 554.0 368.0Q519 350 461 344V327Q557 321 603.0 281.0Q649 241 649 173Q649 115 618.0 77.0Q587 39 527.0 19.5Q467 0 379 0ZM223 128H373Q434 128 463.0 145.5Q492 163 492 201Q492 243 457.0 264.0Q422 285 350 285H223ZM223 383H328Q399 383 432.0 402.5Q465 422 465 461Q465 499 434.5 516.5Q404 534 342 534H223Z" fill="#FFFFFF"/></g> <g transform="translate(96.3,118) scale(0.14545,-0.14545)"><path d="M360 -14Q288 -14 230.0 8.0Q172 30 130.5 73.0Q89 116 67.0 179.5Q45 243 45 327Q45 445 86.5 521.5Q128 598 201.0 636.0Q274 674 366 674Q437 674 495.0 652.0Q553 630 594.5 587.0Q636 544 658.5 479.5Q681 415 681 331Q681 244 657.5 179.5Q634 115 591.5 72.0Q549 29 490.0 7.5Q431 -14 360 -14ZM365 112Q414 112 447.5 136.5Q481 161 498.5 207.5Q516 254 516 321Q516 392 498.0 441.5Q480 491 445.5 516.5Q411 542 361 542Q313 542 279.5 517.5Q246 493 228.0 445.5Q210 398 210 329Q210 277 220.5 236.5Q231 196 250.0 168.5Q269 141 298.5 126.5Q328 112 365 112Z" fill="#FFFFFF"/></g> <g transform="translate(197.4,118) scale(0.14545,-0.14545)"><path d="M69 0V660H230V0ZM98 0V135H499V0Z" fill="#FFFFFF"/></g> <g transform="translate(267.1,118) scale(0.14545,-0.14545)"><path d="M208 0V660H370V0ZM16 526V660H564V526Z" fill="#FFFFFF"/></g>`;
// Lockup oficial: BOLT y DESPUÉS el rayo (Brand Guide v1.0). Caja 477x140.
const LOCKUP = `<g>${WORDMARK}<g transform="translate(375.1,0)"><path d="${BOLT}" fill="#ffd60a"/></g></g>`;

function card({ title, subtitle, price }) {
  const tSize = title.length > 16 ? 62 : 80;
  const pillW = 56 + Math.ceil(price.length * 17.5);
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <g transform="translate(760,60) scale(3.4)" opacity="0.07"><path d="${BOLT}" fill="#ffd60a"/></g>
  <g transform="translate(80,74) scale(0.5)">${LOCKUP}</g>
  <text x="80" y="336" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${tSize}" fill="#ffffff">${esc(title)}</text>
  <text x="80" y="392" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="34" fill="#a1a1aa">${esc(subtitle)}</text>
  <g transform="translate(80,438)">
    <rect width="${pillW}" height="64" rx="32" fill="#ffd60a"/>
    <text x="30" y="42" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="32" fill="#0a0a0a">${esc(price)}</text>
  </g>
  <text x="80" y="576" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="28" fill="#ffd60a">Your ride in paradise · boltgolfcars.com</text>
</svg>`;
}

const ZONES = [
  { id: "puntacana-resort", name: "Puntacana Resort & Club" },
  { id: "cap-cana", name: "Cap Cana" },
  { id: "bavaro", name: "Bávaro" },
  { id: "casa-de-campo", name: "Casa de Campo" },
  { id: "la-romana", name: "La Romana" },
];

const cards = [
  { file: "home", title: "Golf carts premium", subtitle: "Renta y venta en Punta Cana", price: "desde US$50/día" },
  { file: "venta", title: "Golf carts en venta", subtitle: "Nuevos y usados · Punta Cana", price: "Consultar precio" },
  { file: "precios", title: "Tarifas claras", subtitle: "Sin sorpresas · Punta Cana", price: "desde US$50/día" },
  { file: "flota", title: "Nuestra flota", subtitle: "11 modelos · Punta Cana", price: "desde US$50/día" },
  ...models.map((m) => ({
    file: `model-${m.id}`,
    title: m.name,
    subtitle: `${m.pax} plazas · Punta Cana`,
    price: `US$${modelPrice(m.id)}/día`,
  })),
  ...ZONES.map((z) => ({
    file: `zone-${z.id}`,
    title: z.name,
    subtitle: "Golf carts con entrega en tu villa",
    price: "Renta desde US$50/día",
  })),
];

let n = 0;
for (const c of cards) {
  const png = await sharp(Buffer.from(card(c))).png().toBuffer();
  await writeFile(`${OUT}/${c.file}.png`, png);
  n++;
}
console.log(`✓ gen-og: ${n} OG cards (1200×630) generadas → ${OUT}`);
