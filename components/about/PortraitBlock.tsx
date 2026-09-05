import Image from "next/image";
import { SITE } from "@/content/site";

/**
 * Portrait treatment.
 *
 * With `src`: the authentic photograph supplied by Kaan, served through
 * next/image so it is delivered as AVIF/WebP at the size actually needed. The
 * name and title lockup stays over a bottom scrim, so the block keeps its
 * identity rather than becoming an anonymous photo.
 *
 * Without `src`: a typographic and geometric composition, complete in its own
 * right. No synthetic portrait is ever generated (brief section 50).
 */
export default function PortraitBlock({ src }: { src?: string }) {
  if (src) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden border border-ink-line bg-ink-raised">
        <Image
          src={src}
          alt={`${SITE.name}, ${SITE.title}`}
          fill
          // Roughly a third of the shell on desktop, full width on mobile.
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
          priority
        />

        {/* Scrim so the lockup stays legible over the photograph. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-display text-2xl font-bold uppercase leading-none tracking-[0.1em]">
            Kaan
            <br />
            <span className="text-bone-dim">Gündüz</span>
          </p>
          <p className="mt-3 text-xs text-bone-dim">{SITE.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-ink-line bg-ink-raised">
      <div className="hairline-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 30% 25%, rgba(255,77,28,0.14) 0%, transparent 62%)",
        }}
        aria-hidden
      />

      <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* Abstract head-and-shoulders silhouette, built from the site's own
            language of nodes and hairlines rather than an illustration. */}
        <circle cx="50" cy="44" r="21" fill="none" stroke="#1e1e23" strokeWidth="0.5" />
        <circle cx="50" cy="44" r="13" fill="none" stroke="#4a4a52" strokeWidth="0.4" />
        <path
          d="M18 125 C18 96 32 82 50 82 C68 82 82 96 82 125"
          fill="none"
          stroke="#1e1e23"
          strokeWidth="0.6"
        />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const r = 21 + ((i * 37) % 11) * 0.7;
          return (
            <circle
              key={i}
              cx={50 + Math.cos(a) * r}
              cy={44 + Math.sin(a) * r}
              r={i % 9 === 0 ? 0.9 : 0.5}
              fill={i % 9 === 0 ? "#ff4d1c" : "#f4f2ee"}
              opacity={i % 9 === 0 ? 0.9 : 0.3}
            />
          );
        })}
        <line x1="50" y1="65" x2="50" y2="82" stroke="#ff4d1c" strokeWidth="0.5" opacity="0.6" />
        <circle cx="50" cy="44" r="2.4" fill="#ff4d1c" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-display text-2xl font-bold uppercase leading-none tracking-[0.1em]">
          Kaan
          <br />
          <span className="text-bone-dim">Gündüz</span>
        </p>
        <p className="mt-3 text-xs text-graphite">{SITE.title}</p>
      </div>
    </div>
  );
}
