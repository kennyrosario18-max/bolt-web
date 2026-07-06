# BOLT — Sistema de Diseño (v2)

> Fuente de verdad del lenguaje visual de boltgolfcars.com. Todo cambio de marca
> (color, radio, tamaño de CTA, iconografía) se hace **aquí y en los tokens**, no
> repetido por página. Creado en BOLT 3.0 · Fase F2 (Design System).

---

## 1. Tokens de color

Definidos una sola vez en [`src/app/globals.css`](../src/app/globals.css) como
variables CSS y expuestos a Tailwind vía `@theme inline`. **No se usan colores
fuera de esta paleta.**

| Token Tailwind | Variable | Hex | Uso |
| --- | --- | --- | --- |
| `volt` | `--bolt-yellow` | `#FFD60A` | Amarillo único de marca. Acentos, CTAs primarios, rayo. |
| `volt-dark` | `--bolt-yellow-dark` | `#8A6A00` | Amarillo AA sobre fondos claros (texto, numeración). |
| `ink` | `--bolt-ink` | `#0A0A0A` | Negro de marca. Fondos hero, texto de titulares. |
| `inktext` | `--bolt-body` | `#2B2B2B` | Texto de cuerpo. |
| `steel` | `--bolt-grey` | `#71717A` | Texto secundario / subtítulos. |
| `line` | `--bolt-line` | `#E8E8EA` | Bordes y separadores. |
| `cream` | `--bolt-cream` | `#FFFBEA` | Fondos suaves de sección/tarjeta. |
| `ok` | `--bolt-success` | `#15803D` | Verde AA (checks, reglas permitidas). |
| `danger` | `--bolt-danger` | `#B91C1C` | Rojo AA (avisos, reglas prohibidas). |

`ok` y `danger` fueron oscurecidos respecto a la v1 para cumplir contraste AA
como texto sobre blanco/cream.

## 2. Tipografía

| Rol | Familia | Token | Aplicación |
| --- | --- | --- | --- |
| Display / titulares | Bricolage Grotesque | `font-display` | `h1,h2,h3` (forzado en `@layer base`), CTAs, precios. |
| Cuerpo | Inter | `font-sans` | Todo el texto corrido. |

Los titulares usan `text-wrap: balance` y heredan `color: ink`, sobreescribible
con `text-white` en heroes oscuros.

## 3. Radios

| Token | Valor | Uso |
| --- | --- | --- |
| `rounded-card` | 14px | Tarjetas, paneles, contenedores. |
| `rounded-box` | 10px | Cajas internas (specs, items de lista). |
| `rounded-full` | — | Todos los botones/CTAs y píldoras. |

## 4. Iconografía de marca — `src/components/icons.tsx`

**Regla:** los emojis del sistema (`⚡ 📍 🛡️ 💬 ✓`) se pintan distinto en cada
sistema operativo y rompen el amarillo único. Se reemplazan por SVG propios que
**heredan `currentColor`** y son idénticos en todas las plataformas.

| Componente | Reemplaza | Notas |
| --- | --- | --- |
| `BoltIcon` | `⚡` | Rayo asimétrico oficial v2 (`viewBox 0 0 100 140`, `fill`). Ratio 0.72. |
| `PinIcon` | `📍` | Entrega en la villa. Stroke 1.75. |
| `ShieldIcon` | `🛡️` | Vehículo asegurado. |
| `ChatIcon` | `💬` | Soporte WhatsApp 24/7. |
| `CheckIcon` | `✓` | Confirmación / incluido. Verde `text-ok`. |

Todos aceptan `{ className?, size? }` y son `aria-hidden` (decorativos junto a
texto). Los de trazo comparten `strokeWidth 1.75`, `linecap/linejoin round`.

### Convenciones de uso
- **Bolt inline en un CTA:** `<BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />` antes de la etiqueta.
- **Icono de lista (flex):** `<CheckIcon className="mt-0.5 shrink-0 text-ok" size={16} />` como primer hijo del `<li className="flex gap-2">`.
- **Icono grande de confirmación:** `<BoltIcon className="mx-auto text-volt" size={44} />`.

