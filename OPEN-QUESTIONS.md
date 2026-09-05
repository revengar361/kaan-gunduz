# Open Questions for Kaan — items blocking full publication

Everything on the site right now is either verified or clearly labelled as conceptual. The items below would let us replace conceptual material with real material. **None of them blocks launch.**

## A. Credentials
- **A1 — The award.** "Beauty Of Turkey 2024 / Yılın En İyi Sosyal Medya Uzmanı" is currently self-reported only. Send the organiser's announcement URL, a photo of the trophy or certificate, or press coverage naming you as recipient, and we will add a verified credential block. *Until then it appears nowhere on the site.*
- **A2 — Birth year / education.** A PR article states 2004. Not published. Confirm if you want biographical dates on /hakkimda.

## B. Contact details — HIGHEST PRIORITY
- **B1 — Phone.** A scraped directory lists +90 501 318 03 03 under "Kaan Gündüz Medya, Orhan Ekinci Blv. No:88". **We did not publish this.** Directory data is unreliable, and a wrong number on a lead-generation site is worse than no number. Confirm the correct business phone and WhatsApp number.
- **B2 — Email.** No public business email was found. The contact form currently posts to a validating placeholder handler. Provide the destination address.
- **B3 — Business address.** Confirm whether you want a public street address (it materially helps LocalBusiness SEO) or district-only.

## C. References

*(The portfolio, blog and press pages were removed at your request. C1, C3 and C4 below are parked — they only matter if you ever want case studies back.)*
- **C1 — Deliverables per client.** For each of the 8 brands, confirm which services you actually performed (social management / content / reels / ads / logo / website / Google profile). Right now each case study describes an approach, visibly labelled as illustrative. With your confirmation these become factual deliverable lists.
- **C2 — Client logos.** The reference wall is now a logo wall. Drop authorised logo files into `public/logos/` (named by client slug) and add the path to that client in `content/clients.ts` — full instructions in `public/logos/README.md`. Until then each brand shows a designed monogram lockup. No logo was scraped, because republishing a business mark is that business's call. Also confirm each brand consents to being named.
- **C3 — Real assets.** Any authorised screenshots, campaign visuals, before/after feeds or video stills will replace the procedural covers.
- **C4 — Real metrics.** If you have verifiable numbers (Meta Ads Manager exports, Instagram Insights, Google Business Profile views), send them and we will publish them as measured, naming the source and the period. Nothing invented has been used.

## D. Media — page removed

The press page was removed at your request, so nothing here is blocking. Recorded for the file: no coverage could be found on Sözcü Dijital, Haber Birgün, MOOD Magazin, Magazin Times, Ajans Cep, Cine5 Magazin or Türkiye'nin Sesi. Full detail in `research/media-coverage.md` if you ever want the page back.

## E. Imagery
- **E1 — Portrait.** ✅ Resolved. You supplied `IMG_9792.heic`; it was converted, cropped to the block's 4:5 ratio and is now live on /hakkimda at `public/portrait/kaan-gunduz.jpg`. Send a different frame any time and it swaps in — the component takes a `src` prop.
- **E2 — Logo.** No wordmark exists; the site uses a typographic lockup.

## F. Technical
- **F1 — Domain.** NEXT_PUBLIC_SITE_URL in .env is a placeholder. Set the real domain before launch; sitemap, canonicals and JSON-LD all read from it.
- **F2 — Form delivery.** ⚠️ The code is done — /api/iletisim now sends a formatted Turkish email via Resend, with reply-to set to the lead so you can just hit Reply. It needs two values from you in .env.local: **CONTACT_TO_EMAIL** (where leads land) and **RESEND_API_KEY** (free at resend.com). Until both are set, production returns 503 and tells the visitor to use Instagram — it never claims a message was delivered when it was not. Setup steps are in .env.example.
- **F3 — Analytics.** None installed. Recommend GA4 plus Google Search Console.
