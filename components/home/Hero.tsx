"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { SITE, CTA } from "@/content/site";
import StaticField from "@/components/three/StaticField";

// three.js never reaches the server bundle; the static field covers SSR.
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => <StaticField />,
});

const PHASES = [
  { label: "İçerik", note: "Dağınık" },
  { label: "Marka", note: "Sistem" },
  { label: "Kitle", note: "Erişim" },
  { label: "Büyüme", note: "İşletme" },
];

export default function Hero() {
  return (
    // A plain full-height section. The surface no longer reacts to scroll, so
    // pinning it would only mean scrolling with nothing happening.
    <section className="relative h-screen">
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0">
          <HeroCanvas />
        </div>

        {/* Legibility floor under the type, without flattening the field. */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-ink/55"
          aria-hidden
        />

        <div className="shell relative flex h-full flex-col justify-between py-24 md:py-28">
          <div className="flex items-start justify-between gap-8">
            <p className="t-label max-w-[22ch]">Türkiye</p>
            <p className="t-label hidden text-right md:block">
              Sosyal Medya
              <br />
              Dijital Strateji
            </p>
          </div>

          <div>
            <h1 className="t-display max-w-[14ch]">
              Markanızı
              <br />
              Dijitalde
              <br />
              <span className="text-signal">Büyütüyorum.</span>
            </h1>

            <p className="t-lead mt-8 max-w-[52ch]">{SITE.subline}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={CTA.primary.href}
                className="group inline-flex items-center gap-3 bg-signal px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:bg-bone"
              >
                {CTA.primary.label}
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href={CTA.secondary.href}
                className="inline-flex items-center border border-ink-line px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-bone transition-colors duration-200 hover:border-signal hover:text-signal"
              >
                {CTA.secondary.label}
              </Link>
            </div>
          </div>

          {/* The metaphor, spelled out as a legend for the field above. */}
          <div className="grid grid-cols-2 gap-px border-t border-ink-line pt-6 md:grid-cols-4">
            {PHASES.map((p, i) => (
              <div key={p.label} className="pr-6">
                <p className="t-index mb-1.5">0{i + 1}</p>
                <p className="font-display text-sm font-semibold tracking-tight">{p.label}</p>
                <p className="text-xs text-graphite">{p.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden on small screens, where it collides with the phase legend
            and where the scroll affordance is obvious anyway. */}
        <p className="t-label absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-center md:block">
          Kaydırın
        </p>
      </div>
    </section>
  );
}
