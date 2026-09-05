"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Sosyal medyada sadece paylaşım yapmıyoruz."
 *
 * A blank grid fills with content cards, which then reorganise from a scattered
 * arrangement into a coherent brand feed. Original abstract interface language —
 * deliberately NOT a reproduction of Instagram's UI (brief section 19).
 */

const PILLARS = [
  { key: "STRATEJI", label: "Strateji" },
  { key: "ICERIK", label: "İçerik" },
  { key: "TASARIM", label: "Tasarım" },
  { key: "YAYIN", label: "Yayın" },
  { key: "ANALIZ", label: "Analiz" },
  { key: "OPTIMIZASYON", label: "Optimizasyon" },
];

/**
 * 12 cards; each has a scattered start and a resolved slot.
 *
 * Values are rounded to 2dp so the transform string serialises identically on
 * the server and the client — full float precision produces a hydration
 * mismatch when React re-serialises the style object.
 */
const CARDS = Array.from({ length: 12 }, (_, i) => {
  const seedA = Math.sin(i * 12.9898) * 43758.5453;
  const seedB = Math.sin(i * 78.233) * 12345.6789;
  const fa = seedA - Math.floor(seedA);
  const fb = seedB - Math.floor(seedB);
  const round = (n: number) => Math.round(n * 100) / 100;

  return {
    i,
    chaosX: round((fa - 0.5) * 44),
    chaosY: round((fb - 0.5) * 36),
    chaosR: round((fa - 0.5) * 22),
    tone: i % 5 === 0 ? "signal" : i % 3 === 0 ? "mid" : "low",
  };
});

export default function FeedSystem() {
  const [ordered, setOrdered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!document.documentElement.classList.contains("motion-ok")) {
      setOrdered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOrdered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="shell border-t border-ink-line py-20 md:py-24">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="t-label mb-4">05 — Sosyal medya yönetimi</p>
          <h2 className="t-h1 max-w-[15ch]">
            Sosyal medyada sadece paylaşım yapmıyoruz.
          </h2>
          <p className="t-lead mt-7 max-w-[44ch]">
            Bir akış, tek tek gönderilerin toplamı değildir. Strateji, içerik, tasarım, yayın,
            analiz ve optimizasyon birlikte çalıştığında ortaya bir marka çıkar.
          </p>

          <ol className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4">
            {PILLARS.map((p, i) => (
              <li key={p.key} className="flex items-baseline gap-3 border-t border-ink-line pt-3">
                <span className="t-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-bone">{p.label}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <div
            ref={ref}
            className="relative aspect-square w-full overflow-hidden border border-ink-line bg-ink-raised p-5 md:p-8"
          >
            <div className="hairline-grid absolute inset-0 opacity-30" aria-hidden />
            <div className="relative grid h-full grid-cols-3 gap-3 md:gap-4" aria-hidden>
              {CARDS.map((c) => (
                <div
                  key={c.i}
                  className={`relative border ${
                    c.tone === "signal" ? "border-signal/50" : "border-ink-line"
                  }`}
                  style={{
                    backgroundColor:
                      c.tone === "signal"
                        ? "rgba(255,77,28,0.16)"
                        : c.tone === "mid"
                          ? "rgba(244,242,238,0.07)"
                          : "rgba(244,242,238,0.03)",
                    transform: ordered
                      ? "translate(0%, 0%) rotate(0deg)"
                      : `translate(${c.chaosX}%, ${c.chaosY}%) rotate(${c.chaosR}deg)`,
                    opacity: ordered ? 1 : 0.35,
                    transition: `transform 1100ms cubic-bezier(0.16,1,0.3,1) ${c.i * 55}ms, opacity 700ms ease ${c.i * 55}ms`,
                  }}
                >
                  {c.tone === "signal" && (
                    <span className="absolute bottom-2 left-2 h-1.5 w-1.5 bg-signal" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="t-label mt-4 text-graphite">
            Temsili dijital süreç görselleştirmesi
          </p>
        </div>
      </div>
    </section>
  );
}
