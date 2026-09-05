# Motion System

## Principles
1. **Deterministic.** Scroll-linked, not physics-driven. The same scroll position always yields the same frame.
2. **One primary move per section.** Plus one secondary, plus micro-interactions. Never three competing animations.
3. **Motion carries meaning.** Every transition expresses chaos→order. Decoration alone is cut.
4. **Reduced motion is a first-class design**, not a degraded one.

## Transition family
Only five transitions exist site-wide. This is what makes it feel like one system.

| Name | Behaviour | Used for |
|---|---|---|
| **SCAN** | A hairline sweeps across; content resolves behind it | Section entrances, page transitions |
| **GRID** | Elements snap to grid positions from scattered offsets | Portfolio, service cards, feed builds |
| **DATA MORPH** | Particles/points redistribute between two target shapes | Hero, brand lab, funnel |
| **LINE** | A stroke draws from 0 to full length | Timelines, connectors, wireframes |
| **MASK** | clip-path reveal (inset or polygon) | Images, headlines, menu |

## Easing
- Primary: `cubic-bezier(0.16, 1, 0.3, 1)` — expo-out. Fast start, long settle.
- Scrub: linear (scroll *is* the easing).
- Micro: `cubic-bezier(0.4, 0, 0.2, 1)`, 180–240ms.

## Timing
- Micro-interaction: 180ms
- Element reveal: 600ms
- Section transition: 900ms
- Hero surface: ambient, time-driven only — never scrubbed
- Stagger: 40–70ms per item, capped at 12 items

## Scroll
Lenis smooth scroll (`lerp: 0.09`, `duration: 1.15`) driving GSAP ScrollTrigger via `scrollerProxy`. Lenis is **disabled entirely** under `prefers-reduced-motion` and on coarse-pointer devices under 768px, where native momentum scroll is better.

## Reduced motion contract
When `prefers-reduced-motion: reduce`:
- Camera travel → static composed camera
- Particle morphs → cross-fade between resolved states
- Scroll scrub → simple opacity/transform fade-in on intersection
- Lenis → off
- 3D → renders one static frame, `frameloop="never"`
- Marquees → static
- **No content is hidden or made unreachable.** Every animated reveal has its end-state as its default state.

## Performance tiers
Detected once on mount (`lib/device-tier.ts`) from `deviceMemory`, `hardwareConcurrency`, viewport width and pointer type.

| Tier | Particles | DPR | Post-processing |
|---|---|---|---|
| HIGH (desktop, ≥8 cores) | 18,000 | up to 2 | Yes |
| MEDIUM (laptop/tablet) | 8,000 | up to 1.5 | No |
| LOW (mobile) | 3,000 | 1 | No |
| FALLBACK (no WebGL / reduced motion) | CSS/SVG static composition | — | — |

Only one WebGL canvas is ever mounted. Scenes swap content within it based on viewport, rather than each section mounting its own renderer.

## Frame watchdog — the fail-safe

Scroll reveals depend on CSS transitions actually running. There are real environments where a document reports transitions as "running" while its animation clock never advances: an occluded or unpainted surface, a throttled embedded webview, some headless and screenshot contexts. In those, anything caught mid-transition strands at `opacity: 0`.

That failure mode is invisible content, which is the worst possible outcome for a page whose job is to be read.

`components/ui/MotionFlag.tsx` therefore requests one animation frame on mount. If no frame arrives within 2s it removes `motion-ok` and adds `motion-stalled`, which kills every transition and animation site-wide. Each element snaps to its current target value, which is always the resolved, readable state. `Reveal` carries a matching 2.2s safety timer of its own.

This was found during QA, not theorised: the verification browser pane produced literally zero animation frames over 1.5s of wall time, leaving reveal elements frozen at opacity 0. The fix converts "cannot animate" into "shows content", which is the correct direction to fail.
