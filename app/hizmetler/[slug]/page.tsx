import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHeader from "@/components/ui/PageHeader";
import ServiceMetaphor from "@/components/services/ServiceMetaphor";
import Reveal from "@/components/ui/Reveal";
import { getServices, getServicePages, getService } from "@/lib/content";
import { buildMetadata } from "@/content/seo";
import { graph, serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

// Studio edits appear on the live site within this many seconds.
export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getServicePages();
  return pages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.short,
    path: `/hizmetler/${slug}`,
    keywords: service.seo?.keywords,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const allServices = await getServices();
  const servicePages = await getServicePages();
  const related = allServices.filter((s) => s.parent === slug);
  const others = servicePages.filter((s) => s.slug !== slug).slice(0, 3);

  const schema = graph(
    serviceSchema({ title: service.title, short: service.short, slug }),
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "Hizmetler", path: "/hizmetler" },
      { name: service.title, path: `/hizmetler/${slug}` },
    ])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow={`Hizmet ${service.index}`}
        title={service.title}
        lead={service.lead}
        crumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Hizmetler", path: "/hizmetler" },
          { name: service.title, path: `/hizmetler/${slug}` },
        ]}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            {service.body?.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={i === 0 ? "t-lead" : "mt-6 text-bone-dim"}>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <div className="border border-ink-line bg-ink-raised p-7">
                <div className="aspect-[200/140]">
                  <ServiceMetaphor metaphor={service.metaphor} />
                </div>
              </div>
              <p className="t-label mt-4 text-graphite">Temsili süreç görselleştirmesi</p>
            </Reveal>
          </div>
        </div>
      </section>

      {service.process && (
        <section className="border-y border-ink-line bg-ink-raised py-20 md:py-28">
          <div className="shell">
            <p className="t-label mb-4">Süreç</p>
            <h2 className="t-h1 mb-14 max-w-[16ch]">Nasıl ilerliyor?</h2>

            <ol className="grid gap-px border border-ink-line bg-ink-line md:grid-cols-2 xl:grid-cols-3">
              {service.process.map((step, i) => (
                <li key={step.step} className="bg-ink p-7">
                  <Reveal delay={i * 55}>
                    <p className="t-index mb-4">{step.step}</p>
                    <h3 className="t-h3 mb-2.5">{step.title}</h3>
                    <p className="text-sm text-bone-dim">{step.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {service.deliverables && (
        <section className="shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="t-label mb-4">Teslim edilenler</p>
              <h2 className="t-h2 max-w-[14ch]">Elinizde ne kalır?</h2>
            </div>
            <ul className="lg:col-span-7 lg:col-start-6">
              {service.deliverables.map((d, i) => (
                <li key={d}>
                  <Reveal delay={i * 50}>
                    <div className="flex items-baseline gap-5 border-b border-ink-line py-4">
                      <span className="t-index">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-bone">{d}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="shell border-t border-ink-line py-14">
          <p className="t-label mb-6">Bu hizmete dahil</p>
          <ul className="flex flex-wrap gap-3">
            {related.map((r) => (
              <li
                key={r.index}
                className="border border-ink-line px-5 py-2.5 text-sm text-bone-dim"
              >
                {r.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="shell border-t border-ink-line py-20">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-8">
          <h2 className="t-h2 max-w-[18ch]">Bu hizmeti konuşalım.</h2>
          <Link
            href="/iletisim"
            className="bg-signal px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bone"
          >
            Projeni Konuşalım
          </Link>
        </div>

        <p className="t-label mb-6">Diğer hizmetler</p>
        <ul className="grid gap-px border border-ink-line bg-ink-line md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug} className="bg-ink">
              <Link
                href={`/hizmetler/${o.slug}`}
                className="group flex h-full flex-col p-6 transition-colors hover:bg-ink-raised"
              >
                <span className="t-index mb-4">{o.index}</span>
                <span className="font-display text-base font-semibold leading-tight tracking-tight transition-colors group-hover:text-signal">
                  {o.title}
                </span>
                <span className="mt-2 text-xs text-graphite">{o.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
