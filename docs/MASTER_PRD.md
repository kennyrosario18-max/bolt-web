# MASTER PRD — BOLT Golf Cars 3.0

**Versión:** 1.0 · 6 de julio de 2026 · **Estado:** pendiente de aprobación de Kenny
**Este documento es la fuente oficial del proyecto.** Cualquier decisión de producto o desarrollo se valida contra este PRD. Se actualiza solo con aprobación explícita.

---

## 1. Visión

Convertir **boltgolfcars.com** en la mejor plataforma de alquiler de golf cars del Caribe: la experiencia digital que un huésped de villa en Puntacana Resort & Club, Cap Cana o Bávaro espera de una empresa tecnológica — instantánea, elegante, honesta y que convierte visitantes en conversaciones de WhatsApp que terminan en carritos entregados.

**No es un rediseño.** Es la evolución del 2.0 (lanzado 5-6/jul/2026, auditado con 100/100/100 en A11y/BP/SEO) hacia excelencia en las tres brechas medidas: performance, medición y conversión protegida.

## 2. Objetivos y KPIs

| Objetivo | Métrica | Hoy | Meta 3.0 |
|---|---|---|---|
| Velocidad clase mundial | Lighthouse Perf móvil | 42-67 | **≥90 en todas las páginas** |
| LCP en páginas de entrada | LCP móvil (lab) | 4.3-5.1s | **<2.5s** |
| Cero leads perdidos | Solicitudes con copia registrada | 0% | **100%** |
| Embudo medible | Eventos de conversión instrumentados | 0 | form_submit, wa_click (por página), tel_click |
| Prueba social | Reseñas Google verificables | 0 | ≥15 (motor post-entrega girando) |
| SEO internacional | Páginas EN indexables de contenido | 0 artículos | 4 artículos + /venta EN |
| Mantenibilidad | Líneas duplicadas ES/EN en embudo | ~640 | **0** (views compartidas) |
| Protección | SPF/DMARC, dominio verificado, CI con gates | ✗ | ✓ |

## 3. Branding (invariable — fuente: sistema v2)

- Amarillo único **#FFD60A** · ink #0a0a0a · crema #FFFBEA · verde/rojo AA (#15803d/#b91c1c).
- **Bricolage Grotesque** para titulares/wordmark; cuerpo migra a system-ui (decisión performance §8).
- Rayo SIEMPRE antes del wordmark; **se elimina el emoji ⚡ de la UI** → `<BoltIcon>` con el path SVG oficial (el emoji rompe el amarillo único según el OS).
- Eslogan "Your ride in paradise." pasa a **kicker** del hero; el H1 se vuelve descriptivo con keyword ("Renta de golf carts premium en Punta Cana"). *Regla de marca intacta: el eslogan sigue siendo lo primero que se lee.*
- Dirección de arte: heros premium negro + secciones "marcador eléctrico" en claro. Sin cambios.
- Moneda siempre "US$". PCRC siempre primero. Tarifas de aliados jamás públicas.

## 4. Arquitectura

**Se mantiene:** Next.js 16 App Router + TypeScript + Tailwind 4, **export estático**, contenido tipado en `src/content/` como única fuente de verdad, dos root layouts (es)/(en) para lang correcto.

**Hosting — decisión:** GitHub Pages ($0). **Vercel descartado**: Hobby prohíbe uso comercial y Pro (US$20/mes) no ataca el cuello real (CPU cliente, no red). **Evolución opcional aprobable por separado:** Cloudflare free como proxy (headers de seguridad completos, analytics, redirects 301 del legado) sin cambiar el origen.

**Cambios estructurales (Fase A del roadmap):**
1. **Views compartidas para el embudo completo** (home, fleet, model, pricing, services, zone, request) con prop `locale` — patrón ya probado en las 8 institucionales. Páginas = wrappers de metadata (~15 líneas).
2. **Un solo patrón i18n:** `Record<Locale, T>` en `src/content/` (se eliminan los sufijos `*En` y los dicts paralelos DESC_EN/META_EN). Tercer idioma futuro = rellenar diccionarios + árbol de wrappers.
3. **Precios derivados:** schema.ts y cualquier consumidor calculan low/high/offerCount desde `PRICE_GROUPS`; check de build que falla si blog menciona un importe que no existe en pricing.ts.
4. **Checks de integridad en build:** todo modelo tiene desc EN, imagen, batería; toda zona tiene meta EN.
5. **CI/CD:** GitHub Actions = typecheck + lint + build + checks + deploy a gh-pages con `BASE_PATH` explícito por entorno. Scripts locales quedan de fallback.

