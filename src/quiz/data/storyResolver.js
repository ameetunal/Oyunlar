// Yanlış cevaplanan bir sorunun "Bunu Öğrenelim" ekranında gösterilecek
// tam anlatımı, ana sitenin (../../data) gerçek içerik dosyalarından
// okur — içerik burada tekrar yazılmaz, tek kaynaktan gelir.
import { sultanProfiles } from '../../data/sultanProfiles.js';
import { vizierProfiles } from '../../data/vizierProfiles.js';
import { scientistProfiles } from '../../data/scientistProfiles.js';
import { architectProfiles } from '../../data/architectProfiles.js';
import { haremWomenProfiles } from '../../data/haremWomenProfiles.js';
import { admiralProfiles } from '../../data/admiralProfiles.js';
import { poetProfiles } from '../../data/poetProfiles.js';
import { dailyLife } from '../../data/dailyLife.js';
import { wars } from '../../data/wars.js';
import { periods } from '../../data/periods.js';

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
  if (ref.source === 'architect') {
    const profile = architectProfiles[ref.key];
    return { title: ref.key, breadcrumb: 'Mimarlar ve Sanatçılar', text: profile?.text };
  }
  if (ref.source === 'haremWoman') {
    const profile = haremWomenProfiles[ref.key];
    return { title: ref.key, breadcrumb: 'Kadın Sultanlar', text: profile?.text };
  }
  if (ref.source === 'admiral') {
    const profile = admiralProfiles[ref.key];
    return { title: ref.key, breadcrumb: 'Kaptan-ı Deryalar', text: profile?.text };
  }
  if (ref.source === 'poet') {
    const profile = poetProfiles[ref.key];
    return { title: ref.key, breadcrumb: 'Divan Şairleri', text: profile?.text };
  }
  if (ref.source === 'dailyLife') {
    const entry = dailyLife.find((d) => d.topic === ref.key);
    return { title: entry?.title ?? ref.key, breadcrumb: 'Günlük Yaşam', text: entry?.text };
  }
  if (ref.source === 'war') {
    const war = wars.find((w) => w.name === ref.key);
    const event = allEvents.find((e) => e.title === war?.eventTitle);
    return { title: event?.title ?? war?.name, breadcrumb: 'Büyük Savaşlar', text: event?.text };
  }
  return { title: ref.key, breadcrumb: '', text: undefined };
}
