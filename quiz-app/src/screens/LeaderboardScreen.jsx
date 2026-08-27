import { TrophyIcon } from '../components/Icons.jsx';

export default function LeaderboardScreen({ stats }) {
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
