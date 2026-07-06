import Image from "next/image";
import Link from "next/link";
import { DESC_EN, LINE_NAMES, modelImage, type Model } from "@/content/models";
import { priceFrom } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function ModelCard({ model, locale = "es" }: { model: Model; locale?: Locale }) {
  const es = locale === "es";
  const href = es ? `/flota/${model.id}` : `/en/fleet/${model.id}`;

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-card border border-line bg-white transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={modelImage(model.id)}
          alt={
            es
              ? `Golf cart ${model.name} — ${model.pax} pasajeros`
              : `${model.name} golf cart — seats ${model.pax}`
          }
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-volt">
          {LINE_NAMES[model.line]}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-extrabold tracking-tight">{model.name}</h3>
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
            <span className="text-base font-extrabold">US${priceFrom(model.pax)}</span>
            {es ? "/día" : "/day"}
          </span>
          <span className="text-sm font-bold text-volt-dark transition-transform group-hover:translate-x-1">
            {es ? "Ver modelo →" : "View model →"}
          </span>
        </div>
      </div>
    </Link>
  );
}
