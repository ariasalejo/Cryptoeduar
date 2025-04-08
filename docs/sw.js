const CACHE_NAME = 'cryptoeduar-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/assets/css/index.css',
  '/assets/js/index.js',
  '/assets/images/logo.png',
  '/dashboard.html',
  '/assets/css/dashboard.css',
  '/assets/js/dashboard.js'
];

// Instalación del SW y caché inicial
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Instalado');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activa el nuevo SW inmediatamente
});

// Activación del SW
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[ServiceWorker] Eliminando caché antigua:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim(); // Toma control inmediato
});

// Fetch para servir desde caché o red
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          return caches.match('/offline.html');
        })
      );
    })
  );
});
