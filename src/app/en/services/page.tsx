import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { ServicesView } from "@/views/services";

export const metadata: Metadata = {
  title: "Services — rental, sales & partners",
  description:
    "Golf cart rental from 2 days, by the week or season; new unit sales with warranty; and a partner program for concierges and property managers in Punta Cana.",
  alternates: { canonical: "/en/services/", ...hreflang("/servicios/", "/en/services/") },
};

export default function ServicesPageEn() {
  return <ServicesView locale="en" />;
}
