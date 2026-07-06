import type { Metadata } from "next";
import { hreflang } from "@/lib/i18n";
import { ogMeta } from "@/lib/og";
import { FleetView } from "@/views/fleet";

export const metadata: Metadata = {
  title: "Fleet — 4 and 6-seat golf carts",
  description:
    "BOLT's full golf cart fleet in Punta Cana: ECO, Club Car and Zycar lines, 4 and 6 seaters from US$50/day with delivery to your villa.",
  alternates: { canonical: "/en/fleet/", ...hreflang("/flota/", "/en/fleet/") },
  ...ogMeta("flota"),
};

export default function FleetPageEn() {
  return <FleetView locale="en" />;
}
