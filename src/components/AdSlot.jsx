// Reklam yer tutucusu. Gerçek reklam ağı (ör. Google AdSense) onayı alındığında
// bu bileşenin içeriği ilgili reklam script/etiketiyle değiştirilecektir.
export default function AdSlot({ variant = 'inline' }) {
  return (
    <div className={`ad-slot ad-slot--${variant}`} role="complementary" aria-label="Reklam alanı">
      <span className="ad-slot__label">Reklam</span>
    </div>
  );
}
