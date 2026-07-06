import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ZONE_LANDINGS, getZoneLanding } from "@/content/zones-landing";
import { getModel } from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { hreflang } from "@/lib/i18n";
import { JsonLdScriptProps, breadcrumbSchema, faqSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ zona: string }>;
}

export function generateStaticParams() {
  return ZONE_LANDINGS.map((l) => ({ zona: l.zone.id }));
}

const META_EN: Record<string, { title: string; description: string }> = {
  "puntacana-resort": {
    title: "Golf carts in Puntacana Resort & Club",
    description:
      "Golf cart rental with villa delivery inside Puntacana Resort & Club. 4 and 6-seat fleet, insured vehicles and 24/7 bilingual support.",
  },
  "cap-cana": {
    title: "Golf carts in Cap Cana from US$50/day",
    description:
      "4 and 6-seat golf carts delivered to your villa in Cap Cana from US$50/day. Free delivery on 2+ day rentals and 24/7 bilingual support.",
  },
  bavaro: {
    title: "Golf carts in Bávaro from US$50/day",
    description:
      "Our base is in Bávaro: fast golf cart delivery to residential communities and resorts from US$50/day. Weekly and monthly rates available.",
  },
  "casa-de-campo": {
    title: "Golf carts in Casa de Campo — 7+ days",
    description:
      "We bring golf carts to Casa de Campo for rentals of 7 days or more, with transport quoted by villa. Premium 4 and 6-seat fleet.",
  },
  "la-romana": {
    title: "Golf carts in La Romana — 7+ days",
    description:
      "Golf cart rental in La Romana for stays of 7 days or more. Villa delivery with quoted transport and 24/7 WhatsApp support.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zona } = await params;
  const landing = getZoneLanding(zona);
  if (!landing) return {};
  const meta = META_EN[zona];
  return {
    ...meta,
    alternates: {
      canonical: `/en/rentals/${zona}/`,
      ...hreflang(`/alquiler/${zona}/`, `/en/rentals/${zona}/`),
    },
  };
}

export default async function ZonePageEn({ params }: Props) {
  const { zona } = await params;
  const landing = getZoneLanding(zona);
  if (!landing) notFound();

  const { zone } = landing;
  const recommended = landing.recommendedIds
    .map(getModel)
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <>
      <script {...JsonLdScriptProps(faqSchema(landing.faqsEn))} />
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: "Home", path: "/en/" },
            { name: "Zones", path: "/en/#zones" },
            { name: zone.name, path: `/en/rentals/${zone.id}/` },
          ])
        )}
      />

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-white/50">
            <Link href="/en" className="hover:text-volt">
              Home
            </Link>{" "}
            / Zones
          </nav>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {landing.heroTitleEn}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{landing.introEn}</p>
          {zone.minDays ? (
            <p className="mt-4 inline-block rounded-full bg-volt px-4 py-1.5 text-sm font-bold text-ink">
              Rentals of {zone.minDays}+ days · {zone.noteEn}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/en/request-availability"
              className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              ⚡ Request availability
            </Link>
            <Link
              href="/en/pricing"
              className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:border-volt hover:text-volt"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {landing.bullets.map((b) => (
            <li key={b.en} className="rounded-card bg-cream p-6">
              <p className="font-semibold text-ink">
                <span className="mr-2 text-ok" aria-hidden="true">
                  ✓
                </span>
                {b.en}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          Recommended <span className="hl">models</span> for {zone.short}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((m) => (
            <ModelCard key={m.id} model={m} locale="en" />
          ))}
        </div>
        <Link
          href="/en/fleet"
          className="mt-6 inline-block text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark"
        >
          See the full fleet →
        </Link>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            FAQ — {zone.short}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {landing.faqsEn.map((f) => (
              <div key={f.q} className="rounded-card border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-2 text-sm text-inktext">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-card bg-ink p-8 text-center">
            <p className="font-display text-xl font-bold text-white">
              Ready for your BOLT in {zone.short}?
            </p>
            <Link
              href="/en/request-availability"
              className="mt-4 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              ⚡ Request availability
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
