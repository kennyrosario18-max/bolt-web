# MASTER ROADMAP — BOLT Golf Cars 3.0

**Versión 1.0 · 6 de julio de 2026 · Ejecutable solo tras aprobación del MASTER_PRD.md**
Orden mandado por Kenny: arquitectura → sistema de diseño → componentes → layouts → catálogo → formularios → SEO → rendimiento → QA. Se antepone una **Fase 0 de protección/medición** (justificada en PRD §13; esfuerzo: horas, no días).

Cada fase declara: objetivo, entregables, archivos afectados, hallazgos de la auditoría que cierra (ver MASTER_AUDIT.md) y criterio de éxito verificable. **Ninguna fase rompe rutas, SEO ni funcionalidad existente.**

---

## F0 · Protección y medición (pre-fase, esfuerzo bajo)
**Objetivo:** blindar el negocio y encender la luz antes de tocar código de producto.
- SPF (`v=spf1 -all`) + DMARC reject en DNS de boltgolfcars.com [A6] · subir DMARC de krexpert.com a quarantine→reject (M)
- Verificar dominio en GitHub (anti-takeover) [A23] · registro CAA (B)
- Aviso antifraude bilingüe en `views/deposit.tsx` + plantilla WhatsApp "datos SOLO en /deposito" [A7]
- Google Search Console + Bing (verificación DNS TXT) + enviar sitemap [A9]
- **Google Business Profile** (categoría Golf cart rental service) + circuito de reseñas post-entrega por WhatsApp [A11]
- Analytics sin cookies (Cloudflare Web Analytics para arrancar) + eventos wa_click/form_submit/tel_click [A1, A20]
- security.txt · borrar SVGs del scaffold (B)
**Archivos:** DNS (Hostinger vía Chrome), views/deposit.tsx, layouts (snippet analytics), public/.well-known/
**Éxito:** dig muestra SPF/DMARC · GSC recibiendo datos · primer dashboard de eventos con datos reales.

