import type { Metadata } from "next";
import { SaleView } from "@/views/sale";
import { hreflang } from "@/lib/i18n";
import { ogMeta } from "@/lib/og";

export const metadata: Metadata = {
  title: "Golf carts for sale in Punta Cana — new & used",
  description:
    "Buy golf carts in Punta Cana: brand-new imported units and pre-owned carts from our fleet, with delivery, warranty and local maintenance. Ask for a purchase price on WhatsApp.",
  alternates: {
    canonical: "/en/golf-carts-for-sale/",
    ...hreflang("/venta/", "/en/golf-carts-for-sale/"),
  },
  ...ogMeta("venta"),
};

export default function GolfCartsForSalePage() {
  return <SaleView locale="en" />;
}
