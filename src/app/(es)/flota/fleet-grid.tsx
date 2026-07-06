import { Fragment } from "react";
import { MODELS, lineName, type Model } from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { PRICING } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Catálogo filtrable — server component sin React. Los radios nativos + CSS
 *  (`:checked ~` / `:not()`, ver globals.css) muestran/ocultan las tarjetas sin
 *  hidratación ni JS. Evitamos `:has()` porque Lightning CSS lo poda por targets. */

const T = {
  es: { all: "Todos", seats: "plazas", filterLabel: "Filtrar modelos", srHeading: "Modelos disponibles" },
  en: { all: "All", seats: "seats", filterLabel: "Filter models", srHeading: "Available models" },
} as const;

const LINES: Model["line"][] = ["eco", "clubcar", "zycar"];
const PAX = [4, 6] as const;

const pillCls =
  "mb-2 mr-2 inline-flex cursor-pointer rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-inktext transition-colors select-none hover:border-ink";

export function FleetGrid({ locale = "es" }: { locale?: Locale }) {
  const t = T[locale];
  const countLine = (l: Model["line"]) => MODELS.filter((m) => m.line === l).length;
  const countPax = (p: number) => MODELS.filter((m) => m.pax === p).length;

  const filters = [
    { id: "ff-all", label: `${t.all} (${MODELS.length})`, checked: true },
    ...LINES.map((l) => ({ id: `ff-${l}`, label: `${lineName(l, locale)} (${countLine(l)})`, checked: false })),
    ...PAX.map((p) => ({ id: `ff-p${p}`, label: `${p} ${t.seats} (${countPax(p)})`, checked: false })),
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <fieldset>
        <legend className="sr-only">{t.filterLabel}</legend>
        {filters.map((f) => (
          <Fragment key={f.id}>
            <input
              type="radio"
              name="fleet-filter"
              id={f.id}
              defaultChecked={f.checked}
              className="fleet-radio sr-only"
            />
            <label htmlFor={f.id} className={pillCls}>
              {f.label}
            </label>
          </Fragment>
        ))}

        <h2 className="sr-only">{t.srHeading}</h2>
        <div id="fleet-grid" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODELS.map((m) => (
            <div key={m.id} className={`fleet-item is-${m.line} is-p${m.pax}`}>
              <ModelCard model={m} locale={locale} />
            </div>
          ))}
        </div>
      </fieldset>

      <p className="mt-8 text-center text-xs text-steel">
        {locale === "es" ? PRICING.itbisNote : PRICING.itbisNoteEn}
      </p>
    </section>
  );
}
