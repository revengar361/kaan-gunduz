"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms. Capped so long lists never feel slow. */
  delay?: number;
};

/**
 * Intersection-driven reveal. The animated state lives in CSS behind the
 * `motion-ok` html class, so the end state is the default and nothing is ever
 * hidden from a reduced-motion or no-JS visitor.
 */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No motion, or no IntersectionObserver support: show immediately.
    if (
      !document.documentElement.classList.contains("motion-ok") ||
      typeof IntersectionObserver === "undefined"
    ) {
      el.classList.add("revealed");
      return;
    }

    // Safety net matching MotionFlag's frame watchdog: if the document never
    // paints, the transition would strand this element at opacity 0.
    const watchdog = window.setTimeout(() => el.classList.add("revealed"), 2200);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const wait = Math.min(delay, 600);
          window.setTimeout(() => el.classList.add("revealed"), wait);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      window.clearTimeout(watchdog);
      observer.disconnect();
    };
  }, [delay]);

  // createElement keeps this polymorphic without TypeScript collapsing the
  // union of every possible element's props down to `never`.
  return createElement(Tag, { ref, className: `reveal ${className}` }, children);
}
