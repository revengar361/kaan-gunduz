# Yönetim Paneli — Kurulum

Panel `kaangunduz.com/studio` adresinde. Şu an açtığınızda kurulum talimatı görürsünüz, çünkü henüz bir Sanity projesine bağlı değil.

**Kurulum yaklaşık 5 dakika sürer ve ücretsizdir.**

---

## Panelde ne yapabileceksiniz

**Gelen Talepler** — İletişim formundan gelen her talep panele düşer. Yeni / Devam eden / Kapanan olarak ayrılmış. Her talebe kendi notunuzu yazabilirsiniz (teklif tutarı, görüşme notu). Bu notları sadece siz görürsünüz.

**İçerik** — Hizmet metinleri, referanslar, SSS, Hakkımda yazısı ve site ayarları. Koda dokunmadan düzenlersiniz.

**Görseller** — Müşteri logolarını ve portrenizi panelden yükleyebilirsiniz. Logo yüklediğiniz markada referans duvarında yazı yerine logo görünür.

---

## Kurulum

### 1. Sanity projesi oluşturun

[sanity.io/manage](https://www.sanity.io/manage) → Google veya GitHub ile giriş → **Create new project**.

- Proje adı: `Kaan Gündüz`
- Dataset: `production` (varsayılan)

Oluşunca **Project ID** görünür. Kopyalayın (`abc12xyz` gibi kısa bir metin).

### 2. Yazma anahtarı alın

Aynı ekranda **API** → **Tokens** → **Add API token**

- İsim: `website`
- Yetki: **Editor**

Anahtar **yalnızca bir kez** gösterilir, hemen kopyalayın.

### 3. Vercel'e girin

Vercel → projeniz → **Settings** → **Environment Variables**:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = (1. adımdaki Project ID)
NEXT_PUBLIC_SANITY_DATASET    = production
SANITY_API_WRITE_TOKEN        = (2. adımdaki anahtar)
```

Sonra **Deployments** → son dağıtım → **Redeploy**. Ortam değişkenleri eski derlemeye geriye dönük uygulanmaz.

### 4. Panele izin verin

Sanity → Project → **API** → **CORS origins** → **Add CORS origin**:

```
https://kaangunduz.com
```

**Allow credentials** işaretli olsun. Bu adım atlanırsa panel açılır ama veri çekemez.

### 5. Mevcut içeriği panele taşıyın

Bilgisayarınızda, proje klasöründe:

```bash
npm run cms:migrate
```

Bunun için `.env.local` dosyasına da aynı üç değişkeni yazmanız gerekir.

Betik mevcut 15 hizmeti, 8 referansı, 12 SSS'yi ve Hakkımda metnini panele kopyalar. **Bir kez çalıştırın.** Sonrasında tekrar çalıştırırsanız panelde yaptığınız düzenlemeler koddaki hâline geri döner.

---

## Kullanım

Panel: **kaangunduz.com/studio**

Giriş Sanity hesabınızla. Şifre bu projede saklanmıyor; kimlik doğrulamayı Sanity yapıyor. Başkasının erişmesini isterseniz Sanity → Project → **Members** → Invite.

Bir düzenlemeyi kaydettikten sonra sitede görünmesi **en fazla 1 dakika** sürer. Sayfalar performans için önbelleklenir; bu süre `revalidate = 60` ayarından geliyor.

---

## Tasarımın mantığı: panel bağlı değilse site bozulmaz

İçerik iki kaynaktan okunabiliyor:

1. Sanity bağlıysa → panelden
2. Bağlı değilse, ya da sorgu hata verirse → koddaki `content/` dosyalarından

Yani anahtarın süresi dolsa, Sanity kesinti yaşasa veya göç yarıda kalsa bile **site çalışmaya devam eder**, sadece son yayınlanan koddaki içeriği gösterir. Bir CMS arızasının siteyi düşürmesi mümkün değil.

Aynı mantık formda da var: gelen talep **önce panele kaydedilir**, sonra e-posta gönderilir. E-posta servisi çökse bile talep kaybolmaz.

---

## Bilinmesi gerekenler

**Ücretsiz paket sınırları.** 2 kullanıcı, 10.000 doküman, ayda 100.000 API isteği. Sizin kullanımınızda bunlara yaklaşmanız beklenmiyor.

**Panel arayüzü 1,75 MB.** Sadece `/studio` adresine girdiğinizde iner. Siteyi ziyaret edenler bu dosyayı hiç indirmez; genel sayfalar 103 kB'de kaldı.

**KVKK metni güncellendi.** Talepler artık bir hizmet sağlayıcıda saklandığı için, KVKK ve Gizlilik sayfalarındaki "üçüncü taraflarla paylaşılmaz" ifadesi düzeltildi. Yeni metin, e-posta ve kayıt altyapısının veri işleyen sıfatıyla görev aldığını ve sunucuların yurt dışında olabileceğini belirtiyor. Yayına almadan önce bir hukuk danışmanına okutmanız yerinde olur.

**Silme talebi geldiğinde.** Bir kişi verisinin silinmesini isterse, panelde ilgili talebi bulup silmeniz yeterli. Bu KVKK'nın 11. maddesindeki hakkı.
