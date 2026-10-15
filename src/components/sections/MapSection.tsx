"use client";

import { useRef } from "react";
import { gsap, Draggable, useGSAP, EASE, reduced } from "@/lib/gsap";
import { asset } from "@/lib/era";
import { useApp } from "../AppContext";
import { Eyebrow, Reveal, SplitLines } from "../ui";

const CLOUDS = [asset.cloud33, asset.cloud47, asset.cloud02];

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
        gsap.set(el.querySelectorAll(".map-layer"), { autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        el.querySelectorAll(".map-layer"),
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: EASE.out,
          stagger: 0.18,
          scrollTrigger: { trigger: fr, start: "top 80%", once: true },
        },
      );

      /* the cloud banks drift, then parallax against the page */
      gsap.utils.toArray<HTMLElement>(".cloud-row", el).forEach((row, i) => {
        gsap.to(row, {
          xPercent: i % 2 === 0 ? 6 : -7,
          duration: 26 + i * 6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      gsap.to(".clouds", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });

      /* drag the coastline to explore */
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
    <section id="location" ref={root} className="relative overflow-hidden bg-paper-2/60 py-20 md:py-32">
      <div className="clouds pointer-events-none absolute inset-x-0 top-0 z-0 h-[120%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CLOUDS[1]} alt="" className="cloud-row absolute -left-[12%] top-[4%] w-[80%] opacity-70" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CLOUDS[0]} alt="" className="cloud-row absolute -right-[8%] top-[26%] w-[50%] opacity-60" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CLOUDS[2]} alt="" className="cloud-row absolute left-[16%] top-[52%] w-[55%] opacity-50" />
      </div>

      <div className="relative z-10 u-edge">
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow className="mb-6 text-ink-mute">{t.intro.region} — Spain</Eyebrow>
            </Reveal>
            <SplitLines as="h2" className="t-display text-[clamp(1.9rem,5.4vw,4.5rem)] text-ink">
              {t.map.eyebrow}
            </SplitLines>
          </div>
          <div className="flex items-end md:col-span-4 md:justify-end">
            <Reveal delay={0.1}>
              <p className="t-eyebrow text-ink-mute">
                <span className="map-hint inline-flex items-center gap-3">
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
          className="relative aspect-[31/20] w-full overflow-hidden border border-line bg-paper/60"
          data-cursor="drag"
          data-cursor-label={t.map.drag}
        >
          <div ref={inner} className="absolute left-0 top-0 h-[132%] w-[136%] will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.locPath} alt="" className="map-layer absolute inset-0 h-full w-full object-contain" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.locLabels}
              alt="New Golden Mile, Estepona — Costa del Sol, Spain"
              className="map-layer absolute inset-0 h-full w-full object-contain"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_58%,rgba(20,19,15,0.08)_100%)]" />
        </div>
      </div>
    </section>
  );
}
