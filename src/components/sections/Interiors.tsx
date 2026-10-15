"use client";

/* eslint-disable @next/next/no-img-element -- GSAP animates these transforms directly */

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/gsap";
import { galleryImages, img } from "@/lib/media";
import { useApp } from "../AppContext";
import { Eyebrow, Pill, Reveal, RevealGroup, SplitLines } from "../ui";

export default function Interiors() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const w = wrap.current;
      const tr = track.current;
      if (!el || !w || !tr || !ready || reduced()) return;

      const amount = () => Math.max(0, tr.scrollWidth - window.innerWidth);

      const tween = gsap.to(tr, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: w,
          start: "top top",
          end: () => `+=${amount() + window.innerHeight * 0.4}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* caption + image counter */
      const slides = gsap.utils.toArray<HTMLElement>(".gallery-slide");
      slides.forEach((slide, i) => {
        gsap.fromTo(
          slide.querySelector("img"),
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: w,
              start: () => `top+=${(amount() / slides.length) * i - window.innerHeight * 0.4} top`,
              end: () => `top+=${(amount() / slides.length) * (i + 1)} top`,
              scrub: true,
            },
          },
        );
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="interiors" ref={root} className="relative bg-sand-100 pt-20 md:pt-32">
      <div className="u-edge">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow index="03" className="mb-6 text-ink-mute">
                {t.interiors.eyebrow}
              </Eyebrow>
            </Reveal>
            <SplitLines as="h2" className="t-display text-[clamp(2.4rem,6.5vw,5.5rem)] text-ink">
              {t.interiors.title}
            </SplitLines>
          </div>

          <div className="md:col-span-7 md:pt-4">
            <Reveal>
              <p className="mb-10 max-w-xl text-sm/relaxed text-ink-soft md:text-base/relaxed">
                {t.interiors.body}
              </p>
            </Reveal>

            <RevealGroup
              selector=":scope > li"
              className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2"
              stagger={0.07}
            >
              {t.interiors.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 border-t border-ink/12 pt-4">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span className="text-sm/relaxed text-ink-soft">{f}</span>
                </li>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-10">
              <p className="t-eyebrow mb-8 text-ink-mute">{t.interiors.upgrades}</p>
              <Pill href="/apartments">{t.interiors.cta}</Pill>
            </Reveal>
          </div>
        </div>
      </div>

      {/* pinned horizontal gallery */}
      <div ref={wrap} className="relative mt-16 h-[100svh] overflow-hidden md:mt-24">
        <div className="flex h-full items-center">
          <div
            ref={track}
            dir="ltr"
            className="flex h-[68svh] items-stretch gap-4 will-change-transform md:h-[72svh] md:gap-8"
            style={{ paddingInline: "clamp(1.25rem,4vw,5.5rem)" }}
          >
            {galleryImages.map((key, i) => (
              <figure
                key={key}
                className="gallery-slide relative flex h-full shrink-0 flex-col"
                style={{ width: "min(78vw, 42rem)" }}
              >
                <div className="relative flex-1 overflow-hidden bg-sand-200">
                  <img
                    src={img[key]}
                    alt={t.interiors.features[i] ?? ""}
                    className="h-full w-full object-cover will-change-transform"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                  <span className="t-eyebrow max-w-[70%] text-ink-mute">{t.interiors.features[i]}</span>
                  <span className="t-num t-eyebrow text-ink-mute">
                    0{i + 1} / 0{galleryImages.length}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
