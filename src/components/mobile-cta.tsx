import Link from "next/link";
import { waLink } from "@/content/site";

/** Barra fija inferior en móvil: la conversión siempre a un toque. */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <a
        href={waLink("Hola BOLT, quiero información sobre la renta de un golf cart.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 shrink-0 items-center justify-center rounded-full border-2 border-ok px-4 text-sm font-bold text-ok"
      >
        WhatsApp
      </a>
      <Link
        href="/solicitar-disponibilidad"
        className="flex h-12 flex-1 items-center justify-center rounded-full bg-volt text-sm font-bold text-ink"
      >
        ⚡ Solicitar disponibilidad
      </Link>
    </div>
  );
}
