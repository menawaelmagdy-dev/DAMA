"use client";

import Link from "next/link";

/** Home / Select an Apartment / 011 — mirrors era-residence.com */
export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="u-edge pt-28 md:pt-36">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {items.map((item, i) => (
          <li key={item.label + i} className="flex items-center gap-3">
            {i > 0 && <span className="t-eyebrow text-ink-mute/60">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                data-cursor="hover"
                className="t-eyebrow text-ink-mute transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <span className="t-eyebrow text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
