import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { ServicesView } from "@/views/services";

export const metadata: Metadata = {
  title: "Servicios — renta, venta y aliados",
  description:
    "Renta de golf carts por día, semana o temporada; venta de unidades nuevas con garantía; y programa de aliados para concierges y property managers.",
  alternates: { canonical: "/servicios/", ...hreflang("/servicios/", "/en/services/") },
};

export default function ServicesPage() {
  return <ServicesView locale="es" />;
}
