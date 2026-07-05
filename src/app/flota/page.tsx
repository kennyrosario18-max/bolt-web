import type { Metadata } from "next";
import { FleetGrid } from "./fleet-grid";
import { MODELS } from "@/content/models";
import { PRICING } from "@/content/site";

export const metadata: Metadata = {
  title: "Flota — golf carts de 4 y 6 plazas",
  description:
    "Catálogo completo de golf carts BOLT en Punta Cana: líneas ECO, Club Car y Zycar, de 4 y 6 plazas, desde US$50/día con entrega en tu villa.",
};

export default function FleetPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">La flota</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {MODELS.length} modelos, 3 líneas
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            ECO, Club Car y Zycar — de 4 y 6 plazas, desde{" "}
            <span className="font-bold text-white">US${PRICING.from4pax}/día</span>. Todos con
            entrega en tu villa, seguro y soporte 24/7.
          </p>
          <p className="mt-1 text-sm italic text-white/60">
            Our full fleet — 4 and 6 seaters, delivered to your villa.
          </p>
        </div>
      </section>
      <FleetGrid />
    </>
  );
}
