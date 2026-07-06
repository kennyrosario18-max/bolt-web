import { CONTACT, ZONES, PRICING, priceFrom } from "@/content/site";
import { DESC_EN, modelImage, type Model } from "@/content/models";

const SITE = "https://boltgolfcars.com";

/** AutoRental / LocalBusiness — igual en ambos idiomas. */
export const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: "BOLT Golf Cars",
  legalName: "KR Experts and Management SRL",
  taxID: "RNC 132-22400-2",
  url: SITE,
  telephone: "+18098398515",
  email: CONTACT.email,
  slogan: "Your ride in paradise.",
  image: `${SITE}/images/models/eco-cross-4-2.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Barceló Km 3 1/2, Naves Montolio, Local #17",
    addressLocality: "Bávaro",
    addressRegion: "La Altagracia",
    addressCountry: "DO",
  },
  areaServed: ZONES.map((z) => ({ "@type": "Place", name: z.name })),
  priceRange: `US$${PRICING.from4pax}–US$85 por día`,
  openingHours: "Mo-Su 00:00-24:00",
};

export function productSchema(model: Model, locale: "es" | "en") {
  const path = locale === "es" ? `/flota/${model.id}` : `/en/fleet/${model.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${model.name} — BOLT Golf Cars`,
    description: locale === "es" ? model.desc : DESC_EN[model.id],
    image: `${SITE}${modelImage(model.id)}`,
    url: `${SITE}${path}/`,
    brand: { "@type": "Brand", name: "BOLT" },
    offers: {
      "@type": "Offer",
      // Precio "desde": el tier Budget del grupo de plazas correspondiente.
      price: priceFrom(model.pax),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE}${locale === "es" ? "/solicitar-disponibilidad" : "/en/request-availability"}/`,
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function JsonLdScriptProps(data: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const;
}
