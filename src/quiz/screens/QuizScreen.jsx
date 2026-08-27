import { CloseIcon, CheckIcon, CrossIcon } from '../components/Icons.jsx';
import { categories } from '../data/categories.js';

export default function QuizScreen({ session, onSelectAnswer, onContinue, onLearnStory, onClose }) {
  const question = session.roundQuestions[session.index];
  const categoryTitle = categories.find((c) => c.key === question.category)?.title ?? '';
  const isCorrect = session.answered && session.selected === question.shuffledCorrectIndex;

  return (
    <div className="screen screen--focus">
      <header className="quiz-top">
        <button className="icon-button" onClick={onClose} aria-label="Quiz'i kapat">
          <CloseIcon color="var(--muted)" />
        </button>
        <div className="progress-bar quiz-top__bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${(session.index / session.roundQuestions.length) * 100}%` }}
          />
        </div>
        <div className="quiz-top__count">
          {session.index + 1} / {session.roundQuestions.length}
        </div>
      </header>

      <div className="quiz-category-label">{categoryTitle.toUpperCase()}</div>

      <div className="screen__body quiz-body">
        <div className="quiz-question">{question.question}</div>

        <div className="quiz-options">
          {question.shuffledOptions.map((option, i) => {
            let className = 'quiz-option';
            let icon = null;
            if (session.answered) {
              if (i === question.shuffledCorrectIndex) {
                className += ' quiz-option--correct';
                icon = <CheckIcon size={18} color="var(--gold)" />;
              } else if (i === session.selected) {
                className += ' quiz-option--wrong';
                icon = <CrossIcon size={18} color="var(--maroon)" />;
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
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {session.answered && (
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
