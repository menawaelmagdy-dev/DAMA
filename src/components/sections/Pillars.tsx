"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/gsap";
import { useApp } from "../AppContext";
import { Eyebrow, Reveal } from "../ui";

export default function Pillars() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready || reduced()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".pillar-card", el);

      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.955,
          yPercent: -2,
          autoAlpha: 0.5,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 25%", scrub: true },
        });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} className="relative bg-ink pt-20 pb-24 text-paper md:pt-32 md:pb-36">
      <div className="u-edge mb-12 md:mb-20">
        <Reveal>
          <Eyebrow index="05" className="mb-6 text-paper/60">
            Era Residence
          </Eyebrow>
        </Reveal>
      </div>

      <div className="u-edge flex flex-col gap-6">
        {t.pillars.map((card, i) => (
          <div
            key={card.title}
            className="pillar-card sticky"
            style={{ top: `calc(5rem + ${i * 1.25}rem)`, transformOrigin: "center top" }}
          >
            <article className="grid grid-cols-1 gap-8 bg-paper p-8 text-ink md:grid-cols-12 md:p-14">
              <span className="t-num t-eyebrow text-accent md:col-span-2">0{i + 1}</span>
              <h3 className="t-display text-[clamp(1.8rem,4.4vw,3.25rem)] md:col-span-5">{card.title}</h3>
              <p className="max-w-xl text-sm/relaxed text-ink-soft md:col-span-5 md:text-base/relaxed">
                {card.body}
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
