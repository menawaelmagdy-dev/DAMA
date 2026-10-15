"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, EASE, reduced } from "@/lib/gsap";
import { asset } from "@/lib/era";
import { useApp } from "../AppContext";
import { Arrow, Eyebrow, ParallaxImage, Reveal, RevealGroup, SplitLines } from "../ui";

export default function Typologies() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready || reduced()) return;
      gsap.fromTo(
        el.querySelectorAll(".typ-card"),
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: EASE.out,
          stagger: 0.12,
          scrollTrigger: { trigger: ".typ-grid", start: "top 78%", once: true },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="residences" ref={root} className="relative bg-paper py-20 md:py-32">
      <div className="u-edge">
        <div className="mb-10 grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow index="01" className="mb-6 text-ink-mute">
                {t.intro.region}
              </Eyebrow>
            </Reveal>
            <SplitLines as="h2" className="t-display text-[clamp(2rem,5.4vw,4.25rem)] text-ink">
              {t.map.labels[0]}
            </SplitLines>
          </div>
          <div className="flex flex-col justify-end gap-2 md:col-span-6 md:items-end">
            {t.map.labels.slice(1).map((l) => (
              <span key={l} className="t-eyebrow text-ink-mute">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16 md:mb-24">
        <ParallaxImage
          src={asset.masterPlan}
          alt={t.map.masterPlanAlt}
          className="aspect-16/10 w-full md:aspect-21/9"
          sizes="100vw"
          speed={7}
        />
      </div>

      <div className="u-edge">
        <RevealGroup selector=":scope > li" className="typ-grid grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {t.typologies.cards.map((card) => (
            <li key={card.slug} className="typ-card invisible group flex flex-col">
              <Link href={`/apartments?type=${card.slug}`} data-cursor="hover" className="flex flex-col">
                <div className="relative mb-7 aspect-4/5 w-full overflow-hidden bg-paper-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
                  <div>
                    <p className="t-eyebrow mb-1.5 text-ink-mute">{t.unit.bedrooms}</p>
                    <p className="t-display text-2xl text-ink">{card.beds}</p>
                  </div>
                  <div>
                    <p className="t-eyebrow mb-1.5 text-ink-mute">Area up to</p>
                    <p className="t-display text-2xl text-ink">{card.area}</p>
                  </div>
                </div>

                <p className="mb-5 max-w-md text-sm/relaxed text-ink-soft">{card.body}</p>

                <span className="t-eyebrow mb-4 inline-flex items-center gap-3 text-ink">
                  {card.cta}
                  <Arrow className="transition-transform duration-500 group-hover:translate-x-1.5" />
                </span>

                <h3 className="t-display text-[clamp(1.6rem,3.4vw,2.5rem)] text-ink transition-colors group-hover:text-accent">
                  {card.title}
                </h3>
              </Link>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
