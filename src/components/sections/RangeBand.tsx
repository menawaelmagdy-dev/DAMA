"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useApp } from "../AppContext";
import { Eyebrow, Marquee, Reveal, SplitLines } from "../ui";

export default function RangeBand() {
  const { t } = useApp();
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {}, { scope: root });

  return (
    <section ref={root} className="relative overflow-hidden bg-paper-2/70 py-16 md:py-24">
      <div className="u-edge mb-10 flex items-center justify-between md:mb-14">
        <Eyebrow className="text-ink-mute">Era Residence</Eyebrow>
        <span className="t-num t-eyebrow text-ink-mute">00 — 00</span>
      </div>

      <div className="border-y border-line py-6 md:py-10">
        <Marquee text={t.range.line} className="t-display text-[clamp(2rem,7vw,6rem)] text-ink/85" speed={64} />
      </div>

      <div className="u-edge mt-10 md:mt-14">
        <Reveal className="md:ms-auto md:w-2/3 lg:w-1/2">
          <SplitLines as="p" className="t-display text-[clamp(1.25rem,2.6vw,2rem)] text-ink">
            {t.range.body}
          </SplitLines>
        </Reveal>
      </div>
    </section>
  );
}
