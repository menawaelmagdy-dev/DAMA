"use client";

/* eslint-disable @next/next/no-img-element -- GSAP animates these transforms directly */

import Link from "next/link";
import { useRef } from "react";
import { gsap, Draggable, useGSAP, EASE, reduced } from "@/lib/gsap";
import { img } from "@/lib/media";
import type { UnitTypeKey } from "@/lib/content";
import { useApp } from "../AppContext";
import { Arrow, Eyebrow, Reveal, SplitLines } from "../ui";

const CARDS: { key: UnitTypeKey; image: keyof typeof img; beds: string; area: string }[] = [
  { key: "ground-garden", image: "terrace", beds: "3", area: "130 — 145 m²" },
  { key: "typical", image: "living", beds: "3", area: "140 — 160 m²" },
  { key: "duplex", image: "rooftop", beds: "3 — 4", area: "190 — 240 m²" },
  { key: "commercial", image: "walkway", beds: "1 — 2", area: "45 — 120 m²" },
];

export default function UnitTypes() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const vp = viewport.current;
      if (!vp || !ready) return;

      if (reduced()) {
        gsap.set(root.current!.querySelectorAll(".unit-card"), { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        root.current!.querySelectorAll(".unit-card"),
        { autoAlpha: 0, y: 46 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: EASE.out,
          stagger: 0.12,
          scrollTrigger: { trigger: vp, start: "top 80%", once: true },
        },
      );

      /* drag-to-scroll with inertia, layered on top of native scrolling */
      const proxy = document.createElement("div");
      let startX = 0;

      const drag = Draggable.create(proxy, {
        type: "x",
        trigger: vp,
        inertia: true,
        allowNativeTouchScrolling: true,
        onPress() {
          startX = vp.scrollLeft;
        },
        onDrag() {
          vp.scrollLeft = startX - this.x;
        },
        onThrowUpdate() {
          vp.scrollLeft = startX - this.x;
        },
      });

      return () => drag.forEach((d) => d.kill());
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="residences" ref={root} className="relative bg-sand-100 py-20 md:py-32">
      <div className="u-edge mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <Eyebrow index="01" className="mb-6 text-ink-mute">
              {t.units.eyebrow}
            </Eyebrow>
          </Reveal>
          <SplitLines as="h2" className="t-display text-[clamp(2rem,5.6vw,4.75rem)] text-ink">
            {t.units.title}
          </SplitLines>
        </div>
        <Reveal delay={0.1}>
          <p className="t-eyebrow max-w-xs text-ink-mute">{t.map.drag}</p>
        </Reveal>
      </div>

      <div
        ref={viewport}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,4vw,5.5rem)] pb-4 md:gap-8"
        data-cursor="drag"
        data-cursor-label={t.map.drag}
      >
        {CARDS.map((card) => {
          const type = t.units.types[card.key];
          return (
            <article
              key={card.key}
              className="unit-card invisible group snap-start"
              style={{ width: "min(84vw, 30rem)", flex: "0 0 auto" }}
            >
              <Link href={`/apartments?type=${card.key}`} data-cursor="hover" className="block">
                <div className="relative mb-6 aspect-4/5 w-full overflow-hidden bg-sand-200">
                  <img
                    src={img[card.image]}
                    alt={type.name}
                    className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                    loading="lazy"
                  />
                  <span className="t-eyebrow absolute start-4 top-4 rounded-full bg-sand-50/90 px-3 py-1.5 text-ink">
                    {t.apartments.statusLabel.available}
                  </span>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-4 border-t border-ink/12 pt-5">
                  <div>
                    <p className="t-eyebrow mb-1.5 text-ink-mute">{t.units.bedrooms}</p>
                    <p className="t-display text-2xl text-ink">{card.beds}</p>
                  </div>
                  <div>
                    <p className="t-eyebrow mb-1.5 text-ink-mute">{t.units.area}</p>
                    <p className="t-display text-2xl text-ink">{card.area}</p>
                  </div>
                </div>

                <h3 className="t-display mb-3 text-3xl text-ink transition-colors group-hover:text-clay">
                  {type.name}
                </h3>
                <p className="mb-6 max-w-md text-sm/relaxed text-ink-soft">{type.body}</p>

                <span className="t-eyebrow inline-flex items-center gap-3 text-ink">
                  {t.units.cta}
                  <Arrow className="transition-transform duration-500 group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
                </span>
              </Link>
            </article>
          );
        })}

        {/* end card */}
        <div className="flex shrink-0 snap-start items-center" style={{ width: "min(50vw, 16rem)" }}>
          <Link
            href="/apartments"
            data-cursor="hover"
            className="t-eyebrow flex h-32 w-32 flex-col items-center justify-center gap-3 rounded-full border border-ink/20 text-center text-ink transition-colors hover:border-ink hover:bg-ink hover:text-sand-50"
          >
            {t.units.eyebrow}
          </Link>
        </div>
      </div>
    </section>
  );
}
