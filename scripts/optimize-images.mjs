/** Optimización de imágenes de modelos (F5-C). Genera AVIF responsive a 2 anchos
 *  por foto, con upscale interim para heros nítidos hasta la sesión real. Se corre
 *  LOCAL (npm run optimize:images) y los resultados SE COMITEAN: así el build/CI no
 *  depende de sharp ni de scripts de instalación. El <ModelPhoto> usa estos AVIF
 *  con el JPG original como fallback. Reejecuta al añadir/cambiar fotos. */
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
    const dst = join(OUT, `${id}-${w}.avif`);
    await sharp(join(SRC, file))
      .resize({ width: w, withoutEnlargement: false }) // upscale interim permitido
      .avif({ quality: 62, effort: 4 })
      .toFile(dst);
    made++;
  }
}
console.log(`✓ optimize-images: ${made} AVIF generados desde ${files.length} fotos → ${OUT}`);
