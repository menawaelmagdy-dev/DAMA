"use client";

import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP, EASE, reduced } from "@/lib/gsap";
import { asset } from "@/lib/era";
import { useApp } from "../AppContext";
import { Pill } from "../ui";

export default function Hero() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"day" | "night">("day");
  const firstRun = useRef(true);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready) return;

      const [line1, line2] = t.hero.titleLines;
      const titleEls = el.querySelectorAll<HTMLElement>(".hero-title-line > span");

      if (reduced()) {
        gsap.set([".hero-frame", ".hero-line", ".hero-foot", ".hero-title-line"], { autoAlpha: 1, clipPath: "none" });
        return;
      }

      const splits = Array.from(titleEls).map((node) => new SplitText(node, { type: "chars", charsClass: "hero-char" }));
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char", el);

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      tl.fromTo(
        ".hero-frame",
        { clipPath: "inset(14% 9% 14% 9%)", scale: 1.04 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.7, ease: "luxInOut" },
        0,
      )
        .fromTo(".hero-media-inner", { scale: 1.35 }, { scale: 1.06, duration: 2.1 }, 0)
        .from(chars, { yPercent: 118, autoAlpha: 0, duration: 1.3, stagger: 0.04 }, 0.35)
        .fromTo(".hero-line", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 1.05)
        .fromTo(".hero-foot", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.25)
        .fromTo(".hero-scroll-line", { scaleY: 0 }, { scaleY: 1, duration: 1.1 }, 1.2);

      gsap.to(".hero-content", {
        yPercent: -14,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom 30%", scrub: true },
      });

      gsap.to(".hero-media-inner", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        splits.forEach((s) => s.revert());
        void line1;
        void line2;
      };
    },
    { scope: root, dependencies: [ready] },
  );

  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      gsap.to(".hero-img-day", { autoAlpha: mode === "day" ? 1 : 0, duration: 1.2, ease: "power2.inOut" });
      gsap.to(".hero-img-night", { autoAlpha: mode === "night" ? 1 : 0, duration: 1.2, ease: "power2.inOut" });
      gsap.to(".hero-grade", {
        backgroundColor: mode === "night" ? "rgba(8,12,22,0.42)" : "rgba(12,10,8,0.24)",
        duration: 1.2,
      });
    },
    { scope: root, dependencies: [mode] },
  );

  const words = [
    { key: "day" as const, label: t.hero.toggleDay },
    { key: "night" as const, label: t.hero.toggleNight },
  ];

  return (
    <section id="hero" ref={root} className="relative h-[100svh] min-h-[36rem] w-full overflow-hidden bg-ink">
      <div className="hero-frame absolute inset-0 will-change-[clip-path]">
        <div className="hero-media-inner absolute inset-0 will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset.heroDay} alt={t.hero.imageDay} className="hero-img-day absolute inset-0 h-full w-full object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset.heroNight} alt={t.hero.imageNight} className="hero-img-night absolute inset-0 h-full w-full object-cover opacity-0" />
          <div className="hero-grade absolute inset-0" style={{ backgroundColor: "rgba(12,10,8,0.24)" }} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="hero-content relative z-10 flex h-full flex-col justify-between u-edge pt-28 pb-8 text-paper md:pb-10">
        <div className="flex items-start justify-between">
          <p className="hero-line t-eyebrow opacity-0">{t.intro.region}</p>
          <p className="hero-line t-eyebrow max-w-[14rem] text-end opacity-0">{t.preloader.line}</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <h1 className="t-display flex flex-col items-center text-[clamp(3.25rem,13vw,11.5rem)] leading-[0.9]">
            {t.hero.titleLines.map((line, i) => (
              <span
                key={line}
                className={`hero-title-line block overflow-hidden pb-[0.06em] ${i === 1 ? "italic opacity-95" : ""}`}
              >
                <span className="block">{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-line t-eyebrow mt-5 opacity-0 md:mt-7">{t.hero.city}</p>
        </div>

        <div className="hero-foot flex flex-col items-center gap-7 opacity-0 md:gap-9">
          <h3 className="t-display flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[clamp(1.4rem,3.4vw,2.9rem)]">
            <span>{t.hero.line}</span>
            <span className="inline-flex items-center gap-2">
              {words.map((w, i) => (
                <span key={w.key} className="inline-flex items-center gap-2">
                  {i === 1 && <span className="text-paper/40">/</span>}
                  <button
                    onMouseEnter={() => setMode(w.key)}
                    onFocus={() => setMode(w.key)}
                    onClick={() => setMode(w.key)}
                    data-cursor="hover"
                    aria-pressed={mode === w.key}
                    className="relative pb-0.5 transition-opacity duration-500"
                    style={{ opacity: mode === w.key ? 1 : 0.45 }}
                  >
                    {w.label}
                    <span
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-paper transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ transform: `scaleX(${mode === w.key ? 1 : 0})` }}
                    />
                  </button>
                </span>
              ))}
            </span>
            <span>{t.hero.lineEnd}</span>
          </h3>

          <Pill href="/apartments" variant="ghost">
            {t.hero.cta}
          </Pill>
        </div>

        <div className="flex items-end justify-between">
          <span className="hero-line t-eyebrow flex items-center gap-3 opacity-0">
            <span className="hero-scroll-line block h-8 w-px origin-top bg-paper/60" />
            00 {t.hero.scroll}
          </span>
          <span className="hero-line t-num hidden text-xs tracking-[0.2em] opacity-0 md:block">
            {mode === "day" ? "AM" : "PM"}
          </span>
        </div>
      </div>
    </section>
  );
}
