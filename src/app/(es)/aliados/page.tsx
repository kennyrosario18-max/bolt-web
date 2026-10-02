import type { Metadata } from "next";
import { PartnersView } from "@/views/partners";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Programa de Aliados BOLT — golf carts para villas y agencias",
  description:
    "Tarifa preferencial, cuenta mensual a crédito para aliados aprobados, disponibilidad prioritaria y reporte por villa. Únete al Programa de Aliados BOLT en Punta Cana.",
  alternates: { canonical: "/aliados/", ...hreflang("/aliados/", "/en/partners/") },
};

export default function AliadosPage() {
  return <PartnersView locale="es" />;
}
