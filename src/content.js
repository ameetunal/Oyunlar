// Kitabın sayfa listesini, etiketlerini ve URL yollarını üreten, React'tan
// bağımsız saf JS modül. Hem tarayıcıda (App.jsx) hem derleme sırasında
// (vite-plugin-prerender.js, Node ortamında) aynı mantığı kullanmak için
// buraya çıkarıldı — iki yerde ayrı ayrı tutulsaydı zamanla birbirinden
// sapardı.
import { themesByPeriod } from './data/themes.js';
import { sultans } from './data/sultans.js';
import { sultanProfiles } from './data/sultanProfiles.js';
import { viziers } from './data/viziers.js';
import { vizierProfiles } from './data/vizierProfiles.js';
import { architects } from './data/architects.js';
import { architectProfiles } from './data/architectProfiles.js';
import { dailyLife } from './data/dailyLife.js';
import { scientists } from './data/scientists.js';
import { scientistProfiles } from './data/scientistProfiles.js';
import { haremWomen } from './data/haremWomen.js';
import { haremWomenProfiles } from './data/haremWomenProfiles.js';
import { admirals } from './data/admirals.js';
import { admiralProfiles } from './data/admiralProfiles.js';
import { poets } from './data/poets.js';
import { poetProfiles } from './data/poetProfiles.js';

export function buildPages(periods) {
  const pages = [];
  periods.forEach((period) => {
    pages.push({ type: 'intro', period });
    period.events.forEach((event) => {
      pages.push({ type: 'event', period, event });
    });
    (themesByPeriod[period.id] || []).forEach((theme) => {
      pages.push({ type: 'theme', period, theme });
    });
  });
  pages.push({ type: 'sultans' });
  sultans
    .filter((s) => sultanProfiles[s.name])
    .forEach((sultan) => {
      pages.push({ type: 'sultan-profile', sultan, profile: sultanProfiles[sultan.name] });
    });
  pages.push({ type: 'wars' });
  pages.push({ type: 'viziers' });
  viziers
    .filter((v) => vizierProfiles[v.name])
    .forEach((vizier) => {
      pages.push({ type: 'vizier-profile', vizier, profile: vizierProfiles[vizier.name] });
    });
  pages.push({ type: 'architects' });
  architects
    .filter((a) => architectProfiles[a.name])
    .forEach((architect) => {
      pages.push({ type: 'architect-profile', architect, profile: architectProfiles[architect.name] });
    });
  pages.push({ type: 'daily-life' });
  dailyLife.forEach((entry) => {
    pages.push({ type: 'daily-life-topic', entry });
  });
  pages.push({ type: 'scientists' });
  scientists
    .filter((s) => scientistProfiles[s.name])
    .forEach((scientist) => {
      pages.push({ type: 'scientist-profile', scientist, profile: scientistProfiles[scientist.name] });
    });
  pages.push({ type: 'harem-women' });
  haremWomen
    .filter((w) => haremWomenProfiles[w.name])
    .forEach((woman) => {
      pages.push({ type: 'harem-woman-profile', woman, profile: haremWomenProfiles[woman.name] });
    });
  pages.push({ type: 'admirals' });
  admirals
    .filter((a) => admiralProfiles[a.name])
    .forEach((admiral) => {
      pages.push({ type: 'admiral-profile', admiral, profile: admiralProfiles[admiral.name] });
    });
  pages.push({ type: 'poets' });
  poets
    .filter((p) => poetProfiles[p.name])
    .forEach((poet) => {
      pages.push({ type: 'poet-profile', poet, profile: poetProfiles[poet.name] });
    });
  pages.push({ type: 'glossary' });
  pages.push({ type: 'about' });
  pages.push({ type: 'contact' });
  return pages;
}

export const SECTION_LABELS = {
  sultans: 'Padişahlar Listesi',
  wars: 'Büyük Savaşlar',
  viziers: 'Ünlü Sadrazamlar',
  architects: 'Ünlü Mimarlar ve Sanatçılar',
  'daily-life': 'Günlük Yaşam',
  scientists: 'Ünlü Bilim İnsanları',
  'harem-women': 'Kadın Sultanlar',
  admirals: 'Kaptan-ı Deryalar',
  poets: 'Divan Şairleri',
  glossary: 'Terimler Sözlüğü',
  about: 'Hakkımızda',
  contact: 'Bize Ulaşın',
};

// Bu sayfalar yalnızca başlık + tek cümlelik özet + isim/tarih tablosundan
// oluşuyor; gerçek anlatı metni yok. AdSense politikası gereği ("yayıncı
// içeriği olmayan ekranlarda reklam" / "düşük değerli içerik") bu sayfalarda
// reklam gösterilmiyor — asıl anlatıyı taşıyan profil/olay/dönem
// sayfalarında ve Hakkımızda/Bize Ulaşın'da reklam aynen kalıyor.
export const THIN_CONTENT_PAGE_TYPES = new Set([
  'sultans',
  'wars',
  'viziers',
  'architects',
  'daily-life',
  'scientists',
  'harem-women',
  'admirals',
  'poets',
]);

