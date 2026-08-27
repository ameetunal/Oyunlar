import { useState } from 'react';
import { ShareIcon } from '../components/Icons.jsx';

export default function ResultScreen({ session, pointsEarned, onStartQuiz, onGoHome }) {
  const [shareStatus, setShareStatus] = useState(null);
  const total = session.roundQuestions.length;
  const correct = session.correctCount;
  const wrong = total - correct;

  const shareText = `Osmanlı Quiz'de ${correct}/${total} doğru yaptım! Sen de dener misin?`;

  async function handleShare() {
    const url = window.location.href;
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

  return (
    <div className="screen screen--focus screen--centered">
      <div className="screen__body result-body">
        <div className="result-label">QUIZ TAMAMLANDI</div>
        <div className="result-score">
          {correct}
          <span>{' '}/ {total}</span>
        </div>
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
        <button className="primary-button" onClick={() => onStartQuiz(null)}>
          Yeni Quiz Başlat
        </button>
        <button className="secondary-button" onClick={handleShare}>
          <ShareIcon size={16} color="var(--gold)" />
          <span>{shareStatus ?? 'Sonucunu Paylaş'}</span>
        </button>
        <button className="text-button" onClick={onGoHome}>
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
