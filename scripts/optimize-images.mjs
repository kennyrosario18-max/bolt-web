/** Optimización de imágenes de modelos (F5-C, ajustada en U7). Genera por foto:
 *  · AVIF responsive a 2 anchos (quality 50: −33% vs 62 sin pérdida visible en
 *    fotos — el LCP de home bajó de ~99KB a ~65KB).
 *  · JPG responsive a los mismos anchos (fallback para navegadores sin AVIF:
 *    antes descargaban el JPG original completo a resolución nativa).
 *  Se corre LOCAL (npm run optimize:images) y los resultados SE COMITEAN: así el
 *  build/CI no depende de sharp. El <ModelPhoto> usa AVIF con srcset JPG de
 *  fallback. Reejecuta al añadir/cambiar fotos. */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, basename, extname } from "node:path";

const SRC = "public/images/models";
const OUT = "public/images/models/opt";
// 640 = móvil (downscale, ~½ del JPG); 960 = desktop (upscale leve interim desde
// ~720px). Evitamos 1280 porque interpola sin detalle real y pesa más que el JPG.
const WIDTHS = [640, 960];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => extname(f).toLowerCase() === ".jpg");

let made = 0;
for (const file of files) {
  const id = basename(file, ".jpg");
  for (const w of WIDTHS) {
    await sharp(join(SRC, file))
      .resize({ width: w, withoutEnlargement: false }) // upscale interim permitido
      .avif({ quality: 50, effort: 5 })
      .toFile(join(OUT, `${id}-${w}.avif`));
    await sharp(join(SRC, file))
      .resize({ width: w, withoutEnlargement: false })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(join(OUT, `${id}-${w}.jpg`));
    made += 2;
  }
}
console.log(`✓ optimize-images: ${made} variantes (AVIF+JPG) desde ${files.length} fotos → ${OUT}`);
