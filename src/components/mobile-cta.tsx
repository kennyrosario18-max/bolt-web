import Link from "next/link";
import { waLink } from "@/content/site";
import { BoltIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

/** Barra fija inferior en móvil: la conversión siempre a un toque. */
export function MobileCta({ locale = "es" }: { locale?: Locale }) {
  const es = locale === "es";
  return (
    <div id="mobile-cta" className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 p-3 backdrop-blur lg:hidden">
      <a
        href={waLink(
          es
            ? "Hola BOLT, quiero información sobre la renta de un golf cart."
            : "Hi BOLT, I would like information about renting a golf cart."
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 shrink-0 items-center justify-center rounded-full border-2 border-ok px-4 text-sm font-bold text-ok"
      >
        WhatsApp
      </a>
      <Link
        href={es ? "/solicitar-disponibilidad" : "/en/request-availability"}
        className="flex h-12 flex-1 items-center justify-center rounded-full bg-volt text-sm font-bold text-ink"
      >
        <BoltIcon className="mr-1.5 inline-block align-[-0.15em]" size={15} />
        {es ? "Solicitar disponibilidad" : "Request availability"}
      </Link>
    </div>
  );
}
