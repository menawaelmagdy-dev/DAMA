"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP, EASE, reduced } from "@/lib/gsap";
import { img } from "@/lib/media";
import { useApp } from "../AppContext";
import { Pill } from "../ui";

export default function Hero() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"day" | "night">("day");
  const firstRun = useRef(true);

  /* ---------- entrance ---------- */
  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready) return;

      const title = el.querySelector<HTMLElement>(".hero-title-main");
      const sub = el.querySelector<HTMLElement>(".hero-title-sub");

      if (reduced()) {
        gsap.set([".hero-frame", ".hero-title-main", ".hero-title-sub", ".hero-line", ".hero-foot"], {
          autoAlpha: 1,
          clipPath: "none",
        });
        return;
      }

      const splitMain = title
        ? new SplitText(title, { type: "chars", charsClass: "hero-char" })
        : null;
      const splitSub = sub ? new SplitText(sub, { type: "chars", charsClass: "hero-char" }) : null;

      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      tl.fromTo(
        ".hero-frame",
        { clipPath: "inset(14% 9% 14% 9%)", scale: 1.04 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.7, ease: "luxInOut" },
        0,
      )
        .fromTo(".hero-media-inner", { scale: 1.35 }, { scale: 1.06, duration: 2.1 }, 0)
        .from(chars, { yPercent: 118, autoAlpha: 0, duration: 1.3, stagger: 0.045 }, 0.35)
        .fromTo(".hero-line", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 1.05)
        .fromTo(".hero-foot", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.25)
        .fromTo(".hero-scroll-line", { scaleY: 0 }, { scaleY: 1, duration: 1.1 }, 1.2);

      /* ---------- scroll out ---------- */
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
        splitMain?.revert();
        splitSub?.revert();
      };
    },
    { scope: root, dependencies: [ready] },
  );

  /* ---------- day / night crossfade ---------- */
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      gsap.to(".hero-img-day", { autoAlpha: mode === "day" ? 1 : 0, duration: 1.2, ease: "power2.inOut" });
      gsap.to(".hero-img-night", { autoAlpha: mode === "night" ? 1 : 0, duration: 1.2, ease: "power2.inOut" });
      gsap.to(".hero-grade", {
        backgroundColor: mode === "night" ? "rgba(10,14,26,0.42)" : "rgba(10,9,7,0.28)",
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
      {/* media */}
      <div className="hero-frame absolute inset-0 will-change-[clip-path]">
        <div className="hero-media-inner absolute inset-0 will-change-transform">
          <Image
            src={img.heroDay}
            alt={t.hero.imageDay}
            fill
            priority
            sizes="100vw"
            quality={86}
            className="hero-img-day object-cover"
          />
          <Image
            src={img.heroNight}
            alt={t.hero.imageNight}
            fill
            priority
            sizes="100vw"
            quality={86}
            className="hero-img-night object-cover opacity-0"
          />
          <div className="hero-grade absolute inset-0" style={{ backgroundColor: "rgba(10,9,7,0.28)" }} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/5 to-ink/70" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* content */}
      <div className="hero-content relative z-10 flex h-full flex-col justify-between u-edge pt-28 pb-8 text-sand-50 md:pb-12">
        <div className="flex items-start justify-between">
          <p className="hero-line t-eyebrow opacity-0">{t.brand.country}</p>
          <p className="hero-line t-eyebrow max-w-[14rem] text-end opacity-0">{t.brand.tagline}</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <h1 className="t-display flex flex-col items-center text-[clamp(3.25rem,13.5vw,11.5rem)] leading-[0.9]">
            <span className="hero-title-main block overflow-hidden pb-[0.06em]">{t.hero.titleTop}</span>
            <span className="hero-title-sub block overflow-hidden pb-[0.1em] italic opacity-90">
              {t.hero.titleBottom}
            </span>
          </h1>
          <p className="hero-line t-eyebrow mt-5 opacity-0 md:mt-7">{t.hero.city}</p>
        </div>

        <div className="hero-foot flex flex-col items-center gap-7 opacity-0 md:gap-9">
          <h2 className="t-display flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[clamp(1.4rem,3.4vw,2.9rem)]">
            <span>{t.hero.line}</span>
            <span className="inline-flex items-center gap-2">
              {words.map((w, i) => (
                <span key={w.key} className="inline-flex items-center gap-2">
                  {i === 1 && <span className="text-sand-50/40">/</span>}
                  <button
                    onMouseEnter={() => setMode(w.key)}
                    onFocus={() => setMode(w.key)}
                    onClick={() => setMode(w.key)}
                    data-cursor="hover"
                    className="relative pb-0.5 transition-opacity duration-500"
                    style={{ opacity: mode === w.key ? 1 : 0.45 }}
                    aria-pressed={mode === w.key}
                  >
                    {w.label}
                    <span
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-sand-50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ transform: `scaleX(${mode === w.key ? 1 : 0})` }}
                    />
                  </button>
                </span>
              ))}
            </span>
            <span>{t.hero.lineEnd}</span>
          </h2>

          <Pill href="/apartments" variant="ghost">
            {t.hero.cta}
          </Pill>
        </div>

        <div className="flex items-end justify-between">
          <span className="hero-line t-eyebrow flex items-center gap-3 opacity-0">
            <span className="hero-scroll-line block h-8 w-px origin-top bg-sand-50/60" />
            {t.hero.scroll}
          </span>
          <span className="hero-line t-num hidden text-xs tracking-[0.2em] opacity-0 md:block">
            {mode === "day" ? "AM" : "PM"}
          </span>
        </div>
      </div>
    </section>
  );
}
