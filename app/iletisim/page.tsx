import type { Metadata } from "next";

import PageHeader from "@/components/ui/PageHeader";
import ProjectIntake from "@/components/contact/ProjectIntake";
import { SITE } from "@/content/site";
import { buildMetadata } from "@/content/seo";
import { graph, localBusinessSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({
  title: "İletişim",
  description:
    "Projenizi konuşalım. Adana ve Türkiye genelinde sosyal medya yönetimi, dijital strateji, web tasarımı ve reklam çalışmaları için iletişime geçin.",
  path: "/iletisim",
});

export default function ContactPage() {
  const schema = graph(
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Ana Sayfa", path: "/" },
      { name: "İletişim", path: "/iletisim" },
    ])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="İletişim"
        title="Projeni konuşalım."
        lead="Beş kısa adım. Ne yaptığınızı, neye ihtiyacınız olduğunu ve nereye varmak istediğinizi anlatın; ardından size özel bir yaklaşımla dönüş yapayım."
        crumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ]}
      />

      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProjectIntake />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <div className="border border-ink-line bg-ink-raised p-7">
                <p className="t-label mb-5">Doğrudan</p>

                <ul className="space-y-5">
                  <li>
                    <p className="text-xs text-graphite">Instagram</p>
                    <a
                      href={SITE.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-signal"
                    >
                      {SITE.social.instagramHandle}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  </li>

                  {SITE.contact.email && (
                    <li>
                      <p className="text-xs text-graphite">E-posta</p>
                      <a
                        href={`mailto:${SITE.contact.email}`}
                        className="text-sm transition-colors hover:text-signal"
                      >
                        {SITE.contact.email}
                      </a>
                    </li>
                  )}

                  {SITE.contact.phone && (
                    <li>
                      <p className="text-xs text-graphite">Telefon</p>
                      <a
                        href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
                        className="text-sm transition-colors hover:text-signal"
                      >
                        {SITE.contact.phone}
                      </a>
                    </li>
                  )}

                  <li>
                    <p className="text-xs text-graphite">Konum</p>
                    <p className="text-sm">
                      {SITE.locationLabel}
                    </p>
                  </li>

                  <li>
                    <p className="text-xs text-graphite">Hizmet bölgesi</p>
                    <p className="text-sm">Tüm Türkiye</p>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border border-ink-line p-7">
                <p className="t-label mb-4">Süreç</p>
                <ol className="space-y-3 text-sm text-bone-dim">
                  <li className="flex gap-3">
                    <span className="t-index shrink-0">01</span> Tanışma görüşmesi
                  </li>
                  <li className="flex gap-3">
                    <span className="t-index shrink-0">02</span> Strateji ve teklif
                  </li>
                  <li className="flex gap-3">
                    <span className="t-index shrink-0">03</span> Üretim
                  </li>
                  <li className="flex gap-3">
                    <span className="t-index shrink-0">04</span> Yayın
                  </li>
                  <li className="flex gap-3">
                    <span className="t-index shrink-0">05</span> Ölçüm ve raporlama
                  </li>
                </ol>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
