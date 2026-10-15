# DAMA Development — Rawasin

A full Next.js build of the **Era Residence** website experience (structure, preloader, scroll choreography, day/night hero, drag-to-explore map, cursor, cookie bar) rebuilt for **DAMA Development** — the Egyptian developer behind **Rawasin**, a boutique gated community in **New Sohag**.

Everything is bilingual: **English + Arabic with full RTL**, swapped live from the header.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4 (`@theme` design tokens, no config file) |
| Animation | GSAP 3.15 (ScrollTrigger, SplitText, Flip, Draggable + InertiaPlugin, Observer, CustomEase) via `@gsap/react` |
| Smooth scroll | Lenis, driven by the GSAP ticker |
| Fonts | Instrument Serif (display, EN) · DM Sans (body, EN) · Noto Kufi Arabic (display, AR) · IBM Plex Sans Arabic (body, AR) — self-hosted through Fontsource |
| Images | Generated for this project, served locally from `/public/images` (no third-party CDN) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

---

## What was cloned from era-residence.com

| ERA pattern | Here |
|---|---|
| Full-screen preloader (wordmark, line, 000→100 counter, curtain lift) | `components/Preloader.tsx` — 4-panel curtain, GSAP timeline, scroll locked until done |
| Hero with **by day / by night** crossfade | `components/sections/Hero.tsx` — clip-path reveal, char-by-char title, hover/click day-night switch, scroll-out parallax |
| Masked line-by-line headings | `components/ui.tsx` → `SplitLines` (SplitText `type:"lines"`, `mask:"lines"`) |
| Clip-reveal + parallax imagery | `components/ui.tsx` → `ParallaxImage` |
| "Three reasons" editorial rows | `components/sections/Reasons.tsx` |
| Drag-to-explore location map with cloud layers | `components/sections/MapSection.tsx` + `components/MapArt.tsx` (hand-drawn SVG drawn on scroll) |
| Horizontal drag-to-scroll unit cards | `components/sections/UnitTypes.tsx` (Draggable proxy + inertia) |
| Hover-preview amenity list | `components/sections/Amenities.tsx` |
| Pinned horizontal gallery | `components/sections/Interiors.tsx` |
| Stacking sticky cards | `components/sections/SpaceCards.tsx` |
| Floating "Back to top" / "Menu" / "Book a call" chrome | `components/Nav.tsx` |
| Cookie bar, custom cursor, marquees, counters | `CookieBar.tsx`, `Cursor.tsx`, `Marquee`, `Counter` |
| `/apartments` + `/contact` routes | `app/apartments`, `app/contact` (filters with GSAP **Flip**, validated form + animated success) |

## Structure

```
src/
├─ app/
│  ├─ layout.tsx            fonts, metadata, lang bootstrap, no-JS fallback
│  ├─ page.tsx              home (12 sections)
│  ├─ apartments/           inventory + Flip-filtered grid
│  ├─ contact/              booking form
│  └─ globals.css           design tokens (@theme), utilities, grain
├─ components/
│  ├─ AppShell.tsx          providers + preloader + smooth scroll + nav
│  ├─ AppContext.tsx        language / ready state
│  ├─ Preloader.tsx  Nav.tsx  Cursor.tsx  CookieBar.tsx  SmoothScroll.tsx
│  ├─ MapArt.tsx            inline SVG plan (animatable)
│  ├─ ui.tsx                SplitLines, Reveal, RevealGroup, ParallaxImage, Pill, Marquee, Counter
│  └─ sections/             Hero, IntroBand, Reasons, Concept, MapSection, UnitTypes,
│                           Amenities, Interiors, Architecture, SpaceCards, CtaBlock, Footer
└─ lib/
   ├─ content.ts            EN + AR copy (single source of truth)
   ├─ units.ts              Rawasin inventory (18 units, 6 buildings)
   ├─ gsap.ts               plugin registration, eases, split helpers
   ├─ media.ts  scroll.ts
```

## Arabic / RTL

* `content.ts` holds both dictionaries; the header button switches instantly (no reload, no `?lang=` param).
* `document.documentElement.dir` flips to `rtl`, logical CSS properties (`ps-*`, `me-*`, `start-*`) mirror the layout, and the Arabic typefaces take over via `html[dir="rtl"]` token overrides.
* The choice persists in `localStorage` and is applied by an inline script **before paint** (no flash of the wrong direction).
* Switching language remounts the page body so every SplitText/ScrollTrigger animation is rebuilt against the new text.

## Placeholders to replace before launch

1. **Phone / WhatsApp** — `+20 100 000 0000` in `content.ts` (`footer.phone`, both languages) and in `app/page.tsx` JSON-LD.
2. **Addresses** — sales office and Sohag branch strings in `content.ts`.
3. **Contact form** — `ContactClient.tsx` currently fakes a submit (`setTimeout`); point it at your CRM/endpoint or a Next route handler.
4. **Privacy / Terms** — footer links are `#`.
5. **Images** — swap files in `public/images` (keep the same names, or update `lib/media.ts`).
6. **Metadata** — `metadataBase` in `app/layout.tsx` points at `dama-development.example`.
7. **Inventory** — `lib/units.ts` is representative sample data; replace with the real plate.

## Performance notes

* All motion is gated on `ready` (the preloader finishing) so nothing animates behind the curtain.
* `prefers-reduced-motion` short-circuits every timeline and leaves content visible.
* SplitText wrappers, clip-paths and pins are cleaned up through `useGSAP` contexts on unmount and on language switch.
* Images are pre-optimised (≤1920 px, mozjpeg q80, ~1.8 MB total) and served through `next/image`.

## Accessibility

* Semantic landmarks (`header`, `main`, `section`, `footer`), one `h1` per page, `aria-label`s on icon-only controls, `aria-pressed` on the day/night switch.
* Full keyboard path through the menu, filters and form; `Escape` closes the menu; visible focus colours via `accent-color` and underline states.
* Custom cursor is pointer-only — touch devices keep their native behaviour.
