"use client";

import { useRef } from "react";
import { useApp } from "../AppContext";
import { Eyebrow, ParallaxImage, Pill, Reveal, RevealGroup, SplitLines } from "../ui";

export default function Architecture() {
  const { t } = useApp();
  const root = useRef<HTMLDivElement>(null);

  return (
    <section id="architecture" ref={root} className="relative bg-paper py-20 md:py-32">
      <div className="u-edge">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <Reveal>
              <Eyebrow index="04" className="mb-6 text-ink-mute">
                {t.architecture.eyebrow}
              </Eyebrow>
              <p className="t-eyebrow mb-2 text-ink-mute">{t.architecture.byPre}</p>
              <p className="t-display text-2xl text-ink">{t.architecture.byName}</p>
              <p className="t-eyebrow mt-2 text-ink-mute">{t.architecture.bySecond}</p>
            </Reveal>
          </div>

          <div className="md:col-span-9">
            <SplitLines as="h2" stagger={0.05} className="t-display mb-14 text-[clamp(1.7rem,4.6vw,3.75rem)] text-ink md:mb-20">
              {t.architecture.title}
            </SplitLines>

            <RevealGroup selector=":scope > div" className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2" stagger={0.1}>
              {t.architecture.facts.map((f) => (
                <div key={f.label} className="bg-paper p-7 md:p-9">
                  <p className="t-eyebrow mb-4 text-accent">{f.label}</p>
                  {"logo" in f && f.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.logo as string} alt={f.value} className="mb-3 h-8 w-auto" />
                  ) : null}
                  <p className="text-sm/relaxed text-ink-soft">{f.value}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <ParallaxImage
            src={t.architecture.image}
            alt={t.architecture.title}
            className="aspect-16/10 w-full md:aspect-21/9"
            sizes="100vw"
            speed={7}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="t-display mb-8 text-[clamp(1.3rem,3vw,2.2rem)] text-ink">{t.architecture.closing}</p>
              <Pill href="/contact">{t.architecture.cta}</Pill>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
