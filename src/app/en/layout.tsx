import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { Analytics } from "@/components/analytics";
import { JsonLdScriptProps, LOCAL_BUSINESS } from "@/lib/schema";
import { IS_PREVIEW, SITE_URL } from "@/lib/site-url";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});


export const viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BOLT Golf Cars — Premium golf cart rental in Punta Cana",
    template: "%s | BOLT Golf Cars",
  },
  description:
    "Premium golf cart rental & sales in Puntacana Resort & Club, Cap Cana and Bávaro. Villa delivery and 24/7 support. Your ride in paradise.",
  // Preview (GitHub Pages) = noindex; el build de producción es indexable solo con quitar BASE_PATH.
  robots: { index: !IS_PREVIEW, follow: !IS_PREVIEW },
  openGraph: {
    siteName: "BOLT Golf Cars",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.png"] },
};

export default function RootLayoutEn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded-full focus:bg-volt focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <script {...JsonLdScriptProps(LOCAL_BUSINESS)} />
        <Header locale="en" />
        <main id="contenido" className="flex-1">{children}</main>
        <Footer locale="en" />
        <MobileCta locale="en" />
        <Analytics />
      </body>
    </html>
  );
}
