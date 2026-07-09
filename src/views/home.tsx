import type { CSSProperties } from "react";
import Link from "next/link";
import { MODELS } from "@/content/models";
import { ModelPhoto } from "@/components/model-photo";
import { TESTIMONIALS } from "@/content/testimonials";
import { ModelCard } from "@/components/model-card";
import { BoltIcon, PinIcon, ShieldIcon, ChatIcon, CheckIcon } from "@/components/icons";
import { PRICING, SLOGAN, ZONES, waLink } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/** Home — vista única ES/EN. Consolida app/(es)/page.tsx y app/en/page.tsx. */

const FEATURED_IDS = ["eco-cross-4-2", "eco-plus-4-2", "cc-precedent-2-2"];

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const TRUST_ICONS = [BoltIcon, PinIcon, ShieldIcon, ChatIcon];

const T = {
  es: {
    kicker: "Punta Cana · República Dominicana",
    h1: "Renta y venta de golf carts en Punta Cana",
    leadA: "Renta y venta de golf carts premium, entregados en tu villa en ",
    pcrc: "Puntacana Resort & Club",
    leadB: ", Cap Cana y Bávaro.",
    leadSub: "Premium golf carts delivered to your villa — rental & sales.",
    fleetCta: "Ver la flota",
    fleetHref: "/flota",
    reqCta: "Solicitar disponibilidad",
    reqHref: "/solicitar-disponibilidad",
    fromA: "Desde ",
    fromPrice: `US$${PRICING.from4pax}/día`,
    fromB: ` · ${MODELS.length} modelos · 3 líneas`,
    heroAlt: "Golf cart BOLT Zycar 4 frente a una villa en Punta Cana",
    trust: [
      { main: "Confirmación por WhatsApp", sub: "WhatsApp confirmation" },
      { main: "Entrega en tu villa", sub: "Delivered to your villa" },
      { main: "Mantenimiento al día", sub: "Well-maintained fleet" },
      { main: "Soporte bilingüe 24/7", sub: "24/7 bilingual support" },
    ],
    fleetKicker: "La flota",
    featA: "Modelos ",
    featB: "destacados",
    seeAll: `Ver los ${MODELS.length} modelos →`,
    rentKicker: "Renta",
    rentTitle: "Por día, semana o temporada",
    rentBodyA: "Modelos de 4 y 6 plazas desde ",
    rentPrice: `US$${PRICING.from4pax}/día`,
    rentBodyB: ". Entrega y recogida incluidas dentro de nuestras zonas.",
    rentItbis: PRICING.itbisNote,
    rentCta: "Explorar la flota →",
    salesKicker: "Venta · Nuevo",
    salesTitle: "Tu propio BOLT, nuevo y con garantía",
    salesBody: "Unidades nuevas para villas, comunidades y negocios. Te asesoramos en el modelo ideal para tu propiedad.",
    salesCta: "Cotizar por WhatsApp →",
    salesMsg: "Hola BOLT, quiero información sobre la VENTA de golf carts nuevos.",
    coverKicker: "Cobertura",
    coverA: "Entrega ",
    coverB: "donde estés",
    coverLead: "Llevamos tu golf cart con carga completa hasta tu villa o residencial.",
    coverSub: "Delivered wherever you are, fully charged.",
    zoneCta: "Ver zona →",
    howKicker: "Cómo funciona",
    howTitle: "Tu BOLT en 3 pasos",
    sameDay: "Confirmamos tu disponibilidad el mismo día",
    testiKicker: "Reseñas",
    testiTitle: "Lo que dicen nuestros huéspedes",
    steps: [
      { n: "01", title: "Elige tu modelo y envía la solicitud", sub: "Pick your cart and send the request", detail: "Selecciona fechas, zona de entrega y pasajeros. Toma menos de un minuto." },
      { n: "02", title: "Confirmamos disponibilidad", sub: "We confirm availability", detail: "Nuestro equipo verifica y te responde por WhatsApp con la mejor opción." },
      { n: "03", title: "Recibe tu BOLT donde estés", sub: "Your BOLT arrives wherever you are", detail: "Entrega en tu villa con carga completa, orientación de uso y soporte 24/7." },
    ],
    ready: "¿Listo para moverte en el paraíso?",
    readyNote: "Nunca confirmamos automáticamente: cada solicitud la revisa nuestro equipo.",
    readyCta: "Solicitar disponibilidad",
    zonesAnchor: "zonas",
    howAnchor: "como-funciona",
  },
  en: {
    kicker: "Punta Cana · Dominican Republic",
    h1: "Golf cart rental & sales in Punta Cana",
    leadA: "Premium golf carts — rental & sales — delivered to your villa in ",
    pcrc: "Puntacana Resort & Club",
    leadB: ", Cap Cana and Bávaro.",
    leadSub: "Renta y venta de golf carts premium, entregados en tu villa.",
    fleetCta: "See the fleet",
    fleetHref: "/en/fleet",
    reqCta: "Request availability",
    reqHref: "/en/request-availability",
    fromA: "From ",
    fromPrice: `US$${PRICING.from4pax}/day`,
    fromB: ` · ${MODELS.length} models · 3 lines`,
    heroAlt: "BOLT Zycar 4 golf cart in front of a villa in Punta Cana",
    trust: [
      { main: "WhatsApp confirmation", sub: "Confirmación por WhatsApp" },
      { main: "Delivered to your villa", sub: "Entrega en tu villa" },
      { main: "Well-maintained fleet", sub: "Mantenimiento al día" },
      { main: "24/7 bilingual support", sub: "Soporte bilingüe 24/7" },
    ],
    fleetKicker: "The fleet",
    featA: "Featured ",
    featB: "models",
    seeAll: `See all ${MODELS.length} models →`,
    rentKicker: "Rental",
    rentTitle: "By the day, week or season",
    rentBodyA: "4 and 6-seat models from ",
    rentPrice: `US$${PRICING.from4pax}/day`,
    rentBodyB: ". Delivery and pickup included within our zones.",
    rentItbis: PRICING.itbisNoteEn,
    rentCta: "Explore the fleet →",
    salesKicker: "Sales · New",
    salesTitle: "Your own BOLT, new and under warranty",
    salesBody: "New units for villas, communities and businesses. We help you pick the right model for your property.",
    salesCta: "Get a quote on WhatsApp →",
    salesMsg: "Hi BOLT, I would like information about BUYING a new golf cart.",
    coverKicker: "Coverage",
    coverA: "Delivered ",
    coverB: "wherever you are",
    coverLead: "We bring your golf cart fully charged to your villa or residential community.",
    coverSub: "Entrega donde estés, con carga completa.",
    zoneCta: "View zone →",
    howKicker: "How it works",
    howTitle: "Your BOLT in 3 steps",
    sameDay: "We confirm your availability the same day",
    testiKicker: "Reviews",
    testiTitle: "What our guests say",
    steps: [
      { n: "01", title: "Pick your cart and send the request", sub: "Elige tu modelo y envía la solicitud", detail: "Choose dates, delivery area and passengers. It takes less than a minute." },
      { n: "02", title: "We confirm availability", sub: "Confirmamos disponibilidad", detail: "Our team checks the fleet and replies on WhatsApp with the best option." },
      { n: "03", title: "Your BOLT arrives wherever you are", sub: "Recibe tu BOLT donde estés", detail: "Delivered to your villa fully charged, with a usage briefing and 24/7 support." },
    ],
    ready: "Ready to ride in paradise?",
    readyNote: "We never auto-confirm: a real person reviews every request.",
    readyCta: "Request availability",
    zonesAnchor: "zones",
    howAnchor: "how-it-works",
  },
} as const;

