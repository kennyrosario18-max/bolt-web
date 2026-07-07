import { describe, expect, it } from "vitest";
import { MODELS } from "@/content/models";
import {
  MAX_PRICE,
  MIN_PRICE,
  MODEL_PRICES,
  modelPrice,
  priceFromPax,
  pricedModels,
  withItbis,
} from "@/content/pricing";

/** Guardas de la fuente única de precios (confirmados por Kenny, jul/2026).
 *  Si un precio oficial cambia, se actualiza AQUÍ y en MODEL_PRICES a la vez —
 *  el test existe para que nadie cambie uno sin el otro. */
const OFFICIAL: Record<string, number> = {
  "cc-precedent-2-2": 50,
  "eco-plus-2-2": 60,
  "cc-tempo-2-2": 60,
  "eco-cross-4": 65,
  "zycar-4": 65,
  "cc-limo-4-2": 65,
  "eco-plus-4-2": 75,
  "eco-sport-4-2": 75,
  "zycar-4-2": 75,
  "eco-cross-4-2": 85,
  "eco-track-4-2": 100,
};

describe("pricing — fuente única", () => {
  it("cada modelo del catálogo tiene precio > 0", () => {
    for (const m of MODELS) {
      expect(modelPrice(m.id), `precio de ${m.id}`).toBeGreaterThan(0);
    }
  });

  it("no hay precios huérfanos (ids que no existen en el catálogo)", () => {
    const ids = new Set(MODELS.map((m) => m.id));
    for (const id of Object.keys(MODEL_PRICES)) {
      expect(ids.has(id), `MODEL_PRICES tiene id desconocido: ${id}`).toBe(true);
    }
  });

  it("los precios oficiales confirmados por Kenny no cambian silenciosamente", () => {
    expect(MODEL_PRICES).toEqual(OFFICIAL);
  });

  it("mínimos por capacidad: 4 plazas desde US$50, 6 plazas desde US$65", () => {
    expect(priceFromPax(4)).toBe(50);
    expect(priceFromPax(6)).toBe(65);
    expect(MIN_PRICE).toBe(50);
    expect(MAX_PRICE).toBe(100);
  });

  it("withItbis aplica 18% con formato US$XX.XX", () => {
    expect(withItbis(50)).toBe("US$59.00");
    expect(withItbis(85)).toBe("US$100.30");
    expect(withItbis(100)).toBe("US$118.00");
  });

  it("pricedModels(4) + pricedModels(6) cubren el catálogo completo, ordenados por precio", () => {
    const p4 = pricedModels(4);
    const p6 = pricedModels(6);
    expect(p4.length + p6.length).toBe(MODELS.length);
    for (const list of [p4, p6]) {
      const prices = list.map((m) => m.price);
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    }
  });
});
