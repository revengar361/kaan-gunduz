import type { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/ui/PageHeader";
import { getFaq } from "@/lib/content";
import { buildMetadata } from "@/content/seo";
import { graph, faqSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "Sıkça Sorulan Sorular",
  description:
    "Sosyal medya yönetimi, Instagram danışmanlığı, Reels çekimi, Meta reklamları, Google İşletme Profili ve web sitesi hakkında sık sorulan sorular ve cevapları.",
  path: "/sss",
});

// Studio edits appear on the live site within this many seconds.
export const revalidate = 60;

export default async function FaqPage() {
  const FAQ = await getFaq();

  const schema = graph(
    faqSchema(FAQ),
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "SSS", path: "/sss" },
    ])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="SSS"
        title="Sıkça sorulan sorular."
        lead="Görüşmelerde en çok sorulan sorular ve kısa cevapları. Aradığınızı bulamazsanız doğrudan yazabilirsiniz."
        crumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "SSS", path: "/sss" },
        ]}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="t-label mb-4">{FAQ.length} soru</p>
              <h2 className="t-h2 max-w-[14ch]">Merak edilenler</h2>
              <Link
                href="/iletisim"
                className="group mt-8 inline-flex items-center gap-2 border-b border-ink-line pb-1 text-sm transition-colors hover:border-signal hover:text-signal"
              >
                Sorunuz mu var?
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {/* Native details/summary: keyboard accessible, works with no JS,
                and stays open for in-page search. */}
            {FAQ.map((item, i) => (
              <details key={item.q} className="group border-b border-ink-line">
                <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="t-index shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-signal md:text-xl">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-graphite transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-7 pl-[calc(1.5rem+1.25rem)]">
                  <p className="max-w-[64ch] text-bone-dim">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
