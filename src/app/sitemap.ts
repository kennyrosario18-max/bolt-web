import type { MetadataRoute } from "next";
import { MODELS } from "@/content/models";
import { ZONES } from "@/content/site";
import { ARTICLES } from "@/content/blog";

// Requerido por output:'export' — el sitemap se genera en build.
export const dynamic = "force-static";

import { SITE_URL } from "@/lib/site-url";

const SITE = SITE_URL;

/** Par ES/EN con hreflang recíproco; prioridades por rol en el embudo. */
function pair(es: string, en: string, priority: number): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}${es}`,
      priority,
      alternates: { languages: { "es": `${SITE}${es}`, en: `${SITE}${en}`, "x-default": `${SITE}${es}` } },
    },
    {
      url: `${SITE}${en}`,
      priority,
      alternates: { languages: { "es": `${SITE}${es}`, en: `${SITE}${en}`, "x-default": `${SITE}${es}` } },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    ...pair("/", "/en/", 1.0),
    ...pair("/flota/", "/en/fleet/", 0.9),
    ...pair("/precios/", "/en/pricing/", 0.9),
    ...pair("/solicitar-disponibilidad/", "/en/request-availability/", 0.9),
    ...pair("/servicios/", "/en/services/", 0.7),
    ...pair("/nosotros/", "/en/about/", 0.5),
    ...pair("/preguntas-frecuentes/", "/en/faq/", 0.6),
    ...pair("/soporte/", "/en/support/", 0.5),
    ...pair("/politica/", "/en/policy/", 0.4),
    ...pair("/deposito/", "/en/deposit/", 0.4),
    ...pair("/contacto/", "/en/contact/", 0.5),
    ...pair("/terminos/", "/en/terms/", 0.3),
    ...pair("/privacidad/", "/en/privacy/", 0.3),
  ];

  for (const m of MODELS) {
    entries.push(...pair(`/flota/${m.id}/`, `/en/fleet/${m.id}/`, 0.8));
  }
  for (const z of ZONES) {
    entries.push(...pair(`/alquiler/${z.id}/`, `/en/rentals/${z.id}/`, 0.8));
  }

  entries.push({ url: `${SITE}/blog/`, priority: 0.6 });
  for (const a of ARTICLES) {
    entries.push({ url: `${SITE}/blog/${a.slug}/`, priority: 0.6 });
  }

  return entries;
}
