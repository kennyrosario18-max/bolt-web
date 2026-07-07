import type { CSSProperties } from "react";
import Link from "next/link";
import type { BlogArticle } from "@/content/blog";
import { BoltIcon } from "@/components/icons";
import { JsonLdScriptProps, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site-url";
import type { Locale } from "@/lib/i18n";

/** Artículo del blog — vista única ES/EN. El chrome (migas, FAQ, CTA, schema)
 *  se localiza; el contenido viene del artículo ya filtrado por idioma. */

const T = {
  es: {
    crumbHome: "Inicio",
    crumbHomeHref: "/",
    blog: "Blog",
    blogHref: "/blog",
    min: "min",
    crumbAria: "Miga de pan",
    faqTitle: "Preguntas frecuentes",
    ready: "¿Listo para rodar en el paraíso?",
    reqCta: "Solicitar disponibilidad",
    reqHref: "/solicitar-disponibilidad",
  },
  en: {
    crumbHome: "Home",
    crumbHomeHref: "/en",
    blog: "Blog",
    blogHref: "/en/blog",
    min: "min",
    crumbAria: "Breadcrumb",
    faqTitle: "Frequently asked questions",
    ready: "Ready to ride in paradise?",
    reqCta: "Request availability",
    reqHref: "/en/request-availability",
  },
} as const;

export function BlogArticleView({ article, locale }: { article: BlogArticle; locale: Locale }) {
  const t = T[locale];
  const canonicalPath = `${t.blogHref}/${article.slug}/`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    inLanguage: locale,
    image: `${SITE_URL}/images/models/eco-cross-4-2.jpg`,
    datePublished: article.published,
    dateModified: article.updated,
    author: { "@type": "Organization", name: "BOLT Golf Cars", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "BOLT Golf Cars",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/bolt-icon.svg` },
    },
    mainEntityOfPage: `${SITE_URL}${canonicalPath}`,
  };

  return (
    <>
      <script {...JsonLdScriptProps(articleLd)} />
      {article.faq?.length ? <script {...JsonLdScriptProps(faqSchema(article.faq))} /> : null}
      <script
        {...JsonLdScriptProps(
          breadcrumbSchema([
            { name: t.crumbHome, path: locale === "es" ? "/" : "/en/" },
            { name: t.blog, path: `${t.blogHref}/` },
            { name: article.title, path: canonicalPath },
          ])
        )}
      />

      <section className="relative isolate overflow-hidden mesh-ink grain text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-16">
          <nav aria-label={t.crumbAria} className="animate-rise stagger text-sm text-white/70" style={{ "--i": 0 } as CSSProperties}>
            <Link href={t.blogHref} className="hover:text-volt">
              {t.blog}
            </Link>{" "}
            / {article.readMinutes} {t.min}
          </nav>
          <h1 className="animate-rise-t stagger mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl" style={{ "--i": 1 } as CSSProperties}>
            {article.title}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {article.sections.map((s) => (
          <section key={s.heading} className="reveal mb-10">
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
                    <BoltIcon className="mt-1 shrink-0 text-volt-dark" size={14} />
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {article.faq?.length ? (
          <section className="reveal mb-10 rounded-card bg-cream p-7">
            <h2 className="font-display text-2xl font-extrabold">{t.faqTitle}</h2>
            {article.faq.map((f) => (
              <div key={f.q} className="mt-5">
                <h3 className="font-display text-base font-bold">{f.q}</h3>
                <p className="mt-1 text-sm text-inktext">{f.a}</p>
              </div>
            ))}
          </section>
        ) : null}

        <div className="reveal relative isolate overflow-hidden rounded-card mesh-ink grain p-8 text-center">
          <p className="font-display text-xl font-bold text-white">{t.ready}</p>
          <Link
            href={t.reqHref}
            className="shine lift mt-4 inline-block rounded-full bg-volt px-8 py-3.5 text-base font-bold text-ink shadow-[var(--shadow-glow)]"
          >
            <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />{t.reqCta}
          </Link>
        </div>
      </article>
    </>
  );
}
