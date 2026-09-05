"use client";

import { useState } from "react";
import { DIFFERENTIATORS } from "@/content/site";

/**
 * The client-supplied positioning points (brief section 28), rendered as an
 * interactive sequence rather than five bullet cards:
 * STRATEGY -> DESIGN -> VISIBILITY -> GROWTH -> SUPPORT.
 *
 * Implemented as a real tablist so it is keyboard-navigable and screen-reader
 * correct; the visual is a horizontal progression, the semantics are tabs.
 */
export default function WhySequence() {
  const [active, setActive] = useState(0);
  const current = DIFFERENTIATORS[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActive((v) => (v + 1) % DIFFERENTIATORS.length);
    } else if (e.key === "ArrowLeft") {
      setActive((v) => (v - 1 + DIFFERENTIATORS.length) % DIFFERENTIATORS.length);
    }
  };

  return (
    <section className="shell border-t border-ink-line py-20 md:py-24">
      <p className="t-label mb-4">07 — Neden Kaan Gündüz</p>
      <h2 className="t-h1 mb-14 max-w-[18ch]">
        Beş adım, tek bir çalışma biçimi.
      </h2>

      <div
        role="tablist"
        aria-label="Çalışma biçimi aşamaları"
        onKeyDown={onKeyDown}
        className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-5"
      >
        {DIFFERENTIATORS.map((d, i) => {
          const isActive = i === active;
          return (
            <button
              key={d.key}
              role="tab"
              type="button"
              id={`why-tab-${d.key}`}
              aria-selected={isActive}
              aria-controls={`why-panel-${d.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`group relative bg-ink px-5 py-6 text-left transition-colors duration-300 ${
                isActive ? "bg-ink-raised" : ""
              }`}
            >
              <span className="t-index mb-3 block">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`font-display text-base font-semibold tracking-tight transition-colors duration-300 ${
                  isActive ? "text-signal" : "text-bone-dim"
                }`}
              >
                {d.step}
              </span>
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-signal transition-transform duration-500 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {DIFFERENTIATORS.map((d, i) => (
        <div
          key={d.key}
          role="tabpanel"
          id={`why-panel-${d.key}`}
          aria-labelledby={`why-tab-${d.key}`}
          hidden={i !== active}
          className="border border-t-0 border-ink-line bg-ink-raised p-8 md:p-12"
        >
          <h3 className="t-h2 max-w-[20ch]">{current.title}</h3>
          <p className="t-lead mt-5 max-w-[58ch]">{current.body}</p>
        </div>
      ))}
    </section>
  );
}
