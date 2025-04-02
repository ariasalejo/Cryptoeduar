const CACHE_NAME = 'cripto-eduar-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/images/logos/logo.svg',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
