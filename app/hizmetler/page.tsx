import type { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/ui/PageHeader";
import ServiceMetaphor from "@/components/services/ServiceMetaphor";
import Reveal from "@/components/ui/Reveal";
import { SERVICES, SERVICE_PAGES } from "@/content/services";
import { buildMetadata } from "@/content/seo";
import { graph, breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Hizmetler",
  description:
    "Sosyal medya yönetimi, Instagram danışmanlığı, içerik üretimi, Reels video, Meta reklam yönetimi, web tasarımı, Google İşletme Profili ve marka stratejisi hizmetleri.",
  path: "/hizmetler",
});

export default function ServicesPage() {
  const schema = graph(
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "Hizmetler", path: "/hizmetler" },
    ])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Hizmetler"
        title="On beş hizmet, tek bir sistem."
        lead="Bu hizmetler ayrı ayrı satın alınabilir; ancak birlikte çalıştıklarında anlamlı olurlar. Sosyal medya trafiği web sitesine, web sitesi Google görünürlüğüne, Google görünürlüğü de yeniden sosyal medyaya bağlanır."
        crumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Hizmetler", path: "/hizmetler" },
        ]}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-px border border-ink-line bg-ink-line md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_PAGES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/hizmetler/${s.slug}`}
              className="group flex flex-col bg-ink p-7 transition-colors duration-300 hover:bg-ink-raised"
            >
              <Reveal delay={i * 45} className="flex h-full flex-col">
                <div className="mb-6 flex items-start justify-between">
                  <span className="t-index">{s.index}</span>
                  <span
                    aria-hidden
                    className="text-graphite opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </div>

                <div className="mb-7 aspect-[200/140] opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                  <ServiceMetaphor metaphor={s.metaphor} />
                </div>

                <h2 className="t-h3 mb-2 transition-colors duration-200 group-hover:text-signal">
                  {s.title}
                </h2>
                <p className="text-sm text-bone-dim">{s.short}</p>
              </Reveal>
            </Link>
          ))}
        </div>
      </section>

      {/* The four services grouped under a parent page rather than given thin pages. */}
      <section className="shell border-t border-ink-line py-16">
        <p className="t-label mb-8">Ayrıca</p>
        <ul className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.filter((s) => !s.slug).map((s) => (
            <li key={s.index} className="bg-ink">
              <Link
                href={`/hizmetler/${s.parent}`}
                className="group flex h-full flex-col p-6 transition-colors hover:bg-ink-raised"
              >
                <span className="t-index mb-4">{s.index}</span>
                <span className="font-display text-base font-semibold leading-tight tracking-tight transition-colors group-hover:text-signal">
                  {s.title}
                </span>
                <span className="mt-2 text-xs text-graphite">{s.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell border-t border-ink-line py-20">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <h2 className="t-h2 max-w-[20ch]">
            Hangi hizmete ihtiyacınız olduğundan emin değil misiniz?
          </h2>
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
