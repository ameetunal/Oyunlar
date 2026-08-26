// Google AdSense yapılandırması. Değerler ortam değişkenlerinden okunur;
// hiçbiri tanımlı değilse AdSlot bileşeni yer tutucu ("REKLAM") kutusunu
// göstermeye devam eder — yani bu dosya boş bırakılsa da uygulama bozulmaz.
//
// Etkinleştirmek için proje kökünde bir .env dosyası oluşturup şunları
// doldurun (bkz. .env.example ve README "Reklamı Etkinleştirme" bölümü):
//   VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
//   VITE_ADSENSE_SLOT_BANNER=XXXXXXXXXX
//   VITE_ADSENSE_SLOT_SIDEBAR=XXXXXXXXXX
//   VITE_ADSENSE_SLOT_INLINE=XXXXXXXXXX
export const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID || null;

export const AD_SLOTS = {
  banner: import.meta.env.VITE_ADSENSE_SLOT_BANNER || null,
  sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR || null,
  inline: import.meta.env.VITE_ADSENSE_SLOT_INLINE || null,
};

export const adsEnabled = Boolean(ADSENSE_CLIENT_ID);
