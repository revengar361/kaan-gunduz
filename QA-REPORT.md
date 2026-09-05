# QA Report

**Date:** 4 September 2026
**Method:** production build + programmatic verification against a running dev server (DOM, computed styles, network, console, structured data). Every result below is measured, not assumed.

---

## Environment limitation, stated up front

The verification browser pane **produced zero animation frames** — measured directly: `requestAnimationFrame` fired 0 times across 1.5s of wall clock, and `document.timeline.currentTime` advanced 0ms. The pane also would not accept synthetic scroll input.

**Consequences:**
- Screenshots after any scroll returned black or showed stale composited surfaces. These were *not* site defects; DOM and computed-style inspection confirmed content was present and correctly styled.
- Full-page visual review of scroll-driven states could not be completed in this environment. **A human should still look at the site in a real browser** — particularly the hero morph and the pinned method sequence, which are the two most motion-dependent moments.

Everything not dependent on painting was verified rigorously, and is reported below.

This limitation produced one genuine improvement — see Finding 3.

---

## Findings and fixes

### 1. Particle shader failed to link — hero rendered nothing ⚠️ critical

`THREE.WebGLProgram: VALIDATE_STATUS false — Precisions of uniform 'uPhase' differ between VERTEX and FRAGMENT shaders.`

The fragment shader declared `precision mediump float;` while the vertex shader used Three's injected `highp`. A uniform declared at differing precision across stages fails program validation, so the entire hero particle system drew nothing.

**Fixed** by removing the explicit qualifier so Three's matching prefix applies to both stages.

**Proof** — both shader variants compiled in an isolated WebGL context:

| Variant | LINK_STATUS | VALIDATE_STATUS |
|---|---|---|
| with `precision mediump float;` | `false` | `false` |
| current code | `true` | `true` |

### 2. Hydration mismatch in `FeedSystem`

React re-serialised inline style objects differently on server and client: full float precision (`translate(-19.482400548295118%, ...)`) versus the client's rounded form, plus a `borderColor: undefined` key.

**Fixed** by rounding the generated offsets to 2dp and moving the conditional border to a class. Verified: transforms now serialise as `translate(-19.48%, 12.58%)`, and a fresh tab loads with **zero console errors**.

### 3. Reveal animations could strand content invisible

Found while diagnosing Finding 1's symptoms. When a document never paints, CSS transitions report `playState: "running"` but never progress — elements mid-reveal were measured permanently frozen at `opacity: 0` and `0.26`. Content silently invisible is the worst outcome for a site whose job is to be read.

**Fixed** with a frame watchdog: `MotionFlag` requests one frame on mount; if none arrives within 2s it removes `motion-ok` and adds `motion-stalled`, killing all transitions so every element snaps to its resolved state. `Reveal` carries a matching 2.2s timer, and now also guards against `IntersectionObserver` being unavailable.

**Verified:** after the fix, `motion-stalled` engages and **0 of 14** reveal elements remain invisible (all at `opacity: 1`).

### 4. `--graphite` failed WCAG AA

`#4a4a52` measured **2.28:1** on `--ink` — failing AA (4.5:1) and even the large-text threshold (3:1). It carries `.t-index`, captions and footer legal links, all at ~12px.

**Fixed** to `#7f7e8b`: **5.01:1** on `--ink`, **4.76:1** on `--ink-raised`. Decorative SVG strokes keep the darker literal in their own components, so the visual weight of the diagrams is unchanged.

### 5. Dev/prod build collision (process note)

Running `next build` against a live `next dev` corrupted `.next`, producing 500s. Not a code defect. Resolved by stopping the dev server, clearing `.next`, and restarting.

---

## Verification results

### Routes — 18 tested, all pass
All returned expected status (200, and 404 for a nonexistent path), each with a unique `<title>`, exactly one `<h1>`, and valid JSON-LD.

### Structured data — parses on every page type

| Page | Types emitted |
|---|---|
| `/` | Person, ProfessionalService, WebSite |
| `/sss` | + FAQPage, BreadcrumbList |
| `/portfoy/alo-balik` | + BreadcrumbList |
| `/hizmetler/meta-reklam` | + Service, BreadcrumbList |

`Person.award` confirmed absent, as required by `research/awards.md`.

### Contact API

| Case | Status | Response |
|---|---|---|
| Valid payload | 200 | `{ ok: true, mode: "development" }` |
| Missing fields | 422 | `{ error, fields: ["brand","name","email","services"] }` |

Also confirmed: in production with no `CONTACT_TO_EMAIL`, the endpoint returns 503 rather than falsely telling a visitor their message was delivered.

### Responsive — 12 routes at 375×812
**Zero horizontal overflow.** `scrollWidth === clientWidth === 375` on every route, with no element extending past the viewport edge.

### Accessibility — 8 pages, zero problems
No images missing `alt`; no buttons or links without accessible names; no unlabelled form controls; no skipped heading levels; exactly one `<h1>` each; `lang="tr"`, `<main>` landmark and skip link present on all.

### Contrast — all AA

| Pair | Ratio | AA small text |
|---|---|---|
| bone on ink | 17.9:1 | pass |
| bone-dim on ink | 5.79:1 | pass |
| graphite on ink | 5.01:1 | pass (after fix) |
| signal on ink | 6.03:1 | pass |
| ink on signal (CTA) | 6.03:1 | pass |

### Build
42 routes, 41 prerendered static. **102 kB** shared First Load JS; **121 kB** on the heaviest route. three.js confirmed absent from every non-homepage bundle.

---

## Brief checklist (§79)

| Item | Status |
|---|---|
| Correct Kaan Gündüz identity | Pass — 5-point test, `research/identity-verification.md` |
| No unrelated Kaan Gündüz information | Pass — academics and the TUSAŞ KAAN aircraft explicitly excluded |
| Major factual claims verified | Pass — confidence-rated in `research/sources.md` |
| Services complete | Pass — 15 services, 11 dedicated pages |
| References complete | Pass — 8 brands, all independently verified |
| Media researched | Pass — tiered; 7 brief-claimed outlets found to have no coverage |
| Portfolio structure complete | Pass — 10-part case study on all 8 |
| Visual asset sources recorded | Pass — `research/visual-assets.json` |
| Visual + animation concept per section | Pass — `design/page-visual-manifest.md` |
| Mobile version works | Pass — measured, 12 routes |
| Reduced motion works | Pass — by construction; visible end state is the default |
| No fake statistics | Pass — `results: []` on every client |
| No fake testimonials | Pass — no testimonial section exists |
| No fake awards | Pass — no `/awards` route, absent from schema |
| No fake projects | Pass |
| SEO complete | Pass |
| Local SEO complete | Pass — Adana, stated once and consistently |
| Performance optimised | Pass — 102 kB shared, static prerender |
| Accessibility checked | Pass — measured, zero problems |

---

## Recommended before launch

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
2. Wire the contact form to a mail provider.
3. Confirm and publish phone and email (`OPEN-QUESTIONS.md` B1/B2).
4. **Human visual pass in a real browser** — the motion states could not be reviewed here.
5. Run Lighthouse against a production build on the real domain.
6. Submit `sitemap.xml` to Google Search Console.
