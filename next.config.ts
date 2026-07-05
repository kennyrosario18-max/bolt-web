import type { NextConfig } from "next";

// BASE_PATH se usa para el preview en GitHub Pages (/bolt-web).
// En producción (dominio raíz) queda vacío.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // next/image con unoptimized NO antepone basePath al src; se prefija a mano
  // en modelImage() usando esta variable inlineada en build.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
