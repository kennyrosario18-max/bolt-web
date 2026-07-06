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

function card({ title, subtitle, price }) {
  const tSize = title.length > 16 ? 62 : 80;
  const pillW = 56 + Math.ceil(price.length * 17.5);
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <g transform="translate(760,60) scale(3.4)" opacity="0.07"><path d="${BOLT}" fill="#ffd60a"/></g>
  <g transform="translate(80,74)">
    <g transform="scale(0.5)"><path d="${BOLT}" fill="#ffd60a"/></g>
    <text x="62" y="52" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="46" fill="#ffffff">BOLT</text>
  </g>
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
