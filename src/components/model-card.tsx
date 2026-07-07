import Link from "next/link";
import { DESC_EN, lineName, type Model } from "@/content/models";
import { ModelPhoto } from "@/components/model-photo";
import { modelPrice } from "@/content/pricing";
import type { Locale } from "@/lib/i18n";

/** Tarjeta de modelo premium (U3): lift, zoom lento con overlay, badge glass,
 *  revelado del CTA al hover y precio tabular. Todo CSS — 0 JS.
 *  `priority`: para tarjetas above-the-fold (candidatas a LCP) — carga eager. */
export function ModelCard({ model, locale = "es", priority = false }: { model: Model; locale?: Locale; priority?: boolean }) {
  const es = locale === "es";
  const href = es ? `/flota/${model.id}` : `/en/fleet/${model.id}`;
  const cta = es ? "Ver modelo →" : "View model →";

  return (
    <Link
      href={href}
      className="group lift relative block overflow-hidden rounded-card border border-line bg-white hover:border-volt/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <ModelPhoto
          id={model.id}
          alt={
            es
              ? `Golf cart ${model.name} — ${model.pax} pasajeros`
              : `${model.name} golf cart — seats ${model.pax}`
          }
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08]"
        />
        {/* Overlay que aparece al hover (profundidad + legibilidad del CTA). */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Badge de línea (glass). */}
        <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-volt">
          {lineName(model.line, locale)}
        </span>
        {/* CTA que se revela deslizándose al hover. */}
        <span className="glass pointer-events-none absolute bottom-3 left-3 inline-flex translate-y-3 items-center rounded-full px-4 py-2 text-sm font-bold text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          {cta}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-extrabold tracking-tight transition-colors duration-[var(--dur-base)] group-hover:text-volt-dark">
            {model.name}
          </h3>
          <span className="whitespace-nowrap rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink">
            {model.pax} {es ? "plazas" : "seats"}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-steel">
          {es ? model.desc : DESC_EN[model.id]}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="text-sm font-semibold text-ink">
            {es ? "desde" : "from"}{" "}
            <span className="text-base font-extrabold tabular-nums">US${modelPrice(model.id)}</span>
            {es ? "/día" : "/day"}
          </span>
          <span className="text-sm font-bold text-volt-dark transition-transform duration-[var(--dur-base)] group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
