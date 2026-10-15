"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/gsap";
import { img } from "@/lib/media";
import { useApp } from "../AppContext";
import { Counter, Eyebrow, ParallaxImage, Pill, Reveal, SplitLines } from "../ui";

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
    <section id="concept" ref={root} className="relative bg-sand-100 py-20 md:py-32">
      <div className="u-edge">
        <div className="concept-mark mb-14 h-px w-full origin-left bg-ink/15 md:mb-20" />

        {/* statement */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow className="mb-6 text-ink-mute">{t.concept.eyebrow}</Eyebrow>
              <p className="t-display text-[clamp(3rem,9vw,7rem)] leading-none text-ink">{t.concept.title}</p>
            </Reveal>
          </div>

          <div className="md:col-span-8 md:pt-3">
            <SplitLines
              as="h2"
              stagger={0.06}
              className="t-display mb-10 text-[clamp(1.6rem,4.2vw,3.4rem)] text-ink"
            >
              {t.concept.lead}
            </SplitLines>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-sm/relaxed text-ink-soft md:text-base/relaxed">{t.concept.body}</p>
            </Reveal>
          </div>
        </div>

        {/* numbers */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-y border-ink/10 py-10 md:mt-24 md:grid-cols-4 md:gap-12 md:py-14">
          {t.concept.stats.map((n, i) => (
            <Reveal key={i} delay={i * 0.08} className="flex flex-col gap-2">
              <span className="t-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-ink">
                <Counter to={n.value} />
              </span>
              <span className="t-eyebrow text-ink-mute">{n.label}</span>
            </Reveal>
          ))}
        </div>

        {/* place block */}
        <div className="mt-20 grid grid-cols-1 items-center gap-10 md:mt-32 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6 md:order-2">
            <ParallaxImage
              src={img.location}
              alt={t.concept.placeTitle}
              className="aspect-4/3 w-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              speed={8}
            />
          </div>

          <div className="md:col-span-6 md:order-1">
            <Reveal>
              <Eyebrow className="mb-6 text-ink-mute">{t.concept.placeEyebrow}</Eyebrow>
            </Reveal>
            <SplitLines as="h3" className="t-display mb-8 text-[clamp(2rem,5.5vw,4.25rem)] text-ink">
              {t.concept.placeTitle}
            </SplitLines>
            <Reveal delay={0.12}>
              <p className="mb-10 max-w-xl text-sm/relaxed text-ink-soft md:text-base/relaxed">
                {t.intro.paragraph}
              </p>
              <Pill href="/apartments">{t.concept.cta}</Pill>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
