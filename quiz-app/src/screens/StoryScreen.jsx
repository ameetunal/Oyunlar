import { BackIcon } from '../components/Icons.jsx';
import { resolveStory } from '../data/storyResolver.js';

function Paragraphs({ text }) {
  if (!text) return null;
  return text.split('\n\n').map((p, i) => (
    <p key={i} className="story-paragraph">
      {p}
    </p>
  ));
}

export default function StoryScreen({ storyRef, origin, onBack }) {
  const story = resolveStory(storyRef);
  const buttonLabel = origin === 'quiz' ? "Quiz'e Devam Et" : 'Ana Sayfaya Dön';

  return (
    <div className="screen screen--focus">
      <header className="story-top">
        <button className="icon-button" onClick={onBack} aria-label="Geri">
          <BackIcon color="var(--muted)" />
        </button>
        <div className="story-top__breadcrumb">{story.breadcrumb}</div>
      </header>

      <div className="screen__body story-body">
        <h1 className="story-title">{story.title}</h1>
        <Paragraphs text={story.text} />
      </div>

      <div className="screen__footer">
        <button className="primary-button" onClick={onBack}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
