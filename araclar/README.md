# Araç Kutusu

Derleme/kurulum gerektirmeyen, saf HTML + CSS + JavaScript ile yazılmış,
reklam/abonelik gelirine yönelik çok sayfalı bir "faydalı araçlar" sitesi.
Her araç kendi klasöründe, kendi URL'sinde ve kendi SEO başlığı/açıklamasıyla
yaşar — Google'da her biri ayrı bir arama sonucu olarak indekslenebilir.

Tüm hesaplamalar **tarayıcıda** yapılır; hiçbir veri bir sunucuya
gönderilmez (KDV/kredi hesaplamaları, girilen metinler, oluşturulan
şifreler dahil).

## Mevcut araçlar

| Araç | Klasör | Ne işe yarar |
|---|---|---|
| KDV Hesaplama | `kdv-hesaplama/` | KDV dahil/hariç tutar hesaplama |
| Kredi Taksit Hesaplama | `kredi-hesaplama/` | Anüite formülüyle aylık taksit/toplam faiz |
| Birim Çevirici | `birim-cevirici/` | Uzunluk, ağırlık, sıcaklık çevirimi |
| Yaş Hesaplama | `yas-hesaplama/` | Doğum tarihinden tam yaş + gün sayısı |
| Şifre Oluşturucu | `sifre-olusturucu/` | `crypto.getRandomValues` ile güvenli şifre |
| Metin / Kelime Sayacı | `metin-sayaci/` | Karakter/kelime/cümle sayımı, büyük-küçük harf |
| QR Kod Oluşturucu | `qr-kod-olusturucu/` | Link/metinden QR kod, PNG indirme |

`qr-kod-olusturucu/qrcode.min.js`, [davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs)
kütüphanesinin yerel bir kopyasıdır — CDN'e bağımlılığı ve olası
kesinti/engelleme riskini azaltmak için depoya gömülüdür.

## Yasal / kurumsal sayfalar

`gizlilik-politikasi/`, `kullanim-sartlari/` ve `iletisim/` sayfaları
eklendi — bunlar sadece "iyi olsun" diye değil, **Google AdSense'in bir
siteyi onaylaması için gizlilik politikası sayfası zorunlu tuttuğu** için
var. `404.html`, Vercel tarafından otomatik özel 404 sayfası olarak
kullanılır.

⚠️ **Deploy'dan önce mutlaka güncelleyin:** `iletisim/index.html` içindeki
`iletisim@sizin-domaininiz.com` placeholder'ını kendi gerçek e-postanızla
değiştirin.

## Yerelde çalıştırma

```bash
cd araclar
python3 -m http.server 8080
# tarayıcıda http://localhost:8080 aç
```

## Vercel'e deploy

`pwa/` ve `pacman/` gibi ayrı bir Vercel projesi olarak bağlayın:

1. Vercel'de "New Project" → bu repo'yu seçin.
2. **Root Directory**: `araclar`
3. **Framework Preset**: Other (build komutu yok).

## Yeni bir araç eklemek

1. `araclar/<yeni-arac-slug>/` klasörü açın, mevcut bir araçtaki
   `index.html` + `script.js` çiftini şablon olarak kopyalayın.
2. `<title>`, meta description, `og:title/description` ve JSON-LD'yi
   yeni araca göre güncelleyin.
3. Her sayfanın altındaki "Diğer araçlar" şeridine yeni aracı ekleyin
   (7 dosyada tekrarlanan basit bir liste — build adımı olmadığı için
   elle senkron tutulur).
4. `araclar/index.html`'deki `tool-grid`e yeni bir kart ekleyin.

## Deploy sonrası yapılacaklar

- **`sitemap.xml`'deki `https://sizin-domaininiz.com` yer tutucusunu**
  gerçek domain'inizle değiştirin, sonra Google Search Console'a hem
  domain'i hem `sitemap.xml`'i ekleyin (`robots.txt` zaten sitemap'e
  işaret ediyor).
- Facebook Sharing Debugger ile `og-image.png`'in gerçek domain'de
  doğru göründüğünü kontrol edin.

## Fikirler / sonraki adımlar

- Google AdSense entegrasyonu (organik trafik oluşmaya başlayınca).
- PDF birleştirme/bölme (ör. `pdf-lib` ile, tamamen istemci tarafında).
