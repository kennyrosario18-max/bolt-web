export type Locale = "es" | "en";

/** Mapa de segmentos ES → EN para el switcher de idioma y hreflang.
    Los ids de modelo y zona son idénticos en ambos idiomas. */
export const SEGMENT_ES_TO_EN: Record<string, string> = {
  flota: "fleet",
  precios: "pricing",
  servicios: "services",
  alquiler: "rentals",
  "solicitar-disponibilidad": "request-availability",
  nosotros: "about",
  "preguntas-frecuentes": "faq",
  soporte: "support",
  politica: "policy",
  deposito: "deposit",
  contacto: "contact",
  terminos: "terms",
  privacidad: "privacy",
};

const SEGMENT_EN_TO_ES = Object.fromEntries(
  Object.entries(SEGMENT_ES_TO_EN).map(([es, en]) => [en, es])
);

/** Devuelve la ruta equivalente en el otro idioma, o la home del otro idioma
    si la página no tiene traducción (ej. el blog, que es solo ES). */
export function counterpartPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/") return "/en";
  if (clean === "/en") return "/";

  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "en") {
    const [, first, ...rest] = parts;
    const es = SEGMENT_EN_TO_ES[first];
    if (!es) return "/";
    return "/" + [es, ...rest].join("/") + "/";
  }
  const [first, ...rest] = parts;
  const en = SEGMENT_ES_TO_EN[first];
  if (!en) return "/en/";
  return "/en/" + [en, ...rest].join("/") + "/";
}

/** URLs absolutas hreflang para metadata.alternates. */
export function hreflang(esPath: string, enPath: string) {
  return {
    languages: {
      "es": esPath,
      en: enPath,
      "x-default": esPath,
    },
  };
}
