import Image from "next/image";
import Link from "next/link";
import { LINE_NAMES, modelImage, type Model } from "@/content/models";
import { priceFrom } from "@/content/site";

export function ModelCard({ model }: { model: Model }) {
  return (
    <Link
      href={`/flota/${model.id}`}
      className="group overflow-hidden rounded-card border border-line bg-white transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={modelImage(model.id)}
          alt={`Golf cart ${model.name} — ${model.pax} pasajeros`}
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
            {model.pax} plazas
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-steel">{model.desc}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="text-sm font-semibold text-ink">
            desde <span className="text-base font-extrabold">US${priceFrom(model.pax)}</span>/día
          </span>
          <span className="text-sm font-bold text-volt-dark transition-transform group-hover:translate-x-1">
            Ver modelo →
          </span>
        </div>
      </div>
    </Link>
  );
}
