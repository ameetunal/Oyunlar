# Osmanlı — Bir İmparatorluğun Hikâyesi

Osmanlı tarihini kuruluşundan (1299) yıkılışına (1922) kadar, kitap ve
belgesel tadında, doğrusal bir anlatımla sunan bir React uygulaması.
Puan, seviye veya rekabet gibi oyunlaştırma öğeleri yoktur; içerik
dönemlere ve dönüm noktası olaylara ayrılmış sayfalar hâlinde okunur.

## İçerik

- 5 tarihsel dönem: Kuruluş, Yükselme, Duraklama, Gerileme, Dağılma
- Her dönem için bir "bölüm açılışı" ve döneme ait önemli olaylar
- Sayfa çevirir gibi önceki/sonraki gezinme ve tıklanabilir içindekiler
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
