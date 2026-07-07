# BOLT — UI/UX MASTER PLAN

> Fase de elevación visual a nivel *world-class* (referencia: 21st.dev, UI|UX Pro Max, Framer).
> **Objetivo:** experiencia premium sin sacrificar rendimiento. Cada animación aporta valor y
> mantiene **Lighthouse ≥ 90**. Documento para APROBAR antes de tocar código; luego rediseñamos
> sección por sección.

---

## 0. Auditoría del frontend — la verdad, sin adornos

Respuestas directas a tus preguntas, con evidencia del repo:

| Pregunta | Realidad hoy |
|---|---|
| ¿Usamos **Framer Motion**? | **No.** No está instalado (`package.json` solo tiene next/react/react-dom). |
| ¿Usamos **21st.dev**? | **No.** Cero componentes/dependencias. |
| ¿Usamos **UI \| UX Pro Max**? | **No.** |
| ¿Usamos **shadcn/ui**? | **No.** Tenemos primitivos propios (`components/ui.tsx`). |
| ¿Componentes genéricos? | Sí: tarjetas, botones y hero son *limpios pero planos*. Microinteracciones = solo `hover:scale-105` (22×) y `transition-transform` (32×). **0 keyframes, 0 scroll-reveal, 0 gradientes, 0 glass.** |
| ¿Qué no se siente premium? | El **hero** (una foto + texto, sin profundidad ni movimiento), la **navegación** (sólida, sin glass ni mega-menú), las **transiciones entre secciones** (aparecen de golpe, sin reveal), y la **falta de jerarquía de movimiento**. |
| ¿Microinteracciones que faltan? | Reveal al hacer scroll, stagger de entrada, zoom de imagen con máscara, hover con luz/tilt, feedback de foco premium, contadores, transición de página. |
| ¿Animaciones que faltan? | Entrada del hero (headline por palabras), parallax suave, gradientes vivos, reveal seccional, mega-menú animado. |
| ¿Secciones a rediseñar? | Hero (total), navegación + mega-menú (nuevo), tarjetas de modelo, /flota (catálogo), /precios, y los divisores entre secciones. |

### 🔴 El hallazgo que define esta fase (léelo antes que nada)

Tu sitio, tras F3 + F8, es **HTML estático con cero JavaScript de framework** (quitamos React del navegador para llevar el rendimiento móvil de 42-67 → objetivo ≥90). Eso es un logro enorme y es la razón por la que el sitio vuela hoy.

**Framer Motion, 21st.dev, UI|UX Pro Max y los componentes interactivos de shadcn son librerías de React: para funcionar necesitan re-hidratar el sitio** — es decir, **deshacer F8** y volver a cargar el runtime de React en cada página. Eso choca de frente con tu propia regla: *"no sacrifiques rendimiento por estética · Lighthouse > 90"*.

La buena noticia: **el 90% del *look* que producen 21st.dev y Framer hoy se logra con CSS moderno que cuesta 0 KB de JavaScript** (scroll-driven animations, `@property`, `backdrop-filter`, View Transitions, `:has()`). Podemos verte igual de premium **sin tocar el rendimiento**.

### 🧭 Tesis del plan: **CSS-first premium, islas quirúrgicas solo si aportan**

1. **Por defecto: CSS moderno (0 JS).** Reveal, stagger, parallax, glass, gradientes vivos, hover inteligente, transición de página — todo nativo. Perf se mantiene 95+.
2. **Un shim vanilla mínimo (~1-2 KB)** solo donde el CSS no llega (p. ej. `IntersectionObserver` de respaldo para navegadores sin `animation-timeline`, o cursor-spotlight). Es la misma arquitectura de shims que ya usamos (menú, formularios) — sin React.
3. **Isla React/Framer** solo como último recurso, en UNA sección de altísimo valor (si decides que vale), con su costo de hidratación **medido** y aislado. Presupuesto: que Lighthouse siga ≥90.

Usamos 21st.dev/Framer/UI|UX Pro Max como **referencia de diseño** y reconstruimos esos patrones en nuestro sistema CSS-first. Resultado: la estética de esas librerías, con el rendimiento de un sitio estático.

> **Decisión que necesito de ti:** ¿vamos 100% CSS-first (recomendado), o autorizas 1-2 islas React puntuales (hero/mega-menú) aceptando su costo medido? El plan abajo funciona para ambos; marco con 🏝️ lo que sería isla.

---

## 1. Sistema de diseño premium (la base de todo)

Antes de rediseñar secciones, elevamos los *tokens*. Esto solo cambia CSS/variables — cero JS.

