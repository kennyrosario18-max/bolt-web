import type { Metadata } from "next";
import { SupportView } from "@/views/support";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Soporte y manual de uso',
  description: 'Manual del golf cart BOLT: encendido paso a paso, carga de batería, reglas de uso, velocidades máximas, emergencias y penalidades.',
  alternates: { canonical: '/soporte/', ...hreflang('/soporte/', '/en/support/') },
};

export default function Page() {
  return <SupportView locale='es' />;
}
