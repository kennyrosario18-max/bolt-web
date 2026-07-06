import type { Metadata } from "next";
import Link from "next/link";
import { DELIVERY_POLICY, PRICE_GROUPS, PRICING_FOOTNOTE } from "@/content/pricing";
import { waLink } from "@/content/site";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Pricing — golf carts from US$50/day",
  description:
    "Official BOLT golf cart rental rates in Punta Cana: 4-seaters from US$50/day and 6-seaters from US$65/day. Tax shown per model. Free delivery on 2+ day rentals.",
  alternates: { canonical: "/en/pricing/", ...hreflang("/precios/", "/en/pricing/") },
};

export default function PricingPageEn() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">Pricing</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Clear rates, no surprises
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Daily rates in US$ with tax shown per model. What you see is what you pay.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {PRICE_GROUPS.map((g, gi) => (
            <div key={g.groupEn}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-volt-dark">
                  0{gi + 1}
                </span>
                <h2 className="font-display text-2xl font-extrabold">{g.groupEn}</h2>
              </div>
              <div className="mt-5 space-y-4">
                {g.tiers.map((t) => (
                  <div
                    key={t.nameEn}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-white p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-extrabold">{t.nameEn}</h3>
                        {t.tagEn ? (
                          <span className="rounded-full bg-volt px-3 py-0.5 text-xs font-bold text-ink">
                            {t.tagEn}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-steel">{t.config.replace("hasta", "up to").replace("personas", "people")}</p>
                      {t.noteEn ? (
                        <p className="mt-1 text-sm font-semibold text-volt-dark">🔋 {t.noteEn}</p>
                      ) : null}
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl font-extrabold text-ink">
                        US${t.usd}
                        <span className="text-sm font-semibold text-steel"> /day</span>
                      </p>
                      <p className="text-xs text-steel">with tax · {t.withItbis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-card bg-cream p-7">
          <h2 className="font-display text-xl font-extrabold">Delivery &amp; pickup</h2>
          <p className="mt-4 text-sm text-inktext">{DELIVERY_POLICY.en}</p>
        </div>

        <p className="mt-8 text-sm text-steel">{PRICING_FOOTNOTE.en}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/en/request-availability"
            className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            ⚡ Request availability
          </Link>
          <Link
            href="/en/fleet"
            className="rounded-full border border-ink px-7 py-3.5 text-base font-semibold text-ink hover:bg-cream"
          >
            See the fleet →
          </Link>
          <a
            href={waLink("Hi BOLT, I have a question about rental rates.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-7 py-3.5 text-base font-semibold text-inktext hover:border-ink"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
