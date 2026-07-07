import type { Metadata } from "next";
import { BlogIndexView } from "@/views/blog-index";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog — guías de golf carts en Punta Cana",
  description:
    "Guías prácticas de BOLT para moverte en golf cart por Puntacana Resort & Club, Cap Cana y Bávaro: modelos, baterías, reglas y consejos de reserva.",
  alternates: { canonical: "/blog/", ...hreflang("/blog/", "/en/blog/") },
};

export default function BlogIndexPage() {
  return <BlogIndexView locale="es" />;
}
