"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Flip, gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { apartments, type Typology } from "@/lib/era";
import { useApp } from "@/components/AppContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import UnitCard from "@/components/UnitCard";
import { Eyebrow, Pill, Reveal, SplitLines } from "@/components/ui";

const slugToKey: Record<string, Typology> = {
  "ground-floor-basement": "ground-basement",
  "ground-floor": "ground",
  "penthouse-duplex": "penthouse",
};

type Sort = "relevant" | "asc" | "desc";

export default function ApartmentsClient({ initialType }: { initialType?: string }) {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  const [typology, setTypology] = useState<Typology | "all">(
    initialType && slugToKey[initialType] ? slugToKey[initialType] : "all",
  );
  const [beds, setBeds] = useState<"all" | 2 | 3>("all");
  const [sort, setSort] = useState<Sort>("relevant");

  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const changed = useRef(false);

  const list = useMemo(() => {
    const filtered = apartments.filter(
      (a) => (typology === "all" || a.typology === typology) && (beds === "all" || a.beds === beds),
    );
    if (sort === "asc") return [...filtered].sort((a, b) => a.interior - b.interior);
    if (sort === "desc") return [...filtered].sort((a, b) => b.interior - a.interior);
    return filtered;
  }, [typology, beds, sort]);

  const capture = useCallback((fn: () => void) => {
    const tiles = root.current?.querySelectorAll(".unit-tile");
    if (tiles?.length) {
      flipState.current = Flip.getState(tiles, { props: "opacity" });
      changed.current = true;
    }
    fn();
  }, []);

  useLayoutEffect(() => {
    if (!changed.current || !flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.7,
      ease: "luxInOut",
      absolute: true,
      stagger: 0.02,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, y: -12, duration: 0.35 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    flipState.current = null;
    changed.current = false;
  }, [typology, beds, sort]);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.fromTo(
        ".unit-tile",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.04,
          scrollTrigger: { trigger: ".unit-grid", start: "top 88%", once: true },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  const reset = () => capture(() => {
    setTypology("all");
    setBeds("all");
    setSort("relevant");
  });

  const pill = (active: boolean) =>
    `t-eyebrow shrink-0 rounded-full border px-4 py-2.5 transition-colors ${
      active ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink hover:border-ink/40"
    }`;

  return (
    <div ref={root} className="bg-paper">
      <Breadcrumbs items={[{ label: t.nav.home, href: "/" }, { label: t.apartments.breadcrumb }]} />

      <header className="u-edge pb-8 pt-10 md:pb-12 md:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <Reveal>
              <Eyebrow className="mb-5 text-ink-mute">{t.intro.region}</Eyebrow>
            </Reveal>
            <SplitLines as="h1" className="t-display text-[clamp(2.5rem,8vw,6rem)] text-ink">
              {t.apartments.title}
            </SplitLines>
          </div>
          <p className="t-num t-eyebrow pb-3 text-ink-mute">
            {String(list.length).padStart(2, "0")} {t.apartments.results}
          </p>
        </div>
      </header>

      {/* filters */}
      <div className="sticky top-0 z-40 border-y border-line bg-paper/90 py-4 backdrop-blur-md">
        <div className="u-edge flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:gap-6">
            <div className="flex items-center gap-3">
              <span className="t-eyebrow w-16 shrink-0 text-ink-mute">{t.apartments.filters.typology}</span>
              <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
                <button onClick={() => capture(() => setTypology("all"))} data-cursor="hover" className={pill(typology === "all")}>
                  {t.apartments.filters.all}
                </button>
                {t.apartments.filters.typologyOptions.map((o) => (
                  <button
                    key={o.slug}
                    onClick={() => capture(() => setTypology(slugToKey[o.slug]))}
                    data-cursor="hover"
                    className={pill(typology === slugToKey[o.slug])}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="t-eyebrow w-16 shrink-0 text-ink-mute md:w-auto">{t.apartments.filters.bedrooms}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => capture(() => setBeds("all"))} data-cursor="hover" className={pill(beds === "all")}>
                  {t.apartments.filters.all}
                </button>
                {([2, 3] as const).map((b) => (
                  <button key={b} onClick={() => capture(() => setBeds(b))} data-cursor="hover" className={pill(beds === b)}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="t-eyebrow text-ink-mute">{t.apartments.filters.sortBy}</span>
            <div className="flex items-center gap-2">
              {(["relevant", "asc", "desc"] as Sort[]).map((s) => (
                <button key={s} onClick={() => capture(() => setSort(s))} data-cursor="hover" className={pill(sort === s)}>
                  {t.apartments.filters.sort[s]}
                </button>
              ))}
            </div>
            <button
              onClick={reset}
              data-cursor="hover"
              className="t-eyebrow shrink-0 rounded-full border border-ink/15 px-4 py-2.5 text-ink-mute transition-colors hover:border-ink hover:text-ink"
            >
              {t.apartments.filters.reset}
            </button>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="u-edge py-12 md:py-16">
        {list.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="t-display mb-5 text-[clamp(2rem,6vw,4rem)] text-ink">{t.apartments.empty.title}</h2>
            <p className="mx-auto mb-10 max-w-md text-sm/relaxed text-ink-soft">{t.apartments.empty.body}</p>
            <button onClick={reset} data-cursor="hover" className="t-eyebrow rounded-full bg-ink px-7 py-3.5 text-paper transition-colors hover:bg-accent">
              {t.apartments.filters.reset}
            </button>
          </div>
        ) : (
          <div className="unit-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((u) => (
              <UnitCard key={u.slug} unit={u} className="unit-tile invisible" />
            ))}
          </div>
        )}
      </div>

      {/* the three reasons repeated at the foot of the listing */}
      <section className="bg-paper-2/60 py-16 md:py-24">
        <div className="u-edge grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {t.apartments.bottomReasons.map((r, i) => (
            <article key={r.title} className="flex flex-col">
              <div className="relative mb-7 aspect-4/3 w-full overflow-hidden bg-sand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="t-display mb-4 text-[clamp(1.5rem,3vw,2.25rem)] text-ink">{r.title}</h3>
              <p className="text-sm/relaxed text-ink-soft">{r.body}</p>
              <span className="t-num t-eyebrow mt-6 text-accent">0{i + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="u-edge py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SplitLines as="h2" className="t-display mb-8 text-[clamp(1.5rem,3.4vw,2.5rem)] text-ink">
              {t.architecture.closing}
            </SplitLines>
            <Pill href="/contact">{t.nav.bookCall}</Pill>
          </div>
          <div className="md:col-span-5">
            <Link href="/" className="t-eyebrow inline-flex items-center gap-3 text-ink-mute transition-colors hover:text-ink">
              ← {t.nav.home}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