export function getPageLabel(page) {
  switch (page.type) {
    case 'intro':
      return page.period.title;
    case 'event':
      return page.event.title;
    case 'theme':
      return page.theme.title;
    case 'sultan-profile':
      return page.sultan.name;
    case 'vizier-profile':
      return page.vizier.name;
    case 'architect-profile':
      return page.architect.name;
    case 'daily-life-topic':
      return page.entry.topic;
    case 'scientist-profile':
      return page.scientist.name;
    case 'harem-woman-profile':
      return page.woman.name;
    case 'admiral-profile':
      return page.admiral.name;
    case 'poet-profile':
      return page.poet.name;
    default:
      return SECTION_LABELS[page.type] ?? null;
  }
}

export function getPageBookmarkId(page) {
  const label = getPageLabel(page);
  return label ? `${page.type}::${label}` : null;
}

// Bir sayfanın ana anlatı metni — TTS (sesli okuma), okuma süresi tahmini ve
// statik ön-render (prerender) için ortak kaynak. Liste/dizin sayfalarının
// (Ekler) tek bir "ana metni" yoktur, bu yüzden null döner.
export function getPageText(page) {
  switch (page.type) {
    case 'intro':
      return page.period.intro;
    case 'event':
      return page.event.text;
    case 'theme':
      return page.theme.text;
    case 'sultan-profile':
    case 'vizier-profile':
    case 'architect-profile':
    case 'scientist-profile':
    case 'harem-woman-profile':
    case 'admiral-profile':
    case 'poet-profile':
      return page.profile.text;
    case 'daily-life-topic':
      return page.entry.text;
    default:
      return null;
  }
}

const TURKISH_CHAR_MAP = {
  ı: 'i',
  İ: 'i',
  I: 'i',
  ş: 's',
  Ş: 's',
  ğ: 'g',
  Ğ: 'g',
  ü: 'u',
  Ü: 'u',
  ö: 'o',
  Ö: 'o',
  ç: 'c',
  Ç: 'c',
};

// Türkçe başlık/isimleri URL'de kullanılabilir, sade bir slug'a çevirir:
// "İstanbul'un Fethi" -> "istanbulun-fethi".
export function turkishSlugify(text) {
  const mapped = Array.from(text)
    .map((ch) => TURKISH_CHAR_MAP[ch] ?? ch)
    .join('');
  return mapped
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const PAGE_ROUTE_BUILDERS = {
  intro: (page) => `donem/${page.period.id}`,
  event: (page) => `olay/${page.period.id}-${turkishSlugify(page.event.title)}`,
  theme: (page) => `tema/${page.period.id}-${turkishSlugify(page.theme.title)}`,
  sultans: () => `ekler/${turkishSlugify(SECTION_LABELS.sultans)}`,
  'sultan-profile': (page) => `padisah/${turkishSlugify(page.sultan.name)}`,
  wars: () => `ekler/${turkishSlugify(SECTION_LABELS.wars)}`,
  viziers: () => `ekler/${turkishSlugify(SECTION_LABELS.viziers)}`,
  'vizier-profile': (page) => `sadrazam/${turkishSlugify(page.vizier.name)}`,
  architects: () => `ekler/${turkishSlugify(SECTION_LABELS.architects)}`,
  'architect-profile': (page) => `mimar/${turkishSlugify(page.architect.name)}`,
  'daily-life': () => `ekler/${turkishSlugify(SECTION_LABELS['daily-life'])}`,
  'daily-life-topic': (page) => `gunluk-yasam/${turkishSlugify(page.entry.topic)}`,
  scientists: () => `ekler/${turkishSlugify(SECTION_LABELS.scientists)}`,
  'scientist-profile': (page) => `bilim-insani/${turkishSlugify(page.scientist.name)}`,
  'harem-women': () => `ekler/${turkishSlugify(SECTION_LABELS['harem-women'])}`,
  'harem-woman-profile': (page) => `kadin-sultan/${turkishSlugify(page.woman.name)}`,
  admirals: () => `ekler/${turkishSlugify(SECTION_LABELS.admirals)}`,
  'admiral-profile': (page) => `kaptan-i-derya/${turkishSlugify(page.admiral.name)}`,
  poets: () => `ekler/${turkishSlugify(SECTION_LABELS.poets)}`,
  'poet-profile': (page) => `sair/${turkishSlugify(page.poet.name)}`,
  glossary: () => `ekler/${turkishSlugify(SECTION_LABELS.glossary)}`,
  about: () => 'hakkimizda',
  contact: () => 'bize-ulasin',
};

// Her sayfa türü için sabit, öngörülebilir bir URL yolu (baştan/sondan
// eğik çizgisiz, örn. "padisah/i-osman-gazi"). Aynı isme sahip iki farklı
// kişi/olay gibi nadir bir çakışma olursa, çağıran taraf (ör. ön-render
// betiği) sona bir sayı ekleyerek benzersizleştirebilir.
export function getPageSlug(page) {
  const builder = PAGE_ROUTE_BUILDERS[page.type];
  return builder ? builder(page) : null;
}

// pages dizisinde verilen slug'a sahip ilk sayfanın index'ini döndürür,
// yoksa -1.
export function findPageIndexBySlug(pages, slug) {
  if (!slug) return -1;
  const normalized = slug.replace(/^\/+|\/+$/g, '');
  for (let i = 0; i < pages.length; i++) {
    if (getPageSlug(pages[i]) === normalized) return i;
  }
  return -1;
}
