import type { MetaphorKey } from "@/content/services";

/**
 * One bespoke visual metaphor per service (brief section 53).
 *
 * All original geometry. Deliberately schematic rather than illustrative —
 * these read as diagrams of a system, which is the argument the site is making.
 * Pure SVG, server-rendered, no JS, no raster assets.
 */

const BONE = "#f4f2ee";
const LINE = "#1e1e23";
const GRAPHITE = "#4a4a52";
const SIGNAL = "#ff4d1c";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
      <rect x="0.4" y="0.4" width="199.2" height="139.2" fill="none" stroke={LINE} strokeWidth="0.6" />
      {children}
    </svg>
  );
}

/** SOCIAL MEDIA — a content grid resolving into order. */
function GridMetaphor() {
  const cells = [];
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 6; c += 1) {
      const i = r * 6 + c;
      cells.push(
        <rect
          key={i}
          x={22 + c * 27}
          y={18 + r * 27}
          width="22"
          height="22"
          fill={i === 8 || i === 15 ? SIGNAL : "none"}
          opacity={i === 8 || i === 15 ? 0.85 : 1}
          stroke={LINE}
          strokeWidth="0.7"
        />
      );
    }
  }
  return <Frame>{cells}</Frame>;
}

/** INSTAGRAM — a vertical feed column. Abstract, not a UI clone. */
function FeedMetaphor() {
  return (
    <Frame>
      <rect x="72" y="12" width="56" height="116" fill="none" stroke={GRAPHITE} strokeWidth="0.8" />
      <circle cx="82" cy="24" r="4" fill={SIGNAL} />
      <rect x="90" y="21" width="28" height="2" fill={BONE} opacity="0.5" />
      <rect x="90" y="26" width="18" height="2" fill={BONE} opacity="0.25" />
      <rect x="78" y="36" width="44" height="34" fill={BONE} opacity="0.09" stroke={LINE} strokeWidth="0.6" />
      <rect x="78" y="76" width="44" height="34" fill={BONE} opacity="0.05" stroke={LINE} strokeWidth="0.6" />
      <rect x="78" y="116" width="26" height="2" fill={BONE} opacity="0.3" />
      {[40, 60, 80, 100].map((y) => (
        <line key={y} x1="132" y1={y} x2="176" y2={y} stroke={LINE} strokeWidth="0.6" />
      ))}
      {[40, 60, 80, 100].map((y, i) => (
        <circle key={y} cx="176" cy={y} r={i === 1 ? 2.4 : 1.4} fill={i === 1 ? SIGNAL : GRAPHITE} />
      ))}
      {[40, 60, 80, 100].map((y) => (
        <circle key={`l${y}`} cx="132" cy={y} r="1.4" fill={GRAPHITE} />
      ))}
    </Frame>
  );
}

/** BRAND STRATEGY — separate elements assembling into one identity. */
function IdentityMetaphor() {
  return (
    <Frame>
      <circle cx="100" cy="70" r="34" fill="none" stroke={LINE} strokeWidth="0.8" />
      <circle cx="100" cy="70" r="20" fill="none" stroke={GRAPHITE} strokeWidth="0.8" />
      <circle cx="100" cy="70" r="6" fill={SIGNAL} />
      {[
        { x: 100, y: 20, label: "LOGO" },
        { x: 152, y: 48, label: "RENK" },
        { x: 152, y: 92, label: "TİP" },
        { x: 100, y: 120, label: "SES" },
        { x: 48, y: 92, label: "KİTLE" },
        { x: 48, y: 48, label: "KONUM" },
      ].map((p) => (
        <g key={p.label}>
          <line x1="100" y1="70" x2={p.x} y2={p.y} stroke={LINE} strokeWidth="0.6" />
          <circle cx={p.x} cy={p.y} r="2.6" fill={BONE} opacity="0.7" />
        </g>
      ))}
    </Frame>
  );
}

/** CONTENT — a camera and frame. */
function CameraMetaphor() {
  return (
    <Frame>
      <rect x="46" y="44" width="76" height="52" fill="none" stroke={GRAPHITE} strokeWidth="1" />
      <rect x="58" y="34" width="24" height="10" fill="none" stroke={GRAPHITE} strokeWidth="1" />
      <circle cx="84" cy="70" r="18" fill="none" stroke={BONE} strokeWidth="0.9" opacity="0.6" />
      <circle cx="84" cy="70" r="11" fill="none" stroke={SIGNAL} strokeWidth="1.1" />
      <circle cx="84" cy="70" r="4" fill={SIGNAL} opacity="0.5" />
      <rect x="122" y="52" width="30" height="36" fill="none" stroke={LINE} strokeWidth="0.7" />
      <rect x="156" y="52" width="30" height="36" fill="none" stroke={LINE} strokeWidth="0.7" />
      <line x1="112" y1="30" x2="112" y2="18" stroke={GRAPHITE} strokeWidth="0.8" />
      <line x1="100" y1="18" x2="124" y2="18" stroke={GRAPHITE} strokeWidth="0.8" />
    </Frame>
  );
}

