import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { BoltLogo } from "@/components/logo";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

/** 404 global (rutas no existentes) — bilingüe: GitHub Pages sirve este
    archivo (out/404.html) para cualquier URL desconocida, ES o EN.
    Al ser global-not-found no hereda layout: documento completo y ligero. */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${bricolage.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink text-white">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center px-6 py-20">
          <BoltLogo dark size={28} />
          <p className="mt-8 font-display text-6xl font-extrabold text-volt">404</p>
          <h1 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Esta página no existe
            <span className="mt-1 block text-lg font-semibold text-white/60" lang="en">
              This page doesn&apos;t exist
            </span>
          </h1>
          <p className="mt-4 max-w-md text-white/70">
            El carrito que buscas no está en esta ruta. Vuelve al inicio o explora la flota.
            <span lang="en" className="mt-1 block text-sm italic text-white/60">
              The cart you&apos;re looking for isn&apos;t on this road. Head home or browse the
              fleet.
            </span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-volt px-7 py-3.5 text-base font-bold text-ink"
            >
              Inicio · Home
            </Link>
            <Link
              href="/flota"
              className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white"
            >
              Ver la flota
            </Link>
            <Link
              href="/en/fleet"
              className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white"
              lang="en"
            >
              See the fleet
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
