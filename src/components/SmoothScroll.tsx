"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reduced } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";
import { useApp } from "./AppContext";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { ready, lang } = useApp();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;
    setLenis(lenis as never);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  /* Hold the page still (and reset to the top) while the preloader runs. */
  useEffect(() => {
    if (ready) {
      window.scrollTo(0, 0);
      lenisRef.current?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }

    window.scrollTo(0, 0);
    lenisRef.current?.stop();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [ready]);

  /* Re-measure every pinned / scroll-linked animation when layout changes. */
  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 340);
    return () => window.clearTimeout(id);
  }, [ready, lang]);

  return <>{children}</>;
}
