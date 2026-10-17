import Link from "next/link";
import { highPriceFromPax } from "@/content/pricing";
import { MIN_DAYS } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Recuadro informativo de temporada alta (inicio y landings de zona). Sin urgencia:
 *  cuenta el mínimo de 5 noches como lo que es en PCRC y Cap Cana — entrega gratis
 *  incluida — y deja claro que el anticipo no se devuelve en esas fechas. Válido todo
 *  el año (cubre Navidad–Año Nuevo y Semana Santa), así no envejece. */
const T = {
  es: {
    kicker: "Temporada alta",
    dates: "20 dic – 6 ene y Semana Santa",
    body: (min: number, from: number) =>
      `Renta mínima de ${min} noches; en Puntacana Resort & Club y Cap Cana eso incluye la entrega y recogida gratis. Desde US$${from}/día + ITBIS según el modelo. Se aparta con el 50%, no reembolsable en esas fechas. Cupo limitado en fechas pico: te confirmamos por WhatsApp.`,
    link: "Ver tarifas de temporada alta →",
    href: "/precios",
  },
  en: {
    kicker: "High season",
    dates: "Dec 20 – Jan 6 & Holy Week",
    body: (min: number, from: number) =>
      `Minimum rental of ${min} nights; in Puntacana Resort & Club and Cap Cana that includes free delivery and pickup. From US$${from}/day + tax depending on the model. Held with a 50% advance, non-refundable on those dates. Limited availability on peak dates: we confirm on WhatsApp.`,
    link: "See high-season rates →",
    href: "/en/pricing",
  },
} as const;

export function HighSeasonNote({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = T[locale];
  return (
    <div className={`reveal rounded-card bg-cream p-6 sm:p-7 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-volt-dark">
        {t.kicker} <span className="font-semibold normal-case tracking-normal text-steel">· {t.dates}</span>
      </p>
      <p className="mt-2 text-sm text-inktext">{t.body(MIN_DAYS.high, highPriceFromPax(4))}</p>
      <Link href={t.href} className="mt-3 inline-block text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark">
        {t.link}
      </Link>
    </div>
  );
}
