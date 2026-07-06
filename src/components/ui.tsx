import type { ReactNode } from "react";

/** Sistema de UI de BOLT — primitivos con los tokens de marca.
 *  Centraliza las clases repetidas por el sitio: un ajuste de marca (radio,
 *  amarillo, tamaño de CTA) pasa de decenas de ediciones a una sola aquí. */

// ── Botones / CTAs ──────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "outlineDark" | "outlineLight" | "dark" | "subtle";
type ButtonSize = "lg" | "md";

const SIZE: Record<ButtonSize, string> = {
  lg: "px-7 py-3.5 text-base",
  md: "px-6 py-3 text-sm",
};

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-volt font-bold text-ink transition-transform hover:scale-105",
  outlineDark:
    "border border-white/30 font-semibold text-white transition-colors hover:border-volt hover:text-volt",
  outlineLight: "border border-ink font-semibold text-ink hover:bg-cream",
  dark: "bg-ink font-bold text-volt",
  subtle: "border border-line font-semibold text-inktext hover:border-ink",
};

/** Clases de un CTA. Úsalo en cualquier <Link>/<a>/<button>:
 *  <Link className={buttonClass("primary")} …> */
export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "lg"): string {
  return `inline-flex items-center justify-center gap-1.5 rounded-full ${SIZE[size]} ${VARIANT[variant]}`;
}

// ── Kicker (eyebrow) ─────────────────────────────────────────────────────────
export function Kicker({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  // tone = fondo: "dark" (hero negro → amarillo) / "light" (sección clara → volt-dark)
  return (
    <p
      className={`text-sm font-bold uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-volt" : "text-volt-dark"
      }`}
    >
      {children}
    </p>
  );
}

// ── Encabezado de sección con "marcador eléctrico" ──────────────────────────
export function SectionHeading({
  before,
  highlight,
  after,
  className = "font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
}: {
  before?: string;
  highlight: string;
  after?: string;
  className?: string;
}) {
  return (
    <h2 className={className}>
      {before}
      <span className="hl">{highlight}</span>
      {after}
    </h2>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-card border border-line p-6 ${className}`}>{children}</div>;
}
