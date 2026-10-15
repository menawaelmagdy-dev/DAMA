"use client";

import Link from "next/link";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Flip, gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { units, type Unit } from "@/lib/units";
import type { UnitTypeKey } from "@/lib/content";
import { useApp } from "@/components/AppContext";
import { Eyebrow, Pill, Reveal, SplitLines } from "@/components/ui";

const TYPE_KEYS: UnitTypeKey[] = ["ground-garden", "typical", "duplex", "commercial"];
const BUILDINGS = ["A", "B", "C", "D", "E", "F"];

type Status = Unit["status"];

export default function ApartmentsClient({ initialType }: { initialType?: string }) {
  const { t, ready } = useApp();
  const root = useRef<HTMLDivElement>(null);

  const [type, setType] = useState<UnitTypeKey | "all">(
    (TYPE_KEYS as string[]).includes(initialType ?? "") ? (initialType as UnitTypeKey) : "all",
  );
  const [building, setBuilding] = useState<string | "all">("all");
  const [sort, setSort] = useState<"areaAsc" | "areaDesc">("areaAsc");

  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const changed = useRef(false);

  const list = useMemo(() => {
    const filtered = units.filter(
      (u) => (type === "all" || u.type === type) && (building === "all" || u.building === building),
    );
    return filtered.sort((a, b) => (sort === "areaAsc" ? a.area - b.area : b.area - a.area));
  }, [type, building, sort]);

  const capture = useCallback(
    (fn: () => void) => {
      const cards = root.current?.querySelectorAll(".unit-tile");
      if (cards?.length) {
        flipState.current = Flip.getState(cards, { props: "opacity" });
        changed.current = true;
      }
      fn();
    },
    [],
  );

  useLayoutEffect(() => {
    if (!changed.current || !flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.75,
      ease: "luxInOut",
      absolute: true,
      stagger: 0.02,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.94, duration: 0.35 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    flipState.current = null;
    changed.current = false;
  }, [type, building, sort]);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.fromTo(
        ".unit-tile",
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: EASE.out,
          stagger: 0.05,
          scrollTrigger: { trigger: ".unit-grid", start: "top 85%", once: true },
        },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  const statusStyle: Record<Status, string> = {
    available: "bg-lagoon/10 text-lagoon",
    reserved: "bg-clay/15 text-clay",
    sold: "bg-ink/10 text-ink-mute",
  };

  return (
    <div ref={root} className="bg-sand-100">
      {/* header */}
      <header className="relative overflow-hidden u-edge pt-36 pb-14 md:pt-48 md:pb-20">
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="relative">
          <Reveal>
            <Link
              href="/"
              data-cursor="hover"
              className="t-eyebrow mb-8 inline-flex items-center gap-2 text-ink-mute transition-colors hover:text-ink"
            >
              ← {t.apartments.backHome}
            </Link>
          </Reveal>
          <Reveal>
            <Eyebrow className="mb-6 text-ink-mute">{t.brand.project} — {t.brand.city}</Eyebrow>
          </Reveal>
          <SplitLines
            as="h1"
            className="t-display mb-7 text-[clamp(2.6rem,8vw,6.5rem)] text-ink"
            stagger={0.06}
          >
            {t.apartments.title}
          </SplitLines>
          <Reveal delay={0.15}>
            <p className="max-w-xl text-sm/relaxed text-ink-soft md:text-base/relaxed">{t.apartments.lead}</p>
          </Reveal>
        </div>
      </header>

      {/* filters */}
      <div className="sticky top-0 z-40 border-y border-ink/10 bg-sand-100/85 py-4 backdrop-blur-md">
        <div className="u-edge flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1">
            <button
              onClick={() => capture(() => setType("all"))}
              data-cursor="hover"
              className={`t-eyebrow shrink-0 rounded-full border px-4 py-2.5 transition-colors ${
                type === "all" ? "border-ink bg-ink text-sand-50" : "border-ink/15 text-ink hover:border-ink/40"
              }`}
            >
              {t.units.all}
            </button>
            {TYPE_KEYS.map((k) => (
              <button
                key={k}
                onClick={() => capture(() => setType(k))}
                data-cursor="hover"
                className={`t-eyebrow shrink-0 rounded-full border px-4 py-2.5 transition-colors ${
                  type === k ? "border-ink bg-ink text-sand-50" : "border-ink/15 text-ink hover:border-ink/40"
                }`}
              >
                {t.units.types[k].short}
              </button>
            ))}

            <span className="mx-2 hidden h-5 w-px shrink-0 bg-ink/15 sm:block" />

            <div className="hidden items-center gap-2 sm:flex">
              {BUILDINGS.map((b) => (
                <button
                  key={b}
                  onClick={() => capture(() => setBuilding(building === b ? "all" : b))}
                  data-cursor="hover"
                  className={`t-eyebrow h-10 w-10 shrink-0 rounded-full border transition-colors ${
                    building === b ? "border-ink bg-ink text-sand-50" : "border-ink/15 text-ink hover:border-ink/40"
                  }`}
                  aria-label={`${t.apartments.building} ${b}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="t-num t-eyebrow text-ink-mute">
              {String(list.length).padStart(2, "0")} {t.apartments.unit}
            </span>
            <button
              onClick={() => capture(() => setSort(sort === "areaAsc" ? "areaDesc" : "areaAsc"))}
              data-cursor="hover"
              className="t-eyebrow rounded-full border border-ink/15 px-4 py-2.5 text-ink transition-colors hover:border-ink/40"
            >
              {t.apartments.sortOptions[sort]}
            </button>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="u-edge py-14 md:py-20">
        {list.length === 0 ? (
          <p className="t-display py-24 text-center text-2xl text-ink-mute">{t.apartments.empty}</p>
        ) : (
          <div className="unit-grid grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((u) => (
              <article
                key={u.id}
                className="unit-tile invisible group relative flex flex-col gap-5 bg-sand-100 p-7 transition-colors duration-500 hover:bg-sand-50 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="t-eyebrow mb-2 text-ink-mute">
                      {t.apartments.bldg} {u.building} · {t.apartments.floor} {u.floor}
                    </p>
                    <h2 className="t-display text-3xl text-ink">
                      {t.apartments.unit} {u.unitNo}
                    </h2>
                  </div>
                  <span
                    className={`t-eyebrow shrink-0 rounded-full px-3 py-1.5 ${statusStyle[u.status]}`}
                  >
                    {t.apartments.statusLabel[u.status]}
                  </span>
                </div>

                <p className="t-eyebrow text-clay">{t.units.types[u.type].name}</p>
                <p className="text-sm/relaxed text-ink-soft">{t.units.types[u.type].body}</p>

                <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-ink/10 pt-5">
                  <div>
                    <dt className="t-eyebrow mb-1 text-ink-mute">{t.units.area}</dt>
                    <dd className="t-display text-xl text-ink">{u.area} m²</dd>
                  </div>
                  <div>
                    <dt className="t-eyebrow mb-1 text-ink-mute">{t.apartments.beds}</dt>
                    <dd className="t-display text-xl text-ink">{u.beds}</dd>
                  </div>
                  <div>
                    <dt className="t-eyebrow mb-1 text-ink-mute">{t.apartments.baths}</dt>
                    <dd className="t-display text-xl text-ink">{u.baths}</dd>
                  </div>
                </dl>

                <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-5">
                  <span className="t-eyebrow text-ink-mute">
                    {t.apartments.price} · {t.apartments.orientation} {u.orientation}
                  </span>
                  <Link
                    href={`/contact?unit=${u.id}`}
                    data-cursor="hover"
                    className="t-eyebrow text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-clay"
                  >
                    {t.apartments.viewDetails}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-ink/10 pt-14 text-center">
          <p className="t-display max-w-2xl text-[clamp(1.5rem,3.6vw,2.6rem)] text-ink">
            {t.architecture.closing}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Pill href="/contact">{t.apartments.cta}</Pill>
            <Pill href="/" variant="outline">
              {t.apartments.backHome}
            </Pill>
          </div>
        </div>
      </div>
    </div>
  );
}
