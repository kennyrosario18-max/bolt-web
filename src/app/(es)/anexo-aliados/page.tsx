import type { Metadata } from "next";
import { PartnerPolicyView } from "@/views/partner-policy";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Política de cambios para aliados",
  description:
    "Anexo del Programa de Aliados BOLT: 1 cambio gratis por reserva con 24 h de aviso; desde el 2º cambio, US$40 + ITBIS por viaje adicional.",
  alternates: { canonical: "/anexo-aliados/", ...hreflang("/anexo-aliados/", "/en/partner-change-policy/") },
};

export default function AnexoAliadosPage() {
  return <PartnerPolicyView locale="es" />;
}
