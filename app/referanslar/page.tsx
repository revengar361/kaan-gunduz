import type { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/ui/PageHeader";
import BrandLogo from "@/components/portfolio/BrandLogo";
import Reveal from "@/components/ui/Reveal";
import { ROSTER_INSIGHT } from "@/content/clients";
import { getClients } from "@/lib/content";
import { buildMetadata } from "@/content/seo";
import { graph, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Referanslar",
  description:
    "Adana ve Türkiye genelinde çalışılan markalar: yeme içme, bakım, perakende, üretim ve endüstriyel hizmet sektörlerinden sekiz işletme.",
  path: "/referanslar",
});

/**
 * The reference wall.
 *
 * Each brand renders through BrandLogo, which uses a real logo file when one is
 * supplied in /public/logos/ and the brand name in its own sector colour until
 * then. Tiles link to the brand's own public profile where one is known;
 * otherwise they are plain, non-interactive cards.
 */
// Studio edits appear on the live site within this many seconds.
export const revalidate = 60;

export default async function ReferencesPage() {
  const CLIENTS = await getClients();

  const schema = graph(
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "Referanslar", path: "/referanslar" },
    ])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Referanslar"
        title={ROSTER_INSIGHT.headline}
        lead="Aşağıdaki işletmelerin sektör, konum ve kanal bilgileri kamuya açık kaynaklardan doğrulanmıştır."
        crumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Referanslar", path: "/referanslar" },
        ]}
      />

      <section className="shell py-20 md:py-24">
        <ul className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((client, i) => {
            const href = client.handleUrl ?? client.website;

            const inner = (
              <>
                {/* Sector palette blooms in on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(120% 90% at 20% 15%, ${client.palette.glow} 0%, transparent 65%)`,
                  }}
                />

                <Reveal delay={i * 45} className="relative flex h-full flex-col justify-between">
                  <span className="t-index">{client.index}</span>

                  <span className="block">
                    <BrandLogo client={client} />

                    <span className="mt-4 block text-sm text-bone-dim">{client.industry}</span>
                    <span className="mt-0.5 block text-xs text-graphite">{client.district}</span>

                    <span
                      aria-hidden
                      className="mt-5 block h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{ background: client.palette.accent }}
                    />
                  </span>
                </Reveal>
              </>
            );

            const tile = "group relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden bg-ink p-7";

            return (
              <li key={client.slug}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tile}
                    aria-label={`${client.name} — ${client.industry} (yeni sekmede açılır)`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={tile}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="shell border-t border-ink-line py-20">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <h2 className="t-h2 max-w-[18ch]">Sıradaki marka sizinki olabilir.</h2>
          <Link
            href="/iletisim"
            className="bg-signal px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone"
          >
            Projeni Konuşalım
          </Link>
        </div>
      </section>
    </>
  );
}
