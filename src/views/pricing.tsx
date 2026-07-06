import Link from "next/link";
import { DELIVERY_POLICY, PRICE_GROUPS, PRICING_FOOTNOTE } from "@/content/pricing";
import { waLink } from "@/content/site";
import { BoltIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

/** Página de precios — vista única ES/EN. Consolida precios y en/pricing. */

const T = {
  es: {
    kicker: "Precios",
    h1: "Tarifas claras, sin sorpresas",
    lead: "Precios por día en US$ con el ITBIS mostrado en cada modelo. Lo que ves es lo que pagas.",
    leadSub: "Daily rates in US$, tax shown per model — what you see is what you pay.",
    perDay: " /día",
    withTax: "con ITBIS · ",
    deliveryTitle: "Entrega y recogida ",
    deliverySub: "· Delivery",
    reqCta: "Solicitar disponibilidad",
    reqHref: "/solicitar-disponibilidad",
    fleetCta: "Ver la flota →",
    fleetHref: "/flota",
    waCta: "Preguntar por WhatsApp",
    waMsg: "Hola BOLT, tengo una pregunta sobre las tarifas de renta.",
  },
  en: {
    kicker: "Pricing",
    h1: "Clear rates, no surprises",
    lead: "Daily rates in US$ with tax shown per model. What you see is what you pay.",
    leadSub: "Precios por día en US$ con el ITBIS mostrado en cada modelo. Lo que ves es lo que pagas.",
    perDay: " /day",
    withTax: "with tax · ",
    deliveryTitle: "Delivery & pickup ",
    deliverySub: "· Entrega",
    reqCta: "Request availability",
    reqHref: "/en/request-availability",
    fleetCta: "See the fleet →",
    fleetHref: "/en/fleet",
    waCta: "Ask on WhatsApp",
    waMsg: "Hi BOLT, I have a question about rental rates.",
  },
} as const;

const configEn = (c: string) => c.replace("hasta", "up to").replace("personas", "people");

export function PricingView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const es = locale === "es";

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.kicker}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-xl text-white/70">{t.lead}</p>
          <p lang={es ? "en" : "es"} className="mt-1 text-sm italic text-white/60">
            {t.leadSub}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {PRICE_GROUPS.map((g, gi) => (
            <div key={g.group}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-volt-dark">0{gi + 1}</span>
                <h2 className="font-display text-2xl font-extrabold">
                  {es ? g.group : g.groupEn}{" "}
                  <span className="text-base font-semibold text-steel">
                    · {es ? g.groupEn : g.group}
                  </span>
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                {g.tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-white p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-extrabold">
                          {es ? tier.name : tier.nameEn}
                        </h3>
                        {(es ? tier.tag : tier.tagEn) ? (
                          <span className="rounded-full bg-volt px-3 py-0.5 text-xs font-bold text-ink">
                            {es ? tier.tag : tier.tagEn}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-steel">
                        {es ? tier.config : configEn(tier.config)}
                      </p>
                      {(es ? tier.note : tier.noteEn) ? (
                        <p className="mt-1 text-sm font-semibold text-volt-dark">
                          {es ? tier.note : `🔋 ${tier.noteEn}`}
                        </p>
                      ) : null}
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl font-extrabold text-ink">
                        US${tier.usd}
                        <span className="text-sm font-semibold text-steel">{t.perDay}</span>
                      </p>
                      <p className="text-xs text-steel">
                        {t.withTax}
                        {tier.withItbis}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Entrega y recogida */}
        <div className="mt-12 rounded-card bg-cream p-7">
          {es ? (
            <>
              <h2 className="font-display text-xl font-extrabold">
                {t.deliveryTitle}
                <span className="text-base font-semibold text-steel">{t.deliverySub}</span>
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-inktext">
                {DELIVERY_POLICY.es.map((item) => (
                  <li key={item.b}>
                    <b>{item.b}</b>
                    {item.rest}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2 className="font-display text-xl font-extrabold">Delivery &amp; pickup</h2>
              <p className="mt-4 text-sm text-inktext">{DELIVERY_POLICY.en}</p>
            </>
          )}
        </div>

        <p className="mt-8 text-sm text-steel">{es ? PRICING_FOOTNOTE.es : PRICING_FOOTNOTE.en}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={t.reqHref}
            className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.reqCta}
          </Link>
          <Link
            href={t.fleetHref}
            className="rounded-full border border-ink px-7 py-3.5 text-base font-semibold text-ink hover:bg-cream"
          >
            {t.fleetCta}
          </Link>
          <a
            href={waLink(t.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-7 py-3.5 text-base font-semibold text-inktext hover:border-ink"
          >
            {t.waCta}
          </a>
        </div>
      </section>
    </>
  );
}
