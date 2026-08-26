# Osmanlı — Bir İmparatorluğun Hikâyesi

Osmanlı tarihini kuruluşundan (1299) yıkılışına (1922) kadar, kitap ve
belgesel tadında, doğrusal bir anlatımla sunan bir React uygulaması.
Puan, seviye veya rekabet gibi oyunlaştırma öğeleri yoktur; içerik
dönemlere ve dönüm noktası olaylara ayrılmış sayfalar hâlinde okunur.

## İçerik

- 5 tarihsel dönem: Kuruluş, Yükselme, Duraklama, Gerileme, Dağılma
  (toplam 65 dönüm noktası olay, çok paragraflı belgesel anlatımıyla)
- İki referans eki: Padişahlar Listesi (36 padişah) ve Terimler Sözlüğü
- Tıklanabilir görsel zaman şeridi ile dönemler arasında hızlı gezinme
- Sayfa çevirir gibi önceki/sonraki gezinme, tıklanabilir içindekiler,
  klavye oklarıyla ve mobilde parmak kaydırmasıyla sayfa çevirme
- Gece modu, ayarlanabilir yazı boyutu ve "kaldığınız sayfadan devam
  edin" hatırlatıcısı (tercihler tarayıcıda `localStorage` ile saklanır)
- Sayfa başına tahmini okuma süresi ve genel okuma ilerleme çubuğu
- PWA manifest'i sayesinde telefonda ana ekrana eklenebilir
- Servis çalışanı (`public/sw.js`) ile tamamen çevrimdışı çalışır —
  ilk açılıştan sonra internet olmadan da tüm kitap okunabilir
- Google AdSense entegrasyonuna hazır reklam alanları
  (`src/components/AdSlot.jsx`) — kimlik bilgileri girilmeden yer
  tutucu kutu gösterir, girildiğinde otomatik olarak gerçek reklamlara
  geçer

## Geliştirme

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # üretim derlemesi
npm run lint      # oxlint
```

## Reklamı Etkinleştirme (Google AdSense)

Reklam alanları kodda tamamen hazır; yalnızca AdSense hesap bilgilerini
girmeniz yeterli. Adımlar:

1. **AdSense hesabı açın:** [adsense.google.com](https://adsense.google.com)
   adresinden Google hesabınızla başvurun. Site sahipliğini
   doğrulamanız ve (genellikle) sitenin canlıda erişilebilir olması
   gerekir — bu yüzden ilk yayına "reklamsız" almak da bir seçenektir;
   onay sonrası bu adımları uygulayıp güncellersiniz.
2. **Onay bekleyin:** İnceleme birkaç günden birkaç haftaya sürebilir.
   Reddedilirse Google nedenini e-postayla bildirir (genelde içerik
   yetersizliği veya site erişilebilirliği ile ilgili olur).
3. **Reklam birimleri oluşturun:** Onaydan sonra AdSense panelinde
   "Reklamlar" → "Reklam birimi oluştur" ile üç adet reklam birimi
   açın (banner, kenar çubuğu, metin içi — hepsi "Görüntülü reklam"
   olarak "duyarlı" boyutta olabilir).
4. **Kimlikleri girin:** Proje kökünde `.env.example` dosyasını
   `.env` olarak kopyalayıp içindeki dört değeri
   (`VITE_ADSENSE_CLIENT_ID` ve üç `VITE_ADSENSE_SLOT_*`) AdSense
   panelinden aldığınız gerçek değerlerle doldurun. `.env` dosyası
   git'e eklenmez (`.gitignore`'da hariç tutulmuştur).
5. **ads.txt'yi etkinleştirin:** `public/ads.txt` dosyasındaki örnek
   satırın başındaki `#` işaretini kaldırıp `pub-XXXXXXXXXXXXXXXX`
   kısmını kendi yayıncı numaranızla değiştirin. Bu dosya olmadan
   AdSense geliri tam olarak etkinleşmeyebilir.
6. **Yeniden derleyip yayınlayın:** `npm run build` — bu noktadan
   sonra yer tutucu kutular otomatik olarak gerçek reklamlara döner,
   kodda başka bir değişiklik gerekmez.

Not: AdSense politikaları kendi sitenizde reklamlara tıklamayı veya
başkalarını tıklamaya teşvik etmeyi yasaklar; bu, hesabın kalıcı
olarak kapatılmasına yol açabilir.

## İçeriği genişletmek

Tüm dönem ve olay verileri `src/data/periods.js` içinde düz bir JS
dizisi olarak tutulur; yeni bir olay eklemek için ilgili dönemin
`events` dizisine `{ year, title, text }` biçiminde bir kayıt eklemek
yeterlidir.
