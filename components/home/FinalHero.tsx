"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/content/site";

/**
 * The closing bookend.
 *
 * Echoes the hero's metal swell rather than repeating it in WebGL — the hero
 * canvas is still mounted higher up the page, and one WebGL context per page is
 * the performance rule this site keeps. Rendered as layered SVG ridges that
 * settle from turbulent to calm, then hand off from the name to the slogan.
 */

const W = 200;
const H = 100;

/** Same sum-of-sines family as the hero surface, sampled to a filled band. */
function ridge(yBase: number, amp: number, seed: number) {
  const pts: string[] = [];
  const steps = 72;

  for (let i = 0; i <= steps; i += 1) {
    const x = (i / steps) * W;
    const p = x * 0.06;
    const y =
      yBase -
      (Math.sin(p + seed) * 1.0 +
        Math.sin(p * 0.62 - seed * 1.7) * 0.8 +
        Math.sin(p * 1.35 + seed * 0.6) * 0.45) *
        amp;
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return `M0,${H} L${pts.join(" L")} L${W},${H} Z`;
}

const BANDS = [
  { y: 88, seed: 0.0, fill: "#101014", stroke: "#26262e" },
  { y: 76, seed: 1.1, fill: "#0e0e12", stroke: "#2b2b34" },
  { y: 64, seed: 2.3, fill: "#0c0c10", stroke: "#33333d" },
  { y: 52, seed: 3.4, fill: "#0b0b0e", stroke: "#3b3b46" },
];

export default function FinalHero() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!document.documentElement.classList.contains("motion-ok")) {
      setPhase(2);
      return;
    }

    let t1 = 0;
    let t2 = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        t1 = window.setTimeout(() => setPhase(1), 140);
        t2 = window.setTimeout(() => setPhase(2), 2000);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] items-center overflow-hidden border-t border-ink-line"
    >
      <div className="absolute inset-0" aria-hidden>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="final-rim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff4d1c" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff4d1c" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ff4d1c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Turbulent and settled sets cross-fade — SVG path data cannot be
              transitioned, but opacity between two rendered states can. */}
          {[
            { amp: 5.6, show: phase === 0 },
            { amp: 2.4, show: phase > 0 },
          ].map((state, si) => (
            <g
              key={si}
              style={{
                opacity: state.show ? 1 : 0,
                transition: "opacity 1400ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {BANDS.map((b, i) => (
                <g key={b.seed}>
                  <path d={ridge(b.y, state.amp, b.seed)} fill={b.fill} />
                  <path
                    d={ridge(b.y, state.amp, b.seed)}
                    fill="none"
                    stroke={b.stroke}
                    strokeWidth="0.35"
                  />
                  {i === 2 && (
                    <path
                      d={ridge(b.y, state.amp, b.seed)}
                      fill="none"
                      stroke="url(#final-rim)"
                      strokeWidth="0.5"
                    />
                  )}
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>

      <div className="shell relative w-full text-center">
        <p
          className="font-display text-[clamp(1.75rem,7vw,6rem)] font-bold uppercase leading-none tracking-[-0.03em] transition-all duration-1000"
          style={{
            opacity: phase === 1 ? 1 : phase === 2 ? 0.14 : 0,
            transform: phase === 2 ? "scale(0.94)" : "scale(1)",
          }}
        >
          {SITE.name}
        </p>

        <p
          className="t-h1 mt-6 transition-all duration-1000"
          style={{
            opacity: phase === 2 ? 1 : 0,
            transform: phase === 2 ? "translateY(0)" : "translateY(18px)",
          }}
        >
          Markanızı Dijitalde <span className="text-signal">Büyütüyorum.</span>
        </p>
      </div>
    </section>
  );
}
