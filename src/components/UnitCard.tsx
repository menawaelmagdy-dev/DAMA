"use client";

import Link from "next/link";
import { copy } from "@/lib/content";
import type { Apartment } from "@/lib/era";

/** The apartment card used on /apartments and in “similar options”. */
export default function UnitCard({ unit, className = "" }: { unit: Apartment; className?: string }) {
  const t = copy;
  const typology =
    unit.typology === "ground-basement"
      ? "Ground floor + basement"
      : unit.typology === "ground"
        ? "Ground Floor"
        : "Penthouse duplex";

  return (
    <Link
      href={`/apartments/${unit.slug}`}
      data-cursor="hover"
      className={`unit-tile group flex flex-col border border-line bg-paper transition-colors duration-500 hover:border-ink/25 ${className}`}
    >
      <div className="flex items-start justify-between gap-4 p-5 pb-4">
        <div>
          <p className="t-display text-lg text-ink">{typology}</p>
          <p className="t-eyebrow mt-2 text-ink-mute">
            {t.apartments.card.completion}: {unit.completion}
          </p>
        </div>
        <span className="t-eyebrow text-ink-mute transition-transform duration-500 group-hover:translate-x-1">→</span>
      </div>

      <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unit.image}
          alt={`№${unit.no} — ${typology}`}
          loading="lazy"
          className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className="t-eyebrow absolute start-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-ink backdrop-blur-sm">
          №{unit.no}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 p-5">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="t-eyebrow text-ink-mute">Block {unit.block}</span>
          <span className="t-eyebrow text-ink-mute">{unit.floor}</span>
        </div>

        <div className="flex items-baseline gap-3 border-t border-line pt-4">
          <span className="t-display text-2xl text-ink">{unit.beds}</span>
          <span className="t-eyebrow text-ink-mute">{t.apartments.card.bed}</span>
          <span className="text-ink-mute">/</span>
          <span className="t-display text-2xl text-ink">{unit.interior} m²</span>
          <span className="t-eyebrow text-ink-mute">
            {unit.terrace ? `+ ${unit.terrace} ${t.apartments.card.terraceSuffix}` : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
