import type { Metadata } from "next";
import { PartnerPolicyView } from "@/views/partner-policy";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Partner change policy",
  description:
    "BOLT Partner Program annex: 1 free change per booking with 24h notice; from the 2nd change, US$40 + tax per additional trip.",
  alternates: {
    canonical: "/en/partner-change-policy/",
    ...hreflang("/anexo-aliados/", "/en/partner-change-policy/"),
  },
};

export default function PartnerChangePolicyPage() {
  return <PartnerPolicyView locale="en" />;
}
