import type { Metadata, Viewport } from "next";

import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/noto-kufi-arabic";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";

import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://dama-development.example"),
  title: {
    default: "DAMA Development — Rawasin, New Sohag",
    template: "%s — DAMA Development",
  },
  description:
    "Rawasin by DAMA Development — a boutique gated community of six buildings, four homes per floor and walking paths instead of corridors, in the heart of New Sohag, Upper Egypt.",
  keywords: [
    "Dama Development",
    "Rawasin Compound",
    "New Sohag",
    "Sohag real estate",
    "compound Sohag",
    "Egypt property developer",
  ],
  openGraph: {
    type: "website",
    title: "DAMA Development — Rawasin, New Sohag",
    description:
      "A boutique gated community of only six residential buildings in New Sohag, designed around privacy, wellbeing and timeless Egyptian living.",
    images: ["/images/community-day.jpg"],
    locale: "en_EG",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/community-day.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#16130f",
  width: "device-width",
  initialScale: 1,
};

const langBootstrap = `try{var l=localStorage.getItem('dama-lang')||'en';var d=l==='ar'?'rtl':'ltr';document.documentElement.lang=l;document.documentElement.dir=d;if(l==='ar'){document.documentElement.classList.add('is-ar')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBootstrap }} />
        <link rel="preload" as="image" href="/images/community-day.jpg" />
        {/* If JavaScript is unavailable, nothing should stay hidden behind an animation. */}
        <noscript>
          <style>{`
            .invisible { visibility: visible !important; }
            .opacity-0 { opacity: 1 !important; }
            .hero-frame { clip-path: none !important; transform: none !important; }
            .hero-media-inner { transform: none !important; }
            .hero-title-main, .hero-title-sub, .menu-item-inner { overflow: visible !important; }
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
