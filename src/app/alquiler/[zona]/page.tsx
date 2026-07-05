import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ZONE_LANDINGS, getZoneLanding } from "@/content/zones-landing";
import { getModel } from "@/content/models";
import { ModelCard } from "@/components/model-card";

interface Props {
  params: Promise<{ zona: string }>;
}

export function generateStaticParams() {
  return ZONE_LANDINGS.map((l) => ({ zona: l.zone.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zona } = await params;
  const landing = getZoneLanding(zona);
  if (!landing) return {};
  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
  };
}

export default async function ZonePage({ params }: Props) {
  const { zona } = await params;
  const landing = getZoneLanding(zona);
  if (!landing) notFound();

  const { zone } = landing;
  const recommended = landing.recommendedIds
    .map(getModel)
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <nav aria-label="Miga de pan" className="text-sm text-white/50">
            <Link href="/" className="hover:text-volt">
              Inicio
            </Link>{" "}
            / Zonas
          </nav>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {landing.heroTitle}
          </h1>
          <p className="mt-1 text-sm italic text-white/60">{landing.heroTitleEn}</p>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{landing.intro}</p>
          {zone.minDays ? (
            <p className="mt-4 inline-block rounded-full bg-volt px-4 py-1.5 text-sm font-bold text-ink">
              Reservas de {zone.minDays} días o más · {zone.note}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/solicitar-disponibilidad"
              className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              ⚡ Solicitar disponibilidad
            </Link>
            <Link
              href="/precios"
              className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:border-volt hover:text-volt"
            >
              Ver precios →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {landing.bullets.map((b) => (
            <li key={b.es} className="rounded-card bg-cream p-6">
              <p className="font-semibold text-ink">
                <span className="mr-2 text-ok" aria-hidden="true">
                  ✓
                </span>
                {b.es}
              </p>
              <p className="mt-1 text-sm italic text-steel">{b.en}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
          Modelos <span className="hl">recomendados</span> para {zone.short}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
        <Link
          href="/flota"
          className="mt-6 inline-block text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark"
        >
          Ver toda la flota →
        </Link>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Preguntas frecuentes — {zone.short}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {landing.faqs.map((f) => (
              <div key={f.q} className="rounded-card border border-line bg-white p-6">
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-2 text-sm text-inktext">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-card bg-ink p-8 text-center">
            <p className="font-display text-xl font-bold text-white">
              ¿Listo para tu BOLT en {zone.short}?
            </p>
            <Link
              href="/solicitar-disponibilidad"
              className="mt-4 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              ⚡ Solicitar disponibilidad
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
