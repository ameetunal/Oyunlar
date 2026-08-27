// Yanlış cevaplanan bir sorunun "Bunu Öğrenelim" ekranında gösterilecek
// tam anlatımı, ana Osmanlı sitesinin (../../../src/data) gerçek içerik
// dosyalarından okur — içerik burada tekrar yazılmaz, tek kaynaktan gelir.
import { sultanProfiles } from '../../../src/data/sultanProfiles.js';
import { vizierProfiles } from '../../../src/data/vizierProfiles.js';
import { scientistProfiles } from '../../../src/data/scientistProfiles.js';
import { wars } from '../../../src/data/wars.js';
import { periods } from '../../../src/data/periods.js';

const allEvents = periods.flatMap((p) => p.events);

export function resolveStory(ref) {
  if (ref.source === 'sultan') {
    const profile = sultanProfiles[ref.key];
    return { title: ref.key, breadcrumb: 'Padişahlar', text: profile?.text };
  }
  if (ref.source === 'vizier') {
    const profile = vizierProfiles[ref.key];
    return { title: ref.key, breadcrumb: 'Sadrazamlar', text: profile?.text };
  }
  if (ref.source === 'scientist') {
    const profile = scientistProfiles[ref.key];
    return { title: ref.key, breadcrumb: 'Bilim İnsanları', text: profile?.text };
  }
  if (ref.source === 'war') {
    const war = wars.find((w) => w.name === ref.key);
    const event = allEvents.find((e) => e.title === war?.eventTitle);
    return { title: event?.title ?? war?.name, breadcrumb: 'Büyük Savaşlar', text: event?.text };
  }
  return { title: ref.key, breadcrumb: '', text: undefined };
}
