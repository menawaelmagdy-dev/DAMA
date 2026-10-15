"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip, Draggable, InertiaPlugin, Observer);

  // One house easing for the whole site — a long, calm expo-out.
  CustomEase.create("lux", "0.16, 1, 0.3, 1");
  CustomEase.create("luxInOut", "0.83, 0, 0.17, 1");

  if (process.env.NODE_ENV === "development") {
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  registered = true;
}

export const EASE = {
  out: "lux",
  inOut: "luxInOut",
  power3: "power3.out",
} as const;

export const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Splits text into masked lines and returns a reveal timeline (paused). */
export function lineReveal(
  target: Element | Element[],
  opts: { stagger?: number; duration?: number; delay?: number; y?: string } = {},
) {
  const { stagger = 0.09, duration = 1.1, delay = 0, y = "110%" } = opts;

  const split = new SplitText(target, {
    type: "lines",
    linesClass: "sp-line",
    mask: "lines",
  });

  const tween = gsap.from(split.lines, {
    yPercent: parseFloat(y),
    duration,
    ease: EASE.out,
    stagger,
    delay,
    paused: true,
  });

  return { split, tween };
}

/** Splits text into words and returns a stagger reveal (paused). */
export function wordReveal(
  target: Element | Element[],
  opts: { stagger?: number; duration?: number; delay?: number } = {},
) {
  const { stagger = 0.035, duration = 0.9, delay = 0 } = opts;

  const split = new SplitText(target, { type: "words", wordsClass: "sp-word", mask: "words" });

  const tween = gsap.from(split.words, {
    yPercent: 105,
    duration,
    ease: EASE.out,
    stagger,
    delay,
    paused: true,
  });

  return { split, tween };
}

export { gsap, ScrollTrigger, SplitText, CustomEase, Flip, Draggable, InertiaPlugin, Observer, useGSAP };
