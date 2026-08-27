# Üretim Takip — Bildirim Sistemi

Üretim takip sistemine (kapalı devre üretim ağı) dokunmadan, kişi/rol ve
tezgah bazlı **tek yönlü** telefon bildirimleri gönderen sistem.

Artık **çok kiracılı (multi-tenant) bir SaaS** olarak çalışıyor: `pwa/`
hem ERMAK için kurulan orijinal kurulumu hem de `/signup` üzerinden kayıt
olan yeni müşteri firmaları aynı anda, birbirinden izole şekilde
barındırabiliyor (bkz. `pwa/README.md`). Pazarlama/kayıt sayfası ana
domain'de (`/`), yönetim paneli `/admin`'de, faturalandırma `/admin/billing`'de.

## Mimari

```
[ Üretim ağı — internete KAPALI ]                [ İnternet ]
┌────────────────────────────┐                   ┌─────────────────────┐
│  SQL Server (ERMAK verisi)  │                   │   PWA + API          │
│         ▲ salt-okunur       │                   │  (kendi domain'iniz  │
│         │ (SELECT only)     │   HTTPS, tek      │   altında bir alt-   │
│  ┌──────┴───────────────┐   │   yönlü, giden ───►│   domain'de barınır) │
│  │   haberci-servis/     │───┼──────────────────►│  - kullanıcı/rol     │
│  │  (bu makinede çalışır) │   │   sadece bildirim  │  - routing kuralları │
│  └────────────────────────┘   │   isteği            │  - push gönderimi    │
│  Hiçbir gelen bağlantı        │                   └──────────┬───────────┘
│  KABUL ETMEZ (inbound yok)    │                              │ Web Push
└────────────────────────────┘                              ▼
                                                        📱 Telefonlar
```

- **haberci-servis/**: Üretim ağı içinde çalışan Node.js servisi. SQL Server'a
  **salt-okunur** bağlanır, ERMAK'ın kendi `dbo.BILDIRIM_LOG` tablosunu (yeni
  iş, tezgah duruşu, kalite kararı, uzun süredir çözülmemiş iş, vb. için
  ERMAK'ın zaten ürettiği bildirim kayıtları) periyodik izler ve yeni
  satırları **sadece dışarı, tek yönlü** olarak PWA'nın bildirim API'sine
  iletir. Hiçbir gelen bağlantı kabul etmez — üretim ağına internetten
  ulaşılabilecek hiçbir kapı açılmaz.
- **pwa/**: Üretim ağının dışında, internete açık, ayrı bir yerde barınan
  Next.js tabanlı PWA + yönetim paneli. Kimin hangi tezgahın/olay türünün
  bildirimini alacağını burada tanımlarsınız. Telefonlar buraya bağlanıp push
  bildirim alır.

## Güvenlik ilkeleri

1. Üretim veritabanına bağlanan kullanıcı **sadece `dbo.BILDIRIM_LOG`
   tablosunda SELECT** yetkisine sahiptir — veritabanındaki başka hiçbir
   tabloyu (parça, müşteri, kullanıcı, kalite kararı detayları vb.) okuyamaz
   (bkz. `haberci-servis/sql/create-readonly-user.sql`).
2. `haberci-servis` **hiçbir portu dinlemez** — yalnızca dışarıya HTTPS isteği
   atar. Üretim ağı seviyesinde de bu makine için sadece **outbound 443**
   trafiğine izin verecek şekilde firewall kuralı eklenmesi önerilir.
3. Dışarı giden veri asgari düzeydedir: sadece kısa bir bildirim metni (iş
   kodu, olay türü, tezgah adı). Ham üretim/parça verisi dışarı çıkmaz.
4. Haberci servis ile PWA arasındaki her istek, o firmaya özel gizli bir
   **API anahtarı** ile doğrulanır (`Tenant.apiKey`, `/admin` panelinden
   görüntülenir). Tek-kiracılı dönemden kalan ERMAK kurulumu için geriye
   dönük uyumluluk amacıyla paylaşımlı `HABERCI_API_KEY` de desteklenir.

## Kurulum sırası (yeni bir müşteri firma için)

1. `pwa/`'daki (zaten yayında olan) SaaS sitesinde `/signup`'tan hesap açın
   (14 gün ücretsiz deneme, bkz. `pwa/README.md`).
2. `haberci-servis/sql/create-readonly-user.sql` scriptini kendi üretim SQL
   Server'ınızda çalıştırıp salt-okunur bir kullanıcı oluşturun.
3. `haberci-servis/`'i üretim ağınızdaki bir bilgisayarda (internete çıkışı
   olmasa da yerel ağdaki SQL Server'a erişebilen) arka planda çalıştırın;
   `/admin` panelindeki API anahtarını `.env`'e girin (bkz.
   `haberci-servis/README.md`).
4. Yönetim panelinden (`/admin`) kullanıcıları ekleyin, her kullanıcıya
   hangi tezgah + olay türünün bildirimini alacağını atayın, kendilerine
   kişisel bağlantı linkini gönderin.
5. Deneme süresi dolmadan `/admin/billing`'den abone olun.

Detaylar için `haberci-servis/README.md` ve `pwa/README.md` dosyalarına bakın.

## Kurulum durumu

- [x] Salt-okunur SQL Server kullanıcısı (`haberci_readonly`) oluşturuldu
- [x] Postgres veritabanı (Neon) oluşturuldu, tablolar kuruldu
- [x] PWA, Vercel'e bağlandı (Root Directory: `pwa`, Framework Preset: Next.js)
- [x] Vercel ortam değişkenleri girildi
- [x] PWA canlıda çalışıyor (oyunlar-psi.vercel.app)
- [x] Çok kiracılı (multi-tenant) SaaS'a geçildi: `/signup`, `/admin/billing`,
      Neon/Vercel tarzı pazarlama sayfası (`/`)
- [ ] Alt domain (`bildirim.uretimermak.com`) bağlandı
- [ ] `haberci-servis`, üretim ağındaki bir makinede çalıştırılıyor
- [ ] `/admin` panelinden ilk kullanıcı eklenip test bildirimi gönderildi
- [ ] ERMAK hesabı `scripts/set-tenant-credentials.js` ile e-posta/şifreye
      geçirildi (bkz. `pwa/README.md` — "Tek-kiracılı dönemden geçiş")
- [ ] Stripe hesabı açılıp `STRIPE_SECRET_KEY` / `STRIPE_PRICE_ID` /
      `STRIPE_WEBHOOK_SECRET` girildi
