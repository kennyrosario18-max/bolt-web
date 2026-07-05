import type { Metadata } from "next";
import Link from "next/link";
import { DELIVERY_POLICY, PRICE_GROUPS, PRICING_FOOTNOTE } from "@/content/pricing";
import { waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Precios — golf carts desde US$50/día",
  description:
    "Tarifas oficiales de renta de golf carts en Punta Cana: 4 plazas desde US$50/día y 6 plazas desde US$65/día. ITBIS mostrado por modelo. Entrega incluida en rentas de 2+ días.",
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">Precios</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Tarifas claras, sin sorpresas
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Precios por día en US$ con el ITBIS mostrado en cada modelo. Lo que ves es lo que pagas.
          </p>
          <p className="mt-1 text-sm italic text-white/60">
            Daily rates in US$, tax shown per model — what you see is what you pay.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {PRICE_GROUPS.map((g, gi) => (
            <div key={g.group}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-volt-dark">
                  0{gi + 1}
                </span>
                <h2 className="font-display text-2xl font-extrabold">
                  {g.group} <span className="text-base font-semibold text-steel">· {g.groupEn}</span>
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                {g.tiers.map((t) => (
                  <div
                    key={t.name}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-white p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-extrabold">{t.name}</h3>
                        {t.tag ? (
                          <span className="rounded-full bg-volt px-3 py-0.5 text-xs font-bold text-ink">
                            {t.tag}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-steel">{t.config}</p>
                      {t.note ? (
                        <p className="mt-1 text-sm font-semibold text-volt-dark">{t.note}</p>
                      ) : null}
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl font-extrabold text-ink">
                        US${t.usd}
                        <span className="text-sm font-semibold text-steel"> /día</span>
                      </p>
                      <p className="text-xs text-steel">con ITBIS · {t.withItbis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Entrega y recogida */}
        <div className="mt-12 rounded-card bg-cream p-7">
          <h2 className="font-display text-xl font-extrabold">
            Entrega y recogida <span className="text-base font-semibold text-steel">· Delivery</span>
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-inktext">
            {DELIVERY_POLICY.es.map((item) => (
              <li key={item.b}>
                <b>{item.b}</b>
                {item.rest}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs italic text-steel">{DELIVERY_POLICY.en}</p>
        </div>

        <p className="mt-8 text-sm text-steel">{PRICING_FOOTNOTE.es}</p>
        <p className="mt-1 text-xs italic text-steel">{PRICING_FOOTNOTE.en}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/solicitar-disponibilidad"
            className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            ⚡ Solicitar disponibilidad
          </Link>
          <Link
            href="/flota"
            className="rounded-full border border-ink px-7 py-3.5 text-base font-semibold text-ink hover:bg-cream"
          >
            Ver la flota →
          </Link>
          <a
            href={waLink("Hola BOLT, tengo una pregunta sobre las tarifas de renta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-7 py-3.5 text-base font-semibold text-inktext hover:border-ink"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
