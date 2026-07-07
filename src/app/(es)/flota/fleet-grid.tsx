import { Fragment } from "react";
import { MODELS, lineName, type Model } from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { PRICING } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Catálogo filtrable — server component sin React. Los radios nativos + CSS
 *  (`:checked ~` / `:not()`, ver globals.css) muestran/ocultan las tarjetas sin
 *  hidratación ni JS. Evitamos `:has()` porque Lightning CSS lo poda por targets.
 *
 *  U4: los radios (sr-only) van a nivel de <fieldset> para seguir siendo HERMANOS
 *  de #fleet-grid (el combinador `~` lo exige). Las labels visibles van en una
 *  barra .fleet-pills STICKY con glass; el estado activo/foco se enlaza por
 *  `#id:checked ~ .fleet-pills label[for="id"]` (ver globals.css). */

const T = {
  es: { all: "Todos", seats: "plazas", filterLabel: "Filtrar modelos", srHeading: "Modelos disponibles" },
  en: { all: "All", seats: "seats", filterLabel: "Filter models", srHeading: "Available models" },
} as const;

const LINES: Model["line"][] = ["eco", "clubcar", "zycar"];
const PAX = [4, 6] as const;

const pillCls =
  "fleet-pill mr-2 inline-flex shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-inktext transition-all select-none hover:border-ink";

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

        {/* Radios: nivel fieldset, sr-only → hermanos de #fleet-grid (combinador ~). */}
        {filters.map((f) => (
          <input
            key={f.id}
            type="radio"
            name="fleet-filter"
            id={f.id}
            defaultChecked={f.checked}
            className="fleet-radio sr-only"
          />
        ))}

        {/* Barra sticky con glass: se pega bajo el header y hace scroll horizontal
            en móvil para no crecer en alto. */}
        <div className="fleet-pills sticky top-16 z-30 -mx-4 flex overflow-x-auto px-4 py-3 sm:-mx-6 sm:px-6">
          {filters.map((f) => (
            <Fragment key={f.id}>
              <label htmlFor={f.id} className={pillCls}>
                {f.label}
              </label>
            </Fragment>
          ))}
        </div>

        <h2 className="sr-only">{t.srHeading}</h2>
        <div id="fleet-grid" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
