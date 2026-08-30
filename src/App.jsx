import { useEffect, useMemo, useRef, useState } from 'react';
import { periods } from './data/periods';
import { sultans } from './data/sultans';
import { glossary } from './data/glossary';
import { themesByPeriod } from './data/themes';
import { wars } from './data/wars';
import { sultanProfiles } from './data/sultanProfiles';
import { viziers } from './data/viziers';
import { vizierProfiles } from './data/vizierProfiles';
import { architects } from './data/architects';
import { architectProfiles } from './data/architectProfiles';
import { dailyLife } from './data/dailyLife';
import { scientists } from './data/scientists';
import { scientistProfiles } from './data/scientistProfiles';
import { haremWomen } from './data/haremWomen';
import { haremWomenProfiles } from './data/haremWomenProfiles';
import { admirals } from './data/admirals';
import { admiralProfiles } from './data/admiralProfiles';
import { poets } from './data/poets';
import { poetProfiles } from './data/poetProfiles';
import AdSlot from './components/AdSlot';
import EraTimeline from './components/EraTimeline';
import useAdSenseScript from './hooks/useAdSenseScript';
import QuizApp from './quiz/QuizApp.jsx';
import './App.css';
import './quiz/quiz.css';

const PROGRESS_KEY = 'osmanli-hikayesi:progress';
const THEME_KEY = 'osmanli-hikayesi:theme';
const MODE_KEY = 'osmanli-hikayesi:mode';
const BOOKMARKS_KEY = 'osmanli-hikayesi:bookmarks';
const TTS_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window;
const FONT_KEY = 'osmanli-hikayesi:font-size';
const FONT_SIZES = ['sm', 'md', 'lg'];
const FONT_LABELS = { sm: 'Küçük', md: 'Orta', lg: 'Büyük' };

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Depolama kullanılamıyorsa (gizli sekme vb.) sessizce yok say.
  }
}

// İlk ziyarette, kullanıcı daha önce bir tercih kaydetmediyse cihazın/
// tarayıcının sistem genelindeki açık/koyu mod tercihini kullan.
function getInitialTheme() {
  const stored = readStorage(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    // matchMedia desteklenmiyorsa varsayılan (açık) ile devam et
  }
  return 'light';
}

// Çok paragraflı metinleri (\n\n ile ayrılmış) ayrı <p> etiketleri olarak render eder.
function Paragraphs({ text, className }) {
  return text
    .split('\n\n')
    .map((paragraph, i) => (
      <p key={i} className={className}>
        {paragraph}
      </p>
    ));
}

