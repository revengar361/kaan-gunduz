import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { SITE } from "@/content/site";
import { buildMetadata } from "@/content/seo";

export const metadata: Metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanan aydınlatma metni.",
  path: "/kvkk",
});

const SECTIONS = [
  {
    title: "Veri sorumlusu",
    body: [
      `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla ${SITE.name} tarafından aşağıda açıklanan kapsamda işlenmektedir.`,
    ],
  },
  {
    title: "İşlenen kişisel veriler",
    body: [
      "Kimlik bilgisi (ad, soyad), iletişim bilgisi (e-posta adresi, telefon numarası) ve talebinize ilişkin olarak ilettiğiniz işletme bilgileri (işletme adı, sektör, hizmet ihtiyacı, hedef).",
    ],
  },
  {
    title: "İşleme amacı",
    body: [
      "Kişisel verileriniz; iletişim taleplerinizin karşılanması, hizmet kapsamının belirlenmesi, teklif hazırlanması ve sözleşme öncesi görüşmelerin yürütülmesi amacıyla işlenmektedir.",
    ],
  },
  {
    title: "Hukuki sebep",
    body: [
      "Verileriniz; KVKK'nın 5. maddesinde belirtilen bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması ve veri sorumlusunun meşru menfaati hukuki sebeplerine dayanılarak, iletişim formu aracılığıyla otomatik yollarla işlenmektedir.",
    ],
  },
  {
    title: "Aktarım",
    body: [
      "Kişisel verileriniz üçüncü kişilere, yurt içine veya yurt dışına aktarılmamaktadır. Yalnızca yasal olarak yetkili kamu kurumlarının talebi hâlinde, mevzuatın öngördüğü ölçüde paylaşım yapılabilir.",
    ],
  },
  {
    title: "İlgili kişinin hakları",
    body: [
      "KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme, silinmesini veya yok edilmesini isteme, bu işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme ve zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
      "Bu haklarınıza ilişkin taleplerinizi iletişim sayfasında yer alan kanallar üzerinden iletebilirsiniz.",
    ],
  },
];

export default function KvkkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Yasal"
        title="KVKK Aydınlatma Metni"
        crumbs={[
          { name: "Ana Sayfa", path: "/" },
          { name: "KVKK", path: "/kvkk" },
        ]}
      />

      <section className="shell py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-3">
            {SECTIONS.map((s, i) => (
              <div key={s.title} className={i === 0 ? "" : "mt-12"}>
                <p className="t-index mb-3">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="t-h3 mb-4">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 max-w-[68ch] text-bone-dim">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <p className="mt-14 border-t border-ink-line pt-6 text-xs text-graphite">
              Bu metin bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez. Yayına
              alınmadan önce bir hukuk danışmanı tarafından gözden geçirilmesi önerilir.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
