# Nokta Avcısı (Pac-Man tarzı oyun)

Derleme/kurulum gerektirmeyen, saf HTML + CSS + JavaScript ile yazılmış,
klasik Pac-Man'den esinlenilmiş tek sayfalık bir tarayıcı oyunu.

- Labirent, oyunun içinde (`buildMaze()`) üretilir — sabit satır/sütun
  düzeninde "sütun" hücreleri duvar, aralarındaki tüm hücreler koridordur,
  böylece her noktaya ulaşılabildiği garanti edilir.
- 4 hayalet, oyuncuya doğru açgözlü (greedy) yönlenerek kovalar; güç topu
  yenince mavi/korkmuş moda geçip kaçarlar ve yenilebilir olurlar.
- Skor, can, sol-sağ tünel, yerel rekor (`localStorage`) ve
  kazanma/kaybetme ekranları var.
- Klavye (ok tuşları / WASD), dokunmatik d-pad ve kaydırma (swipe) ile
  oynanır — mobil uyumludur.

## Yerelde çalıştırma

Herhangi bir statik dosya sunucusu yeterli, build adımı yok:

```bash
cd pacman
python3 -m http.server 8080
# tarayıcıda http://localhost:8080 aç
```

ya da doğrudan `index.html`'i tarayıcıda açmak da çoğu durumda çalışır.

## Vercel'e deploy

Bu klasörü `pwa/` gibi ayrı bir Vercel projesi olarak bağlayın:

1. Vercel'de "New Project" → bu repo'yu seçin.
2. **Root Directory**: `pacman`
3. **Framework Preset**: Other (build komutu yok, sadece statik dosyalar).

## Fikirler / sonraki adımlar

- Zorluk seviyeleri (her tur hayalet hızını artırmak).
- Google AdSense ile reklam entegrasyonu (siteye trafik gelmeye başlayınca).
- Skor tablosu / paylaşım (küçük bir API + veritabanı gerekir).
- Farklı labirent düzenleri, temalar (renk paleti değişimi).
