import { BLOG_SLUG_PAIRS } from "@/content/blog";

export type Locale = "es" | "en";

/** Mapa de segmentos ES → EN para el switcher de idioma y hreflang.
    Los ids de modelo y zona son idénticos en ambos idiomas. */
export const SEGMENT_ES_TO_EN: Record<string, string> = {
  flota: "fleet",
  // El blog vive en /blog y /en/blog (mismo segmento); los SLUGS sí difieren por
  // idioma y se resuelven con BLOG_SLUG_PAIRS en counterpartPath.
  blog: "blog",
  precios: "pricing",
  servicios: "services",
  venta: "golf-carts-for-sale",
  aliados: "partners",
  "anexo-aliados": "partner-change-policy",
  "reserva-concierge": "concierge-booking",
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
    // Artículo de blog: traducir también el slug (difiere por idioma).
    if (first === "blog" && rest[0]) rest[0] = BLOG_SLUG_PAIRS[rest[0]] ?? rest[0];
    return "/" + [es, ...rest].join("/") + "/";
  }
  const [first, ...rest] = parts;
  const en = SEGMENT_ES_TO_EN[first];
  if (!en) return "/en/";
  if (first === "blog" && rest[0]) rest[0] = BLOG_SLUG_PAIRS[rest[0]] ?? rest[0];
  return "/en/" + [en, ...rest].join("/") + "/";
}

/** URLs absolutas hreflang para metadata.alternates. */
export function hreflang(esPath: string, enPath: string) {
  return {
    languages: {
      "es": esPath,
      en: enPath,
      // x-default → EN: capta la demanda internacional/anglófona (no hispanohablante).
      "x-default": enPath,
    },
  };
}
