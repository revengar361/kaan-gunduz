# Brand Direction — Kaan Gündüz

## The strategic problem

Research produced a specific, and slightly awkward, truth: **Kaan is an Adana-based operator with a large personal audience and a genuinely varied client roster.** The PR articles around him claim national and global stature that nothing in the evidence supports.

The site resolves it by choosing the true one, and making it the strength:

> He is not a national thought leader. He is the person who understands what it takes to make a barber, a şalgam producer shipping nationwide and a fire-safety contractor findable and credible online — and that is a harder, more specific skill than a follower count.

Every design decision follows from that.

## Positioning statement
**Sosyal Medya ve Dijital Strateji Uzmanı** — a strategic partner who designs how a business looks, speaks and grows in digital, not an account operator who posts.

Slogan: **"Markanızı Dijitalde Büyütüyorum."**

## Colour system

Graphite and off-white, with exactly one accent.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#080809` | Page ground. Near-black, faintly cool. |
| `--ink-raised` | `#101013` | Raised surfaces |
| `--ink-line` | `#1e1e23` | Hairlines, borders |
| `--graphite` | `#7f7e8b` | Muted text (captions, indices) — AA-compliant |
| `--bone` | `#f4f2ee` | Primary text. Warm off-white — *never* pure #fff. |
| `--bone-dim` | `#8b8a86` | Secondary text |
| `--signal` | `#ff4d1c` | **The one accent.** |
| `--signal-deep` | `#c23410` | Accent shadow/gradient end |

**Why `#ff4d1c` (a hot ember orange):**
- It is the colour of Adana. Kebap fire, biber, the region's heat. It reads as *place*, not as tech.
- It deliberately avoids the two clichés the brief banned: purple SaaS gradients and cyan cyberpunk neon.
- It carries the "signal in noise" metaphor — one hot point in a graphite field.
- It has enough chroma to survive as a single accent on a near-black ground while passing contrast on `--ink`.

Accent discipline: `--signal` is used for **one thing per viewport** — the active state, the CTA, the single node that matters. The moment it appears twice with equal weight, it stops meaning anything.

## Typography

- **Display / headline:** Manrope (variable, 200–800). Geometric, tight apertures, excellent at very large sizes.
- **Body:** Inter (variable). Neutral, high legibility at small Turkish text with diacritics.
- **Data / numerals:** JetBrains Mono. Used for indices (01, 02…), labels, coordinates, technical captions.

Both loaded via `next/font` with `display: swap`, Latin + Latin-Extended subsets (**Latin-Extended is required** for ı, İ, ş, ğ, ç, ö, ü).

Scale: fluid `clamp()` throughout. Headlines run to `clamp(3rem, 11vw, 11rem)`. Tracking tightens as size increases (`-0.045em` at display sizes).

## The visual metaphor — CHAOS → SYSTEM → GROWTH

The whole site is one continuous idea:

1. **Chaos.** Particles scattered without order. A business's digital presence before strategy: posting, but not found.
2. **Strategy.** Particles begin to align to an invisible structure.
3. **System.** They lock into a grid — feed, ads, website, Google profile as one mechanism.
4. **Visibility.** The structure lights; a signal emerges from the field.
5. **Growth.** The structure expands outward, still ordered.

The pinned method sequence on the homepage performs this literally, stage by stage. The hero above it is deliberately not part of that argument: it is an ambient graphite swell that simply lives, setting tone rather than explaining. The closing section echoes the same surface, then hands off from the name to the slogan.

## Anti-patterns (explicitly excluded)
- ❌ Stock businessmen, handshakes, rising-arrow graphics
- ❌ Floating AI brains, glowing neural networks
- ❌ Purple/blue SaaS gradients
- ❌ Cyberpunk neon, glitch text, Matrix rain
- ❌ Generic marketing icon sets (megaphone, rocket, target)
- ❌ Fake dashboards implying real client data
- ❌ Testimonial carousels with invented quotes

## Tone of voice
Direct, confident, unembellished. Short declaratives. Turkish throughout. Explains rather than boasts. **Never** uses a superlative it cannot prove.

Example of the voice:
> "Sosyal medyada sadece paylaşım yapmıyoruz."
> "Dijitalde görünür olmak yetmez. Doğru görünmek gerekir."
> "İnsanların sizi aradığı yerde görünür olun."
