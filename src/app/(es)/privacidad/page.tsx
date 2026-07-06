import type { Metadata } from "next";
import { PrivacyView } from "@/views/privacy";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Cómo BOLT trata tus datos personales según la Ley 172-13 de RD: qué recogemos al solicitar disponibilidad, para qué se usa, tus derechos y cómo ejercerlos.',
  alternates: { canonical: '/privacidad/', ...hreflang('/privacidad/', '/en/privacy/') },
};

export default function Page() {
  return <PrivacyView locale='es' />;
}
