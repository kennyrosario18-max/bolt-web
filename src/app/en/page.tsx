import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MODELS, modelImage } from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { PRICING, SLOGAN, ZONES, waLink } from "@/content/site";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  alternates: { canonical: "/en/", ...hreflang("/", "/en/") },
};

const FEATURED_IDS = ["eco-cross-4-2", "eco-plus-4-2", "cc-precedent-2-2"];

const TRUST = [
  { icon: "⚡", en: "WhatsApp confirmation", es: "Confirmación por WhatsApp" },
  { icon: "📍", en: "Delivered to your villa", es: "Entrega en tu villa" },
  { icon: "🛡️", en: "Insured vehicles", es: "Vehículos asegurados" },
  { icon: "💬", en: "24/7 bilingual support", es: "Soporte bilingüe 24/7" },
];

const STEPS = [
  {
    n: "01",
    title: "Pick your cart and send the request",
    detail: "Choose dates, delivery area and passengers. It takes less than a minute.",
  },
  {
    n: "02",
    title: "We confirm availability",
    detail: "Our team checks the fleet and replies on WhatsApp with the best option.",
  },
  {
    n: "03",
    title: "Your BOLT arrives wherever you are",
    detail: "Delivered to your villa fully charged, with a usage briefing and 24/7 support.",
  },
];

export default function HomePageEn() {
  const featured = MODELS.filter((m) => FEATURED_IDS.includes(m.id));

  return (
    <>
      {/* Hero — premium black mode */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">
              Punta Cana · Dominican Republic
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {SLOGAN}
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/75">
              Premium golf carts — rental &amp; sales — delivered to your villa in{" "}
              <span className="hl-dark font-semibold">Puntacana Resort &amp; Club</span>, Cap Cana
              and Bávaro.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/en/fleet"
                className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
              >
                ⚡ See the fleet
              </Link>
              <Link
                href="/en/request-availability"
                className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-volt hover:text-volt"
              >
                Request availability
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/50">
              From <span className="font-bold text-white">US${PRICING.from4pax}/day</span> ·{" "}
              {MODELS.length} models · 3 lines
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src={modelImage("eco-cross-4")}
              alt="BOLT ECO Cross golf cart in Punta Cana"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.en} className="flex items-start gap-3">
                <span aria-hidden="true" className="text-xl">
                  {t.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.en}</p>
                  <p className="text-xs italic text-white/60">{t.es}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured models */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">The fleet</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Featured <span className="hl">models</span>
            </h2>
          </div>
          <Link
            href="/en/fleet"
            className="text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark"
          >
            See all {MODELS.length} models →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
            <ModelCard key={m.id} model={m} locale="en" />
          ))}
        </div>
      </section>

      {/* Rental / Sales */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="rounded-card border border-line bg-white p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">Rental</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold">
              By the day, week or season
            </h2>
            <p className="mt-3 text-inktext">
              4 and 6-seat models from{" "}
              <span className="font-bold">US${PRICING.from4pax}/day</span>. Delivery and pickup
              included within our zones.
            </p>
            <p className="mt-1 text-xs text-steel">{PRICING.itbisNoteEn}</p>
            <Link
              href="/en/fleet"
              className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-volt"
            >
              Explore the fleet →
            </Link>
          </div>
          <div className="rounded-card bg-ink p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">Sales · New</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-white">
              Your own BOLT, new and under warranty
            </h2>
            <p className="mt-3 text-white/70">
              New units for villas, communities and businesses. We help you pick the right model
              for your property.
            </p>
            <a
              href={waLink("Hi BOLT, I would like information about BUYING a new golf cart.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink"
            >
              Get a quote on WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section id="zones" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">Coverage</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Delivered <span className="hl">wherever you are</span>
        </h2>
        <p className="mt-3 max-w-xl text-inktext">
          We bring your golf cart fully charged to your villa or residential community.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ZONES.map((z) => (
            <Link
              key={z.id}
              href={`/en/rentals/${z.id}`}
              className="group rounded-card border border-line p-6 transition-shadow hover:shadow-lg"
            >
              <h3 className="font-display text-lg font-extrabold">{z.name}</h3>
              <p className="mt-2 text-sm text-inktext">{z.blurbEn}</p>
              {z.noteEn ? (
                <p className="mt-2 inline-block rounded-full bg-cream px-3 py-1 text-xs font-semibold text-volt-dark">
                  {z.noteEn}
                </p>
              ) : null}
              <p className="mt-3 text-sm font-bold text-volt-dark transition-transform group-hover:translate-x-1">
                View zone →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your BOLT in 3 steps
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <span className="font-display text-4xl font-extrabold text-volt">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-white/70">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-card bg-white/5 p-6 text-center sm:p-8">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              Ready to ride in paradise?
            </p>
            <p className="mt-1 text-sm text-white/60">
              We never auto-confirm: a real person reviews every request.
            </p>
            <Link
              href="/en/request-availability"
              className="mt-5 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              ⚡ Request availability
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