export function HomeView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const es = locale === "es";
  const featured = MODELS.filter((m) => FEATURED_IDS.includes(m.id));
  const zoneHref = (id: string) => (es ? `/alquiler/${id}` : `/en/rentals/${id}`);

  return (
    <>
      {/* Preload del AVIF del hero (LCP): React lo iza al <head>; el type hace que
          navegadores sin AVIF lo ignoren. El strip de hidratación conserva
          preloads de imagen (solo quita los de script). */}
      <link
        rel="preload"
        as="image"
        type="image/avif"
        imageSrcSet={`${BASE}/images/models/opt/zycar-4-640.avif 640w, ${BASE}/images/models/opt/zycar-4-960.avif 960w`}
        imageSizes="(max-width: 768px) 100vw, 50vw"
        fetchPriority="high"
      />
      {/* Hero premium (U1) — malla de gradiente viva + grano, entrada escalonada. */}
      <section className="relative isolate overflow-hidden mesh-ink grain text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-20">
          <div>
            {/* F7: eslogan a kicker (marca) y H1 con keyword para SEO. */}
            <p className="animate-rise stagger text-sm font-bold uppercase tracking-[0.2em] text-volt" style={{ "--i": 0 } as CSSProperties}>
              {SLOGAN.replace(/\.$/, "")} · {t.kicker}
            </p>
            {/* animate-rise-t (solo transform): el H1 es candidato a LCP — con
                opacity:0 inicial el LCP se retrasaba ~650ms (U7). */}
            <h1 className="animate-rise-t stagger mt-4 font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ "--i": 1 } as CSSProperties}>
              {t.h1}
            </h1>
            <p className="animate-rise stagger mt-5 max-w-md text-lg text-white/75" style={{ "--i": 2 } as CSSProperties}>
              {t.leadA}
              <span className="hl-dark font-semibold">{t.pcrc}</span>
              {t.leadB}
            </p>
            <p lang={es ? "en" : "es"} className="animate-rise stagger mt-2 max-w-md text-sm italic text-white/55" style={{ "--i": 3 } as CSSProperties}>
              {t.leadSub}
            </p>
            <div className="animate-rise stagger mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as CSSProperties}>
              <Link
                href={t.fleetHref}
                className="shine lift rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink shadow-[var(--shadow-glow)]"
              >
                <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.fleetCta}
              </Link>
              <Link
                href={t.reqHref}
                className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-[var(--dur-base)] hover:border-volt hover:text-volt"
              >
                {t.reqCta}
              </Link>
            </div>
            <p className="animate-rise stagger mt-6 text-sm text-white/50" style={{ "--i": 5 } as CSSProperties}>
              {t.fromA}
              <span className="font-bold text-white">{t.fromPrice}</span>
              {t.fromB}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-white/10 shadow-[var(--shadow-xl)] animate-rise-t stagger" style={{ "--i": 2 } as CSSProperties}>
            <ModelPhoto id="zycar-4" alt={t.heroAlt} priority sizes="(max-width: 768px) 100vw, 50vw" className="ken-burns" />
            {/* Badge glass de precio sobre la imagen (patrón automotor premium). */}
            <div className="glass absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white">
              <BoltIcon className="text-volt" size={15} />
              {t.fromPrice}
            </div>
          </div>
        </div>

        {/* Franja de confianza */}
        <div className="border-t border-white/10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
            {t.trust.map((item, i) => {
              const Icon = TRUST_ICONS[i];
              return (
              <div key={item.main} className="flex items-start gap-3">
                <Icon className="mt-0.5 shrink-0 text-volt" size={22} />
                <div>
                  <p className="text-sm font-semibold text-white">{item.main}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modelos destacados */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">{t.fleetKicker}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t.featA}
              <span className="hl">{t.featB}</span>
            </h2>
          </div>
          <Link
            href={t.fleetHref}
            className="text-sm font-bold text-ink underline underline-offset-4 hover:text-volt-dark"
          >
            {t.seeAll}
          </Link>
        </div>
        <div className="reveal-list mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
            <ModelCard key={m.id} model={m} locale={locale} />
          ))}
        </div>
      </section>

      {/* Renta / Venta */}
      <section className="section-glow bg-cream">
        <div className="reveal-list mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="rounded-card border border-line bg-white p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">{t.rentKicker}</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold">{t.rentTitle}</h2>
            <p className="mt-3 text-inktext">
              {t.rentBodyA}
              <span className="font-bold">{t.rentPrice}</span>
              {t.rentBodyB}
            </p>
            <p className="mt-1 text-xs text-steel">{t.rentItbis}</p>
            <Link
              href={t.fleetHref}
              className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-volt"
            >
              {t.rentCta}
            </Link>
          </div>
          <div className="rounded-card bg-ink p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.salesKicker}</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-white">{t.salesTitle}</h2>
            <p className="mt-3 text-white/70">{t.salesBody}</p>
            <a
              href={waLink(t.salesMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-volt px-6 py-3 text-sm font-bold text-ink"
            >
              {t.salesCta}
            </a>
          </div>
        </div>
      </section>

      {/* Zonas */}
      <section id={t.zonesAnchor} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">{t.coverKicker}</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t.coverA}
          <span className="hl">{t.coverB}</span>
        </h2>
        <p className="mt-3 max-w-xl text-inktext">{t.coverLead}</p>
        <div className="reveal-list mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ZONES.map((z) => (
            <Link
              key={z.id}
              href={zoneHref(z.id)}
              className="group rounded-card border border-line p-6 transition-shadow hover:shadow-lg"
            >
              <h3 className="font-display text-lg font-extrabold">{z.name}</h3>
              <p className="mt-2 text-sm text-inktext">{es ? z.blurb : z.blurbEn}</p>
              {(es ? z.note : z.noteEn) ? (
                <p className="mt-2 inline-block rounded-full bg-cream px-3 py-1 text-xs font-semibold text-volt-dark">
                  {es ? z.note : z.noteEn}
                </p>
              ) : null}
              <p className="mt-3 text-sm font-bold text-volt-dark transition-transform group-hover:translate-x-1">
                {t.zoneCta}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonios — slot listo; se muestra solo cuando haya reseñas reales (F4). */}
      {TESTIMONIALS.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt-dark">{t.testiKicker}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.testiTitle}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((tm) => (
              <figure key={tm.author} className="rounded-card border border-line bg-white p-6">
                <blockquote className="text-inktext">“{es ? tm.quote : tm.quoteEn}”</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-ink">
                  {tm.author} <span className="font-normal text-steel">· {tm.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Cómo funciona */}
      <section id={t.howAnchor} className="scroll-mt-20 bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">{t.howKicker}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.howTitle}
          </h2>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-volt px-4 py-1.5 text-sm font-bold text-ink">
            <CheckIcon size={15} /> {t.sameDay}
          </p>
          <div className="reveal-list mt-10 grid gap-8 md:grid-cols-3">
            {t.steps.map((s) => (
              <div key={s.n}>
                <span className="font-display text-4xl font-extrabold text-volt">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-white/70">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-card bg-white/5 p-6 text-center sm:p-8">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">{t.ready}</p>
            <p className="mt-1 text-sm text-white/60">{t.readyNote}</p>
            <Link
              href={t.reqHref}
              className="mt-5 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
            >
              <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.readyCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
