# pwa

Üretim ağının **dışında**, internete açık bir yerde barınan bildirim + yönetim
paneli. Telefonlar buraya bağlanır; üretim SQL Server'ına hiçbir zaman
doğrudan erişmez.

## Kurulum

```bash
cd pwa
npm install
cp .env.example .env
```

### 1. Veritabanı (Postgres)

Kullanıcı, cihaz aboneliği ve bildirim kurallarının tutulduğu küçük bir
Postgres veritabanı gerekir (üretim verisiyle **hiçbir ilgisi yoktur**).
Ücretsiz seçenekler: [Neon](https://neon.tech), [Supabase](https://supabase.com),
Vercel Postgres. `DATABASE_URL`'i `.env` içine yazın, sonra:

```bash
npx prisma migrate dev --name init
```

### 2. VAPID anahtarları (Web Push için)

```bash
npx web-push generate-vapid-keys
```

Çıkan `Public Key` ve `Private Key` değerlerini `.env` içindeki
`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` ve `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
(public key ile aynı) alanlarına yazın.

### 3. Şifre ve API anahtarı

- `ADMIN_PASSWORD`: `/admin` paneline giriş şifresi.
- `HABERCI_API_KEY`: Uzun, rastgele bir değer üretin (ör. `openssl rand -hex 32`).
  Bu değeri `haberci-servis/.env` içindeki `PWA_API_KEY` ile **birebir aynı**
  yapın — iki servis arasındaki tek kimlik doğrulama budur.

### 4. Simge dosyaları

`public/icons/icon-192.png` ve `public/icons/icon-512.png` dosyalarını
şirket logonuzla oluşturup ekleyin (PWA kurulabilirliği ve bildirim simgesi
için gereklidir — bu depoda yer tutucu olarak eklenmemiştir).

## Kendi subdomain'inizde yayınlama

Örneğin `bildirim.sirketiniz.com` altında yayınlamak için:

1. Bu `pwa/` klasörünü bir Node.js barındırma ortamına deploy edin (Vercel,
   Render, kendi VPS'iniz — Next.js'i destekleyen herhangi bir yer olur).
2. Barındırma sağlayıcınızda ortam değişkenlerini (`.env` içindekiler) girin.
3. Sağlayıcının verdiği adresi kendi subdomain'inize
   (`bildirim.sirketiniz.com`) bir CNAME/A kaydıyla yönlendirin.
4. `haberci-servis/.env` içindeki `PWA_NOTIFY_URL`'i bu adrese göre güncelleyin
   (`https://bildirim.sirketiniz.com/api/notify`).

PWA push bildirimleri **HTTPS zorunlu kılar** — barındırma sağlayıcınızın
otomatik SSL sertifikası sağladığından emin olun (Vercel/Render gibi
servisler bunu otomatik yapar).

## Geliştirme

```bash
npm run dev
```

## Kullanım akışı

1. `/admin` panelinden giriş yapın.
2. "Yeni Kişi Ekle" ile kalite çalışanı / bölüm şefi / yönetici ekleyin.
3. Her kişi için hangi olay türü + hangi tezgahın bildirimini alacağını
   "Bildirim Kuralları" bölümünden tanımlayın (tezgah boş bırakılırsa tüm
   tezgahlar kapsanır).
4. Kişinin kartındaki **kişisel bağlantıyı** kopyalayıp kendisine gönderin.
5. Kişi bu linki telefonunda açar, "Bildirimleri Aç" der, isterse ana ekrana
   ekler — bundan sonra sadece kendisine atanan bildirimleri alır.
