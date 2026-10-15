"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP, EASE, reduced } from "@/lib/gsap";
import { asset, similarApartments, type Apartment } from "@/lib/era";
import { useApp } from "@/components/AppContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import UnitCard from "@/components/UnitCard";
import { Pill, Reveal, RevealGroup, SplitLines } from "@/components/ui";
import { useRequestModal } from "@/components/RequestModal";

export default function UnitDetail({ unit }: { unit: Apartment }) {
  const { t, ready } = useApp();
  const { open } = useRequestModal();
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"info" | "benefits">("info");
  const [shot, setShot] = useState(0);

  const gallery = [unit.image, ...unit.gallery];
  const typeLabel =
    unit.typology === "ground-basement"
      ? "Ground floor + basement"
      : unit.typology === "ground"
        ? "Ground Floor"
        : "Penthouse duplex";

  const similar = similarApartments(unit, 6);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready) return;

      if (reduced()) {
        gsap.set(el.querySelectorAll(".gal-shot, .diagram-card, .spec-item"), { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      tl.fromTo(".gal-main", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "luxInOut" }, 0)
        .fromTo(".diagram-card", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.2)
        .fromTo(".spec-item", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.35);

      return () => tl.kill();
    },
    { scope: root, dependencies: [ready] },
  );

  /* crossfade when a thumbnail is picked */
  useGSAP(
    () => {
      gsap.fromTo(".gal-main img", { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: EASE.out });
    },
    { scope: root, dependencies: [shot] },
  );

  const specs = [
    { label: t.unit.bedrooms, value: unit.beds },
    { label: t.unit.interior, value: `${unit.interior} m²` },
    { label: t.unit.terrace, value: `${unit.terrace} M²` },
    ...(unit.garden ? [{ label: t.unit.garden, value: `${unit.garden} M²` }] : []),
  ];

  return (
    <div ref={root} className="bg-paper">
      <Breadcrumbs
        items={[
          { label: t.nav.home, href: "/" },
          { label: t.apartments.breadcrumb, href: "/apartments" },
          { label: unit.no },
        ]}
      />

      <header className="u-edge pb-8 pt-10 md:pb-12">
        <SplitLines as="h1" className="t-display text-[clamp(2.5rem,8vw,6rem)] text-ink">
          {`${t.unit.titlePrefix} ${unit.no}`}
        </SplitLines>
      </header>

      {/* gallery */}
      <div className="u-edge grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="gal-main relative aspect-4/3 w-full overflow-hidden bg-paper-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[shot]} alt={`№${unit.no}`} className="h-full w-full object-cover" />
          </div>

          <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto pb-2">
            {gallery.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setShot(i)}
                data-cursor="hover"
                aria-label={`${t.unit.galleryAlt} ${i + 1}`}
                className={`relative aspect-4/3 w-28 shrink-0 overflow-hidden bg-paper-2 transition-opacity md:w-32 ${
                  shot === i ? "opacity-100 ring-1 ring-ink" : "opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* diagrams */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <div className="diagram-card invisible relative flex aspect-4/3 items-center justify-center border border-line bg-paper p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.diagramBlock} alt="" className="max-h-full w-auto" />
            <span className="t-eyebrow absolute bottom-4 end-4 text-ink-mute">N</span>
          </div>
          <div className="diagram-card invisible relative flex aspect-4/3 items-center justify-center border border-line bg-paper p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.blockDiagram} alt="" className="max-h-full w-auto" />
          </div>
        </div>
      </div>

      {/* title + specs */}
      <div className="u-edge mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5">
          <SplitLines as="h2" className="t-display mb-4 text-[clamp(1.75rem,4vw,3rem)] text-ink">
            {typeLabel}
          </SplitLines>
          <p className="t-eyebrow text-ink-mute">
            {t.apartments.card.completion}: {unit.completion}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => open(unit.no)}
              data-cursor="hover"
              className="t-eyebrow rounded-full bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-accent"
            >
              {t.unit.submit}
            </button>
            {unit.pdf && (
              <a
                href={unit.pdf}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="t-eyebrow rounded-full border border-ink/20 px-6 py-3.5 text-ink transition-colors hover:border-ink"
              >
                {t.unit.pdf}
              </a>
            )}
          </div>
        </div>

        <div className="md:col-span-7">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
            {specs.map((s) => (
              <div key={s.label} className="spec-item invisible">
                <dt className="t-eyebrow mb-3 text-ink-mute">{s.label}</dt>
                <dd className="t-display text-2xl text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          {/* tabs */}
          <div className="mt-12">
            <div className="flex items-center gap-6 border-b border-line">
              {(["info", "benefits"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  data-cursor="hover"
                  className={`t-eyebrow relative -mb-px border-b py-4 transition-colors ${
                    tab === k ? "border-ink text-ink" : "border-transparent text-ink-mute hover:text-ink"
                  }`}
                >
                  {t.unit.tabs[k]}
                </button>
              ))}
            </div>

            <div className="pt-7">
              {tab === "info" ? (
                <p className="max-w-2xl text-sm/relaxed text-ink-soft md:text-base/relaxed">{unit.info}</p>
              ) : (
                <RevealGroup selector=":scope > li" className="flex flex-wrap gap-2.5" stagger={0.04}>
                  {unit.benefits.map((b) => (
                    <li key={b} className="t-eyebrow rounded-full border border-ink/15 px-4 py-2.5 text-ink-soft">
                      {b}
                    </li>
                  ))}
                </RevealGroup>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* diagrams / typology strip */}
      <div className="u-edge mt-16 md:mt-24">
        <div className="flex flex-wrap items-end justify-between gap-6 border-y border-line py-6">
          <p className="t-eyebrow text-ink-mute">
            {typeLabel} · Block {unit.block} · {unit.floor}
          </p>
          <Link href="/apartments" data-cursor="hover" className="t-eyebrow group inline-flex items-center gap-3 text-ink">
            {t.unit.viewAll}
          </Link>
        </div>
      </div>

      {/* similar options */}
      <section className="u-edge py-16 md:py-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="t-eyebrow mb-4 text-accent">{t.unit.similar}</p>
            <h2 className="t-display max-w-2xl text-[clamp(1.75rem,4vw,3rem)] text-ink">{t.unit.similarLead}</h2>
          </div>
          <Link
            href="/apartments"
            data-cursor="hover"
            className="t-eyebrow inline-flex items-center gap-3 text-ink underline decoration-ink/20 underline-offset-4"
          >
            {t.unit.viewAll}
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((u) => (
            <UnitCard key={u.slug} unit={u} />
          ))}
        </div>
      </section>

      <section className="u-edge pb-20 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-8 border-t border-line pt-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <SplitLines as="p" className="t-display text-[clamp(1.4rem,3.2vw,2.4rem)] text-ink">
              {t.architecture.closing}
            </SplitLines>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Pill href="/contact">{t.amenities.cta}</Pill>
          </div>
        </div>
      </section>

    </div>
  );
}
