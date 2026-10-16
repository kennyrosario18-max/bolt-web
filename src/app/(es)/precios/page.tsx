import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { ogMeta } from "@/lib/og";
import { PricingView } from "@/views/pricing";

export const metadata: Metadata = {
  title: "Precios — golf carts desde US$50/día",
  description:
    "Tarifas de golf carts en Punta Cana: 4 plazas desde US$50/día y 6 plazas desde US$65/día. Transporte fijo por zona desde US$60, gratis en reservas largas.",
  alternates: { canonical: "/precios/", ...hreflang("/precios/", "/en/pricing/") },
  ...ogMeta("precios"),
};

export default function PricingPage() {
  return <PricingView locale="es" />;
}
