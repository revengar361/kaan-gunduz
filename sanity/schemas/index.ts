import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Content model.
 *
 * Field titles are Turkish because the person using the Studio is the site's
 * owner, not a developer. Shapes mirror the TypeScript types in `content/` one
 * to one, so migration is a straight copy and the fallback layer can swap
 * between the two sources without any transformation.
 */

/* ------------------------------------------------------------------ */
/* Site settings (singleton)                                           */
/* ------------------------------------------------------------------ */

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ad", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Unvan", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slogan", title: "Slogan", type: "string" }),
    defineField({
      name: "subline",
      title: "Slogan altı açıklama",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "locationLabel", title: "Konum etiketi", type: "string" }),
    defineField({
      name: "instagram",
      title: "Instagram adresi",
      type: "url",
    }),
    defineField({ name: "instagramHandle", title: "Instagram kullanıcı adı", type: "string" }),
    defineField({ name: "facebook", title: "Facebook adresi", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn adresi", type: "url" }),
    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
      description: "Boş bırakılırsa sitede gösterilmez.",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      description: "Boş bırakılırsa sitede gösterilmez.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Ayarları" }) },
});

/* ------------------------------------------------------------------ */
/* About (singleton)                                                   */
/* ------------------------------------------------------------------ */

const about = defineType({
  name: "about",
  title: "Hakkımda",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Başlık", type: "text", rows: 2 }),
    defineField({
      name: "intro",
      title: "Giriş paragrafları",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "positioningTitle",
      title: "Konumlandırma başlığı",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "positioningBody",
      title: "Konumlandırma paragrafları",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "portrait",
      title: "Portre fotoğrafı",
      type: "image",
      options: { hotspot: true },
      description: "Yüklerseniz Hakkımda sayfasındaki fotoğrafın yerini alır.",
    }),
    defineField({
      name: "timeline",
      title: "Yol (aşamalar)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Aşama adı", type: "string" }),
            defineField({ name: "body", title: "Açıklama", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Hakkımda" }) },
});

/* ------------------------------------------------------------------ */
/* Service                                                             */
/* ------------------------------------------------------------------ */

const service = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({
      name: "index",
      title: "Sıra numarası",
      type: "string",
      description: "01, 02, 03 ... Sitede bu sıraya göre listelenir.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Hizmet adı", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Adres (slug)",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      description: "Boş bırakılırsa hizmet kendi sayfası olmadan sadece listede görünür.",
    }),
    defineField({ name: "short", title: "Kısa açıklama", type: "text", rows: 2 }),
    defineField({
      name: "metaphor",
      title: "Görsel anlatım",
      type: "string",
      options: {
        list: [
          { title: "Izgara (sosyal medya)", value: "grid" },
          { title: "Dikey akış (Instagram)", value: "feed" },
          { title: "Kimlik sistemi", value: "identity" },
          { title: "Kamera (içerik)", value: "camera" },
          { title: "Zaman çizelgesi (Reels)", value: "timeline" },
          { title: "Huni (reklam)", value: "funnel" },
          { title: "Tel kafes (web)", value: "wireframe" },
          { title: "Harita (Google)", value: "map" },
          { title: "Vektör (logo)", value: "vector" },
          { title: "Sistem (danışmanlık)", value: "system" },
          { title: "Pazar haritası (konumlandırma)", value: "landscape" },
        ],
      },
    }),
    defineField({ name: "lead", title: "Vurgu cümlesi", type: "text", rows: 2 }),
    defineField({
      name: "body",
      title: "Açıklama paragrafları",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "process",
      title: "Süreç adımları",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "step", title: "Adım no", type: "string" }),
            defineField({ name: "title", title: "Adım adı", type: "string" }),
            defineField({ name: "body", title: "Açıklama", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "deliverables",
      title: "Teslim edilenler",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "parent",
      title: "Bağlı olduğu hizmet",
      type: "string",
      description: "Kendi sayfası olmayan hizmetler için, hangi hizmet sayfasına yönlendirileceği.",
    }),
    defineField({ name: "seoTitle", title: "SEO başlığı", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO açıklaması", type: "text", rows: 3 }),
    defineField({
      name: "seoKeywords",
      title: "SEO anahtar kelimeleri",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    { title: "Sıra numarası", name: "indexAsc", by: [{ field: "index", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "short", index: "index" } },
});

/* ------------------------------------------------------------------ */
/* Client / reference                                                  */
/* ------------------------------------------------------------------ */

const client = defineType({
  name: "client",
  title: "Referans",
  type: "document",
  fields: [
    defineField({
      name: "index",
      title: "Sıra numarası",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", title: "Marka adı", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Kısa ad (slug)", type: "slug", options: { source: "name" } }),
    defineField({ name: "industry", title: "Sektör", type: "string" }),
    defineField({ name: "district", title: "Konum", type: "string" }),
    defineField({ name: "handle", title: "Sosyal medya kullanıcı adı", type: "string" }),
    defineField({ name: "handleUrl", title: "Sosyal medya adresi", type: "url" }),
    defineField({ name: "website", title: "Web sitesi", type: "url" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Yüklerseniz referans duvarında marka adı yerine logo gösterilir. Koyu zeminde görüneceği için açık renkli sürümü tercih edin.",
    }),
    defineField({
      name: "accent",
      title: "Marka rengi",
      type: "string",
      description:
        "Örn. #d4af37. Marka adı bu renkte yazılır. Koyu zeminde okunabilir olması için açık tonlar seçin.",
      validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/, { name: "hex renk" }),
    }),
    defineField({ name: "glow", title: "Arka plan parlaması", type: "string" }),
    defineField({ name: "base", title: "Koyu zemin rengi", type: "string" }),
  ],
  orderings: [
    { title: "Sıra numarası", name: "indexAsc", by: [{ field: "index", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "industry", media: "logo" } },
});

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faq = defineType({
  name: "faq",
  title: "Sıkça Sorulan Soru",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Sıra", type: "number", validation: (r) => r.required() }),
    defineField({ name: "question", title: "Soru", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Cevap", type: "text", rows: 6, validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "answer" } },
});

/* ------------------------------------------------------------------ */
/* Lead — form submissions                                             */
/* ------------------------------------------------------------------ */

const lead = defineType({
  name: "lead",
  title: "Gelen Talep",
  type: "document",
  // Written by the contact API, never created by hand in the Studio.
  fields: [
    defineField({
      name: "status",
      title: "Durum",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "Yeni", value: "new" },
          { title: "Okundu", value: "read" },
          { title: "Cevaplandı", value: "replied" },
          { title: "Kazanıldı", value: "won" },
          { title: "Kapandı", value: "closed" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "brand", title: "Marka", type: "string", readOnly: true }),
    defineField({ name: "sector", title: "Sektör", type: "string", readOnly: true }),
    defineField({
      name: "services",
      title: "İstenen hizmetler",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      readOnly: true,
    }),
    defineField({ name: "goal", title: "Hedef", type: "string", readOnly: true }),
    defineField({ name: "detail", title: "Mesaj", type: "text", rows: 5, readOnly: true }),
    defineField({ name: "name", title: "Ad soyad", type: "string", readOnly: true }),
    defineField({ name: "email", title: "E-posta", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Telefon", type: "string", readOnly: true }),
    defineField({ name: "receivedAt", title: "Geliş zamanı", type: "datetime", readOnly: true }),
    defineField({
      name: "notes",
      title: "Notlarım",
      type: "text",
      rows: 4,
      description: "Sadece siz görürsünüz. Görüşme notları, teklif tutarı vb.",
    }),
  ],
  orderings: [
    { title: "En yeni", name: "newest", by: [{ field: "receivedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "brand", name: "name", status: "status", receivedAt: "receivedAt" },
    prepare({ title, name, status, receivedAt }) {
      const labels: Record<string, string> = {
        new: "🔵 Yeni",
        read: "Okundu",
        replied: "Cevaplandı",
        won: "✅ Kazanıldı",
        closed: "Kapandı",
      };
      const date = receivedAt ? new Date(receivedAt).toLocaleDateString("tr-TR") : "";
      return {
        title: title || name || "Talep",
        subtitle: [labels[status] ?? status, name, date].filter(Boolean).join(" · "),
      };
    },
  },
});

export const schemaTypes = [siteSettings, about, service, client, faq, lead];
