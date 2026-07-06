import type { Metadata } from "next";
import Link from "next/link";
import { waLink } from "@/content/site";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Services — rental, sales & partners",
  description:
    "Golf cart rental by the day, week or season; new unit sales with warranty; and a partner program for concierges and property managers in Punta Cana.",
  alternates: { canonical: "/en/services/", ...hreflang("/servicios/", "/en/services/") },
};

const SERVICES = [
  {
    title: "Daily, weekly & seasonal rental",
    body: "4 and 6-seat fleet with delivery and pickup at your villa (included on 2+ day rentals). For 7+ nights, ask about discounted weekly and monthly rates.",
    cta: { label: "See pricing →", href: "/en/pricing" },
  },
  {
    title: "New unit sales",
    body: "New golf carts with warranty for villas, communities and businesses. We advise you on the right model for your property and use — and stay with you after the purchase.",
    cta: {
      label: "Get a quote on WhatsApp →",
      href: waLink("Hi BOLT, I would like information about BUYING a new golf cart."),
      external: true,
    },
  },
  {
    title: "Delivery wherever you are",
    body: "We bring your cart fully charged with a usage briefing to your villa in Puntacana Resort & Club, Cap Cana and Bávaro — and to Casa de Campo and La Romana on 7+ day rentals.",
    cta: { label: "See zones →", href: "/en#zones" },
  },
  {
    title: "24/7 bilingual support",
    body: "One WhatsApp and we answer: roadside assistance, a swap if something fails, and usage guidance always available. Your rental is never left without backup.",
    cta: {
      label: "Message us on WhatsApp →",
      href: waLink("Hi BOLT, I need assistance with a golf cart."),
      external: true,
    },
  },
];

export default function ServicesPageEn() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">Services</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            More than renting carts
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Complete mobility for your stay or your property: rental, sales, delivery and support
            that answers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex flex-col rounded-card border border-line p-7">
              <h2 className="font-display text-xl font-extrabold">{s.title}</h2>
              <p className="mt-3 flex-1 text-inktext">{s.body}</p>
              {"external" in s.cta && s.cta.external ? (
                <a
                  href={s.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 font-bold text-volt-dark hover:underline"
                >
                  {s.cta.label}
                </a>
              ) : (
                <Link href={s.cta.href} className="mt-5 font-bold text-volt-dark hover:underline">
                  {s.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Partner Program — public benefits, rates only via WhatsApp */}
        <div className="mt-12 rounded-card bg-ink p-8 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">
            Agencies &amp; Property Managers
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            BOLT Partner Program
          </h2>
          <p className="mt-3 max-w-2xl text-white/75">
            Do you manage villas or run a vacation-rental agency? Become a BOLT partner and simplify
            golf carts across all your properties.
          </p>
          <ul className="mt-5 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            <li>✓ Preferred partner rates</li>
            <li>✓ Monthly account with e-CF invoicing, no per-booking deposit</li>
            <li>✓ Priority availability</li>
            <li>✓ Per-villa reporting</li>
          </ul>
          <a
            href={waLink("Hi BOLT, I manage villas and would like information about the Partner Program.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            Ask for the partner rate →
          </a>
        </div>
      </section>
    </>
  );
}
