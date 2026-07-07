import type { CSSProperties } from "react";
import Link from "next/link";
import { articlesByLocale } from "@/content/blog";
import type { Locale } from "@/lib/i18n";

/** Índice del blog — vista única ES/EN. Filtra artículos por idioma. */

const T = {
  es: {
    kicker: "Blog",
    h1: "Guías para moverte en el paraíso",
    lead: "Consejos prácticos de quienes rentan y operan golf carts en Punta Cana todos los días.",
    read: "min de lectura",
    cta: "Leer guía →",
    base: "/blog",
  },
  en: {
    kicker: "Blog",
    h1: "Guides to get around paradise",
    lead: "Practical tips from the people who rent and operate golf carts in Punta Cana every day.",
    read: "min read",
    cta: "Read guide →",
    base: "/en/blog",
  },
} as const;

export function BlogIndexView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const articles = articlesByLocale(locale);

  return (
    <>
      <section className="relative isolate overflow-hidden mesh-ink grain text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="animate-rise stagger text-sm font-bold uppercase tracking-[0.2em] text-volt" style={{ "--i": 0 } as CSSProperties}>{t.kicker}</p>
          <h1 className="animate-rise-t stagger mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style={{ "--i": 1 } as CSSProperties}>
            {t.h1}
          </h1>
          <p className="animate-rise stagger mt-4 max-w-xl text-white/75" style={{ "--i": 2 } as CSSProperties}>{t.lead}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="reveal-list grid gap-6 sm:grid-cols-2">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`${t.base}/${a.slug}`}
              className="group lift flex flex-col rounded-card border border-line bg-white p-7 hover:border-volt/40"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-volt-dark">
                {a.readMinutes} {t.read}
              </p>
              <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight group-hover:text-volt-dark">{a.title}</h2>
              <p className="mt-3 flex-1 text-sm text-inktext">{a.excerpt}</p>
              <p className="mt-4 text-sm font-bold text-volt-dark transition-transform group-hover:translate-x-1">
                {t.cta}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
