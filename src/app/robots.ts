import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "@/lib/site-url";

// Requerido por output:'export' — se genera en build.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: IS_PREVIEW
      ? // Preview de GitHub Pages: no indexar nada.
        { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
