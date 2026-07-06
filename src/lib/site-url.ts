/** URL base según el entorno de build.
    BASE_PATH solo se define en el build de preview (GitHub Pages /bolt-web);
    el build de producción (dominio raíz) no lo define. Así, canonicals,
    og:image, JSON-LD y sitemap apuntan siempre al host correcto. */
export const IS_PREVIEW = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

export const SITE_URL = IS_PREVIEW
  ? "https://kennyrosario18-max.github.io/bolt-web"
  : "https://boltgolfcars.com";
