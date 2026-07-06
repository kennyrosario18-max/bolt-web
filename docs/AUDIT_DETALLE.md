

# ARQUITECTURA

## Fortalezas
- Capa de contenido separada y tipada como fuente de verdad: /src/content/site.ts (contacto, zonas, PRICING, waLink), models.json + wrapper tipado (models.ts:10-25), pricing.ts y zones-landing.ts con validación byId que lanza error en build si una zona no existe (zones-landing.ts:22-26). Es exactamente el seam correcto para un CMS futuro: las vistas nunca hardcodean datos de negocio.
- Patrón de vistas compartidas ya probado en las 8 páginas institucionales: src/views/{about,faq,support,contact,policy,deposit,terms,privacy}.tsx reciben prop locale y las páginas ES/EN quedan en 13 líneas solo con metadata (ej. app/(es)/nosotros/page.tsx). La solución a la duplicación del embudo ya existe dentro del propio repo.
- JS de cliente mínimo y deliberado: solo 3 componentes 'use client' (header.tsx, fleet-grid.tsx, request-form.tsx). El formulario resuelve bien el caso sin backend: honeypot anti-spam (request-form.tsx:197-201), validación de mínimo de días por zona (líneas 210-213), preselección ?modelo= post-mount para no romper el export estático (líneas 158-161) y fallback visible si WhatsApp no abre (líneas 227-238).
- SEO técnico de nivel profesional para un sitio artesanal: hreflang recíproco centralizado (lib/i18n.ts:46-54), sitemap con alternates por par ES/EN y prioridades por rol en el embudo (app/sitemap.ts:14-27), JSON-LD centralizado (lib/schema.ts: AutoRental, Product con AggregateOffer, FAQ, Breadcrumb), y el mecanismo IS_PREVIEW (lib/site-url.ts) que hace el preview noindex y producción indexable con una sola variable.
- Design tokens de marca centralizados en globals.css con @theme de Tailwind 4 (líneas 5-34): paleta única BOLT documentada con ajustes de contraste AA anotados (#15803d, #b91c1c), tipografías como variables y prefers-reduced-motion global. La coherencia visual del sitio es barata de mantener y de portar.

## Hallazgos
### [ALTA|riesgo|esfuerzo medio] Embudo completo duplicado ES/EN: ~1,000 líneas de JSX clonado que ya empezaron a divergir
EVIDENCIA: diff entre app/(es)/page.tsx (248 líneas) y app/en/page.tsx (238) da 258 líneas de diferencia sobre archivos casi idénticos; igual flota/[id] (208 vs 205), precios (122 vs 105, diff 117), servicios (126 vs 114), alquiler/[zona] (150 vs 177). Divergencia real ya presente: STEPS en ES tiene subtítulo bilingüe (page.tsx:22-41) y en EN lo perdió; en/pricing dejó de renderizar secciones que ES sí tiene (17 líneas menos).
RECOMENDACIÓN: Extraer views/home.tsx, views/model.tsx, views/fleet.tsx, views/pricing.tsx, views/services.tsx y views/zone.tsx con prop locale — el mismo patrón que ya usan las 8 institucionales. Los textos van a diccionarios Record<Locale> como ya hace request-form.tsx (T en líneas 9-113). Cada page.tsx queda en ~13 líneas. Sin esto, cada cambio de copy/CTA/precio se aplica dos veces y tarde o temprano solo una.

### [ALTA|riesgo|esfuerzo bajo] El precio máximo (US$85) y los tiers viven hardcodeados en 3 lugares además de pricing.ts
EVIDENCIA: lib/schema.ts:34 (priceRange: `US$...–US$85`) y schema.ts:59-60 (highPrice: model.pax >= 6 ? 85 : 65, offerCount literal); content/blog.ts:66-67 repite en prosa 'Desde US$50/día (Budget)... US$85/día (Premium)' y blog.ts:47 el cargo de entrega US$40+ITBIS que también está en pricing.ts:80.
RECOMENDACIÓN: Derivar priceRange/highPrice/offerCount de PRICE_GROUPS (content/pricing.ts) con un helper maxPrice(pax), y añadir al workflow de blog una regla: los importes en artículos se citan desde content/pricing.ts o se listan en un checklist de 'precios mencionados' por artículo. Hoy una subida de tarifa dejaría el JSON-LD (que Google lee) y el blog contradiciendo la página de precios.

### [MEDIA|debilidad|esfuerzo alto] Perf móvil 42-45 causada por arquitectura, no por bugs: React hidrata páginas 95% estáticas
EVIDENCIA: Lighthouse móvil hoy: TBT 1900ms, bootup JS 2.5s, main-thread 6.9s; 800KB de JS (chunks de 227KB/150KB/112KB en out/_next/static/chunks) para páginas cuyo único JS útil es el menú móvil y el switcher (header.tsx). unused-js ~28KB confirma que no hay grasa que recortar dentro de Next: es el runtime React+Next hidratando todo el árbol en cada página del export estático.
RECOMENDACIÓN: No perseguir micro-optimizaciones dentro de Next (techo bajo: ~28KB de JS sin usar). Dos caminos honestos: (a) aceptar el lab score y validar con datos de campo (CrUX/analytics) si los usuarios reales — turistas con buen móvil — sufren, antes de invertir; (b) si se confirma impacto en conversión, migrar el shell a arquitectura de islas (Astro soporta React para las 3 islas existentes) reutilizando /content y /views casi intactos: dejaría ~30-50KB de JS por página y Perf >90. La estructura actual (contenido separado, 3 islas claras) hace esa migración de días, no semanas.

### [MEDIA|debilidad|esfuerzo medio] Cuatro patrones i18n conviviendo: añadir un tercer idioma hoy costaría tocar todo el proyecto
EVIDENCIA: Patrón 1: campos con sufijo (blurb/blurbEn, note/noteEn en site.ts:31-73; faqs/faqsEn, heroTitle/heroTitleEn en zones-landing.ts:6-20; name/nameEn en pricing.ts). Patrón 2: Record<Locale> (request-form.tsx:9, fleet-grid.tsx:14, views/faq.tsx:6). Patrón 3: árboles de páginas paralelos (es)/en. Patrón 4: JSX bilingüe inline con <p lang="en"> (app/(es)/page.tsx:63-65, 107).
RECOMENDACIÓN: Al consolidar el embudo en views (hallazgo 1), normalizar todo contenido bilingüe a Record<Locale, T> — un solo patrón. Con eso, un idioma nuevo (francés para el mercado canadiense, p.ej.) es: extender el tipo Locale, rellenar diccionarios y generar un árbol app/fr de páginas de 13 líneas. Con el estado actual habría que reformar 5 interfaces de contenido y duplicar por tercera vez ~1,000 líneas de JSX.

### [MEDIA|riesgo|esfuerzo bajo] Deploy de producción manual desde la laptop, sin CI y dependiente del entorno local
EVIDENCIA: scripts/deploy-prod.sh: PATH hardcodeado a ~/.nvm/versions/node/v24.18.0, git push -f a gh-pages con credenciales locales; no existe .github/workflows (verificado: 'NO WORKFLOWS'). Además el switch preview/producción depende de que BASE_PATH no esté definido en el shell (next.config.ts:5 + lib/site-url.ts:5): un build con env sucio publicaría producción con robots noindex y canonicals al preview.
RECOMENDACIÓN: GitHub Action (gratis en repo público) que en push a main haga npm run build + deploy a gh-pages con actions/deploy-pages, con BASE_PATH controlado explícitamente por el workflow. Elimina el bus-factor (solo Kenny puede publicar hoy), la dependencia de la versión de Node local y el riesgo de env sucio. El script actual queda como fallback.

### [BAJA|debilidad|esfuerzo bajo] Assets del scaffold de Next publicados en producción y fuentes cargando peso de sobra
EVIDENCIA: public/ contiene next.svg, vercel.svg, globe.svg, file.svg y window.svg (restos de create-next-app) que se copian al out/ desplegado; out/_next/static/media pesa 372KB en woff2 — Bricolage a 3 pesos (layout.tsx:10-14) + Inter variable completa para un sitio que usa mayormente 400/600/700.
RECOMENDACIÓN: Borrar los 5 SVGs del scaffold. En fuentes: cargar Inter con axes/pesos acotados y evaluar si Bricolage necesita los 3 pesos (600 y 800 se usan; verificar 700). Ganancia modesta (~100-150KB en primera visita) pero gratis; las fuentes no son el cuello principal (es la hidratación), así que no priorizar sobre los hallazgos 1-3.

## Oportunidades
- Analytics de conversión sin backend, hoy inexistente: no se puede saber cuántos visitantes llegan al formulario ni cuántos abren WhatsApp. Cloudflare Web Analytics (gratis, sin cookies, compatible con GitHub Pages vía snippet) o Plausible/GA4, con eventos en el submit del formulario y en cada waLink. Es el prerequisito para decidir con datos todo lo demás (incluida la inversión en performance).
- Sobre hosting — quedarse en GitHub Pages es la decisión correcta HOY: gratis, sin backend que servir, deploy simple. El trade-off real con Vercel: el plan Hobby prohíbe uso comercial (BOLT lo es), así que Vercel legalmente significa Pro a US$20/mes por ganar image optimization, headers y previews — no lo vale para un sitio estático de conversión por WhatsApp. El movimiento con mejor ratio si se quiere más: Cloudflare Pages (gratis para uso comercial, headers/redirects, analytics incluido y Functions para APIs futuras) sin cambiar nada del build.
- Integración Odoo/pagos sin migrar el sitio: mantener el front estático y montar una API mínima (disponibilidad real por fechas, link de pago del depósito 30%) en el Oracle free tier ya previsto para bolt-assistant, o en Cloudflare Workers. El formulario está perfectamente aislado en request-form.tsx: cambiar 'abrir WhatsApp' por 'POST a la API + WhatsApp' es un cambio local de ~30 líneas. La arquitectura actual ya está preparada para esto.
- Pipeline de imágenes en build: con images.unoptimized=true nadie genera variantes — las fotos 720px del catálogo anterior se sirven tal cual. Un script de build con sharp que produzca AVIF/WebP en 2-3 tamaños + <picture> en ModelCard mejora fichas y home sin tocar hosting. Combinar con sesión de fotos propia (el activo que más vende en renta premium y el más débil heredado).
- Camino CMS por etapas aprovechando que /content ya es la fuente de verdad tipada: (1) blog a archivos MDX/JSON individuales, (2) Decap CMS (gratis, edita commits en GitHub) sobre models/zones/blog para que Kenny edite precios y artículos desde el navegador sin tocar código, (3) solo si el negocio lo exige, headless CMS real. Ninguna etapa obliga a cambiar hosting ni framework.
- Testimonios y prueba social cuando lleguen las reseñas reales: reservar desde ya el slot en las views (sección vacía condicionada a content/testimonials.ts) y añadir aggregateRating al JSON-LD de LOCAL_BUSINESS solo cuando existan reseñas verificables — el schema.ts centralizado hace que sea un cambio de un archivo.


# UX

## Fortalezas
- El proceso 'solicitud ≠ reserva' está comunicado con consistencia ejemplar en todo el embudo: hero del formulario ('Ninguna reserva se confirma automáticamente — siempre te responde una persona'), CTA final del home ('Nunca confirmamos automáticamente'), nota pre-submit ('Al enviar se abrirá WhatsApp con tu solicitud lista — solo presiona enviar') y FAQ '¿Cómo se confirma mi reserva?' con el depósito 30% + saldo a la entrega. Pocas PYMEs logran esta claridad.
- Recorrido a conversión corto y bien instrumentado: desde cualquier página son 2 taps al formulario (CTA sticky móvil o header) y el prefill ?modelo= desde la ficha funciona (verificado en el chunk 12eimhz7iwx3z.js: URLSearchParams + getModel valida el slug antes de aplicarlo). Validaciones reales: orden de fechas, mínimo 7 días para Casa de Campo/La Romana con mensaje específico, honeypot oculto con class=hidden + aria-hidden + tabindex=-1.
- Transparencia de precios superior al estándar del sector: cada tier muestra el total con ITBIS calculado (US$50 → 'con ITBIS · US$59.00'), el costo de delivery está explícito (gratis 2+ días, US$40+ITBIS 1 día) y el disclaimer bilingüe cierra la página. 'Lo que ves es lo que pagas' se cumple.
- Base técnica de accesibilidad y SEO impecable (A11y 100 / SEO 100 medidos): skip-link, label htmlFor en los 10 campos, autocomplete name/email/tel, min=hoy en fechas (y min=llegada en salida), hreflang es/en/x-default + canonical en <head> y sitemap con xhtml:link alternates verificados en producción.
- La barra CTA móvil fija (WhatsApp + ⚡ Solicitar disponibilidad, md:hidden, h-12 táctil) está presente en las páginas clave verificadas y el footer compensa con pb-20 md:pb-0 para que no tape contenido al final del scroll.

## Hallazgos
### [ALTA|riesgo|esfuerzo bajo] El estado de éxito dice 'Solicitud enviada' antes de que se envíe nada — y no hay red de seguridad si el usuario abandona en WhatsApp
EVIDENCIA: Chunk js/12eimhz7iwx3z.js: onSubmit hace window.open(waLink) e inmediatamente setState(éxito) con sentTitle:'Solicitud enviada' y success:'Gracias por su solicitud. Nuestro equipo verificará…'. El envío real ocurre solo si el usuario presiona enviar dentro de WhatsApp; si no lo hace, el lead se pierde en silencio y él cree que ya solicitó.
RECOMENDACIÓN: Cambiar el copy post-submit a 'Tu solicitud está lista en WhatsApp — presiona ENVIAR para completarla' con el botón de reabrir wa.me como CTA principal (no como fallback en letra pequeña). Idealmente añadir captura paralela gratuita del lead (Web3Forms/Formspree free tier o un Cloudflare Worker) para que ninguna solicitud abandonada se pierda.

### [ALTA|debilidad|esfuerzo bajo] Sin analytics: el embudo completo es invisible y ninguna decisión de CTA/formulario se puede validar
EVIDENCIA: Ningún script de medición en el HTML de producción (verificado en home.html/form.html: solo chunks _next). No hay forma de saber cuántos llegan al formulario, cuántos envían y cuántos completan en WhatsApp.
RECOMENDACIÓN: Instalar analytics ligero y gratuito compatible con export estático (GA4 o Cloudflare Web Analytics) + eventos manuales: view_form, submit_form, click_whatsapp_bar, click_cta_hero. Es prerequisito para todo lo demás de esta auditoría.

### [MEDIA|debilidad|esfuerzo bajo] /precios/ es un callejón sin salida: los tiers no nombran modelos ni enlazan a ninguna ficha
EVIDENCIA: En el <main> de precios.html los únicos href son /solicitar-disponibilidad/, /flota/ y wa.me (extraído por parser). Las 5 tarjetas de tier ('4 plazas · Budget', '6 plazas · Estándar'…) solo identifican por nombre al ECO Cross premium; el usuario debe ir a /flota/ y re-deducir qué modelo corresponde a qué precio.
RECOMENDACIÓN: Añadir dentro de cada tarjeta de tier chips con los modelos que incluye, enlazados a su ficha (ej. Budget 4 plazas → Zycar 4, ECO Cross, Precedent 2+2, Tempo 2+2), y un CTA 'Solicitar este tier' con prefill.

### [MEDIA|debilidad|esfuerzo bajo] El formulario no cruza pasajeros vs. modelo y el select de modelo no muestra precios
EVIDENCIA: Submit handler en js/12eimhz7iwx3z.js valida solo: honeypot, fechas vacías, orden de fechas y minDays por zona. Un usuario puede enviar '7+ pasajeros' con 'Zycar 4 · 4 plazas' sin aviso. Las opciones del select muestran plazas pero no 'desde US$X/día'.
RECOMENDACIÓN: Aviso no bloqueante cuando pasajeros > plazas del modelo ('Para 6 personas te recomendamos un 4+2') y añadir el precio 'desde US$X/día' en cada option. Bonus: el código ya calcula noches — mostrar estimado total (noches × tarifa + ITBIS) antes del submit.

### [MEDIA|debilidad|esfuerzo bajo] La barra CTA móvil en /solicitar-disponibilidad/ enlaza a la propia página y roba ~72px a un formulario largo
EVIDENCIA: form.html: <div class='fixed inset-x-0 bottom-0…md:hidden'> con <a href='/solicitar-disponibilidad/'>⚡ Solicitar disponibilidad</a> — CTA autorreferente en la página destino, compitiendo visualmente con el submit real mientras el usuario llena 7 campos con teclado abierto.
RECOMENDACIÓN: Ocultar la barra en la página del formulario, o sustituirla ahí por una sola acción útil ('¿Prefieres escribirnos directo? WhatsApp').

### [MEDIA|debilidad|esfuerzo bajo] Email obligatorio en un flujo cuyo único canal real es WhatsApp
EVIDENCIA: form.html: <input id='email' type='email' required>. Se exigen dos canales de contacto (email + WhatsApp) cuando la confirmación, el soporte y el envío mismo ocurren por WhatsApp. Cada campo obligatorio extra reduce completion en móvil.
RECOMENDACIÓN: Hacer el email opcional ('Email (opcional, para tu comprobante)'). Si se necesita para facturar, pedirlo después, al confirmar la reserva por WhatsApp.

### [MEDIA|debilidad|esfuerzo bajo] Sin promesa de tiempo de respuesta en ningún punto del embudo
EVIDENCIA: FAQ: 'se comunicará con usted lo antes posible'; formulario y home no fijan expectativa. Para un turista comparando 3 proveedores en WhatsApp, el que promete y cumple '<15 min' gana la solicitud.
RECOMENDACIÓN: Añadir junto al submit y en el paso 02 de 'Cómo funciona' una promesa medible y cumplible: 'Respondemos en menos de 15 minutos, 24/7' (estilo 'usually responds within…' de Airbnb).

## Oportunidades
- Search-first al estilo Airbnb: mini-widget en el hero del home (fechas + zona + pasajeros) que salte a /solicitar-disponibilidad/ con todo precargado. Convierte el hero de folleto en motor de intención y reduce el formulario percibido a 3 campos de contacto.
- Estimado de precio total en vivo en el formulario: el código ya calcula las noches (variable f en el chunk del form); multiplicar por la tarifa del modelo + ITBIS + delivery y mostrar 'Total estimado: US$XXX' antes del submit. Airbnb nunca pide datos personales sin haber mostrado el desglose.
- Captura de lead redundante sin backend pago: enviar la solicitud en paralelo a un endpoint gratuito (Web3Forms/Formspree free tier o Cloudflare Worker + email) además del deep-link de WhatsApp. Hoy toda solicitud abandonada en el último paso se evapora; con esto ninguna se pierde.
- Galería multi-foto por modelo cuando haya sesión nueva: hoy cada ficha tiene 1 sola foto de catálogo 720px (verificado en zycar-4). Airbnb vende con 8-15 fotos en contexto: el cart en la villa, en la marina de Cap Cana, familia a bordo, detalle de asientos y pantalla. Es la mejora de conversión de mayor impacto visual pendiente.
- Prueba social junto a los CTAs en cuanto existan reseñas reales: bloque de 2-3 reseñas de Google con estrellas al lado del CTA final del home y del submit del formulario, más el badge 'X viajeros este mes'. Mientras llegan, un contador honesto ('67 carros en flota, operando en PCRC, Cap Cana y Bávaro') ya transmite escala.
- Página /precios/ como configurador ligero: selector de personas + noches que resalte el tier adecuado y muestre el total con ITBIS y delivery, con CTA prefilled. Convierte la página de consulta pasiva en el segundo punto de conversión del sitio.


# UI

## Fortalezas
- Sistema de tokens v2 disciplinado y cerrado: globals.css:5-34 es la única fuente de color (amarillo único #FFD60A, ink, cream, línea) y el grep de todo src/ no encuentra ni un hex fuera de tokens en componentes (solo themeColor #0a0a0a, que ES el token). Incluye variantes AA pensadas (--bolt-yellow-dark #8a6a00 para texto amarillo sobre claro, success/danger oscurecidos con comentario del porqué).
- Escala de radios y patrones 100% coherente entre páginas: solo existen rounded-full (62 usos), rounded-card 14px (58) y rounded-box 10px (10) — cero radios ad-hoc; el kicker 'uppercase tracking-[0.2em]' se repite idéntico en los 6+ heros auditados y hover:scale-105 es uniforme en los 23 CTAs.
- Patrón de hero negro premium consistente en home, precios, ficha de modelo, landing de zona y blog: bg-ink + kicker volt + h1 Bricolage extrabold tracking-tight + par de CTAs pill (amarillo sólido + outline blanco→volt). La alternancia ink/blanco/crema del home crea ritmo y las secciones claras usan volt-dark para texto — el sistema se siente diseñado, no plantilla.
- El 'marcador eléctrico' está bien resuelto técnicamente (.hl con gradiente 55%→92%, globals.css:55-63) y aplicado con criterio: solo una palabra clave por h2 de sección clara ('destacados', 'donde estés', 'incluye'), nunca en exceso.
- Conversión siempre a un toque y marca correcta en el logo: MobileCta fija en móvil con el footer compensando (pb-20 comentado en footer.tsx:63-64), y logo.tsx implementa el rayo SVG asimétrico oficial SIEMPRE antes del wordmark con translate='no'.

## Hallazgos
### [ALTA|debilidad|esfuerzo bajo] Dos 'rayos' distintos conviven: el SVG oficial del logo vs el emoji ⚡ (U+26A1) en los CTAs
EVIDENCIA: header.tsx:101, (es)/page.tsx:71 y 241, mobile-cta.tsx:26, footer.tsx:126; el HTML vivo de boltgolfcars.com contiene 13 emojis ⚡ en el home
RECOMENDACIÓN: Crear <BoltIcon> (el mismo path SVG de logo.tsx a 14-16px, fill currentColor o #FFD60A) y reemplazar todos los ⚡ de CTAs y kickers. El emoji lo pinta el sistema operativo: en Android/Windows sale naranja y con otra forma, rompiendo justo las dos reglas de marca (amarillo único y forma asimétrica oficial).

### [ALTA|debilidad|esfuerzo bajo] og:image para WhatsApp (el canal de conversión) es una foto de catálogo 728×740 casi cuadrada, sin marca
EVIDENCIA: (es)/layout.tsx:39 (images: ['/images/models/eco-cross-4-2.jpg']) + meta twitter:card=summary_large_image en el HTML vivo; el archivo mide 728×740px (formato 2:1 esperado: 1200×630)
RECOMENDACIÓN: Generar en build una card OG 1200×630: fondo ink, rayo + wordmark BOLT, eslogan 'Your ride in paradise.' y foto del cart recortada. Cada link que se comparte por WhatsApp hoy muestra un thumbnail recortado y anónimo; con card propia cada share es un anuncio de marca. Ideal: una por ficha de modelo y zona.

### [ALTA|riesgo|esfuerzo alto] Fotos de 715-743px insuficientes para los heros en pantallas retina, y con huella visible de generación AI
EVIDENCIA: public/images/models/*.jpg: 11 archivos de 715-743px de ancho; el hero del home ((es)/page.tsx:85-94) renderiza ~560px CSS en desktop (×2 DPR = ~1120px necesarios) y 100vw en móvil (390px ×3 = ~1170px); con images:{unoptimized:true} (next.config.ts:11) se sirve el mismo 720px siempre. Al inspeccionar zycar-4.jpg y eco-cross-4-2.jpg se ven artefactos AI (placa ilegible, radios de rueda irregulares) y el aspect-[4/3] recorta ~25% de las fotos casi cuadradas (728×740)
RECOMENDACIÓN: Para cards de catálogo las 720px aguantan; para hero de home y hero de ficha NO: se ven blandas justo en el elemento LCP. Interim: upscale 2x (Real-ESRGAN o similar) a ~1440px solo para las posiciones hero. Definitivo: sesión de fotos real de la flota (misma luz, mismo ángulo ¾, fondo villa real, 1600px+). Un sitio que dice 'premium' con renders blandos delata la costura; además una foto real elimina el riesgo de que un cliente note que el producto no es idéntico al render.

### [MEDIA|debilidad|esfuerzo medio] Subtítulo EN en itálica duplicado bajo casi cada bloque ES genera ruido visual y debilita la jerarquía
EVIDENCIA: (es)/page.tsx:63-65 (hero), 107 (trust ×4), 187-189 (zonas), 225 (steps ×3); footer.tsx:71; patrón espejo en /en con itálicas ES. En el hero del home hay 3 niveles de texto gris/itálica compitiendo bajo el h1
RECOMENDACIÓN: Existiendo /en completo con switcher visible, mostrar ambos idiomas a la vez es cinturón y tirantes: ningún referente premium lo hace. Reducir las itálicas EN a un solo punto estratégico (hero) o eliminarlas y confiar en el switcher + hreflang. Menos texto = más aire = más premium. Decisión reversible: medir con analytics de idioma antes/después cuando los haya.

### [MEDIA|debilidad|esfuerzo bajo] Iconografía de la franja de confianza y checks son emojis del sistema (📍🛡️💬✓), no iconos de marca
EVIDENCIA: (es)/page.tsx:16-19 (TRUST), flota/[id]/page.tsx:168 y alquiler/[zona]/page.tsx:94-96 (✓ como texto)
RECOMENDACIÓN: Set propio de 5-6 iconos SVG monocromos (stroke 1.5-2px, 24px: rayo, pin, escudo, chat, check) en color volt sobre oscuro / ink sobre claro. Los emojis renderizan distinto en cada OS y son el detalle nº1 que separa 'plantilla' de 'sistema diseñado'. Mismo PR que el hallazgo del rayo.

## Oportunidades
- Sesión fotográfica real de la flota (misma hora de luz, mismo ángulo ¾, villas reales de PCRC/Cap Cana, 1600px+): es el único cambio que puede mover la percepción de 'render de catálogo chino' a 'flota premium real', y habilita hero, fichas, OG cards y redes de una sola vez.
- OG cards 1200×630 generadas en build por página (home, 11 fichas, 5 zonas) con rayo + wordmark + precio 'desde US$XX/día': cada link compartido por WhatsApp —donde ocurre el 100% de la conversión— se convierte en un mini-anuncio de marca.
- Video hero corto (8-12s, mudo, loop, con poster estático como LCP): un BOLT llegando a una villa al atardecer. Ningún competidor local lo tiene; es el gesto Tesla más barato disponible y diferencia inmediatamente de las plantillas de renta de la zona.
- Micro-interacciones de nivel: sustituir el hover:scale-105 genérico por transiciones de sombra+desplazamiento sutil y añadir reveal-on-scroll con CSS (animation-timeline o IntersectionObserver mínimo), respetando el prefers-reduced-motion ya presente en globals.css:70-77.
- Sección de prueba social lista para activar: bloque de testimonios con estrellas + logos de operadores aliados (PCConcierge/VOLALTO/RELAXINN, si autorizan) diseñado ya en el sistema v2, oculto hasta tener las primeras reseñas reales de Google — evita improvisar el diseño cuando lleguen.
- Página/bloque 'Programa de Aliados' con estética B2B premium (fondo ink, formulario corto o CTA WhatsApp dedicado): hoy el programa solo vive en una respuesta del FAQ, pero es el canal de mayor ticket recurrente (concierges y property managers) y merece jerarquía propia en nav o footer.


# SEO

## Fortalezas
- Higiene técnica de <head> impecable en las páginas de dinero: canonical + tríada hreflang (es/en/x-default) correcta y verificada en vivo en home y /alquiler/cap-cana/, URLs limpias con trailing slash, sitemap de 64 URLs coherente con robots.txt y sin huérfanas.
- Titles de páginas transaccionales alineados con la intención de búsqueda: EN home 'BOLT Golf Cars — Premium golf cart rental in Punta Cana', zonas con precio en el title ('Golf carts in Cap Cana from US$50/day') y H1 de zona con match exacto 'Golf cart rental in Cap Cana' (verificado en producción).
- JSON-LD real y coherente por ficha de modelo (verificado en /flota/eco-cross-4-2/): AutoRental + Product con AggregateOffer de precios honestos (low/high por plazas) + FAQPage + BreadcrumbList, todo generado desde una sola fuente (src/lib/schema.ts) sin datos inventados.
- Blog ES con contenido genuinamente útil y específico (autonomías reales por batería, precios con ITBIS, reglas de circulación, regla de 24h desde entrega) — src/content/blog.ts, ~900–1.200 palabras por artículo con FAQ propio y Article schema con fechas published/modified.
- Las 5 landings de zona tienen contenido 100% único por zona (intro, 3 bullets y 3 FAQs redactadas ad-hoc en src/content/zones-landing.ts), no plantilla clonada — buena base anti-thin-content aunque corta (ver hallazgos).

## Hallazgos
### [ALTA|riesgo|esfuerzo bajo] El sitio legado reservas.boltgolfcars.com sigue vivo, indexable y compitiendo por las mismas keywords
EVIDENCIA: curl en vivo: https://reservas.boltgolfcars.com/{,precios,reserva,catalogo} devuelven HTTP 200 sin redirect; robots.txt da 404 (todo rastreable); 0 etiquetas canonical/noindex en /precios; title raíz 'BOLT ⚡ Your ride in paradise · Renta y venta de carritos de golf · Punta Cana' solapa con el title del sitio nuevo
RECOMENDACIÓN: Redirigir 301 página a página al equivalente en boltgolfcars.com. GitHub Pages no hace 301 server-side: la vía más limpia es apuntar el CNAME de reservas.* a una redirección en Hostinger (donde ya está el DNS); como mínimo inmediato, sustituir cada página legada por meta refresh 0 + rel=canonical al destino nuevo. Esto además transfiere cualquier backlink/señal acumulada del dominio viejo en lugar de canibalizarlo.

### [ALTA|debilidad|esfuerzo bajo] Search Console sin configurar en un sitio lanzado hace 24 horas
EVIDENCIA: grep de google-site-verification en /Users/kennyrosario/bolt-web/src y /public: 0 resultados; sin archivo de verificación ni meta tag; confirmado por contexto del proyecto
RECOMENDACIÓN: Verificar la propiedad de dominio (via DNS TXT en Hostinger, cubre subdominios y ambos protocolos), enviar sitemap.xml, y pedir indexación de las 10 URLs de dinero (home ES/EN, flota, precios, 5 zonas ES + EN). Sin GSC no hay datos de queries, ni alertas de hreflang/indexación, ni forma de detectar si Google elige el legado sobre el nuevo. Añadir Bing Webmaster Tools (importa desde GSC en 2 clics).

### [ALTA|debilidad|esfuerzo medio] Cero contenido de blog en inglés cuando la demanda dominante es anglófona
EVIDENCIA: src/content/blog.ts: 4 artículos, todos locale 'es'; src/components/header.tsx NAV.en no incluye Blog; sitemap sin /en/blog/. La keyword objetivo 'golf cart rental punta cana' la busca el turista estadounidense, no el hispanohablante
RECOMENDACIÓN: Traducir/adaptar los 4 artículos a EN bajo /en/blog/ (los slugs ya están en inglés: golf-cart-cap-cana-guia, etc. — facilita el espejo), enlazar Blog en NAV.en, y emitir hreflang entre pares ES/EN. El contenido informacional EN es el que puede rankear para 'is it worth renting a golf cart in punta cana', 'cap cana golf cart rules', etc., donde el sitio hoy no tiene ninguna página.

### [ALTA|debilidad|esfuerzo bajo] Sin Google Business Profile y LocalBusiness sin geo: invisible en el Map Pack, que domina esta SERP
EVIDENCIA: src/lib/schema.ts: grep de geo/latitude = 0; sameAs solo Instagram (línea 33), sin hasMap; la SERP de 'golf cart rental punta cana' muestra map pack local antes que orgánico
RECOMENDACIÓN: Crear Google Business Profile con la dirección real (Av. Barceló Km 3 1/2, Naves Montolio #17, Bávaro), categoría 'Golf cart rental service' (existe), fotos de flota, y ahí empezar a acumular reseñas. En schema.ts añadir geo (GeoCoordinates lat/lng del local), hasMap con la URL del perfil y sumar el GBP a sameAs. Para un negocio local nuevo, el GBP rinde más tráfico que cualquier optimización on-page.

### [MEDIA|debilidad|esfuerzo medio] Una sola OG image genérica (foto de catálogo 720px de un modelo) para las 68 páginas
EVIDENCIA: src/app/(es)/layout.tsx:39 y src/app/en/layout.tsx:39: images: ['/images/models/eco-cross-4-2.jpg']; verificado en vivo en home; las fichas de modelo no sobreescriben openGraph (la ficha del Zycar comparte la foto del ECO Cross) y el Article schema del blog usa la misma foto (blog/[slug]/page.tsx:37)
RECOMENDACIÓN: Tres niveles: (1) fichas de modelo → og:image con la foto de SU modelo (ya existe modelImageUrl(id)); (2) crear una OG branded 1200×630 (rayo + wordmark + 'Your ride in paradise.' sobre amarillo #FFD60A) para home/zonas/institucionales; (3) blog → OG por artículo. En un negocio donde el 100% de la conversión pasa por WhatsApp, el preview al compartir el link ES la primera impresión de marca.

### [MEDIA|debilidad|esfuerzo medio] Interlinking editorial nulo: los artículos del blog no enlazan a zonas, fichas ni precios
EVIDENCIA: src/content/blog.ts: los párrafos son texto plano sin ningún campo de enlace; src/app/(es)/blog/[slug]/page.tsx renderiza solo texto + un único CTA a /solicitar-disponibilidad; la guía de Cap Cana menciona ECO Cross, precios y la zona sin un solo link a /alquiler/cap-cana/ ni /flota/eco-cross-4-2/; las landings de zona tampoco enlazan de vuelta a su artículo relacionado
RECOMENDACIÓN: Añadir soporte de enlaces al modelo de contenido (p. ej. markdown ligero o campo links por sección) y enlazar: guía PCRC ↔ /alquiler/puntacana-resort/, guía Cap Cana ↔ /alquiler/cap-cana/, artículo 4-vs-6-plazas → /flota/ y /precios/, artículo baterías → fichas de litio. Añadir bloque 'Artículos relacionados' en las landings de zona. Es la forma más barata de pasar autoridad del contenido a las páginas de dinero.

### [MEDIA|debilidad|esfuerzo bajo] H1 del home sin ninguna keyword en ambos idiomas
EVIDENCIA: Verificado en vivo: <h1>Your ride in paradise.</h1> tanto en https://boltgolfcars.com/ como en /en/ — el H1 de la página más fuerte del sitio no contiene 'golf cart', 'renta/rental' ni 'Punta Cana'
RECOMENDACIÓN: Mantener el eslogan como kicker/eyebrow (regla de marca intacta) y hacer el H1 descriptivo: ES 'Renta de golf carts premium en Punta Cana', EN 'Premium golf cart rentals in Punta Cana'. El title ya lo dice bien; el H1 debe reforzarlo, no desperdiciarse en branding que ningún usuario busca.

### [MEDIA|debilidad|esfuerzo medio] Landings de zona delgadas (~300–350 palabras) frente a la intención de guía local
EVIDENCIA: src/content/zones-landing.ts: cada zona = intro de 2 frases + 3 bullets + 3 FAQs + 3 modelos recomendados; los competidores que rankean para 'cap cana golf cart rental' responden además dónde se puede circular, distancias, qué hacer en la zona
RECOMENDACIÓN: Ampliar cada landing a 700–900 palabras con secciones que solo BOLT puede escribir: puntos de entrega típicos (marina, Fishing Lodge, comunidades), distancias reales en cart, reglas del residencial, temporada alta, y 2–3 FAQs más (las de circulación ya escritas en el blog se pueden reutilizar adaptadas). Empezar por Cap Cana y PCRC, que son las de mayor demanda y ticket.

### [BAJA|debilidad|esfuerzo bajo] Titles de las 22 fichas de modelo sin keyword transaccional ni geográfica
EVIDENCIA: Verificado en vivo: /flota/eco-cross-4-2/ → '<title>ECO Cross 4+2 — 6 plazas | BOLT Golf Cars</title>' — sin 'golf cart', sin 'renta', sin 'Punta Cana'; nadie busca 'ECO Cross 4+2'
RECOMENDACIÓN: Plantilla de title por ficha: 'Renta ECO Cross 6 plazas — golf cart en Punta Cana | BOLT' / EN 'ECO Cross 6-seater golf cart rental in Punta Cana | BOLT'. Cambia solo generateMetadata de flota/[id] y en/fleet/[id]; da a 22 URLs la posibilidad de captar long-tail ('6 seater golf cart rental punta cana', 'lithium golf cart rental').

### [BAJA|riesgo|esfuerzo bajo] x-default apunta a la versión en español pese a que el cliente objetivo es internacional
EVIDENCIA: Verificado en vivo en home: <link rel="alternate" hrefLang="x-default" href="https://boltgolfcars.com/"/> — un buscador de Alemania, Francia o Canadá sin match de idioma recibe la versión ES
RECOMENDACIÓN: Decidir explícitamente el idioma por defecto para audiencia sin match: si el cliente tipo es el turista extranjero (todo indica que sí: precios en US$, WhatsApp bilingüe), cambiar x-default a /en/ en el helper hreflang de src/lib. Es un cambio de una línea pero conviene tomarlo como decisión de negocio, no técnica.

## Oportunidades
- Google Business Profile + motor de reseñas: pedir reseña por WhatsApp al cerrar cada renta (mensaje plantilla con link directo). Con 15–20 reseñas reales se activa el Map Pack, se añade AggregateRating al schema AutoRental y se desbloquea la sección de testimonios que el sitio ya espera.
- Página dedicada de VENTA de golf carts (/venta y /en/golf-carts-for-sale): hoy la venta es solo una mención en el home, pero 'golf cart for sale punta cana' / 'comprar carrito de golf republica dominicana' es demanda de ticket alto (miles de US$) sin ninguna página que la capture — y la flota de 11 modelos ya está fotografiada y fichada.
- Plan de backlinks local de esfuerzo realista: (1) rescatar la autoridad del legado con los 301 de reservas.*; (2) links desde los aliados operadores (PCConcierge, VOLALTO, RELAXINN) y property managers de PCRC/Cap Cana que ya recomiendan a BOLT; (3) perfiles en directorios turísticos (TripAdvisor 'Transportation', Punta Cana travel guides, cámaras de comercio); (4) el Instagram existente enlazando siempre a boltgolfcars.com y no al legado.
- Calendario editorial EN keyword-first más allá del espejo de los 4 artículos: 'how to get around punta cana without a car', 'cap cana golf cart rules for guests', 'punta cana golf cart rental prices [2026]', 'do you need a license to drive a golf cart in punta cana' — long-tail informacional sin competencia local seria y que alimenta el embudo de WhatsApp.
- Medición mínima viable: GSC + Bing (hallazgos) más un analytics sin cookies (Plausible/Umami, gratis autohospedado — encaja con la preferencia de coste cero) con evento en el click de WhatsApp/submit del formulario; hoy es imposible saber qué página genera solicitudes ni qué keyword trae al que convierte.
- Datos estructurados de siguiente nivel cuando exista la materia prima: AggregateRating y Review en AutoRental/Product (con reseñas reales, nunca antes), ImageObject múltiple por Product cuando se re-fotografíe el catálogo (las fotos 720px actuales están por debajo del mínimo recomendado para rich results de imagen), y OfferCatalog enlazando los 11 modelos desde el AutoRental.


# PERFORMANCE

## Fortalezas
- Arquitectura RSC ya minimalista: solo 3 client components en todo src (src/app/(es)/flota/fleet-grid.tsx, src/app/(es)/solicitar-disponibilidad/request-form.tsx, src/components/header.tsx); footer, mobile-cta, model-card y las 8 views institucionales son server components puros — el problema NO es código de aplicación inflado (chunk de página más grande: 15.6KB).
- Fuentes ya bien configuradas en lo básico: font-display:swap en los 16 @font-face, subsetting por unicode-range, y solo 2 woff2 en preload crítico (~90KB de los 288KB totales; el resto son subsets latin-ext/cyrillic que solo se descargan si hacen falta) — verificado en out/_next/static/chunks/30x6bmww528ac.css.
- Hero LCP correctamente priorizado en código: priority + sizes en src/app/(es)/page.tsx:86-93 y flota/[id]/page.tsx:106, que genera <link rel=preload as=image> en out/index.html; imágenes con loading=lazy below-fold y sizes responsivos en model-card.tsx:25. CLS 0 confirma que los contenedores aspect-[4/3] reservan espacio.
- Imágenes ya dimensionadas al uso real: fotos de modelo 715×572px (~110-135KB c/u), adecuadas para el ancho móvil renderizado; total página 1.4MB. No son el cuello de botella y el audit lo confirma.
- HTML estático limpio y liviano: home 64.7KB con flight payload RSC contenido (39KB inline), A11y/BP/SEO 100, JSON-LD como script estático — la base para servir páginas sin JS ya existe.

## Hallazgos
### [ALTA|debilidad|esfuerzo medio] Las 68 páginas cargan el MISMO framework JS de ~545KB (158KB gzip) aunque 65 de ellas no tienen ninguna interactividad
EVIDENCIA: Manifest de chunks idéntico en out/index.html, out/blog/index.html y out/nosotros/index.html: 43rfq7guowqma.js (227KB, contiene react-dom/hydrateRoot), 42qvn0t6ard6l.js (150KB, runtime Next), 35ip4ctshr802.js (55KB), 27jktro2p5rq9.js (44KB) + 5 chunks menores. gzip total ejecutable: 158,484 bytes por página. Esto ES el bootup 2.5s / main-thread 6.9s / TBT 1300-1900ms en CPU 4x: parsear y ejecutar React+Next para hidratar páginas que son HTML puro.
RECOMENDACIÓN: Estrategia 'cero hidratación en páginas estáticas': tras completar los hallazgos 2-4 (des-reactivar header, fleet-grid y request-form), añadir un paso post-build (script Node en package.json después de next build) que elimine los <script src=/_next/...> y los bloques inline self.__next_f de las páginas del out/ sin islas cliente, preservando los <script type=application/ld+json>. Resultado esperado: TBT ~0ms, SI cae de 12-14s a ~3-4s, Perf 90-98 móvil, sin tocar hosting ni romper el export. Trade-off aceptable: se pierde prefetch/navegación SPA (irrelevante en un sitio de contenido). Verificar con Lighthouse local antes de deploy.

### [ALTA|debilidad|esfuerzo medio] header.tsx es 'use client' y vive en ambos root layouts: fuerza árbol cliente e hidratación global en TODAS las páginas
EVIDENCIA: src/components/header.tsx:1 ('use client') usa useState (menú móvil), usePathname y useSearchParams (lang switch) — importado en src/app/(es)/layout.tsx:4 y src/app/en/layout.tsx. Es el único client component compartido por las 68 páginas y el bloqueador principal para poder despojar el JS de las páginas estáticas.
RECOMENDACIÓN: Convertirlo a server component: (1) menú móvil con CSS puro (patrón checkbox/peer de Tailwind o Popover API) manteniendo aria-expanded vía :checked, o un inline <script> de ~15 líneas; (2) lang switch: pasar el path contraparte como prop desde cada página (ya se conoce en build) en vez de usePathname; la preservación del query string solo importa en /solicitar-disponibilidad (?modelo=X) — resolverla ahí con un mini script. Sin esto, el hallazgo 1 no es aplicable a ninguna página.

### [ALTA|riesgo|esfuerzo bajo] Riesgo de invertir en la palanca equivocada: migrar a Vercel NO subiría el score
EVIDENCIA: El cuello medido es CPU del cliente (bootup JS 2.5s, main-thread 6.9s, TBT 1300-1900ms) con unused-js de solo ~28KB e imágenes OK (mayor 192KB). Lo que Vercel aporta (next/image runtime, edge, streaming SSR) ataca descarga de imágenes y TTFB — ninguno es el problema. El JS de hidratación se serviría idéntico.
RECOMENDACIÓN: Descartar la migración a Vercel como palanca de performance y mantener export estático en GitHub Pages (costo $0, alineado con la preferencia de Kenny). Reevaluar hosting solo si aparece una necesidad real de backend (disponibilidad en vivo, pagos), no por Lighthouse.

### [MEDIA|debilidad|esfuerzo medio] request-form.tsx (395 líneas React) solo construye un enlace de WhatsApp — no necesita React y es lo único que ancla el runtime en la página de conversión
EVIDENCIA: src/app/(es)/solicitar-disponibilidad/request-form.tsx: client component sin backend cuyo output final es un wa.me link (chunk propio 12eimhz7iwx3z.js, 15.6KB). La página del formulario mide TBT 1290ms y Perf 67 — el costo es la hidratación del runtime completo, no el form en sí.
RECOMENDACIÓN: Reescribirlo como <form> HTML server-rendered + script vanilla (~3-4KB) que lea los campos y componga la URL de WhatsApp al submit (con validación nativa required/pattern). Con esto y el hallazgo 4, el sitio entero queda sin React en runtime y el strip post-build (hallazgo 1) aplica al 100% de las páginas, incluida la de conversión.

### [MEDIA|debilidad|esfuerzo bajo] Inter variable completa (peso 100-900, 5 archivos woff2, 48KB en preload crítico) cargada solo para el texto de cuerpo, cuando la marca es Bricolage
EVIDENCIA: src/app/(es)/layout.tsx:16-19 y en/layout.tsx cargan Inter; globals.css:30,39 la usan como --font-sans/body. En out/_next/static/media: 83afe278...s.p (48.4KB, preload) + 85.3KB latin-ext + 3 subsets más ≈ 140KB de los 288KB de fuentes son Inter. Bricolage en cambio ya resuelve bien: un solo archivo variable 017d9bea (41KB) sirve los pesos 600/700/800.
RECOMENDACIÓN: Eliminar Inter y usar system-ui stack para el cuerpo (font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif) — visualmente casi idéntica en móvil y ahorra ~48KB del critical path + 1 preload + 8 @font-face de matching. La identidad BOLT vive en Bricolage (titulares), que se mantiene intacta. Alternativa conservadora: limitar Inter a subsets: ['latin'] con axes reducidos.

### [MEDIA|debilidad|esfuerzo bajo] Heros LCP en JPG (~120KB) sin formato moderno y el <img> sin fetchpriority explícito
EVIDENCIA: out/images/models/zycar-4.jpg = 119,673 bytes (715×572); el <img> renderizado en out/index.html no lleva fetchpriority=high (solo el <link rel=preload>). LCP home 4.3s, ficha 5.1s: parte es descarga (~1s en 4G lento), parte es render delay por el main thread ocupado (que arregla el hallazgo 1).
RECOMENDACIÓN: Pipeline de build con sharp: generar AVIF (~45-55KB, -55%) + fallback JPG vía <picture> para las 22 fotos de modelo (images.unoptimized lo permite; es pre-generación, no runtime). Añadir fetchPriority='high' explícito al Image del hero en (es)/page.tsx:86, en/page.tsx, flota/[id]/page.tsx:106 y en/fleet/[id]/page.tsx. Impacto estimado LCP: -0.8 a -1.2s por descarga + lo que libere el main thread.

## Oportunidades
- Sitio 'cero-React en runtime': con los hallazgos 2+3+4 resueltos, ninguna página necesita hidratación — el strip post-build convierte BOLT en un sitio HTML/CSS con islas vanilla de <5KB, Perf móvil estimado 92-98 en todas las páginas, manteniendo Next como generador (JSX, i18n, sitemap, JSON-LD intactos) y GitHub Pages gratis.
- Si el strip post-build resulta frágil de mantener entre versiones de Next, la migración estructural correcta para la v3 es Astro (islands architecture): mismo Tailwind, componentes casi copy-paste desde las views, cero JS por defecto y export estático nativo — no Vercel.
- Rutas estáticas pre-filtradas de flota (/flota/eco/, /flota/zycar/, /flota/6-plazas/) matan dos pájaros: eliminan el useState de fleet-grid y crean landing pages SEO para búsquedas como 'golf cart 6 plazas punta cana'.
- Pipeline de imágenes en build (sharp → AVIF + 2 anchos) deja lista la infraestructura para cuando lleguen fotos nuevas de mayor resolución, sin depender de optimización runtime.
- Consolidar la duplicación ES/EN del embudo (ya identificada en auditorías previas) en views compartidas reduce la superficie que el paso post-build y las futuras auditorías deben cubrir — menos riesgo de que una página quede fuera del strip.
- Instalar analytics liviano (Plausible/Cloudflare Web Analytics, <1.5KB, compatible con el objetivo cero-JS) para capturar Web Vitals de campo: los clientes de BOLT (turistas de Cap Cana/PCRC) suelen usar gama alta iPhone/flagship, y los datos reales de CrUX serán los que Google use para ranking — hoy el sitio vuela ciego sin RUM ni conversión medida.


# A11Y

## Fortalezas
- Skip link funcional en ambos layouts ('Saltar al contenido' / 'Skip to content') con estilos focus:not-sr-only visibles (src/app/(es)/layout.tsx:51-55 y src/app/en/layout.tsx:55), y <main id> como destino.
- Hamburguesa con semántica correcta: aria-expanded, aria-controls='nav-movil' y aria-label dinámico abrir/cerrar bilingüe (src/components/header.tsx:113-128); navs con aria-label diferenciados.
- Formulario con base sólida: <label htmlFor> en los 8 campos, autocomplete (name/email/tel), error con role='alert' que sí se anuncia al aparecer, focus-visible:ring-2 en inputs, y honeypot bien aislado (tabIndex={-1}, aria-hidden, div hidden) (request-form.tsx:134-135, 249-365).
- Paleta ajustada deliberadamente para AA en estados hover/focus: volt-dark #8a6a00 (~5.1:1 sobre blanco, usado en hover de enlaces), danger #b91c1c y success #15803d oscurecidos con comentario explícito en src/app/globals.css:13-15; hover:text-volt sobre bg-ink da ~13:1. Además prefers-reduced-motion global (globals.css:70-77).
- Patrones nativos y accesibles por defecto: FAQ con <details>/<summary> (teclado gratis), filtros de flota como botones con aria-pressed + role='group' + h2 sr-only (fleet-grid.tsx:48-66), emojis decorativos mayormente en <span aria-hidden>, spans con lang='en' para texto inglés incrustado, y barra móvil CTA con targets de 48px (mobile-cta.tsx h-12) sin tapar el footer (pb-20 md:pb-0).

## Hallazgos
### [ALTA|debilidad|esfuerzo bajo] El mensaje de éxito del formulario no recibe foco ni se anuncia (SR queda en silencio tras enviar)
EVIDENCIA: src/app/(es)/solicitar-disponibilidad/request-form.tsx:215-241 — al hacer submit, setSent(true) desmonta el <form> completo (incluido el botón que tenía el foco) y lo reemplaza por un <div> sin role='status', sin aria-live y sin tabIndex/focus(); el foco cae a <body> mientras window.open abre WhatsApp en otra pestaña.
RECOMENDACIÓN: Añadir al contenedor de éxito tabIndex={-1} + ref y llamar ref.current.focus() en un useEffect cuando sent pasa a true, más role='status' en el <p> del mensaje. Es la pantalla de conversión: un usuario de lector de pantalla hoy no sabe si su solicitud salió.

### [MEDIA|debilidad|esfuerzo bajo] Errores y avisos del formulario no están asociados a los campos (sin aria-describedby ni aria-invalid)
EVIDENCIA: request-form.tsx:356-365 — el error de fechas (errOrden/errMin) se renderiza como <p role='alert'> al final del grid, lejos de los inputs #llegada/#salida, que no reciben aria-invalid ni aria-describedby; el aviso dinámico warnMin (línea 356-360) aparece sin aria-live (no se anuncia al cambiar fechas) y la nota de zona (líneas 300-304) tampoco está enlazada al <select id='zona'>.
RECOMENDACIÓN: Poner id a cada mensaje y enlazarlo con aria-describedby en el campo correspondiente, añadir aria-invalid={true} a llegada/salida cuando el error es de fechas, y aria-live='polite' al aviso de mínimo de días para que se anuncie al calcularse.

### [MEDIA|debilidad|esfuerzo bajo] Menú móvil sin cierre con Escape ni devolución de foco
EVIDENCIA: src/components/header.tsx:113-167 — el toggle solo responde a click; no hay handler de Escape, no se mueve el foco al primer enlace al abrir ni se devuelve al botón al cerrar, y no se cierra al tocar fuera. (El orden DOM sí es correcto: botón → nav, por lo que Tab fluye bien.)
RECOMENDACIÓN: Añadir onKeyDown de Escape a nivel del header que haga setOpen(false) y devuelva el foco al botón hamburguesa (patrón disclosure de WAI-ARIA APG). Focus trap no es necesario porque no es modal.

### [MEDIA|debilidad|esfuerzo bajo] Targets táctiles bajo 44px en el header móvil: hamburguesa 40×40 y switcher de idioma ~30px de alto
EVIDENCIA: header.tsx:115 (botón h-10 w-10 = 40×40px) y header.tsx:107-112 (pill EN/ES con text-xs + py-1.5 + border ≈ 30px de alto). Cumplen el mínimo WCAG 2.2 AA (24px) pero no el AAA 2.5.5 ni las guías iOS/Android de 44-48px — y son los dos controles más usados por un turista con el móvil en la mano.
RECOMENDACIÓN: Subir la hamburguesa a h-11 w-11 (44px) y dar al pill de idioma un área táctil de 44px (py-2.5 o min-h-11 con flex items-center), manteniendo el tamaño visual con padding.

### [BAJA|debilidad|esfuerzo bajo] Emoji ⚡ sin aria-hidden dentro del texto de botones clave: el lector anuncia 'high voltage sign' antes del CTA
EVIDENCIA: request-form.tsx:52 y 104 (submit: '⚡ Enviar solicitud por WhatsApp' / '⚡ Send request via WhatsApp'), src/views/faq.tsx:116 y 125 (cta: '⚡ Solicitar disponibilidad'), src/app/(es)/page.tsx (~línea 72, '⚡ Ver la flota'). Inconsistente con header.tsx:101 y footer.tsx:126, donde el mismo rayo sí está en <span aria-hidden='true'>.
RECOMENDACIÓN: Extraer el ⚡ del string y envolverlo en <span aria-hidden='true'> como ya hace el header — aplica al botón de submit del formulario, al CTA del FAQ y a los CTAs del home. Mantiene la marca visual sin ruido en el lector.

### [BAJA|debilidad|esfuerzo bajo] Cambios de filtro en /flota no se anuncian y las preguntas del FAQ no son headings
EVIDENCIA: src/app/(es)/flota/fleet-grid.tsx:67-71 — al pulsar un filtro la grilla cambia (11→2 modelos) sin ningún aria-live/status que anuncie el resultado; src/views/faq.tsx:149-157 — las 12 preguntas son <summary> planos, invisibles para la navegación por headings del lector de pantalla (rotor de VoiceOver salta de 'Preguntas frecuentes' directo al CTA final).
RECOMENDACIÓN: En FleetGrid añadir un <p role='status' className='sr-only'>{visible.length} modelos</p>; en el FAQ envolver el texto de cada summary en <h3> (patrón válido y recomendado dentro de summary).

## Oportunidades
- Estilo de foco de marca unificado: hoy los enlaces y botones dependen del outline por defecto del navegador (heterogéneo entre Chrome/Safari); definir en globals.css un *:focus-visible con ring amarillo #FFD60A sobre oscuro / ink sobre claro reforzaría marca y accesibilidad a la vez con ~5 líneas.
- Test automático de accesibilidad en CI: correr axe-core o pa11y-ci sobre el export estático (las 68 páginas HTML en out/) en cada deploy — gratis en GitHub Actions y detectaría regresiones que Lighthouse de una sola página no ve.
- Sesión real con VoiceOver (iOS Safari) del flujo completo home → flota → formulario → éxito: el cliente objetivo es turista con iPhone; 15 minutos de prueba manual validarían los arreglos de foco/anuncio del formulario mejor que cualquier herramienta.
- Validación inline por campo en el formulario (onBlur con mensaje asociado por aria-describedby) en lugar de solo validación al enviar: reduce fricción en la única página de conversión y resuelve de paso el hallazgo de asociación de errores.
- Al añadir foco al mensaje de éxito, incluir en él un botón/enlace prominente 'Abrir WhatsApp' como acción primaria (hoy es un enlace pequeño de fallback en texto steel): cubre a la vez a usuarios con bloqueador de pop-ups y a usuarios de teclado/SR que perdieron la pestaña abierta por window.open.
- Documentar los patrones a11y ya conquistados (tokens AA, aria-hidden en emojis, lang en texto incrustado, skip link) en AGENTS.md del repo para que las futuras fases F2–F4 y el blog EN no regresen lo ganado en las 3 auditorías.


# CODIGO

## Fortalezas
- Tipado estricto y casi limpio: tsconfig con strict:true, cero `any` en todo src/, solo 3 aserciones (`raw as Model[]` en content/models.ts:25 y 2 `as Filter` en fleet-grid.tsx:25,29); el filtro de flota usa unión discriminada (Filter) — patrón correcto.
- Fuente de verdad de negocio centralizada: content/site.ts concentra CONTACT, ZONES (PCRC primero, regla de marca comentada), PRICING y waLink(); los datos llevan comentarios de procedencia y fecha de confirmación ("confirmadas jun/2026"), lo que un segundo dev agradecería.
- Las 8 páginas institucionales (about, faq, contact, support, policy, deposit, terms, privacy) SÍ comparten vista única con dict T por locale (src/views/*.tsx), y el formulario de conversión es un solo componente RequestForm de 395 líneas reutilizado por ambos idiomas — cero duplicación donde más importa la consistencia legal.
- SEO técnico bien resuelto en código: lib/schema.ts centraliza JSON-LD (AutoRental, Product con AggregateOffer honesto, FAQ, breadcrumbs), lib/i18n.ts genera hreflang recíproco, sitemap.ts emite pares ES/EN con alternates, y lib/site-url.ts + IS_PREVIEW garantiza noindex en preview e index en producción con una sola variable.
- Detalles de calidad poco comunes en un sitio de este tamaño: honeypot anti-spam con éxito fingido (request-form.tsx:197-201), aria-pressed en filtros, skip-link, Suspense correcto alrededor de useSearchParams para export estático, y validación de mínimo de días por zona (Casa de Campo/La Romana 7+) integrada al formulario.

## Hallazgos
### [ALTA|debilidad|esfuerzo medio] Duplicación real de ~640 líneas en las 7 páginas del embudo ES vs EN, con drift ya visible
EVIDENCIA: Medido con difflib: home 163/248 líneas idénticas (66%), flota/[id] 150/208 (72%), alquiler/[zona] 118/150 (79%), precios 78/122, servicios 81/126; total ES 930 vs EN 909 líneas con 639 idénticas. Drift ya iniciado: (es)/flota/[id]/page.tsx:80 usa LINE_NAMES directo mientras en/fleet/[id]/page.tsx:81 usa lineName() — dos patrones para lo mismo en el mismo par.
RECOMENDACIÓN: Extraer views/home.tsx, views/model-detail.tsx, views/zone-landing.tsx, views/pricing.tsx y views/services.tsx con el mismo patrón T-dict que ya usan las 8 institucionales; las páginas quedan como wrappers de metadata (~30 líneas como solicitar-disponibilidad/page.tsx). Elimina ~640 líneas y un fix de UI deja de requerir dos ediciones espejo.

### [ALTA|riesgo|esfuerzo bajo] Contenido EN fragmentado del ES: DESC_EN y META_EN son dicts paralelos sin verificación de claves
EVIDENCIA: content/models.ts:44 (DESC_EN keyed por id, separado de models.json) y en/rentals/[zona]/page.tsx:18 (META_EN keyed por zona, separado de ZONE_LANDINGS). Si se añade el modelo #12 a models.json sin tocar DESC_EN, en/fleet/[id]/page.tsx:33 genera meta description "undefined Rent from US$50/day…" y productSchema EN sale con description undefined — sin error de build ni de tipo.
RECOMENDACIÓN: Mover descEn dentro de models.json junto a desc (el patrón ya existe: batteries trae name/nameEn) y meta EN dentro de ZONE_LANDINGS (que ya tiene heroTitleEn/introEn/faqsEn). Mientras tanto, un check de 5 líneas en models.ts que lance error en build si algún id no tiene DESC_EN.

### [ALTA|riesgo|esfuerzo medio] Cero tests y cero CI: el deploy a producción es un push forzado sin gate de lint/typecheck
EVIDENCIA: package.json solo tiene next/eslint (sin vitest/jest/playwright), no existe .github/workflows/, y scripts/deploy-prod.sh hace `npm run build` + `git push -qf` a gh-pages directo desde la máquina local.
RECOMENDACIÓN: Merecen test primero (por valor de negocio): (1) daysBetween + validación de fechas/mínimo por zona y armado del mensaje WhatsApp en request-form.tsx:129-217 — es EL mecanismo de conversión y su única verificación hoy es manual; (2) counterpartPath en lib/i18n.ts:27 (tabla + inversión de rutas, con casos blog→/en/ y raíces); (3) sync models.json↔DESC_EN↔imágenes; (4) schemas JSON-LD válidos. Vitest cubre 1-4 en una tarde; añadir workflow de GitHub Actions con typecheck+lint+build como gate del deploy.

### [MEDIA|riesgo|esfuerzo bajo] Precios hardcodeados en schema.ts desincronizables de pricing.ts
EVIDENCIA: lib/schema.ts:59-60 (`highPrice: model.pax >= 6 ? 85 : 65, offerCount: model.pax >= 6 ? 3 : 2`) y schema.ts:34 (priceRange "US$…–US$85") duplican a mano los tiers que viven en content/pricing.ts (PRICE_GROUPS). Si Kenny sube el Premium de US$85, el JSON-LD de los 11 modelos y el LocalBusiness quedan mintiendo a Google sin que nada lo detecte.
RECOMENDACIÓN: Derivar lowPrice/highPrice/offerCount de PRICE_GROUPS (max/min/count de tiers por grupo de plazas) y priceRange del mismo cálculo. ~10 líneas.

### [MEDIA|debilidad|esfuerzo medio] Sistema de estilos por copy-paste: ~31 botones volt con 7 variantes de padding y 31 kickers repetidos
EVIDENCIA: grep en src/: la clase de botón `rounded-full bg-volt … font-bold text-ink` aparece 31 veces con 7 combinaciones distintas de px/py (px-7 py-3.5 ×15, px-8 py-3.5 ×7, px-8 py-4 ×1…), y el kicker `uppercase tracking-[0.2em]` 31 veces. inputCls/labelCls en request-form.tsx:134-136 muestran que el patrón de extraer ya se conoce pero no se aplicó globalmente.
RECOMENDACIÓN: Crear components/ui.tsx con Button (variant primary/outline/dark, 2 tamaños), Kicker y SectionHeading. Un ajuste de marca (p.ej. radio o amarillo) pasa de ~30 ediciones a 1, y desaparecen las inconsistencias de tamaño ya presentes.

### [MEDIA|debilidad|esfuerzo bajo] El min de fecha del formulario usa UTC: desde las ~8pm hora de Punta Cana no se puede pedir llegada 'hoy'
EVIDENCIA: request-form.tsx:278 y 284: `min={new Date().toISOString().slice(0, 10)}` — toISOString() es UTC; a las 20:00 AST (UTC-4) ya es el día siguiente en UTC, así que el input bloquea la fecha de hoy justo en la franja nocturna en que un turista recién llegado pediría un cart para mañana temprano o mismo día.
RECOMENDACIÓN: Calcular el mínimo en hora local del negocio: formatear con Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santo_Domingo' }) (en-CA da YYYY-MM-DD) en un helper compartido para ambos inputs.

### [BAJA|debilidad|esfuerzo bajo] Dos root layouts casi idénticos con metadata y fuentes duplicadas
EVIDENCIA: app/(es)/layout.tsx y app/en/layout.tsx: 65 líneas cada uno, 56 idénticas (difflib); ambos declaran Bricolage_Grotesque/Inter, viewport, metadataBase, robots y openGraph. Un cambio de OG image o de robots exige recordar dos archivos.
RECOMENDACIÓN: El patrón de dos root layouts es válido para el 404 global con export estático, pero extraer las declaraciones de fuentes y un buildMetadata(locale) a lib/ para que cada layout quede en ~25 líneas sin duplicar valores.

### [BAJA|debilidad|esfuerzo bajo] Contenido de larga duración embebido en TypeScript (blog 385 líneas, manual de soporte 321)
EVIDENCIA: content/blog.ts:24+ (4 artículos con prosa completa en un array TS, con keys entrecomilladas estilo JSON inconsistentes con el resto del repo) y views/support.tsx (321 líneas donde ~80% es contenido del manual dentro del dict T).
RECOMENDACIÓN: No urge migrar a MDX, pero al menos separar la prosa a content/support.ts (como ya se hace con zones-landing.ts) para que las vistas queden solo con presentación; facilita que el asistente Bolt o un editor no-dev toque copy sin riesgo de romper JSX.

## Oportunidades
- Consolidar el embudo en views compartidas no solo elimina ~640 líneas: deja el sitio a un dict de distancia de un tercer idioma (francés — mercado turístico real de Punta Cana) sin tocar ningún TSX.
- Unificar TODO el contenido bilingüe bajo src/content/ (modelos con desc/descEn en el JSON, metas de zona dentro de ZONE_LANDINGS, dicts T de cada vista exportados desde content/) crea de facto un 'CMS de archivos' que el futuro asistente WhatsApp/Claude de Kenny podría editar con seguridad — hoy el copy vive repartido entre content/, views/ y páginas.
- GitHub Actions como gate y deploy: typecheck + lint + build + validación de sync de contenido (DESC_EN completo, imagen por modelo en public/) + Lighthouse CI con budget (TBT/LCP) en cada push, y publicación automática a gh-pages — reemplaza los scripts zsh manuales y evita que un build roto llegue a boltgolfcars.com.
- Suite mínima de confianza: Vitest para lógica pura (daysBetween, counterpartPath, priceFrom, schemas) + 1 test E2E de Playwright del flujo de conversión completo (llenar formulario → verificar que el link wa.me contiene el resumen correcto con zona y mínimo de días) — es el único camino de ingreso del negocio y hoy no lo protege nada.
- Dado que el TBT de 1900ms viene de hidratación y solo 4 componentes son 'use client' (header, fleet-grid, request-form, mobile-cta), hay margen para reducir JS enviado: header sin estado React (menú con <details> o CSS), y evaluar en Next 16 la opción de no enviar el runtime a las páginas 100% estáticas (legales/blog) — el refactor a views compartidas es el momento natural para hacerlo.
- Sistema de componentes UI mínimo (Button, Kicker, SectionHeading, Card) con los tokens de marca ya existentes (volt/ink/cream) — baja el costo de cada página futura (landings de temporada festiva 2026-27, página de Programa de Aliados) y garantiza consistencia visual sin auditorías manuales.


# SEGURIDAD

## Fortalezas
- Cero secretos en el repo y en todo el historial git: grep de api keys/tokens/passwords/PEM sobre src, scripts, public y los 18 commits (git rev-list --all --objects) solo devuelve el comentario 'Design Tokens' en globals.css:3; .gitignore cubre .env*, *.pem y /out/; los deploy scripts no incrustan credenciales (push HTTPS con keychain local).
- El formulario client-side es sólido contra XSS e inyección en wa.me: waLink() usa encodeURIComponent (src/content/site.ts:15), todo valor de usuario se renderiza vía JSX (auto-escape de React), el parámetro ?modelo= se valida con getModel() antes de usarse (request-form.tsx:159-161), hay honeypot anti-bot (líneas 197-201) y window.open lleva 'noopener,noreferrer' (línea 215).
- Los 18 target="_blank" del sitio llevan rel="noopener noreferrer" — verificados uno por uno con grep de contexto; cero excepciones.
- Superficie de dependencias mínima y limpia: solo 3 deps de producción (next 16.2.10, react/react-dom 19.2.4), npm audit reporta 0 vulnerabilidades, y hay override preventivo de postcss>=8.5.10 en package.json.
- HTTPS forzado extremo a extremo (http→301→https y www→apex 301, verificado con curl) y arquitectura sin backend: no hay servidor propio que atacar, no se almacena PII (el dato viaja directo al WhatsApp del cliente), y el JSON-LD solo serializa datos estáticos del repo.

## Hallazgos
### [ALTA|riesgo|esfuerzo bajo] boltgolfcars.com no tiene SPF ni DMARC: cualquiera puede enviar correos 'desde' el dominio con datos bancarios falsos
EVIDENCIA: dig TXT boltgolfcars.com y dig TXT _dmarc.boltgolfcars.com devuelven vacío (verificado hoy). Con las cuentas BLDH publicadas en /deposito, un atacante puede mandar 'reservas@boltgolfcars.com: la cuenta cambió, deposita aquí' y pasará filtros.
RECOMENDACIÓN: En el DNS de Hostinger, como el dominio no envía correo: TXT en raíz 'v=spf1 -all' y TXT en _dmarc 'v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s'. 10 minutos, gratis, y es LA mitigación #1 contra la suplantación del flujo de depósito.

### [ALTA|riesgo|esfuerzo bajo] La página de depósito no tiene advertencia anti-fraude
EVIDENCIA: src/views/deposit.tsx (copy completo ES/EN, líneas 5-42) y curl de https://boltgolfcars.com/deposito/ — no existe ningún texto tipo 'verifica siempre' o 'nunca cambiaremos la cuenta'. Publicar cuentas bancarias es intencional, pero sin ancla de verificación el cliente no puede distinguir un clon.
RECOMENDACIÓN: Añadir en deposit.tsx un bloque bilingüe: 'Estos son los ÚNICOS datos de pago de BOLT. Nunca los cambiaremos por chat, email ni llamada — verifícalos siempre en boltgolfcars.com/deposito y confirma cualquier duda solo al WhatsApp +1 809 839 8515.' Repetir la instrucción en el mensaje de confirmación de reserva por WhatsApp.

### [MEDIA|debilidad|esfuerzo medio] Sin ninguna cabecera de seguridad (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options)
EVIDENCIA: curl -I https://boltgolfcars.com/ — solo llegan headers de GitHub/Fastly (server, etag, cache-control) y access-control-allow-origin:*; GitHub Pages no permite headers personalizados.
RECOMENDACIÓN: Lo posible HOY en GH Pages: <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self' https://wa.me"> + <meta name="referrer" content="strict-origin-when-cross-origin"> en ambos root layouts ('unsafe-inline' es inevitable: la hidratación de Next en export estático no soporta nonces). Lo IMPOSIBLE vía meta: HSTS, frame-ancestors y X-Content-Type-Options — para tenerlos completos, poner Cloudflare free delante (HSTS nativo + Response Header Transform Rules) manteniendo GH Pages como origen.

### [MEDIA|riesgo|esfuerzo bajo] Posible takeover del dominio en GitHub Pages si el dominio no está verificado en GitHub
EVIDENCIA: dig www.boltgolfcars.com CNAME → kennyrosario18-max.github.io. Si el repo/Pages se borra, renombra o desactiva mientras el DNS sigue apuntando ahí, otro usuario de GitHub puede reclamar boltgolfcars.com y servir su propio contenido (vector clásico de phishing con cuentas bancarias falsas).
RECOMENDACIÓN: Verificar el dominio en GitHub: Settings (de la cuenta kennyrosario18-max) → Pages → 'Add a verified domain' → boltgolfcars.com (TXT de desafío en Hostinger). Eso bloquea que cualquier otra cuenta de GitHub use el dominio, aunque el repo desaparezca. Confirmar si ya está hecho — no es verificable desde fuera.

### [MEDIA|riesgo|esfuerzo bajo] krexpert.com (el email de contacto publicado) tiene DMARC en p=none — sin enforcement
EVIDENCIA: dig TXT _dmarc.krexpert.com → 'v=DMARC1; p=none; rua=mailto:postmaster@krexpert.com...'. info@krexpert.com aparece en el formulario, footer y JSON-LD del sitio; con p=none los correos suplantados solo se reportan, no se bloquean.
RECOMENDACIÓN: Revisar los reportes rua acumulados (deben mostrar solo Google como emisor legítimo) y subir a 'p=quarantine; pct=100' un par de semanas, luego 'p=reject'. SPF ya está bien (include:_spf.google.com ~all); confirmar que DKIM de Google Workspace esté activo antes de subir la política.

## Oportunidades
- Cloudflare free como proxy delante de GitHub Pages: resuelve de un golpe HSTS, CSP/frame-ancestors/X-Content-Type-Options por Transform Rules, y de regalo cache en edge y analytics sin cookies (que hoy no hay) — alineado con presupuesto cero.
- Publicar /.well-known/security.txt (hoy devuelve 404) con contacto info@krexpert.com y el WhatsApp oficial: canal formal para que investigadores o clientes reporten clones/phishing del flujo de depósito.
- Verificar el número de WhatsApp Business (+1 809 839 8515) con Meta (perfil de empresa completo, ideal check verde): es el ancla de confianza de TODA la conversión y del envío de comprobantes bancarios.
- Monitoreo barato de suplantación: Google Alerts para 'bolt golf cars' + 'boltgolfcars', y un dnstwist mensual sobre boltgolfcars.com para detectar typosquats (boltgolfcars.net/.do, bolt-golfcars.com) antes de que un cliente caiga.
- Incluir en la plantilla de confirmación de reserva por WhatsApp la frase fija 'Datos de pago SOLO en boltgolfcars.com/deposito' — convierte cada conversación en vacuna anti-phishing sin costo.
- Añadir registro CAA en el DNS ('0 issue letsencrypt.org') para limitar qué CAs pueden emitir certificados del dominio exacto — mitigación marginal pero gratuita contra certificados fraudulentos.


# CONVERSION

## Fortalezas
- Precio visible desde el primer scroll: el hero de home muestra "Desde US$50/día · 11 modelos" y /precios/ desglosa cada tier con ITBIS calculado (US$50→US$59.00), cumpliendo el claim "Lo que ves es lo que pagas" — verificado por curl en https://boltgolfcars.com y /precios/.
- CTA persistente y jerarquizado: barra fija móvil (class="fixed inset-x-0 bottom-0 z-40… md:hidden") con WhatsApp + "Solicitar disponibilidad" en todas las páginas, CTA repetido 5 veces en home siempre con el mismo texto de acción, y doble vía en fichas (formulario o "Consultar por WhatsApp" con mensaje precargado por modelo: wa.me/…?text=…Zycar%204).
- Formulario técnicamente sólido: honeypot antispam (input #extra-notas tabindex=-1), validación de orden de fechas y mínimo 7 días para Casa de Campo/La Romana, prefill por query (?modelo=zycar-4 desde la ficha, leído con URLSearchParams), autocomplete name/email/tel correcto, y fallback visible si WhatsApp no abre ("Si WhatsApp no se abrió automáticamente, escríbenos directo al…").
- Gestión de expectativas honesta que reduce ansiedad: "Nunca confirmamos automáticamente: cada solicitud la revisa nuestro equipo" en home y "siempre te responde una persona" en el formulario — coherente con el modelo operativo real sin backend.
- Señales de confianza estructurales presentes: "Vehículos asegurados" en hero y en "Tu renta incluye" de cada ficha, empresa legal con RNC 132-22400-2 y dirección física en footer, y enlaces a Términos/Privacidad justo debajo del botón de envío del formulario.

## Hallazgos
### [ALTA|debilidad|esfuerzo bajo] Cero medición de conversión: ni un solo tag de analytics en todo el embudo
EVIDENCIA: grep -i 'gtag|analytics|plausible|umami|fathom|posthog|clarity' sobre el HTML en vivo de home y /solicitar-disponibilidad/ devuelve 0 resultados (curl 2026-07-06)
RECOMENDACIÓN: Instalar Umami self-hosted en la VM Oracle free ya planificada (cookieless, sin banner de consentimiento, eventos custom gratis) o, como arranque en 1 hora, Cloudflare Web Analytics (gratis, sin cookies). Eventos mínimos: clic en cada wa.me (con página de origen), submit del formulario, clic en tel/email, y clic en la barra fija móvil. Sin esto, cualquier decisión CRO de temporada alta es a ciegas.

### [ALTA|riesgo|esfuerzo medio] El lead se pierde sin rastro si WhatsApp no abre o el usuario no pulsa enviar
EVIDENCIA: Chunk /_next/static/chunks/12eimhz7iwx3z.js: onSubmit ejecuta window.open(waLink(C),'_blank') y marca 'enviado' — no queda copia del lead en ningún lado; popup blockers y WhatsApp Web sin sesión rompen el flujo en desktop
RECOMENDACIÓN: Enviar el mismo payload en paralelo a un endpoint gratuito (Web3Forms o Formspree free tier → info@krexpert.com) antes de abrir wa.me, con fetch keepalive. Así cada solicitud queda registrada aunque el salto a WhatsApp falle, y de paso se obtiene la primera métrica de conversión real.

### [ALTA|riesgo|esfuerzo alto] Rendimiento móvil crítico en las páginas de entrada del embudo
EVIDENCIA: Lighthouse móvil producción (2026-07-05): home Perf 45 / LCP 4.3s / TBT 1900ms; ficha zycar-4 Perf 42 / LCP 5.1s; causa: hidratación React (main-thread 6.9s, bootup 2.5s), no imágenes
RECOMENDACIÓN: El visitante tipo es un turista en móvil con WiFi de resort: 5 segundos a LCP mata sesiones antes del hero. Priorizar en el roadmap 3.0 reducir JS cliente en home/fichas (son contenido estático; solo el formulario necesita interactividad real). Meta: LCP < 2.5s en home antes de temporada alta. Medir el impacto con el analytics del hallazgo 1.

### [MEDIA|debilidad|esfuerzo bajo] Fricción innecesaria: 7 campos obligatorios cuando el canal ya identifica al cliente
EVIDENCIA: HTML en vivo de /solicitar-disponibilidad/: required en nombre, email, whatsapp, llegada, salida, zona y pasajeros; el mensaje llega a BOLT desde el propio número del cliente, haciendo redundante 'WhatsApp *' y prescindible 'Correo electrónico *' para primer contacto
RECOMENDACIÓN: Reducir obligatorios a 4-5: nombre, fechas, zona, pasajeros. Hacer email y número de WhatsApp opcionales (útiles solo como respaldo). Cada campo obligatorio eliminado en móvil sube conversión de forma medible — y este formulario se llena desde el teléfono en una red de hotel.

### [MEDIA|debilidad|esfuerzo medio] Prueba social ausente en el 100% del embudo
EVIDENCIA: grep 'testimoni|reseña|review|aggregateRating' en home, /precios/, ficha y formulario = 0; no existe perfil de Google Business enlazado ni contador de operaciones
RECOMENDACIÓN: Mientras llegan reseñas reales (correcto no inventarlas): (1) crear Google Business Profile hoy y pedir reseña post-entrega con link directo en el mensaje de WhatsApp de cierre; (2) publicar números reales verificables ya disponibles: '67 carros en flota', 'entregas en PCRC, Cap Cana y Bávaro'; (3) logos de aliados B2B (PCConcierge, VOLALTO, RELAXINN) con su permiso en home. Añadir aggregateRating al JSON-LD solo cuando existan reseñas reales.

### [MEDIA|riesgo|esfuerzo bajo] Depósito 30% y garantía US$200 ocultos hasta después de la solicitud
EVIDENCIA: En home, /precios/, ficha zycar-4 y formulario la única mención es el link de footer 'Datos de depósito'; contradice el H1 de precios 'Tarifas claras, sin sorpresas'
RECOMENDACIÓN: Añadir una línea en /precios/ (junto al bloque de entrega) y una nota corta bajo el botón del formulario: 'Reserva con 30% de depósito + garantía reembolsable de US$200'. Descubrirlo en el chat de WhatsApp genera abandono justo en el paso más caro del embudo y erosiona la confianza construida.

### [BAJA|debilidad|esfuerzo bajo] Cero urgencia honesta pese a tener datos reales de escasez en temporada alta
EVIDENCIA: grep 'temporada alta|disponibilidad limitada|últimas' en home/precios/ficha = 0; el forecast festivo interno ya muestra pico de 22/47 carros y cuello de botella en 6 plazas
RECOMENDACIÓN: Añadir un aviso estacional verificable en /precios/ y el formulario: 'Diciembre–enero: los modelos de 6 plazas se agotan con semanas de antelación — reserva temprano'. Es escasez real (datos de flota propios), no manufacturada, y empuja la decisión sin dañar la marca.

### [BAJA|debilidad|esfuerzo medio] El formulario no muestra estimado de precio aunque ya calcula los días
EVIDENCIA: Chunk 12eimhz7iwx3z.js calcula f (número de días) y muestra '(N días)' en el mensaje; chunk 3pcqam-613cba.js expone priceFrom(pax) — los datos para estimar ya están en el cliente
RECOMENDACIÓN: Mostrar bajo las fechas un estimado en vivo: 'Estimado: desde US$X + ITBIS (N días, entrega incluida)'. Reduce la incertidumbre de precio justo antes del salto a WhatsApp y filtra expectativas antes de que lleguen al chat, ahorrando tiempo del equipo.

## Oportunidades
- Google Business Profile + circuito de reseñas post-entrega: mensaje de WhatsApp de cierre con link directo a reseñar. Es el motor de prueba social y SEO local más barato disponible y hoy no existe; en 60-90 días alimenta testimonios reales para el sitio y aggregateRating legítimo en el JSON-LD.
- Captura dual del lead (endpoint gratuito + wa.me) como puente hacia el CRM: el mismo payload del formulario puede entrar a Odoo (ya operativo en KR Experts) como lead, unificando el embudo web con la operación diaria y el futuro asistente de WhatsApp.
- Instrumentar y comparar los dos caminos de conversión: con eventos por página se puede saber si el formulario de 7 campos convierte mejor o peor que el botón directo 'Consultar por WhatsApp' de las fichas — hoy es imposible saberlo y la respuesta define dónde invertir.
- Campaña de temporada festiva 2026-27 con urgencia real: landing o banner estacional usando los datos propios de flota (pico 22/47, 6 plazas como cuello), con fecha límite honesta de reserva — el sitio se lanzó justo a tiempo para capitalizar la ventana de reservas de agosto-octubre.
- Estimador de precio interactivo (fechas + pasajeros → total con ITBIS y regla de entrega US$40/1 día) reutilizable en /precios/, fichas y formulario: convierte la transparencia de precios, que ya es la mayor fortaleza del sitio, en herramienta de decisión.
- Sesión de fotos propia en villa/resort para reemplazar el catálogo 720px heredado: fotos de carros entregados en escenarios reales de PCRC/Cap Cana duplican como prueba social implícita y activos para Instagram (@boltgolfcars ya enlazado en el código).
