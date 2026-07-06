import type { Metadata } from "next";
import { FaqView } from "@/views/faq";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'FAQ — golf cart rental',
  description: "Clear answers about BOLT golf cart rentals: what's included, requirements, delivery areas, deposits, cancellations, batteries and capacity.",
  alternates: { canonical: '/en/faq/', ...hreflang('/preguntas-frecuentes/', '/en/faq/') },
};

export default function Page() {
  return <FaqView locale='en' />;
}
