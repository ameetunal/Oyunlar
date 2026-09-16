// Her sayfa için, ana React uygulamasından bağımsız, sade ve gerçek metin
// içeren bir HTML gövdesi üretir. Derleme sonrası (vite-plugin-prerender.js
// tarafından) her sayfanın kendi statik dosyasına gömülür — böylece arama
// motoru tarayıcıları JavaScript çalıştırmadan bile gerçek içeriği görür.
// Etkileşimli arayüzün birebir kopyası değildir; amaç görsel eşitlik değil,
// her adresin gerçek, özgün metin taşımasıdır — sayfa yüklenince zaten asıl
// uygulama devreye girip bu içeriğin yerini alır.
import { wars } from '../src/data/wars.js';
import { viziers } from '../src/data/viziers.js';
import { architects } from '../src/data/architects.js';
import { dailyLife } from '../src/data/dailyLife.js';
import { scientists } from '../src/data/scientists.js';
import { haremWomen } from '../src/data/haremWomen.js';
import { admirals } from '../src/data/admirals.js';
import { poets } from '../src/data/poets.js';
import { sultans } from '../src/data/sultans.js';
import { glossary } from '../src/data/glossary.js';
import { getPageText } from '../src/content.js';

const FEEDBACK_EMAIL = 'Tarihiiosmanli@hotmail.com';

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function paragraphsHtml(text) {
  return text
    .split('\n\n')
    .map((p) => `<p class="event-text">${esc(p)}</p>`)
    .join('\n');
}

