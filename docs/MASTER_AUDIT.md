# MASTER AUDIT — BOLT Golf Cars 3.0

**Fecha:** 6 de julio de 2026 · **Auditado:** boltgolfcars.com (producción) + repo `bolt-web`
**Método:** 9 auditores especializados en paralelo (arquitectura, UX, UI, SEO, performance, accesibilidad, código, seguridad, conversión) + verificación adversarial de cada hallazgo + medición Lighthouse real en producción.
**Resultado:** 61 hallazgos confirmados (13 refutados y descartados) · 45 fortalezas · 54 oportunidades.
**Detalle completo con evidencia archivo:línea:** [`AUDIT_DETALLE.md`](./AUDIT_DETALLE.md)

---

## 1. Resumen ejecutivo

| Métrica (Lighthouse móvil, producción) | Home | Ficha modelo | Formulario |
|---|---|---|---|
| **Performance** | **45** 🔴 | **42** 🔴 | **67** 🟠 |
| Accesibilidad | 100 🟢 | 100 🟢 | 100 🟢 |
| Best Practices | 100 🟢 | 100 🟢 | 100 🟢 |
| SEO | 100 🟢 | 100 🟢 | 100 🟢 |
| LCP | 4.3s | 5.1s | 3.1s |
| TBT | 1900ms | 1770ms | 1290ms |
| CLS | 0 | 0 | 0 |

**El diagnóstico en una frase:** la base técnica (SEO, accesibilidad, marca, arquitectura de contenido) es de nivel profesional; las tres brechas que separan a BOLT de "clase mundial" son **(1) performance móvil** (hidratación React innecesaria en páginas 95% estáticas), **(2) medición** (cero analytics: el embudo es invisible) y **(3) conversión desprotegida** (el lead se pierde si el usuario no completa el salto a WhatsApp, y no hay prueba social).

---

## 2. FODA global

### Fortalezas (lo que ya es clase mundial)
- **Contenido como fuente de verdad tipada** (`src/content/`): precios, zonas, modelos y textos separados de la presentación — el seam perfecto para CMS/Odoo futuro.
- **SEO técnico impecable**: hreflang recíproco, canonicals, sitemap con alternates, JSON-LD honesto (AutoRental/Product/FAQ/Breadcrumb), preview noindex automático.
- **Sistema de marca disciplinado**: tokens únicos (cero hex fuera de paleta), radios/kickers/CTAs 100% consistentes, contraste AA deliberado.
- **Transparencia comercial superior al sector**: precios con ITBIS calculado, "solicitud ≠ reserva" comunicado en todo el embudo, políticas por escrito.
- **Seguridad de base sólida**: cero secretos en el repo e historial, XSS cubierto, 0 vulnerabilidades de dependencias, HTTPS forzado.

### Debilidades (lo que nos frena hoy)
- Performance móvil 42-67: React hidrata 68 páginas que casi no tienen interactividad (~545KB de framework JS por página; TBT 1.3-1.9s).
- Cero analytics: imposible saber qué página convierte, cuántos abandonan el formulario o si el score de performance afecta ventas.
- Embudo ES/EN duplicado (~640 líneas clonadas) con divergencia ya presente; 4 patrones i18n conviviendo.
- Fotos heredadas de 715-743px: blandas en heros retina, con artefactos de generación IA visibles; 1 sola foto por modelo.
- Prueba social ausente en el 100% del embudo (correcto no inventarla — pero falta el motor para generarla: Google Business Profile).

### Oportunidades (el mayor valor no capturado)
1. **"Cero hidratación"**: convertir las 3 islas React a HTML+vanilla y despojar el runtime → Perf 90-98 estimado, sin cambiar hosting, costo $0.
2. **Captura dual del lead** (endpoint gratuito + WhatsApp): ninguna solicitud abandonada se pierde + primera métrica real de conversión.
3. **Google Business Profile + circuito de reseñas post-entrega**: Map Pack local (domina esta SERP), testimonios reales en 60-90 días.
4. **Blog EN + página /venta**: la demanda dominante es anglófona y "golf cart for sale punta cana" (ticket de miles de US$) no tiene página.
5. **Sesión de fotos real de la flota**: el activo de conversión más débil; habilita heros, OG cards, galería y redes de una vez.
6. **Cloudflare free delante de GitHub Pages**: headers de seguridad completos, analytics sin cookies, redirects 301 del legado — sin migrar nada.

### Riesgos (lo que puede hacer daño)
- **Suplantación del flujo de depósito**: sin SPF/DMARC cualquiera envía correos "desde" boltgolfcars.com con cuentas falsas; /deposito sin ancla antifraude. *(Mitigación: 10 minutos de DNS + un párrafo.)*
- **reservas.boltgolfcars.com vivo e indexable**: compite por las mismas keywords contra el sitio nuevo.
- **Deploy manual sin CI**: bus-factor de 1, sin gate de lint/build, riesgo de publicar producción con env sucio.
- **Contenido EN fragmentado** (DESC_EN/META_EN paralelos): un modelo nuevo sin traducción genera "undefined" silencioso en meta y schema.
- **Dominio sin verificar en GitHub**: si Pages se desactiva, otro usuario podría reclamar el dominio (vector de phishing).

---

## 3. Hallazgos por prioridad

### 🔴 PRIORIDAD ALTA (23) — atacar primero

