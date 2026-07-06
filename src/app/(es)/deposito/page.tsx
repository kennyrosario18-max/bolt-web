import type { Metadata } from "next";
import { DepositView } from "@/views/deposit";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Datos para tu depósito',
  description: 'Cuentas oficiales de BOLT (Banco López de Haro, US$ y DOP) para el depósito de confirmación del 30%. Envía tu comprobante por WhatsApp.',
  alternates: { canonical: '/deposito/', ...hreflang('/deposito/', '/en/deposit/') },
};

export default function Page() {
  return <DepositView locale='es' />;
}
