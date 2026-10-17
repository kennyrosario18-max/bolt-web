import type { Metadata } from "next";
import { PolicyView } from "@/views/policy";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Política de cancelación',
  description: 'Política de cancelación y depósitos de BOLT: depósito de confirmación 50%, cancelación por crédito (12 meses con 48 h de aviso), temporada alta, cambios de fecha y garantía US$200.',
  alternates: { canonical: '/politica/', ...hreflang('/politica/', '/en/policy/') },
};

export default function Page() {
  return <PolicyView locale='es' />;
}
