"use client";

import { useRef } from "react";
import { img } from "@/lib/media";
import { useApp } from "../AppContext";
import { Eyebrow, ParallaxImage, Pill, Reveal, RevealGroup, SplitLines } from "../ui";

export default function Architecture() {
  const { t } = useApp();
  const root = useRef<HTMLDivElement>(null);

  return (
    <section id="architecture" ref={root} className="relative bg-sand-200/60 py-20 md:py-32">
      <div className="u-edge">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <Reveal>
              <Eyebrow index="04" className="mb-6 text-ink-mute">
                {t.architecture.eyebrow}
              </Eyebrow>
              <p className="t-eyebrow mb-2 text-ink-mute">{t.architecture.byPre}</p>
              <p className="t-display text-2xl text-ink">{t.architecture.byName}</p>
            </Reveal>
          </div>

          <div className="md:col-span-9">
            <SplitLines
              as="h2"
              stagger={0.05}
              className="t-display mb-14 text-[clamp(1.7rem,4.6vw,3.75rem)] text-ink md:mb-20"
            >
              {t.architecture.title}
            </SplitLines>

            <RevealGroup selector=":scope > div" className="grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2" stagger={0.1}>
              {t.architecture.facts.map((f, i) => (
                <div key={i} className="bg-sand-200/60 p-7 md:p-9">
                  <p className="t-eyebrow mb-4 text-clay">{f.label}</p>
                  <p className="text-sm/relaxed text-ink-soft">{f.value}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <ParallaxImage
            src={img.walkway}
            alt={t.space.cards[2].title}
            className="aspect-16/10 w-full md:aspect-21/9"
            sizes="100vw"
            speed={7}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="t-display mb-8 text-[clamp(1.3rem,3vw,2.2rem)] text-ink">{t.architecture.closing}</p>
              <Pill href="/contact">{t.nav.bookCall}</Pill>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
