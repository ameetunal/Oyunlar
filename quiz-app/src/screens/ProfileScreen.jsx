import { useState } from 'react';
import { ShieldIcon, FlameIcon, TrophyIcon } from '../components/Icons.jsx';
import { ALL_BADGE_LABELS } from '../stats.js';

const NOTIF_KEY = 'osmanli-quiz:notif-pref';

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

const BADGE_ICONS = {
  'ilk-quiz': TrophyIcon,
  'seri-7': FlameIcon,
};

export default function ProfileScreen({ stats }) {
  const [notifOn, setNotifOn] = useState(readNotifPref);

  function toggleNotif() {
    const next = !notifOn;
    setNotifOn(next);
    writeNotifPref(next);
  }

  const earnedBadges = stats.badges.map((key) => ({
    key,
    label: ALL_BADGE_LABELS[key] ?? key,
    Icon: BADGE_ICONS[key] ?? ShieldIcon,
  }));

  return (
    <div className="screen">
      <div className="profile-header">
        <div className="profile-avatar">AÜ</div>
        <div className="profile-name">Sen</div>
        <div className="profile-points">{stats.totalPoints} Puan</div>
      </div>

      <div className="screen__body profile-body">
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
          </div>
          <div className="settings-note">
            Bildirim tercihin kaydedildi. Gerçek zamanında hatırlatmalar, mağaza uygulaması
            sürümüyle birlikte tam olarak devreye girecek.
          </div>
        </section>
      </div>
    </div>
  );
}
