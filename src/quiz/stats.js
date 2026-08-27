// Kullanıcının yerel ilerleme verisi: puan, seri (streak), çözülen soru
// kimlikleri ve rozetler. Sunucu yok — her şey bu cihazda localStorage'da
// tutulur (bu yüzden Liderlik Tablosu şimdilik yalnızca kendi verini
// gösterir, gerçek çok kullanıcılı sıralama gelecek bir sürüme kaldı).
import { questions } from './data/questions.js';

const STATS_KEY = 'osmanli-quiz:stats';

const DEFAULT_STATS = {
  totalPoints: 0,
  streak: 0,
  lastPlayedDate: null,
  solvedIds: [],
  badges: [],
  totalAnswered: 0,
  totalCorrect: 0,
  wrongIds: [],
};

export function loadStats() {
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

function saveStats(stats) {
  try {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // Depolama kullanılamıyorsa (gizli sekme vb.) sessizce yok say.
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function categoryQuestionIds(categoryKey) {
  return questions.filter((q) => q.category === categoryKey).map((q) => q.id);
}

const CATEGORY_BADGES = {
  sultans: { key: 'padisahlar-ustasi', label: 'Padişahlar Ustası' },
  wars: { key: 'savas-uzmani', label: 'Savaş Uzmanı' },
  viziers: { key: 'sadrazam-bilgini', label: 'Sadrazam Bilgini' },
  scientists: { key: 'bilim-meraklisi', label: 'Bilim Meraklısı' },
  architects: { key: 'sanat-ustasi', label: 'Sanat ve Mimari Ustası' },
  dailyLife: { key: 'gunluk-yasam-bilgini', label: 'Günlük Yaşam Bilgini' },
  haremWomen: { key: 'kadin-sultanlar-bilgini', label: 'Kadın Sultanlar Bilgini' },
  admirals: { key: 'derya-kaptani', label: 'Derya Kaptanı' },
  poets: { key: 'divan-siir-ustasi', label: 'Divan Şiiri Ustası' },
};

const ALL_CATEGORY_KEYS = Object.keys(CATEGORY_BADGES);

// Bir quiz turunun sonunda çağrılır; puanı, seriyi, çözülen soruları ve
// hak edilen yeni rozetleri günceller. Yeni kazanılan rozetlerin
// listesini döndürür (ekranda "yeni rozet!" göstermek için kullanılabilir).
export function recordQuizResult({ categoryKey, correctCount, solvedIds, wrongIds = [] }) {
  const stats = loadStats();
  const newlyEarned = [];

  stats.totalPoints += correctCount * 10;
  stats.totalAnswered += solvedIds.length;
  stats.totalCorrect += correctCount;

  // Bu turda yanlış yapılan sorular "tekrar et" listesine eklenir; daha
  // önce yanlış yapılıp bu kez doğru cevaplanan sorular listeden düşer.
  const wrongSet = new Set(stats.wrongIds || []);
  const wrongThisRound = new Set(wrongIds);
  solvedIds.forEach((id) => {
    if (wrongThisRound.has(id)) wrongSet.add(id);
    else wrongSet.delete(id);
  });
  stats.wrongIds = Array.from(wrongSet);

  if (stats.lastPlayedDate === todayKey()) {
    // aynı gün içinde ikinci kez oynanıyor, seriyi değiştirme
  } else if (stats.lastPlayedDate === yesterdayKey()) {
    stats.streak += 1;
  } else {
    stats.streak = 1;
  }
  stats.lastPlayedDate = todayKey();

  const solvedSet = new Set(stats.solvedIds);
  solvedIds.forEach((id) => solvedSet.add(id));
  stats.solvedIds = Array.from(solvedSet);

  if (!stats.badges.includes('ilk-quiz')) {
    stats.badges.push('ilk-quiz');
    newlyEarned.push({ key: 'ilk-quiz', label: 'İlk Quiz' });
  }
  if (stats.streak >= 7 && !stats.badges.includes('seri-7')) {
    stats.badges.push('seri-7');
    newlyEarned.push({ key: 'seri-7', label: '7 Günlük Seri' });
  }
  const catBadge = CATEGORY_BADGES[categoryKey];
  if (catBadge && !stats.badges.includes(catBadge.key)) {
    const allIds = categoryQuestionIds(categoryKey);
    const allSolved = allIds.every((id) => solvedSet.has(id));
    if (allSolved) {
      stats.badges.push(catBadge.key);
      newlyEarned.push(catBadge);
    }
  }

  const perfectBadge = { key: 'mukemmel-skor', label: 'Mükemmel Skor' };
  if (solvedIds.length > 0 && correctCount === solvedIds.length && !stats.badges.includes(perfectBadge.key)) {
    stats.badges.push(perfectBadge.key);
    newlyEarned.push(perfectBadge);
  }

  const masterBadge = { key: 'osmanli-tarihi-ustasi', label: 'Osmanlı Tarihi Ustası' };
  if (!stats.badges.includes(masterBadge.key)) {
    const allCategoriesMastered = ALL_CATEGORY_KEYS.every((key) =>
      stats.badges.includes(CATEGORY_BADGES[key].key)
    );
    if (allCategoriesMastered) {
      stats.badges.push(masterBadge.key);
      newlyEarned.push(masterBadge);
    }
  }

  saveStats(stats);
  return { stats, newlyEarned };
}

export function categoryProgress(stats, categoryKey) {
  const ids = categoryQuestionIds(categoryKey);
  if (ids.length === 0) return { solved: 0, total: 0 };
  const solvedSet = new Set(stats.solvedIds);
  const solved = ids.filter((id) => solvedSet.has(id)).length;
  return { solved, total: ids.length };
}

export const ALL_BADGE_LABELS = {
  'ilk-quiz': 'İlk Quiz',
  'seri-7': '7 Günlük Seri',
  'osmanli-tarihi-ustasi': 'Osmanlı Tarihi Ustası',
  'mukemmel-skor': 'Mükemmel Skor',
  ...Object.fromEntries(Object.values(CATEGORY_BADGES).map((b) => [b.key, b.label])),
};
