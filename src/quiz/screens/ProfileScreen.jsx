import { useState } from 'react';
import { ShieldIcon, FlameIcon, TrophyIcon } from '../components/Icons.jsx';
import { ALL_BADGE_LABELS, getRecentActivity } from '../stats.js';

const NOTIF_KEY = 'osmanli-quiz:notif-pref';
const VIBRATE_KEY = 'osmanli-quiz:vibrate-pref';
const SOUND_KEY = 'osmanli-quiz:sound-pref';

function readNotifPref() {
  try {
    return window.localStorage.getItem(NOTIF_KEY) === 'on';
  } catch {
    return false;
  }
}

function writeNotifPref(value) {
  try {
    window.localStorage.setItem(NOTIF_KEY, value ? 'on' : 'off');
  } catch {
    // yok say
  }
}

function readVibratePref() {
  try {
    return window.localStorage.getItem(VIBRATE_KEY) !== 'off';
  } catch {
    return true;
  }
}

function writeVibratePref(value) {
  try {
    window.localStorage.setItem(VIBRATE_KEY, value ? 'on' : 'off');
  } catch {
    // yok say
  }
}

function readSoundPref() {
  try {
    return window.localStorage.getItem(SOUND_KEY) !== 'off';
  } catch {
    return true;
  }
}

function writeSoundPref(value) {
  try {
    window.localStorage.setItem(SOUND_KEY, value ? 'on' : 'off');
  } catch {
    // yok say
  }
}

const BADGE_ICONS = {
  'ilk-quiz': TrophyIcon,
  'seri-7': FlameIcon,
  'mukemmel-skor': TrophyIcon,
};

export default function ProfileScreen({ stats }) {
  const [notifOn, setNotifOn] = useState(readNotifPref);
  const [vibrateOn, setVibrateOn] = useState(readVibratePref);
  const [soundOn, setSoundOn] = useState(readSoundPref);

  function toggleNotif() {
    const next = !notifOn;
    setNotifOn(next);
    writeNotifPref(next);
  }

  function toggleVibrate() {
    const next = !vibrateOn;
    setVibrateOn(next);
    writeVibratePref(next);
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    writeSoundPref(next);
  }

  const earnedBadges = stats.badges.map((key) => ({
    key,
    label: ALL_BADGE_LABELS[key] ?? key,
    Icon: BADGE_ICONS[key] ?? ShieldIcon,
  }));

  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : null;
  const recentActivity = getRecentActivity(stats, 7);

  return (
    <div className="screen">
      <div className="profile-header">
        <div className="profile-avatar">AÜ</div>
        <div className="profile-name">Sen</div>
        <div className="profile-points">{stats.totalPoints} Puan</div>
      </div>

      <div className="screen__body profile-body">
        {accuracy !== null && (
          <section>
            <div className="section-label">İSTATİSTİKLERİN</div>
            <div className="result-stats">
              <div>
                <div className="result-stats__num">{stats.totalAnswered}</div>
                <div className="result-stats__label">Çözülen Soru</div>
              </div>
              <div>
                <div className="result-stats__num">%{accuracy}</div>
                <div className="result-stats__label">Doğruluk</div>
              </div>
              <div>
                <div className="result-stats__num">{stats.badges.length}</div>
                <div className="result-stats__label">Rozet</div>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="section-label">SON 7 GÜN</div>
          {stats.longestStreak > 0 && (
            <div className="longest-streak-note">
              <FlameIcon size={13} color="var(--gold)" />
              <span>En uzun serin: {stats.longestStreak} gün</span>
            </div>
          )}
          <div className="activity-strip">
            {recentActivity.map(({ dateKey, label, played, isToday }) => (
              <div key={dateKey} className="activity-strip__day">
                <div
                  className={`activity-strip__dot ${played ? 'activity-strip__dot--played' : ''} ${
                    isToday ? 'activity-strip__dot--today' : ''
                  }`}
                >
                  {played && <FlameIcon size={12} color="var(--paper)" />}
                </div>
                <span className="activity-strip__label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-label">ROZETLER</div>
          {earnedBadges.length === 0 ? (
            <div className="empty-note">Henüz rozet kazanmadın — ilk quiz&rsquo;ini tamamla!</div>
          ) : (
            <div className="badge-grid">
              {earnedBadges.map(({ key, label, Icon }) => (
                <div key={key} className="badge-card">
                  <Icon size={22} color="var(--gold)" />
                  <div className="badge-card__label">{label}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="section-label">AYARLAR</div>
          <div className="settings-list">
            <div className="settings-row">
              <span>Günlük Hatırlatma</span>
              <button
                className={`toggle ${notifOn ? 'toggle--on' : ''}`}
                onClick={toggleNotif}
                aria-pressed={notifOn}
                aria-label="Günlük hatırlatmayı aç/kapat"
              >
                <span className="toggle__knob" />
              </button>
            </div>
            <div className="settings-note">
              Bildirim tercihin kaydedildi. Gerçek zamanında hatırlatmalar, mağaza uygulaması
              sürümüyle birlikte tam olarak devreye girecek.
            </div>
            <div className="settings-row">
              <span>Titreşim</span>
              <button
                className={`toggle ${vibrateOn ? 'toggle--on' : ''}`}
                onClick={toggleVibrate}
                aria-pressed={vibrateOn}
                aria-label="Cevap titreşimini aç/kapat"
              >
                <span className="toggle__knob" />
              </button>
            </div>
            <div className="settings-row">
              <span>Ses</span>
              <button
                className={`toggle ${soundOn ? 'toggle--on' : ''}`}
                onClick={toggleSound}
                aria-pressed={soundOn}
                aria-label="Cevap sesini aç/kapat"
              >
                <span className="toggle__knob" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
