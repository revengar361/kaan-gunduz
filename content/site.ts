export const SITE = {
  name: "Kaan Gündüz",
  title: "Sosyal Medya ve Dijital Strateji Uzmanı",
  slogan: "Markanızı Dijitalde Büyütüyorum.",
  subline:
    "Profesyonel sosyal medya yönetimi, dijital strateji, web tasarımı ve reklam çözümleriyle işletmenizi bir adım öne taşıyorum.",
  city: "Adana",
  region: "Adana / Türkiye",
  country: "TR",
  // Geo for LocalBusiness schema — Adana city centre.
  geo: { lat: 37.0, lng: 35.3213 },
  /** Schema-level service area. Not rendered as a location label. */
  areaServed: ["Adana", "Türkiye"],
  /** The single location string shown anywhere in the UI. */
  locationLabel: "Adana / Türkiye",
  social: {
    instagram: "https://www.instagram.com/kaangunduzofc/",
    instagramHandle: "@kaangunduzofc",
    facebook: "https://www.facebook.com/kaanggunduz",
    linkedin: "https://tr.linkedin.com/in/kaangunduz",
  },
  // OPEN-QUESTIONS.md B1/B2 — not published until the client confirms.
  // Typed as plain strings (not literals) so filling these in later does not
  // change any consuming component's types.
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
  } as { email: string; phone: string; whatsapp: string },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kaangunduz.com",
} as const;

export const NAV = [
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const CTA = {
  primary: { label: "Projeni Konuşalım", href: "/iletisim" },
  secondary: { label: "Referanslarımı İncele", href: "/referanslar" },
  services: { label: "Hizmetleri Keşfet", href: "/hizmetler" },
  instagram: { label: "Instagram'da Takip Et", href: SITE.social.instagram },
} as const;

/**
 * Why-Kaan positioning, supplied by the client (brief section 28).
 * Rendered as an interactive sequence, not as bullet cards.
 */
export const DIFFERENTIATORS = [
  {
    key: "STRATEJI",
    step: "Strateji",
    title: "İşletmeye özel strateji oluştururum.",
    body: "Hazır şablon yok. Bir kuaför salonuyla bir şalgam üreticisinin dijitalde çözmesi gereken problem aynı değil. Önce işletmeyi, müşterisini ve rekabetini anlarım.",
  },
  {
    key: "TASARIM",
    step: "Tasarım",
    title: "Modern ve profesyonel tasarımlar sunarım.",
    body: "Görsel dil bir süs değil, güven işaretidir. İnsanlar bir işletmeye ilk olarak görünüşünden güvenir; tasarım bu güvenin ilk adımıdır.",
  },
  {
    key: "BILINIRLIK",
    step: "Görünürlük",
    title: "Marka bilinirliğini artırmaya odaklanırım.",
    body: "Paylaşım yapmak görünür olmak değildir. İnsanların sizi aradığı yerde, aradıkları anda karşılarına çıkmanız gerekir.",
  },
  {
    key: "SONUC",
    step: "Büyüme",
    title: "Sonuç odaklı dijital pazarlama çalışmaları yürütürüm.",
    body: "Beğeni bir hedef değil, bir göstergedir. Asıl hedef; daha fazla müşteri, daha fazla rezervasyon, daha fazla arama.",
  },
  {
    key: "DESTEK",
    step: "Destek",
    title: "Süreç boyunca düzenli iletişim ve destek sağlarım.",
    body: "Proje teslim edilip bitmiyor. Dijital sürekli değişiyor; markanın da onunla birlikte hareket etmesi gerekiyor.",
  },
] as const;
