import { useState } from 'react';
import { BackIcon, ShareIcon } from '../components/Icons.jsx';
import { resolveStory } from '../data/storyResolver.js';
import { generateFactShareImage } from '../shareImage.js';

function Paragraphs({ text }) {
  if (!text) return null;
  return text.split('\n\n').map((p, i) => (
    <p key={i} className="story-paragraph">
      {p}
    </p>
  ));
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function StoryScreen({ storyRef, origin, onBack }) {
  const story = resolveStory(storyRef);
  const buttonLabel = origin === 'quiz' ? "Quiz'e Devam Et" : 'Ana Sayfaya Dön';
  const [shareStatus, setShareStatus] = useState(null);

  async function handleShare() {
    const excerpt = story.text ? story.text.split('\n\n')[0].slice(0, 140) : '';
    const shareText = `${story.title} — Osmanlı Tarihi Quiz'de öğrendim, ilgini çekebilir.`;
    try {
      const blob = await generateFactShareImage({ breadcrumb: story.breadcrumb, title: story.title, excerpt });
      const file = new File([blob], 'osmanli-tarihi-kart.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: shareText });
        } catch {
          // kullanıcı paylaşım penceresini kapattıysa sessizce geç
        }
        return;
      }
      downloadBlob(blob, 'osmanli-tarihi-kart.png');
      setShareStatus('Görsel indirildi!');
      setTimeout(() => setShareStatus(null), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        setShareStatus('Panoya kopyalandı!');
        setTimeout(() => setShareStatus(null), 2000);
      } catch {
        setShareStatus(null);
      }
    }
  }

  return (
    <div className="screen screen--focus">
      <header className="story-top">
        <button className="icon-button" onClick={onBack} aria-label="Geri">
          <BackIcon color="var(--muted)" />
        </button>
        <div className="story-top__breadcrumb">{story.breadcrumb}</div>
        <button className="icon-button" onClick={handleShare} aria-label="Bu bilgiyi paylaş" title="Bu bilgiyi paylaş">
          <ShareIcon size={18} color="var(--muted)" />
        </button>
      </header>

      <div className="screen__body story-body">
        <h1 className="story-title">{story.title}</h1>
        <Paragraphs text={story.text} />
        {shareStatus && <div className="story-share-status">{shareStatus}</div>}
      </div>

      <div className="screen__footer">
        <button className="primary-button" onClick={onBack}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
