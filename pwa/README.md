# pwa

Üretim ağının **dışında**, internete açık bir yerde barınan, **çok kiracılı
(multi-tenant) SaaS** bildirim + yönetim paneli. Her firma kendi hesabını
`/signup` üzerinden açar; kendi kullanıcılarını, bildirim kurallarını ve
gizli API anahtarını yönetir. Telefonlar buraya bağlanır; üretim SQL
Server'ına hiçbir zaman doğrudan erişmez.

## Mimari özeti

- **`Tenant`**: bir müşteri firma. Kendi e-posta/şifresi, kendi `apiKey`'i
  (haberci-servis bunu kullanır) ve kendi abonelik durumu (`trialing` /
  `active` / `past_due` / `canceled`) vardır.
- **`User`**: bir tenant'a bağlı, bildirim alacak kişi (eski şemadaki gibi).
- Tüm admin API'leri (`/api/users`, `/api/routing`) ve `/admin` sayfaları,
  oturumdaki tenant'a göre otomatik filtrelenir — bir firma başka bir
  firmanın verisini göremez.

## Kurulum

```bash
cd pwa
npm install
cp .env.example .env
```

### 1. Veritabanı (Postgres)

Ücretsiz seçenekler: [Neon](https://neon.tech), [Supabase](https://supabase.com),
Vercel Postgres. `DATABASE_URL`'i `.env` içine yazın, sonra:

```bash
npx prisma migrate deploy
```

### 2. Oturum anahtarı

`SESSION_SECRET`: uzun, rastgele bir değer üretin (ör. `openssl rand -hex 32`).
Oturum çerezleri bununla imzalanır.

### 3. VAPID anahtarları (Web Push için)

```bash
npx web-push generate-vapid-keys
```

Çıkan `Public Key` ve `Private Key` değerlerini `.env` içindeki
`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` ve `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
(public key ile aynı) alanlarına yazın.

### 4. Stripe (ücretli abonelik)

Kendi [Stripe](https://dashboard.stripe.com) hesabınızda:

1. Aylık bir ürün/fiyat (Price) oluşturun, `STRIPE_PRICE_ID`'ye yazın.
2. API anahtarınızı `STRIPE_SECRET_KEY`'e yazın.
3. `https://sizin-domaininiz.com/api/webhooks/stripe` adresine bir webhook
   endpoint'i ekleyin; dinlenecek olaylar: `checkout.session.completed`,
   `customer.subscription.created`, `customer.subscription.updated`,
   `customer.subscription.deleted`. İmza sırrını `STRIPE_WEBHOOK_SECRET`'e
   yazın.

Bu değerler girilmeden `/admin/billing`'deki "Abone Ol" butonu çalışmaz,
ama 14 günlük ücretsiz deneme yine de işler (Stripe olmadan da kayıt olup
paneli deneyebilirsiniz).

### 5. Simge dosyaları

`public/icons/icon-192.png` ve `public/icons/icon-512.png` dosyalarını
şirket logonuzla oluşturup ekleyin (PWA kurulabilirliği ve bildirim simgesi
için gereklidir — bu depoda yer tutucu olarak eklenmemiştir).

## Kendi domain'inizde yayınlama

1. Bu `pwa/` klasörünü bir Node.js barındırma ortamına deploy edin (Vercel,
   Render, kendi VPS'iniz — Next.js'i destekleyen herhangi bir yer olur).
2. Barındırma sağlayıcınızda ortam değişkenlerini (`.env` içindekiler) girin.
3. `NEXT_PUBLIC_APP_URL`'i yayındaki gerçek adresinize göre ayarlayın.

PWA push bildirimleri **HTTPS zorunlu kılar** — barındırma sağlayıcınızın
otomatik SSL sertifikası sağladığından emin olun (Vercel/Render gibi
servisler bunu otomatik yapar).

## Geliştirme

```bash
npm run dev
```

## Kullanım akışı (yeni bir müşteri firma için)

1. `/signup` üzerinden firma adı, e-posta ve şifre ile hesap açılır
   (14 gün ücretsiz deneme, kredi kartı gerekmez).
2. `/admin` panelindeki "haberci-servis Kurulumu" kartından `PWA_NOTIFY_URL`
   ve size özel `PWA_API_KEY` alınır, üretim ağındaki `haberci-servis/.env`
   dosyasına girilir.
3. "Yeni Kişi Ekle" ile kalite çalışanı / bölüm şefi / yönetici eklenir.
4. Her kişi için hangi olay türü + hangi tezgahın bildirimini alacağı
   "Bildirim Kuralları" bölümünden tanımlanır (tezgah boş bırakılırsa tüm
   tezgahlar kapsanır).
5. Kişinin kartındaki **kişisel bağlantı** kopyalanıp kendisine gönderilir.
6. Kişi bu linki telefonunda açar, "Bildirimleri Aç" der — bundan sonra
   sadece kendisine atanan bildirimleri alır.
7. Deneme süresi dolmadan `/admin/billing`'den abone olunur.

## Tek-kiracılı dönemden (ERMAK) geçiş

Bu proje başlangıçta tek firmalık (ERMAK) bir kurulumdu. Çok-kiracılı
migration'ı uyguladıktan sonra, o dönemden kalan kullanıcılar otomatik
olarak `legacy-tenant` adlı bir tenant'a bağlanır ve mevcut
`ADMIN_PASSWORD` / `HABERCI_API_KEY` ortam değişkenleriyle **kesintisiz**
çalışmaya devam eder. Yeni e-posta/şifre tabanlı girişe geçmek için (tek
seferlik):

```bash
DATABASE_URL=... node scripts/set-tenant-credentials.js sahibi@ermak.com yeni-sifre "ERMAK"
```

Bundan sonra `/admin/login`'den e-posta/şifre ile giriş yapılabilir;
`ADMIN_PASSWORD` ortam değişkeni istenirse kaldırılabilir (isteğe bağlı,
geriye dönük uyumluluk için kalması zarar vermez).
