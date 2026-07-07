import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** Auditoría axe (WCAG 2.x A/AA) sobre las páginas clave del embudo, con
 *  reducedMotion (config global): los reveals quedan en estado final, así que
 *  el contraste se mide sobre los colores reales — sin falsos positivos de
 *  media animación. */

const PAGES = [
  "/",
  "/flota/",
  "/flota/eco-cross-4-2/",
  "/precios/",
  "/venta/",
  "/aliados/",
  "/solicitar-disponibilidad/",
  "/blog/golf-cart-cap-cana-guia/",
  "/en/",
  "/en/pricing/",
];

for (const path of PAGES) {
  test(`axe sin violaciones: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const resumen = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.nodes.length} nodo(s) — ${v.nodes[0]?.target}`
    );
    expect(resumen, resumen.join("\n")).toEqual([]);
  });
}
