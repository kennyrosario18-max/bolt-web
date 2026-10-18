import { CONTACT, SERVICE_AREAS } from "@/content/site";
import { MIN_PRICE, HIGH_SEASON_PRICES, modelPrice, modelHighPrice } from "@/content/pricing";
import { DESC_EN, type Model } from "@/content/models";
import { SITE_URL } from "./site-url";

const SITE = SITE_URL;

/** Tope del rango publicado = la tarifa más alta de temporada alta. */
const MAX_HIGH = Math.max(...Object.values(HIGH_SEASON_PRICES));

/** Imagen absoluta para JSON-LD/OG: SITE ya incluye el basePath del preview,
    así que aquí NO se usa modelImage() (que también lo antepone). */
function modelImageUrl(id: string): string {
  return `${SITE}/images/models/${id}.jpg`;
}

/** AutoRental / LocalBusiness — igual en ambos idiomas. */
export const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: "BOLT Golf Cars",
  legalName: "KR Experts and Management SRL",
  taxID: "RNC 132-22400-2",
  url: SITE,
  // Sin "telephone" (Kenny, 18/oct/2026): BOLT no atiende llamadas; Google mostraba "Llamar".
  email: CONTACT.email,
  slogan: "Your ride in paradise.",
  image: modelImageUrl("eco-cross-4-2"),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Barceló Km 3 1/2, Naves Montolio, Local #17",
    addressLocality: "Bávaro",
    addressRegion: "La Altagracia",
    addressCountry: "DO",
  },
  // Geo aproximado de Bávaro/Av. Barceló (refinar con la ubicación exacta de GBP).
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.6833,
    longitude: -68.4167,
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Av.%20Barcel%C3%B3%20Km%203%201%2F2%2C%20B%C3%A1varo%2C%20La%20Altagracia",
  areaServed: SERVICE_AREAS.map((z) => ({ "@type": "Place", name: z.name })),
  priceRange: `US$${MIN_PRICE}–US$${MAX_HIGH} + ITBIS`,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
};

export function productSchema(model: Model, locale: "es" | "en") {
  const path = locale === "es" ? `/flota/${model.id}` : `/en/fleet/${model.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${model.name} — BOLT Golf Cars`,
    description: locale === "es" ? model.desc : DESC_EN[model.id],
    image: modelImageUrl(model.id),
    url: `${SITE}${path}/`,
    brand: { "@type": "Brand", name: "BOLT" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: modelPrice(model.id),
      availability: "https://schema.org/InStock",
      url: `${SITE}${path}/`,
      priceSpecification: [
        {
          "@type": "UnitPriceSpecification",
          price: modelPrice(model.id),
          priceCurrency: "USD",
          unitCode: "DAY",
          valueAddedTaxIncluded: false,
          name:
            locale === "es"
              ? "Tarifa por día (temporada regular), ITBIS 18% aparte"
              : "Daily rate (regular season), 18% tax not included",
        },
        {
          "@type": "UnitPriceSpecification",
          price: modelHighPrice(model.id),
          priceCurrency: "USD",
          unitCode: "DAY",
          valueAddedTaxIncluded: false,
          validFrom: "2026-12-20",
          validThrough: "2027-01-06",
          name:
            locale === "es"
              ? "Tarifa por día en temporada alta (20 dic – 6 ene y Semana Santa), ITBIS 18% aparte"
              : "Daily rate in high season (Dec 20 – Jan 6 & Holy Week), 18% tax not included",
        },
      ],
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
