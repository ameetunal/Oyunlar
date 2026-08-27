import { FlameIcon, ChevronRightIcon } from '../components/Icons.jsx';
import { questions } from '../data/questions.js';
import { resolveStory } from '../data/storyResolver.js';
import { categories } from '../data/categories.js';
import { categoryProgress } from '../stats.js';

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / 86400000);
}

export default function HomeScreen({ stats, onStartQuiz, onOpenStory, onExit }) {
  const dailyQuestion = questions[dayOfYear() % questions.length];
  const dailyStory = resolveStory(dailyQuestion.storyRef);
  const teaser = dailyStory.text ? dailyStory.text.split('\n\n')[0].slice(0, 150) + '…' : '';

  const playable = categories.filter((c) => c.playable);
  const totals = playable.reduce(
    (acc, c) => {
      const p = categoryProgress(stats, c.key);
      return { solved: acc.solved + p.solved, total: acc.total + p.total };
    },
    { solved: 0, total: 0 }
  );
  const percent = totals.total ? Math.round((totals.solved / totals.total) * 100) : 0;

  return (
    <div className="screen screen--home">
      <header className="top-bar">
        <div>
          <div className="brand-word">OSMANLI</div>
          <button className="exit-link" onClick={onExit}>
            &larr; Kitaba Dön
          </button>
        </div>
        <div className="streak-chip">
          <FlameIcon size={16} color="var(--gold)" />
          <span>{stats.streak} gün</span>
        </div>
      </header>

      <div className="screen__body">
        <button className="daily-card" onClick={() => onOpenStory(dailyQuestion.storyRef, 'home')}>
          <div className="daily-card__label">GÜNÜN BİLGİSİ</div>
          <div className="daily-card__title">{dailyStory.title}</div>
          <div className="daily-card__teaser">{teaser}</div>
          <div className="daily-card__link">
            Devamını oku <ChevronRightIcon size={14} color="var(--maroon)" />
          </div>
        </button>

        <button className="cta-card" onClick={() => onStartQuiz(null)}>
          <div className="cta-card__title">Bugünkü Quiz&rsquo;e Başla</div>
          <div className="cta-card__subtitle">10 soru &middot; ~3 dakika</div>
        </button>

        <div className="progress-summary">
          <div className="progress-summary__label">İLERLEYİŞİN</div>
          <div className="progress-row">
            <div className="progress-row__top">
              <span>Toplam</span>
              <span>{totals.solved} / {totals.total}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
