export type MetaphorKey =
  | "grid"
  | "feed"
  | "identity"
  | "camera"
  | "timeline"
  | "funnel"
  | "wireframe"
  | "map"
  | "vector"
  | "system"
  | "landscape";

export type Service = {
  index: string;
  slug: string | null;
  title: string;
  short: string;
  metaphor: MetaphorKey;
  lead?: string;
  body?: string[];
  process?: { step: string; title: string; body: string }[];
  deliverables?: string[];
  seo?: { title: string; description: string; keywords: string[] };
  parent?: string;
};

/**
 * All 15 services from the brief. Eleven have dedicated pages; the remaining
 * four are grouped under the page they naturally belong to (see `parent`)
 * rather than given thin standalone pages that would compete in search.
 */
export const SERVICES: Service[] = [
  {
    index: "01",
    slug: "sosyal-medya-yonetimi",
    title: "Sosyal Medya Yönetimi",
    short: "Hesabınızı yönetmek değil, markanızın dijital sesini kurmak.",
    metaphor: "grid",
    lead: "Sosyal medyada sadece paylaşım yapmıyoruz.",
    body: [
      "Bir işletmenin sosyal medya hesabı, vitrinidir. İnsanlar sizi ziyaret etmeden önce oraya bakar; ne sattığınızı, nasıl bir yer olduğunuzu, güvenilir olup olmadığınızı oradan çıkarır.",
      "Sosyal medya yönetimi; içerik takvimi, görsel dil, yayın ritmi, topluluk yönetimi ve ölçümlemenin birlikte çalıştığı bir sistemdir. Tek tek gönderiler değil, bütünlüklü bir akış üretir.",
    ],
    process: [
      { step: "01", title: "Strateji", body: "Hedef kitle, rakip analizi, konumlandırma ve iletişim tonunun belirlenmesi." },
      { step: "02", title: "İçerik", body: "Aylık içerik takvimi; fotoğraf, video ve metinlerin planlanması." },
      { step: "03", title: "Tasarım", body: "Markanın görsel diline uygun gönderi, story ve kapak tasarımları." },
      { step: "04", title: "Yayın", body: "Doğru saatlerde, doğru formatta, tutarlı bir ritimle paylaşım." },
      { step: "05", title: "Analiz", body: "Erişim, etkileşim ve profil ziyaretlerinin düzenli takibi." },
      { step: "06", title: "Optimizasyon", body: "Veriye göre içerik türü, saat ve formatın yeniden ayarlanması." },
    ],
    deliverables: [
      "Aylık içerik takvimi",
      "Gönderi ve story tasarımları",
      "Metin yazımı",
      "Topluluk yönetimi",
      "Aylık performans raporu",
    ],
    seo: {
      title: "Sosyal Medya Yönetimi | Adana",
      description:
        "İşletmeniz için profesyonel sosyal medya yönetimi: strateji, içerik üretimi, tasarım, yayın planı ve düzenli raporlama. Adana ve Türkiye genelinde hizmet.",
      keywords: ["sosyal medya yönetimi", "adana sosyal medya yönetimi", "sosyal medya uzmanı"],
    },
  },
  {
    index: "02",
    slug: "instagram-danismanligi",
    title: "Instagram Danışmanlığı",
    short: "Dağınık bir profili, çalışan bir sisteme dönüştürmek.",
    metaphor: "feed",
    lead: "Profiliniz bir vitrin mi, yoksa bir arşiv mi?",
    body: [
      "Çoğu işletme hesabı zamanla bir arşive dönüşür: farklı zamanlarda, farklı ruh hallerinde, farklı görsel dillerde atılmış gönderilerin yığını. Ziyaretçi profile girdiğinde ne yaptığınızı ilk üç saniyede anlayamaz.",
      "Instagram danışmanlığı; profilin yapısını, içerik kategorilerini, öne çıkanları, Reels stratejisini ve etkileşim alışkanlıklarını yeniden kurar.",
    ],
    process: [
      { step: "01", title: "Profil denetimi", body: "Biyografi, öne çıkanlar, görsel tutarlılık ve arama görünürlüğünün incelenmesi." },
      { step: "02", title: "İçerik mimarisi", body: "İçeriğin kategorilere ayrılması; hangi format neyi anlatacak." },
      { step: "03", title: "Reels stratejisi", body: "Kısa video için tekrarlanabilir formatların belirlenmesi." },
      { step: "04", title: "Etkileşim", body: "Yorum, mesaj ve topluluk yönetiminde işleyen bir rutin." },
      { step: "05", title: "Ölçüm", body: "Hangi içeriğin neyi getirdiğinin okunması." },
    ],
    deliverables: [
      "Profil denetim raporu",
      "İçerik kategorileri",
      "Reels format seti",
      "Biyografi ve öne çıkan düzeni",
      "Uygulama rehberi",
    ],
    seo: {
      title: "Instagram Danışmanlığı | Profil Optimizasyonu",
      description:
        "Instagram profilinizi düzenleyen, içerik mimarisi ve Reels stratejisi kuran profesyonel Instagram danışmanlığı. Adana ve Türkiye geneli.",
      keywords: ["instagram danışmanlığı", "instagram uzmanı", "instagram profil optimizasyonu", "adana instagram danışmanı"],
    },
  },
  {
    index: "03",
    slug: "dijital-marka-stratejisi",
    title: "Dijital Marka Stratejisi",
    short: "Ne paylaştığınızdan önce, ne olduğunuz.",
    metaphor: "identity",
    lead: "Dijitalde görünür olmak yetmez. Doğru görünmek gerekir.",
    body: [
      "Marka stratejisi, dijitalde yapılan her işin üstünde duran katmandır. Hangi kitleye, hangi sesle, hangi vaatle konuştuğunuzu belirler. Bu katman eksikse; içerik üretimi, reklam ve web tasarımı birbirinden kopuk parçalar olarak kalır.",
      "Strateji çalışması sonunda elinizde bir doküman olur: markanın kim olduğu, kime konuştuğu, nasıl konuştuğu ve rakiplerinden nerede ayrıştığı.",
    ],
    process: [
      { step: "01", title: "Keşif", body: "İşletme, ürün, müşteri ve satış süreçlerinin anlaşılması." },
      { step: "02", title: "Kitle", body: "Kime satıldığının netleştirilmesi; herkes bir hedef kitle değildir." },
      { step: "03", title: "Konumlandırma", body: "Rakipler arasında tutulacak yerin seçilmesi." },
      { step: "04", title: "Ses", body: "Markanın nasıl konuşacağının tanımlanması." },
      { step: "05", title: "Sistem", body: "Bu kararların içerik, reklam ve web tarafına aktarılması." },
    ],
    deliverables: [
      "Marka strateji dokümanı",
      "Hedef kitle tanımı",
      "Konumlandırma haritası",
      "İletişim tonu rehberi",
      "Mesaj mimarisi",
    ],
    seo: {
      title: "Dijital Marka Stratejisi | Marka Danışmanlığı",
      description:
        "Markanızın dijitalde kim olduğunu, kime ve nasıl konuştuğunu tanımlayan dijital marka stratejisi ve danışmanlık hizmeti.",
      keywords: ["dijital marka stratejisi", "marka danışmanlığı", "dijital marka danışmanı", "marka stratejisi"],
    },
  },
  {
    index: "04",
    slug: "icerik-uretimi",
    title: "İçerik Üretimi",
    short: "Fotoğraf, video ve metnin tek bir dilde buluşması.",
    metaphor: "camera",
    lead: "İçerik, markanın dijitaldeki hammaddesidir.",
    body: [
      "İyi bir strateji, üretilecek içerik yoksa kağıt üstünde kalır. İçerik üretimi; mekan çekimi, ürün fotoğrafı, kısa video, metin ve tasarımın aynı görsel dil içinde üretilmesidir.",
      "Amaç güzel görüntü değil, doğru görüntüdür: ürünü iştah açıcı, mekanı davetkar, hizmeti güvenilir gösteren kareler.",
    ],
    process: [
      { step: "01", title: "Planlama", body: "Çekim listesi, konsept ve ihtiyaç duyulan kare sayısının belirlenmesi." },
      { step: "02", title: "Çekim", body: "Mekanda ya da stüdyoda fotoğraf ve video çekimi." },
      { step: "03", title: "Kurgu", body: "Seçim, renk düzenlemesi ve formatlara göre kurgu." },
      { step: "04", title: "Metin", body: "Her içeriğin kendi başlığı ve açıklaması." },
      { step: "05", title: "Arşiv", body: "Markaya teslim edilen kullanılabilir içerik arşivi." },
    ],
    deliverables: [
      "Mekan ve ürün fotoğrafları",
      "Kısa video içerikleri",
      "Gönderi metinleri",
      "Formatlara göre kurgu",
      "İçerik arşivi",
    ],
    seo: {
      title: "İçerik Üretimi | Fotoğraf, Video ve Metin",
      description:
        "Markanız için profesyonel içerik üretimi: mekan ve ürün fotoğrafı, kısa video, kurgu ve metin yazımı. Adana ve Türkiye geneli.",
      keywords: ["içerik üretimi", "ürün fotoğrafı", "sosyal medya içerik üretimi", "adana içerik üretimi"],
    },
  },
  {
    index: "05",
    slug: "reels-video",
    title: "Profesyonel Reels Video Çekimi ve Kurgu",
    short: "Fikirden yayına, dikey videonun tüm süreci.",
    metaphor: "timeline",
    lead: "Dikkat, kısa videoda kazanılıyor.",
    body: [
      "Kısa video bugün bir işletmenin yeni müşteriye ulaşmasının en hızlı yolu. Ancak Reels üretmek kamerayı açıp kaydetmek değildir; bir fikir, bir kurgu ritmi ve bir bitiş gerektirir.",
      "Süreç altı adımda ilerler: fikir, çekim, kurgu, renk, altyazı ve yayın. Her adım bir sonrakinin ne kadar iyi olacağını belirler.",
    ],
    process: [
      { step: "01", title: "Fikir", body: "Videonun ne anlatacağı ve ilk üç saniyede ne göstereceği." },
      { step: "02", title: "Çekim", body: "Dikey formata uygun planlar, hareket ve ışık." },
      { step: "03", title: "Kurgu", body: "Ritim, kesme noktaları ve süre." },
      { step: "04", title: "Renk", body: "Markanın görsel diline uygun renk düzenlemesi." },
      { step: "05", title: "Altyazı", body: "Sessiz izlenmeye uygun altyazı ve grafikler." },
      { step: "06", title: "Yayın", body: "Kapak, başlık ve etiketlerle yayına alma." },
    ],
    deliverables: ["Dikey video çekimi", "Kurgu ve renk", "Altyazı ve grafik", "Kapak görseli", "Yayına hazır dosyalar"],
    seo: {
      title: "Reels Video Çekimi ve Kurgu | Profesyonel Kısa Video",
      description:
        "Fikirden yayına profesyonel Reels video çekimi, kurgu, renk ve altyazı hizmeti. Adana ve Türkiye genelinde.",
      keywords: ["reels video çekimi", "reels kurgu", "kısa video çekimi", "adana video çekimi"],
    },
  },
  {
    index: "06",
    slug: "meta-reklam",
    title: "Meta Reklam Yönetimi",
    short: "Instagram ve Facebook reklamlarının kurulumu ve optimizasyonu.",
    metaphor: "funnel",
    lead: "Reklam, gönderi öne çıkarmak değildir.",
    body: [
      "Bir gönderiyi öne çıkarmak ile reklam yönetmek aynı şey değil. Reklam yönetimi; kitle tanımı, kreatif üretimi, kampanya kurgusu, bütçe dağılımı ve sürekli optimizasyon gerektirir.",
      "Huni mantığı basittir: doğru kitleye, doğru kreatifle, doğru hedefle ulaşmak ve sonucu ölçmek.",
    ],
    process: [
      { step: "01", title: "Kitle", body: "Kime ulaşılacağının tanımlanması; ilgi, konum ve davranış." },
      { step: "02", title: "Kreatif", body: "Reklama özel görsel ve video üretimi." },
      { step: "03", title: "Hedefleme", body: "Kampanya hedefinin doğru seçilmesi." },
      { step: "04", title: "Kampanya", body: "Yapı, bütçe ve test kurgusunun kurulması." },
      { step: "05", title: "Optimizasyon", body: "Performansa göre kitle ve kreatif düzenlemesi." },
      { step: "06", title: "Dönüşüm", body: "Mesaj, arama veya ziyaretin takip edilmesi." },
    ],
    deliverables: ["Reklam hesabı kurulumu", "Kitle tanımları", "Reklam kreatifleri", "Kampanya kurulumu", "Performans raporu"],
    seo: {
      title: "Meta Reklam Yönetimi | Instagram ve Facebook Reklamları",
      description:
        "Instagram ve Facebook reklam yönetimi: kitle tanımı, kreatif üretimi, kampanya kurulumu ve optimizasyon.",
      keywords: ["meta reklam yönetimi", "instagram reklam", "facebook reklam", "adana reklam yönetimi"],
    },
  },
  {
    index: "07",
    slug: "web-tasarim",
    title: "Kurumsal Web Sitesi Tasarımı",
    short: "Sosyal medyanın taşıyamadığı güveni taşıyan yer.",
    metaphor: "wireframe",
    lead: "Dijitalde görünürlük yalnızca sosyal medya değildir.",
    body: [
      "Sosyal medya hesabı kiradır; web siteniz mülkünüz. Bir müşteri sizi ciddiye alacaksa, çoğu zaman bir kurumsal siteye bakar: kimsiniz, ne yapıyorsunuz, nasıl ulaşılır.",
      "Site; mobil öncelikli, hızlı ve arama motorlarında bulunabilir olmalıdır. Tasarım bu üçünün üstüne gelir.",
    ],
    process: [
      { step: "01", title: "Yapı", body: "Sayfa mimarisi ve içeriğin sıralanması." },
      { step: "02", title: "Arayüz", body: "Mobil ve masaüstü için tasarım." },
      { step: "03", title: "Marka", body: "Görsel dilin siteye taşınması." },
      { step: "04", title: "Geliştirme", body: "Hızlı, erişilebilir ve mobil uyumlu kodlama." },
      { step: "05", title: "Yayın", body: "Alan adı, hosting ve arama motoru kurulumu." },
    ],
    deliverables: ["Sayfa mimarisi", "Mobil ve masaüstü tasarım", "Geliştirme ve yayın", "Temel SEO kurulumu", "İletişim formu"],
    seo: {
      title: "Kurumsal Web Sitesi Tasarımı | Mobil Uyumlu ve Hızlı",
      description:
        "İşletmeniz için mobil uyumlu, hızlı ve arama motorlarına hazır kurumsal web sitesi tasarımı. Adana ve Türkiye geneli.",
      keywords: ["kurumsal web sitesi", "web tasarım", "adana web tasarım", "ceyhan web tasarım"],
    },
  },
  {
    index: "08",
    slug: "google-isletme-profili",
    title: "Google İşletme Profili Kurulumu ve Optimizasyonu",
    short: "İnsanların sizi aradığı yerde görünür olmak.",
    metaphor: "map",
    lead: "İnsanların sizi aradığı yerde görünür olun.",
    body: [
      "Bir kişi çevresinde balık restoranı ararken önce Instagram'a değil, Google'a bakar. Google İşletme Profili, o aramada görünüp görünmeyeceğinizi belirler.",
      "Profil kurulumu; kategori seçimi, hizmet alanları, fotoğraflar, çalışma saatleri, yorum yönetimi ve düzenli güncelleme ile birlikte çalışır. Haritalarda konum eklemek bu işin sadece ilk adımıdır.",
    ],
    process: [
      { step: "01", title: "Arama", body: "İşletmenin hangi aramalarda çıkması gerektiğinin belirlenmesi." },
      { step: "02", title: "Harita", body: "Google Haritalar üzerine konum eklenmesi ve doğrulanması." },
      { step: "03", title: "Profil", body: "Kategori, hizmet, saat ve görsellerin eksiksiz doldurulması." },
      { step: "04", title: "Yol tarifi", body: "Konum ve iletişim bilgilerinin tutarlı hale getirilmesi." },
      { step: "05", title: "Arama ve çağrı", body: "Arama ve yol tarifi davranışının takibi." },
      { step: "06", title: "Görünürlük", body: "Yorum yönetimi ve düzenli güncelleme." },
    ],
    deliverables: [
      "Profil kurulumu ve doğrulama",
      "Google Haritalar konum ekleme",
      "Kategori ve hizmet optimizasyonu",
      "Görsel yükleme",
      "Yorum yönetimi rehberi",
    ],
    seo: {
      title: "Google İşletme Profili Kurulumu ve Optimizasyonu",
      description:
        "Google İşletme Profili kurulumu, Google Haritalar konum ekleme ve yerel arama görünürlüğü optimizasyonu. Adana ve Türkiye geneli.",
      keywords: ["google işletme profili", "google haritalar konum ekleme", "google işletme kaydı", "yerel seo adana"],
    },
  },
  {
    index: "09",
    slug: "dijital-pazarlama",
    title: "Dijital Pazarlama Danışmanlığı",
    short: "Parçaları tek bir sisteme bağlamak.",
    metaphor: "system",
    lead: "Sosyal medya, reklam, web ve Google ayrı işler değildir.",
    body: [
      "Çoğu işletme bu parçaları ayrı ayrı satın alır: biri sosyal medyayı yapar, biri siteyi kurar, bir başkası reklam verir. Sonuç, birbiriyle konuşmayan parçalar olur.",
      "Danışmanlık, bu parçaları tek bir sistem olarak kurgular ve hangisinin ne zaman devreye gireceğine karar verir.",
    ],
    process: [
      { step: "01", title: "Durum analizi", body: "Mevcut dijital varlıkların incelenmesi." },
      { step: "02", title: "Öncelik", body: "Sınırlı bütçeyle neyin önce yapılacağı." },
      { step: "03", title: "Yol haritası", body: "Aylara bölünmüş uygulama planı." },
      { step: "04", title: "Uygulama", body: "Planın hayata geçirilmesi veya ekibe aktarılması." },
      { step: "05", title: "Takip", body: "Düzenli değerlendirme ve yön düzeltmesi." },
    ],
    deliverables: ["Dijital durum analizi", "Öncelik listesi", "Yol haritası", "Uygulama desteği", "Periyodik değerlendirme"],
    seo: {
      title: "Dijital Pazarlama Danışmanlığı | Adana",
      description:
        "Sosyal medya, reklam, web ve Google görünürlüğünü tek bir sistem olarak kurgulayan dijital pazarlama danışmanlığı.",
      keywords: ["dijital pazarlama danışmanlığı", "dijital pazarlama uzmanı", "adana dijital pazarlama"],
    },
  },
  {
    index: "10",
    slug: "kurumsal-kimlik",
    title: "Kurumsal Kimlik ve Logo Tasarımı",
    short: "Logo bir kimliğin tamamı değil, başlangıcıdır.",
    metaphor: "vector",
    lead: "Bir marka logodan ibaret değildir.",
    body: [
      "Logo, kurumsal kimliğin en görünür parçasıdır ama tek parçası değildir. Renk paleti, tipografi, kullanım kuralları ve uygulama örnekleri olmadan logo tek başına tutarlılık üretemez.",
      "Kurumsal kimlik çalışması; tabeladan menüye, sosyal medya gönderisinden faturaya kadar her yerde aynı markayı gösteren kuralları tanımlar.",
    ],
    process: [
      { step: "01", title: "Brief", body: "İşletmenin sektörü, kitlesi ve karakterinin anlaşılması." },
      { step: "02", title: "Eskiz", body: "Yön alternatiflerinin çıkarılması." },
      { step: "03", title: "Vektör", body: "Seçilen yönün ölçeklenebilir biçimde çizilmesi." },
      { step: "04", title: "Sistem", body: "Renk, tipografi ve kullanım kurallarının tanımlanması." },
      { step: "05", title: "Teslim", body: "Tüm formatlarda dosya ve kullanım kılavuzu." },
    ],
    deliverables: [
      "Logo tasarımı",
      "Renk paleti ve tipografi",
      "Kullanım kılavuzu",
      "Sosyal medya şablonları",
      "Baskı ve dijital dosyalar",
    ],
    seo: {
      title: "Kurumsal Kimlik ve Logo Tasarımı | Adana",
      description:
        "Logo tasarımı, renk paleti, tipografi ve kullanım kurallarıyla eksiksiz kurumsal kimlik tasarımı. Adana ve Türkiye geneli.",
      keywords: ["kurumsal kimlik tasarımı", "logo tasarımı", "adana logo tasarım", "marka kimliği"],
    },
  },
  {
    index: "11",
    slug: "marka-konumlandirma",
    title: "Marka Konumlandırma",
    short: "Rakiplerin arasında tutulacak yerin seçilmesi.",
    metaphor: "landscape",
    lead: "Herkese hitap eden marka, kimseye hitap etmez.",
    body: [
      "Konumlandırma, pazarda hangi boşluğu doldurduğunuza dair bilinçli bir karardır. Aynı sokakta beş kebapçı varsa, altıncı olmak bir strateji değildir; farklı bir şey olmak stratejidir.",
      "Bu çalışma; rakip haritası, ayrışma noktaları ve markanın tek cümlelik vaadiyle sonuçlanır.",
    ],
    process: [
      { step: "01", title: "Pazar", body: "Rakiplerin ve pazarın haritalanması." },
      { step: "02", title: "Boşluk", body: "Doldurulabilecek alanın tespiti." },
      { step: "03", title: "Ayrışma", body: "Neyin farklı olacağının belirlenmesi." },
      { step: "04", title: "Vaat", body: "Tek cümlelik marka vaadinin yazılması." },
      { step: "05", title: "Aktarım", body: "Kararın tüm kanallara taşınması." },
    ],
    deliverables: ["Rakip haritası", "Konumlandırma önerisi", "Ayrışma noktaları", "Marka vaadi", "Uygulama notları"],
    seo: {
      title: "Marka Konumlandırma | Rekabet Analizi ve Ayrışma",
      description: "Rakip haritası, ayrışma noktaları ve net bir marka vaadiyle marka konumlandırma çalışması.",
      keywords: ["marka konumlandırma", "marka stratejisi", "rekabet analizi", "konumlandırma"],
    },
  },
  {
    index: "12",
    slug: null,
    title: "Logo Tasarımı",
    short: "Ölçeklenebilir, kalıcı ve markaya özel logo.",
    metaphor: "vector",
    parent: "kurumsal-kimlik",
  },
  {
    index: "13",
    slug: null,
    title: "Sosyal Medya Reklam Tasarımları",
    short: "Reklama özel, dikkat çeken kreatifler.",
    metaphor: "funnel",
    parent: "meta-reklam",
  },
  {
    index: "14",
    slug: null,
    title: "Google Haritalar Konum Ekleme",
    short: "İşletmenizin haritada doğru yerde görünmesi.",
    metaphor: "map",
    parent: "google-isletme-profili",
  },
  {
    index: "15",
    slug: null,
    title: "Sosyal Medya Hesap Kurulumu ve Optimizasyonu",
    short: "Sıfırdan doğru kurulmuş bir hesap.",
    metaphor: "grid",
    parent: "instagram-danismanligi",
  },
];

export const SERVICE_PAGES = SERVICES.filter(
  (s): s is Service & { slug: string } => typeof s.slug === "string"
);

export function getService(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
