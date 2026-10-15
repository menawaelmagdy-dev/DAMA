"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/gsap";
import { useApp } from "../AppContext";
import { Eyebrow, ParallaxImage, Pill, Reveal, SplitLines } from "../ui";

export default function Concept() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current) return;
      if (reduced()) {
        gsap.set(".concept-mark", { scaleX: 1 });
        return;
      }
      gsap.fromTo(
        ".concept-mark",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "luxInOut",
          scrollTrigger: { trigger: ".concept-mark", start: "top 92%", once: true },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="concept" ref={root} className="relative bg-paper py-20 md:py-32">
      <div className="u-edge">
        <div className="concept-mark mb-14 h-px w-full origin-left bg-line md:mb-20" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow className="mb-6 text-ink-mute">{t.concept.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <SplitLines as="h2" stagger={0.06} className="t-display text-[clamp(1.6rem,4.2vw,3.4rem)] text-ink">
              {t.concept.lead}
            </SplitLines>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 md:mt-20 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <ParallaxImage
              src={t.concept.image}
              alt={t.concept.title}
              className="aspect-4/5 w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              speed={8}
            />
          </div>
          <div className="md:col-span-6 md:ps-8">
            <Reveal>
              <p className="mb-10 max-w-xl text-sm/relaxed text-ink-soft md:text-base/relaxed">
                {t.concept.body}
              </p>
              <Pill href="/apartments">{t.concept.cta}</Pill>
            </Reveal>
          </div>
        </div>

        {/* place block */}
        <div className="mt-20 grid grid-cols-1 items-center gap-10 md:mt-32 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <ParallaxImage
              src={t.concept.placeImage}
              alt={t.concept.placeTitle}
              className="aspect-4/3 w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              speed={8}
            />
          </div>

          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow className="mb-6 text-ink-mute">{t.concept.placeEyebrow}</Eyebrow>
            </Reveal>
            <SplitLines as="h3" className="t-display mb-8 text-[clamp(2rem,5.5vw,4.25rem)] text-ink">
              {t.concept.placeTitle}
            </SplitLines>
            <Reveal delay={0.1}>
              <h4 className="t-display mb-5 text-[clamp(1.2rem,2.4vw,1.75rem)] text-ink">
                {t.concept.between}
              </h4>
              <p className="mb-10 max-w-xl text-sm/relaxed text-ink-soft md:text-base/relaxed">
                {t.concept.betweenBody}
              </p>
              <Pill href="/apartments">{t.concept.cta}</Pill>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
