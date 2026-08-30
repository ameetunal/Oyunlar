import { useState } from 'react';
import { ShareIcon } from '../components/Icons.jsx';
import { categories } from '../data/categories.js';
import { generateShareImage } from '../shareImage.js';
import Confetti from '../components/Confetti.jsx';

function resultMessage({ isTimeAttack, correct, total }) {
  if (isTimeAttack) {
    if (correct >= 15) return 'İnanılmaz hız — Osmanlı tarihini adeta ezbere biliyorsun.';
    if (correct >= 8) return 'Güçlü bir performans, pratik yaptıkça daha da hızlanacaksın.';
    return 'İlk denemen bu kadarsa daha neler olacak — tekrar dene.';
  }
  const percent = total > 0 ? (correct / total) * 100 : 0;
  if (percent === 100) return 'Mükemmel — tek bir soruda bile takılmadın.';
  if (percent >= 80) return 'Çok iyi gidiyorsun, ustalığa çok yakınsın.';
  if (percent >= 50) return 'Fena değil — yanlışlarını tekrar edip ilerleyebilirsin.';
  return 'Bu bir başlangıç; hikayeleri okuyarak hızla öğreneceksin.';
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ResultScreen({ session, pointsEarned, onStartQuiz, onStartTimeAttack, onGoHome }) {
  const [shareStatus, setShareStatus] = useState(null);
  const isTimeAttack = session.mode === 'timeAttack';
  const total = session.solvedIds.length;
  const correct = session.correctCount;
  const wrong = total - correct;

  const modeLabel = isTimeAttack
    ? 'Zaman Yarışı'
    : (categories.find((c) => c.key === session.categoryKey)?.title ?? 'Karma Quiz');

  // Rozet kazandıran eşiklerle aynı (bkz. stats.js): mükemmel skor veya
  // Zaman Yarışı'nda 15+ doğru — kutlamaya değer, nadir bir an.
  const isCelebration = isTimeAttack ? correct >= 15 : total > 0 && correct === total;

  const shareText = isTimeAttack
    ? `Osmanlı Quiz Zaman Yarışı'nda 60 saniyede ${correct} doğru yaptım! Sen de dener misin?`
    : `Osmanlı Quiz'de ${correct}/${total} doğru yaptım! Sen de dener misin?`;

  async function handleShare() {
    const url = window.location.href;
    try {
      const blob = await generateShareImage({ correct, total, modeLabel, isTimeAttack });
      const file = new File([blob], 'osmanli-quiz-sonuc.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: shareText });
        } catch {
          // kullanıcı paylaşım penceresini kapattıysa sessizce geç
        }
        return;
      }
      downloadBlob(blob, 'osmanli-quiz-sonuc.png');
      setShareStatus('Görsel indirildi!');
      setTimeout(() => setShareStatus(null), 2000);
    } catch {
      if (navigator.share) {
        try {
          await navigator.share({ text: shareText, url });
        } catch {
          // kullanıcı paylaşım penceresini kapattıysa sessizce geç
        }
        return;
      }
      try {
        await navigator.clipboard.writeText(`${shareText} ${url}`);
        setShareStatus('Panoya kopyalandı!');
        setTimeout(() => setShareStatus(null), 2000);
      } catch {
        setShareStatus(null);
      }
    }
  }

  return (
    <div className="screen screen--focus screen--centered">
      {isCelebration && <Confetti />}
      <div className="screen__body result-body">
        <div className="result-label">{isTimeAttack ? 'SÜRE DOLDU!' : 'QUIZ TAMAMLANDI'}</div>
        <div className="result-score">
          {correct}
          <span>{isTimeAttack ? ' doğru' : <>{' '}/ {total}</>}</span>
        </div>
        <div className="result-message">{resultMessage({ isTimeAttack, correct, total })}</div>
        <div className="ornament-divider">
          <span />
          <i />
          <span />
        </div>
        <div className="result-stats">
          <div>
            <div className="result-stats__num">{correct}</div>
            <div className="result-stats__label">Doğru</div>
          </div>
          <div>
            <div className="result-stats__num">{wrong}</div>
            <div className="result-stats__label">Yanlış</div>
          </div>
          <div>
            <div className="result-stats__num">+{pointsEarned}</div>
            <div className="result-stats__label">Puan</div>
          </div>
        </div>
      </div>

      <div className="screen__footer result-footer">
        {isTimeAttack ? (
          <button className="primary-button" onClick={onStartTimeAttack}>
            Tekrar Dene
          </button>
        ) : (
          <button className="primary-button" onClick={() => onStartQuiz(null)}>
            Yeni Quiz Başlat
          </button>
        )}
        <button className="secondary-button" onClick={handleShare}>
          <ShareIcon size={16} color="var(--gold)" />
          <span>{shareStatus ?? 'Kartı Paylaş'}</span>
        </button>
        <button className="text-button" onClick={onGoHome}>
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
