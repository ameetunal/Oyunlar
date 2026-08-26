import { useEffect } from 'react';
import { ADSENSE_CLIENT_ID, adsEnabled } from '../config/ads';

// AdSense'in genel <script> etiketini sayfaya bir kez ekler. Yalnızca
// VITE_ADSENSE_CLIENT_ID tanımlıysa çalışır; aksi halde hiçbir şey yapmaz.
export default function useAdSenseScript() {
  useEffect(() => {
    if (!adsEnabled) return;
    if (document.querySelector('script[data-adsbygoogle]')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    script.crossOrigin = 'anonymous';
    script.dataset.adsbygoogle = 'true';
    document.head.appendChild(script);
  }, []);
}