/** REELS — a horizontal edit timeline. */
function TimelineMetaphor() {
  const steps = ["FİKİR", "ÇEKİM", "KURGU", "RENK", "ALTYAZI", "YAYIN"];
  return (
    <Frame>
      <line x1="14" y1="70" x2="186" y2="70" stroke={LINE} strokeWidth="0.8" />
      {steps.map((s, i) => {
        const x = 20 + i * 32.5;
        return (
          <g key={s}>
            <rect
              x={x - 10}
              y={54}
              width="20"
              height="32"
              fill={i === 5 ? SIGNAL : "none"}
              opacity={i === 5 ? 0.85 : 1}
              stroke={i === 5 ? SIGNAL : GRAPHITE}
              strokeWidth="0.8"
            />
            <circle cx={x} cy="70" r="1.6" fill={i === 5 ? "#080809" : BONE} opacity={i === 5 ? 1 : 0.5} />
            <text x={x} y="100" fill={GRAPHITE} fontSize="4.4" textAnchor="middle" fontFamily="monospace">
              {s}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/** META ADS — an advertising funnel. */
function FunnelMetaphor() {
  const rows = [
    { w: 150, label: "KİTLE" },
    { w: 124, label: "KREATİF" },
    { w: 98, label: "HEDEFLEME" },
    { w: 72, label: "KAMPANYA" },
    { w: 46, label: "OPTİMİZASYON" },
    { w: 22, label: "DÖNÜŞÜM" },
  ];
  return (
    <Frame>
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect
            x={100 - r.w / 2}
            y={14 + i * 19}
            width={r.w}
            height="13"
            fill={i === rows.length - 1 ? SIGNAL : BONE}
            opacity={i === rows.length - 1 ? 0.9 : 0.06 + i * 0.03}
            stroke={LINE}
            strokeWidth="0.5"
          />
          <text
            x="100"
            y={23 + i * 19}
            fill={i === rows.length - 1 ? "#080809" : GRAPHITE}
            fontSize="4.2"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {r.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/** WEB — wireframe becoming interface across three breakpoints. */
function WireframeMetaphor() {
  return (
    <Frame>
      <rect x="16" y="26" width="96" height="66" fill="none" stroke={GRAPHITE} strokeWidth="0.9" />
      <rect x="22" y="32" width="84" height="10" fill={BONE} opacity="0.1" />
      <rect x="22" y="46" width="48" height="4" fill={SIGNAL} opacity="0.8" />
      <rect x="22" y="54" width="62" height="3" fill={BONE} opacity="0.18" />
      <rect x="22" y="60" width="55" height="3" fill={BONE} opacity="0.18" />
      <rect x="22" y="70" width="26" height="8" fill={BONE} opacity="0.12" />
      <rect x="52" y="70" width="26" height="8" fill={BONE} opacity="0.12" />
      <rect x="82" y="70" width="24" height="8" fill={BONE} opacity="0.12" />
      <line x1="16" y1="98" x2="112" y2="98" stroke={LINE} strokeWidth="0.5" />

      <rect x="122" y="34" width="34" height="50" fill="none" stroke={GRAPHITE} strokeWidth="0.9" />
      <rect x="126" y="38" width="26" height="7" fill={BONE} opacity="0.1" />
      <rect x="126" y="49" width="18" height="3" fill={SIGNAL} opacity="0.7" />
      <rect x="126" y="56" width="24" height="2.4" fill={BONE} opacity="0.15" />

      <rect x="164" y="40" width="20" height="38" fill="none" stroke={GRAPHITE} strokeWidth="0.9" />
      <rect x="167" y="44" width="14" height="5" fill={BONE} opacity="0.1" />
      <rect x="167" y="53" width="10" height="2.4" fill={SIGNAL} opacity="0.7" />
    </Frame>
  );
}

/** GOOGLE — abstract local map with one pin. Not Google Maps styling. */
function MapMetaphor() {
  return (
    <Frame>
      {[24, 48, 72, 96, 120].map((y) => (
        <line key={y} x1="10" y1={y} x2="190" y2={y} stroke={LINE} strokeWidth="0.4" />
      ))}
      {[30, 60, 90, 120, 150, 180].map((x) => (
        <line key={x} x1={x} y1="10" x2={x} y2="130" stroke={LINE} strokeWidth="0.4" />
      ))}
      <path d="M10 96 L60 72 L120 84 L190 54" fill="none" stroke={GRAPHITE} strokeWidth="0.9" />
      <path d="M60 10 L60 72 L86 130" fill="none" stroke={GRAPHITE} strokeWidth="0.7" opacity="0.7" />
      <circle cx="100" cy="66" r="26" fill={SIGNAL} opacity="0.05" />
      <circle cx="100" cy="66" r="16" fill={SIGNAL} opacity="0.08" />
      <path d="M100 54 C94 54 90 58.5 90 64 C90 71 100 82 100 82 C100 82 110 71 110 64 C110 58.5 106 54 100 54 Z" fill={SIGNAL} />
      <circle cx="100" cy="64" r="3.2" fill="#080809" />
    </Frame>
  );
}

/** LOGO — vector geometry and construction grid. */
function VectorMetaphor() {
  return (
    <Frame>
      <circle cx="100" cy="70" r="38" fill="none" stroke={LINE} strokeWidth="0.5" />
      <rect x="62" y="32" width="76" height="76" fill="none" stroke={LINE} strokeWidth="0.5" />
      <line x1="100" y1="24" x2="100" y2="116" stroke={LINE} strokeWidth="0.4" />
      <line x1="54" y1="70" x2="146" y2="70" stroke={LINE} strokeWidth="0.4" />
      <path d="M78 94 L100 44 L122 94 Z" fill="none" stroke={BONE} strokeWidth="1.2" opacity="0.75" />
      <line x1="88" y1="78" x2="112" y2="78" stroke={SIGNAL} strokeWidth="1.6" />
      {[
        [78, 94],
        [100, 44],
        [122, 94],
      ].map(([x, y]) => (
        <rect key={`${x}`} x={x - 2} y={y - 2} width="4" height="4" fill={SIGNAL} />
      ))}
    </Frame>
  );
}

/** DIGITAL MARKETING — separate channels wired into one system. */
function SystemMetaphor() {
  const nodes = [
    { x: 40, y: 32, label: "SOSYAL" },
    { x: 160, y: 32, label: "REKLAM" },
    { x: 40, y: 108, label: "WEB" },
    { x: 160, y: 108, label: "GOOGLE" },
  ];
  return (
    <Frame>
      {nodes.map((n) => (
        <g key={n.label}>
          <line x1="100" y1="70" x2={n.x} y2={n.y} stroke={LINE} strokeWidth="0.7" />
          <rect x={n.x - 24} y={n.y - 9} width="48" height="18" fill="none" stroke={GRAPHITE} strokeWidth="0.7" />
          <text x={n.x} y={n.y + 2} fill={BONE} opacity="0.65" fontSize="4.6" textAnchor="middle" fontFamily="monospace">
            {n.label}
          </text>
        </g>
      ))}
      <circle cx="100" cy="70" r="15" fill="none" stroke={SIGNAL} strokeWidth="1.1" />
      <circle cx="100" cy="70" r="4" fill={SIGNAL} />
    </Frame>
  );
}

/** POSITIONING — a market landscape with a chosen gap. */
function LandscapeMetaphor() {
  return (
    <Frame>
      <line x1="24" y1="116" x2="180" y2="116" stroke={GRAPHITE} strokeWidth="0.7" />
      <line x1="24" y1="116" x2="24" y2="20" stroke={GRAPHITE} strokeWidth="0.7" />
      {[
        [52, 92],
        [76, 78],
        [116, 88],
        [148, 66],
        [166, 96],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill={BONE} opacity="0.22" />
      ))}
      <circle cx="100" cy="48" r="16" fill={SIGNAL} opacity="0.07" />
      <circle cx="100" cy="48" r="6" fill={SIGNAL} />
      <line x1="100" y1="48" x2="100" y2="116" stroke={SIGNAL} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6" />
      <line x1="24" y1="48" x2="100" y2="48" stroke={SIGNAL} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6" />
      <text x="106" y="42" fill={SIGNAL} fontSize="4.8" fontFamily="monospace">
        SİZ
      </text>
    </Frame>
  );
}

const MAP: Record<MetaphorKey, () => React.JSX.Element> = {
  grid: GridMetaphor,
  feed: FeedMetaphor,
  identity: IdentityMetaphor,
  camera: CameraMetaphor,
  timeline: TimelineMetaphor,
  funnel: FunnelMetaphor,
  wireframe: WireframeMetaphor,
  map: MapMetaphor,
  vector: VectorMetaphor,
  system: SystemMetaphor,
  landscape: LandscapeMetaphor,
};

export default function ServiceMetaphor({ metaphor }: { metaphor: MetaphorKey }) {
  const Component = MAP[metaphor] ?? GridMetaphor;
  return <Component />;
}
