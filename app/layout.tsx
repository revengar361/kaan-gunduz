import type { Metadata, Viewport } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SITE } from "@/content/site";
import { buildMetadata } from "@/content/seo";
import { graph, personSchema, localBusinessSchema, websiteSchema } from "@/lib/jsonld";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import MotionFlag from "@/components/ui/MotionFlag";

// Latin-Extended subset is REQUIRED for Turkish diacritics (ı, İ, ş, ğ, ç, ö, ü).
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...buildMetadata({
    title: `${SITE.name} | Sosyal Medya ve Dijital Strateji Uzmanı`,
    description: SITE.subline,
    path: "/",
  }),
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080809",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = graph(personSchema(), localBusinessSchema(), websiteSchema());

  return (
    <html lang="tr" className={`${manrope.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <MotionFlag />
        <SmoothScroll />
        <a href="#main" className="skip-link">
          İçeriğe geç
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
