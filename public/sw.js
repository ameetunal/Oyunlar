// Ağ öncelikli servis çalışanı: çevrimiçiyken her istek için önce ağı
// dener, böylece yeni bir yayın (deploy) sonraki açılışta hemen görünür
// — eski "stale-while-revalidate" mantığı yeni içeriği bir tur geriden
// gösteriyordu. Ağ başarısız olursa (çevrimdışı) önbellekten sunulur.
// CACHE_NAME değişince eski önbellekler otomatik silinir.
const CACHE_NAME = 'osmanli-hikayesi-v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const response = await fetch(request);
        if (response && response.status === 200) {
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await cache.match(request);
        return cached || (request.mode === 'navigate' ? cache.match(self.registration.scope) : undefined);
      }
    })
  );
});