## 5. UX (principios y decisiones)

1. **La verdad primero:** el estado de éxito del formulario solo se afirma cuando es verdad → copy "Tu solicitud está lista en WhatsApp — presiona ENVIAR", con reabrir wa.me como CTA principal, y **captura dual del lead** (endpoint gratuito → info@krexpert.com en paralelo al deep-link).
2. **Menos fricción:** obligatorios bajan a nombre + fechas + zona + pasajeros (email/WhatsApp opcionales); aviso no bloqueante pasajeros>plazas; precios "desde US$X/día" en el select de modelo; **estimado de total en vivo** (noches × tarifa + ITBIS + regla de entrega).
3. **Expectativas medibles:** promesa de respuesta visible ("Respondemos en menos de 15 minutos, 24/7" — Kenny confirma el SLA) junto al submit y en "Cómo funciona".
4. **Sin callejones:** /precios enlaza modelos por tier con chips + CTA prefill; barra CTA móvil se oculta en la página del formulario.
5. **Transparencia completa:** depósito 30% + garantía US$200 visibles en /precios y bajo el submit — nunca descubiertos en el chat.
6. **Urgencia solo honesta:** aviso estacional con datos reales de flota (6 plazas se agotan en diciembre-enero).

## 6. UI (sistema)

- **`components/ui.tsx`:** Button (primary/outline/dark × 2 tamaños), Kicker, SectionHeading, Card — reemplaza 31 botones copy-paste con 7 paddings.
- **`<BoltIcon>` + set de 5-6 iconos SVG de marca** (rayo, pin, escudo, chat, check; stroke 1.5-2px) — fuera emojis del sistema.
- **Densidad bilingüe:** los subtítulos EN inline se reducen a un punto estratégico por página (hero); el resto confía en el switcher. *Reversible: se mide con analytics de idioma.*
- **OG cards 1200×630 generadas en build** (ink + rayo + wordmark + foto + precio) para home, 11 fichas, 5 zonas y blog — cada share de WhatsApp es un anuncio.
- **Fotografía:** interim = upscale 2× de los heros; definitivo = **sesión real de flota** (misma luz, ángulo ¾, villas reales, 1600px+). Prioridad de negocio, no de código.
- Focus ring de marca unificado (`*:focus-visible` volt/ink).
- Slot de testimonios diseñado y oculto hasta tener reseñas reales (condicionado a `content/testimonials.ts`).

## 7. SEO (estrategia)

- **Rescate del legado:** reservas.* → 301/meta-refresh+canonical página a página. Transfiere señales en vez de canibalizar.
- **Fundación de descubrimiento:** Search Console (verificación DNS) + Bing + **Google Business Profile** (categoría "Golf cart rental service") + geo/hasMap en schema.
- **Contenido EN:** espejo de los 4 artículos + calendario keyword-first ("how to get around punta cana without a car", "cap cana golf cart rules"…), Blog en NAV.en.
- **Página /venta + /en/golf-carts-for-sale:** captura la demanda de ticket alto que hoy no tiene página.
- **On-page:** H1s con keyword (eslogan a kicker), titles de fichas con plantilla transaccional ("Renta {modelo} — golf cart en Punta Cana"), landings de zona a 700-900 palabras con lo que solo BOLT sabe, interlinking blog↔zonas↔fichas, x-default → **/en** (cliente objetivo internacional).
- **Nunca:** inventar reseñas/ratings; aggregateRating solo con reseñas reales.

## 8. Performance (presupuestos y plan)

**Presupuesto por página:** JS ejecutable <50KB gzip · LCP <2.5s móvil lab · TBT <200ms · CLS 0 (mantener).

**Plan "cero hidratación" (la palanca correcta, medida):**
1. Header → server component (menú móvil CSS/Popover API; switcher por prop de build + mini-script solo para ?modelo).
2. request-form → `<form>` HTML + script vanilla ~4KB (validación nativa + armado wa.me + captura dual).
3. fleet-grid → rutas estáticas pre-filtradas (/flota/eco/, /flota/6-plazas/ — bonus SEO) o filtro vanilla.
4. **Paso post-build** que despoja los scripts de hidratación de páginas sin islas (conserva JSON-LD). Resultado estimado: Perf 92-98.
5. Fuentes: Inter fuera (system-ui para cuerpo; Bricolage intacta) = ~140KB menos.
6. Imágenes: pipeline sharp en build → AVIF + 2 anchos + `<picture>`; `fetchpriority=high` en heros.
7. **Plan B documentado:** si el strip resulta frágil entre versiones de Next → migración a Astro (islands) reutilizando content/views; NO Vercel.
8. Analytics con Web Vitals de campo (CrUX real de turistas) valida cada paso.

