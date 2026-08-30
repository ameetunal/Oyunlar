import { useEffect, useMemo, useState } from 'react';

const COLORS = ['var(--gold)', 'var(--maroon)', 'var(--maroon-deep)', 'var(--paper)'];
const PIECE_COUNT = 36;

function buildPieces() {
  return Array.from({ length: PIECE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.4,
    duration: 1.8 + Math.random() * 1.2,
    color: COLORS[i % COLORS.length],
    rotate: Math.random() * 360,
    drift: (Math.random() - 0.5) * 60,
  }));
}

// Mükemmel skor / Hız Ustası eşiği gibi nadir, kutlanmaya değer bir anda
// kısa bir konfeti patlaması gösterir. Salt görsel — birkaç saniye sonra
// kendini DOM'dan kaldırır. prefers-reduced-motion tercihi olan
// kullanıcılarda hiç render edilmez.
export default function Confetti() {
  const [visible, setVisible] = useState(true);
  const pieces = useMemo(() => buildPieces(), []);

  useEffect(() => {
    const id = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(id);
  }, []);

  if (!visible) return null;

  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  } catch {
    // matchMedia desteklenmiyorsa normal şekilde göster
  }

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            '--confetti-rotate': `${p.rotate}deg`,
            '--confetti-drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