- **Tipografía premium (item 12):** escala fluida con `clamp()` (headlines que respiran en cualquier viewport), tracking negativo en display (`-0.02em`), *text-wrap: balance/pretty*, ritmo vertical consistente. Bricolage se queda para display; cuerpo en system-ui (ya optimizado en F8). Añadir un peso/estilo para "eyebrows" y números (tabular-nums en precios).
- **Espaciado profesional (item 13):** escala de espaciado 4/8pt formalizada, secciones con `padding` fluido (`clamp`), *max-width* de lectura, aire generoso entre bloques (hoy algo apretado). Rejilla base de 12 columnas mental para alinear.
- **Motion tokens:** duraciones (120/240/480ms), *easings* premium (`cubic-bezier(.22,1,.36,1)` "out-expo", `(.16,1,.3,1)`), distancias de reveal estándar. Todo respeta `prefers-reduced-motion` (ya tenemos el reset).
- **Color y profundidad:** paleta actual (ink/volt/cream) + **capa de gradientes** (radiales/mesh con `@property` animable), sombras en escala (sm→2xl con tinte cálido), y estados de superficie (glass, elevado, hundido).
- **Elevación/glass:** definir `.glass` (backdrop-filter blur + borde translúcido + saturación) como utilidad de marca, usada con criterio.

Entregable: `docs/DESIGN_SYSTEM.md` ampliado + tokens en `globals.css`. **Sin regresión de rendimiento.**

---

## 2. Hero completamente nuevo (item 1)

**Hoy:** kicker + H1 + lead + 2 botones + una foto en caja. Plano, sin movimiento, sin profundidad.

**Premium:**
- **Fondo dinámico (item 11):** malla de gradiente ink→volt con brillo sutil que se mueve lentamente (CSS `@property` + `@keyframes`, 0 JS), o *spotlight* radial que sigue al cursor en desktop (shim ~0.5 KB). Grano/vignette sutil para textura cinematográfica.
- **Entrada del headline:** aparición palabra por palabra con *stagger* (CSS `@keyframes` + `animation-delay` calculado). El eslogan como *eyebrow* con línea que se dibuja.
- **Imagen con reveal (item 8):** la foto del Zycar entra con máscara (`clip-path`/`mask` animada) + *parallax* suave al hacer scroll (CSS `animation-timeline: scroll()`), con zoom lento perpetuo (Ken Burns) muy sutil. `fetchpriority=high` ya está (F5-C) → LCP protegido.
- **Buscador-first integrado (item 19, era O-UX de F6):** fechas + zona + pasajeros directamente en el hero → prellenan el formulario. Conversión desde el primer scroll-0.
- **Badges de confianza flotantes** con glass, entrando con stagger.
- 🏝️ *Opcional:* si quieres físca de resorte real en el parallax/tilt, esa sí sería isla Framer — pero el CSS scroll-timeline lo cubre al 95%.

**Guardarraíl:** el hero NO añade JS de framework; imagen prioritaria; animaciones GPU (`transform`/`opacity`) → sin *layout shift*, LCP intacto.

---

## 3. Navegación premium (item 2)

**Hoy:** barra sólida ink, sticky, con menú Popover en móvil. Funcional, no premium.

**Premium:**
- **Transparente→glass al hacer scroll:** header translúcido sobre el hero que gana `backdrop-filter` + fondo al bajar (CSS `scroll-timeline` o shim mínimo de ~0.4 KB; ya tenemos `header-enhance`).
- **Indicador de sección activa** con subrayado que se desliza (`:has()` / vanilla).
- **Microinteracción de links:** subrayado que crece desde el centro, con el amarillo de marca.
- **CTA con brillo:** botón "Solicitar" con *shine* al hover y micro-escala refinada (easing premium, no el `scale-105` genérico).
- **Foco premium** conservando accesibilidad (el anillo amarillo ya existe).

---

## 4. Mega menú (item 3)

**Nuevo.** Al hover/focus en "Flota" (desktop) y como panel expandible (móvil):
- Panel **glass** a ancho completo con: columnas por línea (ECO / Club Car / Zycar), cada modelo como mini-card con **foto que hace zoom al hover** y su **precio real** (ya tenemos precio por modelo), + accesos directos (Precios, Venta, Aliados).
- Entrada con *stagger* y *reveal* (CSS), cierre con Escape/click-fuera (patrón Popover que ya domino).
- 100% teclado-accesible (roles, focus trap ligero, aria-expanded).
- Técnica: `:has()`/Popover + CSS; sin React.

---

## 5. Cards premium (item 4)

**Hoy:** borde + imagen + texto + "Ver modelo →". Correctas pero estándar.

