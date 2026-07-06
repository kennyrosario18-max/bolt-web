import type { Metadata } from "next";
import { FleetGrid } from "@/app/(es)/flota/fleet-grid";
import { MODELS } from "@/content/models";
import { PRICING } from "@/content/site";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Fleet — 4 and 6-seat golf carts",
  description:
    "BOLT's full golf cart fleet in Punta Cana: ECO, Club Car and Zycar lines, 4 and 6 seaters from US$50/day with delivery to your villa.",
  alternates: { canonical: "/en/fleet/", ...hreflang("/flota/", "/en/fleet/") },
};

export default function FleetPageEn() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">The fleet</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {MODELS.length} models, 3 lines
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            ECO, Club Car and Zycar — 4 and 6 seaters from{" "}
            <span className="font-bold text-white">US${PRICING.from4pax}/day</span>. All with villa
            delivery, insurance and 24/7 support.
          </p>
        </div>
      </section>
      <FleetGrid locale="en" />
    </>
  );
}
