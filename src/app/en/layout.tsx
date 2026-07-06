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
    default: "BOLT Golf Cars — Premium golf cart rental in Punta Cana",
    template: "%s | BOLT Golf Cars",
  },
  description:
    "Premium golf cart rental & sales in Puntacana Resort & Club, Cap Cana and Bávaro. Villa delivery, insured vehicles, 24/7 support. Your ride in paradise.",
  // Preview: noindex until launch on the root domain (flipped in F4).
  robots: { index: false, follow: false },
  openGraph: {
    siteName: "BOLT Golf Cars",
    locale: "en_US",
    type: "website",
    images: ["/images/models/eco-cross-4-2.jpg"],
  },
};

export default function RootLayoutEn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script {...JsonLdScriptProps(LOCAL_BUSINESS)} />
        <Header locale="en" />
        <main className="flex-1">{children}</main>
        <Footer locale="en" />
        <MobileCta locale="en" />
      </body>
    </html>
  );
}
