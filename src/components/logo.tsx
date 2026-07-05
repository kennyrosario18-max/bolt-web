/** Marca BOLT: rayo SIEMPRE primero (⚡ BOLT), forma asimétrica oficial v2. */
export function BoltLogo({ dark = false, size = 22 }: { dark?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size * 0.72}
        height={size}
        viewBox="0 0 100 140"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M58 0 L0 78 L36 78 L28 140 L100 50 L60 50 L70 0 Z" fill="#FFD60A" />
      </svg>
      <span
        className={`font-display font-extrabold tracking-tight leading-none ${
          dark ? "text-white" : "text-ink"
        }`}
        style={{ fontSize: size }}
      >
        BOLT
      </span>
    </span>
  );
}
