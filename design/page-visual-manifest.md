# Page Visual Manifest

Every section on the site, its visual, its source, and how it degrades. **Zero third-party imagery is used anywhere.** All visuals are original procedural WebGL, SVG or CSS.

| PAGE | SECTION | VISUAL | SOURCE | 3D | VIDEO | ANIMATION | MOBILE FALLBACK |
|---|---|---|---|---|---|---|---|
| / | 01 Metal swell | Graphite wave surface with ember rim light, always at full character | Original R3F + GLSL | yes | no | Ambient time evolution + pointer tilt; no scroll coupling | 90 segments; SVG ridges under reduced motion |
| / | 02 Positioning | Large type + hairline grid | CSS/SVG | no | no | MASK + SCAN | Same, no parallax |
| / | 03 How he thinks | 5-step chaos to growth sequence | SVG + CSS | no | no | LINE draw, pinned | Vertical stack |
| / | 04 Services | 15-service index, hover metaphor preview | SVG | no | no | GRID + micro | Accordion list |
| / | 05 Social grid build | Abstract feed grid assembling | CSS 3D | no | no | GRID stagger | 2-col grid, fade |
| / | 06 Reference band | Brand names set in their sector colour | Type/CSS | no | no | Stagger reveal | Single column |
| / | 07 Why Kaan | 5-step interactive sequence (tablist) | CSS | no | no | Tab + underline | Stacked |
| / | 08 Visibility | Map-inspired node graph, Adana | SVG | no | no | LINE + pulse | Static SVG |
| / | 09 Final hero | Layered SVG ridges settle from turbulent to calm, then name hands off to slogan | SVG, echoing the hero | no | no | Cross-fade + type | Static resolved state |
| /hakkimda | Portrait block | Client-supplied photograph, 4:5 crop, name lockup over scrim | Client asset via next/image | no | no | MASK | Same |
| /hakkimda | Timeline | 5 thematic phases, no dates | SVG | no | no | LINE draw | Vertical, fade |
| /hizmetler | Index | 15 services with per-service metaphor | SVG | no | no | GRID | List |
| /hizmetler/[slug] | Hero metaphor | One bespoke SVG scene per service | Original SVG | no | no | Per-service | Static frame |
| /referanslar | Reference wall | Brand name as mark in sector colour, or real logo file when supplied | Type/CSS or client logo | no | no | GRID + palette bloom on hover | 1-2 col grid |
| /sss | FAQ | Accordion, 12 questions | CSS | no | no | Height + micro | Same |
| /iletisim | 5-step intake | Progressive form, step indicator | CSS/SVG | no | no | SCAN between steps | Full-width |
| all | Footer | Large CTA | CSS | no | no | MASK | Static |

## Higgsfield / generative media

**Not used.** Every visual need was met by procedural WebGL, SVG or CSS. Generated cinematic backgrounds were considered and rejected: they would add megabytes of raster video for atmosphere that shaders produce at a fraction of the weight, and they carry provenance ambiguity on a site whose entire credibility argument is provenance discipline.

## Portrait policy

Per brief sections 50 and 75: **no synthetic portrait of Kaan was ever generated.** The About page now shows an authentic photograph supplied by Kaan, converted from HEIC and cropped to the block's 4:5 ratio. PortraitBlock still keeps its typographic fallback for when no `src` is passed.

## Client logo policy

No client logo file was scraped. Until authorised files are supplied, each brand's **name is the mark** — set in the site's display face in that brand's own sector colour. All eight colours were contrast-checked against the page ground and clear WCAG AA at 5.28:1 or better. Drop a file into `public/logos/` and `BrandLogo` switches to it automatically.
