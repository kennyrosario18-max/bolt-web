import type { Metadata } from "next";
import { PolicyView } from "@/views/policy";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Cancellation policy',
  description: "BOLT's cancellation and deposit policy: 50% confirmation deposit, cancellation as credit (12 months with 48h notice), high season terms, date changes and US$200 damage deposit.",
  alternates: { canonical: '/en/policy/', ...hreflang('/politica/', '/en/policy/') },
};

export default function Page() {
  return <PolicyView locale='en' />;
}
