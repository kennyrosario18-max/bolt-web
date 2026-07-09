/** Iconografía de marca BOLT — SVG propios en vez de emojis del sistema.
 *  Los emojis (⚡📍🛡️💬) se pintan distinto en cada OS y rompen el amarillo
 *  único #FFD60A; estos heredan currentColor y son consistentes en todas partes. */

type IconProps = { className?: string; size?: number };

/** Rayo oficial BOLT (forma asimétrica v2), en el color del texto que lo rodea. */
export function BoltIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={(size * 0.72).toFixed(1)}
      height={size}
      viewBox="0 0 100 140"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M58 0 L0 78 L36 78 L28 140 L100 50 L60 50 L70 0 Z" />
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Pin de ubicación — entrega en la villa. */
export function PinIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/** Escudo — confiabilidad / mantenimiento. */
export function ShieldIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M12 3l7 2.5v5.5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V5.5L12 3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** Chat — soporte por WhatsApp 24/7. */
export function ChatIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.8L3 20.5l1.4-4.1A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z" />
    </svg>
  );
}

/** Check — confirmación / incluido. */
export function CheckIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}
