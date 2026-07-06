import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { JsonLdScriptProps, LOCAL_BUSINESS } from "@/lib/schema";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boltgolfcars.com"),
  title: {
    default: "BOLT Golf Cars — Renta de golf carts premium en Punta Cana",
    template: "%s | BOLT Golf Cars",
  },
  description:
    "Renta y venta de golf carts en Puntacana Resort & Club, Cap Cana y Bávaro. Entrega en tu villa, vehículos asegurados y soporte 24/7. Your ride in paradise.",
  // Preview: no indexar hasta el lanzamiento en el dominio raíz (se activa en F4).
  robots: { index: false, follow: false },
  openGraph: {
    siteName: "BOLT Golf Cars",
    locale: "es_DO",
    type: "website",
    images: ["/images/models/eco-cross-4-2.jpg"],
  },
};

export default function RootLayoutEs({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bricolage.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script {...JsonLdScriptProps(LOCAL_BUSINESS)} />
        <Header locale="es" />
        <main className="flex-1">{children}</main>
        <Footer locale="es" />
        <MobileCta locale="es" />
      </body>
    </html>
  );
}
