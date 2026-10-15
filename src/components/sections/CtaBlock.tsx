"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reduced } from "@/lib/gsap";
import { img } from "@/lib/media";
import { useApp } from "../AppContext";
import { Pill, Reveal, SplitLines } from "../ui";

export default function CtaBlock() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current) return;

      if (reduced()) {
        gsap.set(".cta-inner-img", { scale: 1, yPercent: 0 });
        return;
      }

      gsap.fromTo(
        ".cta-inner-img",
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
        <Image
          src={img.cta}
          alt=""
          fill
          sizes="100vw"
          quality={84}
          className="cta-inner-img object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/80" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 w-full u-edge py-24 text-center text-sand-50 md:py-32">
        <SplitLines
          as="h2"
          stagger={0.07}
          className="t-display mx-auto max-w-5xl text-[clamp(2.2rem,7vw,6rem)] leading-[0.95]"
        >
          {`${t.cta.title} — ${t.cta.line2}`}
        </SplitLines>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-sm/relaxed text-sand-100/75 md:text-base/relaxed">
            {t.cta.lead}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Pill href="/apartments" variant="light">
            {t.cta.button}
          </Pill>
          <Pill href="/contact" variant="ghost">
            {t.cta.secondary}
          </Pill>
        </Reveal>
      </div>
    </section>
  );
}
