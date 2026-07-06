import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/content/blog";
import { JsonLdScriptProps, breadcrumbSchema, faqSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${article.slug}/` },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    inLanguage: "es",
    image: "https://boltgolfcars.com/images/models/eco-cross-4-2.jpg",
    datePublished: "2026-07-05",
    author: { "@type": "Organization", name: "BOLT Golf Cars" },
    publisher: { "@type": "Organization", name: "BOLT Golf Cars" },
    mainEntityOfPage: `https://boltgolfcars.com/blog/${article.slug}/`,
  };

  return (
    <>
      <script {...JsonLdScriptProps(articleLd)} />
      {article.faq?.length ? <script {...JsonLdScriptProps(faqSchema(article.faq))} /> : null}
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: article.title, path: `/blog/${article.slug}/` },
          ])
        )}
      />

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
          <nav aria-label="Miga de pan" className="text-sm text-white/50">
            <Link href="/blog" className="hover:text-volt">
              Blog
            </Link>{" "}
            / {article.readMinutes} min
          </nav>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {article.sections.map((s) => (
          <section key={s.heading} className="mb-10">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-inktext">
                {p}
              </p>
            ))}
            {s.bullets?.length ? (
              <ul className="mt-4 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-inktext">
                    <span className="mt-1 font-bold text-volt-dark" aria-hidden="true">
                      ⚡
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {article.faq?.length ? (
          <section className="mb-10 rounded-card bg-cream p-7">
            <h2 className="font-display text-2xl font-extrabold">Preguntas frecuentes</h2>
            {article.faq.map((f) => (
              <div key={f.q} className="mt-5">
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-1 text-sm text-inktext">{f.a}</p>
              </div>
            ))}
          </section>
        ) : null}

        <div className="rounded-card bg-ink p-8 text-center">
          <p className="font-display text-xl font-bold text-white">
            ¿Listo para rodar en el paraíso?
          </p>
          <Link
            href="/solicitar-disponibilidad"
            className="mt-4 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink transition-transform hover:scale-105"
          >
            ⚡ Solicitar disponibilidad
          </Link>
        </div>
      </article>
    </>
  );
}
