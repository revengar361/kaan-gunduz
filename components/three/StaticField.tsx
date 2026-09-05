/**
 * The no-WebGL / reduced-motion composition.
 *
 * A designed end state, not a blank box: the same metal-swell idea rendered as
 * deterministic layered SVG ridges, so the hero still reads as a surface
 * catching light. Server rendered, zero JS, a couple of KB.
 */

const W = 200;
const H = 120;

/** Same sum-of-sines family the WebGL surface uses, sampled to a filled band. */
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
  { y: 96, amp: 3.0, seed: 0.0, fill: "#101014", stroke: "#26262e" },
  { y: 84, amp: 3.6, seed: 1.1, fill: "#0e0e12", stroke: "#2b2b34" },
  { y: 72, amp: 4.2, seed: 2.3, fill: "#0c0c10", stroke: "#33333d" },
  { y: 60, amp: 4.8, seed: 3.4, fill: "#0b0b0e", stroke: "#3b3b46" },
  { y: 48, amp: 5.2, seed: 4.6, fill: "#0a0a0d", stroke: "#45454f" },
];

export default function StaticField() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="wave-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff4d1c" stopOpacity="0" />
            <stop offset="45%" stopColor="#ff4d1c" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ff4d1c" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="wave-glow" cx="52%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#ff4d1c" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#ff4d1c" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="#080809" />
        <rect width={W} height={H} fill="url(#wave-glow)" />

        {BANDS.map((b, i) => (
          <g key={b.seed}>
            <path d={ridge(b.y, b.amp, b.seed)} fill={b.fill} />
            <path
              d={ridge(b.y, b.amp, b.seed)}
              fill="none"
              stroke={b.stroke}
              strokeWidth="0.35"
            />
            {/* One crest carries the accent, matching the WebGL rim light. */}
            {i === 2 && (
              <path
                d={ridge(b.y, b.amp, b.seed)}
                fill="none"
                stroke="url(#wave-rim)"
                strokeWidth="0.5"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
