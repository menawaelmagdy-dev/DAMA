"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/gsap";
import { useApp } from "../AppContext";
import { Pill, Reveal, SplitLines } from "../ui";

export default function ClosingCta() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current) return;
      if (reduced()) {
        gsap.set(".closing-img", { scale: 1, yPercent: 0 });
        return;
      }
      gsap.fromTo(
        ".closing-img",
        { yPercent: -8, scale: 1.14 },
        {
          yPercent: 8,
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.closing.image} alt="" className="closing-img h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink/80" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 w-full u-edge py-24 text-center text-paper md:py-32">
        <SplitLines as="h2" stagger={0.07} className="t-display mx-auto max-w-5xl text-[clamp(2.2rem,7vw,6rem)]">
          {t.closing.title}
        </SplitLines>
        <SplitLines as="h3" stagger={0.06} className="t-display mx-auto mt-2 max-w-5xl text-[clamp(1.6rem,4.5vw,3.5rem)] italic">
          {t.closing.subtitle}
        </SplitLines>

        <Reveal delay={0.2} className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Pill href="/apartments" variant="light">
            {t.closing.cta}
          </Pill>
        </Reveal>
      </div>
    </section>
  );
}
