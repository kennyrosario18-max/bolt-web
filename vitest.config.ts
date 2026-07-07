import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/** Config de Vitest (F9): solo tests unitarios de lógica pura en tests/unit.
 *  Los E2E viven en tests/e2e (Playwright) y NO deben ser recogidos aquí. */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
  },
});
