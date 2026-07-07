import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articlesByLocale, getArticle } from "@/content/blog";
import { BlogArticleView } from "@/views/blog-article";
import { hreflang } from "@/lib/i18n";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articlesByLocale("en").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `/en/blog/${article.slug}/`,
      ...hreflang(`/blog/${article.pairSlug}/`, `/en/blog/${article.slug}/`),
    },
  };
}

export default async function BlogArticlePageEn({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || article.locale !== "en") notFound();
  return <BlogArticleView article={article} locale="en" />;
}
