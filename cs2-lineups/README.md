# CS2 Lineup Rehberi

CS2 haritaları için smoke / flash / peek pozisyonlarını tek yerde toplayan,
video destekli bir rehber sitesi. İlk sürüm Mirage haritasıyla başlıyor.

## Geliştirme

```bash
npm install
npm run dev
```

`http://localhost:3000` üzerinden aç, `/mirage` sayfasına git.

## Yapı

- `src/data/mirage-lineups.ts` — her lineup için bölge, kategori (Smoke /
  Flash / Molotov / Peek), taraf (T/CT), atış tekniği ve nişan açıklaması.
  `videoId` alanı boşsa kart "video yakında eklenecek" gösterir; YouTube
  video id'si eklendiğinde otomatik embed olur.
- `src/components/LineupCard.tsx` — tek bir lineup kartı (video + açıklama).
- `src/components/FilterBar.tsx` — bölge / kategori / taraf filtresi.
- `src/components/AdSlot.tsx` — reklam alanı placeholder'ı (AdSense onayı
  alındığında gerçek script buraya eklenecek).

## Yol haritası

- [ ] Mirage videolarını çek/yükle, `videoId` alanlarını doldur
- [ ] Diğer haritalar (Dust II, Inferno, Ancient, ...)
- [ ] Kullanıcıların kendi lineup'ını gönderebildiği bir form (şimdilik yok —
  veri tabanı + moderasyon gerektirir)
- [ ] Google AdSense onayı ve gerçek reklam entegrasyonu
- [ ] Gerçek harita görseli üzerine pin bazlı görünüm (Valve'ın radar
  görselini kullanmak telif açısından ayrı bir karar; şu an bölge bazlı
  kart listesi kullanılıyor)

## Not

Bu proje, deponun geri kalanındaki üretim takip sistemiyle (haberci-servis /
pwa) ilgisizdir — aynı depo altında ayrı bir yan proje olarak tutuluyor.
