# Nokta Avcısı (Pac-Man tarzı oyun)

Derleme/kurulum gerektirmeyen, saf HTML + CSS + JavaScript ile yazılmış,
klasik Pac-Man'den esinlenilmiş tek sayfalık bir tarayıcı oyunu.

- Labirent, oyunun içinde (`buildMaze()`) üretilir — sabit satır/sütun
  düzeninde "sütun" hücreleri duvar, aralarındaki tüm hücreler koridordur,
  böylece her noktaya ulaşılabildiği garanti edilir.
- 4 hayalet, oyuncuya doğru açgözlü (greedy) yönlenerek kovalar; güç topu
  yenince mavi/korkmuş moda geçip kaçarlar ve yenilebilir olurlar.
- Neon/glow görsel stil, HiDPI (retina) net render, parçacık efektleri,
  uçan skor yazıları, can kaybında ekran sarsıntısı.
- Sonsuz bölüm sistemi: tüm noktalar toplanınca oyun bitmez, bir sonraki
  bölüme geçilir ve hayalet hızı kademeli artar (tekrar oynanabilirlik).
- Skor, can, sol-sağ tünel, yerel rekor (`localStorage`), "Yeni Rekor!"
  kutlaması, kazanma/kaybetme ekranları.
- Zengin WebAudio ses efektleri (dosya gerekmez) + sesi aç/kapat düğmesi.
- Duraklat düğmesi + `P`/`Esc` kısayolu; sekme arka plana alınınca otomatik
  duraklar.
- Klavye (ok tuşları / WASD), dokunmatik d-pad ve kaydırma (swipe) ile
  oynanır — mobil uyumludur.
- **Kurulabilir PWA**: `manifest.json` + service worker (`sw.js`) sayesinde
  telefonda "Ana Ekrana Ekle" ile kurulabilir ve internet olmadan da
  oynanabilir (ilk açılıştan sonra dosyalar önbelleğe alınır).
- WhatsApp/Twitter/Facebook'ta paylaşılınca kart görünmesi için Open
  Graph/Twitter meta etiketleri ve `og-image.png` kapak görseli.

## Yerelde çalıştırma

Herhangi bir statik dosya sunucusu yeterli, build adımı yok:

```bash
cd pacman
python3 -m http.server 8080
# tarayıcıda http://localhost:8080 aç
```

ya da doğrudan `index.html`'i tarayıcıda açmak da çoğu durumda çalışır
(service worker/manifest için `http://` veya `https://` üzerinden açmak
gerekir — `file://` üzerinde bu ikisi devre dışı kalır ama oyun yine
oynanır).

## Vercel'e deploy

Bu klasörü `pwa/` gibi ayrı bir Vercel projesi olarak bağlayın:

1. Vercel'de "New Project" → bu repo'yu seçin.
2. **Root Directory**: `pacman`
3. **Framework Preset**: Other (build komutu yok, sadece statik dosyalar).

Deploy sonrası gerçek adresle `og-image.png`'in WhatsApp/Twitter'da doğru
göründüğünü kontrol etmek isterseniz, adresi
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
gibi bir araca yapıştırabilirsiniz (Facebook/Meta bağlantısı olduğu için
istisnai olarak burada anılıyor, oyunun kendisiyle ilgisi yok).

## İkon/kapak görselini değiştirme

`pacman/icons/*.png` ve `pacman/og-image.png`, Playwright ile bir canvas
çiziminden otomatik üretildi (repoda kaynak dosyası yok — düz PNG'dir).
Tasarımı değiştirmek isterseniz görselleri doğrudan kendi logonuzla
değiştirmeniz yeterli; boyutları koruyun (192×192, 512×512, 180×180,
1200×630).

## Fikirler / sonraki adımlar

- Zorluk seviyeleri için ayrı labirent düzenleri (şu an tek düzen,
  sadece hız artıyor).
- Google AdSense ile reklam entegrasyonu (siteye trafik gelmeye başlayınca).
- Skor tablosu / paylaşım (küçük bir API + veritabanı gerekir).
- Farklı temalar (renk paleti değişimi, karakter derileri).
