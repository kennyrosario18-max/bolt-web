import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestForm } from "@/app/(es)/solicitar-disponibilidad/request-form";
import { hreflang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Request availability",
  description:
    "Request availability for your BOLT golf cart in Punta Cana. Our team verifies the fleet and confirms via WhatsApp as soon as possible.",
  alternates: {
    canonical: "/en/request-availability/",
    ...hreflang("/solicitar-disponibilidad/", "/en/request-availability/"),
  },
};

export default function RequestPageEn() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt">
            Availability request
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your BOLT, one step away
          </h1>
          <p className="mt-3 text-white/70">
            Fill in the form and our team will verify availability for your model. No booking is
            ever confirmed automatically — a real person always replies.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Suspense fallback={null}>
          <RequestForm locale="en" />
        </Suspense>
      </section>
    </>
  );
}
