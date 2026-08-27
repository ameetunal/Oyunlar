# haberci-servis

Üretim ağı içinde çalışan, SQL Server'ı **salt-okunur** izleyen ve yeni
olayları PWA'nın bildirim API'sine **tek yönlü** ileten servis.

## Önemli: Bu servis hiçbir gelen bağlantı kabul etmez

Bu servis bir sunucu (server) değildir — hiçbir port açmaz, hiçbir isteği
dinlemez. Sadece periyodik olarak SQL Server'ı okur ve dışarıya (PWA'nın
`/api/notify` uç noktasına) HTTPS isteği atar. Üretim ağı seviyesinde bu
makine için firewall'da yalnızca **outbound 443** trafiğine izin verilmesi
önerilir; hiçbir inbound kural gerekmez.

## Kurulum

```bash
cd haberci-servis
npm install
cp .env.example .env      # değerleri kendi ortamınıza göre doldurun
cp mapping.example.json mapping.json   # gerçek tablo/kolon isimlerinizi yazın
```

`.env` içinde doldurmanız gerekenler:

- `MSSQL_*`: `sql/create-readonly-user.sql` ile oluşturduğunuz salt-okunur
  kullanıcının bağlantı bilgileri.
- `MAPPING_FILE`: `mapping.json` dosyasının yolu.
- `PWA_NOTIFY_URL`: PWA'nızın yayınlandığı adres + `/api/notify`
  (örn. `https://bildirim.sizin-domaininiz.com/api/notify`).
- `PWA_API_KEY`: PWA tarafındaki `HABERCI_API_KEY` ile **birebir aynı** olmalı
  (rastgele, uzun bir değer üretin — bu iki servis arasındaki tek kimlik
  doğrulamadır).

## mapping.json neden gerekli?

Bu proje ERMAK'ın gerçek veritabanı şemasını bilmeden yazıldı — kılavuzlardan
yalnızca ekran görünümleri görüldü. `mapping.json`, sizin (IT olarak)
tablo/kolon isimlerinizi koddan bağımsız şekilde tanımlamanızı sağlar; SQL
sorguları bu dosyadaki isimleri kullanır. Gerçek şemayla eşleştirdikten sonra
`src/detectors/*.ts` dosyalarındaki sorgu mantığını (örn. "TAMAMLANDI" durum
adı, kolon tipleri) kendi sisteminize göre küçük ayarlamalarla
doğrulamanız gerekebilir.

## Çalıştırma

```bash
npm run dev     # geliştirme (canlı yeniden başlatma ile)
npm run build   # derleme
npm start       # derlenmiş halini çalıştırma
```

## Üretimde sürekli çalıştırma

Bu servisin makine yeniden başlasa da ayakta kalması gerekir. Örnekler:

**Windows (Görev Zamanlayıcı / NSSM ile servis olarak):**
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
silinirse servis kaldığı yeri unutur ve eski olayları tekrar bildirebilir.
