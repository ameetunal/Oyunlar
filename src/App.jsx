import { useMemo, useState } from 'react';
import { periods } from './data/periods';
import AdSlot from './components/AdSlot';
import './App.css';

// Okuma akışı: her dönemin bir "bölüm açılışı" (giriş) sayfası, ardından
// o dönemin olay sayfaları sırayla gelir. Tamamı tek, doğrusal bir kitap
// gibi "önceki / sonraki sayfa" ile de gezilebilir.
function buildPages(periods) {
  const pages = [];
  periods.forEach((period) => {
    pages.push({ type: 'intro', period });
    period.events.forEach((event) => {
      pages.push({ type: 'event', period, event });
    });
  });
  return pages;
}

export default function App() {
  const pages = useMemo(() => buildPages(periods), []);
  const [pageIndex, setPageIndex] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);

  const page = pages[pageIndex];
  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pages.length - 1;

  const goTo = (index) => {
    setPageIndex(index);
    setTocOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
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
      </header>

      <AdSlot variant="banner" />

      <div className="layout">
        <nav className={`toc ${tocOpen ? 'toc--open' : ''}`} aria-label="İçindekiler">
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
              </ul>
            </div>
          ))}
          <AdSlot variant="sidebar" />
        </nav>

        <main className="reader">
          <article className="page-sheet">
            {page.type === 'intro' ? (
              <>
                <p className="chapter-label">Bölüm · {page.period.range}</p>
                <h1 className="chapter-title">{page.period.title}</h1>
                <p className="chapter-summary">{page.period.summary}</p>
                <p className="chapter-intro">{page.period.intro}</p>
              </>
            ) : (
              <>
                <p className="event-breadcrumb">
                  {page.period.title} <span aria-hidden="true">·</span> {page.event.year}
                </p>
                <h1 className="event-title">{page.event.title}</h1>
                <p className="event-text">{page.event.text}</p>
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
