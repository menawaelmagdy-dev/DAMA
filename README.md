# ERA Residence — Next.js clone

A working rebuild of **[era-residence.com](https://www.era-residence.com/)** in Next.js 15: the preloader, every scroll animation, the day/night hero, the drag-to-explore coastline, the full 25-apartment inventory with filters + per-apartment pages, and the contact page.

Same copy, same structure, same motion — different (modern) stack.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 App Router · React 19 · TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens, logical properties) |
| Animation | GSAP 3.15 — ScrollTrigger, SplitText, Flip, Draggable + InertiaPlugin, CustomEase — via `@gsap/react` |
| Smooth scroll | Lenis, driven by the GSAP ticker |
| Type | Instrument Serif (display) + DM Sans (UI), self-hosted via Fontsource |
| Artwork | ERA's own Webflow CDN assets (see *Assets* below) |

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

---

## Routes

| Route | What it is |
|---|---|
| `/` | The home page — 12 sections, in the original order |
| `/apartments` | All 25 residences with **Typology / Bedrooms / Sort by / Reset** filters |
| `/apartments/[slug]` | 25 statically generated apartment pages (`011`, `114`, `224`, …) |
| `/contact` | Sales office, location, socials, map, opening hours |
| `404` | Not-found page |

`?type=ground-floor-basement · ground-floor · penthouse-duplex` deep-links the listing exactly like the original.

## What was reproduced

**Preloader** — ERA words (`Costa · Era · Residence · Estepona · del Sol`) rising behind masks, the landscape + background SVGs, a `000→100` counter and a progress rule, then a 4-panel curtain lift. Scroll is locked and the hero entrance is gated on it.

**Hero** — clip-path frame reveal, char-by-char title split, and the signature **by day / by night** swap (hover *or* click) that crossfades the gated-community webp pair and shifts the colour grade. `00 Scroll` indicator, scroll-out parallax.

**Home sections, in order** — Costa del Sol intro + marquee · *Three reasons to choose Era* (alternating editorial rows + architecture quote) · *The concept* + New Golden Mile place block · *The coast you wanted yours this year* map with cloud banks, drag-to-pan coastline, labels SVG and masterplan · the three typologies with bed/area specs and *Explore …* links · *A place to live* marquee + 104–244 m² range · amenities (gated community, pool, parking, spa & gym, landscaping) · *The space to Live in* with upgrades, finishes list and a pinned horizontal gallery · Architecture with Schiemann Weyers / OCWA facts and the Unreal Estate logo · the three closing pillars · *Perfect sea views / From rooftop terraces* · footer with phone, Sales Office, Privacy/Terms PDFs and the *Made by The First The Last* credit.

**Apartments** — 25 real units (№, block, floor, beds, interior m², terrace m²) pulled from the live listing, filterable and sortable with a **GSAP Flip** re-flow, plus the *nothing found* empty state.

**Apartment pages** — breadcrumb `Home / Select an Apartment / 011`, `No. 011` heading, block diagrams (+ `N` compass), image gallery, Interior/Terrace/Garden spec grid, **Info / Benefits** tabs, *Submit a request* and `pdf` plan download, the amenities block repeated, then *similar options* with six suggestions.

**Interaction layer** — custom two-part cursor with a `DRAG` label, floating *Back to top* / *Book a call*, full-screen menu with staggered masked links, cookie bar, magnetic pill buttons, infinite marquees, animated counters, request modal with validated form + animated success.

## Assets

Artwork, diagrams, plan PDFs and the privacy/terms PDFs are referenced straight from **ERA's Webflow CDN** (`cdn.prod.website-files.com`). That is deliberate: this project was built in a sandbox whose egress is limited to npm/GitHub, so the files could not be mirrored here — and hotlinking keeps the clone pixel-faithful.

To make it fully self-hosted, run this once on a normal machine:

```bash
npm run assets:fetch
```

It downloads all **70 assets** into `public/era/` and rewrites `src/lib/assets.local.json`; `src/lib/era.ts` resolves every URL through that map, so nothing else needs to change (delete the file to go back to the CDN).

## Before you deploy

1. `npm run assets:fetch` (or keep the CDN references and accept the third-party dependency).
2. Replace the simulated form submissions — the request modal in `src/components/RequestModal.tsx` uses a `setTimeout`; point it at your CRM/endpoint.
3. Swap the metadata `metadataBase` in `src/app/layout.tsx` if the site won't live at `era-residence.com`.
4. Copy/imagery belong to ERA Residence — this is a technical clone, not an asset licence.

## Notes

* Every animation is gated on `ready` (preloader finished), short-circuits under `prefers-reduced-motion`, and is cleaned up through `useGSAP` contexts; a `noscript` block reveals all animated content when JS is off.
* Verified: `tsc --noEmit` clean, `next lint` 0 warnings, `next build` 0 errors (31 prerendered routes), and all four page types hydrated in a jsdom harness with **no runtime errors** (preloader reaches 100 % and hides, 19 SplitText headings, 12 hero chars, 25 unit tiles, filters and tabs render).
* The previous DAMA-branded build of this repo is preserved in commit `ac41762`.