**Premium:**
- **Hover-lift** con sombra que crece y tinte cálido; **imagen con zoom + overlay de gradiente** que revela el precio/CTA.
- **Spotlight que sigue al cursor** (borde/luz radial con variables CSS + shim de 0.5 KB, o solo `:hover` sin JS).
- **Tilt 3D sutil** opcional (CSS `perspective` en hover; sin librería).
- **Badge de línea** con glass; **precio con tabular-nums** y micro-animación al entrar en viewport.
- **Reveal escalonado** de la rejilla al hacer scroll (item 6).
- Estados de foco y *touch* impecables (no depender solo de hover).

---

## 6. Catálogo premium — /flota (item 5)

**Hoy:** filtro por chips (radios CSS) + rejilla. Funciona; se ve básico.

**Premium:**
- **Filtro con transición fluida**: al cambiar filtro, las cards que salen/entran hacen *fade+scale* (CSS `@starting-style` + transitions, o View Transitions API — 0 JS). Hoy es *display:none* seco.
- **Contador animado** de resultados; barra de filtros *sticky* con glass.
- **Reveal escalonado** al cargar y al filtrar.
- **Vista destacada** del modelo más premium (ECO Track / ECO Cross premium) con tratamiento visual mayor.
- Mantener el filtro sin React (ya es CSS `:checked ~`).

---

## 7. Scroll Reveal en todo el sitio (item 6)

- Secciones y elementos entran con *fade + translateY + escala* al aparecer, con **stagger** por grupos.
- **Técnica primaria:** CSS `animation-timeline: view()` (nativo, 0 JS, *baseline* 2024).
- **Respaldo:** shim vanilla `IntersectionObserver` (~1 KB) para Safari/navegadores viejos → añade clase `.in-view`. Misma arquitectura de shims actual.
- `prefers-reduced-motion` → todo se desactiva (aparecen sin moverse).

---

## 8. Framer Motion avanzado (item 7) — el enfoque honesto

Lo que Framer hace (stagger, reveal, layout animations, spring, gestos) lo mapeamos así:
- **Stagger / reveal / parallax / entrada:** CSS scroll-driven + keyframes (0 JS). Cubre ~90% de lo que verías en un sitio Framer.
- **`layout` animations (reordenar/filtrar con transición):** **View Transitions API** nativa (0 JS de framework).
- **Física de resorte / drag / gestos complejos:** solo AQUÍ Framer aporta algo que el CSS no da limpio. Si decides que una interacción lo amerita (p. ej. un carrusel con arrastre e inercia), lo hacemos como **🏝️ isla** puntual con costo medido. Si no, lo omitimos: casi ningún sitio premium lo necesita para *convertir*.

**Recomendación:** empezar 100% CSS-first. Reevaluar islas Framer solo si, tras medir, sientes que falta "alma" en 1-2 interacciones concretas.

---

## 9. Animaciones de imágenes (item 8)

- **Reveal con máscara** (`clip-path`/`mask`) al entrar en viewport.
- **Zoom lento perpetuo** (Ken Burns) en hero y destacados, muy sutil.
- **Zoom al hover** en cards y mega-menú.
- **Blur-up / placeholder**: como usamos `<picture>` (F5-C), añadimos un *color/LQIP* de fondo para que no haya "flash" — percepción premium en la carga.
- **Parallax** de imágenes de sección con `scroll-timeline`.
- Todo con `transform`/`opacity` (GPU) → sin CLS, sin costo de LCP.

---

## 10. Hover inteligentes (item 9)

- **Cursor spotlight** en cards y hero (variable CSS `--x/--y`, shim 0.5 KB o `:hover` puro).
- **Magnetic buttons** (el CTA "atrae" ligeramente el cursor) — CSS o shim mínimo.
- **Underline reveal**, **icon nudge** (ya tenemos el `translate-x` de flechas → refinar easing), **glow** de marca.
- **Estados coherentes** táctil/teclado (no romper en móvil ni en foco).

---

## 11. Glassmorphism cuando aporte valor (item 10)

Con criterio (no en todo): **header al hacer scroll, mega-menú, badges flotantes del hero, barra de filtros sticky, y la barra CTA móvil**. Definimos `.glass` como utilidad de marca (blur + saturación + borde translúcido + fondo tintado). Cuidado de contraste AA sobre imágenes (probamos con `prefers-contrast`).

---

## 12. Fondos dinámicos (item 11)

- **Malla de gradiente animada** (ink + brillo volt) en hero y CTAs finales, con `@property` para animar *hue/position* suavemente (0 JS).
- **Divisores de sección** con degradados/wave sutiles en vez de cortes secos.
- **Ruido/grano** muy sutil (SVG/data-uri) para textura cinematográfica.
- **Respeta reduce-motion** (queda estático).

