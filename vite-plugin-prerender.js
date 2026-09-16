// Her `vite build` çalıştığında (hem /Oyunlar/ alt yolunda hem kök alan
// adında --base=/ ile yapılan derlemede), buildPages()'teki 200'den fazla
// sayfanın her biri için ayrı, gerçek metin içeren bir dist/<slug>/index.html
// üretir. Böylece Google (ve AdSense'in tarayıcısı) siteyi JavaScript
// çalıştırmadan bile gerçek, çok sayfalı bir site olarak görür — şu ana
// kadar tek görülebilen adres https://ameetunal.github.io/ idi, bu da
// "düşük değerli içerik" / "yayıncı içeriği olmayan ekranlarda reklam"
// uyarılarının asıl kaynağıydı.
//
// closeBundle hook'u kullanılıyor: bu, `npm run build` (vite.config.js'teki
// varsayılan /Oyunlar/ base'iyle) ile de, ameetunal.github.io reposunun
// doğrudan çalıştırdığı `npx vite build --base=/` ile de otomatik devreye
// girer — ayrı bir repo/iş akışı değişikliği gerekmez.
import fs from 'node:fs';
import path from 'node:path';
import { periods } from './src/data/periods.js';
import { buildPages, getPageSlug } from './src/content.js';
import { renderPageContent } from './scripts/prerenderContent.js';

const SITE_ORIGIN = 'https://ameetunal.github.io';
const SITE_TITLE = 'Osmanlı — Bir İmparatorluğun Hikâyesi';

function escAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function replaceTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

export default function osmanliPrerenderPlugin() {
  let outDir = 'dist';
  let base = '/';

  return {
    name: 'osmanli-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
      base = config.base;
    },
    closeBundle() {
      const distDir = path.resolve(outDir);
      const templatePath = path.join(distDir, 'index.html');
      if (!fs.existsSync(templatePath)) return;
      const template = fs.readFileSync(templatePath, 'utf-8');

      const pages = buildPages(periods);
      const seenSlugs = new Set();
      const urls = [];

      for (const page of pages) {
        const rawSlug = getPageSlug(page);
        if (!rawSlug) continue;
        const content = renderPageContent(page);
        if (!content) continue;

        let slug = rawSlug;
        let suffix = 2;
        while (seenSlugs.has(slug)) slug = `${rawSlug}-${suffix++}`;
        seenSlugs.add(slug);

        const canonical = `${SITE_ORIGIN}${base}${slug}/`;
        const pageTitle = `${content.title} — ${SITE_TITLE}`;

        let html = template;
        html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escAttr(pageTitle)}</title>`);
        html = replaceTag(
          html,
          /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
          `<link rel="canonical" href="${canonical}" />`
        );
        html = replaceTag(
          html,
          /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="description" content="${escAttr(content.description)}" />`
        );
        html = replaceTag(
          html,
          /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:url" content="${canonical}" />`
        );
        html = replaceTag(
          html,
          /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:title" content="${escAttr(pageTitle)}" />`
        );
        html = replaceTag(
          html,
          /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:description" content="${escAttr(content.description)}" />`
        );
        html = replaceTag(
          html,
          /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
          `<meta name="twitter:title" content="${escAttr(pageTitle)}" />`
        );
        html = replaceTag(
          html,
          /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="twitter:description" content="${escAttr(content.description)}" />`
        );
        html = replaceTag(
          html,
          /<div id="root"><\/div>/,
          `<div id="root"><div class="prerendered-shell">${content.bodyHtml}</div></div>`
        );

        const outPath = path.join(distDir, slug, 'index.html');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html, 'utf-8');
        urls.push(canonical);
      }

      const rootUrl = `${SITE_ORIGIN}${base}`;
      const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `  <url><loc>${rootUrl}</loc><priority>1.0</priority></url>\n` +
        urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
        `\n</urlset>\n`;
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');

      // eslint-disable-next-line no-console
      console.log(`[osmanli-prerender] ${urls.length} statik sayfa + sitemap.xml üretildi (base=${base}).`);
    },
  };
}
