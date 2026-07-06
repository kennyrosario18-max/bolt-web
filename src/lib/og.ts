import type { Metadata } from "next";

/** Metadata de OG/Twitter para una card de marca generada (public/og/{file}.png,
 *  1200×630). Ver scripts/gen-og.mjs. Úsalo esparciéndolo en la metadata de la
 *  página: `...ogMeta("model-eco-cross-4")`. */
export function ogMeta(file: string): Metadata {
  const url = `/og/${file}.png`;
  return {
    openGraph: { images: [{ url, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [url] },
  };
}
