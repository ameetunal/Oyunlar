# Üretim Takip — Bildirim Sistemi

ERMAK Üretim Takip Sistemi'ne (kapalı devre üretim ağı) dokunmadan, kişi/rol ve
tezgah bazlı **tek yönlü** telefon bildirimleri gönderen sistem.

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

1. Üretim veritabanına bağlanan kullanıcı **sadece SELECT** yetkisine sahiptir
   (bkz. `haberci-servis/sql/create-readonly-user.sql`).
2. `haberci-servis` **hiçbir portu dinlemez** — yalnızca dışarıya HTTPS isteği
   atar. Üretim ağı seviyesinde de bu makine için sadece **outbound 443**
   trafiğine izin verecek şekilde firewall kuralı eklenmesi önerilir.
3. Dışarı giden veri asgari düzeydedir: sadece kısa bir bildirim metni (iş
   kodu, olay türü, tezgah adı). Ham üretim/parça verisi dışarı çıkmaz.
4. Haberci servis ile PWA arasındaki her istek bir **paylaşılan API anahtarı**
   (`HABERCI_API_KEY`) ile doğrulanır.

## Kurulum sırası

1. `pwa/` klasörünü kendi subdomain'inizin altında yayınlayın (bkz.
   `pwa/README.md`).
2. `haberci-servis/sql/create-readonly-user.sql` scriptini üretim SQL
   Server'ında (`ERMAK_URETIM` veritabanı) çalıştırıp salt-okunur bir
   kullanıcı oluşturun.
3. `haberci-servis/`'i üretim ağındaki bir bilgisayarda (internete çıkışı
   olmasa da yerel ağdaki SQL Server'a erişebilen) arka planda çalıştırın
   (bkz. `haberci-servis/README.md`).
4. Yönetim panelinden (`/admin`) kullanıcıları ekleyin, her kullanıcıya
   hangi tezgah + olay türünün bildirimini alacağını atayın, kendilerine
   kişisel bağlantı linkini gönderin.

Detaylar için `haberci-servis/README.md` ve `pwa/README.md` dosyalarına bakın.

## Kurulum durumu

- [x] Salt-okunur SQL Server kullanıcısı (`haberci_readonly`) oluşturuldu
- [x] Postgres veritabanı (Neon) oluşturuldu, tablolar kuruldu
- [x] PWA, Vercel'e bağlandı (Root Directory: `pwa`)
- [ ] Vercel ortam değişkenleri girildi
- [ ] `haberci-servis`, üretim ağındaki bir makinede çalıştırılıyor
- [ ] Alt domain (`bildirim.uretimermak.com`) bağlandı
