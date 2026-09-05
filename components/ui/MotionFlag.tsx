"use client";

import { useEffect } from "react";

/**
 * Adds `motion-ok` to <html> only when the visitor has NOT asked for reduced
 * motion. Reveal animations key off this class, which means:
 *   - no JS  -> content is visible (class never added)
 *   - reduced motion -> content is visible
 *   - otherwise -> content animates in
 *
 * The default state is always "visible". Animation is the enhancement.
 *
 * FRAME WATCHDOG
 * --------------
 * Scroll reveals depend on CSS transitions actually running. If the document
 * never produces an animation frame — an unpainted/occluded surface, a
 * throttled embedded webview, some headless and screenshot contexts — a
 * transition is reported as "running" but its clock never advances, and
 * anything mid-transition stays stuck at opacity 0.
 *
 * That failure mode is invisible content, which is the worst possible outcome
 * for a page whose job is to be read. So: if no frame arrives within 2s, drop
 * `motion-ok` entirely and let everything fall back to its visible end state.
 * Motion is optional; legibility is not.
 */
export default function MotionFlag() {
  useEffect(() => {
    const root = document.documentElement;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      root.classList.toggle("motion-ok", !query.matches);
    };

    apply();
    query.addEventListener("change", apply);

    let painted = false;
    const frame = requestAnimationFrame(() => {
      painted = true;
    });

    const watchdog = window.setTimeout(() => {
      if (!painted) {
        root.classList.remove("motion-ok");
        root.classList.add("motion-stalled");
      }
    }, 2000);

    return () => {
      query.removeEventListener("change", apply);
      cancelAnimationFrame(frame);
      window.clearTimeout(watchdog);
    };
  }, []);

  return null;
}
