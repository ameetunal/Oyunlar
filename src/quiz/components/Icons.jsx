// Tek stilde (stroke tabanlı, 1.8px) yeniden kullanılabilir ikonlar.
// Emoji kullanılmaz; hepsi çizgi ikon.
const base = {
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function HomeIcon({ color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9h5v-5h4v5h5v-9" />
    </svg>
  );
}

export function GridIcon({ color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function RankIcon({ color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <rect x="4" y="14" width="4" height="7" rx="0.5" />
      <rect x="10" y="9" width="4" height="12" rx="0.5" />
      <rect x="16" y="4" width="4" height="17" rx="0.5" />
    </svg>
  );
}

export function ProfileIcon({ color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

export function FlameIcon({ color = 'currentColor', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c1.5 1 2 3 2 4a5 5 0 0 1-10 0c0-5 4-6 5-13z" />
    </svg>
  );
}

export function CheckIcon({ color = 'currentColor', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base} strokeWidth={2.2}>
      <path d="M5 12l5 5L19 7" />
    </svg>
  );
}

export function CrossIcon({ color = 'currentColor', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base} strokeWidth={2.2}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CloseIcon({ color = 'currentColor', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function BackIcon({ color = 'currentColor', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ color = 'currentColor', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function ShareIcon({ color = 'currentColor', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 10.5l6.8-3.8M8.6 13.5l6.8 3.8" />
    </svg>
  );
}

export function TrophyIcon({ color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <path d="M4 4h16l-2 8a6 6 0 0 1-12 0L4 4z" />
      <path d="M9 20h6M12 16v4" />
    </svg>
  );
}

export function ShieldIcon({ color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <path d="M12 3l7 4v5c0 4.5-3 7-7 9-4-2-7-4.5-7-9V7l7-4z" />
    </svg>
  );
}

export function RefreshIcon({ color = 'currentColor', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
      <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
      <path d="M18 3v4h-4M6 21v-4h4" />
    </svg>
  );
}
