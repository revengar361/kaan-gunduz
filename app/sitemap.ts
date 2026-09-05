import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SERVICE_PAGES } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/hizmetler", priority: 0.9, freq: "monthly" },
    { path: "/referanslar", priority: 0.9, freq: "monthly" },
    { path: "/hakkimda", priority: 0.8, freq: "monthly" },
    { path: "/iletisim", priority: 0.8, freq: "monthly" },
    { path: "/sss", priority: 0.7, freq: "monthly" },
    { path: "/gizlilik", priority: 0.2, freq: "yearly" },
    { path: "/kvkk", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...SERVICE_PAGES.map((s) => ({
      url: `${SITE.url}/hizmetler/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
