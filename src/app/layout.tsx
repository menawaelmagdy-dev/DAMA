import type { Metadata, Viewport } from "next";

import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/dm-sans";

import "./globals.css";
import AppShell from "@/components/AppShell";
import { copy, site } from "@/lib/content";
import { asset } from "@/lib/era";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: copy.meta.title,
    template: "%s",
  },
  description: copy.meta.description,
  keywords: [
    "Era Residence",
    "Estepona apartments",
    "New Golden Mile",
    "Costa del Sol property",
    "boutique gated community",
    "duplex penthouse Estepona",
    "Marbella golden age",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: copy.meta.title,
    description: copy.meta.description,
    images: [asset.heroDay],
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#14130f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* If JavaScript is unavailable, nothing should stay hidden behind an animation. */}
        <noscript>
          <style>{`
            .invisible { visibility: visible !important; }
            .opacity-0 { opacity: 1 !important; }
            .hero-frame { clip-path: none !important; transform: none !important; }
            .hero-media-inner { transform: none !important; }
            .hero-title-line, .menu-item-inner, .pre-word { overflow: visible !important; }
            [style*="clip-path"] { clip-path: none !important; }
            .pre-panel, .menu-panel { display: none !important; }
          `}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