| # | Dim | Hallazgo | Esfuerzo |
|---|---|---|---|
| A1 | Conversión | Cero analytics: el embudo completo es invisible | bajo |
| A2 | Conversión/UX | El lead se pierde sin rastro si WhatsApp no abre o el usuario no envía; el sitio dice "Solicitud enviada" antes de que sea verdad | medio |
| A3 | Performance | 545KB de framework JS hidratando 68 páginas casi estáticas (causa del Perf 42-45) | medio |
| A4 | Performance | header.tsx `use client` en ambos layouts fuerza hidratación global | medio |
| A5 | Performance | Vercel NO es la palanca (el cuello es CPU cliente, no red/imagenes) — evitar esa inversión | bajo |
| A6 | Seguridad | Sin SPF/DMARC en boltgolfcars.com: suplantación de correo trivial con cuentas bancarias publicadas | bajo |
| A7 | Seguridad | /deposito sin advertencia antifraude ("nunca cambiaremos la cuenta") | bajo |
| A8 | SEO | reservas.* vivo, indexable, sin canonical/redirect: canibalización | bajo |
| A9 | SEO | Search Console sin configurar | bajo |
| A10 | SEO | Cero blog EN cuando la demanda dominante es anglófona | medio |
| A11 | SEO | Sin Google Business Profile ni geo en schema: invisible en Map Pack | bajo |
| A12 | Arquitectura | Embudo ES/EN duplicado (~640-1000 líneas) con drift ya visible | medio |
| A13 | Arquitectura | Precios hardcodeados en schema.ts y blog.ts desincronizables de pricing.ts | bajo |
| A14 | Código | Cero tests y cero CI; deploy = push forzado manual | medio |
| A15 | Código | DESC_EN/META_EN paralelos sin verificación de claves → "undefined" silencioso | bajo |
| A16 | UI | Dos "rayos" conviven: SVG oficial vs emoji ⚡ (13 en el home; en Android sale naranja) | bajo |
| A17 | UI | og:image para WhatsApp (el canal de conversión) es foto 728×740 sin marca | bajo |
| A18 | UI | Fotos 715-743px insuficientes para heros retina + artefactos IA visibles | alto |
| A19 | UX | "Solicitud enviada" prematuro (ver A2) + copy post-submit engañoso | bajo |
| A20 | UX | Sin analytics (par de A1 desde UX) | bajo |
| A21 | A11y | Mensaje de éxito del formulario no recibe foco ni se anuncia (SR en silencio en LA pantalla de conversión) | bajo |
| A22 | Conversión | Performance móvil crítica en páginas de entrada (par de A3 desde negocio: LCP 5s mata sesiones) | alto |
| A23 | Seguridad | *(pendiente confirmar)* Dominio posiblemente sin verificar en GitHub → riesgo de takeover si Pages se desactiva | bajo |

### 🟠 PRIORIDAD MEDIA (29) — la capa de pulido que se nota

**UX/Conversión:** /precios sin enlaces a modelos (callejón sin salida) · formulario no cruza pasajeros vs plazas ni muestra precios en el select · barra CTA autorreferente tapa el formulario · email obligatorio innecesario · sin promesa de tiempo de respuesta · depósito 30%+US$200 oculto hasta el chat · 7 campos obligatorios (bajar a 4-5) · prueba social ausente (motor GBP).
**Performance:** request-form (395 líneas React) para armar un link de WhatsApp · Inter variable completa (~140KB) para texto de cuerpo · heros JPG sin AVIF ni fetchpriority.
**SEO:** OG image única para 68 páginas · interlinking editorial nulo (blog ↔ zonas ↔ fichas) · H1 del home sin keyword · landings de zona delgadas (300-350 palabras vs 700-900 de la competencia).
**A11y:** errores sin aria-describedby/aria-invalid · menú móvil sin Escape ni devolución de foco · targets táctiles 30-40px en header (hamburguesa y switcher).
**Código:** precios en schema (par A13) · 31 botones copy-paste con 7 paddings distintos (falta ui.tsx) · min de fecha en UTC bloquea "hoy" desde las 8pm hora RD.
**Arquitectura:** 4 patrones i18n conviviendo · deploy manual (par A14).
**Seguridad:** sin headers CSP/HSTS (límite de GH Pages; Cloudflare free los resuelve) · DMARC de krexpert.com en p=none.
**UI:** subtítulos EN en itálica duplican texto y debilitan jerarquía (decisión de negocio: medir) · iconografía emoji del sistema (📍🛡️💬✓).

### 🟡 PRIORIDAD BAJA (9) — deuda menor documentada

Assets del scaffold publicados (next.svg, vercel.svg…) · titles de fichas sin keyword transaccional · x-default apunta a ES (decisión de negocio: cambiar a /en) · ⚡ sin aria-hidden en submit/FAQ · filtros de flota sin aria-live · FAQ sin headings en summary · dos root layouts con 56 líneas duplicadas · prosa larga embebida en TS (blog 385 líneas, soporte 321) · urgencia honesta de temporada alta sin usar · estimado de precio no mostrado pese a tener los datos.

---

## 4. Lo que la auditoría REFUTÓ (no perder tiempo aquí)

13 hallazgos propuestos fueron descartados con evidencia, entre ellos: migrar a Vercel por performance (ataca el problema equivocado), quitar el patrón bilingüe inline como "error" (es intencional de marca — aunque su *intensidad* sí es hallazgo UI), varios falsos positivos de contraste y de enlaces.

---

## 5. Recomendación estratégica del CTO

1. **Aprobar el PRD y ejecutar el roadmap en el orden propuesto** — arquitectura primero (consolidación de views + contenido unificado) porque abarata TODAS las fases siguientes.
2. **Las 6 acciones de "primera semana"** (independientes entre sí, esfuerzo bajo, impacto alto): SPF/DMARC + verificación de dominio GitHub + aviso antifraude en /deposito + Search Console + analytics + Google Business Profile.
3. **La meta medible del 3.0:** Performance móvil ≥90 en todo el sitio, cero leads perdidos, y el motor de reseñas girando — antes de la temporada alta (reservas de agosto-octubre para diciembre).
