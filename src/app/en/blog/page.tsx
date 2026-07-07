import type { Metadata } from "next";
import { BlogIndexView } from "@/views/blog-index";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog — golf cart guides in Punta Cana",
  description:
    "BOLT's practical guides to getting around Puntacana Resort & Club, Cap Cana and Bávaro by golf cart: models, batteries, rules and booking tips.",
  alternates: { canonical: "/en/blog/", ...hreflang("/blog/", "/en/blog/") },
};

export default function BlogIndexPageEn() {
  return <BlogIndexView locale="en" />;
}
