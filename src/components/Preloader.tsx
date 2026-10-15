"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, reduced } from "@/lib/gsap";
import { asset } from "@/lib/era";
import { useApp } from "./AppContext";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const { t } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const words = gsap.utils.toArray<HTMLElement>(".pre-word", el);
      const countEl = el.querySelector<HTMLElement>(".pre-count");
      const count = { v: 0 };

      if (reduced()) {
        onComplete();
        gsap.set(el, { display: "none" });
        return;
      }

      // warm the two hero frames before lifting the curtain
      [asset.heroDay, asset.heroNight].forEach((src) => {
        const i = new Image();
        i.src = src;
      });

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      tl.set(el, { autoAlpha: 1 })
        .fromTo(".pre-landscape", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.3 }, 0)
        .fromTo(".pre-bg", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1.8 }, 0)
        .from(words, { yPercent: 118, duration: 1.2, stagger: 0.08 }, 0.25)
        .fromTo(".pre-del", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.95)
        .fromTo(".pre-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: "luxInOut" }, 0.4)
        .to(
          count,
          {
            v: 100,
            duration: 2.2,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countEl) countEl.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          },
          0.3,
        )
        .to(".pre-bar-fill", { scaleX: 1, duration: 2.2, ease: "power2.inOut" }, 0.3)
        .to(".pre-inner", { autoAlpha: 0, y: -26, duration: 0.7 }, "+=0.15")
        .to(".pre-bg", { autoAlpha: 0, duration: 0.7 }, "<")
        .to(".pre-panel", { yPercent: -101, duration: 1.15, stagger: 0.085, ease: "luxInOut" }, "-=0.35")
        .add(() => onComplete(), "-=0.95")
        .set(el, { display: "none" });
    },
    { scope: root },
  );

  const [era, residence] = t.hero.titleLines;

  return (
    <div ref={root} className="fixed inset-0 z-[120] invisible" style={{ visibility: "hidden" }} aria-hidden>
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="pre-panel h-full flex-1 bg-ink" />
        ))}
      </div>

      <div className="pre-bg absolute inset-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG from the ERA CDN */}
        <img src={asset.preloaderBg} alt="" className="h-[70%] w-auto opacity-40" />
      </div>

      <div className="pre-inner absolute inset-0 flex flex-col justify-between p-[clamp(1.25rem,4vw,5.5rem)] text-paper">
        <div className="flex items-start justify-between">
          <span className="t-eyebrow overflow-hidden">
            <span className="pre-word block">{t.preloader.words[0]}</span>
          </span>
          <span className="t-eyebrow overflow-hidden text-end">
            <span className="pre-word block">{t.preloader.delSol}</span>
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center overflow-hidden">
            <span className="pre-word t-display block text-[clamp(3.5rem,13vw,11rem)] leading-[0.95]">
              {era}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="pre-word t-display block text-[clamp(2rem,7vw,5.5rem)] leading-[1] italic">
              {residence}
            </span>
          </div>
          <div className="pre-del flex flex-col items-center gap-5 md:flex-row md:gap-8">
            <span className="t-eyebrow">{t.preloader.words[1]}</span>
            <span className="hidden h-px w-16 bg-paper/25 md:block" />
            <span className="t-eyebrow">{t.preloader.words[3]}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="pre-rule h-px w-full origin-left bg-paper/20" />
          <div className="flex items-end justify-between">
            <span className="t-eyebrow max-w-[60%] opacity-70">{t.preloader.line}</span>
            <span className="pre-count t-num font-display text-2xl leading-none">000</span>
          </div>
          <div className="pre-bar h-px w-full bg-paper/10">
            <div className="pre-bar-fill h-px w-full origin-left scale-x-0 bg-accent" />
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG from the ERA CDN */}
        <img
          src={asset.landscape}
          alt=""
          className="pre-landscape pointer-events-none absolute bottom-0 left-0 hidden w-full opacity-30 md:block"
        />
      </div>
    </div>
  );
}
