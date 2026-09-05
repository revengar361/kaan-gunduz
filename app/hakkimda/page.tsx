import type { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/ui/PageHeader";
import PortraitBlock from "@/components/about/PortraitBlock";
import Reveal from "@/components/ui/Reveal";
import { ABOUT } from "@/content/about";
import { SITE, CTA } from "@/content/site";
import { buildMetadata } from "@/content/seo";
import { graph, personSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Hakkımda",
  description:
    "Kaan Gündüz kimdir? Adana merkezli sosyal medya yönetimi, dijital pazarlama ve marka stratejisi çalışmaları üzerine.",
  path: "/hakkimda",
});

export default function AboutPage() {
  const schema = graph(
    personSchema(),
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "Hakkımda", path: "/hakkimda" },
    ])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Hakkımda"
        title={ABOUT.headline}
        crumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımda", path: "/hakkimda" },
        ]}
      />

      {/* Intro + portrait */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <PortraitBlock src="/portrait/kaan-gunduz.jpg" />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {ABOUT.intro.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={i === 0 ? "t-lead" : "mt-6 text-bone-dim"}>{p}</p>
              </Reveal>
            ))}

            <Reveal delay={260}>
              <dl className="mt-12 grid grid-cols-2 gap-px border border-ink-line bg-ink-line">
                <div className="bg-ink p-5">
                  <dt className="t-label mb-2">Konum</dt>
                  <dd className="text-sm">
                    {SITE.locationLabel}
                  </dd>
                </div>
                <div className="bg-ink p-5">
                  <dt className="t-label mb-2">Unvan</dt>
                  <dd className="text-sm">{SITE.title}</dd>
                </div>
                <div className="bg-ink p-5">
                  <dt className="t-label mb-2">Hizmet bölgesi</dt>
                  <dd className="text-sm">Tüm Türkiye</dd>
                </div>
                <div className="bg-ink p-5">
                  <dt className="t-label mb-2">Instagram</dt>
                  <dd className="text-sm">
                    <a
                      href={SITE.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-signal"
                    >
                      {SITE.social.instagramHandle}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="border-y border-ink-line bg-ink-raised py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="t-h2 max-w-[16ch]">{ABOUT.positioning.title}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {ABOUT.positioning.body.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={i === 0 ? "text-bone" : "mt-5 text-bone-dim"}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Thematic timeline — deliberately undated. See research/timeline.md */}
      <section className="shell py-20 md:py-28">
        <div className="mb-14">
          <p className="t-label mb-4">Yol</p>
          <h2 className="t-h1 max-w-[16ch]">Meraktan sisteme.</h2>
          <p className="t-lead mt-6 max-w-[58ch]">
            Aşağıdaki bölümler tarih değil, çalışma biçimindeki değişimi anlatır. Doğrulanmamış
            tarih yayınlamamayı tercih ediyorum.
          </p>
        </div>

        <ol className="relative border-l border-ink-line pl-8 md:pl-14">
          {ABOUT.timeline.map((phase, i) => (
            <li key={phase.key} className="relative pb-14 last:pb-0">
              <span
                className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2 w-2 bg-graphite md:-left-[calc(3.5rem+4.5px)]"
                aria-hidden
              />
              <Reveal delay={i * 60}>
                <p className="t-index mb-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mb-3">{phase.title}</h3>
                <p className="max-w-[62ch] text-bone-dim">{phase.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell border-t border-ink-line py-20">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <h2 className="t-h2 max-w-[16ch]">Birlikte çalışmayı konuşalım.</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href={CTA.primary.href}
              className="bg-signal px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone"
            >
              {CTA.primary.label}
            </Link>
            <Link
              href={CTA.services.href}
              className="border border-ink-line px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] transition-colors hover:border-signal hover:text-signal"
            >
              {CTA.services.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
