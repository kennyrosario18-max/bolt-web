import { describe, expect, it } from "vitest";
import { counterpartPath, hreflang, SEGMENT_ES_TO_EN } from "@/lib/i18n";

/** counterpartPath es el corazón del switcher de idioma (y su espejo vanilla
 *  vive en header-enhance.tsx). Estas guardas cubren los casos que ya se
 *  rompieron alguna vez o que tienen lógica especial (blog por slug). */
describe("i18n — counterpartPath", () => {
  it("homes", () => {
    expect(counterpartPath("/")).toBe("/en");
    expect(counterpartPath("/en")).toBe("/");
  });

  it("segmentos simples y con hijos (modelo/zona: ids idénticos)", () => {
    expect(counterpartPath("/precios/")).toBe("/en/pricing/");
    expect(counterpartPath("/en/pricing/")).toBe("/precios/");
    expect(counterpartPath("/flota/eco-cross-4-2/")).toBe("/en/fleet/eco-cross-4-2/");
    expect(counterpartPath("/en/rentals/cap-cana/")).toBe("/alquiler/cap-cana/");
  });

  it("blog: traduce también el slug (difiere por idioma)", () => {
    expect(counterpartPath("/blog/")).toBe("/en/blog/");
    expect(counterpartPath("/blog/golf-cart-cap-cana-guia/")).toBe(
      "/en/blog/golf-cart-cap-cana-guide/"
    );
    expect(counterpartPath("/en/blog/lead-acid-or-lithium-golf-cart/")).toBe(
      "/blog/bateria-plomo-o-litio-golf-cart/"
    );
  });

  it("segmento sin traducción → home del otro idioma (respaldo)", () => {
    expect(counterpartPath("/no-existe/")).toBe("/en/");
    expect(counterpartPath("/en/does-not-exist/")).toBe("/");
  });

  it("el mapa de segmentos es biyectivo (ningún EN duplicado)", () => {
    const ens = Object.values(SEGMENT_ES_TO_EN);
    expect(new Set(ens).size).toBe(ens.length);
  });

  it("hreflang: x-default apunta a EN", () => {
    const h = hreflang("/precios/", "/en/pricing/");
    expect(h.languages["x-default"]).toBe("/en/pricing/");
    expect(h.languages.es).toBe("/precios/");
  });
});
