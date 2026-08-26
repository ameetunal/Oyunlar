# Osmanlı — Bir İmparatorluğun Hikâyesi

Osmanlı tarihini kuruluşundan (1299) yıkılışına (1922) kadar, kitap ve
belgesel tadında, doğrusal bir anlatımla sunan bir React uygulaması.
Puan, seviye veya rekabet gibi oyunlaştırma öğeleri yoktur; içerik
dönemlere ve dönüm noktası olaylara ayrılmış sayfalar hâlinde okunur.

## İçerik

- 5 tarihsel dönem: Kuruluş, Yükselme, Duraklama, Gerileme, Dağılma
  (toplam 65 dönüm noktası olay, çok paragraflı belgesel anlatımıyla)
- İki referans eki: Padişahlar Listesi (36 padişah) ve Terimler Sözlüğü
- Sayfa çevirir gibi önceki/sonraki gezinme, tıklanabilir içindekiler,
  klavye oklarıyla ve mobilde parmak kaydırmasıyla sayfa çevirme
- Gece modu, ayarlanabilir yazı boyutu ve "kaldığınız sayfadan devam
  edin" hatırlatıcısı (tercihler tarayıcıda `localStorage` ile saklanır)
- Sayfa başına tahmini okuma süresi ve genel okuma ilerleme çubuğu
- PWA manifest'i sayesinde telefonda ana ekrana eklenebilir
- Servis çalışanı (`public/sw.js`) ile tamamen çevrimdışı çalışır —
  ilk açılıştan sonra internet olmadan da tüm kitap okunabilir
- Reklamla gelir modeline hazır, şimdilik yer tutucu reklam alanları
  (`src/components/AdSlot.jsx`) — gerçek ağ (ör. AdSense) onayı
  alındığında buraya entegre edilecek

## Geliştirme

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # üretim derlemesi
npm run lint      # oxlint
```

## İçeriği genişletmek

Tüm dönem ve olay verileri `src/data/periods.js` içinde düz bir JS
dizisi olarak tutulur; yeni bir olay eklemek için ilgili dönemin
`events` dizisine `{ year, title, text }` biçiminde bir kayıt eklemek
yeterlidir.
