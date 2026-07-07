import { defineConfig } from "@playwright/test";

/** E2E (F9) sobre el BUILD REAL (out/ tras el strip de hidratación) — prueba
 *  exactamente lo que sirve producción, incluidos los shims vanilla.
 *  channel:"chrome" usa el Chrome instalado (Mac de Kenny y runners de GitHub
 *  lo traen) — sin descargar navegadores de Playwright. */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    channel: "chrome",
    // Neutraliza las animaciones (reveal/stagger/mesh): estados finales al
    // instante → sin falsos positivos de contraste en axe ni esperas.
    contextOptions: { reducedMotion: "reduce" },
  },
  webServer: {
    command: "python3 -m http.server 4173 --directory out",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
});
