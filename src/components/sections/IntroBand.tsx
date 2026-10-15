"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useApp } from "../AppContext";
import { Eyebrow, Marquee, Reveal, SplitLines } from "../ui";

export default function IntroBand() {
  const { t } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {}, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden bg-paper pt-24 pb-14 md:pt-36 md:pb-20">
      <div className="u-edge mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-6 text-ink-mute md:mb-8">{t.intro.region}</Eyebrow>
          </Reveal>
          <SplitLines as="h2" stagger={0.07} className="t-display text-[clamp(2rem,5.6vw,5rem)] text-ink">
            {t.intro.line}
          </SplitLines>
        </div>

        <Reveal delay={0.15} className="max-w-sm md:pb-3">
          <p className="text-sm/relaxed text-ink-soft md:text-base/relaxed">{t.concept.lead}</p>
        </Reveal>
      </div>

      <div className="relative border-y border-line py-6 md:py-8">
        <Marquee text={t.intro.line} className="t-display text-[clamp(2.5rem,9vw,8rem)] text-ink/85" speed={70} />
      </div>
    </section>
  );
}
