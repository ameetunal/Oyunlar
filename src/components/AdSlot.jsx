import { useEffect, useRef } from 'react';
import { AD_SLOTS, ADSENSE_CLIENT_ID, adsEnabled } from '../config/ads';

// Reklam alanı. VITE_ADSENSE_CLIENT_ID ve ilgili slot ortam değişkenleri
// tanımlıysa gerçek bir AdSense reklam birimi render eder; tanımlı
// değilse (yerel geliştirme, onay öncesi) yer tutucu kutuyu gösterir.
// Bkz. src/config/ads.js ve README "Reklamı Etkinleştirme".
export default function AdSlot({ variant = 'inline' }) {
  const slotId = AD_SLOTS[variant];
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!adsEnabled || !slotId || pushedRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // AdSense betiği henüz hazır değilse (engelleyici, yavaş ağ vb.)
      // sessizce yok say; sayfanın geri kalanı etkilenmesin.
    }
  }, [slotId]);

  if (adsEnabled && slotId) {
    return (
      <ins
        className={`adsbygoogle ad-slot--${variant}`}
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }

  return (
    <div
      className={`ad-slot-placeholder ad-slot--${variant}`}
      role="complementary"
      aria-label="Reklam alanı"
    >
      <span className="ad-slot__label">Reklam</span>
    </div>
  );
}
