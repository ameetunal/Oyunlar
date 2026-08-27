import { HomeIcon, GridIcon, RankIcon, ProfileIcon } from './Icons.jsx';

const TABS = [
  { key: 'home', label: 'Ana Sayfa', Icon: HomeIcon },
  { key: 'categories', label: 'Kategoriler', Icon: GridIcon },
  { key: 'leaderboard', label: 'Liderlik', Icon: RankIcon },
  { key: 'profile', label: 'Profil', Icon: ProfileIcon },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        const color = isActive ? 'var(--gold)' : 'var(--muted)';
        return (
          <button
            key={key}
            className="bottom-nav__item"
            onClick={() => onNavigate(key)}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon color={color} />
            <span style={{ color, fontWeight: isActive ? 700 : 600 }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
