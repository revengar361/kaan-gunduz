"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scroll, wired into GSAP ScrollTrigger.
 *
 * Disabled entirely for reduced-motion users and for coarse-pointer devices
 * under 768px, where native momentum scrolling is genuinely better than any
 * JS reimplementation of it.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 768;
    if (reduced || coarse) return;

    let lenis: InstanceType<typeof import("lenis").default> | null = null;
    let frame = 0;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({ lerp: 0.09, duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
