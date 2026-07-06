import type { Metadata } from "next";
import { PolicyView } from "@/views/policy";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: 'Cancellation policy',
  description: "BOLT's cancellation and deposit policy: 30% confirmation deposit, notice-based refunds, high season terms, date changes and damage deposit.",
  alternates: { canonical: '/en/policy/', ...hreflang('/politica/', '/en/policy/') },
};

export default function Page() {
  return <PolicyView locale='en' />;
}
