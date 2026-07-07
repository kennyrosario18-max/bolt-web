import { describe, expect, it } from "vitest";
import { ARTICLES, articlesByLocale, BLOG_SLUG_PAIRS } from "@/content/blog";
import { ZONE_LANDINGS } from "@/content/zones-landing";
import { getModel } from "@/content/models";

/** Invariantes del contenido bilingüe: cada par ES/EN debe ser espejo real. */

describe("blog — pares ES/EN", () => {
  it("hay la misma cantidad de artículos por idioma", () => {
    expect(articlesByLocale("es").length).toBe(articlesByLocale("en").length);
    expect(articlesByLocale("es").length).toBeGreaterThanOrEqual(4);
  });

  it("pairSlug es recíproco y cruza de idioma", () => {
    for (const a of ARTICLES) {
      const pair = ARTICLES.find((b) => b.slug === a.pairSlug);
      expect(pair, `${a.slug} apunta a un par inexistente (${a.pairSlug})`).toBeDefined();
      expect(pair!.pairSlug, `reciprocidad rota en ${a.slug}`).toBe(a.slug);
      expect(pair!.locale, `${a.slug} y su par comparten idioma`).not.toBe(a.locale);
    }
    // El mapa derivado cubre todos los slugs.
    expect(Object.keys(BLOG_SLUG_PAIRS).length).toBe(ARTICLES.length);
  });

  it("cada par tiene la misma estructura (secciones y FAQs espejo)", () => {
    for (const a of articlesByLocale("es")) {
      const en = ARTICLES.find((b) => b.slug === a.pairSlug)!;
      expect(en.sections.length, `secciones dispares en ${a.slug}`).toBe(a.sections.length);
      expect(en.faq?.length ?? 0, `FAQs dispares en ${a.slug}`).toBe(a.faq?.length ?? 0);
    }
  });

  it("los slugs son únicos", () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("zonas — landings", () => {
  it("hay 5 zonas y cada una con cuerpo largo (3 secciones, ≥4 FAQs)", () => {
    expect(ZONE_LANDINGS.length).toBe(5);
    for (const l of ZONE_LANDINGS) {
      expect(l.sections.length, l.zone.id).toBe(3);
      expect(l.faqs.length, l.zone.id).toBeGreaterThanOrEqual(4);
      expect(l.faqsEn.length, `faqsEn de ${l.zone.id}`).toBe(l.faqs.length);
    }
  });

  it("cada sección tiene el mismo número de párrafos ES/EN", () => {
    for (const l of ZONE_LANDINGS) {
      for (const s of l.sections) {
        expect(s.pEn.length, `${l.zone.id} · ${s.h}`).toBe(s.p.length);
      }
    }
  });

  it("los modelos recomendados existen en el catálogo", () => {
    for (const l of ZONE_LANDINGS) {
      for (const id of l.recommendedIds) {
        expect(getModel(id), `${l.zone.id} recomienda modelo inexistente: ${id}`).toBeDefined();
      }
    }
  });
});
