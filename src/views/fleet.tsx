import { FleetGrid } from "@/app/(es)/flota/fleet-grid";
import { MODELS } from "@/content/models";
import { PRICING } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Página de flota — vista única ES/EN: hero + FleetGrid (ya compartido). */

const T = {
  es: {
    kicker: "La flota",
    h1: `${MODELS.length} modelos, 3 líneas`,
    leadA: "ECO, Club Car y Zycar — de 4 y 6 plazas, desde ",
    price: `US$${PRICING.from4pax}/día`,
    leadB: ". Todos con entrega en tu villa, seguro y soporte 24/7.",
    leadSub: "Our full fleet — 4 and 6 seaters, delivered to your villa.",
  },
  en: {
    kicker: "The fleet",
    h1: `${MODELS.length} models, 3 lines`,
    leadA: "ECO, Club Car and Zycar — 4 and 6 seaters from ",
    price: `US$${PRICING.from4pax}/day`,
    leadB: ". All with villa delivery, insurance and 24/7 support.",
    leadSub: "Nuestra flota completa — de 4 y 6 plazas, entregada en tu villa.",
  },
} as const;

export function FleetView({ locale }: { locale: Locale }) {
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
          <p className="mt-4 max-w-xl text-white/70">
            {t.leadA}
            <span className="font-bold text-white">{t.price}</span>
            {t.leadB}
          </p>
          <p lang={es ? "en" : "es"} className="mt-1 text-sm italic text-white/60">
            {t.leadSub}
          </p>
        </div>
      </section>
      <FleetGrid locale={locale} />
    </>
  );
}