### Excepciones deliberadas (el `⚡`/`✓` **sí** se conservan como texto)
Estos no son UI decorativa sino **contenido**, y en su contexto renderizan
consistente (glifo monocromo o destino externo):
1. **Firma legal del footer** — `"BOLT ⚡ es una marca operada por…"`. Es la firma de marca en prosa.
2. **Cuerpo de mensajes de WhatsApp** — p. ej. `"Hola BOLT ⚡ Quiero consultar…"`. El `⚡` viaja en el texto que se envía y se muestra en el chat de WhatsApp, fuera de nuestra UI.
3. **Header del mensaje de solicitud** — `"⚡ SOLICITUD DE DISPONIBILIDAD — boltgolfcars.com"`, ídem: texto de mensaje, no botón.
4. **`✓` en frases/encabezados** — beneficios de aliado en `services.tsx` y el encabezado `"✓ Reglas permitidas"` en `soporte`. Aquí el check es un glifo monocromo dentro del flujo de texto (no un slot de icono) y hereda el color del texto sin romper la marca.

## 5. Primitivos de UI — `src/components/ui.tsx`

Centralizan clases repetidas. Un ajuste de marca pasa de decenas de ediciones a
una sola.

### `buttonClass(variant, size)`
Base: `inline-flex items-center justify-center gap-1.5 rounded-full`.

| `variant` | Aspecto | Cuándo |
| --- | --- | --- |
| `primary` (def.) | Relleno amarillo, texto ink, `hover:scale-105` | CTA principal. |
| `outlineDark` | Borde blanco → volt en hover | CTA secundario sobre hero negro. |
| `outlineLight` | Borde ink, hover cream | CTA secundario sobre fondo claro. |
| `dark` | Relleno ink, texto volt | Inverso. |
| `subtle` | Borde `line`, hover ink | Terciario (p. ej. WhatsApp). |

| `size` | Padding · texto |
| --- | --- |
| `lg` (def.) | `px-7 py-3.5 text-base` |
| `md` | `px-6 py-3 text-sm` |

Uso: `<Link className={buttonClass("primary")}>…</Link>`. El `gap-1.5` de la base
alinea el `BoltIcon` con la etiqueta sin ajustes extra.

### Otros
- **`<Kicker tone="dark|light">`** — eyebrow en mayúsculas con tracking. `dark` → `text-volt` (hero negro); `light` → `text-volt-dark` (sección clara).
- **`<SectionHeading before highlight after>`** — `h2` con el "marcador eléctrico" (`.hl`) sobre `highlight`.
- **`<Card className>`** — contenedor `rounded-card border-line p-6`.

## 6. Marcador eléctrico (`.hl`)

Resaltado amarillo tipo subrayador sobre frases clave, definido en `globals.css`.
Variante `.hl-dark` (texto amarillo) para fondos oscuros.

## 7. Foco accesible

Anillo de foco unificado en `globals.css` para navegación por teclado:
`outline: 2px solid var(--bolt-yellow)` con `offset 2px` sobre
`a/button/summary/[tabindex]:focus-visible`. Los inputs conservan su propio
`focus-visible:ring`. Visible en cualquier fondo → cumple WCAG 2.4.7.

## 8. Movimiento

`@media (prefers-reduced-motion: reduce)` neutraliza animaciones y transiciones
(`0.01ms`). Respeta la preferencia del sistema del usuario.

---

### Cómo extender
- ¿Color nuevo? Añádelo a `:root` **y** a `@theme inline` en `globals.css`. Nunca un hex suelto en un componente.
- ¿Icono nuevo? Un SVG `currentColor` en `icons.tsx`, `aria-hidden`, con `{ className, size }`.
- ¿Variante de botón? Amplía `VARIANT`/`SIZE` en `ui.tsx`; no dupliques cadenas de clases por página.
