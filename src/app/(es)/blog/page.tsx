import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog — guías de golf carts en Punta Cana",
  description:
    "Guías prácticas de BOLT para moverte en golf cart por Puntacana Resort & Club, Cap Cana y Bávaro: modelos, baterías, reglas y consejos de reserva.",
  // El blog no tiene par EN: canonical sin hreflang.
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">Blog</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Guías para moverte en el paraíso
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Consejos prácticos de quienes rentan y operan golf carts en Punta Cana todos los días.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col rounded-card border border-line bg-white p-7 transition-shadow hover:shadow-xl"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-volt-dark">
                {a.readMinutes} min de lectura
              </p>
              <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight">{a.title}</h2>
              <p className="mt-3 flex-1 text-sm text-inktext">{a.excerpt}</p>
              <p className="mt-4 text-sm font-bold text-volt-dark transition-transform group-hover:translate-x-1">
                Leer guía →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
