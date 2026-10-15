"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/gsap";
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

      const slides = gsap.utils.toArray<HTMLElement>(".gallery-slide", el);
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
    <section id="interiors" ref={root} className="relative bg-paper-2/60 pt-20 md:pt-32">
      <div className="u-edge">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow index="03" className="mb-6 text-ink-mute">
                {t.space.eyebrow}
              </Eyebrow>
            </Reveal>
            <SplitLines as="h2" className="t-display text-[clamp(2.4rem,6.5vw,5.5rem)] text-ink">
              {t.space.title}
            </SplitLines>
            <Reveal delay={0.1} className="mt-8">
              <p className="max-w-md text-sm/relaxed text-ink-soft md:text-base/relaxed">{t.space.body}</p>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:pt-4">
            <RevealGroup selector=":scope > li" className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {t.space.features.map((f) => (
                <li key={f} className="flex items-start gap-3 border-t border-line pt-4">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-sm/relaxed text-ink-soft">{f}</span>
                </li>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="mt-10">
              <p className="t-eyebrow mb-4 text-ink-mute">{t.space.upgrades}</p>
              <ul className="mb-9 flex flex-wrap gap-2.5">
                {t.space.upgradeList.map((u) => (
                  <li key={u} className="t-eyebrow rounded-full border border-ink/15 px-4 py-2.5 text-ink-soft">
                    {u}
                  </li>
                ))}
              </ul>
              <Pill href="/apartments">{t.space.cta}</Pill>
            </Reveal>
          </div>
        </div>
      </div>

      <div ref={wrap} className="relative mt-16 h-[100svh] overflow-hidden md:mt-24">
        <div className="flex h-full items-center">
          <div
            ref={track}
            className="flex h-[68svh] items-stretch gap-4 will-change-transform md:h-[74svh] md:gap-8"
            style={{ paddingInline: "clamp(1.25rem,4vw,5.5rem)" }}
          >
            {t.space.gallery.map((src, i) => (
              <figure key={src} className="gallery-slide relative flex h-full shrink-0 flex-col" style={{ width: "min(78vw, 44rem)" }}>
                <div className="relative flex-1 overflow-hidden bg-sand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={t.unit.galleryAlt} loading="lazy" className="h-full w-full object-cover will-change-transform" />
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between gap-6">
                  <span className="t-eyebrow text-ink-mute">{t.space.features[i] ?? t.space.eyebrow}</span>
                  <span className="t-num t-eyebrow text-ink-mute">
                    0{i + 1} / 0{t.space.gallery.length}
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
