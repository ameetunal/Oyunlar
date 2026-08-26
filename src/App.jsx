import { useEffect, useMemo, useRef, useState } from 'react';
import { periods } from './data/periods';
import { sultans } from './data/sultans';
import { glossary } from './data/glossary';
import { themesByPeriod } from './data/themes';
import { wars } from './data/wars';
import AdSlot from './components/AdSlot';
import EraTimeline from './components/EraTimeline';
import useAdSenseScript from './hooks/useAdSenseScript';
import './App.css';

const PROGRESS_KEY = 'osmanli-hikayesi:progress';
const THEME_KEY = 'osmanli-hikayesi:theme';
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
  pages.push({ type: 'wars' });
  pages.push({ type: 'glossary' });
  return pages;
}

export default function App() {
  useAdSenseScript();
  const pages = useMemo(() => buildPages(periods), []);

  const [pageIndex, setPageIndex] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [theme, setTheme] = useState(() => readStorage(THEME_KEY) || 'light');
  const [fontSize, setFontSize] = useState(() => readStorage(FONT_KEY) || 'md');
  const [resumeIndex, setResumeIndex] = useState(() => {
    const saved = Number(readStorage(PROGRESS_KEY));
    return Number.isInteger(saved) && saved > 0 ? saved : null;
  });
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine);

  const touchStartX = useRef(null);
  const touchStartedInScrollable = useRef(false);
  const tocRef = useRef(null);

  const page = pages[pageIndex];
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pages.length - 1;
  const progressPercent = Math.round(((pageIndex + 1) / pages.length) * 100);

  const goTo = (index) => {
    if (index < 0 || index >= pages.length) return;
    setPageIndex(index);
    setTocOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    writeStorage(PROGRESS_KEY, String(pageIndex));
  }, [pageIndex]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writeStorage(THEME_KEY, theme);
  }, [theme]);

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

  let readingMinutes = null;
  if (page.type === 'intro') readingMinutes = estimateReadingMinutes(page.period.intro);
  else if (page.type === 'event') readingMinutes = estimateReadingMinutes(page.event.text);
  else if (page.type === 'theme') readingMinutes = estimateReadingMinutes(page.theme.text);

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
        <nav
          ref={tocRef}
          className={`toc ${tocOpen ? 'toc--open' : ''}`}
          aria-label="İçindekiler"
        >
          <h2 className="toc__heading">İçindekiler</h2>
          {periods.map((period) => (
            <div key={period.id} className="toc__period">
              <button
                className="toc__period-title"
                onClick={() => goTo(pages.findIndex((p) => p.type === 'intro' && p.period.id === period.id))}
              >
                {period.title}
                <span className="toc__range">{period.range}</span>
              </button>
              <ul>
                {period.events.map((event) => (
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
                {(themesByPeriod[period.id] || []).length > 0 && (
                  <li className="toc__subheading" aria-hidden="true">
                    Derinlemesine
                  </li>
                )}
                {(themesByPeriod[period.id] || []).map((theme) => (
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

          <div className="toc__period">
            <p className="toc__period-title toc__period-title--static">
              Ekler
            </p>
            <ul>
              <li>
                <button
                  className={page.type === 'sultans' ? 'active' : ''}
                  onClick={() => goTo(pages.findIndex((p) => p.type === 'sultans'))}
                >
                  Padişahlar Listesi
                </button>
              </li>
              <li>
                <button
                  className={page.type === 'wars' ? 'active' : ''}
                  onClick={() => goTo(pages.findIndex((p) => p.type === 'wars'))}
                >
                  Büyük Savaşlar
                </button>
              </li>
              <li>
                <button
                  className={page.type === 'glossary' ? 'active' : ''}
                  onClick={() => goTo(pages.findIndex((p) => p.type === 'glossary'))}
                >
                  Terimler Sözlüğü
                </button>
              </li>
            </ul>
          </div>

          <AdSlot variant="sidebar" />
        </nav>

        <main className="reader" id="main-content">
          <article
            key={pageIndex}
            className={`page-sheet font-${fontSize}`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
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
                          <td>{s.name}</td>
                          <td>{s.reign}</td>
                          <td>{s.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
