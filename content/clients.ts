/**
 * Client roster — used by /referanslar and the homepage reference band.
 *
 * PROVENANCE: `industry`, `district`, `handle` and `website` are VERIFIED from
 * public sources (Google Business panels, public social profiles, the client's
 * own website). See research/clients.md, which keeps the full research record
 * including the per-brand public context that the removed case studies used.
 *
 * No metric of any kind is stored or published here. Nothing was invented.
 */

export type Client = {
  slug: string;
  index: string;
  name: string;
  industry: string;
  district: string;
  handle?: string;
  handleUrl?: string;
  website?: string;
  /**
   * Path to an authorised logo file under /public/logos/.
   * Set this and the reference wall switches from the name-as-mark treatment to
   * the real logo automatically. See public/logos/README.md.
   */
  logo?: string;
  /** Brand world palette — derived from sector, not scraped from the brand. */
  palette: { base: string; accent: string; glow: string };
};

export const CLIENTS: Client[] = [
  {
    slug: "master-hair-studio",
    index: "01",
    name: "Master Hair Studio",
    industry: "Erkek Kuaförü ve Berber",
    district: "Adana",
    handle: "@master.hairstudio",
    handleUrl: "https://www.instagram.com/master.hairstudio/",
    palette: { base: "#14100e", accent: "#d4af37", glow: "#5b4a2a" },
  },
  {
    slug: "oasis-coffees",
    index: "02",
    name: "Oasis Coffees",
    industry: "Kahve Dükkanı ve Kafe",
    district: "Adana",
    palette: { base: "#160f0a", accent: "#e08a4a", glow: "#6b3f1d" },
  },
  {
    slug: "alo-balik",
    index: "03",
    name: "Alo Balık",
    industry: "Balık Restoranı",
    district: "Adana",
    palette: { base: "#08131a", accent: "#4fb8dd", glow: "#1c5570" },
  },
  {
    slug: "mustafa-kebap-steakhouse",
    index: "04",
    name: "Mustafa Kebap Steakhouse",
    industry: "Kebap Restoranı ve Steakhouse",
    district: "Adana",
    handle: "@mustafakebapsteakhouse",
    handleUrl: "https://www.instagram.com/mustafakebapsteakhouse/",
    palette: { base: "#170a06", accent: "#ff6a3d", glow: "#8c2408" },
  },
  {
    slug: "efe-salgamlari",
    index: "05",
    name: "Efe Şalgamları",
    industry: "Şalgam Üretimi ve Satışı",
    district: "Adana",
    handle: "@efesalgam",
    handleUrl: "https://www.instagram.com/efesalgam/",
    palette: { base: "#1a060c", accent: "#e8447a", glow: "#6b0f27" },
  },
  {
    slug: "kaleonu-pastirma",
    index: "06",
    name: "Kaleönü Pastırma",
    industry: "Pastırma, Sucuk ve Kavurma",
    district: "Türkiye geneli gönderim",
    handle: "@kaleonupastirma_38",
    handleUrl: "https://www.tiktok.com/@kaleonupastirma_38",
    palette: { base: "#160a08", accent: "#e0674a", glow: "#5e2415" },
  },
  {
    slug: "mezatci-ramo",
    index: "07",
    name: "Mezatçı Ramo",
    industry: "Canlı Mezat — Koleksiyon Tesbih",
    district: "Türkiye geneli gönderim",
    handle: "@mezatcirramo",
    handleUrl: "https://www.instagram.com/mezatcirramo/",
    palette: { base: "#120c04", accent: "#e0b45c", glow: "#6d4d15" },
  },
  {
    slug: "sis-yangin",
    index: "08",
    name: "Sis Yangın",
    industry: "Yangın Söndürme ve Güvenlik Sistemleri",
    district: "Adana",
    website: "https://www.sisyangin.com.tr/",
    palette: { base: "#0d0f11", accent: "#f2564b", glow: "#5c1512" },
  },
];

/** The honest strategic read of the roster — used on / and /referanslar. */
export const ROSTER_INSIGHT = {
  headline: "Sekiz marka, dört farklı dijital problem.",
  body: "Aynı listede masaya oturulan bir restoran da var, Türkiye geneline kargo gönderen bir üretici de, her akşam 22:00'de canlı yayın yapan bir mezatçı da, yangın sistemleri kuran bir mühendislik firması da. Dördü de dijitalde bambaşka şeylere ihtiyaç duyar; hiçbirine aynı içerik takvimi uygulanamaz. Yaptığım iş, her işletmenin müşterisinin nerede olduğunu bulup orada doğru görünmesini sağlamak.",
};
