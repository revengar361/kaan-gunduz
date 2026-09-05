# Kaan Gündüz — Personal Brand Website

Premium 3D personal-brand site for **Kaan Gündüz**, Sosyal Medya ve Dijital Strateji Uzmanı, Adana / Türkiye.

> **Markanızı Dijitalde Büyütüyorum.**

---

## Quick start

```bash
npm install
npm run dev
```

Before launch, set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the real domain — sitemap, canonicals and all JSON-LD read from it.

---

## The one thing to read first

**[`OPEN-QUESTIONS.md`](OPEN-QUESTIONS.md)** — everything the site needs from Kaan before it goes live. Highest priority is a confirmed phone number and email; nothing unverified was published.

---

## Governing principle

The whole site is built on one rule: **nothing is claimed that could not be verified.**

That is not caution for its own sake — it is the positioning. The audience is an Adana business owner deciding whether to trust someone with their brand. A single inflated claim they can disprove costs more than every impressive number would gain.

Concretely, and deliberately:

| Not published | Why |
|---|---|
| Follower counts | Real (~117K on Instagram) but they decay, and there is no live API. See `research/social-presence.md` |
| The "Beauty of Turkey 2024" award | Self-reported on his own Instagram, zero independent corroboration. See `research/awards.md` |
| Any campaign metric — reach, ROAS, sales, conversion | No verifiable client data was supplied, so none is shown |
| Testimonials | None were supplied, so the section does not exist |
| Coverage in Sözcü / MOOD Magazin / Magazin Times / Ajans Cep / Cine5 | Site-scoped searches returned zero results. See `research/media-coverage.md` |
| Birth year, career dates | Single PR source only; the About timeline is thematic, not dated |
| A synthetic portrait | Never generated. The portrait on `/hakkimda` is a real photograph supplied by Kaan |

What *is* published is verified, and `/referanslar` says so out loud rather than leaving the reader to assume it.

---

## What the research actually found

The PR articles circulating about Kaan describe a national and even global operator. The evidence describes something more specific and more credible: an Adana-based practice with a genuinely varied client roster. The site chooses the true version and makes it the argument:

> Understanding what it takes to make a barber, a şalgam producer shipping to 81 provinces, a nightly live-auction seller and a fire-safety contractor findable and credible online is a harder, more specific skill than a follower count.

All eight brands were independently verified — industry, district, channel, public handle. See `research/clients.md`.

---

## Project structure

```
app/                      Routes (App Router)
  layout.tsx              Shell, fonts, global JSON-LD
  page.tsx                Homepage — 9-section scroll narrative
  hakkimda/               About + thematic timeline
  hizmetler/              Service index
  hizmetler/[slug]/       11 service pages (SSG)
  referanslar/            Reference wall
  sss/                    FAQ (drives FAQPage schema)
  iletisim/               5-step project intake
  gizlilik/ kvkk/         Legal
  api/iletisim/           Form handler (validates + emails via Resend)
  sitemap.ts robots.ts not-found.tsx

components/
  three/                  DigitalField (GLSL particles), HeroCanvas, StaticField
  home/                   Hero, MethodSequence, ServicesIndex, FeedSystem,
                          WhySequence, FinalHero
  services/               ServiceMetaphor (11 SVG scenes), VisibilityMap
  portfolio/              BrandLogo
  about/                  PortraitBlock
  contact/                ProjectIntake
  layout/                 Nav, Footer
  ui/                     Reveal, PageHeader, SmoothScroll, MotionFlag

content/                  All copy, separated from components
  site.ts services.ts clients.ts about.ts faq.ts seo.ts

lib/                      jsonld.ts, device-tier.ts

research/                 identity-verification, sources, media-coverage,
                          awards, clients, timeline, social-presence,
                          media.json, visual-assets.json
design/                   brand-direction, motion-system, page-visual-manifest
```

**19 routes, all statically prerendered** except the form endpoint.

> **Removed at the client's request:** the portfolio (`/portfoy` and its eight case studies), the blog (`/blog`) and the press page (`/medya`). The research behind them is preserved in `research/` — `clients.md` still holds the verified per-brand record, and `media-coverage.md` the press verification — so any of them can be rebuilt from source if wanted.

---

## Data architecture

Content is fully separated from components. Every page is a rendering of a typed object in `content/`, which means copy edits never touch JSX, and the provenance rules are enforced in one place.

`Client` in `content/clients.ts` now holds only verified, published fields — name, industry, district, public handle and a sector palette. It carries **no metric of any kind**. The fuller research record, including the per-brand public context the case studies used, stays in `research/clients.md`.

---

## The 3D system

`components/three/MetalWave.tsx` — a single graphite surface carrying the site's whole metaphor:

Height is a sum of sines rather than sampled noise: deterministic, cheap, and analytically differentiable, so exact normals come from four extra evaluations in the vertex shader — no normal map, no lighting rig, no post-processing.

