import type { Metadata } from "next";
import { PolicyView } from "@/views/policy";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Política de cancelación',
  description: 'Política de cancelación y depósitos de BOLT: depósito de confirmación 30%, reembolsos por antelación, temporada alta, cambios de fecha y garantía.',
  alternates: { canonical: '/politica/', ...hreflang('/politica/', '/en/policy/') },
};

export default function Page() {
  return <PolicyView locale='es' />;
}
