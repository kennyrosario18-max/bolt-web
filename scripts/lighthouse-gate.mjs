/** Gate de Lighthouse en CI (F9) — mide el build final (out/) servido en local
 *  con emulación MÓVIL (la vara dura) y falla si baja de los umbrales.
 *  Umbrales con margen anti-ruido de runner: la regla del proyecto es ≥90 en
 *  producción; aquí Perf ≥85 (los runners varían ±5) y el resto ≥90.
 *  Nota A11y: el scroll-reveal puede dar falsos positivos de contraste si el
 *  escáner captura media animación (medido: 95-96); por eso 90 y no 100 —
 *  la verificación AA real la hace axe en tests/e2e/a11y.spec.ts. */
import { spawn, execSync } from "node:child_process";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PORT = 4174;
const PAGES = ["/", "/flota/", "/precios/"];
const THRESHOLDS = { performance: 85, accessibility: 90, "best-practices": 90, seo: 90 };

const server = spawn("python3", ["-m", "http.server", String(PORT), "--directory", "out"], {
  stdio: "ignore",
});
await new Promise((r) => setTimeout(r, 1500));

const tmp = await mkdtemp(join(tmpdir(), "lh-"));
let failed = false;
try {
  for (const p of PAGES) {
    const out = join(tmp, p.replace(/\//g, "_") + ".json");
    execSync(
      `npx lighthouse http://127.0.0.1:${PORT}${p} --quiet --chrome-flags="--headless=new --no-sandbox" ` +
        `--output=json --output-path=${out} --only-categories=performance,accessibility,best-practices,seo`,
      { stdio: ["ignore", "ignore", "inherit"] }
    );
    const r = JSON.parse(await readFile(out, "utf8"));
    const line = [];
    for (const [cat, min] of Object.entries(THRESHOLDS)) {
      const score = Math.round((r.categories[cat].score ?? 0) * 100);
      const ok = score >= min;
      if (!ok) failed = true;
      line.push(`${cat}=${score}${ok ? "" : `✗(min ${min})`}`);
    }
    console.log(`${failed ? "✗" : "✓"} lighthouse ${p} → ${line.join(" · ")}`);
  }
} finally {
  server.kill();
  await rm(tmp, { recursive: true, force: true });
}

if (failed) {
  console.error("✗ lighthouse-gate: alguna categoría bajó del umbral");
  process.exit(1);
}
console.log("✓ lighthouse-gate: todas las páginas sobre el umbral");
