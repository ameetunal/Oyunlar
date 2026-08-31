import { useEffect } from 'react';
import { CloseIcon, CheckIcon, CrossIcon, ClockIcon } from '../components/Icons.jsx';
import { categories } from '../data/categories.js';

export default function QuizScreen({ session, onSelectAnswer, onContinue, onLearnStory, onClose }) {
  const question = session.roundQuestions[session.index];
  const categoryTitle = categories.find((c) => c.key === question.category)?.title ?? '';
  const isCorrect = session.answered && session.selected === question.shuffledCorrectIndex;
  const isTimeAttack = session.mode === 'timeAttack';

  useEffect(() => {
    if (!isTimeAttack || !session.answered) return;
    const id = setTimeout(() => onContinue(), 650);
    return () => clearTimeout(id);
  }, [isTimeAttack, session.answered, session.index]);

  // Klavye desteği: cevaplanmamışken 1-4 tuşlarıyla şık seçilir, cevaplandıktan
  // sonra (Zaman Yarışı dışında, o zaten otomatik ilerliyor) Enter/Boşluk ile
  // devam edilir — masaüstünde/PWA'da fare olmadan da quiz oynanabilsin diye.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!session.answered) {
        const num = Number(e.key);
        if (num >= 1 && num <= question.shuffledOptions.length) {
          onSelectAnswer(num - 1);
        }
        return;
      }
      if (!isTimeAttack && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onContinue();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [session.answered, question, isTimeAttack, onSelectAnswer, onContinue]);

  return (
    <div className="screen screen--focus">
      <header className="quiz-top">
        <button className="icon-button" onClick={onClose} aria-label="Quiz'i kapat">
          <CloseIcon color="var(--muted)" />
        </button>
        {isTimeAttack ? (
          <>
            <div className="quiz-top__timer">
              <ClockIcon size={16} color={session.timeLeft <= 10 ? 'var(--maroon)' : 'var(--gold)'} />
              <span className={session.timeLeft <= 10 ? 'quiz-top__timer-num--urgent' : ''}>
                0:{String(session.timeLeft).padStart(2, '0')}
              </span>
            </div>
            <div className="quiz-top__count">{session.correctCount} doğru</div>
          </>
        ) : (
          <>
            <div className="progress-bar quiz-top__bar">
              <div
                className="progress-bar__fill"
                style={{ width: `${(session.index / session.roundQuestions.length) * 100}%` }}
              />
            </div>
            <div className="quiz-top__count">
              {session.index + 1} / {session.roundQuestions.length}
            </div>
          </>
        )}
      </header>

      <div className="quiz-category-label">{categoryTitle.toUpperCase()}</div>

      <div className="screen__body quiz-body">
        <div className="quiz-question">{question.question}</div>

        <div className="quiz-options">
          {question.shuffledOptions.map((option, i) => {
            let className = 'quiz-option';
            let icon = null;
            let stateLabel = null;
            if (session.answered) {
              if (i === question.shuffledCorrectIndex) {
                className += ' quiz-option--correct';
                icon = <CheckIcon size={18} color="var(--gold)" />;
                stateLabel = 'Doğru cevap.';
              } else if (i === session.selected) {
                className += ' quiz-option--wrong';
                icon = <CrossIcon size={18} color="var(--maroon)" />;
                stateLabel = 'Senin cevabın, yanlış.';
              }
            }
            return (
              <button
                key={i}
                className={className}
                disabled={session.answered}
                onClick={() => onSelectAnswer(i)}
              >
                <span>{option}</span>
                {stateLabel && <span className="visually-hidden">{stateLabel}</span>}
                {icon}
              </button>
            );
          })}
        </div>

        {session.answered && (
          <div className="visually-hidden" role="status" aria-live="polite">
            {isCorrect
              ? 'Doğru cevap verdin.'
              : `Yanlış cevap. Doğru cevap: ${question.shuffledOptions[question.shuffledCorrectIndex]}`}
          </div>
        )}
      </div>

      {session.answered && !isTimeAttack && (
        <div className="quiz-feedback">
          {!isCorrect && (
            <button className="learn-card" onClick={onLearnStory}>
              <div className="learn-card__prompt">İster misin bu konuyu birlikte okuyalım?</div>
              <div className="learn-card__cta">{question.storyRef.key}&rsquo;i Oku</div>
            </button>
          )}
          <button className={isCorrect ? 'primary-button' : 'text-button'} onClick={onContinue}>
            Devam Et
          </button>
        </div>
      )}
    </div>
  );
}
