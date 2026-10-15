"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, reduced } from "@/lib/gsap";
import { useApp } from "../AppContext";
import { Eyebrow, Marquee, Pill, ParallaxImage, Reveal, RevealGroup, SplitLines } from "../ui";

export default function Amenities() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready) return;

      if (reduced()) {
        gsap.set(el.querySelectorAll(".amenity-row"), { autoAlpha: 1 });
        return;
      }

      el.querySelectorAll<HTMLElement>(".amenity-row").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll(".amenity-stagger"),
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: EASE.out,
            stagger: 0.08,
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          },
        );
      });

      gsap.set(el.querySelectorAll(".amenity-row"), { autoAlpha: 1 });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="amenities" ref={root} className="relative bg-paper py-20 md:py-32">
      <div className="u-edge">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-14">
          {/* sticky index */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <Eyebrow index="02" className="mb-6 text-ink-mute">
                  Amenities
                </Eyebrow>
                <h2 className="t-display mb-8 text-[clamp(2rem,5vw,3.75rem)] text-ink">
                  Designed exclusively for residents and their guests
                </h2>
                <ul className="flex flex-col gap-2">
                  {t.amenities.items.map((a, i) => (
                    <li key={a.title} className="t-eyebrow flex items-center gap-3 text-ink-mute">
                      <span className="t-num text-accent">0{i + 1}</span>
                      {a.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <Pill href="/contact">{t.amenities.cta}</Pill>
                </div>
              </Reveal>
            </div>
          </div>

          {/* rows */}
          <div className="flex flex-col gap-16 md:col-span-8 md:gap-24">
            {t.amenities.items.map((a, i) => (
              <article key={a.title} className="amenity-row invisible">
                <ParallaxImage
                  src={a.image}
                  alt={a.title}
                  className="mb-7 aspect-16/10 w-full"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  speed={8}
                />
                <SplitLines
                  as="h3"
                  className="amenity-stagger t-display mb-4 text-[clamp(1.6rem,3.6vw,2.75rem)] text-ink"
                >
                  {a.title}
                </SplitLines>
                <Reveal className="amenity-stagger">
                  <p className="max-w-xl text-sm/relaxed text-ink-soft md:text-base/relaxed">
                    <span className="t-num me-3 text-ink-mute">0{i + 1}</span>
                    {a.body}
                  </p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 border-y border-line py-6 md:mt-28 md:py-8">
        <Marquee
          text={t.amenities.items.map((a) => a.title).join("  ·  ")}
          className="t-display text-[clamp(1.75rem,5vw,4rem)] text-ink/80"
          speed={58}
        />
      </div>

      <div className="u-edge mt-12 md:mt-16">
        <RevealGroup selector=":scope > *" className="flex flex-wrap items-center justify-between gap-6">
          <p className="t-display max-w-3xl text-[clamp(1.5rem,3.4vw,2.5rem)] text-ink">
            {t.architecture.closing}
          </p>
          <Pill href="/apartments">{t.closing.cta}</Pill>
        </RevealGroup>
      </div>
    </section>
  );
}