The surface is **ambient, not scroll-reactive**. Its only inputs are time and a slight pointer tilt, so it keeps its full character at every scroll position. There is no scroll listener on the canvas at all, and the hero is a plain `h-screen` section rather than a pinned driver — pinning it would only mean scrolling with nothing happening. The chaos-to-system argument is carried by the pinned method sequence further down the page.

**One WebGL context exists on the entire site.** The closing bookend (`FinalHero`) deliberately re-creates the effect in SVG rather than mounting a second renderer.

### Device tiers (`lib/device-tier.ts`)

| Tier | Mesh detail | DPR | Trigger |
|---|---|---|---|
| high | 220 segments | 1–2 | ≥1280px, ≥8 cores, ≥8GB |
| medium | 150 segments | 1–1.5 | laptop / tablet |
| low | 90 segments | 1 | coarse pointer or <768px |
| fallback | SVG `StaticField` | — | no WebGL, or reduced motion |

Detection is deliberately conservative: a missing signal assumes the weaker device.

---

## Animation system

Five transitions exist site-wide — **SCAN, GRID, DATA MORPH, LINE, MASK** — which is what makes it read as one system. Scroll-linked and deterministic, never physics-driven. Lenis smooth scroll, disabled under reduced motion and on small touch devices where native momentum is better.

### The frame watchdog

Reveals depend on CSS transitions completing. In environments where the document never paints, a transition reports as "running" while its clock never advances, stranding elements at `opacity: 0` — invisible content.

`MotionFlag` requests one frame on mount; if none arrives within 2s it swaps `motion-ok` for `motion-stalled`, killing all transitions so every element snaps to its resolved, readable state. This was found in QA, not theorised — see the QA report.

**The default state of every animated element is visible.** Motion is the enhancement; no-JS and reduced-motion visitors see complete content.

---

## SEO

- Per-page metadata composed through one helper (`content/seo.ts`) so titles and canonicals cannot drift
- Unique title, description, canonical, OG and Twitter tags on all 19 routes
- One `<h1>` per page, verified; correct heading hierarchy, no skipped levels
- `sitemap.xml` and `robots.txt` generated from the content layer
- Turkish locale throughout (`lang="tr"`, `tr_TR`)

### Structured data (`lib/jsonld.ts`)

`Person`, `ProfessionalService`, `WebSite` site-wide; plus `Service`, `FAQPage` and `BreadcrumbList` per route — all emitted as a single `@graph` with cross-referenced `@id`s. Validated as parseable on every page type.

`Person.award` is deliberately absent. Structured data is a machine-readable factual claim, and the award is not verified.

### Local SEO
**Adana** as the single stated location, with `areaServed` covering Adana and Türkiye. No sub-district is used as a positioning label anywhere in the UI.

---

## Performance

- **102 kB First Load JS shared**; the homepage is the only heavier route
- three.js is dynamically imported, `ssr: false`, and never enters the server bundle or any non-homepage route
- 18 of 19 routes prerendered as static HTML
- Zero third-party imagery, zero raster assets, zero web-font files beyond three subsetted variable faces
- All visuals are procedural WebGL, SVG or CSS

---

## Mobile

Mobile is a different composition, not a shrunk desktop: reduced particle counts, a fixed camera, stacked layouts, a full-screen menu with focus trapping, and accordion patterns replacing hover-driven ones. **Verified zero horizontal overflow on every route at 375px.**

---

## Accessibility

Verified programmatically across 8 representative pages, all clean: no unlabelled form controls, no unnamed buttons or links, single `<h1>`, no skipped heading levels, `lang="tr"`, `<main>` landmark, skip link, visible focus rings never removed.

The 5-step intake uses real `<fieldset>`/`<legend>`; the "Why Kaan" sequence is a proper ARIA tablist with arrow-key navigation; the FAQ uses native `<details>` so it works without JS.

**Colour contrast** — all text tokens clear WCAG AA:

| Token | On `--ink` | Use |
|---|---|---|
| `bone` | 17.9:1 | Body |
| `bone-dim` | 5.79:1 | Secondary |
| `graphite` | 5.01:1 | Captions, indices |
| `signal` | 6.03:1 | Accent, CTA |

`--graphite` was corrected from `#4a4a52` (2.28:1, failing) to `#7f7e8b` during QA.

---

## Known gaps

1. **Contact form needs two env vars** — delivery is implemented (Resend, with reply-to set to the lead). Set `CONTACT_TO_EMAIL` and `RESEND_API_KEY` in `.env.local` and it goes live (`OPEN-QUESTIONS.md` F2)
2. **No phone/email published** — awaiting confirmation (B1, B2)
3. ~~No portrait~~ — resolved; a supplied photograph is live on `/hakkimda`
7. **No client logo files** — the reference wall shows designed monogram lockups until authorised logos are added to `public/logos/` (see that folder's README)
4. **No analytics** — GA4 + Search Console recommended
5. **KVKK text should be reviewed by a lawyer** before launch
