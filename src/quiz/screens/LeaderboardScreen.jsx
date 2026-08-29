import { TrophyIcon } from '../components/Icons.jsx';
import { categories } from '../data/categories.js';
import { categoryProgress } from '../stats.js';

export default function LeaderboardScreen({ stats }) {
  const ranking = categories
    .filter((c) => c.playable)
    .map((c) => {
      const { solved, total } = categoryProgress(stats, c.key);
      const percent = total ? Math.round((solved / total) * 100) : 0;
      return { key: c.key, title: c.title, solved, total, percent };
    })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.percent - a.percent || b.solved - a.solved);

  return (
    <div className="screen">
      <header className="screen-header">
        <h1>Liderlik Tablosu</h1>
      </header>

      <div className="screen__body leaderboard-body">
        <div className="leaderboard-you">
          <TrophyIcon size={28} color="var(--gold)" />
          <div className="leaderboard-you__points">{stats.totalPoints} puan</div>
          <div className="leaderboard-you__label">Şu anki puanın</div>
        </div>

        {ranking.length > 0 && (
          <div className="category-rank">
            <div className="section-label">KATEGORİ SIRALAMAN</div>
            <ol className="category-rank-list">
              {ranking.map((c, i) => (
                <li key={c.key} className="category-rank-item">
                  <div className="category-rank-item__rank">{i + 1}</div>
                  <div className="category-rank-item__body">
                    <div className="category-rank-item__top">
                      <span className="category-rank-item__title">{c.title}</span>
                      <span className="category-rank-item__percent">%{c.percent}</span>
                    </div>
                    <div className="progress-bar progress-bar--sm">
                      <div className="progress-bar__fill" style={{ width: `${c.percent}%` }} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="coming-soon-note">
          <div className="coming-soon-note__title">Arkadaşlarınla yarışma yakında</div>
          <div className="coming-soon-note__text">
            Gerçek zamanlı sıralama için bir sunucu bağlantısı gerekiyor — bu özellik bir sonraki
            sürümde geliyor. Şimdilik yalnızca kendi ilerlemeni görebiliyorsun.
          </div>
        </div>
      </div>
    </div>
  );
}
