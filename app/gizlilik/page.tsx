import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { SITE } from "@/content/site";
import { buildMetadata } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gizlilik Politikası",
  description: "Bu web sitesinde toplanan verilerin nasıl işlendiğine dair gizlilik politikası.",
  path: "/gizlilik",
});

const SECTIONS = [
  {
    title: "Toplanan veriler",
    body: [
      "Bu sitede yalnızca iletişim formu aracılığıyla sizin gönüllü olarak ilettiğiniz bilgiler toplanır: işletme adı, sektör, seçtiğiniz hizmetler, hedefiniz, adınız, e-posta adresiniz ve isteğe bağlı olarak telefon numaranız.",
      "Site üzerinde reklam takip çerezi, üçüncü taraf pikseli veya davranışsal profilleme aracı bulunmamaktadır.",
    ],
  },
  {
    title: "Verilerin kullanım amacı",
    body: [
      "İlettiğiniz bilgiler yalnızca talebinize dönüş yapmak ve olası bir çalışma kapsamını değerlendirmek amacıyla kullanılır.",
      "Bilgileriniz pazarlama listesine eklenmez ve satılmaz. Formun çalışması için e-posta gönderim ve kayıt altyapısı kullanılır; bu sağlayıcılar verilerinizi yalnızca bu hizmeti sunmak için işler.",
    ],
  },
  {
    title: "Saklama süresi",
    body: [
      "İletişim talepleri, ilgili görüşme sonuçlanana kadar ve yasal saklama yükümlülükleri saklı kalmak kaydıyla makul bir süre boyunca saklanır. Talebiniz üzerine silinir.",
    ],
  },
  {
    title: "Çerezler",
    body: [
      "Bu site, çalışması için zorunlu olmayan hiçbir çerez kullanmamaktadır. Analitik veya reklam çerezi bulunmamaktadır.",
    ],
  },
  {
    title: "Dış bağlantılar",
    body: [
      "Sitede Instagram, Facebook, LinkedIn gibi platformlara ve bazı haber kaynaklarına bağlantılar bulunmaktadır. Bu sitelerin gizlilik uygulamalarından sorumlu değiliz.",
    ],
  },
  {
    title: "Haklarınız",
    body: [
      "Kişisel verilerinize erişme, düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz. Bu haklarınızı kullanmak için iletişim sayfasındaki kanallardan ulaşabilirsiniz.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Yasal"
        title="Gizlilik Politikası"
        crumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Gizlilik Politikası", path: "/gizlilik" },
        ]}
      />

      <section className="shell py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-3">
            <p className="text-sm text-graphite">
              Bu politika {SITE.name} kişisel web sitesi için geçerlidir.
            </p>

            {SECTIONS.map((s, i) => (
              <div key={s.title} className="mt-12">
                <p className="t-index mb-3">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="t-h3 mb-4">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 max-w-[68ch] text-bone-dim">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
