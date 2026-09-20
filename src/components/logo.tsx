/** Marca BOLT: wordmark primero y el rayo DETRÁS (BOLT⚡).
 *  Brand Style Guide v1.0 (mayo 2026), confirmada por Kenny el 19/sep/2026.
 *  El rayo usa la forma asimétrica oficial. */
export function BoltLogo({ dark = false, size = 22 }: { dark?: boolean; size?: number }) {
  return (
    <span translate="no" className="inline-flex items-center gap-2">
      <span
        className={`font-display font-extrabold tracking-tight leading-none ${
          dark ? "text-white" : "text-ink"
        }`}
        style={{ fontSize: size }}
      >
        BOLT
      </span>
      <svg
        width={size * 0.72}
        height={size}
        viewBox="0 0 100 140"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M58 0 L0 78 L36 78 L28 140 L100 50 L60 50 L70 0 Z" fill="#FFD60A" />
      </svg>
    </span>
  );
}
