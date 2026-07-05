import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestForm } from "./request-form";

export const metadata: Metadata = {
  title: "Solicitar disponibilidad",
  description:
    "Solicita la disponibilidad de tu golf cart BOLT en Punta Cana. Nuestro equipo verifica y te confirma por WhatsApp lo antes posible.",
};

export default function RequestPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">
            Solicitud de disponibilidad
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Tu BOLT, a un paso
          </h1>
          <p className="mt-3 text-white/70">
            Completa el formulario y nuestro equipo verificará la disponibilidad de tu modelo.
            Ninguna reserva se confirma automáticamente — siempre te responde una persona.
          </p>
          <p className="mt-1 text-sm italic text-white/40">
            Send your request — our team confirms availability personally.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Suspense fallback={null}>
          <RequestForm />
        </Suspense>
      </section>
    </>
  );
}