function estimateReadingMinutes(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Okuma akışı: her dönemin bir "bölüm açılışı" (giriş) sayfası, ardından
// o dönemin olay sayfaları ve en sonda o dönemi konu bazında derinleştiren
// tematik incelemeler (Ekonomi, Toplum, Ordu, Kültür) gelir; en sonda iki
// referans eki (Padişahlar Listesi, Terimler Sözlüğü) yer alır. Tamamı tek,
// doğrusal bir kitap gibi "önceki / sonraki sayfa" ile de gezilebilir.
function buildPages(periods) {
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
  return pages;
}

const FEEDBACK_EMAIL = 'ameeet_unal@hotmail.com';

const SECTION_LABELS = {
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
};

function getPageLabel(page) {
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

function buildFeedbackMailto(page) {
  const label = getPageLabel(page);
  const subject = label
    ? `Osmanlı Sitesi - Öneri / Eksik Bilgi: ${label}`
    : 'Osmanlı Sitesi - Öneri / Eksik Bilgi';
  const body = 'Merhaba,\n\nBu sayfa/bölümle ilgili eklemek istediğim:\n\n';
  return `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function normalizeText(text) {
  return text.toLocaleLowerCase('tr-TR');
}

function getPageBookmarkId(page) {
  const label = getPageLabel(page);
  return label ? `${page.type}::${label}` : null;
}

export default function App() {
  useAdSenseScript();
  const pages = useMemo(() => buildPages(periods), []);

  const [pageIndex, setPageIndex] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [tocQuery, setTocQuery] = useState('');
  const [theme, setTheme] = useState(getInitialTheme);
  const [fontSize, setFontSize] = useState(() => readStorage(FONT_KEY) || 'md');
  const [mode, setMode] = useState(() => readStorage(MODE_KEY) || 'book');
  const [resumeIndex, setResumeIndex] = useState(() => {
    const saved = Number(readStorage(PROGRESS_KEY));
    return Number.isInteger(saved) && saved > 0 ? saved : null;
  });
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bookmarkIds, setBookmarkIds] = useState(() => {
    try {
      const raw = readStorage(BOOKMARKS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const touchStartX = useRef(null);
  const touchStartedInScrollable = useRef(false);
  const tocRef = useRef(null);

  const page = pages[pageIndex];
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pages.length - 1;
  const progressPercent = Math.round(((pageIndex + 1) / pages.length) * 100);

  const tocQueryNorm = normalizeText(tocQuery.trim());

  const filteredPeriods = useMemo(() => {
    return periods
      .map((period) => {
        const periodMatches = !tocQueryNorm || normalizeText(period.title).includes(tocQueryNorm);
        const events = periodMatches
          ? period.events
          : period.events.filter((event) => normalizeText(event.title).includes(tocQueryNorm));
        const allThemes = themesByPeriod[period.id] || [];
        const themes = periodMatches
          ? allThemes
          : allThemes.filter((theme) => normalizeText(theme.title).includes(tocQueryNorm));
        return { period, events, themes, visible: periodMatches || events.length > 0 || themes.length > 0 };
      })
      .filter((item) => item.visible);
  }, [tocQueryNorm]);

  const filteredEklerItems = useMemo(() => {
    const items = Object.entries(SECTION_LABELS).map(([type, label]) => ({ type, label }));
    if (!tocQueryNorm) return items;
    return items.filter((item) => normalizeText(item.label).includes(tocQueryNorm));
  }, [tocQueryNorm]);

  const bookmarkedPages = useMemo(() => {
    if (bookmarkIds.length === 0) return [];
    const idSet = new Set(bookmarkIds);
    return pages
      .map((p, idx) => ({ index: idx, label: getPageLabel(p), id: getPageBookmarkId(p) }))
      .filter(({ id }) => id && idSet.has(id));
  }, [pages, bookmarkIds]);

  const filteredBookmarkedPages = useMemo(() => {
    if (!tocQueryNorm) return bookmarkedPages;
    return bookmarkedPages.filter(({ label }) => normalizeText(label).includes(tocQueryNorm));
  }, [bookmarkedPages, tocQueryNorm]);

  const currentBookmarkId = getPageBookmarkId(page);
  const isPageBookmarked = currentBookmarkId ? bookmarkIds.includes(currentBookmarkId) : false;

  const toggleBookmark = () => {
    if (!currentBookmarkId) return;
    setBookmarkIds((prev) =>
      prev.includes(currentBookmarkId) ? prev.filter((id) => id !== currentBookmarkId) : [...prev, currentBookmarkId]
    );
  };

  const goTo = (index) => {
    if (index < 0 || index >= pages.length) return;
    setPageIndex(index);
    setTocOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToRandomPage = () => {
    if (pages.length <= 1) return;
    let randomIndex = Math.floor(Math.random() * pages.length);
    while (randomIndex === pageIndex) {
      randomIndex = Math.floor(Math.random() * pages.length);
    }
    goTo(randomIndex);
  };

  useEffect(() => {
    writeStorage(PROGRESS_KEY, String(pageIndex));
  }, [pageIndex]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writeStorage(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    writeStorage(MODE_KEY, mode);
    if (mode !== 'book' && TTS_SUPPORTED) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [mode]);

  useEffect(() => {
    setIsSpeaking(false);
    return () => {
      if (TTS_SUPPORTED) window.speechSynthesis.cancel();
    };
  }, [pageIndex]);

  useEffect(() => {
    if (!tocOpen) setTocQuery('');
  }, [tocOpen]);

  useEffect(() => {
    writeStorage(BOOKMARKS_KEY, JSON.stringify(bookmarkIds));
  }, [bookmarkIds]);

  useEffect(() => {
    writeStorage(FONT_KEY, fontSize);
  }, [fontSize]);

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  useEffect(() => {
    const activeItem = tocRef.current?.querySelector('.active');
    activeItem?.scrollIntoView({ block: 'nearest' });
  }, [pageIndex]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') goTo(pageIndex + 1);
      if (e.key === 'ArrowLeft') goTo(pageIndex - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pages.length]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
    // Tablo gibi kendi içinde yatay kaydırılan alanlarda başlayan dokunuşlar
    // sayfa çevirmeyi tetiklemesin — kullanıcı tabloyu kaydırmak istiyordur.
    touchStartedInScrollable.current = Boolean(e.target.closest('.sultans-table-wrap'));
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (touchStartedInScrollable.current) {
      touchStartedInScrollable.current = false;
      return;
    }
    if (Math.abs(dx) < 60) return;
    if (dx < 0) goTo(pageIndex + 1);
    else goTo(pageIndex - 1);
  };

  const cycleFontSize = () => {
    const currentIdx = FONT_SIZES.indexOf(fontSize);
    setFontSize(FONT_SIZES[(currentIdx + 1) % FONT_SIZES.length]);
  };

  const dismissResume = () => setResumeIndex(null);

  let pageText = null;
  if (page.type === 'intro') pageText = page.period.intro;
  else if (page.type === 'event') pageText = page.event.text;
  else if (page.type === 'theme') pageText = page.theme.text;
  else if (page.type === 'sultan-profile') pageText = page.profile.text;
  else if (page.type === 'vizier-profile') pageText = page.profile.text;
  else if (page.type === 'architect-profile') pageText = page.profile.text;
  else if (page.type === 'daily-life-topic') pageText = page.entry.text;
  else if (page.type === 'scientist-profile') pageText = page.profile.text;
  else if (page.type === 'harem-woman-profile') pageText = page.profile.text;
  else if (page.type === 'admiral-profile') pageText = page.profile.text;
  else if (page.type === 'poet-profile') pageText = page.profile.text;

  const readingMinutes = pageText ? estimateReadingMinutes(pageText) : null;

  const toggleSpeech = () => {
    if (!TTS_SUPPORTED || !pageText) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(pageText);
    utterance.lang = 'tr-TR';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  if (mode === 'quiz') {
    return (
      <div className="app">
        <a className="skip-link" href="#main-content">
          İçeriğe geç
        </a>
        <main id="main-content">
          <QuizApp onExit={() => setMode('book')} />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        İçeriğe geç
      </a>
      <header className="site-header">
        <button
          className="toc-toggle"
          onClick={() => setTocOpen((v) => !v)}
          aria-label="İçindekileri aç/kapat"
        >
          ☰
        </button>
        <div className="site-title">
          <span className="site-title__main">Osmanlı</span>
          <span className="site-title__sub">Bir İmparatorluğun Hikâyesi</span>
        </div>
        <div className="reader-controls">
          {isOffline && (
            <span className="offline-badge" title="İnternet bağlantısı yok, önbellekten okuyorsunuz">
              Çevrimdışı
            </span>
          )}
          <button
            className="reader-controls__btn reader-controls__btn--quiz"
            onClick={() => setMode('quiz')}
            title="Quiz moduna geç"
            aria-label="Quiz moduna geç"
          >
            <span aria-hidden="true">🎯</span>
            <span className="reader-controls__label">Quiz</span>
          </button>
          <button
            className="reader-controls__btn"
            onClick={cycleFontSize}
            title="Yazı boyutunu değiştir"
            aria-label="Yazı boyutunu değiştir"
          >
            <span aria-hidden="true">A</span>
            <span className="reader-controls__label">{FONT_LABELS[fontSize]}</span>
          </button>
          <button
            className="reader-controls__btn"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            title="Gece modunu aç/kapat"
            aria-label="Gece modunu aç/kapat"
          >
            <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
            <span className="reader-controls__label">
              {theme === 'light' ? 'Gece Modu' : 'Gündüz Modu'}
            </span>
          </button>
        </div>
      </header>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-track__fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <AdSlot variant="banner" />

      {page.period && (
        <EraTimeline
          periods={periods}
          currentPeriodId={page.period.id}
          onSelect={(periodId) =>
            goTo(pages.findIndex((p) => p.type === 'intro' && p.period.id === periodId))
          }
        />
      )}

      <div className="layout">
        {tocOpen && (
          <button
            className="toc-backdrop"
            onClick={() => setTocOpen(false)}
            aria-label="İçindekileri kapat"
          />
        )}
        <nav
          ref={tocRef}
          className={`toc ${tocOpen ? 'toc--open' : ''}`}
          aria-label="İçindekiler"
        >
          <div className="toc__header-row">
            <h2 className="toc__heading">İçindekiler</h2>
            <button
              className="toc__close"
              onClick={() => setTocOpen(false)}
              aria-label="İçindekileri kapat"
            >
              ✕
            </button>
          </div>
          <div className="toc__search">
            <input
              type="search"
              className="toc__search-input"
              placeholder="İçindekilerde ara..."
              value={tocQuery}
              onChange={(event) => setTocQuery(event.target.value)}
              aria-label="İçindekilerde ara"
            />
          </div>
          <button className="toc__random-btn" onClick={goToRandomPage}>
            🎲 Rastgele Sayfa
          </button>
          {filteredBookmarkedPages.length > 0 && (
            <div className="toc__period">
              <p className="toc__period-title toc__period-title--static">
                Yer İşaretlerim
              </p>
              <ul>
                {filteredBookmarkedPages.map(({ index, label }) => (
                  <li key={`bookmark-${index}`}>
                    <button
                      className={pageIndex === index ? 'active' : ''}
                      onClick={() => goTo(index)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {filteredPeriods.map(({ period, events, themes }) => (
            <div key={period.id} className="toc__period">
              <button
                className="toc__period-title"
                onClick={() => goTo(pages.findIndex((p) => p.type === 'intro' && p.period.id === period.id))}
              >
                {period.title}
                <span className="toc__range">{period.range}</span>
              </button>
              <ul>
                {events.map((event) => (
                  <li key={event.title}>
                    <button
                      className={
                        page.type === 'event' && page.event.title === event.title ? 'active' : ''
                      }
                      onClick={() =>
                        goTo(
                          pages.findIndex(
                            (p) => p.type === 'event' && p.event.title === event.title
                          )
                        )
                      }
                    >
                      <span className="toc__year">{event.year}</span> {event.title}
                    </button>
                  </li>
                ))}
                {themes.length > 0 && (
                  <li className="toc__subheading" aria-hidden="true">
                    Derinlemesine
                  </li>
                )}
                {themes.map((theme) => (
                  <li key={theme.title}>
                    <button
                      className={
                        page.type === 'theme' && page.theme.title === theme.title ? 'active' : ''
                      }
                      onClick={() =>
                        goTo(
                          pages.findIndex(
                            (p) => p.type === 'theme' && p.theme.title === theme.title
                          )
                        )
                      }
                    >
                      {theme.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {tocQueryNorm &&
            filteredPeriods.length === 0 &&
            filteredEklerItems.length === 0 &&
            filteredBookmarkedPages.length === 0 && (
            <p className="toc__no-results">&ldquo;{tocQuery.trim()}&rdquo; için sonuç bulunamadı.</p>
          )}

          {filteredEklerItems.length > 0 && (
            <div className="toc__period">
              <p className="toc__period-title toc__period-title--static">
                Ekler
              </p>
              <ul>
                {filteredEklerItems.map((item) => (
                  <li key={item.type}>
                    <button
                      className={page.type === item.type ? 'active' : ''}
                      onClick={() => goTo(pages.findIndex((p) => p.type === item.type))}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AdSlot variant="sidebar" />
        </nav>

        <main className="reader" id="main-content">
          <article
            key={pageIndex}
            className={`page-sheet font-${fontSize}`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {(currentBookmarkId || (TTS_SUPPORTED && pageText)) && (
              <div className="page-toolbar">
                {TTS_SUPPORTED && pageText && (
                  <button
                    className={`tts-toggle ${isSpeaking ? 'tts-toggle--active' : ''}`}
                    onClick={toggleSpeech}
                    aria-pressed={isSpeaking}
                    aria-label={isSpeaking ? 'Sesli okumayı durdur' : 'Bu sayfayı sesli oku'}
                  >
                    {isSpeaking ? '⏹ Durdur' : '🔊 Dinle'}
                  </button>
                )}
                {currentBookmarkId && (
                  <button
                    className={`bookmark-toggle ${isPageBookmarked ? 'bookmark-toggle--active' : ''}`}
                    onClick={toggleBookmark}
                    aria-pressed={isPageBookmarked}
                    aria-label={isPageBookmarked ? 'Yer işaretini kaldır' : 'Bu sayfayı yer işaretle'}
                  >
                    {isPageBookmarked ? '★ Yer İşaretlendi' : '☆ Yer İşaretle'}
                  </button>
                )}
              </div>
            )}

            {resumeIndex !== null && resumeIndex !== pageIndex && (
              <div className="resume-banner">
                <span>Kaldığınız sayfadan devam edebilirsiniz.</span>
                <div className="resume-banner__actions">
                  <button
                    onClick={() => {
                      goTo(resumeIndex);
                      dismissResume();
                    }}
                  >
                    Devam Et
                  </button>
                  <button className="resume-banner__ghost" onClick={dismissResume}>
                    Kapat
                  </button>
                </div>
              </div>
            )}

            {page.type === 'intro' && (
              <>
                <p className="chapter-label">
                  Bölüm · {page.period.range}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="chapter-title">{page.period.title}</h1>
                <p className="chapter-summary">{page.period.summary}</p>
                <Paragraphs text={page.period.intro} className="chapter-intro" />
              </>
            )}

            {page.type === 'event' && (
              <>
                <p className="event-breadcrumb">
                  {page.period.title} <span aria-hidden="true">·</span> {page.event.year}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.event.title}</h1>
                <Paragraphs text={page.event.text} className="event-text" />
              </>
            )}

            {page.type === 'theme' && (
              <>
                <p className="event-breadcrumb">
                  {page.period.title} <span aria-hidden="true">·</span>{' '}
                  <span className="theme-badge">{page.theme.category}</span>
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.theme.title}</h1>
                <Paragraphs text={page.theme.text} className="event-text" />
              </>
            )}

            {page.type === 'sultans' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Padişahlar Listesi</h1>
                <p className="chapter-summary">
                  Osman Gazi'den son padişah VI. Mehmed'e, altı asırlık hanedanın otuz altı hükümdarı.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table">
                    <thead>
                      <tr>
                        <th>Sıra</th>
                        <th>Padişah</th>
                        <th>Saltanat</th>
                        <th>Not</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sultans.map((s) => (
                        <tr key={s.name}>
                          <td>{s.order}</td>
                          <td>
                            {sultanProfiles[s.name] ? (
                              <button
                                className="wars-table__link"
                                onClick={() =>
                                  goTo(
                                    pages.findIndex(
                                      (p) => p.type === 'sultan-profile' && p.sultan.name === s.name
                                    )
                                  )
                                }
                              >
                                {s.name}
                              </button>
                            ) : (
                              s.name
                            )}
                          </td>
                          <td>{s.reign}</td>
                          <td>{s.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'sultan-profile' && (
              <>
                <p className="event-breadcrumb">
                  Padişahlar Listesi <span aria-hidden="true">·</span> Sıra {page.sultan.order}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.sultan.name}</h1>
                <p className="chapter-summary">{page.sultan.reign}</p>
                <dl className="sultan-facts">
                  <div>
                    <dt>Doğum</dt>
                    <dd>{page.profile.born}</dd>
                  </div>
                  <div>
                    <dt>Ölüm</dt>
                    <dd>{page.profile.died}</dd>
                  </div>
                  <div>
                    <dt>Babası</dt>
                    <dd>{page.profile.father}</dd>
                  </div>
                  <div>
                    <dt>Annesi</dt>
                    <dd>{page.profile.mother}</dd>
                  </div>
                  <div>
                    <dt>Eşleri</dt>
                    <dd>{page.profile.spouses}</dd>
                  </div>
                  <div>
                    <dt>Çocukları</dt>
                    <dd>{page.profile.children}</dd>
                  </div>
                  <div>
                    <dt>Yaşadığı Yerler</dt>
                    <dd>{page.profile.residence}</dd>
                  </div>
                </dl>
                <Paragraphs text={page.profile.text} className="event-text" />
              </>
            )}

            {page.type === 'wars' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Büyük Savaşlar</h1>
                <p className="chapter-summary">
                  Osmanlı tarihi boyunca imparatorluğun kaderini belirleyen savaşlar, kuşatmalar ve
                  meydan muharebeleri, kronolojik sırayla — bir satıra tıklayarak o savaşın
                  anlatıldığı sayfaya gidebilirsiniz.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table wars-table">
                    <thead>
                      <tr>
                        <th>Yıl</th>
                        <th>Savaş</th>
                        <th>Karşı Taraf</th>
                        <th>Sonuç</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wars.map((w) => (
                        <tr key={w.eventTitle}>
                          <td>{w.year}</td>
                          <td>
                            <button
                              className="wars-table__link"
                              onClick={() =>
                                goTo(
                                  pages.findIndex(
                                    (p) => p.type === 'event' && p.event.title === w.eventTitle
                                  )
                                )
                              }
                            >
                              {w.name}
                            </button>
                          </td>
                          <td>{w.opponent}</td>
                          <td>{w.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'viziers' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Ünlü Sadrazamlar</h1>
                <p className="chapter-summary">
                  Altı buçuk asırlık imparatorlukta padişahtan sonra en yetkili makam olan
                  sadrazamlık koltuğunda oturan yüzlerce isimden, devletin kaderini en çok
                  etkileyen on altısı — bir satıra tıklayarak kendi sayfasına gidebilirsiniz.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table wars-table">
                    <thead>
                      <tr>
                        <th>Sıra</th>
                        <th>Sadrazam</th>
                        <th>Hizmet Yılları</th>
                        <th>Padişah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viziers.map((v) => (
                        <tr key={v.name}>
                          <td>{v.order}</td>
                          <td>
                            {vizierProfiles[v.name] ? (
                              <button
                                className="wars-table__link"
                                onClick={() =>
                                  goTo(
                                    pages.findIndex(
                                      (p) => p.type === 'vizier-profile' && p.vizier.name === v.name
                                    )
                                  )
                                }
                              >
                                {v.name}
                              </button>
                            ) : (
                              v.name
                            )}
                          </td>
                          <td>{v.term}</td>
                          <td>{v.sultan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'vizier-profile' && (
              <>
                <p className="event-breadcrumb">
                  Ünlü Sadrazamlar <span aria-hidden="true">·</span> Sıra {page.vizier.order}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.vizier.name}</h1>
                <p className="chapter-summary">{page.vizier.term}</p>
                <dl className="sultan-facts">
                  <div>
                    <dt>Doğum</dt>
                    <dd>{page.profile.born}</dd>
                  </div>
                  <div>
                    <dt>Ölüm</dt>
                    <dd>{page.profile.died}</dd>
                  </div>
                  <div>
                    <dt>Kökeni</dt>
                    <dd>{page.profile.origin}</dd>
                  </div>
                  <div>
                    <dt>Hizmet Ettiği Padişahlar</dt>
                    <dd>{page.profile.servedSultans}</dd>
                  </div>
                  <div>
                    <dt>Önemli İcraatları</dt>
                    <dd>{page.profile.notableWorks}</dd>
                  </div>
                  <div>
                    <dt>Görevin Sonu</dt>
                    <dd>{page.profile.end}</dd>
                  </div>
                </dl>
                <Paragraphs text={page.profile.text} className="event-text" />
              </>
            )}

            {page.type === 'architects' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Ünlü Mimarlar ve Sanatçılar</h1>
                <p className="chapter-summary">
                  Osmanlı'yı taştan, yazıdan, renkten ve nağmeden inşa eden isimler — mimarlardan
                  hattatlara, minyatür ustalarından bestekarlara — bir satıra tıklayarak kendi
                  sayfasına gidebilirsiniz.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table wars-table">
                    <thead>
                      <tr>
                        <th>Sıra</th>
                        <th>İsim</th>
                        <th>Alanı</th>
                        <th>Dönem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {architects.map((a) => (
                        <tr key={a.name}>
                          <td>{a.order}</td>
                          <td>
                            {architectProfiles[a.name] ? (
                              <button
                                className="wars-table__link"
                                onClick={() =>
                                  goTo(
                                    pages.findIndex(
                                      (p) => p.type === 'architect-profile' && p.architect.name === a.name
                                    )
                                  )
                                }
                              >
                                {a.name}
                              </button>
                            ) : (
                              a.name
                            )}
                          </td>
                          <td>{a.field}</td>
                          <td>{a.era}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'architect-profile' && (
              <>
                <p className="event-breadcrumb">
                  Ünlü Mimarlar ve Sanatçılar <span aria-hidden="true">·</span> {page.architect.field}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.architect.name}</h1>
                <p className="chapter-summary">{page.architect.era}</p>
                <dl className="sultan-facts">
                  <div>
                    <dt>Doğum</dt>
                    <dd>{page.profile.born}</dd>
                  </div>
                  <div>
                    <dt>Ölüm</dt>
                    <dd>{page.profile.died}</dd>
                  </div>
                  <div>
                    <dt>Alanı</dt>
                    <dd>{page.profile.field}</dd>
                  </div>
                  <div>
                    <dt>Dönemi</dt>
                    <dd>{page.profile.era}</dd>
                  </div>
                  <div>
                    <dt>Başlıca Eserleri</dt>
                    <dd>{page.profile.majorWorks}</dd>
                  </div>
                  <div>
                    <dt>Mirası</dt>
                    <dd>{page.profile.legacy}</dd>
                  </div>
                </dl>
                <Paragraphs text={page.profile.text} className="event-text" />
              </>
            )}

            {page.type === 'daily-life' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Günlük Yaşam</h1>
                <p className="chapter-summary">
                  Sarayın ve savaş meydanlarının dışında, sıradan bir Osmanlı tebaasının günü nasıl
                  geçerdi? Mutfaktan kıyafete, hamamdan bayramlara, konu başlıklarına tıklayarak
                  gündelik hayatın izini sürebilirsiniz.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table wars-table">
                    <thead>
                      <tr>
                        <th>Sıra</th>
                        <th>Konu</th>
                        <th>Özet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyLife.map((d) => (
                        <tr key={d.topic}>
                          <td>{d.order}</td>
                          <td>
                            <button
                              className="wars-table__link"
                              onClick={() =>
                                goTo(
                                  pages.findIndex(
                                    (p) => p.type === 'daily-life-topic' && p.entry.topic === d.topic
                                  )
                                )
                              }
                            >
                              {d.topic}
                            </button>
                          </td>
                          <td>{d.summary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'daily-life-topic' && (
              <>
                <p className="event-breadcrumb">
                  Günlük Yaşam <span aria-hidden="true">·</span> {page.entry.topic}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.entry.title}</h1>
                <Paragraphs text={page.entry.text} className="event-text" />
              </>
            )}

            {page.type === 'scientists' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Ünlü Bilim İnsanları</h1>
                <p className="chapter-summary">
                  Rasathaneden ameliyathaneye, matbaadan gökyüzüne uzanan meraklarıyla Osmanlı
                  düşünce dünyasını şekillendiren isimler — bir satıra tıklayarak kendi sayfasına
                  gidebilirsiniz.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table wars-table">
                    <thead>
                      <tr>
                        <th>Sıra</th>
                        <th>İsim</th>
                        <th>Alanı</th>
                        <th>Dönem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scientists.map((s) => (
                        <tr key={s.name}>
                          <td>{s.order}</td>
                          <td>
                            {scientistProfiles[s.name] ? (
                              <button
                                className="wars-table__link"
                                onClick={() =>
                                  goTo(
                                    pages.findIndex(
                                      (p) => p.type === 'scientist-profile' && p.scientist.name === s.name
                                    )
                                  )
                                }
                              >
                                {s.name}
                              </button>
                            ) : (
                              s.name
                            )}
                          </td>
                          <td>{s.field}</td>
                          <td>{s.era}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'scientist-profile' && (
              <>
                <p className="event-breadcrumb">
                  Ünlü Bilim İnsanları <span aria-hidden="true">·</span> {page.scientist.field}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.scientist.name}</h1>
                <p className="chapter-summary">{page.scientist.era}</p>
                <dl className="sultan-facts">
                  <div>
                    <dt>Doğum</dt>
                    <dd>{page.profile.born}</dd>
                  </div>
                  <div>
                    <dt>Ölüm</dt>
                    <dd>{page.profile.died}</dd>
                  </div>
                  <div>
                    <dt>Alanı</dt>
                    <dd>{page.profile.field}</dd>
                  </div>
                  <div>
                    <dt>Dönemi</dt>
                    <dd>{page.profile.era}</dd>
                  </div>
                  <div>
                    <dt>Başlıca Eserleri</dt>
                    <dd>{page.profile.majorWorks}</dd>
                  </div>
                  <div>
                    <dt>Mirası</dt>
                    <dd>{page.profile.legacy}</dd>
                  </div>
                </dl>
                <Paragraphs text={page.profile.text} className="event-text" />
              </>
            )}

            {page.type === 'harem-women' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Kadın Sultanlar</h1>
                <p className="chapter-summary">
                  Padişah listelerinde adı geçmese de, sarayın ve zaman zaman devletin gerçek
                  yöneticileri olan haseki ve valide sultanlar — bir satıra tıklayarak kendi
                  sayfasına gidebilirsiniz.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table wars-table">
                    <thead>
                      <tr>
                        <th>Sıra</th>
                        <th>İsim</th>
                        <th>Rolü</th>
                        <th>Dönem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {haremWomen.map((w) => (
                        <tr key={w.name}>
                          <td>{w.order}</td>
                          <td>
                            {haremWomenProfiles[w.name] ? (
                              <button
                                className="wars-table__link"
                                onClick={() =>
                                  goTo(
                                    pages.findIndex(
                                      (p) => p.type === 'harem-woman-profile' && p.woman.name === w.name
                                    )
                                  )
                                }
                              >
                                {w.name}
                              </button>
                            ) : (
                              w.name
                            )}
                          </td>
                          <td>{w.role}</td>
                          <td>{w.era}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'harem-woman-profile' && (
              <>
                <p className="event-breadcrumb">
                  Kadın Sultanlar <span aria-hidden="true">·</span> {page.woman.role}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.woman.name}</h1>
                <p className="chapter-summary">{page.woman.era}</p>
                <dl className="sultan-facts">
                  <div>
                    <dt>Doğum</dt>
                    <dd>{page.profile.born}</dd>
                  </div>
                  <div>
                    <dt>Ölüm</dt>
                    <dd>{page.profile.died}</dd>
                  </div>
                  <div>
                    <dt>Rolü</dt>
                    <dd>{page.profile.role}</dd>
                  </div>
                  <div>
                    <dt>Ailesi</dt>
                    <dd>{page.profile.family}</dd>
                  </div>
                  <div>
                    <dt>Başlıca İcraatları</dt>
                    <dd>{page.profile.achievements}</dd>
                  </div>
                  <div>
                    <dt>Mirası</dt>
                    <dd>{page.profile.legacy}</dd>
                  </div>
                </dl>
                <Paragraphs text={page.profile.text} className="event-text" />
              </>
            )}

            {page.type === 'admirals' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Kaptan-ı Deryalar</h1>
                <p className="chapter-summary">
                  Barbaros'tan Cezayirli Gazi Hasan Paşa'ya, Akdeniz'de bir asra yakın süren
                  Osmanlı deniz üstünlüğünü kuran ve sürdüren denizciler — bir satıra tıklayarak
                  kendi sayfasına gidebilirsiniz.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table wars-table">
                    <thead>
                      <tr>
                        <th>Sıra</th>
                        <th>İsim</th>
                        <th>Dönem/Görev</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admirals.map((a) => (
                        <tr key={a.name}>
                          <td>{a.order}</td>
                          <td>
                            {admiralProfiles[a.name] ? (
                              <button
                                className="wars-table__link"
                                onClick={() =>
                                  goTo(
                                    pages.findIndex(
                                      (p) => p.type === 'admiral-profile' && p.admiral.name === a.name
                                    )
                                  )
                                }
                              >
                                {a.name}
                              </button>
                            ) : (
                              a.name
                            )}
                          </td>
                          <td>{a.term}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'admiral-profile' && (
              <>
                <p className="event-breadcrumb">
                  Kaptan-ı Deryalar <span aria-hidden="true">·</span> {page.admiral.term}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.admiral.name}</h1>
                <p className="chapter-summary">{page.profile.era}</p>
                <dl className="sultan-facts">
                  <div>
                    <dt>Doğum</dt>
                    <dd>{page.profile.born}</dd>
                  </div>
                  <div>
                    <dt>Ölüm</dt>
                    <dd>{page.profile.died}</dd>
                  </div>
                  <div>
                    <dt>Kökeni</dt>
                    <dd>{page.profile.origin}</dd>
                  </div>
                  <div>
                    <dt>Dönemi</dt>
                    <dd>{page.profile.era}</dd>
                  </div>
                  <div>
                    <dt>Başlıca Zaferleri</dt>
                    <dd>{page.profile.majorVictories}</dd>
                  </div>
                  <div>
                    <dt>Mirası</dt>
                    <dd>{page.profile.legacy}</dd>
                  </div>
                </dl>
                <Paragraphs text={page.profile.text} className="event-text" />
              </>
            )}

            {page.type === 'poets' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Divan Şairleri</h1>
                <p className="chapter-summary">
                  Fuzuli'nin aşk mesnevisinden Nedim'in İstanbul şiirine, Osmanlı divan edebiyatının
                  en etkili altı kalemi — bir satıra tıklayarak kendi sayfasına gidebilirsiniz.
                </p>
                <div className="sultans-table-wrap">
                  <table className="sultans-table wars-table">
                    <thead>
                      <tr>
                        <th>Sıra</th>
                        <th>İsim</th>
                        <th>Dönem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {poets.map((p) => (
                        <tr key={p.name}>
                          <td>{p.order}</td>
                          <td>
                            {poetProfiles[p.name] ? (
                              <button
                                className="wars-table__link"
                                onClick={() =>
                                  goTo(
                                    pages.findIndex(
                                      (pg) => pg.type === 'poet-profile' && pg.poet.name === p.name
                                    )
                                  )
                                }
                              >
                                {p.name}
                              </button>
                            ) : (
                              p.name
                            )}
                          </td>
                          <td>{p.era}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {page.type === 'poet-profile' && (
              <>
                <p className="event-breadcrumb">
                  Divan Şairleri <span aria-hidden="true">·</span> {page.poet.era}
                  {readingMinutes && <span className="reading-time"> · {readingMinutes} dk okuma</span>}
                </p>
                <h1 className="event-title">{page.poet.name}</h1>
                <p className="chapter-summary">{page.profile.style}</p>
                <dl className="sultan-facts">
                  <div>
                    <dt>Doğum</dt>
                    <dd>{page.profile.born}</dd>
                  </div>
                  <div>
                    <dt>Ölüm</dt>
                    <dd>{page.profile.died}</dd>
                  </div>
                  <div>
                    <dt>Dönemi</dt>
                    <dd>{page.profile.era}</dd>
                  </div>
                  <div>
                    <dt>Başlıca Eserleri</dt>
                    <dd>{page.profile.majorWorks}</dd>
                  </div>
                  <div>
                    <dt>Üslubu</dt>
                    <dd>{page.profile.style}</dd>
                  </div>
                  <div>
                    <dt>Mirası</dt>
                    <dd>{page.profile.legacy}</dd>
                  </div>
                </dl>
                <Paragraphs text={page.profile.text} className="event-text" />
              </>
            )}

            {page.type === 'glossary' && (
              <>
                <p className="chapter-label">Ek</p>
                <h1 className="chapter-title">Terimler Sözlüğü</h1>
                <p className="chapter-summary">
                  Osmanlı tarihini okurken sık karşılaşılacak temel kavramlar.
                </p>
                <dl className="glossary-list">
                  {glossary.map((g) => (
                    <div key={g.term} className="glossary-list__item">
                      <dt>{g.term}</dt>
                      <dd>{g.definition}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            {pageIndex % 3 === 2 && <AdSlot variant="inline" />}

            <div className="pager">
              <button disabled={!canPrev} onClick={() => goTo(pageIndex - 1)}>
                ← Önceki Sayfa
              </button>
              <span className="pager__pos">
                {pageIndex + 1} / {pages.length}
              </span>
              <button disabled={!canNext} onClick={() => goTo(pageIndex + 1)}>
                Sonraki Sayfa →
              </button>
            </div>

            <a className="feedback-link" href={buildFeedbackMailto(page)}>
              Bu sayfada eksik bir bilgi mi var, ya da bir bölüm mü önermek istiyorsun? Bize bildir
            </a>
          </article>
        </main>
      </div>

      <footer className="site-footer">
        <p>
          Bu içerik, genel tarih bilgisi doğrultusunda hazırlanmış özet bir anlatımdır; akademik
          kaynak yerine geçmez.
        </p>
      </footer>
    </div>
  );
}
