import Image from "next/image";
import Link from "next/link";
import { MODELS, modelImage } from "@/content/models";
import { ModelCard } from "@/components/model-card";
import { PRICING, SLOGAN, ZONES, waLink } from "@/content/site";

const FEATURED_IDS = ["eco-cross-4-2", "eco-plus-4-2", "cc-precedent-2-2"];

const TRUST = [
  { icon: "⚡", es: "Confirmación por WhatsApp", en: "WhatsApp confirmation" },
  { icon: "📍", es: "Entrega en tu villa", en: "Delivered to your villa" },
  { icon: "🛡️", es: "Vehículos asegurados", en: "Insured vehicles" },
  { icon: "💬", es: "Soporte bilingüe 24/7", en: "24/7 bilingual support" },
];

const STEPS = [
  {
    n: "01",
    es: "Elige tu modelo y envía la solicitud",
    en: "Pick your cart and send the request",
    detail: "Selecciona fechas, zona de entrega y pasajeros. Toma menos de un minuto.",
  },
  {
    n: "02",
    es: "Confirmamos disponibilidad",
    en: "We confirm availability",
    detail: "Nuestro equipo verifica y te responde por WhatsApp con la mejor opción.",
  },
  {
    n: "03",
    es: "Recibe tu BOLT donde estés",
    en: "Your BOLT arrives wherever you are",
    detail: "Entrega en tu villa con carga completa, orientación de uso y soporte 24/7.",
  },
];

export default function HomePage() {
  const featured = MODELS.filter((m) => FEATURED_IDS.includes(m.id));

  return (
    <>
      {/* Hero — modo premium negro */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">
              Punta Cana · República Dominicana
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {SLOGAN}
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/75">
              Renta y venta de golf carts premium, entregados en tu villa en{" "}
              <span className="hl-dark font-semibold">Puntacana Resort &amp; Club</span>, Cap Cana y
              Bávaro.
            </p>
            <p className="mt-2 max-w-md text-sm italic text-white/45">
              Premium golf carts delivered to your villa — rental &amp; sales.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/flota"
                className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
              >
                ⚡ Ver la flota
              </Link>
              <Link
                href="/solicitar-disponibilidad"
                className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-volt hover:text-volt"
              >
                Solicitar disponibilidad
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/50">
              Desde <span className="font-bold text-white">US${PRICING.from4pax}/día</span> ·{" "}
              {MODELS.length} modelos · 3 líneas
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src={modelImage("eco-cross-4")}
              alt="Golf cart BOLT ECO Cross en Punta Cana"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Franja de confianza */}
        <div className="border-t border-white/10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.es} className="flex items-start gap-3">
                <span aria-hidden="true" className="text-xl">
                  {t.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.es}</p>
                  <p className="text-xs italic text-white/40">{t.en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modelos destacados */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">La flota</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Modelos <span className="hl">destacados</span>
            </h2>
          </div>
          <Link href="/flota" className="text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark">
            Ver los {MODELS.length} modelos →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>

      {/* Renta / Venta */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="rounded-card border border-line bg-white p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">Renta</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold">
              Por día, semana o temporada
            </h2>
            <p className="mt-3 text-inktext">
              Modelos de 4 y 6 plazas desde{" "}
              <span className="font-bold">US${PRICING.from4pax}/día</span>. Entrega y recogida
              incluidas dentro de nuestras zonas.
            </p>
            <p className="mt-1 text-xs text-steel">{PRICING.itbisNote}</p>
            <Link
              href="/flota"
              className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-volt"
            >
              Explorar la flota →
            </Link>
          </div>
          <div className="rounded-card bg-ink p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">
              Venta · Nuevo
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-white">
              Tu propio BOLT, nuevo y con garantía
            </h2>
            <p className="mt-3 text-white/70">
              Unidades nuevas para villas, comunidades y negocios. Te asesoramos en el modelo ideal
              para tu propiedad.
            </p>
            <a
              href={waLink("Hola BOLT, quiero información sobre la VENTA de golf carts nuevos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink"
            >
              Cotizar por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* Zonas */}
      <section id="zonas" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">Cobertura</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Entrega <span className="hl">donde estés</span>
        </h2>
        <p className="mt-3 max-w-xl text-inktext">
          Llevamos tu golf cart con carga completa hasta tu villa o residencial.
          <span className="mt-1 block text-sm italic text-steel">
            Delivered wherever you are, fully charged.
          </span>
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ZONES.map((z) => (
            <div key={z.id} className="rounded-card border border-line p-6">
              <h3 className="font-display text-lg font-extrabold">{z.name}</h3>
              <p className="mt-2 text-sm text-inktext">{z.blurb}</p>
              {z.note ? (
                <p className="mt-2 inline-block rounded-full bg-cream px-3 py-1 text-xs font-semibold text-volt-dark">
                  {z.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="scroll-mt-20 bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">Cómo funciona</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Tu BOLT en 3 pasos
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <span className="font-display text-4xl font-extrabold text-volt">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{s.es}</h3>
                <p className="mt-1 text-sm italic text-white/40">{s.en}</p>
                <p className="mt-3 text-sm text-white/70">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-card bg-white/5 p-6 text-center sm:p-8">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              ¿Listo para moverte en el paraíso?
            </p>
            <p className="mt-1 text-sm text-white/60">
              Nunca confirmamos automáticamente: cada solicitud la revisa nuestro equipo.
            </p>
            <Link
              href="/solicitar-disponibilidad"
              className="mt-5 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              ⚡ Solicitar disponibilidad
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
