"use client";

/* eslint-disable @next/next/no-img-element -- GSAP animates these transforms directly */

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/gsap";
import { img } from "@/lib/media";
import { useApp } from "../AppContext";
import { Eyebrow, Reveal } from "../ui";

const CARDS: (keyof typeof img)[] = ["garden", "living", "pool"];

export default function SpaceCards() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready || reduced()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".space-card");

      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.955,
          yPercent: -2,
          autoAlpha: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top 25%",
            scrub: true,
          },
        });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} className="relative bg-ink pt-20 pb-24 text-sand-50 md:pt-32 md:pb-36">
      <div className="u-edge mb-12 md:mb-20">
        <Reveal>
          <Eyebrow index="05" className="mb-6 text-sand-100/60">
            {t.space.eyebrow}
          </Eyebrow>
        </Reveal>
      </div>

      <div className="u-edge flex flex-col gap-6">
        {t.space.cards.map((card, i) => (
          <div
            key={i}
            className="space-card sticky"
            style={{ top: `calc(5rem + ${i * 1.25}rem)`, transformOrigin: "center top" }}
          >
            <article className="grid grid-cols-1 overflow-hidden bg-sand-50 text-ink md:grid-cols-2">
              <div className="relative aspect-16/10 md:aspect-auto md:min-h-[26rem]">
                <img
                  src={img[CARDS[i]]}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center gap-6 p-7 md:p-14">
                <span className="t-num t-eyebrow text-clay">0{i + 1}</span>
                <h3 className="t-display text-[clamp(1.7rem,3.8vw,2.9rem)] text-ink">{card.title}</h3>
                <p className="max-w-md text-sm/relaxed text-ink-soft md:text-base/relaxed">{card.body}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
