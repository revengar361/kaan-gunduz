import { sanityFetch } from "@/sanity/client";
import { SERVICES as FALLBACK_SERVICES, type Service } from "@/content/services";
import { CLIENTS as FALLBACK_CLIENTS, type Client } from "@/content/clients";
import { FAQ as FALLBACK_FAQ, type Faq } from "@/content/faq";
import { ABOUT as FALLBACK_ABOUT } from "@/content/about";
import { SITE } from "@/content/site";

/**
 * The single content boundary.
 *
 * Every page reads through these functions rather than importing `content/*`
 * directly. When Sanity is configured they return CMS data; otherwise, or if a
 * query fails, they return the TypeScript content the site shipped with.
 *
 * That is what makes the CMS optional: the site behaves identically with or
 * without it, and can never be taken down by the CMS being unreachable.
 */

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

type SanityService = {
  index: string;
  title: string;
  slug?: { current?: string } | null;
  short?: string;
  metaphor?: string;
  lead?: string;
  body?: string[];
  process?: { step: string; title: string; body: string }[];
  deliverables?: string[];
  parent?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

const SERVICES_QUERY = `*[_type == "service"] | order(index asc){
  index, title, slug, short, metaphor, lead, body, process, deliverables, parent,
  seoTitle, seoDescription, seoKeywords
}`;

export async function getServices(): Promise<Service[]> {
  const docs = await sanityFetch<SanityService[]>(SERVICES_QUERY, []);
  if (docs.length === 0) return FALLBACK_SERVICES;

  return docs.map((d) => ({
    index: d.index,
    slug: d.slug?.current ?? null,
    title: d.title,
    short: d.short ?? "",
    metaphor: (d.metaphor ?? "grid") as Service["metaphor"],
    lead: d.lead,
    body: d.body,
    process: d.process,
    deliverables: d.deliverables,
    parent: d.parent,
    seo:
      d.seoTitle || d.seoDescription
        ? {
            title: d.seoTitle ?? d.title,
            description: d.seoDescription ?? d.short ?? "",
            keywords: d.seoKeywords ?? [],
          }
        : undefined,
  }));
}

export async function getServicePages(): Promise<(Service & { slug: string })[]> {
  const all = await getServices();
  return all.filter((s): s is Service & { slug: string } => typeof s.slug === "string");
}

export async function getService(slug: string): Promise<Service | undefined> {
  const pages = await getServicePages();
  return pages.find((s) => s.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Clients / references                                                */
/* ------------------------------------------------------------------ */

type SanityClientDoc = {
  index: string;
  name: string;
  slug?: { current?: string } | null;
  industry?: string;
  district?: string;
  handle?: string;
  handleUrl?: string;
  website?: string;
  logoUrl?: string | null;
  accent?: string;
  glow?: string;
  base?: string;
};

const CLIENTS_QUERY = `*[_type == "client"] | order(index asc){
  index, name, slug, industry, district, handle, handleUrl, website,
  accent, glow, base,
  "logoUrl": logo.asset->url
}`;

export async function getClients(): Promise<Client[]> {
  const docs = await sanityFetch<SanityClientDoc[]>(CLIENTS_QUERY, []);
  if (docs.length === 0) return FALLBACK_CLIENTS;

  return docs.map((d) => ({
    slug: d.slug?.current ?? d.name.toLowerCase().replace(/\s+/g, "-"),
    index: d.index,
    name: d.name,
    industry: d.industry ?? "",
    district: d.district ?? "",
    handle: d.handle,
    handleUrl: d.handleUrl,
    website: d.website,
    logo: d.logoUrl ?? undefined,
    palette: {
      base: d.base ?? "#0b0b0e",
      accent: d.accent ?? "#f4f2ee",
      glow: d.glow ?? "#2b2b34",
    },
  }));
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const FAQ_QUERY = `*[_type == "faq"] | order(order asc){ question, answer }`;

export async function getFaq(): Promise<Faq[]> {
  const docs = await sanityFetch<{ question: string; answer: string }[]>(FAQ_QUERY, []);
  if (docs.length === 0) return FALLBACK_FAQ;
  return docs.map((d) => ({ q: d.question, a: d.answer }));
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export type AboutContent = typeof FALLBACK_ABOUT & { portraitUrl?: string };

type SanityAbout = {
  headline?: string;
  intro?: string[];
  positioningTitle?: string;
  positioningBody?: string[];
  timeline?: { title: string; body: string }[];
  portraitUrl?: string | null;
};

const ABOUT_QUERY = `*[_type == "about"][0]{
  headline, intro, positioningTitle, positioningBody, timeline,
  "portraitUrl": portrait.asset->url
}`;

export async function getAbout(): Promise<AboutContent> {
  const doc = await sanityFetch<SanityAbout | null>(ABOUT_QUERY, null);
  if (!doc) return FALLBACK_ABOUT;

  return {
    eyebrow: FALLBACK_ABOUT.eyebrow,
    headline: doc.headline ?? FALLBACK_ABOUT.headline,
    intro: doc.intro?.length ? doc.intro : FALLBACK_ABOUT.intro,
    positioning: {
      title: doc.positioningTitle ?? FALLBACK_ABOUT.positioning.title,
      body: doc.positioningBody?.length
        ? doc.positioningBody
        : FALLBACK_ABOUT.positioning.body,
    },
    timeline: doc.timeline?.length
      ? doc.timeline.map((t, i) => ({ key: `phase-${i}`, title: t.title, body: t.body }))
      : FALLBACK_ABOUT.timeline,
    portraitUrl: doc.portraitUrl ?? undefined,
  } as AboutContent;
}

/* ------------------------------------------------------------------ */
/* Site settings                                                       */
/* ------------------------------------------------------------------ */

export type SiteContent = {
  name: string;
  title: string;
  slogan: string;
  subline: string;
  locationLabel: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
  linkedin: string;
  email: string;
  phone: string;
};

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  name, title, slogan, subline, locationLabel,
  instagram, instagramHandle, facebook, linkedin, email, phone
}`;

export async function getSiteSettings(): Promise<SiteContent> {
  const fallback: SiteContent = {
    name: SITE.name,
    title: SITE.title,
    slogan: SITE.slogan,
    subline: SITE.subline,
    locationLabel: SITE.locationLabel,
    instagram: SITE.social.instagram,
    instagramHandle: SITE.social.instagramHandle,
    facebook: SITE.social.facebook,
    linkedin: SITE.social.linkedin,
    email: SITE.contact.email,
    phone: SITE.contact.phone,
  };

  const doc = await sanityFetch<Partial<SiteContent> | null>(SETTINGS_QUERY, null);
  if (!doc) return fallback;

  // Merge field by field: a blank field in the CMS keeps the shipped value
  // rather than emptying the site.
  return {
    name: doc.name || fallback.name,
    title: doc.title || fallback.title,
    slogan: doc.slogan || fallback.slogan,
    subline: doc.subline || fallback.subline,
    locationLabel: doc.locationLabel || fallback.locationLabel,
    instagram: doc.instagram || fallback.instagram,
    instagramHandle: doc.instagramHandle || fallback.instagramHandle,
    facebook: doc.facebook || fallback.facebook,
    linkedin: doc.linkedin || fallback.linkedin,
    email: doc.email ?? fallback.email,
    phone: doc.phone ?? fallback.phone,
  };
}

/**
 * How often pages re-check the CMS, in seconds.
 * Edits in the Studio appear on the live site within this window.
 */
export const CONTENT_REVALIDATE = 60;
