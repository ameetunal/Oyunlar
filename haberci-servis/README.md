# haberci-servis

Üretim ağı içinde çalışan, SQL Server'daki `dbo.BILDIRIM_LOG` tablosunu
**salt-okunur** izleyen ve yeni satırları PWA'nın bildirim API'sine **tek
yönlü** ileten servis.

## Neden BILDIRIM_LOG?

ERMAK Üretim Takip Sistemi zaten her önemli olayda (yeni iş, tezgah duruşu,
kalite kararı, uzun süredir çözülmemiş iş, unutulan iş, sipariş değişikliği,
Andon çağrısı, ...) bu tabloya kendi ürettiği başlık/mesaj metniyle bir satır
ekliyor. Biz olayı yeniden tahmin etmek yerine, ERMAK'ın zaten ürettiği bu
kaydı okuyup dışarı iletiyoruz — hem daha sağlam hem de sistemin geri kalanıyla
birebir tutarlı.

`dbo.BILDIRIM_LOG` kolonları: `ID, TARIH, TIP, BASLIK, MESAJ, URL`

- `TIP`: olay türü (örn. `YENI_IS`, `TEZGAH_DURUS`, `KALITE_BITIS_ONAY`,
  `KALITE_BITIS_RED`, `ESKALASYON`, `UNUTULAN_IS`, `ARA_KONTROL_ONAY`,
  `ARA_KONTROL_RED`, `ROTA_SONRAKI`, `SIPARIS_DEGISTI`, `ANDON_AC`, `DUYURU`,
  `YENI_TALEP`, ...). Bu liste zamanla değişebilir; PWA yönetim panelinde
  kural eklerken bilinen tiplerden seçebilir ya da elle yeni bir tip
  yazabilirsiniz.
- `URL`: çoğu kayıtta tezgah adını `?makine=ARION-1` şeklinde içerir.
  İş bazlı kayıtlarda (`UNUTULAN_IS`, `ESKALASYON`) `?is=<id>` kullanılır; bu
  durumda tezgah adı `MESAJ` metninden ("... – DV-15 tezgahı ...")
  ayıklanmaya çalışılır (bkz. `src/detectors/bildirimLog.ts`).

## Önemli: Bu servis hiçbir gelen bağlantı kabul etmez

Bu servis bir sunucu (server) değildir — hiçbir port açmaz, hiçbir isteği
dinlemez. Sadece periyodik olarak `BILDIRIM_LOG`'u okur ve dışarıya (PWA'nın
`/api/notify` uç noktasına) HTTPS isteği atar. Üretim ağı seviyesinde bu
makine için firewall'da yalnızca **outbound 443** trafiğine izin verilmesi
önerilir; hiçbir inbound kural gerekmez.

## Kurulum

```bash
cd haberci-servis
npm install
cp .env.example .env      # değerleri kendi ortamınıza göre doldurun
```

`.env` içinde doldurmanız gerekenler:

- `MSSQL_*`: `sql/create-readonly-user.sql` ile oluşturduğunuz salt-okunur
  kullanıcının bağlantı bilgileri (veritabanı adı: `ERMAK_URETIM`).
- `PWA_NOTIFY_URL`: PWA'nızın yayınlandığı adres + `/api/notify`
  (örn. `https://bildirim.sizin-domaininiz.com/api/notify`).
- `PWA_API_KEY`: PWA tarafındaki `HABERCI_API_KEY` ile **birebir aynı** olmalı
  (rastgele, uzun bir değer üretin — bu iki servis arasındaki tek kimlik
  doğrulamadır).

## Çalıştırma

```bash
npm run dev     # geliştirme (canlı yeniden başlatma ile)
npm run build   # derleme
npm start       # derlenmiş halini çalıştırma
```

## Üretimde sürekli çalıştırma

Bu servisin makine yeniden başlasa da ayakta kalması gerekir. Örnekler:

**Windows (NSSM ile servis olarak):**
```powershell
nssm install HaberciServis "C:\Program Files\nodejs\node.exe" "C:\haberci-servis\dist\index.js"
nssm set HaberciServis AppDirectory "C:\haberci-servis"
nssm start HaberciServis
```

**Linux (systemd):**
```ini
# /etc/systemd/system/haberci-servis.service
[Unit]
Description=Haberci Servis
After=network.target

[Service]
WorkingDirectory=/opt/haberci-servis
ExecStart=/usr/bin/node dist/index.js
Restart=always
EnvironmentFile=/opt/haberci-servis/.env

[Install]
WantedBy=multi-user.target
```

`state.json` dosyasının bu makinede kalıcı bir yerde durduğundan emin olun —
silinirse servis kaldığı yeri unutur ve eski bildirimleri tekrar gönderebilir.
