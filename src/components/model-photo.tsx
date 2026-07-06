/** Foto de modelo optimizada (F5-C) — <picture> con AVIF responsive (640/960)
 *  y el JPG original como fallback universal. Reemplaza a next/image para las
 *  fotos de flota: sirve AVIF más liviano donde el navegador lo soporta y no
 *  depende de sharp en build (los AVIF se generan y comitean con
 *  scripts/optimize-images.mjs). Pensado para un contenedor `relative`
 *  (rellena con object-cover, como el modo fill de next/image). */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ModelPhoto({
  id,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  id: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const base = `${BASE}/images/models`;
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${base}/opt/${id}-640.avif 640w, ${base}/opt/${id}-960.avif 960w`}
        sizes={sizes}
      />
      <img
        src={`${base}/${id}.jpg`}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