## F1 · Arquitectura
**Objetivo:** una sola fuente para cada cosa; el resto del roadmap se abarata.
- Consolidar embudo en `views/` (home, fleet, model-detail, pricing, services, zone-landing) con `Record<Locale>` [A12]
- Unificar i18n a un solo patrón; matar sufijos `*En` y dicts paralelos (descEn dentro de models.json; metas EN dentro de ZONE_LANDINGS) [A15, M-i18n]
- Precios derivados de PRICE_GROUPS en schema.ts; check de importes del blog [A13, M-schema]
- Checks de integridad de contenido en build (modelo↔desc↔imagen; zona↔meta) [A15]
- CI: GitHub Actions con typecheck+lint+build+checks como gate y deploy a gh-pages [A14, M-deploy]
- Extraer `buildMetadata(locale)` y fuentes compartidas de los dos layouts (B) · prosa de soporte a content/ (B)
**Archivos:** src/views/* (6 nuevas), src/app/(es)/* y en/* (adelgazan a wrappers), src/content/*, lib/schema.ts, .github/workflows/deploy.yml
**Éxito:** diff ES/EN del embudo = 0 líneas duplicadas · build falla ante contenido incompleto · deploy por Action verificado · sitio en vivo idéntico píxel a píxel (regresión visual manual).

## F2 · Sistema de diseño
**Objetivo:** que un cambio de marca cueste 1 edición, no 30.
- `components/ui.tsx`: Button (3 variantes × 2 tamaños), Kicker, SectionHeading, Card [M-botones]
- `<BoltIcon>` (path oficial) reemplaza TODOS los ⚡ de UI [A16] + set de iconos SVG de marca (pin/escudo/chat/check) [M-iconos]
- Focus ring de marca global (O-a11y) · micro-interacciones CSS (sombra+desplazamiento, reveal-on-scroll con reduced-motion)
- Documentar el sistema en docs/DESIGN_SYSTEM.md
**Archivos:** components/ui.tsx, components/icons.tsx, globals.css, sweep de vistas
**Éxito:** grep de `rounded-full bg-volt` fuera de ui.tsx = 0 · cero U+26A1 en src/ · Lighthouse A11y se mantiene 100.

## F3 · Componentes (des-reactivación de islas)
**Objetivo:** las 3 islas React dejan de necesitar React (prerequisito de F8).
- Header → server component: menú móvil CSS/Popover API conservando aria-expanded/Escape/foco [A4, M-a11y-menú, M-targets 44px]
- request-form → form HTML + vanilla ~4KB: validación nativa + reglas de negocio (fechas locales RD [M-UTC], mínimo por zona, pasajeros vs plazas) + armado wa.me + **captura dual** [A2, A3-parcial, M-fricción]
- fleet-grid → rutas pre-filtradas /flota/{linea|plazas}/ (bonus SEO) o filtro vanilla
- A11y del formulario: foco+role=status en éxito [A21], aria-describedby/aria-invalid, aria-live en avisos [M]
**Archivos:** components/header.tsx, app/(es)/solicitar-disponibilidad/*, views/fleet.tsx, rutas nuevas de filtro
**Éxito:** `grep "use client" src/` = 0 (o solo shims vanilla) · flujo completo del formulario pasa E2E · VoiceOver anuncia el éxito.

## F4 · Layouts
**Objetivo:** chrome del sitio final y honesto.
- Barra CTA contextual (oculta/transformada en el formulario) [M]
- Promesa de respuesta en header del form y "Cómo funciona" (SLA que Kenny confirme) [M]
- Slot de testimonios oculto + bloque "Programa de Aliados" con jerarquía B2B (O-UI)
- Subtítulos EN inline reducidos a 1 por página (medible/reversible) [M-UI]
**Éxito:** capturas móvil/desktop aprobadas por Kenny · analytics segmentando por idioma activo.

## F5 · Catálogo
**Objetivo:** las fichas venden como Airbnb.
- Pipeline sharp: AVIF + 2 anchos + `<picture>`; upscale 2× interim para heros [A18-interim, M-AVIF]
- OG card por modelo/zona/home generada en build (1200×630 con marca y precio) [A17, M-OG]
- Titles transaccionales de fichas + description [B-titles]
- Galería multi-foto lista (estructura images[] por modelo) para la sesión real
- Chips de modelos por tier en /precios con prefill [M-callejón]
- **Página /venta + /en/golf-carts-for-sale** (O-SEO, ticket alto)
**Éxito:** share de WhatsApp muestra card de marca · LCP de fichas <3s ya en esta fase · /venta indexable.

## F6 · Formularios y conversión
**Objetivo:** cada solicitud cuenta y convence.
- Copy post-submit veraz + CTA "abrir WhatsApp" prominente [A19]
- Obligatorios a 4-5 campos; email opcional [M] · estimado de total en vivo [B-estimado] · precios en select
- Depósito 30% + garantía US$200 visibles en /precios y form [M] · urgencia estacional honesta [B]
- Búsqueda-first en hero (fechas+zona+pasajeros → form prefill) (O-UX)
**Éxito:** tasa de submit medida ANTES vs DESPUÉS (analytics de F0 lo permite) · 100% de leads con copia por email.

## F7 · SEO y contenido
**Objetivo:** capturar la demanda anglófona y rescatar el legado.
- Redirects de reservas.* (meta-refresh+canonical página a página; o 301 vía Cloudflare si se aprueba) [A8]
- Blog EN (4 espejos) + Blog en NAV.en + hreflang de artículos [A10] · calendario editorial EN
- H1s con keyword (eslogan→kicker) [M] · x-default→/en [B] · geo+hasMap en schema [A11-cierre]
- Landings de zona a 700-900 palabras (empezando Cap Cana y PCRC) [M] · interlinking blog↔zonas↔fichas [M]
**Éxito:** GSC sin errores hreflang · legado desindexándose · primeras impressions EN informacionales.

## F8 · Rendimiento
**Objetivo:** Perf ≥90 móvil en TODO el sitio (presupuestos PRD §8 como gate).
- Strip post-build de hidratación en páginas sin islas [A3] (habilitado por F3)
- Inter → system-ui [M-fuentes] · fetchpriority en heros [M] · verificación de presupuestos por página
- Plan B listo si el strip es frágil: decisión Astro documentada, NO ejecutada sin aprobación [PRD §8.7]
**Éxito:** Lighthouse CI: Perf ≥90, TBT <200ms, JS <50KB gzip en home/ficha/form · Web Vitals de campo confirmando.

## F9 · QA continuo (permanente desde F1)
- Vitest: daysBetween/validaciones/counterpartPath/priceFrom/schemas · Playwright E2E del flujo de conversión (payload wa.me correcto con zona y mínimos) [A14]
- axe-ci/pa11y sobre las 68+ páginas del out/ en cada deploy · Lighthouse CI con budgets
- Sesión manual VoiceOver iOS del flujo completo · checklist de regresión de marca (US$, PCRC, aliados)
**Éxito:** ningún deploy sin gates verdes; regresiones detectadas en CI, no en producción.

---

## Dependencias externas (de Kenny, no bloquean el resto)
1. **SLA de respuesta** a confirmar para la promesa pública (¿15 min?).
2. **Reseñas**: pedir a los próximos clientes vía link GBP (F0 lo habilita).
3. **Sesión de fotos real** de la flota — la mejora de conversión #1 que el código no puede hacer.
4. Decisiones marcadas (M/B): reducción de bilingüe inline, x-default→EN, Cloudflare proxy — cada una se propone en su fase con su justificación.
