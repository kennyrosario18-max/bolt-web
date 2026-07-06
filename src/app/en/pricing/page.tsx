import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { ogMeta } from "@/lib/og";
import { PricingView } from "@/views/pricing";

export const metadata: Metadata = {
  title: "Pricing — golf carts from US$50/day",
  description:
    "Official BOLT golf cart rental rates in Punta Cana: 4-seaters from US$50/day and 6-seaters from US$65/day. Tax shown per model. Free delivery on 2+ day rentals.",
  alternates: { canonical: "/en/pricing/", ...hreflang("/precios/", "/en/pricing/") },
  ...ogMeta("precios"),
};

export default function PricingPageEn() {
  return <PricingView locale="en" />;
}
