import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ambient from "@/components/Ambient";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import ToastHost from "@/components/ToastHost";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://aquaris.ng"),
  title: {
    default: "AQUARIS — Premium Table Water, Purified in Seven Stages",
    template: "%s · AQUARIS Table Water",
  },
  description:
    "AQUARIS is premium Nigerian table water: seven-stage purified, sealed at the source in Ogun State and delivered same-day across Lagos. Shop packs, office refills and wholesale.",
  keywords: [
    "table water Nigeria",
    "bottled water Lagos",
    "premium table water",
    "drinking water delivery",
    "water dispenser refill",
    "table water wholesale",
    "water distributors Lagos",
    "AQUARIS water",
  ],
  authors: [{ name: brand.legal }],
  creator: brand.legal,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://aquaris.ng",
    siteName: "AQUARIS",
    title: "AQUARIS — Pure refreshment. Every drop matters.",
    description:
      "Seven-stage purified table water from a protected Nigerian aquifer. Sealed at the source, delivered chilled, on schedule.",
    images: [{ url: "/images/hero-bottle.webp", width: 1408, height: 768, alt: "AQUARIS bottled water" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AQUARIS — Pure refreshment. Every drop matters.",
    description: "Premium Nigerian table water, purified in seven stages and delivered to your door.",
    images: ["/images/hero-bottle.webp"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#03141d",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AQUARIS Table Water",
  legalName: brand.legal,
  description:
    "Premium table water company producing seven-stage purified drinking water in Ogun State and delivering across Nigeria.",
  url: "https://aquaris.ng",
  logo: "https://aquaris.ng/icon.svg",
  image: "https://aquaris.ng/images/hero-bottle.webp",
  telephone: brand.phone,
  email: brand.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "14 Admiralty Way, Lekki Phase 1",
    addressLocality: "Lagos",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  areaServed: ["Lagos", "Abuja", "Ogun", "Rivers", "Enugu", "Kano", "Oyo"],
  priceRange: "₦₦",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;clip-path:none !important}`}</style>
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <StoreProvider>
          <Ambient />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <ToastHost />
          <WhatsAppFloat />
        </StoreProvider>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
