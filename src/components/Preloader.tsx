"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, reduced } from "@/lib/gsap";
import { img } from "@/lib/media";
import { useApp } from "./AppContext";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const { t } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const letters = gsap.utils.toArray<HTMLElement>(".pre-letter");
      const count = { v: 0 };
      const countEl = el.querySelector<HTMLElement>(".pre-count");

      if (reduced()) {
        onComplete();
        gsap.set(el, { display: "none" });
        return;
      }

      // Warm the two hero frames up before we lift the curtain.
      [img.heroDay, img.heroNight].forEach((src) => {
        const i = new Image();
        i.src = src;
      });

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      tl.set(el, { autoAlpha: 1 })
        .from(letters, { yPercent: 125, duration: 1.15, stagger: 0.075 })
        .from(".pre-sub", { autoAlpha: 0, y: 16, duration: 0.9 }, 0.45)
        .from(".pre-rule", { scaleX: 0, duration: 1.6, ease: "luxInOut" }, 0.3)
        .to(
          count,
          {
            v: 100,
            duration: 2.15,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countEl) countEl.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          },
          0.25,
        )
        .to(".pre-bar-fill", { scaleX: 1, duration: 2.15, ease: "power2.inOut" }, 0.25)
        .to(".pre-logo", { autoAlpha: 0, y: -26, duration: 0.7 }, "+=0.15")
        .to(".pre-meta", { autoAlpha: 0, duration: 0.5 }, "<")
        .to(".pre-panel", { yPercent: -101, duration: 1.15, stagger: 0.085, ease: "luxInOut" }, "-=0.35")
        .add(() => onComplete(), "-=0.95")
        .set(el, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[120] invisible"
      style={{ visibility: "hidden" }}
      aria-hidden="true"
    >
      {/* curtain panels */}
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="pre-panel h-full flex-1 bg-ink" />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-[clamp(1.25rem,4vw,5.5rem)]">
        <div className="pre-meta flex items-start justify-between text-sand-100/60">
          <span className="t-eyebrow">{t.brand.city}</span>
          <span className="t-eyebrow">{t.brand.country}</span>
        </div>

        <div className="pre-logo flex flex-col items-center gap-5 text-center text-sand-50">
          <div className="t-display flex overflow-hidden text-[clamp(3.5rem,13vw,11rem)] leading-none">
            {t.brand.name.split("").map((ch, i) => (
              <span key={i} className="pre-letter inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
          <div className="pre-rule h-px w-[min(24rem,60vw)] origin-center bg-sand-100/25" />
          <p className="pre-sub t-eyebrow text-sand-100/70">{t.brand.tagline}</p>
        </div>

        <div className="pre-meta flex flex-col gap-3 text-sand-100/60">
          <div className="flex items-end justify-between">
            <span className="t-eyebrow">{t.preloader.hint}</span>
            <span className="pre-count t-num font-display text-2xl leading-none">000</span>
          </div>
          <div className="pre-bar h-px w-full bg-sand-100/15">
            <div className="pre-bar-fill h-px w-full origin-left scale-x-0 bg-clay" />
          </div>
        </div>
      </div>
    </div>
  );
}
