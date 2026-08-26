// Sayfanın hangi tarihsel dönemde olduğunu gösteren, döneme atlamaya
// yarayan yatay bir zaman şeridi. Yalnızca bir döneme ait sayfalarda
// (bölüm açılışı veya olay) gösterilir; eklerde gizlenir.
export default function EraTimeline({ periods, currentPeriodId, onSelect }) {
  const currentIdx = periods.findIndex((p) => p.id === currentPeriodId);

  return (
    <nav className="era-timeline" aria-label="Tarihsel dönem şeridi">
      {periods.map((period, idx) => {
        let state = 'upcoming';
        if (idx === currentIdx) state = 'current';
        else if (idx < currentIdx) state = 'past';

        return (
          <button
            key={period.id}
            className={`era-timeline__item era-timeline__item--${state}`}
            onClick={() => onSelect(period.id)}
            aria-current={state === 'current' ? 'true' : undefined}
          >
            <span className="era-timeline__dot" aria-hidden="true" />
            <span className="era-timeline__text">
              <span className="era-timeline__title">{period.title}</span>
              <span className="era-timeline__range">{period.range}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
