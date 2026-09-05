# Social Presence

**Research date:** 4 September 2026

| Platform | Handle | Status | Published on site |
|---|---|---|---|
| Instagram | [@kaangunduzofc](https://www.instagram.com/kaangunduzofc/) | Primary channel | ✅ Linked as primary CTA |
| Facebook | @kaanggunduz | Secondary | ✅ Linked |
| LinkedIn | /in/kaangunduz | Professional | ✅ Linked |
| TikTok | Not confirmed for him personally | — | ❌ Not linked |
| X / Twitter | Not found | — | ❌ Not linked |
| YouTube | Not found | — | ❌ Not linked |

## Metrics policy — deliberate and non-negotiable

Google's index reported **~117.4K Instagram followers** (Sept 2026) and ~2.3K on Facebook.

**These numbers are not rendered anywhere on the website.** Reasons:

1. **They decay.** A hardcoded "117K" is wrong the week after launch and reads as stale or dishonest.
2. **No live API.** Instagram's Basic Display API is deprecated; the Graph API requires a Business account, an app review and a long-lived token. Presenting a static number as live would be a lie by implication (brief §35).
3. **They are not the argument.** For an Adana business owner deciding whether to hire him, "does he understand my kind of business" beats "how many followers does he have".

**Implementation:** the site says *"Instagram'da takip edin"* and links out. If Kaan later provisions Graph API credentials, `content/social.ts` has a documented slot for a genuinely live count — and only then.

## Content signals observed
- Bilingual-adjacent local Turkish, informal and direct.
- Heavy short-form video orientation (Reels), consistent with the service list.
- Community/civic content (school seminars) alongside commercial work.
