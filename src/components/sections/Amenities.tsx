"use client";

/* eslint-disable @next/next/no-img-element -- GSAP animates these transforms directly */

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE, reduced } from "@/lib/gsap";
import { amenityImages, img } from "@/lib/media";
import { useApp } from "../AppContext";
import { Eyebrow, Pill, Reveal, SplitLines } from "../ui";

export default function Amenities() {
  const { t, ready } = useApp();
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready || !root.current) return;

      if (reduced()) {
        gsap.set(root.current.querySelectorAll(".amenity-row, .amenity-stage"), { autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        root.current.querySelectorAll(".amenity-row"),
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: EASE.out,
          stagger: 0.09,
          scrollTrigger: { trigger: ".amenity-list", start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        ".amenity-stage",
        { autoAlpha: 0, scale: 1.04 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.3,
          ease: EASE.out,
          scrollTrigger: { trigger: ".amenity-stage", start: "top 85%", once: true },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section id="amenities" ref={root} className="relative bg-ink py-20 text-sand-100 md:py-32">
      <div className="u-edge">
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow index="02" className="mb-6 text-sand-100/60">
                {t.amenities.eyebrow}
              </Eyebrow>
            </Reveal>
            <SplitLines as="h2" className="t-display text-[clamp(1.8rem,4.8vw,3.6rem)] text-sand-50">
              {t.amenities.lead}
            </SplitLines>
          </div>
          <div className="flex items-end md:col-span-6 md:justify-end">
            <Reveal delay={0.1}>
              <Pill href="/contact" variant="ghost">
                {t.amenities.cta}
              </Pill>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          {/* list */}
          <div className="amenity-list md:col-span-7">
            {t.amenities.items.map((item, i) => {
              const isActive = i === active;
              return (
                <div
                  key={i}
                  className="amenity-row invisible border-t border-sand-100/15 last:border-b"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  data-cursor="hover"
                >
                  <div className="flex items-baseline gap-5 py-6 md:py-7">
                    <span className="t-num t-eyebrow w-6 shrink-0 text-sand-100/45">0{i + 1}</span>
                    <div className="flex-1">
                      <h3
                        className={`t-display text-[clamp(1.5rem,3.6vw,2.6rem)] transition-colors duration-500 ${
                          isActive ? "text-clay" : "text-sand-50"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <div
                        className="grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{ gridTemplateRows: isActive ? "1fr" : "0fr", opacity: isActive ? 1 : 0 }}
                      >
                        <p className="overflow-hidden text-sm/relaxed text-sand-100/70 md:max-w-lg md:text-base/relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                    {/* inline thumb — mobile only */}
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden md:hidden">
                      <img src={img[amenityImages[i]]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* preview stage */}
          <div className="amenity-stage invisible hidden md:col-span-5 md:block">
            <div className="sticky top-28 aspect-4/5 w-full overflow-hidden bg-sand-200/10">
              {amenityImages.map((key, i) => (
                <img
                  key={key}
                  src={img[key]}
                  alt={t.amenities.items[i]?.title ?? ""}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.05)", transition: "opacity .8s cubic-bezier(.16,1,.3,1), transform 1.2s cubic-bezier(.16,1,.3,1)" }}
                  loading="lazy"
                />
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6 pt-16">
                <p className="t-eyebrow text-sand-50">{t.amenities.items[active]?.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
