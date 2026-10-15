"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, reduced } from "@/lib/gsap";
import { img, reasonsImages } from "@/lib/media";
import { useApp } from "../AppContext";
import { Eyebrow, ParallaxImage, Reveal, SplitLines } from "../ui";

export default function Reasons() {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const el = root.current;
      if (!el) return;

      if (reduced()) {
        gsap.set(el.querySelectorAll(".reason-row"), { autoAlpha: 1 });
        return;
      }

      el.querySelectorAll<HTMLElement>(".reason-row").forEach((row, i) => {
        gsap.fromTo(
          row.querySelectorAll(".reason-stagger"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            ease: EASE.out,
            stagger: 0.1,
            scrollTrigger: { trigger: row, start: "top 78%", once: true },
          },
        );

        gsap.to(row.querySelector(".reason-index"), {
          yPercent: i % 2 === 0 ? -18 : 0,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.set(el.querySelectorAll(".reason-row"), { autoAlpha: 1 });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="reasons" ref={root} className="relative bg-sand-200/60 py-20 md:py-32">
      <div className="u-edge">
        <div className="mb-14 flex items-baseline justify-between gap-6 border-b border-ink/10 pb-5 md:mb-24">
          <Eyebrow className="text-ink-mute">{t.reasons.eyebrow}</Eyebrow>
          <span className="t-num t-eyebrow text-ink-mute">
            {String(t.reasons.items.length).padStart(2, "0")} / 0{t.reasons.items.length}
          </span>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {t.reasons.items.map((item, i) => (
            <article
              key={i}
              className={`reason-row invisible grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14 ${
                i % 2 === 1 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className={`md:col-span-7 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                <ParallaxImage
                  src={img[reasonsImages[item.image] ?? "garden"]}
                  alt={item.title}
                  className="aspect-4/3 w-full md:aspect-3/2"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  speed={9}
                />
              </div>

              <div className={`md:col-span-5 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                <div className="reason-index reason-stagger t-num t-eyebrow mb-5 text-clay">
                  0{i + 1}
                </div>
                <SplitLines
                  as="h3"
                  className="reason-stagger t-display mb-6 text-[clamp(1.9rem,4.4vw,3.5rem)] text-ink"
                >
                  {item.title}
                </SplitLines>
                <Reveal className="reason-stagger">
                  <p className="mb-8 max-w-lg text-sm/relaxed text-ink-soft md:text-base/relaxed">
                    {item.body}
                  </p>
                </Reveal>
                <p className="reason-stagger t-eyebrow text-ink-mute">{item.foot}</p>
              </div>
            </article>
          ))}
        </div>

        <blockquote className="mt-28 grid grid-cols-1 gap-8 border-t border-ink/10 pt-12 md:mt-44 md:grid-cols-12 md:pt-16">
          <p className="t-eyebrow text-ink-mute md:col-span-3">{t.reasons.quoteBy}</p>
          <div className="md:col-span-9">
            <SplitLines as="p" className="t-display text-[clamp(1.4rem,3.4vw,2.7rem)] text-ink" stagger={0.05}>
              {`“${t.reasons.quote}”`}
            </SplitLines>
            <Reveal delay={0.2}>
              <p className="t-eyebrow mt-8 text-ink-mute">{t.reasons.quoteBy2}</p>
            </Reveal>
          </div>
        </blockquote>
      </div>
    </section>
  );
}