## 9. Componentes (inventario objetivo)

`ui.tsx` (Button/Kicker/SectionHeading/Card) · `BoltIcon` + iconos marca · `Header` (server) · `Footer` · `MobileCta` · `ModelCard` · `PriceEstimator` · `TestimonialsSlot` · `OgCard` (build-time) · views: home/fleet/model/pricing/services/zone/request + 8 institucionales.

## 10. Librerías (permitidas)

**Producción:** next, react, react-dom — nada más sin aprobación.
**Build/dev:** tailwindcss, sharp (imágenes), satori o node-canvas (OG cards), vitest, playwright, axe-core/pa11y-ci, lighthouse-ci.
**Servicios externos ($0):** Cloudflare Web Analytics o Umami (Oracle free), Web3Forms/Formspree free (captura dual), Google Search Console/Business Profile.
**Explícitamente descartados:** Vercel Pro, CMS de pago, framer-motion en runtime (las micro-interacciones del 3.0 son CSS; se reevalúa si una fase futura lo justifica).

## 11. Roadmap (resumen — detalle en MASTER_ROADMAP.md)

F0 Protección y medición → F1 Arquitectura → F2 Sistema de diseño → F3 Componentes → F4 Layouts → F5 Catálogo → F6 Formularios/conversión → F7 SEO/contenido → F8 Rendimiento → F9 QA continuo.

## 12. Reglas de desarrollo

1. Nunca eliminar funcionalidades, rutas, contenido útil ni branding sin aprobación explícita.
2. Nunca romper el SEO existente: canonicals/hreflang/sitemap se verifican en cada fase; URLs actuales son permanentes.
3. Cada fase: explica qué hará → lista archivos a tocar → justifica decisiones → verifica que nada se rompa (build + checks + spot-check en vivo) → documenta.
4. Todo dato de negocio (precio, zona, batería, contacto) vive SOLO en `src/content/` — jamás hardcodeado en vistas.
5. Todo texto visible existe en ES y EN (patrón `Record<Locale>`); nada de "undefined" silencioso: los checks de build lo bloquean.
6. Reutilizar antes de crear; `ui.tsx` antes que clases copy-paste.
7. Accesibilidad no regresa: axe-ci en CI; los patrones conquistados están documentados en AGENTS.md.
8. Presupuestos de performance del §8 son gate de CI, no aspiración.
9. Si una mejor práctica contradice una instrucción de Kenny: explicar y esperar aprobación (esta regla ya se aplicó en este PRD — ver §3 H1/eslogan y §13 Fase 0).
10. Deploy solo por CI o scripts del repo; commits descriptivos; docs/ actualizado por fase.

## 13. Integraciones futuras (preparadas, no construidas)

- **Odoo/CRM:** la captura dual del lead es el puente natural (payload → API mínima en Oracle free/Cloudflare Workers → lead en Odoo). El formulario está aislado: cambio local de ~30 líneas.
- **Pagos del depósito 30%:** link de pago en la confirmación de WhatsApp (proveedor por definir con el banco); el sitio no procesa pagos.
- **CMS por etapas:** blog a archivos → Decap CMS (gratis, edita commits) para que Kenny toque precios/artículos sin código → headless solo si el negocio lo exige.
- **Asistente WhatsApp (bolt-assistant):** consumirá `src/content/` como base de conocimiento — otra razón para la unificación de contenido.
- **Disponibilidad en vivo:** cuando exista la API, el formulario muestra disponibilidad real por fechas antes del submit.

---

*Nota de método: dos instrucciones del brief se ajustaron con justificación esperando aprobación — (1) se antepone una Fase 0 de protección/medición al orden mandado (arquitectura primero) porque SPF/DMARC y analytics protegen el negocio YA y los datos guían el resto; (2) el H1 del home deja de ser el eslogan por SEO, conservando el eslogan como primer texto visible. Aprobar este PRD aprueba ambas.*
