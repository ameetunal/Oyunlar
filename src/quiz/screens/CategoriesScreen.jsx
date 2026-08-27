import { categories } from '../data/categories.js';
import { categoryProgress } from '../stats.js';

export default function CategoriesScreen({ stats, onStartQuiz }) {
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
          return (
            <button key={c.key} className="category-card" onClick={() => onStartQuiz(c.key)}>
              <div className="category-card__title">{c.title}</div>
              <div className="category-card__subtitle">{c.subtitle}</div>
              <div className="progress-bar progress-bar--sm">
                <div className="progress-bar__fill" style={{ width: `${percent}%` }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
