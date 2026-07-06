import type { Metadata } from "next";
import { DepositView } from "@/views/deposit";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Deposit details',
  description: "BOLT's official bank accounts (Banco López de Haro, USD and DOP) for the 30% confirmation deposit. Send your receipt via WhatsApp.",
  alternates: { canonical: '/en/deposit/', ...hreflang('/deposito/', '/en/deposit/') },
};

export default function Page() {
  return <DepositView locale='en' />;
}
