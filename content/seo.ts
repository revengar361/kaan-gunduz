import type { Metadata } from "next";
import { SITE } from "./site";

export const KEYWORDS = {
  primary: "Sosyal Medya Uzmanı",
  secondary: [
    "Dijital Strateji Uzmanı",
    "Dijital Pazarlama Uzmanı",
    "Sosyal Medya Danışmanı",
    "Instagram Danışmanlığı",
    "Web Tasarım",
    "Kurumsal Web Sitesi",
    "Google İşletme Profili",
    "Google Haritalar Konum Ekleme",
    "Meta Reklam Yönetimi",
    "Reels Video Çekimi",
    "Adana Sosyal Medya Uzmanı",
    "Dijital Marka Danışmanı",
  ],
};

export const ALL_KEYWORDS = [KEYWORDS.primary, ...KEYWORDS.secondary];

type MetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Single source of truth for page metadata. Titles are composed here so the
 * brand suffix and canonical rules can never drift between pages.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  publishedTime,
}: MetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...ALL_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: `${SITE.name} — ${SITE.title}`,
      locale: "tr_TR",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
