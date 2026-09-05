import Link from "next/link";
import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import MethodSequence from "@/components/home/MethodSequence";
import ServicesIndex from "@/components/home/ServicesIndex";
import FeedSystem from "@/components/home/FeedSystem";
import WhySequence from "@/components/home/WhySequence";
import FinalHero from "@/components/home/FinalHero";
import VisibilityMap from "@/components/services/VisibilityMap";
import Reveal from "@/components/ui/Reveal";

import { SITE } from "@/content/site";
import { ROSTER_INSIGHT } from "@/content/clients";
import { getAbout, getClients, getServices } from "@/lib/content";
import { buildMetadata } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  title: `${SITE.name} | Sosyal Medya ve Dijital Strateji Uzmanı`,
  description: SITE.subline,
  path: "/",
});

// Studio edits appear on the live site within this many seconds.
export const revalidate = 60;

export default async function HomePage() {
  const ABOUT = await getAbout();
  const CLIENTS = await getClients();
  const SERVICES = await getServices();

  return (
    <>
      {/* 01 — THE DIGITAL FIELD */}
      <Hero />

      {/* 02 — POSITIONING */}
      <section className="shell border-t border-ink-line py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="t-label mb-4">02 — Kim</p>
              <h2 className="t-h1 max-w-[13ch]">
                Dijitalde görünür olmak yetmez. Doğru görünmek gerekir.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <p className="t-lead">{ABOUT.intro[0]}</p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-bone-dim">{ABOUT.positioning.body[0]}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-bone-dim">{ABOUT.positioning.body[1]}</p>
            </Reveal>
            <Reveal delay={260}>
              <Link
                href="/hakkimda"
                className="group mt-9 inline-flex items-center gap-2 border-b border-ink-line pb-1 text-sm text-bone transition-colors hover:border-signal hover:text-signal"
              >
                Hakkımda
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — HOW HE THINKS */}
      <MethodSequence />

      {/* 04 — WHAT HE DOES */}
      <ServicesIndex services={SERVICES} />

      {/* 05 — SOCIAL MEDIA SYSTEM */}
      <FeedSystem />

      {/* 06 — WHO HE HAS WORKED WITH */}
      <section className="shell border-t border-ink-line py-20 md:py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label mb-4">06 — Kimlerle çalıştım</p>
            <h2 className="t-h1 max-w-[16ch]">{ROSTER_INSIGHT.headline}</h2>
          </div>
          <Link
            href="/referanslar"
            className="group inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-signal"
          >
            Tüm referanslar
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-bone-dim">{ROSTER_INSIGHT.body}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2">
              {CLIENTS.map((client, i) => (
                <li key={client.slug} className="bg-ink px-6 py-5">
                  <Reveal delay={i * 40}>
                    <p
                      className="font-display text-lg font-bold leading-tight tracking-tight"
                      style={{ color: client.palette.accent }}
                    >
                      {client.name}
                    </p>
                    <p className="mt-1 text-xs text-graphite">{client.industry}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 07 — WHY KAAN */}
      <WhySequence />

      {/* 08 — LOCAL VISIBILITY */}
      <section className="shell border-t border-ink-line py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="t-label mb-4">08 — Görünürlük</p>
              <h2 className="t-h1 max-w-[14ch]">
                İnsanların sizi aradığı yerde görünün.
              </h2>
              <p className="t-lead mt-7 max-w-[44ch]">
                Bir mekan arayan kişi önce Instagram&apos;a değil, Google&apos;a bakar. Arama
                sonucunda, haritada ve profilde görünmek tesadüf değil; kurulum işidir.
              </p>
              <Link
                href="/hizmetler/google-isletme-profili"
                className="group mt-9 inline-flex items-center gap-2 border-b border-ink-line pb-1 text-sm text-bone transition-colors hover:border-signal hover:text-signal"
              >
                Google görünürlüğü
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="border border-ink-line bg-ink-raised p-6 md:p-10">
                <VisibilityMap />
              </div>
              <p className="t-label mt-4 text-graphite">
                Temsili yerel görünürlük şeması
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 09 — FINAL HERO */}
      <FinalHero />
    </>
  );
}