---

## 13. Responsive perfecto (item 14)

- Revisión mobile-first de cada sección rediseñada: *touch targets* ≥44px (ya en F2), tipografía fluida `clamp()`, mega-menú → panel móvil, hero legible sin *jank*.
- Probar 360 / 390 / 768 / 1024 / 1440. Sin scroll horizontal, sin *layout shift*.
- Animaciones más discretas en móvil (batería/CPU) — `@media (hover:hover)` para efectos de cursor.

---

## 14. Componentes 21st.dev / UI|UX Pro Max / shadcn (items 15, 16, 17)

Estrategia: **usarlos como referencia de diseño y reimplementarlos en nuestro sistema CSS-first** (misma estética, 0 hidratación). Candidatos a "portar":
- **Hero con gradiente animado + search** (estilo 21st.dev "hero-with-search").
- **Bento grid** para servicios/diferenciadores.
- **Marquee** de zonas/logos (CSS puro).
- **Animated tabs / segmented control** para el filtro de flota.
- **Testimonials/marquee** (cuando haya reseñas reales — slot ya listo).
- **shadcn**: patrones de *dialog/accordion/tooltip* → los interactivos como Popover/`<details>` nativos + CSS (ya lo hacemos con el menú).

Si prefieres importar los componentes React reales de estas librerías, eso implica hidratación (islas) y lo evaluamos caso por caso contra el presupuesto de Perf.

---

## 15. Accesibilidad (item 18)

- `prefers-reduced-motion`: TODA animación se degrada a aparición instantánea.
- Foco visible premium (anillo volt ya existe) en cada elemento nuevo (mega-menú, tabs).
- Contraste AA garantizado también sobre glass/gradientes.
- Navegación por teclado completa en mega-menú y filtros; `aria-*` correctos.
- Sin animación que dispare vestibular (nada de parallax agresivo).

---

## 16. Conversión (item 19)

La estética premium al servicio de reservar:
- **Buscador-first en hero** → menos fricción al formulario (prefill).
- **Precio + "confirmación el mismo día"** visibles con jerarquía (ya en F4/F6).
- **CTAs con mayor presencia** (shine, magnetismo) sin ser agresivos.
- **Prueba social** cuando haya reseñas (slot listo, F4).
- **Sensación de calidad = confianza** → un sitio que se siente premium sube la conversión en ticket alto (renta/venta de golf carts en zonas de lujo).
- Medir wa_click/form_submit **antes vs después** (analytics ya instrumentado).

---

## 17. Presupuesto de rendimiento (la regla que no se rompe)

Cada sección rediseñada pasa este *gate* antes de desplegar:
- **Lighthouse móvil ≥ 90** (Perf), **TBT < 200ms**, **CLS < 0.1**, **LCP < 2.5s**.
- Solo animar `transform`/`opacity` (GPU); nunca `width/height/top/left`.
- JS de framework por página: **0** por defecto; cualquier isla se justifica y se mide.
- `content-visibility`/`contain` en secciones largas para pintar menos.
- Verificación: build + medición (PageSpeed/Lighthouse) por sección. Si una animación baja el score, se ajusta o se descarta.

---

## 18. Roadmap de ejecución (sección por sección, como pediste)

Cada fase: rediseño → verificación de Perf ≥90 → tu visto bueno → deploy.

- **U0 — Sistema de diseño** (tokens: tipografía, espaciado, motion, glass, gradientes). Base de todo. Bajo riesgo.
- **U1 — Hero nuevo** (fondo dinámico, entrada, imagen reveal, buscador-first).
- **U2 — Navegación + Mega menú** (glass on scroll, mega-menú de flota).
- **U3 — Cards premium** (hover-lift, zoom, spotlight, reveal).
- **U4 — Catálogo /flota** (filtro con transición, sticky glass, reveal).
- **U5 — Scroll reveal global + divisores + fondos dinámicos** en todas las secciones.
- **U6 — /precios, /venta, /aliados** con el nuevo lenguaje visual.
- **U7 — Pulido responsive + a11y + medición final** (Lighthouse en las páginas clave).

---

## 19. Lo que necesito de ti para arrancar

1. **Aprobar este documento** (o pedir ajustes).
2. **Decisión de arquitectura:** ¿100% CSS-first (recomendado) o autorizas islas React puntuales en hero/mega-menú?
3. **Referencias visuales** (opcional pero valioso): 2-3 sitios/looks de 21st.dev o Framer que te enamoren, para calibrar el "sabor" exacto.

Con tu aprobación, empiezo por **U0 (sistema de diseño)** y luego **U1 (hero)**, cada uno verificado y desplegado, manteniendo Lighthouse ≥ 90.
