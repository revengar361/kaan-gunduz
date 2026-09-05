/**
 * One-time migration: copies the TypeScript content files into Sanity.
 *
 * Run once after creating the Sanity project:
 *   npm run cms:migrate
 *
 * Safe to re-run. Every document uses a deterministic _id and is written with
 * createOrReplace, so a second run overwrites rather than duplicating. Leads are
 * never touched — this only writes content.
 *
 * Note: re-running DISCARDS edits made in the Studio for these documents,
 * because the code files become the source again. Run it once, then edit in the
 * panel.
 */

import { createClient } from "@sanity/client";
import { SERVICES } from "../content/services.ts";
import { CLIENTS } from "../content/clients.ts";
import { FAQ } from "../content/faq.ts";
import { ABOUT } from "../content/about.ts";
import { SITE } from "../content/site.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "\nEksik ayar. .env.local dosyasında şunlar tanımlı olmalı:\n" +
      "  NEXT_PUBLIC_SANITY_PROJECT_ID\n" +
      "  SANITY_API_WRITE_TOKEN   (Editor yetkisi)\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-09-05",
  useCdn: false,
});

/** Sanity slugs must be url-safe; content slugs already are. */
const slugify = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function migrate() {
  const tx = client.transaction();

  // ---- Site settings -------------------------------------------------
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
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
  });

  // ---- About ---------------------------------------------------------
  tx.createOrReplace({
    _id: "about",
    _type: "about",
    headline: ABOUT.headline,
    intro: [...ABOUT.intro],
    positioningTitle: ABOUT.positioning.title,
    positioningBody: [...ABOUT.positioning.body],
    timeline: ABOUT.timeline.map((t, i) => ({
      _key: `phase-${i}`,
      title: t.title,
      body: t.body,
    })),
  });

  // ---- Services ------------------------------------------------------
  for (const s of SERVICES) {
    const id = `service-${s.slug ?? slugify(s.title)}`;
    tx.createOrReplace({
      _id: id,
      _type: "service",
      index: s.index,
      title: s.title,
      ...(s.slug ? { slug: { _type: "slug", current: s.slug } } : {}),
      short: s.short,
      metaphor: s.metaphor,
      ...(s.lead ? { lead: s.lead } : {}),
      ...(s.body ? { body: [...s.body] } : {}),
      ...(s.process
        ? {
            process: s.process.map((p, i) => ({
              _key: `step-${i}`,
              step: p.step,
              title: p.title,
              body: p.body,
            })),
          }
        : {}),
      ...(s.deliverables ? { deliverables: [...s.deliverables] } : {}),
      ...(s.parent ? { parent: s.parent } : {}),
      ...(s.seo
        ? {
            seoTitle: s.seo.title,
            seoDescription: s.seo.description,
            seoKeywords: [...s.seo.keywords],
          }
        : {}),
    });
  }

  // ---- Clients -------------------------------------------------------
  for (const c of CLIENTS) {
    tx.createOrReplace({
      _id: `client-${c.slug}`,
      _type: "client",
      index: c.index,
      name: c.name,
      slug: { _type: "slug", current: c.slug },
      industry: c.industry,
      district: c.district,
      ...(c.handle ? { handle: c.handle } : {}),
      ...(c.handleUrl ? { handleUrl: c.handleUrl } : {}),
      ...(c.website ? { website: c.website } : {}),
      accent: c.palette.accent,
      glow: c.palette.glow,
      base: c.palette.base,
    });
  }

  // ---- FAQ -----------------------------------------------------------
  FAQ.forEach((f, i) => {
    tx.createOrReplace({
      _id: `faq-${i + 1}`,
      _type: "faq",
      order: i + 1,
      question: f.q,
      answer: f.a,
    });
  });

  await tx.commit();

  console.log(
    "\nTamamlandı:\n" +
      `  Site ayarları    1\n` +
      `  Hakkımda         1\n` +
      `  Hizmetler        ${SERVICES.length}\n` +
      `  Referanslar      ${CLIENTS.length}\n` +
      `  SSS              ${FAQ.length}\n\n` +
      "Artık /studio adresinden düzenleyebilirsiniz.\n"
  );
}

migrate().catch((error) => {
  console.error("\nGöç başarısız:", error?.message ?? error, "\n");
  process.exit(1);
});
