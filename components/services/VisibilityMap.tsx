/**
 * Abstract local-visibility map.
 *
 * Original geometry inspired by an Adana street lattice —
 * deliberately NOT Google Maps styling, colours or iconography (brief section 26).
 * Server-rendered SVG, no JS. The pulse is pure CSS and is suppressed under
 * prefers-reduced-motion by the global rule in globals.css.
 */

const STEPS = [
  { key: "ARAMA", label: "Arama" },
  { key: "HARITA", label: "Harita" },
  { key: "PROFIL", label: "Profil" },
  { key: "YOL", label: "Yol tarifi" },
  { key: "ARAMA2", label: "Çağrı" },
  { key: "GORUNUR", label: "Görünürlük" },
];

export default function VisibilityMap() {
  return (
    <div>
      <svg viewBox="0 0 200 130" className="h-full w-full" aria-hidden>
        {/* street lattice */}
        {[18, 40, 62, 84, 106].map((y) => (
          <line key={y} x1="6" y1={y} x2="194" y2={y} stroke="#1e1e23" strokeWidth="0.4" />
        ))}
        {[26, 56, 86, 116, 146, 176].map((x) => (
          <line key={x} x1={x} y1="6" x2={x} y2="124" stroke="#1e1e23" strokeWidth="0.4" />
        ))}

        {/* arterial roads */}
        <path d="M6 88 L56 66 L116 76 L194 44" fill="none" stroke="#4a4a52" strokeWidth="0.9" />
        <path d="M56 6 L56 66 L82 124" fill="none" stroke="#4a4a52" strokeWidth="0.7" opacity="0.6" />

        {/* district labels */}
        <text x="12" y="16" fill="#4a4a52" fontSize="4.6" fontFamily="monospace" letterSpacing="1">
          ADANA
        </text>

        {/* visibility radius */}
        <circle cx="116" cy="62" r="42" fill="#ff4d1c" opacity="0.04" />
        <circle cx="116" cy="62" r="28" fill="#ff4d1c" opacity="0.06" />
        <circle
          cx="116"
          cy="62"
          r="15"
          fill="none"
          stroke="#ff4d1c"
          strokeWidth="0.5"
          opacity="0.5"
        />

        {/* surrounding searchers */}
        {[
          [64, 34],
          [168, 40],
          [78, 100],
          [150, 96],
          [40, 70],
          [180, 74],
        ].map(([x, y], i) => (
          <g key={i}>
            <line
              x1={x}
              y1={y}
              x2="116"
              y2="62"
              stroke="#ff4d1c"
              strokeWidth="0.3"
              opacity="0.28"
              strokeDasharray="1.5 2"
            />
            <circle cx={x} cy={y} r="1.5" fill="#f4f2ee" opacity="0.45" />
          </g>
        ))}

        {/* the business pin */}
        <path
          d="M116 48 C110 48 106 52.5 106 58 C106 65 116 76 116 76 C116 76 126 65 126 58 C126 52.5 122 48 116 48 Z"
          fill="#ff4d1c"
        />
        <circle cx="116" cy="58" r="3.2" fill="#080809" />
      </svg>

      <ol className="mt-8 grid grid-cols-3 gap-x-6 gap-y-3 border-t border-ink-line pt-6 sm:grid-cols-6">
        {STEPS.map((s, i) => (
          <li key={s.key}>
            <span className="t-index block">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-1 block text-xs text-bone-dim">{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
