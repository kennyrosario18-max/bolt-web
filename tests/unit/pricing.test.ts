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
  HIGH_SEASON_PRICES,
  modelHighPrice,
} from "@/content/pricing";
import { PRICING } from "@/content/site";

/** Guardas de la fuente única de precios (confirmados por Kenny, jul/2026).
 *  Si un precio oficial cambia, se actualiza AQUÍ y en MODEL_PRICES a la vez —
 *  el test existe para que nadie cambie uno sin el otro. */
const OFFICIAL: Record<string, number> = {
  "cc-precedent-2-2": 50,
  "eco-plus-2-2": 60,
  "cc-tempo-2-2": 60,
  "eco-cross-4": 75,
  "zycar-4": 75,
  "cc-limo-4-2": 75,
  "eco-plus-4-2": 85,
  "eco-sport-4-2": 85,
  "zycar-4-2": 100,
  "eco-cross-4-2": 90,
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

  it("Zycar 4 (todos hacia adelante) cuesta lo mismo que el ECO Cross 4 (regla de Kenny, 16/oct/2026)", () => {
    expect(modelPrice("zycar-4")).toBe(modelPrice("eco-cross-4"));
  });

  it("Zycar 4+2 (6 personas, levantado) cuesta lo mismo que el ECO Track 4+2 (regla de Kenny, 16/oct/2026)", () => {
    expect(modelPrice("zycar-4-2")).toBe(modelPrice("eco-track-4-2"));
  });

  it("temporada alta: precios aprobados por Kenny (21/oct/2026), uno por modelo y siempre mayor que el regular", () => {
    expect(HIGH_SEASON_PRICES).toEqual({
      "cc-precedent-2-2": 70, "cc-tempo-2-2": 75, "eco-plus-2-2": 75, "eco-cross-4": 90, "zycar-4": 90,
      "cc-limo-4-2": 95, "eco-plus-4-2": 105, "eco-sport-4-2": 105, "eco-cross-4-2": 110, "eco-track-4-2": 125, "zycar-4-2": 125,
    });
    for (const m of MODELS) {
      expect(modelHighPrice(m.id), `temporada alta de ${m.id}`).toBeGreaterThan(modelPrice(m.id));
    }
    expect(modelHighPrice("zycar-4")).toBe(modelHighPrice("eco-cross-4"));
    expect(modelHighPrice("zycar-4-2")).toBe(modelHighPrice("eco-track-4-2"));
  });

  it("temporada alta deja margen al aliado: piso 4 plazas ≥ US$70 y 6 plazas ≥ US$90 (ver lista interna)", () => {
    for (const m of MODELS) {
      expect(modelHighPrice(m.id), m.id).toBeGreaterThanOrEqual(m.pax === 4 ? 70 : 90);
    }
  });

  it("mínimos por capacidad: 4 plazas desde US$50, 6 plazas desde US$75", () => {
    expect(priceFromPax(4)).toBe(50);
    expect(priceFromPax(6)).toBe(75);
    expect(MIN_PRICE).toBe(50);
    expect(MAX_PRICE).toBe(100);
  });

  it("el 'desde' del inicio y del formulario coincide con pricing.ts", () => {
    expect(PRICING.from4pax).toBe(priceFromPax(4));
    expect(PRICING.from6pax).toBe(priceFromPax(6));
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
