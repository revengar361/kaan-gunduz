"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The brand's central argument, as a pinned scroll sequence:
 * CHAOS -> STRATEGY -> SYSTEM -> VISIBILITY -> GROWTH.
 *
 * Each stage draws its own SVG state. Under reduced motion the whole thing
 * degrades to a plain vertical list of the same five stages, fully readable.
 */

const STAGES = [
  {
    key: "KAOS",
    index: "01",
    title: "Kaos",
    body: "İşletme dijitalde var ama dağınık. Gönderiler var, sistem yok. Bir yerde telefon numarası eksik, bir yerde eski logo, bir yerde başka bir renk.",
  },
  {
    key: "STRATEJI",
    index: "02",
    title: "Strateji",
    body: "Önce sorular: Kime satıyorsunuz? Sizi neden seçsinler? Rakiplerinizden farkınız ne? Cevaplar netleşmeden hiçbir tasarım işe yaramaz.",
  },
  {
    key: "SISTEM",
    index: "03",
    title: "Sistem",
    body: "Sosyal medya, web sitesi, Google profili ve reklam hesabı tek bir mekanizma haline gelir. Parçalar birbirini destekler.",
  },
  {
    key: "GORUNURLUK",
    index: "04",
    title: "Görünürlük",
    body: "İnsanların sizi aradığı yerde çıkmaya başlarsınız. Aramada, haritada, akışta. Görünürlük tesadüf değil, kurulum işidir.",
  },
  {
    key: "BUYUME",
    index: "05",
    title: "Büyüme",
    body: "Daha fazla arama, daha fazla mesaj, daha fazla masa. Yapı kurulduğunda büyüme sürdürülebilir hale gelir.",
  },
];

/** Deterministic node positions per stage — no physics, no randomness at runtime. */
function nodesFor(stage: number) {
  const nodes: { x: number; y: number; hot: boolean }[] = [];
  let s = 4242;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  const COUNT = 44;

  for (let i = 0; i < COUNT; i += 1) {
    const r1 = rand();
    const r2 = rand();

    if (stage === 0) {
      nodes.push({ x: 8 + r1 * 84, y: 8 + r2 * 84, hot: false });
    } else if (stage === 1) {
      // Beginning to align: pulled toward columns.
      const col = i % 6;
      const target = 12 + col * 15.2;
      nodes.push({ x: target + (r1 - 0.5) * 18, y: 8 + r2 * 84, hot: i % 11 === 0 });
    } else if (stage === 2) {
      const col = i % 8;
      const row = Math.floor(i / 8);
      nodes.push({ x: 10 + col * 11.4, y: 14 + row * 14.5, hot: i % 9 === 0 });
    } else if (stage === 3) {
      // Radiating from a single point of visibility.
      const angle = (i / COUNT) * Math.PI * 2;
      const radius = 16 + (i % 4) * 11;
      nodes.push({
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius * 0.82,
        hot: i % 4 === 0,
      });
    } else {
      // Ordered expansion outward.
      const col = i % 8;
      const row = Math.floor(i / 8);
      const spread = 1 + row * 0.06;
      nodes.push({
        x: 50 + (col - 3.5) * 12 * spread,
        y: 18 + row * 13,
        hot: i % 6 === 0,
      });
    }
  }
  return nodes;
}

export default function MethodSequence() {
  const [stage, setStage] = useState(0);
  const [pinned, setPinned] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion-ok")) {
      setPinned(false);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.999);
      setStage(Math.floor(progress * STAGES.length));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nodes = nodesFor(stage);
  const active = STAGES[stage];

  // Reduced motion / no JS: a readable list, not a broken animation.
  if (!pinned) {
    return (
      <section className="shell border-t border-ink-line py-24">
        <p className="t-label mb-4">03 — Nasıl düşünüyorum</p>
        <h2 className="t-h1 max-w-[16ch]">Kaostan büyümeye.</h2>
        <ol className="mt-16 space-y-10">
          {STAGES.map((s) => (
            <li key={s.key} className="grid gap-3 border-t border-ink-line pt-6 md:grid-cols-12">
              <p className="t-index md:col-span-1">{s.index}</p>
              <h3 className="t-h3 md:col-span-3">{s.title}</h3>
              <p className="max-w-[60ch] text-bone-dim md:col-span-8">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[170vh] border-t border-ink-line">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell grid w-full gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="t-label mb-4">03 — Nasıl düşünüyorum</p>
            <h2 className="t-h1 mb-10 max-w-[14ch]">Kaostan büyümeye.</h2>

            <div className="min-h-[13rem]">
              <p className="t-index mb-3">{active.index}</p>
              <h3 className="t-h2 mb-4 text-signal">{active.title}</h3>
              <p className="max-w-[46ch] text-bone-dim">{active.body}</p>
            </div>

            <ol className="mt-10 flex gap-2" aria-label="Aşamalar">
              {STAGES.map((s, i) => (
                <li key={s.key} className="flex-1">
                  <div
                    className={`h-px w-full transition-colors duration-500 ${
                      i <= stage ? "bg-signal" : "bg-ink-line"
                    }`}
                  />
                  <span className="sr-only">
                    {s.title}
                    {i === stage ? " (etkin)" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-square w-full max-w-[38rem] lg:ml-auto">
              <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
                <rect
                  x="0.5"
                  y="0.5"
                  width="99"
                  height="99"
                  fill="none"
                  stroke="#1e1e23"
                  strokeWidth="0.3"
                />
                {stage >= 3 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="3"
                    fill="#ff4d1c"
                    className="transition-all duration-700"
                  />
                )}
                {nodes.map((n, i) => (
                  <circle
                    key={i}
                    cx={n.x}
                    cy={n.y}
                    r={n.hot ? 1.15 : 0.85}
                    fill={n.hot ? "#ff4d1c" : "#f4f2ee"}
                    opacity={n.hot ? 0.95 : 0.42}
                    style={{
                      transition: `cx 900ms cubic-bezier(0.16,1,0.3,1) ${i * 8}ms, cy 900ms cubic-bezier(0.16,1,0.3,1) ${i * 8}ms, fill 500ms, opacity 500ms`,
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
