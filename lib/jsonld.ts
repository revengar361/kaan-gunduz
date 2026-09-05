import { SITE } from "@/content/site";
import { SERVICE_PAGES } from "@/content/services";
import { FAQ } from "@/content/faq";

const ID = {
  person: `${SITE.url}/#person`,
  business: `${SITE.url}/#business`,
  website: `${SITE.url}/#website`,
};

/**
 * Person schema.
 *
 * NOTE: `award` is deliberately absent. The only award associated with the
 * subject is self-reported and unverified — see research/awards.md. Structured
 * data is a machine-readable factual claim and must not carry it.
 */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": ID.person,
    name: SITE.name,
    jobTitle: SITE.title,
    url: SITE.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.linkedin],
    knowsAbout: [
      "Sosyal Medya Yönetimi",
      "Dijital Pazarlama",
      "Marka Stratejisi",
      "Instagram Danışmanlığı",
      "Meta Reklam Yönetimi",
      "Google İşletme Profili",
      "Kurumsal Web Sitesi Tasarımı",
      "İçerik Üretimi",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": ID.business,
    name: `${SITE.name} — ${SITE.title}`,
    description: SITE.subline,
    url: SITE.url,
    founder: { "@id": ID.person },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dijital Hizmetler",
      itemListElement: SERVICE_PAGES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
          url: `${SITE.url}/hizmetler/${s.slug}`,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: SITE.url,
    name: `${SITE.name} — ${SITE.title}`,
    inLanguage: "tr-TR",
    publisher: { "@id": ID.person },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(service: {
  title: string;
  short: string;
  slug: string;
}) {
  return {
    "@type": "Service",
    name: service.title,
    description: service.short,
    url: `${SITE.url}/hizmetler/${service.slug}`,
    provider: { "@id": ID.person },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
    serviceType: service.title,
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/** Wraps any set of schema nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