function summarize(text, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

function narrativePage({ label, kicker, text }) {
  return {
    title: label,
    description: summarize(text),
    bodyHtml: `<p class="chapter-label">${esc(kicker)}</p>\n<h1 class="event-title">${esc(label)}</h1>\n${paragraphsHtml(text)}`,
  };
}

function listPage({ label, summary, items }) {
  return {
    title: label,
    description: summary,
    bodyHtml:
      `<p class="chapter-label">Ek</p>\n<h1 class="chapter-title">${esc(label)}</h1>\n<p class="chapter-summary">${esc(summary)}</p>\n<ul>\n` +
      items.map((item) => `  <li>${item}</li>`).join('\n') +
      `\n</ul>`,
  };
}

export function renderPageContent(page) {
  switch (page.type) {
    case 'intro':
      return narrativePage({
        label: page.period.title,
        kicker: page.period.range,
        text: page.period.intro,
      });
    case 'event':
      return narrativePage({
        label: page.event.title,
        kicker: `${page.period.title} · ${page.event.year}`,
        text: page.event.text,
      });
    case 'theme':
      return narrativePage({
        label: page.theme.title,
        kicker: page.period.title,
        text: page.theme.text,
      });
    case 'sultan-profile':
      return narrativePage({ label: page.sultan.name, kicker: `Padişah · ${page.sultan.reign}`, text: getPageText(page) });
    case 'vizier-profile':
      return narrativePage({ label: page.vizier.name, kicker: `Sadrazam · ${page.vizier.term}`, text: getPageText(page) });
    case 'architect-profile':
      return narrativePage({
        label: page.architect.name,
        kicker: `${page.architect.field} · ${page.architect.era}`,
        text: getPageText(page),
      });
    case 'scientist-profile':
      return narrativePage({
        label: page.scientist.name,
        kicker: `${page.scientist.field} · ${page.scientist.era}`,
        text: getPageText(page),
      });
    case 'harem-woman-profile':
      return narrativePage({
        label: page.woman.name,
        kicker: `${page.woman.role} · ${page.woman.era}`,
        text: getPageText(page),
      });
    case 'admiral-profile':
      return narrativePage({ label: page.admiral.name, kicker: `Kaptan-ı Derya · ${page.admiral.term}`, text: getPageText(page) });
    case 'poet-profile':
      return narrativePage({ label: page.poet.name, kicker: `Divan Şairi · ${page.poet.era}`, text: getPageText(page) });
    case 'daily-life-topic':
      return narrativePage({
        label: page.entry.title,
        kicker: `Günlük Yaşam · ${page.entry.topic}`,
        text: page.entry.text,
      });

    case 'sultans':
      return listPage({
        label: 'Padişahlar Listesi',
        summary: "Osman Gazi'den son padişah VI. Mehmed'e, altı asırlık hanedanın otuz altı hükümdarı.",
        items: sultans.map((s) => `${esc(s.order)}. ${esc(s.name)} (${esc(s.reign)}) — ${esc(s.note)}`),
      });
    case 'wars':
      return listPage({
        label: 'Büyük Savaşlar',
        summary:
          'Osmanlı tarihi boyunca imparatorluğun kaderini belirleyen savaşlar, kuşatmalar ve meydan muharebeleri, kronolojik sırayla.',
        items: wars.map((w) => `${esc(w.year)} — ${esc(w.name)}: ${esc(w.opponent)}, ${esc(w.result)}.`),
      });
    case 'viziers':
      return listPage({
        label: 'Ünlü Sadrazamlar',
        summary: 'Osmanlı tarihinin en etkili sadrazamlarının kronolojik listesi.',
        items: viziers.map((v) => `${esc(v.order)}. ${esc(v.name)} (${esc(v.term)}, ${esc(v.sultan)}) — ${esc(v.note)}`),
      });
    case 'architects':
      return listPage({
        label: 'Ünlü Mimarlar ve Sanatçılar',
        summary: 'Osmanlı mimarlık ve sanat tarihinin en etkili isimlerinin kronolojik listesi.',
        items: architects.map((a) => `${esc(a.order)}. ${esc(a.name)} (${esc(a.era)}, ${esc(a.field)}) — ${esc(a.note)}`),
      });
    case 'daily-life':
      return listPage({
        label: 'Günlük Yaşam',
        summary: "Osmanlı'da günlük yaşamın farklı yönlerini konu bazlı ele alan incelemeler.",
        items: dailyLife.map((d) => `${esc(d.title)} — ${esc(d.summary)}`),
      });
    case 'scientists':
      return listPage({
        label: 'Ünlü Bilim İnsanları',
        summary: 'Osmanlı bilim ve düşünce tarihinin en etkili isimlerinin kronolojik listesi.',
        items: scientists.map((s) => `${esc(s.order)}. ${esc(s.name)} (${esc(s.era)}, ${esc(s.field)}) — ${esc(s.note)}`),
      });
    case 'harem-women':
      return listPage({
        label: 'Kadın Sultanlar',
        summary: 'Osmanlı sarayında devlet işlerinde de etkili olmuş kadın sultanların kronolojik listesi.',
        items: haremWomen.map((w) => `${esc(w.order)}. ${esc(w.name)} (${esc(w.era)}, ${esc(w.role)}) — ${esc(w.note)}`),
      });
    case 'admirals':
      return listPage({
        label: 'Kaptan-ı Deryalar',
        summary: 'Osmanlı deniz tarihinin en etkili kaptan-ı deryalarının ve denizcilerinin kronolojik listesi.',
        items: admirals.map((a) => `${esc(a.order)}. ${esc(a.name)} (${esc(a.term)}) — ${esc(a.note)}`),
      });
    case 'poets':
      return listPage({
        label: 'Divan Şairleri',
        summary: 'Osmanlı divan edebiyatının en etkili şairlerinin kronolojik listesi.',
        items: poets.map((p) => `${esc(p.order)}. ${esc(p.name)} (${esc(p.era)}) — ${esc(p.note)}`),
      });
    case 'glossary':
      return listPage({
        label: 'Terimler Sözlüğü',
        summary: 'Osmanlı tarihini okurken sık karşılaşılacak temel kavramlar.',
        items: glossary.map((g) => `<strong>${esc(g.term)}:</strong> ${esc(g.definition)}`),
      });

    case 'about':
      return {
        title: 'Hakkımızda',
        description: 'Bu sitenin ne olduğu ve nasıl hazırlandığı hakkında.',
        bodyHtml: `<p class="chapter-label">Ek</p>
<h1 class="chapter-title">Hakkımızda</h1>
<p class="chapter-summary">Bu sitenin ne olduğu ve nasıl hazırlandığı hakkında.</p>
<p class="event-text"><strong>Osmanlı — Bir İmparatorluğun Hikâyesi</strong>, Osmanlı tarihinin kuruluşundan yıkılışına uzanan hikâyesini, belgesel ve kitap tadında, doğrusal bir anlatımla anlatmak amacıyla hazırlanmış bağımsız, kurumsal bir yapıya bağlı olmayan kişisel bir projedir.</p>
<p class="event-text">Site; padişahlar, sadrazamlar, savaşlar, bilim insanları, mimarlar, kadın sultanlar, denizciler, şairler ve günlük yaşam dahil 200'ü aşkın özgün sayfadan oluşuyor, artık interaktif bir quiz'i de barındırıyor. İçerikler tarafımızca araştırılıp yazılmıştır; amaç, Osmanlı tarihini geniş bir kitleye ilgi çekici ve erişilebilir şekilde ulaştırmaktır.</p>
<p class="event-text">Sitenin barındırma ve geliştirme maliyetlerini karşılamak için sayfalarda reklam gösterilmektedir. Bir eksik bilgi fark edersen ya da eklenmesini istediğin bir bölüm varsa, doğrudan <a href="mailto:${FEEDBACK_EMAIL}">${FEEDBACK_EMAIL}</a> adresinden bize ulaşabilirsin.</p>`,
      };
    case 'contact':
      return {
        title: 'Bize Ulaşın',
        description: 'Sorularınız, önerileriniz ya da fark ettiğiniz eksikler için bize ulaşabilirsiniz.',
        bodyHtml: `<p class="chapter-label">Ek</p>
<h1 class="chapter-title">Bize Ulaşın</h1>
<p class="chapter-summary">Sorularınız, önerileriniz ya da fark ettiğiniz eksikler için bize ulaşabilirsiniz.</p>
<p class="event-text">Bu site tek bir kişi tarafından hazırlanıp güncelleniyor. Eksik bir bilgi, bir yazım hatası, eklenmesini istediğin bir bölüm ya da genel bir geri bildirimin varsa aşağıdaki e-posta adresinden bize yazabilirsin.</p>
<p class="contact-email-line"><a href="mailto:${FEEDBACK_EMAIL}">${FEEDBACK_EMAIL}</a></p>`,
      };
    default:
      return null;
  }
}
