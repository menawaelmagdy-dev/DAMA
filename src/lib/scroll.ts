let lenisRef: { scrollTo: (t: unknown, o?: unknown) => void; stop: () => void; start: () => void } | null =
  null;

export function setLenis(instance: typeof lenisRef) {
  lenisRef = instance;
}

export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  if (lenisRef) {
    lenisRef.scrollTo(target, { offset, duration: 1.4 });
  } else if (typeof target !== "number") {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}

export function lockScroll(lock: boolean) {
  if (!lenisRef) return;
  if (lock) {
    lenisRef.stop();
  } else {
    lenisRef.start();
  }
}
