"use client";

/* eslint-disable @next/next/no-img-element -- GSAP animates these transforms directly */

import { useRef } from "react";
import { gsap, Draggable, useGSAP, EASE, reduced } from "@/lib/gsap";
import { useApp } from "../AppContext";
import MapArt from "../MapArt";
import { Eyebrow, Reveal, SplitLines } from "../ui";

type LabelPos = { left: string; top: string; key: "country" | "region" | "city" | "compound" };

const LABELS: LabelPos[] = [
  { left: "88%", top: "24%", key: "country" },
  { left: "14%", top: "66%", key: "region" },
  { left: "66%", top: "52%", key: "city" },
  { left: "39%", top: "34%", key: "compound" },
];

export default function MapSection() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const fr = frame.current;
      const inn = inner.current;
      if (!el || !fr || !inn || !ready) return;

      if (reduced()) {
        gsap.set(el.querySelectorAll(".map-label, .map-blocks rect, .map-plot, .map-bldg"), {
          autoAlpha: 1,
        });
        return;
      }

      /* ---------- draw the plan ---------- */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: fr, start: "top 78%", once: true },
        defaults: { ease: EASE.out },
      });

      tl.fromTo(
        el.querySelectorAll(".map-road, .map-route"),
        { strokeDasharray: 1, strokeDashoffset: 1, autoAlpha: 0 },
        { strokeDashoffset: 0, autoAlpha: 1, duration: 2.2, stagger: 0.18, ease: "luxInOut" },
        0,
      )
        .fromTo(
          el.querySelectorAll(".map-blocks rect"),
          { autoAlpha: 0, scale: 0.94, transformOrigin: "center" },
          { autoAlpha: 1, scale: 1, duration: 0.9, stagger: { each: 0.035, from: "random" } },
          0.35,
        )
        .fromTo(
          el.querySelector(".map-plot"),
          { autoAlpha: 0, scale: 0.9, transformOrigin: "620px 480px" },
          { autoAlpha: 1, scale: 1, duration: 1.2 },
          0.9,
        )
        .fromTo(
          el.querySelectorAll(".map-bldg"),
          { autoAlpha: 0, y: -14 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
          1.15,
        )
        .fromTo(el.querySelector(".map-pool"), { autoAlpha: 0, scale: 0.6, transformOrigin: "center" }, { autoAlpha: 1, scale: 1, duration: 0.8 }, 1.5)
        .fromTo(el.querySelector(".map-pin"), { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.6)
        .fromTo(".map-label", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 }, 1.5);

      /* signature pulse on the plot */
      gsap.to(el.querySelectorAll(".map-ping"), {
        scale: 3.4,
        autoAlpha: 0,
        duration: 2.4,
        repeat: -1,
        ease: "power2.out",
        transformOrigin: "center",
        stagger: 0.8,
      });

      /* ---------- clouds drift + parallax ---------- */
      gsap.to(".cloud-a", { xPercent: 8, duration: 26, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".cloud-b", { xPercent: -10, duration: 34, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".cloud-c", { xPercent: 12, duration: 20, yoyo: true, repeat: -1, ease: "sine.inOut" });

      gsap.to(".clouds", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });

      /* ---------- drag to explore ---------- */
      const buildDrag = () => {
        const fw = fr.offsetWidth;
        const fh = fr.offsetHeight;
        const iw = inn.offsetWidth;
        const ih = inn.offsetHeight;
        const minX = Math.min(0, -(iw - fw));
        const minY = Math.min(0, -(ih - fh));

        gsap.set(inn, { x: minX / 2, y: minY / 2 });

        return Draggable.create(inn, {
          type: "x",
          bounds: { minX, maxX: 0, minY, maxY: 0 },
          inertia: true,
          edgeResistance: 0.75,
          cursor: "grab",
          activeCursor: "grabbing",
          allowNativeTouchScrolling: true,
          onDragStart: () => gsap.to(".map-hint", { autoAlpha: 0, duration: 0.4 }),
        });
      };

      let drags = buildDrag();
      const onResize = () => {
        drags.forEach((d) => d.kill());
        drags = buildDrag();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        drags.forEach((d) => d.kill());
      };
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="location" ref={root} className="relative overflow-hidden bg-sand-200/70 py-20 md:py-32">
      {/* clouds */}
      <div className="clouds pointer-events-none absolute inset-x-0 top-0 z-0 h-[120%]">
        <img
          src="/svg/cloud-2.svg"
          alt=""
          className="cloud-a absolute -left-[10%] top-[6%] w-[75%] opacity-70"
        />
        <img
          src="/svg/cloud-1.svg"
          alt=""
          className="cloud-b absolute -right-[6%] top-[22%] w-[55%] opacity-55 md:w-[45%]"
        />
        <img
          src="/svg/cloud-3.svg"
          alt=""
          className="cloud-c absolute left-[18%] top-[48%] w-[45%] opacity-45 md:w-[32%]"
        />
      </div>

      <div className="relative z-10 u-edge">
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow className="mb-6 text-ink-mute">{t.brand.country} — {t.brand.city}</Eyebrow>
            </Reveal>
            <SplitLines as="h2" className="t-display text-[clamp(1.9rem,5.4vw,4.5rem)] text-ink">
              {t.map.eyebrow}
            </SplitLines>
          </div>
          <div className="flex items-end md:col-span-4 md:justify-end">
            <Reveal delay={0.1}>
              <p className="t-eyebrow flex items-center gap-3 text-ink-mute">
                <span className="map-hint inline-flex items-center gap-2">
                  <span className="inline-block h-6 w-6 rounded-full border border-ink/25" />
                  {t.map.drag}
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative z-10 u-edge">
        <div
          ref={frame}
          className="relative aspect-[31/20] w-full overflow-hidden border border-ink/12 bg-sand-100/70 backdrop-blur-[2px]"
          data-cursor="drag"
          data-cursor-label={t.map.drag}
        >
          <div ref={inner} className="absolute left-0 top-0 h-[124%] w-[128%] will-change-transform">
            <MapArt className="h-full w-full" />

            {LABELS.map((l) => (
              <span
                key={l.key}
                className={`map-label t-eyebrow invisible absolute -translate-y-1/2 whitespace-nowrap ${
                  l.key === "compound" ? "text-clay" : "text-ink/70"
                }`}
                style={{ left: l.left, top: l.top }}
              >
                {l.key === "compound" && (
                  <span className="me-2 inline-block h-1.5 w-1.5 rounded-full bg-clay align-middle" />
                )}
                {t.map.labels[l.key]}
              </span>
            ))}
          </div>

          {/* soft edge vignette so the pan feels endless */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_55%,rgba(22,19,15,0.10)_100%)]" />
        </div>
      </div>
    </section>
  );
}
