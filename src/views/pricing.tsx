import type { CSSProperties } from "react";
import Link from "next/link";
import { PRICING_FOOTNOTE, TRANSPORT_RULES, TRANSPORT_ZONES, pricedModels, withItbis } from "@/content/pricing";
import { lineName } from "@/content/models";
import { MIN_DAYS, waLink } from "@/content/site";
import { BoltIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

/** Página de precios — vista única ES/EN. Consolida precios y en/pricing. */

const T = {
  es: {
    kicker: "Precios",
    h1: "Tarifas claras, sin sorpresas",
    lead: "Precios por día en US$ + ITBIS (18%), mostrado en cada modelo. Transporte fijo por zona, sin cargos ocultos.",
    leadSub: "Daily rates in US$ plus 18% tax, shown per model — fixed transport by zone, no hidden fees.",
    perDay: " /día",
    withTax: "con ITBIS · ",
    group4: "Hasta 4 personas",
    group6: "Hasta 6 personas",
    tapModel: "Toca un modelo para solicitarlo →",
    deliveryTitle: "Transporte ",
    deliverySub: "· Transport",
    transportLead: "Llevamos y recogemos tu carrito: un solo cargo por viaje de tráiler, ida y vuelta, fijo por zona.",
    thZone: "Zona",
    thTrip: "Por viaje",
    thFree: "Gratis desde",
    otherZones: "Otras zonas / fuera de ruta",
    quote: "Cotización",
    noFree: "Sin exención",
    freeDays: (n: number) => `${n} días`,
    transportFoot: "Tarifas en US$ por viaje de tráiler + ITBIS 18% aparte. Transporte fijo por zona, sin sorpresas.",
    weeklyNote: "7 noches o más: pregunta por la tarifa semanal y mensual con descuento.",
    minNote: `Renta mínima: ${MIN_DAYS.regular} días (${MIN_DAYS.high} días en temporada alta). Para un solo día, escríbenos por WhatsApp.`,
    reqCta: "Solicitar disponibilidad",
    reqHref: "/solicitar-disponibilidad",
    chipsLabel: "Solicita tu modelo:",
    fleetCta: "Ver la flota →",
    fleetHref: "/flota",
    waCta: "Preguntar por WhatsApp",
    waMsg: "Hola BOLT, tengo una pregunta sobre las tarifas de renta.",
    depositTitle: "Depósitos y temporada",
    depositBody: "Reserva: depósito de confirmación del 50% del total. A la entrega: depósito de garantía de US$200, reembolsable tras la inspección de devolución.",
    seasonBody: "Temporada alta (20 dic–6 ene y Semana Santa): reserva con anticipación; en esas fechas el anticipo no es reembolsable (queda como crédito solo con 30+ días de aviso).",
  },
  en: {
    kicker: "Pricing",
    h1: "Clear rates, no surprises",
    lead: "Daily rates in US$ plus 18% tax, shown per model. Fixed transport by zone — no hidden fees.",
    leadSub: "Precios por día en US$ + ITBIS (18%), mostrado en cada modelo. Transporte fijo por zona, sin cargos ocultos.",
    perDay: " /day",
    withTax: "with tax · ",
    group4: "Up to 4 people",
    group6: "Up to 6 people",
    tapModel: "Tap a model to request it →",
    deliveryTitle: "Transport ",
    deliverySub: "· Transporte",
    transportLead: "We deliver and pick up your cart: one charge per trailer trip, round trip, fixed by zone.",
    thZone: "Zone",
    thTrip: "Per trip",
    thFree: "Free from",
    otherZones: "Other areas / out of route",
    quote: "Quoted",
    noFree: "No exemption",
    freeDays: (n: number) => `${n} days`,
    transportFoot: "Rates in US$ per trailer trip + 18% tax. Fixed transport by zone, no surprises.",
    weeklyNote: "7+ nights: ask about discounted weekly and monthly rates.",
    minNote: `Minimum rental: ${MIN_DAYS.regular} days (${MIN_DAYS.high} days in high season). For a single day, message us on WhatsApp.`,
    reqCta: "Request availability",
    reqHref: "/en/request-availability",
    chipsLabel: "Request your model:",
    fleetCta: "See the fleet →",
    fleetHref: "/en/fleet",
    waCta: "Ask on WhatsApp",
    waMsg: "Hi BOLT, I have a question about rental rates.",
    depositTitle: "Deposits & season",
    depositBody: "Booking: 50% confirmation deposit of the total. At delivery: a US$200 damage deposit, refundable after the return inspection.",
    seasonBody: "High season (Dec 20–Jan 6 & Holy Week): book ahead; the advance is non-refundable on those dates (kept as credit only with 30+ days’ notice).",
  },
} as const;

export function PricingView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const es = locale === "es";

  return (
    <>
      <section className="relative isolate overflow-hidden mesh-ink grain text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="animate-rise stagger text-sm font-bold uppercase tracking-[0.2em] text-volt" style={{ "--i": 0 } as CSSProperties}>{t.kicker}</p>
          <h1 className="animate-rise stagger mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ "--i": 1 } as CSSProperties}>
            {t.h1}
          </h1>
          <p className="animate-rise stagger mt-4 max-w-xl text-white/70" style={{ "--i": 2 } as CSSProperties}>{t.lead}</p>
          <p lang={es ? "en" : "es"} className="animate-rise stagger mt-1 text-sm italic text-white/60" style={{ "--i": 3 } as CSSProperties}>
            {t.leadSub}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="reveal-list grid gap-10 lg:grid-cols-2">
          {[
            { label: t.group4, models: pricedModels(4) },
            { label: t.group6, models: pricedModels(6) },
          ].map((grp, gi) => (
            <div key={grp.label}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-volt-dark">0{gi + 1}</span>
                <h2 className="font-display text-2xl font-extrabold">{grp.label}</h2>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-steel">{t.tapModel}</p>
              <div className="mt-4 space-y-3">
                {grp.models.map((m) => (
                  <Link
                    key={m.id}
                    href={`${t.reqHref}?modelo=${m.id}`}
                    className="lift flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-white p-6 hover:border-volt/40"
                  >
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-extrabold">{m.name}</h3>
                      <p className="mt-1 text-sm text-steel">{lineName(m.line, locale)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl font-extrabold tabular-nums text-ink">
                        US${m.price}
                        <span className="text-sm font-semibold text-steel">{t.perDay}</span>
                      </p>
                      <p className="text-xs tabular-nums text-steel">
                        {t.withTax}
                        {withItbis(m.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <hr className="divider-volt mt-12 border-0" />

        {/* Transporte — lista oficial por zona (16/oct/2026); tarifas en ZONES. */}
        <div className="reveal mt-8 rounded-card bg-cream p-7">
          <h2 className="font-display text-xl font-extrabold">
            {t.deliveryTitle}
            <span className="text-base font-semibold text-steel">{t.deliverySub}</span>
          </h2>
          <p className="mt-2 text-sm text-inktext">{t.transportLead}</p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink text-xs uppercase tracking-[0.1em] text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">{t.thZone}</th>
                  <th scope="col" className="px-4 py-3 text-right font-bold">{t.thTrip}</th>
                  <th scope="col" className="px-4 py-3 text-right font-bold">{t.thFree}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {TRANSPORT_ZONES.map((z) => (
                  <tr key={z.id}>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-ink">{z.name}</span>
                      {z.landmarks ? <span className="block text-xs text-steel">{z.landmarks}</span> : null}
                    </td>
                    <td className="px-4 py-3 text-right font-display text-lg font-extrabold tabular-nums text-ink">US${z.transport}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-inktext">
                      {z.transportFreeFrom ? t.freeDays(z.transportFreeFrom) : t.noFree}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-3 font-semibold text-ink">{t.otherZones}</td>
                  <td className="px-4 py-3 text-right text-inktext">{t.quote}</td>
                  <td className="px-4 py-3 text-right text-inktext">{t.noFree}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-inktext">
            {(es ? TRANSPORT_RULES.es : TRANSPORT_RULES.en).map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden="true" className="text-volt-dark">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold text-steel">{t.transportFoot}</p>
        </div>

        {/* Depósitos + temporada — transparencia (F6). */}
        <div className="reveal mt-8 rounded-card border border-line bg-white p-7">
          <h2 className="font-display text-xl font-extrabold">{t.depositTitle}</h2>
          <p className="mt-3 text-sm text-inktext">{t.depositBody}</p>
          <p className="mt-2 text-sm font-semibold text-volt-dark">{t.seasonBody}</p>
          <p className="mt-2 text-sm font-semibold text-inktext">{t.minNote}</p>
          <p className="mt-2 text-sm text-inktext">{t.weeklyNote}</p>
        </div>

        <p className="reveal mt-8 text-sm text-steel">{es ? PRICING_FOOTNOTE.es : PRICING_FOOTNOTE.en}</p>

        <div className="reveal mt-10 flex flex-wrap gap-3">
          <Link
            href={t.reqHref}
            className="shine lift rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink"
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
