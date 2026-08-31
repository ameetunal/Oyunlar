import { categories } from '../data/categories.js';
import { categoryProgress, getCategoryBadge } from '../stats.js';
import { questions } from '../data/questions.js';
import { TrophyIcon, RefreshIcon } from '../components/Icons.jsx';

export default function CategoriesScreen({ stats, onStartQuiz, onStartCategoryReview }) {
  return (
    <div className="screen">
      <header className="screen-header">
        <h1>Kategoriler</h1>
      </header>

      <div className="screen__body category-grid">
        {categories.map((c) => {
          if (!c.playable) {
            return (
              <div key={c.key} className="category-card category-card--soon">
                <div className="category-card__title">{c.title}</div>
                <div className="category-card__subtitle">{c.subtitle}</div>
                <div className="category-card__soon">Yakında</div>
              </div>
            );
          }
          const { solved, total } = categoryProgress(stats, c.key);
          const percent = total ? Math.round((solved / total) * 100) : 0;
          const mastered = percent === 100;
          const almost = !mastered && percent >= 80;
          const wrongCount = questions.filter(
            (q) => q.category === c.key && stats.wrongIds?.includes(q.id)
          ).length;
          const categoryBadge = mastered ? getCategoryBadge(c.key) : null;
          const cardClass = ['category-card', mastered && 'category-card--mastered', almost && 'category-card--almost']
            .filter(Boolean)
            .join(' ');
          return (
            <div key={c.key} className={cardClass}>
              <button className="category-card__main" onClick={() => onStartQuiz(c.key)}>
                <div className="category-card__title">{c.title}</div>
                <div className="category-card__subtitle">{c.subtitle}</div>
                {mastered && (
                  <div className="category-card__badge category-card__badge--mastered">
                    <TrophyIcon size={13} color="var(--gold)" />
                    <span>{categoryBadge?.label ?? 'Tamamlandı'}</span>
                  </div>
                )}
                {almost && <div className="category-card__badge category-card__badge--almost">Neredeyse bitti</div>}
                <div className="progress-bar progress-bar--sm">
                  <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
                </div>
              </button>
              {wrongCount > 0 && (
                <button
                  className="category-card__review-btn"
                  onClick={() => onStartCategoryReview(c.key)}
                >
                  <RefreshIcon size={13} color="var(--maroon)" />
                  <span>{wrongCount} yanlışını tekrar et</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
